# Media Tracker — Intelligence Contract v1

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Status:** Working conceptual contract
**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

The Intelligence Layer exists to transform the raw record of media experiences into increasingly useful descriptions of the archive.

It should answer:

1. What qualities are strongly represented in the archive?
2. What kinds of media does the archive repeatedly respond to?
3. What recurring patterns can we directly demonstrate?
4. What do those patterns suggest?
5. What recognizable taste classifications fit the archive?
6. What kind of curator does the archive describe?
7. What evidence supports those conclusions?
8. What measurable signals should eventually inform recommendations?

The Intelligence Layer must remain **explainable, evidence-oriented, and modular**.

No intelligence subsystem should exist merely to produce impressive-sounding prose.

---

# 2. Foundational Architecture

The intelligence systems operate as **parallel analytical perspectives** over shared archive data.

They are not required to form a strict causal pipeline.

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

This diagram represents **conceptual relationships**, not a mandatory runtime call graph.

A subsystem may use shared underlying data without being formally dependent upon another subsystem's generated output.

---

# 3. Core Principles

## 3.1 Evidence Before Interpretation

The system should distinguish between:

- what the data directly demonstrates
- what the data suggests
- what classification the pattern resembles
- what broader curator identity emerges

These are different levels of interpretation.

---

## 3.2 Parallel Systems Stay Parallel

Observations, Findings, Designations, and Identities must not be collapsed into a single hierarchy simply because they consume similar signals.

Similarity of inputs does not mean similarity of purpose.

---

## 3.3 Explainability

Every important interpretive conclusion should have an understandable answer to:

> **Why does the system think this?**

The exact representation may differ by subsystem, but conclusions should not be opaque.

---

## 3.4 Cardinality Is Intentional

The number of results each subsystem may produce is part of its conceptual contract.

```text
Traits
    MANY

Genre Signals
    MANY

Observations
    MANY

Findings
    MANY

Designations
    MANY internally
    ONE PRIMARY on Profile

Identities
    MANY internally
    ONE PRIMARY
    ZERO OR MORE meaningful SECONDARIES
```

---

## 3.5 Scores Are Not Automatically Confidence

A numerical value must have a defined meaning.

A strong trait score does not automatically mean high confidence.

A high designation score does not automatically mean high classification confidence.

An archive containing many entries does not automatically mean a conclusion is certain.

The system must distinguish these concepts.

---

# 4. TRAITS

## Definition

A **Trait** is a measurable quality that is strongly or weakly represented in the archive.

Traits answer:

> **What qualities are strongly represented in the data?**

Examples:

- Originality
- Depth
- Engagement
- Craft
- Gameplay Mechanics
- Thought Provocation
- etc.

The exact trait set may evolve.

---

## Inputs

Traits are derived primarily from measurable archive data, including:

- scoring results
- universal metrics
- media-specific metrics
- other explicitly defined quantitative signals

Genre-related information may contribute to derived traits where appropriate.

---

## Output

Traits should produce a measurable **Signal Strength**.

The current project commonly represents this through a 1–10 or normalized 0–1 value.

---

## Signal Strength

Trait strength means:

> **How strongly is this quality represented in the available archive data?**

It does **not** mean:

> How confident are we that this quality exists?

---

## Cardinality

**MANY.**

An archive may have many meaningful traits.

---

## Role

Traits are foundational measurable signals.

They may inform:

- Observations
- Findings
- Designations
- Identities
- Recommendations

---

## Contract

A Trait should be:

- measurable
- interpretable
- explainable
- sufficiently stable to support downstream systems

Traits should not become arbitrary prose labels.

---

# 5. GENRE SIGNALS

## Definition

A **Genre Signal** describes a recurring relationship between the archive and media genres/types.

Genre Signals answer:

> **What kinds of media does the archive repeatedly respond to?**

Examples:

- Horror affinity
- Sci-fi affinity
- Experimental affinity
- Surreal affinity
- Genre combinations
- Cross-media genre patterns

---

## Possible Measures

Genre intelligence may include:

- presence
- affinity
- frequency
- combinations
- cross-media relationships

The exact metric may differ by signal.

---

## Cardinality

**MANY.**

An archive may have numerous genre signals.

---

## Role

Genre Signals may inform:

- Observations
- Findings
- Designations
- Identities
- Recommendations

---

## Contract

Genre Signals should describe **recurring archive behavior**, not merely list genres that happen to occur once.

---

# 6. OBSERVATIONS

## Definition

An **Observation** is a recurring pattern that can be **directly demonstrated from the available archive evidence**.

Observation answers:

> **What recurring pattern can we directly demonstrate?**

Examples:

### ◈ Boundary Preference

> Your archive repeatedly favors unusual concepts.

Evidence:

> Originality: 8.8/10

### ◈ Systems Affinity

> Your archive repeatedly responds positively to carefully designed systems and mechanics.

Evidence:

> Gameplay Mechanics: 9.6/10

---

## Key Property

Observations should remain relatively close to the evidence.

An Observation should not require a large interpretive leap.

---

## Evidence

Observations should provide structured supporting evidence wherever practical.

Existing evidence mechanisms such as:

- metric evidence
- genre evidence

should be preserved.

---

## Confidence

Observation confidence should describe how strongly the available evidence supports the observation.

It should not simply be a synonym for trait strength or entry count.

---

## Cardinality

**MANY.**

An archive may contain:

- zero observations
- one observation
- several observations
- many observations

---

## Ranking

Observations may be ranked by confidence/evidence strength or another clearly defined relevance measure.

---

## Contract

An Observation should generally satisfy:

```text
Pattern exists
        +
Pattern is directly demonstrable
        +
Evidence can be identified
        ↓
Observation
```

An Observation should **not** simply be a Finding with different wording.

---

# 7. FINDINGS

## Definition

A **Finding** is an interpretive conclusion suggested by one or more pieces of evidence.

Finding answers:

> **What does the available evidence suggest?**

A Finding sits one interpretive level above an Observation.

---

## Observation vs Finding

### Observation

> Your archive repeatedly favors unusual concepts.

### Finding

> Your archive demonstrates a strong preference for experiences that challenge conventional genre boundaries.

The Observation describes what can be demonstrated.

The Finding interprets what that pattern means.

---

## Synthesis

A Finding should be capable of synthesizing:

- multiple Observations
- multiple Traits
- Genre Signals
- other explicitly defined evidence

Example:

```text
Observation A
    Boundary Preference

Observation B
    Experimental Genre Affinity

Observation C
    High Originality

          ↓

Finding

The archive demonstrates a strong preference
for experiences that challenge conventional
genre boundaries.
```

A Finding does not necessarily need multiple Observations, but it should operate at a meaningfully more interpretive level.

---

## Cardinality

**MANY.**

An archive may produce multiple Findings.

---

## Evidence

Findings should eventually provide structured supporting evidence.

The evidence representation does **not** need to be identical to Observation evidence.

The requirement is explainability, not schema uniformity.

---

## Confidence

Finding confidence should reflect how strongly the available evidence supports the interpretation.

Where possible, it should distinguish:

- evidence strength
- data sufficiency
- interpretive/classification confidence

---

## Contract

A Finding should not merely restate an Observation.

The system should ask:

> **What additional meaning does this conclusion provide?**

If the answer is "none," it is probably an Observation rather than a Finding.

---

# 8. DESIGNATIONS

## Definition

A **Designation** is a named taste classification or badge describing a recognizable pattern in the archive.

Designation answers:

> **What recognizable classification does this pattern fit?**

Example:

# ◈ The Boundary Explorer

Possible characteristics:

```text
Traits:
- Originality
- Depth

Genres:
- Experimental
- Surreal
- Sci-Fi
- Horror

Recommendation Bias:
- Unusual concepts
- Genre hybrids
- Experimental storytelling
```

---

## Nature

Designations are **classifications**, not broad curator identities.

They should be recognizable and relatively atomic.

---

## Architecture

Designations may remain fixture/rule driven for stability and explainability.

A designation definition may include:

- ID
- title
- description
- icon
- rule/evaluation logic
- associated traits
- associated genres
- recommendation bias

---

## Ranking

The system may calculate multiple designation scores.

Internally:

**MANY.**

---

## Profile Cardinality

The Profile should present:

**ONE PRIMARY designation.**

Optional:

- close competitors
- ranked alternatives
- scores

may be displayed where useful.

---

## Classification

Designation scoring should answer:

> **How well does this archive fit this classification?**

It should not be confused with Identity.

---

## Evidence

Designations may eventually expose lightweight structured evidence explaining why the designation ranked highly.

This does not need to replicate the Observation evidence model.

---

## Confidence

Current designation "confidence" is effectively derived from trait strength.

That should not be called Classification Confidence.

The system should eventually distinguish:

- Signal Strength
- Classification Confidence
- Data Sufficiency

---

## Contract

A Designation should be:

- recognizable
- distinct from other designations
- evidence-informed
- useful for describing taste
- useful as a recommendation bias

It should not exist merely to increase the number of badges.

---

# 9. IDENTITY

## Definition

An **Identity** is a broader synthesis describing the kind of curator the archive collectively represents.

Identity answers:

> **What kind of curator does all of this make me?**

Example:

> **Systems-Seeking Interpretive Curator**

This may describe someone whose archive demonstrates a combination of:

- systems appreciation
- interpretive depth
- originality
- boundary exploration
- strong engagement
- etc.

---

# 10. IDENTITY VS DESIGNATION

This distinction is mandatory.

### Designation

> **What named taste classification fits me?**

Example:

> ◈ The Boundary Explorer

### Identity

> **What kind of curator am I?**

Example:

> Systems-Seeking Interpretive Curator

They may be related.

They must not be redundant.

---

## Forbidden conceptual outcome

```text
Designation:
Boundary Explorer

Identity:
Boundary Explorer
```

If an Identity is merely a differently formatted Designation, the distinction has failed.

---

# 11. IDENTITY PHILOSOPHY

Identity should describe **curatorial philosophy**, not merely taste categories.

It may synthesize qualities such as:

- what the curator seeks
- what they value
- how they engage with media
- how they respond to systems, ideas, atmosphere, craft, novelty, etc.
- how these tendencies interact

Identity names should therefore be allowed to diverge completely from Designation names.

---

# 12. MULTIPLE IDENTITIES

An archive can demonstrate multiple meaningful curator identities.

Example:

```text
Primary Identity
Systems-Seeking Interpretive Curator

Secondary Identity
Boundary-Driven Explorer

Secondary Identity
Deep Analytical Curator
```

Conceptually:

> You are primarily X, while your archive also strongly exhibits qualities associated with Y and Z.

---

## Cardinality

**MANY internally.**

Profile presentation:

- one Primary Identity
- zero or more meaningful Secondary Identities

Not every low-ranking identity needs to be displayed.

---

## Ranking

The system may maintain ranked identities internally.

Primary/secondary presentation should be based on meaningful relevance rather than arbitrary fixed counts alone.

---

# 13. IDENTITY ARCHITECTURE

Fixture-driven identities are acceptable and should be preserved.

Identity fixtures may contain:

- ID
- title
- category
- icon
- description
- associated traits
- recommendation bias/signals
- minimum data requirements
- scoring weights

The fixture system provides:

- stability
- explainability
- deterministic behavior
- easier testing
- controlled vocabulary

---

# 14. IDENTITY EVIDENCE / EXPLANATION

Identity should be explainable through contribution breakdown.

Example:

```text
Systems-Seeking Interpretive Curator

Major contributions:

Gameplay Mechanics     9.6
Depth                   8.4
Systems Affinity       Strong
Interpretive Depth     Strong
```

The current contribution-breakdown infrastructure should be preserved.

Identity does not need to use the same evidence schema as Observations.

---

# 15. IDENTITY CONFIDENCE

The current implementation's entry-count-based confidence is better understood as:

**Data Sufficiency.**

Example:

> The archive contains enough records for this identity to be meaningfully evaluated.

That is different from:

> This identity beats competing identities by a large margin.

The latter is **Classification Confidence**.

Identity should eventually expose the appropriate concepts separately where useful.

---

# 16. EVIDENCE

## Definition

Evidence is the structured or human-readable support underlying an analytical conclusion.

The project does **not** require one universal evidence object for every subsystem.

---

## Evidence by Layer

### Traits

The underlying scores/metrics are the primary support.

### Genre Signals

Presence, affinity, combinations, and related calculations provide support.

### Observations

Use structured evidence.

This is currently the strongest implementation.

### Findings

Should eventually expose structured supporting evidence.

### Designations

May expose lightweight "why this designation" evidence.

### Identities

Contribution breakdowns are an appropriate evidence/explanation mechanism.

---

## Principle

The goal is:

> **Every important conclusion should be explainable.**

The goal is not:

> Every subsystem must use identical evidence schemas.

---

# 17. CONFIDENCE / STRENGTH VOCABULARY

The generic word "confidence" should be avoided where a more precise term exists.

## Signal Strength

> How strongly is a quality/signal expressed?

Examples:

```text
Originality: 0.88
```

or:

```text
Originality: 8.8/10
```

---

## Data Sufficiency

> Is there enough archive data to reasonably evaluate this conclusion?

This is fundamentally about sample size and available information.

---

## Classification Confidence

> How clearly does one classification/identity/designation outrank plausible alternatives?

This is about separation between competing classifications.

---

## Evidence Strength

> How strongly does the available evidence support the conclusion?

This is about the quality/quantity/directness of supporting evidence.

---

## Important

These values may correlate.

They are not interchangeable.

---

# 18. NARRATIVE

## Definition

Narrative is the human-readable interpretation of the intelligence layer.

It answers:

> **How do we explain the archive's meaning to a human?**

Narrative may synthesize:

- traits
- genre signals
- observations
- findings
- designation
- identity

---

## Constraint

Narrative must not invent conclusions unsupported by the intelligence layer.

It translates and synthesizes established signals.

---

## Current Status

The existing template-driven narrative system should be preserved.

Refinement can occur after the conceptual contracts are stable.

---

# 19. RECOMMENDATION SIGNALS

## Definition

Recommendation Signals are machine-usable representations of the archive's preferences.

They exist primarily to support the Recommendation Engine.

They may include:

- trait strengths
- genre affinities
- genre combinations
- scoring preferences
- designation recommendation bias
- soft Observation signals
- soft Finding signals

---

## Important distinction

Recommendation Signals are **not the same thing as human-readable Identity**.

Identity may highlight important underlying signals, but the recommendation engine should consume those measurable signals directly.

---

# 20. RECOMMENDATION BIAS

A Designation or other intelligence layer may identify recommendation-relevant tendencies.

Example:

```text
The Boundary Explorer

Recommendation Bias:
- unusual concepts
- genre hybrids
- experimental storytelling
```

These are machine-usable preferences, not necessarily direct recommendation scores.

---

# 21. ANALYTICS

## Definition

Analytics is the quantitative view of the archive.

Analytics answers:

> **What do the numbers say?**

It should contain things such as:

- averages
- distributions
- score comparisons
- trends
- charts
- genre statistics
- quantitative comparisons

---

## Constraint

Analytics should not become the general home for interpretive intelligence.

Traits, observations, findings, designations, and identities belong conceptually to the Archive Profile.

---

# 22. ARCHIVE PROFILE

## Definition

The Archive Profile is the interpretive representation of the archive.

It answers:

> **What does the archive mean?**

---

## Contents

```text
Archive Profile
│
├── Narrative
│
├── Primary Designation
│
├── Primary Identity
│   └── Secondary Identities
│
├── Traits
│
├── Genre Signals
│
├── Observations
│
├── Findings
│
└── Evidence / Explanations
```

---

## Cardinality

```text
Traits
    MANY

Genre Signals
    MANY

Observations
    MANY

Findings
    MANY

Designation
    MANY internally
    ONE PRIMARY displayed

Identities
    MANY internally
    ONE PRIMARY
    ZERO+ meaningful SECONDARY
```

---

# 23. IDEAL PROFILE EXAMPLE

## Traits

**What qualities are strongly represented?**

```text
Originality          8.8
Depth                8.4
Gameplay Mechanics   9.6
Engagement           9.1
Craft                8.7
```

---

## Observations

**What recurring patterns can we directly demonstrate?**

### ◈ Boundary Preference

> Your archive repeatedly favors unusual concepts.

**Evidence:** Originality 8.8/10

### ◈ Systems Affinity

> Your archive repeatedly responds positively to carefully designed systems and mechanics.

**Evidence:** Gameplay Mechanics 9.6/10

---

## Findings

**What does the available evidence suggest?**

> Your archive demonstrates a strong preference for experiences that challenge conventional genre boundaries.

Potential supporting observations/signals:

- Boundary Preference
- Experimental Genre Affinity
- High Originality
- Surreal/Horror cross-interest

---

## Designation

**What recognizable classification fits the pattern?**

### ◈ The Boundary Explorer

```text
Traits:
- Originality
- Depth

Genres:
- Experimental
- Surreal
- Sci-Fi
- Horror

Recommendation Bias:
- Unusual concepts
- Genre hybrids
- Experimental storytelling
```

---

## Identity

**What kind of curator does all of this make you?**

### Systems-Seeking Interpretive Curator

This name does **not** need to exist in the Designation vocabulary.

That distinction is intentional.

---

# 24. RECOMMENDATION ENGINE CONTRACT

The Recommendation Engine answers:

> **What should I experience next?**

It is a consumer of measurable archive intelligence.

---

## Primary Inputs

### Traits

Trait strengths.

### Genre Signals

Affinities, combinations, presence, and other genre intelligence.

### Scoring

- universal averages
- media-specific averages
- scoring preferences

### Designations

- designation scores
- recommendation bias

### Observations

Soft recommendation signals.

### Findings

Soft recommendation signals.

---

## Identity

Identity may influence recommendations **indirectly** by highlighting important underlying traits/signals.

Identity should not be treated as a direct numerical recommendation score.

---

# 25. RECOMMENDATION OUTPUT

Eventually:

```text
Recommendation:
Movie X

Match: 92

Why:

+ Strong experimental affinity
+ High originality alignment
+ Matches Boundary Explorer preferences
+ Strong atmospheric compatibility
+ Similar to highly-rated archive records
```

The engine must ultimately answer both:

> **What should I experience?**

and:

> **Why was this recommended?**

---

# 26. EMPTY / SPARSE ARCHIVE BEHAVIOR

Empty and sparse archives are valid system states.

The intelligence layer must not assume that enough data always exists.

The Profile should distinguish:

### Empty Archive

Not enough data to produce meaningful intelligence.

### Sparse Archive

Some signals may exist, but conclusions should clearly communicate limited data sufficiency.

### Established Archive

Enough data exists for meaningful interpretation.

Data sufficiency should be represented explicitly rather than hidden behind misleading confidence percentages.

---

# 27. PARTIAL DATA

The intelligence layer must tolerate incomplete information where practical.

Potential conditions:

- missing scores
- missing genres
- incomplete media-specific metrics
- limited genre coverage
- partially populated archive

Systems should degrade gracefully rather than fabricate certainty.

---

# 28. RECOMMENDATION OF ARCHITECTURAL CHANGES

When implementing changes based on this contract:

### Prefer

- minimal changes
- preservation of existing working behavior
- incremental evolution
- targeted rule refinement
- improved terminology
- additional evidence
- additional tests

### Avoid

- subsystem mergers
- giant rewrites
- replacing deterministic systems with opaque AI
- redesigning working scoring infrastructure
- making Identity a Designation clone
- making Findings into renamed Observations
- using labels as opaque recommendation scores

---

# 29. TESTING CONTRACT

Any subsystem changed under this contract must preserve existing behavior unless that behavior directly conflicts with the locked conceptual definition.

Current baseline:

**199 tests passing.**

Changes should add or update tests for:

### Observations

- rule behavior
- evidence
- confidence
- multiple observations

### Findings

- interpretive level
- synthesis
- evidence
- confidence
- multiple findings

### Designations

- rule behavior
- ranking
- primary selection
- explanation/evidence
- recommendation bias

### Identities

- fixture loading
- multiple identities
- ranking
- primary selection
- secondary selection
- contribution breakdown
- data sufficiency
- classification confidence

### Recommendations

- signal weighting
- ranking
- explanations
- edge cases

---

# 30. NON-GOALS

This contract does **not** currently attempt to define:

- exact future UI styling
- exact final designation vocabulary
- exact final identity vocabulary
- exact recommendation algorithm weights
- every future trait
- every future genre signal
- external metadata integrations
- machine-learning-based recommendations
- React architecture

Those can evolve after the conceptual boundaries are stable.

---

# 31. PHASE 0 EXIT CRITERIA

Phase 0 is complete when:

- [ ] Trait has an unambiguous definition
- [ ] Genre Signal has an unambiguous definition
- [ ] Observation has an unambiguous definition
- [ ] Finding has an unambiguous definition
- [ ] Designation has an unambiguous definition
- [ ] Identity has an unambiguous definition
- [ ] Evidence has an unambiguous purpose
- [ ] Signal Strength is distinguished from confidence
- [ ] Data Sufficiency is defined
- [ ] Classification Confidence is defined
- [ ] Evidence Strength is defined
- [ ] Narrative's role is defined
- [ ] Recommendation Signals are defined
- [ ] Analytics vs Archive Profile is defined
- [ ] Cardinality is locked
- [ ] Observation vs Finding is locked
- [ ] Designation vs Identity is locked
- [ ] Multiple identities are explicitly supported
- [ ] Primary/secondary identity behavior is defined
- [ ] Empty/sparse archive behavior is acknowledged
- [ ] No major conceptual contradiction remains

Only then should Phase 1 implementation alignment begin.

---

# 32. CONSTITUTIONAL SUMMARY

The Media Tracker intelligence layer follows this conceptual progression:

```text
RAW DATA
   ↓
MEASUREMENT
   ↓
TRAITS + GENRE SIGNALS
   ↓
┌───────────────────────────────────────────────┐
│                                               │
│  OBSERVATIONS     FINDINGS     DESIGNATIONS   │
│                                               │
│  demonstrable    interpretive   named taste   │
│  patterns        conclusions    classification│
│                                               │
│                     IDENTITY                  │
│              curator synthesis                │
│                                               │
└───────────────────────────────────────────────┘
   ↓
ARCHIVE PROFILE
   ↓
RECOMMENDATION SIGNALS
   ↓
RECOMMENDATION ENGINE
```

The four key distinctions are:

> **Observation:** What can we directly demonstrate?

> **Finding:** What does the evidence suggest?

> **Designation:** What recognizable taste classification fits?

> **Identity:** What kind of curator does this archive describe?

And the four key quantitative distinctions are:

> **Signal Strength:** How strongly is it expressed?

> **Data Sufficiency:** Do we have enough data?

> **Classification Confidence:** How clearly does one classification win?

> **Evidence Strength:** How strongly is the conclusion supported?

These distinctions form the conceptual foundation for future implementation.

**The system should evolve from this contract. It should not be rewritten merely because implementation details change.**

---

# 33. User-Provided Data as Intelligence Input

The intelligence layer should treat user-provided archive data as potential analytical input unless a future contract explicitly excludes a field.

The fact that a field is initially collected for display, recordkeeping, or human use does not mean it must remain permanently inert.

Potential intelligence inputs include:

- scores
- genres
- media type
- completion status
- date consumed
- review text
- previously-consumed status
- future intentionally collected archive metadata

This does not mean every field must immediately affect scoring.

The principle is:

`If the user deliberately provides a signal, the intelligence architecture should preserve the possibility of eventually determining whether that signal is useful.`

Any actual algorithmic use must remain explainable and explicitly defined.

# 34. Review

The current user-authored notes field should eventually become:

`Review`

The field remains optional.

A Review is distinct from structured scoring, but it is still part of the archive record and should eventually be available to intelligence and analytics systems.

Potential future uses include:

- recurring themes
- qualitative reactions
- interpretive patterns
- evidence for Observations
- evidence for Findings
- recommendation signals
- media-specific reaction analysis
- narrative enrichment

The contract does not currently define a review-analysis algorithm.

Review analysis is therefore a future capability.

# 35. Previously Consumed Media

The archive should eventually allow the user to indicate whether the recorded media was previously consumed before this archive record, even if this is the first time the user is recording it in Media Tracker.

The initial representation should preferably be binary:

```text

previously_consumed: true / false

```

A full consumption count may be useful later, but it introduces additional maintenance burden.

The binary signal is sufficient to establish the important distinction:

`first recorded consumption vs. repeat consumption`

Potential future intelligence uses include:

- repeat-consumption behavior
- familiarity effects
- comfort-media patterns
- recommendation weighting
- archive interpretation
- consumption analytics

No specific scoring effect is currently defined.

# 36. Intelligence Input Principle

The intelligence layer should evolve toward a model in which:

```text

RAW USER DATA
↓
MEASURABLE SIGNALS
↓
INTELLIGENCE
↓
INTERPRETATION
↓
RECOMMENDATION SIGNALS

```

The system should not assume that only numerical scores are legitimate intelligence inputs.

At the same time, raw user input should not automatically become a score merely because it exists.

The correct sequence is:

    1. preserve the data
    2. establish whether it contains a meaningful signal
    3. define the signal's semantics
    4. test the behavior
    5. only then incorporate it into downstream intelligence

# 37. Constitutional Extension

The intelligence layer therefore follows an additional principle:

`Collect broadly, interpret conservatively.`

User-provided information should remain available for future analytical use, while actual algorithmic consumption must be:

- purposeful
- explainable
- evidence-oriented
- explicitly defined
- regression-tested

This principle applies to Reviews, previously-consumed status, and future user-provided metadata.
