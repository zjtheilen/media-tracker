# Phase 7 Cross-Dimensional Evidence

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Phase:** 7 — Evidence Expansion
**Status:** INVESTIGATION IN PROGRESS

---

## 1. Purpose

This document records the current investigation into cross-dimensional archive evidence identified in Phase 7.3 of the project roadmap.

The current investigation covers:

* score × completion relationships;
* media type × scoring behavior.

The purpose of this work is to determine what the archive can legitimately support as evidence before introducing new intelligence, classifications, findings, or recommendations.

This document records evidence and limitations. It does not establish new intelligence semantics by itself.

---

## 2. Governing Principle

> **Cross-dimensional relationships are evidence-development work first. Intelligence should only be introduced when the evidence supports a distinct, explainable interpretation.**

Completion behavior, media type, and scoring behavior are individually observable.

Their relationship may be informative, but observed differences must not automatically be interpreted as preference, enjoyment, engagement, quality, motivation, or intent.

---

## 3. Score × Completion

### 3.1 Current Evidence

The initial investigation examined scored entries by completion status.

The currently available scored population contains:

| Completion status |  N | Average | Median | Variance |
| ----------------- | -: | ------: | -----: | -------: |
| Completed         | 27 |   81.61 |  86.45 |   204.53 |

The initial extracted dataset contains scored entries in the completed state only.

### 3.2 Interpretation

The current evidence establishes that completed scored media can be described statistically.

It does **not** yet establish a score × completion relationship.

A relationship requires comparison across multiple meaningful completion states with sufficient observations in those states.

In particular:

* completed records provide evidence about scoring among completed media;
* they do not provide a comparison against dropped, in-progress, partially experienced, or other applicable states;
* a single completion state cannot demonstrate that completion status is associated with score;
* completion itself does not establish enjoyment, quality, engagement, or motivation.

### 3.3 Required Follow-Up Evidence

The next investigation should calculate score distributions across every completion state represented by the current archive that contains scored records.

For each applicable state, collect:

* record count;
* average score;
* median score;
* variance;
* minimum score;
* maximum score.

The same analysis should then be repeated by media type where sample sizes permit.

The exact completion-state vocabulary should come from the current application data model rather than being invented for this analysis.

### 3.4 Evidence Gate

**Status: NOT YET RESOLVED**

No new intelligence should be derived from score × completion until the full scored population has been examined.

---

## 4. Media Type × Scoring Behavior

### 4.1 Current Evidence

The initial investigation examined scored completed entries by media type.

| Media type |  N | Average | Median |
| ---------- | -: | ------: | -----: |
| Book       |  8 |   87.83 |  87.84 |
| Game       |  8 |   68.94 |  69.88 |
| Video      | 11 |   86.30 |  86.45 |

The current completed scored population therefore shows descriptive differences in observed score distributions between the three media types.

### 4.2 Interpretation

These differences are descriptive evidence only.

The current data does **not** establish that media type causes or determines scoring behavior.

Several limitations apply:

* the sample sizes are small;
* the analysis currently includes completed scored entries only;
* completion behavior may interact with media type;
* the archive is a personal collection rather than a population sample;
* historical scoring records may have different semantics from the current scoring model;
* aggregate differences do not establish why those differences exist.

The current evidence can therefore support statements such as:

> Completed scored books, games, and videos currently have different observed score distributions in the archive.

It cannot support stronger claims such as:

> The curator inherently scores one media type higher than another.

### 4.3 Required Follow-Up Evidence

The next investigation should calculate scoring behavior across the full current scored population and separate the results by:

* media type;
* completion state;
* media type × completion state where sample sizes are sufficient.

For each meaningful group, collect:

* record count;
* average score;
* median score;
* variance;
* minimum score;
* maximum score.

The analysis should also distinguish current scoring evidence from historical migration artifacts.

### 4.4 Evidence Gate

**Status: INITIAL EVIDENCE RECORDED**

The current archive contains observable media-type scoring differences, but the evidence is not yet sufficient to establish a new intelligence signal or behavioral classification.

---

## 5. Backlog and Planned Media

The archive contains substantial planned media across books, games, and video.

Planned media is relevant to archive composition and future consumption analysis, but it must not be mixed into score-derived evidence.

A planned entry represents intended or potential future consumption.

It does not provide:

* a score;
* a completed experience;
* evidence of enjoyment;
* evidence of engagement;
* evidence of quality;
* evidence that the item will actually be consumed.

Consequently, planned backlog size should remain separate from score × completion and media type × scoring analyses.

Future work may examine backlog composition as a separate archive-behavior dimension if a clear conceptual question warrants it.

---

## 6. Historical Scoring Boundary

Historical scoring evidence has already been validated separately.

Historical records include migrated values that do not always conform to the current 1–10 medium-aware scoring semantics.

Therefore:

* historical records may remain useful for archive history and migration validation;
* current scoring analysis must distinguish historical artifacts from current scoring evidence;
* historical anomalies must not silently become evidence for current scoring behavior.

The detailed historical validation is documented in:

`docs/planning/historical-scoring-validation.md`

---

## 7. Relationship to Existing Genre Intelligence

Cross-dimensional scoring evidence must remain distinct from genre intelligence.

The current archive already supports genre-derived evidence including:

* genre distribution;
* genre affinity;
* observed genre combinations.

Curated `related_genres` metadata is a separate taxonomy-level concept.

Therefore:

```text
Score × Completion
        ≠
Media Type × Scoring
        ≠
Genre Co-occurrence
        ≠
Curated Related Genres
```

A future cross-dimensional analysis may examine relationships among these dimensions, but such relationships require their own explicit evidence investigation.

---

## 8. Evidence Before Intelligence

The current results do not justify adding:

* a new Trait;
* a new Observation;
* a new Finding;
* a new Designation;
* a new Identity;
* a recommendation signal;
* a media-type preference classification;
* a completion-based preference classification.

The appropriate next step is measurement.

The project should first establish whether the observed relationships are:

1. sufficiently represented in the archive;
2. reproducible;
3. meaningfully distinguishable from archive-size effects;
4. explainable without inferring internal intent;
5. conceptually distinct from existing intelligence.

Only then should a downstream intelligence decision be considered.

---

## 9. Phase 7.3 Status

| Evidence area                       | Status                                                    |
| ----------------------------------- | --------------------------------------------------------- |
| Score × completion relationships    | Investigation begun; insufficient evidence for conclusion |
| Media type × scoring behavior       | Initial descriptive evidence recorded                     |
| Archive-derived genre relationships | Not yet investigated as a Phase 7.3 evidence task         |

Phase 7.3 remains **IN PROGRESS**.

The roadmap checkboxes should remain unchecked until the corresponding evidence investigations produce a defensible result.

---

## 10. Next Investigation

The immediate next evidence pass should produce a complete scored-population matrix:

```text
completion state
    ×
media type
    ×
score statistics
```

This should be based on the current archive's actual statuses and scoring semantics.

The resulting evidence can then answer:

* Are meaningful score differences associated with completion state?
* Are those differences consistent across media types?
* Are apparent media-type differences still present after completion state is considered?
* Are the available sample sizes sufficient for any further interpretation?
* Does any observed pattern represent genuinely new evidence, or does it duplicate an existing signal?

Until those questions are answered, the evidence remains descriptive.

---

## 11. Governing Rule

> **Measure the relationship before interpreting the relationship.**

Phase 7 should expand what the archive can demonstrate, not expand the intelligence vocabulary merely because additional dimensions are available.
