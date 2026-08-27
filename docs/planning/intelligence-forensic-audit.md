# Intelligence Forensic Audit

## Purpose

This document records the forensic examination of the `develop-3` intelligence system before Phase 1 implementation work.

The purpose is to recover the system's **actual behavioral contract** from:

* production implementation
* tests
* fixtures
* API consumers
* frontend behavior
* documentation
* historical/alternate code paths

This is not a redesign document.

The governing principle is:

> **Recover the behavioral memory first. Decide what to change second. Implement third.**

---

# 1. Forensic Method

The audit evaluates intelligence behavior across the following layers:

1. Trait calculation
2. Genre intelligence
3. Designations
4. Identity intelligence
5. Observations
6. Findings
7. Evidence
8. Confidence-related fields
9. API serialization
10. Frontend consumption
11. Historical/alternate systems
12. Tests and regression protection

For each behavior, the audit distinguishes:

* **PRESERVE** — behavior is established and should remain intact
* **CLARIFY** — behavior is established but terminology/documentation is ambiguous
* **ALIGN** — behavior conflicts with the intended vocabulary or consumer contract
* **INVESTIGATE** — repository evidence is insufficient for a safe decision
* **DEFER** — behavior is outside the current Phase 1 scope
* **POSSIBLE DEAD CODE** — behavior exists but current consumers have not been established

---

# 2. Trait Intelligence

## 2.1 Trait score calculation

Trait scoring is based on the existing scoring model and produces the canonical trait scores used throughout the archive intelligence system.

Trait values remain on the established 1–10 scoring scale.

**Classification:** PRESERVE

---

## 2.2 Trait strength normalization

Trait strength is calculated through floor-relative normalization.

The implementation establishes the following behavior:

```python
normalize_trait_signal(value)
```

The current contract treats the configured trait floor as the lower bound and normalizes the resulting signal into the `0–1` range.

The currently verified behavior includes:

* floor value → `0`
* midpoint values → proportional normalized signal
* maximum value → `1`
* values above the maximum → clamped to `1`
* values below the floor → clamped to `0`

Current regression coverage explicitly protects these boundaries.

**Classification:** PRESERVE

---

## 2.3 Trait strength versus trait score

Trait score and trait strength are different concepts.

* **Trait score** → user/archive rating on the 1–10 scale
* **Trait strength** → normalized signal derived from the trait score

The systems should not collapse these into one concept.

**Classification:** PRESERVE

---

# 3. Genre Intelligence

Genre intelligence contains multiple forms of derived information, including:

* genre distribution
* genre affinity
* genre combinations
* diversity-related calculations
* genre-derived designation signals

The existing implementation and tests establish meaningful behavior in this area.

**Classification:** PRESERVE

---

# 4. Designation Intelligence

## 4.1 Designation scores

Designation scores represent weighted classification fit.

The existing designation system uses weighted signals to calculate a score on a 0–100 scale.

**Classification:** PRESERVE

---

## 4.2 Designation ranking

Designations are ranked according to their calculated scores.

The highest-scoring designation is eligible to become the primary designation.

Current tests protect:

* rule scores
* ranking
* primary selection
* designation metadata
* genre affinity

**Classification:** PRESERVE

---

## 4.3 Designation versus Identity

Designation and Identity are conceptually related but are not interchangeable systems.

Designation scoring and Identity scoring use different rule collections and different scoring machinery.

The repository therefore does not support treating Identity as merely another designation category.

**Classification:** PRESERVE

---

# 5. Identity Intelligence

## 5.1 Identity scoring

Identity scores represent weighted Identity fit.

The current Identity engine calculates scores independently from Designation scoring.

Current tests protect:

* weighted scoring
* ranking
* eligibility
* derived traits
* breakdown
* generalist behavior
* endpoint shape

**Classification:** PRESERVE

---

## 5.2 Identity eligibility

The current implementation uses each Identity's configured minimum-entry requirement as an eligibility gate.

An Identity that does not satisfy its minimum-entry requirement is omitted from the scoring/ranking population.

This is important because earlier implementation behavior treated minimum-entry requirements differently.

### Historical behavior

Earlier behavior could allow an Identity to remain in the candidate population with a zero score when insufficient entries existed.

That historical behavior is retained here as forensic context only.

### Current behavior

The current implementation omits identities that fail their minimum-entry requirement before ranking.

Therefore:

* minimum-entry requirement → eligibility gate
* eligible Identity → participates in scoring/ranking
* ineligible Identity → omitted

**Classification:** RESOLVED / PRESERVE

---

## 5.3 Identity ranking

Identity ranking occurs among eligible Identity candidates.

The current evidence establishes that eligibility precedes meaningful ranking.

The repository does not establish a separate public tie-breaking contract for equal Identity scores.

**Classification:** PRESERVE / UNRESOLVED TIE POLICY

---

## 5.4 Identity breakdown

Identity output includes a breakdown describing contributing trait/category signals.

This breakdown is part of the established Identity API behavior.

**Classification:** PRESERVE

---

## 5.5 Identity confidence

The field historically named `confidence` is not statistical confidence.

Its calculation is based on archive entry count relative to the selected Identity's minimum-entry requirement.

The current conceptual model is:

```python
min(entryCount / minimum_entries, 1)
```

Therefore:

* **Minimum-entry requirement** → eligibility
* **Identity score** → classification fit
* **`primaryIdentity.confidence`** → data sufficiency
* **Identity ranking** → comparison among eligible Identity candidates

The value is normalized to the `0–1` range.

The field should not be interpreted as:

* statistical confidence
* probability
* uncertainty
* probability that the Identity is correct

The existing field name is retained for API compatibility unless a separate API migration decision is made.

**Classification:** CLARIFY / PRESERVE

---

## 5.6 Identity API serialization

The Identity confidence calculation itself is tested.

However, the repository does not currently establish equally strong explicit tests guaranteeing that the serialized Identity API response always contains the `confidence` field.

This remains a test gap.

**Classification:** TEST GAP

---

## 5.7 Identity frontend consumption

The current frontend does not consume the Identity intelligence endpoints or Identity response fields as an active presentation surface.

No current frontend dependency on:

* Identity endpoints
* `primaryIdentity`
* Identity confidence
* Identity data sufficiency
* Identity breakdowns

was established during the forensic pass.

Therefore, Identity terminology can be clarified without requiring an immediate frontend migration.

**Classification:** CLARIFY / PRESERVE

---

# 6. Observation Intelligence

## 6.1 Observation rules

Observations are produced through a rule collection.

The current engine:

```python
for rule in OBSERVATION_RULES:
if rule["evaluate"](profile):
observations.append(map_observation(rule, profile))
```

Therefore rule evaluation determines whether an Observation exists.

**Classification:** PRESERVE

---

## 6.2 Observation confidence

Observation `confidence` is a threshold-relative evidence-strength metric.

It does not represent:

* statistical confidence
* probability
* uncertainty
* confidence that the observation is objectively correct

Each Observation rule defines a threshold for its primary supporting metric.

The confidence value measures how strongly that metric reaches the rule's threshold:

```python
min(round(value / threshold, 2), 1)
```

A value equal to the threshold produces `1.0`.

Values below the threshold produce a proportional value between `0` and `1`.

Values above the threshold are capped at `1.0`.

A zero threshold produces `0` to avoid division by zero.

Therefore:

* **Observation rule evaluation** → determines whether the Observation is emitted
* **Rule threshold** → defines the target level of supporting evidence
* **Observation `confidence`** → measures threshold-relative evidence strength
* **Observation ranking** → sorts emitted Observations by that evidence-strength value

The value should therefore be interpreted as **threshold-relative Evidence Strength**, not classification confidence or statistical confidence.

Current tests protect the underlying calculation, including:

* threshold-relative behavior
* threshold → `1.0`
* values above threshold → `1.0`
* two-decimal rounding
* zero-threshold behavior

**Classification:** RESOLVED / DOCUMENTED / TESTED

---

## 6.3 Observation ordering

Observations are sorted by confidence descending.

The current implementation establishes:

```python
sorted(
observations,
key=lambda x: x["confidence"],
reverse=True,
)
```

This creates an ordering effect based on threshold-relative evidence strength.

The repository does not establish an explicit secondary tie-breaking policy for equal scores.

Therefore:

> **UNRESOLVED — insufficient repository evidence.**

Do not invent a tie-breaker during terminology work.

**Classification:** PRESERVE / UNRESOLVED

---

## 6.4 Observation evidence

Observations contain evidence objects produced by shared evidence constructors.

Current evidence includes metric and genre evidence.

The existing structure is:

```python
{
"metric": metric,
"label": label,
"value": value,
"unit": unit,
"type": "metric",
}
```

and:

```python
{
"metric": genre,
"label": label,
"value": value,
"unit": unit,
"type": "genre",
}
```

Current tests protect the neutral evidence structure.

**Classification:** PRESERVE

---

# 7. Findings

## 7.1 Finding architecture

Findings are a separate rule collection from Observations.

They overlap in subject matter but are not structurally identical.

The repository contains meaningful Finding behavior that does not have an exact Observation equivalent.

**Classification:** PRESERVE

---

## 7.2 Observation/Finding relationship

The repository does not enforce a hierarchy in which:

* Findings contain Observations
* Observations contain Findings
* one system is a superclass of the other

The safest interpretation supported by current evidence is that they are **sibling rule collections**.

Their coexistence should therefore be preserved unless a future contract explicitly unifies them.

**Classification:** CLARIFY / PRESERVE

---

## 7.3 Finding confidence

The current Finding system does not implement a dedicated Finding confidence metric.

Do not infer one from Observation confidence or other signal-strength fields.

**Classification:** DEFER

---

# 8. Evidence

## 8.1 Evidence packaging

Evidence mechanisms include:

* metric evidence
* genre evidence
* identity breakdowns
* identity-finding evidence
* narrative explanations

Evidence is not a separate intelligence engine.

It is a packaging mechanism attached to intelligence outputs.

The contract does not require one universal evidence schema.

**Classification:** EVIDENCE / PRESERVE

---

## 8.2 Evidence constructors

Shared evidence constructors exist for metric and genre evidence.

They currently provide neutral structural packaging rather than a universal semantic hierarchy.

The constructors should be preserved.

**Classification:** PRESERVE

---

## 8.3 Identity evidence

Identity finding output contains its own evidence structure.

This should not automatically be forced into the Observation/Finding metric/genre evidence schema.

The Identity evidence model has independent established behavior.

**Classification:** PRESERVE

---

## 8.4 Observation/Finding evidence provenance

The existing evidence objects expose the supporting metric or genre value but do not encode a universal provenance model.

The repository therefore does not establish a requirement for richer provenance metadata.

**Classification:** CLARIFY / DEFER

---

## 8.5 OR-rule evidence semantics

Several Observation rules use OR conditions.

For example, an Observation may fire when:

```python
metric >= threshold
and (
genre_a >= threshold
or genre_b >= threshold
)
```

The current confidence calculation may nevertheless be based only on one designated primary metric.

The repository does not establish whether the confidence value is intended to aggregate all satisfied evidence branches.

Therefore:

> **UNRESOLVED — OR-rule evidence aggregation semantics require separate investigation.**

Do not change the calculation merely to make the evidence object appear mathematically comprehensive.

**Classification:** INVESTIGATE

---

# 9. Confidence Terminology

The word `confidence` appears in multiple unrelated contexts.

These meanings must not be conflated.

| Field                        | Actual meaning                                                                           | Preferred conceptual vocabulary                | Status   |
| ---------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| `designationConfidence`      | Mean of top universal/media trait scores; aggregate strength of the classification basis | Signal Strength of Classification Basis        | CLARIFY  |
| `designationConfidenceLabel` | Presentation bucket derived from `designationConfidence`; backend is canonical source    | Signal Strength label                          | ALIGN    |
| `primaryIdentity.confidence` | Entry count relative to the selected Identity's minimum-entry requirement                | Data Sufficiency                               | CLARIFY  |
| Observation `confidence`     | Threshold-relative support for the rule's primary metric; sorting key                    | Threshold-relative Evidence Strength           | CLARIFY  |
| Trait `*_strength`           | Floor-normalized trait magnitude                                                         | Signal Strength                                | PRESERVE |
| Designation `score`          | Weighted classification fit, 0–100                                                       | Classification score/fit                       | PRESERVE |
| Identity `score`             | Weighted Identity fit                                                                    | Identity score                                 | PRESERVE |
| Finding confidence           | Not implemented                                                                          | Classification/Evidence confidence not present | DEFER    |

---

## 9.1 Identity eligibility versus data sufficiency

Identity minimum-entry requirements serve as **eligibility gates**, not scoring inputs.

An Identity is eligible for scoring only when the archive meets that Identity's configured minimum-entry requirement.

`primaryIdentity.confidence` is a separate presentation metric.

Despite the historical field name, it does not represent statistical confidence or confidence in the correctness of the Identity classification.

It represents **data sufficiency relative to the selected Identity's minimum-entry requirement**, normalized to the `0–1` range:

```text
min(entryCount / minimum_entries, 1)
```

Therefore:

* **Minimum-entry requirement** → eligibility gate
* **Identity score** → classification fit
* **`primaryIdentity.confidence`** → data sufficiency
* **Identity ranking** → comparison among eligible Identity candidates

The eligibility threshold and data-sufficiency value should not be conflated with Identity scoring or classification confidence.

**Classification:** CLARIFY

---

## 9.2 Observation confidence semantic clarification

Observation `confidence` is a threshold-relative evidence-strength metric.

It does not represent statistical confidence, probability, uncertainty, or confidence that the Observation itself is objectively correct.

Each Observation rule defines a threshold for its primary supporting metric.

The Observation's `confidence` measures how strongly that metric reaches the rule's threshold:

```text
min(round(value / threshold, 2), 1)
```

A value equal to the threshold produces `1.0`.

Values below the threshold produce a proportional value between `0` and `1`, while values above the threshold are capped at `1.0`.

A zero threshold produces `0` to avoid division by zero.

Therefore:

* **Observation rule evaluation** → determines whether the Observation is emitted
* **Rule threshold** → defines the target level of supporting evidence
* **Observation `confidence`** → measures threshold-relative evidence strength
* **Observation ranking** → sorts emitted Observations by that evidence-strength value

The `confidence` value should therefore be interpreted as **Evidence Strength**, not classification confidence or statistical confidence.

**Classification:** CLARIFY

---

## 9.3 Designation confidence semantic clarification

`designationConfidence` is a legacy field name retained for API compatibility.

The implementation calculates it as the mean of the top universal/media trait scores used by the designation system.

It therefore represents the aggregate strength of the classification basis rather than statistical probability that the designation is correct.

The preferred conceptual vocabulary is:

> **Signal Strength of Classification Basis**

The field remains part of the API contract unless a separate migration decision changes that contract.

**Classification:** CLARIFY / PRESERVE

---

## 9.3.1 Forensic resolution

The designation-confidence calculation has been reconciled against the current implementation and planning contract.

The calculation itself is considered valid and is preserved.

`designationConfidence` should be interpreted as the aggregate strength of the classification basis, not statistical confidence in the correctness of the designation.

No replacement confidence algorithm is required.

The remaining Phase 1 work is terminology/presentation alignment only, subject to API/frontend blast-radius verification.

**Classification:** RESOLVED / PRESERVE

---

## 9.4 `classificationBasis` production and consumer resolution

The `classificationBasis` field has been traced through the current production system.

The authoritative producer is the backend classification layer. It is generated from the strongest universal trait, second-strongest universal trait, and strongest media-specific trait selected during archive-profile construction.

The resulting structure is exposed through the `/archive-profile` API response without a separate frontend recomputation step.

The frontend consumes the backend-produced `archiveProfile.classificationBasis` representation directly.

The legacy frontend `generateClassificationBasis()` helper previously existed in
`charts.js`, but forensic tracing established that it was not part of the active
production path. It duplicated backend behavior without serving as an
authoritative producer.

The helper has now been removed from `charts.js`.

The backend `generate_classification_basis()` implementation remains the
authoritative producer of `archiveProfile.classificationBasis`, and the
frontend continues to consume the backend-produced field.

Backend/API consumers and tests continue to protect this contract.

**Classification:** RESOLVED / REMOVED — frontend producer

That dead frontend implementation has been removed.

`classificationBasis` should therefore be interpreted as a **summary of the dominant classification signals**, not as an exhaustive enumeration of every signal that may participate in designation-rule evaluation.

No change to the backend calculation or API field is required.

**Classification:** RESOLVED / PRESERVE

**Cleanup:** Dead frontend duplicate removed.

**Protection:** Backend/API contract should remain covered by existing archive-profile and endpoint tests.


---

# 10. Duplicate Rule Candidates

The repository contains two pairs of behaviorally similar rules.

## 10.1 Systems rules

```text
systems-affinity
↕
systems-preference
```

The rules appear highly similar in subject matter and supporting metrics.

Repository evidence does not yet establish whether:

* both are intentionally emitted
* one is historical residue
* they belong to different conceptual layers
* one should eventually replace the other

**Classification:** POSSIBLE DEAD CODE / INVESTIGATE

---

## 10.2 Atmospheric rules

```text
atmospheric-focus
↕
atmospheric-interest
```

These also appear behaviorally similar.

Intent is not established strongly enough to safely remove either rule.

**Classification:** POSSIBLE DEAD CODE / INVESTIGATE

---

# 11. Historical / Alternate Systems

## 11.1 Interpretation engine

The repository contains an interpretation rule system that remains tested but is not called by the current `archive_engine.build_archive_profile` path.

This is strong evidence of a historical or alternate path.

**Classification:** POSSIBLE DEAD CODE

Do not remove it during Phase 1 without establishing whether another consumer exists.

---

## 11.2 Recommendation system

`recommendation_bias` exists on Designation and Identity fixtures and appears in Identity-finding output.

The Recommendation Engine currently returns no recommendations.

This appears to be forward-looking metadata rather than active recommendation behavior.

**Classification:** DEFER

---

## 11.3 Frontend designation confidence calculation

A local `calculateDesignationConfidence` implementation exists in the frontend.

The live profile card consumes the API-provided designation confidence value.

This creates a possible historical/parallel implementation.

**Classification:** POSSIBLE DEAD CODE

---

## 11.4 Frontend designation-confidence labels

The frontend recomputes designation-confidence labels rather than consuming the backend's `designationConfidenceLabel`.

This creates parallel behavior between API and UI.

**Classification:** CLARIFY / POSSIBLE DEAD CODE

---

## 11.5 Trait strength map

Stored `*_strength` values are well tested but are largely bypassed by the live intelligence engines.

They remain part of the tested API/data contract.

**Classification:** PRESERVE / INVESTIGATE

---

## 11.6 Legacy empty-Identity test shape

A test named around zero scores can pass vacuously when the evaluated result is empty because identities are now omitted by eligibility.

This means the test name alone cannot establish that zero-score identities remain a live contract.

**Classification:** POSSIBLE DEAD CODE / TEST GAP

---

# 12. Test Inventory

The original forensic baseline was **199 passing tests**.

Following targeted Phase 1 test additions, the current verified regression baseline is:

> **218 passing tests**

The historical 199-test baseline should be preserved as forensic history; 218 is the current regression baseline.

---

## 12.1 Strong domain behavior

### Trait calculator

Protects:

* floor normalization
* zero behavior
* presence signals
* integration
* 0–1 normalization boundaries

**Status:** PRESERVED / TESTED

---

### Genre intelligence

Protects:

* genre affinity
* combinations
* diversity behavior

**Status:** PRESERVED / TESTED

---

### Observations

Protects:

* rule firing
* confidence presence
* confidence range
* confidence calculation
* confidence ordering
* rounding
* zero-threshold behavior
* evidence structure

**Status:** PRESERVED / TESTED

---

### Findings

Protects:

* structure
* empty behavior
* Identity finding
* designation ≠ finding invariant

**Status:** PRESERVED / TESTED

---

### Designations

Protects:

* rule scores
* ranking
* primary selection
* metadata
* genre affinity

**Status:** PRESERVED / TESTED

---

### Identity

Protects:

* weighted scoring
* ranking
* eligibility
* derived traits
* breakdown
* generalist behavior
* endpoint shape

**Status:** PRESERVED / TESTED

---

### Identity confidence

Protects:

* confidence calculation
* data-sufficiency relationship
* normalization behavior

Does not yet strongly protect serialized API field presence.

**Status:** PRESERVED / TESTED WITH API SERIALIZATION GAP

---

### Archive engine/endpoints

Protects:

* profile structure
* designation confidence
* designation confidence label
* designations
* findings
* Identity fields

**Status:** PRESERVED / TESTED

---

# 13. Test Gaps

The following gaps remain supported by the evidence gathered so far.

## 13.1 API field presence for Identity confidence

The calculation is tested, but `/identity` and profile response tests do not strongly assert that the serialized `confidence` field exists.

**Classification:** TEST GAP

---

## 13.2 Observation OR-rule evidence semantics

Observation confidence is now behaviorally and semantically documented.

The remaining question is narrower:

> When an Observation fires because of multiple OR evidence branches, should confidence represent only the designated primary metric or aggregate the satisfied branches?

Current repository evidence does not establish a universal answer.

**Classification:** INVESTIGATE

---

## 13.3 Backend/frontend designation-confidence labels

Backend and frontend use different label buckets.

Tests protect the backend function but do not establish that the UI and API label semantics agree.

**Classification:** TEST GAP / ALIGN

---

## 13.4 Duplicate Observation/Finding behavior

The two likely duplicate pairs should have explicit documentation or tests identifying whether their coexistence is intentional.

Pairs:

* `systems-affinity` / `systems-preference`
* `atmospheric-focus` / `atmospheric-interest`

**Classification:** TEST GAP / POSSIBLE DEAD CODE

---

## 13.5 Explicit tie behavior

Ranking behavior is tested, but an explicit secondary tie-breaking contract has not been established.

**Classification:** TEST GAP / UNRESOLVED

---

# 14. Debugging / Dead-Code Candidates

## 14.1 `interpretation_engine`

The repository contains an interpretation rule system that remains tested but is not called by the current archive construction path.

**Classification:** POSSIBLE DEAD CODE

---

## 14.2 `charts.js` local designation-confidence calculator

A local designation-confidence calculation exists, but the live profile card consumes the API value.

**Classification:** POSSIBLE DEAD CODE

---

## 14.3 Frontend designation-confidence label helper

The frontend recomputes labels instead of consuming `designationConfidenceLabel`.

**Classification:** CLARIFY / POSSIBLE DEAD CODE

---

## 14.4 Trait strength map

Stored `*_strength` values remain tested API artifacts even though the live intelligence engines largely bypass them.

**Classification:** PRESERVE / INVESTIGATE

---

## 14.5 Legacy empty-Identity test shape

Some zero-score Identity test behavior may now be vacuous because ineligible identities are omitted.

**Classification:** POSSIBLE DEAD CODE / TEST GAP

---

## 14.6 Recommendation bias

`recommendation_bias` exists but the Recommendation Engine currently produces no recommendations.

**Classification:** DEFER

---

# 15. Recommended Phase 1 Changes

These are ordered from lowest blast radius to highest.

## 15.1 Document the current Observation/Finding relationship

**Status:** COMPLETE

The audit now records Observations and Findings as sibling rule collections rather than assuming a hierarchy.

**Classification:** CLARIFY

**Risk:** LOW

---

## 15.2 Correct user-facing Classification Confidence terminology

**Status:** DOCUMENTATION DECISION COMPLETE / IMPLEMENTATION PENDING

The intended conceptual vocabulary is now established:

> `designationConfidence` → Signal Strength of Classification Basis

The frontend still requires alignment.

**Affected files:**

* `charts.js`
* associated UI/profile tests

**Classification:** ALIGN

**Risk:** LOW–MEDIUM

---

## 15.3 Decide the public treatment of `designationConfidence`

**Status:** OPEN

Before renaming or removing the field, decide whether it is:

* retained as a legacy/public field
* renamed
* aliased
* eventually removed

The current audit assumes preservation until that decision is made.

**Affected files:**

* `archive_utils.py`
* `archive_engine.py`
* `charts.js`
* endpoint tests

**Classification:** CLARIFY

**Risk:** MEDIUM

---

## 15.4 Document Identity confidence as sample sufficiency metadata

**Status:** COMPLETE

The field is now documented as:

> Data Sufficiency relative to the selected Identity's minimum-entry requirement.

**Classification:** CLARIFY

**Risk:** LOW

---

## 15.5 Document Observation confidence as a threshold-relative ordering score

**Status:** COMPLETE

Observation confidence is now documented as threshold-relative Evidence Strength.

**Classification:** CLARIFY

**Risk:** LOW

---

## 15.6 Investigate the two duplicate rule pairs

**Classification:** POSSIBLE DEAD CODE

Pairs:

* `systems-affinity` ↔ `systems-preference`
* `atmospheric-focus` ↔ `atmospheric-interest`

Repository evidence establishes near-identical behavior but not historical intent.

Do not delete either rule prematurely.

**Affected files:**

* `observation_rules.py`
* `finding_rules.py`
* associated tests
* UI consumers

**Risk:** MEDIUM if changed prematurely

---

## 15.7 Preserve unique Observation and Finding behavior

**Classification:** PRESERVE

The matrix demonstrates that many rules have no counterpart in the other system.

Do not globally merge the two systems merely because they overlap conceptually.

**Affected files:**

* Observation/Finding rule modules

**Risk:** LOW if preserved; HIGH if globally merged

---

# 16. Explicitly Deferred Items

The following should not be changed merely as part of terminology alignment.

* Implementing true Classification Confidence
* Replacing designation scores
* Changing designation scoring formulas
* Changing Identity scoring formulas
* Changing Identity eligibility thresholds
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
* Resolving OR-rule evidence aggregation without additional evidence

These require separate implementation/design decisions.

---

# 17. Lost-Behavior Checklist

## Archive statistics

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

---

## Trait strengths

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

---

## Genre intelligence

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

---

## Designations

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

---

## Identities

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by tests

---

## Identity eligibility / confidence

* [x] behavior discovered
* [x] behavior preserved
* [ ] behavior intentionally changed
* [x] behavior documented
* [x] behavior covered by calculation tests
* [ ] API serialization fully protected

---

## Observations

* [x] behavior discovered
* [x] unique behavior preserved
* [ ] duplicate candidates resolved
* [x] confidence semantics documented
* [x] confidence behavior tested
* [x] evidence structure tested
* [ ] OR-rule evidence aggregation semantics resolved

---

## Findings

* [x] behavior discovered
* [x] unique behavior preserved
* [ ] duplicate candidates resolved
* [x] behavior documented
* [x] core behavior covered by tests

---

## Confidence terminology

* [x] current calculations discovered
* [x] consumer blast radius discovered
* [x] semantic meanings documented
* [ ] terminology implementation finalized
* [ ] UI terminology aligned
* [ ] API rename/compatibility decision made

---

## Historical / alternate systems

* [x] interpretation engine discovered
* [x] recommendation stub discovered
* [x] frontend Identity non-consumption established
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

The Identity field named `confidence` is better understood as **Data Sufficiency**.

Observation `confidence` is better understood as **threshold-relative Evidence Strength**.

Identity minimum-entry requirements are **eligibility gates**, not scoring inputs.

The current verified regression baseline is **218 passing tests**, compared with the historical forensic baseline of 199.

The strongest confirmed duplicate candidates remain:

```text
systems-affinity
↕
systems-preference

atmospheric-focus
↕
atmospheric-interest
```

The strongest remaining unresolved forensic questions are:

1. What is the intended public/API treatment of `designationConfidence`?
2. Should frontend designation-confidence terminology be aligned with backend semantics?
3. What is the intended secondary tie behavior for equal ranking scores?
4. How should OR-rule evidence affect Observation confidence, if at all?
5. Are the duplicate rule pairs intentional or historical residue?
6. Does Identity confidence require stronger API serialization guarantees?

Everything else should be treated conservatively unless additional repository evidence establishes otherwise.

The audit has therefore moved from broad behavioral recovery into **targeted reconciliation and implementation planning**.

The next step is to reconcile this forensic record against:

1. `intelligence-contract.md`
2. `phase-1-intelligence-alignment.md`

and explicitly identify:

* what the Contract already covers
* what the Contract contradicts
* what the Contract leaves ambiguous
* what existing behavior must be added to the Contract
* what existing behavior should intentionally remain outside Phase 1
* which unresolved forensic questions require design decisions
* which decisions can safely be implemented without changing established behavior

That reconciliation should happen **before changing either the production implementation or the Phase 1 plan**.

**Guiding principle:**

> **Recover the behavioral memory first. Decide what to change second. Implement third.**
