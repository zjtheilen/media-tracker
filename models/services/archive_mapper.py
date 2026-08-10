def entry_to_archive_format(entry):

    scores = entry.scores

    universal = {}
    media = {}

    from models.scoring_profile import (
        UNIVERSAL_SCORING_PROFILE,
        MEDIA_SCORING_PROFILES,
    )

    universal_categories = set(UNIVERSAL_SCORING_PROFILE.keys())

    media_categories = set()

    for categories in MEDIA_SCORING_PROFILES.values():
        media_categories.update(categories.keys())

    if isinstance(scores, dict):
        score_items = scores.items()
    else:
        score_items = (
            (score.category, score.value)
            for score in scores
        )

    for category, value in score_items:

        if category in universal_categories:
            universal[category] = value

        elif category in media_categories:
            media[category] = value

    return {
        "title": entry.title,
        "media_type": entry.media_type,
        "genres": entry.genres,
        "total_score": entry.total_score,
        "universal_scores": universal,
        "media_scores": media,
    }