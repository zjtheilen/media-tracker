# Media Tracker — Phase 1 Intelligence Alignment

**Project:** Media Tracker  
**Authoritative branch:** `develop-3`  
**Related documents:**

- `intelligence-contract.md`
- `phase-1-decision-and-implementation-map.md`
- `roadmap.md`
- `forgotten-features-register.md`

**Phase:** Phase 1 — Intelligence Alignment  
**Status:** Audit complete; implementation alignment pending  
**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

Phase 1 exists to bring the existing intelligence implementation into alignment with the conceptual boundaries established in `intelligence-contract.md`.

This is **not** a redesign of the intelligence architecture.

The repository has already been audited sufficiently to identify the major behavioral contracts, terminology conflicts, and implementation contradictions that matter for Phase 1.

The goal is now to:

- preserve behavior that is compatible with the contract
- change behavior that directly contradicts locked concepts
- clarify behavior where the contract is intentionally incomplete
- correct misleading terminology before changing valid calculations
- preserve existing explanation and evidence infrastructure
- protect recovered behavioral contracts with regression tests
- defer genuinely future concerns
- avoid unnecessary rewrites

The central rule remains:

> **Change the minimum amount of implementation necessary to make the existing system conform to the locked conceptual model.**

---

# 2. Current Baseline

The `develop-3` branch contains a substantially developed intelligence layer.

The repository currently contains dedicated services for:

- Traits
- Genre Signals
- Observations
- Findings
- Designations
- Identities
- Identity-derived traits
- Identity explanations
- Evidence
- Archive/Profile assembly
- Narrative
- Recommendation infrastructure

The current service tree includes, among others:

```text
models/services/
archive_classification.py
archive_engine.py
archive_interpretation.py
archive_mapper.py
archive_narrative.py
archive_statistics.py
archive_utils.py
derived_traits.py
designation_engine.py
designation_mapper.py
designation_rules.py
designation_utils.py
evidence_utils.py
finding_engine.py
finding_rules.py
finding_utils.py
genre_intelligence.py
genre_signal_utils.py
genre_signals.py
identity_confidence.py
identity_derived_traits.py
identity_engine.py
identity_explainer.py
identity_finding.py
identity_scorer.py
identity_scoring.py
identity_utils.py
interpretation_engine.py
interpretation_rules.py
observation_engine.py
observation_mapper.py
observation_rules.py
observation_utils.py
profile_metrics.py
scoring_rubric.py
scoring_utils.py
trait_calculator.py
```

The existing test suite contains dedicated intelligence-related test areas under:

```text
tests/services/
tests/designations/
tests/recommendations/
tests/archive/
```

The previously established baseline was approximately:

> **199 passing tests**

This baseline is a protected reference point for Phase 1.

A Phase 1 change is not successful merely because the new behavior works.

It must also preserve unrelated existing behavior.

---

# 3. Phase 1 Status

The repository audit has established the following:

| Area                             | Status                                                   |
| -------------------------------- | -------------------------------------------------------- |
| Repository inventory             | Complete                                                 |
| Intelligence service inventory   | Complete                                                 |
| Existing behavioral contracts    | Recovered                                                |
| Identity scoring audit           | Complete                                                 |
| Designation audit                | Complete                                                 |
| Observation audit                | Complete                                                 |
| Finding audit                    | Complete                                                 |
| Evidence audit                   | Complete                                                 |
| Confidence terminology audit     | Complete                                                 |
| Archive-state audit              | Conceptually complete; operational thresholds unresolved |
| Ranking/tie audit                | Conceptually identified; final policy unresolved         |
| API/frontend blast-radius audit  | Identified; per-field rename plan still required         |
| Phase 1 implementation alignment | Pending                                                  |

The implementation should now proceed from the decisions captured in:

`phase-1-decision-and-implementation-map.md`

That document is the implementation decision authority for Phase 1.

---

# 4. Explicit Non-Goals

Phase 1 does not include:

- rewriting the scoring system
- rewriting scoring rubrics
- replacing the Observation architecture
- replacing fixture-driven Designations
- replacing fixture-driven Identities
- redesigning the Recommendation Engine
- building the final Profile UI
- pagination
- import/export
- metadata integrations
- React migration
- machine-learning recommendations
- replacing deterministic rules with opaque AI
- creating large numbers of new Designations or Identities merely for variety

These remain future work unless a specific Phase 1 alignment issue requires a minimal compatibility change.

---

# 5. Implementation Rules

## 5.1 Preserve Working Behavior

If existing behavior does not conflict with the contract, preserve it.

Do not rewrite code merely because a cleaner implementation is possible.

---

## 5.2 Prefer Terminology Changes Before Algorithm Changes

If existing behavior is conceptually valid but mislabeled, correct the terminology before changing the calculation.

For example:

```text
Existing designation "confidence"
↓
actually represents trait-derived signal strength
↓
rename/reframe the concept
```

Do not invent a new classification-confidence algorithm merely because an existing property is called `confidence`.

---

## 5.3 Prefer Targeted Rule Changes

When behavior violates the contract:

1. identify the smallest responsible rule
2. change that rule
3. preserve surrounding infrastructure
4. update affected API/serialization consumers
5. add regression tests

---

## 5.4 Preserve Evidence Infrastructure

The Observation evidence model is one of the strongest existing parts of the intelligence layer.

Preserve:

- structured evidence
- metric evidence
- genre evidence
- observation explanation mechanisms

Do not force all other intelligence systems into the same evidence schema.

The contract requires explainability, not universal evidence objects.

---

## 5.5 Tests Are Part of the Alignment

Every conceptual correction must have corresponding tests.

The test suite is part of the behavioral contract.

Tests should protect meaningful domain behavior rather than merely implementation details.

---

# 6. Recovered Behavioral Contracts

The audit recovered several behaviors that are not fully specified in the original conceptual contract.

Unless a direct conflict is identified, these behaviors are protected during Phase 1.

## 6.1 Trait Signal Strength Normalization

Current Trait normalization uses a floor at `6` and reaches maximum strength at `10`.

```text
value <= 6 → 0
value = 10 → 1

strength = min(max((value - 6) / 4, 0), 1)
```

This is a meaningful semantic distinction from Identity normalization.

**Classification:** PRESERVE

---

## 6.2 Identity Score Normalization

Identity scoring currently resolves trait values using proportional 0–10 normalization.

```text
normalized_value = clamp(value / 10, 0, 1)
identity_contribution = normalized_value × fixture_weight
```

This does **not** apply the Trait Signal Strength floor.

These two normalization mechanisms have different semantics.

**Classification:** PRESERVE

**Important:** Do not unify them merely for implementation cleanliness.

---

## 6.3 Identity Trait Resolution Priority

Current Identity scoring resolves traits in this conceptual order:

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

# 7. Alignment Area 1 — Confidence Terminology

## Problem

The implementation uses `confidence` for several semantically different quantities.

The contract distinguishes:

| Term                      | Meaning                                                     |
| ------------------------- | ----------------------------------------------------------- |
| Signal Strength           | How strongly a quality/signal is expressed                  |
| Data Sufficiency          | Whether enough archive data exists                          |
| Classification Confidence | How clearly one classification beats plausible alternatives |
| Evidence Strength         | How strongly the evidence supports the conclusion           |

---

## Current Semantic Mappings

### Identity confidence

Current behavior is approximately:

```text
entryCount / minimum_entries
```

This represents **Data Sufficiency**, not Classification Confidence.

**Classification:** TERMINOLOGY

---

### Designation confidence

Current designation confidence is derived from trait strength.

It therefore behaves more like **Signal Strength** than Classification Confidence.

**Classification:** TERMINOLOGY

---

### Observation confidence

Current Observation confidence is threshold-relative support:

```text
observed_value / threshold
```

This is meaningful support-strength information, but it should not automatically be represented as generic Classification Confidence.

**Classification:** TERMINOLOGY / CLARIFICATION

---

### Finding confidence

Finding confidence is not yet standardized sufficiently to define a single semantic meaning.

**Classification:** CLARIFICATION

Do not invent a new formula merely to populate the field.

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

Current designation IDs include:

```text
boundary_explorer
curator
engagement_architect
deep_diver
```

The catalog itself should not be redesigned merely because Identity vocabulary is being repaired.

---

## Phase 1 Changes

### Preserve

- designation scoring
- designation ranking
- primary designation selection
- recommendation-bias metadata

### Align

- misleading confidence terminology

### Evidence

Where useful, add lightweight "why this designation?" explanation.

Potential evidence includes:

- strongest contributing traits
- relevant genre affinities
- classification score
- other directly relevant signals

Do not clone the full Observation evidence schema.

---

# 9. Alignment Area 3 — Designation vs Identity

This distinction is mandatory.

| Layer       | Question                                        |
| ----------- | ----------------------------------------------- |
| Designation | What named taste classification fits?           |
| Identity    | What kind of curator does the archive describe? |

The current repository contains overlapping names between Designations and Identity fixtures.

This is an implementation artifact.

It does not mean the two concepts should be merged.

---

## Locked Direction

Identity should evolve toward **curator philosophy / curator synthesis**.

Identity names should not simply duplicate Designation names.

Do not delete Identity scoring machinery merely because current fixtures overlap.

---

# 10. Alignment Area 4 — Identity Eligibility

## Recovered Behavior

Identity fixtures define `minimum_entries`.

Current implementation behavior uses this as a score gate:

- score becomes zero
- contribution breakdown becomes empty
- identity may remain in ranked results

That creates a conceptual problem because an ineligible identity can still become the selected primary identity if it remains in the ranking set.

---

## Locked Phase 1 Behavior

`minimum_entries` is an **eligibility gate**, not merely a score gate.

```text
entry_count < minimum_entries
↓
INELIGIBLE
↓
exclude from Identity ranking/presentation

entry_count >= minimum_entries
↓
ELIGIBLE
↓
score + rank + contribution breakdown
```

**Classification:** ALIGNMENT

This is one of the clearest direct implementation conflicts identified by the audit.

---

# 11. Alignment Area 5 — Primary Identity

Primary Identity remains:

```text
many eligible identities
↓
deterministic ranking
↓
one primary identity
```

Preserve the existing ranking machinery except for the eligibility correction.

Required tests:

- ineligible identities cannot become primary
- eligible identities are ranked deterministically
- primary selection remains explainable
- primary selection is independent of Designation naming

**Classification:** PRESERVE + ALIGNMENT + TESTING

---

# 12. Alignment Area 6 — Secondary Identities

The contract allows:

> zero or more meaningful Secondary Identities

But "meaningful" remains operationally unresolved.

Do not automatically surface every identity with a score greater than zero.

Selection should eventually consider:

1. Data Sufficiency
2. meaningful signal strength
3. relationship to the primary Identity
4. separation from weak candidates

Exact numeric thresholds remain:

> **UNRESOLVED — requires implementation decision.**

Do not invent thresholds simply to satisfy the cardinality requirement.

Required tests should eventually cover:

- zero secondary identities
- one meaningful secondary
- multiple meaningful secondaries
- weak identities remaining hidden
- primary identity not duplicated as secondary

---

# 13. Alignment Area 7 — Ties and Close Competitors

Current ranking uses deterministic sorting, but the conceptual policy for ties and near-ties is not fully defined.

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

Do not invent a near-tie threshold during implementation.

---

# 14. Alignment Area 8 — Findings vs Observations

## Locked Distinction

| Layer       | Question                          |
| ----------- | --------------------------------- |
| Observation | What can we directly demonstrate? |
| Finding     | What does the evidence suggest?   |

A Finding should provide additional meaning.

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

# 15. Alignment Area 9 — Finding Evidence

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

# 16. Alignment Area 10 — Recommendation Bias

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

# 17. Alignment Area 11 — Soft Recommendation Signals

The contract allows Observations and Findings to become soft recommendation signals.

Phase 1 should not implement their eventual weighting.

Hard/measurable signals include:

- Trait Strength
- Genre Affinity
- scoring preferences

Soft/interpretive signals may eventually include:

- Observations
- Findings

Their exact weighting belongs to Recommendation Engine work.

**Classification:** DEFERRED

---

# 18. Alignment Area 12 — Archive State

The intelligence layer must recognize:

- EMPTY
- SPARSE
- ESTABLISHED

However, operational thresholds are not yet fully locked.

The conceptual rule is:

> Insufficient data should produce insufficient evidence, not false certainty.

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

# 19. Partial Data

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

# 20. Narrative Boundaries

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

# 21. Evidence Architecture

The project does not require one universal evidence object.

Preferred evidence by layer:

| Layer         | Evidence approach                                      |
| ------------- | ------------------------------------------------------ |
| Traits        | Underlying metrics/scores                              |
| Genre Signals | Presence, affinity, combinations, related calculations |
| Observations  | Structured metric/genre evidence                       |
| Findings      | Structured supporting evidence                         |
| Designations  | Lightweight classification explanation                 |
| Identity      | Contribution breakdown + supporting traits/signals     |
| Narrative     | Human-readable synthesis of established evidence       |

The goal is explainability.

Do not unify schemas merely for architectural neatness.

---

# 22. Ranking and Determinism

Ranking behavior is part of the behavioral contract.

Preserve:

- Designation score-descending ranking
- Primary Designation as the highest-ranked eligible candidate
- Observation ranking by current support/confidence semantics
- Identity contribution ordering
- deterministic Identity selection

Where ranking semantics remain ambiguous, document the ambiguity before changing the implementation.

Do not silently introduce new tie-breaking behavior without a decision.

---

# 23. API / Frontend Compatibility

Terminology changes can have a large blast radius.

Potentially affected layers include:

- backend models
- calculation services
- API responses
- serialization
- frontend consumers
- `charts.js`
- future Profile UI
- narrative consumers
- fixtures
- tests

No field rename is complete merely because the backend field has been renamed.

Before changing a public or cross-layer field, create a per-field compatibility checklist.

---

# 24. Protected Existing Infrastructure

Unless a direct contract conflict is demonstrated, protect:

## Scoring

- Universal scoring
- Media-specific scoring
- scoring profiles
- scoring rubrics

## Archive

- Entry model
- Archive mapping
- CRUD
- Genre handling

## Traits

- existing calculations
- normalization
- derived-trait infrastructure

## Observations

- existing rules
- structured evidence
- metric evidence
- genre evidence
- mapping/explanation infrastructure

## Findings

- existing useful Findings
- current evidence where useful
- existing engine architecture

## Designations

- fixture/rule-driven architecture
- ranking
- primary selection
- recommendation bias

## Identity

- fixture-driven architecture
- weighted scoring
- derived traits
- ranking infrastructure
- contribution breakdown
- explanation infrastructure

## Narrative

- template-driven architecture

---

# 25. Test Inventory Requirements

The Phase 1 test inventory should explicitly protect:

## Traits

- normalization semantics
- derived traits
- universal/media-specific resolution
- empty behavior

## Observations

- existing rule behavior
- structured evidence
- threshold-relative support
- ranking
- multiple observations
- empty/sparse behavior

## Findings

- existing rule behavior
- Observation/Finding distinction
- evidence
- multiple Findings
- meaningful interpretation

## Designations

- rule behavior
- ranking
- primary selection
- recommendation bias
- explanation
- terminology semantics
- deterministic ordering

## Identities

- fixture loading
- trait resolution
- weighted scoring
- derived traits
- minimum-entry eligibility
- primary selection
- contribution breakdown
- designation/identity separation
- secondary identity behavior once defined
- data sufficiency
- deterministic ranking
- tie behavior once defined

## API / Frontend

Where terminology changes affect exposed fields:

- API response compatibility
- serialization
- frontend consumers
- tests using the old field names

---

# 26. Phase 1 Work Order

The audit phase is complete.

The implementation work order is now:

## Step 1 — Freeze the Behavioral Baseline

- run the existing full suite
- record the actual current test count
- preserve recovered behavioral contracts
- identify any baseline failures before making changes

Deliverable:

> Known-good behavioral baseline.

---

## Step 2 — Finalize Per-Field Terminology Map

For every affected field:

- current field
- current semantic meaning
- contract term
- affected producer
- affected API response
- affected frontend consumer
- affected tests
- compatibility strategy

Deliverable:

> Terminology / compatibility map.

---

## Step 3 — Identity Eligibility Alignment

Implement the locked minimum-entry eligibility behavior.

Do not redesign Identity scoring.

Do not redesign derived traits.

Do not finalize the new Identity catalog in the same change unless separately approved.

Deliverable:

> Ineligible Identities cannot participate in ranking or primary selection.

---

## Step 4 — Designation Terminology / Evidence

Preserve classification behavior.

Correct misleading confidence terminology.

Add lightweight explanation only where needed.

Deliverable:

> Designation semantics match the contract without unnecessary rule redesign.

---

## Step 5 — Findings Audit / Alignment

Review every Finding.

For each:

- identify its conceptual purpose
- identify its underlying evidence
- compare against Observations
- preserve useful behavior
- elevate interpretation where required
- identify duplicates

Deliverable:

> Findings have a defensible interpretive role.

---

## Step 6 — Secondary Identity Policy

Inspect Identity score distributions.

Then define:

- meaningfulness
- relevance
- separation
- optional thresholding
- presentation behavior

Do not invent thresholds before inspecting actual distributions.

Deliverable:

> Locked secondary Identity selection policy.

---

## Step 7 — Tie / Close-Competitor Policy

Define:

- exact ties
- stable ordering
- meaningful near-ties
- presentation of close competitors

Deliverable:

> Locked deterministic ranking policy.

---

## Step 8 — Archive-State Policy

Define operational behavior for:

- empty
- sparse
- established

Define subsystem-specific minimums where necessary.

Deliverable:

> Locked data-sufficiency behavior.

---

## Step 9 — Full Regression

After all meaningful changes:

- run the full test suite
- review every failure individually
- distinguish intentional changes from regressions
- confirm recovered behavior remains protected
- add targeted tests for newly locked semantics

Deliverable:

> Phase 1 implementation alignment complete.

---

# 27. Explicitly Deferred Items

The following should not be solved merely because they were discovered during the audit.

## Recommendation Engine

The existing recommendation engine remains future work.

Current implementation is infrastructure/stub territory and should not be rebuilt as part of Phase 1.

## Profile UI

Dedicated Profile UI belongs to the next user-facing phase.

## React

Do not migrate to React during Phase 1.

## Pagination

Future library-scale work.

## Import / Export

Future portability work.

## Metadata Expansion

Future enrichment work.

## Machine Learning

No opaque AI replacement for deterministic intelligence systems.

---

# 28. Phase 1 Exit Criteria

Phase 1 is complete when:

- [ ] terminology mappings are finalized
- [ ] valid calculations have been preserved
- [ ] Identity minimum-entry eligibility is corrected
- [ ] Designation semantics remain classification-oriented
- [ ] Identity semantics remain curator-oriented
- [ ] Findings are not merely Observation duplicates
- [ ] Finding evidence is sufficient
- [ ] Observation evidence remains intact
- [ ] secondary Identity policy is defined
- [ ] tie/near-tie policy is defined
- [ ] archive-state operational behavior is defined
- [ ] API/frontend field compatibility has been addressed
- [ ] recovered behavioral contracts have regression coverage
- [ ] full regression passes
- [ ] no unrelated subsystem has been rewritten
- [ ] no new recommendation algorithm has been invented
- [ ] no major unresolved conceptual contradiction remains

---

# 29. Final Phase 1 Principle

The purpose of Phase 1 is not to make the intelligence system look newer.

It is to make the existing system **mean what the contract says it means without losing behavior that was already useful**.

The correct sequence is:

```text
recover behavior
↓
classify behavior
↓
lock semantics
↓
change only contradictions
↓
protect behavior with tests
↓
defer everything else
```

> **Evolution, not rewrite.**
