from .designation_engine import evaluate_designations

FINDING_RULES = [
    {
        "id": "concept-driven",
        "category": "Taste Pattern",
        "evaluate": lambda profile: (
            profile.get("universalAverages", {}).get("originality", 0) >= 8
            and profile.get("universalAverages", {}).get("depth", 0) >= 8
        ),
        "generate": lambda profile: {
            "title": "Concept-Driven Archive",
            "description": (
                "Your highest rated works consistently favor unusual ideas "
                "and conceptual depth."
            ),
            "evidence": (
                f"Originality {profile['universalAverages']['originality']:.1f} / 10"
            ),
        },
    },
    {
        "id": "engagement-priority",
        "category": "Taste Pattern",
        "evaluate": lambda profile: (
            profile.get("universalAverages", {}).get("engagement", 0) >= 9
        ),
        "generate": lambda profile: {
            "title": "Engagement Priority",
            "description": (
                "Your archive strongly rewards experiences that maintain momentum "
                "and consistently hold attention."
            ),
            "evidence": (
                f"Engagement "
                f"{profile.get('universalAverages', {}).get('engagement', 0):.1f} / 10"
            ),
        },
    },
    {
        "id": "systems-preference",
        "category": "Media Signal",
        "evaluate": lambda profile: (
            profile.get("mediaAverages", {}).get("gameplay_mechanics", 0) >= 9
        ),
        "generate": lambda profile: {
            "title": "Systems-Oriented Collector",
            "description": (
                "Your archive demonstrates appreciation for interactive systems, "
                "mechanics, and designed experiences."
            ),
            "evidence": (
                f"Gameplay Mechanics "
                f"{profile.get('mediaAverages', {}).get('gameplay_mechanics', 0):.1f} / 10"
            ),
        },
    },
    {
        "id": "speculative-interest",
        "category": "Genre Pattern",
        "evaluate": lambda profile: (
            profile.get("genreDistribution", {}).get("sci-fi", {}).get("percentage", 0)
            >= 30
        ),
        "generate": lambda profile: {
            "title": "Speculative Archive",
            "description": (
                "Your collection shows a strong attraction toward speculative "
                "worlds, alternate realities, and unfamiliar possibilities."
            ),
            "evidence": (
                f"Sci-Fi Presence "
                f"{profile['genreDistribution']['sci-fi']['percentage']:.1f}%"
            ),
        },
    },
    {
        "id": "atmospheric-interest",
        "category": "Taste Pattern",
        "evaluate": lambda profile: (
            profile.get("mediaAverages", {}).get("art_atmosphere", 0) >= 8.5
            or profile.get("genreDistribution", {})
            .get("surreal", {})
            .get("percentage", 0)
            >= 20
        ),
        "generate": lambda profile: {
            "title": "Atmospheric Collector",
            "description": (
                "Your archive values mood, atmosphere, and immersive identity "
                "alongside traditional evaluation categories."
            ),
            "evidence": (f"Atmospheric Signals detected across archive"),
        },
    },
]


def generate_designation_finding(profile):

    designation = profile.get("primaryDesignation")

    if not designation:
        return None

    return {
        "id": "archive-designation",
        "category": "Archive Identity",
        "title": "Archive Designation",
        "description": (
            f"Your archive most closely aligns with {designation['title']}."
        ),
        "evidence": {
            "traits": designation.get("traits", []),
            "genres": designation.get("genres", []),
            "recommendation_bias": designation.get(
                "recommendation_bias",
                [],
            ),
        },
    }
