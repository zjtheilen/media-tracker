const designationRules = [

    {
        id: "archivist",

        title: "The Archivist",

        description:
            "A collector drawn toward meaningful, unusual, and conceptually rich experiences.",

        evaluate(profile) {

            let score = 0;


            // Collection depth
            score += Math.min(
                profile.entryCount / 50,
                1
            ) * 20;


            // High evaluation standards
            score += traitStrength(
                profile.averageScore / 10
            ) * 20;


            // Conceptual depth
            score += traitStrength(
                profile.universalAverages.depth
            ) * 20;


            // Originality
            score += traitStrength(
                profile.universalAverages.originality
            ) * 20;


            // Genre diversity
            const genreVariety =
                Object.keys(profile.genreDistribution).length / 10;


            score += Math.min(
                genreVariety,
                1
            ) * 20;


            return Math.min(score, 100);
        }
    },


    {
        id: "explorer",

        title: "The Explorer",

        description:
            "A seeker driven by discovery across genres, formats, and unfamiliar experiences.",

        evaluate(profile) {

            let score = 0;


            score += Math.min(
                Object.keys(profile.genreDistribution).length / 8,
                1
            ) * 35;


            score += Math.min(
                Object.keys(profile.mediaDistribution).length / 3,
                1
            ) * 30;


            score += genreWeight(
                "experimental",
                profile
            ) * 15;


            score += genreWeight(
                "sciFi",
                profile
            ) * 20;


            return Math.min(score, 100);
        }
    },


    {
        id: "curator",

        title: "The Curator",

        description:
            "A selective evaluator with refined preferences and strong filtering.",

        evaluate(profile) {

            let score = 0;


            score += traitStrength(
                profile.averageScore / 10
            ) * 50;


            if (profile.lowestRatedEntry) {

                score += traitStrength(
                    profile.lowestRatedEntry.total_score / 10
                ) * 25;

            }


            score += Math.min(
                profile.entryCount / 20,
                1
            ) * 25;


            return Math.min(score, 100);
        }
    },


    {
        id: "immersionist",

        title: "The Immersionist",

        description:
            "A seeker of atmosphere, emotional connection, and deeply engaging experiences.",

        evaluate(profile) {

            let score = 0;

            const media = profile.mediaAverages;
            const universal = profile.universalAverages;


            score += traitStrength(
                media.world_building
            ) * 25;


            score += traitStrength(
                media.art_atmosphere
            ) * 25;


            score += traitStrength(
                universal.emotional_impact
            ) * 25;


            score += traitStrength(
                universal.engagement
            ) * 25;


            return Math.min(score, 100);
        }
    },


    {
        id: "analyst",

        title: "The Analyst",

        description:
            "A viewer drawn toward complexity, themes, and deeper meaning.",

        evaluate(profile) {

            let score = 0;

            score += traitStrength(profile.universalAverages.depth) * 40;
            score += traitStrength(profile.universalAverages.originality) * 30;
            score += traitStrength(profile.mediaAverages.world_building || 0) * 30;

            return Math.min(score, 100);
        }
    },


    {
        id: "pattern-seeker",

        title: "The Pattern Seeker",

        description:
            "A hunter of hidden connections, unusual structures, and ambiguous meaning.",

        evaluate(profile) {

            let score = 0;


            score += traitStrength(
                profile.universalAverages.originality
            ) * 30;

            score += traitStrength(
                profile.universalAverages.depth
            ) * 20;


            score += genreWeight(
                "psychological",
                profile
            ) * 25;

            score += genreWeight(
                "surreal",
                profile
            ) * 25;

            const experienceFactor =
                Math.min(profile.entryCount / 15, 1);

            score *= experienceFactor;


            return Math.min(score, 100);
        }
    },


    {
        id: "experimentalist",

        title: "The Experimentalist",

        description:
            "A seeker of unusual formats, unconventional ideas, and creative risks.",

        evaluate(profile) {

            let score = 0;


            score += genreWeight(
                "experimental",
                profile
            ) * 35;


            score += traitStrength(
                profile.universalAverages.originality
            ) * 40;


            score += Math.min(
                profile.entryCount / 40,
                1
            ) * 25;

            const experienceFactor =
                Math.min(profile.entryCount / 15, 1);

            score *= experienceFactor;


            return Math.min(score, 100);
        }
    },


    {
        id: "storyteller",

        title: "The Storyteller",

        description:
            "A collector who values narrative, characters, and emotional journeys.",

        evaluate(profile) {

            let score = 0;

            const media = profile.mediaAverages;


            score += traitStrength(
                media.narrative_pacing
            ) * 35;


            score += traitStrength(
                media.character_development
            ) * 35;


            score += traitStrength(
                profile.universalAverages.emotional_impact
            ) * 30;


            return Math.min(score, 100);
        }
    },


    {
        id: "chronicler",

        title: "The Chronicler",

        description:
            "A careful recorder who documents and preserves experiences.",

        evaluate(profile) {

            let score = 0;

            // Large archive
            score += Math.min(
                profile.entryCount / 40,
                1
            ) * 35;

            // Actually writes notes
            const entriesWithNotes =
                profile.entries.filter(
                    entry => entry.notes?.trim()
                ).length;

            score += Math.min(
                entriesWithNotes / profile.entryCount,
                1
            ) * 20;

            // Uses multiple media
            score += Math.min(
                Object.keys(profile.mediaDistribution).length / 3,
                1
            ) * 25;

            // Reflective / thoughtful scoring
            score += traitStrength(
                profile.universalAverages.depth
            ) * 20;

            return Math.min(score, 100);
        }
    },


    {
        id: "specialist",

        title: "The Specialist",

        description:
            "A focused collector with strong preferences in specific areas.",

        evaluate(profile) {

            const genres =
                Object.values(profile.genreDistribution)
                    .map(genre => genre.count);


            const total =
                genres.reduce((a, b) => a + b, 0);


            if (!total) {
                return 0;
            }


            const largest =
                Math.max(...genres);


            const preferenceStrength =
                (largest / total) * 100;


            const evidenceFactor =
                Math.min(
                    Math.sqrt(profile.entryCount / 20),
                    1
                );


            return Math.min(
                preferenceStrength * evidenceFactor,
                100
            );
        }
    },


    {
        id: "escapist",

        title: "The Escapist",

        description:
            "A seeker of immersive worlds and experiences beyond ordinary reality.",

        evaluate(profile) {

            let score = 0;


            score += genreWeight(
                "fantasy",
                profile
            ) * 30;


            score += genreWeight(
                "adventure",
                profile
            ) * 20;


            score += traitStrength(
                profile.mediaAverages.world_building || 0
            ) * 25;


            score += traitStrength(
                profile.universalAverages.emotional_impact
            ) * 25;


            return Math.min(score, 100);
        }
    },


    {
        id: "entertainer",

        title: "The Entertainer",

        description:
            "A collector who prioritizes enjoyment, momentum, and fun.",

        evaluate(profile) {

            let score = 0;


            score += traitStrength(
                profile.universalAverages.engagement
            ) * 40;


            score += traitStrength(
                profile.mediaAverages.gameplay_mechanics || 0
            ) * 25;


            score += traitStrength(
                profile.mediaAverages.narrative_pacing || 0
            ) * 20;


            score += traitStrength(
                profile.averageScore / 10
            ) * 15;


            return Math.min(score, 100);
        }
    },


    {
        id: "detective",

        title: "The Detective",

        description:
            "A seeker of mysteries, hidden meanings, and unanswered questions.",

        evaluate(profile) {

            let score = 0;


            score += genreWeight(
                "mystery",
                profile
            ) * 30;


            score += genreWeight(
                "psychological",
                profile
            ) * 25;


            score += genreWeight(
                "puzzle",
                profile
            ) * 20;


            score += traitStrength(
                profile.universalAverages.depth
            ) * 25;

            const experienceFactor =
                Math.min(profile.entryCount / 15, 1);

            score *= experienceFactor;


            return Math.min(score, 100);
        }
    },


    {
        id: "technician",

        title: "The Technician",

        description:
            "A collector who appreciates execution, systems, and craftsmanship.",

        evaluate(profile) {

            let score = 0;


            score += traitStrength(
                profile.universalAverages.craft
            ) * 35;

            score += traitStrength(
                profile.universalAverages.presentation
            ) * 25;

            score += Math.max(
                traitStrength(profile.mediaAverages.cinematography_visuals || 0),
                traitStrength(profile.mediaAverages.gameplay_mechanics || 0)
            ) * 25;

            score += traitStrength(
                profile.universalAverages.originality
            ) * 15;


            return Math.min(score, 100);
        }
    },


    {
        id: "scholar",

        title: "The Scholar",

        description:
            "A collector drawn toward knowledge, depth, and meaningful ideas.",

        evaluate(profile) {

            let score = 0;


            // Intellectual depth
            score += traitStrength(
                profile.universalAverages.depth
            ) * 35;


            // Original concepts / ideas
            score += traitStrength(
                profile.universalAverages.originality
            ) * 30;


            // World knowledge / constructed systems
            score += traitStrength(
                profile.mediaAverages.world_building || 0
            ) * 20;


            // Breadth of exploration
            score += Math.min(
                Object.keys(profile.genreDistribution).length / 8,
                1
            ) * 15;


            return Math.min(score, 100);
        }
    }

];
