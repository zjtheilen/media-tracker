from models.services.designation_utils import trait_strength


def test_trait_strength():
    assert trait_strength(None) == 0.0
    assert trait_strength(0) == 0.0
    assert trait_strength(5) == 0.0
    assert trait_strength(6) == 0.0
    assert trait_strength(7) == 0.25
    assert trait_strength(8) == 0.50
    assert trait_strength(9) == 0.75
    assert trait_strength(10) == 1.0
    assert trait_strength(11) == 1.0