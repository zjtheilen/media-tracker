import copy


def valid_completion_statuses():
    return ["completed", "in_progress", "dropped", "planned"]


def test_create_entry_success(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "Silent Hill 2"
    assert data["media_type"] == "game"


def test_get_entry_not_found(client, valid_game_payload):
    response = client.get("/entries/-1")

    assert response.status_code == 404

    data = response.json()
    assert "Entry not found" in data["detail"]


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

    updated_entry = get_response.json()

    assert updated_entry["title"] == "Silent Hill 2 Remake"
    assert updated_entry["notes"] == "Still peak psychological horror"


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
