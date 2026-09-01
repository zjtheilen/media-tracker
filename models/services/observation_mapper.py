def map_observation(rule, profile):

    observation = rule["generate"](profile)

    return {
        **observation,
        "id": rule["id"],
        "category": rule["category"],
        "traits": rule.get("traits", []),
        "genres": rule.get("genres", []),
        "evidenceStrength": rule["evidence_strength"](profile),
        "relatedDesignations": rule.get(
            "related_designations",
            [],
        ),
    }
