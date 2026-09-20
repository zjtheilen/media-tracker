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

### Media-Specific Scoring Weight Review

The initial scoring investigation raises a future design question about whether
the current universal/media weighting should be calibrated differently by media
type.

The current scoring model applies the same universal weighting across all media
types while applying media-specific dimensions through the existing scoring
profile. The current evidence shows that some games can receive high scores in
engagement and game-specific dimensions while receiving substantially lower
scores in universal dimensions such as emotional impact and depth.

This creates a legitimate question about whether the current game weighting
accurately represents the intended meaning of a game score.

This question was prompted by the observed game scores in the initial Phase 7.3
investigation. Several lower-composite games received high engagement and
game-specific scores while receiving substantially lower universal scores.

This is a design question, not an implementation decision.

No weighting changes are authorized from the current evidence. Before changing
weights, the project should establish:

* what `total_score` is intended to represent;
* whether that meaning should be consistent across media types;
* whether universal dimensions should carry the same relative influence across
  media types;
* whether game-specific dimensions should have greater or different influence;
* how any proposed weighting would affect the existing archive;
* whether the resulting scores remain explainable;
* whether historical scores must remain isolated from any revised scoring model;
* whether existing intelligence and analytics would change as a consequence.

Any future weighting change must be treated as a scoring-model change rather
than as an intelligence discovery.

The current evidence therefore authorizes investigation of media-specific
weighting, but does not authorize changing the scoring profile.

> **A weighting problem must be demonstrated before a weighting change is
> justified.**

### 4.0 Game Scoring Semantic Investigation

A follow-up investigation examined whether the observed lower game scores indicate a weighting problem or instead reflect the semantic separation between universal and game-specific scoring dimensions.

The investigation used the eight completed scored games currently represented in the archive.

#### Weighting Counterfactual

The current scoring model allocates 70% of the total score to universal dimensions and 30% to media-specific dimensions.

A read-only counterfactual recalculated the existing game scores using the same internal dimension weights while changing only the universal/media bucket split:

| Bucket split | Average game score |
| ------------ | -----------------: |
| 70 / 30      |              68.94 |
| 60 / 40      |              69.94 |
| 50 / 50      |              70.92 |

The 60/40 and 50/50 scenarios produced limited changes to the observed ranking structure. Six of the eight games retained the same relative rank across all three scenarios. The only ranking change occurred between the two highest-scoring games under the 50/50 scenario.

The counterfactual therefore does not demonstrate that the current 70/30 weighting is the primary cause of the lower observed game scores.

#### Universal Dimension Distribution

The universal dimensions were then examined by media type.

The largest differences were concentrated in emotional impact and depth:

| Dimension        | Book Avg | Game Avg | Video Avg |
| ---------------- | -------: | -------: | --------: |
| Emotional impact |     8.88 |     5.25 |      8.45 |
| Depth            |     8.75 |     5.25 |      8.45 |
| Craft            |     8.75 |     8.00 |      8.73 |
| Engagement       |     9.00 |     8.50 |      8.91 |
| Presentation     |     8.88 |     8.00 |      8.82 |
| Originality      |     8.88 |     7.12 |      8.45 |

Game emotional impact and depth also showed substantially greater variation than the corresponding book and video populations. Emotional impact ranged from 1–10 among games, while depth ranged from 1–9.

This indicates that games are not uniformly receiving lower universal scores. The observed difference is concentrated in specific dimensions.

#### Semantic Inspection

Individual game records provide additional evidence that the lower universal scores are not necessarily a failure to recognize game quality.

For example:

* **Mario Kart DS** has emotional impact 1 and depth 3 while receiving 8 for gameplay mechanics, 9 for level design/progression, 9 for replayability/systems, and 9 for art/atmosphere.
* **Kirby's Block Ball** has emotional impact 1 and depth 2 while receiving 9 for gameplay mechanics, 9 for level design/progression, 9 for replayability/systems, and 10 for art/atmosphere.
* **Doki Doki Literature Club** has emotional impact 10 and depth 9 while also receiving 10 for gameplay mechanics and 10 for originality.
* **Zero Escape: Virtue's Last Reward** has emotional impact 9 and depth 9 alongside high scores across its game-specific dimensions.

The observed records therefore demonstrate that universal emotional or conceptual dimensions can diverge substantially from game-specific measures of mechanical and systemic quality.

This distinction is consistent with the current scoring architecture. The universal `depth` and `emotional_impact` dimensions describe qualities such as conceptual substance, thematic or intellectual depth, emotional response, emotional connection, and lasting resonance. The game-specific dimensions separately measure gameplay mechanics, level design and progression, replayability and systems, and art/atmosphere.

Under these semantics, a game can be highly successful mechanically and systemically without necessarily producing substantial emotional or conceptual impact.

#### Interpretation

The current evidence does **not** demonstrate a game-specific weighting problem or a semantic defect in the universal dimensions.

Instead, the evidence currently supports the following narrower interpretation:

> The observed lower scores for some games are substantially associated with lower scores in universal emotional impact and depth, while game-specific dimensions can independently capture strong mechanical, progression, replayability, and atmospheric qualities.

This is an explainable distinction within the existing scoring model rather than evidence that game scores should be normalized upward or that game-specific dimensions require greater weighting.

The investigation therefore does not authorize changes to:

* the 70/30 universal/media weighting;
* universal dimension weights;
* game-specific dimension weights;
* universal dimension semantics;
* game-specific dimension semantics.

This conclusion is limited by the current sample size and archive composition. The eight-game population is a personal archive rather than a representative sample of games generally, and the observed polarization may change as additional games are scored.

Future evidence may justify revisiting the question if a substantially larger game population produces patterns inconsistent with the current semantic separation.

**Evidence Gate: INVESTIGATION COMPLETE FOR CURRENT EVIDENCE**

The current evidence is sufficient to close the immediate weighting question without a scoring-model change. The broader Phase 7 media-type investigation remains in progress pending the completion-state × media-type analysis described below.

### 4.1 Completion-State Scoring Boundary Investigation

The archive was inspected to determine whether completion state has an observable relationship with scoring.

The current archive contains 115 entries:

* Completed: 92

  * Book: 16
  * Game: 26
  * Video: 50
* In-progress: 23

  * Book: 4
  * Game: 19
  * Video: 0

Scoring coverage is entirely restricted to completed entries:

* Completed entries: 27 scored, 65 unscored
* In-progress entries: 0 scored, 23 unscored
* Completed scored population average: 81.61
* Completed scored population range: 36.98–94.25

This establishes that `completion_status` currently functions as a scoring boundary rather than an independent scoring dimension. In-progress entries do not currently participate in the score population, so there is no current evidence base for evaluating score differences by completion state.

No completion-state scoring changes are justified by this evidence.

**Evidence gate: INVESTIGATION COMPLETE FOR CURRENT EVIDENCE**

Future analysis could revisit this boundary if the application permits scoring before completion, but that would represent a change in scoring semantics rather than an interpretation of the current archive.

### 4.2 Media-Type Score Distribution Investigation

The scored archive was examined by media type to determine whether observed differences in average scores were primarily driven by isolated outliers or by broader distribution differences.

The current scored population contains:

| Media type |  n | Average | Median |       Range | Variance |
| ---------- | -: | ------: | -----: | ----------: | -------: |
| Book       |  8 |   87.83 |  87.84 | 82.95–94.25 |    10.10 |
| Game       |  8 |   68.94 |  69.88 | 36.98–92.00 |   387.17 |
| Video      | 11 |   86.30 |  86.45 | 72.02–94.03 |    46.28 |

The observed differences are descriptive evidence only. The current data does not establish that media type causes or determines scoring behavior.

The ordered score distributions show that the elevated game variance is not attributable to a single low-scoring outlier. The eight game scores range from 36.98 to 92.00, with four scores below 63 and four above 77. Book scores remain tightly clustered in the 82.95–94.25 range, while video scores span 72.02–94.03.

This establishes that the current scored game population differs from books and videos in both central tendency and dispersion. The game population is not simply experiencing a uniform downward shift: multiple games occupy the lower portion of the archive while several others score within the upper range of the other media types.

Several limitations apply:

* the sample sizes are small;
* the analysis includes completed scored entries only;
* completion behavior differs by media type;
* the archive is a personal collection rather than a population sample;
* historical scoring records may have different semantics from the current scoring model;
* aggregate differences do not establish why those differences exist.

Combined with the preceding game scoring semantic investigation, the current evidence supports treating game score dispersion as an observed property of the archive rather than sufficient evidence of a weighting defect. The available sample does not justify changing universal or game-specific weights.

No scoring-weight changes are authorized by this evidence.

**Evidence gate: INVESTIGATION COMPLETE FOR CURRENT EVIDENCE**

Future investigation could revisit media-type distribution as the scored archive grows, particularly if additional games materially change the observed distribution.


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
