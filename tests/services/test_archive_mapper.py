from types import SimpleNamespace

from models.services.archive_mapper import entry_to_archive_format


def test_entry_to_archive_format():

    entry = SimpleNamespace(
        title="Silent Hill 2",
        media_type="game",
        genres=["horror"],
        total_score=92,
        scores={
            "depth": 10,
            "originality": 9,
            "craft": 9,
            "emotional_impact": 10,
            "engagement": 9,
            "presentation": 8,
            "art_atmosphere": 10,
            "gameplay_mechanics": 9,
        },
    )

    result = entry_to_archive_format(entry)

    assert result["title"] == "Silent Hill 2"

    assert result["genres"] == ["horror"]

    assert result["total_score"] == 92

    assert result["universal_scores"]["depth"] == 10

    assert result["universal_scores"]["originality"] == 9

    assert result["media_scores"]["art_atmosphere"] == 10

    assert result["media_scores"]["gameplay_mechanics"] == 9
