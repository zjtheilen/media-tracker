```
__    __ ___    ___ ___  ____ ___
\ \/\/ // _ \  _\\ / _ \ | D )| |
 \_/\_//_/ \_\/__//_/ \_\|_D_)|_|
 Weighted Archive System for Analysis & Behavioral Insights
```

# Phase 1 — Terminology and API Rename Map

**Project:** Media Tracker

**Authoritative branch:** `develop-3`

**Status:** Reconciled reference

**Source of truth:** `phase-1-intelligence-alignment.md`

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document maps existing implementation terminology to the reconciled
Phase 1 semantic vocabulary.

Its purpose is to prevent terminology changes from being made in isolation.

A terminology change is complete only when its full downstream blast radius has
been considered, including:

* backend models
* calculation layers
* API response models
* serialization
* frontend consumers
* charts and visualizations
* narrative consumers
* tests
* fixtures
* future Profile consumers

This document is an implementation-alignment aid.

It does not independently redefine the Intelligence Contract.

Where this document conflicts with `phase-1-intelligence-alignment.md`, the
reconciled Intelligence Alignment document takes precedence.

---

# 2. Core Terminology

The Phase 1 conceptual vocabulary is:

| Concept                   | Meaning                                                        |
| ------------------------- | -------------------------------------------------------------- |
| Signal Strength           | How strongly a quality or signal is expressed                  |
| Data Sufficiency          | Whether enough archive data exists to evaluate a conclusion    |
| Evidence Strength         | How strongly available evidence supports a conclusion          |
| Classification Confidence | How clearly one classification outranks plausible alternatives |

> **Historical / retired concept:** Classification Confidence is no longer part
> of the active intelligence implementation. It is retained in this document
> only to record the terminology decision and prevent its accidental
> reintroduction.

These concepts are distinct.

They must not be collapsed merely because an existing implementation field
uses the generic name `confidence`.

---

# 3. Current Field Mapping

| Current field                       | Actual meaning                                                                | Contract term                    | Proposed treatment                                                                                     | Status                 |
| ----------------------------------- | ----------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------- |
| Identity `data_sufficiency`         | Archive-data sufficiency relative to the Identity's minimum-data requirement  | Data Sufficiency                 | Preserve calculation and API behavior                                                                  | RESOLVED / PRESERVE    |
| Identity `score`                    | Strength of the archive's trait alignment with the Identity                   | Signal Strength / Identity Score | Preserve calculation and semantics                                                                     | RESOLVED / PRESERVE    |
| Designation `designationConfidence` | Aggregate designation signal strength derived from designation scoring inputs | Signal Strength                  | Preserve calculation; correct terminology where presented as confidence                                | RESOLVED / TERMINOLOGY |
| Observation `confidence`            | Threshold-relative support for the Observation's designated supporting signal | Evidence Strength                | Preserve existing calculation; clarify semantics; public rename remains a separate downstream decision | RESOLVED / CLARIFY     |
| Finding `confidence`                | Not yet standardized                                                          | UNRESOLVED                       | Do not add, rename, or assign semantics until Finding confidence is explicitly defined                 | DEFERRED               |
| Designation `score`                 | Degree to which the archive fits a Designation's rule/classification          | Designation Score                | Preserve                                                                                               | RESOLVED / PRESERVE    |
| Identity ranking                    | Relative ordering of eligible Identity candidates                             | Ranking                          | Preserve deterministic behavior pending explicit policy changes                                        | RESOLVED / PRESERVE    |
| Primary Identity                    | Highest-ranked eligible Identity selected for primary presentation            | Primary Identity                 | Preserve                                                                                               | RESOLVED / PRESERVE    |
| Secondary Identities                | Additional meaningful Identity candidates                                     | Secondary Identities             | Preserve concept; meaningfulness threshold remains unresolved                                          | DEFERRED               |
| Designation ranking                 | Relative ordering of Designation candidates                                   | Ranking                          | Preserve deterministic behavior                                                                        | RESOLVED / PRESERVE    |
| Primary Designation                 | Highest-ranked Designation selected for Profile presentation                  | Primary Designation              | Preserve                                                                                               | RESOLVED / PRESERVE    |

---

# 4. Identity `data_sufficiency`

## Current field

`data_sufficiency`

## Contract meaning

**Data Sufficiency**

Data Sufficiency answers:

> Does the archive contain enough information for this Identity to be
> meaningfully evaluated?

It is related to an Identity's minimum-data requirement.

It does not answer:

> How strongly does the archive fit this Identity?

That is the role of Identity score.

It also does not answer:

> How clearly does this Identity beat competing identities?

That is conceptually closer to Classification Confidence.

## Treatment

Preserve the existing `data_sufficiency` calculation and API behavior unless a
specific implementation audit identifies a direct contract conflict.

Do not rename it to `confidence`.

Do not merge it with Identity `score`.

## Status

**RESOLVED / PRESERVE**

---

# 5. Identity `score`

## Current field

`score`

## Contract meaning

Identity score represents the strength of the archive's alignment with the
Identity's defined signals and scoring weights.

Conceptually:

```text
Identity score
=
strength of alignment with the Identity
```

It is not Data Sufficiency.

It is not automatically Classification Confidence.

## Treatment

Preserve the existing calculation and deterministic ranking machinery unless
the Identity eligibility audit establishes a direct conceptual conflict.

## Status

**RESOLVED / PRESERVE**

---

# 6. Identity Eligibility, Ranking, and Presentation

These concepts must remain separate.

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

The existence of `data_sufficiency` does not by itself establish that an
Identity must be removed from every internal ranking collection.

Likewise, a score does not by itself establish that an Identity should be
presented to the user.

The exact relationship between eligibility, ranking, presentation, and
primary/secondary selection must be explicitly defined before behavior is
changed.

## Treatment

Do not collapse these concepts into one field or one gate merely for
implementation convenience.

## Status

**RESOLVED / SEMANTIC DISTINCTION**

**Operational behavior:** requires explicit implementation alignment.

---

# 7. Designation `designationConfidence`

## Current field

`designationConfidence`

## Actual meaning

The existing value functions as a designation-related signal derived from
designation scoring inputs, including trait-based scoring.

It should not automatically be interpreted as statistical or comparative
Classification Confidence.

## Contract term

**Signal Strength**

where the value represents the strength of the designation's underlying
classification signal.

## Treatment

Preserve the existing calculation unless a specific contract conflict is
identified.

Correct misleading presentation terminology.

Do not invent a new Classification Confidence calculation merely because the
field is named `designationConfidence`.

A future Classification Confidence concept may be introduced only if the
application actually requires it and its semantics are explicitly defined.

## Status

**RESOLVED / TERMINOLOGY**

The existing API field `designationConfidence` and its underlying calculation are preserved.

The existing `designationConfidenceLabel` field is also preserved.

The complete consumer audit found no downstream API or frontend contract requiring a field rename during Phase 1.

The frontend presentation already uses **Signal Strength** as the user-facing terminology:

`Signal Strength`

with the existing designation label and numeric value.

The internal frontend variable `confidenceLabel` is retained because it does not expose the misleading terminology to users and renaming it would provide no meaningful architectural benefit.

The internal calculation name `calculate_designation_confidence()` is also retained to avoid unnecessary implementation churn.

No Classification Confidence calculation is introduced by this audit.

**Designation `designationConfidence` consumer audit: COMPLETE.**

---

# 8. Observation `confidence`

## Current field

`confidence`

## Actual meaning

Observation `confidence` is an active threshold-relative measure of support for
the Observation's designated supporting signal.

It describes how strongly the designated supporting metric supports the
Observation relative to that metric's threshold.

It does not represent:

* statistical confidence
* probability
* certainty that the Observation is objectively correct
* generalized confidence across every condition in the rule

An Observation may require multiple predicate conditions while using one
designated supporting metric as the basis for its numerical Evidence Strength.

This distinction is intentional.

## Contract term

**Evidence Strength**

## Treatment

Preserve the existing calculation.

Clarify documentation and presentation so the value is not presented as
generic confidence.

A public API rename should occur only after the complete Observation consumer
blast radius has been audited.

**## Status**

**RESOLVED / TERMINOLOGY**

The Observation output field has been renamed from `confidence` to `evidenceStrength`.

The existing threshold-relative calculation and ranking behavior are preserved.

The rule-level calculation now uses the internal `evidence_strength` key, which maps to the output field `evidenceStrength`.

The internal helper `score_confidence()` is intentionally preserved during Phase 1. Its current implementation calculates the threshold-relative value used as Observation Evidence Strength, but renaming the helper would introduce implementation churn without resolving an active API or behavioral contract issue.

Updated consumers:

* `models/services/observation_rules.py`
* `models/services/observation_mapper.py`
* `models/services/observation_engine.py`
* `tests/designations/test_observations.py`
* `tests/services/test_archive_engine.py`

Targeted regression coverage: **29 tests passing.**

No new Classification Confidence calculation was introduced.

The Observation terminology migration is complete for Phase 1.

The remaining generic `confidence` references associated with Designation calculations are governed by the separate Designation terminology decision and are not part of this Observation rename.

---

# 9. Finding `confidence`

## Current implementation

No Finding `confidence` field currently exists.

Finding generation currently produces descriptive findings with structured
evidence, but does not calculate or expose a Finding confidence value.

This applies to both rule-generated Findings and identity-derived Findings.

## Contract meaning

No Finding confidence semantics are currently defined.

The Phase 1 contract therefore does not require a Finding confidence field.

## Treatment

Do not:

* invent Finding confidence mathematics
* add a confidence field merely for consistency with other subsystems
* rename an absent field
* assign Finding confidence the semantics of Evidence Strength
* assign Finding confidence the semantics of Classification Confidence

If a future Finding confidence concept becomes necessary, its semantics must
be explicitly defined before implementation.

## Status

**RESOLVED / NOT IMPLEMENTED**

No code change is required.
---

# 10. Classification Confidence

# 10. Classification / Classification Confidence

## Current implementation

The project does not currently implement a separate Classification subsystem.

No Classification API field, calculation, consumer, test fixture, or frontend
presentation remains in the current implementation.

Classification Confidence therefore has no active implementation to rename or
migrate.

## Historical / conceptual meaning

Classification Confidence was previously considered as a possible concept for
representing comparative confidence between competing classifications.

That concept is no longer part of the active Phase 1 intelligence contract.

The project instead uses explicit domain concepts:

* **Designation** for the selected taste classification
* **Designation Signal Strength** for the strength of the Designation signal
* **Identity** for the selected broader interpretive profile
* **Identity Data Sufficiency** for the sufficiency of evidence supporting an
  Identity
* **Observation Evidence Strength** for threshold-relative support of an
  Observation

These concepts should not be collapsed back into a generic Classification
Confidence field.

## Treatment

Do not reintroduce Classification as a separate intelligence layer merely to
resolve terminology.

Do not introduce Classification Confidence for terminology consistency.

Do not rename an existing Designation or Identity score to Classification
Confidence.

If a future feature requires comparative candidate separation, that should be
defined as a new explicit contract rather than reviving the retired
Classification concept.

## Status

**RESOLVED / RETIRED**

Classification is not part of the current intelligence implementation.

No production code change, API rename, frontend change, test change, or
fixture change is required.

---

# 11. Evidence Strength

Evidence Strength answers:

> How strongly does the available evidence support the conclusion?

The concept is currently most directly applicable to Observation support.

It may eventually be used elsewhere where an explicit evidence model requires
it.

Evidence Strength is not interchangeable with:

* Signal Strength
* Data Sufficiency
* Classification Confidence

## Treatment

Preserve existing Observation Evidence Strength behavior.

Do not create a universal evidence structure merely to standardize field names.

## Status

**RESOLVED / TERMINOLOGY**

---

# 12. Evidence Architecture

Evidence mechanisms are intentionally allowed to differ by subsystem.

The repository already contains several established evidence mechanisms, including:

* metric evidence
* genre evidence
* Observation evidence
* Finding evidence
* Designation-specific evidence and explanation
* Identity contribution and comparison evidence
* narrative explanation

The contract requires **explainability**, not architectural uniformity.

Therefore:

```text
Observation evidence
≠
Finding evidence
≠
Designation evidence
≠
Identity contribution evidence
≠
Narrative explanation
```

These mechanisms may evolve independently where their respective consumers or semantic requirements differ.

The existence of multiple evidence representations is therefore **not considered architectural inconsistency by itself**.

The current Observation architecture uses structured evidence objects alongside the separate `evidenceStrength` value.

Designation logic may use domain-specific evidence calculations such as boundary-exploration evidence.

Identity logic may use evidence internally for contribution comparison and tie-breaking.

These representations should not be forcibly unified into a universal evidence object merely for terminology or structural consistency.

## Internal Terminology Note

The Observation evidence-strength calculation currently uses the internal function name `score_confidence`.

Its current semantic role is Evidence Strength, not statistical or probabilistic confidence.

This is considered **internal terminology debt**, not an active contract violation.

Renaming the internal function is therefore deferred unless a future change makes the rename materially useful or necessary.

No behavioral change is required by this audit.

## Treatment

Preserve strong existing evidence mechanisms.

Strengthen missing explanation where useful.

Allow subsystem-specific evidence representations where they reflect different semantic requirements.

Do not introduce a universal evidence object solely for consistency.

Do not rename internal evidence-related functions solely to eliminate legacy terminology when doing so would create unnecessary implementation churn.

## Status

**RESOLVED / PRESERVE**

The existing evidence architecture is coherent and intentionally heterogeneous.

No architectural consolidation is required during Phase 1.

---

# 13. Recommendation Bias

Recommendation-oriented bias metadata already exists within the intelligence layer.

Designation rules may provide `recommendation_bias` metadata, which is preserved through the designation mapping layer.

Identity findings may also expose recommendation-oriented bias metadata.

These fields currently represent **inputs that a future Recommendation Engine may use**. They do not constitute a completed recommendation algorithm.

The current Recommendation Engine is intentionally incomplete and does not yet generate substantive recommendations.

## Architectural Principle

Recommendation bias must not be treated as equivalent to recommendation score.

In particular:

```text
Designation
≠
Recommendation

Identity
≠
Recommendation

Identity Score
≠
Recommendation Score
```

Future recommendations should primarily consume measurable archive signals and may use designation or identity-derived recommendation metadata as contextual inputs.

Identity should influence recommendations indirectly through the underlying measurable signals rather than becoming a direct recommendation score.

This preserves explainability and prevents interpretive classifications from becoming opaque recommendation authority.

## Treatment

Preserve the existing `recommendation_bias` metadata.

Do not implement or redesign the Recommendation Engine as part of the Phase 1 terminology and intelligence-alignment work.

Do not introduce recommendation scoring semantics before the Recommendation Engine is intentionally implemented.

When recommendation functionality is developed, audit its weighting and consumer behavior separately to ensure that interpretive layers do not override the underlying measurable evidence without explicit justification.

## Status

**RESOLVED / DEFERRED**

The current recommendation-bias architecture is intentionally preserved.

No production changes are required during Phase 1.

A dedicated recommendation-system audit should occur when substantive recommendation scoring is implemented.

---

# 14. Primary Designation

`primaryDesignation` represents the designation selected as the primary result of designation evaluation.

The current selection behavior is explicit:

**The highest-scoring designation is selected as the primary designation.**

The resolver also defines deterministic behavior for ties.

The selected designation is preserved as the complete designation object rather than being reduced to only its identifier.

## Contract

```text id="c5x4pq"
Designation evaluation
        ↓
Scored designation results
        ↓
Highest-scoring designation
        ↓
primaryDesignation
```

An empty designation result produces no primary designation.

The primary designation is distinct from the designation's **primary scoring basis**.

```text id="j4s1nd"
primaryDesignation
=
winning designation

designationBasis.primary
=
primary scoring basis / trait
```

The latter may be displayed alongside the winning designation but does not independently determine which designation is primary.

## Consumer Behavior

The Archive Profile exposes `primaryDesignation` for downstream consumers.

The frontend uses `primaryDesignation` as the displayed primary designation.

Existing tests establish:

* highest-scoring designation wins
* empty designation results produce `None`
* the full winning designation is preserved
* ties are resolved deterministically

These behaviors constitute the current contract.

## Treatment

Preserve the existing primary-designation resolution behavior.

Do not introduce a separate concept of "primary" designation based on frequency, identity, narrative importance, or recommendation relevance.

Do not conflate `primaryDesignation` with `designationBasis.primary`.

## Status

**RESOLVED / PRESERVE**

The existing primary-designation semantics are explicit, deterministic, and covered by tests.

No production changes are required during Phase 1.

---

# 15. Primary Identity

## Current field

`primaryIdentity`

## Actual meaning

`primaryIdentity` is the identity interpretation with the strongest
calculated identity score among eligible identity candidates.

Primary identity selection is performed by the identity engine rather than
being determined solely by declaration order.

When multiple identity candidates have the same score, the identity engine
uses deterministic evidence-based tie-breaking to select the primary identity.

The selected primary identity may also contain a secondary identity when
another eligible candidate meets the requirements for secondary status.

## Contract term

**Primary Identity**

## Treatment

Preserve the existing selection architecture.

Primary identity should continue to be determined from calculated identity
scores, eligibility, and the existing deterministic evidence-based tie-breaking
rules.

Do not introduce a separate "primary identity confidence" concept unless a
specific product requirement establishes a distinct semantic need.

## Status

**RESOLVED / PRESERVE**

Primary Identity is a defined selection result, not a generic confidence
label.

The existing identity engine, scoring model, eligibility rules, and
evidence-based tie-breaking behavior are preserved.

---

# 16. Secondary Identities

The contract permits:

```text
ZERO OR MORE meaningful Secondary Identities
```

The existence of a positive score does not automatically make an Identity
meaningful enough for Profile presentation.

Meaningfulness may eventually consider:

* Data Sufficiency
* signal strength
* relationship to the Primary Identity
* separation from weak candidates

Exact thresholds remain unresolved.

## Treatment

Do not invent numerical thresholds during terminology alignment.

Do not expose every positive-score Identity merely to satisfy cardinality.

## Status

**DEFERRED / POLICY**

---

# 17. Designation Close Competitors

The Profile may optionally present:

* close competitors
* ranked alternatives
* other useful Designation context

These are presentation choices, not automatically additional primary
Designations.

Whether close competitors should be shown depends on the final ranking and
presentation policy.

## Treatment

Do not create a new API field solely to support a presumed close-competitor
policy.

Do not invent near-tie thresholds.

## Status

**DEFERRED / POLICY**

---

# 18. Tie Behavior

Ranking must be inspected before terminology or implementation changes are made.

The audit should identify:

* sort key
* score precision
* exact tie behavior
* stable ordering
* primary selection
* close-competitor behavior
* whether Python or file-system ordering can influence results

Where current deterministic behavior exists without conceptual contradiction,
preserve it.

Do not introduce arbitrary tie-breaking solely to make output appear cleaner.

## Status

**DEFERRED / POLICY**

---

# 19. Archive State

The Intelligence Layer recognizes three conceptual archive states:

* EMPTY
* SPARSE
* ESTABLISHED

These labels are conceptual until operational thresholds are explicitly
defined.

The core principle is:

> Insufficient data should produce insufficient evidence, not false certainty.

Different intelligence subsystems may legitimately require different amounts
or types of data.

## Treatment

Do not add state-dependent branching based on undefined thresholds.

Do not imply that a universal archive-state threshold already exists.

## Status

**CONCEPT DEFINED / OPERATIONAL POLICY DEFERRED**

---

# 20. API Rename Principles

A field rename must not be performed merely because a field name is
conceptually imperfect.

Before renaming an API field, audit:

```text
backend model
    ↓
calculation
    ↓
service
    ↓
API response model
    ↓
serialization
    ↓
frontend consumer
    ↓
charts / visualizations
    ↓
narrative consumers
    ↓
tests / fixtures
```

A backend rename without downstream alignment is incomplete.

## Treatment

Prefer:

* terminology clarification
* field-level mapping
* compatibility-preserving changes
* incremental migration
* explicit tests

Avoid:

* mass renames
* speculative API redesign
* changing multiple semantic layers simultaneously
* renaming fields whose semantics have not been fully established

---

# 21. High-Risk Existing Field Names

The following names require particular care:

```text
confidence
designationConfidence
score
breakdown
top_traits
evidence
recommendation_bias
```

Each must be evaluated according to its actual semantic role.

A generic field name does not justify changing valid underlying behavior.

---

# 22. Field-Level Rename Status

| Field                    | Current semantic interpretation                   | Phase 1 action                                                  |
| ------------------------ | ------------------------------------------------- | --------------------------------------------------------------- |
| `data_sufficiency`       | Data Sufficiency                                  | Preserve                                                        |
| Identity `score`         | Identity alignment strength                       | Preserve                                                        |
| `designationConfidence`  | Designation Signal Strength                       | Clarify terminology                                             |
| Observation `evidenceStrength` | Observation Evidence Strength                     | Preserve renamed API field                                      |
| Finding `confidence`     | Undefined                                         | Defer                                                           |
| `score` generally        | Context-dependent scoring value                   | Preserve; do not globally rename                                |
| `evidence`               | Layer-specific support/explanation                | Preserve; do not universalize                                   |
| `recommendation_bias`    | Recommendation-oriented metadata                  | Preserve                                                        |
| `breakdown`              | Layer-specific contribution/explanation structure | Preserve                                                        |
| `top_traits`             | Profile trait presentation                        | Preserve unless consumer-specific audit requires change         |

---

# 23. Frontend Terminology

Frontend terminology should communicate the reconciled semantic meaning without
necessarily requiring an API field rename.

For example:

```text
API:
designationConfidence

Frontend:
Signal Strength
```

may be appropriate if the underlying calculation is unchanged and the frontend
label is the misleading portion.

Likewise:

```text
API:
confidence

Frontend:
Evidence Strength
```

may be appropriate for Observation output once the consumer audit confirms the
context.

Frontend terminology must not independently create new intelligence concepts.

---

# 24. Backward Compatibility

Phase 1 should favor compatibility-preserving terminology alignment.

Where an existing API field is consumed by multiple clients, a semantic label
correction may be preferable to an immediate field rename.

A public rename should occur only when:

1. the semantic mapping is locked
2. all known consumers are identified
3. tests are updated
4. compatibility implications are understood
5. the rename is explicitly approved

---

# 25. What Phase 1 Does Not Do

Phase 1 does not:

* invent Classification Confidence mathematics
* invent Finding confidence
* invent Secondary Identity thresholds
* invent tie/near-tie thresholds
* implement Recommendation weighting
* create a universal evidence schema
* redesign the API
* rename every occurrence of `confidence`
* rename fields solely for aesthetic consistency
* make Identity a Designation clone
* make Findings into renamed Observations

---

# 26. Required Testing

Every intentional terminology or behavior change must be protected by tests
where the change affects behavior.

Tests should protect:

### Identity

* Data Sufficiency
* Identity score
* eligibility
* deterministic ranking
* primary selection
* contribution breakdown
* insufficient-data behavior
* secondary-selection behavior once defined

### Designations

* scoring
* deterministic ranking
* primary selection
* explanation/evidence
* recommendation bias

### Observations

* rule behavior
* Evidence Strength
* evidence
* deterministic ordering

### Findings

* interpretive boundary
* evidence
* synthesis behavior
* future confidence semantics when defined

### API / Frontend

* response compatibility
* serialization
* field mapping
* terminology presentation
* downstream consumer behavior

---

# 27. Implementation Rule

The governing implementation rule is:

> **Change terminology where the semantic meaning is already established.**
>
> **Do not change behavior merely because terminology is imperfect.**
>
> **Do not assign semantics to unresolved concepts merely because an existing
> field requires a name.**

The implementation should evolve from the reconciled conceptual contract.

It should not be rewritten to fit a cleaner vocabulary.

---

# 28. Final Reconciled Mapping

The Phase 1 semantic vocabulary can be summarized as:

```text
Trait
    ↓
Signal Strength

Identity
    ├── score
    │     ↓
    │   alignment strength
    │
    └── data_sufficiency
          ↓
        Data Sufficiency

Observation
    └── confidence
          ↓
        Evidence Strength
        (threshold-relative)

Designation
    └── designationConfidence
          ↓
        Signal Strength

Finding
    └── confidence
          ↓
        UNRESOLVED

Future / optional concept
    └── Classification Confidence
          ↓
        separation between competing classifications
```

These mappings describe semantics.

They do not automatically require immediate API field renames.

---

# 29. Phase 1 Completion Criteria

This document is aligned when:

* [x] Identity `data_sufficiency` is defined as Data Sufficiency
* [x] Identity `score` remains distinct from Data Sufficiency
* [x] Designation `designationConfidence` is recognized as Signal Strength
* [x] Observation `confidence` is recognized as threshold-relative Evidence Strength
* [x] Finding confidence remains unresolved
* [x] Classification Confidence is not invented as an existing metric
* [x] Evidence mechanisms remain layer-specific
* [x] Recommendation Bias remains descriptive metadata
* [x] Primary Identity remains distinct from Designation
* [x] Secondary Identity meaningfulness remains unresolved until policy is locked
* [x] Tie / close-competitor behavior remains unresolved until policy is locked
* [x] Archive-state thresholds remain unresolved
* [x] API renames are treated as downstream changes rather than isolated backend edits
* [x] No unrelated API redesign is introduced

---

# 30. Governing Principle

> **The API should describe the intelligence system that actually exists, while
> the intelligence system should only change when an explicit conceptual
> decision requires it.**

Terminology alignment is therefore a controlled evolution of the existing
Media Tracker architecture, not a justification for rewriting it.

```

This is intentionally **conservative**. I did not turn any of the unresolved items into fake decisions just to make the map look cleaner. The biggest correction is that the old map's `Observation confidence → Signal Strength` mapping is now **Evidence Strength**, while `designationConfidence → Signal Strength` remains separate. That matches the reconciled contract.

Once you replace that file, **the only remaining planning document is `frontend-terminology-alignment.md`**.
```
