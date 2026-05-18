from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def valid_game_payload():
    return {
        "title": "Silent Hill 2",
        "media_type": "game",
        "genres": ["horror"],
        "scores": {
            "writing": 5,
            "pacing": 4,
            "originality": 5,
            "engagement": 5,
            "thought provoking": 5,
            "emotional impact": 5,
            "sound": 5,
            "gameplay": 4,
            "art": 5,
        },
        "notes": "Peak psychological horror",
        "completion_status": "completed",
    }

def valid_completion_statuses():
    return ["Completed", "In Progress", "Dropped"]

def test_create_entry_success():
    payload = valid_game_payload()

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "Silent Hill 2"
    assert data["media_type"] == "game"


def test_invalid_media_type():
    payload = valid_game_payload()
    payload["media_type"] = "anime"

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert data["detail"] == "Invalid media type: anime"


def test_invalid_score():
    payload = valid_game_payload()
    payload["scores"]["gameplay"] = 0
    payload["scores"]["writing"] = 6

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "between 1 and 5" in data["detail"]


def test_invalid_genres():
    payload = valid_game_payload()

    payload["genres"] = ["shady-queens"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "Invalid genre" in data["detail"]

def test_empty_title():
    payload = valid_game_payload()
    payload["title"] = ""

    response = client.post("/entries/", json=payload)
    assert response.status_code == 400

    data = response.json()
    assert data["detail"] == "Title cannot be empty"

def test_missing_score_categories():
    payload = valid_game_payload()

    payload["scores"] = {
        "writing": 1,
        "gameplay": 2
    }

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "Missing scoring categories" in data["detail"]

def test_invalid_completion_status():
    payload = valid_game_payload()

    payload["completion_status"] = "In Queue"

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "Invalid completion status" in data["detail"]

def test_get_entry_not_found():
    response = client.get("/entries/-1")

    assert response.status_code == 404

    data = response.json()
    assert "Entry not found" in data["detail"]

def test_get_entry():
    payload = valid_game_payload()

    create_response = client.post("/entries/", json=payload)

    created_entry = create_response.json()
    entry_id = created_entry["id"]

    response = client.get(f"/entries/{entry_id}")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == entry_id
    assert data["title"] == "Silent Hill 2"

def test_update_entry():
    pass

def test_delete_entry():
    pass
