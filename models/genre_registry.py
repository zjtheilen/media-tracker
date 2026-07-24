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
    "whimsical",
    "historical",
    "crime",
    "satire",
    "political",
    "philosophical",
    "coming-of-age",
    "family",
    "supernatural",
]

GAME_GENRES = [
    "rpg",
    "strategy",
    "puzzle",
    "platformer",
    "simulation",
    "sandbox",
    "roguelike",
    "roguelite",
    "racing",
    "block-breaker",
    "fighting",
    "shooter",
    "tactics",
    "rts",
    "visual-novel",
    "dating-sim",
    "rhythm",
    "metroidvania",
    "survival-horror",
    "stealth",
    "card-game",
    "board-game",
    "microgame",
]

BOOK_GENRES = [
    "literary-fiction",
    "memoir",
    "biography",
    "litrpg",
    "non-fiction",
    "comic",
    "graphic-novel",
    "manga",
    "young-adult",
    "novella",
    "classic",
    "poetry",
]

VIDEO_GENRES = [
    "biopic",
    "mockumentary",
    "parody",
    "b-movie",
    "found-footage",
    "anthology",
    "short-film",
    "animation",
    "anime",
    "stop-motion",
    "musical",
    "live-action",
    "documentary",
]

GENRE_REGISTRY = {
    "game": set(CORE_GENRES + GAME_GENRES),
    "video": set(CORE_GENRES + VIDEO_GENRES),
    "book": set(CORE_GENRES + BOOK_GENRES),
}


def get_allowed_genres(media_type: str) -> set[str]:
    return GENRE_REGISTRY.get(media_type, set(CORE_GENRES))
