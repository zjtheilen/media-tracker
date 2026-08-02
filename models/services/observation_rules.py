from models.services.observation_utils import score_confidence

OBSERVATION_RULES = [
    {
        "id": "boundary-preference",
        "confidence": lambda profile: score_confidence(
            profile.get("universalAverages", {}).get("originality", 0),
            8,
        ),
        "category": "Archive Observation",
        "traits": [
            "originality",
            "depth",
        ],
        "genres": [
            "experimental",
            "surreal",
            "sci-fi",
        ],
        "related_designations": [
            "boundary_explorer",
        ],
        "evaluate": lambda profile: (
            profile.get("universalAverages", {}).get("originality", 0) >= 8
            and (
                profile.get("genreDistribution", {})
                .get("experimental", {})
                .get("percentage", 0)
                >= 20
                or profile.get("genreDistribution", {})
                .get("surreal", {})
                .get("percentage", 0)
                >= 20
            )
        ),
        "generate": lambda profile: {
            "title": "Boundary Preference",
            "description": (
                "Your archive repeatedly favors unusual concepts, "
                "altered realities, and experiences that challenge "
                "conventional structures."
            ),
            "evidence": (
                f"Originality "
                f"{profile.get('universalAverages', {}).get('originality', 0):.1f} / 10"
            ),
        },
    },
    {
        "id": "systems-affinity",
        "confidence": lambda profile: score_confidence(
            profile.get("mediaAverages", {}).get("gameplay_mechanics", 0),
            9,
        ),
        "category": "Archive Observation",
        "traits": [
            "gameplay_mechanics",
        ],
        "genres": [
            "strategy",
            "simulation",
            "game",
        ],
        "related_designations": [
            "engagement_architect",
        ],
        "evaluate": lambda profile: (
            profile.get("mediaAverages", {}).get("gameplay_mechanics", 0) >= 9
        ),
        "generate": lambda profile: {
            "title": "Systems Affinity",
            "description": (
                "Your archive shows appreciation for carefully designed "
                "mechanics, interactions, and structured experiences."
            ),
            "evidence": (
                f"Gameplay Mechanics "
                f"{profile.get('mediaAverages', {}).get('gameplay_mechanics', 0):.1f} / 10"
            ),
        },
    },
    {
        "id": "interpretive-depth",
        "confidence": lambda profile: score_confidence(
            profile.get("universalAverages", {}).get("depth", 0),
            8,
        ),
        "category": "Archive Observation",
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
        "related_designations": [
            "deep_diver",
        ],
        "evaluate": lambda profile: (
            profile.get("universalAverages", {}).get("depth", 0) >= 8
        ),
        "generate": lambda profile: {
            "title": "Interpretive Depth",
            "description": (
                "Your archive consistently rewards works that encourage "
                "analysis, reflection, and layered interpretation."
            ),
            "evidence": (
                f"Depth {profile.get('universalAverages', {}).get('depth', 0):.1f} / 10"
            ),
        },
    },
    {
        "id": "atmospheric-focus",
        "confidence": lambda profile: score_confidence(
            profile.get("mediaAverages", {}).get("art_atmosphere", 0),
            8.5,
        ),
        "category": "Archive Observation",
        "traits": [
            "art_atmosphere",
        ],
        "genres": [
            "surreal",
            "horror",
        ],
        "related_designations": [
            "boundary_explorer",
        ],
        "evaluate": lambda profile: (
            profile.get("mediaAverages", {}).get("art_atmosphere", 0) >= 8.5
            or profile.get("genreDistribution", {})
            .get("surreal", {})
            .get("percentage", 0)
            >= 20
        ),
        "generate": lambda profile: {
            "title": "Atmospheric Focus",
            "description": (
                "Your archive consistently rewards atmosphere, visual identity, "
                "and immersive mood alongside traditional storytelling."
            ),
            "evidence": (
                f"Art & Atmosphere "
                f"{profile.get('mediaAverages', {}).get('art_atmosphere', 0):.1f} / 10"
            ),
        },
    },
    {
        "id": "emotional-resonance",
        "confidence": lambda profile: score_confidence(
            profile.get("universalAverages", {}).get("emotional_impact", 0),
            8.5,
        ),
        "category": "Archive Observation",
        "traits": [
            "emotional_impact",
        ],
        "genres": [
            "drama",
            "psychological",
        ],
        "related_designations": [
            "deep_diver",
        ],
        "evaluate": lambda profile: (
            profile.get("universalAverages", {}).get("emotional_impact", 0) >= 8.5
        ),
        "generate": lambda profile: {
            "title": "Emotional Resonance",
            "description": (
                "Your archive consistently favors experiences that leave a lasting "
                "emotional impression."
            ),
            "evidence": (
                f"Emotional Impact "
                f"{profile.get('universalAverages', {}).get('emotional_impact', 0):.1f} / 10"
            ),
        },
    },
    {
        "id": "craft-appreciation",
        "confidence": lambda profile: score_confidence(
            profile.get("universalAverages", {}).get("craft", 0),
            8.5,
        ),
        "category": "Archive Observation",
        "traits": [
            "craft",
        ],
        "genres": [],
        "related_designations": [
            "engagement_architect",
        ],
        "evaluate": lambda profile: (
            profile.get("universalAverages", {}).get("craft", 0) >= 8.5
        ),
        "generate": lambda profile: {
            "title": "Craft Appreciation",
            "description": (
                "Your archive consistently rewards works that demonstrate strong "
                "execution and technical craftsmanship."
            ),
            "evidence": (
                f"Craft {profile.get('universalAverages', {}).get('craft', 0):.1f} / 10"
            ),
        },
    },
]
