def genre_affinity(profile, genre):
    return profile.get("genreAffinity", {}).get(genre, 0)
