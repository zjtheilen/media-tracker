from .archive_narrative import (
    format_trait_score,
    get_trait_description,
    get_trait_intensity,
)


def generate_archive_summary(
    designation,
    primary_identity,
    primary_trait,
    secondary_trait,
    genre_signature,
):

    identity_sentence = (
        f"Your curator identity most closely aligns with {primary_identity['title']}."
        if primary_identity
        else "Your curator identity is not yet established."
    )

    genre_sentence = f" {genre_signature}" if genre_signature else ""

    return (
        f"Overall, your archive most closely matches "
        f"{designation['title']}. "
        f"{identity_sentence} "
        f"Your collection is most strongly defined by "
        f"{get_trait_description(primary_trait[0])}. "
        f"It also consistently values "
        f"{get_trait_description(secondary_trait[0])}."
        f"{genre_sentence}"
    )


def generate_primary_trait_sentence(category, score):

    return (
        f"Your archive "
        f"{get_trait_intensity(score)} "
        f"favors "
        f"{get_trait_description(category)} "
        f"({format_trait_score(score)})."
    )


def generate_secondary_trait_sentence(category, score):

    return (
        f"It also "
        f"{get_trait_intensity(score)} favors "
        f"{get_trait_description(category)} "
        f"({format_trait_score(score)})."
    )


def generate_media_signature_sentence(category, score):

    return (
        f"Your media preferences "
        f"{get_trait_intensity(score)} "
        f"align with "
        f"{get_trait_description(category)} "
        f"({format_trait_score(score)})."
    )


def generate_genre_signature_sentence(genre_distribution):
    meaningful_genres = [
        genre for genre, data in genre_distribution.items() if data["percentage"] >= 20
    ]

    if not meaningful_genres:
        return None

    if len(meaningful_genres) == 1:
        genres = meaningful_genres[0]

    elif len(meaningful_genres) == 2:
        genres = f"{meaningful_genres[0]} and {meaningful_genres[1]}"

    else:
        genres = ", ".join(meaningful_genres[:-1]) + f", and {meaningful_genres[-1]}"

    return f"Your archive demonstrates recurring interest in {genres} experiences."


def generate_observation_summary(observations):

    if not observations:
        return None

    titles = [observation["title"] for observation in observations]

    if len(titles) == 1:
        return f"Your archive shows a recurring pattern of {titles[0]}."

    return "Your archive shows several recurring patterns: " + ", ".join(titles) + "."
