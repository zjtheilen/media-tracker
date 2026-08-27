# Media Tracker — Master Roadmap & Source of Truth

**Authoritative branch:** `develop-3`
**Guiding principle:** **Evolution, not rewrite.**

---

# CURRENT PROJECT STATUS

Media Tracker is a personal media archive and taste-intelligence application.

The project currently has:

* a functioning media archive
* hybrid universal + media-specific scoring
* genre intelligence
* measurable traits
* Observation infrastructure
* Finding infrastructure
* Designation infrastructure
* Identity scoring infrastructure
* identity-derived traits
* identity contribution/explanation infrastructure
* Archive Profile backend infrastructure
* template-driven narrative infrastructure
* recommendation infrastructure/stub
* automated regression coverage

The current intelligence architecture is intentionally modular.

It should **not** be interpreted as a strict runtime pipeline.

```text
RAW ARCHIVE
↓
TRAITS + GENRE SIGNALS
↓
┌─────────────┬───────────┬─────────────┬────────────┐
│ OBSERVATIONS│ FINDINGS │ DESIGNATIONS│ IDENTITIES │
└─────────────┴───────────┴─────────────┴────────────┘
↓
ARCHIVE PROFILE
↓
RECOMMENDATION SIGNALS
↓
RECOMMENDATION ENGINE
```

Observations, Findings, Designations, and Identities remain analytically parallel perspectives over shared archive data.

---

# CURRENT REGRESSION BASELINE

The current test suite has:

> **210 passing tests, 0 failures**

This is the current regression baseline for Phase 1 implementation work.

The earlier forensic audit established a historical baseline of approximately 199 tests. The current repository has since grown beyond that baseline.

The **current 210-test baseline is therefore the active regression reference**.

Phase 1 changes should preserve existing meaningful behavior unless a behavior is **deliberately changed** as part of contract alignment.

Any intentional test change should be accompanied by:

1. an explicit reason
2. a corresponding decision in the Phase 1 Decision & Implementation Map
3. replacement regression coverage where appropriate
4. a full-suite run

The test count itself is not sacred.

The **behavior protected by meaningful tests** is what matters.

---

# PHASE 0 — CONCEPTUAL LOCK

## Status: COMPLETE

The Intelligence Contract v1 defines:

* Trait
* Genre Signal
* Observation
* Finding
* Designation
* Identity
* Evidence
* Signal Strength
* Data Sufficiency
* Classification Confidence
* Evidence Strength
* Narrative
* Recommendation Signals
* Recommendation Bias
* Archive Profile
* Analytics

The contract also establishes:

* Observation vs Finding distinction
* Designation vs Identity distinction
* multiple Observations
* multiple Findings
* multiple internal Designations
* one Primary Designation on Profile
* multiple Identities internally
* one Primary Identity
* zero or more meaningful Secondary Identities
* Analytics vs Profile separation
* empty/sparse/established archive states
* explainability requirements
* evolution rather than rewrite

Phase 0 is complete.

The project should no longer treat the conceptual model as an open-ended design exercise.

---

# FORENSIC AUDIT — COMPLETION STATUS

## Status: COMPLETE

The repository was audited against:

1. the Intelligence Contract
2. the Phase 1 Alignment plan
3. the current implementation
4. the current test suite
5. API response models and downstream consumers
6. archive-derived behavioral evidence

The audit specifically examined:

* Observations
* Findings
* Designations
* Identities
* Traits
* Genre intelligence
* Evidence
* confidence/strength semantics
* archive-state behavior
* ranking and primary selection
* API/downstream contracts
* test coverage
* hidden behavioral contracts
* potentially lost behavior
* debugging/dead-code candidates

The purpose of the audit was to recover the project's **behavioral memory** before Phase 1 changes.

The audit's conclusion is:

> **The existing intelligence system contains meaningful behavior that must be evolved rather than replaced.**

Phase 1 must therefore be conservative.

The forensic audit is now evidence for implementation decisions rather than an additional open-ended investigation phase.

---

# PHASE 1 — INTELLIGENCE ALIGNMENT

## Status: ACTIVE

### Goal

Bring the existing intelligence implementation into alignment with the locked conceptual model without rewriting working infrastructure.

Phase 1 should change behavior only where:

* existing behavior directly contradicts the contract
* terminology creates meaningful semantic confusion
* an important hidden contract needs to become explicit
* deterministic behavior is currently under-specified
* regression protection is missing
* existing conceptual layers are improperly duplicated

The detailed implementation decisions live in:

> **Phase 1 — Intelligence Alignment Decision & Implementation Map**

That document is the operational decision authority for Phase 1.

This roadmap provides the project-level sequence and status.

---

# PHASE 1 — DECISION AUTHORITY

Before Phase 1 implementation begins, the following documents have distinct responsibilities:

| Document                              | Responsibility                                      |
| ------------------------------------- | --------------------------------------------------- |
| Intelligence Contract v1              | Defines what intelligence concepts mean             |
| Phase 1 Alignment plan                | Defines the overall alignment effort                |
| Phase 1 Decision & Implementation Map | Defines specific implementation decisions and gates |
| Master Roadmap                        | Defines project sequence and phase boundaries       |
| Forensic Audits                       | Provide implementation and behavioral evidence      |

The governing principle remains:

> **Evolution, not rewrite.**

Historical candidates and earlier hypotheses may remain useful for context, but they do not override decisions explicitly marked **LOCKED** in the Decision & Implementation Map.

---

# PHASE 1 — DECISION STATUS

The Decision & Implementation Map uses:

| Status                | Meaning                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| **LOCKED**            | Sufficiently defined for dependent implementation to rely on                |
| **WORKING DIRECTION** | Strong evidence supports the direction, but operational details remain open |
| **UNRESOLVED**        | A decision is still required before dependent implementation can proceed    |
| **DEFERRED**          | Intentionally outside Phase 1                                               |
| **FACT**              | Verified repository or audit fact                                           |

The implementation rule is:

> **No implementation may depend on an UNRESOLVED decision.**

---

## Phase 1 forensic work status

The forensic audit is complete.

Any subsequent forensic work is limited to a specific unresolved or implementation-gating question identified by the Decision & Implementation Map.

A forensic pass must produce one of:

* a locked decision
* a concrete implementation correction
* a test gap requiring protection
* a documented clarification
* an explicit deferral

Forensic work should not reopen already-resolved decisions without new contradictory repository evidence.

Current next forensic pass:

> Trace `generateClassificationBasis()` / `classificationBasis` through backend production paths, API serialization, and frontend consumers.

This is a targeted consumer audit, not a reopening of the completed forensic phase.

---

# PHASE 1 — LOCKED CONCEPTUAL MODEL

The following cardinalities are locked:

```text
TRAITS
MANY

GENRE SIGNALS
MANY

OBSERVATIONS
MANY

FINDINGS
MANY

DESIGNATIONS
MANY internally
ONE PRIMARY on Profile

IDENTITIES
MANY internally
ONE PRIMARY
ZERO OR MORE meaningful SECONDARIES

NARRATIVE
ONE downstream synthesis

RECOMMENDATION SIGNALS
MANY
```

The intelligence layers are analytically parallel.

They are not required to form a literal runtime pipeline.

---

# PHASE 1 — LOCKED QUANTITATIVE VOCABULARY

The intelligence system currently uses `confidence` for several different concepts.

These meanings must remain distinct:

| Term                          | Meaning                                                             |
| ----------------------------- | ------------------------------------------------------------------- |
| **Signal Strength**           | How strongly a quality or signal is expressed                       |
| **Data Sufficiency**          | Whether enough archive data exists to evaluate something reasonably |
| **Classification Confidence** | How clearly one classification beats plausible alternatives         |
| **Evidence Strength**         | How strongly available evidence supports a conclusion               |

## Important implementation rule

Do **not** create four numerical fields everywhere merely because four concepts exist.

Introduce a distinct field only where the semantic distinction is genuinely required by:

* API
* UI
* explanation layer
* decision logic
* downstream consumer

Do not invent a Classification Confidence algorithm merely to justify the word `confidence`.

---

# PHASE 1 — CURRENT SEMANTIC MAPPING

| Current Field                       | Actual Meaning                 | Contract Term                       | Classification | Phase 1 Action                         |
| ----------------------------------- | ------------------------------ | ----------------------------------- | -------------- | -------------------------------------- |
| Identity `confidence`               | `entryCount / minimum_entries` | Data Sufficiency                    | TERMINOLOGY    | Rename/reframe                         |
| Designation `designationConfidence` | Average of trait scores        | Signal Strength-like                | TERMINOLOGY    | Rename/reframe                         |
| Observation `confidence`            | Threshold-relative support     | Signal Strength / Evidence Strength | CLARIFICATION  | Define and rename appropriately        |
| Finding confidence                  | Not standardized               | Unresolved                          | CLARIFICATION  | Do not add until semantics are defined |

The principle is:

> **Terminology correction before algorithm replacement.**

A valid calculation with a misleading name is not automatically a bad algorithm.

---

# PHASE 1 — RECOVERED BEHAVIOR TO PRESERVE

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
* API response structures relied upon by downstream consumers
* Existing regression behavior unless intentionally changed

---

# PHASE 1 — RECOVERED NORMALIZATION CONTRACTS

Two different normalization systems currently exist.

They must **not** be unified merely for implementation cleanliness.

## Trait Signal Strength

```text
value <= 6 → 0
value = 10 → 1

formula:
min(max((value - 6) / 4, 0), 1)
```

## Identity Score normalization

```text
normalize_identity_score(value)
=
max(0, min(value / 10, 1))
```

These have different semantics.

### Classification

**PRESERVE**

---

# PHASE 1 — IDENTITY TRAIT RESOLUTION

Current resolution priority:

```text
universalAverages
↓
mediaAverages
↓
derived-trait calculation
```

### Classification

**PRESERVE**

Do not replace this hierarchy merely for architectural consistency.

---

# PHASE 1 — IDENTITY DERIVED TRAITS

Current derived Identity signals include:

* `experimental_affinity`
* `genre_diversity`
* `novelty`
* `analysis`
* `ambiguity`
* `reflection`
* `system_design`

Current implementation facts include:

* `novelty` and `experimental_affinity` currently rely on the same experimental-genre percentage signal
* `genre_diversity = len(genres) × 2` and may exceed 10 before clamping
* `system_design` currently aliases `gameplay_mechanics`

These are implementation facts.

They are **not automatic redesign triggers**.

### Phase 1 decision

> Preserve existing derived-trait machinery unless a specific contract conflict requires behavioral change.

Do not redesign derived traits merely because they are imperfect.

---

# PHASE 1 — IDENTITY ELIGIBILITY

## Status: ALIGNMENT REQUIRED

This is an important correction to the previous roadmap.

The current roadmap previously described Identity minimum-entry behavior as already implemented and verified.

The current Phase 1 Decision & Implementation Map establishes that this assumption is stale.

## Current repository behavior — FACT

The current implementation zeros the Identity score and contribution breakdown when the minimum-entry requirement is not met, but the Identity can remain present in ranked results.

This means an ineligible Identity can potentially remain selectable as a zero-scored candidate.

That contradicts the locked conceptual decision.

## Locked behavior

`minimum_entries` is an **eligibility gate**, not merely a score gate.

```text
entry_count < minimum_entries
↓
INELIGIBLE
↓
excluded from Identity ranking / presentation
```

```text
entry_count >= minimum_entries
↓
ELIGIBLE
↓
score
↓
rank
↓
contribution breakdown
```

### Classification

**ALIGNMENT**

### Required Phase 1 change

Change the scorer/engine behavior so ineligible Identities are excluded before ranking.

Then update affected tests.

### Important distinction

This is **not** a new Identity system.

It is a correction to existing Identity machinery so that its established `minimum_entries` requirement behaves as an actual eligibility gate.

---

# PHASE 1 — PRIMARY IDENTITY

## Status: LOCKED SHAPE / TESTING REQUIRED

The conceptual shape is:

```text
MANY eligible candidates
↓
deterministic ranking
↓
ONE PRIMARY
```

Existing ranking machinery should be preserved.

Primary selection should operate only on eligible candidates.

Required regression coverage:

* ineligible Identity cannot become primary
* exact minimum-entry threshold makes Identity eligible
* ranking is deterministic
* primary selection is deterministic
* contribution breakdown remains available for eligible candidates

Tie policy remains separately unresolved.

---

# PHASE 1 — SECONDARY IDENTITIES

## Status: CLARIFICATION REQUIRED

The contract permits:

* one Primary Identity
* zero or more meaningful Secondary Identities

The system must not simply display every Identity with a nonzero score.

Meaningful Secondary Identity presentation must eventually consider:

* eligibility / Data Sufficiency
* meaningful signal strength
* relationship to Primary Identity
* separation from weak candidates

### Gate

Do not invent numeric secondary-Identity thresholds until the accepted Identity catalog has been evaluated and actual score distributions are available.

---

# PHASE 1 — IDENTITY CATALOG

## Status: WORKING DIRECTION

Identity is intended to represent:

> **durable media-engagement / curator-philosophy identities**

It is not intended to create personality types specific to Zach.

Current Identity fixtures are historical implementations, not the final conceptual catalog.

The eventual catalog must be generic enough to detect meaningful curator philosophies in other users' archives.

## Archive-supported Identity spine

Current evidence supports:

### Structural Curator

Seeks works where form, rules, or structure are part of the meaning.

**Evidence:** STRONG

### Concept-First Curator

Prioritizes unusual ideas and conceptual payoff over spectacle or pure craft.

**Evidence:** STRONG

### Engagement-Gated Curator

Will not fully reward works that fail to hold attention, even when intellectually interesting.

**Evidence:** MODERATE–STRONG

These remain **WORKING DIRECTION**, not finalized implementation contracts.

## Historical candidates

Earlier candidates remain historical context:

* Systems-Seeking
* Interpretive
* Boundary-Seeking
* Immersive
* Craft-Conscious
* Reflective

They do not override the current Identity direction.

## Explicitly excluded Identity direction

Do not make Identity vocabulary:

* Genre-specific labels
* Designation clones
* Pure “Systems Architect” as the main Identity

### Identity implementation gate

Before implementing new Identity fixture semantics, each accepted Identity must have:

* Purpose
* Primary signals
* Secondary signals
* Explicitly excluded/non-contributing signals
* Minimum data requirements
* Scoring approach
* Contribution/evidence explanation
* Distinction from other Identities
* Distinction from Designations

No new Identity fixture semantics should be implemented until this gate is satisfied.

Machinery-only preparation may proceed independently.

---

# PHASE 1 — DESIGNATION ALIGNMENT

## Status: PRESERVE + TERMINOLOGY + EVIDENCE

Designation answers:

> **What recognizable taste classification fits?**

Designations are taste classifications, not curator philosophies.

Current Designations:

| ID                     | Title                    |
| ---------------------- | ------------------------ |
| `boundary_explorer`    | The Boundary Explorer    |
| `curator`              | The Curator              |
| `engagement_architect` | The Engagement Architect |
| `deep_diver`           | The Deep Diver           |

Preserve:

* rule/fixture-driven definitions
* multiple internal candidates
* ranking
* primary selection
* trait inputs
* genre inputs
* recommendation-bias metadata

Phase 1 may improve terminology and lightweight explanation.

Do not expand Designations into Identity territory.

---

# PHASE 1 — IDENTITY / DESIGNATION SEPARATION

## Status: LOCKED

The two layers answer different questions.

| Layer       | Question                                        |
| ----------- | ----------------------------------------------- |
| Designation | What named taste classification fits?           |
| Identity    | What kind of curator does the archive describe? |

Forbidden intended final state:

```text
Designation: Boundary Explorer
Identity: Boundary Explorer
```

Current name overlap is treated as an implementation artifact.

Do not solve this by deleting Identity machinery.

Instead:

* preserve Identity scoring
* preserve Identity normalization
* preserve weighted scoring
* preserve derived traits
* preserve contribution breakdown
* preserve explanations
* evolve fixture vocabulary toward curator philosophy

---

# PHASE 1 — FINDINGS VS OBSERVATIONS

## Status: ALIGNMENT + CLARIFICATION + TESTING

The conceptual distinction is:

| Layer       | Question                          |
| ----------- | --------------------------------- |
| Observation | What can we directly demonstrate? |
| Finding     | What does the evidence suggest?   |

The locked Finding boundary is:

> **A Finding states a conclusion that is not fully present in any single Observation, Trait, or Genre Signal.**

A metric threshold may support a Finding.

The threshold itself should not automatically become the Finding.

## Operational test

> If the Finding were removed and replaced by its underlying Observation or raw signal, would meaningful information be lost?

If no meaningful information is lost, the item is probably functioning as an Observation or Genre Signal.

Do not automatically delete borderline Findings.

---

# PHASE 1 — EXISTING FINDING DECISIONS

| Finding                | Classification | Decision                                                  |
| ---------------------- | -------------- | --------------------------------------------------------- |
| `concept-driven`       | PRESERVE       | Preserve dual-threshold behavior                          |
| `engagement-priority`  | ELEVATE        | Define interpretive purpose beyond engagement threshold   |
| `systems-preference`   | ELEVATE        | Define distinction from systems-affinity                  |
| `speculative-interest` | ELEVATE        | Define interpretive role and boundary                     |
| `atmospheric-interest` | DEFER          | Current behavior substantially overlaps atmospheric-focus |

`identity-profile` remains a protected special case.

## Finding implementation gate

Before changing an ELEVATE Finding, write a short purpose statement answering:

> **What interpretive conclusion does this Finding add that the underlying Observation / Trait / Genre Signal does not already communicate?**

No elevated Finding should be implemented until that purpose is accepted.

No mass deletion of Findings is permitted during Phase 1.

---

# PHASE 1 — FINDING EVIDENCE

## Status: EVIDENCE

Findings require explainable support.

Evidence may come from:

* Observations
* Traits
* Genre Signals
* Metrics
* other explicit signals

The evidence schema does **not** need to be identical to Observation evidence.

The requirement is simply:

> **A user should be able to understand why the system thinks the Finding applies.**

Do not create a universal evidence schema merely for architectural neatness.

---

# PHASE 1 — FINDING CONFIDENCE

## Status: UNRESOLVED

There is currently no standardized Finding confidence field.

Do not add one until its semantic meaning can be distinguished from:

* Signal Strength
* Data Sufficiency
* Evidence Strength
* Classification Confidence

### Gate

No new Finding confidence field until its meaning is explicitly defined.

---

# PHASE 1 — OBSERVATION CATALOG

## Status: WORKING DIRECTION

Phase 1 does not require completion of the entire Observation catalog.

The goal is to establish coherent boundaries and prevent silent duplication between Observation and Finding.

Existing Observation machinery remains protected unless a specific alignment decision says otherwise.

Archive-supported candidates include:

| Candidate                         | Strength        | Notes                                                |
| --------------------------------- | --------------- | ---------------------------------------------------- |
| `concept-density`                 | STRONG          | High concept/originality concentration               |
| `engagement-floor`                | STRONG          | Top-tier works rarely have weak engagement           |
| `speculative-structure`           | STRONG          | Structural + genre signal; not pure genre percentage |
| `vn-narrative-reward`             | STRONG          | Games-specific                                       |
| `emotion-optional-platformer`     | STRONG          | Medium-specific                                      |
| `spectacle-penalty`               | STRONG          | Small negative sample; requires caution              |
| `triad-coherence`                 | STRONG          | Movie-specific                                       |
| `atmosphere-present-not-required` | MODERATE        | False-positive / overweighting risk                  |
| `writing-tracks-total`            | MODERATE–STRONG | Movies / Books                                       |

Do not automatically implement these.

Before locking any new Observation, examine:

* redundancy
* medium-specific vs cross-media behavior
* Observation vs Finding ownership
* evidence strength
* false-positive risk
* information not already represented elsewhere

---

# PHASE 1 — ARCHIVE BEHAVIORAL GROUND TRUTH

Audit #3 analyzed the actual rated archive across games, movies, and books.

This evidence informs what the intelligence system should plausibly detect.

It must **not** become Zach-specific hard-coded logic.

Strong evidence supports:

> **Conceptual and structural ambition under high engagement is rewarded more consistently than polish, spectacle, or mechanics-in-isolation.**

Strong cross-media patterns include:

* high concept/originality + thought-provoking/depth among top works
* mind-bending / psychological / speculative structure rather than mere genre membership
* engagement acting as a gate for top-tier scores
* visual novel / puzzle-narrative dominance in game top tier
* emotion often behaving as a medium-specific signal
* spectacle without conceptual weight scoring poorly
* atmosphere elevating some works without being universally required
* systems/mechanics excellence alone being insufficient evidence of the primary curator identity

Negative evidence indicates that the system should not currently model as primary preferences:

* universal high-emotion preference
* atmosphere as the primary driver of top scores
* systems/mechanics as the defining curator identity
* “likes horror” as a sufficient explanation
* “likes sci-fi” as a sufficient explanation
* production value as a primary predictor
* replayability as a core cross-media trait
* genre frequency as equivalent to preference
* single-metric Findings as the primary interpretive layer

Archive evidence should inform prioritization, not become hard-coded personality logic.

---

# PHASE 1 — ARCHIVE STATES

## Status: CLARIFICATION

Conceptual states are locked:

```text
EMPTY
SPARSE
ESTABLISHED
```

The semantic principle is:

> **Insufficient data should produce insufficient evidence, not false certainty.**

Operational thresholds remain unresolved.

Still to define:

* numeric thresholds per state
* whether thresholds differ by subsystem
* interaction with Identity eligibility
* Observation minimum evidence
* Designation-specific requirements

Do not branch production behavior on these state labels until thresholds are locked.

If a threshold cannot be established from current repository behavior or tests:

> **UNRESOLVED — requires implementation decision.**

---

# PHASE 1 — RANKING / TIE BEHAVIOR

## Status: CLARIFICATION

The repository contains explicit score-based ranking.

For each ranking system, document:

* sort key
* precision
* tie behavior
* stable ordering
* primary selection
* close-competitor behavior

Do not invent a tie-breaking rule unless repository evidence or an explicit conceptual decision supports it.

The final policy must distinguish:

* exact ties
* meaningful near-ties
* strong-vs-weak differences

Example:

```text
91 vs 90
```

is conceptually different from:

```text
91 vs 62
```

The policy must eventually determine:

* deterministic exact-tie behavior
* stable secondary sort key where necessary
* meaningful near-tie definition
* whether close competitors are displayed
* whether close competitors can affect Primary selection
* whether the policy applies to Designations, Identities, or both

### Gate

No finalized tie/near-tie presentation policy should be implemented until the policy is explicitly LOCKED.

---

# PHASE 1 — NARRATIVE

## Status: PRESERVE + TESTING

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

Narrative should consume intelligence rather than become another intelligence engine.

---

# PHASE 1 — API / FRONTEND COMPATIBILITY

## Status: CLARIFICATION

Every terminology or field change must account for the complete blast radius:

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

No field rename is complete merely because the backend has been renamed.

Each rename requires an explicit compatibility checklist.

### Gate

The per-field API/frontend rename plan must be documented before executing the terminology pass.

No React migration occurs during Phase 1.

---

# PHASE 1 — ANALYTICS VS PROFILE

## Status: LOCKED

The two surfaces answer different questions.

| Surface   | Question                    |
| --------- | --------------------------- |
| Analytics | What do the numbers say?    |
| Profile   | What does the archive mean? |

Profile intelligence should not simply be pushed back into Analytics.

Profile UI remains outside Phase 1.

---

# PHASE 1 — RECOMMENDATION SIGNALS

## Status: DEFERRED — PHASE 3

Do not implement recommendation weighting during Phase 1.

Potential future recommendation signals include:

### Hard / measurable

* Trait Strength
* Genre Affinity
* Scoring Preferences

### Soft / interpretive

* Observations
* Findings
* Identity indirectly

Identity must not become an opaque recommendation score.

Preserve existing recommendation-bias metadata on Designations and Identities.

---

# PHASE 1 — EXPLICIT NON-GOALS

Phase 1 does **not** include:

* rewriting scoring rubrics
* rewriting CRUD
* replacing the Entry model
* replacing archive mapping
* Recommendation Engine implementation
* Profile UI
* React migration
* mass deletion of Findings
* mass deletion of Identities
* inventing Classification Confidence mathematics for its own sake
* unifying Trait and Identity normalization
* designing Identities that only describe Zach
* treating genre frequency as preference
* treating a single metric as sufficient interpretive evidence
* implementing new Observation rules before the shortlist is accepted
* implementing elevated Findings before their purposes are defined
* implementing Secondary Identity thresholds before score distributions are inspected
* implementing Archive State branching before operational thresholds are defined
* solving Designation/Identity name collisions through artificial rewording
* rewriting working infrastructure merely because its implementation is imperfect

---

# PHASE 1 — IMPLEMENTATION GATES

The following decisions remain unresolved and block dependent semantic implementation:

* [ ] Final Phase 1 Identity shortlist
* [ ] Per-Identity signal definitions
* [ ] Secondary Identity numeric thresholds
* [ ] Tie / close-competitor policy
* [ ] Written purpose statements for each ELEVATE Finding
* [ ] Finding evidence model for elevated Findings
* [ ] Finding confidence semantics, if a field will be added
* [ ] Phase 1 Observation shortlist, if new rules will be added
* [ ] Archive-state operational thresholds, if state labels will affect code
* [ ] Per-field API/frontend rename plan

The following are already locked and may proceed where their dependencies are satisfied:

* [x] Confidence semantic vocabulary
* [x] Identity ≠ Designation
* [x] Identity minimum-entry = eligibility gate
* [x] Primary Identity = one from eligible ranked candidates
* [x] Secondary Identity = meaningful-only principle
* [x] Finding boundary rule
* [x] Finding operational boundary test
* [x] Existing Finding PRESERVE / ELEVATE / DEFER classifications
* [x] Trait and Identity normalizations remain separate
* [x] Narrative is downstream-only
* [x] Recommendation work deferred
* [x] Identity catalog must be generic and must not clone Designations

---

# PHASE 1 — PRE-CODE / MERGE REQUIREMENTS

Before any Phase 1 change is merged:

* [ ] Change is explicitly classified
* [ ] Change has a documented reason tied to Contract and/or audit evidence
* [ ] Affected modules are identified
* [ ] Affected API/frontend consumers are identified
* [ ] Affected tests are identified
* [ ] Existing regression behavior is understood
* [ ] Full suite passes
* [ ] New/changed behavior has regression coverage
* [ ] No unrelated redesign has been introduced
* [ ] No gated semantic decision has been implemented early

---

# PHASE 1 — WORK ORDER

The work order is dependency-aware.

A step may proceed only when its required decisions are LOCKED.

## 1. Terminology pass

**Status:** BLOCKED on per-field rename map

Correct confidence terminology without changing underlying algorithms.

Required:

* map current field semantics
* identify consumers
* identify API exposure
* identify frontend usage
* identify narrative usage
* rename/reframe where appropriate
* preserve behavior
* update tests and serialization

---

## 2. Identity eligibility alignment

**Status:** READY

This is a locked Phase 1 behavioral correction.

Change the current score-gate behavior to a true eligibility gate.

Required:

* exclude ineligible Identities before ranking
* preserve eligible scoring
* preserve contribution breakdown
* preserve Data Sufficiency semantics separately
* update affected regression tests
* run the full suite

This is the first intentional behavioral change currently authorized by the Decision & Implementation Map.

---

## 3. Designation terminology / explanation

**Status:** READY FOR TERMINOLOGY WORK

Preserve:

* scoring machinery
* ranking
* primary selection
* traits
* genres
* recommendation-bias metadata

Correct semantic terminology and improve lightweight evidence/explanation where necessary.

Do not redesign the Designation catalog as part of terminology work.

---

## 4. Finding documentation and regression coverage

**Status:** READY

* Preserve `concept-driven`
* Document `atmospheric-interest` as deferred
* Protect existing Finding boundaries
* Add missing regression coverage
* Do not mass-delete Findings

---

## 5. Elevated Findings

**Status:** BLOCKED

For each ELEVATE Finding:

* define interpretive purpose
* define evidence relationship
* demonstrate distinction from Observation / Genre Signal
* add dedicated tests

Do not implement until purpose statements are LOCKED.

---

## 6. Identity catalog evolution

**Status:** BLOCKED

Before changing Identity fixture semantics:

* accept the Phase 1 Identity shortlist
* define signals
* define exclusions
* define minimum data requirements
* define scoring approach
* define explanation/contribution requirements
* define distinctions between Identities
* define distinctions from Designations

Machinery-only work may proceed independently.

---

## 7. Secondary Identity policy

**Status:** BLOCKED

Inspect score distributions under the accepted Identity catalog before defining numeric thresholds.

Define:

* meaningfulness
* relationship to Primary
* threshold behavior
* minimum separation from weak candidates

---

## 8. Tie / close-competitor policy

**Status:** BLOCKED**

Write and lock the conceptual policy before implementing presentation behavior.

Apply consistently where ranking/presentation requires it.

---

## 9. Observation changes

**Status:** BLOCKED**

Accept the Phase 1 Observation shortlist before adding new rules.

Existing Observation machinery remains protected.

---

## 10. Archive-state implementation

**Status:** BLOCKED**

Do not add state-dependent branching until operational thresholds are LOCKED.

---

## 11. Regression

**Status:** ONGOING**

Run the full suite after each intentional behavior change.

Current baseline:

> **210 tests passing, 0 failures**

Phase 1 expectation:

> **Existing meaningful behavior remains protected except for explicitly approved alignment changes, with regression coverage for every intentional change.**

---

# PHASE 1 — CURRENT WORK QUEUE

The active implementation queue is now:

1. **Correct the roadmap/documentation around Identity eligibility**

   * Eligibility is not yet fully aligned in production behavior.
   * Treat minimum-entry as a hard gate.
   * Exclude ineligible Identities before ranking.
   * Update tests.

2. **Resolve confidence terminology**

   * Build the per-field semantic map.
   * Identify consumers.
   * Correct terminology without unnecessary algorithm changes.

3. **Create the per-field API/frontend rename plan**

   * Include backend.
   * Include serialization.
   * Include `charts.js`.
   * Include tests.
   * Include narrative consumers.
   * Include fixtures.

4. **Align Designation terminology/explanation**

   * Preserve scoring machinery.
   * Preserve ranking.
   * Preserve primary selection.
   * Preserve recommendation-bias metadata.

5. **Lock Identity shortlist and signal definitions**

   * Move toward generic curator-philosophy concepts.
   * Do not clone Designations.
   * Do not make the catalog Zach-specific.

6. **Clarify Findings vs Observations**

   * Preserve useful Findings.
   * Define purpose for ELEVATE Findings.
   * Strengthen evidence where needed.

7. **Define Finding evidence requirements**

   * Do not force Observation evidence and Finding evidence into one universal schema.

8. **Clarify Secondary Identity presentation**

   * Preserve internal multiple-Identity scoring.
   * Define meaningfulness and thresholds only after score distributions are inspected.

9. **Clarify ranking / tie behavior**

   * Document actual behavior.
   * Define deterministic exact-tie behavior.
   * Define near-tie semantics.
   * Add regression protection.

10. **Review suspicious/debug tests**

    * Investigate `test_debug_identity_scores`.
    * Investigate redundant or debugging-only tests.
    * Do not remove behavior blindly.

11. **Run and preserve full regression coverage**

    * Maintain the current 210-test baseline except for intentional changes.
    * Record the resulting suite after each intentional change.

12. **Only after Phase 1 alignment is complete, move to Archive Profile UI.**

---

# FUTURE USER-INPUT INTELLIGENCE

## Status: FUTURE — PRESERVE AS PRODUCT DIRECTION

A major product principle recovered during the audit is:

> **Any information explicitly entered by the user should eventually be considered potential intelligence input.**

This includes:

* scores
* genres
* media type
* notes/reviews
* previously-consumed status
* future metadata fields
* other explicitly user-entered signals

The existence of a field does **not** mean it must immediately affect scoring.

It means the architecture should avoid treating user-entered information as permanently irrelevant to intelligence.

---

# PREVIOUSLY-CONSUMED MEDIA

## Status: FUTURE FEATURE

Every media record should eventually have a simple binary indicator allowing the user to say:

> **I have consumed this before.**

This should be separate from whether the record is newly being added to the archive.

The user may be recording an item for the first time even though it is not their first time consuming it.

The preferred initial concept is:

```text
previously_consumed = true / false
```

A future `watch_count` / `read_count` / `play_count` style system may be useful, but a mandatory count could create unnecessary bookkeeping.

Potential future intelligence uses include:

* familiarity
* novelty
* rewatch/replay behavior
* comfort-media behavior
* recommendation interpretation
* preference persistence
* distinction between first-exposure reactions and established preferences

Do not invent scoring behavior for this during Phase 1.

---

# REVIEWS / NOTES

## Status: FUTURE FEATURE

The current new-entry `notes` field should eventually become:

> **Review**

The Review remains optional.

The intended evolution is:

```text
OPTIONAL USER REVIEW
↓
STORED WITH MEDIA RECORD
↓
FUTURE TEXTUAL SIGNAL EXTRACTION
↓
TRAITS / OBSERVATIONS / FINDINGS / RECOMMENDATION SIGNALS
```

The review should eventually become intelligence fodder alongside structured user-entered signals.

However:

> **Do not build opaque AI interpretation merely because the field exists.**

First establish the data model and preserve the review as user-authored content.

---

# PHASE 2 — ARCHIVE PROFILE UI

## Status: AFTER PHASE 1

Build the dedicated Profile experience.

Profile should present:

* Primary Designation
* Designation explanation
* Primary Identity
* meaningful Secondary Identities
* Identity Data Sufficiency where appropriate
* Identity contribution breakdown
* Traits
* Genre Signals
* Observations
* Observation evidence
* Findings
* Finding evidence
* Narrative

Analytics remains separate.

Analytics answers:

> **What do the numbers say?**

Profile answers:

> **What does the archive mean?**

Profile UI should consume established intelligence rather than becoming another intelligence engine.

---

# PHASE 3 — REAL RECOMMENDATION ENGINE

## Status: FUTURE

The current Recommendation Engine is infrastructure/stub work.

Conceptually:

```text
generate_recommendations(...)
↓
collect signals
↓
recommendations = [...]
```

The eventual engine should consume measurable archive signals including:

* Trait Strength
* Genre Affinity
* scoring preferences
* universal scoring
* media-specific scoring
* Designation recommendation bias
* soft Observation signals
* soft Finding signals
* future user-input signals where meaningful

Identity should influence recommendations primarily through underlying measurable signals rather than becoming a direct opaque recommendation score.

The Recommendation Engine should eventually explain:

> **Why was this recommended?**

---

# PHASE 4 — RECOMMENDATIONS SURFACE

## Status: FUTURE

After the Recommendation Engine is functional, expose recommendations through a dedicated user-facing surface.

The surface should make recommendation reasoning inspectable rather than presenting recommendations as unexplained outputs.

---

# PHASE 5 — LIBRARY SCALE

## Status: FUTURE

Implement:

* pagination
* stable ordering
* server-side sorting
* server-side filtering where useful
* large-archive testing

Scale improvements should preserve existing intelligence semantics.

---

# PHASE 6 — IMPORT / EXPORT

## Status: FUTURE

Prioritize:

* JSON export
* JSON import
* schema versioning
* validation
* duplicate handling
* migration compatibility
* backup/restore

CSV can remain later.

---

# PHASE 7 — METADATA EXPANSION

## Status: FUTURE

Potential metadata:

* author
* director
* developer
* publisher/studio
* release year
* runtime
* platform
* covers/posters
* ISBN
* external IDs

Metadata should enrich intelligence rather than replace it.

Metadata should not be treated as a substitute for the user's own reactions and preferences.

---

# PHASE 8 — POLISH / ACCESSIBILITY / STABILITY

## Status: FUTURE

Includes:

* Profile polish
* Analytics polish
* Library polish
* Reports polish
* navigation
* forms
* keyboard navigation
* semantic markup
* labels
* contrast
* focus states
* screen-reader testing
* edge cases
* sparse/partial data
* large archives
* documentation

---

# PHASE 9 — RELEASE

## Status: FUTURE

Release requirements include:

* stable test suite
* no known critical bugs
* migration strategy
* backup strategy
* import/export
* documentation
* accessibility review
* deployment plan
* release build
* versioning
* changelog

---

# PHASE 10 — REACT MIGRATION

## Status: FUTURE — DO NOT TOUCH YET

React migration should occur only after:

* intelligence is stable
* Profile is stable
* recommendations work
* library scale works
* import/export works
* the application is genuinely usable

React is an implementation evolution, not an escape from unfinished product work.

---

# THINGS WE MUST NOT ACCIDENTALLY REBUILD

Do not redo:

* scoring
* scoring rubrics
* CRUD
* generated Reports / Lists
* Archive infrastructure
* Observation evidence
* Identity scoring machinery
* Designation machinery
* existing derived-trait machinery

Do not merge:

* Findings with Observations
* Designations with Identity
* Analytics with Profile
* Signal Strength with Data Sufficiency
* Data Sufficiency with Classification Confidence
* Evidence Strength with Signal Strength

Do not make:

* Identity a Designation clone
* Identity a direct recommendation score
* narrative a new intelligence engine
* user reviews an automatic opaque AI authority
* previously-consumed status a mandatory watch/read/play counter

Do not:

* invent arbitrary thresholds
* invent new confidence mathematics merely to fix terminology
* implement unresolved conceptual decisions early
* delete existing behavior merely because the new contract does not mention it explicitly

---

# CARDINALITY RULES

```text
TRAITS
MANY

GENRE SIGNALS
MANY

OBSERVATIONS
MANY

FINDINGS
MANY

DESIGNATIONS
MANY internally
ONE PRIMARY on Profile

IDENTITIES
MANY internally
ONE PRIMARY
ZERO OR MORE meaningful SECONDARIES
```

---

# INTELLIGENCE PRINCIPLES

## 1. Evidence before interpretation

Prefer measurable signals over unsupported conclusions.

## 2. Insufficient evidence is not negative evidence

A sparse archive should not accidentally produce confident negative classifications.

## 3. Preserve behavioral memory

Existing tests and implementations may encode meaningful domain rules even when the conceptual contract does not explicitly mention them.

## 4. Evolution, not rewrite

Working infrastructure should be aligned rather than replaced.

## 5. Explainability matters

Important intelligence outputs should be traceable to underlying signals.

## 6. Parallel perspectives

Observations, Findings, Designations, and Identities are different analytical perspectives over shared data.

## 7. Identity is synthesis

Identity should describe curator philosophy rather than merely repeat taste classifications.

## 8. Recommendations consume signals

Recommendations should use measurable signals rather than bypassing the intelligence layer.

## 9. User input is potential intelligence

Structured and unstructured information supplied by the user should remain available for future analytics and intelligence.

## 10. Don't invent precision

Thresholds, confidence values, tie rules, and classifications should be grounded in repository behavior and actual data distributions.

---

# CURRENT PROJECT PHASE

## Phase 1 — Intelligence Alignment

**Current state: ACTIVE / PRE-CODE ALIGNMENT**

The forensic work is complete.

The conceptual decisions are substantially established.

The remaining work is to close the explicit implementation gates and then make the smallest necessary production changes.

### Currently authorized implementation

* [ ] Identity eligibility gate alignment
* [ ] Regression updates for Identity eligibility
* [ ] Terminology consumer mapping
* [ ] Per-field API/frontend rename plan
* [ ] Designation terminology/explanation alignment
* [ ] Finding documentation/regression protection

### Currently blocked

* [ ] New Identity fixture semantics
* [ ] Elevated Finding implementation
* [ ] Secondary Identity thresholds
* [ ] Final tie/near-tie presentation behavior
* [ ] New Observation rules
* [ ] Archive-state branching
* [ ] Finding confidence field

### Current regression baseline

> **210 passing tests, 0 failures**

### Phase 1 completion condition

Phase 1 is complete when:

1. existing intelligence machinery remains intact except for explicitly approved alignment changes
2. confidence terminology no longer conflates fundamentally different concepts
3. Identity and Designation have distinct conceptual responsibilities
4. ineligible Identities cannot win ranking or primary selection
5. Findings have a defensible boundary from Observations and Genre Signals
6. existing Findings have explicit PRESERVE / ELEVATE / DEFER treatment
7. elevated Findings have documented purposes before implementation
8. the Identity catalog is moving toward durable curator-philosophy concepts
9. archive evidence informs prioritization without becoming Zach-specific hard-coded logic
10. no new intelligence behavior depends on an unresolved conceptual decision
11. every intentional behavioral change has regression coverage
12. the full test suite remains green
13. no unrelated rewrite or redesign enters Phase 1

---

# CURRENT PRIORITY ORDER

1. **Execute Identity eligibility alignment**
2. **Update affected Identity regression tests**
3. **Resolve confidence terminology**
4. **Document the per-field API/frontend rename blast radius**
5. **Align Designation terminology/explanation**
6. **Lock the Phase 1 Identity shortlist and signal definitions**
7. **Clarify elevated Finding purposes**
8. **Define Finding evidence requirements**
9. **Clarify Secondary Identity presentation**
10. **Clarify ranking / tie / near-tie behavior**
11. **Lock the Observation shortlist before adding new rules**
12. **Investigate debug/dead-code test candidates**
13. **Run and preserve regression coverage**
14. **Complete Phase 1**
15. **Build dedicated Archive Profile UI**
16. **Build Recommendation Engine**
17. **Add Recommendations surface**
18. **Library pagination / scale**
19. **Import / Export**
20. **Metadata expansion**
21. **Polish / accessibility / stability / documentation**
22. **Release**
23. **React migration**

---

# EXPLICITLY DEFERRED

The following should remain outside Phase 1 unless a concrete dependency forces them earlier:

* Review/NLP intelligence
* previously-consumed intelligence
* watch/read/play counts
* Recommendation Engine implementation
* recommendation UI
* Archive Profile UI
* pagination
* import/export
* metadata expansion
* large-archive optimization
* React migration
* advanced classification algorithms
* automated semantic interpretation of reviews
* broad AI-based recommendation systems

These are product directions, not Phase 1 alignment requirements.

---

# ONE-SENTENCE PROJECT DIRECTION

> **Media Tracker turns raw media scores and other user-provided signals into measurable traits and genre signals, independently interprets those signals through observations, findings, designations, and curator identities, presents the resulting meaning through an Archive Profile, and eventually uses those measurable signals to recommend what should come next.**
