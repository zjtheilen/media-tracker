```
__    __  ___     ___  ___   ____  ___
\ \/\/ / / O \   _\\  / O \  | D ) | |
 \_/\_/O/_/ \_\O/__/O/_/ \_\O|_D_)O|_|O
WEIGHTED ARCHIVE SYSTEM for ANALYSIS & BEHAVIORAL INSIGHTS

A media tracking, rating, and analytics app by Zachary Theilen
```

# Media Tracker Intelligence Contract

**Status:** Current Conceptual Authority
**Scope:** Intelligence architecture, semantic boundaries, evidence philosophy, and current intelligence-system definitions

---

## 1. Purpose

This document defines the current conceptual contract for the Media Tracker intelligence system.

It answers:

* What kinds of intelligence does the system produce?
* What does each intelligence layer mean?
* How do the systems relate to one another?
* What distinctions must remain intact?
* What kinds of conclusions can the system legitimately make?
* What does the system explicitly **not** claim?

This document is a **semantic authority**, not a complete implementation specification.

Implementation decisions, fixture-level constraints, and repository-specific mechanics are documented in the appropriate specialist documents.

---

## 2. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Terminology alignment is therefore a controlled evolution of the existing Media Tracker architecture, not a justification for rewriting it.

**Principle:** Establish the semantic contract first. Align terminology and implementation to that contract without changing behavior unless an explicit conceptual decision requires the change.

---

## 3. Intelligence System Overview

Media Tracker transforms an archive of completed media experiences into progressively more interpretive forms of information.

At a high level:

```text
RAW ARCHIVE
    ↓
UNIVERSAL / MEDIA-SPECIFIC TRAITS
    ↓
GENRE SIGNALS
    ↓
OBSERVATIONS
    ↓
FINDINGS
    ↓
DESIGNATIONS
    ↓
IDENTITIES
    ↓
ARCHIVE PROFILE / NARRATIVE
```

These relationships describe the conceptual flow of information.

They do **not** require every layer to be implemented as a direct function-call chain, nor do they imply that each layer must consume every preceding layer.

Different intelligence systems may legitimately derive their evidence from different combinations of archive data, traits, genres, and derived signals.

---

# 4. Core Intelligence Layers

## 4.1 Traits

Traits represent measurable qualities expressed by the media in the archive.

Examples include qualities such as:

* depth
* originality
* craft
* emotional impact
* engagement
* pacing
* presentation
* gameplay-related qualities

Traits are signals about the media relationship.

A Trait value is not itself a conclusion about the curator's personality or identity.

### Semantic rule

> **Traits describe measurable qualities expressed in the archive.**

Trait values use a scoring scale rather than a confidence scale.

A strong Trait signal means the quality is strongly expressed.

It does **not** mean the system is highly certain that a conclusion is correct.

---

## 4.2 Genre Signals

Genre Signals describe the composition and characteristics of the archive's genre territory.

They may be used to derive:

* genre affinity
* genre diversity
* genre signatures
* contextual evidence for higher-level intelligence

Genre-derived signals are useful evidence, but they must not automatically be treated as direct measurements of intent, interpretation, or personal philosophy.

### Semantic rule

> **Genre Signals describe observable patterns in the archive's genre composition.**

A genre pattern can support a conclusion without proving why the curator chose those works.

---

## 4.3 Observations

Observations are evidence-backed notes or conclusions about recognizable patterns in the archive.

They answer questions such as:

* What pattern is visible?
* What behavior appears to recur?
* What does the available evidence suggest?

Observations are closer to the archive than Findings.

They are intended to preserve meaningful patterns without requiring every pattern to become a higher-level interpretation.

### Evidence Strength

Observations may expose **Evidence Strength**.

Evidence Strength describes how strongly the available evidence supports an Observation.

It is not the same thing as Signal Strength.

### Semantic rule

> **An Observation identifies a supported pattern in the available evidence.**

---

## 4.4 Findings

Findings represent higher-level conclusions derived from multiple pieces of evidence or from a more meaningful synthesis of observed patterns.

A Finding should provide more interpretation than an isolated Observation while remaining grounded in observable evidence.

### Semantic rule

> **A Finding synthesizes evidence into a more meaningful conclusion about the archive.**

A Finding is not automatically a psychological diagnosis, personality assessment, or statement of intent.

---

# 5. Designations

## 5.1 Definition

A Designation is a recognizable classification of the curator's media relationship.

Designations describe **characteristics of the media relationship**.

They answer:

> **What do you tend to like?**

A Designation may synthesize multiple Traits, genre signals, and archive-level characteristics into a recognizable classification.

A Designation is not:

* a personality diagnosis
* a psychological assessment
* a recommendation category
* a single favorite genre
* a single Trait
* an Identity
* a statement about the curator outside the media archive

---

## 5.2 Current Designation Catalog

The current Designation catalog consists of:

### Boundary Explorer

A classification associated with attraction to unfamiliar, speculative, experimental, or boundary-pushing media experiences.

Relevant characteristics include combinations of:

* originality
* depth
* exploratory breadth
* sustained exploration
* unusual or experimental territory

### Engagement Architect

A classification associated with strong engagement with the construction and mechanics of media experiences.

Relevant characteristics include combinations of:

* engagement
* craft
* gameplay-related qualities
* pacing
* structural/mechanical qualities

### Deep Diver

A classification associated with sustained attention to layered, emotionally meaningful, psychological, or interpretively rich works.

Relevant characteristics include combinations of:

* depth
* emotional impact
* psychological or mystery-oriented territory
* sustained engagement

### Curator

A classification associated with deliberate curation of a substantial and varied body of media.

Relevant characteristics include combinations of:

* craft
* presentation
* archive composition
* genre diversity
* archive-level curation signals

The current Designation catalog remains a working classification system and may evolve as the project develops.

---

## 5.3 Designation Scoring

Designations may be scored using weighted signals.

The current implementation uses a common 0–100 Designation Score scale.

The Designation Score represents the strength of the observable signals supporting that classification.

It should not be described as Classification Confidence.

### Semantic rule

> **A Designation Score expresses how strongly the archive exhibits the characteristics associated with a Designation.**

Detailed scoring formulas and implementation rules belong in the Decision and Implementation Map and associated implementation artifacts.

---

# 6. Identity

## 6.1 Definition

An Identity describes a broader curatorial philosophy or recurring orientation through which the curator engages with the media they consume.

Identities synthesize multiple signals and potentially multiple taste patterns.

They answer:

> **What relationship do you tend to establish with what you like?**

This makes Identity conceptually different from Designation.

### Designation

> **What do you tend to like?**

### Identity

> **What relationship do you tend to establish with what you like?**

A Designation describes characteristics of the media relationship.

An Identity describes the recurring orientation through which the curator engages with those characteristics.

---

## 6.2 Identity Guardrails

Identity must not become:

* a renamed Designation
* a reweighted Designation
* a restatement of one Trait
* a personality diagnosis
* a psychological diagnosis
* a recommendation category
* a single favorite genre
* a conclusion about the curator outside the available archive evidence

Identity may use evidence that also contributes to Designations.

The distinction comes from interpretation, not mandatory evidence exclusivity.

### Governing rule

> **Evidence can overlap. Meaning cannot.**

Shared evidence is therefore acceptable when two systems interpret that evidence differently.

Shared conclusions are not.

---

# 7. Current Identity Catalog

The current Identity catalog consists of three concepts.

---

## 7.1 Interpretive Philosophy

**Definition:**

> Engages with media through depth, reflection, complexity, and interpretation.

Interpretive Philosophy describes a relationship with media centered on meaning, layered interpretation, reflection, and complexity.

Its conceptual question is:

> **How do you engage with what you consume?**

### Primary observable evidence

* depth

### Supporting evidence

* emotional impact
* reflection
* ambiguity
* analysis

### Evidence limitations

The system does not directly observe a curator's internal interpretive process.

Some available signals are therefore proxies or contextual evidence rather than direct measurements of interpretation.

High depth alone does not automatically prove an Interpretive Philosophy.

---

## 7.2 Exploratory Philosophy

**Definition:**

> Extends beyond established preferences through engagement with unfamiliar territory.

Exploratory Philosophy describes a relationship with boundaries, unfamiliar territory, and movement beyond established preferences.

Its conceptual question is:

> **How do you relate to the boundaries of what you consume?**

### Strongest observable evidence

* originality
* genre diversity

### Supporting/proxy evidence

* depth
* experimental affinity
* novelty

### Evidence limitations

The current archive does not directly observe deliberate exploration or intent.

Experimental media, originality, novelty, or genre diversity may indicate unfamiliar territory, but none independently proves deliberate exploration.

Exploratory Philosophy therefore remains an evidence-limited interpretation of observable archive patterns.

---

## 7.3 Breadth Philosophy

**Definition:**

> Engages with a wide range of genres and areas of the media landscape.

Breadth Philosophy describes the range of territory represented in the archive.

Its conceptual question is:

> **How wide is the territory you consume?**

### Primary observable evidence

* genre diversity

### Evidence limitations

Genre diversity is observable.

Intentional diversification is not directly observed.

A broad archive therefore supports Breadth Philosophy as an observable curatorial pattern without proving that the curator deliberately sought variety.

Archive size alone is not equivalent to breadth.

---

# 8. Identity Differentiation

The three current Identities occupy different conceptual dimensions.

| Identity                | Core question                                            | Primary distinction                 |
| ----------------------- | -------------------------------------------------------- | ----------------------------------- |
| Interpretive Philosophy | How do you engage with what you consume?                 | Meaning, interpretation, reflection |
| Exploratory Philosophy  | How do you relate to the boundaries of what you consume? | Unfamiliarity, boundaries, movement |
| Breadth Philosophy      | How wide is the territory you consume?                   | Range and variety                   |

These Identities may legitimately coexist in the same archive.

For example, an archive may simultaneously:

* cover a wide range of territory,
* contain substantial engagement with unfamiliar territory,
* and show strong evidence of interpretive engagement.

Coexistence does not represent a failure of differentiation.

---

# 9. Identity Evidence

Identity evidence is not required to be exclusive to one Identity.

The important distinction is how the evidence is interpreted.

Three broad evidence classes are relevant:

### Direct evidence

A signal that directly corresponds to the conceptual quality being evaluated.

### Supporting evidence

A signal that strengthens a conclusion but does not independently establish it.

### Proxy/contextual evidence

A derived or indirect signal that can provide useful context while carrying additional interpretive uncertainty.

### Insufficient evidence

A signal or pattern that does not provide enough support to justify the Identity conclusion by itself.

This hierarchy exists to prevent weak proxies from being presented as direct measurements.

---

# 10. Evidence Limitations

The current intelligence system operates on observable archive data.

It does not directly observe:

* intention
* internal motivation
* deliberate exploration
* private interpretation
* personal philosophy outside the archive
* psychological state

Consequently, intelligence conclusions must remain bounded by what the archive can support.

### Governing rule

> **Observable behavior may support an interpretation, but interpretation must not be presented as directly observed internal intent.**

---

# 11. Identity Scoring Semantics

Identity scoring combines multiple observable signals according to each Identity's defined evidence contract.

The conceptual pipeline is:

```text
DATA SUFFICIENCY
        ↓
ELIGIBILITY
        ↓
SIGNAL EVALUATION
        ↓
IDENTITY SCORE
        ↓
RANKING
        ↓
PRIMARY / SECONDARY PRESENTATION
```

The score expresses **Signal Strength** for the Identity.

It is not a probability and is not Classification Confidence.

Exact fixture weights, minimum-entry requirements, and implementation mechanics belong to the Identity Fixture Contract and Decision and Implementation Map.

---

# 12. Identity Eligibility

An Identity may require a minimum amount of archive data before it can be evaluated meaningfully.

This is a question of **Data Sufficiency**, not Signal Strength.

The current Identity fixture requirements are:

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

An Identity below its minimum data requirement is not considered an eligible candidate.

### Semantic rule

> **Insufficient data prevents meaningful evaluation; it does not imply a weak Identity.**

---

# 13. Identity Ranking

Eligible Identities are ranked by Identity Score.

The highest-scoring eligible Identity is the primary Identity.

The system does not require every eligible Identity to be surfaced.

Primary selection is deterministic.

Exact implementation-level tie behavior is documented in the Decision and Implementation Map.

---

# 14. Secondary Identity

A secondary Identity represents another sufficiently supported Identity that is meaningfully present alongside the primary Identity.

The current implementation uses a minimum score threshold for secondary presentation.

That threshold is an implementation/presentation rule rather than part of the conceptual definition of Identity itself.

The current threshold is documented in the Decision and Implementation Map.

A secondary Identity should not be interpreted as:

* simply the second-ranked Identity
* proof that two Identities are equally strong
* a result of arbitrary numerical closeness
* evidence that Identities must be mutually exclusive

---

# 15. Identity Explanation

Identity results should remain explainable.

The scoring system exposes the contribution of individual signals so that the resulting Identity can be understood in terms of the evidence that produced it.

The current explanation model includes:

* Identity Score
* contribution breakdown
* top contributing Identity signals
* Data Sufficiency

"Top traits" in the current implementation means the highest-contributing entries from the Identity contribution breakdown.

It does not mean an independent third classification layer.

---

# 16. Signal Strength vs Data Sufficiency

These concepts must remain separate.

## Signal Strength

Describes how strongly a quality, characteristic, or Identity signal is expressed.

Examples:

* Trait strength
* Designation Score
* Identity Score

## Data Sufficiency

Describes whether enough archive data exists to support meaningful evaluation.

An archive can have:

* high Signal Strength with insufficient data
* low Signal Strength with sufficient data

These are different dimensions.

---

# 17. Evidence Strength vs Signal Strength

These concepts also remain separate.

### Signal Strength

How strongly a signal or characteristic is expressed.

### Evidence Strength

How strongly available evidence supports a conclusion.

A strong Trait signal does not automatically mean the resulting conclusion has strong evidence.

Conversely, a conclusion may have strong evidence because several moderate signals converge.

---

# 18. Classification Confidence

**Classification Confidence is retired terminology.**

The current intelligence system does not use Classification Confidence as an active universal confidence measure.

The repository should therefore not invent a Classification Confidence formula merely to provide a familiar-sounding confidence field.

Historical references may remain where they explain earlier design decisions, but they must not be presented as current active semantics.

---

# 19. Archive States

The intelligence system recognizes meaningful differences in archive size and data availability.

The conceptual archive states are:

### Empty

No completed media records are available.

### Sparse

Some records exist, but the archive may not contain enough information for all intelligence systems to operate meaningfully.

### Established

The archive contains sufficient information for broader intelligence analysis.

These states are useful for interpreting Data Sufficiency and presentation behavior.

### Operational threshold status

The exact operational thresholds separating these states remain an implementation/decision concern and are **not resolved by this document**.

Existing documentation has contained conflicting claims about the exact thresholds.

That contradiction must remain explicit until an intentional decision resolves it.

---

# 20. Partial and Insufficient Data

The intelligence system must distinguish:

* absence of a signal
* weak expression of a signal
* insufficient data to evaluate a signal

These are not equivalent.

For example:

> No evidence of a pattern

is different from:

> Not enough archive data to evaluate the pattern.

The system should avoid treating missing information as negative evidence.

---

# 21. Determinism

Where the system must select a single result, selection should be deterministic.

Deterministic behavior is important for:

* reproducibility
* explainability
* testing
* stable API behavior
* predictable presentation

The semantic contract requires deterministic outcomes where selection is required, while implementation details governing exact tie-breaking belong in the Decision and Implementation Map.

Determinism must not depend accidentally on:

* filesystem ordering
* incidental fixture ordering
* dictionary ordering
* nondeterministic iteration

unless such behavior is explicitly part of the implementation contract.

---

# 22. Recommendation Bias

Designations and Identities may expose recommendation-oriented metadata.

Recommendation Bias describes the kinds of media that may be relevant to the observed characteristics of an archive.

It is **not** itself a Recommendation Engine.

Recommendation Bias may therefore be used as an input to future recommendation work without implying that the complete recommendation system already exists.

The intelligence system should influence recommendations indirectly through meaningful signals and interpretations rather than replacing the recommendation system with Identity labels.

---

# 23. Architectural Boundaries

The intelligence systems remain conceptually parallel.

Traits, Genre Signals, Observations, Findings, Designations, and Identities are related but should not be collapsed into one generic "intelligence" object merely because they all describe the archive.

Each system exists because it answers a different question.

### Traits

What qualities are expressed?

### Genre Signals

What territory and genre patterns are represented?

### Observations

What supported patterns are visible?

### Findings

What higher-level conclusions can be synthesized?

### Designations

What recognizable characteristics describe the media relationship?

### Identities

What recurring orientation or philosophy describes the curator's relationship with those characteristics?

This separation is intentional.

---

# 24. Explainability

The intelligence system should remain understandable to both users and developers.

Intelligence outputs should, where appropriate, expose enough evidence to answer:

* Why was this result produced?
* Which signals contributed?
* How strong were those signals?
* Was there enough data?
* Is the conclusion direct or interpretive?
* What limitations apply?

Explainability does not require every subsystem to use the same evidence schema.

---

# 25. Current Implementation Boundary

This document defines semantic meaning.

The following are intentionally governed elsewhere:

* exact scoring formulas
* fixture file structure
* exact fixture weights
* minimum-entry implementation
* normalization mechanics
* secondary Identity threshold
* exact tie-breaking mechanics
* API field mapping
* frontend terminology
* repository/file layout
* test implementation
* internal helper names

These implementation details may change without changing the conceptual intelligence contract, provided they continue to satisfy the semantic requirements defined here.

Conversely, an implementation change that contradicts the semantic contract requires an explicit conceptual decision.

---

# 26. Protected Conceptual Boundaries

The following boundaries should not be weakened during future development.

### Designation vs Identity

A Designation is not an Identity with a different name.

### Signal Strength vs Evidence Strength

Strength of expression is not strength of supporting evidence.

### Signal Strength vs Data Sufficiency

Strong evidence cannot compensate conceptually for insufficient archive data, and insufficient data does not mean a weak signal.

### Observation vs Finding

An Observation and Finding represent different levels of synthesis.

### Observable evidence vs inferred intent

The system must not claim to directly observe internal motivation or intention.

### Recommendation Bias vs Recommendation Engine

Recommendation-oriented metadata does not constitute a complete recommendation system.

---

# 27. Current Intelligence Catalog Summary

The current catalog is:

## Traits

A collection of measurable media qualities.

## Genre Signals

Observable genre and territory patterns.

## Observations

Evidence-backed archive patterns.

## Findings

Higher-level evidence-backed syntheses.

## Designations

* Boundary Explorer
* Engagement Architect
* Deep Diver
* Curator

## Identities

* Interpretive Philosophy
* Exploratory Philosophy
* Breadth Philosophy

These layers are intentionally distinct.

---

# 28. Non-Goals

This contract does not establish:

* personality diagnosis
* psychological profiling
* internal intent detection
* universal confidence mathematics
* a universal evidence schema
* machine-learning classification
* automatic psychological inference
* a complete Recommendation Engine
* mandatory co-primary Identities
* mandatory Identity exclusivity
* a fixed permanent Identity catalog
* a fixed permanent Designation catalog
* a redesign of existing intelligence architecture

---

# 29. Future Evolution

The current catalog is authoritative for the current implementation, but it is not necessarily permanent.

Future changes may:

* rename an Identity
* rename a Designation
* redefine a concept
* add a new concept
* split a concept
* merge concepts
* retire a concept

Such changes require an explicit conceptual decision.

They should not occur merely because documentation is inconvenient or because two concepts happen to share evidence.

---

# 30. Documentation Authority

This document is the highest-level semantic authority for the current intelligence system.

It should answer:

> **What does this intelligence concept mean?**

Other documents answer narrower questions.

### Decision and Implementation Map

Answers:

> **How has the current implementation been chosen to realize the contract?**

### Identity and Designation Contract

Answers:

> **What are the detailed conceptual boundaries and behaviors of Identities and Designations?**

### Identity Fixture Contract

Answers:

> **What exact fixture-level Identity definitions and constraints are currently implemented?**

### Identity Evidence Mapping

Answers:

> **Why does particular evidence support a given Identity, and what are its limitations?**

### Terminology/API Rename Map

Answers:

> **How are the semantic concepts represented in the backend/API?**

### Frontend Terminology Alignment

Answers:

> **How are those concepts presented in the frontend?**

### Intelligence Alignment

Records:

> **How the project arrived at the current intelligence architecture during recovery.**

### Intelligence Forensic Audit

Records:

> **What repository evidence established or challenged the recovered behavior and contracts.**

### Identity Catalog

Records:

> **How the Identity system evolved, including rejected and deferred concepts.**

---

# 31. Governing Documentation Rule

The documentation system should follow the same principle as the intelligence system itself:

> **A document should describe the knowledge it is responsible for without pretending to own knowledge that belongs elsewhere.**

Duplication may be appropriate for orientation or context.

Duplication must not create competing authorities.

Historical documentation may describe superseded decisions.

Historical documentation must not silently present superseded decisions as current policy.

---

# 32. Phase 1 Outcome

The recovery and alignment work established a coherent intelligence architecture without requiring a rewrite of the underlying system.

The current semantic model preserves:

* measurable Traits
* observable Genre Signals
* evidence-backed Observations
* synthesized Findings
* recognizable Designations
* broader curatorial Identities
* explicit evidence limitations
* separate Signal Strength, Evidence Strength, and Data Sufficiency concepts
* deterministic selection where required
* conservative interpretation of incomplete data
* recommendation metadata without conflating it with a Recommendation Engine

The current intelligence system should therefore continue to evolve through explicit conceptual decisions rather than documentation-driven architectural churn.

---

# 33. Final Governing Principle

> **The intelligence system should describe what the archive can legitimately support, while the documentation should describe the intelligence system that actually exists.**

When evidence is strong, the system may make stronger conclusions.

When evidence is indirect, the system should say so.

When data is insufficient, the system should preserve that uncertainty.

When a concept changes, the change should be intentional.

And when documentation changes, it should clarify the existing system rather than quietly changing the system to fit the documentation.
