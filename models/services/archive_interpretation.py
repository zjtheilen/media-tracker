from .archive_language import (
    get_trait_intensity,
    get_trait_description,
    format_trait_score,
)


def generate_archive_summary(
    primary_trait,
    secondary_trait,
    media_trait,
):

    return (
        f"Your archive profile suggests a preference for "
        f"{get_trait_description(primary_trait[0])}, "
        f"with appreciation for "
        f"{get_trait_description(secondary_trait[0])} "
        f"and an alignment toward "
        f"{get_trait_description(media_trait[0])}."
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
