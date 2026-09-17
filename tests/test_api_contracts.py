import copy
import sqlite3

import pytest

from models.scoring_profile import (
    MEDIA_SCORING_PROFILES,
    UNIVERSAL_SCORING_PROFILE,
    get_universal_categories,
)
from models.services.archive_statistics import calculate_monthly_average_score


@pytest.mark.api
def test_scoring_profile_contract(client):
    response = client.get("/scoring-profile")

    assert response.status_code == 200

    data = response.json()

    assert set(data) == {"universal", "media"}

    assert set(data["universal"]) == {"categories", "weights"}
    assert data["universal"]["categories"] == get_universal_categories()
    assert data["universal"]["weights"] == UNIVERSAL_SCORING_PROFILE

    assert data["media"] == MEDIA_SCORING_PROFILES


@pytest.mark.api
def test_stats_average_score_excludes_unscored_entries(
    client,
    valid_game_payload,
):
    first_payload = copy.deepcopy(valid_game_payload)

    second_payload = copy.deepcopy(valid_game_payload)
    second_payload["title"] = "Second Scored Entry"

    first_response = client.post("/entries/", json=first_payload)
    second_response = client.post("/entries/", json=second_payload)

    assert first_response.status_code == 200
    assert second_response.status_code == 200

    scored_score = first_response.json()["total_score"]

    conn = sqlite3.connect("test_database.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO entries (
            title,
            media_type,
            genres,
            notes,
            completion_status,
            total_score
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            "Unscored Entry",
            "game",
            '["horror"]',
            "Not yet evaluated",
            "completed",
            None,
        ),
    )

    conn.commit()
    conn.close()

    response = client.get("/stats/")

    assert response.status_code == 200

    data = response.json()

    assert data["total_entries"] == 3
    assert data["average_score"] == scored_score
    assert data["media_type_counts"]["game"] == 3


@pytest.mark.api
def test_genre_stats_contract(
    client,
    valid_game_payload,
    valid_book_payload,
):
    game_payload = copy.deepcopy(valid_game_payload)

    second_game_payload = copy.deepcopy(valid_game_payload)
    second_game_payload["title"] = "Silent Hill 3"

    book_payload = copy.deepcopy(valid_book_payload)
    book_payload["genres"] = ["sci-fi"]

    client.post("/entries/", json=game_payload)
    client.post("/entries/", json=second_game_payload)
    client.post("/entries/", json=book_payload)

    response = client.get("/genre-stats")

    assert response.status_code == 200

    data = response.json()

    assert set(data) == {
        "summary",
        "top_genres",
        "genre_combinations",
        "media_affinity",
    }

    assert data["summary"]["unique_genres"] == 2
    assert data["summary"]["total_genre_assignments"] == 3

    assert len(data["top_genres"]) == 1
    assert data["top_genres"][0]["genre"] == "horror"
    assert data["top_genres"][0]["count"] == 2
    assert isinstance(data["top_genres"][0]["average_score"], (int, float))

    assert data["genre_combinations"] == []

    assert data["media_affinity"]["horror"]["game"]["count"] == 2
    assert data["media_affinity"]["sci-fi"]["book"]["count"] == 1


@pytest.mark.api
def test_archive_profile_temporal_evidence_contract(
    client,
    valid_game_payload,
):
    game_payload = copy.deepcopy(valid_game_payload)
    game_payload["date_consumed"] = "2026-09-15"

    response = client.post("/entries/", json=game_payload)

    assert response.status_code == 200

    response = client.get("/archive-profile")

    assert response.status_code == 200

    data = response.json()

    assert data["monthlyArchiveActivity"] == {
        "2026-09": 1,
    }

    assert data["monthlyMediaDistribution"] == {
        "2026-09": {
            "video": 0,
            "game": 1,
            "book": 0,
        },
    }


def test_calculate_monthly_average_score():
    entries = [
        {
            "date_consumed": "2026-01-10",
            "total_score": 80,
        },
        {
            "date_consumed": "2026-01-20",
            "total_score": 100,
        },
        {
            "date_consumed": "2026-02-10",
            "total_score": 60,
        },
    ]

    assert calculate_monthly_average_score(entries) == {
        "2026-01": 90.0,
        "2026-02": 60.0,
    }


def test_calculate_monthly_average_score_ignores_unscored_entries():
    entries = [
        {
            "date_consumed": "2026-01-10",
            "total_score": 80,
            "universal_scores": {"depth": 8},
        },
        {
            "date_consumed": "2026-01-20",
            "total_score": 0,
            "universal_scores": {},
        },
        {
            "date_consumed": "2026-02-10",
            "total_score": 60,
            "universal_scores": {"depth": 6},
        },
    ]

    assert calculate_monthly_average_score(entries) == {
        "2026-01": 80.0,
        "2026-02": 60.0,
    }
