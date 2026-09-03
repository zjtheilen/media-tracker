```
__    __  ___     ___  ___   ____  ___
\ \/\/ / / O \   _\\  / O \  | D ) | |
 \_/\_/O/_/ \_\O/__/O/_/ \_\O|_D_)O|_|O
WEIGHTED ARCHIVE SYSTEM for ANALYSIS & BEHAVIORAL INSIGHTS

A media tracking, rating, and analytics app by Zachary Theilen
```

# Media Tracker — Decision & Implementation Map

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Scope:** Current implementation decisions, behavioral contracts, implementation gates, and Phase 1 work order
**Status:** Current implementation authority
**Guiding principle:** **Evolution, not rewrite.**

**Current test status:** **245 passing tests / 0 failing tests**

---

# 1. Purpose

This document translates the current conceptual intelligence contract into explicit implementation decisions.

It answers:

> **What exactly have we decided to preserve, change, clarify, test, investigate, or defer?**

The documents in the planning system have distinct responsibilities.

| Document                               | Responsibility                                                   |
| -------------------------------------- | ---------------------------------------------------------------- |
| `intelligence-contract.md`             | Defines what the intelligence system means                       |
| `decision-and-implementation-map.md`   | Defines current implementation decisions and gates               |
| `identity-and-designation-contract.md` | Defines detailed Identity and Designation conceptual boundaries  |
| `identity-fixture-contract.md`         | Defines exact Identity fixture-level constraints                 |
| `identity-evidence-mapping.md`         | Defines Identity evidence rationale and limitations              |
| `intelligence-forensic-audit.md`       | Records repository evidence and recovered behavior               |
| `intelligence-alignment.md`            | Records the Phase 1 recovery and alignment process               |
| `terminology-and-api-rename-map.md`    | Defines semantic terminology mapping at the API/backend boundary |
| `frontend-terminology-alignment.md`    | Defines frontend terminology and presentation alignment          |
| `roadmap.md`                           | Defines project sequencing and roadmap status                    |

This document is the bridge between conceptual contract and implementation.

It should not redefine the meaning of intelligence concepts already established by `intelligence-contract.md`.

---

# 2. Evidence Model for Decisions

Implementation decisions must distinguish among three kinds of information.

## 2.1 Contract Decisions

These describe what the system is intended to mean.

Examples:

* Signal Strength is not Classification Confidence.
* Identity is distinct from Designation.
* Observation and Finding have different purposes.
* Insufficient data is not equivalent to weak preference.

Contract decisions originate in the conceptual authority.

---

## 2.2 Repository Facts

These describe what the current implementation actually does.

Examples:

* the Identity scorer uses fixture-defined weights;
* Identity eligibility uses `minimum_entries`;
* the current secondary Identity threshold is `0.60`;
* Designation scores use the existing 0–100 scale;
* the current test suite has 245 passing tests.

Repository facts are important evidence.

They are not automatically permanent design decisions.

---

## 2.3 Archive Evidence

These describe patterns the intelligence system should plausibly detect.

Examples:

* genre diversity;
* depth;
* originality;
* emotional impact;
* recurring media patterns.

Archive evidence may support a conceptual direction without proving intentionality or internal motivation.

---

# 3. Decision Status

| Status                | Meaning                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| **LOCKED**            | Sufficiently defined for dependent implementation to rely on it             |
| **WORKING DIRECTION** | Strongly supported direction, but some operational details remain open      |
| **UNRESOLVED**        | A decision is still required before dependent implementation can proceed    |
| **DEFERRED**          | Intentionally outside the current scope                                     |
| **FACT**              | Verified repository or test fact; not itself a design decision              |
| **PRESERVE**          | Existing behavior is compatible with the current contract and should remain |
| **TESTING**           | Behavior is acceptable but needs explicit regression protection             |
| **INVESTIGATE**       | Evidence is insufficient to justify preservation or change                  |
| **TERMINOLOGY**       | Meaning is acceptable but terminology is misleading                         |
| **ALIGNMENT**         | Existing behavior contradicts a locked conceptual decision                  |
| **CLARIFICATION**     | Meaning is established but operational behavior requires definition         |

### Important distinction

**UNRESOLVED** and **DEFERRED** are not interchangeable.

* **UNRESOLVED** means the project may still need to solve the issue.
* **DEFERRED** means the project intentionally will not solve it in the current scope.

No implementation should depend on an unresolved decision.

---

# 4. Governing Implementation Rules

## 4.1 Preserve Before Rebuild

If an existing implementation is compatible with the conceptual contract, preserve it.

Do not replace working architecture merely because a different implementation would appear cleaner.

---

## 4.2 Change Only for a Reason

A behavioral change requires at least one of the following:

1. direct contradiction with the conceptual contract;
2. semantic confusion that cannot be resolved through terminology alone;
3. a hidden but necessary behavioral contract;
4. under-specified deterministic behavior;
5. missing regression protection;
6. improper conceptual duplication;
7. an explicit accepted design decision.

---

## 4.3 Terminology Is Not Automatically Behavior

If an existing field or function has the correct behavior but an inaccurate name:

> **Rename or reframe it before redesigning it.**

Terminology alignment must not become a pretext for architectural changes.

---

## 4.4 Evidence Does Not Equal Intent

Observable archive evidence may support an interpretation.

It does not automatically establish:

* deliberate intent;
* motivation;
* private reasoning;
* personality;
* psychological state.

Implementation must preserve this boundary.

---

# 5. Protected Existing Architecture

Unless a direct conceptual conflict is established, preserve:

* media archive storage;
* entry CRUD;
* universal scoring;
* media-specific scoring;
* scoring profiles;
* scoring rubrics;
* genre handling;
* Trait calculations;
* Genre Signals;
* Observation infrastructure;
* Finding infrastructure;
* Designation infrastructure;
* Identity infrastructure;
* Archive Profile construction;
* narrative infrastructure;
* generated Lists/Reports;
* recommendation-oriented metadata;
* existing API architecture;
* existing frontend/backend separation;
* deterministic behavior where already established;
* existing regression coverage.

The Phase 1 goal is alignment, not subsystem replacement.

---

# 6. Current Regression Baseline

The current regression baseline is:

> **245 passing tests / 0 failing tests**

This is the post-Identity-migration baseline.

Historical checkpoints:

* **199 passing** — original forensic baseline
* **210 passing** — earlier Phase 1 baseline
* **218 passing** — post-forensic baseline
* **247 passing** — pre-Identity-migration checkpoint
* **245 passing** — current post-migration baseline

The difference between 247 and 245 must not be interpreted mechanically as regression.

The Identity migration intentionally replaced the previous Identity fixture catalog and corresponding test expectations.

The meaningful requirement is:

> **The current suite passes, and intentional behavioral changes have corresponding regression coverage.**

---

# 7. Quantitative Vocabulary Implementation Policy

The conceptual contract distinguishes:

* Signal Strength
* Data Sufficiency
* Evidence Strength
* Classification Confidence

Implementation must preserve those semantic distinctions.

## 7.1 Signal Strength

Used when a score expresses how strongly a quality, characteristic, or pattern is represented.

Examples:

* Trait scores;
* Designation Scores;
* Identity Scores.

---

## 7.2 Data Sufficiency

Used when determining whether enough archive data exists to evaluate something meaningfully.

Identity minimum-entry requirements are an example.

---

## 7.3 Evidence Strength

Used where the relevant evidence model measures how strongly evidence supports a conclusion.

The current public Observation field is:

```text
evidenceStrength
```

---

## 7.4 Classification Confidence

Classification Confidence is not an active universal quantitative system.

Do not create a generalized Classification Confidence field or formula merely because historical code or documentation used the word `confidence`.

---

# 8. Existing Field Mapping

| Existing field                        | Current semantic meaning                           | Phase 1 decision        |
| ------------------------------------- | -------------------------------------------------- | ----------------------- |
| Identity `score`                      | Identity Signal Strength / Identity Score          | PRESERVE                |
| Identity `data_sufficiency`           | Data Sufficiency                                   | PRESERVE                |
| Designation `score`                   | Designation Score / classification Signal Strength | PRESERVE                |
| `designationConfidence`               | Aggregate Designation Signal Strength              | TERMINOLOGY             |
| `designationConfidenceLabel`          | Human-readable Signal Strength label               | TERMINOLOGY             |
| Observation `confidence`              | Existing Evidence Strength calculation             | TERMINOLOGY / ALIGNMENT |
| Public Observation `evidenceStrength` | Evidence Strength                                  | PRESERVE                |
| Finding confidence                    | Not currently implemented                          | DO NOT ADD              |

Backward compatibility may require preserving internal or API field names temporarily.

That does not make the old terminology semantically authoritative.

---

# 9. Trait Normalization

## Status

**PRESERVE**

The existing Trait normalization behavior is a recovered behavioral contract.

The current Trait Signal Strength calculation uses the existing floor and maximum behavior.

Conceptually:

```text
6 or below → 0
10 → maximum strength
```

The existing implementation should not be replaced merely because Identity normalization uses a different scale.

Trait normalization and Identity normalization have different semantics.

---

# 10. Identity Normalization

## Status

**PRESERVE**

Identity scoring currently uses the existing proportional 0–10 normalization.

The resulting normalized value is bounded to the range 0–1.

Values at or above the normalization maximum saturate at 1.0.

This saturation is an implementation behavior, not a reason to redesign the Identity system during terminology migration.

### Future calibration question

Whether saturation of an Identity score from a single observable should be changed is a legitimate future calibration question.

It is not part of the current migration.

---

# 11. Derived Identity Signals

The Identity subsystem currently supports derived signals including:

* `experimental_affinity`
* `genre_diversity`
* `novelty`
* `analysis`
* `ambiguity`
* `reflection`
* `system_design`

Current repository facts include:

* `novelty` and `experimental_affinity` currently rely on the same underlying experimental-genre percentage signal;
* `genre_diversity` may exceed the ordinary Trait scale before Identity normalization;
* `system_design` currently derives from `gameplay_mechanics`.

These are implementation facts.

They are not automatically conceptual errors.

## Decision

**PRESERVE / DEFERRED REVIEW**

Do not redesign derived-trait formulas during the current documentation migration unless a direct contradiction with the conceptual contract is established.

---

# 12. Identity System

## Status

**LOCKED**

Identity represents a broader curator philosophy or recurring orientation toward media.

The current Identity catalog is:

1. Interpretive Philosophy
2. Exploratory Philosophy
3. Breadth Philosophy

The detailed conceptual contract is owned by:

`identity-and-designation-contract.md`

The exact fixture definitions are owned by:

`identity-fixture-contract.md`

The evidence rationale is owned by:

`identity-evidence-mapping.md`

This document records the implementation decisions required to realize those contracts.

---

# 13. Identity Fixture Contract

The current Identity fixtures are:

### Interpretive Philosophy

Minimum entries:

> `20`

Weights:

| Signal             | Weight |
| ------------------ | -----: |
| `depth`            |   0.45 |
| `emotional_impact` |   0.25 |
| `reflection`       |   0.12 |
| `ambiguity`        |   0.10 |
| `analysis`         |   0.08 |

---

### Exploratory Philosophy

Minimum entries:

> `20`

Weights:

| Signal                  | Weight |
| ----------------------- | -----: |
| `originality`           |   0.35 |
| `genre_diversity`       |   0.25 |
| `depth`                 |   0.15 |
| `experimental_affinity` |   0.15 |
| `novelty`               |   0.10 |

---

### Breadth Philosophy

Minimum entries:

> `15`

Weight:

| Signal            | Weight |
| ----------------- | -----: |
| `genre_diversity` |   1.00 |

These values are fixture-level constraints.

The fixture contract is authoritative for the exact current fixture definitions.

---

# 14. Identity Eligibility

## Status

**LOCKED / PRESERVE**

Identity resolution follows:

```text
Data Sufficiency
      ↓
Eligibility
      ↓
Scoring
      ↓
Ranking
      ↓
Presentation
```

The `minimum_entries` requirement acts as an eligibility gate.

Current requirements:

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

An Identity below its minimum is excluded from Identity resolution.

Insufficient data must not be interpreted as negative preference.

---

# 15. Identity Scoring

## Status

**PRESERVE**

The existing weighted scoring architecture remains in place.

Each eligible Identity:

1. resolves its configured signals;
2. normalizes those signals;
3. applies fixture-defined weights;
4. sums weighted contributions;
5. produces an Identity Score;
6. exposes the contribution breakdown.

The scoring architecture is not being replaced.

---

# 16. Identity Explanation

## Status

**PRESERVE / TEST**

Identity explanations expose:

* Identity Score;
* contribution breakdown;
* normalized signal values;
* signal weights;
* individual contributions;
* Data Sufficiency;
* top contributing Identity signals.

The current `top_traits` representation is derived from the contribution breakdown.

Its semantic meaning is:

> **Top contributing Identity signals**

It is not a separate classification system.

---

# 17. Primary Identity

## Status

**LOCKED / PRESERVE**

The Profile presents:

> **ONE PRIMARY Identity**

The Primary Identity is the strongest eligible Identity under the deterministic ranking/resolution behavior.

The system does not currently use co-primary Identities.

Primary Identity selection must remain deterministic.

---

# 18. Identity Tie Resolution

## Status

**LOCKED / PRESERVE**

When eligible Identity Scores are exactly equal, the existing implementation uses contribution evidence ordering to resolve the tie deterministically.

The tie-resolution process:

* does not add score;
* does not invent an additional metric;
* does not create a confidence value;
* does not introduce an arbitrary near-tie threshold.

Non-equal scores remain ranked by their actual scores.

Exact tie behavior is an implementation policy, not a new scoring formula.

---

# 19. Secondary Identity

## Status

**LOCKED / PRESERVE**

The current implementation permits a meaningful secondary Identity.

Current meaningfulness requires:

* the Identity is eligible;
* it is not the Primary Identity;
* its score meets the current minimum threshold;
* existing deterministic ordering is respected.

The current threshold is:

```text
SECONDARY_MIN_SCORE = 0.60
```

This threshold belongs to Identity resolution/presentation.

It is not part of the Identity scoring formula.

A secondary Identity is not simply:

* the second-ranked result;
* any positive-scoring result;
* an arbitrarily close competitor;
* evidence that two Identities are equally strong.

No separate near-tie threshold is currently used.

---

# 20. Identity vs Designation

## Status

**LOCKED / ALIGNMENT COMPLETE**

The distinction is:

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

Useful shorthand:

> **Designation:** What do you tend to like?

> **Identity:** What relationship do you tend to establish with what you like?

The two systems may share evidence.

They must not share the same conceptual conclusion merely because they use related evidence.

### Governing rule

> **Evidence can overlap. Meaning cannot.**

---

# 21. Designations

## Status

**PRESERVE**

The current Designation catalog contains:

* Boundary Explorer
* Curator
* Engagement Architect
* Deep Diver

Designation remains a taste-classification system.

It is not being converted into an Identity system.

---

# 22. Designation Architecture

The existing Designation architecture should be preserved:

* rule-driven definitions;
* multiple internal candidates;
* scoring;
* ranking;
* deterministic primary selection;
* metadata;
* Designation Basis;
* recommendation-oriented metadata.

The current Designation Score scale remains in place.

No new Designation scoring algorithm is authorized by the documentation migration.

---

# 23. Designation Score

## Status

**PRESERVE**

Designation Score represents the strength of the observable signals supporting a Designation.

It is not Classification Confidence.

The existing numerical scale should be preserved unless a future conceptual decision explicitly changes it.

---

# 24. Designation Confidence Terminology

## Status

**TERMINOLOGY**

The existing `designationConfidence` field is preserved for compatibility.

Its calculation currently represents aggregate Designation signal strength rather than statistical confidence.

Therefore:

```text
designationConfidence
        ↓
Signal Strength
```

The field should not be interpreted as a probability or formal confidence estimate.

Likewise:

`designationConfidenceLabel`

is treated as a human-readable Signal Strength label.

---

# 25. Designation Basis

## Status

**LOCKED / PRESERVE**

`designationBasis` is a backend-produced summary of dominant Designation classification signals.

It is not an exhaustive reproduction of every rule condition.

The backend is authoritative.

Frontend code must not independently recreate the backend Designation Basis calculation.

The obsolete duplicate frontend producer has been removed.

---

# 26. Recommendation Bias

## Status

**PRESERVE**

`recommendation_bias` remains recommendation-oriented metadata.

It is not:

* Recommendation Score;
* Recommendation Confidence;
* a completed Recommendation Engine;
* a replacement for recommendation logic.

Recommendation Bias may inform future recommendation work.

It should not be interpreted as proof that the Recommendation Engine is already implemented.

---

# 27. Observation System

## Status

**PRESERVE / GATED ALIGNMENT**

Observations remain evidence-backed descriptions of recognizable archive patterns.

The existing structured evidence architecture includes:

* `metric_evidence`
* `genre_evidence`

The public Evidence Strength field is:

```text
evidenceStrength
```

Historical `confidence` terminology should not be propagated as current public terminology.

The Observation system should remain distinct from Findings, Designations, and Identities.

---

# 28. Observation vs Finding

## Status

**LOCKED**

Observation:

> **What supported pattern can we directly demonstrate?**

Finding:

> **What does the evidence suggest when synthesized into a higher-level conclusion?**

A Finding should add interpretation rather than simply restating an Observation.

An Observation does not have to become a Finding.

A Finding does not have to be generated through a mandatory Observation → Finding runtime pipeline.

The two systems remain conceptually parallel.

---

# 29. Finding Evidence

## Status

**PARTIALLY COMPLETE / GATED**

Finding work should preserve:

* evidence-backed interpretation;
* distinction from Observations;
* distinction from Traits;
* distinction from Designations;
* conservative claims where evidence is limited.

The current system does not implement a generalized Finding Confidence field.

Do not add one during the documentation migration.

Remaining Finding work is governed by the implementation gates below.

---

# 30. Identity Evidence Boundaries

The accepted Identity evidence model uses three broad levels:

### Direct

Evidence that closely corresponds to the conceptual quality being evaluated.

### Supporting

Evidence that strengthens a conclusion without independently establishing it.

### Proxy / Contextual

Indirect or derived evidence that may support interpretation while carrying additional uncertainty.

### Insufficient

Evidence that does not provide enough support for the conclusion by itself.

The hierarchy exists to prevent indirect evidence from being presented as direct observation.

---

# 31. Identity Evidence Limitations

The current archive does not directly observe:

* intent;
* deliberate exploration;
* private interpretation;
* internal motivation;
* psychological state;
* personal philosophy outside the archive.

Therefore:

### Interpretive Philosophy

Depth and related signals can support an interpretive orientation but do not directly observe interpretation.

### Exploratory Philosophy

Originality, genre diversity, experimental affinity, novelty, and related signals can support an exploratory interpretation but do not prove deliberate exploration.

### Breadth Philosophy

Genre diversity can demonstrate observable variety but does not prove intentional diversification.

No new intent or trajectory metrics should be introduced solely to close these evidence gaps.

---

# 32. Archive State

## Status

**CONCEPT ACCEPTED / OPERATIONAL THRESHOLDS UNRESOLVED**

The project recognizes:

* Empty archives;
* Sparse archives;
* Established archives.

These states matter because data availability affects what conclusions can reasonably be drawn.

However, the exact operational thresholds separating these states are **not resolved by this document**.

Existing documentation contains conflicting claims about those thresholds.

Therefore:

> **Do not choose or invent an operational threshold during documentation consolidation.**

The threshold decision must be made explicitly before it becomes an implementation contract.

---

# 33. Empty Archives

## Status

**PRESERVE**

An empty archive is valid.

Empty intelligence collections are valid behavior.

An empty archive must not be interpreted as:

* negative preference;
* absence of interest;
* weak Identity;
* weak Designation.

Absence of data is not negative evidence.

---

# 34. Sparse Archives

## Status

**PRESERVE / CLARIFY**

Sparse archives are valid.

A sparse archive may contain strong signals while still lacking enough data for particular intelligence systems.

The implementation must therefore distinguish:

> **Weak signal**

from:

> **Insufficient data**

These are different conditions.

---

# 35. Partial Data

## Status

**LOCKED CONCEPT / IMPLEMENTATION GATED**

The system should distinguish:

* no evidence of a pattern;
* weak evidence of a pattern;
* insufficient data to evaluate the pattern.

Missing information should not automatically become negative evidence.

---

# 36. Determinism

## Status

**LOCKED / PRESERVE**

Determinism is required wherever the system selects a single result.

This applies to:

* Primary Designation;
* Primary Identity;
* exact Identity ties;
* established ranking behavior;
* stable presentation decisions where already defined.

Deterministic behavior is required for:

* reproducibility;
* testing;
* explainability;
* stable API behavior.

The implementation must not accidentally depend on incidental ordering such as filesystem enumeration where a deterministic choice is required.

---

# 37. Recommendation Engine Boundary

## Status

**DEFERRED**

The current intelligence system may produce recommendation-oriented signals and metadata.

The complete Recommendation Engine remains future work.

Phase 1 does not authorize:

* a new recommendation algorithm;
* recommendation optimization;
* recommendation confidence;
* recommendation ranking redesign.

Identity and Designation information may influence recommendations indirectly through meaningful signals.

---

# 38. Evidence Architecture

## Status

**PRESERVE**

There is intentionally no universal evidence schema across every intelligence subsystem.

Different systems answer different questions.

Therefore:

* Observation evidence may use structured metric/genre evidence;
* Identity explanation may use contribution breakdowns;
* Designation explanation may use Designation Basis;
* Findings may use their own evidence representation.

These mechanisms should not be forcibly unified merely for structural consistency.

---

# 39. Systems Preference Terminology

## Status

**ALIGNMENT COMPLETE**

The terminology:

```text
systems-preference
```

has been consolidated into:

```text
systems-affinity
```

This is a terminology alignment.

No additional conceptual subsystem is implied.

---

# 40. Atmospheric Interest

## Status

**UNRESOLVED / GATED**

`atmospheric-interest` remains an unresolved conceptual/implementation issue.

Do not invent a new scoring rule, Trait, Identity, Designation, or evidence model for it during documentation consolidation.

The issue remains gated pending an explicit decision.

---

# 41. Recommendation Metadata Boundary

Recommendation-oriented metadata may exist before the Recommendation Engine exists.

Therefore:

```text
Recommendation Bias
        ≠
Recommendation Engine
```

Likewise:

```text
Identity recommendation bias
        ≠
Identity recommendation score
```

and:

```text
Designation recommendation bias
        ≠
Designation recommendation score
```

---

# 42. Implementation Changes Authorized by Phase 1

Phase 1 authorizes changes only where necessary to align implementation with locked conceptual decisions.

Authorized categories include:

### Terminology

Rename or reframe misleading terminology without changing behavior.

### Conceptual Alignment

Change behavior where implementation directly contradicts a locked conceptual decision.

### Determinism

Define or stabilize behavior where a single result is required but the existing implementation is under-specified.

### Evidence

Improve explanation or evidence representation where the conclusion already exists but its support is unclear.

### Regression Protection

Add tests for recovered or newly locked behavior.

---

# 43. Changes Not Authorized by Documentation Migration

The documentation migration does not authorize:

* rewriting working subsystems;
* redesigning the Identity scoring architecture;
* replacing existing normalization;
* inventing Classification Confidence;
* adding Finding Confidence;
* creating a universal evidence schema;
* inventing intent metrics;
* inventing exploration trajectory metrics;
* redesigning Recommendation Engine behavior;
* changing Designation Score semantics;
* changing the Identity catalog without a new conceptual decision;
* changing Archive State thresholds by assumption;
* redesigning API structure merely for aesthetic consistency;
* changing frontend architecture;
* migrating to a new framework;
* introducing machine-learning classification.

---

# 44. Current Implementation Gates

The following work remains subject to explicit gates.

## Gate 1 — Terminology Reconciliation

**Status:** IN PROGRESS

Verify that backend, API, and frontend terminology consistently reflects the current semantic contract.

---

## Gate 2 — Identity Catalog Migration

**Status:** COMPLETE

Completed:

* old Identity fixtures removed;
* current three Identity fixtures established;
* current fixture weights established;
* minimum-entry requirements established;
* affected tests migrated;
* full regression suite green.

---

## Gate 3 — Identity Regression Protection

**Status:** COMPLETE / ONGOING

Protected behavior includes:

* fixture loading;
* minimum-entry eligibility;
* weighted scoring;
* normalization;
* ranking;
* deterministic primary selection;
* deterministic exact ties;
* secondary threshold behavior;
* explanation breakdowns;
* Data Sufficiency.

The current suite is green.

---

## Gate 4 — Finding Boundary and Evidence

**Status:** PARTIALLY COMPLETE**

Remaining work:

* finalize Finding evidence representation;
* ensure Findings remain distinct from Observations;
* ensure unsupported confidence terminology is not reintroduced.

---

## Gate 5 — Observation Alignment

**Status:** GATED**

Remaining work:

* verify public Evidence Strength terminology;
* verify frontend/backend field alignment;
* preserve structured evidence;
* verify shortlist/presentation behavior.

---

## Gate 6 — Archive State

**Status:** GATED**

The conceptual states are accepted.

Operational thresholds remain unresolved.

No implementation threshold should be treated as locked until explicitly decided.

---

## Gate 7 — Final Terminology/API/Frontend Reconciliation

**Status:** GATED**

After backend terminology alignment, verify:

* API field names;
* frontend labels;
* stale references;
* duplicate frontend logic;
* documentation references.

---

## Gate 8 — Final Phase 1 Regression

**Status:** CURRENT BASELINE GREEN**

Current baseline:

> **245 passing tests / 0 failing tests**

Final regression must occur after all implementation changes are complete.

---

## Gate 9 — Documentation Reconciliation

**Status:** IN PROGRESS**

Documentation must be checked for:

* stale decisions;
* competing authority;
* contradictory terminology;
* obsolete Identity definitions;
* obsolete test status;
* accidental conversation residue;
* invented implementation details;
* dead references.

---

# 45. Current Completion Status

## Completed

The following Phase 1 decisions/gates are complete:

* intelligence ontology established;
* Designation vs Identity distinction established;
* Identity differentiation audit completed;
* Identity evidence mapping completed;
* Identity fixture contract established;
* current Identity fixtures migrated;
* affected tests migrated;
* Identity eligibility implemented;
* deterministic Identity ranking preserved;
* deterministic exact-tie behavior preserved;
* current secondary Identity behavior preserved;
* frontend scoring terminology aligned;
* `systems-preference` consolidated into `systems-affinity`;
* backend `designationBasis` established as authoritative;
* obsolete frontend Designation Basis producer removed;
* full regression suite green at 245/0.

These completed decisions should not be reopened merely because later documentation work encounters duplicated historical discussion.

---

# 46. Remaining Phase 1 Work

The remaining implementation/documentation work is limited to:

1. terminology reconciliation where still required;
2. Finding evidence/boundary completion;
3. Observation alignment;
4. Archive State operational decision;
5. final API/frontend terminology reconciliation;
6. final regression;
7. documentation integrity review.

No new Identity ontology is required by these remaining gates.

---

# 47. Historical Identity Work

Earlier Identity development produced several rejected, superseded, or deferred concepts.

Those historical decisions remain useful because they explain why the current catalog exists.

They should not be reintroduced as current implementation options without an explicit new conceptual decision.

Important historical conclusions include:

* renaming alone was insufficient to distinguish Identity from Designation;
* some earlier Identity concepts duplicated Designation semantics;
* Construction / Systems Philosophy was deferred because available evidence collapsed into Engagement Architect territory;
* Exploratory Philosophy remains evidence-limited because deliberate exploration is not directly observed;
* Breadth Philosophy describes observable range rather than proven intentional diversification.

Historical Identity development belongs in the Identity Catalog/history record rather than in this implementation authority.

---

# 48. Designation Evolution Boundary

The current Designation catalog remains a working classification system.

Future changes may:

* rename a Designation;
* redefine a Designation;
* split a Designation;
* merge Designations;
* retire a Designation;
* add a Designation.

Such changes require an explicit conceptual decision.

Documentation consolidation alone is not sufficient reason to alter the catalog.

---

# 49. Behavioral Contract Principle

Where code and tests establish stable behavior that does not contradict the conceptual contract:

> **Treat that behavior as protected implementation memory.**

Where documentation describes intended behavior that code and tests do not currently establish:

> **Treat it as intended behavior, not proven behavior.**

This distinction prevents documentation from silently rewriting the actual system.

---

# 50. Implementation-Fact Boundary

The following may be true of the current implementation without becoming permanent conceptual rules:

* exact normalization formulas;
* saturation behavior;
* exact secondary thresholds;
* derived-trait implementation details;
* filesystem/fixture layout;
* internal helper names;
* API compatibility fields;
* test counts;
* implementation-specific frontend mechanics.

These facts should be documented where implementation authority requires them.

They should not be promoted into the highest-level semantic contract merely because they currently exist.

---

# 51. Work Order

The remaining work should proceed in this order:

```text
1. Terminology reconciliation
        ↓
2. Finding boundary / evidence
        ↓
3. Observation alignment
        ↓
4. Archive State decision
        ↓
5. API / frontend reconciliation
        ↓
6. Final regression
        ↓
7. Final documentation integrity audit
```

Documentation consolidation must not silently change this order.

---

# 52. Documentation Migration Rule

During the documentation migration:

### Preserve

Information required to understand current implementation behavior.

### Consolidate

Duplicate current implementation decisions.

### Narrow

Documents that currently contain broader authority than their intended role.

### Archive

Historical reasoning that remains useful but is no longer current authority.

### Retire

Documents whose information has been fully preserved elsewhere and whose continued existence would create unnecessary competing authority.

No information should be discarded merely because it is duplicated.

---

# 53. Explicit Non-Migration Rules

The following should not be copied forward as current decisions:

* superseded Identity catalog definitions;
* obsolete Identity names presented as current;
* invented Identity examples;
* historical test failures presented as current;
* abandoned scoring proposals;
* hypothetical confidence formulas;
* proposed intent metrics;
* proposed trajectory metrics;
* hypothetical recommendation algorithms;
* unresolved Archive State thresholds presented as locked;
* conversational language;
* implementation guesses presented as repository facts.

Historical information may be preserved when its historical status is explicit and it explains an important decision.

---

# 54. Phase 1 Documentation Authority

The implementation authority hierarchy is:

```text
INTELLIGENCE CONTRACT
        │
        ├── defines semantic meaning
        │
        ↓
DECISION & IMPLEMENTATION MAP
        │
        ├── defines current implementation decisions
        │
        ├── defines gates
        │
        └── defines work order
        │
        ↓
SPECIALIST CONTRACTS
        │
        ├── Identity / Designation contract
        ├── Identity fixture contract
        └── Identity evidence mapping
        │
        ↓
IMPLEMENTATION
        │
        ↓
TESTS
```

This hierarchy does not imply that tests are less authoritative about behavior.

Tests are the executable protection for behavior that has been intentionally established.

---

# 55. Final Implementation Principle

The implementation map exists to prevent two opposite failures:

### Failure 1 — Documentation-driven rewrite

Changing working software simply because documentation describes it differently.

### Failure 2 — Implementation-driven conceptual drift

Treating whatever the current code happens to do as permanent conceptual truth.

The correct approach is:

> **Use the conceptual contract to decide what the system means. Use repository evidence to determine what the system currently does. Change implementation only where an explicit decision requires it.**

That is the Phase 1 implementation boundary.

---

# 56. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Therefore:

> **Establish the semantic contract first. Align implementation to that contract without changing behavior unless an explicit conceptual decision requires the change.**
