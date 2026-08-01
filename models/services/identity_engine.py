from .identity_scorer import get_primary_identity
from .identity_finding import generate_identity_finding


def generate_identity(profile):

    identity = get_primary_identity(profile)

    if not identity:
        return None

    return generate_identity_finding(identity, profile)