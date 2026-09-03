```
__    __ ___    ___ ___  ____
\ \/\/ // A \  _\\ / A \ | D )| |
 \_/\_//_/ \_\/__//_/ \_\|_D_)|_|
 Weighted Archive System for Analytics & Behavioral Insights
```

# Media Tracker

Media Tracker is a personal media library and taste-intelligence platform built with FastAPI, Python, JavaScript, and SQLite.

Rather than simply storing ratings, Media Tracker analyzes an archive of completed media experiences to build an increasingly useful description of the curator behind the collection.

The project is intentionally built around:

> **Explainable intelligence, evidence before interpretation, and evolution rather than rewrite.**

---

# What Media Tracker Is Trying to Answer

The application ultimately asks:

1. What qualities are strongly represented in my archive?
2. What kinds of media do I repeatedly respond to?
3. What recurring patterns can the archive directly demonstrate?
4. What do those patterns suggest?
5. What recognizable taste classifications fit the archive?
6. What broader curatorial philosophies does the archive demonstrate?
7. What evidence supports those conclusions?
8. What should I experience next?

The system treats these as related but distinct questions rather than collapsing them into a single intelligence score.

---

# Current Status

The `develop-3` branch contains a substantially developed intelligence layer and a working media archive.

Implemented or substantially implemented areas include:

- media archive / CRUD
- universal scoring
- media-specific scoring
- scoring profiles and rubrics
- genre intelligence
- Traits
- Observations
- Findings
- Designations
- Identity scoring
- identity-derived signals
- identity contribution breakdowns
- evidence infrastructure
- Archive Profile backend infrastructure
- narrative infrastructure
- generated Reports / Lists
- recommendation infrastructure

The Recommendation Engine itself remains future work.

The project is currently in **Phase 1 — Intelligence Alignment**, where the goal is to reconcile terminology, behavior, and documentation with the established conceptual contract without unnecessarily rewriting working systems.

### Current regression baseline

The current test suite is:

> **245 passing tests, 0 failing tests**

The suite is currently green.

The current 245-test baseline follows the completed Identity catalog migration. Earlier test-count checkpoints are historical milestones and should not be interpreted mechanically as regressions or losses of functionality.

---

# Intelligence Model

The intelligence systems are intentionally **parallel analytical perspectives** over shared archive data.

They are not required to form a strict runtime pipeline.

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

This diagram represents conceptual relationships rather than a mandatory function-call hierarchy.

Different intelligence layers may consume the same underlying evidence while interpreting that evidence differently.

> **Evidence can overlap. Meaning cannot.**

---

# Intelligence Layers

## Traits

Traits are measurable qualities represented in the archive.

Examples include:

- Originality
- Depth
- Engagement
- Craft
- Gameplay Mechanics
- Thought Provocation

Traits answer:

> **What qualities are strongly represented in the data?**

Trait values represent **Signal Strength**, not confidence.

For example:

```text
Originality: 8.8
```

means that originality is strongly represented in the archive according to the scoring system.

It does not mean:

```text
88% confidence that originality exists
```

---

## Genre Signals

Genre Signals describe recurring relationships between the archive and genres or media types.

They may include:

- genre presence
- genre affinity
- genre combinations
- cross-media relationships
- other explicitly defined genre behavior

Genre Signals answer:

> **What kinds of media does the archive repeatedly respond to?**

A genre appearing once is not automatically evidence of a meaningful preference.

---

## Observations

An Observation is a recurring pattern that can be directly demonstrated from archive evidence.

Observation answers:

> **What recurring pattern can we directly demonstrate?**

Observations remain relatively close to measurable evidence.

The Observation system uses explicit evidence evaluation rather than treating a generic confidence value as the universal explanation mechanism.

The public Observation evidence field is **Evidence Strength**.

---

## Findings

A Finding is an interpretive conclusion suggested by available evidence.

Finding answers:

> **What does the available evidence suggest?**

A Finding should provide additional meaning rather than simply restating an Observation.

The distinction is:

> **Observation:** What can we directly demonstrate?

> **Finding:** What does the evidence suggest?

Finding evidence remains intentionally conservative. The system should not invent certainty where the archive does not support it.

---

## Designations

A Designation is a recognizable taste classification.

Designation answers:

> **What named taste classification fits this archive?**

Designations are rule-driven classifications that may produce multiple candidates internally.

The current catalog contains:

### Boundary Explorer

A taste classification associated with attraction to unfamiliar, speculative, experimental, or boundary-pushing experiences.

### Engagement Architect

A taste classification associated with strong engagement with interactive structure, craft, gameplay mechanics, and pacing.

### Deep Diver

A taste classification associated with sustained attention, depth, emotional impact, and layered experiences.

### Curator

A taste classification associated with deliberate-seeming selection, craft, presentation, archive composition, and genre diversity.

The Profile presents one **Primary Designation**.

Designation candidates remain independently ranked, and primary selection is deterministic.

Designations may also provide recommendation-oriented metadata through `recommendation_bias`.

`recommendation_bias` is not itself a recommendation score or completed Recommendation Engine.

---

# Designation vs Identity

Designations and Identities are deliberately different concepts.

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

In simpler terms:

```text
Designation:
What do you tend to like?

Identity:
What relationship do you tend to establish with what you like?
```

A Designation is therefore a recognizable **taste classification**.

An Identity is a broader **curatorial philosophy** synthesized from multiple signals and potentially multiple taste patterns.

Identity is not:

- a personality diagnosis
- a psychological assessment
- a Designation with a different name
- a recommendation category
- a single favorite genre
- a restatement of one underlying Trait

Shared evidence is allowed.

Shared conclusions are not.

---

# Identity

The current Identity catalog contains three concepts:

## Interpretive Philosophy

> **How do you engage with what you consume?**

Interpretive Philosophy describes engagement with media through depth, reflection, complexity, and interpretation.

Its current observable evidence emphasizes:

- Depth
- Emotional Impact
- Reflection
- Ambiguity
- Analysis

Minimum archive size:

```text
20 entries
```

---

## Exploratory Philosophy

> **How do you relate to the boundaries of what you consume?**

Exploratory Philosophy describes extending beyond established preferences through engagement with unfamiliar territory.

Its current observable evidence emphasizes:

- Originality
- Genre Diversity
- Depth
- Experimental Affinity
- Novelty

Minimum archive size:

```text
20 entries
```

The current evidence is indirect. The system can observe patterns associated with unfamiliarity and variety, but it does not directly observe deliberate exploration, curiosity, intent, or trajectory.

---

## Breadth Philosophy

> **How wide is the territory you consume?**

Breadth Philosophy describes engagement with a wide range of genres and areas of the media landscape.

Its primary observable evidence is:

- Genre Diversity

Minimum archive size:

```text
15 entries
```

Breadth measures observable range.

It does not claim that the curator intentionally sought variety.

---

# Identity Scoring

The current Identity architecture is fixture-driven.

Identity fixtures define concepts such as:

- ID
- title
- category
- icon
- description
- associated signals
- recommendation bias
- minimum data requirements
- scoring weights

The scoring machinery includes:

- weighted signal scoring
- derived signals
- normalization
- ranking
- contribution breakdowns
- explanation

The scoring architecture is intentionally preserved while the catalog semantics have been aligned.

Each Identity exposes a contribution breakdown showing how its component signals contributed to the final Identity Score.

---

# Multiple Identities

An archive may contain multiple meaningful Identity candidates.

The system therefore separates:

```text
Eligibility
    ↓
Scoring
    ↓
Ranking
    ↓
Presentation
    ↓
Primary / Secondary resolution
```

Identity eligibility is determined by the fixture's minimum-entry requirement.

The current minimums are:

| Identity                | Minimum Entries |
| ----------------------- | --------------: |
| Interpretive Philosophy |              20 |
| Exploratory Philosophy  |              20 |
| Breadth Philosophy      |              15 |

The highest eligible Identity becomes the Primary Identity.

Primary selection is deterministic.

The current system does not create a co-primary Identity merely because two scores are equal.

Secondary Identities are optional. The current presentation rule requires an eligible non-primary Identity to reach the established secondary score threshold of `0.60`.

An Identity is not surfaced merely because:

- it has a positive score
- it ranks second
- it is numerically close to the primary
- it exists in the fixture catalog

---

# Evidence and Explainability

The intelligence layer is designed around:

> **Why does the system think this?**

Different intelligence layers may use different evidence representations.

Examples:

### Traits

Underlying scores and metrics.

### Genre Signals

Presence, affinity, combinations, and related calculations.

### Observations

Structured metric and genre evidence with explicit Evidence Strength.

### Findings

Structured supporting evidence for interpretive conclusions.

### Designations

Classification signals and a concise Designation Basis.

### Identity

Weighted contribution breakdowns and supporting signals.

The project does **not** require every subsystem to use the same evidence schema.

The requirement is that each intelligence layer remains explainable according to the kind of conclusion it actually makes.

---

# Quantitative Vocabulary

The project intentionally distinguishes several concepts that were previously represented using the generic word `confidence`.

## Signal Strength

How strongly a quality or signal is expressed.

Example:

```text
Originality: 8.8
```

is a Signal Strength value.

It is not a probability that the quality exists.

---

## Data Sufficiency

Whether enough archive data exists to reasonably evaluate a conclusion.

Data Sufficiency answers:

> **Do we have enough information to make this evaluation meaningfully?**

Data Sufficiency is primarily an eligibility and interpretation concern.

---

## Evidence Strength

How strongly the available evidence supports a conclusion.

Evidence Strength is used where the system evaluates the support provided by specific evidence.

It is not interchangeable with Signal Strength or Data Sufficiency.

---

## Classification Confidence — Retired

Classification Confidence was previously considered as a possible concept for describing how clearly one classification beats plausible alternatives.

It is **not part of the current intelligence implementation**.

It should not be reintroduced merely to provide terminology consistency.

The current system instead preserves its existing deterministic ranking behavior and distinguishes that behavior from Signal Strength and Data Sufficiency.

---

# Archive States

The intelligence layer recognizes three conceptual archive states:

### Empty

There is no meaningful archive data from which to generate intelligence.

### Sparse

Some intelligence may be available, but conclusions should communicate limited data sufficiency.

### Established

Enough archive data exists for meaningful interpretation.

The system should prefer:

> **Insufficient evidence**

over:

> **False certainty**

when data is inadequate.

Exact operational thresholds remain implementation-level decisions rather than being invented at the presentation layer.

---

# Analytics vs Archive Profile

Media Tracker intentionally separates these two surfaces.

## Analytics

Analytics answers:

> **What do the numbers say?**

It contains things such as:

- averages
- distributions
- score comparisons
- trends
- charts
- genre statistics
- quantitative comparisons

Analytics is primarily descriptive.

---

## Archive Profile

Profile answers:

> **What does the archive mean?**

It is intended to bring together:

- Primary Designation
- Primary Identity
- Secondary Identities
- Traits
- Genre Signals
- Observations
- Findings
- evidence and explanations
- narrative interpretation

The Profile should not simply become another Analytics dashboard.

Analytics describes the measurable archive.

Profile synthesizes the meaning derived from it.

---

# Scoring Philosophy

Media Tracker uses a hybrid scoring system.

Universal categories provide cross-media signals.

Media-specific categories provide type-appropriate detail.

Weighted scoring allows categories to reflect their relative importance.

The scoring system measures the user's reactions to **completed media experiences**.

The intelligence layer builds on those measurements rather than replacing them.

The project's scoring vocabulary intentionally uses **Scoring** rather than the older generic **Evaluation** terminology.

Examples include:

- Universal Scoring
- Media Scoring
- Score
- Score Distribution
- Average Score
- Designation Score
- Identity Score

---

# Reports / Lists

The Reports / Lists system provides generated archive views such as:

- highest-rated records
- highest-rated books
- highest-rated videos
- highest-rated games
- recent archive additions
- Archive Hall of Fame

These are separate from the interpretive Archive Profile.

Reports answer practical questions about the archive.

Profile answers what the archive means.

---

# Recommendation Engine

The Recommendation Engine is planned but is not yet a finished recommendation system.

Current infrastructure provides recommendation-oriented signals and metadata that can eventually support a full recommendation layer.

Potential inputs include measurable signals such as:

- Trait Signal Strength
- Genre Affinity
- universal scoring behavior
- media-specific scoring behavior
- Designation recommendation bias
- soft Observation signals
- soft Finding signals

Identity should influence recommendations indirectly through underlying measurable signals.

Identity should not simply become:

```text
Identity score = recommendation score
```

The eventual Recommendation Engine should answer both:

> **What should I experience next?**

and:

> **Why was this recommended?**

---

# Current Development Phase

## Phase 1 — Intelligence Alignment

**Status: Active**

The immediate goal is to align existing intelligence behavior and terminology with the conceptual contract.

Phase 1 focuses on:

- intelligence terminology alignment
- Designation semantics
- Identity / Designation separation
- Identity ontology
- Identity evidence mapping
- Identity eligibility
- Primary Identity selection
- Secondary Identity policy
- Findings vs Observations
- Finding evidence
- archive data sufficiency
- ranking and tie behavior
- regression protection
- documentation reconciliation

The guiding principle is:

> **Preserve compatible behavior. Change contradictions. Clarify ambiguity. Defer unrelated work.**

The major Identity alignment work is complete:

- Identity ontology differentiated from Designations
- three-Identity catalog established
- Identity evidence mapping established
- fixture contract established
- Identity fixtures migrated
- affected tests migrated
- deterministic Identity eligibility and ranking behavior protected
- frontend scoring terminology aligned
- obsolete frontend intelligence duplication removed
- current regression suite is green

Remaining Phase 1 work is tracked in the planning documents rather than being redefined here.

---

# Recovered Behavioral Contracts

The repository already contains meaningful behavior that should not be accidentally lost.

Examples include:

- Trait Signal Strength normalization
- separate Identity Score normalization
- Identity weighted scoring
- Identity derived signals
- Identity trait-resolution priority
- Identity minimum-entry requirements
- deterministic Identity ranking
- deterministic Identity primary selection
- secondary Identity threshold behavior
- Designation ranking
- Primary Designation selection
- structured Observation evidence
- Evidence Strength evaluation
- Identity contribution breakdowns
- Designation Basis
- recommendation-bias metadata
- empty intelligence collections
- Archive State distinctions

These behaviors are treated as protected unless a direct contract conflict is established.

---

# Development Principle

Media Tracker should evolve rather than be rewritten.

When changing the intelligence layer:

1. recover existing behavior
2. establish the semantic contract
3. compare implementation against the contract
4. preserve compatible behavior
5. classify contradictions
6. change only what must change
7. add regression tests
8. reconcile documentation
9. defer unrelated improvements

The governing principle is:

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Terminology alignment is therefore a controlled evolution of the existing Media Tracker architecture, not a justification for rewriting it.

---

# Phase Roadmap

The roadmap represents the broader product direction. Detailed implementation status and Phase 1 decision authority live in the planning documentation.

## Phase 1 — Intelligence Alignment

**Current**

Align the existing intelligence implementation with the conceptual contract, protect recovered behavior, and reconcile terminology and documentation.

---

## Phase 2 — Archive Profile UI

Build the dedicated Profile experience around the backend Archive Profile intelligence.

---

## Phase 3 — Recommendation Engine

Turn measurable archive intelligence into useful, explainable recommendations.

---

## Phase 4 — Library Scale

Add pagination and large-archive support.

---

## Phase 5 — Import / Export

Prioritize JSON backup and portability.

---

## Phase 6 — Metadata Expansion

Add richer media metadata where it meaningfully improves the archive.

---

## Phase 7 — Polish / Accessibility / Stability

Refine:

- UX
- accessibility
- edge cases
- documentation
- Profile
- Analytics
- Reports
- Library

---

## Phase 8 — Release

Finalize:

- testing
- deployment
- backup
- documentation
- migration strategy
- versioning
- changelog

---

## Phase 9 — React Migration

**Future**

React is an implementation evolution, not a substitute for unfinished product architecture or behavior.

The application should not be migrated to React merely to avoid completing the current architecture.

---

# Project Structure

```text
media-tracker/
├── models/
│   ├── entry.py
│   ├── media_item.py
│   ├── score.py
│   ├── scoring_profile.py
│   ├── responses.py
│   ├── services/
│   │   ├── archive_engine.py
│   │   ├── archive_mapper.py
│   │   ├── archive_narrative.py
│   │   ├── designation_engine.py
│   │   ├── designation_rules.py
│   │   ├── evidence_utils.py
│   │   ├── finding_engine.py
│   │   ├── finding_rules.py
│   │   ├── genre_intelligence.py
│   │   ├── identity_engine.py
│   │   ├── identity_explainer.py
│   │   ├── identity_scorer.py
│   │   ├── identity_scoring.py
│   │   ├── observation_engine.py
│   │   ├── observation_rules.py
│   │   └── trait_calculator.py
│   └── recommendations/
├── fixtures/
├── tests/
├── main.py
├── db.py
├── index.html
├── styles.css
└── *.js
```

---

# Tech Stack

- Backend: FastAPI / Python
- Frontend: Vanilla JavaScript
- Database: SQLite
- Validation: Pydantic
- Visualization: Plotly
- Testing: pytest

React is intentionally deferred to a later phase.

---

# Repository Documentation

The detailed intelligence architecture is documented separately from this README.

The documentation hierarchy is intentionally divided by purpose:

- `docs/planning/intelligence-contract.md` — highest-level intelligence contract
- `docs/planning/phase-1-intelligence-alignment.md` — Phase 1 conceptual authority
- `docs/planning/phase-1-decision-and-implementation-map.md` — implementation decisions and work order
- `docs/planning/phase-1-identity-fixture-contract.md` — Identity conceptual and fixture authority
- `docs/planning/phase-1-identity-evidence-mapping.md` — Identity evidence rationale
- `docs/planning/roadmap.md` — broader project roadmap
- `docs/planning/forgotten-features-register.md` — recovered and deferred feature history

The README provides the project-level overview.

The planning documents provide the detailed decision record.

---

# One-Sentence Description

> **Media Tracker turns raw media scores into measurable traits and genre signals, independently interprets those signals through observations, findings, designations, and curator identities, presents the resulting meaning through an Archive Profile, and eventually uses measurable signals to recommend what should come next.**
