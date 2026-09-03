```
__    __  ___     ___  ___   ____  ___
\ \/\/ / / O \   _\\  / O \  | D ) | |
 \_/\_/O/_/ \_\O/__/O/_/ \_\O|_D_)O|_|O
WEIGHTED ARCHIVE SYSTEM for ANALYSIS & BEHAVIORAL INSIGHTS

A media tracking, rating, and analytics app by Zachary Theilen
```

# Media Tracker

A personal media archive and taste-intelligence application for logging, scoring, and exploring consumed books, games, and video.

Media Tracker combines a working media archive with a layered intelligence system that can identify measurable patterns in the archive and explain how those patterns support its conclusions.

> **Evolution, not rewrite.**
>
> The system should evolve from the architecture that already works. New intelligence should be added through explicit conceptual decisions, evidence, and targeted implementation rather than unnecessary rewrites.

---

## What It Does

Media Tracker lets you:

- Track completed books, games, and video.
- Record genres, notes, completion dates, and scores.
- Apply weighted scoring profiles appropriate to different media types.
- Explore universal and media-specific scoring traits.
- Analyze genre patterns across the archive.
- Generate observations and findings from measurable archive evidence.
- Identify recurring Designations and Identities.
- View an explainable Archive Profile describing the archive as a whole.
- Explore generated lists and visualizations based on archive data.

The project began as a straightforward media-tracking application and has evolved into a broader system for analyzing patterns in a personal media archive.

---

## Technology

### Frontend

- HTML
- CSS
- JavaScript
- Chart.js

### Backend

- Python
- FastAPI
- SQLite

### Development

- Git
- Automated regression testing
- CI/CD workflows
- Playwright
- Selenium
- Pytest

The architecture intentionally remains relatively lightweight. The goal is not to build a large platform, but to provide a maintainable application whose intelligence can be understood and evolved.

---

## Scoring

Media Tracker uses weighted scoring rather than treating every media type identically.

Each entry can contain:

- A title
- Media type
- Genres
- Universal scoring dimensions
- Media-specific scoring dimensions
- Notes
- Completion information

Scoring profiles allow different media types to emphasize characteristics appropriate to that medium.

The system also derives higher-level traits from the underlying scores.

The scoring architecture is intentionally separate from the archive intelligence system. Intelligence consumes scoring signals; it does not redefine the underlying scoring model.

---

## Genre Intelligence

Genres are treated as measurable archive signals rather than merely descriptive labels.

Genre data supports:

- Genre prevalence
- Genre diversity
- Genre scoring patterns
- Genre-derived traits
- Genre signatures
- Higher-level Designation and Identity evidence

Genre-derived signals are useful evidence, but they are not automatically treated as direct observations of intent or personality.

---

## Archive Intelligence

The archive intelligence system consists of several distinct analytical concepts.

### Traits

Traits represent measurable characteristics derived from scoring and archive data.

Traits can originate from:

- Universal scoring
- Media-specific scoring
- Derived archive patterns

Derived traits may use genre or other observable archive characteristics as proxies.

---

### Genre Signals

Genre signals describe measurable patterns in the genres represented by the archive.

They can contribute to higher-level analysis such as:

- Genre diversity
- Genre signatures
- Genre-derived traits
- Designation evidence
- Identity evidence

Genre signals are evidence about the archive, not psychological claims about the person maintaining it.

---

### Observations

Observations identify notable patterns in the archive.

They are evidence-oriented and expose an `evidenceStrength` value describing how strongly the available evidence supports the observation.

Observations answer questions such as:

- What measurable patterns are present?
- Which characteristics stand out?
- How strongly is a particular pattern expressed?

---

### Findings

Findings represent higher-level conclusions derived from archive evidence.

They are distinct from Observations.

An Observation identifies a notable pattern.

A Finding interprets a set of evidence into a broader conclusion.

This distinction allows the system to separate evidence discovery from higher-level interpretation.

---

### Designations

Designations classify recognizable characteristics of the media relationship.

The current Designation catalog is:

- **Boundary Explorer**
- **Engagement Architect**
- **Deep Diver**
- **Curator**

The core question for a Designation is:

> **What do you tend to like?**

A Designation is not intended to be:

- A personality diagnosis
- A psychological assessment
- A personal identity
- A single favorite genre
- An arbitrary recommendation category
- A broad philosophy of curation
- A conclusion based on one isolated preference

Designations are ranked using measurable evidence from the archive.

---

### Identities

Identities describe broader recurring orientations through which the curator engages with the media they consume.

The current Identity catalog is:

- **Interpretive Philosophy**
- **Exploratory Philosophy**
- **Breadth Philosophy**

The core question for an Identity is:

> **What relationship do you tend to establish with what you like?**

The current Identity concepts are intentionally distinct from the Designation layer.

#### Interpretive Philosophy

Interpretive Philosophy describes engagement with media through depth, reflection, complexity, and interpretation.

Its strongest current observable signal is depth, supported by emotional impact and contextual indicators such as reflection, ambiguity, and analysis.

It is not simply another name for Deep Diver.

#### Exploratory Philosophy

Exploratory Philosophy describes a relationship with unfamiliar territory and movement beyond established preferences.

Current evidence is indirect and includes signals such as originality, genre diversity, depth, experimental affinity, and novelty.

High experimentation alone does not establish an exploratory orientation.

#### Breadth Philosophy

Breadth Philosophy describes the range of territory represented in the archive.

Its strongest current observable signal is genre diversity.

Media-type breadth and archive composition can provide supporting context.

Archive size alone does not establish breadth or intentional diversification.

---

## Designation vs Identity

The distinction between these two layers is foundational.

> **A Designation describes the characteristics of the media relationship. An Identity describes the recurring orientation through which the curator engages with those characteristics.**

In shorthand:

> **Designation:** What do you tend to like?

> **Identity:** What relationship do you tend to establish with what you like?

The two systems may use some of the same underlying evidence.

That is intentional.

**Evidence can overlap. Meaning cannot.**

Shared evidence is acceptable when different systems interpret that evidence differently.

Shared conclusions are not.

Identity should not be created by simply renaming, reweighting, or restating a Designation.

---

## Explainability

Media Tracker is designed so that intelligence can be explained rather than presented as an opaque result.

Where appropriate, the system exposes:

- Scores
- Contributing traits
- Weighted contributions
- Evidence strength
- Data sufficiency
- Designation evidence
- Identity evidence
- Observations
- Findings
- Narrative explanations

Identity scoring exposes a contribution breakdown showing:

- Trait
- Value
- Weight
- Normalized value
- Contribution

This makes it possible to inspect why an Identity received its score rather than treating the result as an unexplained label.

---

## Signal Strength, Data Sufficiency, and Evidence Strength

The project deliberately distinguishes several related concepts.

### Signal Strength

Signal Strength describes how strongly a measurable characteristic is expressed.

A strong signal does not automatically mean there is enough data to support a conclusion.

---

### Data Sufficiency

Data Sufficiency describes whether enough archive data exists for a conclusion to be evaluated meaningfully.

A high signal in a very small archive does not necessarily provide sufficient evidence for a reliable higher-level interpretation.

---

### Evidence Strength

Evidence Strength describes how strongly the available evidence supports a particular observation or conclusion.

These concepts should not be collapsed into a single universal `confidence` value.

---

### Classification Confidence

Classification Confidence is a historical terminology concept that is not currently used as the active universal intelligence measure.

The project does not currently implement a universal probabilistic classification-confidence model.

---

## Archive States

The system recognizes that archives can exist in different states of informational sufficiency.

An archive may be:

- Empty
- Sparse
- Established

These states are conceptually distinct from the strength of individual signals.

A sparse archive may contain strong signals while still lacking sufficient evidence for some higher-level conclusions.

The exact operational thresholds for Archive State remain an implementation/planning concern rather than a universal intelligence rule.

---

## API

The backend exposes API endpoints for archive management, scoring, statistics, and intelligence.

### Entries

```text
POST /entries/
GET /entries/
GET /entries/{entry_id}
PUT /entries/{entry_id}
DELETE /entries/{entry_id}
```

### Statistics

```text
GET /stats/
```

### Archive Intelligence

```text
GET /archive-profile
GET /identities
GET /identity
```

### Supporting Data

```text
GET /genres/
GET /scoring-profile
GET /scoring-rubric
```

The API is intended to describe the intelligence system that actually exists.

Implementation details and conceptual authority are documented separately in the planning documentation.

---

## Visualizations

The frontend provides visualizations and generated views for exploring the archive.

These include:

- Media distribution
- Average scores by media type
- Archive activity
- Score distribution
- Genre averages
- Universal scoring profiles
- Media scoring profiles
- Entry-level scoring
- Highest scored records
- Highest scored books
- Highest scored games
- Highest scored videos
- Recent additions
- Hall of Fame
- Archive intelligence

Visualizations are presentation layers over the underlying archive and scoring data.

They should not become independent sources of intelligence logic.

---

## Current Development Status

The core archive, scoring, and intelligence architecture is functional.

Current completed areas include:

- Core media archive
- Entry management
- Universal scoring
- Media-specific scoring
- Genre intelligence
- Measurable traits
- Observation infrastructure
- Finding infrastructure
- Designation infrastructure
- Identity scoring infrastructure
- Identity-derived traits
- Identity contribution and explanation
- Archive Profile backend
- Template-driven archive narrative
- Recommendation infrastructure/stub
- Automated regression coverage
- Frontend terminology alignment
- Identity and Designation ontology alignment
- Intelligence documentation reconciliation

Current regression baseline:

**245 tests passing, 0 failing.**

The project continues to follow an evolution-based development model rather than treating every new requirement as a reason to redesign the existing system.

---

## Documentation

The detailed project documentation lives under `docs/planning/`.

### Current Conceptual Authority

- `docs/planning/intelligence-contract.md`
- `docs/planning/decision-and-implementation-map.md`
- `docs/planning/identity-and-designation-contract.md`
- `docs/planning/identity-fixture-contract.md`
- `docs/planning/identity-evidence-mapping.md`

These documents define the current conceptual contracts and implementation decisions.

### Historical and Forensic Records

- `docs/planning/intelligence-alignment.md`
- `docs/planning/intelligence-forensic-audit.md`
- `docs/planning/identity-catalog.md`

These documents preserve historical reasoning, forensic findings, and the evolution of the intelligence system.

### Supporting Documentation

- `docs/planning/terminology-and-api-rename-map.md`
- `docs/planning/frontend-terminology-alignment.md`
- `docs/planning/forgotten-features-register.md`
- `docs/planning/roadmap.md`

The README is an orientation document.

The detailed planning documents are the authoritative sources for current conceptual and implementation decisions.

---

## Project Philosophy

Media Tracker is intentionally being developed as an evolving system rather than a collection of disconnected features.

The central development philosophy is:

> **Evolution, not rewrite.**

Existing behavior should be preserved unless an explicit conceptual decision requires changing it.

When a new intelligence concept is introduced, the intended sequence is:

1. Define the concept.
2. Define its semantic boundaries.
3. Identify the available evidence.
4. Determine what the evidence can and cannot establish.
5. Compare the concept against existing intelligence.
6. Test for conceptual overlap and negative space.
7. Define implementation requirements.
8. Make targeted changes.
9. Protect the resulting behavior with regression tests.

This keeps the intelligence system understandable and prevents terminology changes from quietly becoming algorithm changes.

---

## Governing Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Terminology alignment is therefore a controlled evolution of the existing Media Tracker architecture, not a justification for rewriting it.

The project establishes the semantic contract first, then aligns terminology and implementation to that contract without changing behavior unless an explicit conceptual decision requires the change.
