import json
from datetime import datetime, timezone

from db import get_connection
from models.portable_archive import PortableArchive, PortableArchiveEntry


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

        entries = [
            _row_to_portable_entry(row)
            for row in cursor.fetchall()
        ]

    return PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at=datetime.now(timezone.utc),
        entries=entries,
    )

def archive_to_json(archive: PortableArchive) -> str:
    return archive.model_dump_json(indent=2)
