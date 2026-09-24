from .designation_utils import calculate_boundary_exploration_evidence, genre_affinity


def evaluate_boundary_explorer(profile):

    evidence = calculate_boundary_exploration_evidence(profile)

    if not evidence["sampling"]:
        return 0

    prevalence = evidence["boundary_prevalence"]

    if prevalence == 0:
        prevalence_score = 0
    elif prevalence < 0.03:
        prevalence_score = 8
    elif prevalence < 0.10:
        prevalence_score = 16
    elif prevalence < 0.20:
        prevalence_score = 24
    elif prevalence < 0.30:
        prevalence_score = 32
    else:
        prevalence_score = 40

    sustained_score = 25 if evidence["sustained"] else 0

    media_type_count = evidence["boundary_media_type_count"]
    media_breadth_score = min(media_type_count / 3, 1) * 15

    originality = profile.get("universalAverages", {}).get("originality", 0)
    originality_score = (originality / 10) * 20

    return round(
        prevalence_score
        + sustained_score
        + media_breadth_score
        + originality_score,
        2,
    )


def evaluate_engagement_architect(profile):

    score = 0
    traits = profile.get("traits", {})

    score += traits.get("engagement_strength", 0) * 40
    score += traits.get("craft_strength", 0) * 25
    score += traits.get("gameplay_strength", 0) * 20
    score += traits.get("pacing_strength", 0) * 15

    return min(score, 100)


def evaluate_deep_diver(profile):

    score = 0
    traits = profile.get("traits", {})

    score += traits.get("depth_strength", 0) * 45
    score += traits.get("emotional_strength", 0) * 20
    score += traits.get("average_score_strength", 0) * 20

    score += genre_affinity(profile, "psychological") * 15

    return min(score, 100)


def evaluate_curator(profile):

    score = 0
    traits = profile.get("traits", {})

    score += traits.get("craft_strength", 0) * 25

    score += traits.get("presentation_strength", 0) * 25

    score += min(profile.get("entryCount", 0) / 50, 1) * 25

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
            "Builds a deliberate archive across different experiences, "
            "valuing craftsmanship, variety, and discovery."
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
            "underrepresented works",
            "cross-medium experiences",
            "genre exploration",
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
