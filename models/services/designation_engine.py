from .designation_rules import DESIGNATION_RULES
from .designation_mapper import map_designation


def evaluate_designations(profile):

    if not profile:
        return []

    designations = []

    for rule in DESIGNATION_RULES:
        score = rule["evaluate"](profile)

        designations.append(map_designation(rule, score))

    return sorted(
        designations,
        key=lambda x: x["score"],
        reverse=True,
    )
