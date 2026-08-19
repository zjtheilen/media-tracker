def calculate_identity_data_sufficiency(identity, profile):

    minimum_entries = identity.get("requirements", {}).get("minimum_entries", 0)

    entry_count = profile.get("entryCount", 0)

    if minimum_entries == 0:
        return 1

    data_sufficiency = entry_count / minimum_entries

    return min(round(data_sufficiency, 3), 1)
