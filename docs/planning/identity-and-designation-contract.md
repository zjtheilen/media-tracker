```
__    __  ___     ___  ___   ____  ___
\ \/\/ / / ◯\   _\\  / ◯\  | D ) | |
 \_/\_/○/_/ \_\○/__/○/_/ \_\○|_D_)○|_|○
WEIGHTED ARCHIVE SYSTEM for ANALYSIS & BEHAVIORAL INSIGHTS

A media tracking, rating, and analytics app by Zachary Theilen
```

# Media Tracker — Identity & Designation Contract

**Status:** Current Conceptual Authority

**Scope:** Identity and Designation semantics

**Purpose:** Define the conceptual boundary between Designations and Identities, establish the current catalogs, and preserve the reasoning that governs their evolution.

---

# 1. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

This document establishes the conceptual contract for the Media Tracker Designation and Identity systems.

Its purpose is not to redesign their implementation.

Its purpose is to establish:

- what Designations mean;
- what Identities mean;
- what questions each system answers;
- how the two layers relate;
- what conceptual boundaries they must preserve;
- how future catalog evolution should be evaluated.

The governing implementation philosophy is:

> **Evolution, not rewrite.**

Implementation details belong in the Decision & Implementation Map.

Exact fixture definitions belong in the Identity Fixture Contract.

Evidence rationale belongs in the Identity Evidence Mapping.

Historical repository and behavioral evidence belongs in the Intelligence Forensic Audit.

The historical Designation System Evolution record has been consolidated into this contract. Its historical reasoning is preserved here where it informs the current conceptual model.

---

# 2. Designation

A **Designation** is a recognizable **taste classification** demonstrated by an archive.

Its core question is:

> **What recognizable taste classification best fits this archive?**

A Designation describes characteristics of the media relationship that recur strongly enough to form a recognizable classification.

Examples of Designation-level characteristics include:

- attraction to unusual or boundary-pushing experiences;
- broad and varied media selection;
- strong engagement with execution, pacing, gameplay, or systems;
- sustained attraction to layered or psychologically rich media.

A Designation is therefore primarily a classification of:

> **What the archive tends to like.**

A Designation should describe a recurring characteristic of the media relationship, not an explanation of why that characteristic exists.

---

# 3. What a Designation Is Not

A Designation is not:

- a personality diagnosis;
- a psychological assessment;
- a statement about the curator outside the tracked archive;
- a personal identity;
- a broad curator philosophy;
- a recommendation category;
- a single favorite genre;
- an interpretation of one isolated preference;
- a statement of motivation or intent.

A Designation should remain grounded in recognizable patterns demonstrated by the archive.

---

# 4. Identity

An **Identity** describes a broader **curatorial philosophy or recurring mode of engagement** demonstrated by an archive.

Its core question is:

> **What broader curatorial philosophy does this archive demonstrate?**

An Identity operates at a higher level than a single taste classification.

It synthesizes recurring signals and patterns into a description of how the curator relates to the media represented in the archive.

Identity may draw upon:

- universal traits;
- media-specific traits;
- genre behavior;
- archive shape;
- breadth;
- depth;
- recurring engagement patterns;
- recurring exploration-related patterns;
- recurring interpretation-related patterns;
- explicitly defined derived signals.

The specific evidence used by each Identity is defined separately in the Identity Evidence Mapping.

---

# 5. What an Identity Is Not

An Identity is not:

- a psychological diagnosis;
- a personality test result;
- a claim about the curator's internal mental state;
- a synonym for a Designation;
- a renamed Designation;
- a recommendation category;
- a single genre preference;
- a claim about behavior outside the tracked media domain.

Identity describes an observable or evidence-supported **relationship with media**, not the whole person.

---

# 6. The Foundational Distinction

The foundational distinction is:

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

A useful shorthand is:

> **Designation:** What do you tend to like?

> **Identity:** What relationship do you tend to establish with what you like?

This distinction is mandatory.

An Identity must not be created by simply:

- renaming a Designation;
- reweighting a Designation;
- restating a Designation description;
- adding an adjective to a Designation;
- mapping one Designation directly to one Identity.

The Identity layer must represent a genuinely different semantic question.

---

# 7. Evidence Sharing

Identity and Designation may legitimately operate on overlapping evidence.

Shared evidence is not itself a conceptual problem.

## Allowed

The systems may share:

- raw signals;
- universal Traits;
- media-specific Traits;
- genre information;
- archive statistics;
- derived metrics;
- other explicitly available archive evidence.

They may also interpret the same evidence differently.

## Not Allowed

The systems must not produce the same conceptual conclusion under different names.

Specifically, the system must not contain:

- an Identity that is effectively a Designation;
- a Designation that is effectively an Identity;
- an Identity whose only distinction is terminology;
- an exact Identity/Designation name collision;
- an implicit one-to-one Designation → Identity mapping.

The governing rule is:

> **Shared evidence is allowed. Shared conclusion is not.**

Or, more compactly:

> **Evidence can overlap. Meaning cannot.**

---

# 8. Current Designation Catalog

The current Designation catalog contains four working classifications:

1. **Boundary Explorer**
2. **Curator**
3. **Engagement Architect**
4. **Deep Diver**

These remain working behavioral hypotheses.

They are current conceptual classifications, but they are not required to be permanent.

Future Designation evolution may:

- rename a Designation;
- redefine a Designation;
- split a Designation;
- merge overlapping classifications;
- retire a Designation;
- introduce another Designation.

Such changes should be driven by evidence or explicit conceptual decisions rather than taxonomy expansion for its own sake.

The current Designation catalog is not required to contain the same number of concepts as the Identity catalog.

---

# 9. Boundary Explorer Designation

## 9.1 Concept

Boundary Explorer describes a recognizable taste pattern characterized by attraction to:

- unfamiliar experiences;
- speculative experiences;
- surreal experiences;
- experimental experiences;
- unconventional experiences;
- boundary-pushing experiences.

The concept concerns what kinds of media the archive tends to favor.

The distinction between isolated sampling and sustained attraction remains relevant to the concept.

Boundary Explorer is therefore a **taste classification**, not a statement about exploration as a personal philosophy.

## 9.2 Current Evidence

Current designation-related evidence includes:

- originality;
- depth;
- sustained exploration;
- media-type breadth;
- experimental and unconventional genre patterns.

Its recommendation metadata favors:

- unusual concepts;
- genre hybrids;
- experimental storytelling.

The exact scoring implementation belongs to the implementation authority.

## 9.3 Boundary Explorer vs. Exploratory Philosophy

These concepts intentionally remain separate.

### Boundary Explorer

> **What unconventional media do you tend to like?**

### Exploratory Philosophy

> **How does your archive relate to unfamiliar territory?**

Boundary Explorer describes a taste classification.

Exploratory Philosophy describes a broader curatorial orientation.

The current evidence model cannot directly observe deliberate exploration.

Therefore Exploratory Philosophy must not be defined merely as:

> “Boundary Explorer, but more abstract.”

Likewise, Boundary Explorer does not establish that the curator intentionally seeks novelty or deliberately explores boundaries.

---

# 10. Engagement Architect Designation

## 10.1 Concept

Engagement Architect describes a recognizable taste pattern characterized by strong engagement with:

- execution;
- systems;
- pacing;
- gameplay;
- structural mechanisms;
- other mechanisms that make an experience compelling.

Current scoring incorporates:

- engagement strength;
- craft strength;
- gameplay strength;
- pacing.

The Designation is intentionally preserved as a distinct taste classification.

## 10.2 Relationship to Construction / Systems Philosophy

Construction / Systems Philosophy was evaluated as a possible Identity concept.

It was deferred because the current evidence overlaps too heavily with Engagement Architect.

This is not a problem with Engagement Architect.

It is evidence that creating a separate Identity from the same signals would risk duplicating an existing Designation.

A future Construction / Systems Identity would require broader structural evidence than the current implementation provides.

High engagement or high appreciation for systems therefore does not automatically establish a Construction / Systems Philosophy.

---

# 11. Deep Diver Designation

## 11.1 Concept

Deep Diver describes a recognizable taste pattern characterized by sustained attraction to:

- layered experiences;
- emotionally resonant media;
- psychologically rich media;
- interpretively rewarding media;
- experiences that support sustained attention.

Current characteristics include:

- depth;
- emotional impact;
- strong average score;
- psychological genre affinity.

Deep Diver is a **taste classification**.

## 11.2 Relationship to Interpretive Philosophy

Deep Diver and Interpretive Philosophy may legitimately coexist.

### Deep Diver

> A taste for deep, layered, psychologically rich, and sustained experiences.

### Interpretive Philosophy

> A recurring orientation toward interpretation, reflection, ambiguity, and meaning.

The distinction is intentional.

High depth should not automatically produce both conclusions merely because both systems use the same signal.

Therefore:

> **Deep Diver ≠ Interpretive Philosophy**

---

# 12. Curator Designation

## 12.1 Concept

Curator describes a recognizable taste pattern involving:

- breadth;
- variety;
- appreciation of craft;
- appreciation of presentation;
- archive composition;
- substantial selection across different areas of media.

Curator is a **taste classification**.

It does not by itself establish:

- a broader philosophy of variety;
- collecting behavior;
- organizational behavior;
- intentional diversification;
- deliberate curation as a motivation.

## 12.2 Archive Size Limitation

The current Designation calculation also incorporates archive size as one component.

Archive size measures quantity.

It does not directly measure:

- deliberateness;
- care;
- curatorial intent;
- breadth;
- quality of selection.

Therefore archive size should be treated cautiously.

The existing calculation is preserved unless a direct conceptual conflict is demonstrated.

Future refinement may determine whether archive size genuinely belongs in Curator scoring or whether it is functioning as an indirect proxy for something the system does not directly observe.

This is a known conceptual weakness, not a reason to discard the Designation.

## 12.3 Relationship to Breadth Philosophy

Curator and Breadth Philosophy may use related evidence while answering different questions.

### Curator

> The archive demonstrates a recognizable taste pattern involving breadth, variety, craft, presentation, and archive characteristics.

### Breadth Philosophy

> The archive demonstrates a broad range of media territory.

Therefore:

> **Curator ≠ Breadth Philosophy**

Observable variety does not automatically establish intentional diversification.

---

# 13. Designation Scores

Designation Score answers:

> **How strongly does this archive fit this taste classification?**

All current Designation scores are on a comparable 0–100 scale.

The current scoring architecture should be preserved unless an explicit conceptual decision requires changing it.

A high Designation Score is not automatically:

> Classification Confidence.

Designation Score describes the strength of the classification-related signals.

It does not establish that the classification is statistically probable or objectively correct.

---

# 14. Signal Strength vs. Classification Confidence

The existing `designationConfidence` terminology is historical and misleading.

The current semantic interpretation is closer to:

> **Signal Strength**

It reflects the strength of the underlying designation-related signals.

It is not:

- a statistical probability;
- a probability that the Designation is correct;
- a universal confidence measure;
- a measure of certainty about the curator.

It should therefore be presented to users as **Signal Strength** while the existing API field remains preserved for compatibility.

The API field name is an implementation compatibility concern.

Its semantic interpretation is determined by the current conceptual contract.

---

# 15. Primary Designation

The system calculates multiple Designation candidates.

The Profile selects:

> **ONE PRIMARY Designation**

The current deterministic highest-score selection is preserved.

Where a single Designation must be presented, the result must be reproducible and deterministic.

Exact tie behavior is an implementation concern defined by the Decision & Implementation Map.

Incidental fixture ordering should not become an intentional conceptual ranking rule.

The existence of multiple candidates does not imply that multiple Designations are equally primary.

---

# 16. Designation Evidence and Explanation

Designation metadata may include:

- traits;
- associated genres;
- recommendation bias;
- designation basis.

These serve explanatory or recommendation-oriented purposes.

They do not constitute a universal evidence schema.

## 16.1 `designationBasis`

`designationBasis` should be understood as:

> **A concise summary of dominant classification signals.**

It is not intended to enumerate every signal participating in the underlying Designation rules.

The backend remains authoritative for this value.

The frontend should consume the backend-produced representation rather than independently reconstructing it.

The obsolete frontend duplicate producer has been removed.

No backend calculation change is required solely to preserve this semantic interpretation.

---

# 17. Recommendation Bias

Designation `recommendation_bias` is preserved.

It represents:

> **What kinds of future recommendations may fit the classification.**

It is not:

- a recommendation score;
- a Designation Score;
- evidence that the recommendation is appropriate;
- a completed Recommendation Engine.

Recommendation generation remains a separate system concern.

The same boundary applies to Identity recommendation metadata.

> **Recommendation-oriented metadata does not turn an Identity or Designation into a Recommendation Engine.**

---

# 18. Relationship to Findings

Designations are not Findings.

A Designation classifies a recognizable taste pattern.

A Finding interprets evidence.

The systems may use overlapping evidence, but they answer different questions.

Therefore:

> **Designation ≠ Finding**

and:

> **Identity ≠ Finding**

The detailed Finding implementation belongs to its appropriate implementation authority.

---

# 19. Current Identity Catalog

The accepted Identity catalog contains three concepts:

1. **Interpretive Philosophy**
2. **Exploratory Philosophy**
3. **Breadth Philosophy**

These concepts were selected because they occupy a meaningfully different semantic layer from the current Designation catalog.

The Identity catalog is intentionally smaller than the Designation catalog.

That is not a problem.

The two systems answer different questions and therefore do not require one-to-one correspondence.

---

# 20. Interpretive Philosophy

## 20.1 Definition

Interpretive Philosophy describes a recurring relationship with media characterized by engagement through:

- depth;
- reflection;
- complexity;
- ambiguity;
- interpretation.

Its conceptual subject is **meaning-making and interpretive engagement**.

## 20.2 Core Question

> **How do you engage with what you consume?**

More specifically:

> **Does this archive repeatedly demonstrate engagement with media as something to interpret, unpack, question, and reconsider?**

## 20.3 Conceptual Boundary

Interpretive Philosophy is not simply:

- liking highly rated media;
- liking emotionally intense media;
- liking psychological genres;
- liking mystery;
- liking surreal media;
- preferring depth;
- preferring experimental media;
- preferring originality;
- having a large archive;
- having many genres represented.

Those characteristics may contribute evidence.

They do not independently define the Identity.

## 20.4 Relationship to Deep Diver

Deep Diver Designation identifies a recognizable taste pattern toward depth, layering, psychological richness, and sustained attention.

Interpretive Philosophy operates at a different level.

It describes the broader relationship with those experiences:

> **The curator tends to engage with media as something to interpret, question, unpack, and reconsider.**

Therefore:

> **Deep Diver ≠ Interpretive Philosophy**

The two may legitimately coexist.

---

# 21. Exploratory Philosophy

## 21.1 Definition

Exploratory Philosophy describes a recurring relationship with unfamiliar or boundary-expanding territory.

Relevant characteristics include:

- novelty;
- unfamiliarity;
- contrast;
- boundary expansion;
- movement beyond established territory.

Its conceptual subject is the curator's **relationship with the boundaries of their media territory**.

## 21.2 Core Question

> **How do you relate to the boundaries of what you consume?**

More specifically:

> **Does this archive repeatedly demonstrate engagement with experiences beyond established taste territory?**

## 21.3 Conceptual Boundary

Exploratory Philosophy is not simply:

- liking experimental media;
- liking unusual media;
- having high originality;
- having high novelty;
- having high genre diversity;
- having one unusual work in the archive.

These characteristics can provide evidence.

They do not independently prove exploration.

## 21.4 Relationship to Boundary Explorer

Boundary Explorer Designation describes a recognizable taste classification centered on attraction to unfamiliar or boundary-pushing media.

Exploratory Philosophy describes the broader relationship with unfamiliar territory:

> **The curator demonstrates a recurring relationship with expanding or testing the boundaries of their media territory.**

The two may legitimately coexist.

Therefore:

> **Boundary Explorer ≠ Exploratory Philosophy**

Neither should be defined as a restatement of the other.

## 21.5 Intentionality Boundary

The archive does not directly observe:

- deliberate search behavior;
- conscious exploration;
- intent;
- trajectory through taste space;
- deliberate boundary testing.

Therefore Exploratory Philosophy must remain an evidence-based interpretation.

It must not be presented as proof that the curator consciously or deliberately explores.

---

# 22. Breadth Philosophy

## 22.1 Definition

Breadth Philosophy describes the range of territory represented in the archive.

Its conceptual subject is **observable variety**.

## 22.2 Core Question

> **How wide is the territory you consume?**

Breadth Philosophy concerns the extent of the media territory represented by the archive.

## 22.3 Conceptual Boundary

Breadth Philosophy does not automatically mean:

- deliberate diversification;
- intentional exploration;
- broad curiosity in every domain;
- collecting behavior;
- organizational behavior;
- a specific motivation for consuming varied media.

Observable variety establishes range.

It does not establish why that range exists.

## 22.4 Relationship to Curator

Curator Designation describes a recognizable taste classification involving breadth, variety, craft, presentation, and archive characteristics.

Breadth Philosophy focuses specifically on the **range of territory represented** by the archive.

Therefore:

> **Curator ≠ Breadth Philosophy**

---

# 23. Cross-Identity Differentiation

The three current Identities answer three distinct questions:

| Identity | Core question |
| --------------------------- | ------------------------------------------------ |
| **Interpretive Philosophy** | How do you engage with what you consume? |
| **Exploratory Philosophy** | How do you relate to the boundaries of what you consume? |
| **Breadth Philosophy** | How wide is the territory you consume? |

These are different dimensions.

An archive may legitimately demonstrate all three.

For example, an archive can simultaneously show:

- deep engagement with meaning and interpretation;
- recurring engagement with unfamiliar territory;
- broad representation across genres.

This does not create conceptual conflict because the Identities describe different dimensions of the curator/media relationship.

Identity differentiation does not require exclusivity.

---

# 24. Identity Differentiation Rules

The Identity catalog must preserve the following negative-space boundaries.

## Interpretive Philosophy

High:

- depth;
- emotional impact;
- reflection;
- ambiguity;
- analysis

may support Interpretive Philosophy.

But Interpretive Philosophy must not be reduced to:

- high depth alone;
- psychological genre preference;
- high average score;
- emotional intensity;
- experimental taste;
- originality;
- archive size.

## Exploratory Philosophy

High:

- originality;
- genre diversity;
- experimental affinity;
- novelty

may support Exploratory Philosophy.

But Exploratory Philosophy must not be reduced to:

- experimental media;
- unusual media;
- originality alone;
- novelty alone;
- genre diversity alone.

## Breadth Philosophy

High:

- genre diversity;
- media territory diversity

may support Breadth Philosophy.

But Breadth Philosophy must not be reduced to:

- archive size;
- one dominant genre;
- originality;
- novelty;
- depth;
- engagement;
- craft.

---

# 25. Identity vs. Designation Examples

The following distinctions are representative of the conceptual boundary.

## Boundary Explorer vs. Exploratory Philosophy

**Designation:**

> The archive tends to like unusual or boundary-pushing media.

**Identity:**

> The archive demonstrates a recurring relationship with expanding or testing its established media territory.

## Deep Diver vs. Interpretive Philosophy

**Designation:**

> The archive tends to like layered, psychologically rich, and sustained experiences.

**Identity:**

> The curator tends to engage with media as something to interpret, question, unpack, and reconsider.

## Curator vs. Breadth Philosophy

**Designation:**

> The archive demonstrates a recognizable taste pattern involving breadth, variety, craft, and presentation.

**Identity:**

> The archive demonstrates a broad range of media territory.

These examples are conceptual boundaries, not implementation mappings.

---

# 26. Identity Evidence Does Not Establish Psychology

The Identity system may describe a recurring orientation demonstrated by archive evidence.

It must not claim access to internal psychological states.

The archive does not directly establish:

- personality;
- motivation;
- intent;
- cognition;
- private interpretation;
- emotional life outside the tracked media domain.

Identity language must therefore remain appropriately evidence-bounded.

This same evidence boundary applies to Designations.

The system describes the tracked media relationship, not the whole person.

---

# 27. Identity Evidence Hierarchy

Identity evidence may be understood conceptually as:

## Direct

Evidence that closely corresponds to the quality being evaluated.

## Supporting

Evidence that strengthens a conclusion without independently establishing it.

## Proxy / Contextual

Indirect or derived evidence that may support an interpretation while carrying additional uncertainty.

## Insufficient

Evidence that does not provide enough support for the conclusion by itself.

The detailed mapping of current Identity signals to these categories belongs in:

`identity-evidence-mapping.md`

---

# 28. Identity Data Sufficiency

Identity evaluation requires enough archive data to support meaningful evaluation.

Data Sufficiency is distinct from Identity Signal Strength.

Conceptually:

> **Data Sufficiency asks whether there is enough information to evaluate the Identity.**

> **Signal Strength asks how strongly the available information expresses the Identity's associated signals.**

A strong signal does not compensate for insufficient data.

Insufficient data does not imply negative preference.

The current operational eligibility rules belong to the implementation and fixture contracts.

---

# 29. Identity Scoring Boundary

Identity Score represents the strength of the signals associated with an Identity.

It does not represent:

- probability;
- statistical confidence;
- psychological certainty;
- certainty of internal motivation.

The scoring mechanism is an implementation concern.

The current fixture-level weights and eligibility requirements are maintained separately from this conceptual contract.

---

# 30. Primary and Secondary Identity

The Identity system supports:

- one Primary Identity;
- optional additional meaningful Identity results.

Primary and secondary selection are implementation behavior.

The conceptual contract does not require every archive to have a secondary Identity.

Likewise, the existence of multiple eligible Identities does not imply that they are equally strong.

The current ranking and secondary-selection policy is defined by the Decision & Implementation Map.

---

# 31. Determinism

Where the system presents a single Identity or Designation, the result must be deterministic.

This is necessary for:

- reproducibility;
- testing;
- explainability;
- stable API behavior.

The exact implementation of ranking and tie resolution belongs in the Decision & Implementation Map.

This document establishes the conceptual requirement for deterministic selection, not its implementation algorithm.

---

# 32. Identity Recommendation Boundary

Identity recommendation metadata may describe kinds of experiences that could align with the observed orientation.

It is not itself a Recommendation Engine.

Therefore:

> **Identity ≠ Recommendation Engine**

and:

> **Designation ≠ Recommendation Engine**

Recommendation logic remains a separate concern.

---

# 33. Catalog Evolution

The current catalogs are authoritative for the current system, but they are not permanently immutable.

Future evidence may justify:

- adding concepts;
- refining concepts;
- renaming concepts;
- splitting concepts;
- merging redundant concepts;
- retiring concepts.

Any such change requires an explicit conceptual decision.

Catalog evolution must preserve the foundational distinction between Identity and Designation.

A new label must not be introduced merely to rename an existing concept.

A new Designation should not be created merely because a high-scoring signal lacks a badge.

Likewise, a new Identity should not be created merely because a Designation does not have an Identity counterpart.

The conceptual question must come first.

---

# 34. Designation Evolution Rules

Future Designation changes should follow this sequence:

1. Define the conceptual classification first.
2. Identify the evidence that legitimately supports it.
3. Test it against existing Designations.
4. Test negative-space cases.
5. Define deterministic ranking behavior.
6. Add regression protection.
7. Only then implement.

This sequence protects the taxonomy from expanding merely because implementation signals are available.

A new classification should earn its conceptual distinction before it earns implementation.

---

# 35. Historical Designation Evolution Commitments

The historical Designation evolution work established several commitments that remain relevant to the current contract.

## 35.1 Preserve viable concepts before replacing them

A current Designation should not be discarded simply because its implementation is imperfect.

Conceptual viability and implementation quality are separate questions.

A Designation may be preserved while its evidence model is later clarified or improved.

## 35.2 Separate conceptual weakness from conceptual invalidity

Known weaknesses do not automatically invalidate a Designation.

For example:

- Curator's archive-size signal is a known conceptual weakness;
- Exploratory Philosophy's evidence is indirect;
- Construction / Systems Philosophy was deferred because of evidence overlap with Engagement Architect.

These are different situations.

A weakness may justify clarification or future refinement.

A conceptual collision may justify rejecting a candidate.

## 35.3 Preserve negative space

A Designation is partly defined by what it does **not** claim.

Boundary Explorer does not prove deliberate exploration.

Curator does not prove deliberate diversification.

Engagement Architect does not prove systems-oriented philosophy.

Deep Diver does not prove interpretive philosophy.

This negative space is part of the conceptual contract.

---

# 36. Current Designation Status

| Designation | Current treatment |
| -------------------- | -------------------------------------- |
| Boundary Explorer | Preserve / flesh out |
| Engagement Architect | Preserve / flesh out |
| Deep Diver | Preserve / provisional |
| Curator | Preserve / clarify archive-size signal |

This is a working classification, not a promise that these four names are permanent.

The status reflects the current conceptual state, not a prediction of future taxonomy.

---

# 37. Current Identity Status

| Identity | Current treatment |
| --------------------------- | -------------------------------- |
| Interpretive Philosophy | Current / strongest conceptual survivor |
| Exploratory Philosophy | Current / provisional evidence model |
| Breadth Philosophy | Current / provisional evidence model |

Construction / Systems Philosophy remains deferred rather than active.

The deferred concept is not considered invalid in principle.

It is deferred because the current evidence model does not provide sufficient conceptual separation from Engagement Architect.

---

# 38. Phase 1 Conceptual Boundaries

The current Phase 1 model does not require:

- a larger Designation catalog;
- a larger Identity catalog;
- machine-learning classification;
- probabilistic classification;
- Classification Confidence math;
- arbitrary near-tie thresholds;
- Designation co-primaries;
- Identity co-primaries;
- a universal evidence schema;
- recommendation scoring;
- a complete Recommendation Engine;
- redesign of the current scoring architecture.

Phase 1 instead establishes the semantic contract and aligns implementation to it.

---

# 39. What This Document Does Not Define

This document does not define:

- exact fixture JSON;
- exact Identity weights;
- exact minimum-entry thresholds;
- exact scoring formulas;
- exact normalization formulas;
- exact secondary-selection thresholds;
- exact tie-resolution algorithms;
- API field names;
- frontend labels;
- Observation implementation;
- Finding implementation;
- Recommendation Engine behavior;
- Archive State operational thresholds.

Those concerns belong to their appropriate authorities.

---

# 40. Authority Boundaries

The current documentation authority is intentionally divided.

## Intelligence Contract

Defines the overall meaning of the intelligence system.

## Decision & Implementation Map

Defines current implementation decisions, behavioral contracts, gates, and work order.

## Identity & Designation Contract

Defines the conceptual meaning and boundary between Designations and Identities.

## Identity Fixture Contract

Defines exact current Identity fixture-level constraints.

## Identity Evidence Mapping

Defines the rationale and limitations of current Identity evidence.

## Intelligence Forensic Audit

Provides repository and behavioral evidence.

## Identity Catalog

Preserves the historical development and reasoning behind the Identity ontology, including rejected, deferred, and superseded Identity concepts.

This division prevents one document from silently becoming the authority for concepts it does not own.

---

# 41. Historical Material and Current Authority

The historical Designation System Evolution record is preserved through this contract.

Its historical purpose was to document:

- why Designations are taste classifications;
- how the current four Designations evolved;
- why certain Identity candidates were rejected or deferred;
- known weaknesses in current Designation evidence;
- the distinction between Designation Score and Classification Confidence;
- the role of deterministic selection;
- the boundary between classification and recommendation;
- the rules governing future taxonomy evolution.

Those historical decisions are preserved as reasoning and provenance.

Where historical terminology or implementation assumptions differ from the current semantic contract, the current contract takes precedence.

Current implementation behavior is defined elsewhere.

Historical reasoning is not itself an implementation specification.

---

# 42. Final Conceptual Relationship

The complete conceptual relationship is:

```text
                ARCHIVE
                   │
                   ↓
          Observable Evidence
                   │
                   ↓
          Signals / Patterns
                   │
          ┌────────┴────────┐
          ↓                 ↓
     DESIGNATION          IDENTITY
          │                 │
   Taste classification   Curatorial
                          orientation
          │                 │
          ↓                 ↓
   What do you tend       What relationship
      to like?            do you establish
                          with what you like?