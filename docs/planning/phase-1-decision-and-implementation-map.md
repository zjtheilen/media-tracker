# Media Tracker — Phase 1 Decision & Implementation Map

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Phase:** Phase 1 — Intelligence Alignment
**Status:** Reconciled against the current Phase 1 conceptual contract and implemented Identity migration

**Current test status:** **245 passing tests / 0 failing tests**

**Historical regression milestones:** 199 → 210 → 218 → 247 passing tests
**Current post-migration baseline:** 245 passing tests / 0 failing tests

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document translates the conceptual requirements of `intelligence-contract.md`, the reconciled Phase 1 alignment plan, and the forensic audit into explicit implementation decisions.

It answers:

> **What exactly have we decided to preserve, change, clarify, test, investigate, or defer before modifying the existing intelligence implementation?**

The documents have distinct responsibilities:

* **Intelligence Contract** defines what the intelligence system means.
* **Phase 1 Intelligence Alignment** defines the overall alignment direction.
* **This document** defines specific implementation decisions, gates, and work order.
* **Forensic Audit** establishes what the repository and tests actually do and identifies recovered behavioral contracts and contradictions.

This document is the bridge between conceptual contract and implementation.

The **Phase 1 Intelligence Alignment** document is the reconciled conceptual reference. When an older statement in this document conflicts with a later locked Phase 1 decision, the locked Phase 1 decision supersedes the older statement.

---

# 2. Evidence Base

| Source                              | Role                                 | Authority               |
| ----------------------------------- | ------------------------------------ | ----------------------- |
| `intelligence-contract.md`          | Authoritative conceptual definitions | Highest                 |
| `phase-1-intelligence-alignment.md` | Phase 1 conceptual alignment         | High                    |
| `intelligence-forensic-audit.md`    | Repository and behavioral evidence   | Implementation evidence |

## Important distinction

This document must not confuse three different kinds of statements:

**Contract decisions** tell us what the system should mean.

**Repository facts** tell us what the existing implementation actually does.

**Archive evidence** tells us what the intelligence system should plausibly detect.

A repository fact is not automatically a desired behavior.

An archive pattern is not automatically a finalized rule.

A contract definition is not automatically an implementation algorithm.

---

# 3. Decision Status

| Status                | Meaning                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| **LOCKED**            | Decision is sufficiently defined for dependent implementation to rely on it.                              |
| **WORKING DIRECTION** | Strong evidence supports the direction, but names, rules, thresholds, or operational details remain open. |
| **UNRESOLVED**        | A decision is still required before dependent implementation can proceed.                                 |
| **DEFERRED**          | Issue is intentionally outside Phase 1.                                                                   |
| **FACT**              | Verified repository or audit fact; not itself a design decision.                                          |

### Implementation rule

**UNRESOLVED** and **DEFERRED** are not interchangeable.

* **UNRESOLVED** means Phase 1 may still need to solve it.
* **DEFERRED** means Phase 1 intentionally will not solve it.

No implementation may depend on an **UNRESOLVED** decision.

---

# 4. Decision Classifications

| Classification         | Meaning                                                                                                    | Default action                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **TERMINOLOGY**        | Existing behavior is conceptually correct, but the name or description is misleading.                      | Rename/reframe; do not redesign.                                  |
| **PRESERVE**           | Existing behavior is compatible with the contract or represents useful recovered behavioral memory.        | Preserve except for necessary compatibility work.                 |
| **ALIGNMENT**          | Existing behavior directly contradicts a locked conceptual decision.                                       | Make the smallest necessary behavioral change.                    |
| **CLARIFICATION**      | Concept is established, but operational behavior is underspecified.                                        | Define behavior before implementing it.                           |
| **EVIDENCE**           | Concept is acceptable, but supporting explanation is insufficient.                                         | Improve explainability without changing classification semantics. |
| **TESTING**            | Existing behavior is acceptable but insufficiently protected.                                              | Add regression coverage.                                          |
| **DEFERRED**           | Issue belongs to a later phase.                                                                            | Document it; do not solve it in Phase 1.                          |
| **POSSIBLE DEAD CODE** | Behavior appears redundant, obsolete, debugging-only, or disconnected from meaningful production behavior. | Investigate before preserving or deleting.                        |

---

# 5. Locked Conceptual Decisions

These meanings come from `intelligence-contract.md` and the reconciled Phase 1 alignment.

| Concept               | Locked meaning                                          | Cardinality     |
| --------------------- | ------------------------------------------------------- | --------------- |
| Trait                 | Measurable quality represented in the archive           | MANY            |
| Genre Signal          | Recurring relationship between archive and genres/types | MANY            |
| Observation           | Directly demonstrable recurring pattern                 | MANY            |
| Finding               | Interpretive conclusion suggested by evidence           | MANY            |
| Designation           | Recognizable taste classification                       | MANY internally |
| Primary Designation   | Highest/primary classification presented on Profile     | ONE             |
| Identity              | Broader curator philosophy / synthesis                  | MANY internally |
| Primary Identity      | Most strongly supported curator philosophy              | ONE             |
| Secondary Identity    | Meaningfully relevant additional curator philosophy     | ZERO+           |
| Narrative             | Human-readable synthesis of established intelligence    | ONE / varies    |
| Recommendation Signal | Machine-usable preference signal                        | MANY            |

---

# 6. Locked Quantitative Vocabulary

The intelligence system uses several different quantitative concepts. They must not be conflated.

| Term                      | Meaning                                                             | Must NOT mean              |
| ------------------------- | ------------------------------------------------------------------- | -------------------------- |
| Signal Strength           | How strongly a quality or signal is expressed                       | Probability of correctness |
| Data Sufficiency          | Whether enough archive data exists to evaluate something reasonably | Classification certainty   |
| Evidence Strength         | How strongly available evidence supports a conclusion               | Trait strength             |
| Classification Confidence | How clearly one classification beats plausible alternatives         | Raw classification score   |

## Decision — LOCKED

Do not create four numerical fields everywhere simply because four concepts exist.

Introduce a distinct field only where the semantic distinction is genuinely required by the API, UI, explanation layer, or decision logic.

### Existing field mappings

| Current field                            | Actual meaning                                                                | Classification                      | Phase 1 action                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| Identity `data_sufficiency`              | Archive-data sufficiency relative to the Identity's minimum entry requirement | Data Sufficiency                    | Preserve calculation and API behavior; use Data Sufficiency terminology                       |
| Identity `score`                         | Weighted strength of the archive's Identity signals                           | Signal Strength / Identity Score    | Preserve calculation and API behavior                                                         |
| Designation `score`                      | Strength of the archive's fit to a Designation                                | Signal Strength / Designation Score | Preserve calculation and API behavior                                                         |
| Designation `designationConfidence`      | Aggregate signal strength of the Designation Basis                            | TERMINOLOGY                         | Preserve calculation; present as Signal Strength                                              |
| Designation `designationConfidenceLabel` | Human-readable Signal Strength label                                          | TERMINOLOGY                         | Preserve behavior; align terminology                                                          |
| Observation `confidence`                 | Threshold-relative Evidence Strength                                          | TERMINOLOGY / CLARIFICATION         | Preserve calculation and API compatibility; public terminology migrated to `evidenceStrength` |
| Finding confidence                       | Not implemented                                                               | N/A                                 | Do not add in Phase 1                                                                         |

### Classification Confidence

Classification Confidence is **not currently implemented as an active quantitative concept**.

Phase 1 does not authorize a new Classification Confidence algorithm merely because some historical fields used the word `confidence`.

A future Classification Confidence system would require an explicit conceptual decision.

---

# 7. Protected Existing Behavior

Unless a direct contract conflict is demonstrated, preserve:

* Universal scoring
* Media-specific scoring
* Scoring profiles
* Scoring rubrics
* Entry model
* Archive mapping
* CRUD behavior
* Genre handling
* Observation evidence architecture
* `metric_evidence`
* `genre_evidence`
* Fixture-/rule-driven Designations
* Designation ranking
* Designation primary selection
* Designation recommendation-bias metadata
* Identity scoring machinery
* Identity weighted scoring
* Identity derived-trait machinery
* Identity eligibility
* Identity ranking
* Identity contribution breakdown
* Existing narrative architecture
* Deterministic behavior
* Empty-profile behavior
* Current passing behavior except for explicitly approved intentional changes

The current regression baseline is:

> **245 passing tests / 0 failing tests**

The Identity migration intentionally changed the Identity fixture catalog and corresponding test expectations. The current 245-test baseline is therefore the post-migration regression baseline rather than a mechanical continuation of the previous 247-test state.

Historical test counts remain useful as development history:

* 199 passing tests — original forensic baseline
* 210 passing tests — earlier Phase 1 baseline
* 218 passing tests — post-forensic baseline
* 247 passing tests — pre-Identity-migration passing checkpoint
* 245 passing tests — current post-Identity-migration green baseline

The difference between the 247-test and 245-test checkpoints should not be interpreted mechanically as regression.

---

# 8. Recovered Behavioral Contracts

The forensic audit recovered several behaviors that are meaningful enough to preserve.

## 8.1 Trait Signal Strength Normalization

Current Trait normalization uses a floor at `6` and reaches maximum strength at `10`.

```python
strength = min(max((value - 6) / 4, 0), 1)
```

Therefore:

```text
value <= 6 → 0
value = 10 → 1
```

**Classification:** PRESERVE

This is a meaningful semantic distinction from Identity normalization.

---

## 8.2 Identity Score Normalization

Identity scoring currently uses proportional 0–10 normalization:

```python
normalize_identity_score(value) = max(0, min(value / 10, 1))
```

Therefore values at or above `10` saturate at `1.0`.

This does **not** use the Trait Signal Strength floor.

These two normalization mechanisms have different semantics and should not be unified merely for implementation consistency.

**Classification:** PRESERVE

---

## 8.3 Identity Trait Resolution Priority

Current Identity scoring resolves traits conceptually in this order:

```text
universalAverages
↓
mediaAverages
↓
derived-trait calculation
```

**Classification:** PRESERVE

---

## 8.4 Derived Identity Traits

Current Identity infrastructure supports derived traits including:

* `experimental_affinity`
* `genre_diversity`
* `novelty`
* `analysis`
* `ambiguity`
* `reflection`
* `system_design`

Recovered implementation facts include:

* `novelty` and `experimental_affinity` currently rely on the same experimental-genre percentage signal
* `genre_diversity` derives from genre count and may exceed `10` before Identity normalization clamps it
* `system_design` currently derives directly from `gameplay_mechanics`

These are implementation facts.

They are not automatically reasons to redesign the system.

**Classification:** PRESERVE / DEFERRED REVIEW

Phase 1 should not redesign these mechanisms unless a direct contract contradiction is established.

---

## 8.5 Deterministic Existing Behavior

Meaningful deterministic behavior includes:

* Designations are ranked by score
* Primary Designation is selected from ranked candidates
* Observations are ordered by their established Evidence Strength semantics
* Identity scoring uses fixture weights
* Identity ranking is deterministic among eligible candidates
* Primary Identity selection is deterministic
* Identity contribution breakdowns are available
* Structured Observation evidence exists
* Empty-profile behavior produces empty/zero intelligence rather than fabricated certainty
* Recommendation-bias metadata exists independently of recommendation scoring
* Designations are not emitted as Findings

Identity tie behavior is deterministic through contribution-evidence ordering.

No arbitrary near-tie threshold is currently used.

**Classification:** PRESERVE + TEST

---

# 9. Designations

**Classification:** PRESERVE + TERMINOLOGY + EVIDENCE

## 9.1 Contract — LOCKED

Designation answers:

> **What recognizable taste classification fits this archive?**

Designations are taste classifications, not curator philosophies.

## 9.2 Current Catalog

The current Designation catalog contains four working classifications:

1. **Boundary Explorer**
2. **Curator**
3. **Engagement Architect**
4. **Deep Diver**

These concepts remain working hypotheses and may evolve in a future catalog-design decision.

### Boundary Explorer

A taste pattern characterized by attraction to unfamiliar, speculative, surreal, experimental, or boundary-pushing experiences, particularly when exploration is sustained rather than represented by isolated sampling.

### Curator

A taste pattern characterized by breadth, variety, strong appreciation of craft and presentation, and an archive that demonstrates substantial selection across different areas of media.

### Engagement Architect

A taste pattern characterized by strong engagement with execution, systems, pacing, gameplay, or other structural mechanisms that make an experience compelling.

### Deep Diver

A taste pattern characterized by sustained attention to layered, emotionally resonant, psychologically rich, or interpretively rewarding media.

## 9.3 Existing Machinery — PRESERVE

Preserve:

* rule/fixture-driven definitions
* multiple internal candidates
* ranking
* primary selection
* Designation Score
* Designation Basis
* recommendation-bias metadata
* deterministic behavior

## 9.4 Designation Signal Strength

`designationConfidence` is preserved as an API field for compatibility.

Its current calculation represents aggregate Signal Strength of the Designation Basis rather than statistical confidence.

The frontend presents the concept as **Signal Strength**.

No replacement Classification Confidence algorithm is required.

## 9.5 Designation Basis

`designationBasis` is a backend-produced summary of dominant archive-level classification signals.

The backend remains authoritative for this field.

It should not be interpreted as an exhaustive list of every signal that participates in Designation rule evaluation.

The obsolete frontend duplicate of Designation Basis generation has been removed.

---

# 10. Identity vs. Designation

**Classification:** ALIGNMENT
**Status:** LOCKED

| Layer       | Core question                                                       |
| ----------- | ------------------------------------------------------------------- |
| Designation | What recognizable taste classification fits?                        |
| Identity    | What recurring curatorial orientation does the archive demonstrate? |

The systems may share evidence and infrastructure.

They must not collapse into the same conceptual layer.

### Designation

A Designation describes the characteristics of the media relationship.

### Identity

An Identity describes the recurring orientation through which the curator engages with those characteristics.

A useful shorthand is:

> **Designation:** What do you tend to like?

> **Identity:** What relationship do you tend to establish with what you like?

Shared evidence is permitted.

Shared conclusions are not.

---

# 11. Identity Catalog

**Status:** LOCKED

The Identity subsystem describes durable curator philosophies that could plausibly apply across different archives.

Identity is not:

* a personality diagnosis
* a Zach-specific personality label
* a Designation clone
* a recommendation category
* a single favorite genre
* a restatement of one underlying Trait

The accepted Phase 1 Identity catalog contains three concepts.

## 11.1 Interpretive Philosophy

**Definition:** Engagement with media through depth, reflection, complexity, and interpretation.

**Primary signal:** `depth`

**Supporting signals:**

* `emotional_impact`
* `reflection`
* `ambiguity`
* `analysis`

**Minimum entries:** `20`

**Weights:**

| Signal             | Weight |
| ------------------ | -----: |
| `depth`            |   0.45 |
| `emotional_impact` |   0.25 |
| `reflection`       |   0.12 |
| `ambiguity`        |   0.10 |
| `analysis`         |   0.08 |

Interpretive Philosophy is distinct from Deep Diver Designation.

Deep Diver identifies a recognizable taste pattern toward depth and layered experiences.

Interpretive Philosophy describes the broader relationship with those experiences: engaging with media as something to interpret, question, unpack, and reconsider.

---

## 11.2 Exploratory Philosophy

**Definition:** Engagement that extends beyond established preferences into unfamiliar or boundary-expanding territory.

**Strongest observable signals:**

* `originality`
* `genre_diversity`

**Supporting / proxy signals:**

* `depth`
* `experimental_affinity`
* `novelty`

**Minimum entries:** `20`

**Weights:**

| Signal                  | Weight |
| ----------------------- | -----: |
| `originality`           |   0.35 |
| `genre_diversity`       |   0.25 |
| `depth`                 |   0.15 |
| `experimental_affinity` |   0.15 |
| `novelty`               |   0.10 |

Exploratory Philosophy is distinct from Boundary Explorer Designation.

Boundary Explorer identifies attraction to unconventional or boundary-pushing media.

Exploratory Philosophy describes a recurring relationship with unfamiliar territory.

The current archive does not directly observe deliberate exploration, intent, or trajectory through taste space.

Therefore:

> **Exploratory Philosophy must not be interpreted as proof of deliberate exploration.**

---

## 11.3 Breadth Philosophy

**Definition:** The range of territory represented in the archive.

**Primary observable signal:** `genre_diversity`

**Minimum entries:** `15`

**Weight:**

| Signal            | Weight |
| ----------------- | -----: |
| `genre_diversity` |   1.00 |

Breadth Philosophy describes observable range.

It does not automatically establish:

* deliberate diversification
* broad curiosity outside the archive
* intentional exploration
* collecting behavior
* motivation for the observed variety

The current fixture intentionally uses `genre_diversity` as its formal Identity signal.

---

# 12. Identity Evidence and Differentiation

The three current Identities answer different questions:

| Identity                | Core question                                            |
| ----------------------- | -------------------------------------------------------- |
| Interpretive Philosophy | How do you engage with what you consume?                 |
| Exploratory Philosophy  | How do you relate to the boundaries of what you consume? |
| Breadth Philosophy      | How wide is the territory you consume?                   |

The governing rule is:

> **Evidence can overlap. Meaning cannot.**

An archive may legitimately score highly on multiple Identities.

High depth does not automatically establish Interpretive Philosophy.

High experimentation does not automatically establish Exploratory Philosophy.

Large archive size does not automatically establish Breadth Philosophy.

The Identity catalog must not be reconstructed by simply renaming or reweighting Designations.

---

# 13. Identity Eligibility

Identity eligibility, scoring, ranking, and presentation are distinct concepts.

The locked model is:

```text
Data Sufficiency
      ↓
Eligibility
      ↓
Eligible Candidates
      ↓
Score
      ↓
Ranking
      ↓
Presentation
      ↓
Primary / Secondary selection
```

## Current minimum-entry requirements

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

An Identity below its minimum entry requirement is excluded from candidate evaluation.

Minimum-entry eligibility is an eligibility gate, not a confidence score.

---

# 14. Identity Scoring

Eligible Identities are scored using their fixture-defined weighted signals.

The existing scoring architecture is preserved:

1. Resolve signals from available archive data.
2. Normalize signal values using the existing Identity normalization.
3. Apply fixture weights.
4. Sum weighted contributions.
5. Expose the contribution breakdown.
6. Rank eligible Identities by Identity Score.

The Identity Score represents Signal Strength.

It does not represent statistical confidence.

The current fixture weights are authoritative for the migrated catalog.

No generalized Identity scoring algorithm redesign is authorized by this document.

---

# 15. Primary Identity

Primary Identity is the single strongest eligible Identity.

Current behavior:

* only eligible Identities participate
* candidates are ranked by Identity Score
* the strongest candidate becomes Primary Identity
* no co-primary Identity is produced
* exact-score ties are resolved deterministically through contribution-evidence ordering
* tie resolution does not add to or alter the Identity Score
* arbitrary near-tie thresholds are not used

The primary result must not depend on:

* fixture file ordering
* incidental catalog ordering
* Designation names
* a one-to-one Designation → Identity relationship

**Status:** LOCKED / IMPLEMENTED / TESTED

---

# 16. Secondary Identity

Secondary Identity is an optional additional Identity that provides meaningful independent support.

Current behavior:

* the Identity must be eligible
* it must not be the Primary Identity
* it must have an Identity Score of at least `0.60`
* it is selected from the remaining ranked candidates
* positive score alone does not qualify an Identity
* merely being the second-ranked Identity does not qualify it
* numerical closeness to Primary Identity does not independently qualify it

Current threshold:

```text
SECONDARY_MIN_SCORE = 0.60
```

This threshold is a presentation/selection policy rather than part of the Identity scoring formula.

**Status:** LOCKED / IMPLEMENTED / TESTED

---

# 17. Identity Tie and Ranking Policy

Identity ranking is based on Identity Score.

For exact-score ties, deterministic contribution evidence ordering provides the tie resolution.

No arbitrary near-tie threshold is used.

A non-equal score remains a meaningful ranking difference.

Secondary selection is a separate policy from primary ranking.

Tie resolution does not alter the underlying score.

**Status:** LOCKED / IMPLEMENTED / TESTED

---

# 18. Observation Alignment

Observation terminology has been clarified.

The conceptual distinction is:

> **Evidence Strength describes how strongly available evidence supports an Observation.**

The existing Observation calculation is preserved.

The public API terminology has migrated from historical `confidence` presentation to `evidenceStrength`.

Observation rules may contain multiple predicate conditions while using a designated supporting metric as the numerical Evidence Strength basis.

This is intentional.

The system does not need to calculate a compound statistical confidence value.

**Status:** PRESERVE + TERMINOLOGY / IMPLEMENTED

---

# 19. Finding Alignment

Findings remain binary rule-triggered interpretations.

A Finding either fires or does not fire.

Findings should expose explicit support explaining why the rule fired.

Possible support includes:

* Observations
* Traits
* Genre Signals
* metrics
* other explicitly defined signals

Findings do not currently expose a confidence value.

No Finding confidence algorithm should be introduced merely to align terminology.

Any future graded Finding strength would require a separate conceptual decision.

**Status:** PRESERVE / DO NOT ADD

---

# 20. Recommendation Bias

`recommendation_bias` remains recommendation-oriented metadata.

It is not a Recommendation Score.

It is not a Recommendation Confidence value.

It is not evidence that a Recommendation Engine currently exists.

Recommendation scoring and the full Recommendation Engine remain deferred.

Identity should eventually be able to influence recommendations indirectly through explainable preference signals, but that is a later product/algorithm decision.

**Status:** PRESERVE / DEFERRED**

---

# 21. Evidence Architecture

The intelligence system intentionally uses subsystem-specific evidence mechanisms.

Observation evidence may include structured:

* metric evidence
* genre evidence
* supporting signals

Identity explanation uses weighted contribution breakdowns.

Designation explanation uses Designation-specific basis and metadata.

Finding explanation uses explicit rule support.

These mechanisms do not need to share one universal schema.

The governing principle is:

> **The contract requires explainability, not architectural uniformity.**

Do not create a universal evidence schema solely to make different intelligence subsystems structurally identical.

---

# 22. Archive State

Archive state remains a separate concern from intelligence classification.

The valid archive states are:

### Empty

No completed media records exist.

The system should not fabricate intelligence from an empty archive.

### Sparse

Some data exists, but the archive may not contain enough evidence for every intelligence conclusion.

Data Sufficiency must be respected.

### Established

The archive contains enough accumulated data for broader intelligence evaluation.

Archive state should not be confused with:

* Identity
* Designation
* Signal Strength
* Evidence Strength
* Classification Confidence

---

# 23. Implementation Gates

Phase 1 implementation should proceed only when the relevant conceptual decision is sufficiently defined.

## Completed Identity gates

* Identity vs. Designation ontology
* Identity differentiation audit
* Identity evidence mapping
* Identity fixture contract
* Identity fixture migration
* Identity test migration
* Identity minimum-entry eligibility
* deterministic Identity ranking
* deterministic Primary Identity selection
* deterministic exact-tie handling
* Secondary Identity threshold behavior
* full regression coverage

## Remaining Phase 1 gates

* per-field terminology reconciliation where still required
* Observation shortlist alignment
* Archive State implementation/alignment
* Finding evidence boundary
* ELEVATE Finding work
* final terminology/API/frontend reconciliation
* final Phase 1 regression verification
* final documentation reconciliation

No new conceptual policy should be invented while implementing a gate whose governing decision is already locked.

---

# 24. Work Order

The intended Phase 1 work order is:

1. Terminology reconciliation
2. Identity ontology and catalog migration
3. Regression protection
4. Finding boundary and evidence work
5. Observation alignment
6. Archive State alignment
7. Final API/frontend terminology reconciliation
8. Final Phase 1 regression
9. Documentation reconciliation

Completed conceptual decisions should not be reopened merely because later implementation work encounters an adjacent concern.

---

# 25. Phase 1 Completed Checkpoints

The following Phase 1 checkpoints are complete:

* forensic intelligence audit
* Identity vs. Designation differentiation
* Identity ontology differentiation
* Identity evidence mapping
* Identity fixture contract
* Identity fixture migration
* Identity test migration
* deterministic Identity eligibility and ranking behavior
* deterministic Primary Identity selection
* Secondary Identity threshold behavior
* frontend scoring terminology alignment
* `systems-preference` consolidation into `systems-affinity`
* `designationBasis` consumer audit
* removal of obsolete frontend `generatedesignationBasis()` duplicate
* Observation evidence terminology alignment
* full regression suite green

Current regression baseline:

> **245 passing tests / 0 failing tests**

These completed checkpoints represent intentional Phase 1 decisions and should not be reopened without new evidence of a contract contradiction.

---

# 26. Governing Principle

The governing implementation principle for Phase 1 is:

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Terminology alignment is therefore a controlled evolution of the existing Media Tracker architecture, not a justification for rewriting it.

**Principle:** Establish the semantic contract first. Align terminology and implementation to that contract without changing behavior unless an explicit conceptual decision requires the change.
