from .finding_rules import FINDING_RULES, generate_designation_finding


def evaluate_findings(profile):

    if not profile:
        return []

    findings = []

    designation = generate_designation_finding(profile)

    if designation:
        findings.append(designation)

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