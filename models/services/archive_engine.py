from .archive_utils import (
    calculate_average_scores,
    get_top_categories,
    calculate_designation_confidence,
)

from .archive_profile import (
    calculate_archive_average_score,
    get_highest_rated_entry,
    get_lowest_rated_entry,
    calculate_genre_distribution,
    calculate_media_distribution,
    generate_classification_basis,
)

from .designation_engine import evaluate_designations
from .finding_engine import evaluate_findings
from .archive_interpretation import (
    generate_primary_trait_sentence,
    generate_secondary_trait_sentence,
    generate_media_signature_sentence,
    generate_archive_summary,
    generate_genre_signature_sentence,
)

from .archive_narrative import (
    get_designation_confidence_label,
)


def build_archive_profile(entries):

    if not entries:
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
            "classificationBasis": None,
            "designations": [],
            "primaryDesignation": None,
            "findings": [],
            "archiveSummary": "The archive does not contain enough data for interpretation.",
            "primaryTrait": None,
            "secondaryTrait": None,
            "mediaSignature": None,
            "genreSignature": None,
        }

    universal_averages = calculate_average_scores(entries, "universal_scores")

    media_averages = calculate_average_scores(entries, "media_scores")

    media_distribution = calculate_media_distribution(entries)

    top_universal = get_top_categories(universal_averages)

    top_media = get_top_categories(media_averages)

    average_score = calculate_archive_average_score(entries)

    highest_rated_entry = get_highest_rated_entry(entries)

    lowest_rated_entry = get_lowest_rated_entry(entries)

    genre_distribution = calculate_genre_distribution(entries)

    classification_basis = generate_classification_basis(
        top_universal[0],
        top_universal[1],
        top_media[0],
    )

    designation_confidence = calculate_designation_confidence(
        top_universal[0],
        top_universal[1],
        top_media[0],
    )

    designation_confidence_label = get_designation_confidence_label(
        designation_confidence
    )

    archive_profile = {
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
        "designationConfidence": designation_confidence,
        "designationConfidenceLabel": designation_confidence_label,
        "classificationBasis": classification_basis,
    }

    archive_profile["designations"] = evaluate_designations(archive_profile)

    archive_profile["primaryDesignation"] = archive_profile["designations"][0]

    archive_profile["findings"] = evaluate_findings(archive_profile)

    primary_trait, primary_score = archive_profile["topUniversal"][0]
    secondary_trait, secondary_score = archive_profile["topUniversal"][1]
    # media_trait, media_score = archive_profile["topMedia"][0]

    archive_profile["primaryTrait"] = generate_primary_trait_sentence(
        primary_trait,
        primary_score,
    )

    archive_profile["secondaryTrait"] = generate_secondary_trait_sentence(
        secondary_trait,
        secondary_score,
    )

    # archive_profile["mediumSignature"] = generate_media_signature_sentence(
    #     media_trait,
    #     media_score,
    # )

    genre_signature = generate_genre_signature_sentence(genre_distribution)

    archive_profile["genreSignature"] = genre_signature

    archive_profile["archiveSummary"] = generate_archive_summary(
        archive_profile["primaryDesignation"],
        top_universal[0],
        top_universal[1],
        archive_profile["genreSignature"],
    )

    return archive_profile
