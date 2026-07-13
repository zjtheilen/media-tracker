UNIVERSAL_SCORING_PROFILE = {
    "emotional_impact": 0.28,
    "depth": 0.22,
    "craft": 0.18,
    "engagement": 0.12,
    "presentation": 0.10,
    "originality": 0.10,
}

MEDIA_SCORING_PROFILES = {
    "book": {
        "prose_writing": 0.30,
        "character_development": 0.25,
        "world_building": 0.25,
        "narrative_pacing": 0.20
    },
    "video": {
        "cinematography_visuals": 0.30,
        "acting_performances": 0.25,
        "directing_editing": 0.25,
        "sound_music": 0.20
    },
    "game": {
        "gameplay_mechanics": 0.30,
        "level_design_progression": 0.25,
        "replayability_systems": 0.25,
        "art_atmosphere": 0.20
    }
}

VALID_MEDIA_TYPES = ["book", "video", "game"]

def get_universal_categories():
    return list(UNIVERSAL_SCORING_PROFILE.keys())


def get_media_categories(media_type):
    return list(MEDIA_SCORING_PROFILES[media_type].keys())


def get_all_categories(media_type):
    return (
        get_universal_categories()
        + get_media_categories(media_type)
    )

def get_universal_weight(category):
        return UNIVERSAL_SCORING_PROFILE.get(category)


def get_media_weight(media_type, category):
    return MEDIA_SCORING_PROFILES.get(media_type, {}).get(category)