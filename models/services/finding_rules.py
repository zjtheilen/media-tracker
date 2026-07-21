FINDING_RULES = [
    {
        "id": "concept-driven",
        "category": "Taste Pattern",
        "evaluate": lambda profile: (
            profile["universalAverages"]["originality"] >= 8
            and profile["universalAverages"]["depth"] >= 8
        ),
        "generate": lambda profile: {
            "title": "Concept-Driven Archive",
            "description": "Your highest rated works consistently favor unusual ideas and conceptual depth.",
            "evidence": f"Originality {profile['universalAverages']['originality']:.1f} / 10",
        },
    }
]
