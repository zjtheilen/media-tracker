from .identity_scorer import get_primary_identity
from .identity_explainer import explain_identity_score
from .identity_confidence import calculate_identity_confidence


def generate_identity(profile):

    identity = get_primary_identity(profile)

    if not identity:
        return None

    explanation = explain_identity_score(
        identity,
        profile,
    )

    confidence = calculate_identity_confidence(
        identity,
        profile,
    )

    return {
        **identity,
        **explanation,
        "confidence": confidence,
    }