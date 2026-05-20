# models/genre_registry.py

CORE_GENRES = [
    "horror",
    "thriller",
    "sci-fi",
    "fantasy",
    "drama",
    "comedy",
    "mystery",
    "romance",
    "action",
    "adventure",
    "psychological",
    "surreal",
    "documentary",
    "experimental",
]

GENRE_MODIFIERS = [
    "dark",
    "lighthearted",
    "gritty",
    "slow-burn",
    "fast-paced",
    "atmospheric",
    "character-driven",
    "plot-driven",
    "worldbuilding-heavy",
]

MEDIA_SPECIFIC_GENRES = {
    "game": [
        "rpg",
        "strategy",
        "puzzle",
        "platformer",
        "simulation",
        "sandbox",
        "roguelike",
    ],
    "book": [
        "literary fiction",
        "memoir",
        "biography",
        "litrpg",
        "non fiction",
    ],
    "video": [
        "biopic",
        "documentary-series",
    ],
}

def get_allowed_genres(media_type: str) -> set[str]:
    base =set(CORE_GENRES)

    specific = set(MEDIA_SPECIFIC_GENRES.get(media_type, []))

    return base | specific