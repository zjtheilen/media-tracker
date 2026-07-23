from models.services.archive_engine import build_archive_profile


def test_build_archive_profile():

    entries = [
        {
            "title": "Silent Hill 2",
            "media_type": "game",
            "genres": ["horror"],
            "total_score": 92,
            "universal_scores": {
                "depth": 10,
                "originality": 9,
            },
            "media_scores": {
                "art_atmosphere": 10,
                "gameplay_mechanics": 9,
            },
        }
    ]

    result = build_archive_profile(entries)

    assert result["entryCount"] == 1

    assert result["universalAverages"]["depth"] == 10

    assert result["mediaAverages"]["art_atmosphere"] == 10

    assert result["genreDistribution"]["horror"]["count"] == 1

    assert result["designationConfidence"] == 9.7

    assert result["classificationBasis"]["primary"]["name"] == "Depth"

    assert result["classificationBasis"]["media"]["name"] == "Art Atmosphere"

    assert result["designations"][0]["id"] == "deep_diver"

    assert result["primaryDesignation"]["id"] == "deep_diver"

    assert result["findings"][0]["id"] == "concept-driven"


def test_archive_profile_shape():

    entries = [
        {
            "title": "Coherence",
            "media_type": "video",
            "genres": ["psychological", "mystery"],
            "total_score": 95,
            "universal_scores": {
                "depth": 9,
                "originality": 10,
                "craft": 9,
                "emotional_impact": 8,
                "engagement": 10,
            },
            "media_scores": {
                "art_atmosphere": 10,
                "narrative_pacing": 9,
            },
        }
    ]

    result = build_archive_profile(entries)

    required_keys = {
        "entries",
        "entryCount",
        "universalAverages",
        "mediaAverages",
        "mediaDistribution",
        "genreDistribution",
        "averageScore",
        "highestRatedEntry",
        "lowestRatedEntry",
        "topUniversal",
        "topMedia",
        "designationConfidence",
        "classificationBasis",
        "designations",
        "primaryDesignation",
        "findings",
    }

    assert required_keys.issubset(result.keys())
