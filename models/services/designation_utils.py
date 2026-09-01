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

    required_entry_count = get_boundary_exploration_requirement(
        entry_count
    )

    entries = profile.get("entries", [])

    if entries:
        qualifying_entries = get_boundary_exploration_entries(profile)

        qualifying_entry_count = len(qualifying_entries)

        boundary_media_types = sorted(
            {
                entry.get("media_type")
                for entry in qualifying_entries
                if entry.get("media_type")
            }
        )

        boundary_prevalence = (
            qualifying_entry_count / entry_count
            if entry_count
            else 0
        )

    else:
        distribution = profile.get("genreDistribution", {})

        boundary_prevalence = (
            sum(
                data.get("percentage", 0)
                for genre, data in distribution.items()
                if genre in BOUNDARY_GENRES
            ) / 100
            if entry_count
            else 0
        )

        qualifying_entry_count = round(
            boundary_prevalence * entry_count
        )

        boundary_media_types = []

    return {
        "qualifying_entry_count": qualifying_entry_count,
        "required_entry_count": required_entry_count,
        "boundary_prevalence": boundary_prevalence,
        "sampling": qualifying_entry_count >= 1,
        "sustained": qualifying_entry_count >= required_entry_count,
        "boundary_media_types": boundary_media_types,
        "boundary_media_type_count": len(boundary_media_types),
    }