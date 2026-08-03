def calculate_identity_confidence(identity, profile):

    minimum_entries = identity.get("requirements", {}).get("minimum_entries", 0)

    entry_count = profile.get("entryCount", 0)

    if minimum_entries == 0:
        return 1

    confidence = entry_count / minimum_entries

    return min(round(confidence, 3), 1)
