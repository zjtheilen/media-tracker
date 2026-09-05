```
__    __  ___     ___  ___   ____  ___
\ \/\/ / / O \   _\\  / O \  | D ) | |
 \_/\_/O/_/ \_\O/__/O/_/ \_\O|_D_)O|_|O
WEIGHTED ARCHIVE SYSTEM for ANALYSIS & BEHAVIORAL INSIGHTS

A media tracking, rating, and analytics app by Zachary Theilen
```

# Media Tracker — Master Roadmap

**Status:** Current Project Roadmap
**Authoritative Development Branch:** `develop-3`
**Guiding Principle:** **Evolution, not rewrite.**

---

## 1. Purpose

This document describes the development trajectory of Media Tracker.

It answers four questions:

1. What exists today?
2. What has been completed?
3. What is currently being worked on?
4. What remains to be developed?

The roadmap is an orientation and sequencing document.

It is **not** the authoritative specification for individual intelligence concepts, scoring formulas, fixtures, API semantics, or terminology decisions. Those details belong in the appropriate planning documents.

The roadmap should therefore remain intentionally higher-level.

---

## 2. Project Overview

Media Tracker is a personal media archive and taste-intelligence application.

The application began as a system for recording books, games, and video and calculating weighted scores.

It has evolved into a layered archive-analysis system capable of identifying measurable patterns in the archive and presenting those patterns through explainable intelligence.

The current architecture combines:

* Media archive management
* Universal scoring
* Media-specific scoring
* Genre intelligence
* Derived traits
* Observations
* Findings
* Designations
* Identities
* Archive Profile generation
* Narrative presentation
* Recommendation infrastructure
* Frontend visualizations
* Automated regression coverage

The project remains deliberately lightweight and modular.

---

## 3. Governing Development Principle

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Terminology alignment is therefore treated as controlled evolution rather than justification for architectural rewriting.

The project favors:

* Explicit conceptual decisions
* Evidence-backed changes
* Targeted implementation
* Explainability
* Regression protection
* Preservation of working behavior
* Clear separation between current authority and historical reasoning

---

# 4. Current State

## 4.1 Archive

The core media archive is functional.

The application supports recording and managing completed media entries with information including:

* Title
* Media type
* Genres
* Scores
* Notes
* Completion information

The archive supports books, games, and video.

---

## 4.2 Scoring

The scoring system is functional.

Current capabilities include:

* Universal scoring
* Media-specific scoring
* Weighted scoring
* Score normalization
* Derived scoring traits
* Entry-level score presentation
* Archive-level score analysis

The underlying scoring architecture is considered established and should not be redesigned merely to support terminology alignment.

---

## 4.3 Genre Intelligence

Genre intelligence is functional.

The system uses genre information to support:

* Genre prevalence
* Genre diversity
* Genre averages
* Genre-derived traits
* Genre signatures
* Higher-level intelligence evidence

Genre-derived signals remain observable proxies rather than direct measurements of intent.

---

## 4.4 Archive Intelligence

The archive intelligence architecture is functional.

Current intelligence layers include:

### Traits

Measurable characteristics derived from scoring and archive data.

### Genre Signals

Measurable patterns in the genres represented by the archive.

### Observations

Evidence-oriented descriptions of notable archive patterns.

### Findings

Higher-level conclusions derived from archive evidence.

### Designations

Recognizable taste classifications.

Current Designations:

* Boundary Explorer
* Engagement Architect
* Deep Diver
* Curator

### Identities

Broader recurring orientations through which the curator engages with media.

Current Identities:

* Interpretive Philosophy
* Exploratory Philosophy
* Breadth Philosophy

### Archive Profile

A higher-level representation combining archive statistics, traits, Designations, Identities, observations, findings, and narrative interpretation.

---

# 5. Identity System Status

The Identity subsystem has completed its major conceptual alignment work.

Completed work includes:

* Identity vs Designation differentiation
* Identity ontology differentiation
* Historical Identity catalog review
* Identity evidence mapping
* Identity fixture contract
* Identity fixture migration
* Minimum-entry eligibility
* Deterministic selection
* Primary/secondary resolution
* Contribution explanation
* Identity test migration
* Regression protection

The current Identity catalog is:

1. **Interpretive Philosophy**
2. **Exploratory Philosophy**
3. **Breadth Philosophy**

The three concepts intentionally occupy different analytical dimensions:

> **Interpretive:** How do you engage with what you consume?

> **Exploratory:** How do you relate to the boundaries of what you consume?

> **Breadth:** How wide is the territory you consume?

The Identity system is considered conceptually aligned for the current development stage.

Future Identity changes remain possible, but they should be driven by evidence or an explicit conceptual decision rather than by the need to make the catalog appear more complete.

---

# 6. Designation System Status

The Designation architecture is established and remains separate from Identity.

Current Designations:

* Boundary Explorer
* Engagement Architect
* Deep Diver
* Curator

The current architecture supports:

* Multiple candidate Designations
* Ranked scores
* Primary Designation selection
* Deterministic selection
* Designation-specific evidence metadata
* Recommendation bias metadata
* Archive Profile integration

The current Designation catalog remains a working behavioral classification system rather than a claim that these four classifications exhaust every possible taste pattern.

Known conceptual areas for future refinement include:

* Boundary Explorer evidence definition
* Engagement Architect evidence definition
* Deep Diver classification boundaries
* Curator's archive-size signal

These are refinement opportunities, not reasons to rewrite the current Designation system.

---

# 7. Explainability Status

Explainability infrastructure is established.

The system exposes evidence and contributing signals where appropriate rather than presenting intelligence as opaque labels.

Current explainability mechanisms include:

* Trait values
* Weighted contributions
* Identity breakdowns
* Evidence strength
* Data sufficiency
* Designation basis
* Observations
* Findings
* Archive narrative

The project should continue favoring explainable intelligence over opaque classification.

---

# 8. Terminology Alignment Status

The terminology alignment pass is complete for the current scope.

The project now distinguishes:

* **Signal Strength** — strength of an expressed measurable signal
* **Data Sufficiency** — whether enough archive data exists for evaluation
* **Evidence Strength** — strength of evidence supporting a conclusion
* **Classification Confidence** — historical/retired terminology rather than an active universal measure

The public API retains compatibility-sensitive field names where changing them would create unnecessary downstream breakage.

For example:

* `designationConfidence` remains as an API field.
* Its semantic interpretation is Designation Signal Strength.
* `designationConfidenceLabel` remains as an API field.
* Its displayed meaning is Signal Strength.

Internal helper terminology has been aligned where appropriate without changing scoring behavior.

---

# 9. Frontend Alignment Status

Frontend terminology has been aligned with the current scoring and intelligence vocabulary.

Completed alignment includes:

* Evaluation → Scoring terminology
* Average Rating → Average Score where the underlying value is a score
* Highest Evaluated → Highest Scored
* Media Evaluation → Media Scoring
* Universal Evaluation → Universal Scoring

Presentation terminology is now intended to reflect the semantics of the backend rather than preserve historical wording merely for familiarity.

Public API compatibility remains a separate constraint from frontend terminology.

---

# 10. Documentation Reconciliation Status

The major documentation reconciliation pass is underway/completing its current stage.

The project documentation has been reorganized around a simple principle:

> **One authoritative home for each kind of current knowledge, with historical reasoning preserved separately and no document allowed to masquerade as current authority when it isn't.**

Current documentation responsibilities are divided between:

### Conceptual Authority

* `docs/planning/intelligence-contract.md`
* `docs/planning/decision-and-implementation-map.md`
* `docs/planning/identity-and-designation-contract.md`

### Fixture Authority

* `docs/planning/identity-fixture-contract.md`

### Evidence Mapping

* `docs/planning/identity-evidence-mapping.md`

### Historical Alignment

* `docs/planning/intelligence-alignment.md`
* `docs/planning/identity-catalog.md`

### Forensic Evidence

* `docs/planning/intelligence-forensic-audit.md`

### Terminology

* `docs/planning/terminology-and-api-rename-map.md`
* `docs/planning/frontend-terminology-alignment.md`

### Product and Feature Recovery

* `docs/planning/forgotten-features-register.md`

### Roadmap

* This document.

The roadmap should point toward these authorities rather than duplicate them.

---

# 11. Regression Status

The current regression baseline is:

**245 tests passing, 0 failing.**

This is the current clean checkpoint following the Identity migration and terminology-alignment work.

Historical test counts are preserved as historical milestones and should not be interpreted as the current baseline.

The current count should be updated whenever intentional implementation changes alter the regression suite.

---

# 12. Completed Development Phases

The original project was developed through several broad phases.

The exact boundaries evolved as the application grew, so these phases should be understood as development milestones rather than rigid architectural layers.

## Phase 1 — Core Library

Completed.

Established:

* Media entry management
* Persistent storage
* Media types
* Genres
* Notes
* Completion information
* Basic scoring

---

## Phase 2 — Scoring and Analytics

Completed.

Established:

* Weighted scoring
* Universal scoring
* Media-specific scoring
* Score normalization
* Archive statistics
* Genre analysis
* Scoring visualizations

---

## Phase 3 — Generated Lists and Archive Exploration

Completed.

Established:

* Generated archive lists
* High-score views
* Recent additions
* Hall of Fame-style views
* Additional archive exploration tools

---

## Phase 4 — Frontend Refactor

Substantially completed.

Established or improved:

* Frontend organization
* Visualization structure
* Scoring terminology
* Archive presentation
* Entry detail presentation
* Generated-list presentation

Remaining frontend work should be treated as polish or targeted maintenance rather than another broad refactor.

---

## Phase 5 — Intelligence and Polish

Core intelligence infrastructure completed.

Established:

* Trait analysis
* Genre-derived intelligence
* Observations
* Findings
* Designations
* Identities
* Archive Profile
* Narrative generation
* Recommendation infrastructure/stub
* Explainability infrastructure

Current work in this phase is primarily refinement, terminology, UX, documentation, and integration.

---

## Phase 6 — Testing and Stability

Core regression coverage established.

Current baseline:

**245 passing tests.**

### Stability fixes completed

* Fixed amendment behavior so existing universal and media scores are restored when editing a record.
* Stabilized Archive Profile responsive charts by placing canvases inside dedicated containers with explicit dimensions.
* Corrected the `maintainAspectRatio` configuration typo in media score charts.
* Restored the application shell wrapper so the existing layout width and page spacing rules apply consistently.

### Remaining stability work

Remaining work should focus on:

* Regression prevention
* Edge cases
* Empty/sparse archive behavior
* Intelligence boundary cases
* API consistency
* Frontend/backend terminology consistency
* Removal of accidental duplication

---

## Phase 7 — Release

Future.

Release work should eventually cover:

* Final documentation
* Production configuration
* Deployment considerations
* User-facing polish
* Final regression validation
* Release packaging
* Final feature audit
* Cleanup of intentionally deferred work

Release should occur only after the current intelligence and product behavior are sufficiently stable.

---

# 13. Current Work Queue

The immediate development queue should remain targeted.

## 13.1 Archive Profile Polish

Continue refining the Archive Profile presentation and integration without changing the underlying intelligence architecture unless an explicit conceptual decision requires it.

Areas include:

* UX
* Presentation
* Narrative clarity
* Empty/sparse archive handling
* Accessibility
* Terminology consistency

---

## 13.2 Observation Presentation

Continue reviewing how Observations are surfaced to users.

The current distinction remains:

> Observation = evidence-oriented notable pattern.

Observation presentation should preserve the distinction between evidence and higher-level interpretation.

---

## 13.3 Finding Presentation

Continue reviewing how Findings are represented.

The current distinction remains:

> Finding = higher-level conclusion derived from evidence.

Finding work should not collapse Findings into Observations or Designations.

---

## 13.4 Archive State

Finalize the operational treatment of archive sufficiency.

The conceptual states remain:

* Empty
* Sparse
* Established

The exact operational thresholds should be treated as an explicit implementation decision rather than inferred from historical documentation.

---

## 13.5 Recommendation Infrastructure

Recommendation infrastructure exists as a foundation/stub.

Future work may develop recommendation behavior using the existing `recommendation_bias` metadata.

This does **not** currently constitute a completed recommendation engine.

Recommendation development should remain separate from Designation and Identity classification.

---

## 13.6 API and Configuration Polish

Continue reviewing:

* API terminology
* Configuration
* Documentation
* Compatibility-sensitive fields
* Backend/frontend contracts

The goal is consistency without unnecessary breaking changes.

---

# 14. Deferred Conceptual Work

Some concepts have been intentionally deferred.

## 14.1 Construction / Systems Philosophy

A Construction / Systems Philosophy Identity was evaluated and deferred.

The current evidence overlaps too strongly with Engagement Architect.

A future version would require broader structural evidence rather than simply renaming or reweighting existing Engagement Architect signals.

---

## 14.2 Direct Exploration Measurement

Exploratory Philosophy currently relies partly on indirect evidence.

The system does not currently observe deliberate exploration directly.

Future work could revisit this if the archive begins collecting evidence capable of supporting that conclusion.

The project should not invent an exploration metric merely to make the Identity concept appear more measurable.

---

## 14.3 Intentional Diversification

Breadth Philosophy currently measures observable variety.

Observable variety does not prove deliberate diversification.

Future evidence could potentially distinguish:

* Large archive
* Diverse archive
* Deliberately diversified archive

These should not be treated as equivalent without supporting evidence.

---

## 14.4 Curator Archive-Size Signal

The Curator Designation currently includes archive-size-related evidence.

The known conceptual concern is:

> Quantity does not automatically establish deliberateness, care, or curatorial breadth.

The existing calculation should remain stable unless an explicit conceptual decision changes it.

Future refinement may separate archive quantity from stronger evidence of curatorial behavior.

---

# 15. Evidence Architecture — Future Direction

The project currently supports several kinds of evidence:

* Direct scoring traits
* Media-specific traits
* Genre-derived proxies
* Archive composition
* Weighted contributions
* Evidence strength
* Data sufficiency

The system does **not** currently require one universal evidence schema.

Different intelligence subsystems may legitimately use different evidence mechanisms.

Future evidence architecture should therefore be introduced only when a real cross-system need appears.

The governing rule remains:

> **Evidence can overlap. Meaning cannot.**

---

# 16. Intelligence Evolution Rules

New intelligence concepts should follow a deliberate process.

## Step 1 — Define the Concept

Describe what the concept means.

## Step 2 — Define the Boundaries

Describe what the concept is not.

## Step 3 — Identify Evidence

Determine what observable evidence could support the concept.

## Step 4 — Identify Evidence Limits

Determine what the evidence cannot establish.

## Step 5 — Compare Existing Intelligence

Test the proposed concept against existing Designations, Identities, Traits, Observations, and Findings.

## Step 6 — Test Negative Space

Verify that unrelated or insufficient evidence does not automatically produce the concept.

## Step 7 — Define Implementation Requirements

Only after the conceptual contract is established should implementation requirements be defined.

## Step 8 — Implement Targeted Changes

Change only the code required by the explicit decision.

## Step 9 — Protect the Result

Add or update regression coverage.

This sequence prevents implementation convenience from silently becoming conceptual policy.

---

# 17. Things That Should Not Be Invented Just to Fill Gaps

The roadmap does not authorize invention of:

* Universal confidence math
* Arbitrary near-tie thresholds
* Co-primary Identity behavior
* Universal evidence schemas
* Intentionality measurements without evidence
* New Identity concepts merely to increase catalog size
* Recommendation scoring without a recommendation design
* Psychological interpretation
* Machine-learning classification without a deliberate architectural decision
* New Archive State thresholds based only on stale historical prose
* New Designations merely because a signal is strong

Gaps in observable evidence are valid system states.

---

# 18. Architectural Stability

The intelligence architecture should remain modular.

The major intelligence concepts are analytically related but should not be collapsed into one generic classification subsystem merely for implementation convenience.

The project currently benefits from keeping separate:

* Trait calculation
* Genre analysis
* Observation evaluation
* Finding generation
* Designation classification
* Identity scoring
* Archive Profile composition
* Narrative presentation
* Recommendation infrastructure

The existence of shared evidence does not require these systems to become one system.

---

# 19. Data Sufficiency

Data sufficiency should remain an explicit concern throughout future development.

The project recognizes that:

> **A strong signal is not necessarily sufficient evidence for a strong conclusion.**

This is especially important for:

* Identity classification
* Archive State
* Genre-derived conclusions
* Sparse archives
* Intentionality claims
* Future recommendation behavior

Future intelligence should distinguish between:

1. What the archive measures.
2. How strongly it measures it.
3. Whether there is enough data to interpret it.
4. What conclusion the evidence supports.

---

# 20. Empty and Sparse Archives

Empty and sparse archives are valid states.

The system should not assume that every archive contains enough information to produce every intelligence result.

Future changes should preserve graceful behavior for:

* No entries
* Very small archives
* Single-media archives
* Low genre diversity
* Missing optional scoring signals
* Partially populated archive data

The absence of evidence should not automatically become a negative personality or taste conclusion.

---

# 21. Future Product Development

Potential future work includes:

* More sophisticated recommendations
* Expanded archive exploration
* Additional intelligence concepts
* Improved Archive Profile UX
* Better narrative generation
* Additional visualizations
* Broader media support
* Release/deployment improvements

These are possibilities, not commitments to implement every item.

Future features should be evaluated against the existing architecture and evidence before being added.

---

# 22. Documentation Authority

When documents disagree, authority should be resolved according to the following hierarchy:

1. **Current code and passing tests** establish proven current behavior.
2. **Current conceptual contracts** establish intended semantics.
3. **Current implementation maps** establish explicit implementation decisions.
4. **Historical alignment and forensic documents** preserve reasoning and evidence.
5. **The roadmap** describes sequence and project status.

Historical documents should not silently override current authoritative decisions.

Likewise, the roadmap should not become a competing source of detailed implementation policy.

---

# 23. Current Authoritative Documents

For current conceptual and implementation decisions, consult:

* `docs/planning/intelligence-contract.md`
* `docs/planning/decision-and-implementation-map.md`
* `docs/planning/identity-and-designation-contract.md`
* `docs/planning/identity-fixture-contract.md`
* `docs/planning/identity-evidence-mapping.md`

For historical reasoning and forensic evidence, consult:

* `docs/planning/intelligence-alignment.md`
* `docs/planning/intelligence-forensic-audit.md`
* `docs/planning/identity-catalog.md`

For terminology decisions, consult:

* `docs/planning/terminology-and-api-rename-map.md`
* `docs/planning/frontend-terminology-alignment.md`

For recovered or deferred product ideas, consult:

* `docs/planning/forgotten-features-register.md`

---

# 24. Success Criteria

The project is progressing successfully when:

* The archive remains reliable.
* Scoring remains understandable.
* Intelligence remains explainable.
* Designations remain distinct from Identities.
* Evidence is not mistaken for certainty.
* Data sufficiency is not confused with signal strength.
* Terminology reflects actual behavior.
* Historical reasoning remains recoverable.
* Tests protect intentional behavior.
* New intelligence requires explicit conceptual justification.
* The system evolves without unnecessary rewrites.

---

# 25. North Star

Media Tracker should become a system that can answer increasingly sophisticated questions about a personal media archive while remaining understandable enough to explain **why** it reached those conclusions.

The goal is not to make the application appear intelligent.

The goal is to make the intelligence that already exists:

* measurable,
* explainable,
* testable,
* conceptually coherent,
* and useful.

The project should continue to evolve from the architecture that works rather than replacing it merely because the system has become more sophisticated.

---

# 26. Final Principle

> **Evolution, not rewrite.**

Preserve working behavior.

Make conceptual decisions explicitly.

Let evidence determine what the system can reasonably claim.

Keep intelligence layers distinct even when they share evidence.

Document the reasoning behind changes.

Protect intentional behavior with tests.

And ensure that the API describes the intelligence system that actually exists.
