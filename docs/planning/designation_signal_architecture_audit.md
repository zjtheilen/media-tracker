# Phase 7.4.3 — Designation Signal Architecture Audit

**Status:** Investigation complete — signal architecture boundary established

**Scope:** Phase 7.4.3 — Designation Signal Architecture Audit

## 1. Question

Do the current Designation implementations use signals that are semantically appropriate, sufficiently independent, and proportionate to the classifications they produce?

The purpose of this investigation is not to redesign the Designation rules.

It is to determine whether the current architecture provides an adequate foundation for future Designation refinement.

---

## 2. Evaluation Method

The current Designation system was examined across:

* raw scoring dimensions;
* normalized trait signals;
* genre-derived signals;
* archive-level metrics;
* Designation-specific evidence helpers;
* Designation scoring rules;
* Designation metadata;
* Designation confidence/basis fields;
* existing Designation fixtures and tests.

Each signal was evaluated according to its relationship to the concept it supports.

Signals were classified conceptually as:

* **Direct** — closely measures the quality being classified.
* **Supporting** — meaningfully strengthens the classification but does not establish it independently.
* **Proxy / contextual** — related evidence that may support interpretation but carries additional uncertainty.
* **Insufficient** — does not provide adequate evidence for the classification by itself.

---

## 3. Current Signal Architecture

The current archive profile produces several distinct signal layers.

### Raw scoring dimensions

Universal dimensions currently include:

* emotional impact;
* depth;
* craft;
* engagement;
* presentation;
* originality.

Media-specific dimensions include:

* book: prose writing, character development, world building, narrative pacing;
* video: cinematography/visuals, acting/performances, directing/editing, sound/music;
* game: gameplay mechanics, level design/progression, replayability/systems, art/atmosphere.

### Normalized trait signals

`trait_calculator.py` converts scoring averages into 0–1 strength values using the existing normalization:

`(value - 6) / 4`, clamped to 0–1.

These traits describe strong archive-level scores in particular dimensions.

They do not independently establish that the corresponding dimension is the reason the user values the media.

### Genre signals

Genre presence and affinity measure how much of the archive carries particular genre labels.

These are useful contextual signals.

Genre presence does not independently establish a taste classification.

### Archive-level metrics

Current metrics include:

* entry count;
* genre diversity;
* average score;
* score variance;
* media distribution;
* temporal distributions.

These describe the archive.

They should not automatically be interpreted as preference signals.

---

## 4. Boundary Explorer Signal Audit

Current inputs:

* boundary genre prevalence;
* a `sustained` threshold derived from qualifying-entry count;
* boundary media-type count;
* Originality.

### Signal assessment

**Boundary genre prevalence:** Proxy / contextual.

This establishes recurring presence of selected genres, not attraction to unfamiliarity or boundary expansion itself.

**`sustained`:** Insufficient as currently named.

The current implementation treats a qualifying-entry count threshold as "sustained." This does not establish temporal persistence or repeated exploration behavior.

**Media-type breadth:** Supporting at most.

Presence across media types can strengthen the case that the pattern is not isolated to one medium, but does not establish exploration.

**Originality:** Supporting.

Originality is relevant to unusual or distinctive media, but high originality does not necessarily indicate attraction to unfamiliar territory.

### Architecture finding

Boundary Explorer currently depends heavily on **genre proxies plus an archive-size threshold** rather than a direct measure of exploratory preference.

This does not invalidate the concept.

It establishes that the current implementation should be treated as a **proxy-based classification**, not a direct measurement of exploration.

---

## 5. Curator Signal Audit

Current inputs:

* Craft;
* Presentation;
* entry count;
* genre diversity.

### Signal assessment

**Craft:** Supporting.

Craft can reasonably contribute to appreciation of well-made media.

**Presentation:** Supporting.

Presentation is relevant to the concept, but is broader than curation itself.

**Entry count:** Archive statistic, not direct preference evidence.

A large archive establishes quantity.

It does not establish deliberate curation.

**Genre diversity:** Supporting for breadth, but not proof of curation.

Diversity establishes range.

It does not establish intentional diversification.

### Architecture finding

The current Curator implementation combines media-quality signals with archive-composition statistics.

This produces a recognizable prototype, but the current description:

> "Builds a deliberate archive..."

claims intentionality that the available signals cannot establish.

The signal architecture therefore supports a more evidence-bounded Curator concept than the current wording implies.

---

## 6. Engagement Architect Signal Audit

Current inputs:

* Engagement;
* Craft;
* Gameplay Mechanics;
* Pacing.

### Signal assessment

**Engagement:** Strong supporting signal.

It directly measures whether the work maintains attention and momentum, but does not independently establish appreciation for construction.

**Craft:** Strong supporting signal.

Execution is directly relevant to effective construction.

**Gameplay Mechanics:** Media-specific supporting signal.

It provides meaningful evidence for games, but cannot independently support a general-purpose Designation.

**Pacing:** Potentially strong supporting signal.

Pacing is directly relevant to maintaining momentum, although its availability and semantics vary by medium.

### Architecture finding

Engagement Architect has the strongest current semantic alignment between its concept and its signals.

However, the inclusion of gameplay mechanics makes the implementation more game-dependent than the general-purpose Designation concept suggests.

This does not invalidate the Designation.

It establishes an implementation boundary:

> Game-specific evidence may support a general Designation, but should not silently become the definition of that Designation.

---

## 7. Deep Diver Signal Audit

Current inputs:

* Depth;
* Emotional Impact;
* Average Score;
* Psychological genre affinity.

### Signal assessment

**Depth:** Strong supporting signal.

This is directly relevant to layered, substantial, interpretive media.

**Emotional Impact:** Supporting.

Emotional resonance can strengthen the concept but does not independently establish depth-oriented taste.

**Average Score:** Weak supporting signal.

A high average score indicates broad positive valuation.

It does not establish preference for depth.

**Psychological genre affinity:** Proxy / contextual.

Psychological genre presence is relevant to the concept but cannot independently establish appreciation for psychological richness.

### Architecture finding

Deep Diver has a strong conceptual relationship to its primary signals, particularly Depth and Emotional Impact.

The weaker signals should remain contextual rather than being treated as direct evidence.

The current rule therefore represents a reasonable prototype but should not be interpreted as four independent direct measurements of the same concept.

---

## 8. Cross-Designation Signal Overlap

Several signals appear in multiple Designations.

This is not inherently a problem.

For example:

* Craft can contribute to Curator and Engagement Architect.
* Originality can contribute to Boundary Explorer and potentially Concept-First.
* Depth can contribute to Deep Diver and potentially Concept-First.
* Presentation can contribute to Curator and potentially Atmospheric / Sensory.

The governing distinction is:

> **Shared evidence is allowed; shared conclusion is not.**

A signal can legitimately contribute to multiple classifications when those classifications interpret the signal differently.

However, the more heavily multiple Designations rely on the same signals, the more important negative-space testing becomes.

---

## 9. Normalized Trait Boundary

The current trait normalization is:

```text
(value - 6) / 4
```

with values below 6 producing zero signal.

This is useful as a strength normalization.

It does not transform a scoring dimension into a preference measurement.

For example:

> `depth_strength = 0.9`

means that the archive's average Depth score is high under the current normalization.

It does not independently mean:

> "The user strongly prefers depth."

This distinction is especially important for Designations.

A Designation may use a high trait score as evidence, but the trait should not be treated as a direct behavioral observation unless the evidence supports that interpretation.

---

## 10. Archive Statistics Boundary

Several current Designation inputs are archive statistics:

* entry count;
* genre diversity;
* genre prevalence;
* media-type breadth.

These measurements can legitimately describe archive composition.

They cannot automatically establish:

* intentionality;
* exploration;
* curation;
* motivation;
* preference;
* personality.

This creates a recurring architectural rule:

> **Archive composition is evidence about what is present, not automatically evidence about why it is present.**

---

## 11. Current Designation Confidence Boundary

The archive profile currently exposes:

* `designationBasis`;
* `designationConfidence`;
* `designationConfidenceLabel`.

The current calculation averages the scores of:

* the top universal trait;
* the second universal trait;
* the top media trait.

This value is therefore a measure of **general signal strength in the archive profile**, not a confidence measurement for the selected Designation.

It does not evaluate:

* separation between competing Designations;
* evidence quality;
* signal independence;
* sample sufficiency;
* classification ambiguity.

Therefore the current `designationConfidence` concept should not be interpreted as statistical or semantic confidence in the Designation classification.

This investigation does not authorize renaming or removing it.

It establishes that the current field should remain conceptually distinct from future Classification Confidence work.

---

## 12. Fixture-Level Adversarial Finding

The existing fixture set exposes an important limitation in the current Designation architecture.

The `generalist_profile.json` fixture represents a broad archive with relatively balanced genre distribution and moderate-to-good scores across dimensions.

Applying the current production Designation rules produces approximately:

| Designation          | Score |
| -------------------- | ----: |
| Boundary Explorer    |  71.4 |
| Curator              |  65.5 |
| Deep Diver           | 37.75 |
| Engagement Architect | 27.95 |

The current engine therefore resolves the Generalist fixture to **Boundary Explorer**.

This is an important semantic finding.

The Generalist fixture contains:

* experimental: 6%
* surreal: 8%
* sci-fi: 10%

The current Boundary Explorer implementation adds those genre percentages together, treats the resulting 24% as substantial boundary prevalence, grants the full "sustained" bonus based on qualifying count, and adds an Originality contribution.

The resulting score exceeds the Curator score.

---

## 13. Interpretation of the Generalist Finding

This does **not** establish that Boundary Explorer is conceptually invalid.

It establishes that the current implementation can convert ordinary genre breadth containing some boundary-associated genres into a strong Boundary Explorer classification.

The issue is therefore architectural:

> **The current Boundary Explorer signals do not sufficiently distinguish boundary-oriented taste from broad archives that happen to contain boundary-associated genres.**

This is exactly the type of distinction that the Designation evidence investigations are intended to expose.

The finding also reinforces the Phase 7.4.1 boundary:

> The archive is the evidence source; it is not the definition of the user population.

A general-purpose Designation system must survive profiles that differ substantially from the current archive owner's taste.

---

## 14. Fixture Evidence Boundary

The current fixtures successfully demonstrate that the scoring engine can produce differentiated Designation results.

They do not yet demonstrate that the Designations are semantically separated under adversarial conditions.

The existing fixtures are primarily **positive examples**:

* Boundary Explorer profile;
* Engagement Architect profile;
* Deep Diver profile;
* Generalist profile.

A robust Designation evaluation requires negative-space and boundary examples as well.

Examples include:

* broad archive with some experimental media but no clear boundary orientation;
* high-originality archive without unusual-genre concentration;
* high-depth archive without strong psychological genre affinity;
* high-engagement archive without strong construction/system signals;
* large archive without deliberate breadth;
* game-heavy archive without systems-oriented appreciation.

These are not implementation requests.

They identify the evidence needed before the current rules can be considered semantically robust.

---

## 15. Current Architecture Assessment

| Designation          | Primary signal quality      | Major proxy                         | Major boundary                                 |
| -------------------- | --------------------------- | ----------------------------------- | ---------------------------------------------- |
| Boundary Explorer    | Moderate                    | Genre prevalence + originality      | Does not directly measure exploration          |
| Curator              | Moderate                    | Entry count + genre diversity       | Does not establish intentional curation        |
| Engagement Architect | Strongest current alignment | Gameplay / pacing availability      | Can become game-weighted                       |
| Deep Diver           | Strong                      | Psychological genre + average score | Does not directly measure preference for depth |

The current architecture is therefore **conceptually usable but not yet evidence-clean enough to treat every signal as a direct representation of the Designation.**

---

## 16. What This Investigation Does Not Justify

This investigation does not authorize:

* rewriting Designation rules;
* adding new traits;
* changing scoring weights;
* removing the current four Designations;
* adding Concept-First;
* adding Systems / Construction;
* adding Atmospheric / Sensory;
* replacing genre evidence;
* introducing probabilistic classification;
* introducing Classification Confidence math;
* changing the public Designation API.

The purpose is to establish the evidence boundary before implementation changes.

---

## 17. Investigation Result

Phase 7.4.3 establishes four important architectural conclusions.

### 1. Designation signals are heterogeneous

Current rules combine:

* scoring dimensions;
* normalized scoring traits;
* genre proxies;
* archive statistics;
* media-specific signals.

These signal types do not have equivalent evidentiary meaning.

### 2. High trait strength is not automatically preference evidence

Normalized score strength describes high archive ratings.

It does not independently establish the reason for those ratings.

### 3. Boundary Explorer currently has a meaningful false-positive risk

The Generalist fixture demonstrates that ordinary genre breadth can produce a strong Boundary Explorer score.

This is a concrete evidence boundary, not merely a theoretical concern.

### 4. Current Designations require adversarial validation before refinement

The next useful step is not adding more Designations.

It is testing whether the current Designations remain distinct when presented with profiles designed to challenge their negative-space boundaries.

---

## 18. Next Investigation

The next Phase 7.4 investigation should therefore be:

> **Designation Semantic Separation / Adversarial Fixture Audit**

The investigation should construct or evaluate profiles representing:

* positive examples;
* negative examples;
* neighboring concepts;
* intentionally ambiguous profiles;
* broad/generalist archives;
* media-specific edge cases.

The goal is to determine whether the current Designations produce classifications consistent with their documented conceptual boundaries.

This investigation should occur **before changing the production rules**.

The existing fixtures should be treated as evidence inputs rather than proof that the current taxonomy is correct.

---

## 19. Governing Rules

The following rules continue to govern Designation evolution:

* **Concept before implementation.**
* **Evidence before classification.**
* **Shared evidence is allowed; shared conclusion is not.**
* **A normalized score is not automatically a preference signal.**
* **Archive composition is not automatically intentional behavior.**
* **Media-specific evidence must not silently become a general-purpose definition.**
* **A positive fixture is not proof of semantic separation.**
* **Negative-space testing is required before taxonomy refinement.**
* **The archive is the evidence source; it is not the definition of the user population.**
* **Measure the relationship before interpreting the relationship.**
