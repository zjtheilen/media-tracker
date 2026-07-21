from .interpretation_rules import INTERPRETATION_RULES


def evaluate_interpretations(profile):

    if not profile:
        return []

    results = []

    for rule in INTERPRETATION_RULES:

        if rule["evaluate"](profile):

            results.append(
                {
                    "id": rule["id"],
                    "text": rule["text"](profile)
                }
            )

    return results