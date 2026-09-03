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
**Status:** Reconciled against the completed Identity migration and current implementation state
**Related documents:**

* `intelligence-contract.md`
* `intelligence-forensic-audit.md`
* `phase-1-decision-and-implementation-map.md`
* `roadmap.md`
* `forgotten-features-register.md`

**Current test status:** **245 passing tests / 0 failing tests**

**Historical regression milestones:** 199 → 210 → 218 → 247 passing tests
**Current post-migration baseline: 245 passing tests / 0 failing tests**

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

* Traits
* Genre Signals
* Observations
* Findings
* Designations
* Identities
* Identity-derived traits
* Identity explanations
* Identity findings
* Evidence
* Archive/Profile assembly
* Narrative
* Recommendation infrastructure

The intelligence layer is deterministic and rule/fixture driven.

The current regression suite is:

> **245 passing tests and 0 failing tests**

The suite is currently **green**.

The most recent Identity migration replaced the previous overlapping Identity catalog with three differentiated Identity concepts:

* Interpretive Philosophy
* Exploratory Philosophy
* Breadth Philosophy

The corresponding Identity fixtures and affected tests have been migrated to the new conceptual contract.

The current green suite therefore represents the post-migration regression baseline.

Historical test counts remain useful as development history:

* 199 passing tests — original forensic baseline
* 210 passing tests — earlier Phase 1 baseline
* 218 passing tests — post-forensic test baseline
* 247 passing tests — pre-Identity-migration regression checkpoint
* 245 passing tests — current post-migration green baseline

These counts should not be interpreted as direct measures of system quality or regression severity. Test counts changed as tests were intentionally migrated to the revised conceptual model.

Phase 1 must continue to protect established behavior while allowing explicitly approved conceptual changes.

A Phase 1 change is successful only when:

1. the intended conceptual behavior is implemented
2. unrelated established behavior remains intact
3. affected tests reflect the accepted contract
4. the full suite remains green
5. no unresolved conceptual decision has been implemented prematurely

---

# 3. Phase 1 Status

The forensic and conceptual alignment work has established the major Phase 1 boundaries.

| Area                                 | Status                                                         |
| ------------------------------------ | -------------------------------------------------------------- |
| Repository inventory                 | Complete                                                       |
| Intelligence service inventory       | Complete                                                       |
| Existing behavioral contracts        | Recovered                                                      |
| Identity scoring audit               | Complete                                                       |
| Designation audit                    | Complete                                                       |
| Observation audit                    | Complete                                                       |
| Finding audit                        | Complete                                                       |
| Observation/Finding overlap matrix   | Complete                                                       |
| Evidence audit                       | Complete                                                       |
| Confidence terminology audit         | Complete                                                       |
| Archive-state audit                  | Conceptually complete; implementation remains separately gated |
| Ranking/tie audit                    | Deterministic behavior established and tested                  |
| Identity ontology                    | Complete for current Phase 1 catalog                           |
| Identity evidence mapping            | Complete                                                       |
| Identity fixture contract            | Complete                                                       |
| Identity fixture migration           | Complete                                                       |
| Identity test migration              | Complete                                                       |
| Current regression suite             | **245 passing / 0 failing**                                    |
| Phase 1 documentation reconciliation | In Progress                                                    |

The current Identity catalog is:

* **Interpretive Philosophy**
* **Exploratory Philosophy**
* **Breadth Philosophy**

These concepts are intentionally differentiated from the Designation layer and from one another.

The Identity migration is now an implemented and tested Phase 1 change rather than an unresolved design direction.

The remaining Phase 1 work should therefore focus on reconciling terminology, implementation-specific gates, remaining accepted evidence/behavior work, and documentation.

The implementation should proceed from the decisions captured in:

`phase-1-decision-and-implementation-map.md`

Historical candidate Identities remain useful as development history, but they do not represent the current Identity catalog.

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
- implementing Archive State branching before operational thresholds are
  defined
- implementing Secondary Identity thresholds before the meaningfulness
  policy is defined
- inventing tie or close-competitor behavior outside the locked ranking policy
- adding Finding confidence
- implementing Recommendation weighting

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

- Identity `data_sufficiency` representing archive-volume sufficiency
- Designation confidence behaving as Signal Strength
- Observation confidence behaving as threshold-relative Evidence Strength

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

Finding evidence follows the same explainability principle but does not
require the Observation evidence schema.

Findings must expose sufficient explicit support to explain why the Finding
was produced. That support may consist of Observations, Traits, Genre Signals,
metrics, or other explicitly defined signals.

Do not create a universal evidence schema solely to make Observation and
Finding evidence structurally identical.

Do not force every intelligence subsystem into one universal evidence schema.

The contract requires explainability, not architectural uniformity.

---

## 5.6 Tests Are Part of the Alignment

Every intentional conceptual correction must have corresponding tests.

The test suite is part of the behavioral contract.

Tests should protect meaningful domain behavior rather than merely implementation details.

The current regression status is:

> **245 passing tests and 0 failing tests**

The suite is currently green.

The Identity migration intentionally changed the Identity fixture catalog and corresponding test expectations. The resulting test count should therefore be understood as a new post-migration baseline rather than compared mechanically with the previous 247-test checkpoint.

Every future intentional behavioral change must:

1. have an explicit conceptual reason
2. update the affected tests
3. preserve unrelated established behavior
4. be verified against the full suite

A green suite is required after intentional behavior changes are resolved unless an explicitly approved contract change intentionally changes an expected result.

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
- Observations are ordered by their established Evidence Strength semantics
- Identity ranking is deterministic among eligible candidates
- Primary Identity selection remains deterministic
- Identity scoring uses fixture weights
- Identity contribution breakdowns are available
- Structured Observation evidence exists
- Empty-profile behavior produces empty/zero intelligence rather than fabricated certainty
- Recommendation-bias metadata exists independently of recommendation scoring
- Designations are not emitted as Findings

Tie and close-competitor presentation behavior is governed by the Phase 1
ranking/presentation policy and must not be inferred from incidental sort order.

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

Its actual semantic meaning is aggregate Signal Strength of the Designation Basis.

The field name remains a compatibility concern rather than a mathematical defect.

No replacement Classification Confidence algorithm is required.

**Status:** RESOLVED — terminology/presentation alignment remains.

---

### `designationBasis`

`designationBasis` is a backend-produced summary of the dominant classification signals used to characterize an archive's Designation Basis.

It contains:

- the strongest universal trait
- the second-strongest universal trait
- the strongest media-specific trait

It should not be interpreted as an exhaustive list of every signal that may participate in designation-rule evaluation.

The frontend consumes this backend-produced representation directly.

A legacy frontend `generatedesignationBasis()` helper was found to duplicate the backend behavior without being part of the active production path. The legacy frontend `generatedesignationBasis()` helper has been removed.

The backend `generate_designation_basis()` implementation remains the
authoritative producer of `designationBasis`, which remains an active
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

Identity eligibility, scoring, ranking, and presentation are distinct
concepts and must not be conflated.

The locked Phase 1 model is:

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

---

# 11. Primary Identity

Primary Identity is the single strongest **eligible** Identity classification for the archive.

The conceptual flow is:

```text
Identity candidates
        ↓
Eligibility
        ↓
Deterministic scoring / ranking
        ↓
Primary Identity selection
        ↓
Presentation
```

Eligibility, scoring, ranking, and presentation are separate concerns.

An Identity that is not eligible should not become the Primary Identity merely because its raw score is high enough to outrank eligible candidates.

Among eligible candidates, Primary Identity selection remains deterministic and is governed by the established Identity ranking policy.

Primary Identity selection must remain independent of Designation naming. An Identity should not be selected merely because its name or vocabulary overlaps with the archive's Primary Designation.

Primary Identity selection should remain explainable through the existing Identity scoring and contribution infrastructure.

Required tests should protect:

* deterministic Identity ranking
* eligibility boundaries
* Primary Identity selection
* Primary Identity explainability
* independence from Designation naming
* behavior when insufficient-data identities are present
* deterministic behavior when competing eligible identities have equal or near-equal scores

**Classification:** PRESERVE + ALIGNMENT + TESTING


---

# 12. Secondary Identities

The contract allows:

> zero or more meaningful Secondary Identities

Secondary Identities are not simply every eligible Identity that receives a nonzero score.

The system should distinguish:

```text
Eligibility
    ↓
Eligible Identity candidates
    ↓
Ranking
    ↓
Primary Identity
    ↓
Secondary meaningfulness evaluation
    ↓
Zero or more Secondary Identities
```

A Secondary Identity should be presented only when it provides meaningful additional information about the archive.

Secondary meaningfulness should consider:

1. **Eligibility / Data Sufficiency**
   The Identity must have sufficient archive data to be meaningfully evaluated.

2. **Signal Strength**
   The Identity must demonstrate enough trait alignment to represent a substantive classification rather than a weak residual score.

3. **Competitive separation**
   The Identity must not merely appear because it received a small nonzero score. Its result should represent a meaningful classification relative to the other eligible candidates.

4. **Distinct interpretive value**
   A Secondary Identity should add useful information beyond simply repeating the Primary Identity or reflecting an effectively indistinguishable classification.

The Primary Identity is always selected from the ranked eligible candidates.

Secondary Identities are a **presentation decision applied after ranking**, not additional Primary Identity selections.

The system should therefore be capable of producing:

```text
Primary Identity: one
Secondary Identities: zero or more
```

A profile with only one meaningful Identity should not be forced to display additional Secondary Identities merely to satisfy a cardinality requirement.

Likewise, an Identity should not become a Secondary Identity solely because it has a score greater than zero.

Numeric thresholds for Signal Strength, competitive separation, and distinctiveness should be introduced only where required by the implementation and should remain explicit, deterministic, and testable.

**Classification:** LOCKED POLICY + TARGETED IMPLEMENTATION + TESTING


---

# 13. Ties and Close Competitors

Identity and Designation ranking must remain deterministic, but deterministic ordering must not be treated as evidence that a small score difference represents a meaningful classification difference.

The system distinguishes:

* **Exact ties** — candidates have the same effective ranking score.
* **Close competitors** — candidates have scores sufficiently close that the difference may not represent a meaningful distinction.
* **Strong-vs-weak differences** — the leading candidate has a materially stronger result than the alternatives.

Ranking and presentation are separate concerns.

```text
Candidates
    ↓
Eligibility
    ↓
Deterministic ranking
    ↓
Primary selection
    ↓
Close-competitor evaluation
    ↓
Secondary / presentation decision
```

## Exact Ties

Exact ties must resolve deterministically.

The system should use an explicit, stable tie-breaking policy rather than relying on incidental ordering such as dictionary insertion order or fixture order.

The tie-breaking mechanism should not alter the underlying scores.

## Close Competitors

A close competitor is not automatically a Secondary Identity or Secondary Designation.

Near-equality in score is a signal that presentation may need to acknowledge competitive ambiguity, but the candidate must still satisfy the applicable meaningfulness and presentation rules.

A close competitor may therefore:

* be presented as a Secondary Identity when it is independently meaningful
* remain ranked internally without being presented
* have no effect on the Primary Identity when the Primary remains clearly selected by the established ranking policy

The same principle applies to Designations where close-competitor presentation is supported.

## Score Precision

The system must use the established score representation consistently when determining equality and ranking.

Do not introduce arbitrary rounding solely to manufacture or eliminate ties.

## Policy Boundary

The existence of a close competitor must not cause the system to invent a new classification state or replace deterministic Primary selection with an ambiguous result.

The purpose of the policy is to prevent presentation from overstating certainty, not to make the underlying deterministic intelligence non-deterministic.

Any numeric near-tie threshold required by implementation should be explicit, deterministic, documented, and covered by regression tests.

**Classification:** LOCKED POLICY + TARGETED IMPLEMENTATION + TESTING


---

# 14. Alignment Area 8 — Findings vs. Observations

## Locked Conceptual Distinction

| Layer       | Question                          |
| ----------- | --------------------------------- |
| Observation | What can we directly demonstrate? |
| Finding     | What does the evidence suggest?   |

An Observation identifies a demonstrated pattern or signal.

A Finding provides an interpretive conclusion about what that evidence means.

A Finding therefore exists to provide **additional meaning**, not merely another name for an existing signal.

---

## Important Forensic Clarification

The conceptual distinction does **not** require the current implementation to become a pipeline:

```text
Observations
↓
Findings
```

The current Observation and Finding rule systems are independently evaluated.

Neither subsystem is required to directly consume the other.

Phase 1 should therefore preserve their independent rule machinery while ensuring that the semantic responsibility of each layer remains distinct.

---

## Finding Purpose

Every Finding should have a clear interpretive purpose.

The purpose should answer:

> **What does this evidence mean about the archive?**

A Finding should communicate a conclusion that is more meaningful than simply reporting the signal that caused it to fire.

If the purpose of a Finding cannot be distinguished from the underlying Observation, Trait, Genre Signal, or metric, the Finding should be treated as a candidate for consolidation or removal rather than preserved solely because it has a distinct identifier.

---

## Operational Test

Ask:

> **If the Finding were removed and replaced with its underlying Observation, Trait, Genre Signal, or raw metric, would meaningful information be lost?**

* **Yes** → the Finding likely provides legitimate interpretive value.
* **No** → the Finding is probably duplicating a lower-level signal and should be reviewed.

This test does not require Findings to synthesize multiple signals. A single signal may support a valid Finding when the Finding provides a genuinely distinct interpretive conclusion.

---

## Findings May

* synthesize multiple Observations
* synthesize Traits
* synthesize Genre Signals
* synthesize quantitative evidence
* provide a meaningful interpretive frame
* use a single signal when that signal gains genuine additional meaning through interpretation

---

## Findings Must Not

* merely restate an Observation
* merely restate a Genre Signal percentage
* duplicate a rule condition under a new ID
* become a second Designation layer
* exist solely because the underlying signal already has a different name

**Classification:** ALIGNMENT + CLARIFICATION + TESTING

---

# 15. Observation / Finding Forensic Overlap

The forensic audit established the following cross-layer relationships.

These relationships are used to distinguish genuine semantic duplication from legitimate signal sharing.

Shared evidence does **not** by itself establish duplication. A Finding may use the same underlying signal as an Observation when it provides a distinct interpretive conclusion.

## Resolved Rule-Level Duplicate

### `systems-affinity` ↔ `systems-preference`

**RESOLVED:** `systems-preference` did not provide distinct interpretive meaning beyond `systems-affinity`.

Both rules were driven by `gameplay_mechanics >= 9` and expressed substantially the same interpretation. Maintaining both therefore duplicated one concept rather than providing complementary intelligence.

The former `systems-preference` Finding has been removed.

`systems-affinity` is the canonical surviving Observation for this concept.

This was a semantic consolidation decision, not a change to the parallel architecture of the intelligence systems.

Findings, Observations, Designations, Identities, and Narrative remain independent systems.

**Status:** RESOLVED — consolidated into `systems-affinity`

---

## Possible Overlap Requiring Review

### `atmospheric-focus` ↔ `atmospheric-interest`

These rules substantially overlap in their evaluated signals and appear likely to represent the same phenomenon at two layers.

However, overlap in evaluated signals is not sufficient by itself to justify deletion.

The remaining question is whether `atmospheric-interest` provides a distinct interpretive conclusion that is meaningfully different from `atmospheric-focus`.

Apply the Finding Purpose test:

> If `atmospheric-interest` were removed and replaced with the underlying Observation or signal, would meaningful information be lost?

Until that question is resolved, neither rule should be removed solely because of signal overlap.

**Status:** UNRESOLVED — targeted semantic review

---

## Partial Overlaps

Several Observation/Finding pairs share individual signals while differing in conjunctions or interpretation.

Examples include:

* `boundary-preference` ↔ `concept-driven`
* `boundary-preference` ↔ `speculative-interest`
* `boundary-preference` ↔ `atmospheric-interest`
* `interpretive-depth` ↔ `concept-driven`

These are **not duplicates merely because they share one or more signals**.

They should be retained unless their interpretive conclusions are shown to be materially redundant.

**Status:** PRESERVE pending evidence of genuine duplication

---

## Distinct Concepts

The audit found no simple Finding counterpart for:

* `emotional-resonance`
* `craft-appreciation`
* `engagement-priority`
* several speculative and systems-related Observations

Likewise, several Findings have no Observation twin.

This supports the conclusion that the Observation/Finding distinction is not merely two names for the same rule layer.

---

## Review Rule

When evaluating remaining Observation/Finding overlap:

1. identify the underlying signal or evidence
2. identify the interpretive conclusion
3. determine whether the Finding communicates meaning not already available from the underlying signal
4. preserve the Finding when that additional meaning is substantive
5. consolidate or remove it when no meaningful information would be lost

Do not perform mass deletion based solely on naming overlap or shared inputs.

**Classification:** FORENSIC RECORD + TARGETED REVIEW

---

# 16. Finding Catalog Treatment

The Finding catalog should be handled conservatively.

Finding treatment is governed by the distinction established in Sections 14 and 15:

> A Finding should be preserved when it provides a meaningful interpretive conclusion that is not already communicated by its underlying signal or Observation.

The current forensic classifications are:

| Finding                | Treatment                  |
| ---------------------- | -------------------------- |
| `concept-driven`       | PRESERVE                   |
| `engagement-priority`  | ELEVATE / PURPOSE REQUIRED |
| `systems-preference`   | REMOVED / CONSOLIDATED     |
| `speculative-interest` | ELEVATE / PURPOSE REQUIRED |
| `atmospheric-interest` | DEFER / POSSIBLE DUPLICATE |

## Resolved Treatment

### `systems-preference`

`systems-preference` has been removed because its evidence and interpretation were materially redundant with `systems-affinity`.

The canonical surviving concept is `systems-affinity`.

**Status:** RESOLVED

---

## Findings Requiring Purpose Clarification

### `engagement-priority`

Retain pending clarification of its interpretive purpose.

The required question is:

> What does `engagement-priority` tell us about the archive that its underlying evidence does not already communicate?

If the Finding provides a genuine interpretive conclusion, preserve and elevate its role.

If it merely restates an underlying signal or Observation, consolidate or remove it.

**Status:** PURPOSE REVIEW REQUIRED

---

### `speculative-interest`

Retain pending clarification of its interpretive purpose.

Apply the same Finding Purpose test:

> What interpretive conclusion does `speculative-interest` provide beyond its underlying Observation, Trait, Genre Signal, or metric?

A shared signal is not sufficient reason for deletion.

**Status:** PURPOSE REVIEW REQUIRED

---

### `atmospheric-interest`

Defer final treatment pending targeted semantic review against `atmospheric-focus`.

The existence of overlapping signals does not establish that the Finding is redundant.

Apply the Finding Purpose test before making a removal decision.

**Status:** DEFERRED — POSSIBLE DUPLICATE

---

## Catalog Rule

No Finding should be added, removed, or elevated solely because of:

* naming similarity
* shared evidence
* shared thresholds
* overlap with an Observation
* overlap with another Finding

The determining question is whether the Finding provides **distinct interpretive meaning**.

Any intentional catalog change must be accompanied by regression coverage protecting the intended semantic behavior.

**Classification:** CATALOG POLICY + TARGETED REVIEW + TESTING

---

# 17. Finding Evidence

Findings must expose sufficient supporting evidence to explain why the Finding was produced.

Evidence may include:

* Observations
* Traits
* Genre Signals
* quantitative metrics
* other explicitly defined archive signals

The evidence presented should correspond to the actual conditions or signals used by the Finding rule.

Finding evidence does not need to reproduce the Observation evidence schema.

The requirement is:

> **Why does the system think this?**

not:

> **Does every subsystem use the same JSON structure?**

Evidence should support the Finding's interpretive conclusion rather than merely restating the Finding itself.

A Finding may use a single underlying signal when that signal provides the basis for a distinct interpretive conclusion.

Where a Finding synthesizes multiple signals, the evidence should make the relevant contributing signals identifiable.

Finding evidence should remain deterministic and explainable.

**Classification:** EVIDENCE + EXPLAINABILITY + TESTING

---

# 18. Confidence / Strength Semantics

The intelligence layer must distinguish the following concepts:

| Concept                   | Meaning                                              |
| ------------------------- | ---------------------------------------------------- |
| Signal Strength           | Magnitude of an expressed signal                     |
| Data Sufficiency          | Whether enough data exists to evaluate something     |
| Evidence Strength         | Support provided by available evidence               |
| Classification Confidence | Relative certainty between competing classifications |

These concepts describe different semantic dimensions.

They should not be treated as interchangeable merely because existing implementation fields use similar names or numeric ranges.

In particular:

* **Identity score** represents trait alignment with an Identity.
* **Identity data sufficiency** represents archive-volume sufficiency for evaluating that Identity.
* **Designation score** represents the strength of the signals supporting a Designation.
* **Observation confidence** represents threshold-relative Evidence Strength for the Observation's designated supporting metric.
* **Finding evaluation** is currently binary and does not expose a confidence value.

The presence of these conceptual categories does **not** require four universal numerical fields.

Only expose a distinct field when the API, UI, explanation layer, or decision logic actually requires the distinction.

Do not infer statistical probability, objective correctness, or Classification Confidence from a field merely because it is named `score` or `confidence`.

No generalized Classification Confidence algorithm belongs in Phase 1.

Finding confidence remains intentionally absent.

**Classification:** TERMINOLOGY + SEMANTIC BOUNDARIES + PRESERVE

---

# 19. Archive State Behavior

The intelligence layer recognizes three operational archive states:

* **EMPTY**
* **SPARSE**
* **ESTABLISHED**

Archive State is determined from archive volume using explicit operational thresholds.

The locked Phase 1 model is:

```text
0 entries
    ↓
EMPTY

1–9 entries
    ↓
SPARSE

10+ entries
    ↓
ESTABLISHED
```

These thresholds describe **archive maturity**, not the validity or quality of the user's taste.

## EMPTY

An archive with zero completed entries is `EMPTY`.

The intelligence layer should not fabricate meaningful personalization from an empty archive.

Expected behavior includes:

* no meaningful Identity classification
* no meaningful Designation classification
* no Findings requiring archive evidence
* no evidence-based observations
* empty or zero-valued aggregate intelligence where appropriate

## SPARSE

An archive with 1–9 completed entries is `SPARSE`.

Sparse archives may produce legitimate intelligence when the relevant subsystem has sufficient evidence to do so.

However, sparse data should not be presented as equivalent to an established archive.

Subsystem-specific requirements remain valid.

For example:

* an Observation may fire from a small number of qualifying signals
* a Trait may be calculable
* an Identity may remain ineligible because its own minimum-entry requirement is not satisfied
* a Designation may require more genre coverage or qualifying evidence

`SPARSE` therefore does not mean "no intelligence."

It means that the archive has limited volume and downstream systems must respect their own evidence requirements.

## ESTABLISHED

An archive with 10 or more completed entries is `ESTABLISHED`.

This indicates that the archive has crossed the general Phase 1 maturity threshold for established intelligence.

`ESTABLISHED` does not override subsystem-specific requirements.

An Identity may still be ineligible if its own `minimum_entries` requirement is higher.

An Observation may still require specific metrics.

A Designation may still require specific genre or signal coverage.

## Archive State Is Not Confidence

Archive State must not be interpreted as:

* classification confidence
* recommendation quality
* taste quality
* statistical certainty
* strength of individual signals

It is an operational description of available archive volume.

The core rule is:

> **Insufficient data should produce insufficient evidence, not false certainty.**

Archive State provides a shared maturity context while allowing individual intelligence subsystems to enforce stricter requirements where necessary.

**Classification:** LOCKED POLICY + IMPLEMENTATION + TESTING

---

# 20. Partial Data

The intelligence layer should tolerate incomplete information where practical.

Potential conditions include:

* missing scores
* missing genres
* incomplete media-specific metrics
* limited genre coverage
* partially populated archives
* missing optional profile fields

Missing information should reduce the evidence available to the affected subsystem rather than being interpreted as evidence that the missing condition is absent or present.

The system should degrade gracefully rather than fabricate certainty.

Examples:

* a missing metric should not be treated as a zero unless the specific rule explicitly defines that behavior
* a missing genre should not be treated as evidence against a genre preference
* an Identity requiring a missing or insufficient signal should not receive artificial support from the absence of that signal
* an Observation requiring unavailable evidence should not fire merely because other profile data exists
* incomplete data may cause a candidate to become ineligible without invalidating unrelated intelligence

Partial-data handling should respect each subsystem's existing evidence requirements.

Archive State provides general context for archive volume, but it does not replace subsystem-specific data requirements.

The implementation should preserve meaningful intelligence that can still be supported while preventing unsupported conclusions.

**Core rule:**

> **Missing evidence is not negative evidence, and unavailable evidence is not positive evidence.**

Partial-data behavior should be covered by targeted regression tests wherever it affects classification, evidence, eligibility, ranking, or presentation.

**Classification:** PRESERVE + SAFETY RULE + TESTING

---

# 21. Ranking / Tie Behavior

Ranking must be deterministic, explicit, and separate from presentation.

Before changing any ranking operation, inspect:

* sort key
* score precision
* tie behavior
* stable ordering
* eligibility filtering
* primary selection
* secondary presentation
* close-competitor handling
* whether Python, dictionary, fixture, or file-system ordering can affect results

The conceptual ranking flow is:

```text id="8h2m4k"
Candidates
    ↓
Eligibility
    ↓
Scoring
    ↓
Deterministic ranking
    ↓
Primary selection
    ↓
Close-competitor evaluation
    ↓
Secondary / presentation decision
```

## Exact Ties

Exact ties must resolve deterministically.

Tie resolution must use an explicit and stable policy rather than relying on incidental ordering.

The tie-breaking mechanism must not alter the underlying scores.

## Close Competitors

A close competitor is not automatically a Secondary Identity or Secondary Designation.

Near-equality in score may affect presentation, but does not make ranking itself ambiguous.

The Primary Identity remains the highest-ranked eligible candidate according to the established deterministic ranking policy.

A close competitor may be presented as a Secondary Identity only if it independently satisfies the Secondary Identity meaningfulness policy.

The same principle applies to Designations where close-competitor presentation is supported.

## Preservation Rule

Where existing deterministic ranking behavior does not conflict with the locked conceptual policy, preserve it.

Do not change ranking merely to make ordering appear cleaner.

Do not invent arbitrary near-tie thresholds solely to force a particular presentation outcome.

Any required threshold or tie-breaking rule must be explicit, deterministic, documented, and covered by regression tests.

**Classification:** LOCKED POLICY + TARGETED IMPLEMENTATION + TESTING

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

The following decisions have been established and are no longer unresolved conceptual gates:

* Identity eligibility semantics
* Identity ranking vs. presentation
* Secondary Identity meaningfulness
* Tie / close-competitor policy
* Finding purpose statements for ELEVATE candidates
* Finding evidence model where needed
* Phase 1 Observation shortlist
* Archive-state operational thresholds

These decisions are now available to guide implementation and testing.

The remaining Phase 1 gates are implementation-level or catalog-level decisions that must still be resolved before dependent behavior is changed:

* final Identity shortlist
* per-Identity signal definitions
* per-field API/frontend rename and compatibility plan
* Finding confidence semantics, if the API or presentation layer ultimately requires such a concept
* any remaining Finding catalog decisions identified during implementation
* any remaining Observation changes identified by the locked Phase 1 shortlist

The following principles remain in force:

* Do not silently introduce behavior that depends on an unresolved conceptual decision.
* Do not invent new scoring mathematics where existing calculations are already semantically valid.
* Do not implement Recommendation weighting as part of Phase 1.
* Do not introduce Archive State branching beyond the locked operational thresholds.
* Do not introduce Secondary Identity behavior outside the locked meaningfulness and presentation policy.
* Do not invent additional tie or close-competitor behavior outside the locked ranking policy.
* Do not expand the Observation or Finding catalogs merely for variety.

Machinery-only work may proceed where it does not depend on an unresolved decision.

**Classification:** UPDATED — remaining gates are implementation/catalog decisions rather than unresolved conceptual policy.

---

# 28. Recommended Phase 1 Work Order

The conceptual alignment work has established the major Phase 1 policies. The remaining work should now proceed from those locked decisions rather than reopening previously settled questions.

## 1. Reconcile terminology

**Allowed:** Yes, subject to field-level mapping.

Correct misleading terminology without changing valid underlying calculations.

Account for the full API/frontend blast radius of any field-level terminology change.

---

## 2. Complete Identity catalog evolution

**Allowed:** Yes.

Use the locked Identity eligibility, ranking, presentation, secondary-meaningfulness, and tie/close-competitor policies to finalize the Identity catalog.

Define:

* final Identity shortlist
* per-Identity signal definitions
* Identity evidence/explanation requirements where needed

Do not redesign the Identity scoring machinery merely for conceptual cleanliness.

---

## 3. Implement locked Identity ranking and presentation policy

**Allowed:** Yes.

Implement only the behavior established by the locked decisions for:

* eligibility
* scoring
* ranking
* primary selection
* Secondary Identity meaningfulness
* tie / close-competitor handling
* presentation

Add regression coverage for each intentional behavioral change.

---

## 4. Finding boundary work

**Allowed:** Yes.

Preserve `concept-driven`.

Apply the established treatment of:

* `engagement-priority`
* `systems-preference` — RESOLVED / REMOVED
* `speculative-interest`
* `atmospheric-interest`

Do not mass-delete Findings.

Implement Finding purpose statements where established by the locked policy.

---

## 5. Finding evidence

**Allowed:** Yes, where required.

Add sufficient explicit supporting evidence to Findings where the current implementation lacks meaningful explanation.

Evidence may reference:

* Observations
* Traits
* Genre Signals
* quantitative metrics
* other explicitly defined archive signals

Do not create a universal evidence schema.

Do not add Finding confidence unless a concrete API or presentation requirement establishes a need for it.

---

## 6. Observation changes

**Allowed:** Yes, according to the locked Phase 1 Observation shortlist.

Existing Observation machinery remains protected.

Do not add or remove Observations outside the established shortlist without a separate decision.

---

## 7. Archive-state implementation

**Allowed:** Yes.

Implement Archive State behavior using the locked operational thresholds.

Archive State must remain a contextual data-sufficiency concept and must not be used to manufacture certainty.

Do not introduce additional state-dependent behavior that is not supported by the locked policy.

---

## 8. API / frontend compatibility

**Allowed:** Yes.

Trace intentional terminology and behavior changes through:

* backend models
* calculation layers
* API response models
* serialization
* frontend consumers
* `charts.js`
* narrative consumers
* tests
* fixtures

Complete the per-field rename and compatibility plan before changing externally consumed fields.

---

## 9. Preserve and test recovered behavioral contracts

Continue protecting:

* normalization differences
* derived-trait behavior
* deterministic ranking
* evidence structures
* empty-profile behavior
* recommendation-bias metadata
* primary selection behavior
* other recovered behavior not directly contradicted by a locked Phase 1 decision

---

## 10. Regression

Run the full suite after every intentional behavior change.

Current test status:

> **247 passing tests and 1 failing test**

The existing failure is an unresolved Designation regression involving the `deep_diver` fixture and the updated `boundary_explorer` evidence model.

Final Phase 1 expectation:

> **All existing behavior remains green except for explicitly approved changes, with regression coverage for every intentional behavioral change.**

The current failing test must be resolved or explicitly classified as an approved behavioral change before Phase 1 can be considered complete.

---

## 11. Deferred work

The following remain outside Phase 1 implementation:

* Recommendation weighting
* future soft-signal weighting
* Recommendation Engine redesign
* unrelated architecture changes
* new intelligence concepts not required by the locked Phase 1 model

**Classification:** UPDATED — work order now reflects the locked Phase 1 decisions and current implementation state.

---

# 29. Phase 1 Success Criteria

Phase 1 is successful when:

1. Existing intelligence machinery remains intact unless a specific contract conflict or locked Phase 1 decision requires change.

2. Confidence terminology no longer conflates fundamentally different concepts, while valid underlying calculations remain preserved.

3. Identity and Designation have distinct conceptual responsibilities.

4. Identity eligibility, scoring, ranking, primary selection, Secondary Identity meaningfulness, and presentation behavior conform to the locked Phase 1 policies.

5. Tie and close-competitor behavior conforms to the locked ranking/presentation policy and does not depend on incidental ordering.

6. Findings have a defensible boundary from Observations and Genre Signals.

7. Existing Findings have explicit treatment based on their established purpose, including PRESERVE, CLARIFY, ELEVATE, DEFER, or CONSOLIDATE decisions where applicable.

8. Findings provide sufficient explicit evidence to explain why they were produced where evidence is required.

9. Likely duplicate Observation/Finding rules have been investigated and resolved according to their semantic relationship rather than their names alone.

10. The Identity catalog is moving toward durable curator-philosophy concepts rather than user-specific personality labels.

11. Archive State behavior uses the locked operational thresholds and does not manufacture certainty from insufficient data.

12. Archive evidence informs prioritization without becoming Zach-specific hard-coded logic.

13. No new intelligence behavior depends on an unresolved conceptual decision.

14. Every intentional behavioral change has regression coverage.

15. The full test suite returns to green except where an explicitly approved Phase 1 behavioral change intentionally alters an expected result.

16. No unrelated rewrite, architectural redesign, or Recommendation Engine implementation has entered Phase 1.

17. API and frontend consumers remain compatible with intentional terminology and behavior changes, or those changes are explicitly accounted for in the field-level compatibility plan.

18. Recovered behavioral contracts that do not conflict with the locked Phase 1 model remain preserved.

### Current Regression Status

The current `develop-3` regression suite reports:

> **245 passing tests / 0 failing tests**

The suite is currently **green**.

The previous 247-passing checkpoint represented the pre-Identity-migration test state. The Identity catalog and affected tests were subsequently migrated to the accepted Phase 1 Identity contract, resulting in the current 245-test baseline.

The change in test count is therefore not itself evidence of regression.

The meaningful requirement is that the current suite passes and that every intentional behavioral change is represented by corresponding regression coverage.

### Phase 1 regression requirement

> **All current tests pass, and every intentional behavioral change is protected by tests that reflect the accepted conceptual contract.**

A future failure must be treated as either:

1. an implementation defect,
2. a stale test expectation,
3. or an explicitly approved behavioral change.

A failing test must not be hidden by treating an earlier passing count as authoritative.


---

# 30. One-Sentence Phase 1 North Star

> **Align the existing deterministic intelligence machinery so Observations demonstrate patterns, Findings interpret conclusions, Designations classify taste, and Identities describe curator philosophy—while preserving recovered behavioral memory and changing only behavior that demonstrably conflicts with the locked conceptual model.**
