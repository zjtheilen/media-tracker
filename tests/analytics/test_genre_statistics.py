from types import SimpleNamespace

from models.analytics.genre_statistics import (
    get_favorite_genre_combinations,
    get_genre_statistics,
    get_media_genre_affinity,
    get_top_genres_by_score,
)


def make_entry(entry_id, genres, score, media_type):
    return SimpleNamespace(
        id=entry_id,
        genres=genres,
        total_score=score,
        media_type=media_type,
    )


def test_genre_statistics_empty_entries():
    result = get_genre_statistics([])

    assert result == {
        "summary": {
            "unique_genres": 0,
            "total_genre_assignments": 0,
        },
        "genres": {},
    }


def test_genre_statistics_aggregates_genres():
    entries = [
        make_entry("1", ["horror"], 90, "game"),
        make_entry("2", ["horror"], 80, "game"),
        make_entry("3", ["sci-fi"], 100, "book"),
    ]

    result = get_genre_statistics(entries)

    assert result["summary"] == {
        "unique_genres": 2,
        "total_genre_assignments": 3,
    }

    assert result["genres"]["horror"]["count"] == 2
    assert result["genres"]["horror"]["average_score"] == 85
    assert result["genres"]["horror"]["entries"] == ["1", "2"]
    assert result["genres"]["horror"]["media_types"] == {"game": 2}

    assert result["genres"]["sci-fi"]["count"] == 1
    assert result["genres"]["sci-fi"]["average_score"] == 100


def test_genre_statistics_counts_each_genre_assignment():
    entries = [
        make_entry(
            "1",
            ["horror", "psychological"],
            90,
            "game",
        )
    ]

    result = get_genre_statistics(entries)

    assert result["summary"]["unique_genres"] == 2
    assert result["summary"]["total_genre_assignments"] == 2

    assert result["genres"]["horror"]["count"] == 1
    assert result["genres"]["psychological"]["count"] == 1


def test_genre_statistics_aggregates_scores():
    entries = [
        make_entry("1", ["horror"], 90, "game"),
        make_entry("2", ["horror"], 80, "book"),
        make_entry("3", ["horror"], 70, "movie"),
    ]

    result = get_genre_statistics(entries)

    horror = result["genres"]["horror"]

    assert horror["count"] == 3
    assert horror["average_score"] == 80
    assert horror["entries"] == ["1", "2", "3"]
    assert horror["media_types"] == {
        "game": 1,
        "book": 1,
        "movie": 1,
    }


def test_get_top_genres_by_score_ranks_by_average_score():
    entries = [
        make_entry("1", ["horror"], 70, "game"),
        make_entry("2", ["horror"], 80, "book"),
        make_entry("3", ["sci-fi"], 95, "game"),
        make_entry("4", ["sci-fi"], 85, "book"),
    ]

    stats = get_genre_statistics(entries)

    result = get_top_genres_by_score(stats)

    assert result == [
        {"genre": "sci-fi", "average_score": 90.0, "count": 2},
        {"genre": "horror", "average_score": 75.0, "count": 2},
    ]


def test_get_top_genres_by_score_applies_minimum_count():
    entries = [
        make_entry("1", ["horror"], 90, "game"),
        make_entry("2", ["horror"], 80, "book"),
        make_entry("3", ["sci-fi"], 100, "game"),
        make_entry("4", ["fantasy"], 95, "book"),
    ]

    stats = get_genre_statistics(entries)

    result = get_top_genres_by_score(stats, minimum_count=2)

    assert result == [
        {"genre": "horror", "average_score": 85.0, "count": 2},
    ]


def test_get_top_genres_by_score_applies_limit():
    entries = [
        make_entry("1", ["horror"], 70, "game"),
        make_entry("2", ["horror"], 80, "book"),
        make_entry("3", ["sci-fi"], 95, "game"),
        make_entry("4", ["sci-fi"], 85, "book"),
        make_entry("5", ["fantasy"], 90, "book"),
        make_entry("6", ["fantasy"], 80, "game"),
    ]

    stats = get_genre_statistics(entries)

    result = get_top_genres_by_score(stats, limit=2)

    assert result == [
        {"genre": "sci-fi", "average_score": 90.0, "count": 2},
        {"genre": "fantasy", "average_score": 85.0, "count": 2},
    ]


def test_get_favorite_genre_combinations_counts_genre_pairs():
    entries = [
        make_entry("1", ["horror", "psychological"], 90, "game"),
        make_entry("2", ["horror", "psychological"], 80, "book"),
        make_entry("3", ["horror", "sci-fi"], 85, "movie"),
    ]

    result = get_favorite_genre_combinations(entries)

    assert result == [
        {"genres": ["horror", "psychological"], "count": 2, "average_score": 85.0},
        {"genres": ["horror", "sci-fi"], "count": 1, "average_score": 85.0},
    ]


def test_get_favorite_genre_combinations_ignores_single_genre_entries():
    entries = [
        make_entry("1", ["horror"], 90, "game"),
        make_entry("2", ["horror", "psychological"], 80, "book"),
        make_entry("3", ["horror", "psychological"], 70, "movie"),
    ]

    result = get_favorite_genre_combinations(entries)

    assert result == [
        {
            "genres": ["horror", "psychological"],
            "count": 2,
            "average_score": 75.0,
        }
    ]


def test_get_favorite_genre_combinations_creates_all_pairs():
    entries = [
        make_entry(
            "1",
            ["horror", "psychological", "surreal"],
            90,
            "movie",
        )
    ]

    result = get_favorite_genre_combinations(entries)

    assert result == [
        {
            "genres": ["horror", "psychological"],
            "count": 1,
            "average_score": 90.0,
        },
        {
            "genres": ["horror", "surreal"],
            "count": 1,
            "average_score": 90.0,
        },
        {
            "genres": ["psychological", "surreal"],
            "count": 1,
            "average_score": 90.0,
        },
    ]


def test_get_media_genre_affinity_groups_by_genre_and_media_type():
    entries = [
        make_entry("1", ["horror"], 90, "game"),
        make_entry("2", ["horror"], 70, "game"),
        make_entry("3", ["horror"], 80, "movie"),
        make_entry("4", ["sci-fi"], 100, "book"),
    ]

    result = get_media_genre_affinity(entries)

    assert result == {
        "horror": {
            "game": {
                "count": 2,
                "average_score": 80.0,
            },
            "movie": {
                "count": 1,
                "average_score": 80.0,
            },
        },
        "sci-fi": {
            "book": {
                "count": 1,
                "average_score": 100.0,
            },
        },
    }


def test_get_media_genre_affinity_empty_entries():
    result = get_media_genre_affinity([])

    assert result == {}


def test_get_favorite_genre_combinations_applies_limit():
    entries = [
        make_entry("1", ["a", "b"], 90, "game"),
        make_entry("2", ["a", "c"], 85, "game"),
        make_entry("3", ["a", "d"], 80, "game"),
        make_entry("4", ["a", "e"], 75, "game"),
        make_entry("5", ["a", "f"], 70, "game"),
        make_entry("6", ["a", "g"], 65, "game"),
    ]

    result = get_favorite_genre_combinations(entries, limit=3)

    assert result == [
        {"genres": ["a", "b"], "count": 1, "average_score": 90.0},
        {"genres": ["a", "c"], "count": 1, "average_score": 85.0},
        {"genres": ["a", "d"], "count": 1, "average_score": 80.0},
    ]
