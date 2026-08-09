from models.services.scoring_rubric import SCORING_RUBRIC, get_score_meaning


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
