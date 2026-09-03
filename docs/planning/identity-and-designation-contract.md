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
**Purpose:** Define the conceptual boundary between Designations and Identities and establish the current catalog concepts.

---

# 1. Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

This document establishes the conceptual contract for the Media Tracker Designation and Identity systems.

Its purpose is not to redesign their implementation.

Its purpose is to establish what these two intelligence layers mean, what questions they answer, and what conceptual boundaries they must preserve.

The governing implementation philosophy is:

> **Evolution, not rewrite.**

Implementation details belong in the Decision & Implementation Map.

Exact fixture definitions belong in the Identity Fixture Contract.

Evidence rationale belongs in the Identity Evidence Mapping.

---

# 2. Designation

A **Designation** is a recognizable **taste classification** demonstrated by an archive.

Its core question is:

> **What recognizable taste classification best fits this archive?**

A Designation describes characteristics of the media relationship that recur strongly enough to form a recognizable classification.

Examples of Designation-level characteristics include:

* attraction to unusual or boundary-pushing experiences;
* broad and varied media selection;
* strong engagement with execution, pacing, gameplay, or systems;
* sustained attraction to layered or psychologically rich media.

A Designation is therefore primarily a classification of **what the archive tends to like**.

---

# 3. What a Designation Is Not

A Designation is not:

* a personality diagnosis;
* a psychological assessment;
* a statement about the curator outside the tracked archive;
* a curator philosophy;
* a recommendation category;
* a single favorite genre;
* an interpretation of one isolated preference;
* a statement of motivation or intent.

A Designation should remain grounded in recognizable patterns demonstrated by the archive.

---

# 4. Identity

An **Identity** describes a broader **curatorial philosophy or recurring mode of engagement** demonstrated by an archive.

Its core question is:

> **What broader curatorial philosophy does this archive demonstrate?**

An Identity operates at a higher level than a single taste classification.

It synthesizes recurring signals and patterns into a description of how the curator relates to the media represented in the archive.

Identity may draw upon:

* universal traits;
* media-specific traits;
* genre behavior;
* archive shape;
* breadth;
* depth;
* recurring engagement patterns;
* recurring exploration-related patterns;
* recurring interpretation-related patterns;
* explicitly defined derived signals.

The specific evidence used by each Identity is defined separately in the Identity Evidence Mapping.

---

# 5. What an Identity Is Not

An Identity is not:

* a psychological diagnosis;
* a personality test result;
* a claim about the curator's internal mental state;
* a synonym for a Designation;
* a renamed Designation;
* a recommendation category;
* a single genre preference;
* a claim about behavior outside the tracked media domain.

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

* renaming a Designation;
* reweighting a Designation;
* restating a Designation description;
* adding an adjective to a Designation;
* mapping one Designation directly to one Identity.

---

# 7. Evidence Sharing

Identity and Designation may legitimately operate on overlapping evidence.

Shared evidence is not itself a conceptual problem.

## Allowed

The systems may share:

* raw signals;
* universal Traits;
* media-specific Traits;
* genre information;
* archive statistics;
* derived metrics;
* other explicitly available archive evidence.

They may also interpret the same evidence differently.

## Not Allowed

The systems must not produce the same conceptual conclusion under different names.

Specifically, the system must not contain:

* an Identity that is effectively a Designation;
* a Designation that is effectively an Identity;
* an Identity whose only distinction is terminology;
* an exact Identity/Designation name collision;
* an implicit one-to-one Designation → Identity mapping.

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

The catalog may evolve in the future if additional evidence or an explicit conceptual decision justifies doing so.

The current catalog is not required to contain the same number of concepts as the Identity catalog.

---

# 9. Boundary Explorer Designation

Boundary Explorer describes a recognizable taste pattern characterized by attraction to:

* unfamiliar experiences;
* speculative experiences;
* surreal experiences;
* experimental experiences;
* boundary-pushing experiences.

The distinction between isolated sampling and sustained attraction remains relevant to the current concept.

Boundary Explorer is a **taste classification**.

It does not establish that the curator intentionally seeks novelty or deliberately explores boundaries.

---

# 10. Curator Designation

Curator describes a recognizable taste pattern involving:

* breadth;
* variety;
* appreciation of craft;
* appreciation of presentation;
* substantial archive selection across different areas of media.

Curator is a **taste classification**.

It does not by itself establish a broader philosophy of variety, organization, collecting, or intentional diversification.

---

# 11. Engagement Architect Designation

Engagement Architect describes a recognizable taste pattern characterized by strong engagement with:

* execution;
* systems;
* pacing;
* gameplay;
* structural mechanisms;
* other mechanisms that make an experience compelling.

Engagement Architect is a **taste classification**.

It does not automatically establish a broader philosophy of systems thinking or construction.

---

# 12. Deep Diver Designation

Deep Diver describes a recognizable taste pattern characterized by sustained attraction to:

* layered experiences;
* emotionally resonant media;
* psychologically rich media;
* interpretively rewarding media;
* experiences that support sustained attention.

Deep Diver is a **taste classification**.

It does not automatically establish a broader interpretive philosophy.

---

# 13. Current Identity Catalog

The accepted Identity catalog contains three concepts:

1. **Interpretive Philosophy**
2. **Exploratory Philosophy**
3. **Breadth Philosophy**

These concepts were selected because they occupy a meaningfully different semantic layer from the current Designation catalog.

The Identity catalog is intentionally smaller than the Designation catalog.

That is not a problem.

The two systems answer different questions and therefore do not require one-to-one correspondence.

---

# 14. Interpretive Philosophy

## 14.1 Definition

Interpretive Philosophy describes a recurring relationship with media characterized by engagement through:

* depth;
* reflection;
* complexity;
* ambiguity;
* interpretation.

Its conceptual subject is **meaning-making and interpretive engagement**.

---

## 14.2 Core Question

> **How do you engage with what you consume?**

More specifically:

> **Does this archive repeatedly demonstrate engagement with media as something to interpret, unpack, question, and reconsider?**

---

## 14.3 Conceptual Boundary

Interpretive Philosophy is not simply:

* liking highly rated media;
* liking emotionally intense media;
* liking psychological genres;
* liking mystery;
* liking surreal media;
* preferring depth;
* preferring experimental media;
* preferring originality;
* having a large archive;
* having many genres represented.

Those characteristics may contribute evidence.

They do not independently define the Identity.

---

## 14.4 Relationship to Deep Diver

Deep Diver Designation identifies a recognizable taste pattern toward depth, layering, psychological richness, and sustained attention.

Interpretive Philosophy operates at a different level.

It describes the broader relationship with those experiences:

> **The curator tends to engage with media as something to interpret, question, unpack, and reconsider.**

Therefore:

> **Deep Diver ≠ Interpretive Philosophy**

The two may legitimately coexist.

---

# 15. Exploratory Philosophy

## 15.1 Definition

Exploratory Philosophy describes a recurring relationship with unfamiliar or boundary-expanding territory.

Relevant characteristics include:

* novelty;
* unfamiliarity;
* contrast;
* boundary expansion;
* movement beyond established territory.

Its conceptual subject is the curator's **relationship with the boundaries of their media territory**.

---

## 15.2 Core Question

> **How do you relate to the boundaries of what you consume?**

More specifically:

> **Does this archive repeatedly demonstrate engagement with experiences beyond established taste territory?**

---

## 15.3 Conceptual Boundary

Exploratory Philosophy is not simply:

* liking experimental media;
* liking unusual media;
* having high originality;
* having high novelty;
* having high genre diversity;
* having one unusual work in the archive.

These characteristics can provide evidence.

They do not independently prove exploration.

---

## 15.4 Relationship to Boundary Explorer

Boundary Explorer Designation describes a recognizable taste classification centered on attraction to unfamiliar or boundary-pushing media.

Exploratory Philosophy describes the broader relationship with unfamiliar territory:

> **The curator demonstrates a recurring relationship with expanding or testing the boundaries of their media territory.**

The two may legitimately coexist.

Therefore:

> **Boundary Explorer ≠ Exploratory Philosophy**

Neither should be defined as a restatement of the other.

---

## 15.5 Intentionality Boundary

The archive does not directly observe:

* deliberate search behavior;
* conscious exploration;
* intent;
* trajectory through taste space;
* deliberate boundary testing.

Therefore Exploratory Philosophy must remain an evidence-based interpretation.

It must not be presented as proof that the curator consciously or deliberately explores.

---

# 16. Breadth Philosophy

## 16.1 Definition

Breadth Philosophy describes the range of territory represented in the archive.

Its conceptual subject is **observable variety**.

---

## 16.2 Core Question

> **How wide is the territory you consume?**

Breadth Philosophy concerns the extent of the media territory represented by the archive.

---

## 16.3 Conceptual Boundary

Breadth Philosophy does not automatically mean:

* deliberate diversification;
* intentional exploration;
* broad curiosity in every domain;
* collecting behavior;
* organizational behavior;
* a specific motivation for consuming varied media.

Observable variety establishes range.

It does not establish why that range exists.

---

## 16.4 Relationship to Curator

Curator Designation describes a recognizable taste classification involving breadth, variety, craft, presentation, and archive characteristics.

Breadth Philosophy focuses specifically on the **range of territory represented** by the archive.

Therefore:

> **Curator ≠ Breadth Philosophy**

The concepts may use related evidence while answering different questions.

---

# 17. Cross-Identity Differentiation

The three current Identities answer three distinct questions:

| Identity                    | Core question                                            |
| --------------------------- | -------------------------------------------------------- |
| **Interpretive Philosophy** | How do you engage with what you consume?                 |
| **Exploratory Philosophy**  | How do you relate to the boundaries of what you consume? |
| **Breadth Philosophy**      | How wide is the territory you consume?                   |

These are different dimensions.

An archive may legitimately demonstrate all three.

For example, an archive can simultaneously show:

* deep engagement with meaning and interpretation;
* recurring engagement with unfamiliar territory;
* broad representation across genres.

This does not create conceptual conflict because the Identities describe different dimensions of the curator/media relationship.

---

# 18. Identity Differentiation Rules

The Identity catalog must preserve the following negative-space boundaries.

### Interpretive Philosophy

High:

* depth;
* emotional impact;
* reflection;
* ambiguity;
* analysis

may support Interpretive Philosophy.

But Interpretive Philosophy must not be reduced to:

* high depth alone;
* psychological genre preference;
* high average score;
* emotional intensity;
* experimental taste;
* originality;
* archive size.

---

### Exploratory Philosophy

High:

* originality;
* genre diversity;
* experimental affinity;
* novelty

may support Exploratory Philosophy.

But Exploratory Philosophy must not be reduced to:

* experimental media;
* unusual media;
* originality alone;
* novelty alone;
* genre diversity alone.

---

### Breadth Philosophy

High:

* genre diversity;
* media territory diversity

may support Breadth Philosophy.

But Breadth Philosophy must not be reduced to:

* archive size;
* one dominant genre;
* originality;
* novelty;
* depth;
* engagement;
* craft.

---

# 19. Identity vs. Designation Examples

The following distinctions are representative of the conceptual boundary.

### Boundary Explorer vs Exploratory Philosophy

**Designation:**

> The archive tends to like unusual or boundary-pushing media.

**Identity:**

> The archive demonstrates a recurring relationship with expanding or testing its established media territory.

---

### Deep Diver vs Interpretive Philosophy

**Designation:**

> The archive tends to like layered, psychologically rich, and sustained experiences.

**Identity:**

> The curator tends to engage with media as something to interpret, question, unpack, and reconsider.

---

### Curator vs Breadth Philosophy

**Designation:**

> The archive demonstrates a recognizable taste pattern involving breadth, variety, craft, and presentation.

**Identity:**

> The archive demonstrates a broad range of media territory.

---

# 20. Identity Evidence Does Not Establish Psychology

The Identity system may describe a recurring orientation demonstrated by archive evidence.

It must not claim access to internal psychological states.

The archive does not directly establish:

* personality;
* motivation;
* intent;
* cognition;
* private interpretation;
* emotional life outside the tracked media domain.

Identity language must therefore remain appropriately evidence-bounded.

---

# 21. Identity Evidence Hierarchy

Identity evidence may be understood conceptually as:

### Direct

Evidence that closely corresponds to the quality being evaluated.

### Supporting

Evidence that strengthens a conclusion without independently establishing it.

### Proxy / Contextual

Indirect or derived evidence that may support an interpretation while carrying additional uncertainty.

### Insufficient

Evidence that does not provide enough support for the conclusion by itself.

The detailed mapping of current Identity signals to these categories belongs in:

`identity-evidence-mapping.md`

---

# 22. Identity Data Sufficiency

Identity evaluation requires enough archive data to support meaningful evaluation.

Data Sufficiency is distinct from Identity Signal Strength.

Conceptually:

> **Data Sufficiency asks whether there is enough information to evaluate the Identity.**

> **Signal Strength asks how strongly the available information expresses the Identity's associated signals.**

A strong signal does not compensate for insufficient data.

Insufficient data does not imply negative preference.

The current operational eligibility rules belong to the implementation and fixture contracts.

---

# 23. Identity Scoring Boundary

Identity Score represents the strength of the signals associated with an Identity.

It does not represent:

* probability;
* statistical confidence;
* psychological certainty;
* certainty of internal motivation.

The scoring mechanism is an implementation concern.

The current fixture-level weights and eligibility requirements are maintained separately from this conceptual contract.

---

# 24. Primary and Secondary Identity

The Identity system supports:

* one Primary Identity;
* optional additional meaningful Identity results.

Primary and secondary selection are implementation behavior.

The conceptual contract does not require every archive to have a secondary Identity.

Likewise, the existence of multiple eligible Identities does not imply that they are equally strong.

The current ranking and secondary-selection policy is defined by the Decision & Implementation Map.

---

# 25. Determinism

Where the system presents a single Identity or Designation, the result must be deterministic.

This is necessary for:

* reproducibility;
* testing;
* explainability;
* stable API behavior.

The exact implementation of ranking and tie resolution belongs in the Decision & Implementation Map.

This document establishes the conceptual requirement for deterministic selection, not its implementation algorithm.

---

# 26. Recommendation Boundary

Neither Identity nor Designation is itself a recommendation category.

Both systems may expose recommendation-oriented metadata.

That metadata does not change their conceptual meaning.

Therefore:

> **Identity ≠ Recommendation Engine**

and:

> **Designation ≠ Recommendation Engine**

Recommendation logic remains a separate concern.

---

# 27. Catalog Evolution

The current catalogs are authoritative for the current system, but they are not permanently immutable.

Future evidence may justify:

* adding concepts;
* refining concepts;
* renaming concepts;
* splitting concepts;
* merging redundant concepts;
* retiring concepts.

Any such change requires an explicit conceptual decision.

Catalog evolution must preserve the foundational distinction between Identity and Designation.

A new label must not be introduced merely to rename an existing concept.

---

# 28. Current Conceptual Commitments

The following are locked conceptual commitments:

1. Designation is a recognizable taste classification.
2. Identity is a broader curatorial philosophy or recurring mode of engagement.
3. Designation and Identity answer different questions.
4. The systems may share evidence.
5. The systems must not collapse into the same conclusion.
6. Identity must not be created by renaming or reweighting a Designation.
7. The current Identity catalog contains Interpretive Philosophy, Exploratory Philosophy, and Breadth Philosophy.
8. Interpretive concerns engagement with meaning and interpretation.
9. Exploratory concerns the relationship with unfamiliar or boundary-expanding territory.
10. Breadth concerns the range of territory represented by the archive.
11. Observable archive evidence does not automatically establish intent or psychology.
12. Identity and Designation are not recommendation systems.
13. Deterministic selection is required where a single result is presented.
14. Current catalog evolution remains evidence-driven.

---

# 29. What This Document Does Not Define

This document does not define:

* exact fixture JSON;
* exact Identity weights;
* exact minimum-entry thresholds;
* exact scoring formulas;
* exact normalization formulas;
* exact secondary-selection thresholds;
* exact tie-resolution algorithms;
* API field names;
* frontend labels;
* Observation implementation;
* Finding implementation;
* Recommendation Engine behavior;
* Archive State operational thresholds.

Those concerns belong to their appropriate authorities.

---

# 30. Authority Boundaries

The current documentation authority is intentionally divided.

### Intelligence Contract

Defines the overall meaning of the intelligence system.

### Decision & Implementation Map

Defines current implementation decisions, behavioral contracts, gates, and work order.

### Identity & Designation Contract

Defines the conceptual meaning and boundary between Designations and Identities.

### Identity Fixture Contract

Defines exact current Identity fixture-level constraints.

### Identity Evidence Mapping

Defines the rationale and limitations of current Identity evidence.

### Intelligence Forensic Audit

Provides repository and behavioral evidence.

This division prevents one document from silently becoming the authority for concepts it does not own.

---

# 31. Final Boundary

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
     DESIGNATION         IDENTITY
          │                 │
   Taste classification   Curatorial
                          orientation
          │                 │
          ↓                 ↓
   What do you tend       What relationship
      to like?            do you establish
                          with what you like?
```

The two systems are related.

They are not interchangeable.

The central rule is:

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

And the governing implementation rule remains:

> **Establish the semantic contract first. Align terminology and implementation to that contract without changing behavior unless an explicit conceptual decision requires the change.**
