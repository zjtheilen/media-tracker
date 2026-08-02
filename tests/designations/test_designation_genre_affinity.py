from models.services.designation_rules import evaluate_boundary_explorer


def test_boundary_explorer_uses_genre_affinity():

    profile = {
        "genreAffinity": {
            "experimental": 1.0,
            "surreal": 1.0,
            "sci-fi": 1.0,
            "horror": 1.0,
        },
        "universalAverages": {
            "originality": 10,
        },
    }

    result = evaluate_boundary_explorer(profile)

    assert result > 50


def test_boundary_explorer_low_without_genre_affinity():

    profile = {
        "genreAffinity": {},
        "universalAverages": {},
    }

    result = evaluate_boundary_explorer(profile)

    assert result == 0
