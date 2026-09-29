import json
from datetime import datetime, timezone

from db import get_connection
from models.entry import Entry
from models.media_item import MediaItem
from models.portable_archive import (
    PortableArchive,
    PortableArchiveEntry,
    RestorePreview,
)
from models.score import Score


def _row_to_portable_entry(row) -> PortableArchiveEntry:
    genres = json.loads(row["genres"]) if row["genres"] else []
    scores = json.loads(row["scores"]) if row["scores"] else {}

    historical_scores_raw = row["historical_scores"]

    if historical_scores_raw:
        historical_scores = json.loads(historical_scores_raw)
    else:
        historical_scores = None

    return PortableArchiveEntry(
        id=row["id"],
        title=row["title"],
        media_type=row["media_type"],
        genres=genres,
        scores=scores,
        notes=row["notes"],
        date_consumed=row["date_consumed"],
        completion_status=row["completion_status"],
        favorite=bool(row["favorite"]),
        historical_score=row["historical_score"],
        historical_scores=historical_scores,
    )


def _portable_entry_to_row(entry: PortableArchiveEntry) -> tuple:
    return (
        entry.id,
        entry.media_type,
        entry.title,
        json.dumps(entry.genres),
        entry.completion_status,
        entry.notes,
        entry.date_consumed.isoformat() if entry.date_consumed else None,
        json.dumps(entry.scores),
        int(entry.favorite),
        entry.historical_score,
        json.dumps(entry.historical_scores)
        if entry.historical_scores is not None
        else None,
    )


def _portable_entry_total_score(entry: PortableArchiveEntry) -> float:
    scores = [Score(category, value) for category, value in entry.scores.items()]

    model_entry = Entry(
        media_item=MediaItem(entry.title, entry.media_type),
        genres=entry.genres,
        scores=scores,
        notes=entry.notes or "",
        date_consumed=entry.date_consumed,
        completion_status=entry.completion_status,
    )

    return model_entry.total_score()


def export_archive() -> PortableArchive:
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                id,
                media_type,
                title,
                genres,
                completion_status,
                notes,
                date_consumed,
                scores,
                favorite,
                historical_score,
                historical_scores
            FROM entries
            ORDER BY id
        """)

        entries = [_row_to_portable_entry(row) for row in cursor.fetchall()]

    return PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at=datetime.now(timezone.utc),
        entries=entries,
    )


def archive_to_json(archive: PortableArchive) -> str:
    return archive.model_dump_json(indent=2)


def json_to_archive(json_text: str) -> PortableArchive:
    data = json.loads(json_text)
    return PortableArchive.model_validate(data)


def compare_archives(
    imported_archive: PortableArchive,
    current_archive: PortableArchive,
) -> RestorePreview:
    imported_by_id = {entry.id: entry for entry in imported_archive.entries}
    current_by_id = {entry.id: entry for entry in current_archive.entries}

    imported_ids = set(imported_by_id)
    current_ids = set(current_by_id)

    add_ids = imported_ids - current_ids
    remove_ids = current_ids - imported_ids
    shared_ids = imported_ids & current_ids

    replace_ids = {
        entry_id
        for entry_id in shared_ids
        if imported_by_id[entry_id].model_dump(exclude={"id"})
        != current_by_id[entry_id].model_dump(exclude={"id"})
    }

    unchanged_ids = shared_ids - replace_ids

    return RestorePreview(
        imported_count=len(imported_ids),
        current_count=len(current_ids),
        add_count=len(add_ids),
        replace_count=len(replace_ids),
        remove_count=len(remove_ids),
        unchanged_count=len(unchanged_ids),
        validation_errors=[],
    )


def restore_archive(archive: PortableArchive) -> None:
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("DELETE FROM entries")

        for entry in archive.entries:
            cursor.execute(
                """
                INSERT INTO entries (
                    id,
                    media_type,
                    title,
                    genres,
                    completion_status,
                    total_score,
                    notes,
                    date_consumed,
                    scores,
                    favorite,
                    historical_score,
                    historical_scores
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    entry.id,
                    entry.media_type,
                    entry.title,
                    json.dumps(entry.genres),
                    entry.completion_status,
                    _portable_entry_total_score(entry),
                    entry.notes,
                    entry.date_consumed.isoformat()
                    if entry.date_consumed
                    else None,
                    json.dumps(entry.scores),
                    int(entry.favorite),
                    entry.historical_score,
                    json.dumps(entry.historical_scores)
                    if entry.historical_scores is not None
                    else None,
                ),
            )
        conn.commit()
