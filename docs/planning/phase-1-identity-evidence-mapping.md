# Phase 1 — Identity Evidence Mapping

**Status:** Reconciled against the current Identity ontology and fixture contract
**Phase:** Phase 1 — Intelligence Alignment
**Purpose:** Record the evidence rationale behind the current Identity catalog without redefining implementation policy.

---

## 1. Purpose

This document maps the current Identity concepts against the evidence actually available in the Media Tracker implementation.

The purpose is to determine:

- which signals genuinely support each Identity
- which signals are supporting or proxy evidence
- which signals overlap excessively
- which signals represent taste rather than curatorial orientation
- which current derived traits provide legitimate but limited evidence
- which evidence should not independently establish an Identity
- where the current implementation cannot directly observe the intended concept
- whether the surviving Identity concepts can coexist without collapsing into the same conclusion

This is an **evidence rationale document**, not an implementation plan.

The authoritative conceptual Identity definitions are established by:

- `phase-1-identity-fixture-contract.md`
- `phase-1-decision-and-implementation-map.md`

No fixture, scoring rule, derived trait, or API implementation should be changed solely because of this document.

---

# 2. Current Identity Scoring Architecture

Identity scoring follows this conceptual pipeline:

```text
Archive Profile
      ↓
Universal / Media Signals
      ↓
Derived Traits
      ↓
Fixture-defined Identity Signals
      ↓
Normalization
      ↓
Weighted Contributions
      ↓
Identity Score
      ↓
Ranking / Resolution
      ↓
Explanation
```

Each Identity defines weighted signals.

For each signal, the implementation resolves an available value, normalizes it using the existing Identity normalization behavior, applies the fixture-defined weight, and records the resulting contribution.

The resulting breakdown exposes:

- trait
- value
- weight
- normalized value
- contribution

This architecture is intentionally preserved.

The current conceptual question is primarily:

> **What does each Identity legitimately mean when those signals contribute to it?**

The scoring machinery itself is not being redesigned by this document.

---

# 3. Evidence Classification

Identity evidence is classified into four categories.

## 3.1 Direct Evidence

A signal that directly measures a meaningful component of the Identity concept.

Examples:

- Depth as evidence relevant to Interpretive Philosophy
- Genre Diversity as observable evidence relevant to Breadth Philosophy

Direct evidence still does not automatically prove the complete Identity.

---

## 3.2 Supporting Evidence

A signal that meaningfully strengthens an Identity interpretation but is insufficient by itself.

Examples:

- Emotional Impact for Interpretive Philosophy
- Originality for Exploratory Philosophy
- Media-type breadth for Exploratory Philosophy

---

## 3.3 Proxy Evidence

A signal that correlates with the intended concept but measures something adjacent rather than the concept itself.

Examples:

- Experimental Affinity as contextual evidence for Exploratory Philosophy
- Analysis as a genre-derived proxy for interpretive orientation
- Ambiguity as a genre-derived proxy for interpretive orientation

Proxy evidence must never be presented as direct observation of behavior that the system does not actually measure.

---

## 3.4 Insufficient Evidence

A signal may correlate with an Identity without meaningfully establishing it.

Examples:

- archive size alone does not establish Breadth
- high average score alone does not establish Interpretive orientation
- experimental media alone does not establish Exploration
- one dominant genre does not establish any Identity by itself

---

# 4. Interpretive Philosophy

## 4.1 Concept

**Interpretive Philosophy** describes a recurring orientation toward meaning-making, examination, ambiguity, reflection, and deeper understanding of media.

Its core question is:

> **How do you engage with what you consume?**

The concept is not simply:

> “likes deep media.”

It describes an archive in which interpretation itself appears to be a recurring characteristic of the curator's relationship with media.

The system cannot directly observe private interpretation or reflection. It therefore infers this orientation from repeated observable taste patterns.

---

## 4.2 Evidence

### Depth

**Classification:** Direct / strongest available evidence

Depth is the strongest current observable component of Interpretive Philosophy.

However:

> **Depth alone does not establish Interpretive Philosophy.**

---

### Emotional Impact

**Classification:** Supporting evidence

Emotional Impact can strengthen an interpretation-oriented profile when combined with deeper interpretive signals.

It is not inherently interpretive and should not independently establish the Identity.

---

### Analysis

**Classification:** Proxy evidence

The current implementation derives Analysis from psychological and mystery genre prevalence.

This provides contextual evidence associated with analytical material, but does not directly observe analytical behavior.

---

### Ambiguity

**Classification:** Proxy evidence

Ambiguity is derived from psychological, mystery, and surreal genre prevalence.

It provides evidence that the archive favors media containing unresolved or ambiguous meaning.

It does not prove that the curator personally interprets that ambiguity.

---

### Reflection

**Classification:** Proxy evidence

Reflection is currently derived from drama and psychological genre prevalence.

It provides contextual evidence for reflective material but does not directly observe reflective engagement.

---

## 4.3 Evidence Strength

Interpretive Philosophy has the strongest current conceptual alignment between Identity concept and available evidence.

The evidence hierarchy is:

```text
Depth
  ↓
Strongest direct evidence

Emotional Impact
  ↓
Supporting evidence

Analysis / Ambiguity / Reflection
  ↓
Genre-derived proxy evidence
```

The proxy signals are correlated because they draw upon overlapping genre prevalence.

Therefore:

> **Multiple proxy signals must not be treated as multiple independent discoveries of interpretation.**

The signals can remain useful without pretending that they are independent measurements.

---

## 4.4 Negative-Space Guardrails

The following should not independently establish Interpretive Philosophy:

- high average score
- emotional impact alone
- psychological genre prevalence
- mystery genre prevalence
- surreal genre prevalence
- depth alone
- experimental media
- originality
- engagement
- craft
- archive size
- genre count
- media-type diversity

These may provide context, but none is synonymous with interpretation.

---

## 4.5 Explanation Guardrail

The system should not claim:

> “You analyze media deeply.”

when the evidence actually demonstrates:

> “Your archive repeatedly contains patterns associated with analytical and interpretive material.”

The second statement accurately represents the evidence boundary.

---

## 4.6 Relationship to Deep Diver Designation

The concepts may share evidence while producing different conclusions.

**Deep Diver Designation:**

> The archive favors deep, layered, emotionally involving experiences.

**Interpretive Philosophy:**

> The archive suggests a recurring orientation toward interpretation, reflection, ambiguity, and meaning-making.

Therefore:

> **Shared evidence is acceptable. Shared conclusion is not.**

---

# 5. Exploratory Philosophy

## 5.1 Concept

**Exploratory Philosophy** describes a recurring orientation toward extending beyond established territory and engaging with unfamiliar areas.

Its core question is:

> **How do you relate to the boundaries of what you consume?**

The concept is not simply:

> “likes weird things.”

The system currently observes characteristics associated with exploration more reliably than it observes exploration itself.

---

## 5.2 Evidence Hierarchy

### Originality

**Classification:** Supporting evidence

Originality indicates attraction toward distinctive or unconventional experiences.

It is relevant to exploration but does not directly establish movement beyond established taste.

---

### Genre Diversity

**Classification:** Supporting evidence

Genre diversity demonstrates engagement with multiple areas of the media landscape.

It is relevant to exploration but is also the primary observable evidence for Breadth Philosophy.

Therefore it must not be interpreted as direct proof of exploratory behavior.

---

### Media-Type Breadth

**Classification:** Supporting evidence

Engagement across media types may indicate movement beyond an established medium.

It is contextual evidence, not proof of exploration.

---

### Experimental Affinity

**Classification:** Proxy / contextual evidence

Experimental Affinity indicates attraction toward experimental media.

It overlaps with Boundary Explorer Designation and therefore cannot independently establish Exploratory Philosophy.

---

### Novelty

**Classification:** Proxy / contextual evidence

Novelty currently derives from substantially the same experimental-genre basis as Experimental Affinity.

It should therefore not be treated as an independent strong measurement of exploration.

---

### Depth

**Classification:** Weak supporting context

Depth may accompany exploration but does not demonstrate that movement beyond established territory occurred.

---

## 5.3 Evidence Limitation

The current system does not directly observe:

- chronological expansion of taste
- deliberate seeking of unfamiliar experiences
- discovery behavior
- movement from established preferences into new territory
- abandoned experiments
- changing taste boundaries
- explicit curiosity or intent

Therefore:

> **Exploratory Philosophy is an inferred orientation, not a direct measurement of intentional exploration.**

A high score should be interpreted as:

> “The archive contains several patterns consistent with an exploratory orientation.”

It should not be interpreted as:

> “The curator deliberately seeks unfamiliar experiences.”

---

## 5.4 Signal Duplication Constraint

Experimental Affinity and Novelty currently share substantially overlapping underlying evidence.

Therefore:

> **A single underlying observation must not become multiple independent copies of the same conclusion.**

Similarly:

- Experimental Affinity should not independently prove exploration.
- Novelty should not independently prove exploration.
- Genre Diversity should not simultaneously become direct proof of both Breadth and Exploration.
- Originality should not independently prove exploration.

The scoring architecture may use overlapping evidence.

The interpretation must remain distinct.

> **Evidence can overlap. Meaning cannot.**

---

## 5.5 Negative-Space Guardrails

The following should not independently establish Exploratory Philosophy:

- high experimental-media prevalence
- high originality
- high novelty
- high genre diversity
- high media-type diversity
- high depth
- high emotional impact
- high craft
- high engagement
- high average score
- large archive size
- strong psychological affinity
- strong horror affinity
- strong surreal affinity
- any single dominant genre
- any single dominant media type

---

## 5.6 Breadth vs. Exploration

**Breadth Philosophy** asks:

> **How wide is the territory you consume?**

**Exploratory Philosophy** asks:

> **How do you relate to the boundaries of that territory?**

Examples:

| Archive pattern                                       | Breadth          | Exploration      |
| ----------------------------------------------------- | ---------------- | ---------------- |
| Large archive concentrated in one familiar genre      | Low              | Uncertain        |
| Small archive spanning many genres                    | Potentially high | Uncertain        |
| Broad archive without evidence of expansion           | High             | Uncertain        |
| Narrow archive with movement into unfamiliar subareas | Low–moderate     | Potentially high |
| Broad archive repeatedly extending into new territory | High             | Strong candidate |

The current system measures the resulting range substantially better than movement through that range.

---

## 5.7 Relationship to Boundary Explorer Designation

**Boundary Explorer Designation** describes attraction to unconventional or boundary-pushing media.

**Exploratory Philosophy** describes the broader relationship with unfamiliar territory.

Therefore:

> **Boundary Explorer describes attraction to unconventional territory.**

> **Exploratory Philosophy describes a tendency to venture beyond established territory.**

The two may coexist, but they are not synonyms.

---

# 6. Breadth Philosophy

## 6.1 Concept

**Breadth Philosophy** describes a recurring relationship with variety across the media landscape.

Its core question is:

> **How wide is the territory you consume?**

The Identity concerns observable archive range rather than a claim about motivation.

---

## 6.2 Primary Evidence

### Genre Diversity

**Classification:** Primary observable evidence

Genre Diversity is the strongest current measurable representation of Breadth Philosophy.

The current fixture intentionally uses it as the sole weighted Identity signal.

This is conceptually defensible because the Identity concerns the range represented in the archive.

---

## 6.3 Supporting Context

Potential contextual evidence includes:

- media-type breadth
- archive composition
- distribution across genres
- concentration

However, these should not be interpreted as independent proof of intentional variety.

---

## 6.4 Archive Size

Archive size is **contextual only**.

A large archive may provide more opportunity for breadth but does not itself demonstrate breadth.

Therefore:

> **Archive size must not independently establish Breadth Philosophy.**

---

## 6.5 Evidence Limitation

The system can observe:

> “This archive is broad.”

It cannot necessarily observe:

> “This curator intentionally seeks breadth.”

The Identity should therefore favor observable archive structure.

---

# 7. Cross-Identity Evidence Rules

The following rule governs all three current Identities:

> **Shared evidence is acceptable when Identities interpret that evidence differently. Shared evidence should not become multiple independent copies of the same conclusion.**

### Interpretive

Meaning and interpretation.

### Exploratory

Relationship with unfamiliarity and boundaries.

### Breadth

Range and variety of territory.

The same archive may legitimately score highly in all three.

That is not a classification failure.

---

# 8. Evidence Gaps

The current system does not directly observe:

- intent
- curiosity
- exploration trajectory
- written interpretation
- post-consumption reflection
- deliberate diversification
- changing taste boundaries

These gaps are legitimate limitations.

Phase 1 should not invent new metrics merely to eliminate them.

Examples of metrics that should **not** be invented solely to satisfy this document:

- `exploration_rate`
- `curiosity_score`
- `interpretation_rate`
- `taste_expansion`
- intentionality scores
- trajectory scores

Such concepts belong to a future evidence-model decision if the product eventually gains the required source data.

---

# 9. Current Evidence Contract

| Identity                | Strongest observable evidence | Supporting evidence                      | Proxy/context                   |
| ----------------------- | ----------------------------- | ---------------------------------------- | ------------------------------- |
| Interpretive Philosophy | Depth                         | Emotional Impact                         | Analysis, Ambiguity, Reflection |
| Exploratory Philosophy  | Originality / Genre Diversity | Media-Type Breadth, Depth                | Experimental Affinity, Novelty  |
| Breadth Philosophy      | Genre Diversity               | Media-Type Breadth / Archive Composition | Archive Size as context only    |

This table describes evidence interpretation.

It does not supersede the fixture contract's finalized weights.

---

# 10. Final Principle

The evidence model should remain honest about what the archive actually demonstrates.

> **Observable taste patterns may support an inferred curatorial orientation, but they must not be presented as direct observations of intent or internal behavior.**

And:

> **Evidence can overlap. Meaning cannot.**
