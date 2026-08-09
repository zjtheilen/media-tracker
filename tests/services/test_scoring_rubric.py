from models.services.scoring_rubric import (
    SCORING_RUBRIC,
    get_metric_meaning,
    get_score_meaning,
)


def test_scoring_rubric_contains_all_scores():
    assert set(SCORING_RUBRIC.keys()) == set(range(1, 11))


def test_scoring_rubric_meanings_are_not_empty():
    for score in range(1, 11):
        assert get_score_meaning(score)
        assert isinstance(get_score_meaning(score), str)


def test_score_one_means_terrible():
    assert get_score_meaning(1) == SCORING_RUBRIC[1]


def test_score_five_means_okay():
    assert get_score_meaning(5) == SCORING_RUBRIC[5]


def test_score_ten_means_no_improvement_possible():
    assert get_score_meaning(10) == SCORING_RUBRIC[10]


def test_invalid_scores_are_not_valid():
    assert get_score_meaning(0) is None
    assert get_score_meaning(11) is None


def test_depth_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("depth", score)


def test_depth_rubric_invalid_score_returns_none():
    assert get_metric_meaning("depth", 0) is None
    assert get_metric_meaning("depth", 11) is None


def test_unknown_metric_returns_none():
    assert get_metric_meaning("not_a_real_metric", 8) is None


def test_craft_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("craft", score)


def test_engagement_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("engagement", score)


def test_emotional_impact_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("emotional_impact", score)


def test_presentation_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("presentation", score)


def test_originality_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("originality", score)
