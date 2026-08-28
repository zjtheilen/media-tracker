from .identity_data_sufficiency import calculate_identity_data_sufficiency
from .identity_explainer import explain_identity_score
from .identity_scorer import evaluate_identity_scores

SECONDARY_MIN_SCORE = 0.60


def _identity_evidence_key(identity):

    return tuple(
        item["contribution"]
        for item in identity.get("breakdown", [])
    )


def compare_identity_evidence(first, second):

    first_evidence = [
        item["contribution"]
        for item in first.get("breakdown", [])
    ]

    second_evidence = [
        item["contribution"]
        for item in second.get("breakdown", [])
    ]

    return (first_evidence > second_evidence) - (
        first_evidence < second_evidence
    )


def resolve_identity_candidates(profile):

    results = evaluate_identity_scores(profile)

    if not results:
        return None, None

    primary = results[0]

    tied_candidates = [
        identity
        for identity in results
        if identity["score"] == primary["score"]
    ]

    if len(tied_candidates) > 1:

        for candidate in tied_candidates[1:]:

            comparison = compare_identity_evidence(
                candidate,
                primary,
            )

            if comparison > 0:
                primary = candidate

    secondary = next(
        (
            identity
            for identity in results
            if identity["id"] != primary["id"]
            and identity["score"] >= SECONDARY_MIN_SCORE
        ),
        None,
    )

    return primary, secondary


def enrich_identity(identity, profile):

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


def generate_identity(profile):

    primary, secondary = resolve_identity_candidates(profile)

    if not primary:
        return None

    return {
        **enrich_identity(primary, profile),
        "secondary_identity": enrich_identity(secondary, profile),
    }

