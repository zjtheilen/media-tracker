# Media Tracker — Intelligence Forensic Audit

**Branch:** `develop-3`
**Purpose:** Behavioral reconstruction before Phase 1 alignment
**Status:** Forensic audit / evidence-gathering
**Authority:** Current repository behavior and tests
**Conceptual references:** `intelligence-contract.md`, `phase-1-intelligence-alignment.md`

---

## 1. Executive Summary

This audit reconstructs what the current `develop-3` repository actually considers important in its intelligence layer before Phase 1 changes are made.

The guiding principle is:

> **Evolution, not rewrite.**

The current intelligence system is best understood as a **hub-and-spoke system over archive-level statistics**, rather than a strict intelligence pipeline.

The central flow is approximately:

```text
entries
  ↓
archive statistics
  ├── traits
  ├── genre intelligence / metrics
  ├── designations
  ├── identities
  ├── observations
  ├── findings
  └── narrative
```

These subsystems generally operate as **siblings over shared profile statistics**.

In particular:

* Observations do not feed Findings.
* Findings do not feed Designations.
* Designations do not determine Identity scores.
* Stored trait `*_strength` fields are not the primary inputs to the Designation or Identity engines.
* Recommendation bias exists as metadata but the Recommendation Engine is currently a stub.
* A historical `interpretation_engine` remains tested but is not wired into `build_archive_profile`.

The repository therefore contains substantial evidence of **iterative evolution and residual behavior**.

### Strongly established behavioral distinctions

The following are genuine pieces of current behavior and should not be removed merely because they are absent or differently described in the new contract:

* archive-level statistical aggregation
* designation scoring and ranking
* identity weighted scoring
* identity contribution breakdowns
* identity minimum-entry eligibility
* structured observation evidence
* structured finding evidence
* narrative synthesis
* unique Observation rules such as emotional resonance and craft appreciation
* unique Finding rules such as engagement priority
* genre affinity and genre-combination intelligence
* classification-basis metadata
* deterministic ranking behavior

### Strong duplicate candidates

Two Observation/Finding pairs appear to encode effectively the same behavioral rule:

1. `systems-affinity` ↔ `systems-preference`
2. `atmospheric-focus` ↔ `atmospheric-interest`

These should be investigated as duplicate behavior, but the audit does **not** establish which side should survive or whether either should be removed.

### Most important terminology finding

The repository uses several fields named `confidence` or `strength` for materially different calculations.

The clearest semantic conflict is:

> `designationConfidence` is presented in the UI as **Classification Confidence**, but its calculation is the mean of three top-trait scores and does not measure how clearly one designation beats alternatives.

The repository does **not** currently implement the Contract's stronger concept of Classification Confidence as a measure of comparative classification certainty.

This should not be solved by simply renaming `designationConfidence`.

### Overall conclusion

The current system contains both:

* **meaningful intelligence that must be preserved**, and
* **evolution residue that should be investigated before Phase 1 changes begin**.

The safest immediate work is therefore to document the mapping between the current implementation and the conceptual contract, then make explicit Phase 1 decisions only where repository evidence supports them.

---

# 2. Preserved Behavior

The following behavior is established by current implementation and/or tests and should be treated as existing behavioral memory.

## 2.1 Archive statistics are the foundation

The archive layer aggregates entry-level information into:

* universal averages
* media-specific averages
* genre distribution
* media distribution
* entry count
* average score
* highest/lowest entries
* top universal traits
* top media traits

This is the factual foundation consumed by most intelligence subsystems.

Removing this layer would remove the measurable basis for archive-level intelligence.

**Classification:** PRESERVE

---

## 2.2 Designation scoring is a genuine classification mechanism

Designation rules calculate candidate scores, generally on a 0–100 scale.

Designation evaluation:

1. evaluates all designation rules
2. produces candidate scores
3. sorts candidates by score
4. selects the highest-scoring designation as `primaryDesignation`

The score therefore has genuine ranking semantics.

It is not interchangeable with `designationConfidence`.

**Classification:** PRESERVE

---

## 2.3 Identity scoring is a separate weighted-fit system

Identity scoring uses:

* fixture weights
* minimum-entry requirements
* universal/media averages
* derived traits
* normalized contribution values

It produces:

* identity score
* contribution breakdown
* top traits
* eligible identity list
* primary identity

Identity scoring is materially different from Designation scoring even where identity and designation names overlap.

**Classification:** PRESERVE

---

## 2.4 Identity eligibility is distinct from Identity confidence

Current Identity behavior has two related but separate mechanisms:

```text
minimum-entry gate
        ↓
eligible / omitted

identity confidence
        ↓
entryCount / minimum_entries
```

An identity below its minimum requirement is omitted rather than retained as a zero-score candidate.

The confidence calculation is metadata and does not participate in ranking.

**Classification:** PRESERVE / CLARIFY

---

## 2.5 Identity breakdown is meaningful explanation infrastructure

Identity scoring retains contribution information showing how individual signals contributed to the weighted score.

This is more than a duplicate copy of the final identity score.

If breakdown disappeared, the score could remain but its explanation would be lost.

**Classification:** EVIDENCE / PRESERVE

---

## 2.6 Observations provide structured archive interpretations

Observation objects contain more than their triggering facts.

They can include:

* ID
* title
* description
* evidence
* confidence
* traits
* genres
* related designations

Observation evaluation also sorts fired observations by confidence.

Therefore the Observation layer provides:

* curated interpretation
* structured evidence
* deterministic ordering
* links to related designation concepts
* narrative input

The underlying metrics would remain if Observations disappeared, but the packaged interpretation would not.

**Classification:** PRESERVE

---

## 2.7 Findings provide a separate set of interpretations

Findings independently evaluate profile statistics and produce:

* finding ID
* category
* title
* description
* evidence

The Identity Profile finding additionally connects Identity output to the Findings collection.

Findings are therefore not universally redundant with Observations.

**Classification:** PRESERVE

---

## 2.8 Unique Observation behavior must not be lost

The current Observation collection contains behavior for which no equivalent Finding exists.

Examples:

* `emotional-resonance`
* `craft-appreciation`

The absence of corresponding Finding rules is evidence that these are not simply duplicate presentation layers.

**Classification:** PRESERVE

---

## 2.9 Unique Finding behavior must not be lost

`engagement-priority` has no corresponding Observation predicate.

Therefore a blanket rule such as “Findings replace Observations” would lose behavior.

**Classification:** PRESERVE

---

## 2.10 Evidence packaging is meaningful

Evidence mechanisms include:

* metric evidence
* genre evidence
* identity breakdowns
* identity-finding evidence
* narrative explanations

Evidence is not a separate engine. It is a packaging mechanism attached to intelligence outputs.

The contract does not require one universal evidence schema.

**Classification:** EVIDENCE / PRESERVE

---

# 3. Contract Conflicts

## 3.1 `designationConfidence` vs Classification Confidence

Current calculation:

```text
mean(
    topUniversal[0].score,
    topUniversal[1].score,
    topMedia[0].score
)
```

rounded to one decimal.

It is:

* independent of designation ranking
* independent of primary designation selection
* not a margin between designation candidates
* not a probability
* not a comparison against plausible alternatives

The UI nevertheless presents it under:

> **Classification Confidence**

This conflicts with the Contract's defined meaning of Classification Confidence.

**Classification:** ALIGN

However:

> Do not replace the calculation merely to make the name correct.

The smallest correction is terminology/documentation unless a later Phase 1 decision explicitly defines a new Classification Confidence calculation.

---

## 3.2 Identity `confidence`

Current calculation:

```text
entryCount / minimum_entries
```

capped at 1, with `minimum_entries == 0` producing 1.

This is best described as **sample-size progress toward an identity's minimum data requirement**.

It does not rank identities.

It does not measure comparative classification certainty.

It does not determine the winner.

The term `confidence` is therefore broader than the calculation.

**Classification:** CLARIFY

Do not claim that this field represents the entirety of the archive's Data Sufficiency system, because eligibility is separately enforced through the minimum-entry gate.

---

## 3.3 Observation `confidence`

Current calculation:

```text
value / threshold
```

rounded to two decimals and capped at 1.

It is used to order fired observations.

It does not aggregate the complete evidence list.

Therefore it should not automatically be equated with the Contract's full concept of Evidence Strength.

**Classification:** CLARIFY

Safe description:

> Threshold-relative support for the rule's primary metric, used for observation ordering.

---

## 3.4 Finding confidence

No Finding confidence field is currently produced or consumed.

There is insufficient repository evidence to design or rename such a concept.

**Classification:** DEFER

---

## 3.5 Classification Confidence is not implemented

Designation scores do provide ranking:

```text
primary score > secondary score > ...
```

But the repository does not calculate a comparative confidence measure such as:

```text
primary score - runner-up score
```

or an equivalent normalized/probabilistic measure.

Therefore:

> Designation `score` is not Classification Confidence.

**Classification:** DEFER

Do not create Classification Confidence by renaming an existing field.

---

# 4. Hidden Contracts

## 4.1 `designationConfidence` is a first-party API field

`GET /archive-profile` returns the profile dictionary directly.

`designationConfidence` is:

* produced by the backend
* serialized into the profile
* consumed by `charts.js`
* asserted by tests

Therefore it is part of the in-repository HTTP response contract.

External consumers cannot be established from the repository.

**Classification:** CLARIFY

---

## 4.2 `designationConfidenceLabel` has split ownership

Backend:

```text
Very High
High
Moderate
Emerging
Tentative
```

Frontend:

```text
High
Moderate
Low
```

The frontend does not consume the serialized backend label; it recomputes its own.

This creates a hidden presentation contract mismatch.

**Classification:** ALIGN / CLARIFY

---

## 4.3 Observation ordering is behavioral

Observation confidence is not merely metadata.

`observation_engine.evaluate_observations` sorts emitted observations by confidence.

Therefore changing the confidence calculation can change visible ordering even if the Observation predicates themselves remain unchanged.

**Classification:** PRESERVE / EVIDENCE

---

## 4.4 Identity minimum-entry behavior

The current implementation omits identities below minimum requirements.

Tests also contain an older-shaped empty-profile test whose assertion can pass vacuously because the evaluated identity dictionary is empty.

This suggests an evolution from an earlier zero-score mechanism toward explicit eligibility.

**Classification:** CLARIFY / POSSIBLE DEAD CODE

Do not alter the eligibility behavior during terminology cleanup.

---

## 4.5 Trait strength fields are published but bypassed by engines

`calculate_archive_traits` produces stored `*_strength` values using floor-at-6 normalization.

However:

* Designation rules use their own `designation_utils.trait_strength(raw_average)`
* Identity scoring uses raw averages and derived traits
* Observations/Findings do not consume stored trait strengths
* Frontend does not directly consume them

The stored Trait Strength map is therefore a published transform rather than the central scoring substrate.

**Classification:** CLARIFY / PRESERVE

---

# 5. Potentially Lost Behavior

The following behavior could be accidentally lost by an overly aggressive Contract-alignment pass.

## 5.1 Trait 6-floor normalization

Stored trait strengths encode:

```text
score <= 6 → 0
score = 10 → 1
```

This is explicitly tested.

Even though live engines bypass these stored values, the API/test contract currently preserves this normalization.

**Status:** PRESERVE unless deliberately deprecated.

---

## 5.2 Genre intelligence

Current genre intelligence includes:

* genre affinity
* genre combinations
* genre diversity
* genre presence signals

These feed multiple systems.

Removing genre intelligence would affect designation rules and identity-derived traits.

**Status:** PRESERVE.

---

## 5.3 Multiple genre-diversity encodings

The repository contains several distinct calculations:

```text
genreDiversityScore
genre_diversity identity-derived trait
genre presence signals
```

### Phase 1 decision

`genreDiversityScore` remains a profile-level metric used by the Designation system, specifically as the Curator's genre-breadth component. It is intentionally distinct from the Identity-derived `genre_diversity` trait.

The Genre Intelligence layer does not replace this metric. `genreAffinity` and `genreCombinations` remain additional profile-level genre signals and are produced alongside `genreDiversityScore`.

`_build_metrics()` therefore serves as an aggregation stage for both profile metrics and Genre Intelligence outputs.

These are not automatically equivalent.

The formulas differ.

**Status:** CLARIFY rather than unify automatically.

---

## 5.4 Observation-only interpretations

Several Observations have no Finding counterpart.

Removing the Observation collection globally would therefore remove unique behavioral signals.

**Status:** PRESERVE.

---

## 5.5 Finding-only interpretations

Several Findings have no Observation counterpart.

Removing Findings globally would lose these signals.

**Status:** PRESERVE.

---

## 5.6 Identity Profile finding

The identity-profile Finding connects Identity explanation to the Findings list.

This relationship would be lost if Findings were treated as merely duplicate Observations.

**Status:** PRESERVE.

---

# 6. Identity / Designation Separation

Identity and Designation are conceptually overlapping in vocabulary but operationally different.

## 6.1 Designation

Current behavior:

* rule-specific scoring
* 0–100 scale
* all candidates evaluated
* candidates sorted by score
* highest score becomes primary
* static traits/genres/recommendation bias metadata

Designation score is a classification-fit/ranking mechanism.

---

## 6.2 Identity

Current behavior:

* fixture-based weighted scoring
* minimum-entry eligibility
* universal/media averages
* derived traits
* weighted contribution breakdown
* top traits
* ranked eligible identities
* primary identity
* confidence metadata
* identity finding bridge

Identity therefore contains more scoring machinery and explanation infrastructure.

---

## 6.3 Shared vocabulary

Three identity fixtures share names with Designations:

* `boundary_explorer`
* `deep_diver`
* `engagement_architect`

Designation also contains:

* `curator`

The shared vocabulary establishes overlap, but does not establish that the systems are interchangeable.

Their scoring mechanisms differ.

**Classification:** CLARIFY

---

## 6.4 Information loss from simple renaming

Simply renaming overlapping Identities into Designations could lose:

* weighted contribution explanations
* minimum-entry eligibility
* identity-specific derived traits
* identity finding behavior
* recommendation-bias metadata
* identity-specific scoring semantics

Therefore overlapping names must not be treated as proof of duplicate functionality.

**Classification:** PRESERVE / DEFER

---

# 7. Observation / Finding Separation

## 7.1 Current architecture

Observations and Findings are sibling rule systems:

```text
archive statistics
      │
      ├── Observation rules
      │
      └── Finding rules
```

Neither consumes the other's output.

The repository does not enforce a formal hierarchy such as:

```text
Observation → Finding
```

---

## 7.2 Pairwise overlap findings

### Likely duplicates

#### `systems-affinity` ↔ `systems-preference`

Same:

* `gameplay_mechanics >= 9`
* primary evidence metric
* effective interpretation
* nearly identical prose

Differences are primarily packaging and downstream presentation.

**Classification:** POSSIBLE DEAD CODE

---

#### `atmospheric-focus` ↔ `atmospheric-interest`

Same:

* `art_atmosphere >= 8.5 OR surreal >= 20`
* evidence concepts
* effectively identical prose

Again, differences are primarily packaging.

**Classification:** POSSIBLE DEAD CODE

---

### Partial overlaps

#### `interpretive-depth` ↔ `concept-driven`

Observation:

```text
depth >= 8
```

Finding:

```text
depth >= 8 AND originality >= 8
```

These are not duplicates.

**Classification:** PRESERVE

---

#### `boundary-preference` ↔ `concept-driven`

Both involve originality, but the second conditions differ:

```text
boundary:
originality + experimental/surreal genre presence

concept-driven:
originality + depth
```

**Classification:** PRESERVE

---

#### `boundary-preference` ↔ `atmospheric-interest`

Both can overlap through `surreal >= 20`, but their complete predicates differ.

**Classification:** PRESERVE

---

### Distinct examples

No Finding counterpart was found for:

* `emotional-resonance`
* `craft-appreciation`

No Observation counterpart was found for:

* `engagement-priority`

`interpretive-depth` and `speculative-interest` use disjoint evaluate metrics.

These demonstrate that the two collections are not globally redundant.

---

## 7.3 Conclusion

The correct forensic conclusion is:

> **Observations and Findings are independently evolved sibling rule collections containing unique rules, partial overlaps, and at least two apparent duplicate rules.**

The repository does not provide sufficient evidence to conclude that one collection was intended to replace the other.

**Classification:** PRESERVE / CLARIFY / POSSIBLE DEAD CODE

---

# 8. Evidence Architecture

Current evidence mechanisms include:

| Mechanism                 | Layer                 | Purpose                                    |
| ------------------------- | --------------------- | ------------------------------------------ |
| Metric evidence           | Observations/Findings | Shows triggering numeric signal            |
| Genre evidence            | Observations/Findings | Shows genre-based support                  |
| Identity breakdown        | Identity              | Explains weighted score contributions      |
| Identity finding evidence | Finding               | Connects identity interpretation to output |
| Designation traits/genres | Designation           | Static classification metadata             |
| Narrative                 | Profile               | Human-readable synthesis                   |

These should not be unified merely for architectural consistency.

The current contract does not require a universal evidence object.

**Classification:** PRESERVE / DEFER

---

# 9. Confidence / Strength Semantics

| Current Field                | Current Meaning                                         | Closest Contract Term                             | Action                      |
| ---------------------------- | ------------------------------------------------------- | ------------------------------------------------- | --------------------------- |
| `designationConfidence`      | Mean of top universal/media trait scores; aggregate strength of the classification basis | Signal Strength of Classification Basis | CLARIFY |
| `designationConfidenceLabel` | Presentation bucket derived from `designationConfidence`; backend is canonical source               | Signal Strength label                      | ALIGN UI/backend vocabulary |
| `primaryIdentity.confidence` | Entry count relative to identity minimum                | Data Sufficiency                                  | CLARIFY                     |
| Observation `confidence`     | Threshold-relative support for rule metric; sorting key | Evidence Strength family, but incomplete          | CLARIFY                     |
| Trait `*_strength`           | Floor-normalized trait magnitude                        | Signal Strength                                   | PRESERVE                    |
| Designation `score`          | Weighted classification fit, 0–100                      | Classification score/fit                          | PRESERVE                    |
| Identity `score`             | Weighted identity fit                                   | Identity score                                    | PRESERVE                    |
| Finding confidence           | Not implemented                                         | Classification/Evidence confidence not present    | DEFER                       |

### Designation confidence semantic clarification

`designationConfidence` is a legacy field name retained for API compatibility.

It is not statistical confidence, probability, uncertainty, or confidence in the correctness of a Designation.

It represents the aggregate strength of the three trait signals used to construct the archive's `classificationBasis`:

* top universal trait
* second universal trait
* top media trait

The value is the arithmetic mean of those raw trait scores on the 0–10 trait scale.

The name `designationConfidence` is therefore historical terminology; the conceptual meaning is **Signal Strength of Classification Basis**.

The corresponding `designationConfidenceLabel` is a presentation label for that signal strength and must use the backend's canonical vocabulary.

**Classification:** CLARIFY

---

# 10. Archive State Behavior

## Empty archive

Current behavior includes:

* zeroed statistics
* empty lists
* null primary identity
* tentative designation-confidence label
* canned/empty summary
* no eligible identities

Identity confidence function itself returns 0 when entry count is 0.

### Sparse archive

Identity minimum-entry requirements can cause identities to be omitted entirely.

### Established archive

Eligible identities receive scores and are ranked.

### Important distinction

Identity eligibility and identity confidence are separate mechanisms.

The repository does not establish that the confidence ratio is itself the sufficiency gate.

**Classification:** PRESERVE / CLARIFY

---

# 11. Ranking / Tie Behavior

## Designations

```text
sort by score descending
primary = first result
```

Designation score therefore directly controls primary selection.

## Identities

```text
sort by score descending
primary = first eligible result
```

Eligibility occurs before ranking.

## Observations

```text
sort by confidence descending
```

Observation confidence therefore has an ordering effect.

## Unresolved issues

The current repository evidence does not establish an explicit secondary tie-breaking policy for equal scores.

Therefore:

> **UNRESOLVED — insufficient repository evidence.**

Do not invent a tie-breaker during terminology work.

---

# 12. Test Inventory

## Strong domain behavior

### Trait calculator

Protects:

* floor normalization
* zero behavior
* presence signals
* integration

### Genre intelligence

Protects:

* genre affinity
* combinations
* diversity behavior

### Observations

Protects:

* rule firing
* confidence presence
* confidence range
* ordering
* evidence structure

### Findings

Protects:

* structure
* empty behavior
* identity finding
* designation ≠ finding invariant

### Designations

Protects:

* rule scores
* ranking
* primary selection
* metadata
* genre affinity

### Identity

Protects:

* weighted scoring
* ranking
* eligibility
* derived traits
* breakdown
* generalist behavior
* endpoint shape

### Identity confidence

Protects the confidence calculation itself.

### Archive engine/endpoints

Protects:

* profile structure
* designation confidence
* label presence
* designations
* findings
* identity fields

---

# 13. Test Gaps

The following gaps are supported by the evidence gathered so far.

## 13.1 API field presence for Identity confidence

The calculation is tested, but the `/identity` and profile response tests do not strongly assert that the serialized `confidence` field exists.

**Classification:** TEST GAP

---

## 13.2 Observation semantic meaning

Tests protect the confidence calculation and ordering, but not necessarily the distinction between:

> threshold-relative support

and:

> general Evidence Strength.

**Classification:** TEST GAP / CLARIFY

---

## 13.3 Backend/frontend designation-confidence labels

Backend and frontend use different label buckets.

Tests protect the backend function but do not appear to establish that the UI and API label semantics agree.

**Classification:** TEST GAP / ALIGN

---

## 13.4 Duplicate Observation/Finding behavior

The two likely duplicate pairs should have tests or explicit documentation identifying whether their coexistence is intentional.

Pairs:

* `systems-affinity` / `systems-preference`
* `atmospheric-focus` / `atmospheric-interest`

**Classification:** TEST GAP / POSSIBLE DEAD CODE

Do not delete either rule merely to make tests pass.

---

## 13.5 Explicit tie behavior

Ranking behavior is tested, but an explicit tie-breaking contract has not been established from current evidence.

**Classification:** TEST GAP / UNRESOLVED

---

# 14. Debugging / Dead-Code Candidates

## 14.1 `interpretation_engine`

The repository contains an interpretation rule system that remains tested but is not called by the current `archive_engine.build_archive_profile` path.

This is strong evidence of a historical or alternate path.

**Classification:** POSSIBLE DEAD CODE

Do not remove it during Phase 1 without establishing whether another consumer exists.

---

## 14.2 `charts.js` local designation-confidence calculator

A local `calculateDesignationConfidence` implementation exists, but the live profile card consumes the API value.

**Classification:** POSSIBLE DEAD CODE

---

## 14.3 Frontend designation-confidence label helper

The frontend recomputes labels instead of consuming `designationConfidenceLabel`.

This creates parallel behavior.

**Classification:** CLARIFY / POSSIBLE DEAD CODE

---

## 14.4 Trait strength map

Stored `*_strength` values are well tested but largely bypassed by live intelligence engines.

**Classification:** PRESERVE / INVESTIGATE

The API/test contract currently gives them meaning even if the scoring engines do not.

---

## 14.5 Legacy empty-identity test shape

A test named around zero scores can pass vacuously when the evaluated result is empty because identities are now omitted by eligibility.

**Classification:** POSSIBLE DEAD CODE / TEST GAP

Do not infer from the test name that zero-score identities are still a live contract.

---

## 14.6 Recommendation bias

`recommendation_bias` exists on Designations and Identity fixtures and appears in identity-finding output, but the Recommendation Engine currently returns no recommendations.

**Classification:** DEFER

This is forward-looking metadata rather than active recommendation behavior.

---

# 15. Recommended Phase 1 Changes

These are deliberately ordered from lowest blast radius to highest.

## 15.1 Document the current Observation/Finding relationship

**Classification:** CLARIFY

**Why:**
The repository does not currently enforce a hierarchy between the two systems. Documenting them as sibling rule collections prevents a false assumption during implementation.

**Affected files:**
`intelligence-contract.md` / Phase 1 decision map, after explicit contract review.

**Affected tests:**
None immediately.

**Risk:** LOW

---

## 15.2 Correct the user-facing Classification Confidence terminology

**Classification:** ALIGN

**Why:**
The UI currently teaches `designationConfidence` as Classification Confidence even though the calculation does not measure comparative classification certainty.

**Affected files:**
`charts.js`

**Affected tests:**
Any UI/profile tests covering the label should be identified.

**Risk:** LOW–MEDIUM

---

## 15.3 Decide the public treatment of `designationConfidence`

**Classification:** CLARIFY

**Why:**
It is an in-repo API field, consumed by the UI and protected by tests. Its numeric value is also largely derivable from `classificationBasis`.

Before renaming/removing it, decide whether the existing field is:

* retained as a legacy/public field,
* renamed,
* aliased,
* or eventually removed.

**Affected files:**
`archive_utils.py`, `archive_engine.py`, `charts.js`, endpoint tests.

**Risk:** MEDIUM

---

## 15.4 Document Identity confidence as sample sufficiency metadata

**Classification:** CLARIFY

**Why:**
The calculation is clear, but the word `confidence` is semantically broader than the actual math.

**Affected files:**
Identity documentation / contract mapping.

**Risk:** LOW

---

## 15.5 Document Observation confidence as a threshold-relative ordering score

**Classification:** CLARIFY

**Why:**
Renaming it to Evidence Strength would imply aggregation of the complete evidence object, which the implementation does not perform.

**Affected files:**
Observation documentation / contract mapping.

**Risk:** LOW

---

## 15.6 Investigate the two duplicate rule pairs

**Classification:** POSSIBLE DEAD CODE

**Why:**
Repository evidence establishes near-identical behavior but not historical intent.

Pairs:

* `systems-affinity` ↔ `systems-preference`
* `atmospheric-focus` ↔ `atmospheric-interest`

**Affected files:**
`observation_rules.py`, `finding_rules.py`, associated tests and UI consumers.

**Risk:** MEDIUM if changed prematurely.

---

## 15.7 Preserve unique Observation and Finding behavior

**Classification:** PRESERVE

**Why:**
The matrix demonstrates that many rules have no counterpart in the other system.

**Affected files:**
Observation/Finding rule modules.

**Risk:** LOW if preserved; HIGH if globally merged.

---

# 16. Explicitly Deferred Items

The following should not be changed merely as part of terminology alignment.

* Implementing true Classification Confidence
* Replacing designation scores
* Changing designation scoring formulas
* Changing identity scoring formulas
* Changing identity eligibility thresholds
* Unifying all Signal Strength calculations
* Redesigning Evidence
* Creating Finding confidence
* Merging Observations and Findings
* Removing overlapping Identity/Designation archetypes
* Rewiring Recommendations
* Removing recommendation-bias metadata
* Removing the interpretation engine
* Replacing deterministic rules with AI
* Inventing new identities/designations
* Inventing archive thresholds
* Inventing ranking tie-breakers

These require separate implementation/design decisions.

---

# 17. Lost-Behavior Checklist

## Archive statistics

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

## Trait strengths

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

## Genre intelligence

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

## Designations

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

## Identities

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

## Identity eligibility / confidence

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by calculation tests
* [ ] API serialization fully protected

## Observations

* [x] behavior discovered
* [x] unique behavior preserved
* [ ] duplicate candidates resolved
* [x] behavior documented
* [x] core behavior covered by tests

## Findings

* [x] behavior discovered
* [x] unique behavior preserved
* [ ] duplicate candidates resolved
* [x] behavior documented
* [x] core behavior covered by tests

## Confidence terminology

* [x] current calculations discovered
* [x] consumer blast radius discovered
* [ ] terminology decisions finalized
* [ ] UI terminology aligned
* [ ] API rename decision made

## Historical / alternate systems

* [x] interpretation engine discovered
* [x] recommendation stub discovered
* [ ] historical intent established
* [ ] dead-code decisions made

---

# 18. Final Forensic Conclusion

The `develop-3` intelligence system should not be treated as a failed or incomplete version of the new Contract.

It is an accumulated system containing several genuinely meaningful behavioral layers alongside historical residue.

The most important preservation rule is:

> **Do not confuse conceptual overlap with behavioral duplication.**

Designation and Identity overlap in vocabulary but have different scoring machinery.

Observations and Findings overlap in subject matter but contain substantial unique behavior.

Trait strengths overlap with other normalization helpers but remain a tested API artifact.

Confidence fields share a word but do not share a meaning.

The strongest confirmed terminology conflict is the presentation of `designationConfidence` as **Classification Confidence**.

The strongest confirmed duplicate candidates are:

```text
systems-affinity
        ↕
systems-preference

atmospheric-focus
        ↕
atmospheric-interest
```

Everything else should be treated conservatively unless additional repository evidence establishes otherwise.

The next step is therefore **not implementation**.

The next step is to reconcile this forensic record against:

1. `intelligence-contract.md`
2. `phase-1-intelligence-alignment.md`

and explicitly identify:

* what the Contract already covers,
* what the Contract contradicts,
* what the Contract leaves ambiguous,
* what existing behavior must be added to the Contract,
* and what existing behavior should intentionally remain outside Phase 1.

That reconciliation should happen **before changing either the production implementation or the Phase 1 plan**.

**Guiding principle:**

> **Recover the behavioral memory first. Decide what to change second. Implement third.**
