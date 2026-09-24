from models.services.identity_derived_traits import calculate_derived_trait


def test_experimental_affinity_dispatches_correctly():

    profile = {"genreDistribution": {"experimental": {"percentage": 40}}}

    result = calculate_derived_trait("experimental_affinity", profile)

    assert result == 4
