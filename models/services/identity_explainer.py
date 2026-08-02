from .identity_scoring import calculate_identity_breakdown
from .identity_utils import normalize


def explain_identity_score(identity, profile):

    return calculate_identity_breakdown(
        identity,
        profile,
        normalize,
    )