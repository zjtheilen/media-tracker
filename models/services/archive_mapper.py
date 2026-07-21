def entry_to_archive_format(entry):

    scores = entry.scores

    universal = {}
    media = {}

    from models.scoring_profile import (
        UNIVERSAL_SCORING_PROFILE,
        MEDIA_SCORING_PROFILES,
    )

    universal_categories = set(
        UNIVERSAL_SCORING_PROFILE.keys()
    )

    media_categories = set()

    for categories in MEDIA_SCORING_PROFILES.values():
        media_categories.update(categories.keys())


    for key, value in scores.items():

        if key in universal_categories:
            universal[key] = value

        elif key in media_categories:
            media[key] = value


    return {
        "title": entry.title,
        "media_type": entry.media_type,
        "genres": entry.genres,
        "total_score": entry.total_score,
        "universal_scores": universal,
        "media_scores": media,
    }