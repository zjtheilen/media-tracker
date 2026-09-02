# Frontend Terminology Alignment

```text
__    __ ___    ___ ___  ____ ___
\ \/\/ // _ \  _\\ / _ \ | D )| |
 \_/\_//_/ \_\/__//_/ \_\|_D_)|_|
 Weighted Archive System for Analysis & Behavioral Insights
```

**Project:** Media Tracker

**Authoritative branch:** `develop-3`

**Status:** Reconciled Phase 1 frontend terminology reference

**Semantic authority:** `phase-1-intelligence-alignment.md`

**API terminology reference:** `phase-1-terminology-and-api-rename-map.md`

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document maps terminology currently used by the frontend against the
reconciled Phase 1 semantic vocabulary.

Its purpose is to identify:

* terminology that accurately represents the underlying data
* terminology that is misleading or historically drifted
* terminology that can safely be corrected at the presentation layer
* terminology that requires further semantic investigation
* API/domain terminology that must not be renamed merely because the frontend
  label is ambiguous
* frontend intelligence logic that belongs in the backend rather than the
  presentation layer

This is a **Phase 1 planning and verification document**.

It does not independently redefine the Intelligence Contract.

It does not authorize backend or frontend implementation changes by itself.

The repository remains authoritative for current implementation.

---

# 2. Authority / Scope

Terminology decisions in this document are governed by the following order:

1. `phase-1-intelligence-alignment.md`
2. `phase-1-terminology-and-api-rename-map.md`
3. Current repository implementation on `develop-3`
4. Verified consumer relationships and frontend usage
5. Historical project intent and previous audit material

If implementation and terminology disagree, the implementation must be
investigated rather than silently reinterpreted.

If the semantic meaning cannot be established:

> **UNRESOLVED — insufficient repository evidence.**

This document concerns **frontend terminology and frontend/backend
responsibility**.

It does not independently redefine:

* Traits
* Genre Signals
* Observations
* Findings
* Designations
* Identities
* Recommendation Signals
* Recommendation behavior

Those concepts are governed by the reconciled Phase 1 intelligence contract.

---

# 3. Reconciled Semantic Vocabulary

The Phase 1 vocabulary relevant to frontend presentation is:

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

These are parallel analytical perspectives.

They are not interchangeable.

The frontend should present their distinct roles rather than flattening them
into generic terminology.

---

# 4. Quantitative Vocabulary

The frontend must distinguish the following concepts where they are actually used:

| Term | Meaning |
| --- | --- |
| **Signal Strength** | How strongly a quality or signal is expressed |
| **Data Sufficiency** | Whether enough archive data exists to evaluate a conclusion |
| **Evidence Strength** | How strongly available evidence supports a conclusion |
| **Classification Confidence** | How clearly one classification outranks plausible alternatives; a future/optional concept that is not currently defined or implemented in Phase 1 |

These concepts are not interchangeable.

In particular:

```text
designationConfidence
```

does **not** automatically mean:

```text
Classification Confidence
```

and:

```text
evidenceStrength
```

on an Observation does **not** automatically mean generic confidence.

Frontend labels should communicate the actual semantic meaning of the underlying field.

---

# 5. Alignment Rules

## Rule 1 — Correct misleading presentation terminology where semantics are already locked

If the frontend label clearly misrepresents an established semantic concept,
the visible label may be corrected without changing the API field or
calculation.

Example:

```text
API field:
designationConfidence

Frontend label:
Signal Strength
```

The underlying calculation remains unchanged.

---

## Rule 2 — Do not rename API fields merely because the frontend label is questionable

The following identifiers are API/domain terminology and should not be
renamed merely to make frontend wording cleaner:

```text
designationBasis
designationConfidence
primaryDesignation
primaryIdentity
data_sufficiency
score
evidence
recommendation_bias
```

A public API rename requires the field-level consumer audit described in
`phase-1-terminology-and-api-rename-map.md`.

---

## Rule 3 — Frontend labels must not invent unresolved semantics

Do not introduce labels such as:

```text
Classification Confidence
Identity Confidence
Finding Confidence
Near-Tie Confidence
Archive Confidence
```

unless the underlying semantic concept has been explicitly defined and the
frontend actually consumes such a value.

Unresolved concepts remain unresolved.

---

## Rule 4 — Frontend should present intelligence rather than independently define it

The intended responsibility boundary is:

### Backend

Responsible for:

* calculating Traits
* calculating Genre Signals
* evaluating Observations
* evaluating Findings
* calculating Designation scores
* selecting the Primary Designation
* calculating Identity scores
* determining Identity Data Sufficiency
* ranking Identity candidates
* selecting the Primary Identity
* producing explanation/evidence
* producing recommendation-oriented metadata

### Frontend

Responsible for:

* presenting intelligence
* formatting values
* displaying evidence
* visualizing results
* presenting explanations
* handling user interaction
* filtering and sorting for presentation where appropriate

The frontend should not independently reproduce intelligence calculations.

---

## 6. Terminology Alignment Table

| ID    | Current Frontend Term                      | Location                                             | Underlying Meaning                                   | Reconciled Semantic Category | Recommended Frontend Term                          | Safe to Change Now? | Risk | Classification | Status                 |
| ----- | ------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------- | -------------------------------------------------- | ------------------- | ---- | -------------- | ---------------------- |
| FO-01 | `CLASSIFICATION`                           | `entries.js` — entry `media_type`                    | The type/category of media consumed                  | Media Type                   | **MEDIA TYPE**                                     | YES                 | LOW  | ALIGN          | Verified               |
| FO-02 | Evaluation Index                           | `entries.js` / archive entry display                 | User's overall numeric rating                        | Score                        | **Score**                                          | YES                 | LOW  | ALIGN          | Verified               |
| FO-03 | Evaluation Index                           | `entries.js` / entry display                         | User's overall numeric rating                        | Score                        | **Score**                                          | YES                 | LOW  | ALIGN          | Verified               |
| FO-04 | Evaluation Index                           | `charts.js` / archive analytics                      | Aggregate rating value                               | Score                        | **Score**                                          | YES                 | LOW  | ALIGN          | Verified               |
| FO-05 | Evaluation Index Distribution              | `charts.js`                                          | Distribution of user rating values                   | Score Distribution           | **Score Distribution**                             | YES                 | LOW  | ALIGN          | Verified               |
| FO-06 | Average Evaluation Index                   | `charts.js`                                          | Average user rating                                  | Average Score                | **Average Score**                                  | YES                 | LOW  | ALIGN          | Verified               |
| FO-07 | Average Evaluation Index by Classification | `charts.js`                                          | Average rating grouped by media type                 | Average Score by Media Type  | **Average Score by Media Type**                    | YES                 | LOW  | ALIGN          | Verified               |
| FO-08 | Highest Evaluated Records                  | `charts.js`                                          | Records with highest user ratings                    | Highest Rated Records        | **Highest Rated Records**                          | YES                 | LOW  | ALIGN          | Verified               |
| FO-09 | Evaluation                                 | `entries.js` / rating presentation                   | User-provided scoring                                | Scoring                      | **Scoring**                                        | YES                 | LOW  | ALIGN          | Verified               |
| FO-10 | Evaluation Index                           | `entries.js` / rating presentation                   | Overall user rating                                  | Score                        | **Score**                                          | YES                 | LOW  | ALIGN          | Verified               |
| FO-11 | Evaluation Index                           | `charts.js`                                          | Aggregate rating value                               | Score                        | **Score**                                          | YES                 | LOW  | ALIGN          | Verified               |
| FO-12 | Evaluation Index Distribution              | `charts.js`                                          | Distribution of rating values                        | Score Distribution           | **Score Distribution**                             | YES                 | LOW  | ALIGN          | Verified               |
| FO-13 | Average Evaluation Index                   | `charts.js`                                          | Average rating                                       | Average Score                | **Average Score**                                  | YES                 | LOW  | ALIGN          | Verified               |
| FO-14 | Average Evaluation Index by Classification | `charts.js`                                          | Average rating grouped by media type                 | Average Score by Media Type  | **Average Score by Media Type**                    | YES                 | LOW  | ALIGN          | Verified               |
| FO-15 | Highest Evaluated Records                  | `charts.js`                                          | Highest-rated records                                | Highest Rated Records        | **Highest Rated Records**                          | YES                 | LOW  | ALIGN          | Verified               |
| FO-16 | Classification                             | `charts.js` / media grouping                         | Media type grouping                                  | Media Type                   | **Media Type**                                     | YES                 | LOW  | ALIGN          | Verified               |
| FO-17 | Universal Evaluation                       | `forms.js` — entry scoring section                   | User-provided universal scoring dimensions           | Scoring Dimensions           | **Universal Scoring**                              | YES                 | LOW  | ALIGN          | **Verified**           |
| FO-18 | `<Media Type> Evaluation`                  | `forms.js` — entry scoring section                   | User-provided media-specific scoring dimensions      | Scoring Dimensions           | **<Media Type> Scoring**                           | YES                 | LOW  | ALIGN          | **Verified**           |
| FO-19 | Core Evaluation Matrix                     | `charts.js` — universal scoring visualization        | Aggregate universal scoring dimensions/averages      | Universal Scoring Profile    | **Universal Scoring Profile**                      | YES                 | LOW  | ALIGN          | **Verified**           |
| FO-20 | Classification Confidence                  | `charts.js` — `archiveProfile.designationConfidence` | Strength of the designation signal                   | Signal Strength              | **Signal Strength**                                | YES                 | LOW  | ALIGN          | Verified               |
| FO-21 | Designation Basis                          | `charts.js` / designation display                    | Explanation/basis for the selected designation       | Designation Basis            | **Designation Basis**                              | NO                  | LOW  | PRESERVE       | **Verified / Correct** |
| FO-22 | `designationBasis`                         | API field                                            | Designation explanation/basis                        | Designation Basis            | **Preserve API field**                             | NO                  | LOW  | PRESERVE       | Verified               |
| FO-23 | `designationConfidence`                    | API field                                            | Designation signal strength                          | Signal Strength              | **Preserve API field; present as Signal Strength** | NO                  | LOW  | PRESERVE       | Verified               |
| FO-24 | `primaryDesignation`                       | API/profile                                          | Deterministically selected primary designation       | Primary Designation          | **Primary Designation**                            | NO                  | LOW  | PRESERVE       | Verified               |
| FO-25 | Designation                                | Frontend designation display                         | Named taste classification                           | Designation                  | **Designation**                                    | NO                  | LOW  | PRESERVE       | Verified               |
| FO-26 | Observations                               | `entries.js` — entry detail                          | User-authored `entry.notes` content                  | Notes                        | **Notes**                                          | YES                 | LOW  | ALIGN          | **Verified**           |
| FO-27 | Archive Observations                       | Archive intelligence display                         | Backend-generated recurring archive patterns         | Observations                 | **Archive Observations**                           | NO                  | LOW  | PRESERVE       | Verified               |
| FO-28 | Archive Findings                           | Archive intelligence display                         | Backend-generated interpretive findings              | Findings                     | **Archive Findings**                               | NO                  | LOW  | PRESERVE       | Verified               |
| FO-29 | Archive Interpretation                     | Archive intelligence display                         | Backend-generated interpretation/narrative layer     | Interpretation               | **Archive Interpretation**                         | NO                  | LOW  | PRESERVE       | **Verified / Correct** |
| FO-30 | `primaryTrait`                             | Archive profile                                      | Primary archive-level trait signal                   | Primary Trait                | **Primary Trait**                                  | NO                  | LOW  | PRESERVE       | **Verified / Correct** |
| FO-31 | `secondaryTrait`                           | Archive profile                                      | Secondary archive-level trait signal                 | Secondary Trait              | **Secondary Trait**                                | NO                  | LOW  | PRESERVE       | **Verified / Correct** |
| FO-32 | `genreSignature`                           | Archive profile                                      | Generated archive-level genre summary                | Genre Signature              | **Genre Signature**                                | NO                  | LOW  | PRESERVE       | **Verified / Correct** |
| FO-33 | `observationSummary`                       | Archive profile                                      | Generated summary of intelligence-layer observations | Observation Summary          | **Observation Summary**                            | NO                  | LOW  | PRESERVE       | **Verified / Correct** |
| FO-34 | `archiveSummary`                           | Archive profile                                      | Generated archive-level synthesis                    | Archive Summary              | **Archive Summary**                                | NO                  | LOW  | PRESERVE       | **Verified / Correct** |
| FO-35 | `archiveDesignations`                      | Legacy frontend intelligence                         | Superseded frontend designation generation           | Legacy / Removed             | **Removed / Backend authoritative**                | N/A                 | N/A  | REMOVE         | Verified               |
| FO-36 | `generateArchiveTitle`                     | Legacy frontend intelligence                         | Superseded frontend title generation                 | Legacy / Removed             | **Removed / Backend authoritative**                | N/A                 | N/A  | REMOVE         | Verified               |
| FO-37 | `calculateDesignationConfidence`           | Legacy frontend intelligence                         | Superseded frontend designation calculation          | Legacy / Removed             | **Removed / Backend authoritative**                | N/A                 | N/A  | REMOVE         | Verified               |
| FO-38 | `generateDesignationBasis`                 | Legacy frontend intelligence                         | Superseded frontend designation explanation          | Legacy / Removed             | **Removed / Backend authoritative**                | N/A                 | N/A  | REMOVE         | Verified               |

### Table Notes

* **FO-17 and FO-18:** “Evaluation” was historically used for the entry scoring UI, but the underlying data represents user-provided scoring dimensions. `Universal Scoring` and `<Media Type> Scoring` are therefore more precise frontend terminology.
* **FO-19:** `Core Evaluation Matrix` does not represent a separate intelligence concept. The visualization presents aggregate universal scoring dimensions, so `Universal Scoring Profile` is the more precise presentation term.
* **FO-21:** `Designation Basis` is semantically valid. It describes the basis used to explain the selected designation and does not require terminology correction.
* **FO-26:** The entry-detail “Observations” heading refers to user-authored `entry.notes`, not intelligence-layer Observations. `Notes` is therefore the correct presentation term.
* **FO-27 through FO-34:** These terms have been verified against the backend archive-profile architecture and are semantically appropriate. No terminology change is required.
* **FO-35 through FO-38:** These represent legacy frontend intelligence functionality that has already been superseded by backend-owned intelligence. They are not candidates for terminology alignment.
* `designationConfidence` remains the existing API identifier for compatibility, but its reconciled semantic meaning is **Signal Strength**, not Classification Confidence.
* The public Observation field is `evidenceStrength`; it represents **Evidence Strength**, not generic Confidence.

---

# 7. Designation Terminology

Designation is a named taste classification.

The frontend should use:

```text
Designation
Primary Designation
```

rather than introducing terminology that implies Designation is an Identity.

The following distinction is mandatory:

```text
Designation
    ↓
What recognizable taste classification fits?

Identity
    ↓
What kind of curator does this archive describe?
```

---

## 7.1 Designation Score

A Designation score represents how well the archive fits a Designation's
defined classification.

It should not be labeled as Classification Confidence unless a separate
Classification Confidence measure is actually implemented.

---

## 7.2 `designationConfidence`

The existing API identifier may remain:

```text
designationConfidence
```

The frontend should not interpret that identifier literally.

Its reconciled semantic meaning is:

> **Signal Strength**

Therefore the preferred frontend presentation is:

```text
Signal Strength
```

not:

```text
Classification Confidence
```

This is a terminology correction, not a calculation change.

---

## 7.3 `designationBasis`

The API field remains:

```text
designationBasis
```

The frontend may present it as:

```text
Designation Basis
```

unless repository evidence establishes a more precise explanation-oriented
label.

Do not rename the API field merely to improve the frontend label.

---

# 8. Observation Terminology

Observations describe directly demonstrable recurring patterns.

The frontend should use:

```text
Observation
Observations
Archive Observations
Evidence
Evidence Strength
```

where those concepts are actually represented.

---

## 8.1 Observation `evidenceStrength`

The public Observation field is:

```text
evidenceStrength
```

Its reconciled semantic meaning is:

> **Evidence Strength**

Specifically, it represents threshold-relative support for the Observation's designated supporting signal.

The frontend should therefore prefer:

```text
Evidence Strength
```

over:

```text
Confidence
```

Do not imply that the value represents:

* probability
* statistical confidence
* certainty
* general confidence across all rule predicates

---

# 9. Finding Terminology

Findings provide interpretive conclusions.

The frontend should distinguish:

```text
Observation
```

from:

```text
Finding
```

An Observation answers:

> What can we directly demonstrate?

A Finding answers:

> What does the available evidence suggest?

A Finding must add meaningful interpretation rather than merely restating an
Observation.

---

## 9.1 Finding Confidence

Finding confidence remains unresolved.

The frontend must not invent a label or numerical interpretation for Finding
confidence until its semantics are explicitly defined.

Do not automatically label a future Finding value as:

```text
Confidence
```

or:

```text
Evidence Strength
```

without a locked semantic decision.

---

# 10. Identity Terminology

Identity describes the broader curator philosophy represented by the archive.

The frontend should use:

```text
Primary Identity
Secondary Identities
Identity
```

where appropriate.

Identity must not be presented as a synonym for Designation.

---

## 10.1 Identity Score

Identity score represents alignment with the Identity's defined signals.

It is distinct from Data Sufficiency.

Do not label Identity score as:

```text
Confidence
```

merely because it is a numerical value.

---

## 10.2 Identity Data Sufficiency

The reconciled semantic term is:

```text
Data Sufficiency
```

It describes whether enough archive data exists to meaningfully evaluate the
Identity.

The frontend should use:

```text
Data Sufficiency
```

where this concept is exposed.

---

## 10.3 Classification Confidence

Classification Confidence remains a conceptual category rather than a
guaranteed current field.

The frontend must not display a Classification Confidence value unless the
backend actually provides a value with that semantic meaning.

---

# 11. Secondary Identity Presentation

The Profile may present:

```text
Primary Identity
Secondary Identities
```

but the existence of a positive Identity score does not automatically mean
the Identity should be displayed.

Meaningfulness and threshold policy remain separate decisions.

The frontend must not invent a threshold such as:

```text
score > X
```

to determine Secondary Identities.

That policy belongs to the intelligence layer.

---

# 12. Tie and Close-Competitor Presentation

The frontend must not independently invent a near-tie threshold.

Potential presentation may eventually include:

* close competitors
* ranked alternatives
* tied candidates

but the underlying policy must come from the Intelligence Layer.

The frontend's responsibility is presentation, not deciding whether two
classifications are conceptually close.

---

# 13. Evidence Terminology

The frontend should present evidence according to the subsystem that produced
it.

Examples:

```text
Observation
    Evidence
    Evidence Strength

Finding
    Supporting Evidence

Designation
    Designation Basis / Explanation

Identity
    Contribution Breakdown
    Data Sufficiency
```

These do not need to be represented using one universal frontend component or
one universal API structure.

The goal is explainability.

---

# 14. Archive State

The intelligence layer recognizes the conceptual states:

```text
EMPTY
SPARSE
ESTABLISHED
```

The operational thresholds remain unresolved.

The frontend may eventually communicate limited-data conditions, but it should
not invent the thresholds that determine them.

The UI should not imply false certainty when the underlying intelligence layer
has insufficient evidence.

---

# 15. Analytics Terminology

Analytics should describe quantitative information.

Preferred terminology includes:

```text
Score
Average Score
Score Distribution
Average Score by Media Type
Highest Rated Records
```

Avoid replacing established score terminology with ambiguous terms such as:

```text
Evaluation Index
Evaluation
Classification
```

when the underlying value is simply `total_score`.

---

# 16. Scoring Terminology

Where the frontend is displaying the actual scoring interface rather than
interpreted intelligence, terminology should distinguish:

```text
Scoring Dimensions
```

from:

```text
Traits
```

A scoring dimension is not automatically a Trait.

A Trait is an intelligence-layer signal derived from archive data.

Therefore the frontend should not rename scoring dimensions to Traits merely
because both are numerical.

---

# 17. Media Type Terminology

When the underlying value is:

```text
entry.media_type
```

the frontend should use:

```text
Media Type
```

rather than:

```text
Classification
```

unless `Classification` has a separate explicitly defined meaning in that
context.

This is a presentation terminology correction only.

---

# 18. Notes / Review Terminology

Entry-level user-authored text should not be labeled `Observations` merely
because the intelligence layer contains an Observation concept.

If the field represents user-authored notes, the preferred presentation term
is:

```text
Notes
```

The future archive `Review` concept is distinct from intelligence-layer
Observations.

A Review may eventually become an intelligence input, but it does not thereby
become an Observation.

---

# 19. Legacy Frontend Intelligence

The frontend previously contained intelligence-related logic that has since
been superseded by backend-authoritative behavior.

Examples include:

```text
archiveDesignations
generateArchiveTitle()
calculateDesignationConfidence()
generateDesignationBasis()
```

These should not be reintroduced as frontend intelligence engines.

The backend is authoritative for:

* Designation definitions
* Designation scoring
* Primary Designation selection
* Designation explanation
* Identity calculation
* Identity ranking
* Observation evaluation
* Finding evaluation

The frontend should consume those results.

---

# 20. Frontend / Backend Responsibility Boundary

The intended architecture is:

```text
RAW ARCHIVE
    ↓
BACKEND INTELLIGENCE
    ↓
API / PROFILE DATA
    ↓
FRONTEND PRESENTATION
```

The frontend may transform data for presentation.

Examples of acceptable frontend behavior:

* formatting numbers
* sorting visible rows
* filtering visible results
* choosing chart representations
* expanding/collapsing explanations
* rendering evidence
* formatting dates
* selecting display labels

Examples of behavior that should remain backend-owned:

* calculating Trait scores
* calculating Genre Signals
* evaluating Observation rules
* evaluating Finding rules
* calculating Designation scores
* determining Primary Designation
* calculating Identity scores
* determining Identity eligibility
* ranking Identity candidates
* determining Primary/Secondary Identity semantics
* calculating Observation Evidence Strength
* inventing recommendation weights

---

# 21. API Compatibility

A frontend terminology correction does not require an API rename.

For example:

```text
API:
designationConfidence

Frontend:
Signal Strength
```

is valid when the underlying calculation already represents Signal Strength.

Likewise:

```text
API:
evidenceStrength

Frontend:
Evidence Strength
```

is valid because the Observation API already exposes its threshold-relative Evidence Strength semantics under `evidenceStrength`.

The API field should remain unchanged unless the dedicated API rename map
explicitly authorizes a future rename.

---

# 22. Do Not Globally Rename `confidence`

The existence of a `confidence` field or historical use of the term `confidence` does not justify a global rename.

Each occurrence must be evaluated according to its actual semantic role.

Current reconciled mappings include:

| Existing Field / Concept | Frontend Meaning | Status |
| --- | --- | --- |
| Identity `data_sufficiency` | Data Sufficiency | Preserve |
| Identity `score` | Identity alignment strength | Preserve |
| Designation `designationConfidence` | Signal Strength | Preserve API field; clarify frontend terminology |
| Observation `evidenceStrength` | Evidence Strength | Preserve API field and frontend terminology |
| Finding `confidence` | Unresolved | No current defined field/concept |
| Classification Confidence | Classification separation concept | Future/optional; not currently defined or implemented |

Therefore:

* Do not globally rename `confidence`.
* Do not assume all historical uses of `confidence` represent the same concept.
* Do not rename an API field solely because its frontend presentation needs clarification.
* Resolve terminology according to the subsystem that owns the underlying meaning.
* Preserve unresolved concepts as unresolved rather than assigning them a new semantic meaning.

The goal is **semantic alignment**, not vocabulary normalization for its own sake.

---

# 23. Required Consumer Verification

Before changing a frontend label or API field, verify:

* the field's actual producer
* the field's actual meaning
* all known frontend consumers
* whether charts consume the field
* whether narrative components consume the field
* whether tests assert the field or label
* whether fixtures depend on the field
* whether another frontend component interprets the value differently

A terminology change is complete only when its downstream impact is
understood.

---

# 24. Safe Presentation Changes

The following types of changes are generally safe once the specific occurrence
is verified:

* `EVALUATION INDEX` → `SCORE`
* `Evaluation Index Distribution` → `Score Distribution`
* `EVALUATION BY CLASSIFICATION` → `AVERAGE SCORE BY MEDIA TYPE`
* `CLASSIFICATION` → `MEDIA TYPE` where the underlying value is `media_type`
* `Highest Evaluated Records` → `Highest Rated Records`
* `Classification Confidence` → `Signal Strength` when the underlying field is
  `designationConfidence`

These changes alter presentation terminology, not intelligence behavior.

---

# 25. Changes That Require Semantic Verification

The following should not be changed merely for consistency:

```text
Universal Evaluation
<Media Type> Evaluation
Core Evaluation Matrix
Designation Basis
Archive Interpretation
primaryTrait
secondaryTrait
genreSignature
observationSummary
archiveSummary
```

These require verification of the actual backend semantics and frontend usage.

---

# 26. Changes Explicitly Deferred

The following changes remain outside the scope of Phase 1 frontend terminology alignment:

* Finding Confidence
* Classification Confidence values that do not currently exist
* Secondary Identity thresholds
* Tie / near-tie thresholds
* Archive-state thresholds
* Recommendation weighting
* New or alternative Observation terminology
* Unresolved Identity terminology or policy
* Unresolved Designation terminology or policy

These items may require explicit semantic or behavioral decisions before frontend terminology is changed.

Deferral does not mean that the underlying subsystem terminology is undefined. Where terminology has already been reconciled, the frontend should use that established vocabulary. Only unresolved or newly proposed terminology remains deferred.

---

# 27. Testing Requirements

Frontend terminology changes should have regression coverage where the
terminology is behaviorally significant.

Protect:

### Analytics

* score labels
* score sorting
* score distribution
* media-type grouping

### Designations

* Primary Designation display
* Designation explanation
* Signal Strength presentation
* recommendation-bias presentation

### Observations

* Observation display
* evidence display
* Evidence Strength presentation

### Findings

* Finding display
* supporting evidence presentation

### Identities

* Primary Identity display
* Secondary Identity display
* Data Sufficiency presentation
* contribution breakdown

### API

* response field compatibility
* serialization
* frontend field consumption

Terminology-only changes should not require calculation changes.

---

# 28. Phase 1 Frontend Alignment Checklist

Before considering frontend terminology alignment complete:

* [ ] Confirm all frontend intelligence labels use the reconciled Phase 1 vocabulary
* [ ] Present `designationConfidence` as **Signal Strength** where exposed
* [ ] Present Observation `evidenceStrength` as **Evidence Strength** where exposed
* [ ] Do not present Identity Score as Confidence
* [ ] Do not present Data Sufficiency as Confidence
* [ ] Do not present unresolved Finding Confidence as an established metric
* [ ] Do not present Classification Confidence unless an actual backend value exists
* [ ] Preserve established Designation and Identity terminology
* [ ] Preserve subsystem-specific Evidence terminology
* [ ] Do not introduce frontend-only intelligence calculations
* [ ] Verify terminology changes against actual consumers
* [ ] Run relevant frontend and backend regression tests where terminology changes affect behavior or serialized contracts
* [ ] Leave unresolved semantic and policy decisions explicitly unresolved

Completion means the frontend communicates the intelligence system's established semantics accurately without changing the intelligence itself.

---

# 29. Phase 1 Boundary

The frontend terminology alignment work is complete when the frontend:

1. Uses terminology that reflects the reconciled semantic contract.
2. Does not describe Signal Strength as Classification Confidence.
3. Does not describe Observation Evidence Strength as generic confidence where
   the distinction is exposed.
4. Does not confuse Identity with Designation.
5. Does not invent unresolved intelligence policies.
6. Does not reproduce backend intelligence calculations.
7. Does not require API renames merely to correct presentation terminology.
8. Preserves backend-authoritative intelligence behavior.
9. Has regression coverage for behaviorally significant terminology changes.
10. Leaves unresolved semantic decisions explicitly unresolved.

---

# 30. Governing Principle

> **The frontend should make the intelligence easier to understand, not change
> what the intelligence means.**

Terminology should accurately communicate the underlying semantics.

Where semantics are locked, misleading presentation terminology should be
corrected.

Where semantics are unresolved, the frontend should remain conservative.

Where API fields are historically named but semantically valid, presentation
terminology may be corrected without forcing an API rename.

The goal is **semantic clarity without architectural churn**.
