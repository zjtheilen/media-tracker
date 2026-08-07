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
                {
                    "metric": "originality",
                    "label": "Originality",
                    "value": profile["universalAverages"]["originality"],
                    "unit": "score",
                    "type": "metric",
                },
                {
                    "metric": "depth",
                    "label": "Depth",
                    "value": profile["universalAverages"]["depth"],
                    "unit": "score",
                    "type": "metric",
                },
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
                {
                    "metric": "engagement",
                    "label": "Engagement",
                    "value": profile["universalAverages"]["engagement"],
                    "unit": "score",
                    "type": "metric",
                },
            ],
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
                "The archive consistently rewards interactive systems, mechanics, and structured experiences."
            ),
            "evidence": [
                {
                    "metric": "gameplay_mechanics",
                    "label": "Gameplay Mechanics",
                    "value": profile["mediaAverages"]["gameplay_mechanics"],
                    "unit": "score",
                    "type": "metric",
                },
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
                {
                    "metric": "sci-fi",
                    "label": "Sci-Fi Presence",
                    "value": profile["genreDistribution"]["sci-fi"]["percentage"],
                    "unit": "percent",
                    "type": "genre",
                },
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
                {
                    "metric": "art_atmosphere",
                    "label": "Art Atmosphere",
                    "value": profile.get("mediaAverages", {}).get("art_atmosphere", 0),
                    "unit": "score",
                    "type": "metric",
                },
                {
                    "metric": "surreal",
                    "label": "Surreal Presence",
                    "value": profile.get("genreDistribution", {})
                    .get("surreal", {})
                    .get("percentage", 0),
                    "unit": "percent",
                    "type": "genre",
                },
            ],
        },
    },
]
