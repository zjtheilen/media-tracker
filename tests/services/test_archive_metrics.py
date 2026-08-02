from models.services.archive_engine import build_archive_profile


def test_archive_profile_contains_genre_affinity():

    entries = [
        {
            "title": "Test Horror",
            "media_type": "video",
            "genres": ["horror"],
            "total_score": 90,
            "universal_scores": {
                "originality": 10,
            },
            "media_scores": {},
        }
    ]

    profile = build_archive_profile(entries)

    assert "genreAffinity" in profile
    assert profile["genreAffinity"]["horror"] == 1.0


def test_archive_profile_handles_single_trait():

    entries = [
        {
            "title": "Minimal Entry",
            "media_type": "video",
            "genres": ["horror"],
            "total_score": 90,
            "universal_scores": {
                "originality": 10,
            },
            "media_scores": {},
        }
    ]

    profile = build_archive_profile(entries)

    assert profile["topUniversal"][0][0] == "originality"
    assert profile["topUniversal"][1][0] == "none"
