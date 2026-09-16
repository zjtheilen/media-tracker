def calculate_archive_average_score(entries):

    if not entries:
        return 0

    total = sum(entry["total_score"] for entry in entries)

    return total / len(entries)


def calculate_score_variance(entries):

    if not entries:
        return 0

    scores = [entry["total_score"] for entry in entries]

    if len(scores) == 1:
        return 0

    mean = sum(scores) / len(scores)

    return sum((score - mean) ** 2 for score in scores) / len(scores)


def get_highest_rated_entry(entries):

    if not entries:
        return None

    return max(entries, key=lambda entry: entry["total_score"])


def get_lowest_rated_entry(entries):

    if not entries:
        return None

    return min(entries, key=lambda entry: entry["total_score"])


def calculate_genre_distribution(entries):

    genres = {}

    for entry in entries:
        for genre in entry.get("genres", []):
            genres[genre] = genres.get(genre, 0) + 1

    distribution = {}

    for genre, count in genres.items():
        percentage = (count / len(entries)) * 100 if entries else 0

        distribution[genre] = {"count": count, "percentage": round(percentage, 1)}

    return distribution


def calculate_media_distribution(entries):

    distribution = {"video": 0, "game": 0, "book": 0}

    for entry in entries:
        media_type = entry.get("media_type")

        if media_type in distribution:
            distribution[media_type] += 1

    return distribution


def calculate_completion_distribution(entries):

    distribution = {
        "completed": 0,
        "in-progress": 0,
        "dropped": 0,
        "planned": 0,
    }

    for entry in entries:
        completion_status = entry.get("completion_status")

        if completion_status in distribution:
            distribution[completion_status] += 1

    return distribution


def calculate_monthly_archive_activity(entries):

    activity = {}

    for entry in entries:
        date_consumed = entry.get("date_consumed")

        if not date_consumed:
            continue

        month = date_consumed[:7]
        activity[month] = activity.get(month, 0) + 1

    return activity


def calculate_monthly_media_distribution(entries):

    distribution = {}

    for entry in entries:
        date_consumed = entry.get("date_consumed")
        media_type = entry.get("media_type")

        if not date_consumed or media_type not in {"video", "game", "book"}:
            continue

        month = date_consumed[:7]

        if month not in distribution:
            distribution[month] = {
                "video": 0,
                "game": 0,
                "book": 0,
            }

        distribution[month][media_type] += 1

    return distribution
