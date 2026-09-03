# Phase 1 — Identity Fixture Contract

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Phase:** Phase 1 — Intelligence Alignment
**Status:** Current conceptual authority — Identity migration complete

---

# 1. Purpose

This document defines the current conceptual and fixture-level contract for the Media Tracker Identity system.

It establishes the accepted Identity ontology, its evidence boundaries, fixture requirements, scoring constraints, and relationship to Designations.

It exists to provide a stable contract between:

- Identity concepts
- Identity fixtures
- Identity scoring
- Identity explanation
- Identity selection
- regression tests
- downstream Profile presentation

This document is authoritative for the current Phase 1 Identity catalog.

---

# 2. Authority

The Identity development sequence is:

```text
Ontology
   ↓
Evidence Contract
   ↓
Fixture Contract
   ↓
Implementation Comparison
   ↓
Implementation Changes
   ↓
Regression Protection
```

The existing Identity fixtures represented an earlier Identity ontology and were therefore not treated as authoritative definitions during the migration.

The migrated fixtures now implement the accepted catalog.

The conceptual authority remains this contract.

In other words:

> **The fixture implements the contract; the fixture does not define the contract.**

---

# 3. Governing Principles

## 3.1 Designation vs Identity

A Designation describes a recognizable **taste classification**.

An Identity describes a broader **curatorial philosophy synthesized from recurring archive signals**.

A useful distinction is:

> **Designation:** What do you tend to like?

> **Identity:** What relationship do you tend to establish with what you like?

Or:

> **Designation:** What recognizable classification fits?

> **Identity:** What broader curatorial orientation does the archive demonstrate?

---

## 3.2 Evidence can overlap. Meaning cannot.

Identity and Designation may legitimately consume the same underlying evidence.

They must not use that evidence to produce the same conceptual conclusion.

Shared evidence is allowed.

Shared conclusion is not.

Shared names are forbidden when they represent the same concept.

---

## 3.3 Observable evidence vs inferred orientation

The archive directly provides measurable signals.

Identity may synthesize those signals into a broader interpretation.

The system must not claim more than the evidence supports.

In particular:

> **A proxy for an orientation is not direct observation of that orientation.**

The current system does not directly observe:

- user intent
- deliberate exploration
- internal thought
- post-consumption reflection
- personality
- psychological diagnosis

Identity language must therefore remain archive-centered and evidence-proportional.

---

# 4. Identity Is Not

Identity is not:

- a personality diagnosis
- a clinical characteristic
- a claim about the user's complete personal identity
- a Designation clone
- a recommendation category
- a single favorite genre
- a restatement of one Trait
- a conclusion derived solely from archive size
- proof of intent where intent is not observed

The system describes what the archive supports.

---

# 5. Current Identity Catalog

The accepted Phase 1 Identity catalog contains exactly three active concepts:

1. **Interpretive Philosophy**
2. **Exploratory Philosophy**
3. **Breadth Philosophy**

The catalog is intentionally small and differentiated.

This does not permanently prohibit future Identity concepts.

A future concept must earn inclusion through conceptual differentiation and evidence support rather than being added merely to increase variety.

---

# 6. Interpretive Philosophy

## 6.1 Definition

Interpretive Philosophy describes a curator whose engagement with media is characterized by:

- depth
- reflection
- complexity
- ambiguity
- analysis
- interpretation

The Identity concerns **meaning-making and engagement with ideas**.

## 6.2 Core question

> **How do you engage with what you consume?**

## 6.3 Conceptual boundary

Interpretive Philosophy is not simply:

- liking deep media
- liking psychological media
- liking mystery
- liking ambiguous endings
- having high emotional impact
- having a high analysis signal

Those can be evidence.

They are not the Identity itself.

## 6.4 Accepted evidence

### Primary / strongest signal

- `depth`

### Supporting signals

- `emotional_impact`
- `reflection`
- `ambiguity`
- `analysis`

Some of these are derived or proxy signals.

They should therefore be treated as supporting evidence rather than independent direct observations of interpretation.

## 6.5 Evidence limitation

The archive does not directly observe a curator's thoughts or reflective process.

Interpretive Philosophy is therefore an inference from repeated archive patterns.

The system must not represent it as psychological fact.

---

# 7. Exploratory Philosophy

## 7.1 Definition

Exploratory Philosophy describes a curator whose archive demonstrates engagement with:

- unfamiliar territory
- novelty
- contrast
- boundary expansion
- experiences beyond established preferences

## 7.2 Core question

> **How do you relate to the boundaries of what you consume?**

## 7.3 Conceptual boundary

Exploratory Philosophy is not simply:

- liking experimental media
- liking unusual media
- having high originality
- having high novelty
- having high genre diversity
- having one unusual work in the archive

These can contribute evidence.

They do not individually prove exploration.

## 7.4 Accepted evidence

### Strongest observable signals

- `originality`
- `genre_diversity`

### Supporting / proxy signals

- `depth`
- `experimental_affinity`
- `novelty`

## 7.5 Evidence limitation

The current archive observes characteristics associated with exploratory behavior more directly than it observes exploration itself.

It does not directly observe:

- deliberate search
- intent
- trajectory through taste space
- conscious boundary testing

Therefore:

> **Exploratory Philosophy must not be interpreted as proof of deliberate exploration.**

---

# 8. Breadth Philosophy

## 8.1 Definition

Breadth Philosophy describes the range of territory represented in the archive.

Its subject is observable archive variety.

## 8.2 Core question

> **How wide is the territory you consume?**

## 8.3 Conceptual boundary

Breadth Philosophy does not automatically mean:

- deliberate diversification
- organization
- collecting
- broad curiosity in every domain
- intentional exploration

It establishes observable range.

## 8.4 Accepted evidence

### Primary observable signal

- `genre_diversity`

Other archive composition information may provide context, but the current fixture uses genre diversity as its formal Identity signal.

## 8.5 Evidence limitation

Genre diversity demonstrates range.

It does not directly establish the curator's motivation for that range.

---

# 9. Cross-Identity Boundary

The three Identities answer different questions:

| Identity                | Core question                                            |
| ----------------------- | -------------------------------------------------------- |
| Interpretive Philosophy | How do you engage with what you consume?                 |
| Exploratory Philosophy  | How do you relate to the boundaries of what you consume? |
| Breadth Philosophy      | How wide is the territory you consume?                   |

These concepts can legitimately coexist.

An archive may be:

- highly Interpretive
- highly Exploratory
- highly broad

without contradiction.

Identity differentiation does not require exclusivity.

---

# 10. Negative Space

## 10.1 Interpretive Philosophy must not independently become strong merely because of:

- high average score
- emotional impact alone
- psychological genre prevalence
- mystery prevalence
- surreal prevalence
- depth alone
- originality
- experimental media
- engagement
- craft
- archive size
- genre count
- media-type diversity

Those may be context or supporting evidence, but none is sufficient by itself to establish the Interpretive conclusion.

---

## 10.2 Exploratory Philosophy must not independently become strong merely because of:

- experimental media
- originality alone
- novelty alone
- genre diversity alone
- depth
- emotional impact
- craft
- engagement
- average score
- large archive
- psychological media
- horror
- surreal media
- any single genre
- any single media type

Exploration is a broader interpretation of recurring relationship with unfamiliar territory.

---

## 10.3 Breadth Philosophy must not independently become strong merely because of:

- archive size
- originality
- experimental affinity
- novelty
- depth
- emotional impact
- engagement
- craft
- average score
- one dominant genre
- one dominant media type

Archive size is not breadth.

One genre is not breadth.

Breadth requires observable variety.

---

# 11. Evidence Hierarchy

Identity evidence should be understood through four levels.

## Direct

The signal directly measures or closely represents the Identity concept.

## Supporting

The signal meaningfully reinforces the Identity but does not independently establish it.

## Proxy

The signal is derived indirectly from available archive data.

It can support interpretation but should not be described as direct observation.

## Insufficient

The current evidence model does not support the claim reliably enough.

The system must not invent metrics simply to move an Identity from insufficient to supported.

---

# 12. Fixture Contract

The current fixture schema contains:

- `id`
- `title`
- `category`
- `icon`
- `description`
- `identity`
- `recommendation_bias`
- `requirements`
- `identity_weights`

The fixture architecture remains fixture-driven and deterministic.

The `identity` field identifies the signals represented by the Identity concept.

The `identity_weights` field defines the signals actually used by the current scoring mechanism.

---

# 12.1 Interpretive Fixture

```text
id:
interpretive_philosophy

title:
Interpretive Philosophy

minimum_entries:
20
```

Weights:

| Signal             | Weight |
| ------------------ | -----: |
| `depth`            |   0.45 |
| `emotional_impact` |   0.25 |
| `reflection`       |   0.12 |
| `ambiguity`        |   0.10 |
| `analysis`         |   0.08 |

Total:

> **1.00**

---

# 12.2 Exploratory Fixture

```text
id:
exploratory_philosophy

title:
Exploratory Philosophy

minimum_entries:
20
```

Weights:

| Signal                  | Weight |
| ----------------------- | -----: |
| `originality`           |   0.35 |
| `genre_diversity`       |   0.25 |
| `depth`                 |   0.15 |
| `experimental_affinity` |   0.15 |
| `novelty`               |   0.10 |

Total:

> **1.00**

---

# 12.3 Breadth Fixture

```text
id:
breadth_philosophy

title:
Breadth Philosophy

minimum_entries:
15
```

Weights:

| Signal            | Weight |
| ----------------- | -----: |
| `genre_diversity` |   1.00 |

Total:

> **1.00**

The single-signal weighting is intentional for the current Phase 1 fixture.

---

# 12.4 Normalization

The existing Identity normalization mechanism is preserved:

```text
normalized = clamp(value / 10, 0, 1)
```

A normalized value is multiplied by its fixture weight.

```text
contribution = normalized × weight
```

Identity Score is the sum of the contributions.

The fixture migration does not introduce a new scoring algorithm.

---

# 12.5 Saturation

Identity normalization permits high raw values to saturate at `1.0`.

This is particularly relevant to derived values such as `genre_diversity`, which may exceed the nominal 0–10 signal scale before normalization.

This is a known calibration characteristic.

It is not a fixture migration defect.

Phase 1 does not redesign the underlying derived-trait formulas merely to eliminate saturation.

---

# 12.6 Minimum Entries

Minimum entries are an **eligibility gate**.

Conceptually:

```text
entry_count < minimum_entries
        ↓
INELIGIBLE
        ↓
excluded from Identity resolution
```

and:

```text
entry_count >= minimum_entries
        ↓
ELIGIBLE
        ↓
score + rank + explanation
```

An ineligible Identity must not become Primary merely because a score could otherwise be calculated.

Eligibility is established before ranking and presentation.

---

# 12.7 Finalized Fixture-Level Numeric Constraints

The following fixture-level numeric constraints are finalized for Phase 1:

| Identity                | Minimum entries | Weights                                                                                 |
| ----------------------- | --------------: | --------------------------------------------------------------------------------------- |
| Interpretive Philosophy |              20 | depth .45, emotional impact .25, reflection .12, ambiguity .10, analysis .08            |
| Exploratory Philosophy  |              20 | originality .35, genre diversity .25, depth .15, experimental affinity .15, novelty .10 |
| Breadth Philosophy      |              15 | genre diversity 1.00                                                                    |

These values are part of the accepted current fixture contract.

They should not be treated as a universal Identity-ranking policy.

---

# 13. Scoring, Ranking, and Selection

Identity eligibility, scoring, ranking, and presentation are distinct.

The current conceptual sequence is:

```text
Data Sufficiency
       ↓
Eligibility
       ↓
Identity Score
       ↓
Ranking
       ↓
Presentation
       ↓
Primary / Secondary selection
```

The scoring architecture remains weighted and explainable.

The Identity migration does not introduce a new ranking algorithm.

---

# 14. Primary Identity

The system may evaluate multiple eligible Identity candidates.

The Profile exposes one Primary Identity.

Conceptually:

```text
eligible candidates
       ↓
deterministic ranking
       ↓
ONE PRIMARY
```

Primary Identity selection must remain independent of:

- Designation naming
- fixture file order
- filesystem order
- incidental catalog order

The current implementation preserves deterministic selection.

Co-primary Identity behavior is not introduced by Phase 1.

---

# 15. Secondary Identity

The conceptual contract permits:

> **ZERO+ meaningful Secondary Identities**

A Secondary Identity must:

- be eligible
- not be Primary
- have sufficient Identity support
- represent an independently meaningful Identity concept

The current implementation operationalizes the presentation rule with:

```text
SECONDARY_MIN_SCORE = 0.60
```

This threshold is an implementation-level presentation rule.

It:

- does not modify Identity Score
- does not modify fixture weights
- does not define conceptual independence
- does not establish a universal classification threshold

A candidate is not surfaced merely because:

- it has a positive score
- it ranks second
- it exists in the catalog
- it is close numerically to Primary

---

# 16. Tie Behavior

Identity ranking is deterministic.

Exact score ties are resolved using the existing contribution-evidence ordering.

The tie mechanism does not create additional scoring evidence.

Therefore:

> **A tie is a presentation-resolution problem, not proof that one Identity has stronger conceptual evidence than another.**

No arbitrary near-tie threshold is introduced.

A non-equal score remains a ranked difference.

Secondary presentation uses the meaningfulness policy rather than a generic near-tie rule.

---

# 17. Contribution Breakdown

Every eligible Identity candidate can expose contribution-level information.

The current breakdown contains:

- `trait`
- `value`
- `weight`
- `normalized`
- `contribution`

Contributions are ordered by contribution strength.

This is an important explanation surface.

It answers:

> **Why does the system think this Identity fits?**

The contribution breakdown should not be replaced with generic prose.

The current top-three presentation represents:

> **Top contributing Identity signals.**

It does not mean “three most important personality traits.”

---

# 18. Data Sufficiency

Data Sufficiency answers:

> **Does the archive contain enough data to evaluate this Identity?**

It is distinct from:

> **How strongly does this archive fit the Identity?**

and from:

> **How clearly does this Identity beat its alternatives?**

The current fixture minimums establish eligibility.

The current implementation also has a separate Data Sufficiency calculation based on archive size relative to the Identity's minimum requirement.

That calculation should not be relabeled as Classification Confidence.

---

# 19. Classification Confidence

Classification Confidence is a valid conceptual distinction:

> **How clearly does one classification beat its alternatives?**

The current Identity system does not need to implement a separate Classification Confidence algorithm merely to satisfy the vocabulary.

Identity Score remains the fit/strength measure.

Data Sufficiency remains the data-availability measure.

Classification Confidence remains a separate future/optional concept unless a specific product requirement requires it.

---

# 20. Recommendation Bias

Identity fixtures may contain recommendation-bias metadata.

Recommendation bias is descriptive recommendation-oriented metadata.

It is not itself a recommendation score.

Identity must not become a direct recommendation scoring mechanism.

The future Recommendation Engine should consume measurable signals directly.

Identity may inform human-readable interpretation of recommendation tendencies, but its label should not be treated as a numeric recommendation factor merely because it exists.

---

# 21. Evidence and Explanation Boundaries

There is no requirement that every intelligence subsystem use one universal evidence JSON schema.

Different systems have different explanation needs.

The requirement is:

> **The system should be able to explain why a conclusion was produced.**

For Identity, the contribution breakdown is the primary existing explanation mechanism.

For Observations, structured evidence remains the appropriate mechanism.

For Designations, lightweight classification evidence may be useful.

For Findings, evidence requirements remain separately scoped.

Identity should not be forced into the Observation evidence model.

---

# 22. Cross-System Boundaries

Identity remains parallel to other intelligence systems.

Conceptually:

```text
                    shared archive signals
                           │
             ┌─────────────┼─────────────┐
             ↓             ↓             ↓
       Designation     Identity     Observation
             │             │             │
             └────── independent conclusions ──────┘
```

Identity is not required to be generated from:

- Findings
- Observations
- Designations

The systems may consume shared underlying signals independently.

This preserves the architecture's parallel analytical model.

---

# 23. Retired Identity Vocabulary

The following concepts are no longer active Identity definitions:

- Boundary Explorer
- Deep Diver
- Engagement Architect

They remain valid Designation concepts where applicable.

The retirement exists because those Identity concepts duplicated the Designation layer rather than expressing a genuinely broader curatorial philosophy.

The underlying signals are not automatically retired.

---

# 24. Deferred Identity Concepts

The following concepts are intentionally deferred:

### Construction / Systems Philosophy

Deferred because current evidence is too closely coupled to Engagement Architect and gameplay-mechanics-derived system signals.

### Connection / Synthesis

Deferred because the archive does not yet capture enough explicit cross-entry relationships.

### Re-engagement / Revisitation

Deferred because explicit revisitation behavior is not sufficiently modeled.

Deferred does not mean rejected permanently.

It means:

> **The current evidence model does not justify promoting the concept now.**

---

# 25. Prohibited Phase 1 Inferences

Phase 1 must not infer:

- personality diagnosis
- clinical traits
- life behavior outside the archive
- deliberate exploration from experimental taste alone
- deliberate diversification from genre diversity alone
- interpretive intent from depth alone
- systems expertise from gameplay scores
- psychological characteristics from genre preference

Identity language must remain tied to the archive.

---

# 26. What Phase 1 Does Not Change

The Identity catalog migration does not require:

- replacing the scoring architecture
- replacing normalization
- replacing contribution breakdowns
- redesigning derived-trait formulas
- inventing new evidence schemas
- introducing Classification Confidence mathematics
- introducing arbitrary near-tie thresholds
- redesigning recommendation scoring
- replacing fixture-driven definitions
- converting Identity into a personality model
- merging Identity with Designation
- requiring Identity to consume Findings or Observations as an intermediate pipeline

The governing principle is minimal alignment.

---

# 27. Implementation Contract

The current Identity implementation is expected to preserve:

- fixture-driven definitions
- canonical `identity_weights`
- minimum-entry eligibility
- normalized weighted scoring
- contribution breakdown
- deterministic ranking
- Primary Identity selection
- Secondary Identity presentation
- Data Sufficiency
- recommendation-bias metadata
- explainability

The migrated fixtures implement the accepted three-Identity catalog.

The current regression suite protects the migrated behavior.

---

# 28. Regression Contract

Identity changes must be protected by tests covering meaningful domain behavior.

The relevant behavioral categories include:

- fixture loading
- trait resolution
- weighted scoring
- derived-trait resolution
- minimum-entry eligibility
- Data Sufficiency
- contribution breakdown
- deterministic ranking
- Primary Identity selection
- Secondary Identity presentation
- tie behavior
- Designation/Identity separation
- empty/sparse behavior
- explanation behavior

The current Phase 1 green baseline is:

> **245 passing tests / 0 failing tests**

The test count itself is not the conceptual contract.

The meaningful requirement is that intentional behavior changes are represented by appropriate regression coverage and that the full suite remains green.

---

# 29. Current Identity Contract Summary

The current system should be understood as:

```text
ARCHIVE
   ↓
shared measurable signals
   ↓
Identity-specific evidence interpretation
   ↓
eligibility
   ↓
weighted Identity Score
   ↓
deterministic ranking
   ↓
Primary Identity
   ↓
meaningful Secondary Identity presentation
   ↓
contribution-based explanation
```

The three current Identity philosophies are:

```text
Interpretive
    ↓
meaning / depth of interpretation

Exploratory
    ↓
relationship with boundaries / unfamiliar territory

Breadth
    ↓
range of represented territory
```

They may overlap in evidence.

They must remain distinct in meaning.

---

# 30. Authority and Future Evolution

This document is the current conceptual authority for the Phase 1 Identity catalog.

Future Identity changes should follow:

```text
new conceptual proposal
        ↓
differentiation test
        ↓
evidence mapping
        ↓
fixture contract update
        ↓
implementation comparison
        ↓
minimal implementation change
        ↓
regression coverage
```

A new Identity should not be added merely because an unused signal exists.

An existing Identity should not be rewritten merely because another formula appears cleaner.

A retired Identity should not be restored merely because its old name remains familiar.

---

# 31. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

The Phase 1 Identity migration therefore represents **controlled semantic evolution**, not a rewrite.

The current Identity ontology, fixture constraints, and implementation are aligned.

Future changes should preserve that alignment by changing the system only when an explicit conceptual decision justifies doing so.
