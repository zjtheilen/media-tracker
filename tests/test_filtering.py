def test_filter_entries_by_genre(client, valid_game_payload):
    client.post("/entries/", json=valid_game_payload)

    response = client.get("/entries/?genre=horror")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["title"] == "Silent Hill 2"
    assert "horror" in data[0]["genres"]

def test_filter_excludes_non_matching_genre(client, valid_game_payload):
    client.post("/entries/", json=valid_game_payload)

    response = client.get("/entries/?genre=sci-fi")

    assert response.status_code == 200

    data = response.json()
    assert len(data) == 0

def test_filter_returns_only_matching_entries(client, valid_game_payload):
    client.post("/entries/", json=valid_game_payload)

    second = valid_game_payload.copy()
    second["title"] = "Second Game"
    second["genres"] = ["sci-fi"]

    client.post("/entries/", json=second)

    response = client.get("/entries/?genre=horror")
    data = response.json()

    assert len(data) == 1
    assert data[0]["title"] == "Silent Hill 2"

def test_filter_is_case_insensitive(client, valid_game_payload):
    client.post("/entries/", json=valid_game_payload)

    response = client.get("/entries/?genre=HORROR")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1
    assert data[0]["genres"][0] == "horror"

def test_filter_handles_normalized_query(client, valid_game_payload):
    client.post("/entries", json=valid_game_payload)

    response = client.get("/entries/?genre= horror ")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 1