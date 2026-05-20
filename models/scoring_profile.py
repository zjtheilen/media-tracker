from models.scoring_category import ScoringCategory

SCORING_CATEGORIES = {
    "emotional_impact": ScoringCategory(
        "emotional_impact",
        0.28
    ),
    "depth": ScoringCategory(
        "depth",
        0.22
    ),
    "craft": ScoringCategory(
        "craft",
        0.18
    ),
    "engagement": ScoringCategory(
        "engagement",
        0.12
    ),
    "presentation": ScoringCategory(
        "presentation",
        0.10
    ),
    "originality": ScoringCategory(
        "originality",
        0.10
    ),
}

CATEGORY_WEIGHTS = {
    "emotional_impact": 0.28,
    "depth": 0.22,
    "craft": 0.18,
    "engagement": 0.12,
    "presentation": 0.10,
    "originality": 0.10
}

VALID_MEDIA_TYPES = [
    "book",
    "video",
    "game"
]

