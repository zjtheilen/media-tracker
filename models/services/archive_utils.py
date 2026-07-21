def calculate_average_scores(entries, score_type):

    totals = {}
    counts = {}

    for entry in entries:
        scores = entry.get(score_type, {})

        for category, value in scores.items():
            totals[category] = totals.get(category, 0) + value

            counts[category] = counts.get(category, 0) + 1

    averages = {}

    for category, total in totals.items():
        averages[category] = round(total / counts[category], 2)

    return averages


def get_top_categories(averages, count=2):

    return sorted(averages.items(), key=lambda item: item[1], reverse=True)[:count]


def format_score_category(category):

    return " ".join(word.capitalize() for word in category.split("_"))


def calculate_designation_confidence(primary_trait, secondary_trait, media_trait):

    confidence = (primary_trait[1] + secondary_trait[1] + media_trait[1]) / 3

    return round(confidence, 1)
