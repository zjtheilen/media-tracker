from .finding_rules import FINDING_RULES


def evaluate_findings(profile):

    if not profile:
        return []

    findings = []

    for rule in FINDING_RULES:
        if rule["evaluate"](profile):
            findings.append(
                {
                    "id": rule["id"],
                    "category": rule["category"],
                    **rule["generate"](profile),
                }
            )

    return findings
