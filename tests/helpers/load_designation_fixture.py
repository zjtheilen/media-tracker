import json
from pathlib import Path


def load_designation_fixture(name):

    path = Path(__file__).parents[2] / "fixtures" / "designations" / name

    with open(path) as f:
        return json.load(f)
