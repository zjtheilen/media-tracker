import json
from datetime import datetime, timezone

from db import get_connection
from models.portable_archive import PortableArchive, PortableArchiveEntry, RestorePreview


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
