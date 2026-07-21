from models.services.scoring_utils import score_threshold


def test_score_threshold():

    thresholds = [{"value": 8, "score": 100}, {"value": 6, "score": 50}]

    assert score_threshold(9, thresholds) == 100
    assert score_threshold(7, thresholds) == 50
    assert score_threshold(5, thresholds) == 0
