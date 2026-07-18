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