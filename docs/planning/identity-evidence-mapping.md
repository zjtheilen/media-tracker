```
__    __  ___     ___  ___   ____  ___
\ \/\/ / / ◯\   _\\  / ◯\  | D ) | |
 \_/\_/○/_/ \_\○/__/○/_/ \_\○|_D_)○|_|○
WEIGHTED ARCHIVE SYSTEM for ANALYSIS & BEHAVIORAL INSIGHTS

A media tracking, rating, and analytics app by Zachary Theilen
```

# Media Tracker — Identity Fixture Contract

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Status:** Current Fixture Authority
**Scope:** Exact current Identity fixture definitions and fixture-level constraints

---

# 1. Purpose

This document defines the exact current fixture contract for the Media Tracker Identity system.

It establishes the fixture-level representation of the active Identity catalog, including:

* Identity IDs;
* titles;
* categories;
* icons;
* descriptions;
* declared Identity signals;
* recommendation-bias metadata;
* minimum-entry requirements;
* Identity signal weights.

This document exists to provide a stable contract between:

* Identity concepts;
* Identity fixture files;
* Identity scoring;
* Identity explanation;
* Identity selection;
* regression tests;
* downstream Profile presentation.

It is authoritative for the **current fixture definitions**.

It is not the highest-level authority for what Identity means.

---

# 2. Authority

The documentation sequence is:

```text
Intelligence Contract
        ↓
Identity & Designation Contract
        ↓
Identity Evidence Mapping
        ↓
Identity Fixture Contract
        ↓
Decision & Implementation Map
        ↓
Implementation
        ↓
Regression Tests
```

Each layer has a different responsibility.

### Intelligence Contract

Defines the overall meaning of the intelligence system.

### Identity & Designation Contract

Defines what Identity and Designation mean and how they differ.

### Identity Evidence Mapping

Defines why current signals support each Identity and where those signals are limited.

### Identity Fixture Contract

Defines the exact current fixture representation.

### Decision & Implementation Map

Defines how the implementation uses those fixtures, including eligibility, scoring, ranking, primary selection, secondary selection, and tie behavior.

Therefore:

> **The fixture implements the conceptual contract; the fixture does not redefine the conceptual contract.**

---

# 3. Current Identity Catalog

The active Identity catalog contains exactly three fixtures:

1. `interpretive_philosophy`
2. `exploratory_philosophy`
3. `breadth_philosophy`

No previous Identity fixture remains part of the active catalog.

The active fixtures represent:

* Interpretive Philosophy;
* Exploratory Philosophy;
* Breadth Philosophy.

The previous Identity concepts were retired because they did not maintain sufficient conceptual separation from the Designation catalog.

Historical Identity evolution is preserved separately in the Identity Catalog/history documentation.

---

# 4. Fixture Schema

Each current Identity fixture uses the following fields:

```text
id
title
category
icon
description
identity
recommendation_bias
requirements
identity_weights
```

The current fixture structure is JSON-based.

The fixture system is data-driven.

The Identity scorer loads the fixture definitions rather than hard-coding the active Identity catalog into the scoring engine.

---

# 5. Field Definitions

## 5.1 `id`

The stable machine-readable Identity identifier.

It is used to identify the Identity throughout implementation and downstream processing.

Current IDs:

```text
interpretive_philosophy
exploratory_philosophy
breadth_philosophy
```

---

## 5.2 `title`

The human-readable Identity name.

Current titles:

```text
Interpretive Philosophy
Exploratory Philosophy
Breadth Philosophy
```

---

## 5.3 `category`

The fixture-level category associated with the Identity.

Current categories:

| Identity                | Category             |
| ----------------------- | -------------------- |
| Interpretive Philosophy | `interpretive`       |
| Exploratory Philosophy  | `exploratory`        |
| Breadth Philosophy      | `curatorial_variety` |

The category is fixture metadata.

It is not itself a scoring signal.

---

## 5.4 `icon`

The presentation-oriented icon identifier stored by the fixture.

Current values:

| Identity                | Icon      |
| ----------------------- | --------- |
| Interpretive Philosophy | `diver`   |
| Exploratory Philosophy  | `compass` |
| Breadth Philosophy      | `compass` |

These values are intentionally preserved.

Icon differentiation is a presentation concern and is not part of the current Identity conceptual migration.

---

## 5.5 `description`

The concise human-readable description of the Identity.

The description should communicate the Identity concept without turning it into a psychological claim.

Current descriptions are defined exactly in the fixture definitions below.

---

## 5.6 `identity`

The list of signals declared by the fixture.

This field represents the signals associated with the Identity.

The current scoring implementation uses the fixture's weighted signals from `identity_weights`.

The `identity` list and `identity_weights` should remain consistent.

---

## 5.7 `recommendation_bias`

A list of recommendation-oriented metadata associated with the Identity.

This metadata describes types of media that may be relevant to future or existing recommendation behavior.

It is not itself a recommendation algorithm.

It does not establish that a complete Recommendation Engine exists.

---

## 5.8 `requirements`

Fixture-level requirements that determine whether the Identity can be evaluated.

The current fixture requirement is:

```text
minimum_entries
```

Minimum entries are an eligibility/Data Sufficiency constraint.

They are not a score.

---

## 5.9 `identity_weights`

The fixture-defined weighting of Identity signals.

Weights determine the relative contribution of configured signals within the existing Identity scoring architecture.

The current Identity weights sum to `1.00` for every active fixture.

---

# 6. Interpretive Philosophy Fixture

## 6.1 Exact Fixture

```json
{
    "id": "interpretive_philosophy",
    "title": "Interpretive Philosophy",
    "category": "interpretive",
    "icon": "diver",
    "description": "Engages with media through depth, reflection, complexity, and interpretation.",
    "identity": [
        "depth",
        "emotional_impact",
        "reflection",
        "ambiguity",
        "analysis"
    ],
    "recommendation_bias": [
        "layered narratives",
        "ambiguous endings",
        "psychologically rich works",
        "reflective storytelling",
        "complex or multi-interpretive experiences",
        "works that reward close attention"
    ],
    "requirements": {
        "minimum_entries": 20
    },
    "identity_weights": {
        "depth": 0.45,
        "emotional_impact": 0.25,
        "reflection": 0.12,
        "ambiguity": 0.10,
        "analysis": 0.08
    }
}
```

---

## 6.2 Fixture Identity

```text
id:
interpretive_philosophy
```

```text
title:
Interpretive Philosophy
```

```text
category:
interpretive
```

```text
icon:
diver
```

---

## 6.3 Description

> **Engages with media through depth, reflection, complexity, and interpretation.**

This description is fixture-level presentation text.

The broader conceptual definition is governed by the Identity & Designation Contract.

---

## 6.4 Declared Signals

The fixture declares:

```text
depth
emotional_impact
reflection
ambiguity
analysis
```

---

## 6.5 Recommendation Bias

The fixture declares:

```text
layered narratives
ambiguous endings
psychologically rich works
reflective storytelling
complex or multi-interpretive experiences
works that reward close attention
```

These are recommendation-oriented metadata values.

They are not Identity scoring signals.

---

## 6.6 Minimum Entries

```text
20
```

Interpretive Philosophy is eligible only when the archive satisfies this fixture requirement.

---

## 6.7 Weights

| Signal             |   Weight |
| ------------------ | -------: |
| `depth`            |     0.45 |
| `emotional_impact` |     0.25 |
| `reflection`       |     0.12 |
| `ambiguity`        |     0.10 |
| `analysis`         |     0.08 |
| **Total**          | **1.00** |

These weights are finalized fixture-level constraints.

---

# 7. Exploratory Philosophy Fixture

## 7.1 Exact Fixture

```json
{
    "id": "exploratory_philosophy",
    "title": "Exploratory Philosophy",
    "category": "exploratory",
    "icon": "compass",
    "description": "Extends beyond established preferences through engagement with unfamiliar territory.",
    "identity": [
        "originality",
        "genre_diversity",
        "depth",
        "experimental_affinity",
        "novelty"
    ],
    "recommendation_bias": [
        "experiences that expand existing territory",
        "unfamiliar genres",
        "unfamiliar media types",
        "adjacent-but-unfamiliar works",
        "experiences outside the archive's established comfort zone",
        "works that extend established preferences"
    ],
    "requirements": {
        "minimum_entries": 20
    },
    "identity_weights": {
        "originality": 0.35,
        "genre_diversity": 0.25,
        "depth": 0.15,
        "experimental_affinity": 0.15,
        "novelty": 0.10
    }
}
```

---

## 7.2 Fixture Identity

```text
id:
exploratory_philosophy
```

```text
title:
Exploratory Philosophy
```

```text
category:
exploratory
```

```text
icon:
compass
```

---

## 7.3 Description

> **Extends beyond established preferences through engagement with unfamiliar territory.**

This description represents the fixture-level expression of the Exploratory Philosophy concept.

The conceptual distinction between exploration and merely liking unusual or experimental media is governed by the Identity & Designation Contract and Identity Evidence Mapping.

---

## 7.4 Declared Signals

The fixture declares:

```text
originality
genre_diversity
depth
experimental_affinity
novelty
```

---

## 7.5 Recommendation Bias

The fixture declares:

```text
experiences that expand existing territory
unfamiliar genres
unfamiliar media types
adjacent-but-unfamiliar works
experiences outside the archive's established comfort zone
works that extend established preferences
```

These values are recommendation-oriented metadata.

They are not additional scoring signals.

---

## 7.6 Minimum Entries

```text
20
```

Exploratory Philosophy is eligible only when the archive satisfies this fixture requirement.

---

## 7.7 Weights

| Signal                  |   Weight |
| ----------------------- | -------: |
| `originality`           |     0.35 |
| `genre_diversity`       |     0.25 |
| `depth`                 |     0.15 |
| `experimental_affinity` |     0.15 |
| `novelty`               |     0.10 |
| **Total**               | **1.00** |

These weights are finalized fixture-level constraints.

---

# 8. Breadth Philosophy Fixture

## 8.1 Exact Fixture

```json
{
    "id": "breadth_philosophy",
    "title": "Breadth Philosophy",
    "category": "curatorial_variety",
    "icon": "compass",
    "description": "Engages with a wide range of genres and areas of the media landscape.",
    "identity": [
        "genre_diversity"
    ],
    "recommendation_bias": [
        "underrepresented genres",
        "underrepresented media types",
        "adjacent areas of the media landscape",
        "works that broaden the range of the existing archive",
        "areas of media not yet represented in the archive"
    ],
    "requirements": {
        "minimum_entries": 15
    },
    "identity_weights": {
        "genre_diversity": 1.0
    }
}
```

---

## 8.2 Fixture Identity

```text
id:
breadth_philosophy
```

```text
title:
Breadth Philosophy
```

```text
category:
curatorial_variety
```

```text
icon:
compass
```

---

## 8.3 Description

> **Engages with a wide range of genres and areas of the media landscape.**

This description represents the observable-range focus of Breadth Philosophy.

It does not establish deliberate diversification or intentional exploration.

---

## 8.4 Declared Signals

The fixture declares:

```text
genre_diversity
```

---

## 8.5 Recommendation Bias

The fixture declares:

```text
underrepresented genres
underrepresented media types
adjacent areas of the media landscape
works that broaden the range of the existing archive
areas of media not yet represented in the archive
```

These values are recommendation-oriented metadata.

They are not additional scoring signals.

---

## 8.6 Minimum Entries

```text
15
```

Breadth Philosophy is eligible only when the archive satisfies this fixture requirement.

---

## 8.7 Weights

| Signal            |   Weight |
| ----------------- | -------: |
| `genre_diversity` |     1.00 |
| **Total**         | **1.00** |

The single-signal weighting is intentional for the current fixture.

It should not be interpreted as a general rule that all Identity concepts should use one signal.

---

# 9. Fixture Consistency Requirements

The active Identity fixtures must satisfy the following constraints.

## 9.1 Stable IDs

Each active Identity has a unique `id`.

Current IDs:

```text
interpretive_philosophy
exploratory_philosophy
breadth_philosophy
```

---

## 9.2 Stable Titles

Each active Identity has a human-readable `title`.

Current titles are unique.

---

## 9.3 Declared Signals and Weights

Every signal used by the current scoring implementation must have a corresponding `identity_weights` entry.

The active fixtures satisfy this requirement.

---

## 9.4 Weight Totals

The weights for every active fixture sum to:

```text
1.00
```

Current totals:

| Identity                | Weight total |
| ----------------------- | -----------: |
| Interpretive Philosophy |         1.00 |
| Exploratory Philosophy  |         1.00 |
| Breadth Philosophy      |         1.00 |

---

## 9.5 Minimum Entry Requirements

Every active fixture defines:

```text
requirements.minimum_entries
```

Current values:

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

---

# 10. Fixture-Level Numeric Constraints

The finalized current fixture constraints are:

| Identity                | Minimum entries | Signal weights                                                                          |
| ----------------------- | --------------: | --------------------------------------------------------------------------------------- |
| Interpretive Philosophy |              20 | depth .45, emotional impact .25, reflection .12, ambiguity .10, analysis .08            |
| Exploratory Philosophy  |              20 | originality .35, genre diversity .25, depth .15, experimental affinity .15, novelty .10 |
| Breadth Philosophy      |              15 | genre diversity 1.00                                                                    |

These values are authoritative at the fixture level.

They are not a replacement for the broader Identity scoring policy.

---

# 11. Recommendation Bias Boundary

`recommendation_bias` is metadata.

It may describe:

* types of narratives;
* types of genres;
* types of media;
* areas outside the current archive;
* experiences related to the Identity concept.

It does not itself:

* calculate a recommendation;
* rank recommendations;
* establish recommendation confidence;
* establish a Recommendation Engine;
* add hidden Identity scoring signals.

The values should therefore remain separate from `identity_weights`.

---

# 12. Fixture Signals vs Conceptual Evidence

The presence of a signal in the `identity` list does not mean that the signal directly observes the Identity concept.

For example:

```text
Exploratory Philosophy
        ↓
experimental_affinity
```

does not mean:

> `experimental_affinity` directly measures exploration.

Likewise:

```text
Interpretive Philosophy
        ↓
depth
```

does not mean:

> `depth` directly measures interpretation.

And:

```text
Breadth Philosophy
        ↓
genre_diversity
```

does not mean:

> `genre_diversity` directly measures intentional diversification.

The conceptual interpretation and limitations of these signals belong to the Identity Evidence Mapping.

---

# 13. Fixture Changes

Changing any of the following constitutes a fixture-level change:

* Identity ID;
* title;
* category;
* icon;
* description;
* declared signals;
* recommendation bias;
* minimum-entry requirement;
* Identity weight;
* adding or removing an active Identity fixture.

Fixture changes must not be made merely to make the implementation easier.

A conceptual change to an Identity should occur before changing its fixture representation.

---

# 14. Fixture Change Requirements

A change to an active fixture should have:

1. an explicit conceptual reason;
2. a corresponding documentation update;
3. appropriate implementation comparison;
4. updated regression protection where behavior changes;
5. confirmation that the Identity remains conceptually distinct from Designations and other Identities.

Changing a fixture without reconsidering its conceptual contract risks implementation drift.

---

# 15. Retired Fixtures

The current active catalog does not include the former Identity concepts that duplicated Designation semantics.

The retired concepts include earlier Identity names such as:

* Boundary Explorer;
* Deep Diver;
* Engagement Architect.

These names remain historically relevant because their retirement explains the current Identity ontology.

They are not active fixture definitions.

Historical reasoning belongs in the Identity Catalog/history documentation.

---

# 16. No Hidden Fixture Semantics

The fixture contract does not authorize hidden meanings beyond the declared fields.

In particular:

* `category` is not an additional score;
* `icon` is not an evidence signal;
* `description` is not a score;
* `recommendation_bias` is not an implicit score;
* `minimum_entries` is not a strength value;
* `identity` is not a second hidden scoring formula;
* `identity_weights` does not establish statistical confidence.

The scoring engine should use the fixture according to the implementation contract rather than infer additional semantics from presentation metadata.

---

# 17. Current Fixture Authority

For the active Identity catalog, the following definitions are authoritative:

### Interpretive Philosophy

```text
id: interpretive_philosophy
category: interpretive
minimum_entries: 20
weights:
  depth: 0.45
  emotional_impact: 0.25
  reflection: 0.12
  ambiguity: 0.10
  analysis: 0.08
```

### Exploratory Philosophy

```text
id: exploratory_philosophy
category: exploratory
minimum_entries: 20
weights:
  originality: 0.35
  genre_diversity: 0.25
  depth: 0.15
  experimental_affinity: 0.15
  novelty: 0.10
```

### Breadth Philosophy

```text
id: breadth_philosophy
category: curatorial_variety
minimum_entries: 15
weights:
  genre_diversity: 1.00
```

The complete JSON definitions in the repository are authoritative for all other fixture fields.

---

# 18. Relationship to Implementation

This document defines **what the fixtures contain**.

The Decision & Implementation Map defines **how the implementation uses them**.

That includes:

* eligibility processing;
* normalization;
* scoring;
* ranking;
* primary Identity selection;
* secondary Identity selection;
* tie resolution;
* explanation behavior.

Those mechanisms should not be duplicated here.

---

# 19. Relationship to Evidence Mapping

This document defines which signals are configured.

The Identity Evidence Mapping defines:

* why those signals were selected;
* whether they are direct, supporting, proxy, or insufficient evidence;
* what each signal can and cannot establish;
* where signals overlap;
* where evidence limitations remain.

A configured signal is therefore not automatically a direct measurement of the Identity.

---

# 20. Relationship to Identity & Designation Contract

The Identity & Designation Contract defines:

> **What the Identity concept means.**

This document defines:

> **How that concept is represented in the current fixture.**

If fixture wording and conceptual meaning diverge, the conceptual contract must be resolved before silently changing the fixture.

---

# 21. Current Fixture Integrity Check

The current three active fixtures satisfy the finalized Phase 1 fixture constraints:

* all three active Identity IDs are unique;
* all three active titles are unique;
* all three active fixtures define required fields;
* all declared scoring signals have weights;
* all fixture weights sum to `1.00`;
* Interpretive minimum entries = `20`;
* Exploratory minimum entries = `20`;
* Breadth minimum entries = `15`;
* no retired Designation-clone Identity remains active;
* recommendation bias remains metadata rather than scoring;
* current icons remain intentionally preserved.

---

# 22. Final Fixture Principle

The Identity fixture system exists to make the current Identity catalog:

* explicit;
* inspectable;
* data-driven;
* deterministic;
* testable;
* explainable;
* resistant to accidental conceptual drift.

The fixture should faithfully represent the current Identity contract.

It should not become a substitute for that contract.

> **The fixture implements the concept. It does not invent the concept.**

And the governing project principle remains:

> **Establish the semantic contract first. Align terminology and implementation to that contract without changing behavior unless an explicit conceptual decision requires the change.**
