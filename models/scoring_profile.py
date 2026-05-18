from models.scoring_category import ScoringCategory

SCORING_PROFILES = {
    "video": [
        ScoringCategory("Writing", 1.25),
        ScoringCategory("Pacing", 1.25),
        ScoringCategory("Originality", 1.5),
        ScoringCategory("Engagement", 1.5),
        ScoringCategory("Thought Provoking", 1.5),
        ScoringCategory("Emotional Impact", 1.5),
        ScoringCategory("Sound", 1.0),
        ScoringCategory("Acting", 0.9),
        ScoringCategory("Cinematography", 1.0),
    ],
    "book": [
        ScoringCategory("Writing", 1.5),
        ScoringCategory("Pacing", 1.25),
        ScoringCategory("Originality", 1.5),
        ScoringCategory("Engagement", 1.5),
        ScoringCategory("Thought Provoking", 1.5),
        ScoringCategory("Emotional Impact", 1.5),
        ScoringCategory("Setting", 1.0),
        ScoringCategory("Curiosity", 1.4),
        ScoringCategory("Formatting", 0.5),
    ],
    "game": [
        ScoringCategory("Writing", 1.1),
        ScoringCategory("Pacing", 1.0),
        ScoringCategory("Originality", 1.4),
        ScoringCategory("Engagement", 1.5),
        ScoringCategory("Thought Provoking", 1.25),
        ScoringCategory("Emotional Impact", 1.4),
        ScoringCategory("Sound", 1.0),
        ScoringCategory("Gameplay", 1.5),
        ScoringCategory("Art", 1.0),
    ],
}
