from .finding_rules import FINDING_RULES


def evaluate_findings(profile):

    # print(1, "checking findings")
    # print(2, profile["genreDistribution"])
    # print(3, profile["designationConfidence"])

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
