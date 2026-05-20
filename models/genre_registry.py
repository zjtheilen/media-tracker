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

# TODO work genre modifiers into genre tagging system
# GENRE_MODIFIERS = [
#     "dark",
#     "lighthearted",
#     "gritty",
#     "slow-burn",
#     "fast-paced",
#     "atmospheric",
#     "character-driven",
#     "plot-driven",
#     "worldbuilding-heavy",
# ]

GAME_GENRES = [
    "rpg",
    "strategy",
    "puzzle",
    "platformer",
    "simulation",
    "sandbox",
    "roguelike",
]

BOOK_GENRES = [
    "literary fiction",
    "memoir",
    "biography",
    "litrpg",
    "non fiction",
]

VIDEO_GENRES = [
    "biopic",
    "documentary",
]

GENRE_REGISTRY = {
    "game": set(CORE_GENRES + GAME_GENRES),
    "video": set(CORE_GENRES + VIDEO_GENRES),
    "book": set(CORE_GENRES + BOOK_GENRES)
}

def get_allowed_genres(media_type: str) -> set[str]:
    return GENRE_REGISTRY.get(media_type, set(CORE_GENRES))