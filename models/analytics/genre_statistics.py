from itertools import combinations


def get_genre_statistics(entries):
    genre_stats = {}

    for entry in entries:
        for genre in entry.genres:
            if genre not in genre_stats:
                genre_stats[genre] = {
                    "count": 0,
                    "total_score": 0,
                    "media_types": {},
                    "entries": [],
                }

            stats = genre_stats[genre]

            stats["count"] += 1
            stats["total_score"] += entry.total_score
            stats["entries"].append(entry.id)

            media_type = entry.media_type
            stats["media_types"][media_type] = (
                stats["media_types"].get(media_type, 0) + 1
            )

    for genre, stats in genre_stats.items():
        stats["average_score"] = round(stats["total_score"] / stats["count"], 2)

        del stats["total_score"]

    return {
        "summary": {
            "unique_genres": len(genre_stats),
            "total_genre_assignments": sum(g["count"] for g in genre_stats.values()),
        },
        "genres": genre_stats,
    }


def get_top_genres_by_score(genre_stats, minimum_count=2, limit=5):
    genres = []

    for genre, stats in genre_stats["genres"].items():
        if stats["count"] < minimum_count:
            continue

        genres.append(
            {
                "genre": genre,
                "average_score": stats["average_score"],
                "count": stats["count"],
            }
        )

    return sorted(genres, key=lambda x: x["average_score"], reverse=True)[:limit]


def get_favorite_genre_combinations(entries, limit=5):

    combinations_found = {}

    for entry in entries:
        genres = sorted(entry.genres)

        for pair in combinations(genres, 2):
            key = tuple(pair)

            if key not in combinations_found:
                combinations_found[key] = {"count": 0, "total_score": 0}

            combinations_found[key]["count"] += 1
            combinations_found[key]["total_score"] += entry.total_score

    results = []

    for genres, data in combinations_found.items():
        results.append(
            {
                "genres": list(genres),
                "count": data["count"],
                "average_score": round(data["total_score"] / data["count"], 2),
            }
        )

    return sorted(results, key=lambda x: x["average_score"], reverse=True)[:limit]


def get_media_genre_affinity(entries):

    affinity = {}

    for entry in entries:
        for genre in entry.genres:
            if genre not in affinity:
                affinity[genre] = {}

            media = entry.media_type

            if media not in affinity[genre]:
                affinity[genre][media] = {"count": 0, "total_score": 0}

            affinity[genre][media]["count"] += 1
            affinity[genre][media]["total_score"] += entry.total_score

    for genre in affinity:
        for media in affinity[genre]:
            data = affinity[genre][media]

            data["average_score"] = round(data["total_score"] / data["count"], 2)

            del data["total_score"]

    return affinity
