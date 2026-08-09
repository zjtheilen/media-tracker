from models.scoring_profile import MEDIA_SCORING_PROFILES, UNIVERSAL_SCORING_PROFILE
from models.services.scoring_rubric import (
    SCORING_RUBRIC,
    get_metric_meaning,
    get_score_meaning,
    has_metric_rubric,
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


def test_prose_writing_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("prose_writing", score)


def test_character_development_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("character_development", score)


def test_world_building_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("world_building", score)


def test_narrative_pacing_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("narrative_pacing", score)


def test_cinematography_visuals_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("cinematography_visuals", score)


def test_acting_performances_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("acting_performances", score)


def test_directing_editing_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("directing_editing", score)


def test_sound_music_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("sound_music", score)


def test_gameplay_mechanics_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("gameplay_mechanics", score)


def test_level_design_progression_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("level_design_progression", score)


def test_replayability_systems_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("replayability_systems", score)


def test_art_atmosphere_rubric_contains_all_scores():
    for score in range(1, 11):
        assert get_metric_meaning("art_atmosphere", score)


def test_has_metric_rubric():
    assert has_metric_rubric("depth")
    assert has_metric_rubric("craft")
    assert has_metric_rubric("gameplay_mechanics")
    assert has_metric_rubric("prose_writing")
    assert has_metric_rubric("cinematography_visuals")
    assert not has_metric_rubric("bullshit_metric")


def test_all_scoring_categories_have_metric_rubrics():
    categories = set(UNIVERSAL_SCORING_PROFILE)

    for profile in MEDIA_SCORING_PROFILES.values():
        categories.update(profile)

    missing = [category for category in categories if not has_metric_rubric(category)]

    assert not missing, f"Missing metric rubrics: {missing}"
