def metric_evidence(
    metric,
    label,
    value,
    unit="score",
):
    return {
        "metric": metric,
        "label": label,
        "value": value,
        "unit": unit,
        "type": "metric",
    }


def genre_evidence(
    genre,
    label,
    percentage,
):
    return {
        "metric": genre,
        "label": label,
        "value": percentage,
        "unit": "percent",
        "type": "genre",
    }