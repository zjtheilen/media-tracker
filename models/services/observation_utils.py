def score_confidence(value, threshold):
    if threshold == 0:
        return 0

    confidence = value / threshold

    return min(round(confidence, 2), 1)