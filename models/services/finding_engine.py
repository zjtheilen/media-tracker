from models.services.identity_engine import generate_identity
from models.services.identity_finding import generate_identity_finding

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

    identity = generate_identity(profile)

    if identity:
        findings.append(
            generate_identity_finding(
                identity,
                profile,
            )
        )

    return findings
