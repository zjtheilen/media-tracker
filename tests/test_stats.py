import copy

def test_stats_empty(client):
    response = client.get("/stats/")

    assert response.status_code == 200

    data = response.json()

    assert data["total_entries"] == 0
    assert data["media_type_counts"] == {}
    assert data["genre_counts"] == {}

def test_stats_single_entry(client, valid_game_payload):
    client.post("/entries/", json=valid_game_payload)

    response = client.get("/stats/")

    data = response.json()

    assert data["total_entries"] == 1
    assert data["media_type_counts"]["game"] == 1
    # assert "horror" in data["genre_counts"]
    assert data["genre_counts"]["horror"] == 1

def test_stats_multiple_entries(client, valid_game_payload):
    client.post("/entries/", json=valid_game_payload)

    second = copy.deepcopy(valid_game_payload)
    second["title"] = "Game 2"
    client.post("/entries/", json=second)

    response = client.get("/stats/")
    data = response.json()

    assert data["total_entries"] == 2
    assert data["media_type_counts"]["game"] == 2