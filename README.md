```
__    __ ___    ___ ___  ____ ___
\ \/\/ // _ \  _\\ / _ \ | D )| |
 \_/\_//_/ \_\/__//_/ \_\|_D_)|_|
 Weighted Archive System for Analysis & Behavioral Insights
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
6. What kind of curator does the archive describe?
7. What evidence supports those conclusions?
8. What should I experience next?

---

# Current Status

The `develop-3` branch contains a substantially developed intelligence layer.

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
- identity-derived traits
- identity contribution breakdowns
- evidence infrastructure
- Archive Profile backend infrastructure
- narrative infrastructure
- generated Reports / Lists
- recommendation infrastructure

The Recommendation Engine itself is still future work.

The current implementation is undergoing **Phase 1 Intelligence Alignment** so that existing behavior matches the locked conceptual contract without unnecessary rewrites.

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

---

## Genre Signals

Genre Signals describe recurring relationships between the archive and genres/types.

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

The existing Observation evidence architecture is intentionally preserved.

---

## Findings

A Finding is an interpretive conclusion suggested by available evidence.

Finding answers:

> **What does the available evidence suggest?**

A Finding should provide additional meaning rather than simply restating an Observation.

The distinction is:

> **Observation:** What can we directly demonstrate?

> **Finding:** What does the evidence suggest?

---

## Designations

A Designation is a recognizable taste classification.

Designation answers:

> **What named taste classification fits this archive?**

Designations may be fixture/rule-driven and may produce multiple internal candidates.

The Profile presents one Primary Designation.

Designations may also provide recommendation-oriented bias metadata.

---

## Identity

Identity is a broader curator synthesis.

Identity answers:

> **What kind of curator does this archive describe?**

Identity is not a Designation with a different name.

For example:

```text
Designation:
The Boundary Explorer

Identity:
Systems-Seeking Interpretive Curator
```

The two concepts may overlap in their underlying signals, but they answer different questions.

Identity names should be allowed to diverge from the Designation vocabulary.

---

# Identity Scoring

The current Identity architecture is fixture-driven.

Identity fixtures may define:

- ID
- title
- category
- icon
- description
- associated traits
- recommendation signals
- minimum data requirements
- scoring weights

The existing scoring machinery includes:

- weighted trait scoring
- derived traits
- ranking
- contribution breakdowns
- explanation

These systems are being preserved during Phase 1.

---

# Multiple Identities

An archive may contain multiple meaningful Identity candidates.

Conceptually:

```text
Primary Identity
    Systems-Seeking Interpretive Curator

Secondary Identity
    Boundary-Driven Explorer

Secondary Identity
    Deep Analytical Curator
```

Not every low-ranking Identity should be displayed.

Secondary Identity selection is part of the Phase 1 alignment work.

---

# Evidence and Explainability

The intelligence layer is designed around:

> **Why does the system think this?**

Different layers may use different evidence representations.

Examples:

### Traits

Underlying scores and metrics.

### Genre Signals

Presence, affinity, combinations, and related calculations.

### Observations

Structured metric/genre evidence.

### Findings

Structured supporting evidence.

### Designations

Lightweight classification explanation.

### Identity

Contribution breakdowns and supporting traits/signals.

The project does **not** require every subsystem to use the same evidence schema.

Explainability is the requirement.

---

# Quantitative Vocabulary

The project intentionally distinguishes several concepts that were previously represented using the generic word `confidence`.

## Signal Strength

How strongly a quality or signal is expressed.

Example:

```text
Originality: 8.8
```

does not mean:

> 88% confidence that originality exists.

---

## Data Sufficiency

Whether enough archive data exists to reasonably evaluate a conclusion.

---

## Classification Confidence

How clearly one classification beats plausible alternatives.

---

## Evidence Strength

How strongly the available evidence supports the conclusion.

These concepts may correlate.

They are not interchangeable.

---

# Archive States

The intelligence layer recognizes three conceptual archive states:

### Empty

There is not enough data to produce meaningful intelligence.

### Sparse

Some intelligence may be available, but conclusions should communicate limited data sufficiency.

### Established

Enough archive data exists for meaningful interpretation.

The system should prefer:

> **Insufficient evidence**

over:

> **False certainty**

when data is inadequate.

Exact operational thresholds remain part of Phase 1 implementation decisions.

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

## Archive Profile

Profile answers:

> **What does the archive mean?**

It is intended to contain:

- Narrative
- Primary Designation
- Primary Identity
- Secondary Identities
- Traits
- Genre Signals
- Observations
- Findings
- Evidence / explanations

The Profile should not simply become another Analytics dashboard.

---

# Scoring Philosophy

Media Tracker uses a hybrid scoring system.

Universal categories provide cross-media signals.

Media-specific categories provide type-appropriate detail.

Weighted scoring allows categories to reflect their relative importance.

The scoring system measures the user's reactions to completed media experiences.

The intelligence layer builds on those measurements rather than replacing them.

---

# Reports

The Reports / Lists system provides generated archive views such as:

- highest evaluated records
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

The Recommendation Engine is planned but not yet a finished recommendation system.

Current infrastructure includes:

- recommendation models
- signal collection
- scoring infrastructure
- engine entry point

The current engine remains intentionally incomplete.

Eventually recommendations should consume measurable signals such as:

- Trait Strength
- Genre Affinity
- scoring preferences
- universal scoring behavior
- media-specific scoring behavior
- Designation recommendation bias
- soft Observation signals
- soft Finding signals

Identity should influence recommendations indirectly through the underlying measurable signals.

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

The immediate goal is to align existing intelligence behavior with the conceptual contract.

Phase 1 focuses on:

- confidence terminology
- Designation semantics
- Identity / Designation separation
- Identity eligibility
- primary Identity selection
- secondary Identity policy
- Findings vs Observations
- Finding evidence
- archive data sufficiency
- ranking/tie behavior
- regression protection

The guiding principle is:

> **Preserve compatible behavior. Change contradictions. Clarify ambiguity. Defer unrelated work.**

---

# Recovered Behavioral Contracts

The repository already contains meaningful behavior that should not be accidentally lost.

Examples include:

- Trait Signal Strength normalization
- separate Identity score normalization
- Identity weighted scoring
- Identity derived traits
- Identity trait-resolution priority
- Identity minimum-entry requirements
- Designation ranking
- Primary Designation selection
- structured Observation evidence
- Identity contribution breakdowns
- recommendation-bias metadata
- empty intelligence collections
- deterministic ranking behavior

These behaviors are treated as protected unless a direct contract conflict is established.

---

# Phase Roadmap

## Phase 1 — Intelligence Alignment

Current.

Align the existing intelligence implementation with the conceptual contract.

---

## Phase 2 — Archive Profile UI

Build the dedicated Profile experience.

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

Future.

Do not migrate to React merely to avoid unfinished product work.

React is an implementation evolution that should occur after the product architecture and behavior are stable.

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
- Visualization: Chart.js
- Testing: pytest

React is intentionally deferred to a later phase.

---

# Development Principle

Media Tracker should evolve rather than be rewritten.

When changing the intelligence layer:

1. recover existing behavior
2. compare it against the contract
3. preserve compatible behavior
4. classify contradictions
5. change only what must change
6. add regression tests
7. defer unrelated improvements

The project should never discard useful behavioral memory merely because a newer conceptual model is being introduced.

---

# One-Sentence Description

> **Media Tracker turns raw media scores into measurable traits and genre signals, independently interprets those signals through observations, findings, designations, and curator identities, presents the resulting meaning through an Archive Profile, and eventually uses measurable signals to recommend what should come next.**