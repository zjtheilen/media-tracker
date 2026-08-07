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
            "evidence": [
                {
                    "metric": "originality",
                    "label": "Originality",
                    "value": profile["universalAverages"]["originality"],
                    "unit": "score",
                },
                {
                    "metric": "depth",
                    "label": "Depth",
                    "value": profile["universalAverages"]["depth"],
                    "unit": "score",
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
                "Your archive strongly rewards experiences that maintain momentum "
                "and consistently hold attention."
            ),
            "evidence": [
                {
                    "metric": "engagement",
                    "label": "Engagement",
                    "value": profile["universalAverages"]["engagement"],
                    "unit": "score",
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
                "Your archive demonstrates appreciation for interactive systems, "
                "mechanics, and designed experiences."
            ),
            "evidence": [
                {
                    "metric": "gameplay_mechanics",
                    "label": "Gameplay Mechanics",
                    "value": profile["mediaAverages"]["gameplay_mechanics"],
                    "unit": "score",
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
                "Your collection shows a strong attraction toward speculative "
                "worlds, alternate realities, and unfamiliar possibilities."
            ),
            "evidence": [
                {
                    "metric": "sci-fi",
                    "label": "Sci-Fi Presence",
                    "value": profile["genreDistribution"]["sci-fi"]["percentage"],
                    "unit": "percent",
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
                "Your archive values mood, atmosphere, and immersive identity "
                "alongside traditional evaluation categories."
            ),
            "evidence": [
                {
                    "metric": "art_atmosphere",
                    "label": "Art Atmosphere",
                    "value": profile.get("mediaAverages", {}).get("art_atmosphere", 0),
                    "unit": "score",
                },
                {
                    "metric": "surreal",
                    "label": "Surreal Presence",
                    "value": profile.get("genreDistribution", {})
                    .get("surreal", {})
                    .get("percentage", 0),
                    "unit": "percent",
                },
            ],
        },
    },
]
