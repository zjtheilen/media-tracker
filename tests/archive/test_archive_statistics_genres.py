from models.services.archive_statistics import calculate_genre_distribution


def test_genre_distribution():

    entries = [
        {"genres": ["horror", "psychological"]},
        {"genres": ["horror"]},
        {"genres": ["sci-fi"]},
    ]

    result = calculate_genre_distribution(entries)

    assert result["horror"]["count"] == 2
    assert result["horror"]["percentage"] == 66.7

    assert result["psychological"]["count"] == 1
    assert result["sci-fi"]["count"] == 1
