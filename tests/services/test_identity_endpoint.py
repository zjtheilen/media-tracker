def test_identity_endpoint(client):

    response = client.get("/identities")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)
    assert len(data) > 0

    assert "id" in data[0]
    assert "score" in data[0]

    assert isinstance(data[0]["id"], str)
    assert isinstance(data[0]["score"], (int, float))