from .trait_calculator import calculate_archive_traits


def calculate_archive_average_score(entries):

    if not entries:
        return 0

    total = sum(entry["total_score"] for entry in entries)

    return total / len(entries)


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
