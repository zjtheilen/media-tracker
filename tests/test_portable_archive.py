import json
import os
import sqlite3
from datetime import date, datetime, timezone

import pytest
from pydantic import ValidationError

from models.entry import Entry
from models.media_item import MediaItem
from models.portable_archive import (
    PortableArchive,
    PortableArchiveEntry,
    RestorePreview,
)
from models.score import Score
from models.services.portable_archive import (
    _portable_entry_to_row,
    _portable_entry_total_score,
    archive_to_json,
    compare_archives,
    export_archive,
    json_to_archive,
    restore_archive,
)


def valid_entry_data():
    return {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "Example Title",
        "media_type": "game",
        "genres": ["rpg"],
        "scores": {"story": 9, "gameplay": 8},
        "notes": "Example notes.",
        "date_consumed": "2026-09-20",
        "completion_status": "completed",
        "favorite": True,
        "historical_score": 91.5,
        "historical_scores": {"story": 9, "gameplay": 8},
    }


def valid_archive_data():
    return {
        "format": "wasabi-archive",
        "version": 1,
        "exported_at": "2026-09-28T12:34:56Z",
        "entries": [valid_entry_data()],
    }


def test_valid_portable_archive_entry():
    entry = PortableArchiveEntry(**valid_entry_data())

    assert entry.title == "Example Title"
    assert entry.media_type == "game"
    assert entry.date_consumed == date(2026, 9, 20)
    assert entry.favorite is True


def test_valid_portable_archive():
    archive = PortableArchive(**valid_archive_data())

    assert archive.format == "wasabi-archive"
    assert archive.version == 1
    assert len(archive.entries) == 1


@pytest.mark.parametrize(
    "field,value",
    [
        ("id", "not-a-uuid"),
        ("title", ""),
        ("media_type", "music"),
        ("completion_status", "unknown"),
    ],
)
def test_invalid_portable_archive_entry(field, value):
    data = valid_entry_data()
    data[field] = value

    with pytest.raises(ValidationError):
        PortableArchiveEntry(**data)


def test_empty_genres_and_scores_are_valid():
    data = valid_entry_data()
    data["genres"] = []
    data["scores"] = {}

    entry = PortableArchiveEntry(**data)

    assert entry.genres == []
    assert entry.scores == {}


def test_optional_fields_can_be_null():
    data = valid_entry_data()
    data["notes"] = None
    data["date_consumed"] = None
    data["historical_score"] = None
    data["historical_scores"] = None

    entry = PortableArchiveEntry(**data)

    assert entry.notes is None
    assert entry.date_consumed is None
    assert entry.historical_score is None
    assert entry.historical_scores is None


def test_export_archive_preserves_entry_data():
    conn = sqlite3.connect(os.environ["DB_PATH"])
    cursor = conn.cursor()

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
            "550e8400-e29b-41d4-a716-446655440000",
            "game",
            "Example Title",
            '["rpg"]',
            "completed",
            85.0,
            "Example notes.",
            "2026-09-20",
            '{"story": 9, "gameplay": 8}',
            1,
            91.5,
            '{"story": 9, "gameplay": 8}',
        ),
    )

    conn.commit()
    conn.close()

    archive = export_archive()

    assert archive.format == "wasabi-archive"
    assert archive.version == 1
    assert len(archive.entries) == 1

    entry = archive.entries[0]

    assert entry.id == "550e8400-e29b-41d4-a716-446655440000"
    assert entry.title == "Example Title"
    assert entry.media_type == "game"
    assert entry.genres == ["rpg"]
    assert entry.scores == {"story": 9, "gameplay": 8}
    assert entry.notes == "Example notes."
    assert entry.date_consumed.isoformat() == "2026-09-20"
    assert entry.completion_status == "completed"
    assert entry.favorite is True
    assert entry.historical_score == 91.5
    assert entry.historical_scores == {"story": 9, "gameplay": 8}


def test_archive_to_json_produces_portable_json():
    archive = PortableArchive(**valid_archive_data())

    result = archive_to_json(archive)

    assert '"format": "wasabi-archive"' in result
    assert '"version": 1' in result
    assert '"title": "Example Title"' in result
    assert '"favorite": true' in result
    assert '"historical_score": 91.5' in result
    assert '"total_score"' not in result
    assert '"universal_scores"' not in result
    assert '"media_scores"' not in result


def test_archive_to_json_preserves_json_structure():
    archive = PortableArchive(**valid_archive_data())

    result = archive_to_json(archive)
    data = json.loads(result)

    assert data["format"] == "wasabi-archive"
    assert data["version"] == 1
    assert data["entries"][0]["id"] == "550e8400-e29b-41d4-a716-446655440000"
    assert data["entries"][0]["date_consumed"] == "2026-09-20"
    assert data["entries"][0]["favorite"] is True
    assert data["entries"][0]["historical_scores"] == {
        "story": 9,
        "gameplay": 8,
    }


def test_export_archive_endpoint_returns_json_file(client):
    response = client.get("/archive/export")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/json")
    assert response.headers["content-disposition"] == (
        'attachment; filename="wasabi-archive.json"'
    )

    data = response.json()

    assert data["format"] == "wasabi-archive"
    assert data["version"] == 1
    assert "exported_at" in data
    assert data["entries"] == []


def test_export_archive_endpoint_includes_entries(client):
    conn = sqlite3.connect(os.environ["DB_PATH"])
    cursor = conn.cursor()

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
            "550e8400-e29b-41d4-a716-446655440000",
            "game",
            "Example Title",
            '["rpg"]',
            "completed",
            85.0,
            "Example notes.",
            "2026-09-20",
            '{"story": 9, "gameplay": 8}',
            1,
            91.5,
            '{"story": 9, "gameplay": 8}',
        ),
    )

    conn.commit()
    conn.close()

    response = client.get("/archive/export")

    assert response.status_code == 200

    data = response.json()

    assert len(data["entries"]) == 1
    assert data["entries"][0]["title"] == "Example Title"
    assert data["entries"][0]["scores"] == {
        "story": 9,
        "gameplay": 8,
    }
    assert data["entries"][0]["favorite"] is True
    assert data["entries"][0]["historical_score"] == 91.5


def test_valid_restore_preview():
    preview = RestorePreview(
        imported_count=94,
        current_count=87,
        add_count=12,
        replace_count=70,
        remove_count=5,
        unchanged_count=12,
        validation_errors=[],
    )

    assert preview.imported_count == 94
    assert preview.current_count == 87
    assert preview.add_count == 12
    assert preview.replace_count == 70
    assert preview.remove_count == 5
    assert preview.unchanged_count == 12
    assert preview.validation_errors == []


def test_restore_preview_can_contain_validation_errors():
    preview = RestorePreview(
        imported_count=0,
        current_count=94,
        add_count=0,
        replace_count=0,
        remove_count=0,
        unchanged_count=0,
        validation_errors=["Unsupported archive version"],
    )

    assert preview.validation_errors == ["Unsupported archive version"]


def test_compare_archives_classifies_entries():
    current = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=[
            valid_entry_data(),
            {
                **valid_entry_data(),
                "id": "650e8400-e29b-41d4-a716-446655440000",
                "title": "Unchanged Title",
            },
            {
                **valid_entry_data(),
                "id": "750e8400-e29b-41d4-a716-446655440000",
                "title": "Local Only",
            },
        ],
    )

    imported = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T13:34:56Z",
        entries=[
            valid_entry_data(),
            {
                **valid_entry_data(),
                "id": "650e8400-e29b-41d4-a716-446655440000",
                "title": "Unchanged Title",
            },
            {
                **valid_entry_data(),
                "id": "850e8400-e29b-41d4-a716-446655440000",
                "title": "Imported Only",
            },
        ],
    )

    preview = compare_archives(imported, current)

    assert preview.imported_count == 3
    assert preview.current_count == 3
    assert preview.add_count == 1
    assert preview.replace_count == 0
    assert preview.remove_count == 1
    assert preview.unchanged_count == 2
    assert preview.validation_errors == []


def test_compare_archives_classifies_replaced_entry():
    current = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=[valid_entry_data()],
    )

    imported_entry = {
        **valid_entry_data(),
        "title": "Updated Title",
    }

    imported = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T13:34:56Z",
        entries=[imported_entry],
    )

    preview = compare_archives(imported, current)

    assert preview.imported_count == 1
    assert preview.current_count == 1
    assert preview.add_count == 0
    assert preview.replace_count == 1
    assert preview.remove_count == 0
    assert preview.unchanged_count == 0
    assert preview.validation_errors == []


def test_portable_archive_rejects_duplicate_entry_ids():
    entry = valid_entry_data()

    with pytest.raises(ValidationError):
        PortableArchive(
            format="wasabi-archive",
            version=1,
            exported_at="2026-09-28T12:34:56Z",
            entries=[
                entry,
                {**entry, "title": "Duplicate ID"},
            ],
        )


def test_portable_archive_rejects_invalid_format():
    data = valid_archive_data()
    data["format"] = "not-wasabi"

    with pytest.raises(ValidationError):
        PortableArchive(**data)


def test_portable_archive_rejects_unsupported_version():
    data = valid_archive_data()
    data["version"] = 999

    with pytest.raises(ValidationError):
        PortableArchive(**data)


def test_portable_archive_rejects_non_utc_exported_at():
    data = valid_archive_data()
    data["exported_at"] = "2026-09-28T12:34:56"

    with pytest.raises(ValidationError):
        PortableArchive(**data)


def test_import_archive_from_json():
    data = valid_archive_data()

    archive = PortableArchive.model_validate_json(json.dumps(data))

    assert archive.format == "wasabi-archive"
    assert archive.version == 1
    assert len(archive.entries) == 1
    assert archive.entries[0].title == "Example Title"
    assert archive.entries[0].date_consumed == date(2026, 9, 20)


def test_import_archive_from_invalid_json():
    with pytest.raises((ValidationError, ValueError)):
        PortableArchive.model_validate_json("{not valid json")


def test_json_to_archive_round_trip():
    archive = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=[PortableArchiveEntry(**valid_entry_data())],
    )

    json_text = archive_to_json(archive)
    restored = json_to_archive(json_text)

    assert restored.format == archive.format
    assert restored.version == archive.version
    assert restored.exported_at == archive.exported_at
    assert restored.entries == archive.entries


def test_json_to_archive_rejects_invalid_json():
    with pytest.raises(json.JSONDecodeError):
        json_to_archive("{not valid json")

    invalid_archive = json.dumps({
        "format": "wasabi-archive",
        "version": 999,
        "exported_at": "2026-09-28T12:34:56Z",
        "entries": [],
    })

    with pytest.raises(ValidationError):
        json_to_archive(invalid_archive)


def test_portable_entry_total_score_uses_existing_scoring():
    entry = PortableArchiveEntry(**valid_entry_data())

    scores = [Score(category, value) for category, value in entry.scores.items()]

    model_entry = Entry(
        media_item=MediaItem(entry.title, entry.media_type),
        genres=entry.genres,
        scores=scores,
        notes=entry.notes or "",
        date_consumed=entry.date_consumed,
        completion_status=entry.completion_status,
    )

    assert _portable_entry_total_score(entry) == model_entry.total_score()


def test_portable_entry_to_row_preserves_persisted_fields():
    entry = PortableArchiveEntry(**valid_entry_data())

    row = _portable_entry_to_row(entry)

    assert row == (
        entry.id,
        entry.media_type,
        entry.title,
        json.dumps(entry.genres),
        entry.completion_status,
        entry.notes,
        entry.date_consumed.isoformat(),
        json.dumps(entry.scores),
        1,
        entry.historical_score,
        json.dumps(entry.historical_scores),
    )


def test_restore_archive_inserts_entries():
    archive = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=[PortableArchiveEntry(**valid_entry_data())],
    )

    restore_archive(archive)

    conn = sqlite3.connect(os.environ["DB_PATH"])
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM entries WHERE id = ?", (archive.entries[0].id,))
    row = cursor.fetchone()
    conn.close()

    assert row is not None
    assert row["id"] == archive.entries[0].id
    assert row["title"] == "Example Title"
    assert row["media_type"] == "game"
    assert json.loads(row["genres"]) == ["rpg"]
    assert json.loads(row["scores"]) == {"story": 9, "gameplay": 8}
    assert row["favorite"] == 1
    assert row["notes"] == "Example notes."
    assert row["date_consumed"] == "2026-09-20"
    assert row["completion_status"] == "completed"
    assert row["historical_score"] == 91.5
    assert json.loads(row["historical_scores"]) == {
        "story": 9,
        "gameplay": 8,
    }


def test_restore_archive_replaces_existing_archive():
    current_entry_data = valid_entry_data()
    current_entry_data["title"] = "Existing Entry"

    removed_entry_data = valid_entry_data()
    removed_entry_data["id"] = "550e8400-e29b-41d4-a716-446655440001"
    removed_entry_data["title"] = "Entry To Remove"

    imported_entry_data = valid_entry_data()
    imported_entry_data["title"] = "Imported Replacement"

    new_entry_data = valid_entry_data()
    new_entry_data["id"] = "550e8400-e29b-41d4-a716-446655440002"
    new_entry_data["title"] = "New Imported Entry"

    current_entries = [
        PortableArchiveEntry(**current_entry_data),
        PortableArchiveEntry(**removed_entry_data),
    ]

    imported_entries = [
        PortableArchiveEntry(**imported_entry_data),
        PortableArchiveEntry(**new_entry_data),
    ]

    current_archive = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=current_entries,
    )

    imported_archive = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=imported_entries,
    )

    restore_archive(current_archive)
    restore_archive(imported_archive)

    restored = export_archive()

    assert len(restored.entries) == 2
    assert {entry.id for entry in restored.entries} == {
        imported_entries[0].id,
        imported_entries[1].id,
    }

    replacement = next(
        entry for entry in restored.entries if entry.id == imported_entries[0].id
    )
    assert replacement.title == "Imported Replacement"

    assert not any(entry.id == current_entries[1].id for entry in restored.entries)


def test_restore_archive_rolls_back_on_failure(monkeypatch):
    existing_entry_data = valid_entry_data()
    existing_entry_data["title"] = "Existing Entry"

    existing_archive = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=[PortableArchiveEntry(**existing_entry_data)],
    )

    restore_archive(existing_archive)

    first_entry_data = valid_entry_data()
    first_entry_data["title"] = "Imported Entry"

    second_entry_data = valid_entry_data()
    second_entry_data["id"] = "550e8400-e29b-41d4-a716-446655440001"
    second_entry_data["title"] = "Second Imported Entry"

    failing_archive = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=[
            PortableArchiveEntry(**first_entry_data),
            PortableArchiveEntry(**second_entry_data),
        ],
    )

    original_total_score = _portable_entry_total_score

    call_count = 0

    def fail_on_second_entry(entry):
        nonlocal call_count
        call_count += 1

        if call_count == 2:
            raise RuntimeError("Simulated restore failure")

        return original_total_score(entry)

    monkeypatch.setattr(
        "models.services.portable_archive._portable_entry_total_score",
        fail_on_second_entry,
    )

    with pytest.raises(RuntimeError, match="Simulated restore failure"):
        restore_archive(failing_archive)

    restored = export_archive()

    assert len(restored.entries) == 1
    assert restored.entries[0].id == existing_archive.entries[0].id
    assert restored.entries[0].title == "Existing Entry"


def test_import_archive_preview_endpoint(client):
    response = client.post(
        "/archive/import/preview",
        content=json.dumps(valid_archive_data()),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["imported_count"] == 1
    assert data["current_count"] == 0
    assert data["add_count"] == 1
    assert data["replace_count"] == 0
    assert data["remove_count"] == 0
    assert data["unchanged_count"] == 0
    assert data["validation_errors"] == []


def test_import_archive_preview_does_not_modify_archive(client):
    existing_entry_data = valid_entry_data()
    existing_entry_data["title"] = "Existing Entry"

    existing_archive = PortableArchive(
        format="wasabi-archive",
        version=1,
        exported_at="2026-09-28T12:34:56Z",
        entries=[PortableArchiveEntry(**existing_entry_data)],
    )

    restore_archive(existing_archive)

    imported_entry_data = valid_entry_data()
    imported_entry_data["id"] = "550e8400-e29b-41d4-a716-446655440001"
    imported_entry_data["title"] = "Imported Entry"

    imported_archive_data = {
        "format": "wasabi-archive",
        "version": 1,
        "exported_at": "2026-09-28T12:34:56Z",
        "entries": [imported_entry_data],
    }

    response = client.post(
        "/archive/import/preview",
        content=json.dumps(imported_archive_data),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 200

    restored = export_archive()

    assert len(restored.entries) == 1
    assert restored.entries[0].id == existing_archive.entries[0].id
    assert restored.entries[0].title == "Existing Entry"


def test_import_archive_endpoint_restores_archive(client):
    response = client.post(
        "/archive/import",
        content=json.dumps(valid_archive_data()),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 200
    assert response.json() == {"imported_count": 1}

    restored = export_archive()

    assert len(restored.entries) == 1
    assert restored.entries[0].id == valid_entry_data()["id"]
    assert restored.entries[0].title == "Example Title"


def test_import_archive_endpoint_rejects_invalid_archive(client):
    response = client.post(
        "/archive/import",
        content=json.dumps({
            "format": "wasabi-archive",
            "version": 999,
            "exported_at": "2026-09-28T12:34:56Z",
            "entries": [],
        }),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 400


def test_import_archive_preview_rejects_invalid_archive(client):
    response = client.post(
        "/archive/import/preview",
        content=json.dumps({
            "format": "wasabi-archive",
            "version": 999,
            "exported_at": "2026-09-28T12:34:56Z",
            "entries": [],
        }),
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 400
