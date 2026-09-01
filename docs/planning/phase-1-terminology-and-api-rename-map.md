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

## Status

**RESOLVED / CLARIFY**

---

# 9. Finding `confidence`

## Current field

`confidence`

## Actual meaning

Finding confidence is not currently standardized.

The Phase 1 contract does not establish a numerical Finding confidence model.

## Treatment

Do not:

* invent Finding confidence mathematics
* rename the field merely for consistency
* assign it Evidence Strength semantics without explicit decision
* assign it Classification Confidence semantics without explicit decision

Finding confidence remains a deferred conceptual decision.

## Status

**DEFERRED / CLARIFICATION**

---

# 10. Classification Confidence

Classification Confidence is a distinct conceptual category.

It answers:

> How clearly does one classification or identity/designation outrank
> plausible alternatives?

This may eventually be useful for:

* Designations
* Identities
* other competing classification systems

However, the existence of this concept does not mean the current application
already calculates it.

## Treatment

Do not retroactively relabel existing Signal Strength values as Classification
Confidence.

Do not invent a Classification Confidence algorithm during Phase 1.

Any future implementation must define:

* competing candidates
* comparison method
* precision
* tie behavior
* meaningful separation
* presentation behavior

## Status

**CONCEPT DEFINED / IMPLEMENTATION DEFERRED**

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

**RESOLVED / SEMANTIC DISTINCTION**

---

# 12. Evidence Architecture

Evidence mechanisms are intentionally allowed to differ by subsystem.

Existing mechanisms include:

* metric evidence
* genre evidence
* Observation evidence
* Finding evidence
* Designation explanation
* Identity contribution breakdowns
* narrative explanation

The contract requires explainability, not architectural uniformity.

Therefore:

```text
Observation evidence
≠
Finding evidence
≠
Designation explanation
≠
Identity contribution breakdown
```

These mechanisms may evolve independently where appropriate.

## Treatment

Preserve strong existing mechanisms.

Strengthen missing explanation where useful.

Do not introduce a universal evidence object solely for consistency.

## Status

**RESOLVED / PRESERVE**

---

# 13. Recommendation Bias

Recommendation bias is descriptive recommendation-oriented metadata.

It is not itself a recommendation score.

Existing recommendation-bias metadata on Designations and Identities should
be preserved.

Identity must not become a direct numerical recommendation score.

The future Recommendation Engine should consume measurable signals directly.

## Treatment

Preserve existing metadata.

Defer future weighting and recommendation algorithms.

## Status

**RESOLVED / PRESERVE + DEFERRED**

---

# 14. Primary Designation

Primary Designation is the Designation selected for primary Profile
presentation after Designation candidates have been ranked.

The Designation system may maintain multiple candidates internally.

Profile presentation is intentionally different from internal cardinality.

## Treatment

Preserve deterministic ranking and primary selection.

Do not reinterpret primary selection as an Identity operation.

## Status

**RESOLVED / PRESERVE**

---

# 15. Primary Identity

Primary Identity is the single Identity selected after eligible Identity
candidates have been evaluated and ranked.

Conceptually:

```text
many eligible candidates
        ↓
deterministic ranking
        ↓
one primary Identity
```

Primary Identity selection must remain independent from Designation naming.

An Identity must not become a differently named Designation.

## Treatment

Preserve existing ranking and primary-selection machinery unless the eligibility
audit identifies a direct conflict.

Protect:

* deterministic ranking
* primary selection
* primary selection explainability
* behavior when insufficient-data identities are present

## Status

**RESOLVED / PRESERVE + TESTING**

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
| Observation `confidence` | Observation Evidence Strength                     | Clarify terminology; defer public rename pending consumer audit |
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
