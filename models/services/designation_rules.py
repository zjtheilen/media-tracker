from .designation_utils import genre_weight, trait_strength


def evaluate_boundary_explorer(profile):

    score = 0

    score += genre_weight("experimental", profile) * 100
    score += genre_weight("surreal", profile) * 75
    score += genre_weight("sci-fi", profile) * 50
    score += genre_weight("horror", profile) * 25

    score += trait_strength(profile["universalAverages"].get("originality", 0)) * 25

    return min(score, 100)


def evaluate_engagement_architect(profile):

    score = 0

    score += trait_strength(profile["universalAverages"].get("engagement", 0)) * 40

    score += trait_strength(profile["universalAverages"].get("craft", 0)) * 25

    score += trait_strength(profile["mediaAverages"].get("gameplay_mechanics", 0)) * 20

    score += trait_strength(profile["mediaAverages"].get("narrative_pacing", 0)) * 15

    return min(score, 100)


def evaluate_deep_diver(profile):

    score = 0

    score += trait_strength(profile["universalAverages"].get("depth", 0)) * 45

    score += (
        trait_strength(profile["universalAverages"].get("emotional_impact", 0)) * 20
    )

    score += trait_strength(profile["averageScore"] / 10) * 20

    score += genre_weight("psychological", profile) * 15

    return min(score, 100)


def evaluate_curator(profile):

    score = 0

    score += trait_strength(
        profile["universalAverages"].get("craft", 0)
    ) * 25

    score += trait_strength(
        profile["universalAverages"].get("presentation", 0)
    ) * 25

    score += min(profile["entryCount"] / 50, 1) * 25

    score += profile.get("genreDiversityScore", 0) * 25

    return min(score, 100)


DESIGNATION_RULES = [
    {
        "id": "boundary_explorer",
        "title": "The Boundary Explorer",
        "description": (
            "Drawn toward unfamiliar ideas, altered realities, "
            "speculative systems, and experiences that push against "
            "conventional boundaries."
        ),
        "evaluate": evaluate_boundary_explorer,
        "icon": "◈",
        "traits": [
            "originality",
            "depth",
        ],
        "genres": [
            "experimental",
            "surreal",
            "sci-fi",
            "horror",
        ],
        "recommendation_bias": [
            "unusual concepts",
            "genre hybrids",
            "experimental storytelling",
        ],
    },
    {
        "id": "curator",
        "title": "The Curator",
        "description": (
            "Builds a broad and intentional archive, "
            "balancing exploration, craftsmanship, and variety "
            "across different forms of media."
        ),
        "evaluate": evaluate_curator,
        "icon": "◈",
        "traits": [
            "craft",
            "presentation",
        ],
        "genres": [],
        "recommendation_bias": [
            "hidden gems",
            "underrepresented genres",
            "cross-medium experiences",
        ],
    },
    {
        "id": "engagement_architect",
        "title": "The Engagement Architect",
        "description": (
            "Consistently values works that maintain momentum "
            "through strong execution, pacing, and carefully designed systems."
        ),
        "evaluate": evaluate_engagement_architect,
        "icon": "◈",
        "traits": [
            "engagement",
            "craft",
        ],
        "genres": [
            "action",
            "adventure",
            "thriller",
        ],
        "recommendation_bias": [
            "strong pacing",
            "polished execution",
            "mechanically satisfying experiences",
        ],
    },
    {
        "id": "deep_diver",
        "title": "The Deep Diver",
        "description": (
            "Prefers experiences that reward sustained attention, "
            "layered interpretation, and repeated exploration."
        ),
        "evaluate": evaluate_deep_diver,
        "icon": "◈",
        "traits": [
            "depth",
            "emotional_impact",
        ],
        "genres": [
            "psychological",
            "mystery",
            "drama",
            "horror",
        ],
        "recommendation_bias": [
            "layered narratives",
            "ambiguous endings",
            "re-watchable experiences",
        ],
    },
]
