from pathlib import Path
import json
# import pytest


def load_fixture(name):

    path = (
        Path(__file__)
        .parents[2]
        / "fixtures"
        / "designations"
        / name
    )

    with open(path) as f:
        return json.load(f)


# @pytest.mark.parametrize(
#     "fixture,expected",
#     [
#         ("experimentalist_profile.json", "experimentalist"),
#         ("entertainer_profile.json", "entertainer"),
#         ("specialist_profile.json", "specialist")
#     ]
# )
# def test_designation_profiles(fixture, expected):

#     profile = load_fixture(fixture)

#     results = evaluateDesignations(profile)

#     assert results[0]["id"] == expected