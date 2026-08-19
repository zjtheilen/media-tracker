from .identity_scorer import get_primary_identity
from .identity_explainer import explain_identity_score
from .identity_data_sufficiency import calculate_identity_data_sufficiency


def generate_identity(profile):

    identity = get_primary_identity(profile)

    if not identity:
        return None

    explanation = explain_identity_score(
        identity,
        profile,
    )

    data_sufficiency = calculate_identity_data_sufficiency(
        identity,
        profile,
    )

    return {
        **identity,
        **explanation,
        "data_sufficiency": data_sufficiency,
    }