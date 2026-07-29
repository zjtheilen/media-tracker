from pathlib import Path
import json


def load_profile_fixture(name):

    path = (
        Path(__file__).parents[2]
        / "fixtures"
        / "profiles"
        / name
    )

    with open(path) as f:
        return json.load(f)