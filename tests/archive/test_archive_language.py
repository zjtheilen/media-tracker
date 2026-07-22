from models.services.archive_language import (
    format_trait_score,
    get_trait_description,
    get_trait_intensity,
    get_designation_confidence_label,
)


def test_format_trait_score():
    assert format_trait_score(9.666) == "9.7/10"


def test_trait_description():
    assert (
        get_trait_description("art_atmosphere")
        == "immersive atmosphere and visual design"
    )


def test_trait_intensity():
    assert get_trait_intensity(9.2) == "strongly"
    assert get_trait_intensity(8.3) == "consistently"
    assert get_trait_intensity(7.2) == "frequently"
    assert get_trait_intensity(6.5) == "occasionally"


def test_confidence_label():
    assert get_designation_confidence_label(9.1) == "Very High"
    assert get_designation_confidence_label(8.2) == "High"
    assert get_designation_confidence_label(7.4) == "Moderate"