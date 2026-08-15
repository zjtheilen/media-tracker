# Media Tracker — Intelligence Forensic Audit

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Purpose:** Behavioral baseline before Phase 1 intelligence alignment
**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document records the results of a forensic audit of the existing Media Tracker intelligence layer.

The purpose is not to redesign the system.

The purpose is to establish:

- what behavior the repository currently implements
- what behavior the existing tests implicitly protect
- what behavior is explicitly described by the Intelligence Contract
- where those two sources agree
- where they conflict
- where the implementation contains useful behavior that the contract does not yet describe
- what could be accidentally lost during Phase 1

This document should be treated as the **pre-Phase-1 behavioral baseline**.

The conceptual authority remains:

1. `intelligence-contract.md`
2. `phase-1-intelligence-alignment.md`

This document answers a different question:

> **What did we already build, and what behavioral contracts exist whether or not we documented them originally?**

---

# 2. Executive Summary

The existing intelligence layer is substantially more developed than the conceptual contract initially implied.

The repository already contains meaningful infrastructure for:

- traits
- derived traits
- genre intelligence
- observations
- findings
- designations
- identities
- evidence
- identity contribution explanations
- recommendation bias
- archive profile assembly
- narrative synthesis
- empty-profile handling
- identity minimum-entry requirements
- deterministic fixture-driven classification

The most important conclusion is:

> **Phase 1 should primarily be semantic alignment, terminology correction, evidence strengthening, and targeted behavioral refinement — not architectural replacement.**

Several existing behaviors should be explicitly preserved.

The most important recovered behaviors include:

- Trait normalization has a meaningful floor at 6/10.
- Identity scoring uses a different normalization mechanism from Trait Signal Strength.
- Identity scoring supports derived traits.
- Identity fixtures contain weighted scoring definitions.
- Identity minimum-entry requirements act as eligibility gates.
- Empty archives produce zero identity scores.
- Identity contribution breakdowns are meaningful explanatory infrastructure.
- Designations expose traits, genres, and recommendation bias.
- Observation evidence is already one of the strongest evidence systems in the repository.
- Designations are ranked internally while the Profile presents one primary designation.
- Identities are evaluated as multiple candidates and produce a primary identity.
- Recommendation infrastructure anticipates positive and negative matching signals even though the engine remains a stub.
- The Archive Profile is already functioning as the integration boundary between intelligence subsystems.

The largest semantic problem is terminology.

The repository currently uses `confidence` in places where the underlying calculation actually represents **Data Sufficiency** or **Signal Strength**.

This should be corrected before inventing new algorithms.

---

# 3. Classification Vocabulary

Every recovered behavior is classified using the following categories.

## PRESERVE

Existing behavior is compatible with the conceptual contract and should remain.

## ALIGN

Existing behavior directly conflicts with the conceptual contract and should change.

## CLARIFY

The contract is ambiguous, but the existing behavior may represent a useful implicit contract that should be documented.

## EVIDENCE

Existing behavior provides useful explanation/evidence infrastructure that should be preserved or strengthened.

## TEST GAP

Meaningful behavior exists but is not adequately protected by tests.

## DEFER

The issue is real but belongs to a later phase.

## POSSIBLE DEAD CODE

The behavior appears obsolete, redundant, debugging-only, or disconnected from production behavior and should be investigated before preserving it.

---

# 4. Recovered Behavioral Contracts

The following behaviors are currently encoded by the implementation and/or test suite and should be considered protected unless a direct Phase 1 conceptual conflict is established.

## Traits

- Trait strength normalization uses a floor at 6.
- Trait strength reaches maximum strength at 10.
- Values at or below 6 produce zero trait strength.
- Trait strength is distinct from Identity scoring normalization.
- Traits are measurable downstream signals.

## Identity

- Identity scoring uses fixture-defined weighted traits.
- Identity scoring supports derived traits.
- Identity minimum-entry requirements affect eligibility/scoring.
- Empty profiles produce zero identity scores.
- Identity contribution breakdowns are exposed for explanation.
- Identity breakdowns are ordered by contribution.
- Identity fixtures provide controlled vocabulary and scoring definitions.
- Identity recommendation bias is exposed through identity evidence.
- Generalist archives are not expected to strongly match a specialized Identity.
- Multiple identities can be evaluated internally.
- Primary Identity is selected from the evaluated candidates.

## Designations

- Designations are fixture/rule driven.
- Multiple designations can be evaluated internally.
- Designations are ranked by score descending.
- Profile-level designation selection produces one primary designation.
- Designation metadata includes traits.
- Designation metadata includes genres.
- Designation metadata includes recommendation bias.
- Recommendation bias is meaningful metadata rather than decorative fixture information.

## Observations

- Observations are rule-driven.
- Observations may be generated in multiples.
- Observation evidence supports structured metric evidence.
- Observation evidence supports structured genre evidence.
- Observation confidence is separate conceptually from trait strength.
- Observations are not represented as Findings.

## Archive State

- Empty intelligence collections return empty results where currently established.
- Empty profiles produce zero/empty intelligence rather than fabricated conclusions.
- Identity scoring behaves conservatively when insufficient data exists.
- Minimum-entry requirements are meaningful data gates.

## Narrative

- Narrative consumes established intelligence outputs rather than independently inventing conclusions.
- Narrative currently synthesizes designation and identity information.
- Existing template-driven narrative infrastructure should be preserved.

---

# 5. Trait Normalization

The repository contains two distinct normalization semantics.

Trait Signal Strength uses a floor at 6.

Conceptually:

[start text]

Values <= 6 produce zero signal strength.

Values at 10 produce maximum signal strength.

[end code]

Identity scoring does not use that same floor.

Identity scoring resolves a trait value and then normalizes it proportionally:

[start python]

normalized = clamp(value / 10, 0, 1)

[end python]

These are different operations.

### Classification

**PRESERVE**

### Reason

The two systems answer different questions.

Trait Signal Strength asks:

> How strongly is this quality represented?

Identity scoring asks:

> How strongly does this trait contribute to this particular curator identity?

They should not be unified merely because both operate on a 0–10 score.

### Phase 1 implication

Document the distinction.

Do not rewrite both normalization systems into one generic helper unless a future conceptual decision explicitly requires that.

---

# 6. Derived Traits

The Identity system currently supports derived traits including:

- `experimental_affinity`
- `genre_diversity`
- `novelty`
- `analysis`
- `ambiguity`
- `reflection`
- `system_design`

Additional recovered behavior includes:

- `novelty` and `experimental_affinity` currently use the same experimental-genre percentage calculation.
- `genre_diversity` is derived from genre count and may exceed 10 before Identity normalization clamps the resulting signal.
- `system_design` currently derives from `mediaAverages.gameplay_mechanics`.
- Identity trait resolution prefers universal averages, then media averages, then derived-trait calculation.

### Classification

**PRESERVE**

### Secondary classification

**CLARIFY**

### Reason

Derived traits are explicitly supported by the existing architecture and are part of Identity's expressive power.

However, some derived traits currently overlap mathematically.

That overlap should not be silently removed during Phase 1.

### Phase 1 implication

Audit each derived trait for conceptual purpose.

Do not assume duplicate formulas mean duplicate concepts.

---

# 7. Identity Minimum-Entry Behavior

Identity fixtures may define minimum entry requirements.

Current behavior uses those requirements as eligibility/scoring gates.

Below the required amount of data, the identity score and breakdown are forced to zero.

Identity confidence is separately calculated from entry count relative to the minimum requirement.

Conceptually:

[start python]

confidence = min(entry_count / minimum_entries, 1)

[end python]

### Classification

**PRESERVE calculation**

**ALIGN terminology**

### Reason

The minimum-entry requirement is meaningful.

The `confidence` name is misleading.

The calculation answers:

> Do we have enough data to meaningfully evaluate this identity?

That is **Data Sufficiency**, not Classification Confidence.

### Phase 1 implication

Do not throw away the existing calculation.

Rename/reinterpret the concept before inventing a new classification-confidence algorithm.

---

# 8. Identity Ranking and Primary Selection

The repository evaluates multiple Identity candidates.

The Profile exposes:

- the collection of identity candidates
- a primary identity
- supporting explanation

The primary identity is selected from the highest-ranked eligible candidate.

### Classification

**PRESERVE**

### Reason

This directly supports the conceptual contract:

[start text]

Identities:
MANY internally
ONE PRIMARY
ZERO+ meaningful SECONDARIES

[end code]

### Important unresolved point

The conceptual contract permits meaningful secondary identities.

The current implementation has ranked candidates, but the exact semantics for which lower-ranked identities become "meaningful secondaries" remain under-specified.

### Classification

**CLARIFY / TEST GAP**

---

# 9. Identity Contribution Breakdown

Identity explanations expose contribution-level information.

Recovered fields include:

- trait
- value
- weight
- normalized value
- contribution

Breakdowns are sorted by contribution descending.

### Classification

**EVIDENCE / PRESERVE**

### Reason

This is one of the strongest explanation mechanisms in the intelligence layer.

It directly answers:

> Why does the system think this?

It should survive Phase 1.

It should not be replaced by generic narrative prose.

---

# 10. Designation Behavior

The Designation system is fixture/rule driven.

Designation definitions contain information including:

- ID
- title
- description
- icon
- associated traits
- associated genres
- recommendation bias
- evaluation logic

Multiple designation scores may exist internally.

The Profile presents one primary designation.

### Classification

**PRESERVE**

This is directly compatible with the Intelligence Contract.

---

# 11. Designation Recommendation Bias

Existing designation tests explicitly protect:

- traits
- genres
- recommendation bias

Recommendation bias must be present and non-empty.

### Classification

**PRESERVE / EVIDENCE**

### Recovered behavioral contract

`recommendation_bias` is meaningful designation metadata.

It is not merely descriptive UI metadata.

It represents recommendation-relevant tendencies that can eventually be consumed by the Recommendation Engine.

---

# 12. Designation Confidence

Current designation confidence is effectively derived from trait strength.

This does not represent true Classification Confidence.

### Classification

**ALIGN**

### Recommended interpretation

The existing signal should be understood as some form of:

> classification signal strength

rather than:

> probability that the designation is correct.

A future Classification Confidence measure may compare competing designations.

That algorithm is **not currently defined** and should not be invented during terminology cleanup.

---

# 13. Observation Architecture

Observations are currently rule-driven and can produce:

- evaluation
- generation
- confidence
- category
- traits
- genres
- related designation information
- structured evidence

There are approximately six major observation rules.

Observation evidence includes structured metric and genre evidence.

### Classification

**PRESERVE / EVIDENCE**

### Reason

This is currently one of the strongest parts of the intelligence architecture.

It already closely matches the conceptual contract:

[start text]

Pattern exists

- Pattern is directly demonstrable
- Evidence can be identified
  ↓
  Observation

[end code]

---

# 14. Finding Architecture

Findings are functional but underdeveloped.

Some Findings currently operate too close to Observation rules.

Common overlap includes:

- similar thresholds
- similar signals
- similar language
- similar purpose

### Classification

**ALIGN**

### Reason

The conceptual contract explicitly requires Findings to provide an additional interpretive level.

A Finding should answer:

> What does the available evidence suggest?

rather than merely restating:

> What pattern exists?

### Important preservation rule

Do not delete existing Findings merely because they overlap.

First determine whether they contain useful interpretive information.

### Phase 1 direction

Move Findings upward conceptually rather than replacing them wholesale.

---

# 15. Finding Test Gap

The contract now expects Findings to support:

- multiple Findings
- meaningful interpretation
- structured evidence
- confidence/data-sufficiency semantics

Existing coverage is not yet strong enough around all of these dimensions.

### Classification

**TEST GAP**

### Recommended Phase 1 tests

Protect:

- multiple findings
- finding evidence
- distinction from Observation
- empty archive behavior
- sparse archive behavior
- meaningful confidence semantics

---

# 16. Evidence Architecture

The repository does not use one universal evidence schema.

Current layers differ:

## Traits

Underlying metrics/scores provide support.

## Genre Signals

Genre presence, affinity, combinations, and related calculations provide support.

## Observations

Structured metric/genre evidence.

## Findings

Evidence is less mature.

## Designations

Traits, genres, and recommendation bias provide explanatory metadata.

## Identity

Contribution breakdown provides explanation.

### Classification

**PRESERVE**

### Important conclusion

Do not unify evidence structures merely for architectural neatness.

The contract explicitly prioritizes explainability over schema uniformity.

---

# 17. Archive Profile Assembly

The Archive Profile builder is currently the major integration boundary.

It assembles intelligence from:

- statistics
- traits
- metrics
- designations
- identities
- observations
- findings
- narrative

The implementation resembles a pipeline operationally, but the conceptual architecture remains parallel.

### Classification

**PRESERVE**

### Important interpretation

The profile builder should be understood as:

> **an integration/assembly service**

rather than proof that the intelligence systems form a strict causal hierarchy.

This distinction matters because Phase 1 should not turn the architecture into an artificial pipeline merely because the profile builder calls subsystems sequentially.

---

# 18. Identity Evaluation Redundancy

Identity evaluation currently occurs more than once during profile construction.

The profile builder evaluates identity scores and then generates a primary Identity.

Primary Identity generation itself performs identity evaluation again.

### Classification

**POSSIBLE DEAD CODE / REDUNDANCY**

### Reason

This is an implementation efficiency concern, not currently a conceptual contract violation.

It should be investigated because future scoring changes could theoretically cause the two evaluation paths to diverge.

### Phase 1 recommendation

Do not refactor solely for neatness.

Verify whether both paths are guaranteed to use the same semantics.

---

# 19. API Intelligence Endpoints

Current intelligence-oriented endpoints include:

[start text]

GET /archive-profile
GET /identities
GET /identity

[end code]

The three endpoints expose different views of Identity:

- complete Archive Profile
- ranked identity candidates
- primary Identity convenience representation

### Classification

**PRESERVE / CLARIFY**

### Reason

This is compatible with the conceptual model.

Do not remove or merge these endpoints merely for architectural symmetry.

The open question is which representation should eventually be treated as the canonical consumer contract.

---

# 20. Intelligence API Response Models

Ordinary entry APIs use explicit Pydantic response models.

The intelligence endpoints currently return dictionaries/lists directly.

Therefore internal intelligence dictionary structures are effectively part of the API contract.

### Classification

**CLARIFY / DEFER**

### Reason

The intelligence contracts are still evolving.

Introducing rigid response models before the semantic fields stabilize could create unnecessary churn.

### Phase 1 recommendation

Inventory actual consumers first.

Then identify:

- stable fields
- transitional fields
- internal-only fields

Formal API response models can follow once the conceptual contract is stable.

---

# 21. Upstream Entry Contract

The Intelligence Layer receives strongly structured entry data.

The entry API validates:

- media type
- title
- genres
- score values
- scoring categories
- completion status

Scores are constrained to the established 1–10 model.

### Classification

**PRESERVE**

### Reason

This provides important guarantees to downstream intelligence.

The intelligence layer does not consume arbitrary unvalidated user records.

---

# 22. Score Representation

The API exposes both universal and media-specific score information.

This produces an important upstream boundary:

[start text]

DATABASE
↓
EntryResponse
↓
archive mapping
↓
INTELLIGENCE INPUT

[end code]

### Classification

**PRESERVE / EVIDENCE**

The distinction between universal scores and media-specific scores is meaningful.

Do not collapse them simply because both originate from the same Entry.

---

# 23. Genre API / Intelligence Boundary

Genre intelligence currently includes multiple measures such as:

- presence
- distribution
- affinity
- combinations
- media relationships

The Archive Profile contains corresponding genre intelligence.

### Classification

**PRESERVE**

### Important conclusion

Do not collapse Genre Intelligence into a single `genre_score`.

The contract explicitly permits multiple genre signals, and the existing implementation demonstrates why.

---

# 24. Recommendation Engine

Recommendation infrastructure exists but is currently a stub.

Relevant components include:

[start text]

models/recommendations/engine.py
models/recommendations/models.py
models/recommendations/scoring.py
models/recommendations/signals.py

[end code]

The recommendation engine currently does not generate real recommendations.

Signal collection is also incomplete.

### Classification

**DEFER**

### Reason

This matches the roadmap.

Phase 1 should not distort existing intelligence merely to satisfy an unfinished recommendation consumer.

The intelligence layer should instead establish clean measurable signals that Phase 3 can eventually consume.

---

# 25. Recovered Recommendation Output Contract

The Recommendation model already anticipates:

- title
- media type
- match score
- matched signals
- mismatched signals
- summary

### Classification

**EVIDENCE / PRESERVE**

This supports the conceptual requirement that recommendations eventually explain themselves.

The intended recommendation is not merely:

[start text]

Movie X
92%

[end code]

It has a place for explaining why the match occurred.

---

# 26. User Input as Future Intelligence Data

A significant future product decision was established during the audit:

> **User-provided archive data should be considered potential intelligence input unless explicitly excluded by a later contract decision.**

This includes:

- scores
- genres
- media type
- completion state
- date consumed
- review
- future repeat-consumption metadata
- other deliberately collected user signals

The principle is:

> If the user took the time to provide a signal, the intelligence layer should eventually be allowed to determine whether that signal is useful.

This does **not** mean every field must immediately affect scoring.

It means the architecture should avoid treating user-provided information as permanently inert by default.

### Classification

**CLARIFY / PRESERVE AS DESIGN PRINCIPLE**

---

# 27. Review vs Notes

The current entry form contains a `notes` field.

The intended evolution is:

> Rename `notes` to **review**.

The field should remain optional.

The long-term intention is for review content to become usable intelligence/analytics input.

Potential future uses include:

- textual pattern analysis
- recurring themes
- interpretive language
- sentiment or reaction patterns
- evidence for observations/findings
- review/media relationship analysis
- richer recommendation signals

No specific NLP or AI algorithm is currently mandated.

### Classification

**DEFER**

### Reason

This is a future intelligence capability, not a reason to destabilize the current scoring system.

The important Phase 1 consequence is simply:

> Do not design the data model in a way that assumes user-written reviews are permanently non-analytical.

---

# 28. Previously Consumed Media

A future entry-level signal should allow the user to indicate that the recorded media was **not the first time they consumed it**, even if this is the first time they are recording it in Media Tracker.

The preferred initial representation is a simple binary field rather than a mandatory consumption count.

Example conceptual field:

[start text]

previously_consumed: true / false

[end code]

A full watch/read/play count remains a possible future enhancement but would introduce additional user-maintenance burden.

### Classification

**DEFER / CLARIFY**

### Reason

This is a meaningful future intelligence signal, but its exact analytical semantics are not yet defined.

Potential future uses could include:

- distinguishing first-time reactions from repeat-consumption reactions
- understanding whether familiarity affects scores
- identifying comfort-media behavior
- recommendation weighting
- archive interpretation
- consumption-pattern analytics

Do not assign it an intelligence formula yet.

---

# 29. Archive State Behavior

The system recognizes at least three conceptual states:

## Empty

Insufficient information for meaningful intelligence.

## Sparse

Some signals exist, but conclusions must communicate limited sufficiency.

## Established

Enough data exists for meaningful interpretation.

The existing implementation already handles empty intelligence conservatively.

### Classification

**PRESERVE**

### TEST GAP

Sparse and established state semantics need stronger explicit regression coverage.

---

# 30. Ranking / Selection Behavior

Recovered ranking behavior includes:

- designation scores sorted descending
- identity candidates ranked by score
- primary selection based on highest-ranked eligible candidate
- contribution breakdowns sorted by contribution

### Classification

**PRESERVE**

### TEST GAP

The following should be explicitly protected:

- deterministic ordering
- tie behavior
- primary selection
- close competitors
- empty candidate collections
- insufficient-data candidates

If tie-breaking is not explicitly established by the repository, do not invent one.

Mark it:

> **UNRESOLVED — requires implementation decision.**

---

# 31. Identity vs Designation

This is the most important conceptual distinction recovered during the audit.

## Designation

A named taste classification.

Example:

> The Boundary Explorer

## Identity

A broader curator philosophy.

Example:

> Systems-Seeking Interpretive Curator

### Classification

**PRESERVE / ALIGN**

The existing Identity infrastructure should not be replaced with Designation clones.

The fact that existing Identity fixtures may overlap conceptually with Designations does not mean the entire Identity system should be deleted.

The correct Phase 1 question is:

> What information would be lost if this Identity were simply renamed as a Designation?

If the answer includes broader synthesis, curatorial philosophy, or cross-signal contribution, that information should be preserved.

---

# 32. Observation vs Finding

The audit confirms that this distinction is useful but incompletely realized.

Observation:

> What recurring pattern can we directly demonstrate?

Finding:

> What does the evidence suggest?

### Classification

**PRESERVE / ALIGN**

Existing Findings that merely restate Observations should be investigated.

They should not automatically be deleted.

The Phase 1 objective is to recover the missing interpretive layer.

---

# 33. Confidence / Strength Semantics

| Current Field                 | Current Meaning                     | Contract Term                                                  | Action            |
| ----------------------------- | ----------------------------------- | -------------------------------------------------------------- | ----------------- |
| Trait strength                | Strength of represented quality     | Signal Strength                                                | PRESERVE          |
| Identity confidence           | Entry-count sufficiency             | Data Sufficiency                                               | ALIGN terminology |
| Designation confidence        | Trait-derived classification signal | Signal Strength / classification signal                        | ALIGN terminology |
| Observation confidence        | Support for observation             | Evidence Strength / Observation Confidence                     | CLARIFY           |
| Finding confidence            | Currently underdeveloped            | Evidence Strength + Data Sufficiency + interpretive confidence | ALIGN             |
| Future designation confidence | Not yet defined                     | Classification Confidence                                      | DEFER             |
| Future identity confidence    | Not yet defined                     | Classification Confidence                                      | DEFER             |

The central rule remains:

> **Do not invent new algorithms merely to fix terminology.**

---

# 34. API / Downstream Risk Matrix

| Field / Output         | Current Consumer                     |               Risk | Phase 1           |
| ---------------------- | ------------------------------------ | -----------------: | ----------------- |
| `primaryDesignation`   | Profile, Narrative                   |             Medium | PRESERVE          |
| `designations`         | Profile/future UI                    |             Medium | PRESERVE          |
| designation confidence | Profile/UI                           | High semantic risk | ALIGN terminology |
| `primaryIdentity`      | Profile, Narrative, `/identity`      |               High | PRESERVE          |
| `identities`           | `/identities`, Profile               |               High | PRESERVE          |
| Identity `score`       | Ranking/UI                           |               High | CLARIFY semantics |
| Identity `confidence`  | `/identity`, UI                      | High semantic risk | ALIGN terminology |
| Identity breakdown     | Explanation/Profile                  |               High | PRESERVE          |
| `recommendation_bias`  | Designations, future recommendations |               High | PRESERVE          |
| `universal_scores`     | Archive mapping/intelligence         |               High | PRESERVE          |
| `media_scores`         | Archive mapping/intelligence         |               High | PRESERVE          |
| observations           | Profile/Narrative                    |               High | PRESERVE          |
| findings               | Profile/future recommendations       |               High | ALIGN semantics   |
| genre affinity         | Profile/recommendations              |             Medium | PRESERVE          |
| genre combinations     | Profile/recommendations              |             Medium | PRESERVE          |
| entry count            | Sufficiency logic                    |               High | PRESERVE          |

---

# 35. Frontend Consumer Audit

The backend evidence establishes several API contracts.

A complete frontend consumer inventory remains:

> **UNRESOLVED — insufficient repository evidence.**

The specific fields requiring verification in frontend modules include:

- `primaryIdentity`
- `primaryDesignation`
- `confidence`
- `score`
- `breakdown`
- `recommendation_bias`
- `observations`
- `findings`
- genre signals

The audit should not invent frontend dependencies that cannot be traced.

---

# 36. Test Quality Findings

## Strong

Tests protecting meaningful domain behavior include:

- designation rule behavior
- designation metadata
- identity scoring
- identity fixture loading
- minimum-entry behavior
- identity contribution breakdown
- observation evidence
- empty-state behavior
- recommendation-bias metadata

## Weak

Potentially weak tests are those that only assert implementation-specific structure without protecting a meaningful domain rule.

These should be reviewed individually rather than deleted wholesale.

## Redundant

Potential redundancy exists around repeated Identity evaluation and potentially duplicated confidence calculations.

## Debugging Candidates

Any tests with:

- commented-out assertions
- debugging output
- temporary diagnostics
- duplicated setup

should be investigated before preservation or deletion.

## Missing

Important missing regression areas include:

- Finding interpretive level
- Finding evidence
- multiple Findings
- secondary Identity selection
- Identity classification confidence
- sparse archive behavior
- deterministic ties
- narrative behavior with missing intelligence components
- future review handling
- future previously-consumed handling

---

# 37. Recommended Phase 1 Changes

## 1. Correct confidence terminology

**Classification:** ALIGN
**Why:** Existing calculations often represent Data Sufficiency or Signal Strength rather than Classification Confidence.
**Affected areas:** Identity, Designation, Profile, Narrative, API responses
**Affected tests:** confidence-related Identity/Designation tests
**Risk:** MEDIUM

---

## 2. Preserve Trait normalization semantics

**Classification:** PRESERVE
**Why:** The existing 6/10 floor is established behavior and has different semantics from Identity scoring normalization.
**Affected files:** trait calculation/scoring services
**Affected tests:** trait normalization tests
**Risk:** LOW

---

## 3. Preserve derived-trait architecture

**Classification:** PRESERVE
**Why:** Identity scoring already uses derived signals and fixture-driven definitions.
**Affected files:** trait calculator, identity scorer, identity fixtures
**Risk:** LOW

---

## 4. Audit Findings individually

**Classification:** ALIGN
**Why:** Some Findings currently duplicate Observation-level behavior.
**Affected files:** Findings services/rules
**Affected tests:** Finding rule tests
**Risk:** MEDIUM

---

## 5. Strengthen Finding evidence

**Classification:** TEST GAP / ALIGN
**Why:** Findings need an explainable interpretive layer.
**Affected files:** Findings services/models
**Risk:** MEDIUM

---

## 6. Preserve Identity contribution explanations

**Classification:** EVIDENCE
**Why:** This is strong existing explanation infrastructure.
**Affected files:** Identity scorer/explainer
**Risk:** LOW

---

## 7. Preserve Identity fixture architecture

**Classification:** PRESERVE
**Why:** Fixtures provide deterministic vocabulary, weights, minimum data requirements, and explainability.
**Risk:** LOW

---

## 8. Define meaningful secondary Identity behavior

**Classification:** CLARIFY / TEST GAP
**Why:** Multiple ranked identities exist, but "meaningful secondary" semantics are not sufficiently locked.
**Risk:** MEDIUM

---

## 9. Preserve Designation recommendation bias

**Classification:** PRESERVE
**Why:** Existing tests explicitly protect it and the future Recommendation Engine needs it.
**Risk:** LOW

---

## 10. Preserve Archive Profile assembly

**Classification:** PRESERVE
**Why:** It already provides a useful integration boundary.
**Risk:** LOW

---

## 11. Verify API consumers before renaming fields

**Classification:** TEST GAP / CLARIFY
**Why:** Intelligence response dictionaries currently function as informal API contracts.
**Risk:** HIGH if renamed blindly

---

## 12. Investigate duplicate Identity evaluation

**Classification:** POSSIBLE DEAD CODE
**Why:** Identity scores may currently be calculated more than once during profile construction.
**Risk:** LOW for immediate behavior; MEDIUM for future divergence

---

# 38. Explicitly Deferred Items

The following should **not** be redesigned during Phase 1:

- Recommendation Engine implementation
- recommendation scoring algorithm
- machine-learning recommendations
- frontend React migration
- library pagination
- import/export
- metadata expansion
- universal intelligence response schema
- major Identity scoring algorithm replacement
- mandatory watch/read/play counts
- review NLP/AI implementation
- previously-consumed analytical weighting
- new designation vocabulary beyond what conceptual alignment requires
- large-scale narrative rewrite

---

# 39. New Product/Data Signals To Preserve For Future Intelligence

The audit also establishes a broader design principle:

> **User-provided information should generally be treated as potential intelligence input.**

Future candidates include:

- optional Review
- previously-consumed flag
- date consumed
- completion state
- genres
- scores
- other intentionally collected archive metadata

This does not mean every field should directly influence scoring.

It means the data model should preserve the possibility of future analytical use.

---

# 40. Review Field Evolution

Current:

> `notes`

Future intended meaning:

> `review`

Properties:

- optional
- user-authored
- retained as archive data
- eventually available to analytics/intelligence

Potential future uses should be investigated only after the conceptual intelligence layer is stable.

### Classification

**DEFER**

---

# 41. Previously Consumed Flag

Potential future field:

[start text]

previously_consumed: boolean

[end code]

Purpose:

> Distinguish first-time consumption from repeat consumption without requiring the user to maintain a consumption count.

Potential future intelligence uses:

- repeat-consumption behavior
- familiarity effects
- comfort-media patterns
- recommendation weighting
- archive interpretation
- consumption analytics

### Classification

**DEFER / CLARIFY**

No scoring semantics should be invented yet.

---

# 42. Final Audit Conclusions

The existing repository does not need a wholesale intelligence rewrite.

The strongest existing infrastructure is:

1. Trait calculation
2. Derived traits
3. Genre intelligence
4. Observation evidence
5. Fixture-driven Designations
6. Fixture-driven Identities
7. Identity contribution breakdowns
8. Archive Profile assembly
9. Narrative synthesis
10. Recommendation-bias metadata

The most important areas requiring Phase 1 attention are:

1. Observation vs Finding separation
2. Designation vs Identity separation
3. confidence terminology
4. secondary Identity semantics
5. Finding evidence
6. API field semantics
7. sparse/established archive behavior
8. deterministic ranking/ties
9. regression protection

The dominant strategy should remain:

> **Preserve working behavior unless it directly conflicts with the conceptual contract.**

---

# 43. Lost-Behavior Checklist

- [x] behavior discovered
- [x] behavior classified
- [x] behavior mapped against the contract
- [x] behavior identified for preservation
- [x] behavior identified for intentional alignment
- [x] behavior identified for clarification
- [x] evidence mechanisms identified
- [x] API/downstream dependencies identified where repository evidence permits
- [ ] complete frontend consumer inventory
- [x] test gaps identified
- [x] deferred items identified
- [x] future user-input signals documented
- [ ] Phase 1 implementation changes performed

---

# 44. Standard of Evidence

Important behavioral claims in this document should be traceable to repository implementation or tests.

Representative evidence locations include:

[start text]

models/services/archive_engine.py
models/services/identity_engine.py
models/services/identity_scorer.py
models/services/trait_calculator.py
models/recommendations/engine.py
models/recommendations/signals.py
models/recommendations/scoring.py
models/recommendations/models.py
models/responses.py
tests/designations/
tests/identities/
tests/observations/
tests/findings/

[end code]

Where the repository does not provide enough evidence:

> **UNRESOLVED — insufficient repository evidence.**

That statement should be preferred over inference.

---

# 45. Final Principle

This audit exists to preserve the project's behavioral memory.

The question is not:

> "How should we redesign this?"

The question is:

> **"What did we already build, what did we implicitly promise through our tests, what conflicts with the new intelligence contract, and what would we accidentally lose if we started changing things now?"**

**Prefer preservation over invention.**

**Prefer evidence over intuition.**

**Prefer evolution over rewrite.**
