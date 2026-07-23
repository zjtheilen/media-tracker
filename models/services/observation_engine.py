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
                    "traits": rule.get("traits", []),
                    "genres": rule.get("genres", []),
                    "confidence": rule["confidence"](profile),
                    "relatedDesignations": rule.get("related_designations", []),
                    **rule["generate"](profile),
                }
            )

    return observations
