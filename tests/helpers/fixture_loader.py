import json
from pathlib import Path

from models.services.genre_intelligence import calculate_genre_affinity

ROOT = Path(__file__).parents[2]


def load_profile_fixture(name):

    path = ROOT / "fixtures" / "profiles" / name

    with open(path) as f:
        profile = json.load(f)

    profile["genreAffinity"] = calculate_genre_affinity(profile)

    return profile


def load_designation_fixture(name):

    path = ROOT / "fixtures" / "designations" / name

    with open(path) as f:
        return json.load(f)
