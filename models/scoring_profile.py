from models.scoring_category import ScoringCategory

SCORING_PROFILES  = {
    "video": [
        ScoringCategory("Writing"),
        ScoringCategory("Acting"),
        ScoringCategory("Cinematography"),
        ScoringCategory("Sound"),
        ScoringCategory("Pacing"),
        ScoringCategory("Originality"),
        ScoringCategory("Engagement"),
        ScoringCategory("Thought Provoking")
    ],
    "book": [
        ScoringCategory("Writing"),
        ScoringCategory("Pacing"),
        ScoringCategory("Originality"),
        ScoringCategory("Engagement"),
        ScoringCategory("Thought Provoking"),
        ScoringCategory("Setting"),
        ScoringCategory("Emotional Impact"),
        ScoringCategory("Curiosity")
    ],
    "game": [
        ScoringCategory("Gameplay"),
        ScoringCategory("Sound"),
        ScoringCategory("Story"),
        ScoringCategory("Creativity"),
        ScoringCategory("Emotional Impact"),
        ScoringCategory("Thought Provoking"),
        ScoringCategory("Replayability"),
        ScoringCategory("Art")
    ]
}



# class ScoringProfile:
#     def __init__ (self, media_type, categories=None):
#         self.media_type = media_type
#         self.categories = categories if categories is not None else []