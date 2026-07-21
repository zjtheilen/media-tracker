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


def build_archive_profile(entries):

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
        "classificationBasis": classification_basis,
    }

    archive_profile["designations"] = evaluate_designations(archive_profile)

    archive_profile["primaryDesignation"] = archive_profile["designations"][0]

    archive_profile["findings"] = evaluate_findings(archive_profile)

    return archive_profile
