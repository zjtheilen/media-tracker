import copy

import pytest

from models.scoring_profile import (
    MEDIA_SCORING_PROFILES,
    UNIVERSAL_SCORING_PROFILE,
    get_universal_categories,
)


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
