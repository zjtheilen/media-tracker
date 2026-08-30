from models.services.designation_utils import (
    calculate_boundary_exploration_evidence,
    get_boundary_exploration_requirement,
)
from models.services.profile_metrics import genre_diversity_score


def test_genre_diversity_score_returns_zero_without_genres():

    profile = {"genreDistribution": {}}

    result = genre_diversity_score(profile)

    assert result == 0


def test_genre_diversity_score_calculates_genre_breadth():

    profile = {
        "genreDistribution": {
            "horror": {
                "count": 5,
                "percentage": 50,
            },
            "sci-fi": {
                "count": 3,
                "percentage": 30,
            },
            "experimental": {
                "count": 2,
                "percentage": 20,
            },
        }
    }

    result = genre_diversity_score(profile)

    assert result == 0.3


def test_genre_diversity_score_caps_at_one():

    profile = {
        "genreDistribution": {
            "horror": {},
            "sci-fi": {},
            "fantasy": {},
            "comedy": {},
            "drama": {},
            "action": {},
            "mystery": {},
            "romance": {},
            "documentary": {},
            "animation": {},
            "western": {},
        }
    }

    result = genre_diversity_score(profile)

    assert result == 1


def test_boundary_exploration_requirement_uses_two_entry_minimum():

    assert get_boundary_exploration_requirement(1) == 2
    assert get_boundary_exploration_requirement(40) == 2
    assert get_boundary_exploration_requirement(67) == 3


def test_boundary_exploration_evidence_detects_sampling():

    profile = {
        "entryCount": 40,
        "entries": [
            {
                "genres": ["experimental"],
                "media_type": "video",
            },
        ],
    }

    result = calculate_boundary_exploration_evidence(profile)

    assert result["qualifying_entry_count"] == 1
    assert result["required_entry_count"] == 2
    assert result["sampling"] is True
    assert result["sustained"] is False


def test_boundary_exploration_evidence_detects_sustained_exploration():

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
        ],
    }

    result = calculate_boundary_exploration_evidence(profile)

    assert result["qualifying_entry_count"] == 2
    assert result["required_entry_count"] == 2
    assert result["sampling"] is True
    assert result["sustained"] is True


def test_boundary_exploration_evidence_counts_media_types_equally():

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
                "genres": ["psychological"],
                "media_type": "game",
            },
        ],
    }

    result = calculate_boundary_exploration_evidence(profile)

    assert result["boundary_media_types"] == [
        "book",
        "game",
        "video",
    ]
    assert result["boundary_media_type_count"] == 3


def test_boundary_exploration_evidence_ignores_non_boundary_genres():

    profile = {
        "entryCount": 40,
        "entries": [
            {
                "genres": ["horror"],
                "media_type": "video",
            },
            {
                "genres": ["action", "adventure"],
                "media_type": "game",
            },
        ],
    }

    result = calculate_boundary_exploration_evidence(profile)

    assert result["qualifying_entry_count"] == 0
    assert result["sampling"] is False
    assert result["sustained"] is False
