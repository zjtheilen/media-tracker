from models.services.identity_scorer import evaluate_identity_scores


def test_identities_endpoint_returns_empty_when_no_identity_is_eligible(client):

    response = client.get("/identities")

    assert response.status_code == 200

    data = response.json()

    assert data == []


def test_identity_endpoint_returns_null_when_no_identity_is_eligible(client):

    response = client.get("/identity")

    assert response.status_code == 200

    assert response.json() is None


def test_identities_endpoint_returns_eligible_identities(
    client,
    valid_game_payload,
):

    # Add enough entries to satisfy the Identity minimum-entry requirements.
    for i in range(30):
        payload = {
            **valid_game_payload,
            "title": f"Identity Test Game {i}",
        }

        response = client.post("/entries/", json=payload)
        assert response.status_code in (200, 201)

    response = client.get("/identities")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) > 0

    assert "id" in data[0]
    assert "score" in data[0]

    assert isinstance(data[0]["id"], str)
    assert isinstance(data[0]["score"], (int, float))


def test_identity_endpoint_returns_primary_identity(
    client,
    valid_game_payload,
):

    # Add enough entries to satisfy the Identity minimum-entry requirements.
    for _ in range(30):
        response = client.post("/entries/", json=valid_game_payload)
        assert response.status_code in (200, 201)

    response = client.get("/identity")

    assert response.status_code == 200

    data = response.json()

    assert data is not None
    assert "id" in data
    assert "score" in data
    assert "breakdown" in data
    assert "top_traits" in data

    assert "data_sufficiency" in data
    assert isinstance(data["data_sufficiency"], (int, float))
    assert 0 <= data["data_sufficiency"] <= 1


def test_identity_below_minimum_is_excluded_and_at_minimum_is_eligible():

    profile = {
        "entryCount": 19,
        "universalAverages": {
            "depth": 10,
            "emotional_impact": 10,
            "engagement": 10,
            "craft": 10,
        },
        "mediaAverages": {
            "gameplay_mechanics": 10,
        },
    }

    results = evaluate_identity_scores(profile)

    identity_ids = [result["id"] for result in results]

    assert "breadth_philosophy" in identity_ids
    assert "interpretive_philosophy" not in identity_ids
    assert "exploratory_philosophy" not in identity_ids

    profile["entryCount"] = 20

    results = evaluate_identity_scores(profile)

    identity_ids = [result["id"] for result in results]

    assert "breadth_philosophy" in identity_ids
    assert "interpretive_philosophy" in identity_ids
    assert "exploratory_philosophy" in identity_ids


def test_identity_below_minimum_entries_is_excluded():

    profile = {
        "entryCount": 5,
        "universalAverages": {
            "originality": 10,
            "depth": 10,
        },
    }

    results = evaluate_identity_scores(profile)

    identity_ids = {result["id"] for result in results}

    assert "breadth_philosophy" not in identity_ids
    assert "interpretive_philosophy" not in identity_ids
    assert "exploratory_philosophy" not in identity_ids