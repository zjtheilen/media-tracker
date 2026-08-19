from .identity_scoring import calculate_identity_breakdown
from .identity_data_sufficiency import calculate_identity_data_sufficiency
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

    data_sufficiency = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    return {
        "score": score,
        "data_sufficiency": data_sufficiency,
        "breakdown": breakdown,
        "top_traits": top_traits,
    }
