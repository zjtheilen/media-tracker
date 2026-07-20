const genreSignals = {

    mystery: {
        detective: 1,
        patternSeeker: 0.8,
        analyst: 0.5
    },

    psychological: {
        detective: 1,
        patternSeeker: 1,
        analyst: 0.8
    },

    surreal: {
        patternSeeker: 1,
        experimentalist: 1,
        analyst: 0.7
    },

    sciFi: {
        scholar: 0.8,
        explorer: 0.8,
        experimentalist: 0.6
    },

    fantasy: {
        escapist: 1,
        immersionist: 0.8,
        explorer: 0.6
    }

};

function getGenreSignal(profile, designation) {

    let score = 0;

    for (const genre in profile.genreDistribution) {

        const count =
            profile.genreDistribution[genre].count;

        const weight =
            genreSignals[genre]?.[designation] || 0;

        score += count * weight;
    }

    return score;

}

function genreWeight(genre, profile) {

    const entry =
        profile.genreDistribution[genre];

    if (!entry) {
        return 0;
    }


    const count =
        entry.count;


    const total =
        profile.entryCount;


    return count / total;
}

function traitStrength(value) {

    if (!value) return 0;

    return Math.min(
        Math.max(
            // (value - 5) / 5,
            (value - 6) / 4,
            0
        ),
        1
    );
}

function genrePresence(genre, profile) {

    const entry =
        profile.genreDistribution[genre];

    if (!entry) return 0;

    return entry.count / profile.entryCount;
}


function genreStrength(genre, profile) {

    return genrePresence(genre, profile) * 100;
}

