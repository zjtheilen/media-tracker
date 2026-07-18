function generateArchiveFindings(profile) {
    const findings = [];

    findings.push(
        ...detectEvaluationStyle(profile)
    );

    findings.push(
        ...detectGenrePreferences(profile)
    );

    findings.push(
        ...detectArchiveBalance(profile)
    );

    findings.push(
        ...detectEvaluationBehavior(profile)
    );

    findings.push(
        ...detectTastePatterns(profile)
    )

    findings.push(
        ...detectAtmospherePreference(profile)
    )

    findings.push(
        ...detectConceptPreference(profile)
    )

    findings.push(
        ...detectImmersionPreference(profile)
    )

    return findings;
}


function detectEvaluationStyle(profile) {

    const findings = [];

    const primary = profile.topUniversal[0];

    if (primary[0] === "engagement") {

        findings.push({

            category: "Evaluation Style",

            title: "Engagement-Driven Archive",

            description:
                "Your highest evaluations consistently prioritize sustained engagement above other universal factors.",

            evidence:
                `Engagement · ${primary[1].toFixed(1)} / 10`

        });

    }

    return findings;
}


function detectGenrePreferences(profile) {

    const findings = [];

    const sciFi = profile.genreDistribution["sci-fi"];

    if (sciFi && sciFi.count >= 5) {

        findings.push({

            category: "Genre Preference",

            title: "Science Fiction Focus",

            description:
                "Science fiction represents a significant portion of your archive, suggesting a strong preference for speculative concepts and settings.",

            evidence:
                `${sciFi.count} science fiction titles · ${sciFi.percentage}% of archive`

        });

    }

    return findings;
}


function detectArchiveBalance(profile) {

    const findings = [];

    const distribution = profile.mediaDistribution;

    const values = Object.values(distribution);

    const balanced = values.every(
        value => value === values[0]
    );


    if (balanced) {

        findings.push({

            category: "Collection Structure",

            title: "Balanced Archive Composition",

            description:
                "Your archive maintains an unusually balanced distribution across recorded media formats.",

            evidence:
                "Media distribution: 5 books / 5 games / 5 videos"

        });

    }

    return findings;
}


function detectEvaluationBehavior(profile) {

    const findings = [];

    if (profile.averageScore >= 85) {

        findings.push({

            category: "Rating Behavior",

            title: "Selective Archive",

            description:
                "Your archive demonstrates a consistently positive evaluation pattern, suggesting strong filtering before records are added.",

            evidence:
                `Average archive score · ${(profile.averageScore / 10).toFixed(1)} / 10`

        });

    }

    return findings;

}

function detectTastePatterns(profile) {

    const findings = [];


    const speculativeGenres = [
        "sci-fi",
        "surreal",
        "psychological",
        "experimental"
    ];


    const speculativeCount =
        speculativeGenres.reduce(
            (total, genre) => {
                return total +
                    (profile.genreDistribution[genre]?.count || 0);
            },
            0
        );


    if (speculativeCount >= 8) {

        findings.push({

            category: "Taste Pattern",

            title: "Speculative Curiosity",

            description:
                "Your archive shows a recurring preference for works built around unusual concepts, altered realities, and unconventional perspectives.",

            evidence:
                `${speculativeCount} entries connected to speculative or surreal genres`

        });

    }


    return findings;

}

function detectAtmospherePreference(profile) {

    const findings = [];

    const atmosphereCategories = [
        "cinematography_visuals",
        "sound_music",
        "art_atmosphere",
        "world_building",
        "prose_writing"
    ];


    const availableScores =
        atmosphereCategories
            .filter(
                category =>
                    profile.mediaAverages[category] !== undefined
            )
            .map(
                category =>
                    profile.mediaAverages[category]
            );


    if (availableScores.length === 0) {
        return findings;
    }


    const averageAtmosphere =
        availableScores.reduce(
            (sum, score) => sum + score,
            0
        ) / availableScores.length;


    if (averageAtmosphere >= 8.5) {

        findings.push({

            category: "Taste Pattern",

            title: "Atmosphere-Oriented Archive",

            description:
                "Your evaluations consistently reward works with strong atmosphere, presentation, and immersive environments.",

            evidence:
                `Atmospheric categories average ${averageAtmosphere.toFixed(1)} / 10`

        });

    }


    return findings;

}

function detectConceptPreference(profile) {

    const findings = [];

    const originality =
        profile.universalAverages.originality;

    const depth =
        profile.universalAverages.depth;


    if (
        originality !== undefined &&
        depth !== undefined &&
        originality >= 8.5 &&
        depth >= 8.5
    ) {

        const conceptScore =
            (
                originality +
                depth
            ) / 2;


        findings.push({

            category: "Evaluation Style",

            title: "Concept-Driven Archive",

            description:
                "Your evaluations strongly favor works built around original ideas, layered concepts, and experiences that invite deeper interpretation.",

            evidence:
                `Originality ${originality.toFixed(1)} / 10 · Depth ${depth.toFixed(1)} / 10 · Combined ${conceptScore.toFixed(1)} / 10`

        });

    }


    return findings;

}

function detectImmersionPreference(profile) {

    const findings = [];


    const immersionCategories = [
        "engagement",
        "presentation",
        "world_building",
        "art_atmosphere",
        "level_design_progression"
    ];


    const availableScores =
        immersionCategories
            .filter(
                category =>
                    profile.universalAverages[category] !== undefined ||
                    profile.mediaAverages[category] !== undefined
            )
            .map(
                category =>
                    profile.universalAverages[category] ??
                    profile.mediaAverages[category]
            );


    if (availableScores.length === 0) {
        return findings;
    }


    const immersionScore =
        availableScores.reduce(
            (sum, score) => sum + score,
            0
        ) / availableScores.length;


    if (immersionScore >= 8.5) {

        findings.push({

            category: "Taste Pattern",

            title: "Immersion-Seeking Archive",

            description:
                "Your highest evaluations consistently favor works that create strong engagement through presentation, atmosphere, and cohesive experiences.",

            evidence:
                `Immersion indicators average ${immersionScore.toFixed(1)} / 10`

        });

    }


    return findings;

}