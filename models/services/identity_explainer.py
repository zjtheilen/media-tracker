from .identity_scoring import calculate_identity_breakdown
from .identity_confidence import calculate_identity_confidence
from .identity_utils import normalize_identity_score


def explain_identity_score(identity, profile):

    breakdown = calculate_identity_breakdown(
        identity,
        profile,
        normalize_identity_score,
    )

    score = round(
        sum(item["contribution"] for item in breakdown),
        3,
    )

    top_traits = breakdown[:3]

    confidence = calculate_identity_confidence(
        identity,
        profile,
    )

    return {
        "score": score,
        "confidence": confidence,
        "breakdown": breakdown,
        "top_traits": top_traits,
    }
