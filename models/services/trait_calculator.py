from .finding_utils import genre_presence


def normalize_trait_signal(value):
    """
    Converts 1-10 ratings into a 0-1 strength value.

    6/10 or below = weak signal
    10/10 = maximum signal
    """

    if not value:
        return 0

    strength = min(max((value - 6) / 4, 0), 1)

    return round(strength, 2)


def calculate_trait_strengths(profile):

    universal = profile.get("universalAverages", {})

    media = profile.get("mediaAverages", {})

    return {
        # Archive-level signal
        "average_score_strength": normalize_trait_signal(
            profile.get("averageScore", 0)
        ),

        # Universal traits
        "originality_strength": normalize_trait_signal(universal.get("originality", 0)),
        "depth_strength": normalize_trait_signal(universal.get("depth", 0)),
        "craft_strength": normalize_trait_signal(universal.get("craft", 0)),
        "engagement_strength": normalize_trait_signal(universal.get("engagement", 0)),
        "emotional_strength": normalize_trait_signal(universal.get("emotional_impact", 0)),
        "presentation_strength": normalize_trait_signal(universal.get("presentation", 0)),

        # Media traits
        "gameplay_strength": normalize_trait_signal(media.get("gameplay_mechanics", 0)),
        "atmosphere_strength": normalize_trait_signal(media.get("art_atmosphere", 0)),
        "world_building_strength": normalize_trait_signal(media.get("world_building", 0)),
        "pacing_strength": normalize_trait_signal(media.get("narrative_pacing", 0)),
    }


def calculate_genre_signals(profile):

    return {
        "experimental_presence": genre_presence("experimental", profile),
        "surreal_presence": genre_presence("surreal", profile),
        "sci_fi_presence": genre_presence("sci-fi", profile),
        "psychological_presence": genre_presence("psychological", profile),
        "horror_presence": genre_presence("horror", profile),
    }


def calculate_archive_traits(profile):

    traits = {}

    traits.update(calculate_trait_strengths(profile))

    traits.update(calculate_genre_signals(profile))

    return traits
