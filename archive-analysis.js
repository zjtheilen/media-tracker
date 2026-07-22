function calculateArchiveAverageScore(entries) {

    if (entries.length === 0) {
        return 0;
    }


    const total =
        entries.reduce(
            (sum, entry) =>
                sum + entry.total_score,
            0
        );


    return total / entries.length;

}

function getHighestRatedEntry(entries) {

    if (entries.length === 0) {
        return null;
    }


    return entries.reduce(
        (highest, entry) => {

            if (!highest) {
                return entry;
            }


            return entry.total_score > highest.total_score
                ? entry
                : highest;

        },
        null
    );

}

function getLowestRatedEntry(entries) {

    if (entries.length === 0) {
        return null;
    }


    return entries.reduce(
        (lowest, entry) => {

            if (!lowest) {
                return entry;
            }


            return entry.total_score < lowest.total_score
                ? entry
                : lowest;

        },
        null
    );

}

function calculateGenreDistribution(entries) {

    const genres = {};


    entries.forEach(entry => {

        entry.genres.forEach(genre => {

            if (!genres[genre]) {
                genres[genre] = 0;
            }

            genres[genre]++;

        });

    });


    const distribution = {};


    Object.entries(genres).forEach(([genre, count]) => {

        distribution[genre] = {

            count,

            percentage:
                ((count / entries.length) * 100)
                    .toFixed(1)

        };

    });


    return distribution;

}


function calculateMediaDistribution(entries) {

    const distribution = {
        video: 0,
        game: 0,
        book: 0
    };


    entries.forEach(entry => {

        if (distribution.hasOwnProperty(entry.media_type)) {

            distribution[entry.media_type]++;

        }

    });


    return distribution;

}