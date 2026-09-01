```
__    __ ___    ___ ___  ____ ___
\ \/\/ // _ \  _\\ / _ \ | D )| |
 \_/\_//_/ \_\/__//_/ \_\|_D_)|_|
 Weighted Archive System for Analysis & Behavioral Insights
```

# Media Tracker — Phase 1 Decision & Implementation Map

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Phase:** Phase 1 — Intelligence Alignment
**Status:** Reconciled against the current Phase 1 Intelligence Alignment
**Related documents:**

* `intelligence-contract.md`
* `phase-1-intelligence-alignment.md`
* `intelligence-forensic-audit.md`
* `roadmap.md`
* `forgotten-features-register.md`

**Current test status:** **247 passing tests / 1 failing test**

**Historical regression milestones:** 199 → 210 → 218 → 247 passing tests

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

The **Phase 1 Intelligence Alignment** document is the reconciled conceptual reference. When an older statement in this document conflicts with a later locked Phase 1 decision, the locked Phase 1 decision supersedes the older statement.

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

| Current field                       | Actual meaning                                                                                     | Classification              | Phase 1 action                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| Identity `data_sufficiency`         | Archive-data sufficiency relative to the Identity's minimum entry requirement                      | Data Sufficiency            | Preserve calculation and API behavior; use Data Sufficiency terminology |
| Designation `designationConfidence` | Aggregate signal strength of the Designation Basis                                                 | TERMINOLOGY                 | Preserve calculation; clarify/reframe terminology                       |
| Observation `confidence`            | Threshold-relative Evidence Strength                                                               | TERMINOLOGY / CLARIFICATION | Preserve calculation and API behavior; clarify semantics                |
| Finding confidence                  | Not implemented; Findings are binary rule-triggered interpretations supported by explicit evidence | N/A                         | Do not add in Phase 1                                                   |

### Designation confidence resolution

**LOCKED:** The existing `designationConfidence` calculation is preserved.

It represents aggregate signal strength of the Designation Basis, not statistical confidence or probability that the designation is correct.

No replacement confidence algorithm is required.

**LOCKED:** Do not invent a Classification Confidence algorithm merely to justify the word `confidence`.

**DEFERRED:** Generalized Classification Confidence remains outside Phase 1.

### Identity data sufficiency resolution

**LOCKED:** Identity `data_sufficiency` represents archive-volume sufficiency relative to the Identity's minimum-entry requirement.

It does not represent statistical confidence, probability, or confidence that the Identity classification is objectively correct.

The existing calculation is preserved.

The current Identity implementation does not require a replacement `confidence` field or compatibility alias.

**Status:** RESOLVED / PRESERVE

### Observation confidence resolution

**LOCKED:** The existing Observation `confidence` calculation is preserved.

It represents threshold-relative **Evidence Strength** for the rule's designated supporting metric.

It does not represent statistical confidence, probability, or confidence that the Observation itself is objectively correct.

Additional predicate conditions may establish that an Observation qualifies without contributing directly to its numerical Evidence Strength.

This is intentional and is not an incomplete compound-confidence model.

**Status:** RESOLVED / PRESERVE

### Finding confidence resolution

Findings do not expose or calculate a confidence value.

Finding evaluation is binary: the Finding rule either fires or does not fire. The resulting Finding provides explicit support explaining why the rule fired.

**LOCKED:** Do not add Finding confidence during Phase 1.

Any future graded Finding strength would require a separate semantic/product decision.

**Status:** RESOLVED / DO NOT ADD

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
* Current passing behavior except for explicitly approved intentional changes

The current suite is **247 passing / 1 failing**, so the suite is not presently green.

The current failure is an established Designation regression involving the `deep_diver` fixture and the updated `boundary_explorer` evidence model.

The passing count documents current regression coverage; it is not itself a green baseline.

Historical milestones are:

* 199 passing tests — original forensic baseline
* 210 passing tests — earlier Phase 1 baseline
* 218 passing tests — post-forensic test baseline
* 247 passing tests — current passing count

---

## 7.1 Recovered Behavioral Contracts

### Trait Signal Strength normalization

```python
strength = min(max((value - 6) / 4, 0), 1)
```

Therefore:

```text
value <= 6 → 0
value = 10 → 1
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

### Deterministic existing behavior

The audit recovered meaningful deterministic behavior including:

* Designations are ranked by score
* Primary Designation is selected from ranked candidates
* Observations have deterministic ordering based on their established Evidence Strength semantics
* Identity scoring uses fixture weights
* Identity contribution breakdowns are available
* Structured Observation evidence exists
* Empty-profile behavior produces empty/zero intelligence rather than fabricated certainty
* Recommendation-bias metadata exists independently of recommendation scoring
* Designations are not emitted as Findings
* Identity ranking is deterministic among eligible candidates
* Primary Identity selection remains deterministic

Tie and close-competitor behavior is governed by the locked Phase 1 ranking/presentation policy and must not be inferred from incidental sort order.

---

# 8. Repository Implementation Map

| Concept           | Responsible modules                                                                                                                                                              | Notes                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Traits            | `trait_calculator.py`                                                                                                                                                            | Universal + media strengths                                |
| Genre Signals     | `genre_intelligence.py`, `genre_signals.py`, `genre_signal_utils.py`, designation affinity helpers                                                                               | Presence / percentage / affinity                           |
| Observations      | `observation_rules.py`, `observation_engine.py`, `observation_mapper.py`, `observation_utils.py`                                                                                 | Existing rule system                                       |
| Findings          | `finding_rules.py`, `finding_engine.py`, `identity_finding.py`                                                                                                                   | Independent Finding rules + Identity special case          |
| Designations      | `designation_rules.py`, `designation_engine.py`, `designation_mapper.py`                                                                                                         | Fixture/rule-driven classifications                        |
| Identities        | `identity_scorer.py`, `identity_scoring.py`, `identity_engine.py`, `identity_explainer.py`, `identity_data_sufficiency.py`, `identity_derived_traits.py`, `fixtures/identities/` | Scoring, explanation, derived traits                       |
| Narrative         | `archive_narrative.py`                                                                                                                                                           | Downstream synthesis                                       |
| Archive / Profile | `archive_engine.py`, `archive_mapper.py`, `archive_utils.py`                                                                                                                     | Profile assembly                                           |
| Recommendations   | `models/recommendations/*`                                                                                                                                                       | Deferred                                                   |
| Frontend          | `charts.js` and other current consumers                                                                                                                                          | Field-specific blast radius must be verified before rename |

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
* deterministic behavior

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

The Identity subsystem describes durable curator philosophies that could plausibly apply to other archives.

It should not become a collection of Zach-specific personality labels.

The accepted Phase 1 Identity direction is based on durable curator philosophy rather than user-specific personality description.

Each Identity must have:

* purpose
* primary signals
* secondary signals
* excluded/non-contributing signals
* minimum data requirements
* scoring approach
* contribution/evidence explanation
* distinction from other Identities
* distinction from Designations

The Identity catalog should remain small and conceptually differentiated.

**Status:** LOCKED for Phase 1 implementation.

---

# 12. Identity Eligibility / Ranking / Presentation

**Classification:** ALIGNMENT
**Status:** LOCKED

Identity eligibility, scoring, ranking, and presentation are distinct concepts.

The locked Phase 1 model is:

```text
Data Sufficiency
      ↓
Eligibility
      ↓
Score
      ↓
Ranking
      ↓
Presentation
      ↓
Primary / Secondary selection
```

`minimum_entries` is the operational basis for Identity eligibility.

An Identity that does not meet its minimum-entry requirement is **not eligible for Identity resolution**.

Eligibility is therefore established before ranking and presentation.

Among eligible Identities:

* existing Identity scoring remains the scoring mechanism
* ranking remains deterministic
* Primary selection occurs from the eligible ranked candidates
* Secondary selection occurs only from eligible non-primary candidates
* presentation does not manufacture an Identity merely because a candidate exists in the catalog

This separates archive-volume sufficiency from Identity score and prevents insufficient-data Identities from becoming Primary merely because of incidental scoring or ordering behavior.

**Decision:** Implement eligibility at the Identity-resolution boundary rather than rewriting the underlying scoring model.

---

# 13. Primary Identity

**Classification:** PRESERVE + TESTING
**Status:** LOCKED

Conceptually:

```text
eligible candidates
↓
deterministic ranking
↓
ONE PRIMARY
```

Primary Identity is the strongest eligible Identity after applying the locked Identity ranking and resolution policy.

Required tests protect:

* deterministic ranking
* primary selection
* primary selection explainability
* independence from Designation naming
* behavior when insufficient-data Identities are present
* deterministic behavior when candidate input order changes

Primary Identity selection must not depend on Designation naming or incidental fixture/configuration order.

---

# 14. Secondary Identity

**Classification:** ALIGNMENT + CLARIFICATION
**Status:** LOCKED

The contract allows zero or more meaningful Secondary Identities.

For the current Phase 1 implementation model, a Secondary Identity must satisfy all of the following:

* be eligible
* not be the Primary Identity
* have meaningful Identity support
* provide enough signal to justify presentation as an additional curator philosophy

A Secondary Identity is **not** surfaced merely because:

* its score is greater than zero
* it ranks second
* it is numerically close to the Primary
* it exists in the Identity catalog

Meaningfulness is based on the candidate's own support, not merely its relationship to the Primary.

The Secondary Identity is independently evaluated and must not be derived from the Primary.

If no eligible non-primary Identity meets the meaningfulness requirement, no Secondary Identity is presented.

**Decision:** Secondary Identity is a presentation-level concept layered on top of eligibility and scoring. It does not alter the underlying Identity score.

---

# 15. Ranking, Ties, and Close Competitors

**Classification:** ALIGNMENT + TESTING
**Status:** LOCKED

Ranking and presentation must be treated as separate concerns.

## Exact ties

When candidates have equal scores, the system must use the established evidence hierarchy to determine whether meaningful evidence distinguishes them.

Existing component-level Identity evidence may be used where it is already part of the Identity scoring/explanation model.

Additional evidence may be considered only when it has a substantive relationship to the competing Identity definitions.

Evidence used for tie resolution is comparative evidence.

It must not become arbitrary additional scoring.

## Close competitors

A close competitor is not automatically a tie.

A non-equal score remains a ranked difference unless the locked presentation policy establishes that the candidate also meets the requirements for meaningful Secondary presentation.

The system must not introduce an arbitrary near-tie threshold merely to make the ranking appear cleaner.

A close competitor may be presented as Secondary when it independently satisfies the Secondary meaningfulness policy.

It must not be presented merely because it is numerically close to the Primary.

## Arbitrary ordering

The system must not use:

* Identity definition order
* fixture order
* configuration order
* IDs
* file-system ordering

as evidence that one Identity is conceptually stronger.

Where a single Primary is required but meaningful evidence remains genuinely indistinguishable, the Primary assignment is a presentation resolution, not a claim that the selected Identity has stronger evidence.

## Scope

This policy applies to Identity resolution.

Designation ranking continues to use its established ranking machinery unless a separate Designation policy explicitly changes it.

---

# 16. Findings vs Observations

**Classification:** ALIGNMENT + CLARIFICATION + TESTING
**Status:** LOCKED

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

Findings may synthesize multiple signals, including Observations, Traits, Genre Signals, and quantitative evidence, when the resulting interpretation adds genuine meaning.

---

# 17. Observation / Finding Overlap Decisions

## 17.1 `systems-affinity` ↔ `systems-preference`

**RESOLVED:** `systems-preference` was semantically redundant with `systems-affinity` and has been removed.

Both concepts used the same underlying `gameplay_mechanics` signal and the same threshold (`>= 9`). No distinct interpretive meaning was identified that justified maintaining both names.

The repository's intelligence systems remain parallel: this decision is not based on one system consuming another. It is based on the two rules expressing the same concept with the same evidence.

`systems-affinity` is therefore the canonical surviving concept.

The former `systems-preference` Finding has been removed from the production rule set, and regression coverage protects the surviving concept.

**Decision:** CONSOLIDATE INTO `systems-affinity`

---

## 17.2 `atmospheric-focus` ↔ `atmospheric-interest`

These rules were identified as substantially overlapping.

The Phase 1 policy is not to manufacture an artificial distinction merely through prose or renaming.

Preserve the distinction only if the surviving layer provides genuinely different interpretive meaning.

No mass deletion is justified by signal overlap alone.

**Status:** DEFERRED / POSSIBLE DUPLICATE

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

The forensic matrix establishes that several Observations and Findings are genuinely distinct.

Notably:

* emotional-resonance has no Finding twin
* craft-appreciation has no Finding twin
* engagement-priority has no Observation twin
* speculative-interest has no direct Observation twin
* several other signals remain layer-specific

This supports preserving independent rule systems.

---

# 18. Finding Catalog Treatment

| Finding                | Classification                | Phase 1 treatment                                                                   |
| ---------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| `concept-driven`       | PRESERVE                      | Preserve                                                                            |
| `engagement-priority`  | ELEVATE                       | Preserve as a Finding with an explicit interpretive purpose and supporting evidence |
| `systems-preference`   | REMOVED / CONSOLIDATED        | Removed; canonical concept is `systems-affinity`                                    |
| `speculative-interest` | ELEVATE                       | Preserve as a Finding with an explicit interpretive purpose and supporting evidence |
| `atmospheric-interest` | DEFERRED / POSSIBLE DUPLICATE | Do not manufacture a distinction; retain pending later ownership resolution         |

## ELEVATE policy

An elevated Finding must answer:

> What interpretive conclusion does this Finding add that the underlying Observation, Trait, Genre Signal, or metric does not already communicate?

The Finding must provide genuine interpretive value rather than merely renaming an existing signal.

No mass deletion of Findings is permitted.

---

# 19. Finding Evidence and Confidence

## Evidence — LOCKED minimum

Findings must expose sufficient explicit support to explain why the Finding was produced.

Evidence may include:

* Observations
* Traits
* Genre Signals
* quantitative metrics
* other explicitly defined archive signals

The evidence schema does not need to match Observation evidence.

The requirement is:

> **Why does the system think this?**

not:

> **Does every subsystem use the same JSON structure?**

Finding evidence should be sufficient to distinguish an interpretive conclusion from an unsupported assertion.

## Finding confidence — RESOLVED

Findings remain binary rule-triggered interpretations.

No generalized Finding confidence field is required for Phase 1.

No Classification Confidence algorithm should be invented to populate one.

If future product requirements call for graded Finding strength, that is a separate semantic/product decision.

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

These observations may inform rule selection and prioritization.

They do not automatically become new hard-coded rules.

---

# 21. Observation Catalog

**Classification:** ALIGNMENT + PRESERVE
**Status:** LOCKED for Phase 1 shortlist

Existing Observation machinery remains protected.

The Phase 1 Observation shortlist is now the accepted scope for Observation changes.

No Observation should be added, removed, or materially redefined outside that accepted shortlist without a separate decision.

Every Observation change must still preserve:

* distinctness
* ownership
* evidence strength
* medium specificity
* false-positive awareness
* relationship to Findings

Existing Observation rules remain protected unless a specific approved change addresses one of the accepted Phase 1 Observation decisions.

---

# 22. Archive States

**Classification:** ALIGNMENT
**Status:** LOCKED

Conceptual states:

* `EMPTY`
* `SPARSE`
* `ESTABLISHED`

The Phase 1 operational policy establishes that Archive State is determined from archive volume and usable intelligence coverage rather than from arbitrary classification success.

The state model exists to prevent inappropriate interpretation of insufficient data.

The locked principle is:

> **Insufficient data should produce insufficient evidence, not false certainty.**

Archive State is not itself a replacement for subsystem-specific sufficiency rules.

Subsystems may continue to use their own requirements.

State-dependent branching should be limited to decisions explicitly justified by the Archive State policy.

Do not allow an archive-state label to manufacture intelligence that the underlying evidence does not support.

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
* connect established conclusions

Narrative may not:

* invent evidence
* invent classifications
* invent traits
* invent Findings
* imply unsupported certainty
* treat speculation as demonstrated fact

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

The backend `designationBasis` producer remains authoritative.

The obsolete frontend `generatedesignationBasis()` duplicate has been removed.

**Gate:** Create a per-field rename/compatibility map before executing any public terminology rename.

---

# 27. Change Matrix

| Issue                                    | Classification                      | Status                 | Required Phase 1 treatment                                                       | Gate                                |
| ---------------------------------------- | ----------------------------------- | ---------------------- | -------------------------------------------------------------------------------- | ----------------------------------- |
| Confidence terminology                   | TERMINOLOGY                         | LOCKED semantics       | Correct terminology without changing valid calculations                          | Field-level rename map              |
| Designation semantics                    | PRESERVE + TERMINOLOGY + EVIDENCE   | LOCKED                 | Preserve machinery; improve terminology/evidence                                 | None for terminology-only work      |
| Identity vs Designation                  | ALIGNMENT                           | LOCKED                 | Maintain distinct responsibilities; evolve Identity vocabulary                   | Identity catalog decisions          |
| Identity catalog                         | ALIGNMENT                           | LOCKED                 | Use durable curator-philosophy concepts                                          | Final accepted Identity definitions |
| Identity eligibility                     | ALIGNMENT                           | LOCKED                 | Apply minimum-entry eligibility before Identity resolution                       | Regression tests                    |
| Primary Identity                         | PRESERVE + TESTING                  | LOCKED                 | Preserve deterministic selection among eligible candidates                       | Regression tests                    |
| Secondary Identity                       | ALIGNMENT + CLARIFICATION           | LOCKED                 | Present only meaningful eligible non-primary support                             | Regression tests                    |
| Tie / close-competitor                   | ALIGNMENT + TESTING                 | LOCKED                 | Use established ranking/evidence policy; no arbitrary near-tie rule              | Regression tests                    |
| Finding boundary                         | ALIGNMENT + CLARIFICATION + TESTING | LOCKED                 | Prevent Observation/Genre Signal duplication                                     | Regression tests                    |
| `systems-preference`                     | REDUNDANT FINDING                   | RESOLVED               | Removed; consolidated into `systems-affinity`                                    | Regression tests                    |
| `atmospheric-interest`                   | DEFERRED / POSSIBLE DUPLICATE       | DEFERRED               | Do not manufacture distinction                                                   | Later review                        |
| Finding catalog                          | PRESERVE + ALIGNMENT                | LOCKED classifications | Preserve/Elevate/Defer as defined                                                | Purpose/evidence tests              |
| Finding evidence                         | EVIDENCE                            | LOCKED minimum         | Provide sufficient explicit support                                              | Per-Finding evidence decisions      |
| Finding confidence                       | DEFERRED / DO NOT ADD               | RESOLVED               | Do not add confidence field                                                      | None                                |
| Observation catalog                      | ALIGNMENT + PRESERVE                | LOCKED shortlist       | Protect existing machinery and use accepted Phase 1 shortlist                    | Regression tests                    |
| Archive states                           | ALIGNMENT                           | LOCKED                 | Apply accepted operational state policy; preserve subsystem-specific sufficiency | Regression tests                    |
| Narrative                                | PRESERVE + TESTING                  | LOCKED                 | Keep downstream-only                                                             | Regression tests                    |
| Recommendations                          | DEFERRED                            | Phase 3                | Do not implement weighting                                                       | None                                |
| Profile UI                               | DEFERRED                            | Phase 2                | Do not build final Profile UI in Phase 1                                         | None                                |
| Classification Confidence algorithm      | DEFERRED                            | DEFERRED               | Do not implement in Phase 1                                                      | None                                |
| Trait/Identity normalization unification | PRESERVE                            | LOCKED                 | Keep separate                                                                    | None                                |
| API/frontend terminology rename          | TERMINOLOGY                         | UNRESOLVED per field   | Map complete blast radius before rename                                          | Rename map                          |

---

# 28. Pre-Code Gate

Implementation begins only when the decision being implemented is **LOCKED** and its dependent decisions are also LOCKED.

## 28.1 Repository facts — COMPLETE

* [x] `develop-3` tree inspected
* [x] Intelligence modules mapped
* [x] API/profile assembly mapped
* [x] Frontend consumers mapped
* [x] Tests mapped
* [x] Historical regression baselines documented
* [x] Recovered behavioral contracts identified
* [x] Observation/Finding overlap matrix completed

---

## 28.2 Locked decisions — COMPLETE

* [x] Confidence semantic vocabulary established
* [x] Identity ≠ Designation
* [x] Identity catalog direction established
* [x] Identity eligibility semantics established
* [x] Primary Identity remains deterministic
* [x] Secondary Identity meaningfulness policy established
* [x] Ranking / tie / close-competitor policy established
* [x] Finding conceptual boundary
* [x] Finding operational boundary test
* [x] Finding treatment classifications
* [x] Finding purpose policy established
* [x] Finding evidence minimum established
* [x] Finding confidence explicitly excluded
* [x] Trait and Identity normalizations remain separate
* [x] Observation shortlist established
* [x] Archive State operational policy established
* [x] Narrative is downstream-only
* [x] Recommendation work deferred
* [x] Identity catalog must be generic and must not clone Designations
* [x] Existing behavior is presumed preserved unless a direct conflict is demonstrated

---

## 28.3 Remaining implementation gates

The following are still unresolved or implementation-specific:

* [ ] Per-field API/frontend terminology rename plan
* [ ] Implementation of locked Identity eligibility behavior
* [ ] Implementation of locked Secondary Identity behavior
* [ ] Implementation/verification of locked tie and presentation behavior
* [ ] Implementation of accepted Identity fixture/catalog changes
* [ ] Implementation of accepted Observation shortlist changes
* [ ] Implementation of Archive State behavior
* [ ] Finding evidence implementation where required
* [ ] Final implementation of ELEVATE Finding purpose/evidence decisions
* [ ] Resolution of `atmospheric-focus` / `atmospheric-interest` ownership if later required

These are **implementation gates**, not unresolved conceptual decisions.

No new conceptual policy should be invented while implementing them.

---

# 29. Merge Requirements

Before any Phase 1 change is merged:

* [ ] Change is explicitly classified
* [ ] Change has a documented reason tied to Contract and/or audit evidence
* [ ] Affected modules are identified
* [ ] Affected API/frontend consumers are identified
* [ ] Tests are planned
* [ ] Existing regression behavior is understood
* [ ] Full suite passes, unless an explicitly approved behavioral change temporarily changes an expected result
* [ ] New/changed behavior has regression coverage
* [ ] No unrelated redesign has been introduced
* [ ] No unresolved semantic decision has been implemented early
* [ ] The current test suite returns to green after intentional behavior changes are resolved

---

# 30. Phase 1 Work Order

## 1. Terminology pass

**Allowed:** Yes, subject to per-field rename mapping.

Correct misleading confidence terminology without changing underlying algorithms.

---

## 2. Implement locked Identity eligibility semantics

**Allowed:** Yes.

Apply the established relationship:

```text
Data Sufficiency
↓
Eligibility
↓
Score
↓
Ranking
↓
Presentation
↓
Primary / Secondary
```

Do not rewrite Identity scoring.

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
* Identity eligibility behavior
* Secondary presentation behavior
* tie/presentation behavior

---

## 4. Finding boundary and duplicate investigation

**Allowed:** Yes.

Preserve `concept-driven`.

Maintain:

* `systems-preference` — REMOVED; consolidated into `systems-affinity`
* `engagement-priority` — ELEVATE
* `speculative-interest` — ELEVATE
* `atmospheric-interest` — DEFERRED / possible duplicate

Do not mass-delete Findings.

---

## 5. Elevated Finding implementation

**Allowed:** Yes, based on the locked purpose decisions.

For each elevated Finding:

* preserve the interpretive purpose
* provide sufficient supporting evidence
* demonstrate distinction from Observation / Trait / Genre Signal
* add dedicated tests

---

## 6. Identity catalog evolution

**Allowed:** Yes, using the accepted Phase 1 Identity definitions.

Do not invent new Identity semantics outside the accepted catalog decisions.

---

## 7. Secondary Identity implementation

**Allowed:** Yes.

Implement the locked meaningfulness policy.

Do not expose every positive-scoring Identity.

---

## 8. Tie / close-competitor implementation

**Allowed:** Yes.

Implement the locked ranking/presentation policy.

Do not invent a new arbitrary near-tie threshold.

---

## 9. Observation changes

**Allowed:** Yes, within the accepted Phase 1 Observation shortlist.

Existing Observation machinery remains protected.

---

## 10. Archive-state implementation

**Allowed:** Yes.

Implement only the accepted operational Archive State policy.

Do not introduce unrelated state-dependent behavior.

---

## 11. Regression

Run the full suite after each intentional behavior change.

Current test status:

> **247 passing / 1 failing**

The known failing test is the `deep_diver` designation-profile regression caused by the updated `boundary_explorer` evidence model.

Phase 1 must return the suite to green after intentional behavior changes are resolved, unless an explicitly approved contract change changes an expected result.

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
* forcing Observations and Findings into a sequential pipeline merely because their conceptual roles differ
* inventing additional Identity scoring mechanisms solely for tie resolution
* inventing arbitrary near-tie thresholds
* turning Secondary Identity into a second Primary ranking
* adding Finding confidence
* adding Observation rules outside the accepted Phase 1 shortlist
* implementing Recommendation weighting
* redesigning the evidence architecture into one universal schema
* adding Archive State branches unrelated to the locked operational policy
* preserving obsolete frontend duplicate producers such as the removed `generatedesignationBasis()` helper
* rewriting working infrastructure merely because its current implementation is imperfect

---

# 32. Phase 1 Success Criteria

Phase 1 is successful when:

1. Existing intelligence machinery remains intact unless a specific contract conflict requires change.
2. Confidence terminology no longer conflates fundamentally different concepts.
3. Identity and Designation have distinct conceptual responsibilities.
4. Identity eligibility, ranking, and presentation semantics are explicitly defined and implemented consistently.
5. Primary Identity selection remains deterministic.
6. Secondary Identity presentation reflects meaningful support rather than merely positive or near-primary scores.
7. Tie and close-competitor behavior does not rely on arbitrary ordering or invented thresholds.
8. Findings have a defensible boundary from Observations and Genre Signals.
9. Existing Findings have explicit PRESERVE / ELEVATE / DEFER treatment.
10. Elevated Findings provide genuine interpretive meaning and sufficient supporting evidence.
11. Likely duplicate Observation/Finding rules have been investigated rather than blindly deleted.
12. `systems-preference` remains removed in favor of canonical `systems-affinity`.
13. Identity vocabulary is moving toward durable curator-philosophy concepts.
14. Archive evidence informs prioritization without becoming Zach-specific hard-coded logic.
15. Archive State does not produce false certainty from insufficient evidence.
16. No new intelligence behavior depends on an unresolved conceptual decision.
17. Every intentional behavioral change has regression coverage.
18. The current regression suite returns to green after intentional changes are resolved.
19. No unrelated rewrite or redesign has entered Phase 1.

---

# 33. One-Sentence Phase 1 North Star

> **Align the existing deterministic intelligence machinery so Observations demonstrate patterns, Findings interpret conclusions, Designations classify taste, and Identities describe curator philosophy—while preserving recovered behavioral memory and changing only behavior that demonstrably conflicts with the locked conceptual model.**

```

**One thing to flag before you replace it:** I intentionally changed the document from treating the old 227-test number as a "baseline" to treating **247 passing / 1 failing as the current test status**, because your actual latest pytest output is the authoritative state. I also left genuinely implementation-specific work as *implementation gates* rather than calling those conceptual decisions unresolved. That distinction is important for preventing us from reopening the matrix every time we start coding.
```
