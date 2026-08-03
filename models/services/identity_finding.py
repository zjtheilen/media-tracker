from .identity_explainer import explain_identity_score


def generate_identity_finding(identity, profile):

    explanation = explain_identity_score(identity, profile)

    return {
        "id": "identity-profile",
        "category": "Archive Identity",
        "title": identity["name"],
        "description": identity["description"],
        "evidence": {
            "traits": explanation["top_traits"],
            "recommendation_bias": identity.get("recommendation_bias", []),
        },
    }
