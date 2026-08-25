from models.services.archive_narrative import (
    format_trait_score,
    get_trait_description,
    get_trait_intensity,
    get_designation_confidence_label,
)
from models.services.trait_calculator import normalize_trait_signal

GENRE_DESCRIPTIONS = {
    "sci-fi": "speculative worlds and unfamiliar possibilities",
    "psychological": "psychological exploration and shifting perspectives",
    "horror": "horror-driven tension and unsettling ideas",
    "surreal": "surreal and reality-bending experiences",
}


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


def test_trait_signal_normalization_scales_between_boundaries():

    assert normalize_trait_signal(6) == 0
    assert normalize_trait_signal(7) == 0.25
    assert normalize_trait_signal(8) == 0.5
    assert normalize_trait_signal(9) == 0.75
    assert normalize_trait_signal(10) == 1.0


def test_trait_signal_normalization_clamps_to_zero_one():

    assert normalize_trait_signal(0) == 0
    assert normalize_trait_signal(12) == 1
