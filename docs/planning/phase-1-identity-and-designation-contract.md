# Phase 1 — Identity & Designation Conceptual Contract

**Status:** Reconciled Working Contract
**Phase:** Phase 1 — Conceptual Alignment
**Purpose:** Establish and preserve the semantic boundary between Designations and Identities.

---

# 1. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

This document establishes the conceptual contract for the Archive Designation and Archive Identity systems.

The goal is not to redesign either subsystem unnecessarily.

The goal is to ensure that:

* Designations and Identities have distinct semantic responsibilities
* their conclusions remain explainable
* their terminology accurately describes their behavior
* shared evidence does not produce duplicated conclusions
* existing compatible scoring and deterministic behavior is preserved

The governing implementation philosophy is:

> **Evolution, not rewrite.**

---

# 2. Designation

A **Designation** describes a recognizable **taste classification** demonstrated by an archive.

Its core question is:

> **What recognizable taste classification best fits this archive?**

A Designation describes the observable characteristics of the media relationship.

Examples include:

* attraction to unusual or boundary-pushing experiences
* broad and varied media selection
* strong engagement with execution, pacing, or systems
* sustained attraction to layered or psychologically rich media

A Designation is therefore primarily a **classification of taste patterns**.

A Designation is not:

* a personality diagnosis
* a psychological assessment
* a statement about the user's identity outside the archive
* a curator philosophy
* a recommendation category
* a single favorite genre
* an interpretation of one isolated preference

---

# 3. Identity

An **Identity** describes a broader **curatorial philosophy or mode of engagement** demonstrated by an archive.

Its core question is:

> **What broader curatorial philosophy does this archive demonstrate?**

An Identity synthesizes multiple signals and patterns rather than simply restating a single taste classification.

An Identity may consider:

* universal traits
* media-specific traits
* genre behavior
* archive shape
* breadth
* depth
* patterns of engagement
* patterns associated with exploration
* patterns associated with interpretation
* other explicitly defined derived signals

An Identity is therefore a **higher-level synthesis of the curator's recurring orientation toward media**.

It is not:

* a psychological diagnosis
* a personality test result
* a synonym for a Designation
* a renamed Designation
* a single genre preference
* a recommendation category
* a claim about the curator's behavior outside the archive

---

# 4. Locked Differentiation Principle

The foundational distinction is:

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

A useful shorthand is:

> **Designation:** What do you tend to like?

> **Identity:** What relationship do you tend to establish with what you like?

An Identity must not be created by simply:

* renaming a Designation
* reweighting a Designation
* restating a Designation's description
* adding an adjective to a Designation
* creating an implicit one-to-one Designation → Identity mapping

The two systems may use the same evidence.

They must not produce the same conclusion.

---

# 5. Evidence Sharing Rules

The systems operate on overlapping archive evidence.

This is intentional.

## Allowed

* shared raw signals
* shared universal traits
* shared media-specific traits
* shared genre information
* shared archive statistics
* shared derived metrics
* different interpretations of the same evidence

## Not Allowed

* the same conclusion expressed under a different name
* an Identity that is effectively a Designation
* a Designation that is effectively an Identity
* an exact name collision between an Identity and a Designation
* an implicit one-to-one mapping between the two catalogs

The governing guardrail is:

> **Shared evidence is allowed. Shared conclusion is not.**

---

# 6. Current Designation Catalog

The current Designation catalog contains four working classifications:

1. **Boundary Explorer**
2. **Curator**
3. **Engagement Architect**
4. **Deep Diver**

These remain working behavioral hypotheses and may be refined by future evidence-driven catalog decisions.

## Boundary Explorer

A taste pattern characterized by attraction to unfamiliar, speculative, surreal, experimental, or boundary-pushing experiences, particularly when exploration is sustained rather than represented by isolated sampling.

## Curator

A taste pattern characterized by breadth, variety, strong appreciation of craft and presentation, and an archive that demonstrates substantial selection across different areas of media.

## Engagement Architect

A taste pattern characterized by strong engagement with execution, systems, pacing, gameplay, or other structural mechanisms that make an experience compelling.

## Deep Diver

A taste pattern characterized by sustained attention to layered, emotionally resonant, psychologically rich, or interpretively rewarding media.

The current Designation catalog is not required to contain the same number of concepts as the Identity catalog.

---

# 7. Current Identity Catalog

The accepted Phase 1 Identity catalog contains three concepts:

1. **Interpretive Philosophy**
2. **Exploratory Philosophy**
3. **Breadth Philosophy**

These concepts were selected because they occupy a meaningfully different semantic layer from the Designation catalog.

---

## 7.1 Interpretive Philosophy

### Definition

Interpretive Philosophy describes engagement with media through:

* depth
* reflection
* complexity
* ambiguity
* interpretation

### Core question

> **How do you engage with what you consume?**

More specifically:

> **Does this archive repeatedly demonstrate engagement with media as something to interpret, unpack, question, and reconsider?**

### Evidence

**Primary signal:**

* `depth`

**Supporting signals:**

* `emotional_impact`
* `reflection`
* `ambiguity`
* `analysis`

**Minimum entries:** `20`

**Weights:**

| Signal             | Weight |
| ------------------ | -----: |
| `depth`            |   0.45 |
| `emotional_impact` |   0.25 |
| `reflection`       |   0.12 |
| `ambiguity`        |   0.10 |
| `analysis`         |   0.08 |

### Boundary

Interpretive Philosophy is not automatically established by:

* high average score
* emotional impact alone
* psychological genre prevalence
* mystery genre prevalence
* surreal genre prevalence
* depth alone
* experimental media
* originality
* engagement
* craft
* archive size
* genre count
* media-type diversity

These may provide context or supporting evidence but do not independently define the Identity.

### Relationship to Designation

Deep Diver Designation describes a recognizable taste pattern toward depth and layered experiences.

Interpretive Philosophy describes the broader relationship with those experiences:

> **The curator tends to engage with media as something to interpret, question, and unpack.**

### Evidence limitation

The archive does not directly observe thoughts, conversations, reviews, or post-consumption reflection.

Interpretive Philosophy is therefore an evidence-based inference from repeated archive signals rather than a direct measurement of internal cognition.

---

# 8. Exploratory Philosophy

## 8.1 Definition

Exploratory Philosophy describes engagement that extends beyond established preferences into unfamiliar or boundary-expanding territory.

Relevant characteristics include:

* novelty
* unfamiliarity
* contrast
* boundary expansion
* experiences outside established territory

## 8.2 Core question

> **How do you relate to the boundaries of what you consume?**

More specifically:

> **Does this archive repeatedly demonstrate engagement with experiences beyond established taste territory?**

## 8.3 Evidence

**Strongest observable signals:**

* `originality`
* `genre_diversity`

**Supporting / proxy signals:**

* `depth`
* `experimental_affinity`
* `novelty`

**Minimum entries:** `20`

**Weights:**

| Signal                  | Weight |
| ----------------------- | -----: |
| `originality`           |   0.35 |
| `genre_diversity`       |   0.25 |
| `depth`                 |   0.15 |
| `experimental_affinity` |   0.15 |
| `novelty`               |   0.10 |

## 8.4 Boundary

Exploratory Philosophy is not simply:

* liking experimental media
* liking unusual media
* having high originality
* having high novelty
* having high genre diversity
* having one unusual work in the archive

These signals can contribute evidence.

They do not individually prove exploration.

## 8.5 Relationship to Designation

Boundary Explorer Designation is a recognizable taste classification centered on attraction to boundary-pushing or unfamiliar media.

Exploratory Philosophy is broader:

> **The curator demonstrates a recurring relationship with unfamiliar or boundary-expanding territory.**

The two concepts may legitimately coexist.

Neither should be defined as a restatement of the other.

## 8.6 Evidence limitation

The current archive observes characteristics associated with exploratory behavior more directly than it observes exploration itself.

It does not directly observe:

* deliberate search
* intent
* trajectory through taste space
* conscious boundary testing

Therefore:

> **Exploratory Philosophy must not be interpreted as proof of deliberate exploration.**

---

# 9. Breadth Philosophy

## 9.1 Definition

Breadth Philosophy describes the range of territory represented in the archive.

Its subject is observable archive variety.

## 9.2 Core question

> **How wide is the territory you consume?**

## 9.3 Evidence

**Primary observable signal:**

* `genre_diversity`

**Minimum entries:** `15`

**Weight:**

| Signal            | Weight |
| ----------------- | -----: |
| `genre_diversity` |   1.00 |

The current fixture intentionally uses `genre_diversity` as its formal Identity signal.

## 9.4 Boundary

Breadth Philosophy does not automatically mean:

* deliberate diversification
* intentional exploration
* broad curiosity in every domain
* collecting behavior
* organization
* a particular motivation for consuming varied media

Genre diversity demonstrates observable range.

It does not directly establish why that range exists.

## 9.5 Relationship to Designation

Curator Designation identifies a recognizable taste pattern involving breadth, variety, craft, presentation, and archive characteristics.

Breadth Philosophy focuses specifically on the observable range of territory represented by the archive.

The two may use related evidence while answering different questions.

---

# 10. Cross-Identity Boundary

The three Identities answer different questions:

| Identity                | Core question                                            |
| ----------------------- | -------------------------------------------------------- |
| Interpretive Philosophy | How do you engage with what you consume?                 |
| Exploratory Philosophy  | How do you relate to the boundaries of what you consume? |
| Breadth Philosophy      | How wide is the territory you consume?                   |

These dimensions can coexist.

An archive may legitimately demonstrate:

* strong interpretive engagement
* recurring engagement with unfamiliar territory
* broad genre range

at the same time.

Therefore Identity differentiation does not require exclusivity.

The governing rule remains:

> **Evidence can overlap. Meaning cannot.**

---

# 11. Identity Scoring Contract

Identity scoring uses fixture-defined weighted signals.

The conceptual scoring flow is:

```text
Archive Data
    ↓
Signal Resolution
    ↓
Normalization
    ↓
Fixture Weights
    ↓
Identity Score
    ↓
Contribution Breakdown
    ↓
Ranking
```

The Identity Score represents Signal Strength.

It does not represent:

* statistical confidence
* probability
* psychological certainty
* certainty about the curator's internal motivations

The existing scoring architecture is preserved.

---

# 12. Identity Eligibility

Eligibility is separate from scoring.

The current minimum-entry requirements are:

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

If an archive contains fewer entries than an Identity's minimum requirement, that Identity is not eligible for evaluation.

Minimum entry count is a Data Sufficiency requirement.

It is not a confidence score.

---

# 13. Primary Identity

The Primary Identity is the single strongest eligible Identity.

Current behavior is:

1. Determine eligible Identities.
2. Score eligible Identities.
3. Rank candidates by Identity Score.
4. Resolve exact-score ties deterministically.
5. Present one Primary Identity.

No co-primary Identity is currently required.

Exact-score ties are resolved through deterministic contribution-evidence ordering.

Tie resolution does not change the underlying Identity Score.

No arbitrary near-tie threshold is used.

**Status:** LOCKED / IMPLEMENTED / TESTED

---

# 14. Secondary Identity

Secondary Identity is an optional additional Identity with meaningful support.

Current selection policy requires:

* eligibility
* non-primary status
* Identity Score ≥ `0.60`

Current threshold:

```text
SECONDARY_MIN_SCORE = 0.60
```

The threshold is a selection/presentation policy rather than part of the Identity scoring formula.

The following are insufficient by themselves:

* any positive score
* second-place ranking
* numerical closeness to Primary Identity
* mere existence of another eligible Identity

**Status:** LOCKED / IMPLEMENTED / TESTED

---

# 15. Data Sufficiency vs. Signal Strength

These concepts must remain separate.

### Data Sufficiency

> **Does the archive contain enough relevant data for this Identity to be evaluated?**

### Signal Strength

> **How strongly does the available data express the Identity's associated signals?**

A small archive may have strong signals while lacking sufficient data for an Identity.

A larger archive may have sufficient data while producing weak signals for an Identity.

Neither concept should be used as a substitute for the other.

---

# 16. Explanation and Evidence

Identity explanations should make the reasoning inspectable.

The current Identity breakdown exposes:

* trait
* value
* weight
* normalized value
* contribution

This provides an explanation of how the Identity Score was assembled.

The explanation should answer:

> **Why does this archive demonstrate this particular curatorial philosophy?**

It should not imply access to:

* private thoughts
* psychological states
* intentions not represented in the archive
* behavior outside the tracked media domain

---

# 17. Designation Explanation

Designation explanation should answer:

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

`designationBasis` remains a backend-produced summary of dominant archive-level classification signals.

It is not required to reproduce every signal used by the winning Designation rule.

The backend remains the authoritative producer.

---

# 18. Determinism

Both systems must retain deterministic behavior where behavior is already established.

This includes:

* candidate ranking
* primary selection
* exact tie resolution
* eligibility
* stable presentation behavior

Determinism must not depend on incidental fixture-file ordering when a conceptual ranking rule exists.

The current Identity system uses contribution evidence ordering to resolve exact-score ties.

---

# 19. Explicit Non-Goals

This contract does not authorize:

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
* introducing personality or psychological interpretation
* building a Recommendation Engine
* inventing intent metrics
* inventing exploration-trajectory metrics
* redesigning unrelated API fields

---

# 20. Future Catalog Evolution

Neither catalog should be treated as permanently complete.

Future evidence may justify:

* adding concepts
* refining concepts
* renaming concepts
* splitting concepts
* merging redundant concepts
* retiring concepts

However, catalog evolution must be evidence-driven.

A new label should not be introduced merely because an existing label is inconvenient.

An existing label should not be removed merely because its implementation is imperfect.

A future catalog change must preserve the semantic distinction between Designation and Identity.

---

# 21. Current Architectural Boundary

The intended conceptual relationship is:

```text
Archive Evidence
      ↓
Signals / Traits / Metrics
      ↓
   ┌───────────────┐
   │               │
   ↓               ↓
Designation      Identity
   ↓               ↓
Taste            Curatorial
Classification   Philosophy
```

The two systems may share:

* evidence
* signal infrastructure
* scoring infrastructure
* archive statistics
* derived traits

They must not collapse into the same conceptual layer.

---

# 22. Phase 1 Outcome

The Phase 1 conceptual decision is:

> **Designations classify recognizable taste patterns. Identities synthesize broader curatorial philosophies from multiple signals and potentially multiple taste patterns.**

The current Identity catalog is:

1. Interpretive Philosophy
2. Exploratory Philosophy
3. Breadth Philosophy

The current Designation catalog remains:

1. Boundary Explorer
2. Curator
3. Engagement Architect
4. Deep Diver

The immediate implementation consequence is not a subsystem rewrite.

The consequence is that the existing implementation must accurately represent these semantic responsibilities.

The current Identity fixtures, scoring behavior, eligibility rules, ranking behavior, and tests now implement this reconciled catalog.

Further changes should follow explicit conceptual decisions rather than precede them.
