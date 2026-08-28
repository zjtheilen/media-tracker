```
__    __ ___    ___ ___  ____ ___
\ \/\/ // _ \  _\\ / _ \ | D )| |
 \_/\_//_/ \_\/__//_/ \_\|_D_)|_|
 Weighted Archive System for Analysis & Behavioral Insights
```

# Media Tracker — Phase 1 Intelligence Alignment

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Phase:** Phase 1 — Intelligence Alignment
**Status:** Reconciled after forensic audit
**Related documents:**

- `intelligence-contract.md`
- `intelligence-forensic-audit.md`
- `phase-1-decision-and-implementation-map.md`
- `roadmap.md`
- `forgotten-features-register.md`

**Current regression baseline:** **210 passing tests**

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

Phase 1 exists to bring the existing intelligence implementation into alignment with the conceptual boundaries established in `intelligence-contract.md`, while preserving meaningful behavior recovered through forensic analysis.

This is **not a redesign of the intelligence architecture**.

The repository already contains substantial intelligence machinery and behavioral contracts encoded in production code, fixtures, API models, downstream consumers, and tests.

The purpose of Phase 1 is therefore to:

- preserve behavior that remains compatible with the contract
- identify and correct behavior that directly contradicts a locked conceptual decision
- distinguish conceptual problems from implementation imperfections
- correct misleading terminology before changing valid calculations
- preserve existing evidence and explanation infrastructure
- identify duplicated or weakly differentiated rules
- protect recovered behavioral contracts with regression tests
- explicitly document unresolved decisions
- defer future architecture and recommendation work
- avoid unnecessary rewrites

The central rule remains:

> **Change the minimum amount of implementation necessary to make the existing system conform to the locked conceptual model.**

The forensic audit adds an important constraint:

> **Do not treat every discrepancy between the contract and implementation as evidence that the implementation should change.**

A discrepancy must first be classified as a genuine contract conflict, an implicit behavioral contract worth preserving, an ambiguity requiring clarification, or a candidate for later review.

---

# 2. Current Baseline

The `develop-3` branch contains a substantially developed intelligence layer.

The repository contains dedicated services and infrastructure for:

- Traits
- Genre Signals
- Observations
- Findings
- Designations
- Identities
- Identity-derived traits
- Identity explanations
- Identity findings
- Evidence
- Archive/Profile assembly
- Narrative
- Recommendation infrastructure

The intelligence layer is deterministic and rule/fixture driven.

The current test suite contains approximately:

> **210 passing tests**

This is the current protected regression baseline.

The earlier Phase 1 documents referenced approximately 199 passing tests. That number is now historical and must not be used as the active baseline.

A Phase 1 change is not successful merely because the intended new behavior works.

It must also preserve unrelated existing behavior.

---

# 3. Phase 1 Status

The forensic audit has established the following:

| Area                               | Status                                                   |
| ---------------------------------- | -------------------------------------------------------- |
| Repository inventory               | Complete                                                 |
| Intelligence service inventory     | Complete                                                 |
| Existing behavioral contracts      | Recovered                                                |
| Identity scoring audit             | Complete                                                 |
| Designation audit                  | Complete                                                 |
| Observation audit                  | Complete                                                 |
| Finding audit                      | Complete                                                 |
| Observation/Finding overlap matrix | Complete                                                 |
| Evidence audit                     | Complete                                                 |
| Confidence terminology audit       | Complete                                                 |
| Archive-state audit                | Conceptually complete; operational thresholds unresolved |
| Ranking/tie audit                  | Conceptually identified; final policy unresolved         |
| API/frontend blast-radius audit    | Identified; field-specific compatibility work remains    |
| Current test baseline              | **210 passing**                                          |
| Phase 1 implementation alignment   | Pending                                                  |

The implementation should proceed from the reconciled decisions captured in:

`phase-1-decision-and-implementation-map.md`

---

# 4. Explicit Non-Goals

Phase 1 does not include:

- rewriting the scoring system
- rewriting scoring rubrics
- replacing the Observation architecture
- replacing fixture-driven Designations
- replacing fixture-driven Identities merely because current vocabulary overlaps
- redesigning the Recommendation Engine
- building the final Profile UI
- pagination
- import/export
- metadata integrations
- React migration
- machine-learning recommendations
- replacing deterministic systems with opaque AI
- creating large numbers of new Designations or Identities merely for variety
- forcing Observations and Findings into a single processing pipeline
- unifying every evidence structure
- inventing Classification Confidence mathematics merely to replace a field named `confidence`

---

# 5. Implementation Rules

## 5.1 Preserve Working Behavior

If existing behavior does not directly conflict with the contract, preserve it.

A behavior may be worth preserving even if the contract does not explicitly mention it.

Tests are evidence of the project's historical behavioral memory.

Do not remove or change behavior merely because it is absent from the conceptual contract.

---

## 5.2 Prefer Terminology Changes Before Algorithm Changes

If existing behavior is conceptually valid but mislabeled, correct the terminology before changing the calculation.

Examples include:

- Identity `confidence` behaving as Data Sufficiency
- Designation confidence behaving as Signal Strength
- Observation confidence behaving as threshold-relative support strength

Do not invent a Classification Confidence algorithm merely because an existing field is called `confidence`.

---

## 5.3 Prefer Targeted Rule Changes

When behavior genuinely violates a locked contract:

1. identify the smallest responsible rule
2. change that rule
3. preserve surrounding infrastructure
4. update affected API/serialization consumers
5. add regression tests
6. verify the full suite remains green

---

## 5.4 Distinguish Contract Conflict from Implementation Imperfection

The following are not equivalent:

> "The implementation is imperfect."

and:

> "The implementation violates the contract."

For example, the existence of overlapping Identity and Designation names is an implementation/catalog problem, but does not justify deleting the Identity scoring system.

Likewise, duplicated or partially overlapping Findings do not justify mass deletion without determining whether the duplicate actually represents lost interpretive meaning.

---

## 5.5 Preserve Evidence Infrastructure

The Observation evidence model is one of the strongest existing parts of the intelligence layer.

Preserve:

- structured evidence
- metric evidence
- genre evidence
- observation explanation mechanisms
- contribution breakdowns where they already provide useful explanation

Do not force every intelligence subsystem into one universal evidence schema.

The contract requires explainability, not architectural uniformity.

---

## 5.6 Tests Are Part of the Alignment

Every intentional conceptual correction must have corresponding tests.

The test suite is part of the behavioral contract.

Tests should protect meaningful domain behavior rather than merely implementation details.

The current baseline is:

> **210 passing tests**

---

# 6. Recovered Behavioral Contracts

The forensic audit recovered several behaviors that are not fully specified by the conceptual contract.

Unless a direct contract conflict is demonstrated, these behaviors should be preserved.

## 6.1 Trait Signal Strength Normalization

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

## 6.2 Identity Score Normalization

Identity scoring currently resolves trait values using proportional 0–10 normalization.

```python

normalized_value = clamp(value / 10, 0, 1)
identity_contribution = normalized_value \* fixture_weight

```

This does **not** apply the Trait Signal Strength floor.

These two normalization mechanisms have different semantics.

**Classification:** PRESERVE

Do not unify them merely for implementation cleanliness.

---

## 6.3 Identity Trait Resolution Priority

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

## 6.4 Derived Identity Traits

Current Identity infrastructure supports derived traits including:

- `experimental_affinity`
- `genre_diversity`
- `novelty`
- `analysis`
- `ambiguity`
- `reflection`
- `system_design`

Recovered implementation facts include:

- `novelty` and `experimental_affinity` currently rely on the same experimental-genre percentage signal
- `genre_diversity` derives from genre count and may exceed 10 before Identity normalization clamps it
- `system_design` currently derives directly from `gameplay_mechanics`

These are implementation facts.

They are not automatically reasons to redesign the system.

**Classification:** PRESERVE / DEFERRED REVIEW

Phase 1 should not redesign these mechanisms unless a direct contract contradiction is established.

---

## 6.5 Deterministic Existing Behavior

The audit also recovered meaningful deterministic behavior including:

- Designations are ranked by score
- Primary Designation is selected from the ranked candidates
- Observations have deterministic ordering based on their support/confidence semantics
- Identity scoring uses fixture weights
- Identity contribution breakdowns are available
- Structured Observation evidence exists
- Empty-profile behavior produces empty/zero intelligence rather than fabricated certainty
- Recommendation-bias metadata exists independently of recommendation scoring
- Designations are not emitted as Findings

These behaviors should be preserved unless a specific Phase 1 decision explicitly changes them.

---

# 7. Alignment Area 1 — Confidence Terminology

## Problem

The implementation uses `confidence` for several semantically different quantities.

The contract distinguishes:

| Term                      | Meaning                                                     |
| ------------------------- | ----------------------------------------------------------- |
| Signal Strength           | How strongly a quality or signal is expressed               |
| Data Sufficiency          | Whether enough archive data exists                          |
| Classification Confidence | How clearly one classification beats plausible alternatives |
| Evidence Strength         | How strongly available evidence supports the conclusion     |

---

## Current Semantic Mappings

### Identity confidence

### Identity score vs. data sufficiency

Identity uses two distinct measures:

* **Identity `score`** measures the strength of the archive's trait alignment with the selected Identity.
* **Identity `data_sufficiency`** measures whether the archive contains enough entries relative to that Identity's minimum-data requirement.

These dimensions are intentionally independent. A profile can have a strong trait alignment with an Identity while having insufficient archive volume, or sufficient archive volume without strong trait alignment.

`data_sufficiency` is therefore not an Identity confidence score, and `score` is not a measure of statistical confidence.

No consolidation or replacement algorithm is required.

**Status:** RESOLVED — preserve both concepts; correct stale `confidence` terminology.


### Identity data sufficiency

Identity `data_sufficiency` represents entry-count sufficiency relative to the minimum-entry requirement for the Identity.

It answers:

> Does the archive contain enough entries for this Identity to be considered sufficiently supported by the available data?

It does **not** represent statistical confidence, probability, or confidence that the Identity classification is objectively correct.

The existing calculation is preserved and is protected by dedicated tests.

The previous `confidence` terminology has been retired in favor of `data_sufficiency`. No compatibility alias or replacement algorithm is required.

**Status:** RESOLVED — preserve calculation; use Data Sufficiency terminology.

---

### Designation confidence

Current designation confidence is derived from trait-derived scores.

It therefore behaves more like **Signal Strength** than Classification Confidence.

**Classification:** TERMINOLOGY

---

### Designation confidence resolution

The existing `designationConfidence` calculation is preserved.

Its actual semantic meaning is aggregate Signal Strength of the classification basis.

The field name remains a compatibility concern rather than a mathematical defect.

No replacement Classification Confidence algorithm is required.

**Status:** RESOLVED — terminology/presentation alignment remains.

---

### `classificationBasis`

`classificationBasis` is a backend-produced summary of the dominant classification signals used to characterize an archive's classification basis.

It contains:

- the strongest universal trait
- the second-strongest universal trait
- the strongest media-specific trait

It should not be interpreted as an exhaustive list of every signal that may participate in designation-rule evaluation.

The frontend consumes this backend-produced representation directly.

A legacy frontend `generateClassificationBasis()` helper was found to duplicate the backend behavior without being part of the active production path. The legacy frontend `generateClassificationBasis()` helper has been removed.

The backend `generate_classification_basis()` implementation remains the
authoritative producer of `classificationBasis`, which remains an active
archive-profile/API field consumed by the frontend.

**Status:** RESOLVED — preserve backend/API behavior; dead frontend duplicate removed.

---

### Observation confidence

Observation `confidence` is an active threshold-relative **Evidence Strength** value.

Each Observation rule defines a predicate determining whether the Observation fires and a dedicated `confidence` calculation identifying the strength of its designated primary supporting metric relative to that metric's threshold.

The confidence calculation is therefore independent from the Observation's generated evidence list.

Additional predicate conditions may establish that an Observation qualifies without contributing directly to its numerical confidence value.

For example, a rule may require multiple metric or genre conditions while using one designated metric as its Evidence Strength basis. This is intentional and should not be interpreted as an incomplete compound-confidence calculation.

The value does not represent statistical confidence, probability, or confidence that the Observation itself is objectively correct.

The existing calculation is preserved and protected by dedicated tests.

**Status:** RESOLVED — preserve calculation; clarify rule-level Evidence Strength semantics.


---

### Finding confidence

Findings currently do not expose or calculate a confidence value.

Finding evaluation is binary: the Finding rule either fires or does not fire. The resulting Finding includes explicit evidence describing the metrics or conditions that caused the rule to fire.

This is intentional for the current Phase 1 model.

No Finding confidence algorithm should be introduced as part of terminology alignment or forensic cleanup.

If a future design requires graded Finding strength, that should be treated as a separate semantic/product decision rather than an inferred correction to the existing implementation.

**Status:** RESOLVED — DO NOT ADD

---

## Phase 1 Rule

Correct terminology first.

Do not create new quantitative algorithms simply to make existing property names technically accurate.

---

# 8. Alignment Area 2 — Designations

## Locked Concept

Designation answers:

> **What recognizable taste classification fits this archive?**

Designations are classifications, not curator philosophies.

---

## Existing Machinery to Preserve

Preserve:

- fixture/rule-driven definitions
- multiple internal candidates
- ranking
- primary selection
- traits
- genres
- recommendation bias
- deterministic behavior

Current Designation IDs include:

```text
boundary_explorer
curator
engagement_architect
deep_diver
```

The catalog itself should not be redesigned merely because Identity vocabulary is being repaired.

---

## Evidence

Where useful, Designations may expose lightweight explanatory information such as:

- strongest contributing traits
- relevant genre affinities
- classification/signal score
- directly relevant signals

Do not clone the full Observation evidence schema.

**Classification:** PRESERVE + EVIDENCE

---

# 9. Alignment Area 3 — Designation vs Identity

This distinction is mandatory.

| Layer       | Question                                        |
| ----------- | ----------------------------------------------- |
| Designation | What named taste classification fits?           |
| Identity    | What kind of curator does the archive describe? |

The current repository contains overlapping names between Designations and Identity fixtures.

This is an implementation/catalog artifact.

It does not mean the two concepts should be merged.

---

## Locked Direction

Identity should evolve toward **curator philosophy / curator synthesis**.

Identity names should not simply duplicate Designation names.

Do not delete Identity scoring machinery merely because current fixtures overlap.

---

## Important Forensic Clarification

The current implementation does not enforce Designation and Identity as sequential stages of one classification pipeline.

They are independently evolved systems.

Therefore:

> Conceptual separation does not require architectural merging or sequencing.

Phase 1 should preserve their independent machinery while ensuring their semantic responsibilities remain distinct.

---

# 10. Alignment Area 4 — Identity Eligibility

The earlier Phase 1 plan treated `minimum_entries` as an automatic exclusion-before-ranking gate.

The forensic audit requires a more conservative interpretation.

## Recovered Behavior

Identity fixtures define `minimum_entries`.

Current implementation behavior uses this value in scoring/sufficiency logic.

The important semantic distinction is:

```text
Data Sufficiency
≠
Score
≠
Ranking
≠
Presentation
```

The fact that an identity receives zero or reduced score when insufficient data exists does not, by itself, establish that the identity must be removed from the ranking collection.

---

## Phase 1 Direction

`minimum_entries` should be treated as a **data-sufficiency/eligibility concept**, but the exact relationship between eligibility, ranking, and presentation must be established from the current implementation and contract before changing behavior.

Do not automatically implement:

```text
entry_count < minimum_entries
↓
remove candidate
```

unless repository evidence and the locked contract establish that exclusion is required.

The Phase 1 implementation audit must therefore determine:

- whether ineligible identities are intended to remain internally rankable
- whether they are intended to remain externally presentable
- whether zero-score identities can currently become primary
- whether that behavior is a genuine contract conflict
- whether the correct change belongs in scoring, ranking, or presentation

**Classification:** CLARIFICATION / POSSIBLE ALIGNMENT

**Gate:** Do not change Identity eligibility behavior until this specific semantic distinction is confirmed against the current implementation and API behavior.

---

# 11. Primary Identity

Primary Identity remains conceptually:

```text
many eligible candidates
↓
deterministic ranking
↓
one primary identity
```

The existing ranking machinery should be preserved unless the eligibility audit establishes a direct conflict.

Required tests should protect:

- deterministic ranking
- primary selection
- primary selection explainability
- primary selection independence from Designation naming
- behavior when insufficient-data identities are present

**Classification:** PRESERVE + TESTING

---

# 12. Secondary Identities

The contract allows:

> zero or more meaningful Secondary Identities

But "meaningful" remains operationally unresolved.

Do not automatically surface every identity with a score greater than zero.

Potential considerations include:

1. Data Sufficiency
2. meaningful signal strength
3. relationship to the primary Identity
4. separation from weak candidates

Exact numeric thresholds remain:

> **UNRESOLVED — requires implementation decision.**

Do not invent thresholds simply to satisfy the cardinality requirement.

---

# 13. Ties and Close Competitors

Current ranking behavior is deterministic in the sense that the repository uses explicit sorting, but the conceptual policy for ties and near-ties is not fully defined.

The system must distinguish:

- exact ties
- meaningful near-ties
- strong-vs-weak differences

The following remains:

> **UNRESOLVED — requires implementation decision.**

The final policy must determine:

- exact tie-breaking
- stable secondary sort key if necessary
- score precision
- what qualifies as a meaningful near-tie
- whether close competitors are displayed
- whether the policy applies to Designations, Identities, or both

Do not invent a near-tie threshold during Phase 1 implementation.

---

# 14. Alignment Area 8 — Findings vs Observations

## Locked Conceptual Distinction

| Layer       | Question                          |
| ----------- | --------------------------------- |
| Observation | What can we directly demonstrate? |
| Finding     | What does the evidence suggest?   |

A Finding should provide additional meaning.

---

## Important Forensic Clarification

The conceptual distinction does **not** imply that the current implementation must be a pipeline:

```text
Observations
↓
Findings
```

The audit found that current Observation and Finding rule systems are independently evaluated.

Neither subsystem directly consumes the other.

Therefore the Phase 1 goal is:

> Preserve independent rule machinery while ensuring that Findings provide meaning that is not merely duplicated by an Observation or raw signal.

---

## Operational Test

Ask:

> If the Finding were removed and replaced with its underlying Observation or raw signal, would meaningful information be lost?

If the answer is no, the item is probably functioning as an Observation or Genre Signal.

---

## Findings May

- synthesize multiple Observations
- synthesize Traits
- synthesize Genre Signals
- synthesize quantitative evidence
- provide a meaningful interpretive frame
- use a single signal when that signal gains genuine additional meaning through interpretation

---

## Findings Must Not

- merely restate an Observation
- merely restate a Genre Signal percentage
- duplicate a rule condition under a new ID
- become a second Designation layer

**Classification:** ALIGNMENT + CLARIFICATION + TESTING

---

# 15. Observation / Finding Forensic Overlap

The audit established the following cross-layer relationships.

## Likely rule-level duplicates

### `systems-affinity` ↔ `systems-preference`

**RESOLVED:** `systems-preference` does not provide distinct interpretive meaning beyond `systems-affinity`.

Both rules were driven by `gameplay_mechanics >= 9` and expressed substantially the same interpretation. Because their semantics and evidence were materially identical, maintaining both would duplicate one concept rather than provide complementary intelligence.

The former `systems-preference` Finding has therefore been removed.

`systems-affinity` is the canonical surviving Observation for the concept.

This is a semantic consolidation decision, not a change to the parallel architecture of the intelligence systems. Findings, Observations, Designations, Identities, and Narrative remain independent systems.

**Status:** RESOLVED — CONSOLIDATED INTO `systems-affinity`

---

### `atmospheric-focus` ↔ `atmospheric-interest`

These rules substantially overlap in their evaluated signals and appear likely to represent the same phenomenon at two layers.

Again, the correct action is not automatic deletion.

**Classification:** POSSIBLE DEAD CODE / CLARIFICATION

---

## Partial overlaps

Several Observation/Finding pairs share individual signals while differing in conjunctions or interpretation.

Examples include:

- boundary-preference ↔ concept-driven
- boundary-preference ↔ speculative-interest
- boundary-preference ↔ atmospheric-interest
- interpretive-depth ↔ concept-driven

These should not be treated as duplicates merely because they share one signal.

---

## Distinct concepts

The audit found no simple Finding counterpart for:

- emotional-resonance
- craft-appreciation
- engagement-priority
- several speculative and systems-related observations

Likewise, several Findings have no Observation twin.

This is evidence against treating the Observation/Finding distinction as merely two names for the same rule layer.

---

# 16. Finding Catalog Treatment

The existing Finding catalog should be handled conservatively.

The current forensic classifications are:

| Finding                | Treatment                  |
| ---------------------- | -------------------------- |
| `concept-driven`       | PRESERVE                   |
| `engagement-priority`  | CLARIFY / ELEVATE          |
| `systems-preference`   | REMOVED / CONSOLIDATED     |
| `speculative-interest` | CLARIFY / ELEVATE          |
| `atmospheric-interest` | DEFER / POSSIBLE DUPLICATE |

No mass deletion should occur.

Before changing an ELEVATE candidate, define:

> What interpretive conclusion does this Finding add that the underlying Observation, Trait, or Genre Signal does not already communicate?

---

# 17. Finding Evidence

Findings should eventually expose supporting evidence.

Evidence may include:

- Observations
- Traits
- Genre Signals
- quantitative metrics
- other explicitly defined archive signals

The evidence schema does not need to match Observation evidence exactly.

The requirement is:

> **Why does the system think this?**

not:

> **Does every subsystem use the same JSON structure?**

**Classification:** EVIDENCE

---

# 18. Confidence / Strength Semantics

The intelligence layer must distinguish:

| Concept                   | Meaning                                              |
| ------------------------- | ---------------------------------------------------- |
| Signal Strength           | Magnitude of an expressed signal                     |
| Data Sufficiency          | Whether enough data exists to evaluate something     |
| Evidence Strength         | Support provided by available evidence               |
| Classification Confidence | Relative certainty between competing classifications |

The presence of these conceptual categories does **not** require four universal numerical fields.

Only expose a distinct field when the API, UI, explanation layer, or decision logic actually requires the distinction.

Finding confidence remains unresolved.

No generalized Classification Confidence algorithm belongs in Phase 1.

---

# 19. Archive State Behavior

The intelligence layer should recognize conceptually:

- EMPTY
- SPARSE
- ESTABLISHED

However, operational thresholds remain unresolved.

The conceptual rule is:

> **Insufficient data should produce insufficient evidence, not false certainty.**

Subsystems do not necessarily need the same minimum data requirements.

For example:

- Traits may work with relatively little data
- Identity may require more data
- individual Observations may require specific metrics
- Designations may require specific genre coverage

Operational thresholds remain:

> **UNRESOLVED — requires implementation decision.**

Do not make code depend on semantic archive-state labels until their operational thresholds are defined.

---

# 20. Partial Data

The intelligence layer should tolerate incomplete information where practical.

Potential conditions include:

- missing scores
- missing genres
- incomplete media-specific metrics
- limited genre coverage
- partially populated archives

The system should degrade gracefully rather than fabricate certainty.

This is primarily a testing and implementation-safety concern.

---

# 21. Ranking / Tie Behavior

Inspect every ranking operation before changing it.

Determine:

- sort key
- precision
- tie behavior
- stable ordering
- primary selection
- whether close competitors are distinguishable
- whether Python/file-system ordering can affect results

Do not invent a tie-breaking rule solely to make ordering appear cleaner.

Where current deterministic ordering exists without a conceptual contradiction, preserve it pending explicit tie-policy clarification.

---

# 22. Evidence Architecture

Existing evidence mechanisms include:

- metric evidence
- genre evidence
- observation evidence
- finding evidence
- designation explanation
- identity contribution breakdowns
- narrative explanation

The forensic audit indicates that these mechanisms serve different purposes.

Phase 1 should therefore:

- preserve strong existing evidence mechanisms
- strengthen missing explanation where useful
- avoid universalizing evidence structures
- avoid architectural unification merely for consistency
- ensure each intelligence layer can answer "why?"

---

# 23. Recommendation Bias

Recommendation bias is descriptive recommendation-oriented metadata.

It is not itself a recommendation score.

Preserve existing recommendation-bias metadata on:

- Designations
- Identities

However:

> Identity must not become a direct numerical recommendation score.

The future Recommendation Engine should consume measurable signals directly.

**Classification:** PRESERVE / DEFERRED

---

# 24. Soft Recommendation Signals

The contract allows Observations and Findings to become soft recommendation signals.

Phase 1 should not implement their eventual weighting.

Hard/measurable signals may include:

- Trait Strength
- Genre Affinity
- scoring preferences

Soft/interpretive signals may eventually include:

- Observations
- Findings
- Identity-derived context

Their exact weighting belongs to Recommendation Engine work.

**Classification:** DEFERRED

---

# 25. Narrative Boundaries

Narrative is a human-readable synthesis layer.

Narrative may:

- combine established signals
- translate analytical terminology
- summarize Findings
- contextualize Designations
- explain Identity
- connect related conclusions

Narrative may not:

- invent Traits
- invent evidence
- invent classifications
- invent Findings
- imply certainty beyond the intelligence layer
- treat speculation as demonstrated fact

Preserve the existing template-driven narrative architecture.

**Classification:** PRESERVE + TESTING

---

# 26. API / Downstream Contract

Any terminology or field change must account for its full blast radius.

Potential consumers include:

- backend models
- calculation layers
- API response models
- serialization
- frontend consumers
- `charts.js`
- narrative consumers
- tests
- fixtures
- future Profile UI

Pay particular attention to fields such as:

```text
confidence
designationConfidence
score
breakdown
top_traits
evidence
recommendation_bias
```

No terminology change is complete merely because the backend field has been renamed.

---

# 27. Phase 1 Gates

The following decisions remain unresolved and must not silently become implementation assumptions:

- final Identity shortlist
- per-Identity signal definitions
- Secondary Identity thresholds
- tie / near-tie policy
- Finding purpose statements for ELEVATE candidates
- Finding evidence model where needed
- Finding confidence semantics
- new Observation shortlist
- archive-state operational thresholds
- per-field API/frontend rename plan
- precise Identity eligibility/ranking/presentation semantics

Machinery-only work may proceed where it does not depend on one of these unresolved decisions.

---

# 28. Recommended Phase 1 Work Order

## 1. Reconcile terminology

**Allowed:** Yes, subject to field-level mapping.

Correct misleading confidence terminology without changing valid underlying calculations.

---

## 2. Audit Identity eligibility semantics

**Allowed:** Yes.

Determine the exact relationship between:

```text
minimum_entries
↓
Data Sufficiency
↓
score
↓
ranking
↓
presentation
↓
primary selection
```

Do not change behavior until the intended boundary is confirmed.

---

## 3. Preserve and test recovered behavioral contracts

Protect:

- normalization differences
- derived-trait behavior
- deterministic ranking
- evidence structures
- empty-profile behavior
- recommendation-bias metadata
- primary selection behavior

---

## 4. Finding boundary work

**Allowed:** Yes.

Preserve `concept-driven`.

Document the treatment of:

- `engagement-priority`
- `systems-preference` — RESOLVED / REMOVED
- `speculative-interest`
- `atmospheric-interest`

Do not mass-delete Findings.

---

## 5. Investigate likely duplicate Observation/Finding rules

Prioritize:

- `systems-affinity` ↔ `systems-preference` — RESOLVED / CONSOLIDATED
- `atmospheric-focus` ↔ `atmospheric-interest`

Determine whether each Finding contributes genuine interpretive meaning.

---

## 6. Identity catalog evolution

**Blocked until Identity shortlist and signal definitions are LOCKED.**

Machinery-only preparation may proceed.

Do not invent final fixture semantics prematurely.

---

## 7. Secondary Identity policy

**Blocked until score distributions are inspected.**

Define meaningfulness and thresholds only after accepted Identity semantics exist.

---

## 8. Tie / close-competitor policy

**Blocked until policy is written and LOCKED.**

Do not invent near-tie thresholds during implementation.

---

## 9. Observation changes

**Blocked until the Phase 1 Observation shortlist is LOCKED.**

Existing Observation machinery remains protected.

---

## 10. Archive-state implementation

**Blocked until operational thresholds are LOCKED.**

Do not add state-dependent branching based on undefined thresholds.

---

## 11. Regression

Run the full suite after every intentional behavior change.

Current baseline:

> **210 tests passing**

Final Phase 1 expectation:

> **All existing baseline behavior remains green except for explicitly approved changes, with regression coverage for every intentional behavioral change.**

---

# 29. Phase 1 Success Criteria

Phase 1 is successful when:

1. Existing intelligence machinery remains intact unless a specific contract conflict requires change.
2. Confidence terminology no longer conflates fundamentally different concepts.
3. Identity and Designation have distinct conceptual responsibilities.
4. Identity eligibility/ranking/presentation semantics are explicitly defined before behavior is changed.
5. Findings have a defensible boundary from Observations and Genre Signals.
6. Existing Findings have explicit PRESERVE / CLARIFY / DEFER treatment.
7. Likely duplicate Observation/Finding rules have been investigated rather than blindly deleted.
8. The Identity catalog is moving toward durable curator-philosophy concepts rather than user-specific personality labels.
9. Archive evidence informs prioritization without becoming Zach-specific hard-coded logic.
10. No new intelligence behavior depends on an unresolved conceptual decision.
11. Every intentional behavioral change has regression coverage.
12. The full **210-test baseline** remains green except for explicitly approved changes.
13. No unrelated rewrite or redesign has entered Phase 1.

---

# 30. One-Sentence Phase 1 North Star

> **Align the existing deterministic intelligence machinery so Observations demonstrate patterns, Findings interpret conclusions, Designations classify taste, and Identities describe curator philosophy—while preserving recovered behavioral memory and changing only behavior that demonstrably conflicts with the locked conceptual model.**
