def test_archive_profile_endpoint(client):

    response = client.get("/archive-profile")

    assert response.status_code == 200

    data = response.json()

    assert "designations" in data
    assert "primaryDesignation" in data
    assert "findings" in data


def test_archive_profile_contains_designations(client):

    response = client.get("/archive-profile")

    assert response.status_code == 200

    data = response.json()

    assert "designations" in data
    assert "primaryDesignation" in data
    assert "classificationBasis" in data


def test_archive_profile_contains_analysis(client):

    response = client.get("/archive-profile")

    assert response.status_code == 200

    data = response.json()

    assert "designations" in data
    assert "primaryDesignation" in data
    assert "findings" in data


def test_archive_profile_contains_interpretation(client):

    response = client.get("/archive-profile")

    assert response.status_code == 200

    data = response.json()

    assert "archiveSummary" in data
    assert "primaryTrait" in data
    assert "secondaryTrait" in data
    assert "mediumSignature" in data
    assert "designationConfidenceLabel" in data
