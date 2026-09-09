import pytest

from models.services.archive_narrative import (
    format_trait_score,
    generate_trait_statement,
    get_designation_signal_strength_label,
    get_trait_description,
    get_trait_intensity,
)
from models.services.trait_calculator import normalize_trait_signal

GENRE_DESCRIPTIONS = {
    "sci-fi": "speculative worlds and unfamiliar possibilities",
    "psychological": "psychological exploration and shifting perspectives",
    "horror": "horror-driven tension and unsettling ideas",
    "surreal": "surreal and reality-bending experiences",
}


@pytest.mark.unit
def test_format_trait_score():
    assert format_trait_score(9.666) == "9.7/10"


@pytest.mark.unit
def test_trait_description():
    assert (
        get_trait_description("art_atmosphere")
        == "immersive atmosphere and visual design"
    )


@pytest.mark.unit
def test_trait_intensity():
    assert get_trait_intensity(9.2) == "strongly"
    assert get_trait_intensity(8.3) == "consistently"
    assert get_trait_intensity(7.2) == "frequently"
    assert get_trait_intensity(6.5) == "occasionally"


@pytest.mark.unit
def test_confidence_label():
    assert get_designation_signal_strength_label(9.1) == "Very High"
    assert get_designation_signal_strength_label(8.2) == "High"
    assert get_designation_signal_strength_label(7.4) == "Moderate"


@pytest.mark.unit
def test_trait_signal_normalization_scales_between_boundaries():

    assert normalize_trait_signal(6) == 0
    assert normalize_trait_signal(7) == 0.25
    assert normalize_trait_signal(8) == 0.5
    assert normalize_trait_signal(9) == 0.75
    assert normalize_trait_signal(10) == 1.0


@pytest.mark.unit
def test_trait_signal_normalization_clamps_to_zero_one():

    assert normalize_trait_signal(0) == 0
    assert normalize_trait_signal(12) == 1


@pytest.mark.unit
def test_trait_description_falls_back_to_readable_trait_name():
    assert get_trait_description("some_new_trait") == "some new trait"


@pytest.mark.unit
def test_confidence_label_lower_ranges():
    assert get_designation_signal_strength_label(6.5) == "Emerging"
    assert get_designation_signal_strength_label(5.9) == "Tentative"


@pytest.mark.unit
def test_generate_trait_statement():
    assert (
        generate_trait_statement("depth", 9.2)
        == "Your archive strongly favors complex, thought-provoking ideas (9.2/10)."
    )


@pytest.mark.unit
def test_generate_trait_statement_for_preferences():
    assert (
        generate_trait_statement(
            "depth",
            8.5,
            prefix="Your preferences",
        )
        == "Your preferences consistently favor complex, thought-provoking ideas (8.5/10)."
    )
