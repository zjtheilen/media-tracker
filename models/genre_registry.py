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

GENRE_METADATA = {
    "horror": {
        "related_genres": ["psychological", "supernatural", "surreal", "thriller"],
    },
    "thriller": {
        "related_genres": ["horror", "mystery", "crime", "psychological", "action"],
    },
    "sci-fi": {
        "related_genres": ["fantasy", "experimental", "philosophical", "surreal", "thriller"],
    },
    "fantasy": {
        "related_genres": ["adventure", "action", "rpg", "supernatural", "whimsical"],
    },
    "drama": {
        "related_genres": ["romance", "historical", "coming-of-age", "family", "psychological"],
    },
    "comedy": {
        "related_genres": ["satire", "parody", "whimsical", "family"],
    },
    "mystery": {
        "related_genres": ["thriller", "crime", "psychological", "horror"],
    },
    "romance": {
        "related_genres": ["drama", "comedy", "coming-of-age", "fantasy"],
    },
    "action": {
        "related_genres": ["adventure", "thriller", "crime", "sci-fi", "fighting"],
    },
    "adventure": {
        "related_genres": ["action", "fantasy", "rpg", "survival-horror"],
    },
    "psychological": {
        "related_genres": ["horror", "thriller", "mystery", "surreal", "philosophical"],
    },
    "surreal": {
        "related_genres": ["psychological", "experimental", "horror", "philosophical", "whimsical"],
    },
    "documentary": {
        "related_genres": ["historical", "biopic", "non-fiction", "found-footage"],
    },
    "experimental": {
        "related_genres": ["surreal", "philosophical", "psychological", "sci-fi"],
    },
    "whimsical": {
        "related_genres": ["comedy", "fantasy", "family", "surreal"],
    },
    "historical": {
        "related_genres": ["drama", "documentary", "biopic", "political", "crime"],
    },
    "crime": {
        "related_genres": ["mystery", "thriller", "drama", "action", "historical"],
    },
    "satire": {
        "related_genres": ["comedy", "political", "parody", "philosophical"],
    },
    "political": {
        "related_genres": ["drama", "historical", "satire", "philosophical", "documentary"],
    },
    "philosophical": {
        "related_genres": ["psychological", "surreal", "experimental", "sci-fi", "drama"],
    },
    "coming-of-age": {
        "related_genres": ["drama", "romance", "family", "young-adult"],
    },
    "family": {
        "related_genres": ["comedy", "fantasy", "whimsical", "coming-of-age", "animation"],
    },
    "supernatural": {
        "related_genres": ["horror", "fantasy", "psychological", "surreal"],
    },

    "rpg": {
        "related_genres": ["fantasy", "sci-fi", "strategy", "tactics", "adventure"],
    },
    "strategy": {
        "related_genres": ["tactics", "rts", "simulation", "rpg", "board-game"],
    },
    "puzzle": {
        "related_genres": ["mystery", "experimental", "microgame", "adventure"],
    },
    "platformer": {
        "related_genres": ["action", "adventure", "metroidvania", "microgame"],
    },
    "simulation": {
        "related_genres": ["strategy", "sandbox", "rpg"],
    },
    "sandbox": {
        "related_genres": ["simulation", "rpg", "strategy", "adventure"],
    },
    "roguelike": {
        "related_genres": ["roguelite", "rpg", "strategy", "survival-horror"],
    },
    "roguelite": {
        "related_genres": ["roguelike", "rpg", "action", "strategy"],
    },
    "racing": {
        "related_genres": ["action", "simulation"],
    },
    "block-breaker": {
        "related_genres": ["puzzle", "microgame", "action"],
    },
    "fighting": {
        "related_genres": ["action", "rpg"],
    },
    "shooter": {
        "related_genres": ["action", "sci-fi", "stealth", "survival-horror"],
    },
    "tactics": {
        "related_genres": ["strategy", "rpg", "rts", "simulation"],
    },
    "rts": {
        "related_genres": ["strategy", "tactics", "simulation"],
    },
    "visual-novel": {
        "related_genres": ["drama", "mystery", "romance", "psychological"],
    },
    "dating-sim": {
        "related_genres": ["romance", "simulation", "visual-novel", "drama"],
    },
    "rhythm": {
        "related_genres": ["musical", "action", "microgame"],
    },
    "metroidvania": {
        "related_genres": ["platformer", "action", "adventure", "rpg"],
    },
    "survival-horror": {
        "related_genres": ["horror", "action", "adventure", "stealth"],
    },
    "stealth": {
        "related_genres": ["action", "thriller", "crime", "shooter"],
    },
    "card-game": {
        "related_genres": ["strategy", "rpg", "board-game", "roguelite"],
    },
    "board-game": {
        "related_genres": ["strategy", "tactics", "card-game", "simulation"],
    },
    "microgame": {
        "related_genres": ["puzzle", "rhythm", "action", "platformer"],
    },

    "literary-fiction": {
        "related_genres": ["drama", "philosophical", "psychological", "historical"],
    },
    "memoir": {
        "related_genres": ["biography", "drama", "coming-of-age", "non-fiction"],
    },
    "biography": {
        "related_genres": ["memoir", "historical", "non-fiction", "biopic"],
    },
    "litrpg": {
        "related_genres": ["rpg", "fantasy", "sci-fi", "adventure"],
    },
    "non-fiction": {
        "related_genres": ["documentary", "historical", "memoir", "biography"],
    },
    "comic": {
        "related_genres": ["graphic-novel", "manga", "animation"],
    },
    "graphic-novel": {
        "related_genres": ["comic", "manga", "literary-fiction"],
    },
    "manga": {
        "related_genres": ["comic", "graphic-novel", "anime"],
    },
    "young-adult": {
        "related_genres": ["coming-of-age", "fantasy", "romance", "family"],
    },
    "novella": {
        "related_genres": ["literary-fiction", "fantasy", "horror", "mystery"],
    },
    "classic": {
        "related_genres": ["literary-fiction", "historical", "drama", "philosophical"],
    },
    "poetry": {
        "related_genres": ["literary-fiction", "philosophical", "experimental", "surreal"],
    },

    "biopic": {
        "related_genres": ["historical", "drama", "documentary", "biography"],
    },
    "mockumentary": {
        "related_genres": ["documentary", "comedy", "satire", "parody"],
    },
    "parody": {
        "related_genres": ["comedy", "satire", "mockumentary"],
    },
    "b-movie": {
        "related_genres": ["horror", "action", "sci-fi", "comedy"],
    },
    "found-footage": {
        "related_genres": ["horror", "documentary", "experimental", "thriller"],
    },
    "anthology": {
        "related_genres": ["horror", "drama", "comedy", "experimental"],
    },
    "short-film": {
        "related_genres": ["experimental", "animation", "drama", "documentary"],
    },
    "animation": {
        "related_genres": ["anime", "fantasy", "comedy", "family", "whimsical"],
    },
    "anime": {
        "related_genres": ["animation", "fantasy", "action", "drama", "manga"],
    },
    "stop-motion": {
        "related_genres": ["animation", "experimental", "whimsical", "fantasy"],
    },
    "musical": {
        "related_genres": ["drama", "comedy", "romance"],
    },
    "live-action": {
        "related_genres": ["drama", "action", "thriller", "comedy"],
    },
}


def get_genre_metadata(genre: str) -> dict:
    return GENRE_METADATA.get(genre, {})


def get_allowed_genres(media_type: str) -> set[str]:
    return GENRE_REGISTRY.get(media_type, set(CORE_GENRES))
