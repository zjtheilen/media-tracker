def normalize_identity_score(value):
    return max(0, min(value / 10, 1))