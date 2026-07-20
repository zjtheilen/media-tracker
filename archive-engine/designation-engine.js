const designationPriority = [

    "archivist",
    "explorer",
    "curator",
    "pattern-seeker",
    "immersionist",
    "analyst",
    "technician",
    "storyteller"

];

function evaluateDesignations(profile) {

    return designationRules
        .map(rule => {

            return {

                id: rule.id,

                title: rule.title,

                description: rule.description,

                score: rule.evaluate(profile)

            };

        })
        .sort(
            (a, b) => b.score - a.score
        );
}

function selectArchiveDesignations(results) {

    if (!results.length) {

        return {

            primary: null,

            secondary: [],

            confidence: 0

        };

    }

    const primary =
        results
            .filter(result => result.score === results[0].score)
            .sort(
                (a, b) =>
                    designationPriority.indexOf(a.id) -
                    designationPriority.indexOf(b.id)
            )[0];


    const secondary =
        results
            .filter(result =>
                result.id !== primary.id &&
                result.score >= primary.score - 15
            )
            .slice(0, 2);


    return {

        primary,

        secondary,

        confidence:
            primary.score

    };
}