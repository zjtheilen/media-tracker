from models.services.identity_scorer import evaluate_identity_scores


def test_identities_endpoint(client):
    response = client.get("/identities")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) > 0

    assert "id" in data[0]
    assert "score" in data[0]

    assert isinstance(data[0]["id"], str)
    assert isinstance(data[0]["score"], (int, float))


def test_identity_endpoint(client):

    response = client.get("/identity")

    assert response.status_code == 200

    data = response.json()

    assert "id" in data
    assert "score" in data
    assert "breakdown" in data
    assert "top_traits" in data


def get_primary_identity(profile):

    results = evaluate_identity_scores(profile)

    if not results:
        return None

    print(results[0].keys())

    return results[0]
