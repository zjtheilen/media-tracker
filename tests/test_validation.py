import copy

def test_invalid_media_type(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)
    payload["media_type"] = "anime"

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert data["detail"] == "Invalid media type: anime"


def test_invalid_score(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)
    payload["scores"]["craft"] = 0
    payload["scores"]["depth"] = 11

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "between 1 and 10" in data["detail"]


def test_invalid_genres(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    payload["genres"] = ["shady-queens"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "Invalid genre" in data["detail"]

def test_empty_title(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)
    payload["title"] = ""

    response = client.post("/entries/", json=payload)
    assert response.status_code == 400

    data = response.json()
    assert data["detail"] == "Title cannot be empty"

def test_missing_score_categories(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    payload["scores"] = {
        "craft": 1,
        "depth": 2
    }

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "Missing scoring categories" in data["detail"]

def test_invalid_completion_status(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    payload["completion_status"] = "In Queue"

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()
    assert "Invalid completion status" in data["detail"]

def test_extra_score_categories(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload).copy()

    payload["scores"]["banana"] = 7

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400

    data = response.json()

    assert "Invalid scoring categories" in data["detail"]