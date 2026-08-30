import math

BOUNDARY_GENRES = {
    "experimental",
    "surreal",
    "sci-fi",
    "psychological",
}


def genre_affinity(profile, genre):
    return profile.get("genreAffinity", {}).get(genre, 0)


def get_boundary_exploration_requirement(entry_count):
    return max(2, math.ceil(entry_count * 0.03))


def get_boundary_exploration_entries(profile):
    entries = profile.get("entries", [])

    return [
        entry
        for entry in entries
        if BOUNDARY_GENRES.intersection(entry.get("genres", []))
    ]


def calculate_boundary_exploration_evidence(profile):

    entry_count = profile.get("entryCount", 0)
    distribution = profile.get("genreDistribution", {})

    boundary_genres = {
        genre: data
        for genre, data in distribution.items()
        if genre in BOUNDARY_GENRES
    }

    boundary_prevalence = sum(
        data.get("percentage", 0)
        for data in boundary_genres.values()
    ) / 100

    return {
        "qualifying_entry_count": None,
        "required_entry_count": get_boundary_exploration_requirement(entry_count),
        "boundary_prevalence": round(boundary_prevalence, 2),
        "sampling": boundary_prevalence > 0,
        "sustained": None,
        "boundary_media_types": [],
        "boundary_media_type_count": 0,
    }