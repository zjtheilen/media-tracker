INTERPRETATION_RULES = [
    {
        "id": "high-engagement",
        "evaluate": lambda profile: profile["universalAverages"]["engagement"] >= 8.5,
        "text": lambda profile: (
            "The archive demonstrates a strong preference for experiences that maintain sustained engagement."
        ),
    }
]
