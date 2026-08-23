# Frontend Terminology Alignment

## Purpose

This document maps terminology currently used by the frontend against the frozen WASABI semantic vocabulary and the Phase 1 Semantic Decision Register.

Its purpose is to identify:

- terminology that accurately represents the underlying data
- terminology that is misleading or historically drifted
- terminology that can safely be corrected at the presentation layer
- terminology that requires further semantic investigation
- API/domain terminology that must not be renamed merely because the frontend label is ambiguous
- frontend intelligence logic that may belong in the backend rather than the presentation layer

This is a **Phase 1 planning and verification document**.

It does not authorize architectural changes by itself.

The repository remains authoritative for current implementation.

---

## Authority / Scope

Terminology decisions in this document are governed by the following order:

1. Current repository implementation on `develop-3`
2. Frozen WASABI Semantic Library
3. Phase 1 Semantic Decision Register
4. Verified Relationship Map / Relationship Verification Matrix
5. Historical project intent and previous audit material

If implementation and terminology disagree, the implementation must be investigated rather than silently reinterpreted.

If the semantic meaning cannot be established:

> **UNRESOLVED — insufficient repository evidence.**

This document concerns **frontend terminology and frontend/backend responsibility**.

It does not independently redefine WASABI semantics.

---

# Frozen Semantic Vocabulary

The current working WASABI vocabulary is:

```text
Scoring Dimensions
    ↓
Traits
    ↓
Derived Traits
    ↓
Genre Signals
    ↓
        ┌── Observations
        ├── Findings
        ├── Designations
        ├── Identities
        └── Interpretations
```

These are related intelligence layers, but they are not interchangeable.

## Traits

Traits represent measurable characteristics of the archive derived from scoring and/or other established archive-level inputs.

Traits are not interchangeable with:

- Observations
- Findings
- Designations
- Identities
- Interpretations

The current trait names and formulas are considered provisional examples rather than a finalized taxonomy.

---

## Derived Traits

Derived Traits are calculated characteristics derived from existing archive-level data rather than directly entered scoring dimensions.

Current implementations are considered provisional.

The existence of derived-trait infrastructure is established, but the long-term taxonomy and formulas remain subject to future refinement.

---

## Genre Signals

Genre Signals identify meaningful patterns in genre data.

They are intended to describe patterns such as:

- unusually strong genre presence
- genre concentration
- genre combinations
- genre ratios
- relationships between genres

Genre Signals are not merely genre labels.

They may provide upstream signals to other intelligence layers.

The exact future taxonomy remains intentionally open.

---

## Observations

Observations identify directly demonstrated patterns or signals in the archive.

They should be relatively objective and evidence-backed.

An Observation should answer something similar to:

> "What can we directly observe about this archive?"

Observations may consume:

- Traits
- Derived Traits
- Genre Signals
- archive metrics
- genre statistics
- other established measurements

Observations and Findings are intentionally distinct.

---

## Findings

Findings provide a more interpretive conclusion than an Observation.

They should add information rather than merely rename or restate an Observation.

A Finding should answer something similar to:

> "What does the combination of observed evidence suggest?"

Current Finding examples are provisional and may eventually be replaced or reorganized.

---

## Designations

Designations provide named taste classifications.

They answer something closer to:

> "What recognizable taste classification fits this archive?"

Designations are intentionally distinct from Identities.

Current Designation names and rules are provisional examples.

---

## Identities

Identities describe the broader kind of curator represented by the archive.

They answer something closer to:

> "What kind of curator does this archive represent?"

Identity assignment and Identity Explanation are distinct concepts.

The Identity states the resulting assignment.

Identity Explanation provides the evidence and reasoning supporting that assignment.

---

## Interpretations

Interpretations turn underlying intelligence into understandable meaning or language.

Interpretations may consume:

- Traits
- Genre Signals
- Observations
- Findings
- Designations
- Identities
- other archive-level intelligence

Interpretation is not merely a formatting layer.

It may eventually become substantially richer than the current implementation.

---

# Alignment Rules

## Rule 1 — Presentation terminology may be corrected without changing domain behavior

If the frontend label clearly misrepresents the underlying data, the visible label may be corrected without renaming the API field or changing the calculation.

Example:

```text
Average Score by Media Type
```

when the implementation actually groups entries by `media_type` and averages `total_score`.

Correct presentation:

```text
Average Score by Media Type
```

---

## Rule 2 — Do not rename API fields merely because their terminology is questionable

Examples:

```text
classificationBasis
designationConfidence
primaryDesignation
primaryIdentity
```

remain unchanged until the backend/domain semantics and all consumers have been explicitly audited.

---

## Rule 3 — Do not introduce new WASABI categories through frontend terminology

The frontend must not cause concepts such as `Classification` to become new WASABI intelligence layers merely because the word currently appears in UI code.

---

## Rule 4 — Frontend should present intelligence rather than independently define it

The intended responsibility boundary is:

### Backend

Responsible for:

- calculating Traits
- calculating Derived Traits
- calculating Genre Signals
- evaluating Observations
- evaluating Findings
- assigning Designations
- assigning Identities
- producing Identity Explanation
- generating Interpretations
- calculating intelligence-related evidence and supporting metadata

### Frontend

Responsible for:

- presenting intelligence
- formatting values
- displaying evidence
- visualizing results
- presenting explanations
- handling user interaction
- filtering and sorting for presentation where appropriate

The frontend should not independently reproduce WASABI intelligence calculations.

---

# Terminology Alignment Table

This table reflects the actual frontend occurrence audit performed against
`develop-3`.

The table distinguishes:

- clearly misleading presentation terminology
- terminology that is semantically ambiguous
- API/domain terminology that must remain frozen
- frontend intelligence logic that appears to be legacy or potentially dead
- terminology that already aligns with the frozen Semantic Library

The presence of an item in this table does **not** authorize an implementation
change. Each change must still be validated against its consumers and tests.

| ID    | Current Text / Identifier                    | File         | Context                          | Underlying Data / Behavior                                                                 | Semantic Category                           | Recommended Terminology / Treatment                           | Safe to Change Now? | Risk   | Backend Dependency                | Classification     | Status                         |
| ----- | -------------------------------------------- | ------------ | -------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------- | ------------------- | ------ | --------------------------------- | ------------------ | ------------------------------ |
| FO-01 | `CLASSIFICATION`                             | `entries.js` | Entry metadata                   | `entry.media_type`                                                                         | Media Type                                  | `MEDIA TYPE`                                                  | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-02 | `EVALUATION INDEX`                           | `entries.js` | Entry score display              | `entry.total_score`                                                                        | Score                                       | `SCORE`                                                       | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-03 | `Evaluation Index (Highest)`                 | `index.html` | Library sorting                  | `total_score` descending                                                                   | Score                                       | `Score (Highest)`                                             | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-04 | `Evaluation Index (Lowest)`                  | `index.html` | Library sorting                  | `total_score` ascending                                                                    | Score                                       | `Score (Lowest)`                                              | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-05 | `EVALUATION BY CLASSIFICATION`               | `index.html` | Analytics chart                  | Average `total_score` grouped by `media_type`                                              | Score / Media Type                          | `AVERAGE SCORE BY MEDIA TYPE`                                 | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-06 | `Average Score by Media Type` | `charts.js`  | Analytics chart title            | Average `total_score` grouped by `media_type`                                              | Score / Media Type                          | `Average Score by Media Type`                                 | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-07 | `Average Score`                              | `charts.js`  | Chart dataset label              | Average `total_score`                                                                      | Score                                       | Preserve                                                      | YES                 | LOW    | None                              | PRESERVE           | Already aligned                |
| FO-08 | `EVALUATION DISTRIBUTION`                    | `index.html` | Analytics chart                  | Distribution of `total_score`                                                              | Score                                       | `SCORE DISTRIBUTION`                                          | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-09 | `Evaluation Index Distribution`              | `charts.js`  | Analytics chart title            | Distribution of `total_score`                                                              | Score                                       | `Score Distribution`                                          | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-10 | `Evaluation Index`                           | `lists.js`   | List/report ordering metadata    | `total_score`                                                                              | Score                                       | `Score`                                                       | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-11 | `ORDER BY EVALUATION INDEX DESC`             | `lists.js`   | List/report display              | Orders by `total_score` descending                                                         | Score                                       | `ORDER BY SCORE DESC`                                         | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-12 | `FILTER: EVALUATION INDEX >= 95%`            | `lists.js`   | List/report display              | Filters by `total_score`                                                                   | Score                                       | `FILTER: SCORE >= 95%`                                        | YES                 | LOW    | None                              | ALIGN              | Planned                        |
| FO-13 | `Highest Evaluated Records`                  | `lists.js`   | List/report title                | Highest `total_score` records                                                              | Score                                       | `Highest Rated Records` or context-specific score terminology | YES, contextually   | LOW    | None                              | ALIGN              | Planned                        |
| FO-14 | `Highest Rated Books`                        | `lists.js`   | List/report title                | Highest `total_score` books                                                                | Score                                       | Preserve                                                      | YES                 | LOW    | None                              | PRESERVE           | Already aligned                |
| FO-15 | `Highest Rated Games`                        | `lists.js`   | List/report title                | Highest `total_score` games                                                                | Score                                       | Preserve                                                      | YES                 | LOW    | None                              | PRESERVE           | Already aligned                |
| FO-16 | `Highest Rated Videos`                       | `lists.js`   | List/report title                | Highest `total_score` videos                                                               | Score                                       | Preserve                                                      | YES                 | LOW    | None                              | PRESERVE           | Already aligned                |
| FO-17 | `Universal Evaluation`                       | `forms.js`   | Entry scoring section            | Universal scoring dimensions returned by scoring profile                                   | Scoring Dimensions                          | Possibly `Universal Scoring`                                  | NO                  | LOW    | Backend scoring profile           | CLARIFY            | Needs semantic verification    |
| FO-18 | `<Media Type> Evaluation`                    | `forms.js`   | Entry scoring section            | Media-specific scoring dimensions                                                          | Scoring Dimensions                          | Possibly `<Media Type> Scoring`                               | NO                  | LOW    | Backend scoring profile           | CLARIFY            | Needs semantic verification    |
| FO-19 | `Core Evaluation Matrix`                     | `charts.js`  | Universal scoring visualization  | Universal scoring averages                                                                 | Scoring Dimensions / Traits boundary        | Possibly `Universal Scoring Profile`                          | NO                  | LOW    | Backend scoring data              | CLARIFY            | Needs semantic verification    |
| FO-20 | `Classification Confidence`                  | `charts.js`  | Archive Profile                  | `archiveProfile.designationConfidence`                                                     | Designation confidence/strength             | Preserve pending semantic decision                            | NO                  | MEDIUM | Yes                               | CLARIFY            | Frozen temporarily             |
| FO-21 | `Classification Basis`                       | `charts.js`  | Archive Profile                  | `archiveProfile.classificationBasis`                                                       | Designation/classification metadata         | Preserve pending semantic decision                            | NO                  | MEDIUM | Yes                               | CLARIFY            | Frozen temporarily             |
| FO-22 | `classificationBasis`                        | `charts.js`  | API/profile consumer             | Backend-generated field                                                                    | Domain/API field                            | Keep field name unchanged                                     | NO                  | HIGH   | Yes                               | DEFER              | Preserve                       |
| FO-23 | `designationConfidence`                      | `charts.js`  | API/profile consumer             | Backend-generated designation value                                                        | Domain/API field                            | Keep field name unchanged                                     | NO                  | HIGH   | Yes                               | DEFER              | Preserve                       |
| FO-24 | `primaryDesignation`                         | `charts.js`  | Archive Profile                  | Backend-generated primary Designation                                                      | Designation                                 | Preserve                                                      | YES                 | LOW    | Yes                               | PRESERVE           | Correct                        |
| FO-25 | `Designation`                                | `charts.js`  | Archive Profile heading          | `archiveProfile.primaryDesignation`                                                        | Designation                                 | Preserve                                                      | YES                 | LOW    | Yes                               | PRESERVE           | Correct                        |
| FO-26 | `Observations`                               | `entries.js` | Entry detail heading             | `entry.notes` rendered by `renderEntryNotes()`                                             | User Notes                                  | Likely `Notes`                                                | NO                  | LOW    | None                              | ALIGN              | Verify historical intent first |
| FO-27 | `Archive Observations`                       | `charts.js`  | Archive Profile                  | `archiveProfile.observations`                                                              | Observation                                 | Preserve                                                      | YES                 | LOW    | Yes                               | PRESERVE           | Correct                        |
| FO-28 | `Archive Findings`                           | `charts.js`  | Archive Profile                  | `archiveProfile.findings`                                                                  | Finding                                     | Preserve                                                      | YES                 | LOW    | Yes                               | PRESERVE           | Correct                        |
| FO-29 | `Archive Interpretation`                     | `charts.js`  | Archive Profile                  | `archiveSummary`, `primaryTrait`, `secondaryTrait`, `observationSummary`, `genreSignature` | Interpretation / Narrative                  | Preserve pending backend semantic audit                       | NO                  | MEDIUM | Yes                               | CLARIFY            | Needs verification             |
| FO-30 | `primaryTrait`                               | `charts.js`  | Archive interpretation           | Backend-generated archive-level trait statement                                            | Trait                                       | Preserve pending interpretation audit                         | NO                  | LOW    | Yes                               | PRESERVE / CLARIFY | Investigate                    |
| FO-31 | `secondaryTrait`                             | `charts.js`  | Archive interpretation           | Backend-generated archive-level trait statement                                            | Trait                                       | Preserve pending interpretation audit                         | NO                  | LOW    | Yes                               | PRESERVE / CLARIFY | Investigate                    |
| FO-32 | `genreSignature`                             | `charts.js`  | Archive interpretation           | Backend-generated genre summary                                                            | Genre Intelligence                          | Preserve pending Genre Signal audit                           | NO                  | MEDIUM | Yes                               | CLARIFY            | Investigate                    |
| FO-33 | `observationSummary`                         | `charts.js`  | Archive interpretation           | Backend-generated Observation summary                                                      | Observation / Interpretation                | Preserve pending interpretation audit                         | NO                  | MEDIUM | Yes                               | CLARIFY            | Investigate                    |
| FO-34 | `archiveSummary`                             | `charts.js`  | Archive interpretation           | Backend-generated archive summary                                                          | Interpretation / Narrative                  | Preserve pending interpretation audit                         | NO                  | MEDIUM | Yes                               | CLARIFY            | Investigate                    |
| FO-35 | `archiveDesignations`                        | `charts.js`  | Legacy frontend intelligence     | Hard-coded frontend Designation definitions                                                | Designation                                 | Do not use as authoritative Designation source; investigate   | NO                  | HIGH   | Backend now supplies Designations | POSSIBLE DEAD CODE | Investigate                    |
| FO-36 | `generateArchiveTitle()`                     | `charts.js`  | Legacy frontend intelligence     | Generates title from primary/secondary/media traits                                        | Interpretation / Designation-adjacent       | Investigate whether migrated/replaced                         | NO                  | MEDIUM | Potentially none                  | POSSIBLE DEAD CODE | Investigate                    |
| FO-37 | `calculateDesignationConfidence()`           | `charts.js`  | Legacy frontend intelligence     | Calculates value from primary/secondary/media trait scores                                 | Designation confidence/strength             | Investigate whether superseded by backend                     | NO                  | MEDIUM | Potentially none                  | POSSIBLE DEAD CODE | Investigate                    |
| FO-38 | `generateClassificationBasis()`              | `charts.js`  | Legacy frontend intelligence     | Generates primary/secondary/media trait basis                                              | Designation basis / classification metadata | Investigate whether superseded by backend                     | NO                  | MEDIUM | Potentially none                  | POSSIBLE DEAD CODE | Investigate                    |
| FO-39 | `getDesignationConfidenceLabel()`            | `charts.js`  | Active presentation helper       | Converts designation-confidence value to High/Moderate/Low label                           | Classification confidence presentation      | Preserve until semantics resolved                             | NO                  | MEDIUM | `designationConfidence`           | CLARIFY            | Active                         |
| FO-40 | `identity` / `identities`                    | Frontend     | Repository-wide occurrence audit | No current frontend Identity presentation found                                            | Identity                                    | No new terminology introduced                                 | N/A                 | N/A    | Backend may expose Identity       | PRESERVE           | No current occurrence          |
| FO-41 | `primaryIdentity`                            | Frontend     | Repository-wide occurrence audit | No current frontend consumer found                                                         | Identity                                    | No change                                                     | N/A                 | N/A    | Backend may expose Identity       | PRESERVE           | No current occurrence          |
| FO-42 | `Identity Explanation`                       | Frontend     | Repository-wide occurrence audit | No current frontend presentation found                                                     | Identity Explanation                        | No change                                                     | N/A                 | N/A    | Backend may expose explanation    | DEFER              | Future presentation work       |
| FO-43 | `Derived Trait` / `derived`                  | Frontend     | Repository-wide occurrence audit | No explicit current frontend terminology found                                             | Derived Trait                               | No change                                                     | N/A                 | N/A    | Backend-owned intelligence        | PRESERVE           | No current occurrence          |
| FO-44 | `Genre Signal` / `Genre Signals`             | Frontend     | Repository-wide occurrence audit | No explicit current frontend terminology found                                             | Genre Signal                                | No change                                                     | N/A                 | N/A    | Backend-owned intelligence        | PRESERVE           | No current occurrence          |
| FO-45 | `Finding` used as Observation                | Frontend     | Repository-wide audit            | No evidence of frontend conflating backend Findings with Observations                      | Finding                                     | Preserve current separation                                   | YES                 | LOW    | Yes                               | PRESERVE           | Verified                       |
| FO-46 | `Observation` used as Finding                | Frontend     | Repository-wide audit            | No evidence of archive Observation objects being rendered as Findings                      | Observation                                 | Preserve current separation                                   | YES                 | LOW    | Yes                               | PRESERVE           | Verified                       |

---

# Occurrence Audit Findings

The occurrence audit establishes several important distinctions that must be
preserved during Phase 1.

## 1. `Classification` has multiple unrelated meanings

The frontend uses `Classification` in at least two materially different ways.

### Presentation drift

Some occurrences of `Classification` actually refer to `media_type`.

Examples include:

- entry metadata
- average-score-by-media-type chart
- related analytics terminology

These are safe presentation-level alignment candidates.

### Domain/API terminology

`classificationBasis` is different.

It is a backend-generated profile field and therefore cannot be treated as
ordinary presentation terminology.

It remains frozen pending semantic resolution.

Therefore:

> Do not perform a global replacement of `Classification`.

---

## 2. `Evaluation Index` is presentation terminology for `total_score`

The occurrence audit found `Evaluation Index` across multiple frontend contexts.

Where the underlying value is `entry.total_score`, the terminology is
unnecessarily indirect.

The preferred presentation vocabulary is:

> `Score`

or, where aggregation is involved:

> `Average Score`

This is a terminology alignment, not a scoring-system change.

The underlying score calculation must remain untouched.

---

## 3. The frontend already consumes backend Designations

The active Archive Profile renders:

```text
archiveProfile.primaryDesignation
```

---

# Safe Terminology Changes

The following are currently considered the safest terminology-only changes.

## FT-01 — Media Type

### Current

```text
Average Score by Media Type
```

### Corrected

```text
Average Score by Media Type
```

### Reason

The underlying implementation groups entries using `media_type` and calculates the average of `total_score`.

The current word `Classification` does not describe the underlying operation.

No WASABI calculation changes are required.

**Classification:** ALIGN

**Risk:** LOW

---

## FT-02 — Evaluation Index

Where the frontend uses `Evaluation Index` to describe the application's existing `total_score`, replace the presentation terminology with:

```text
Score
```

or, where appropriate:

```text
Average Score
```

The exact replacement should be determined by context.

Do not perform a blind global replacement.

**Classification:** ALIGN

**Risk:** LOW

---

## FT-03 — Core Evaluation Matrix

Where the visualization is displaying universal scoring dimensions, use terminology aligned with the Trait vocabulary.

Preferred presentation:

```text
Universal Trait Profile
```

Alternative:

```text
Universal Scores
```

`Universal Trait Profile` is preferred because the visualization describes the archive's profile across its universal dimensions rather than merely displaying isolated scores.

**Classification:** CLARIFY

**Risk:** LOW

---

# Deferred Terminology Changes

## API Field Names

The following should not be renamed during this terminology-only pass:

```text
classificationBasis
designationConfidence
primaryDesignation
primaryIdentity
designations
identities
observations
findings
```

These are data/API contract decisions rather than simple presentation terminology.

Any rename requires:

1. backend consumer audit
2. response-model audit
3. frontend consumer audit
4. test audit
5. fixture audit
6. documentation audit
7. explicit semantic decision

---

# Designation Confidence

The current frontend contains designation-confidence terminology and calculation logic.

Do not assume that the name `confidence` is semantically correct.

Possible interpretations include:

```text
confidence
strength
basis strength
classification strength
signal strength
```

The correct interpretation must be established from the backend implementation and downstream use.

Until that decision is made:

> Preserve the current API terminology.

Do not rename the frontend helper or API field merely for consistency.

**Classification:** CLARIFY

**Risk:** MEDIUM

---

# Frontend Intelligence Logic Requiring Separate Investigation

The frontend contains or has historically contained logic associated with intelligence generation.

Known candidates include:

```text
archiveDesignations
calculateDesignationConfidence()
generateClassificationBasis()
generateArchiveTitle()
getDesignationConfidenceLabel()
```

These should not automatically be deleted.

Each must be classified as one of:

```text
ACTIVE BACKEND DUPLICATE
ACTIVE PRESENTATION LOGIC
LEGACY FRONTEND INTELLIGENCE
POSSIBLE DEAD CODE
REQUIRED COMPATIBILITY LOGIC
```

The repository must establish which category applies.

The existence of this code is particularly important because the original architectural motivation for the WASABI cleanup was to establish an appropriate frontend/backend responsibility boundary.

---

# Frontend / Backend Responsibility Boundary

The desired long-term direction is:

```text
                    BACKEND
                       │
        ┌──────────────┴──────────────┐
        │                             │
   WASABI intelligence          API response
        │                             │
        └──────────────┬──────────────┘
                       ↓
                    FRONTEND
                       │
        ┌──────────────┼──────────────┐
        │              │              │
    presentation   visualization   interaction
```

The frontend should consume authoritative WASABI outputs rather than independently reconstructing intelligence.

This does not require a frontend rewrite.

It is a responsibility-boundary issue.

---

# Terminology That Must Remain Frozen

The following terms should not be casually substituted for one another:

```text
Trait
Derived Trait
Genre Signal
Observation
Finding
Designation
Identity
Identity Explanation
Interpretation
```

In particular:

```text
Observation ≠ Finding
Finding ≠ Designation
Designation ≠ Identity
Identity ≠ Identity Explanation
Trait ≠ Designation
Trait ≠ Interpretation
Genre Signal ≠ Observation
```

Signal overlap is acceptable.

Semantic duplication is not.

---

# Known Ambiguities

## Classification

`Classification` currently appears in frontend terminology, but its status as a formal WASABI intelligence layer is not established.

Do not treat frontend usage as evidence that Classification belongs in the semantic taxonomy.

---

## Confidence

`confidence` is used in multiple contexts and may represent different mathematical concepts.

A repository-wide semantic audit remains necessary before changing the terminology.

---

## Designation Basis

The current `classificationBasis` field may represent the basis for a Designation rather than a separate Archive Classification.

The presentation label may eventually become:

```text
Designation Basis
```

but the underlying API field should remain unchanged until the backend semantics are formally established.

---

# Implementation Order

Terminology changes should proceed in this order:

1. Verify every frontend occurrence.
2. Separate user-facing labels from internal/API identifiers.
3. Apply only terminology corrections whose underlying data is unambiguous.
4. Do not rename API fields during the presentation pass.
5. Investigate frontend intelligence-generation code separately.
6. Resolve `confidence` / `strength` semantics before renaming those fields.
7. Re-run frontend consumer searches after terminology changes.
8. Run the relevant test suite.
9. Update the Phase 1 implementation checklist with completed changes.

---

# Change Classification Summary

| ClassificationFrontend Treatment |                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------- |
| PRESERVE                         | Terminology is already semantically appropriate                                 |
| ALIGN                            | Clearly misleading terminology whose underlying meaning is established          |
| CLARIFY                          | Terminology is ambiguous but behavior may be valid                              |
| EVIDENCE                         | Existing explanation/evidence terminology or infrastructure should be preserved |
| TEST GAP                         | Meaningful frontend behavior lacks protection                                   |
| DEFER                            | Change affects API/domain semantics or requires a larger decision               |
| POSSIBLE DEAD CODE               | Logic exists but its current purpose/consumer is uncertain                      |

---

# Phase 1 Implementation Notes

This document does not authorize:

- API field renames
- backend architecture rewrites
- frontend framework migration
- intelligence algorithm changes
- scoring changes
- threshold changes
- taxonomy expansion
- deletion of legacy logic

Those require separate decisions.

The immediate purpose is to make the frontend's visible terminology accurately reflect the intelligence system without changing behavior.

---

# Current Status

**Status:** Planning / verification complete enough to identify an initial safe terminology batch.

**Production code modified:** No.

**API contracts modified:** No.

**Semantic Library modified:** No.

**Tests modified:** No.

**Next required action:**

Complete the frontend occurrence audit for the terms:

```text
classification
evaluation
score
trait
confidence
strength
sufficiency
designation
identity
observation
finding
interpretation
archive
profile
basis
```

Then verify each occurrence against the table above before making terminology-only edits.

---

# Change Log

## Initial version

Created as a Phase 1 planning artifact following the frontend consumer-map cross-check.

Initial conclusions:

- `Classification` is demonstrably misleading in at least one media-type chart.
- `Evaluation Index` is unnecessary terminology where the underlying value is the existing score.
- Universal scoring presentation should align with the Trait vocabulary.
- API/domain names should not be renamed during the initial presentation terminology pass.
- Frontend intelligence-generation logic requires separate investigation.
- The frontend/backend responsibility boundary is a core Phase 1 concern.
