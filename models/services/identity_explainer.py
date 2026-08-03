from .identity_scoring import calculate_identity_breakdown
from .identity_utils import normalize


def explain_identity_score(identity, profile):

    breakdown = calculate_identity_breakdown(
        identity,
        profile,
        normalize,
    )

    return {
        "score": round(
            sum(item["contribution"] for item in breakdown),
            3,
        ),
        "breakdown": breakdown,
        "top_traits": breakdown[:3],
    }
