# Phase 1 — Identity & Designation Conceptual Contract

**Status:** Working Contract
**Phase:** Phase 1 — Conceptual Alignment
**Purpose:** Establish the semantic boundary between Designations and Identities before further implementation or catalog changes.

---

## 1. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

This document establishes the conceptual contract for the Archive Designation and Archive Identity systems.

The goal is not to redesign either subsystem. The goal is to ensure that their conclusions are meaningfully different, explainable, and represented accurately by the API and documentation.

The guiding principle for this work is:

> **Evolution, not rewrite.**

Existing scoring, evidence, deterministic selection, and working behavior should be preserved unless this contract explicitly requires a conceptual change.

---

# 2. Designation vs. Identity

The two systems analyze overlapping evidence but answer different questions.

## Designation

A **Designation** describes a recognizable **taste classification** demonstrated by an archive.

Its core question is:

> **What recognizable taste classification best fits this archive?**

A Designation describes the observable shape of the user's media preferences.

Examples of the kinds of patterns a Designation may identify:

* sustained exploration of unusual or boundary-pushing media
* broad and varied media selection
* strong engagement with execution, pacing, or systems
* unusually deep engagement with layered or psychologically rich media

A Designation is therefore primarily a **classification of taste patterns**.

It is not:

* a personality diagnosis
* a psychological assessment
* a curator philosophy
* a recommendation category
* a statement about the user's identity outside the archive
* a single favorite genre
* an interpretation of one isolated preference

---

## Identity

An **Identity** describes a broader **curatorial philosophy or mode of engagement** demonstrated by the archive.

Its core question is:

> **What broader curatorial philosophy does this archive demonstrate?**

An Identity should synthesize multiple signals and patterns rather than simply restating a single taste classification.

An Identity may consider:

* multiple Designation-like tendencies
* universal traits
* media-specific traits
* genre behavior
* archive shape
* breadth and depth
* patterns of exploration
* patterns of engagement
* patterns of interpretation
* other derived signals

An Identity is therefore a **higher-level synthesis of how the archive is curated and engaged with**.

It is not:

* a psychological diagnosis
* a personality test result
* a synonym for a Designation
* a renamed Designation
* a single genre preference
* a recommendation category

---

# 3. Locked Differentiation Principle

The fundamental distinction between the systems is:

> **A Designation describes a recognizable taste classification; an Identity describes a broader curatorial philosophy synthesized from multiple signals and potentially multiple taste patterns.**

This distinction is considered a foundational architectural rule.

An Identity should **not** be derivable by simply:

* renaming a Designation
* reweighting a Designation
* restating a Designation's description
* combining one Designation with a different adjective
* creating a one-to-one Designation → Identity mapping

The two systems may use some of the same underlying evidence, but they must produce meaningfully different conclusions.

---

# 4. Evidence Sharing Rules

The systems operate on overlapping archive evidence.

This is intentional.

### Allowed

* Shared raw signals
* Shared universal traits
* Shared media-specific traits
* Shared genre information
* Shared archive statistics
* Shared derived metrics
* Different interpretations of the same evidence

### Not Allowed

* Same conclusion expressed under a different name
* Identity that is effectively a Designation
* Designation that is effectively an Identity
* Exact name collision between an Identity and a Designation
* Implicit one-to-one mapping between the two catalogs

The guardrail is:

> **Shared evidence is allowed. Shared conclusion is not.**

---

# 5. Current Designation Catalog

The current Designation catalog contains four working classifications:

1. **Boundary Explorer**
2. **Curator**
3. **Engagement Architect**
4. **Deep Diver**

These names and concepts are currently considered viable working hypotheses.

They should be preserved while the system is fleshed out rather than replaced merely to solve the Identity differentiation problem.

The current Designation concepts are:

### Boundary Explorer

A taste pattern characterized by attraction to unfamiliar, speculative, surreal, experimental, or boundary-pushing experiences, particularly when exploration is sustained rather than represented by isolated sampling.

### Curator

A taste pattern characterized by breadth, variety, strong appreciation of craft and presentation, and an archive that demonstrates substantial intentional selection across different types of media.

### Engagement Architect

A taste pattern characterized by strong engagement with execution, systems, pacing, gameplay, or other structural mechanisms that make an experience compelling.

### Deep Diver

A taste pattern characterized by sustained attention to layered, emotionally resonant, psychologically rich, or interpretively rewarding media.

These descriptions remain subject to future refinement, but their current conceptual role is Designation.

---

# 6. Current Identity Catalog

The existing Identity catalog currently contains:

1. Boundary Explorer
2. Deep Diver
3. Engagement Architect

These names are **not considered final**.

The problem is not merely the names.

The current Identity concepts substantially overlap with the corresponding Designations, in some cases to the point that they are effectively describing the same conclusion.

Therefore, a rename-only approach is insufficient.

The Identity catalog requires **conceptual differentiation**, not merely vocabulary substitution.

Future Identity names should describe a **curatorial mode or philosophy**, rather than another recognizable taste classification.

Potential naming directions may be explored separately, but no candidate names are locked by this document.

---

# 7. Identity Catalog Independence

The Identity catalog does not need to correspond one-to-one with the Designation catalog.

There is no requirement that:

* four Designations produce four Identities
* every Designation have a corresponding Identity
* every Identity correspond to one Designation
* the two systems contain the same number of entries

An Identity may synthesize evidence from several Designation-like patterns.

For example, an archive could simultaneously demonstrate:

* broad exploration
* deep engagement
* strong appreciation of systems

without its Identity needing to be named after any one of those classifications.

The catalogs should therefore evolve independently.

---

# 8. Evidence and Explanation

Both systems should remain explainable.

However, explanation should answer the question appropriate to the system.

## Designation evidence

Designation explanation should primarily answer:

> **Why did this archive receive this taste classification?**

Relevant evidence may include:

* qualifying genre prevalence
* sustained exploration
* media breadth
* originality
* universal traits
* media-specific traits
* archive characteristics
* other rule-specific signals

The existing `designationBasis` field is useful, but its current implementation may describe the strongest archive-level signals rather than the strongest evidence specific to the winning Designation.

This distinction should be clarified before changing the implementation.

---

## Identity evidence

Identity explanation should primarily answer:

> **Why does this archive demonstrate this particular curatorial philosophy?**

Identity explanation should synthesize multiple contributing signals.

The existing Identity breakdown provides a useful foundation because it exposes:

* trait
* value
* weight
* normalized value
* contribution

The Identity explanation should continue to make the reasoning inspectable rather than reducing the result to an opaque label.

---

# 9. Scoring

Designation and Identity scores are **Signal Strength**, not Classification Confidence.

A score answers:

> **How strongly does the archive exhibit the signals associated with this classification or identity?**

It does not answer:

> **How certain is the system that this classification is correct?**

Therefore:

* Designation Score remains a score
* Identity Score remains a score
* Score comparability may be preserved where already established
* Existing score ranges should not be redesigned solely for terminology
* Classification Confidence should not be introduced implicitly through score changes

A future Classification Confidence system, if desired, would be a separate conceptual decision.

---

# 10. Data Sufficiency

**Data Sufficiency** answers a different question from Signal Strength.

Data Sufficiency asks:

> **Does the archive contain enough relevant evidence to support this conclusion?**

Signal Strength asks:

> **How strongly does the available evidence express this pattern?**

These concepts must remain separate.

A small archive may have a strong signal while still having limited data sufficiency.

A large archive may have high data sufficiency while producing relatively weak signals for a particular classification.

No single archive-wide minimum entry count should be introduced merely to simplify this distinction.

Different subsystems may have different evidence requirements.

---

# 11. Current Working Behavior to Preserve

The following existing behavior is considered structurally sound and should be preserved unless a later conceptual decision explicitly changes it:

* deterministic Designation ranking
* deterministic Identity ranking
* primary Designation selection
* primary Identity selection
* existing Designation score scale
* existing Identity score scale
* Identity scoring breakdown
* Identity Data Sufficiency
* Designation metadata
* Designation recommendation bias metadata
* empty archive handling
* subsystem-specific evidence mechanisms
* explainability through contributing signals

Tie behavior should remain deterministic.

No co-primary result is currently required.

---

# 12. Known Provisional Areas

The following areas are intentionally **not locked** by this contract.

## Designation

* Exact Designation thresholds
* Boundary Explorer sustained-exploration threshold
* Boundary Explorer genre-family definitions
* Whether all metadata genres represent scoring inputs or broader associated genres
* Curator's archive-size component
* Exact Designation-specific evidence presentation
* Future additions, removals, splits, merges, or renames

## Identity

* Final Identity catalog
* Final Identity names
* Secondary Identity threshold
* Secondary Identity semantics
* Identity near-tie behavior
* Whether genre evidence should participate in Identity tie-breaking
* Exact Identity-specific evidence requirements
* Future additions, removals, splits, merges, or renames

These are unresolved design questions, not implementation bugs.

---

# 13. Explicit Non-Goals

This conceptual pass does **not** authorize:

* rewriting the scoring engines
* merging Designation and Identity subsystems
* creating a universal evidence schema
* introducing Classification Confidence mathematics
* changing Designation Score semantics
* changing Identity Score semantics
* changing Data Sufficiency semantics
* inventing a universal archive-size threshold
* changing primary-selection behavior without a conceptual reason
* changing tie behavior without a conceptual reason
* redesigning the API architecture
* renaming unrelated fields
* building a Recommendation Engine
* treating Designations or Identities as psychological diagnoses

---

# 14. Decision Rules for Future Catalog Changes

When evaluating a new Designation or Identity, ask:

### Designation

1. Does this describe a recognizable taste classification?
2. Can the classification be observed from archive behavior?
3. Is it meaningfully different from existing Designations?
4. Can it be supported by explainable evidence?
5. Does it avoid functioning as a personality or psychological label?

### Identity

1. Does this describe a curatorial philosophy or mode of engagement?
2. Does it synthesize multiple signals or patterns?
3. Is it meaningfully different from existing Identities?
4. Is it meaningfully different from existing Designations?
5. Would the Identity still make conceptual sense if one Designation were renamed or removed?
6. Can the conclusion be explained through contributing evidence?
7. Does it avoid functioning as a personality or psychological label?

---

# 15. Catalog Evolution Principle

Neither catalog should be treated as permanently complete.

The system should support future evolution through:

* adding new concepts
* refining existing concepts
* renaming concepts when semantics require it
* splitting concepts that prove too broad
* merging concepts that prove redundant
* retiring concepts that fail to produce useful distinctions

However, catalog evolution should be evidence-driven.

A new label should not be introduced merely because an existing label is inconvenient.

Likewise, an existing label should not be removed merely because its implementation is currently imperfect.

---

# 16. Current Architectural Boundary

The intended relationship between the systems is:

**Archive Evidence → Signals / Traits / Metrics**

From those shared signals:

**→ Designation: recognizable taste classification**

and independently:

**→ Identity: broader curatorial philosophy**

The systems may share evidence and infrastructure.

They must not collapse into the same conceptual layer.

---

# 17. Phase 1 Outcome

The Phase 1 differentiation decision is therefore:

> **Designations classify recognizable taste patterns. Identities synthesize broader curatorial philosophies from multiple patterns and signals.**

The immediate implementation consequence is **not a rewrite**.

The immediate implementation consequence is that the Identity catalog must be reconsidered so that its concepts genuinely occupy the Identity layer.

Designation concepts should remain intact while that work occurs.

Further implementation changes should follow explicit catalog decisions rather than precede them.
