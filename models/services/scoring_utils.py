def score_threshold(value, thresholds):

    for threshold in thresholds:
        if value >= threshold["value"]:
            return threshold["score"]

    return 0
