# Phase 1 — Identity Specification

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Phase:** Phase 1 — Intelligence Alignment
**Status:** Historical conceptual specification — superseded by the Phase 1 Identity Fixture Contract

> **Authority:** This document records the conceptual specification developed before the Identity catalog was finalized and implemented. It remains valuable as design history. Where it conflicts with the current Identity Fixture Contract, accepted fixture definitions, or implemented Phase 1 behavior, those later artifacts take precedence.

---

# 1. Purpose

The Identity layer exists to describe the **broader curatorial philosophy represented by an archive**.

It answers a different question from Designation.

> **Designation:** What recognizable taste classification fits this archive?

> **Identity:** What broader relationship with media does this archive demonstrate?

Identity is therefore interpretive rather than merely classificatory.

It should synthesize recurring archive signals into a meaningful description without pretending to know more about the person than the archive can demonstrate.

---

# 2. Conceptual Boundary

Identity must not become:

- a personality diagnosis
- a clinical classification
- a permanent statement about the user
- a Designation under another name
- a recommendation category
- a single favorite genre
- a single high-scoring Trait

The system describes the archive.

It does not claim to describe the complete person behind the archive.

---

# 3. Identity vs Designation

This distinction is mandatory.

| Layer       | Core question                                                    |
| ----------- | ---------------------------------------------------------------- |
| Designation | What recognizable taste classification fits?                     |
| Identity    | What broader curatorial philosophy does the archive demonstrate? |

A Designation is relatively atomic.

An Identity is broader and synthesized.

A Designation can say:

> **This archive fits a recognizable taste pattern.**

An Identity can say:

> **This archive demonstrates a recurring way of engaging with media.**

The two may share evidence.

They may not become conceptually redundant.

---

# 4. Evidence Can Overlap

Identity and Designation may use the same underlying signals.

For example:

- originality may support a boundary-oriented Designation
- originality may support Exploratory Philosophy
- depth may support a depth-oriented Designation
- depth may support Interpretive Philosophy
- genre diversity may support a broad Designation
- genre diversity may support Breadth Philosophy

The distinction comes from interpretation.

> **Evidence can overlap. Meaning cannot.**

---

# 5. Observable Evidence vs Inferred Orientation

The archive contains measurable information.

Examples:

- ratings
- universal averages
- media-specific averages
- genre distribution
- derived signals
- archive composition

These are observations about the archive.

An Identity may infer a broader orientation from repeated patterns.

That inference must remain proportional to the evidence.

The system should distinguish:

### Direct evidence

A signal directly represented in the archive.

### Supporting evidence

A signal that meaningfully reinforces an Identity interpretation.

### Proxy evidence

A derived or indirect signal that can support an interpretation but does not directly measure it.

### Insufficient evidence

A concept for which the current archive model does not provide enough support.

The system must not convert proxy evidence into certainty merely because the scoring engine can calculate a number.

---

# 6. Data Sufficiency

Identity eligibility and Identity strength are separate concepts.

An Identity may require a minimum amount of archive data before it can reasonably be evaluated.

The current accepted fixture requirements are:

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Breadth Philosophy      |              15 |
| Exploratory Philosophy  |              20 |
| Interpretive Philosophy |              20 |

Below the minimum requirement, the Identity is **ineligible for Identity resolution**.

Eligibility is not the same thing as Identity Score.

---

# 7. Identity Score

Identity Score measures how strongly an eligible archive fits the Identity represented by a fixture.

The existing architecture:

```text
Identity fixture
      ↓
identity weights
      ↓
resolve signal values
      ↓
normalize
      ↓
weighted contributions
      ↓
sum contributions
      ↓
Identity Score
```

The current Identity normalization mechanism maps the working 0–10 signal scale to a 0–1 normalized value:

```text
normalized = clamp(value / 10, 0, 1)
```

Each contribution is:

```text
contribution = normalized × fixture weight
```

The Identity Score is the sum of the contributions.

This scoring architecture is preserved by Phase 1.

---

# 8. Signal Strength vs Data Sufficiency

The terminology distinction is important.

### Signal Strength

How strongly is a characteristic expressed?

### Data Sufficiency

Does the archive contain enough data to evaluate the Identity?

### Classification Confidence

How clearly does one candidate beat competing candidates?

These are not interchangeable.

The current Identity Score is a fit/strength measure.

The current minimum-entry mechanism establishes eligibility and Data Sufficiency.

A separate Classification Confidence algorithm is **not required merely because the conceptual vocabulary contains the term**.

Phase 1 should not invent one unless a specific feature requires it.

---

# 9. Current Identity Catalog

The Identity specification ultimately converged on three concepts.

## 9.1 Interpretive Philosophy

Interpretive Philosophy describes engagement with media through:

- depth
- reflection
- ambiguity
- analysis
- emotional impact
- complexity
- interpretation

Core question:

> **How do you engage with what you consume?**

The Identity should represent meaning-making and interpretation rather than simply preference for deep media.

---

## 9.2 Exploratory Philosophy

Exploratory Philosophy describes engagement with:

- unfamiliar territory
- novelty
- contrast
- boundary expansion
- unusual experiences

Core question:

> **How do you relate to the boundaries of what you consume?**

The Identity must not claim deliberate exploration when the evidence only demonstrates unusual or diverse taste.

---

## 9.3 Breadth Philosophy

Breadth Philosophy describes the range of territory represented in the archive.

Core question:

> **How wide is the territory you consume?**

Breadth is an observable property of archive composition.

It does not automatically establish deliberate diversification.

---

# 10. Historical Construction / Systems Candidate

Construction / Systems Philosophy was evaluated as a possible Identity.

It concerned appreciation for:

- craft
- engagement
- pacing
- gameplay mechanics
- systems
- construction

The concept was ultimately deferred for the initial catalog because the current evidence model does not sufficiently distinguish it from Engagement Architect Designation.

The current `system_design` signal is also strongly derived from gameplay mechanics.

This does not permanently reject the concept.

It means:

> **The current evidence model does not justify promoting the concept into the active Phase 1 catalog.**

---

# 11. Identity Evidence Model

The scoring architecture supports signals from several sources.

## Universal signals

Examples:

- depth
- emotional impact
- originality
- craft
- engagement
- presentation

## Media-specific signals

Examples:

- gameplay mechanics
- world building
- art atmosphere
- prose writing
- character development

## Derived signals

Examples include:

- reflection
- ambiguity
- analysis
- novelty
- experimental affinity
- genre diversity
- system design

The Identity system may consume all three categories.

However, derived signals are proxies where their formulas do not directly measure the conceptual Identity.

---

# 12. Correlated Evidence

Some signals are mathematically or conceptually correlated.

For example:

- novelty and experimental affinity may derive from similar genre information
- analysis, ambiguity, and reflection may draw on overlapping genre patterns
- system design may derive from gameplay mechanics
- genre diversity is derived from archive composition

This does not automatically make the concepts invalid.

However:

> **Correlated signals should not be described as independent proof of the same conclusion.**

Phase 1 therefore preserves the existing derived-trait architecture while documenting these limitations.

No new derived metrics are invented merely to eliminate correlation.

---

# 13. Identity Explanation

Identity should be explainable.

The existing contribution breakdown provides:

- trait/signal
- raw value
- weight
- normalized value
- contribution

The breakdown is sorted by contribution.

This provides an audit trail:

> **Why does the system think this Identity fits?**

The contribution breakdown should remain part of the Identity explanation surface.

It should not be replaced with generic narrative prose.

The current `top_traits` behavior exposes the top three contributing Identity signals.

The precise semantic description is:

> **Top contributing Identity signals.**

---

# 14. Primary Identity

Identity candidates may be evaluated internally as a ranked collection.

The Profile presents:

- one Primary Identity
- zero or more meaningful Secondary Identities

Primary selection remains deterministic.

Conceptually:

```text
eligible Identity candidates
          ↓
deterministic ranking
          ↓
ONE PRIMARY
```

Primary Identity selection must not depend on:

- Designation names
- fixture file order
- filesystem ordering
- incidental catalog ordering

The Primary Identity is the strongest eligible candidate under the current deterministic ranking and selection machinery.

---

# 15. Secondary Identity

The conceptual contract permits zero or more meaningful Secondary Identities.

A Secondary Identity must not be surfaced merely because:

- it has a positive score
- it ranks second
- it exists in the catalog
- it is numerically close to Primary

The current implementation operationalizes meaningfulness with:

```text
eligible
AND
not Primary
AND
Identity Score >= 0.60
```

The current threshold is:

> `SECONDARY_MIN_SCORE = 0.60`

This is an implementation-level presentation rule.

It does not modify Identity Score.

The conceptual requirement is broader:

> A Secondary Identity should have sufficient independent support to justify being presented as an additional curator philosophy.

The implementation threshold should not be mistaken for a universal mathematical definition of conceptual independence.

---

# 16. Tie Behavior

Identity ranking must remain deterministic.

Exact score ties are resolved using the existing contribution-evidence ordering.

The tie mechanism does not introduce additional score.

A tie does not mean that the system has discovered a stronger conceptual distinction than the scoring model itself provides.

No arbitrary near-tie threshold is introduced.

A non-equal score remains a ranked difference.

Secondary presentation is governed by the Secondary Identity meaningfulness policy rather than by a generic near-tie rule.

---

# 17. Identity / Designation Independence

The Identity catalog must remain independently meaningful from Designations.

The previous Identity concepts:

- Boundary Explorer
- Deep Diver
- Engagement Architect

were retired as Identity definitions because they substantially duplicated Designation concepts.

The replacement catalog does not require abandoning the underlying evidence.

Instead, it interprets shared evidence at a different conceptual level.

---

# 18. Recommendation Bias

Identity fixtures may contain recommendation-bias metadata.

This metadata is descriptive.

It is not itself a recommendation score.

Identity should not become a direct numerical recommendation mechanism.

The future Recommendation Engine should consume measurable signals directly.

Identity may inform recommendation-oriented interpretation indirectly, but Identity labels themselves should not become primary recommendation scores.

---

# 19. Fixture Architecture

Fixture-driven Identity definitions are preserved.

A fixture may contain:

- `id`
- `title`
- `category`
- `icon`
- `description`
- `identity`
- `recommendation_bias`
- `requirements`
- `identity_weights`

The fixture architecture provides:

- controlled vocabulary
- deterministic behavior
- explainability
- easy testing
- controlled evolution

The conceptual Identity catalog may evolve without requiring replacement of the fixture architecture.

---

# 20. Current Fixture-Level Constraints

The following constraints were finalized during Phase 1 and supersede earlier provisional numeric values.

## Interpretive Philosophy

Minimum entries: **20**

| Signal             | Weight |
| ------------------ | -----: |
| `depth`            |   0.45 |
| `emotional_impact` |   0.25 |
| `reflection`       |   0.12 |
| `ambiguity`        |   0.10 |
| `analysis`         |   0.08 |

Total weight: **1.00**

---

## Exploratory Philosophy

Minimum entries: **20**

| Signal                  | Weight |
| ----------------------- | -----: |
| `originality`           |   0.35 |
| `genre_diversity`       |   0.25 |
| `depth`                 |   0.15 |
| `experimental_affinity` |   0.15 |
| `novelty`               |   0.10 |

Total weight: **1.00**

---

## Breadth Philosophy

Minimum entries: **15**

| Signal            | Weight |
| ----------------- | -----: |
| `genre_diversity` |   1.00 |

Total weight: **1.00**

Breadth's single observable signal is intentional at the fixture level.

Because Identity normalization clamps values at 1.0, sufficiently high genre diversity can saturate Breadth Signal Strength.

That is a future calibration question, not a Phase 1 migration defect.

---

# 21. What This Specification Does Not Establish

The following were intentionally not treated as universal conceptual policy:

- a universal Identity scoring algorithm
- new derived traits
- new evidence schemas
- Classification Confidence mathematics
- a universal secondary threshold
- universal near-tie thresholds
- recommendation weighting
- API redesign
- global renaming of every historical `confidence` field
- personality inference
- intentionality claims not supported by evidence
- a fixed permanent Identity catalog size

The accepted fixture-level numeric constraints are documented above because they were explicitly finalized during Phase 1.

---

# 22. Historical vs Current Authority

This document represents the conceptual specification stage that preceded final fixture implementation.

The current authority hierarchy is:

1. `intelligence-contract.md`
2. `phase-1-identity-fixture-contract.md`
3. `phase-1-identity-evidence-mapping.md`
4. current Identity fixtures
5. executable tests
6. this historical specification

This hierarchy prevents historical exploratory language from being mistaken for current implementation policy.

---

# 23. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

The Identity system should therefore evolve through explicit conceptual decisions, not through accidental drift in fixture names, scoring code, or presentation behavior.
