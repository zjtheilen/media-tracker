from models.services.archive_statistics import (
    calculate_archive_average_score,
    calculate_genre_distribution,
    calculate_media_distribution,
    get_highest_rated_entry,
    get_lowest_rated_entry,
)
from models.services.genre_intelligence import (
    calculate_genre_affinity,
    calculate_genre_combinations,
)
from models.services.identity_engine import generate_identity
from models.services.identity_scorer import evaluate_identity_scores

from .archive_interpretation import (
    generate_archive_summary,
    generate_genre_signature_sentence,
    generate_observation_summary,
    generate_primary_trait_sentence,
    generate_secondary_trait_sentence,
)
from .archive_narrative import (
    get_designation_signal_strength_label,
)
from .archive_utils import (
    calculate_average_scores,
    calculate_designation_signal_strength,
    get_top_categories,
)
from .designation_basis import (
    generate_designation_basis,
)
from .designation_engine import (
    evaluate_designations,
    resolve_primary_designation,
)
from .finding_engine import evaluate_findings
from .observation_engine import evaluate_observations
from .profile_metrics import calculate_profile_metrics
from .trait_calculator import calculate_archive_traits


def build_archive_profile(entries):

    if not entries:
        return _empty_profile()

    archive_profile = _build_statistics(entries)

    _build_traits(archive_profile)

    _build_metrics(archive_profile)

    _build_designations(archive_profile)

    _build_identities(archive_profile)

    _build_observations(archive_profile)

    _build_findings(archive_profile)

    _build_narrative(archive_profile)

    return archive_profile


def _build_statistics(entries):
    universal_averages = calculate_average_scores(entries, "universal_scores")

    media_averages = calculate_average_scores(entries, "media_scores")

    media_distribution = calculate_media_distribution(entries)

    top_universal = get_top_categories(universal_averages)
    while len(top_universal) < 2:
        top_universal.append(("none", 0))

    top_media = get_top_categories(media_averages)
    if not top_media:
        top_media = [("none", 0)]

    average_score = calculate_archive_average_score(entries)

    highest_rated_entry = get_highest_rated_entry(entries)

    lowest_rated_entry = get_lowest_rated_entry(entries)

    genre_distribution = calculate_genre_distribution(entries)

    return {
        "entries": entries,
        "entryCount": len(entries),
        "universalAverages": universal_averages,
        "mediaAverages": media_averages,
        "mediaDistribution": media_distribution,
        "genreDistribution": genre_distribution,
        "averageScore": average_score,
        "highestRatedEntry": highest_rated_entry,
        "lowestRatedEntry": lowest_rated_entry,
        "topUniversal": top_universal,
        "topMedia": top_media,
    }


def _build_narrative(archive_profile):
    primary_trait, primary_score = archive_profile["topUniversal"][0]
    secondary_trait, secondary_score = archive_profile["topUniversal"][1]

    archive_profile["primaryTrait"] = generate_primary_trait_sentence(
        primary_trait,
        primary_score,
    )

    archive_profile["secondaryTrait"] = generate_secondary_trait_sentence(
        secondary_trait,
        secondary_score,
    )

    genre_signature = generate_genre_signature_sentence(
        archive_profile["genreDistribution"]
    )

    archive_profile["genreSignature"] = genre_signature

    # print(archive_profile["primaryIdentity"])

    archive_profile["archiveSummary"] = generate_archive_summary(
        archive_profile["primaryDesignation"],
        archive_profile["primaryIdentity"],
        archive_profile["topUniversal"][0],
        archive_profile["topUniversal"][1],
        archive_profile["genreSignature"],
    )


def _build_metrics(archive_profile):
    archive_profile.update(calculate_profile_metrics(archive_profile))
    archive_profile["genreAffinity"] = calculate_genre_affinity(archive_profile)
    archive_profile["genreCombinations"] = calculate_genre_combinations(archive_profile)


def _build_designations(archive_profile):

    archive_profile["designationBasis"] = generate_designation_basis(
        archive_profile["topUniversal"][0],
        archive_profile["topUniversal"][1],
        archive_profile["topMedia"][0],
    )

    archive_profile["designationConfidence"] = calculate_designation_signal_strength(
        archive_profile["topUniversal"][0],
        archive_profile["topUniversal"][1],
        archive_profile["topMedia"][0],
    )

    archive_profile["designationConfidenceLabel"] = get_designation_signal_strength_label(
        archive_profile["designationConfidence"]
    )

    archive_profile["designations"] = evaluate_designations(archive_profile)

    archive_profile["primaryDesignation"] = resolve_primary_designation(
        archive_profile["designations"]
    )


def _build_observations(archive_profile):
    archive_profile["observations"] = evaluate_observations(archive_profile)

    archive_profile["observationSummary"] = generate_observation_summary(
        archive_profile["observations"]
    )


def _build_findings(archive_profile):
    archive_profile["findings"] = evaluate_findings(archive_profile)


def _build_identities(archive_profile):
    archive_profile["identities"] = evaluate_identity_scores(archive_profile)
    archive_profile["primaryIdentity"] = generate_identity(archive_profile)


def _build_traits(archive_profile):

    archive_profile["traits"] = calculate_archive_traits(archive_profile)


def _empty_profile():

    return {
        "entries": [],
        "entryCount": 0,
        "universalAverages": {},
        "mediaAverages": {},
        "mediaDistribution": {
            "video": 0,
            "game": 0,
            "book": 0,
        },
        "genreDistribution": {},
        "averageScore": 0,
        "highestRatedEntry": None,
        "lowestRatedEntry": None,
        "topUniversal": [],
        "topMedia": [],
        "designationConfidence": 0,
        "designationConfidenceLabel": "Tentative",
        "designationBasis": None,
        "designations": [],
        "primaryDesignation": None,
        "identities": [],
        "primaryIdentity": None,
        "observations": [],
        "observationSummary": None,
        "findings": [],
        "archiveSummary": "The archive does not contain enough data for interpretation.",
        "primaryTrait": None,
        "secondaryTrait": None,
        "mediaSignature": None,
        "genreSignature": None,
    }
