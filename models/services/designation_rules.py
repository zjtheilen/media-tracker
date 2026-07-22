from .designation_utils import trait_strength, genre_weight


def evaluate_boundary_explorer(profile):

    score = 0

    score += genre_weight("experimental", profile) * 20
    score += genre_weight("surreal", profile) * 20
    score += genre_weight("sci-fi", profile) * 15
    score += genre_weight("horror", profile) * 10

    score += trait_strength(profile["universalAverages"]["originality"]) * 20
    score += trait_strength(profile["universalAverages"]["depth"]) * 15

    return min(score, 100)


def evaluate_engagement_architect(profile):

    score = 0

    score += trait_strength(profile["universalAverages"]["engagement"]) * 35

    score += trait_strength(profile["universalAverages"]["craft"]) * 25

    score += trait_strength(profile["mediaAverages"].get("gameplay_mechanics", 0)) * 20

    score += trait_strength(profile["mediaAverages"].get("narrative_pacing", 0)) * 20

    return min(score, 100)


def evaluate_deep_diver(profile):

    score = 0

    score += trait_strength(profile["universalAverages"]["depth"]) * 35

    score += min(profile["entryCount"] / 30, 1) * 30

    score += trait_strength(profile["averageScore"] / 10) * 20

    score += genre_weight("psychological", profile) * 15

    return min(score, 100)


DESIGNATION_RULES = [
    {
        "id": "boundary_explorer",
        "title": "The Boundary Explorer",
        "description": "Drawn toward unfamiliar ideas, altered realities, speculative systems, and experiences that push against conventional boundaries.",
        "evaluate": evaluate_boundary_explorer,
        "icon": "◈",
    },
    {
        "id": "engagement_architect",
        "title": "The Engagement Architect",
        "description": "Consistently values works that maintain momentum through strong execution, pacing, and carefully designed systems.",
        "evaluate": evaluate_engagement_architect,
        "icon": "◈",
    },
    {
        "id": "deep_diver",
        "title": "The Deep Diver",
        "description": "Prefers experiences that reward sustained attention, layered interpretation, and repeated exploration.",
        "evaluate": evaluate_deep_diver,
        "icon": "◈",
    },
]
