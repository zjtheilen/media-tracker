# Media Tracker — Intelligence Contract v1

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Status:** Working conceptual contract — reconciled through Phase 1
**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

The Intelligence Layer transforms raw media records into increasingly useful, explainable descriptions of the archive.

It should answer:

1. What qualities are strongly represented?
2. What kinds of media does the archive repeatedly respond to?
3. What recurring patterns can be directly demonstrated?
4. What do those patterns suggest?
5. What recognizable taste classifications fit the archive?
6. What broader curatorial philosophies does the archive suggest?
7. What evidence supports those conclusions?
8. What measurable signals may eventually inform recommendations?

The Intelligence Layer must remain:

- explainable
- evidence-oriented
- modular
- deterministic where deterministic behavior is required
- honest about evidence limitations

---

# 2. Foundational Architecture

The intelligence systems operate as parallel analytical perspectives over shared archive data.

Conceptually:

```text
                     RAW ARCHIVE
                          │
                ┌─────────┴─────────┐
                ↓                   ↓
             TRAITS          GENRE SIGNALS
                │                   │
                └─────────┬─────────┘
                          │
      ┌──────────┬────────┼──────────┬──────────┐
      ↓          ↓        ↓          ↓          ↓
OBSERVATIONS  FINDINGS  DESIGNATIONS IDENTITIES NARRATIVE
      │          │        │          │
      └──────────┴────────┴──────────┘
                         │
                         ↓
                 ARCHIVE PROFILE
                         │
                         ↓
              RECOMMENDATION SIGNALS
                         │
                         ↓
              RECOMMENDATION ENGINE
```

This is a conceptual relationship diagram, not a mandatory runtime call graph.

---

# 3. Core Principles

## 3.1 Evidence Before Interpretation

The system should distinguish between:

- direct measurements
- derived signals
- recurring observations
- interpretive findings
- taste classifications
- broader curatorial orientations

---

## 3.2 Parallel Systems Stay Parallel

Observations, Findings, Designations, and Identities may share evidence without becoming one hierarchy.

Similarity of inputs does not imply similarity of purpose.

---

## 3.3 Explainability

Every important conclusion should have an understandable answer to:

> **Why does the system think this?**

The exact evidence representation may differ between subsystems.

There is intentionally no universal evidence schema.

---

# 4. Signal Strength

**Signal Strength** means:

> **How strongly is a quality or pattern represented in the available archive evidence?**

Signal Strength is not automatically:

- confidence
- certainty
- probability
- Data Sufficiency

A numerical score must therefore have a defined semantic meaning.

---

# 5. Data Sufficiency

**Data Sufficiency** means:

> **Whether enough archive data exists to evaluate a conclusion meaningfully.**

Data Sufficiency is not the same as Signal Strength.

An archive may contain a strong measurable signal while still lacking enough data for a particular Identity to be eligible.

---

# 6. Evidence Strength

**Evidence Strength** means:

> **How strongly the available supporting evidence supports a conclusion under the relevant evidence rule.**

Observation Evidence Strength is specific to the Observation evidence model.

It should not be generalized automatically to Findings, Designations, or Identities.

---

# 7. Classification Confidence

Classification Confidence is a distinct conceptual term.

It is **not currently a generalized active numerical field**.

Historical uses of “confidence” should not be interpreted as proof that Classification Confidence exists as a formal universal subsystem.

Where an existing score actually represents Signal Strength, it should be described accordingly.

---

# 8. Traits

A Trait is a measurable quality represented in the archive.

Examples include:

- originality
- depth
- engagement
- craft
- gameplay mechanics
- thought provocation

Traits answer:

> **What qualities are strongly represented in the data?**

Trait Signal Strength may be represented on the existing 1–10 or normalized scale.

Trait cardinality:

> **MANY**

---

# 9. Genre Signals

Genre Signals describe recurring relationships between the archive and genres or media categories.

They may represent:

- affinity
- prevalence
- frequency
- combinations
- cross-media relationships

Genre Signals answer:

> **What kinds of media does the archive repeatedly respond to?**

Genre Signal cardinality:

> **MANY**

---

# 10. Observations

An Observation is a recurring pattern that can be directly demonstrated from available evidence.

Observation answers:

> **What recurring pattern can we directly demonstrate?**

Observations should remain relatively close to their supporting evidence.

Existing structured evidence such as metric and genre evidence should be preserved.

The current public Observation field is `evidenceStrength`.

Historical `confidence` terminology has been migrated at the API/presentation level.

Observation cardinality:

> **MANY**

---

# 11. Findings

A Finding is an interpretive conclusion about what available evidence suggests.

Finding answers:

> **What does the evidence suggest?**

Findings should add meaningful interpretation beyond simply restating:

- an Observation
- a Trait
- a Genre Signal
- a raw metric

Findings may remain independently evaluated from Observations.

They are not required to form an Observation → Finding runtime pipeline.

Finding cardinality:

> **MANY**

Current Finding work remains governed by the Phase 1 Decision & Implementation Map.

---

# 12. Designations

A Designation is a named taste classification.

Designation answers:

> **What recognizable taste classification fits this archive?**

Current Designations:

- Boundary Explorer
- Engagement Architect
- Deep Diver
- Curator

Multiple Designations may be scored internally.

Profile cardinality:

> **ONE PRIMARY Designation**

Designation Score measures fit to the classification.

It is not automatically Classification Confidence.

Designation metadata may include:

- traits
- associated genres
- recommendation bias
- designation basis

---

# 13. Designation Basis

`designationBasis` is a concise summary of dominant classification signals.

It is not an exhaustive enumeration of every condition used by every Designation rule.

The backend is authoritative.

Frontend code must not independently recreate backend classification-basis logic.

The obsolete duplicate frontend producer has been removed.

---

# 14. Identities

An Identity is a broader curatorial philosophy synthesized from multiple signals and taste patterns.

Identity answers:

> **What broader relationship does this archive suggest the curator has with media?**

The current Identity boundary is:

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

Therefore:

> **Designation = What do you tend to like?**

> **Identity = What relationship do you tend to establish with what you like?**

An Identity must not merely rename, restate, or reweight a Designation.

---

# 15. Current Identity Catalog

The current Identity catalog is:

### Interpretive Philosophy

> Engages with media through depth, reflection, complexity, and interpretation.

Core observable evidence:

- depth
- emotional impact
- reflection
- ambiguity
- analysis

Minimum entries:

> 20

---

### Exploratory Philosophy

> Extends beyond established preferences through engagement with unfamiliar territory.

Core observable evidence:

- originality
- genre diversity
- depth
- experimental affinity
- novelty

Minimum entries:

> 20

The evidence supports an exploratory interpretation but does not directly establish deliberate exploration.

---

### Breadth Philosophy

> Engages with a wide range of genres and areas of the media landscape.

Core observable evidence:

- genre diversity

Minimum entries:

> 15

Breadth describes observable archive range and does not prove intentional diversification.

---

# 16. Identity Evidence Boundary

The current Identity concepts are separated as follows:

| Identity                | Core question                                            |
| ----------------------- | -------------------------------------------------------- |
| Interpretive Philosophy | How do you engage with what you consume?                 |
| Exploratory Philosophy  | How do you relate to the boundaries of what you consume? |
| Breadth Philosophy      | How wide is the territory you consume?                   |

The governing evidence rule is:

> **Evidence can overlap. Meaning cannot.**

---

# 17. Identity Eligibility and Ranking

Identity resolution follows:

```text
Data Sufficiency
      ↓
Eligibility
      ↓
Score
      ↓
Ranking
      ↓
Presentation
```

Fixture-defined `minimum_entries` values act as eligibility gates.

Current minimums:

| Identity                | Minimum Entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

Eligible Identities are scored using their fixture-defined weighted signals and existing normalization.

The scoring architecture is preserved.

---

# 18. Primary Identity

The Profile presents:

> **ONE PRIMARY Identity**

The Primary Identity is the highest-ranked eligible Identity under the current deterministic resolution policy.

Exact-score ties are resolved deterministically through the existing contribution-evidence ordering.

Tie resolution does not create additional score.

No co-primary Identity is currently used.

---

# 19. Secondary Identities

The system may present:

> **ZERO OR MORE meaningful Secondary Identities**

Current implementation defines meaningful secondary eligibility using:

- eligible Identity
- non-primary Identity
- score meeting the current threshold
- existing deterministic ordering

The current threshold is:

> `SECONDARY_MIN_SCORE = 0.60`

This is a presentation/resolution rule.

It is not part of the Identity scoring formula.

No arbitrary near-tie threshold is currently used.

---

# 20. Identity Explanation

Identity explanations expose the contribution breakdown.

Each contribution records:

- trait
- value
- weight
- normalized value
- contribution

This is important because the Identity Score alone does not explain why an Identity ranked highly.

The current top-three representation means:

> **Top contributing Identity signals**

It should not be described as an exhaustive list of all evidence.

---

# 21. Recommendations

`recommendation_bias` is preserved as recommendation-oriented metadata.

It is not:

- Recommendation Score
- Recommendation Confidence
- a completed Recommendation Engine

The Recommendation Engine remains future work.

---

# 22. Empty and Sparse Archives

Empty archives are valid.

Sparse archives are valid.

Established archives are valid.

The system must distinguish:

> **Signal Strength**

from:

> **Data Sufficiency**

An empty archive should not imply negative preference.

An insufficient archive should not be forced into an unjustifiably strong Identity conclusion.

Empty intelligence collections are valid established behavior.

---

# 23. Recovered Behavioral Contracts

The existing test suite establishes several behaviors not fully specified by the original Intelligence Contract.

Unless a direct conflict with the contract is identified, these behaviors are protected during Phase 1:

- Trait normalization uses a floor at 6 and reaches maximum strength at 10.
- Identity scoring uses fixture-defined weighted traits.
- Identity scoring supports derived traits.
- Identity minimum-entry requirements act as eligibility gates.
- Empty profiles produce zero Identity scores.
- Primary Identity is the highest-ranked eligible Identity.
- Designations are ranked by score descending.
- Designation metadata includes traits, genres, and recommendation bias.
- Identity explanations expose contribution breakdowns and top contributing signals.
- Observation evidence uses structured metric/genre evidence.
- Designations are not represented as Findings.
- Generalist archives are not expected to strongly match an Identity.
- Existing recommendation-bias metadata is preserved.
- Empty intelligence collections return empty results where currently established.

These behaviors may be clarified or deliberately changed only when Phase 1 identifies a direct conceptual conflict or an explicit accepted design decision requires it.

---

# 24. Normalization Boundaries

The project contains multiple normalization behaviors.

They must not be referred to generically as “the normalization function.”

Trait normalization and Identity normalization have different semantics.

This distinction is part of the recovered behavioral contract.

Phase 1 should preserve those behaviors unless an explicit conceptual decision requires otherwise.

---

# 25. What Phase 1 Does Not Invent

Phase 1 does not invent:

- Classification Confidence math
- Finding Confidence
- Identity Confidence
- Recommendation Confidence
- universal evidence schema
- arbitrary near-tie thresholds
- Intent metrics
- exploration trajectory metrics
- intentionality scores
- personality diagnoses
- ML classification
- probabilistic classification
- a new recommendation algorithm

---

# 26. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Terminology alignment is therefore a controlled evolution of the existing Media Tracker architecture, not a justification for rewriting it.

**Principle:** Establish the semantic contract first. Align terminology and implementation to that contract without changing behavior unless an explicit conceptual decision requires the change.
