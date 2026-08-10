# Media Tracker — Phase 1 Intelligence Alignment

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Related documents:**

* `Intelligence Contract v1.md`
* `roadmap.md`

**Phase:** Phase 1 — Intelligence Alignment
**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

Phase 1 exists to bring the existing intelligence implementation into alignment with the conceptual boundaries established in **Intelligence Contract v1**.

This phase is **not** a redesign of the intelligence architecture.

The existing systems are substantially functional and should be preserved wherever they already satisfy the contract.

The goal is to:

* resolve direct contradictions
* clarify ambiguous behavior
* correct misleading terminology
* strengthen distinctions between intelligence layers
* preserve useful existing infrastructure
* add targeted tests around changed behavior
* avoid unnecessary rewrites

The central rule is:

> **Change the minimum amount of implementation necessary to make the existing system conform to the locked conceptual model.**

---

# 2. Current Baseline

The current `develop-3` branch contains a substantially developed intelligence layer.

Existing functionality includes:

* Traits
* Genre Signals
* Observations
* Findings
* Designations
* Identities
* Identity contribution breakdowns
* Narrative generation
* Archive Profile data
* Recommendation infrastructure
* Existing evidence mechanisms
* Existing ranking behavior

The project currently has a baseline of:

> **199 passing tests**

This baseline must be treated as a protected reference point.

A Phase 1 change is not successful merely because the new behavior works.

It must also preserve unrelated existing behavior.

---

# 3. Phase 1 Scope

Phase 1 covers:

1. Confidence terminology and semantics
2. Designation alignment
3. Identity/Designation separation
4. Identity cardinality and ranking
5. Secondary Identity selection
6. Findings vs Observations
7. Finding evidence
8. Archive data sufficiency
9. Tie and close-competitor behavior
10. Empty/sparse/established archive behavior
11. Targeted regression testing

---

# 4. Explicit Non-Goals

Phase 1 does **not** include:

* rewriting the scoring system
* rewriting scoring rubrics
* replacing the Observation architecture
* replacing fixture-driven Designations
* replacing fixture-driven Identities
* redesigning the Recommendation Engine
* building the final Profile UI
* pagination
* import/export
* metadata integrations
* React migration
* machine-learning recommendations
* replacing deterministic rules with opaque AI
* creating large numbers of new Designations or Identities merely for variety

These remain future work unless a specific Phase 1 alignment issue makes a minimal change necessary.

---

# 5. Implementation Rules

## 5.1 Preserve Working Behavior

If existing behavior does not conflict with the contract, preserve it.

Do not rewrite code merely because a cleaner implementation is possible.

---

## 5.2 Prefer Terminology Changes Before Algorithm Changes

If existing behavior is conceptually correct but mislabeled, correct the terminology before changing the calculation.

Example:

```text
Existing:
designation confidence = average top trait scores

If that value actually represents signal strength:

Do:
rename/reframe the value

Do not:
invent a new classification-confidence algorithm merely to
make the current property name technically correct
```

---

## 5.3 Prefer Targeted Rule Changes

When a rule violates the contract:

* identify the smallest responsible rule
* modify that rule
* preserve surrounding infrastructure
* add regression tests

---

## 5.4 Preserve Evidence Infrastructure

The Observation evidence model is currently one of the strongest parts of the intelligence layer.

Do not weaken or replace it.

Other systems may use different evidence representations.

The contract requires **explainability**, not universal evidence schemas.

---

## 5.5 Tests Are Part of the Alignment

Every conceptual correction should have corresponding tests.

The test suite is not merely verification after implementation.

It is part of the contract enforcement mechanism.

---

# 6. Alignment Area 1 — Confidence Terminology

## Problem

The current implementation uses the word **confidence** for values that do not necessarily represent confidence.

Known examples include:

### Designations

Current designation confidence is derived primarily from the strength of the highest contributing traits.

### Identities

Current identity confidence is primarily derived from:

```text
entryCount / minimum_entries
```

These values have different meanings from Classification Confidence.

---

## Contract Requirement

The intelligence layer distinguishes:

### Signal Strength

How strongly a quality or signal is expressed.

### Data Sufficiency

Whether enough archive data exists to reasonably evaluate a conclusion.

### Classification Confidence

How clearly one classification outranks plausible alternatives.

### Evidence Strength

How strongly the available evidence supports the conclusion.

---

## Required Alignment

Audit every use of `confidence` in:

* Observations
* Findings
* Designations
* Identities
* Profile responses
* Narrative
* tests
* frontend consumers

For each use, determine what the value actually represents.

Then:

* rename misleading concepts where practical
* preserve calculations that are already semantically valid
* introduce distinct fields only where genuinely necessary

---

## Designation

If the current designation confidence is essentially a measure of contributing trait strength:

> Treat it as **Signal Strength**, not Classification Confidence.

A future Classification Confidence may be added separately.

Do not create a fake Classification Confidence metric simply to satisfy terminology.

---

## Identity

If the current identity confidence primarily reflects:

```text
entryCount / minimum_entries
```

then it should be treated as:

> **Data Sufficiency**

It should not be presented as a probability that the identity is correct.

---

## Acceptance Criteria

* [ ] Every intelligence-layer confidence value has a defined semantic meaning.
* [ ] Signal Strength is not described as confidence.
* [ ] Entry-count sufficiency is not described as Classification Confidence.
* [ ] Existing valid calculations are preserved where possible.
* [ ] Tests cover the revised terminology/semantics.

---

# 7. Alignment Area 2 — Designation / Identity Separation

## Problem

Current Identity fixtures use names/titles that overlap with existing Designations.

Known examples include:

```text
boundary_explorer
deep_diver
engagement_architect
```

This creates a direct conflict with the contract.

The contract requires Designations and Identities to answer different questions.

---

## Contract Requirement

### Designation

> What recognizable taste classification fits?

### Identity

> What kind of curator does the archive describe?

A Designation and Identity may be related.

They must not be redundant.

---

## Required Alignment

Audit all existing Identity fixtures against Designation fixtures.

For each Identity:

1. identify its conceptual purpose
2. identify its closest Designation equivalent
3. determine whether it describes:

   * a taste classification
   * a curator philosophy
   * a measurable trait cluster
   * or simply a renamed Designation
4. preserve the fixture architecture
5. revise the conceptual vocabulary where necessary

---

## Important Constraint

This does **not** mean that every Identity fixture must be deleted and replaced immediately.

The implementation should evolve toward compliant identities while minimizing disruption.

However, an Identity that is conceptually nothing more than a Designation should not remain the intended final state.

---

## Target Direction

Example:

```text
Designation:
The Boundary Explorer

Identity:
Systems-Seeking Interpretive Curator
```

The two may share supporting signals while answering different questions.

---

## Acceptance Criteria

* [ ] No intended Identity is simply a duplicate of a Designation.
* [ ] Identity names may diverge from Designation names.
* [ ] Identity fixtures remain deterministic and explainable.
* [ ] Existing contribution-breakdown infrastructure remains functional.
* [ ] Tests explicitly protect Designation/Identity conceptual separation.

---

# 8. Alignment Area 3 — Designation Semantics

## Current State

Designations are substantially aligned with the contract.

Current architecture already supports:

* multiple designation results
* ranking
* primary designation
* fixture/rule-driven definitions
* recommendation bias

---

## Required Preservation

Preserve:

```text
MANY internally
ONE PRIMARY on Profile
```

---

## Required Audit

For every existing Designation:

* [ ] Confirm it represents a recognizable classification.
* [ ] Confirm it is sufficiently distinct from other Designations.
* [ ] Confirm its evaluation logic is understandable.
* [ ] Confirm associated traits are meaningful.
* [ ] Confirm associated genres are meaningful.
* [ ] Confirm recommendation bias represents actual recommendation tendencies.
* [ ] Identify misleading uses of "confidence."

---

## Evidence

Where useful, Designations should expose lightweight supporting information.

Example:

```text
The Boundary Explorer

Signal Strength: 91

Supported by:

Originality        8.8
Depth              8.4
Experimental       strong
Surreal            strong
```

This does not need to become a second Observation evidence system.

---

## Acceptance Criteria

* [ ] Existing Designations remain functional.
* [ ] Designation ranking remains functional.
* [ ] Primary designation behavior remains functional.
* [ ] Designation rules remain explainable.
* [ ] Misleading confidence terminology is addressed.
* [ ] Existing recommendation bias is preserved.

---

# 9. Alignment Area 4 — Findings vs Observations

## Problem

Current Findings are functional but some appear too close to Observations.

Known overlap includes:

* similar thresholds
* similar inputs
* similar wording
* similar purposes

This creates a risk that Findings become:

> Observations with more impressive names.

---

## Contract Requirement

### Observation

> What recurring pattern can we directly demonstrate?

### Finding

> What does the available evidence suggest?

A Finding must provide additional interpretation.

---

## Required Audit

Audit every existing Finding rule.

For each Finding, document:

```text
Finding ID
Current purpose
Current inputs
Current threshold/rule
Closest Observation
Interpretive step
Evidence
Current confidence semantics
Required change
```

---

## Classification Test

For each Finding ask:

> If the Finding were removed and its text were replaced with the underlying Observation, would any meaningful information be lost?

If **no**, it is probably functioning as an Observation.

If **yes**, document the additional interpretive meaning.

---

## Target Architecture

Prefer:

```text
Traits / Genre Signals
        ↓
Observations
        ↓
Findings
```

but do not make this a mandatory runtime dependency.

A Finding may use shared archive data directly where appropriate.

The distinction is conceptual, not necessarily a strict function-call hierarchy.

---

## Synthesis

Findings should be capable of synthesizing multiple signals.

Preferred example:

```text
Observation A
Boundary Preference

Observation B
Experimental Genre Affinity

Observation C
High Originality

        ↓

Finding

The archive demonstrates a strong preference
for experiences that challenge conventional
genre boundaries.
```

A Finding does not absolutely require multiple Observations.

However, a Finding that uses only one low-level signal must demonstrate why it provides an additional interpretive layer.

---

## Acceptance Criteria

* [ ] Every Finding has a documented interpretive purpose.
* [ ] Findings are not simple Observation duplicates.
* [ ] Existing useful Findings are preserved where possible.
* [ ] Findings can incorporate multiple signals where appropriate.
* [ ] Finding evidence is explainable.
* [ ] Finding confidence has defined semantics.
* [ ] Tests cover the interpretive distinction.

---

# 10. Alignment Area 5 — Finding Evidence

## Problem

Observations already have a relatively strong evidence architecture.

Findings do not yet consistently provide comparable structured support.

---

## Contract Requirement

Findings should eventually expose supporting evidence.

The evidence schema does **not** need to match Observation evidence exactly.

---

## Required Alignment

For each Finding, identify the underlying support.

Potential evidence sources:

* Observations
* Traits
* Genre Signals
* quantitative metrics
* other explicitly defined archive signals

---

## Target Representation

A Finding should be able to answer:

> Why does the system think this?

without requiring the user to inspect implementation code.

---

## Acceptance Criteria

* [ ] Findings have explainable support.
* [ ] Evidence can identify relevant underlying signals.
* [ ] Evidence does not rely on opaque prose alone.
* [ ] Observation evidence architecture remains unchanged unless necessary.
* [ ] Tests verify Finding evidence.

---

# 11. Alignment Area 6 — Identity Ranking

## Current State

The Identity subsystem already supports:

* multiple identity candidates
* ranking
* primary identity
* contribution breakdown

This infrastructure should be preserved.

---

## Contract Requirement

Internally:

```text
MANY identities
```

Profile presentation:

```text
ONE PRIMARY
ZERO OR MORE meaningful SECONDARIES
```

---

## Required Alignment

Define what the ranked list means.

Identity ranking should answer:

> How strongly does this archive fit this curator philosophy?

It should not imply:

> This is objectively the user's one true personality.

---

## Acceptance Criteria

* [ ] Multiple identities remain available internally.
* [ ] Primary identity is deterministic.
* [ ] Ranking remains explainable.
* [ ] Ranking is independent of Designation naming.
* [ ] Contribution breakdown remains available.

---

# 12. Alignment Area 7 — Meaningful Secondary Identities

## Problem

The contract explicitly allows:

> zero or more meaningful secondary identities

but does not yet define "meaningful."

The implementation currently has no finalized secondary-selection rule.

---

## Phase 1 Decision

A secondary Identity should not be displayed merely because it ranked above zero.

The selection rule should consider:

1. minimum data sufficiency
2. minimum identity score/signal
3. relationship to the primary identity
4. meaningful separation from irrelevant low-ranking identities

---

## Proposed Initial Rule

The first implementation should prefer a **threshold + relative relevance** approach rather than an arbitrary fixed count.

Conceptually:

```text
Candidate Identity
        │
        ├── sufficient data?
        │       ↓ no → do not surface
        │
        ├── meaningful score?
        │       ↓ no → do not surface
        │
        ├── sufficiently relevant?
        │       ↓ no → do not surface
        │
        ↓
Meaningful Secondary
```

Exact numeric thresholds should be established during implementation after inspecting the existing score distribution.

Do not invent thresholds solely to satisfy the contract.

---

## Acceptance Criteria

* [ ] Secondary identities have a defined selection rule.
* [ ] Low-scoring identities are not automatically surfaced.
* [ ] Primary identity is not duplicated as secondary.
* [ ] Secondary identities remain explainable.
* [ ] Tests cover zero, one, and multiple meaningful secondary identities.

---

# 13. Alignment Area 8 — Ties and Close Competitors

## Problem

The contract specifies primary Designations and Identities but does not fully define ties or near-ties.

---

## Required Behavior

Primary selection must be deterministic.

If two candidates are effectively tied, the system should not produce unstable results based on incidental ordering.

---

## Phase 1 Requirement

Audit current ranking behavior and determine:

* tie-breaking order
* score precision
* stable fixture ordering
* close-competitor presentation

---

## Principle

A close competitor should remain distinguishable from a genuinely weak alternative.

Example:

```text
Boundary Explorer      91
Systems Analyst        90
Deep Diver              62
```

The first two are close competitors.

The third is not.

---

## Acceptance Criteria

* [ ] Ranking is deterministic.
* [ ] Exact ties are deterministic.
* [ ] Close competitors can be identified.
* [ ] Weak alternatives are not presented as meaningful competitors.
* [ ] Tests cover ties and near-ties.

---

# 14. Alignment Area 9 — Empty / Sparse / Established Archives

## Problem

The contract defines three conceptual archive states but does not yet establish operational thresholds.

---

## Definitions

### Empty

Insufficient records to produce meaningful intelligence.

### Sparse

Some intelligence can be calculated, but conclusions have limited data sufficiency.

### Established

Enough archive data exists for meaningful interpretation.

---

## Required Alignment

Determine which subsystems require minimum data and how they behave below those thresholds.

Do not force every subsystem to use the same minimum.

For example:

* Traits may be calculable with relatively little data.
* Identity may require more data.
* Certain Observations may require specific metrics.
* Certain Designations may require specific genre coverage.

---

## Principle

Missing data should produce:

> insufficient evidence

not:

> false certainty.

---

## Acceptance Criteria

* [ ] Empty archive behavior is defined.
* [ ] Sparse archive behavior is defined.
* [ ] Established archive behavior is defined.
* [ ] Data sufficiency is explicit where appropriate.
* [ ] No subsystem fabricates certainty from insufficient data.
* [ ] Tests cover empty and sparse archives.

---

# 15. Alignment Area 10 — Recommendation Bias

## Problem

Both Designations and Identity fixtures currently contain recommendation-related fields.

The contract allows recommendation bias at multiple intelligence layers but does not make ownership completely explicit.

---

## Contract Interpretation

Recommendation Bias is an **optional recommendation-oriented description of what a classification tends to favor**.

It is not itself the final recommendation score.

---

## Phase 1 Rule

Where Designation and Identity both expose recommendation-oriented information:

* Designation bias may directly describe classification-specific recommendation tendencies.
* Identity may identify underlying curator preferences.
* The Recommendation Engine should ultimately consume measurable signals rather than treating either label as an opaque score.

---

## Acceptance Criteria

* [ ] Existing recommendation bias is preserved where useful.
* [ ] Bias is not treated as a final recommendation score.
* [ ] Identity labels are not used as direct numeric recommendation inputs.
* [ ] No recommendation architecture is rebuilt during Phase 1.

---

# 16. Alignment Area 11 — Soft Recommendation Signals

## Problem

The contract permits:

* soft Observation signals
* soft Finding signals

but does not define exactly how "soft" they are.

---

## Phase 1 Rule

Do not implement recommendation weighting during Phase 1.

Instead, document the intended semantic distinction:

### Hard / measurable signals

Examples:

* trait strength
* genre affinity
* scoring preferences

### Soft signals

Interpretive evidence that may inform recommendations but should not override stronger measurable evidence.

Examples:

```text
Observation:
Strong preference for unusual concepts.

Finding:
Archive tends to favor genre-boundary experimentation.
```

These may eventually influence recommendations, but their exact weighting belongs to Phase 3.

---

## Acceptance Criteria

* [ ] Soft signals are recognized conceptually.
* [ ] Phase 1 does not invent recommendation weights.
* [ ] Recommendation Engine remains a future consumer of these signals.

---

# 17. Alignment Area 12 — Narrative Boundaries

## Problem

Narrative already interprets intelligence-layer outputs.

The contract requires that Narrative not invent unsupported conclusions.

The boundary between synthesis and invention must therefore remain clear.

---

## Rule

Narrative may:

* combine established signals
* translate analytical terminology into human language
* summarize Findings
* contextualize Designations
* explain Identity
* connect related conclusions

Narrative may not:

* invent unsupported traits
* invent evidence
* create new classifications
* imply certainty beyond the intelligence layer
* treat speculation as demonstrated fact

---

## Acceptance Criteria

* [ ] Narrative remains template-driven where practical.
* [ ] Narrative consumes established intelligence.
* [ ] Narrative does not create new intelligence.
* [ ] Existing useful narrative behavior is preserved.

---

# 18. Files / Components to Audit

Before modifying implementation, inspect the current architecture and map each contract discrepancy to its responsible file/module.

Expected areas include:

```text
models/
├── services/
├── designations/
├── identity/
├── observations/
├── findings/
├── traits/
├── genre intelligence
└── recommendations/
```

Also inspect:

```text
tests/
```

and relevant API response models.

The exact file list should be established from the actual `develop-3` tree rather than guessed from this document.

---

# 19. Change Classification

Every proposed Phase 1 change should be classified as one of:

### TERMINOLOGY

Correct misleading terminology without changing behavior.

### ALIGNMENT

Change existing behavior because it directly contradicts the contract.

### CLARIFICATION

Add explicit behavior where the contract was previously ambiguous.

### EVIDENCE

Improve explanation/support without changing the underlying classification concept.

### TESTING

Add regression coverage for an existing or newly locked rule.

### DEFERRED

Recognized issue that belongs to a later phase.

This prevents Phase 1 from silently becoming a general refactor.

---

# 20. Protected Existing Infrastructure

The following should be treated as protected unless a direct contract conflict is demonstrated:

### Scoring

* Universal scoring
* Media-specific scoring
* Scoring profiles
* Scoring rubrics

### Archive

* Entry model
* Archive mapping
* Existing CRUD
* Genre handling

### Observation Evidence

* Structured evidence
* Metric evidence
* Genre evidence
* Existing observation explanation mechanisms

### Identity

* Fixture-driven architecture
* Weighted scoring
* Contribution breakdown
* Ranked candidates
* Primary identity infrastructure

### Designations

* Fixture/rule-driven architecture
* Ranking
* Primary designation
* Recommendation bias

### Narrative

* Existing template-driven architecture

---

# 21. Regression Strategy

The current baseline is:

> **199 tests passing**

After each meaningful alignment change:

1. Run the full test suite.
2. Confirm unrelated behavior remains unchanged.
3. Add targeted tests for the conceptual rule being modified.
4. Only then proceed to the next alignment area.

---

## Required Regression Categories

### Observations

* [ ] Existing rules
* [ ] Evidence
* [ ] Confidence semantics
* [ ] Multiple observations
* [ ] Empty/sparse data

### Findings

* [ ] Existing rules
* [ ] Interpretive distinction
* [ ] Evidence
* [ ] Confidence semantics
* [ ] Multiple findings

### Designations

* [ ] Rule behavior
* [ ] Ranking
* [ ] Primary selection
* [ ] Evidence
* [ ] Recommendation bias
* [ ] Tie behavior

### Identities

* [ ] Fixture loading
* [ ] Ranking
* [ ] Primary selection
* [ ] Secondary selection
* [ ] Data sufficiency
* [ ] Contribution breakdown
* [ ] Designation/Identity separation
* [ ] Tie behavior

---

# 22. Phase 1 Work Order

The recommended implementation order is:

## Step 1 — Repository Audit

* [ ] Inspect current `develop-3` tree.
* [ ] Locate all intelligence modules.
* [ ] Locate all intelligence response models.
* [ ] Locate all related tests.
* [ ] Map current implementation to this document.

**Deliverable:** implementation map.

---

## Step 2 — Confidence Terminology

* [ ] Audit current confidence fields.
* [ ] Identify actual semantic meaning.
* [ ] Rename/reframe misleading values.
* [ ] Preserve valid calculations.
* [ ] Add terminology tests.

**Deliverable:** consistent quantitative vocabulary.

---

## Step 3 — Designation Audit

* [ ] Audit each Designation.
* [ ] Confirm classification purpose.
* [ ] Confirm distinctness.
* [ ] Preserve ranking.
* [ ] Preserve primary selection.
* [ ] Improve explanation where necessary.

**Deliverable:** contract-aligned Designations.

---

## Step 4 — Identity Audit

* [ ] Audit every Identity fixture.
* [ ] Compare against Designation vocabulary.
* [ ] Identify redundant identities.
* [ ] Define curator-philosophy purpose.
* [ ] Preserve fixture-driven architecture.
* [ ] Preserve contribution breakdown.

**Deliverable:** conceptually distinct Identity system.

---

## Step 5 — Identity Cardinality

* [ ] Lock primary Identity behavior.
* [ ] Define meaningful secondary behavior.
* [ ] Define minimum data requirements.
* [ ] Define tie/close-competitor behavior.
* [ ] Add tests.

**Deliverable:** deterministic Identity presentation model.

---

## Step 6 — Findings Audit

* [ ] Audit every Finding.
* [ ] Compare each with Observations.
* [ ] Identify redundant rules.
* [ ] Preserve useful Findings.
* [ ] Elevate interpretive meaning where necessary.
* [ ] Add evidence.
* [ ] Add tests.

**Deliverable:** clear Observation → Finding conceptual boundary.

---

## Step 7 — Archive State Behavior

* [ ] Define empty behavior.
* [ ] Define sparse behavior.
* [ ] Define established behavior.
* [ ] Apply data sufficiency semantics.
* [ ] Add tests.

**Deliverable:** graceful intelligence behavior at all archive sizes.

---

## Step 8 — Final Terminology Audit

Search the intelligence layer for:

```text
confidence
strength
sufficiency
classification
evidence
recommendation
identity
designation
observation
finding
```

Confirm that terminology matches the contract.

---

## Step 9 — Full Regression

* [ ] Run all tests.
* [ ] Confirm 199-test baseline plus intentional new tests.
* [ ] Review failures individually.
* [ ] Verify no unrelated subsystem was accidentally changed.

---

# 23. Definition of Done

Phase 1 is complete when:

* [ ] Existing intelligence systems remain functional.
* [ ] No major conceptual contradiction with `Intelligence Contract v1` remains.
* [ ] Observation and Finding roles are clearly distinct.
* [ ] Designation and Identity roles are clearly distinct.
* [ ] Identity fixtures no longer represent the intended final state as Designation clones.
* [ ] Signal Strength is distinguished from confidence.
* [ ] Data Sufficiency is distinguished from Classification Confidence.
* [ ] Evidence Strength has a defined meaning.
* [ ] Designation ranking remains deterministic.
* [ ] Identity ranking remains deterministic.
* [ ] Primary Designation behavior is preserved.
* [ ] Primary Identity behavior is preserved.
* [ ] Secondary Identity selection has a defined rule.
* [ ] Tie/close-competitor behavior is defined.
* [ ] Empty/sparse/established archive behavior is defined.
* [ ] Findings have meaningful interpretive roles.
* [ ] Findings have explainable supporting evidence.
* [ ] Existing Observation evidence remains intact.
* [ ] Narrative remains downstream of established intelligence.
* [ ] Recommendation Engine remains measurable-signal driven.
* [ ] No unnecessary architecture rewrite occurred.
* [ ] Regression tests cover every changed conceptual rule.
* [ ] Full test suite passes.

---

# 24. Phase 1 Exit State

At the end of Phase 1, the system should conceptually be:

```text
RAW ARCHIVE
     ↓
TRAITS + GENRE SIGNALS
     │
     ├───────────────┐
     ↓               ↓
OBSERVATIONS      OTHER SHARED SIGNALS
     ↓               │
     └───────┬───────┘
             ↓
          FINDINGS
             
     ┌──────────────────────┐
     │                      │
     ↓                      ↓
DESIGNATIONS            IDENTITIES
     │                      │
     │                 Primary + meaningful
     │                   secondaries
     │
     └──────────┬───────────┘
                ↓
          ARCHIVE PROFILE
                ↓
      RECOMMENDATION SIGNALS
                ↓
      RECOMMENDATION ENGINE
```

The important conceptual distinctions are:

```text
OBSERVATION
What can we directly demonstrate?

FINDING
What does the evidence suggest?

DESIGNATION
What recognizable taste classification fits?

IDENTITY
What kind of curator does the archive describe?
```

And:

```text
SIGNAL STRENGTH
How strongly is it expressed?

DATA SUFFICIENCY
Do we have enough data?

CLASSIFICATION CONFIDENCE
How clearly does one classification win?

EVIDENCE STRENGTH
How strongly is the conclusion supported?
```

---

# 25. Guiding Principle

Phase 1 should leave the project **more coherent without making it fundamentally different**.

The goal is not to build the final intelligence system.

The goal is to make the system we already have faithfully represent the intelligence model we have now decided it is supposed to represent.

> **Evolution, not rewrite.**
