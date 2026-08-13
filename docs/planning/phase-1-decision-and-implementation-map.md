# Media Tracker — Phase 1 Decision & Implementation Map

**Project:** Media Tracker  
**Authoritative branch:** `develop-3`  
**Phase:** Phase 1 — Intelligence Alignment  
**Status:** Pre-code decision document (integrated post-Audit #1–#3)  

**Related documents:**

- Intelligence Contract v1.md
- phase-1-intelligence-alignment.md
- roadmap.md

**Guiding principle:** Evolution, not rewrite.

---

## 1. Purpose

This document translates the conceptual requirements of **Intelligence Contract v1** into explicit implementation decisions.

It answers:

> What exactly have we decided to preserve, change, clarify, test, or defer before modifying the existing intelligence implementation?

The documents have distinct responsibilities:

- **Intelligence Contract v1** defines what the intelligence system means.
- **Phase 1 Alignment** defines the overall alignment work.
- **This document** defines the specific implementation decisions and gates.
- **Audit #1** establishes what the repository and tests actually do.
- **Audit #2** establishes the conceptual status of existing Findings.
- **Audit #3** establishes what the rated archive actually demonstrates.

This document is therefore the bridge between **conceptual contract** and **code changes**.

Historical candidates and earlier hypotheses may be retained for context, but they do not override decisions explicitly marked **LOCKED**.

---

## 2. Evidence Base

| Source | Role | Authority |
|---|---|---|
| Intelligence Contract v1 | Authoritative conceptual definitions | Highest |
| Audit #1 — Repository & Behavioral Inventory | Repository and behavioral facts | Implementation evidence |
| Audit #2 — Finding-by-Finding Conceptual Audit | Finding-level conceptual analysis | Implementation evidence |
| Audit #3 — Archive Behavioral Analysis | Archive-derived behavioral evidence | Behavioral evidence |

### Important distinction

This document must not confuse three different kinds of statements:

**Contract decisions** tell us what the system should mean.

**Repository facts** tell us what the existing implementation actually does.

**Archive evidence** tells us what the intelligence system should plausibly detect.

A repository fact is not automatically a desired behavior.

An archive pattern is not automatically a finalized rule.

A contract definition is not automatically an implementation algorithm.

---

## 3. Decision Status

This document uses the following status vocabulary.

| Status | Meaning |
|---|---|
| **LOCKED** | The decision is sufficiently defined for dependent implementation to rely on it. |
| **WORKING DIRECTION** | Strong evidence supports the direction, but names, rules, thresholds, or other operational details remain open. |
| **UNRESOLVED** | A decision is still required before dependent implementation can proceed. |
| **DEFERRED** | The issue is intentionally outside Phase 1 and should not be solved during this phase. |
| **FACT** | A verified repository or audit fact; not itself a design decision. |

### Implementation rule

**UNRESOLVED** and **DEFERRED** are not interchangeable.

- **UNRESOLVED** means Phase 1 may still need to solve it.
- **DEFERRED** means Phase 1 intentionally will not solve it.

No implementation may depend on an **UNRESOLVED** decision.

---

## 4. Decision Classifications

Every Phase 1 issue receives a classification.

| Classification | Meaning | Default action |
|---|---|---|
| **TERMINOLOGY** | Existing behavior is conceptually correct, but the name or description is misleading. | Rename/reframe; do not redesign. |
| **PRESERVE** | Existing behavior is compatible with the contract. | Do not modify except for necessary compatibility work. |
| **ALIGNMENT** | Existing behavior directly contradicts a locked conceptual decision. | Make the smallest necessary behavioral change. |
| **CLARIFICATION** | The concept is established, but operational behavior is underspecified. | Define behavior before implementing it. |
| **EVIDENCE** | The intelligence concept is acceptable, but its supporting explanation is insufficient. | Improve explainability without changing classification semantics. |
| **TESTING** | Existing behavior is acceptable but insufficiently protected. | Add regression coverage. |
| **DEFERRED** | The issue is real but belongs to a later phase. | Document it; do not solve it in Phase 1. |

---

## 5. Locked Conceptual Decisions

These meanings come from **Intelligence Contract v1**.

Unless implementation reveals a direct contradiction with the Contract, they should not be reopened.

| Concept | Locked meaning | Cardinality |
|---|---|---|
| Trait | Measurable quality represented in the archive | MANY |
| Genre Signal | Recurring relationship between archive and genres/types | MANY |
| Observation | Directly demonstrable recurring pattern | MANY |
| Finding | Interpretive conclusion suggested by evidence | MANY |
| Designation | Recognizable taste classification | MANY internally |
| Primary Designation | Highest/primary classification presented on Profile | ONE |
| Identity | Broader curator philosophy / synthesis | MANY internally |
| Primary Identity | Most strongly supported curator philosophy | ONE |
| Secondary Identity | Meaningfully relevant additional curator philosophy | ZERO+ |
| Narrative | Human-readable synthesis of established intelligence | ONE / varies |
| Recommendation Signal | Machine-usable preference signal | MANY |

---

## 6. Locked Quantitative Vocabulary

The intelligence system currently uses the word “confidence” for several different concepts.

That terminology must be corrected without inventing unnecessary new mathematics.

| Term | Meaning | Must NOT mean |
|---|---|---|
| Signal Strength | How strongly a quality or signal is expressed | Probability of correctness |
| Data Sufficiency | Whether enough archive data exists to evaluate something reasonably | Classification certainty |
| Classification Confidence | How clearly one classification beats plausible alternatives | Raw classification score |
| Evidence Strength | How strongly available evidence supports a conclusion | Trait strength |

### Decision — LOCKED

Do not create four numerical fields everywhere simply because four concepts exist.

Introduce a distinct field only where the semantic distinction is genuinely required by the API, UI, explanation layer, or decision logic.

### Existing field mappings — LOCKED semantics

| Current field | Actual meaning | Classification | Phase 1 action |
|---|---|---|---|
| Identity `confidence` (`entryCount / minimum_entries`) | **Data Sufficiency** | TERMINOLOGY | Rename/reframe |
| Designation `designationConfidence` (average of trait scores) | **Signal Strength–like** | TERMINOLOGY | Rename/reframe |
| Observation `confidence` (`value / threshold`) | Threshold-relative support strength | TERMINOLOGY / CLARIFICATION | Rename/reframe; clarify semantics |
| Finding confidence | Not standardized | CLARIFICATION | Do not add until semantics are defined |

**LOCKED:** Do not invent a Classification Confidence algorithm merely to justify the word “confidence.”

**DEFERRED:** A generalized Classification Confidence algorithm is outside Phase 1.

---

## 7. Protected Existing Behavior

Unless a direct contract conflict is demonstrated, preserve the following infrastructure and behavior:

- Universal scoring
- Media-specific scoring
- Scoring profiles
- Scoring rubrics
- Entry model
- Archive mapping
- CRUD behavior
- Genre handling
- Observation evidence architecture
- `metric_evidence`
- `genre_evidence`
- Fixture-/rule-driven Designations
- Designation ranking
- Designation primary selection
- Designation recommendation-bias metadata
- Identity scoring machinery
- Identity weighted scoring
- Identity derived-trait machinery
- Identity ranking infrastructure
- Identity contribution breakdown
- Existing narrative architecture
- Existing 199-test baseline behavior, except where an intentional Phase 1 change is explicitly classified as ALIGNMENT or TESTING

### 7.1 Recovered Behavioral Contracts

These behaviors were verified during Audit #1 and should be preserved unless an explicit contract decision says otherwise.

### Trait Signal Strength normalization

```text
value <= 6 → 0
value = 10 → 1
formula: min(max((value - 6) / 4, 0), 1)
```

### Identity Score normalization

```python
normalize_identity_score(value) = max(0, min(value / 10, 1))
```

These two normalizations have different semantics.

**LOCKED:** Do not unify them merely for implementation cleanliness.

### Identity trait resolution priority

```text
universalAverages
       ↓
mediaAverages
       ↓
derived-trait calculation
```

**Classification:** PRESERVE

### Identity scoring model

```text
normalized trait contribution × fixture weight → identity score
```

**Classification:** PRESERVE

### Derived traits currently in code

- `experimental_affinity`
- `genre_diversity`
- `novelty`
- `analysis`
- `ambiguity`
- `reflection`
- `system_design`

Audit facts:

- `novelty` and `experimental_affinity` currently rely on the same experimental-genre percentage signal.
- `genre_diversity = len(genres) × 2` and may exceed 10 before clamping.
- `system_design` currently aliases `gameplay_mechanics`.

These are imperfect implementation facts, not automatic redesign triggers.

**LOCKED:** Do not redesign these mechanisms merely because they are imperfect.

### Other verified protections

- Designations are sorted by score descending.
- Primary Designation is the first ranked candidate.
- Observations are ranked by confidence/support strength.
- Structured Observation evidence is preserved.
- Designations are not emitted as Findings.
- Generalist archives should not strongly match an Identity.
- Empty profiles produce zeros / empty intelligence collections.
- Recommendation-bias metadata is preserved on Designations and Identities.

---

## 8. Repository Implementation Map

The following is a repository fact established by Audit #1.

| Concept | Responsible modules | Notes |
|---|---|---|
| Traits | `trait_calculator.py` | `normalize_trait_signal`; universal + media strengths; genre presence |
| Genre Signals | `genre_intelligence.py`, `genre_signals.py`, `genre_signal_utils.py`, designation affinity helpers | Presence / percentage / affinity |
| Observations | `observation_rules.py`, `observation_engine.py`, `observation_mapper.py`, `observation_utils.py` | 6 existing rules |
| Findings | `finding_rules.py`, `finding_engine.py`, `identity_finding.py` | 5 rules + `identity-profile` special case |
| Designations | `designation_rules.py`, `designation_engine.py`, `designation_mapper.py` | 4 rules |
| Identities | `identity_scorer.py`, `identity_scoring.py`, `identity_engine.py`, `identity_explainer.py`, `identity_confidence.py`, `identity_derived_traits.py`, `fixtures/identities/` | 3 fixtures |
| Narrative | `archive_narrative.py` | Downstream |
| Archive / Profile | `archive_engine.py`, `archive_mapper.py`, `archive_utils.py` | Profile assembly |
| Recommendations | `models/recommendations/*` | Stub only; Phase 3 |
| Frontend | `charts.js` | Current `designationConfidence` consumer; Profile UI not yet built |

**Test baseline — FACT:** 199 tests pass on `develop-3`.

---

# 9. Designations

**Classification:** PRESERVE + TERMINOLOGY + EVIDENCE

## 9.1 Contract — LOCKED

Designation answers:

> What recognizable taste classification fits?

Designations are taste classifications, not curator philosophies.

## 9.2 Existing machinery — PRESERVE

Preserve:

- Rule/fixture-driven definitions
- Multiple internal candidates
- Ranking
- Primary selection
- Recommendation-bias metadata

## 9.3 Current Designations — FACT

| ID | Title |
|---|---|
| `boundary_explorer` | The Boundary Explorer |
| `curator` | The Curator |
| `engagement_architect` | The Engagement Architect |
| `deep_diver` | The Deep Diver |

## 9.4 Phase 1 decisions

- Keep Designation machinery.
- Correct confidence terminology.
- Allow lightweight “why this designation?” evidence.
- Do not clone the Observation evidence schema merely to explain Designations.
- Do not expand Designations into Identity territory.

Per-designation distinctness, trait contribution, genre contribution, and recommendation-bias quality may be audited, but terminology-only changes do not depend on redesigning the Designation catalog.

---

# 10. Identity vs Designation

**Classification:** ALIGNMENT  
**Status:** LOCKED

The two layers answer different questions.

| Layer | Question |
|---|---|
| Designation | What named taste classification fits? |
| Identity | What kind of curator does the archive describe? |

### Forbidden outcome — LOCKED

```text
Designation: Boundary Explorer
Identity: Boundary Explorer
```

An Identity must not simply duplicate a Designation.

## 10.1 Current conflict — FACT

The current Identity fixtures include:

- `boundary_explorer`
- `deep_diver`
- `engagement_architect`

These overlap with Designation IDs/titles.

This is treated as an implementation artifact, not as the intended final conceptual model.

## 10.2 Decision — LOCKED

- Do not delete Identity scoring machinery.
- Do not treat current Identity fixtures as sacred final vocabulary.
- Evolve Identity fixtures toward curator-philosophy concepts.
- Identity names must not simply duplicate Designation names.

---

# 11. Identity Catalog

## 11.1 System-level decision — LOCKED

The Identity subsystem is intended to detect **durable media-engagement / curator-philosophy identities** that could apply to any user's archive.

It is not intended to create personality types specific to one user.

Therefore:

1. Current Identity fixtures are historical implementations, not the final catalog.
2. The catalog must be generic enough to detect in other users' archives.
3. Zach's archive is the first test case, not the definition of the system.
4. The system must not become “Zach's three personality types.”

## 11.2 Archive-supported Identity spine — WORKING DIRECTION

Audit #3 provides strong evidence for the following candidates:

| Candidate | Description | Evidence |
|---|---|---|
| **Structural Curator** | Seeks works where form, rules, or structure are part of the meaning | STRONG |
| **Concept-First Curator** | Prioritizes unusual ideas and conceptual payoff over spectacle or pure craft | STRONG |
| **Engagement-Gated Curator** | Will not fully reward works that fail to hold attention, even when intellectually interesting | MODERATE–STRONG |

These are **WORKING DIRECTION**, not finalized implementation contracts.

## 11.3 Optional / secondary candidates — WORKING DIRECTION

| Candidate | Current assessment |
|---|---|
| Narrative-Systems Curator | May merge into Structural Curator |
| Conditional Atmospherist | Potentially meaningful but appears subset-like rather than primary |
| Emotion-Selective Curator | Potentially explanatory but may be too narrow as an Identity |

## 11.4 Historical candidates — HISTORY ONLY

Earlier candidates:

- Systems-Seeking
- Interpretive
- Boundary-Seeking
- Immersive
- Craft-Conscious
- Reflective

These remain useful historical context but are superseded as the primary Identity spine by Audit #3.

## 11.5 Deliberately excluded direction — LOCKED

The following should not become Identity vocabulary:

- Genre-specific labels such as Horror Curator, Sci-Fi Curator, Experimental Curator
- Designation-clone labels such as Boundary Explorer, Deep Diver, Engagement Architect
- Pure “Systems Architect” as the main Identity

## 11.6 Identity implementation gate — UNRESOLVED

Before implementing new Identity fixture semantics, each accepted Identity must have:

- Purpose
- Primary signals
- Secondary signals
- Explicitly excluded / non-contributing signals
- Minimum data requirements
- Scoring approach
- Contribution / evidence explanation
- Distinction from other Identities
- Distinction from Designations

**Gate:** New Identity fixture semantics must not be implemented until the Phase 1 Identity shortlist and per-Identity signal definitions are accepted.

Machinery-only work that does not depend on final Identity names—such as the eligibility gate—may proceed independently.

---

# 12. Identity Minimum-Entry Behavior

**Classification:** ALIGNMENT  
**Status:** LOCKED

`minimum_entries` is an **eligibility gate**, not merely a score gate.

An Identity that does not meet its minimum data requirement is ineligible for ranking and presentation.

## 12.1 Required behavior — LOCKED

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
score + rank + contribution breakdown
```

## 12.2 Current code conflict — FACT

Audit #1 found that the current implementation:

- zeros the score,
- empties the contribution breakdown,
- but retains the Identity in ranked results.

As a result, `get_primary_identity()` can select a zero-scored Identity.

That behavior contradicts the locked eligibility decision.

## 12.3 Phase 1 action — ALIGNMENT

Change the scorer/engine behavior so that ineligible Identities are excluded before ranking.

Update all affected tests.

Data Sufficiency may still be exposed independently for eligible identities.

---

# 13. Primary and Secondary Identities

## 13.1 Primary Identity — LOCKED

The conceptual shape is:

```text
MANY eligible candidates
        ↓
deterministic ranking
        ↓
ONE PRIMARY
```

Primary selection remains existing machinery plus the eligibility correction.

**Classification:** PRESERVE + TESTING

Required verification:

- deterministic ranking after eligibility filtering
- stable tie behavior once tie policy is defined
- explainability through contribution breakdown

## 13.2 Secondary Identities — principle LOCKED, numbers UNRESOLVED

Secondary Identities may be zero or more, but they must be **meaningful**.

The following is explicitly rejected:

```text
score > 0
     ↓
display secondary
```

Secondary selection must consider:

- eligibility / Data Sufficiency
- meaningful signal strength
- relevance to the primary Identity
- separation from weak candidates

**Gate:** Numeric thresholds must not be invented until Identity score distributions under the accepted catalog have been inspected.

---

# 14. Ties and Close Competitors

**Classification:** CLARIFICATION  
**Status:** UNRESOLVED

The system must distinguish:

- exact ties
- meaningful near-ties
- strong-vs-weak differences

For example:

```text
91 vs 90
```

is conceptually different from:

```text
91 vs 62
```

## 14.1 Required policy

The final policy must define:

- deterministic exact-tie behavior
- stable secondary sort key where necessary
- what qualifies as a meaningful near-tie
- whether close competitors are displayed
- whether close competitors can affect Primary selection
- whether the policy applies to Designations, Identities, or both

**Gate:** Do not claim a finalized tie/near-tie presentation policy in code until this policy is LOCKED in this document.

---

# 15. Findings vs Observations

**Classification:** ALIGNMENT + CLARIFICATION + TESTING

## 15.1 Distinction — LOCKED

| Layer | Question |
|---|---|
| Observation | What can we directly demonstrate? |
| Finding | What does the evidence suggest? |

## 15.2 Finding boundary rule — LOCKED

> A Finding states a conclusion that is not fully present in any single Observation, Trait, or Genre Signal.

A metric threshold may support a Finding.

A metric threshold must not itself be the Finding.

## 15.3 Operational test — LOCKED

> If the Finding were removed and replaced by its underlying Observation or raw signal, would meaningful information be lost?

If the answer is **no**, the item is functioning as an Observation or Genre Signal rather than a Finding.

## 15.4 Allowed Findings

- Multi-signal synthesis
- Interpretive conclusions from multiple Traits / Genre Signals / Observations
- Single-signal Findings only where they add a genuine interpretive frame not carried by the underlying Observation
- Structured evidence explaining why the conclusion follows

## 15.5 Disallowed final state

Do not leave Findings that are merely:

- an Observation under a different title
- a restated Genre Signal percentage
- a duplicate evaluate condition with a different ID
- a second badge layer for Designations

---

# 16. Existing Finding Rules

**Status:** LOCKED classifications from Audit #2

| Finding | Decision | Reason | Phase 1 action |
|---|---|---|---|
| `concept-driven` | **PRESERVE** | Originality ≥ 8 and depth ≥ 8 provides synthesis beyond a single Observation | Preserve dual-threshold behavior; improve evidence/prose if needed |
| `engagement-priority` | **ELEVATE** | Useful concept but currently Observation-thin | Define interpretive purpose beyond engagement ≥ 9; add tests |
| `systems-preference` | **ELEVATE** | Potentially useful concept; currently close to systems-affinity | Define distinction without fake rewording |
| `speculative-interest` | **ELEVATE** | Borderline Genre Signal / Observation | Define interpretive role and boundary |
| `atmospheric-interest` | **DEFER** | Current evaluation and description substantially overlap atmospheric-focus | Document overlap; do not manufacture a distinction |

### Identity Finding

`identity-profile` is a protected special case and is outside the five-rule table above.

## 16.1 Constraints — LOCKED

- No mass deletion of Findings.
- Do not rewrite a Finding merely to make it sound different.
- Any distinction must be demonstrated.
- Phase 1 changes remain targeted.

## 16.2 Elevated Finding purposes — UNRESOLVED

Before code changes to the ELEVATE Findings, each must have a short written purpose statement answering:

> What interpretive conclusion does this Finding add that the underlying Observation / Trait / Genre Signal does not already communicate?

**Gate:** Do not implement Finding elevation until those purpose statements are accepted.

---

# 17. Finding Evidence and Confidence

## 17.1 Evidence — LOCKED minimum

Findings require explainable support.

The evidence schema does not need to be identical to Observation evidence.

Potential evidence sources include:

- Observations
- Traits
- Genre Signals
- Metrics
- Other explicit signals

Minimum requirement:

> A user should be able to understand why the system thinks the Finding applies.

## 17.2 Finding confidence — UNRESOLVED

There is no standardized Finding confidence field.

Do not add one until its semantics can be mapped cleanly to:

- Signal Strength
- Data Sufficiency
- Evidence Strength
- Classification Confidence

**Gate:** No new Finding confidence field until its meaning is explicitly defined.

---

# 18. Archive Behavioral Ground Truth

Audit #3 analyzed the actual rated archive across games, movies, and books.

This evidence is used to determine what the intelligence system should plausibly detect.

It must **not** be converted directly into Zach-specific hard-coded rules.

## 18.1 Center of gravity — WORKING DIRECTION

Evidence strongly supports:

> Conceptual and structural ambition under high engagement is rewarded more consistently than polish, spectacle, or mechanics-in-isolation.

## 18.2 Strong cross-media patterns

| Pattern | Evidence |
|---|---|
| High concept/originality + thought-provoking/depth among top works | STRONG |
| Mind-bending / psychological / speculative structure rather than mere genre membership | STRONG |
| Engagement near-required for top-tier scores | STRONG |
| Visual novel / puzzle-narrative dominance in game top tier | STRONG |
| Emotion often near-floor on pure platformers | STRONG, medium-specific |
| Spectacle without conceptual weight scores poorly | STRONG |
| Atmosphere can elevate a work but is not required for top-tier scores | MODERATE |
| Systems/mechanics excellence alone drives top-tier scores | WEAK–MODERATE |

## 18.3 Negative evidence

The following should **not** be modeled as primary preferences based on the current archive:

- universal high-emotion preference
- atmosphere as the primary driver of top scores
- systems/mechanics as the defining curator identity
- “likes horror” as a sufficient explanation
- “likes sci-fi” as a sufficient explanation
- production value as a primary predictor of enjoyment
- replayability as a core cross-media trait
- genre frequency as equivalent to preference
- single-metric Findings as the primary interpretive layer

## 18.4 Phase 1 implications — LOCKED guidance

Prefer investigation of:

- concept density
- engagement as a gate
- structural/speculative ambition
- concept-over-spectacle behavior
- medium-specific emotion behavior

Deprioritize as central Identity/Finding concepts:

- systems-preference
- atmospheric-interest
- pure sci-fi percentage
- Designation-clone Identity names

---

# 19. Observation Catalog

**Status:** WORKING DIRECTION

## 19.1 Direction — LOCKED

Phase 1 does not require completion of the entire Observation catalog.

The goal is to establish coherent boundaries and prevent silent duplication between Observation and Finding.

Existing Observation machinery remains PRESERVE unless a specific ALIGNMENT decision says otherwise.

## 19.2 Promising archive-supported candidates

| Candidate | Strength | Notes |
|---|---|---|
| `concept-density` | STRONG | High concept/originality concentration |
| `engagement-floor` | STRONG | Top-tier works rarely have weak engagement |
| `speculative-structure` | STRONG | Structural + genre signal; not pure genre percentage |
| `vn-narrative-reward` | STRONG | Games-specific |
| `emotion-optional-platformer` | STRONG | Medium-specific descriptive behavior |
| `spectacle-penalty` | STRONG | Small negative sample; requires caution |
| `triad-coherence` | STRONG | Movie-specific |
| `atmosphere-present-not-required` | MODERATE | High false-positive / overweighting risk |
| `writing-tracks-total` | MODERATE–STRONG | Movies / Books |

## 19.3 Not recommended as primary Observations yet

- Archive-wide systems affinity
- Archive-wide atmospheric focus

These may be useful signals, but current evidence does not justify treating them as defining archive-wide patterns.

## 19.4 Before locking any new Observation

Examine:

- redundancy with existing Observations
- medium-specific vs cross-media behavior
- Observation vs Finding ownership
- evidence strength
- false-positive risk
- whether the rule provides information not already represented elsewhere

**Gate:** No new Observation rule is implemented until the Phase 1 Observation shortlist is explicitly accepted.

---

# 20. Archive-Supported Finding Candidates

**Status:** WORKING DIRECTION  
**Scope:** Future elevation candidates; not an instruction to implement new Finding IDs during Phase 1.

| Candidate | Strength | Role |
|---|---|---|
| Structural Ambition | STRONG | Form/structure as meaning |
| Concept Over Spectacle | STRONG | Conceptual ambition vs scale/polish |
| Narrative–Systems Hybrid | MODERATE–STRONG | Story and structure reinforce each other |
| Selective Emotion | MODERATE | Emotion is medium/form dependent |
| Engagement as Gate | MODERATE | Useful only when framed relative to other dimensions |

Phase 1 priority remains the existing Finding table in §16.

New Finding IDs are not required to close Phase 1.

---

# 21. Archive States

**Classification:** CLARIFICATION

## 21.1 Conceptual states — LOCKED

- `EMPTY`
- `SPARSE`
- `ESTABLISHED`

## 21.2 Operational behavior — UNRESOLVED

Still to define:

- numeric thresholds per state
- whether thresholds differ by subsystem
- interaction with Identity eligibility
- Observation minimum evidence
- Designation-specific data requirements

## 21.3 Principle — LOCKED

> Insufficient data should produce insufficient evidence, not false certainty.

**Gate:** No code should branch on the semantic state labels until operational thresholds are LOCKED.

---

# 22. Narrative

**Classification:** PRESERVE + TESTING  
**Status:** LOCKED role

Narrative is downstream of established intelligence.

Narrative may:

- synthesize
- translate
- contextualize
- summarize

Narrative may not:

- invent evidence
- invent classifications
- invent traits
- invent Findings
- imply unsupported certainty

Narrative should therefore consume intelligence rather than become another intelligence engine.

---

# 23. Recommendation Signals

**Status:** DEFERRED — Phase 3

Do not implement recommendation weighting during Phase 1.

Potential future recommendation signals include:

**Hard / measurable:**

- Trait Strength
- Genre Affinity
- Scoring Preferences

**Soft / interpretive:**

- Observations
- Findings
- Identity, indirectly

Identity must not become an opaque recommendation score.

Preserve existing recommendation-bias metadata on Designations and Identities.

---

# 24. Analytics vs Profile

**Status:** LOCKED

The two surfaces answer different questions.

| Surface | Question |
|---|---|
| Analytics | What do the numbers say? |
| Profile | What does the archive mean? |

Profile intelligence should not simply be pushed back into Analytics.

Profile UI is Phase 2 and therefore outside Phase 1 implementation.

---

# 25. API / Frontend Compatibility

**Classification:** CLARIFICATION  
**Status:** Process LOCKED; per-field plan UNRESOLVED

Every terminology or field change must account for the complete blast radius:

- backend model
- calculation layer
- API response
- serialization
- frontend consumers
- `charts.js`
- future Profile UI
- tests
- narrative consumers
- fixtures

### Rule

No field rename is considered complete merely because the backend has been renamed.

Each rename must have an explicit compatibility checklist.

**Gate:** The per-field API/frontend rename plan must be documented before executing the terminology pass.

No React migration occurs during Phase 1.

---

# 26. Change Matrix

The Change Matrix is the operational summary of this document.

| Issue | Classification | Status | Current behavior / fact | Required behavior | Implementation gate |
|---|---|---|---|---|---|
| Confidence terminology | TERMINOLOGY | LOCKED semantics | Multiple meanings under “confidence” | Map to Signal Strength / Data Sufficiency / Evidence Strength as appropriate | Per-field rename map |
| Designation semantics | PRESERVE + TERMINOLOGY + EVIDENCE | LOCKED direction | Rule/fixture-driven, ranked | Preserve machinery; correct terminology; optional light evidence | None for terminology-only work |
| Identity vs Designation | ALIGNMENT | LOCKED | Shared names in current fixtures | Curator philosophy must not duplicate Designations | None |
| Identity catalog | ALIGNMENT | WORKING DIRECTION | 3 designation-like fixtures | Evolve toward accepted curator-philosophy catalog | Final shortlist + signal definitions |
| Identity minimum-entry | ALIGNMENT | LOCKED | Score gate; zero-scored identities remain selectable | Eligibility gate; exclude ineligible identities before ranking | None |
| Primary Identity | PRESERVE + TESTING | LOCKED shape | `results[0]` after current ranking | First eligible candidate after deterministic ranking | Eligibility change |
| Secondary Identity | CLARIFICATION | Principle LOCKED; thresholds UNRESOLVED | No defined policy | Meaningful secondaries only | Distribution inspection + thresholds |
| Tie / near-tie | CLARIFICATION | UNRESOLVED | Stable sort exists but no conceptual policy | Explicit deterministic and presentation policy | Policy text |
| Finding boundary | ALIGNMENT + CLARIFICATION | LOCKED | Some Findings overlap Observation semantics | Enforce Observation vs Finding boundary | Existing + new regression tests |
| Finding table | ALIGNMENT | LOCKED classifications | Existing 5-rule catalog | PRESERVE / ELEVATE / DEFER as tabled | None for preserve/defer |
| Elevated Finding purposes | CLARIFICATION | UNRESOLVED | Interpretive framing is thin | Written purpose statement per elevated Finding | Purpose statements |
| Finding evidence | EVIDENCE | LOCKED minimum | Existing lighter evidence | Explainable “why” support | Schema decision per Finding |
| Finding confidence | TERMINOLOGY / CLARIFICATION | UNRESOLVED | No standardized field | Define semantics before adding field | Semantic decision |
| Observation catalog | CLARIFICATION | WORKING DIRECTION | 6 existing rules | Shortlist before new rules; preserve existing machinery | Accepted shortlist |
| Archive states | CLARIFICATION | Concept LOCKED; thresholds UNRESOLVED | Empty/min-entry behavior only | Operational EMPTY/SPARSE/ESTABLISHED semantics | Threshold policy |
| Narrative | PRESERVE + TESTING | LOCKED | Downstream templates | Keep downstream-only | Regression tests |
| Recommendations | DEFERRED | DEFERRED | Stub | Phase 3 | None |
| Profile UI | DEFERRED | DEFERRED | Not built | Phase 2 | None |
| Classification Confidence algorithm | DEFERRED | DEFERRED | Absent | Do not implement in Phase 1 | None |
| Trait/Identity normalization unification | PRESERVE | LOCKED | Two different normalizations | Keep separate | None |
| API/frontend terminology rename | TERMINOLOGY | UNRESOLVED per field | Current consumers use old names | Rename with complete blast-radius mapping | Rename plan |

---

# 27. Pre-Code Gate

Implementation begins only when the decision being implemented is **LOCKED** and its dependent decisions are also LOCKED.

## 27.1 Repository facts — COMPLETE

- [x] `develop-3` tree inspected
- [x] Intelligence modules mapped
- [x] API/profile assembly mapped
- [x] Frontend consumers mapped
- [x] Tests mapped
- [x] 199-test baseline verified
- [x] Recovered behavioral contracts identified

## 27.2 Locked decisions — COMPLETE

- [x] Confidence semantic vocabulary established
- [x] Identity ≠ Designation
- [x] Identity minimum-entry = eligibility gate
- [x] Primary Identity = one from eligible ranked candidates
- [x] Secondary Identity = meaningful-only principle
- [x] Finding boundary rule
- [x] Finding operational boundary test
- [x] Finding PRESERVE / ELEVATE / DEFER classifications
- [x] Trait and Identity normalizations remain separate
- [x] Narrative is downstream-only
- [x] Recommendation work deferred
- [x] Identity catalog must be generic and must not clone Designations

## 27.3 Explicit implementation gates — UNRESOLVED

- [ ] Final Phase 1 Identity shortlist
- [ ] Per-Identity signal definitions
- [ ] Secondary Identity numeric thresholds
- [ ] Tie / close-competitor policy
- [ ] Written purpose statements for each ELEVATE Finding
- [ ] Finding evidence model for elevated Findings
- [ ] Finding confidence semantics, if a field will be added
- [ ] Phase 1 Observation shortlist, if new rules will be added
- [ ] Archive-state operational thresholds, if state labels will affect code
- [ ] Per-field API/frontend rename plan

## 27.4 Merge requirements — LOCKED process

Before any Phase 1 change is merged:

- [ ] Change is explicitly classified
- [ ] Change has a documented reason tied to Contract and/or audit evidence
- [ ] Affected modules are identified
- [ ] Affected API/frontend consumers are identified
- [ ] Tests are planned
- [ ] Existing regression behavior is understood
- [ ] Full suite passes
- [ ] New/changed behavior has regression coverage
- [ ] No unrelated redesign has been introduced
- [ ] No gated semantic decision was implemented early

---

# 28. Phase 1 Work Order

The work order is dependency-aware.

A step may proceed only if its required decisions are LOCKED.

## 1. Terminology pass

**Allowed:** Yes, subject to per-field rename mapping.

Correct confidence terminology without changing underlying algorithms.

Required work:

- map current field semantics
- identify API/frontend consumers
- rename where appropriate
- preserve behavior
- update tests and serialization

## 2. Identity eligibility gate

**Allowed:** Yes.

This is already LOCKED.

Change the current score-gate behavior to an eligibility gate.

Update affected tests.

## 3. Finding documentation and regression coverage

**Allowed:** Yes.

- Preserve `concept-driven`
- Document `atmospheric-interest` as deferred
- Protect existing boundaries
- Add tests where behavior is insufficiently protected

No mass deletion.

## 4. Elevated Findings

**Blocked until purpose statements are LOCKED.**

For each elevated Finding:

- define interpretive purpose
- define evidence relationship
- demonstrate distinction from Observation / Genre Signal
- add dedicated tests

## 5. Identity catalog evolution

**Blocked until Identity shortlist and signal definitions are LOCKED.**

Machinery-only preparation may proceed.

Do not invent final fixture semantics prematurely.

## 6. Secondary Identity policy

**Blocked until score distributions are inspected.**

Define:

- meaningfulness
- threshold behavior
- relationship to Primary
- minimum separation from weak candidates

## 7. Tie / close-competitor policy

**Blocked until policy is written and LOCKED.**

Apply consistently wherever ranking/presentation requires it.

## 8. Observation changes

**Blocked until the Phase 1 Observation shortlist is LOCKED.**

Existing Observation machinery remains protected.

## 9. Archive-state implementation

**Blocked until operational thresholds are LOCKED.**

Do not add state-dependent branching based on undefined thresholds.

## 10. Regression

Run the full suite after each intentional behavior change.

Baseline:

**199 tests passing before Phase 1 implementation.**

Final Phase 1 expectation:

**199 baseline behaviors preserved except for explicitly approved changes, plus regression coverage for every intentional change.**

---

# 29. Explicit Non-Goals

Phase 1 does **not** include:

- Rewriting scoring rubrics
- Rewriting CRUD
- Replacing the Entry model
- Replacing archive mapping
- Recommendation Engine implementation
- Profile UI
- React migration
- Mass deletion of Findings
- Mass deletion of Identities
- Inventing Classification Confidence mathematics for its own sake
- Unifying Trait and Identity normalization
- Designing Identities that only describe Zach
- Treating genre frequency as preference
- Treating a single metric as sufficient interpretive evidence
- Implementing new Observation rules before the shortlist is accepted
- Implementing elevated Findings before their purposes are defined
- Implementing Secondary Identity thresholds before score distributions are inspected
- Implementing Archive State branching before operational thresholds are defined
- Preserving Designation/Identity name collisions as the intended final state
- Solving systems-vs-atmosphere ownership through artificial rewording
- Rewriting working infrastructure merely because its current implementation is imperfect

---

# 30. Phase 1 Success Criteria

Phase 1 is successful when:

1. Existing intelligence machinery remains intact unless a specific contract conflict requires change.
2. Confidence terminology no longer conflates fundamentally different concepts.
3. Identity and Designation have distinct conceptual responsibilities.
4. Ineligible Identities cannot win ranking or primary selection.
5. Findings have a defensible boundary from Observations and Genre Signals.
6. Existing Findings have explicit PRESERVE / ELEVATE / DEFER treatment.
7. Elevated Findings have documented interpretive purposes before implementation.
8. The Identity catalog is moving toward durable curator-philosophy concepts rather than user-specific personality labels.
9. Archive evidence informs prioritization without becoming Zach-specific hard-coded logic.
10. No new intelligence behavior depends on an unresolved conceptual decision.
11. Every intentional behavioral change has regression coverage.
12. The full test suite remains green.
13. No unrelated rewrite or redesign has entered Phase 1.

---

# 31. One-Sentence Phase 1 North Star

> Align the existing deterministic intelligence machinery so Observations demonstrate patterns, Findings interpret combinations, Designations classify taste, and Identities describe curator philosophy—using repository facts and archive behavioral evidence as ground truth, without rewriting working infrastructure.