from models.scoring_profile import (
    MEDIA_SCORING_PROFILES,
    UNIVERSAL_SCORING_PROFILE,
)


def entry_to_archive_format(entry):

    scores = entry.scores

    universal = {}
    media = {}

    universal_categories = set(UNIVERSAL_SCORING_PROFILE.keys())

    media_categories = set()

    for categories in MEDIA_SCORING_PROFILES.values():
        media_categories.update(categories.keys())

    if isinstance(scores, dict):
        score_items = scores.items()
    else:
        score_items = ((score.category, score.value) for score in scores)

    for category, value in score_items:
        if category in universal_categories:
            universal[category] = value

        elif category in media_categories:
            media[category] = value

    return {
        "title": entry.title,
        "media_type": entry.media_type,
        "genres": entry.genres,
        "date_consumed": getattr(entry, "date_consumed", None),
        "completion_status": getattr(entry, "completion_status", None),
        "total_score": entry.total_score,
        "universal_scores": universal,
        "media_scores": media,
    }
