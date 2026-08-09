SCORING_RUBRIC = {
    1: "Terrible — fundamentally fails; little to no redeeming value.",
    2: "Very poor — major problems dominate the experience.",
    3: "Poor — significant weaknesses outweigh the strengths.",
    4: "Below average — some worthwhile qualities, but clearly flawed.",
    5: "Okay — acceptable and functional, but neither notably good nor bad.",
    6: "Decent — more strengths than weaknesses, but still noticeably limited.",
    7: "Good — clearly successful with meaningful strengths and relatively minor flaws.",
    8: "Very good — strong execution with only a few notable weaknesses.",
    9: "Excellent — exceptional quality with very little meaningful room for improvement.",
    10: "No improvement possible — essentially perfect for the category being scored.",
}


def get_score_meaning(score):
    return SCORING_RUBRIC.get(score)
