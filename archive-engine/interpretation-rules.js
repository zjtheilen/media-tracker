const interpretationRules = [

    {
        id: "high-engagement",

        evaluate(profile) {

            return (
                profile.universalAverages.engagement >= 8.5
            );

        },

        text(profile) {

            return (
                "The archive demonstrates a strong preference for experiences that maintain sustained engagement."
            );

        }

    }

];