import copy


def test_get_genres_returns_200(client):
    response = client.get("/genres/")

    assert response.status_code == 200


def test_get_genres_contains_core(client):
    response = client.get("/genres/")
    data = response.json()

    assert "core" in data
    assert isinstance(data["core"], list)


def test_get_genres_contains_media_specific_lists(client):
    response = client.get("/genres/")
    data = response.json()

    assert "game" in data
    assert "book" in data
    assert "video" in data


def test_core_genre_valid_for_book(client, valid_book_payload):
    payload = copy.deepcopy(valid_book_payload)
    payload["genres"] = ["horror"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200 or response.status_code == 201

    entry = response.json()
    assert entry["genres"] == ["horror"]


def test_game_specific_genre_valid(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)
    payload["genres"] = ["rpg"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200 or response.status_code == 201

    entry = response.json()
    assert entry["genres"] == ["rpg"]


def test_invalid_genre_rejected(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)
    payload["genres"] = ["skateboard"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400
    assert "Invalid genre" in response.text


def test_game_genre_invalid_for_book(client, valid_book_payload):
    payload = copy.deepcopy(valid_book_payload)

    payload["media_type"] = "book"
    payload["genres"] = ["rpg"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400
    assert "Invalid genre" in response.text


def test_empty_genres_rejected(client, valid_book_payload):
    payload = copy.deepcopy(valid_book_payload)

    payload["genres"] = []
    response = client.post("/entries/", json=payload)

    assert response.status_code == 400
    assert "At least one genre is required" in response.text


def test_more_than_three_genres_rejected(client, valid_book_payload):
    payload = copy.deepcopy(valid_book_payload)
    payload["genres"] = ["horror", "thriller", "mystery", "psychological"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 400
    assert "Maximum 3 genres allowed" in response.text


def test_genre_case_normalization(client, valid_game_payload):
    payload = copy.deepcopy(valid_game_payload)

    payload["genres"] = ["HORROR"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200

    entry = response.json()
    assert entry["genres"] == ["horror"]


def test_genre_whitespace_normalization(client, valid_book_payload):
    payload = copy.deepcopy(valid_book_payload)

    payload["genres"] = [" horror "]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200

    entry = response.json()
    assert entry["genres"] == ["horror"]


def test_genre_mixed_case_normalization(client, valid_book_payload):
    payload = copy.deepcopy(valid_book_payload)

    payload["genres"] = ["mEmOiR"]

    response = client.post("/entries", json=payload)

    assert response.status_code == 200

    entry = response.json()
    assert entry["genres"] == ["memoir"]


def test_duplicate_genres_allowed_and_deduplicated(client, valid_book_payload):
    payload = copy.deepcopy(valid_book_payload)

    payload["genres"] = ["horror", "HORROR"]

    response = client.post("/entries/", json=payload)

    assert response.status_code == 200

    entry = response.json()

    assert entry["genres"] == ["horror"]
