def metric_evidence(metric, label, value, unit="score"):
    return {
        "metric": metric,
        "label": label,
        "value": value,
        "unit": unit,
        "type": "metric",
    }


def genre_evidence(genre, label, value, unit="percent"):
    return {
        "metric": genre,
        "label": label,
        "value": value,
        "unit": unit,
        "type": "genre",
    }
