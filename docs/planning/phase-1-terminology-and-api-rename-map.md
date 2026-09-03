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

**Semantic authority:** `phase-1-intelligence-alignment.md`

**Implementation authority:** `phase-1-decision-and-implementation-map.md`

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document maps existing implementation terminology to the reconciled
Phase 1 semantic vocabulary.

Its purpose is to prevent terminology changes from being made in isolation.

A terminology change is complete only when its full downstream blast radius has
been considered, including:

- backend models
- calculation layers
- API response models
- serialization
- frontend consumers
- charts and visualizations
- narrative consumers
- tests
- fixtures
- future Profile consumers

This document is an implementation-alignment aid.

It does not independently redefine the Intelligence Contract.

Where this document conflicts with `phase-1-intelligence-alignment.md`, the
reconciled Intelligence Alignment document takes precedence.

Where this document describes current implementation behavior, the repository
on `develop-3` is authoritative.

---

# 2. Core Terminology

The Phase 1 conceptual vocabulary is:

| Concept                       | Meaning                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| **Signal Strength**           | How strongly a quality or signal is expressed                  |
| **Data Sufficiency**          | Whether enough archive data exists to evaluate a conclusion    |
| **Evidence Strength**         | How strongly available evidence supports a conclusion          |
| **Classification Confidence** | How clearly one classification outranks plausible alternatives |

Classification Confidence is a historical/retired concept in the current
Phase 1 implementation.

It is retained here only because earlier implementation and planning work used
the term and because the distinction remains important.

The current system does **not** calculate a general Classification Confidence
value.

These concepts must not be collapsed merely because an existing implementation
field uses the generic name `confidence`.

---

# 3. Current Field Mapping

| Current field                            | Actual meaning                                                 | Reconciled term                      | Treatment                                                        | Status   |
| ---------------------------------------- | -------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------- | -------- |
| Identity `data_sufficiency`              | Whether enough archive data exists to evaluate the Identity    | **Data Sufficiency**                 | Preserve                                                         | Resolved |
| Identity `score`                         | Strength of alignment with the Identity's defined signals      | **Identity Score / Signal Strength** | Preserve                                                         | Resolved |
| Designation `designationConfidence`      | Aggregate strength of the designation signal                   | **Signal Strength**                  | Preserve field and calculation; correct presentation terminology | Resolved |
| Designation `designationConfidenceLabel` | Presentation label associated with designation signal strength | **Signal Strength label**            | Preserve                                                         | Resolved |
| Designation `score`                      | Degree to which the archive fits a Designation                 | **Designation Score**                | Preserve                                                         | Resolved |
| Observation `confidence`                 | Threshold-relative support for an Observation                  | **Evidence Strength**                | Public field migrated to `evidenceStrength`                      | Resolved |
| Finding `confidence`                     | No current standardized field/concept                          | **Unresolved / not implemented**     | Do not invent or rename                                          | Resolved |
| Identity ranking                         | Relative ordering of eligible Identity candidates              | **Ranking**                          | Preserve deterministic behavior                                  | Resolved |
| Primary Identity                         | Highest-ranked eligible Identity                               | **Primary Identity**                 | Preserve                                                         | Resolved |
| Secondary Identity                       | Additional meaningful eligible Identity                        | **Secondary Identity**               | Current threshold policy implemented separately                  | Resolved |
| Primary Designation                      | Highest-scoring Designation                                    | **Primary Designation**              | Preserve                                                         | Resolved |
| `designationBasis`                       | Explanation/basis for selected Designation                     | **Designation Basis**                | Preserve                                                         | Resolved |
| `recommendation_bias`                    | Recommendation-oriented metadata                               | **Recommendation Bias**              | Preserve; not a recommendation score                             | Resolved |

---

# 4. Identity `data_sufficiency`

## Current field

```text
data_sufficiency
```

## Contract meaning

**Data Sufficiency**

Data Sufficiency answers:

> Does the archive contain enough information for this Identity to be
> meaningfully evaluated?

It is related to an Identity's minimum-entry requirement.

It does **not** answer:

> How strongly does the archive fit this Identity?

That is the role of Identity Score.

It also does **not** answer:

> How clearly does this Identity beat competing Identities?

That would be a comparative classification concept and is not represented by
Data Sufficiency.

## Current behavior

Identity fixtures define minimum-entry requirements.

An Identity below its minimum-entry requirement is ineligible for scoring and
ranking.

The current Identity catalog uses:

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

## Treatment

Preserve the `data_sufficiency` concept and API behavior.

Do not rename it to `confidence`.

Do not merge it with Identity Score.

Do not use Data Sufficiency as a proxy for classification certainty.

## Status

**RESOLVED / PRESERVE**

---

# 5. Identity `score`

## Current field

```text
score
```

## Contract meaning

Identity Score represents the strength of the archive's alignment with an
Identity's defined signals and fixture weights.

Conceptually:

```text
Identity Score
=
strength of alignment with the Identity
```

The score is a signal-strength measure.

It is not:

- Data Sufficiency
- Evidence Strength
- statistical confidence
- probability
- Classification Confidence

## Current scoring architecture

The existing architecture remains:

```text
Identity fixture
        ↓
Resolve signals
        ↓
Normalize values
        ↓
Apply fixture weights
        ↓
Sum contributions
        ↓
Identity Score
```

The contribution breakdown exposes the component reasoning.

## Treatment

Preserve the calculation and scoring architecture.

Do not introduce a new score merely to make the terminology more intuitive.

## Status

**RESOLVED / PRESERVE**

---

# 6. Identity Eligibility, Ranking, and Presentation

These concepts are distinct.

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

The current implementation uses fixture-level minimum-entry requirements as an
eligibility gate.

Only eligible Identities participate in scoring and ranking.

Current resolution behavior is:

1. determine eligible Identities
2. calculate their scores
3. rank them by score
4. resolve the primary Identity deterministically
5. select a secondary Identity when the current secondary policy is satisfied

The existence of a score does not by itself mean that an Identity must be
presented as a meaningful secondary.

## Current secondary policy

The current implementation defines:

```text
SECONDARY_MIN_SCORE = 0.60
```

A secondary Identity must:

- be eligible
- not be the primary Identity
- meet or exceed the current minimum score
- remain a distinct Identity rather than being treated as the primary

This is a presentation/resolution policy.

It does not alter Identity scoring.

## Treatment

Do not collapse eligibility, scoring, ranking, or presentation into one field.

The current deterministic behavior is preserved.

## Status

**RESOLVED / PRESERVE**

---

# 7. Identity Ranking and Tie Behavior

Identity ranking is based on Identity Score.

The system evaluates multiple candidates and selects one Primary Identity.

The current model is:

```text
MANY internally
↓
ONE PRIMARY
↓
ZERO OR ONE CURRENT SECONDARY
```

The implementation does not use an arbitrary near-tie threshold.

Exact score ties are resolved deterministically using contribution evidence
ordering.

The contribution comparison:

- does not add points
- does not change the underlying score
- does not create a new classification metric
- exists only to make exact ties deterministic

Non-equal scores remain meaningfully ordered.

## Treatment

Preserve the current deterministic ranking and tie behavior.

Do not introduce fuzzy or arbitrary near-tie behavior merely for presentation.

## Status

**RESOLVED / PRESERVE**

---

# 8. Designation `designationConfidence`

## Current field

```text
designationConfidence
```

## Actual meaning

The existing value is derived from Designation scoring inputs and represents
the strength of the Designation signal.

It does not represent:

- probability that the Designation is correct
- statistical confidence
- comparative confidence against all alternatives
- a calibrated probability

## Contract term

**Signal Strength**

## Treatment

Preserve:

```text
designationConfidence
designationConfidenceLabel
```

Preserve the existing calculation.

Present the concept to users as **Signal Strength**.

Do not introduce a new Classification Confidence calculation merely because
the API identifier contains the word `Confidence`.

The internal calculation name:

```text
calculate_designation_confidence()
```

may remain during Phase 1.

Renaming an internal helper provides no meaningful architectural benefit by
itself and would create unnecessary implementation churn.

## Consumer audit

The downstream consumer audit is complete.

The existing API field remains compatible with current consumers.

The frontend presents the concept using **Signal Strength** rather than
Classification Confidence.

## Status

**RESOLVED / TERMINOLOGY**

**Designation `designationConfidence` consumer audit: COMPLETE.**

---

# 9. Observation `confidence` → `evidenceStrength`

## Historical field

```text
confidence
```

## Actual meaning

Observation confidence represented threshold-relative support for the
Observation's designated supporting signal.

Conceptually:

```text
observed value
÷
supporting threshold
```

The resulting value describes how strongly the designated metric supports the
Observation relative to its threshold.

It does not represent:

- statistical confidence
- probability
- certainty
- generalized confidence across every rule predicate

An Observation may require multiple conditions while using one designated
supporting metric for its numerical Evidence Strength.

## Reconciled term

**Evidence Strength**

## Current public field

```text
evidenceStrength
```

The public API terminology has been migrated from `confidence` to
`evidenceStrength`.

The underlying threshold-relative calculation and Observation ranking behavior
are preserved.

The internal rule-level key is:

```text
evidence_strength
```

The internal helper:

```text
score_confidence()
```

is intentionally retained during Phase 1.

Its implementation represents Evidence Strength despite its historical name.

Renaming that internal helper is not necessary to satisfy the public contract.

## Treatment

Preserve:

- threshold-relative calculation
- Observation ranking
- structured evidence
- rule behavior

Use `evidenceStrength` for the public representation.

Do not introduce Classification Confidence.

## Status

**RESOLVED / TERMINOLOGY**

**Observation terminology migration: COMPLETE.**

---

# 10. Finding `confidence`

No current Finding confidence field exists.

Finding generation currently produces findings with descriptive and
interpretive content and structured evidence, but does not expose a standardized
Finding confidence value.

This applies to both rule-generated Findings and Identity-derived Findings.

## Treatment

Do not:

- invent Finding confidence mathematics
- add a field merely for symmetry
- assign Evidence Strength semantics to an absent field
- assign Classification Confidence semantics to Findings
- rename an absent field

If a future Finding confidence concept becomes necessary, it must first be
defined as an explicit conceptual contract.

## Status

**RESOLVED / NOT IMPLEMENTED**

No code change is required by the terminology map.

---

# 11. Classification Confidence

Classification Confidence is retained as a historical conceptual distinction.

It describes a possible future concept:

> How clearly does one classification outrank plausible alternatives?

The current system does not implement a general Classification Confidence
measure.

The current intelligence architecture instead uses explicit domain concepts:

```text
Designation
    ↓
taste classification

Designation Signal Strength
    ↓
strength of the classification signal

Identity
    ↓
broader curator philosophy

Identity Data Sufficiency
    ↓
whether enough archive data exists to evaluate the Identity

Observation Evidence Strength
    ↓
strength of evidence supporting an Observation
```

## Treatment

Do not reintroduce Classification Confidence merely to make terminology
uniform.

Do not rename:

```text
designationConfidence
```

or:

```text
score
```

to Classification Confidence.

If a future feature genuinely requires comparative confidence, it should be
defined as a new explicit contract.

## Status

**RESOLVED / RETIRED**

---

# 12. Evidence Strength

Evidence Strength answers:

> How strongly does the available evidence support the conclusion?

The concept is currently most directly represented by Observation
`evidenceStrength`.

Evidence Strength is not interchangeable with:

- Signal Strength
- Data Sufficiency
- Classification Confidence

The distinctions are intentional.

## Treatment

Preserve existing Evidence Strength behavior.

Do not create a universal evidence object solely to standardize terminology.

## Status

**RESOLVED / TERMINOLOGY**

---

# 13. Evidence Architecture

The intelligence system contains multiple evidence mechanisms.

Examples include:

- metric evidence
- genre evidence
- Observation evidence
- Finding evidence
- Designation-specific evidence
- Designation explanation
- Identity contribution evidence
- Identity tie-breaking evidence
- narrative explanation

These mechanisms do not need to share one universal structure.

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

Different subsystems may use different evidence representations when those
representations reflect different semantic requirements.

## Observation evidence

Observation evidence remains structured and includes metric and/or genre
evidence as appropriate.

`evidenceStrength` communicates the strength of the designated supporting
signal.

## Designation evidence

Designation rules may use domain-specific evidence calculations such as
boundary-exploration evidence.

That evidence does not need to become a universal evidence object.

## Identity evidence

Identity scoring exposes contribution-level evidence including:

- trait
- value
- weight
- normalized value
- contribution

This contribution structure also supports deterministic exact-tie resolution.

## Internal terminology debt

The Observation Evidence Strength calculation still contains the internal
helper name:

```text
score_confidence()
```

This is internal terminology debt, not a public semantic contradiction.

It is intentionally deferred.

## Treatment

Preserve strong evidence mechanisms.

Do not force all intelligence systems into one evidence schema.

Do not rename internal helpers solely for aesthetic consistency.

## Status

**RESOLVED / PRESERVE**

---

# 14. Recommendation Bias

Recommendation-oriented metadata exists in the intelligence layer.

For example:

```text
recommendation_bias
```

may describe recommendation tendencies associated with a Designation or
Identity.

This metadata is not itself a Recommendation Engine.

The distinction is:

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

Recommendation Bias
≠
Recommendation Score
```

Recommendation Bias represents contextual information that a future
Recommendation Engine may consume.

## Treatment

Preserve existing recommendation metadata.

Do not redesign or implement substantive recommendation scoring as part of
Phase 1 terminology alignment.

## Status

**RESOLVED / DEFERRED**

Recommendation behavior remains future work.

---

# 15. `designationBasis`

## Current field

```text
designationBasis
```

## Meaning

The field describes the basis used to explain the selected Designation.

It is explanation-oriented metadata.

It is not:

- Classification Confidence
- Designation Score
- Recommendation Score
- Identity evidence

## Treatment

Preserve the API field.

Present it as:

```text
Designation Basis
```

No terminology correction is required.

The consumer audit confirmed that the field has legitimate downstream use.

## Status

**RESOLVED / PRESERVE**

---

# 16. Primary Designation

## Current field

```text
primaryDesignation
```

This represents the primary Designation selected by the Designation evaluation
system.

The current behavior is:

```text
Designation evaluation
        ↓
Designation scores
        ↓
highest-scoring Designation
        ↓
primaryDesignation
```

The selection is deterministic.

## Treatment

Preserve the field and behavior.

The frontend should present:

```text
Primary Designation
```

No rename is required.

## Status

**RESOLVED / PRESERVE**

---

# 17. Primary Identity

## Current field

```text
primaryIdentity
```

This represents the primary Identity selected from eligible Identity
candidates.

The current behavior is deterministic and independent of Designation names.

Identity and Designation selection remain separate processes.

## Treatment

Preserve the field and behavior.

The frontend should present:

```text
Primary Identity
```

No rename is required.

## Status

**RESOLVED / PRESERVE**

---

# 18. Identity Fixtures

The current Identity catalog is:

```text
interpretive_philosophy
exploratory_philosophy
breadth_philosophy
```

The old Identity fixtures that duplicated Designation concepts are superseded.

Current fixture semantics are governed by:

```text
phase-1-identity-fixture-contract.md
```

Current fixture-level numeric constraints are:

| Identity                | Minimum entries | Weights                                                                                 |
| ----------------------- | --------------: | --------------------------------------------------------------------------------------- |
| Interpretive Philosophy |              20 | depth .45, emotional impact .25, reflection .12, ambiguity .10, analysis .08            |
| Exploratory Philosophy  |              20 | originality .35, genre diversity .25, depth .15, experimental affinity .15, novelty .10 |
| Breadth Philosophy      |              15 | genre diversity 1.00                                                                    |

These fixture values are authoritative for the current implementation.

General ranking and resolution policy remains governed by the Decision &
Implementation Map and the repository implementation.

## Status

**RESOLVED / IMPLEMENTED**

---

# 19. Frontend Terminology

The frontend has been aligned with the reconciled scoring terminology.

Current presentation terminology includes:

```text
Universal Scoring
Universal Scoring Profile
Media Scoring
Score
Score Distribution
Average Score
Average Score by Media Type
Highest Rated Records
Signal Strength
Evidence Strength
Notes
Observations
Findings
Archive Interpretation
Primary Designation
Primary Identity
```

The frontend should describe the intelligence system that the backend actually
produces.

It should not independently invent analytical terminology.

## Status

**RESOLVED / IMPLEMENTED**

See:

```text
frontend-terminology-alignment.md
```

for the frontend-specific mapping.

---

# 20. Legacy Frontend Intelligence

Several historical frontend intelligence functions have been superseded by
backend-owned intelligence.

Examples include:

```text
archiveDesignations
generateArchiveTitle
calculateDesignationConfidence
generateDesignationBasis
```

These are not candidates for terminology cleanup.

They represent an architectural migration in which intelligence calculations
are owned by the backend rather than duplicated in presentation code.

## Treatment

Do not recreate or reintroduce these frontend intelligence paths.

## Status

**RESOLVED / REMOVED**

---

# 21. API Compatibility Principle

A terminology correction does not automatically require an API rename.

The decision sequence is:

```text
Semantic meaning established
        ↓
Does the public field name contradict that meaning?
        ↓
Audit consumers
        ↓
Determine compatibility impact
        ↓
Rename only if justified
```

The current Phase 1 policy is to preserve public identifiers when their
continued existence does not create a meaningful semantic contradiction.

Examples:

```text
designationConfidence
designationConfidenceLabel
designationBasis
primaryDesignation
primaryIdentity
score
data_sufficiency
```

Their semantic meanings are documented separately from their historical
identifiers.

The public Observation field is an exception because the generic
`confidence` name directly obscured the established Evidence Strength concept
and the consumer audit supported the migration.

---

# 22. Internal Terminology Principle

Internal helper names are not automatically public semantic contracts.

An internal identifier may retain historical terminology when:

- its actual behavior is understood
- the public contract is correct
- renaming it would create unnecessary implementation churn
- no active semantic confusion results

Current examples include:

```text
calculate_designation_confidence()
score_confidence()
confidenceLabel
```

These names may be revisited later during ordinary technical cleanup.

They do not justify algorithmic changes during Phase 1.

---

# 23. What This Document Does Not Authorize

This terminology map does not authorize:

- redesigning Identity scoring
- redesigning Designation scoring
- creating Classification Confidence
- creating Finding confidence
- redesigning Observation rules
- creating a universal evidence schema
- redesigning recommendation scoring
- changing normalization merely for consistency
- changing deterministic ranking merely for aesthetic reasons
- replacing backend intelligence with frontend calculations
- broad API redesign
- unrelated refactoring

Terminology alignment is not a pretext for architectural rewriting.

---

# 24. Current Resolution Summary

| Area                                     | Resolution                                           |
| ---------------------------------------- | ---------------------------------------------------- |
| Signal Strength                          | Active semantic concept                              |
| Data Sufficiency                         | Active semantic concept                              |
| Evidence Strength                        | Active semantic concept                              |
| Classification Confidence                | Retired / future-only unless explicitly reintroduced |
| Identity `data_sufficiency`              | Preserve                                             |
| Identity `score`                         | Preserve                                             |
| Identity eligibility                     | Implemented                                          |
| Identity primary selection               | Implemented                                          |
| Identity secondary policy                | Implemented                                          |
| Identity exact ties                      | Deterministic                                        |
| Designation `designationConfidence`      | Preserve API field; present as Signal Strength       |
| Designation `designationConfidenceLabel` | Preserve                                             |
| Observation `confidence`                 | Migrated to public `evidenceStrength`                |
| Finding confidence                       | Not implemented                                      |
| `designationBasis`                       | Preserve                                             |
| `primaryDesignation`                     | Preserve                                             |
| `primaryIdentity`                        | Preserve                                             |
| Recommendation Bias                      | Preserve                                             |
| Universal Scoring terminology            | Implemented                                          |
| Media Scoring terminology                | Implemented                                          |
| Legacy frontend intelligence             | Removed/superseded                                   |

---

# 25. Final Principle

The API should describe the intelligence system that actually exists.

The intelligence system should only change when an explicit conceptual decision
requires it.

Therefore:

> **Terminology changes should clarify existing behavior before they create
> new behavior.**

Phase 1 terminology alignment is considered complete when the public and
frontend vocabulary accurately describes the existing intelligence architecture
without requiring unnecessary changes to its calculations or behavior.

````

### `docs/planning/frontend-terminology-alignment.md`

```markdown
````

---

\ // // _ \ \*\ / _ \ | D )| |
_/_//_/ \_/\_\_//_/ \_|_D_)|\*|
Weighted Archive System for Analysis & Behavioral Insights

````

# Frontend Terminology Alignment

**Project:** Media Tracker

**Authoritative branch:** `develop-3`

**Status:** Reconciled Phase 1 frontend terminology reference

**Semantic authority:** `phase-1-intelligence-alignment.md`

**API terminology reference:** `phase-1-terminology-and-api-rename-map.md`

**Implementation authority:** Current repository implementation on `develop-3`

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document maps terminology currently used by the frontend against the
reconciled Phase 1 semantic vocabulary.

Its purpose is to identify:

- terminology that accurately represents the underlying data
- terminology that was historically misleading
- terminology that can safely be corrected at the presentation layer
- API/domain terminology that should not be renamed merely because a frontend
  label is ambiguous
- frontend intelligence logic that belongs in the backend rather than the
  presentation layer

This is a Phase 1 planning and verification document.

It does not independently redefine the Intelligence Contract.

It does not authorize unrelated frontend redesign.

The repository remains authoritative for current implementation behavior.

---

# 2. Authority and Scope

Terminology decisions are governed by the following order:

1. `phase-1-intelligence-alignment.md`
2. `phase-1-terminology-and-api-rename-map.md`
3. `phase-1-decision-and-implementation-map.md`
4. Current repository implementation on `develop-3`
5. Verified frontend consumer relationships
6. Historical project intent

If implementation and terminology disagree, the implementation should be
investigated rather than silently reinterpreted.

If semantic meaning cannot be established:

> **UNRESOLVED — insufficient repository evidence.**

This document concerns frontend terminology and frontend/backend responsibility.

It does not independently redefine:

- Traits
- Genre Signals
- Observations
- Findings
- Designations
- Identities
- Recommendation metadata
- Recommendation behavior

---

# 3. Frontend Responsibility Boundary

The intended architecture is:

```text
                 BACKEND
                    │
                    │
        ┌───────────┴───────────┐
        │                       │
   Intelligence             API data
        │                       │
        └───────────┬───────────┘
                    ↓
                 FRONTEND
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    Presentation  Interaction  Visualization
````

## Backend

The backend is responsible for:

- calculating Traits
- calculating Genre Signals
- evaluating Observations
- evaluating Findings
- calculating Designation scores
- selecting the Primary Designation
- calculating Identity scores
- determining Identity Data Sufficiency
- determining Identity eligibility
- ranking Identity candidates
- selecting the Primary Identity
- resolving current secondary Identity behavior
- producing evidence and explanations
- producing recommendation-oriented metadata
- assembling Archive Profile data
- generating archive-level narrative content

## Frontend

The frontend is responsible for:

- presenting backend-produced intelligence
- formatting values
- displaying evidence
- visualizing results
- presenting explanations
- handling interaction
- displaying entry-level user data
- filtering and sorting for presentation where appropriate

The frontend should not independently reproduce intelligence calculations.

---

# 4. Reconciled Semantic Vocabulary

The frontend should distinguish the major intelligence layers:

```text
Traits
    ↓
Genre Signals
    ↓
┌──────────────┬──────────────┬──────────────┬──────────────┐
Observations   Findings       Designations   Identities
demonstrate    interpret      classify       describe
patterns       conclusions    taste          curator
```

These are different analytical perspectives.

They are not interchangeable.

The frontend should present their distinct roles rather than flattening them
into generic terminology.

---

# 5. Quantitative Vocabulary

The frontend must distinguish the following concepts where they are actually
used:

| Term                          | Meaning                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| **Signal Strength**           | How strongly a quality or signal is expressed                                                     |
| **Data Sufficiency**          | Whether enough archive data exists to evaluate a conclusion                                       |
| **Evidence Strength**         | How strongly available evidence supports a conclusion                                             |
| **Classification Confidence** | How clearly one classification outranks plausible alternatives; retired/not currently implemented |

These concepts are not interchangeable.

In particular:

```text
designationConfidence
```

does not automatically mean:

```text
Classification Confidence
```

and:

```text
evidenceStrength
```

does not mean generic confidence.

Frontend labels should communicate the actual semantic meaning of the data being
shown.

---

# 6. Alignment Table

| ID    | Historical/current frontend term           | Location                        | Underlying meaning                          | Reconciled frontend term                           | Safe to change? | Status   |
| ----- | ------------------------------------------ | ------------------------------- | ------------------------------------------- | -------------------------------------------------- | --------------- | -------- |
| FO-01 | `CLASSIFICATION`                           | `entries.js` media type display | Type/category of media consumed             | **Media Type**                                     | Yes             | Verified |
| FO-02 | Evaluation Index                           | Entry/archive display           | User's overall numeric rating               | **Score**                                          | Yes             | Verified |
| FO-03 | Evaluation Index                           | Entry detail                    | User's overall numeric rating               | **Score**                                          | Yes             | Verified |
| FO-04 | Evaluation Index                           | Archive analytics               | Aggregate rating value                      | **Score**                                          | Yes             | Verified |
| FO-05 | Evaluation Index Distribution              | Charts                          | Distribution of rating values               | **Score Distribution**                             | Yes             | Verified |
| FO-06 | Average Evaluation Index                   | Charts                          | Average user rating                         | **Average Score**                                  | Yes             | Verified |
| FO-07 | Average Evaluation Index by Classification | Charts                          | Average score grouped by media type         | **Average Score by Media Type**                    | Yes             | Verified |
| FO-08 | Highest Evaluated Records                  | Charts                          | Highest-rated records                       | **Highest Rated Records**                          | Yes             | Verified |
| FO-09 | Evaluation                                 | Entry scoring UI                | User-provided scoring                       | **Scoring**                                        | Yes             | Verified |
| FO-10 | Evaluation Index                           | Rating presentation             | Overall user rating                         | **Score**                                          | Yes             | Verified |
| FO-11 | Evaluation Index                           | Charts                          | Aggregate rating value                      | **Score**                                          | Yes             | Verified |
| FO-12 | Evaluation Index Distribution              | Charts                          | Distribution of rating values               | **Score Distribution**                             | Yes             | Verified |
| FO-13 | Average Evaluation Index                   | Charts                          | Average rating                              | **Average Score**                                  | Yes             | Verified |
| FO-14 | Average Evaluation Index by Classification | Charts                          | Average score grouped by media type         | **Average Score by Media Type**                    | Yes             | Verified |
| FO-15 | Highest Evaluated Records                  | Charts                          | Highest-rated records                       | **Highest Rated Records**                          | Yes             | Verified |
| FO-16 | Classification                             | Media grouping                  | Media type grouping                         | **Media Type**                                     | Yes             | Verified |
| FO-17 | Universal Evaluation                       | `forms.js`                      | Universal scoring dimensions                | **Universal Scoring**                              | Yes             | Verified |
| FO-18 | `<Media Type> Evaluation`                  | Forms/charts                    | Media-specific scoring dimensions           | **<Media Type> Scoring**                           | Yes             | Verified |
| FO-19 | Core Evaluation Matrix                     | `charts.js`                     | Aggregate universal scoring dimensions      | **Universal Scoring Profile**                      | Yes             | Verified |
| FO-20 | Classification Confidence                  | Designation presentation        | Strength of designation signal              | **Signal Strength**                                | Yes             | Verified |
| FO-21 | Designation Basis                          | Designation display             | Explanation/basis for selected designation  | **Designation Basis**                              | No              | Verified |
| FO-22 | `designationBasis`                         | API data                        | Designation explanation/basis               | **Preserve API field**                             | No              | Verified |
| FO-23 | `designationConfidence`                    | API data                        | Designation signal strength                 | **Preserve API field; present as Signal Strength** | No              | Verified |
| FO-24 | `primaryDesignation`                       | API/Profile                     | Primary designation                         | **Primary Designation**                            | No              | Verified |
| FO-25 | Designation                                | Designation display             | Named taste classification                  | **Designation**                                    | No              | Verified |
| FO-26 | Observations                               | Entry detail                    | User-authored `entry.notes`                 | **Notes**                                          | Yes             | Verified |
| FO-27 | Archive Observations                       | Archive intelligence            | Backend-generated recurring patterns        | **Archive Observations**                           | No              | Verified |
| FO-28 | Archive Findings                           | Archive intelligence            | Backend-generated interpretive findings     | **Archive Findings**                               | No              | Verified |
| FO-29 | Archive Interpretation                     | Archive intelligence            | Backend-generated interpretation layer      | **Archive Interpretation**                         | No              | Verified |
| FO-30 | `primaryTrait`                             | Archive Profile                 | Primary archive-level trait signal          | **Primary Trait**                                  | No              | Verified |
| FO-31 | `secondaryTrait`                           | Archive Profile                 | Secondary archive-level trait signal        | **Secondary Trait**                                | No              | Verified |
| FO-32 | `genreSignature`                           | Archive Profile                 | Archive-level genre summary                 | **Genre Signature**                                | No              | Verified |
| FO-33 | `observationSummary`                       | Archive Profile                 | Summary of Observation intelligence         | **Observation Summary**                            | No              | Verified |
| FO-34 | `archiveSummary`                           | Archive Profile                 | Archive-level synthesis                     | **Archive Summary**                                | No              | Verified |
| FO-35 | `archiveDesignations`                      | Legacy frontend intelligence    | Superseded frontend designation generation  | **Removed / backend authoritative**                | N/A             | Resolved |
| FO-36 | `generateArchiveTitle`                     | Legacy frontend intelligence    | Superseded frontend title generation        | **Removed / backend authoritative**                | N/A             | Resolved |
| FO-37 | `calculateDesignationConfidence`           | Legacy frontend intelligence    | Superseded frontend designation calculation | **Removed / backend authoritative**                | N/A             | Resolved |
| FO-38 | `generateDesignationBasis`                 | Legacy frontend intelligence    | Superseded frontend designation explanation | **Removed / backend authoritative**                | N/A             | Resolved |

---

# 7. Scoring Terminology

## 7.1 Score

The word **Score** is the preferred frontend term for user-provided numerical
ratings.

Examples:

```text
Score
Average Score
Score Distribution
Highest Rated Records
```

The frontend should not use "Evaluation Index" for these values.

"Evaluation" historically described the user's scoring activity, but the
underlying data is more accurately described as a score.

---

# 8. Universal Scoring

Universal scoring dimensions apply across media types.

The preferred frontend terminology is:

```text
Universal Scoring
```

not:

```text
Universal Evaluation
```

The term "scoring" more accurately describes the user's act of assigning
numeric values to universal dimensions.

The underlying API and calculation architecture does not change.

---

# 9. Media-Specific Scoring

Media-specific dimensions should be presented as:

```text
<Movie> Scoring
<Game> Scoring
<Book> Scoring
```

rather than:

```text
<Movie> Evaluation
<Game> Evaluation
<Book> Evaluation
```

The exact media type is supplied dynamically.

This terminology reflects the same existing user-input scoring dimensions.

No scoring algorithm changes are implied.

---

# 10. Universal Scoring Profile

The historical frontend term:

```text
Core Evaluation Matrix
```

does not represent a separate intelligence subsystem.

The visualization presents aggregate universal scoring dimensions.

The preferred presentation term is:

```text
Universal Scoring Profile
```

This describes what the visualization actually represents without implying the
existence of a distinct "Core Evaluation Matrix" intelligence layer.

---

# 11. Designation Terminology

Designation is a named taste classification.

The frontend should use:

```text
Designation
Primary Designation
Designation Score
Designation Basis
Signal Strength
```

The core question is:

> **What recognizable taste classification fits this archive?**

Designation should not be presented as:

- an Identity
- a personality diagnosis
- a recommendation category
- a favorite genre
- a single preference
- a measure of certainty

---

# 12. Designation Signal Strength

The API field remains:

```text
designationConfidence
```

The frontend should not interpret the identifier literally.

Its reconciled semantic meaning is:

> **Signal Strength**

Therefore:

```text
Signal Strength
```

is the preferred visible label.

Do not display:

```text
Classification Confidence
```

for this value.

The underlying calculation is preserved.

The existing `designationConfidenceLabel` is also preserved.

No new Classification Confidence calculation is introduced.

---

# 13. Designation Basis

The API field:

```text
designationBasis
```

is preserved.

The preferred visible terminology is:

```text
Designation Basis
```

The field provides explanatory context for the selected Designation.

It is not a confidence measure.

It is not an Identity explanation.

It is not a recommendation score.

No terminology correction is required.

---

# 14. Observation Terminology

Observations represent recurring patterns identified by the intelligence
system.

The frontend should use:

```text
Observation
Observations
Archive Observations
Evidence
Evidence Strength
```

where those concepts are actually represented.

The word "Observation" should not be used for user-authored entry notes.

---

# 15. Entry Notes vs Archive Observations

The entry-detail interface historically used:

```text
Observations
```

for user-authored:

```text
entry.notes
```

This created a semantic collision with the actual intelligence-layer
Observation system.

The correct entry-detail label is:

```text
Notes
```

The intelligence layer retains:

```text
Archive Observations
```

or:

```text
Observations
```

where the context already makes the distinction clear.

This is a presentation terminology correction only.

---

# 16. Observation Evidence Strength

The public Observation field is:

```text
evidenceStrength
```

The frontend should present it as:

```text
Evidence Strength
```

It represents threshold-relative support for the Observation's designated
supporting signal.

It does not represent:

- statistical confidence
- probability
- certainty
- Classification Confidence

The underlying calculation and Observation ranking remain unchanged.

---

# 17. Findings Terminology

Findings are interpretive conclusions generated from available archive
evidence.

The frontend should use:

```text
Findings
Archive Findings
```

where appropriate.

Finding should not be presented as synonymous with Observation.

The distinction is:

```text
Observation
    ↓
demonstrates a recurring pattern

Finding
    ↓
interprets what the available patterns may mean
```

The frontend should preserve this distinction.

---

# 18. Archive Interpretation

The archive interpretation layer may be presented as:

```text
Archive Interpretation
```

It represents the higher-level interpretation/narrative layer assembled from
the underlying intelligence.

It should not be collapsed into:

```text
Observations
```

or:

```text
Findings
```

because those are separate analytical layers.

No terminology change is required.

---

# 19. Identity Terminology

The current Identity catalog is:

```text
Interpretive Philosophy
Exploratory Philosophy
Breadth Philosophy
```

The frontend should use:

```text
Identity
Primary Identity
Secondary Identity
Identity Score
Data Sufficiency
```

The core Identity question is:

> **What relationship does the curator tend to establish with what they
> consume?**

This distinguishes Identity from Designation.

```text
Designation
    ↓
What recognizable taste classification fits?

Identity
    ↓
What broader curatorial philosophy does the archive demonstrate?
```

---

# 20. Identity Score

Identity Score represents the strength of alignment between the archive and the
Identity's defined signals.

The frontend may describe this as:

```text
Identity Score
```

or, where appropriate:

```text
Signal Strength
```

It should not be labeled:

```text
Identity Confidence
```

Identity Score is not Data Sufficiency.

---

# 21. Identity Data Sufficiency

Identity Data Sufficiency describes whether enough archive data exists to
evaluate the Identity.

It should not be presented as:

```text
Identity Confidence
```

The distinction is:

```text
Data Sufficiency
=
Do we have enough data?

Identity Score
=
How strongly does the archive align?

Classification Confidence
=
How clearly does one candidate beat alternatives?
```

Only the first two are active concepts in the current Identity system.

---

# 22. Primary and Secondary Identity Presentation

The frontend should distinguish:

```text
Primary Identity
```

from additional meaningful Identity candidates.

Current resolution behavior uses a minimum score threshold for a secondary
Identity.

The frontend should not imply that every positive-scoring Identity is
meaningful enough to display as a secondary.

Likewise, the frontend should not imply that a secondary Identity is equally
strong as the primary Identity.

---

# 23. Archive Profile Terminology

The current Archive Profile contains several established fields whose names
are already semantically appropriate.

These should be preserved:

```text
primaryTrait
secondaryTrait
genreSignature
observationSummary
archiveSummary
primaryDesignation
primaryIdentity
```

Preferred presentation terminology is:

```text
Primary Trait
Secondary Trait
Genre Signature
Observation Summary
Archive Summary
Primary Designation
Primary Identity
```

No renaming is required.

---

# 24. Recommendation Terminology

Recommendation-oriented metadata should not be presented as a completed
Recommendation Engine.

For example:

```text
recommendation_bias
```

represents contextual recommendation tendencies.

It does not mean:

```text
Recommendation Score
```

and it does not mean that the current system has generated a recommendation.

The frontend should not imply recommendation functionality that the backend
does not currently provide.

Recommendation behavior remains future work.

---

# 25. Legacy Frontend Intelligence

Historical frontend code contained intelligence responsibilities that are now
owned by the backend.

Examples include:

```text
archiveDesignations
generateArchiveTitle
calculateDesignationConfidence
generateDesignationBasis
```

These functions should not be recreated in the frontend.

The current architectural boundary is:

```text
Backend
    ↓
calculate and explain intelligence

Frontend
    ↓
present and visualize intelligence
```

This is an architectural correction, not merely a terminology correction.

---

# 26. Terminology vs API Identifier

A frontend label and an API identifier do not need to be identical.

For example:

```text
API:
designationConfidence

Frontend:
Signal Strength
```

This is valid because the public identifier is preserved for compatibility
while the visible terminology accurately describes its semantic meaning.

Similarly:

```text
API:
designationBasis

Frontend:
Designation Basis
```

requires no rename because the existing identifier already describes the
concept adequately.

The frontend should not expose historical implementation terminology merely
because it exists in an API field name.

---

# 27. What the Frontend Must Not Invent

The frontend should not introduce terminology for concepts that do not exist
in the underlying intelligence system.

Do not introduce:

```text
Classification Confidence
Identity Confidence
Finding Confidence
Archive Confidence
Near-Tie Confidence
Recommendation Confidence
```

unless those concepts are explicitly defined and actually implemented.

The frontend is not the place to resolve conceptual ambiguity by inventing
labels.

---

# 28. Current Frontend Vocabulary

The preferred current vocabulary is:

## Entry / Scoring

```text
Score
Scoring
Universal Scoring
<Media Type> Scoring
```

## Archive Intelligence

```text
Traits
Genre Signals
Observations
Evidence
Evidence Strength
Findings
Archive Interpretation
Designations
Primary Designation
Designation Score
Designation Basis
Signal Strength
Identities
Primary Identity
Secondary Identity
Identity Score
Data Sufficiency
```

## Archive Profile

```text
Primary Trait
Secondary Trait
Genre Signature
Observation Summary
Archive Summary
```

## User-authored entry content

```text
Notes
```

---

# 29. Completed Frontend Terminology Alignment

The following terminology corrections have been implemented:

- `Universal Evaluation` → `Universal Scoring`
- `Core Evaluation Matrix` → `Universal Scoring Profile`
- `Media Evaluation` → `Media Scoring`
- `Evaluation Index` → `Score`
- `Evaluation Index Distribution` → `Score Distribution`
- `Average Evaluation Index` → `Average Score`
- `Average Evaluation Index by Classification` → `Average Score by Media Type`
- `Highest Evaluated Records` → `Highest Rated Records`
- frontend `Classification Confidence` presentation → `Signal Strength`
- entry-detail `Observations` for user notes → `Notes`

These changes are presentation terminology changes.

They do not alter the underlying scoring calculations.

---

# 30. Backend-Owned Intelligence Alignment

The frontend no longer needs to independently calculate or generate:

- Designation scores
- Designation confidence/signal values
- Designation basis
- archive designations
- archive title intelligence
- Identity scores
- Identity eligibility
- Identity ranking
- Identity primary selection
- Observation evidence strength
- Archive Profile intelligence

The backend is authoritative for these values.

The frontend consumes and presents them.

---

# 31. API Rename Policy

A frontend terminology correction does not automatically require an API field
rename.

The decision sequence is:

```text
Semantic meaning established
        ↓
Frontend label evaluated
        ↓
API field evaluated independently
        ↓
Consumer blast radius considered
        ↓
Rename only if justified
```

This prevents presentation cleanup from creating unnecessary API churn.

Current examples intentionally preserved:

```text
designationConfidence
designationConfidenceLabel
designationBasis
primaryDesignation
primaryIdentity
data_sufficiency
score
```

The Observation public field is now:

```text
evidenceStrength
```

because the public `confidence` terminology was misleading and the consumer
audit supported the migration.

---

# 32. Internal Frontend Terminology Debt

Not every internal variable needs to be renamed during Phase 1.

For example, an internal variable such as:

```text
confidenceLabel
```

may remain when its visible presentation is already:

```text
Signal Strength
```

Similarly, internal helper names associated with preserved backend calculations
do not need to change merely for aesthetic consistency.

Internal terminology cleanup can occur later as ordinary technical debt work.

---

# 33. Non-Goals

This document does not authorize:

- frontend framework migration
- React migration
- frontend architecture rewrite
- redesigning charts
- redesigning scoring algorithms
- redesigning Identity scoring
- redesigning Designation scoring
- implementing Classification Confidence
- implementing Finding confidence
- implementing recommendations
- creating a universal evidence schema
- changing API contracts without consumer audit
- changing backend behavior merely to match frontend wording

Terminology alignment should remain targeted.

---

# 34. Acceptance Criteria

Frontend terminology alignment is successful when:

- visible scoring terminology describes scoring rather than generic evaluation
- media types are not mislabeled as classifications
- entry notes are not confused with intelligence-layer Observations
- Designation is presented as a taste classification
- Identity is presented as a broader curatorial philosophy
- Designation signal strength is not presented as Classification Confidence
- Observation Evidence Strength is not presented as generic confidence
- Data Sufficiency is not presented as confidence
- nonexistent intelligence concepts are not invented in the UI
- backend-generated intelligence remains backend authoritative
- API identifiers are not renamed unnecessarily
- legacy frontend intelligence is not recreated
- frontend terminology matches the reconciled Phase 1 contract

---

# 35. Final Principle

The frontend should describe the intelligence system that actually exists.

It should not create a second interpretation of that system.

> **Presentation terminology may clarify the intelligence layer, but it should
> not redefine it.**

The goal of Phase 1 frontend terminology alignment is therefore not to make
every identifier aesthetically uniform.

The goal is to make the interface accurately communicate the semantics of the
existing intelligence architecture while preserving behavior and avoiding
unnecessary implementation churn.

These two are now aligned with the **post-Identity-migration state**, rather than the older Phase 1 state where Identity eligibility/secondary behavior and Observation terminology were still unresolved. The main thing I intentionally **didn't** do is turn every historical internal name into a rename just for cleanliness.
