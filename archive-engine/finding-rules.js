const findingRules = [

    {
        id: "concept-driven",

        category: "Taste Pattern",

        evaluate(profile) {

            return (
                profile.universalAverages.originality >= 8 &&
                profile.universalAverages.depth >= 8
            );

        },

        generate(profile) {

            return {

                title: "Concept-Driven Archive",

                description:
                    "Your highest rated works consistently favor unusual ideas and conceptual depth.",

                evidence:
                    `Originality ${profile.universalAverages.originality.toFixed(1)} / 10`

            };

        }

    }

];