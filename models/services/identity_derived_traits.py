from .derived_traits import (
    calculate_experimental_affinity,
    calculate_genre_diversity,
    calculate_novelty,
    calculate_analysis,
    calculate_ambiguity,
    calculate_reflection,
    calculate_system_design,
)


def calculate_derived_trait(trait, profile):

    genres = profile.get("genreDistribution", {})

    if trait == "experimental_affinity":
        return calculate_experimental_affinity(genres)

    if trait == "genre_diversity":
        return calculate_genre_diversity(genres)

    if trait == "novelty":
        return calculate_novelty(genres)

    if trait == "analysis":
        return calculate_analysis(genres)

    if trait == "ambiguity":
        return calculate_ambiguity(genres)

    if trait == "reflection":
        return calculate_reflection(genres)

    if trait == "system_design":
        return calculate_system_design(profile)

    return 0
