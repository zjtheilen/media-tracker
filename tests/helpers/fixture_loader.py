import json
from pathlib import Path

ROOT = Path(__file__).parents[2]


def load_profile_fixture(name):

    path = ROOT / "fixtures" / "profiles" / name

    with open(path) as f:
        return json.load(f)


def load_designation_fixture(name):

    path = ROOT / "fixtures" / "designations" / name

    with open(path) as f:
        return json.load(f)
