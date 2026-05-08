from models.scoring_category import ScoringCategory

SCORING_PROFILES  = {
    "video": [
        ScoringCategory("Writing"),
        ScoringCategory("Pacing"),
        ScoringCategory("Originality"),
        ScoringCategory("Engagement"),
        ScoringCategory("Thought Provoking"),
        ScoringCategory("Emotional Impact"),
        ScoringCategory("Sound"),
        ScoringCategory("Acting"),
        ScoringCategory("Cinematography"),
    ],
    "book": [
        ScoringCategory("Writing"),
        ScoringCategory("Pacing"),
        ScoringCategory("Originality"),
        ScoringCategory("Engagement"),
        ScoringCategory("Thought Provoking"),
        ScoringCategory("Emotional Impact"),
        ScoringCategory("Setting"),
        ScoringCategory("Curiosity"),
        ScoringCategory("Formatting")
    ],
    "game": [
        ScoringCategory("Writing"),
        ScoringCategory("Pacing"),
        ScoringCategory("Originality"),
        ScoringCategory("Engagement"),
        ScoringCategory("Thought Provoking"),
        ScoringCategory("Emotional Impact"),
        ScoringCategory("Sound"),
        ScoringCategory("Gameplay"),
        ScoringCategory("Art")
    ]
}

