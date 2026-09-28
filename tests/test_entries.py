import copy

import pytest


def valid_completion_statuses():
    return ["completed", "in-progress", "dropped", "planned"]


@pytest.mark.api
def test_create_entry_success(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "Silent Hill 2"
    assert data["media_type"] == "game"


@pytest.mark.api
def test_get_entry_not_found(client, valid_game_payload):
    response = client.get("/entries/-1")

    assert response.status_code == 404

    data = response.json()
    assert "Entry not found" in data["detail"]


@pytest.mark.api
def test_get_entry(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    create_response = client.post("/entries/", json=payload)

    created_entry = create_response.json()
    entry_id = created_entry["id"]

    response = client.get(f"/entries/{entry_id}")

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == entry_id
    assert data["title"] == "Silent Hill 2"


@pytest.mark.api
@pytest.mark.regression
def test_update_entry(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    create_response = client.post("/entries/", json=payload)

    assert create_response.status_code == 200

    created_entry = create_response.json()
    entry_id = created_entry["id"]

    updated_payload = copy.deepcopy(valid_game_payload)
    updated_payload["title"] = "Silent Hill 2 Remake"
    updated_payload["notes"] = "Still peak psychological horror"

    response = client.put(f"/entries/{entry_id}", json=updated_payload)

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Entry updated"
    assert data["entry_id"] == entry_id

    get_response = client.get(f"/entries/{entry_id}")

    assert get_response.status_code == 200

    updated_entry = get_response.json()

    assert updated_entry["title"] == "Silent Hill 2 Remake"
    assert updated_entry["notes"] == "Still peak psychological horror"
    returned_scores = {
        score["category"]: score["value"] for score in updated_entry["scores"]
    }

    assert returned_scores == updated_payload["scores"]


@pytest.mark.api
def test_delete_entry(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    create_response = client.post("/entries/", json=payload)

    assert create_response.status_code == 200

    created_entry = create_response.json()
    entry_id = created_entry["id"]

    response = client.delete(f"/entries/{entry_id}")

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "Entry deleted"
    assert data["entry_id"] == entry_id

    get_response = client.get(f"/entries/{entry_id}")

    assert get_response.status_code == 404


@pytest.mark.api
@pytest.mark.regression
def test_create_entry_without_consumed_date_preserves_null(
    client, valid_game_payload
):
    payload = copy.deepcopy(valid_game_payload)
    payload["date_consumed"] = None

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["date_consumed"] is None


@pytest.mark.api
def test_get_entries_pagination(client, valid_game_payload):
    for index in range(3):
        payload = copy.deepcopy(valid_game_payload)
        payload["title"] = f"Game {index}"
        client.post("/entries/", json=payload)

    response = client.get("/entries/?page=1&limit=2")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 2


@pytest.mark.api
def test_get_entries_pagination_invalid_parameters(client):
    response = client.get("/entries/?page=0")

    assert response.status_code == 400
    assert response.json()["detail"] == "Page must be at least 1"

    response = client.get("/entries/?limit=0")

    assert response.status_code == 400
    assert response.json()["detail"] == "Limit must be at least 1"
