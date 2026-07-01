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
    "whimsicle"
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
    "worldbuilding-heavy"
]

VIDEO_ONLY_GENRES = [
    "biopic"
]

GAME_ONLY_GENRES = [
    "rpg",
    "strategy",
    "puzzle",
    "platformer",
    "simulation",
    "sandbox",
    "roguelike",
    "racing"
]

BOOK_ONLY_GENRES = [
    "literary fiction",
    "memoir",
    "biography",
    "litrpg",
    "non-fiction",
]

GENRE_REGISTRY = {
    "core": CORE_GENRES,
    "modifier": GENRE_MODIFIERS,
    "video": CORE_GENRES + VIDEO_ONLY_GENRES,
    "game": CORE_GENRES + GAME_ONLY_GENRES,
    "book": CORE_GENRES + BOOK_ONLY_GENRES
}
