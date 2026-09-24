from models.services.evidence_utils import genre_evidence, metric_evidence

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
                "Highly rated entries consistently favor unusual ideas and conceptual depth."
            ),
            "evidence": [
                metric_evidence(
                    "originality",
                    "Originality",
                    profile["universalAverages"]["originality"],
                ),
                metric_evidence(
                    "depth",
                    "Depth",
                    profile["universalAverages"]["depth"],
                ),
            ],
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
                "The archive strongly rewards experiences that maintain momentum and consistently hold attention."
            ),
            "evidence": [
                metric_evidence(
                    "engagement",
                    "Engagement",
                    profile["universalAverages"]["engagement"],
                ),
            ],
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
                "The archive consistently favors speculative worlds, alternate realities, and unfamiliar possibilities."
            ),
            "evidence": [
                genre_evidence(
                    "sci-fi",
                    "Sci-Fi Presence",
                    profile["genreDistribution"]["sci-fi"]["percentage"],
                ),
            ],
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
                "The archive consistently rewards atmosphere, visual identity, and immersive mood alongside traditional storytelling."
            ),
            "evidence": [
                metric_evidence(
                    "art_atmosphere",
                    "Art Atmosphere",
                    profile.get("mediaAverages", {}).get("art_atmosphere", 0),
                ),
                genre_evidence(
                    "surreal",
                    "Surreal Presence",
                    profile.get("genreDistribution", {})
                    .get("surreal", {})
                    .get("percentage", 0),
                ),
            ],
        },
    },
]
