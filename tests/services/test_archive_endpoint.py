from models.services.scoring_rubric import get_metric_meaning


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
    assert "designationBasis" in data


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
    assert "mediaSignature" in data
    assert "designationConfidenceLabel" in data


def test_get_entry_includes_score_rubric_meanings(client):
    payload = {
        "title": "Test Game",
        "media_type": "game",
        "genres": ["horror"],
        "scores": {
            "emotional_impact": 9,
            "depth": 9,
            "craft": 9,
            "engagement": 9,
            "presentation": 9,
            "originality": 9,
            "gameplay_mechanics": 9,
            "level_design_progression": 9,
            "replayability_systems": 9,
            "art_atmosphere": 9,
        },
        "notes": "",
    }

    create_response = client.post("/entries/", json=payload)

    assert create_response.status_code == 200

    created = create_response.json()
    entry_id = created["id"]

    response = client.get(f"/entries/{entry_id}")

    assert response.status_code == 200

    data = response.json()

    depth_score = next(
        score for score in data["scores"] if score["category"] == "depth"
    )

    assert depth_score["value"] == 9
    assert depth_score["meaning"] == (
        "Excellent — exceptional quality with very little meaningful room for improvement."
    )
    assert depth_score["metricMeaning"] == get_metric_meaning("depth", 9)


def test_scoring_rubric_endpoint(client):
    response = client.get("/scoring-rubric")

    assert response.status_code == 200

    data = response.json()

    assert "depth" in data
    assert "craft" in data
    assert "originality" in data

    assert data["depth"]["9"] == (
        "Ask whether the work is exceptionally rich in ideas, themes, or layers, "
        "repeatedly rewarding analysis and revealing meaningful depth with very few shortcomings."
    )
