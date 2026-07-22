def format_trait_score(score):
    return f"{score:.1f}/10"


TRAIT_DESCRIPTIONS = {
    "depth": "complex, thought-provoking ideas",
    "originality": "unusual and original concepts",
    "craft": "strong technical execution",
    "emotional_impact": "emotionally affecting experiences",
    "engagement": "experiences that maintain strong momentum",
    "presentation": "distinctive presentation and atmosphere",

    # media-specific
    "world_building": "rich world-building",
    "character_development": "strong character development",
    "narrative_pacing": "well-paced storytelling",
    "prose_writing": "high-quality prose and writing",
    "art_atmosphere": "immersive atmosphere and visual design",
    "gameplay_mechanics": "engaging gameplay systems",
    "level_design_progression": "strong level design and progression",
    "replayability_systems": "replayability and long-term systems",
}


def get_trait_description(trait):
    return TRAIT_DESCRIPTIONS.get(
        trait,
        trait.replace("_", " ")
    )


def get_trait_intensity(score):

    if score >= 9.0:
        return "strongly"

    if score >= 8.0:
        return "consistently"

    if score >= 7.0:
        return "frequently"

    return "occasionally"


CONFIDENCE_LABELS = [
    (9.0, "Very High"),
    (8.0, "High"),
    (7.0, "Moderate"),
    (6.0, "Emerging"),
    (0.0, "Tentative"),
]


def get_designation_confidence_label(score):

    for threshold, label in CONFIDENCE_LABELS:
        if score >= threshold:
            return label

    return "Tentative"