from .observation_mapper import map_observation
from models.services.observation_rules import OBSERVATION_RULES


def evaluate_observations(profile):

    if not profile:
        return []

    observations = []

    for rule in OBSERVATION_RULES:
        if rule["evaluate"](profile):
            observations.append(map_observation(rule, profile))

    return sorted(
        observations,
        key=lambda x: x["evidenceStrength"],
        reverse=True,
    )
