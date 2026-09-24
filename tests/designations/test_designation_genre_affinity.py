from models.services.designation_rules import evaluate_boundary_explorer


def test_boundary_explorer_uses_boundary_evidence():

    profile = {
        "entryCount": 40,
        "entries": [
            {
                "genres": ["experimental"],
                "media_type": "video",
            },
            {
                "genres": ["surreal"],
                "media_type": "book",
            },
            {
                "genres": ["sci-fi"],
                "media_type": "game",
            },
            {
                "genres": ["experimental"],
                "media_type": "video",
            },
            {
                "genres": ["surreal"],
                "media_type": "book",
            },
            {
                "genres": ["sci-fi"],
                "media_type": "game",
            },
            {
                "genres": ["experimental"],
                "media_type": "video",
            },
            {
                "genres": ["surreal"],
                "media_type": "book",
            },
            {
                "genres": ["sci-fi"],
                "media_type": "game",
            },
            {
                "genres": ["experimental"],
                "media_type": "video",
            },
            {
                "genres": ["surreal"],
                "media_type": "book",
            },
            {
                "genres": ["sci-fi"],
                "media_type": "game",
            },
        ],
        "universalAverages": {
            "originality": 10,
        },
    }

    result = evaluate_boundary_explorer(profile)

    assert result == 100


def test_boundary_explorer_low_without_genre_affinity():

    profile = {
        "genreAffinity": {},
        "universalAverages": {},
    }

    result = evaluate_boundary_explorer(profile)

    assert result == 0


def test_boundary_explorer_sampling_without_sustained_exploration():

    profile = {
        "entryCount": 40,
        "entries": [
            {
                "genres": ["experimental"],
                "media_type": "video",
            },
        ],
        "universalAverages": {
            "originality": 10,
        },
    }

    result = evaluate_boundary_explorer(profile)

    assert result == 33


def test_boundary_explorer_returns_zero_without_boundary_entries():

    profile = {
        "entryCount": 40,
        "entries": [
            {
                "genres": ["horror"],
                "media_type": "video",
            },
            {
                "genres": ["action"],
                "media_type": "game",
            },
        ],
        "universalAverages": {
            "originality": 10,
        },
    }

    result = evaluate_boundary_explorer(profile)

    assert result == 0
