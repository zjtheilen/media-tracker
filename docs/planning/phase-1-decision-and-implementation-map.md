# Media Tracker — Phase 1 Decision & Implementation Map

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Phase:** Phase 1 — Intelligence Alignment
**Status:** Reconciled post-forensic audit
**Related documents:**

* `intelligence-contract.md`
* `phase-1-intelligence-alignment.md`
* `intelligence-forensic-audit.md`
* `roadmap.md`
* `forgotten-features-register.md`

**Current regression baseline:** **210 passing tests**

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document translates the conceptual requirements of `intelligence-contract.md`, the reconciled Phase 1 alignment plan, and the forensic audit into explicit implementation decisions.

It answers:

> **What exactly have we decided to preserve, change, clarify, test, investigate, or defer before modifying the existing intelligence implementation?**

The documents have distinct responsibilities:

* **Intelligence Contract** defines what the intelligence system means.
* **Phase 1 Alignment** defines the overall alignment direction.
* **This document** defines specific implementation decisions, gates, and work order.
* **Forensic Audit** establishes what the repository and tests actually do and identifies recovered behavioral memory and contradictions.
* **Archive Behavioral Analysis** establishes what the rated archive actually demonstrates.

This document is the bridge between conceptual contract and code changes.

---

# 2. Evidence Base

| Source                              | Role                                 | Authority               |
| ----------------------------------- | ------------------------------------ | ----------------------- |
| `intelligence-contract.md`          | Authoritative conceptual definitions | Highest                 |
| `phase-1-intelligence-alignment.md` | Phase 1 conceptual alignment         | High                    |
| `intelligence-forensic-audit.md`    | Repository and behavioral evidence   | Implementation evidence |
| Archive behavioral analysis         | Archive-derived evidence             | Behavioral evidence     |

---

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

These meanings come from `intelligence-contract.md`.

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

The intelligence system currently uses `confidence` for several different concepts.

| Term                      | Meaning                                                             | Must NOT mean              |
| ------------------------- | ------------------------------------------------------------------- | -------------------------- |
| Signal Strength           | How strongly a quality or signal is expressed                       | Probability of correctness |
| Data Sufficiency          | Whether enough archive data exists to evaluate something reasonably | Classification certainty   |
| Classification Confidence | How clearly one classification beats plausible alternatives         | Raw classification score   |
| Evidence Strength         | How strongly available evidence supports a conclusion               | Trait strength             |

### Decision — LOCKED

Do not create four numerical fields everywhere simply because four concepts exist.

Introduce a distinct field only where the semantic distinction is genuinely required by the API, UI, explanation layer, or decision logic.

### Existing field mappings — LOCKED semantics

| Current field                       | Actual meaning                      | Classification              | Phase 1 action                                    |
| ----------------------------------- | ----------------------------------- | --------------------------- | ------------------------------------------------- |
| Identity `confidence`               | Data Sufficiency-like               | TERMINOLOGY                 | Rename/reframe only if blast radius is understood |
| Designation `designationConfidence` | Signal Strength-like                | TERMINOLOGY                 | Rename/reframe only if blast radius is understood |
| Observation `confidence`            | Threshold-relative support strength | TERMINOLOGY / CLARIFICATION | Rename/reframe and document semantics             |
| Finding confidence                  | Not standardized                    | CLARIFICATION               | Do not add until semantics are defined            |

**LOCKED:** Do not invent a Classification Confidence algorithm merely to justify the word `confidence`.

**DEFERRED:** Generalized Classification Confidence remains outside Phase 1.

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
* Identity ranking infrastructure
* Identity contribution breakdown
* Existing narrative architecture
* Deterministic behavior
* Empty-profile behavior
* Current **210-test regression baseline**

---

## 7.1 Recovered Behavioral Contracts

### Trait Signal Strength normalization

```python

strength = min(max((value - 6) / 4, 0), 1)

```

**Classification:** PRESERVE

---

### Identity Score normalization

```python

normalize_identity_score(value) = max(0, min(value / 10, 1))

```

**Classification:** PRESERVE

These two normalization systems have different semantics.

**LOCKED:** Do not unify them.

---

### Identity trait resolution priority

```text
universalAverages
↓
mediaAverages
↓
derived-trait calculation
```

**Classification:** PRESERVE

---

### Derived traits

Current derived traits include:

* `experimental_affinity`
* `genre_diversity`
* `novelty`
* `analysis`
* `ambiguity`
* `reflection`
* `system_design`

Known facts:

* `novelty` and `experimental_affinity` currently rely on the same experimental-genre percentage signal
* `genre_diversity = len(genres) × 2` may exceed 10 before clamping
* `system_design` currently derives directly from `gameplay_mechanics`

These are implementation facts, not automatic redesign triggers.

**Classification:** PRESERVE / DEFERRED REVIEW

---

# 8. Repository Implementation Map

| Concept           | Responsible modules                                                                                                                                                        | Notes                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Traits            | `trait_calculator.py`                                                                                                                                                      | Universal + media strengths                                |
| Genre Signals     | `genre_intelligence.py`, `genre_signals.py`, `genre_signal_utils.py`, designation affinity helpers                                                                         | Presence / percentage / affinity                           |
| Observations      | `observation_rules.py`, `observation_engine.py`, `observation_mapper.py`, `observation_utils.py`                                                                           | Existing rule system                                       |
| Findings          | `finding_rules.py`, `finding_engine.py`, `identity_finding.py`                                                                                                             | Independent Finding rules + Identity special case          |
| Designations      | `designation_rules.py`, `designation_engine.py`, `designation_mapper.py`                                                                                                   | Fixture/rule-driven classifications                        |
| Identities        | `identity_scorer.py`, `identity_scoring.py`, `identity_engine.py`, `identity_explainer.py`, `identity_confidence.py`, `identity_derived_traits.py`, `fixtures/identities/` | Scoring, explanation, derived traits                       |
| Narrative         | `archive_narrative.py`                                                                                                                                                     | Downstream synthesis                                       |
| Archive / Profile | `archive_engine.py`, `archive_mapper.py`, `archive_utils.py`                                                                                                               | Profile assembly                                           |
| Recommendations   | `models/recommendations/*`                                                                                                                                                 | Deferred                                                   |
| Frontend          | `charts.js` and other current consumers                                                                                                                                    | Field-specific blast radius must be verified before rename |

**Test baseline — FACT:** **210 tests pass.**

---

# 9. Designations

**Classification:** PRESERVE + TERMINOLOGY + EVIDENCE

## 9.1 Contract — LOCKED

Designation answers:

> What recognizable taste classification fits?

Designations are taste classifications, not curator philosophies.

## 9.2 Existing machinery — PRESERVE

Preserve:

* rule/fixture-driven definitions
* multiple internal candidates
* ranking
* primary selection
* recommendation-bias metadata

## 9.3 Phase 1 decisions

* Correct misleading confidence terminology.
* Preserve classification behavior.
* Add lightweight "why this designation?" evidence where useful.
* Do not clone the Observation evidence schema.
* Do not expand Designations into Identity territory.

---

# 10. Identity vs Designation

**Classification:** ALIGNMENT
**Status:** LOCKED

| Layer       | Question                                        |
| ----------- | ----------------------------------------------- |
| Designation | What named taste classification fits?           |
| Identity    | What kind of curator does the archive describe? |

Current overlapping names are an implementation/catalog artifact.

They do not justify merging the systems.

## Decision

* Do not delete Identity scoring machinery merely because fixtures overlap.
* Evolve Identity vocabulary toward curator philosophy/synthesis.
* Do not preserve Designation/Identity name collisions as the intended final state.
* Do not redesign Designation machinery merely to repair Identity vocabulary.

---

# 11. Identity Catalog

## System-level decision — LOCKED

The Identity subsystem should detect durable curator philosophies that could plausibly apply to other archives.

It should not become a collection of Zach-specific personality labels.

## Archive-supported working direction

The current archive provides strong evidence for:

* Structural Curator
* Concept-First Curator
* Engagement-Gated Curator

These remain **WORKING DIRECTION**, not finalized fixture contracts.

Each accepted Identity must eventually have:

* purpose
* primary signals
* secondary signals
* excluded/non-contributing signals
* minimum data requirements
* scoring approach
* contribution/evidence explanation
* distinction from other Identities
* distinction from Designations

**Gate:** New Identity fixture semantics cannot be implemented until the shortlist and signal definitions are accepted.

---

# 12. Identity Minimum-Entry / Eligibility Semantics

**Classification:** CLARIFICATION / POSSIBLE ALIGNMENT
**Status:** UNRESOLVED

Earlier Phase 1 planning treated `minimum_entries` as an automatic exclusion-before-ranking gate.

The forensic audit establishes that this conclusion should not be implemented automatically without confirming the semantic relationship between:

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

The implementation currently uses `minimum_entries` as part of Identity scoring/sufficiency behavior.

Before changing it, determine:

* whether insufficient identities are intended to remain internally rankable
* whether they are intended to remain externally presentable
* whether zero-score identities can become primary
* whether that behavior is a genuine contract conflict
* which layer should enforce exclusion if exclusion is required

**Gate:** No Identity eligibility/ranking behavior change until this decision is LOCKED.

This replaces the earlier blanket decision:

> "minimum_entries must always exclude an Identity before ranking."

---

# 13. Primary Identity

**Classification:** PRESERVE + TESTING
**Status:** LOCKED shape

Conceptually:

```text
eligible candidates
↓
deterministic ranking
↓
ONE PRIMARY
```

Preserve existing ranking machinery unless the eligibility clarification establishes a direct conflict.

Required tests:

* deterministic ranking
* primary selection
* explainability
* insufficient-data behavior
* independence from Designation naming

---

# 14. Secondary Identity

**Classification:** CLARIFICATION
**Status:** Principle LOCKED; thresholds UNRESOLVED

Secondary Identities may be zero or more, but must be meaningful.

Do not implement:

```text
score > 0
↓
display secondary
```

Potential considerations:

* Data Sufficiency
* signal strength
* relationship to Primary Identity
* separation from weak candidates

**Gate:** Numeric thresholds require accepted Identity semantics and score-distribution analysis.

---

# 15. Ties and Close Competitors

**Classification:** CLARIFICATION
**Status:** UNRESOLVED

The system must distinguish:

* exact ties
* meaningful near-ties
* strong-vs-weak differences

The final policy must define:

* exact tie-breaking
* stable secondary sort key if necessary
* score precision
* meaningful near-tie threshold
* presentation of close competitors
* whether close competitors affect Primary selection
* whether the policy applies to Designations, Identities, or both

**Gate:** No new tie/near-tie behavior until the policy is LOCKED.

---

# 16. Findings vs Observations

**Classification:** ALIGNMENT + CLARIFICATION + TESTING

## Locked distinction

| Layer       | Question                          |
| ----------- | --------------------------------- |
| Observation | What can we directly demonstrate? |
| Finding     | What does the evidence suggest?   |

## Implementation clarification

The current repository does **not** implement Findings as a required downstream stage of Observations.

Observations and Findings are independently evaluated rule systems.

Therefore:

> Conceptual distinction does not require architectural sequencing.

The Phase 1 objective is to prevent Findings from becoming duplicated Observations, Genre Signals, or a second Designation layer.

## Operational test

> If the Finding were removed and replaced with the underlying Observation or raw signal, would meaningful information be lost?

If no, investigate it as a possible duplicate or misclassified layer.

---

# 17. Observation / Finding Overlap Decisions

## 17.1 `systems-affinity` ↔ `systems-preference`

**Classification:** POSSIBLE DEAD CODE / CLARIFICATION

These rules substantially overlap at the predicate level.

Do not delete either automatically.

Before changing `systems-preference`, determine whether it contributes genuine interpretive meaning beyond `systems-affinity`.

---

## 17.2 `atmospheric-focus` ↔ `atmospheric-interest`

**Classification:** POSSIBLE DEAD CODE / CLARIFICATION

These rules substantially overlap at the predicate level.

Do not manufacture an artificial distinction merely through prose or renaming.

Determine whether one layer contains meaningful additional information.

---

## 17.3 Partial overlaps

Shared metrics do not automatically imply duplication.

Examples include:

* boundary-preference ↔ concept-driven
* boundary-preference ↔ speculative-interest
* boundary-preference ↔ atmospheric-interest
* interpretive-depth ↔ concept-driven

These require predicate and semantic analysis, not name matching.

---

## 17.4 Distinct concepts

The forensic matrix also establishes that several Observations and Findings are genuinely distinct.

Notably:

* emotional-resonance has no Finding twin
* craft-appreciation has no Finding twin
* engagement-priority has no Observation twin
* speculative-interest has no direct Observation twin
* several other signals remain layer-specific

This supports preserving independent rule systems.

---

# 18. Existing Finding Treatment

| Finding                | Classification                | Phase 1 treatment                             |
| ---------------------- | ----------------------------- | --------------------------------------------- |
| `concept-driven`       | PRESERVE                      | Preserve; strengthen evidence if needed       |
| `engagement-priority`  | CLARIFICATION / ELEVATE       | Define interpretive purpose before changing   |
| `systems-preference`   | CLARIFICATION / ELEVATE       | Establish distinction from `systems-affinity` |
| `speculative-interest` | CLARIFICATION / ELEVATE       | Define interpretive role beyond genre signal  |
| `atmospheric-interest` | DEFERRED / POSSIBLE DUPLICATE | Do not manufacture distinction during Phase 1 |

No mass deletion of Findings.

---

# 19. Finding Evidence and Confidence

## Evidence — LOCKED minimum

Findings should expose explainable support.

Possible evidence:

* Observations
* Traits
* Genre Signals
* metrics
* other explicit signals

The evidence schema does not need to match Observation evidence.

## Finding confidence — UNRESOLVED

Do not add a standardized Finding confidence field until its semantics are defined.

Do not create a Classification Confidence algorithm merely to populate it.

---

# 20. Archive Behavioral Ground Truth

Archive evidence should inform prioritization but must not become Zach-specific hard-coded intelligence.

Strong patterns include:

* conceptual/originality strength among highly rated works
* depth/thought-provoking qualities
* engagement as a strong gating factor
* mind-bending/psychological/speculative structure
* visual-novel/puzzle-narrative strength within games
* medium-specific emotional behavior
* spectacle without conceptual weight performing poorly
* atmosphere being useful but not universally necessary

Do not promote these directly into new hard-coded rules without passing the Observation/Finding/Identity gates.

---

# 21. Observation Catalog

**Status:** WORKING DIRECTION

Existing Observation machinery remains protected.

No new Observation rule should be implemented until its:

* distinctness
* ownership
* evidence strength
* medium specificity
* false-positive risk
* relationship to Findings

have been evaluated.

Archive-supported candidates remain investigation targets rather than automatic implementation requirements.

---

# 22. Archive States

**Classification:** CLARIFICATION
**Status:** Concept LOCKED; thresholds UNRESOLVED

Conceptual states:

* `EMPTY`
* `SPARSE`
* `ESTABLISHED`

Operational thresholds remain undefined.

**LOCKED principle:**

> Insufficient data should produce insufficient evidence, not false certainty.

**Gate:** No code branches on semantic archive-state labels until operational thresholds are LOCKED.

---

# 23. Narrative

**Classification:** PRESERVE + TESTING
**Status:** LOCKED

Narrative is downstream of established intelligence.

Narrative may:

* synthesize
* translate
* contextualize
* summarize

Narrative may not:

* invent evidence
* invent classifications
* invent traits
* invent Findings
* imply unsupported certainty

Preserve the existing template-driven architecture.

---

# 24. Recommendation Signals

**Classification:** DEFERRED
**Status:** Phase 3

Do not implement recommendation weighting during Phase 1.

Potential future signals:

**Hard/measurable**

* Trait Strength
* Genre Affinity
* Scoring Preferences

**Soft/interpretive**

* Observations
* Findings
* Identity context

Preserve recommendation-bias metadata on Designations and Identities.

Identity must not become an opaque recommendation score.

---

# 25. Analytics vs Profile

**Status:** LOCKED

| Surface   | Question                    |
| --------- | --------------------------- |
| Analytics | What do the numbers say?    |
| Profile   | What does the archive mean? |

Profile UI remains outside Phase 1.

---

# 26. API / Frontend Compatibility

**Classification:** CLARIFICATION
**Status:** Process LOCKED; field-specific plan UNRESOLVED

Every terminology or field change must account for:

* backend model
* calculation layer
* API response
* serialization
* frontend consumers
* `charts.js`
* future Profile UI
* tests
* narrative consumers
* fixtures

No field rename is complete until its full blast radius is mapped.

**Gate:** Create a per-field rename/compatibility map before executing the terminology pass.

---

# 27. Change Matrix

| Issue                                    | Classification                      | Status                 | Required Phase 1 treatment                                            | Gate                           |
| ---------------------------------------- | ----------------------------------- | ---------------------- | --------------------------------------------------------------------- | ------------------------------ |
| Confidence terminology                   | TERMINOLOGY                         | LOCKED semantics       | Correct terminology without changing valid calculations               | Field-level rename map         |
| Designation semantics                    | PRESERVE + TERMINOLOGY + EVIDENCE   | LOCKED                 | Preserve machinery; improve terminology/evidence                      | None for terminology-only work |
| Identity vs Designation                  | ALIGNMENT                           | LOCKED                 | Maintain distinct responsibilities; evolve Identity vocabulary        | Identity shortlist             |
| Identity catalog                         | ALIGNMENT                           | WORKING DIRECTION      | Evolve toward generic curator philosophy                              | Shortlist + signals            |
| Identity minimum-entry behavior          | CLARIFICATION / POSSIBLE ALIGNMENT  | UNRESOLVED             | Audit eligibility vs score vs ranking vs presentation before changing | Semantic decision              |
| Primary Identity                         | PRESERVE + TESTING                  | LOCKED shape           | Preserve deterministic selection                                      | Eligibility decision           |
| Secondary Identity                       | CLARIFICATION                       | UNRESOLVED thresholds  | Define meaningfulness later                                           | Score distribution             |
| Tie / near-tie                           | CLARIFICATION                       | UNRESOLVED             | Define explicit policy before implementation                          | Policy text                    |
| Finding boundary                         | ALIGNMENT + CLARIFICATION + TESTING | LOCKED concept         | Prevent Observation/Genre Signal duplication                          | Regression tests               |
| `systems-preference`                     | POSSIBLE DEAD CODE / CLARIFICATION  | UNRESOLVED             | Investigate distinction from `systems-affinity`                       | Semantic decision              |
| `atmospheric-interest`                   | DEFERRED / POSSIBLE DEAD CODE       | DEFERRED               | Do not manufacture distinction during Phase 1                         | Later review                   |
| Finding catalog                          | PRESERVE + CLARIFICATION            | LOCKED classifications | Preserve/Elevate/Defer as tabled                                      | Purpose statements for Elevate |
| Finding evidence                         | EVIDENCE                            | LOCKED minimum         | Provide explainable support                                           | Per-Finding evidence decision  |
| Finding confidence                       | CLARIFICATION                       | UNRESOLVED             | Do not add until semantics defined                                    | Semantic decision              |
| Observation catalog                      | CLARIFICATION                       | WORKING DIRECTION      | Preserve current rules; shortlist new rules                           | Accepted shortlist             |
| Archive states                           | CLARIFICATION                       | Thresholds UNRESOLVED  | Do not branch on undefined labels                                     | Threshold policy               |
| Narrative                                | PRESERVE + TESTING                  | LOCKED                 | Keep downstream-only                                                  | Regression tests               |
| Recommendations                          | DEFERRED                            | DEFERRED               | Phase 3                                                               | None                           |
| Profile UI                               | DEFERRED                            | DEFERRED               | Phase 2                                                               | None                           |
| Classification Confidence algorithm      | DEFERRED                            | DEFERRED               | Do not implement in Phase 1                                           | None                           |
| Trait/Identity normalization unification | PRESERVE                            | LOCKED                 | Keep separate                                                         | None                           |
| API/frontend terminology rename          | TERMINOLOGY                         | UNRESOLVED per field   | Map complete blast radius before rename                               | Rename map                     |

---

# 28. Pre-Code Gate

Implementation begins only when the decision being implemented is **LOCKED** and its dependent decisions are also LOCKED.

## 28.1 Repository facts — COMPLETE

* [x] `develop-3` tree inspected
* [x] Intelligence modules mapped
* [x] API/profile assembly mapped
* [x] Frontend consumers mapped
* [x] Tests mapped
* [x] **210-test baseline verified**
* [x] Recovered behavioral contracts identified
* [x] Observation/Finding overlap matrix completed

---

## 28.2 Locked decisions — COMPLETE

* [x] Confidence semantic vocabulary established
* [x] Identity ≠ Designation
* [x] Identity catalog direction established
* [x] Primary Identity remains deterministic
* [x] Secondary Identity meaningful-only principle
* [x] Finding conceptual boundary
* [x] Finding operational boundary test
* [x] Finding treatment classifications
* [x] Trait and Identity normalizations remain separate
* [x] Narrative is downstream-only
* [x] Recommendation work deferred
* [x] Identity catalog must be generic and must not clone Designations
* [x] Existing behavior is presumed preserved unless a direct conflict is demonstrated

---

## 28.3 Explicit implementation gates — UNRESOLVED

* [ ] Identity eligibility/ranking/presentation semantics
* [ ] Final Identity shortlist
* [ ] Per-Identity signal definitions
* [ ] Secondary Identity numeric thresholds
* [ ] Tie / close-competitor policy
* [ ] Purpose statements for ELEVATE Findings
* [ ] Finding evidence model where needed
* [ ] Finding confidence semantics
* [ ] Phase 1 Observation shortlist
* [ ] Archive-state operational thresholds
* [ ] Per-field API/frontend terminology rename plan
* [ ] Distinction/remediation decision for `systems-affinity` / `systems-preference`
* [ ] Distinction/remediation decision for `atmospheric-focus` / `atmospheric-interest`

---

# 29. Merge Requirements

Before any Phase 1 change is merged:

* [ ] Change is explicitly classified
* [ ] Change has a documented reason tied to Contract and/or audit evidence
* [ ] Affected modules are identified
* [ ] Affected API/frontend consumers are identified
* [ ] Tests are planned
* [ ] Existing regression behavior is understood
* [ ] Full suite passes
* [ ] New/changed behavior has regression coverage
* [ ] No unrelated redesign has been introduced
* [ ] No gated semantic decision has been implemented early
* [ ] Current baseline of **210 passing tests** remains protected

---

# 30. Phase 1 Work Order

## 1. Terminology pass

**Allowed:** Yes, subject to per-field rename mapping.

Correct misleading confidence terminology without changing underlying algorithms.

---

## 2. Identity eligibility semantic audit

**Allowed:** Yes.

Do not immediately modify behavior.

First determine the intended boundary between:

```text
Data Sufficiency
score
ranking
presentation
primary selection
```

Only then make the smallest necessary change, if any.

---

## 3. Recovered behavior regression protection

**Allowed:** Yes.

Protect:

* Trait normalization
* Identity normalization
* derived-trait behavior
* deterministic ranking
* evidence structures
* empty-profile behavior
* recommendation-bias metadata
* existing primary selection

---

## 4. Finding boundary and duplicate investigation

**Allowed:** Yes.

Preserve `concept-driven`.

Investigate:

* `systems-preference`
* `atmospheric-interest`

against their Observation counterparts.

Do not mass-delete Findings.

---

## 5. Elevated Finding purposes

**Blocked until purpose statements are LOCKED.**

For each candidate:

* define interpretive purpose
* define evidence relationship
* demonstrate distinction from Observation / Trait / Genre Signal
* add dedicated tests

---

## 6. Identity catalog evolution

**Blocked until Identity shortlist and signal definitions are LOCKED.**

Machinery-only preparation may proceed.

---

## 7. Secondary Identity policy

**Blocked until score distributions are inspected.**

---

## 8. Tie / close-competitor policy

**Blocked until policy is written and LOCKED.**

---

## 9. Observation changes

**Blocked until Observation shortlist is LOCKED.**

Existing Observation machinery remains protected.

---

## 10. Archive-state implementation

**Blocked until operational thresholds are LOCKED.**

---

## 11. Regression

Run the full suite after each intentional behavior change.

Current baseline:

> **210 tests passing**

Phase 1 must preserve the baseline except for explicitly approved changes.

---

# 31. Explicit Non-Goals

Phase 1 does not include:

* rewriting scoring rubrics
* rewriting CRUD
* replacing the Entry model
* replacing archive mapping
* Recommendation Engine implementation
* Profile UI
* React migration
* mass deletion of Findings
* mass deletion of Identities
* inventing Classification Confidence mathematics
* unifying Trait and Identity normalization
* designing Identities that only describe Zach
* treating genre frequency as preference
* treating a single metric as sufficient interpretive evidence
* implementing new Observation rules before the shortlist is accepted
* implementing elevated Findings before purposes are defined
* implementing Secondary Identity thresholds before score distributions are inspected
* implementing Archive State branching before thresholds are defined
* preserving Designation/Identity name collisions as the intended final state
* solving systems-vs-atmosphere ownership through artificial rewording
* rewriting working infrastructure merely because its current implementation is imperfect
* forcing Observations and Findings into a sequential pipeline merely because their conceptual roles differ

---

# 32. Phase 1 Success Criteria

Phase 1 is successful when:

1. Existing intelligence machinery remains intact unless a specific contract conflict requires change.
2. Confidence terminology no longer conflates fundamentally different concepts.
3. Identity and Designation have distinct conceptual responsibilities.
4. Identity eligibility, ranking, and presentation semantics are explicitly defined before behavior is changed.
5. Findings have a defensible boundary from Observations and Genre Signals.
6. Existing Findings have explicit PRESERVE / CLARIFY / DEFER treatment.
7. Likely duplicate Observation/Finding rules have been investigated rather than blindly deleted.
8. Identity vocabulary is moving toward durable curator-philosophy concepts.
9. Archive evidence informs prioritization without becoming Zach-specific hard-coded logic.
10. No new intelligence behavior depends on an unresolved conceptual decision.
11. Every intentional behavioral change has regression coverage.
12. The **210-test baseline** remains green except for explicitly approved changes.
13. No unrelated rewrite or redesign has entered Phase 1.

---

# 33. One-Sentence Phase 1 North Star

> **Align the existing deterministic intelligence machinery so Observations demonstrate patterns, Findings interpret conclusions, Designations classify taste, and Identities describe curator philosophy—while preserving recovered behavioral memory and changing only behavior that demonstrably conflicts with the locked conceptual model.**
