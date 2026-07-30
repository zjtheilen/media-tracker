from .archive_utils import format_score_category


def generate_classification_basis(primary_trait, secondary_trait, media_trait):

    return {
        "primary": {
            "name": format_score_category(primary_trait[0]),
            "score": primary_trait[1],
        },
        "secondary": {
            "name": format_score_category(secondary_trait[0]),
            "score": secondary_trait[1],
        },
        "media": {
            "name": format_score_category(media_trait[0]),
            "score": media_trait[1],
        },
    }
