import argparse
import json
import sqlite3
import uuid
from pathlib import Path

try:
    from migrations.historical_library import (
        HISTORICAL_LIBRARY,
        HISTORICAL_UNFINISHED_BOOKS,
        HISTORICAL_UNFINISHED_GAMES,
    )
except ModuleNotFoundError:
    from historical_library import (
        HISTORICAL_LIBRARY,
        HISTORICAL_UNFINISHED_BOOKS,
        HISTORICAL_UNFINISHED_GAMES,
    )

EXPECTED_COUNTS = {
    "game": 28,
    "video": 50,
    "book": 16,
}

EXPECTED_UNFINISHED_COUNTS = {
    "game": 19,
    "book": 4,
}

# Historical titles that are known to correspond to differently named
# current WASABI records.
TITLE_ALIASES = {
    ("game", "Ducktales"): "DuckTales (NES)",
    ("video", "mother!"): "Mother",
    ("video", "The Backrooms"): "Backrooms",
    ("video", "The Invitation (2015)"): "The Invitation",
}


def get_db_path():
    import os

    return os.getenv("DB_PATH", "database.db")


def normalize_title(title):
    return " ".join(title.strip().lower().split())


def source_key(record):
    return record["media_type"], normalize_title(record["title"])


def validate_source():
    if len(HISTORICAL_LIBRARY) != 94:
        raise RuntimeError(
            f"Expected 94 historical records, found {len(HISTORICAL_LIBRARY)}"
        )

    counts = {}

    for record in HISTORICAL_LIBRARY:
        media_type = record["media_type"]
        counts[media_type] = counts.get(media_type, 0) + 1

    if counts != EXPECTED_COUNTS:
        raise RuntimeError(
            f"Unexpected media counts: {counts}; expected {EXPECTED_COUNTS}"
        )

    seen = set()

    for record in HISTORICAL_LIBRARY:
        key = source_key(record)

        if key in seen:
            raise RuntimeError(f"Duplicate historical source record: {key}")

        seen.add(key)

        required = {
            "media_type",
            "title",
            "genre",
            "date_consumed",
            "scores",
            "historical_score",
        }

        missing = required - record.keys()

        if missing:
            raise RuntimeError(
                f"{record['title']} is missing fields: {sorted(missing)}"
            )

    unfinished_records = HISTORICAL_UNFINISHED_GAMES + HISTORICAL_UNFINISHED_BOOKS

    unfinished_counts = {}

    for record in unfinished_records:
        media_type = record["media_type"]
        unfinished_counts[media_type] = unfinished_counts.get(media_type, 0) + 1

    if unfinished_counts != EXPECTED_UNFINISHED_COUNTS:
        raise RuntimeError(
            "Unexpected unfinished media counts: "
            f"{unfinished_counts}; expected {EXPECTED_UNFINISHED_COUNTS}"
        )

    unfinished_seen = set()

    for record in unfinished_records:
        key = source_key(record)

        if key in unfinished_seen:
            raise RuntimeError(f"Duplicate unfinished source record: {key}")

        unfinished_seen.add(key)

        required = {
            "media_type",
            "title",
        }

        missing = required - record.keys()

        if missing:
            raise RuntimeError(
                f"{record['title']} is missing fields: {sorted(missing)}"
            )

    print("Source validation: PASS")
    print(f"  Rated historical records:      {len(HISTORICAL_LIBRARY)}")
    print(f"  Games:                          {counts['game']}")
    print(f"  Videos:                         {counts['video']}")
    print(f"  Books:                          {counts['book']}")
    print(f"  Unfinished games:               {len(HISTORICAL_UNFINISHED_GAMES)}")
    print(f"  Unfinished books:               {len(HISTORICAL_UNFINISHED_BOOKS)}")


def load_entries(conn):
    rows = conn.execute(
        """
        SELECT
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
        FROM entries
        ORDER BY media_type, title
        """
    ).fetchall()

    return rows


def resolve_matches(rows):
    exact = {}
    normalized = {}

    for row in rows:
        key = (row["media_type"], normalize_title(row["title"]))

        if key in exact:
            raise RuntimeError(f"Duplicate current DB identity: {key}")

        exact[key] = row

        normalized.setdefault(
            (row["media_type"], normalize_title(row["title"])),
            [],
        ).append(row)

    matches = []
    unmatched = []

    for record in HISTORICAL_LIBRARY:
        media_type = record["media_type"]
        title = record["title"]

        alias_title = TITLE_ALIASES.get((media_type, title), title)

        key = (media_type, normalize_title(alias_title))
        candidates = normalized.get(key, [])

        if len(candidates) == 1:
            matches.append((record, candidates[0]))
        elif len(candidates) > 1:
            raise RuntimeError(
                f"Ambiguous current DB match for {media_type}: {title!r}"
            )
        else:
            unmatched.append(record)

    return matches, unmatched


def print_resolution(matches, unmatched):
    print()
    print("=== MATCH RESOLUTION ===")

    print(f"Existing matches: {len(matches)}")
    print(f"New records:      {len(unmatched)}")

    if matches:
        print()
        print("Existing records:")

        for record, row in matches:
            alias_marker = ""

            if row["title"] != record["title"]:
                alias_marker = " [ALIAS]"

            print(
                f"  MATCH {record['media_type']:5} | "
                f"{record['title']} -> {row['title']}{alias_marker}"
            )

    if unmatched:
        print()
        print("New records:")

        for record in unmatched:
            print(f"  NEW   {record['media_type']:5} | {record['title']}")


def build_historical_scores(record):
    return json.dumps(
        record["scores"],
        separators=(",", ":"),
    )


def build_new_notes(record):
    parts = []

    if record.get("method"):
        parts.append(f"Historical method: {record['method']}")

    if record.get("hardware"):
        parts.append(f"Historical hardware: {record['hardware']}")

    if record.get("author"):
        parts.append(f"Author: {record['author']}")

    return " | ".join(parts)


def get_historical_completion_status(record):
    method = record.get("method", "").lower()

    if "stuck" in method or "~50% completed" in method:
        return "in-progress"

    return "completed"


def verify_existing_snapshot(before_rows, conn):
    for before in before_rows:
        after = conn.execute(
            """
            SELECT
                id,
                media_type,
                title,
                genres,
                completion_status,
                total_score,
                notes,
                date_consumed,
                scores,
                favorite
            FROM entries
            WHERE id = ?
            """,
            (before["id"],),
        ).fetchone()

        if after is None:
            raise RuntimeError(
                f"Existing entry disappeared during migration: {before['id']}"
            )

        fields = [
            "id",
            "media_type",
            "title",
            "genres",
            "completion_status",
            "total_score",
            "notes",
            "date_consumed",
            "scores",
            "favorite",
        ]

        for field in fields:
            if after[field] != before[field]:
                raise RuntimeError(
                    f"Existing field changed unexpectedly: {before['title']} -> {field}"
                )


def apply_migration(conn, matches, unmatched):
    print()
    print("=== APPLYING MIGRATION ===")

    for record, row in matches:
        conn.execute(
            """
            UPDATE entries
            SET
                historical_score = ?,
                historical_scores = ?
            WHERE id = ?
            """,
            (
                record["historical_score"],
                build_historical_scores(record),
                row["id"],
            ),
        )

    for record in unmatched:
        entry_id = str(uuid.uuid4())

        notes = build_new_notes(record)

        conn.execute(
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
                entry_id,
                record["media_type"],
                record["title"],
                json.dumps([record["genre"]]),
                get_historical_completion_status(record),
                None,
                notes,
                record["date_consumed"],
                json.dumps({}),
                0,
                record["historical_score"],
                build_historical_scores(record),
            ),
        )

    print(f"Updated existing records: {len(matches)}")
    print(f"Inserted new records:      {len(unmatched)}")


def verify_historical_data(conn):
    for record in HISTORICAL_LIBRARY:
        media_type = record["media_type"]
        title = record["title"]

        alias_title = TITLE_ALIASES.get((media_type, title), title)

        row = conn.execute(
            """
            SELECT
                id,
                media_type,
                title,
                historical_score,
                historical_scores
            FROM entries
            WHERE media_type = ?
              AND lower(title) = lower(?)
            """,
            (media_type, alias_title),
        ).fetchone()

        if row is None:
            raise RuntimeError(
                f"Historical record not found after migration: {media_type} / {title}"
            )

        if row["historical_score"] != record["historical_score"]:
            raise RuntimeError(f"Historical score mismatch for {title}")

        stored_scores = json.loads(row["historical_scores"])

        if stored_scores != record["scores"]:
            raise RuntimeError(f"Historical metric mismatch for {title}")

    print("Historical data verification: PASS")


def verify_unfinished_data(conn):
    records = HISTORICAL_UNFINISHED_GAMES + HISTORICAL_UNFINISHED_BOOKS

    for record in records:
        media_type = record["media_type"]
        title = record["title"]

        alias_title = TITLE_ALIASES.get(
            (media_type, title),
            title,
        )

        row = conn.execute(
            """
            SELECT
                id,
                media_type,
                title,
                completion_status,
                total_score,
                scores
            FROM entries
            WHERE media_type = ?
              AND lower(title) = lower(?)
            """,
            (media_type, alias_title),
        ).fetchone()

        if row is None:
            raise RuntimeError(f"Unfinished record not found: {media_type} / {title}")

        if row["completion_status"] != "in-progress":
            # Existing records may have since been completed.
            # We only require that the historical unfinished record
            # was represented; current state remains authoritative.
            continue

        if row["total_score"] is not None:
            raise RuntimeError(
                f"Unfinished record unexpectedly has current score: {title}"
            )

        stored_scores = json.loads(row["scores"])

        if stored_scores != {}:
            raise RuntimeError(
                f"Unfinished record unexpectedly has current metrics: {title}"
            )

    print("Historical unfinished data verification: PASS")


def run(dry_run=False):
    validate_source()

    db_path = get_db_path()
    print()
    print(f"Database: {Path(db_path).resolve()}")

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    try:
        rows_before = load_entries(conn)

        print(f"Current entries: {len(rows_before)}")

        if len(rows_before) < 94:
            raise RuntimeError(
                f"Expected historical rated migration to already exist; "
                f"found only {len(rows_before)} entries"
            )

        unfinished_records = (
            HISTORICAL_UNFINISHED_GAMES
            + HISTORICAL_UNFINISHED_BOOKS
        )

        unfinished_existing = 0

        for record in unfinished_records:
            alias_title = TITLE_ALIASES.get(
                (record["media_type"], record["title"]),
                record["title"],
            )

            row = conn.execute(
                """
                SELECT id
                FROM entries
                WHERE media_type = ?
                  AND lower(title) = lower(?)
                """,
                (
                    record["media_type"],
                    alias_title,
                ),
            ).fetchone()

            if row:
                unfinished_existing += 1

        unfinished_new = (
            len(unfinished_records) - unfinished_existing
        )

        print()
        print("=== UNFINISHED HISTORY ===")
        print(f"Source records:   {len(unfinished_records)}")
        print(f"Existing records: {unfinished_existing}")
        print(f"New records:      {unfinished_new}")
        print(f"Expected final DB count: {94 + unfinished_new}")

        if dry_run:
            print()
            print("DRY RUN: no database changes made.")
            return

        print()
        print("Beginning transaction...")

        conn.execute("BEGIN")

        inserted_unfinished, existing_unfinished = (
            migrate_unfinished_records(
                conn,
                unfinished_records,
            )
        )

        print(
            f"Historical unfinished records: "
            f"{inserted_unfinished} inserted, "
            f"{existing_unfinished} already existed"
        )

        verify_unfinished_data(conn)
        verify_historical_data(conn)

        final_count = conn.execute(
            "SELECT COUNT(*) FROM entries"
        ).fetchone()[0]

        expected_final_count = 94 + unfinished_new

        if final_count != expected_final_count:
            raise RuntimeError(
                f"Unexpected final entry count: {final_count}; "
                f"expected {expected_final_count}"
            )

        conn.commit()

        print()
        print("Migration committed successfully.")
        print(f"Final entry count: {final_count}")

    except Exception:
        conn.rollback()
        print()
        print("Migration aborted. Transaction rolled back.")
        raise

    finally:
        conn.close()


def main():
    parser = argparse.ArgumentParser(
        description="Import historical WASABI library scores."
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Resolve and validate migration without changing the database.",
    )

    args = parser.parse_args()

    run(dry_run=args.dry_run)


def build_unfinished_notes(record):
    parts = ["Historical status: Started but unfinished"]

    if record.get("system"):
        parts.append(f"Historical system: {record['system']}")

    if record.get("hardware"):
        parts.append(f"Historical hardware: {record['hardware']}")

    return " | ".join(parts)


def migrate_unfinished_records(conn, records):
    inserted = 0
    existing = 0

    for record in records:
        media_type = record["media_type"]
        title = record["title"]

        alias_title = TITLE_ALIASES.get(
            (media_type, title),
            title,
        )

        row = conn.execute(
            """
            SELECT
                id,
                media_type,
                title,
                notes
            FROM entries
            WHERE media_type = ?
              AND lower(title) = lower(?)
            """,
            (media_type, alias_title),
        ).fetchone()

        if row:
            existing += 1

            current_notes = row["notes"] or ""
            historical_note = build_unfinished_notes(record)

            if historical_note not in current_notes:
                new_notes = (
                    f"{current_notes} | {historical_note}"
                    if current_notes
                    else historical_note
                )

                conn.execute(
                    """
                    UPDATE entries
                    SET notes = ?
                    WHERE id = ?
                    """,
                    (new_notes, row["id"]),
                )

            continue

        entry_id = str(uuid.uuid4())

        conn.execute(
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
                entry_id,
                media_type,
                title,
                json.dumps([]),
                "in-progress",
                None,
                build_unfinished_notes(record),
                None,
                json.dumps({}),
                0,
                None,
                json.dumps({}),
            ),
        )

        inserted += 1

    return inserted, existing


if __name__ == "__main__":
    main()
