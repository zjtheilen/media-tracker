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

    assert any(finding["id"] == "concept-driven" for finding in result["findings"])

    assert any(
        observation["id"] == "interpretive-depth"
        for observation in result["observations"]
    )


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


def test_archive_profile_contains_observation_summary():

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

    assert result["observationSummary"] is not None
    assert "observations" in result
    assert len(result["observations"]) > 0

    assert "traits" in result["observations"][0]
    assert "genres" in result["observations"][0]
    assert "relatedDesignations" in result["observations"][0]
    assert "confidence" in result["observations"][0]


def test_observation_summary_exists():

    entries = [
        {
            "title": "Test Archive Entry",
            "media_type": "movie",
            "genres": [
                "experimental",
                "surreal",
            ],
            "total_score": 95,
            "universal_scores": {
                "originality": 10,
                "depth": 10,
            },
            "media_scores": {
                "art_atmosphere": 10,
            },
        }
    ]

    result = build_archive_profile(entries)

    assert result["observations"]


def test_archive_profile_includes_identities():

    entries = [
        {
            "title": "Experimental Film",
            "total_score": 95,
            "media_type": "video",
            "genres": ["experimental"],
            "universal_scores": {
                "originality": 10,
                "depth": 9,
                "novelty": 9,
            },
            "media_scores": {
                "art_atmosphere": 10,
            },
        }
        for _ in range(20)
    ]

    profile = build_archive_profile(entries)

    assert "identities" in profile
    assert len(profile["identities"]) > 0


def test_archive_profile_identities_are_sorted():

    entries = [
        {
            "title": "Experimental Film",
            "total_score": 95,
            "media_type": "video",
            "genres": ["experimental"],
            "universal_scores": {
                "originality": 10,
                "depth": 10,
                "novelty": 10,
            },
            "media_scores": {
                "art_atmosphere": 10,
            },
        }
        for _ in range(30)
    ]

    profile = build_archive_profile(entries)

    identities = profile["identities"]

    scores = [
        identity["score"]
        for identity in identities
    ]

    assert scores == sorted(scores, reverse=True)


def test_archive_profile_keeps_designations_and_identities_separate():

    entries = [
        {
            "title": "Experimental Film",
            "total_score": 95,
            "media_type": "video",
            "genres": ["experimental"],
            "universal_scores": {
                "originality": 10,
                "depth": 10,
            },
            "media_scores": {
                "art_atmosphere": 10,
            },
        }
        for _ in range(30)
    ]

    profile = build_archive_profile(entries)

    assert "designations" in profile
    assert "identities" in profile

    assert profile["designations"] != profile["identities"]


def test_archive_profile_handles_missing_media_scores():
    
    entries = [
        {
            "title": "Experimental Film",
            "total_score": 95,
            "media_type": "video",
            "genres": ["experimental"],
            "universal_scores": {
                "originality": 10,
                "depth": 10,
            },
        }
        for _ in range(30)
    ]
    
    profile = build_archive_profile(entries)
    
    assert profile["topMedia"] == [("none", 0)]


def test_archive_profile_builds_all_profile_sections():

    entries = [
        {
            "title": "Experimental Film",
            "total_score": 95,
            "media_type": "video",
            "genres": ["experimental"],
            "universal_scores": {
                "originality": 10,
                "depth": 10,
            },
            "media_scores": {
                "art_atmosphere": 10,
            },
        }
        for _ in range(30)
    ]

    profile = build_archive_profile(entries)

    assert profile["designations"]
    assert profile["identities"]
    assert profile["observations"]
    assert profile["findings"]

    assert profile["primaryDesignation"] is not None
    assert profile["archiveSummary"] is not None