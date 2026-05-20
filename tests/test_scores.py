from models.entry import Entry
from models.media_item import MediaItem
from models.score import Score

def make_uniform_scores(value: int):
    return [
        Score("emotional_impact", value),
        Score("depth", value),
        Score("craft", value),
        Score("engagement", value),
        Score("presentation", value),
        Score("originality", value),
    ]

def test_perfect_score():
    entry = Entry(
        media_item=MediaItem("Test Game", "game"),
        genres=["horror"],
        scores=make_uniform_scores(10)
    )

    assert entry.total_score() == 100

def test_average_score():
    entry = Entry(
        media_item=MediaItem("Test Game", "game"),
        genres = ["horror"],
        scores=make_uniform_scores(5)
    )

    assert entry.total_score() == 50

def test_low_score():
    entry = Entry(
        media_item=MediaItem("Test Game", "game"),
        genres=["horror"],
        scores=make_uniform_scores(1)
    )

    assert entry.total_score() == 10

def test_weighting_behavior():
    test_scores=[
        Score("emotional_impact", 10),
        Score("depth", 8),
        Score("craft", 4),
        Score("engagement", 7),
        Score("presentation", 10),
        Score("originality", 5),
    ]

    entry = Entry(
        media_item=MediaItem("Test Game", "game"),
        genres=["horror"],
        scores=test_scores
    )

    assert abs(entry.total_score() - 76.2) < 0.01
