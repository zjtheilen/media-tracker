# Media Tracker — Intelligence Forensic Audit

**Status:** Historical forensic record; reconciled with current Phase 1 decisions
**Branch audited:** `develop-3`
**Purpose:** Preserve the evidence, reasoning, and conclusions from the Phase 1 forensic audit.

---

# 1. Purpose

This document preserves the forensic investigation performed against the existing intelligence implementation.

The central question was:

> **What behavior does the repository actually implement and protect, what behavior does the conceptual contract require, and where do those differ?**

The audit intentionally separated:

- proven current behavior
- strongly implied behavior
- inferred behavior
- unresolved questions
- future concerns

This distinction remains important.

---

# 2. Epistemic Standard

Tests are:

> **Executable evidence of behavior that the repository currently chooses to protect.**

They are not automatically the conceptual contract.

The following distinction was used:

```text
code + test
    ↓
PROVEN CURRENT BEHAVIOR

code + no test
    ↓
PROVEN CURRENT BEHAVIOR
with weaker regression protection

test contradicted by code
    ↓
STALE / BROKEN CONTRACT CANDIDATE

contract + no code/test support
    ↓
INTENDED BEHAVIOR
not proven current behavior
```

This prevented assumptions from being elevated into facts.

---

# 3. Audit Classifications

### PRESERVE

Existing behavior is compatible with the current contract.

### ALIGN

Existing behavior directly contradicts a locked conceptual decision.

### CLARIFY

The behavior is useful but its meaning is under-specified.

### EVIDENCE

Existing evidence/explanation infrastructure should be preserved.

### TEST GAP

Meaningful behavior exists without sufficient regression protection.

### DEFER

The issue is real but belongs to a later phase.

### POSSIBLE DEAD CODE

Potentially obsolete or redundant behavior requiring investigation.

---

# 4. Major Identity Finding

The original Identity catalog contained concepts that overlapped heavily with Designations.

The audit established that simple renaming was insufficient.

In particular, the old Identity concepts:

- Boundary Explorer
- Deep Diver
- Engagement Architect

were too close to existing Designation concepts.

The correct solution was not to delete the Identity subsystem.

The correct solution was to establish a genuinely different ontology.

---

# 5. Identity Ontology Result

The resulting distinction is:

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

Current Identity concepts:

- Interpretive Philosophy
- Exploratory Philosophy
- Breadth Philosophy

Construction / Systems Philosophy was deferred because it collapsed toward Engagement Architect.

---

# 6. Identity Evidence Finding

The Identity scoring architecture itself was found to be valuable.

It provides:

- fixture-defined signals
- weighted scoring
- normalization
- contribution tracking
- derived traits
- explanations
- deterministic ranking

The primary conceptual problem was not the existence of weighted scoring.

It was whether the signals being scored legitimately represented the intended Identity.

The architecture was therefore preserved.

---

# 7. Identity Evidence Limitations

The current system does not directly observe:

- user intent
- deliberate exploration
- interpretation
- reflection
- taste trajectory
- discovery process
- intentional diversification

The audit therefore established:

> **Observable archive patterns may support an inferred orientation, but they must not be presented as direct observations of intent or internal behavior.**

This is especially important for Exploratory Philosophy and Breadth Philosophy.

---

# 8. Identity Eligibility

The audit established that Identity minimum-entry requirements should function as eligibility gates.

Current minimums:

| Identity                | Minimum Entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

An Identity below its minimum should not participate in ranking/resolution.

This behavior is now covered by the migrated implementation and tests.

---

# 9. Identity Ranking

Current behavior:

1. determine eligible Identities
2. calculate Identity Scores
3. rank by score
4. resolve Primary Identity deterministically
5. identify meaningful Secondary Identities

Primary:

> highest-ranked eligible Identity

Secondary:

> eligible, non-primary Identity meeting the current meaningfulness threshold

Current secondary threshold:

> `0.60`

Exact-score ties are deterministic.

No arbitrary near-tie policy was introduced.

---

# 10. Identity Evidence Explanation

The audit confirmed the value of Identity contribution breakdowns.

A breakdown exposes:

- signal
- value
- weight
- normalized value
- contribution

This is retained as an explanation mechanism.

The top-three representation should be understood as:

> **Top contributing Identity signals**

rather than “all evidence.”

---

# 11. Designation Findings

The existing Designation architecture was found to be fundamentally sound.

It provides:

- named classifications
- rule-driven evaluation
- multiple candidate scores
- deterministic primary selection
- traits
- genres
- recommendation bias
- classification metadata

The current working catalog remains:

- Boundary Explorer
- Engagement Architect
- Deep Diver
- Curator

No wholesale Designation rewrite was justified.

---

# 12. Designation Confidence Finding

Historical `designationConfidence` terminology was misleading.

The value behaves more like:

> **Signal Strength**

because it derives from the strength of designation-related signals.

It should not be treated as statistical Classification Confidence.

The API field remains preserved.

The presentation terminology is aligned to Signal Strength.

---

# 13. `designationBasis` Finding

The backend classification layer is authoritative for `designationBasis`.

It summarizes dominant classification signals.

It does not enumerate every condition used by every Designation rule.

A duplicate frontend implementation was identified as unnecessary and removed.

The current architecture is:

```text
Backend classification
        ↓
archiveProfile.designationBasis
        ↓
Frontend presentation
```

No backend behavior change is required.

---

# 14. Observation Findings

Observations remain a useful evidence-near intelligence layer.

The audit established:

- Observations are recurring demonstrable patterns.
- Observation evidence is structured.
- Evidence Strength is distinct from general confidence.
- Observation evidence architecture does not need to become a universal evidence schema.

The public terminology has been migrated from historical `confidence` toward:

> `evidenceStrength`

---

# 15. Finding Findings

The first forensic pass was too confident in declaring the Finding system invalid.

The self-attack downgraded several concerns to:

> **INFERRED / REQUIRES DELIBERATE DECISION**

The current position is therefore conservative.

Findings remain an interpretive layer.

The remaining Phase 1 question is:

> **What additional meaning does a Finding provide beyond the Observation, Trait, Genre Signal, or metric underneath it?**

This question should be answered before elevating or redesigning individual Findings.

No mass deletion is justified.

---

# 16. Normalization Finding

The audit discovered that the system contains more than one normalization behavior.

This is important.

Trait normalization and Identity normalization are not interchangeable.

Therefore documentation should never refer generically to:

> “the normalization function”

without specifying which subsystem is meant.

The existing behaviors are preserved.

---

# 17. Recommendation Bias

Recommendation bias exists as metadata attached to intelligence classifications.

The audit established that this should remain preserved.

It should not be mistaken for:

- Recommendation Score
- Recommendation Confidence
- a completed Recommendation Engine

Recommendation generation remains future work.

---

# 18. Generalist Behavior

The audit established a useful negative-space expectation:

> **A generalist archive should not automatically receive a strong match to a specialized Identity.**

This protects the distinction between broad archive composition and specific curatorial philosophy.

Breadth Philosophy is intentionally different because it describes range itself.

---

# 19. Empty and Sparse Archives

The audit established that archive state matters.

### Empty

No consumed media.

### Sparse

Some consumed media, but insufficient evidence for certain conclusions.

### Established

Enough archive data for the relevant intelligence systems to operate normally.

An empty archive should not imply:

> negative preference

A sparse archive should not imply:

> strong certainty

This is why Signal Strength and Data Sufficiency remain separate.

---

# 20. Test Quality

Tests should be evaluated according to what they protect.

### Strong

Protect meaningful domain behavior.

### Weak

Primarily verify implementation details.

### Redundant

Duplicate meaningful coverage elsewhere.

### Debugging Artifact

Created primarily during investigation.

### Missing

Meaningful production behavior lacks adequate protection.

### Contradictory

Directly conflicts with the current conceptual contract.

Contradictory tests should be deliberately changed rather than silently deleted.

---

# 21. Phase 1 Test Result

The Identity migration and associated test migration were completed.

Current regression baseline:

> **245 passing tests, 0 failing tests**

The change from earlier historical test counts should not be interpreted mechanically as regression.

The meaningful requirement is:

> **The current suite is green and intentional behavioral changes have corresponding regression protection.**

---

# 22. Completed Audit Decisions

The following Phase 1 decisions are now considered complete:

- Identity/Designation conceptual separation
- Identity differentiation stress test
- Identity evidence mapping
- Identity fixture contract
- Identity fixture migration
- Identity test migration
- Identity eligibility behavior
- Primary Identity deterministic ranking
- Secondary Identity behavior
- frontend scoring terminology alignment
- `systems-preference` consolidation into `systems-affinity`
- `designationBasis` consumer audit
- removal of obsolete frontend `generateDesignationBasis()` duplicate
- full regression suite reconciliation

These decisions should not be reopened merely because an older forensic document contains the earlier state.

---

# 23. Remaining Phase 1 Work

The remaining work is primarily:

- terminology reconciliation where still necessary
- Observation shortlist/alignment
- Archive State behavior
- Finding evidence boundaries
- ELEVATE Finding decisions
- atmospheric ownership
- final API/frontend terminology reconciliation
- final documentation reconciliation
- final regression pass

These are tracked by the Phase 1 Decision & Implementation Map.

---

# 24. Deferred Items

The following remain future or deferred concerns:

- universal evidence schema
- Classification Confidence system
- deliberate exploration metrics
- taste trajectory metrics
- intentionality metrics
- broader Construction / Systems Identity
- recommendation algorithm design
- large-scale taxonomy expansion
- machine-learning classification

These should not be introduced into Phase 1 simply to make the current system appear more sophisticated.

---

# 25. Final Forensic Principle

The forensic audit exists to prevent the project from confusing:

> **what we wish the system did**

with:

> **what the system actually does**

and also from confusing:

> **what the system currently does**

with:

> **what the conceptual contract permanently requires.**

The governing rule is therefore:

> **Preserve proven compatible behavior. Align direct contradictions. Clarify ambiguity. Preserve useful evidence infrastructure. Test meaningful behavior. Defer future concerns.**

And above all:

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**
