from .observation_rules import OBSERVATION_RULES


def evaluate_observations(profile):

    if not profile:
        return []

    observations = []

    for rule in OBSERVATION_RULES:
        if rule["evaluate"](profile):
            observations.append(
                {
                    "id": rule["id"],
                    "category": rule["category"],
                    **rule["generate"](profile),
                }
            )

    return observations