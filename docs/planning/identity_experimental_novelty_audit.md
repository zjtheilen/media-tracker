# Identity Signal Independence — `experimental_affinity` / `novelty`

**Status:** INVESTIGATION COMPLETE

**Scope:** Phase 7.4.10 — Focused Identity signal independence audit

## 1. Question

Phase 7.4.9 identified `experimental_affinity` and `novelty` as the clearest unresolved Identity-signal independence question.

Both signals are used by **Exploratory Philosophy** and derive from experimental-genre prevalence. This investigation determines whether the repository establishes a meaningful semantic distinction between them despite their current evidence paths.

This investigation is limited to semantic and evidence analysis. It does not authorize implementation, weighting, fixture, or Identity changes.

## 2. Current Evidence Path

The current implementations are:

```python
def calculate_experimental_affinity(genres):
    percentage = genres.get("experimental", {}).get("percentage", 0)
    return min(10, percentage / 10)

def calculate_novelty(genres):
    return genres.get("experimental", {}).get("percentage", 0) / 10
```

Both signals therefore consume:

`genreDistribution["experimental"].percentage`

The only implementation difference is the `min(10, ...)` clamp applied to `experimental_affinity`.

Because genre percentage is bounded from 0 to 100, division by 10 produces a value from 0 to 10. The clamp therefore cannot alter the result for valid input.

Both signals subsequently pass through the same Identity normalization:

`value / 10`, clamped to `[0, 1]`.

There are no alternate evidence paths, media-specific branches, additional aggregations, or meaningful transformations that distinguish the two signals.

## 3. Semantic Intent

The repository contains conceptual language distinguishing experimental-media affinity from broader exploration or novelty-seeking.

Exploratory Philosophy is documented as describing a relationship with novelty, unfamiliarity, contrast, boundary expansion, and territory outside established preferences. Existing documentation also explicitly states that exploration is more than simply liking experimental media.

However, neither `experimental_affinity` nor `novelty` has a standalone definition or evidence path that establishes this distinction operationally.

The intelligence expansion audit previously recorded that the two signals:

* use the same underlying experimental-genre percentage;
* produce mathematically identical values;
* may represent an intentional duplication, an accidental duplication, or an unfinished conceptual distinction; and
* should remain provisionally unresolved pending richer evidence without being treated as independent evidence.

Phase 7 produced no additional evidence capable of establishing a distinct measurable construct for either signal.

## 4. Independence Test

### A. Same Evidence

**Yes.**

Both signals consume only experimental-genre prevalence.

### B. Same Transformation

**Yes, effectively.**

The clamp on `experimental_affinity` is inert for valid inputs. After Identity normalization, both signals produce the same value.

### C. Same Semantic Claim

**Yes, in practice.**

The current evidence establishes only the prevalence of experimental material in the archive.

The conceptual distinction between:

* affinity for experimental media; and
* seeking novelty or unfamiliar territory

may be meaningful at the conceptual level, but the current model does not possess an independent evidence source capable of measuring the latter separately.

### D. Negative-Space Distinction

**No.**

The current model cannot produce a meaningful case in which one signal is high while the other is low. Their values are mathematically coupled by the same evidence path.

## 5. Exploratory Philosophy Impact

Exploratory Philosophy currently uses:

* `originality`: 0.35
* `genre_diversity`: 0.25
* `depth`: 0.15
* `experimental_affinity`: 0.15
* `novelty`: 0.10

Because `experimental_affinity` and `novelty` are identical under all valid inputs, their combined 0.25 weighting is functionally one contribution from experimental-genre prevalence.

The repository does not document this as intentional independent corroboration. Existing documentation specifically cautions against treating the two signals as independent evidence.

The remaining Exploratory signals provide distinct evidence:

* `originality` is a universal scoring dimension;
* `genre_diversity` measures represented-genre breadth;
* `depth` is a universal scoring dimension.

This investigation does not evaluate whether the current weights are appropriate.

## 6. Relationship to Existing Intelligence Concepts

`experimental_affinity` and `novelty` overlap conceptually with existing exploration-related intelligence, including Boundary Explorer and Boundary Preference.

Those systems operate at different architectural layers and make different claims, so shared experimental-genre evidence does not by itself establish architectural redundancy across those systems.

The specific finding here is narrower: `experimental_affinity` and `novelty` do not currently establish independent Identity semantics from one another.

## 7. Phase 7 Impact

Phase 7 did not materially change the independence question.

The expansion audit had already identified the mathematical duplication. Subsequent Phase 7 investigations expanded evidence concerning scoring, genres, temporal behavior, completion, Designations, and Identity signals, but none introduced an evidence source capable of distinguishing experimental-media prevalence from novelty-seeking behavior.

The provisional status recorded previously is therefore resolved by the current evidence.

## 8. Finding

**Final classification: Likely redundant**

The evidence supporting this classification is:

1. Both signals consume exactly the same underlying metric.
2. Their transformations are mathematically identical for all valid inputs.
3. Identity normalization does not introduce a distinction.
4. No current documentation establishes independently observable semantics.
5. No negative-space case is representable under the current evidence model.
6. Phase 7 introduced no richer evidence capable of establishing the distinction.
7. Existing documentation already cautions against treating the signals as independent evidence.

The repository may conceptually distinguish experimental-media affinity from broader novelty-seeking, but that distinction is not currently represented by these signals.

## 9. Architectural Boundary

This finding does **not** establish that either signal should be:

* deleted;
* renamed;
* merged;
* reweighted;
* replaced;
* activated differently; or
* used to justify a new Identity concept.

It establishes only that the current `experimental_affinity` and `novelty` signals should not be interpreted as independent evidence.

Any future change would require a separate architectural decision supported by an appropriate evidence source.

## 10. Phase 7 Disposition

The focused Identity signal independence question surfaced by 7.4.9 is now resolved for the `experimental_affinity` / `novelty` pair.

The remaining `analysis` / `ambiguity` / `reflection` overlap represents a different class of question involving partially shared genre-derived proxies rather than mathematical duplication. It does not require reopening this investigation.

> **Evidence before labels. Concepts before implementation. Evolution, not rewrite.**
