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
    "experimental"
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
    "roguelike"
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

# PRIMARY_GENRES = {
#     "horror",
#     "sci-fi",
#     "fantasy",
#     "romance",
#     "comedy",
#     "thriller",
#     "mystery",
#     "drama",
#     "action",
#     "adventure",
#     "crime",
#     "psychological",
#     "slice of life",
#     "satire",
# }

# GAME_GENRES = {
#     "rpg",
#     "puzzle",
#     "platformer",
#     "shooter",
#     "strategy",
#     "racing",
#     "simulation",
#     "visual novel",
#     "fighting",
#     "beat 'em up",
#     "stealth",
#     "survival",
#     "rhythm",
#     "battle royale",
#     "metroidvania",
#     "sports",
#     "party"
# }