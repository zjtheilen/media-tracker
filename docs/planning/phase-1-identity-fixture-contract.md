# Phase 1 — Identity Fixture Contract

## 1. Purpose

This document defines the authoritative conceptual contract for the three surviving Identity concepts in the Media Tracker archive intelligence system.

The purpose of this document is to establish what each Identity **means**, what evidence may support it, how that evidence should be interpreted, and how each Identity must remain distinct from the others and from the Designation system.

This document is intentionally conceptual.

It does **not** define implementation details, numeric weights, thresholds, formulas, API changes, or new derived metrics.

The implementation comparison and fixture redesign pass should use this document as the conceptual source of truth.

### 1.1 Authority

The existing Identity fixtures represent the current implementation and may contain concepts inherited from the previous Identity ontology.

They are **not** treated as authoritative definitions for the new Identity catalog.

The conceptual contracts in this document take precedence during the subsequent fixture comparison and redesign pass.

The intended sequence is:

> **Ontology → Evidence Contract → Fixture Contract → Implementation Comparison → Implementation Changes**

---

# 2. Governing Principles

## 2.1 Identity vs Designation

A **Designation** describes a recognizable taste classification.

An **Identity** describes a broader curatorial philosophy synthesized from multiple signals and potentially multiple taste patterns.

More precisely:

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

Short form:

* **Designation:** What do you tend to like?
* **Identity:** What relationship do you tend to establish with what you like?

An Identity must not be created by simply renaming, reweighting, or restating a Designation.

---

## 2.2 Evidence Can Overlap. Meaning Cannot.

Different Identities may legitimately use some of the same underlying evidence.

For example:

* Genre Diversity may support both Exploratory and Breadth.
* Depth may support both Interpretive and, weakly, Exploratory.
* Originality may support Exploratory and overlap with Boundary Explorer.

This is acceptable when the evidence is being interpreted differently.

The same underlying signal must not become multiple independent copies of the same conclusion.

> **Evidence can overlap. Meaning cannot.**

---

## 2.3 Signal Strength vs Data Sufficiency

**Signal Strength** describes how strongly a particular characteristic is expressed.

**Data Sufficiency** describes whether enough archive data exists to make an evaluation meaningful.

These are separate concepts.

A small archive can exhibit a strong signal while still lacking enough evidence to support a reliable Identity conclusion.

A large archive does not automatically produce a stronger Identity signal.

Archive size may therefore contribute to Data Sufficiency without being treated as Identity evidence.

---

## 2.4 Observable Evidence vs Inferred Orientation

The system does not directly observe a curator's internal philosophy or intent.

It observes patterns in the archive and infers an Identity from those patterns.

Therefore Identity explanations must distinguish between:

* what the archive directly demonstrates,
* what the available evidence supports as an inference,
* and what the system cannot currently observe.

The system should describe evidence-supported orientation rather than claiming access to subjective intent.

---

## 2.5 No Intentionality Claims Beyond Available Evidence

The current archive does not directly observe:

* why a work was selected,
* whether experimentation was deliberate,
* whether diversity was intentional,
* whether a curator consciously sought unfamiliar territory,
* chronological changes in taste,
* deliberate expansion of preferences,
* abandoned experiments,
* or subjective interpretation.

Identity explanations must not present these as observed facts.

---

# 3. Final Provisional Identity Catalog

The surviving Identity concepts are:

| Identity                                    | Core Question                                            | Primary Territory                               | Evidence Status                                  |
| ------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| **Interpretive Philosophy**                 | How do you engage with what you consume?                 | Meaning, interpretation, reflection, complexity | Strongest conceptual survivor                    |
| **Exploratory Philosophy**                  | How do you relate to the boundaries of what you consume? | Unfamiliar territory and established boundaries | Conditional; evidence is indirect                |
| **Breadth / Curatorial Variety Philosophy** | How wide is the territory you consume?                   | Range and variety of genres/media               | Conditional; variety observable, intent indirect |

The three concepts describe different dimensions:

> **Interpretive = depth of meaning**
> **Exploratory = relationship with boundaries**
> **Breadth = range of territory**

These dimensions are not mutually exclusive.

An archive may legitimately demonstrate all three.

---

# 4. Shared Fixture Contract

Every Identity fixture should conceptually define the following:

1. Identity name
2. Category
3. Definition
4. Core question
5. Evidence hierarchy
6. Evidence roles
7. Signal independence / correlation constraints
8. Excluded or insufficient evidence
9. Minimum evidence requirements
10. Evidence limitations
11. Explanation language
12. Recommendation bias
13. Differentiation from other Identities
14. Differentiation from relevant Designations

---

## 4.1 Evidence Roles

Evidence should be classified conceptually as:

### Primary

The strongest currently available observable evidence for the Identity.

Primary evidence should carry the clearest conceptual relationship to the Identity.

### Supporting

Evidence that strengthens the Identity when combined with stronger evidence.

Supporting evidence should not independently define the Identity.

### Proxy / Contextual

Evidence that is related to the Identity but does not directly observe the underlying concept.

Proxy evidence must be interpreted cautiously.

Correlated proxies must not be treated as independent confirmation.

### Insufficient

Evidence that may be interesting or related but is not sufficient to support the Identity.

---

## 4.2 Minimum Evidence

Each Identity requires enough archive evidence to establish a **recurring pattern**, rather than relying on an isolated entry or unusual observation.

Exact numeric thresholds are intentionally deferred.

Minimum evidence is therefore conceptually defined here, while implementation-specific thresholds remain undecided.

---

## 4.3 Explanation Requirements

Identity explanations should:

* describe observable archive patterns,
* distinguish observation from inference,
* avoid psychological diagnosis,
* avoid claims of conscious intent,
* explain why the Identity fits,
* and remain understandable without knowledge of the scoring implementation.

---

## 4.4 Recommendation Bias

`recommendation_bias` represents the type of recommendations an Identity would tend to favor.

It is metadata describing recommendation direction.

It is **not** evidence for the Identity and does not constitute a completed Recommendation Engine.

Recommendation bias may overlap between Identities when the reasons for recommending something differ.

---

## 4.5 Negative-Space Requirement

An Identity must define what evidence should **not** independently establish it.

This prevents a fixture from becoming an accidental proxy for:

* a single genre,
* a single universal trait,
* a single media-specific trait,
* archive size,
* average score,
* or another Identity or Designation.

---

## 4.6 Independence and Correlation

Signals derived from the same underlying observation must not automatically be treated as independent evidence.

In particular, highly correlated derived signals should be treated as a related evidence cluster rather than separate confirmations.

The conceptual contract therefore distinguishes:

> **Signal availability** from **signal independence**.

---

# 5. Interpretive Philosophy

## 5.1 Concept Definition

**Interpretive Philosophy** describes a recurring orientation toward engaging with media through depth, reflection, emotional investment, ambiguity, complexity, and meaning-making.

It describes how the curator tends to engage with what they consume, rather than simply what kinds of media they prefer.

The Identity should represent a pattern of interpretive engagement inferred from the archive.

---

## 5.2 Core Question

> **How does this curator tend to engage with meaning, complexity, and interpretation in the media they choose?**

Short form:

> **How do you engage with what you consume?**

---

## 5.3 Evidence Hierarchy

### Primary / strongest observable evidence

* **Depth**

Depth is currently the strongest available observable signal for this Identity.

### Supporting evidence

* **Emotional Impact**

Emotional investment can strengthen an interpretation-oriented profile when it appears alongside depth and related signals.

### Proxy / contextual evidence

* **Analysis**
* **Ambiguity**
* **Reflection**

These derived signals are relevant but are not direct measurements of interpretation.

---

## 5.4 Signal Independence

Analysis, Ambiguity, and Reflection are derived from overlapping genre-based observations.

They should therefore not be treated as three independent proofs of Interpretive Philosophy.

They form a correlated proxy cluster.

The Identity should remain conceptually grounded in the broader pattern rather than the accumulation of correlated genre proxies.

---

## 5.5 Excluded / Non-Independent Evidence

The following should not independently establish Interpretive Philosophy:

* average score,
* any single genre,
* psychological genre prevalence,
* mystery genre prevalence,
* surreal genre prevalence,
* Depth alone,
* Emotional Impact alone,
* Analysis alone,
* Ambiguity alone,
* Reflection alone,
* Originality,
* Experimental Affinity,
* Novelty,
* Engagement,
* Craft,
* archive size,
* genre count,
* media-type diversity.

These may contribute contextually when combined into an appropriate pattern, but none should function as a standalone definition.

---

## 5.6 Evidence Limitation

The current system does not directly observe interpretation.

It observes characteristics associated with works that may reward interpretation and infers an interpretive orientation from the curator's archive.

Therefore:

> **The current evidence supports an inference of interpretive orientation, not a direct observation of interpretation itself.**

Interpretive Philosophy must not become a disguised psychological, mystery, surreal, or "smart media" genre detector.

---

## 5.7 Minimum Evidence

The archive must contain enough evidence to distinguish a recurring interpretive pattern from an isolated preference for a deep, emotional, ambiguous, or complex work.

The exact numeric threshold is deferred.

---

## 5.8 Explanation Language

Explanations should emphasize:

* sustained attention,
* reflection,
* complexity,
* ambiguity,
* emotional investment,
* interpretation,
* layered meaning,
* repeated engagement.

Explanations should not claim:

* that the curator is psychologically introspective,
* that the curator consciously seeks interpretation,
* or that genre preference alone proves the Identity.

---

## 5.9 Recommendation Bias

Interpretive Philosophy may bias recommendations toward:

* layered narratives,
* ambiguous endings,
* psychologically rich works,
* reflective storytelling,
* complex or multi-interpretive experiences,
* works that reward close attention.

This describes recommendation direction, not Identity evidence.

---

## 5.10 Identity Differentiation

### Interpretive vs Exploratory

* Interpretive concerns **meaning and interpretation**.
* Exploratory concerns **unfamiliar territory and boundaries**.

A curator may be highly interpretive without exploring broadly.

A curator may explore extensively without being especially interpretive.

### Interpretive vs Breadth

* Interpretive concerns **depth of engagement with meaning**.
* Breadth concerns **range of territory represented in the archive**.

A narrow archive can be highly Interpretive.

A broad archive can have relatively little Interpretive evidence.

---

## 5.11 Designation Differentiation

### Interpretive Philosophy vs Deep Diver Designation

These may share evidence such as Depth and Emotional Impact.

They must not share the same conclusion.

**Deep Diver** is a recognizable taste classification describing attraction to sustained, layered, deep experiences.

**Interpretive Philosophy** describes the broader orientation toward meaning, reflection, complexity, and interpretation inferred from the archive.

> **Depth may support both. The conclusion remains different.**

---

# 6. Exploratory Philosophy

## 6.1 Concept Definition

**Exploratory Philosophy** describes a recurring orientation toward extending beyond established territory and engaging with experiences that are unfamiliar relative to the curator's existing archive.

The Identity is about the curator's relationship with the boundaries of their established preferences.

It is not simply a preference for unconventional media.

---

## 6.2 Core Question

> **Does this archive demonstrate a recurring tendency to extend beyond established preferences and engage with unfamiliar territory?**

Short form:

> **How do you relate to the boundaries of what you consume?**

---

## 6.3 Evidence Hierarchy

### Supporting evidence

* **Originality**
* **Genre Diversity**
* **Media-Type Breadth**

These signals can support an inference of exploratory orientation when they form a broader pattern.

### Proxy / contextual evidence

* **Experimental Affinity**
* **Novelty**

These are related to exploration but also overlap strongly with unconventionality and experimental taste.

### Weak supporting evidence

* **Depth**

Depth may support exploration in some archives but is not a defining exploratory signal.

---

## 6.4 Signal Independence

Experimental Affinity and Novelty are highly correlated because both are derived from experimental genre prevalence.

They must not be treated as independent confirmation.

Genre Diversity and Media-Type Breadth represent different dimensions of archive variety and may both contribute, but their presence does not automatically establish exploration.

---

## 6.5 Excluded / Non-Independent Evidence

The following should not independently establish Exploratory Philosophy:

* experimental prevalence,
* Originality alone,
* Novelty alone,
* Experimental Affinity alone,
* Genre Diversity alone,
* Media-Type Breadth alone,
* Depth,
* Emotional Impact,
* Craft,
* Engagement,
* average score,
* archive size,
* psychological genre prevalence,
* horror prevalence,
* surreal prevalence,
* any single genre,
* any single media type.

Exploration must remain an inference from a pattern consistent with extending beyond established territory.

---

## 6.6 Evidence Limitations

The current system observes unconventionality and archive variety more directly than it observes exploration as a process.

It does not directly observe:

* deliberate discovery,
* chronological expansion,
* movement from familiar to unfamiliar territory,
* conscious experimentation,
* abandoned experiments,
* or intentional expansion of taste boundaries.

Therefore:

> **The current evidence supports an inference of exploratory orientation, not a direct observation of exploration as a process.**

Exploratory evidence must be interpreted as evidence of relationship to established territory, not as a standalone measure of unconventionality or variety.

Genre and media diversity may support an Exploratory inference, but they cannot substitute for evidence consistent with extending beyond established territory.

---

## 6.7 Minimum Evidence

The archive must contain enough evidence to distinguish a recurring exploratory pattern from an isolated unusual work.

The exact numeric threshold is deferred.

---

## 6.8 Explanation Language

Explanations should describe:

* extending established territory,
* unfamiliarity,
* movement toward different areas of the media landscape,
* recurring variation relative to established preferences,
* expanding or crossing boundaries.

Explanations should avoid claiming deliberate intent unless that intent is directly represented by future evidence.

Preferred framing:

> “The archive shows a recurring pattern consistent with engaging beyond established preferences.”

Avoid:

> “The curator deliberately seeks unfamiliar experiences.”

---

## 6.9 Recommendation Bias

Exploratory Philosophy may bias recommendations toward:

* experiences that expand existing territory,
* unfamiliar genres,
* unfamiliar media types,
* adjacent-but-unfamiliar works,
* experiences that extend established preferences,
* works outside the archive's established comfort zone.

It should not simply mean:

> “Recommend weird stuff.”

---

## 6.10 Identity Differentiation

### Exploratory vs Breadth

* Exploratory describes **movement relative to established territory**.
* Breadth describes **the range of territory represented**.

> **Breadth describes the shape of the territory. Exploration describes movement through or beyond that territory.**

A static diverse archive may demonstrate Breadth without demonstrating Exploration.

An archive that repeatedly extends beyond established territory may demonstrate Exploration even before it becomes broadly diverse.

### Exploratory vs Interpretive

* Exploratory concerns boundaries and unfamiliar territory.
* Interpretive concerns meaning and interpretation.

Neither requires the other.

---

## 6.11 Designation Differentiation

### Exploratory Philosophy vs Boundary Explorer Designation

These may share evidence such as Originality, Experimental Affinity, Novelty, and unconventional genres.

They answer different questions.

**Boundary Explorer** describes attraction to unconventional or boundary-pushing media.

**Exploratory Philosophy** describes an inferred tendency to extend beyond established territory.

> **Attraction to unconventional territory is not the same thing as movement beyond established territory.**

Exploratory Philosophy must not become a renamed Boundary Explorer Designation.

---

# 7. Breadth / Curatorial Variety Philosophy

## 7.1 Concept Definition

**Breadth / Curatorial Variety Philosophy** describes a recurring orientation toward engaging with a varied range of genres, media types, and areas of the media landscape.

It describes the range of territory represented in the archive.

It is not primarily about:

* archive size,
* quality,
* experimentation,
* unconventionality,
* depth,
* or conscious intent.

---

## 7.2 Core Question

> **How varied is the territory this curator engages with?**

Short form:

> **How wide is the territory you consume?**

---

## 7.3 Evidence Hierarchy

### Primary / strongest observable evidence

* **Genre Diversity**

Genre Diversity is the strongest currently available direct observable for archive breadth.

### Supporting evidence

* **Media-Type Breadth**
* **Archive Composition**

These provide additional context about the dimensions and distribution of the archive's range.

### Contextual evidence

* **Archive Size**

Archive size affects Data Sufficiency but should not be treated as evidence of Breadth strength.

---

## 7.4 Multidimensional Breadth

Breadth can occur across multiple dimensions.

### Genre Breadth

The archive spans a wide range of genres.

### Media-Type Breadth

The archive spans multiple media types.

These dimensions are complementary.

Neither is universally required.

Examples:

| Archive Pattern               | Genre Breadth | Media-Type Breadth |
| ----------------------------- | ------------- | ------------------ |
| Many genres, mostly films     | High          | Low                |
| One genre across many media   | Low           | High               |
| Many genres across many media | High          | High               |
| One genre in one medium       | Low           | Low                |

The existing genre taxonomy is treated as a useful heuristic for this purpose.

No taxonomy redesign is part of this contract.

---

## 7.5 Signal Independence

Genre Diversity and Media-Type Breadth measure different dimensions of variety.

They may therefore legitimately support the same Identity.

However, the system must not allow one dimension to become a disguised proxy for another.

---

## 7.6 Excluded / Non-Independent Evidence

The following should not independently establish Breadth:

* archive size,
* Originality,
* Experimental Affinity,
* Novelty,
* Depth,
* Emotional Impact,
* Engagement,
* Craft,
* Presentation,
* average score,
* psychological genre prevalence,
* horror prevalence,
* surreal prevalence,
* any single genre,
* any single media type.

Breadth is about **range**, not quantity, quality, or unconventionality.

---

## 7.7 Evidence Limitations

The current system observes archive variety more directly than it observes an intentional philosophy of seeking variety.

It does not directly observe:

* deliberate diversification,
* conscious curatorial strategy,
* reasons for choosing different genres,
* reasons for choosing different media,
* accidental diversity,
* or chronological development of variety.

Therefore explanations should describe observable range rather than presumed intent.

Preferred:

> “The archive consistently spans a wide range of genres and media.”

Avoid:

> “The curator deliberately maintains a diverse archive.”

---

## 7.8 Minimum Evidence

The archive must contain enough entries to distinguish recurring variety from isolated category coverage.

The exact numeric threshold is deferred.

Data Sufficiency must remain separate from Breadth strength.

---

## 7.9 Explanation Language

Explanations should emphasize:

* range,
* variety,
* distribution,
* genre coverage,
* media coverage,
* multiple areas of the media landscape.

Explanations should not equate:

* quantity with breadth,
* experimentation with breadth,
* quality with breadth,
* or diversity with deliberate intent.

---

## 7.10 Recommendation Bias

Breadth may bias recommendations toward:

* underrepresented genres,
* underrepresented media types,
* adjacent areas of the media landscape,
* areas that expand the range of the existing archive.

It should not automatically bias recommendations toward unconventional or experimental works.

That distinction belongs primarily to Exploratory and Boundary Explorer behavior.

---

## 7.11 Identity Differentiation

### Breadth vs Exploratory

* Breadth = range of represented territory.
* Exploratory = relationship to established boundaries.

A static diverse archive can be high Breadth and uncertain Exploration.

An expanding archive can demonstrate both.

### Breadth vs Interpretive

* Breadth = range.
* Interpretive = meaning and depth of engagement.

A broad archive does not imply Interpretive Philosophy.

A narrow archive does not prevent Interpretive Philosophy.

---

## 7.12 Designation Differentiation

### Breadth / Curatorial Variety Philosophy vs The Curator Designation

These may share Genre Diversity.

They must not share the same conclusion.

**Breadth** specifically describes range and variety.

**The Curator** is a broader recognizable taste classification incorporating characteristics such as craft, presentation, archive scale, and genre diversity.

Breadth therefore excludes:

* craft,
* presentation,
* selection quality,
* archive size as a strength signal,
* sophistication,
* hidden-gem preference,
* recommendation behavior.

> **Shared evidence is acceptable. Shared conclusion is not.**

---

# 8. Cross-Identity Consistency Rules

## 8.1 Shared Signals

Shared signals are permitted when they support different conceptual conclusions.

| Signal                | Interpretive | Exploratory     | Breadth    | Interpretation                           |
| --------------------- | ------------ | --------------- | ---------- | ---------------------------------------- |
| Depth                 | Primary      | Weak supporting | Excluded   | Meaning/depth vs boundary relationship   |
| Emotional Impact      | Supporting   | Excluded        | Excluded   | Interpretive engagement                  |
| Originality           | Excluded     | Supporting      | Excluded   | Boundary extension / variation           |
| Genre Diversity       | Excluded     | Supporting      | Primary    | Exploration support vs observable range  |
| Media-Type Breadth    | Excluded     | Supporting      | Supporting | Exploration support vs breadth dimension |
| Archive Composition   | Excluded     | Excluded        | Supporting | Distribution/range                       |
| Experimental Affinity | Excluded     | Proxy           | Excluded   | Exploratory context                      |
| Novelty               | Excluded     | Proxy           | Excluded   | Exploratory context                      |
| Analysis              | Proxy        | Excluded        | Excluded   | Interpretive context                     |
| Ambiguity             | Proxy        | Excluded        | Excluded   | Interpretive context                     |
| Reflection            | Proxy        | Excluded        | Excluded   | Interpretive context                     |

---

## 8.2 Signal Ownership

No signal has to belong exclusively to one Identity.

Instead, each Identity must define what the signal means **within that Identity**.

The key constraint is semantic ownership rather than exclusive numerical ownership.

---

## 8.3 Interpretive vs Exploratory

These are conceptually independent.

> **Interpretive asks how meaning is engaged with. Exploratory asks how established territory is approached.**

Neither requires the other.

---

## 8.4 Interpretive vs Breadth

These are strongly independent.

> **Interpretive asks about depth of meaning. Breadth asks about range of territory.**

A curator may demonstrate one, both, or neither.

---

## 8.5 Exploratory vs Breadth

These are related but distinct.

> **Exploratory asks about movement relative to boundaries. Breadth asks about the range ultimately represented.**

The current system observes Breadth more directly than Exploration.

---

## 8.6 Coexistence

Identities are not mutually exclusive.

A single archive may legitimately produce:

* high Interpretive,
* high Exploratory,
* and high Breadth

at the same time.

This is not a failure of classification.

It may accurately describe different dimensions of the same curator's archive.

---

## 8.7 Mutual Non-Requirements

No Identity requires another Identity to be present.

Specifically:

* Breadth does not require Exploration.
* Exploration does not require Breadth.
* Interpretive does not require either.
* Exploration does not require high Genre Diversity.
* Breadth does not require Originality or experimentation.
* Interpretive does not require psychological or mystery genres.

---

# 9. Cross-Designation Boundaries

## 9.1 Interpretive Philosophy vs Deep Diver

Shared evidence is expected.

The distinction is:

> **Deep Diver = recognizable taste classification.**
> **Interpretive = broader philosophy of engagement with meaning and interpretation.**

---

## 9.2 Exploratory Philosophy vs Boundary Explorer

Shared evidence is expected.

The distinction is:

> **Boundary Explorer = attraction to unconventional territory.**
> **Exploratory = tendency to extend beyond established territory.**

---

## 9.3 Breadth / Curatorial Variety Philosophy vs The Curator

Shared Genre Diversity is acceptable.

The distinction is:

> **Breadth = range of territory.**
> **The Curator = broader recognizable taste classification involving multiple characteristics of the archive and its selections.**

---

# 10. Evidence Limitations

## 10.1 Interpretation Is Inferred

The system does not directly observe the curator's internal interpretive process.

Interpretive Philosophy is therefore an evidence-supported inference.

---

## 10.2 Exploration Is Not Directly Observed

The system currently lacks a direct measurement of movement through taste boundaries.

Exploratory Philosophy is therefore the weakest of the three concepts from an evidence-directness perspective.

The concept remains valid, but its interpretation must remain qualified.

---

## 10.3 Breadth Intent Is Not Directly Observed

The system can observe variety.

It cannot currently determine whether that variety was intentional.

Breadth explanations must therefore describe observable range rather than conscious strategy.

---

## 10.4 Genre Taxonomy Is Heuristic

Genre-based signals depend on the quality and granularity of the existing genre taxonomy.

Genre diversity should therefore be treated as an observable heuristic rather than an objective measurement of the entire media landscape.

Taxonomy redesign is outside this contract.

---

## 10.5 Correlated Derived Signals

Several derived signals originate from overlapping underlying observations.

Most notably:

* Experimental Affinity and Novelty
* Analysis, Ambiguity, and Reflection

These relationships must be considered when translating the conceptual contracts into fixture weights.

---

# 11. What This Contract Does Not Decide

This document intentionally does **not** decide:

## 11.1 Numeric Weights

Conceptual importance is defined.

Exact numeric weighting is not.

## 11.2 Exact Minimum Entry Thresholds

Each Identity requires sufficient recurring evidence.

The exact numeric thresholds remain undecided.

## 11.3 Secondary Identity Thresholds

This document does not determine how close a secondary Identity must be to the primary Identity.

## 11.4 Tie / Near-Tie Rules

Current deterministic ranking behavior is not being redesigned here.

## 11.5 New Derived Metrics

No new `exploration_rate`, trajectory metric, intent metric, or similar signal is introduced by this contract.

## 11.6 Recommendation Engine Design

`recommendation_bias` remains descriptive metadata.

No Recommendation Engine architecture is defined here.

## 11.7 API Redesign

This document does not redesign the API.

## 11.8 Changes to Universal or Media-Specific Scoring

Existing scoring systems are not redefined by this document.

---

# 12. Implementation Readiness

The conceptual Identity catalog is sufficiently defined for fixture redesign, subject to alignment with the signals that are actually implemented by the current intelligence system.

The implementation comparison has established several important constraints.

## 12.1 Implemented Evidence vs Conceptual Evidence

The conceptual contracts may identify useful evidence dimensions that the current implementation does not yet represent as Identity scoring signals.

The fixture redesign must distinguish between:

* evidence that is conceptually relevant,
* evidence that is currently implemented,
* evidence that is available as contextual archive data,
* and evidence that would require a new derived metric.

Conceptual relevance does not by itself justify introducing a new signal.

> **A fixture should use implemented evidence unless a separate decision explicitly authorizes a new derived signal.**

## 12.2 Breadth Implementation Alignment

The conceptual Breadth contract originally identified:

* Genre Diversity,
* Media-Type Breadth,
* Archive Composition,
* and Archive Size as contextual evidence.

Repository inspection establishes the following implementation state:

| Evidence                | Implementation Status                 | Fixture Treatment                                    |
| ----------------------- | ------------------------------------- | ---------------------------------------------------- |
| **Genre Diversity**     | Implemented Identity signal           | Primary / strongest currently implemented observable |
| **Media Distribution**  | Implemented archive statistic         | Available contextual evidence; not currently scored  |
| **Media-Type Breadth**  | Not implemented as an Identity signal | Evidence gap; deferred                               |
| **Archive Composition** | Not implemented                       | Removed from active fixture contract                 |
| **Archive Size**        | Available archive data                | Data Sufficiency/context only                        |

`Archive Composition` must therefore **not** be introduced merely to satisfy the conceptual contract.

`Media-Type Breadth` remains a valid conceptual evidence dimension, but introducing it as an Identity scoring signal would require a separate derived-signal decision defining its calculation, normalization, and scoring behavior.

No such decision is part of this fixture redesign.

## 12.3 No New Derived Metrics

The fixture redesign does not introduce new derived metrics.

In particular, it does not introduce:

* `archive_composition`,
* `media_type_breadth`,
* exploration-rate metrics,
* trajectory metrics,
* intent metrics,
* or other new measurements.

Existing implemented signals may be reassigned, removed, or reweighted according to the conceptual contracts.

New measurements require a separate conceptual and implementation decision.

## 12.4 Current Breadth Fixture Constraint

The active Breadth fixture should therefore be designed around the strongest currently implemented observable:

> **Genre Diversity**

Media distribution may inform future evidence design, but it is not currently a scored Breadth signal.

Archive Size remains relevant to Data Sufficiency rather than Breadth strength.

This intentionally makes the initial Breadth implementation narrower than the full conceptual evidence model.

That is preferable to creating a metric whose behavior has not been explicitly defined.

## 12.5 Implementation Comparison Findings

The comparison of the existing fixtures against the authoritative contracts establishes the following redesign direction:

### Interpretive Philosophy

The existing `deep_diver` fixture is the strongest conceptual match.

Its signal neighborhood can be retained, but its Identity meaning, evidence roles, description, recommendation bias, and fixture identity must be aligned with Interpretive Philosophy.

### Exploratory Philosophy

The existing `boundary_explorer` fixture contains relevant evidence but represents the wrong conceptual conclusion.

It must be redesigned around Exploratory Philosophy rather than simply renamed.

Experimental Affinity and Novelty must remain subject to their known correlation constraint.

### Breadth Philosophy

The existing `engagement_architect` fixture does not meaningfully represent Breadth.

It should not be force-fit into the new catalog.

Its underlying Construction / Systems Philosophy concept remains deferred as a potential future Identity.

Breadth requires a new fixture based on the currently implemented evidence available for archive variety.

## 12.6 Fixture Schema Constraint

The existing fixture schema is sufficient for the current redesign.

The conceptual evidence roles defined in this document do not require new `evidence_roles` fields in the fixture schema at this stage.

The fixture should continue to provide the signals and weights used by the existing scoring architecture.

Evidence-role semantics remain authoritative documentation rather than additional fixture metadata unless a future implementation decision establishes a need for them.

## 12.7 Numeric and Threshold Constraints

The fixture redesign has now finalized the **fixture-specific numeric weights and minimum-entry requirements** for the three provisional Identity concepts:

* **Interpretive Philosophy**

  * minimum entries: 20
  * finalized weights: depth 0.45, emotional impact 0.25, reflection 0.12, ambiguity 0.10, analysis 0.08
* **Exploratory Philosophy**

  * minimum entries: 20
  * finalized weights: originality 0.35, genre diversity 0.25, depth 0.15, experimental affinity 0.15, novelty 0.10
* **Breadth Philosophy**

  * minimum entries: 15
  * finalized weight: genre diversity 1.00

These values are part of the redesigned fixture contract and supersede the numeric values inherited from the retired Identity fixtures.

The fixture redesign does **not** finalize or alter broader ranking behavior, including:

* secondary Identity thresholds,
* tie or near-tie rules,
* primary Identity selection behavior,
* general score calibration,
* or future classification-confidence semantics.

Those concerns remain separate from the fixture-specific evidence contract and should not be changed merely to accommodate the fixture redesign.

The current scoring architecture and its normalization behavior are preserved. Any future changes to ranking or calibration should be made only through an explicit conceptual decision.

## 12.8 Implementation Readiness Conclusion

The three Identity concepts are ready for fixture redesign.

The redesign should produce:

1. **Interpretive Philosophy** using existing interpretive evidence.
2. **Exploratory Philosophy** using existing evidence that can support a qualified exploratory inference.
3. **Breadth Philosophy** using `genre_diversity` as its currently implemented primary observable, without inventing additional derived metrics.

The resulting fixtures should reflect the authoritative conceptual contracts while remaining honest about the limits of the current evidence system.

> **The fixture should describe the intelligence system that actually exists, not an intelligence system we have not yet implemented.**

The implementation phase may therefore proceed to the actual JSON fixture redesign without requiring another conceptual Identity audit.

---

# 13. Final Contract Summary

| Identity                                    | Core Question                                            | Primary Evidence             | Supporting Evidence                                          | Proxy Evidence                  | Central Boundary                          |
| ------------------------------------------- | -------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------- | ----------------------------------------- |
| **Interpretive Philosophy**                 | How do you engage with what you consume?                 | Depth                        | Emotional Impact                                             | Analysis, Ambiguity, Reflection | Meaning and interpretation                |
| **Exploratory Philosophy**                  | How do you relate to the boundaries of what you consume? | No direct primary observable | Originality, Genre Diversity, Media-Type Breadth, weak Depth | Experimental Affinity, Novelty  | Unfamiliar territory / boundary extension |
| **Breadth / Curatorial Variety Philosophy** | How wide is the territory you consume?                   | Genre Diversity              | Media-Type Breadth, Archive Composition                      | None required                   | Range and variety                         |

The three Identities describe different dimensions of the archive:

> **Interpretive = depth of meaning**
> **Exploratory = relationship with boundaries**
> **Breadth = range of territory**

The system should allow these orientations to coexist.

The goal is not to force a single Identity to explain the archive.

The goal is to produce distinct, evidence-supported, explainable conclusions about different dimensions of the curator's relationship with media.

> **A strong Identity system does not require one conclusion when the archive legitimately demonstrates several orientations.**

> **Different questions. Different meanings. Explainable conclusions.**
