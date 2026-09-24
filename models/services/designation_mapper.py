def map_designation(rule, score):
    return {
        "id": rule["id"],
        "title": rule["title"],
        "description": rule["description"],
        "score": score,
        "traits": rule.get("traits", []),
        "genres": rule.get("genres", []),
        "recommendation_bias": rule.get(
            "recommendation_bias",
            [],
        ),
    }