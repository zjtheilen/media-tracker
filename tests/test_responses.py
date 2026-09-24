from datetime import date

from models.responses import row_to_entry_response


def test_row_to_entry_response_from_json_strings():
    row = {
        "id": "test-1",
        "title": "Test Game",
        "media_type": "game",
        "genres": '["horror", "action"]',
        "scores": '{"depth": 8, "craft": 9}',
        "notes": "A test entry",
        "date_consumed": "2026-09-01",
        "completion_status": "completed",
    }

    result = row_to_entry_response(row)

    assert result.id == "test-1"
    assert result.title == "Test Game"
    assert result.media_type == "game"
    assert result.genres == ["horror", "action"]
    assert result.notes == "A test entry"
    assert result.date_consumed == date(2026, 9, 1)
    assert result.completion_status == "completed"

    assert [
        {"category": score.category, "value": score.value}
        for score in result.scores
    ] == [
        {"category": "depth", "value": 8},
        {"category": "craft", "value": 9},
    ]


def test_row_to_entry_response_from_structured_values():
    row = {
        "id": "test-2",
        "title": "Structured Entry",
        "media_type": "book",
        "genres": ["horror", "surreal"],
        "scores": {
            "depth": 9,
            "craft": 8,
        },
        "notes": None,
        "date_consumed": None,
        "completion_status": "completed",
    }

    result = row_to_entry_response(row)

    assert result.id == "test-2"
    assert result.genres == ["horror", "surreal"]
    assert result.notes is None
    assert result.date_consumed is None

    assert [
        {"category": score.category, "value": score.value}
        for score in result.scores
    ] == [
        {"category": "depth", "value": 9},
        {"category": "craft", "value": 8},
    ]


def test_row_to_entry_response_with_empty_values():
    row = {
        "id": "test-3",
        "title": "Empty Entry",
        "media_type": "game",
        "genres": None,
        "scores": None,
        "notes": None,
        "date_consumed": None,
        "completion_status": "planned",
    }

    result = row_to_entry_response(row)

    assert result.genres == []
    assert result.scores == []
    assert result.notes is None
    assert result.date_consumed is None
    assert result.completion_status == "planned"