function scoreThreshold(value, thresholds) {
    for (const threshold of thresholds) {
        if (value >= threshold.value) {
            return threshold.score;
        }
    }

    return 0;
}