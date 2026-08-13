# Media Tracker — Master Roadmap & Source of Truth

**Authoritative branch:** `develop-3`
**Repository:** `zjtheilen/media-tracker`
**Current baseline:** 199 tests passing
**Architecture:** Vanilla JS frontend + FastAPI/Python backend + SQLite
**Guiding principle:** **Evolution, not rewrite.**

---

# 0. THE NORTH STAR

Media Tracker is ultimately trying to answer seven questions:

1. **What do I like?**
2. **Why do I like it?**
3. **What patterns exist in my taste?**
4. **What classifications describe my taste?**
5. **What kind of curator am I?**
6. **What evidence supports those conclusions?**
7. **What should I experience next?**

The application therefore has two major faces:

### Analytics

> **What do the numbers say?**

Charts, averages, distributions, trends, genre statistics, scores, etc.

### Archive Profile

> **What does the archive mean?**

Traits, genre signals, observations, findings, designations, identities, evidence, narrative, and recommendation-oriented signals.

These should remain conceptually separate.

---

# 1. CURRENT ARCHITECTURE

## Frontend

Vanilla JavaScript, modularized.

Current modules include:

* `app.js`
* `api.js`
* `forms.js`
* `charts.js`
* `entries.js`
* `filters.js`
* `library.js`
* `lists.js`
* `navigation.js`
* `state.js`
* `constants.js`

Primary areas:

### Archive

The actual media library.

### Analysis

Quantitative analytics.

### Reports

Previously called Auto-Generated Lists.

### Future Profile

Dedicated interpretation/intelligence experience.

---

# 2. BACKEND

FastAPI + SQLite.

Core areas:

* `main.py`
* `db.py`
* migrations
* `models/entry.py`
* `models/media_item.py`
* `models/score.py`
* `models/scoring_profile.py`
* `models/responses.py`
* `models/genre_registry.py`

The increasingly important architecture lives under:

`models/services/`

Major intelligence areas include:

* Archive
* Designations
* Identity / Curator
* Observations
* Findings
* Genre intelligence
* Traits
* Profile metrics
* Scoring

---

# 3. THE DATA / INTELLIGENCE MODEL

The important thing to remember:

**These systems are analytically parallel.**

They do not currently form a rigid chain where one literally feeds the next.

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

This is **conceptual**, not necessarily the literal runtime call graph.

---

# 4. CORE SCORING SYSTEM — COMPLETE

## Status: ✅ COMPLETE

Do **not** redo this.

Implemented:

* Universal scoring
* Media-specific scoring
* Weighted totals
* Scoring profiles
* Scoring rubrics
* General metric meanings
* Media-specific metric rubrics
* `/scoring-rubric`
* Live rubric explanations in scoring forms
* Score interpretation
* Validation
* Archive mapper compatibility

### Principle

The scoring system measures the individual's reactions to media.

Everything downstream should build from this rather than reinventing scoring.

---

# 5. CORE LIBRARY — COMPLETE

## Status: ✅ COMPLETE

Implemented:

* Entry CRUD
* Validation
* Genres
* Media types
* Completion status
* Filtering
* Sorting
* Archive/library presentation

### Do not accidentally reopen this as unfinished work.

Future improvements are enhancements, not completion of Phase 1.

---

# 6. AUTO-GENERATED REPORTS — COMPLETE

## Status: ✅ COMPLETE

The Reports tab is functional.

Current lists:

### Highest Evaluated Records

Top 5 overall scores.

### Highest Rated Books

Top 5 books.

### Highest Rated Videos

Top 5 videos.

### Highest Rated Games

Top 5 games.

### Recent Archive Additions

Five most recent by `date_consumed`.

### Archive Hall of Fame

All records with:

`total_score >= 95`

sorted descending.

Current architecture:

* entirely frontend-driven
* `lists.js`
* loads entries
* sorts/filters client-side
* polished ARCHIVE REPORT presentation
* rank numbers
* media icons
* record IDs
* metadata/query information

### Future possibilities

These are **new features**, not unfinished Phase 3:

* more report types
* server-side reports
* custom lists
* persisted lists
* report export
* caching

Do not treat Reports as unfinished.

---

# 7. ANALYTICS

## Status: 🟡 MOSTLY COMPLETE

Current functionality includes:

* charts
* archive statistics
* genre statistics
* averages
* distributions
* comparisons
* Chart.js visualizations

### Remaining work

Primarily:

* UI polish
* clearer organization
* separating Profile from Analytics

### Analytics should answer:

> **What does the numerical data say?**

It should not become the home for all the interpretive intelligence.

---

# 8. TRAITS

## Status: 🟡 MOSTLY COMPLETE

Traits answer:

> **What qualities are strongly represented in the data?**

Examples:

* Originality
* Depth
* Gameplay Mechanics
* Engagement
* Craft
* etc.

Traits are derived from measurable scores.

Example:

```text
Originality: 8.8
Depth: 8.4
Gameplay Mechanics: 9.6
```

Traits may also include derived/genre-related signals.

### Preserve

* normalization
* strength representation
* existing calculations
* `trait_calculator.py`
* derived trait architecture

### Future refinement

* more sophisticated derived traits
* better normalization where appropriate
* additional meaningful traits if the archive demonstrates them

### Important distinction

**Trait strength is not confidence.**

A trait of `0.88` means:

> this quality is strongly represented.

It does not mean:

> we are 88% confident this is true.

---

# 9. GENRE INTELLIGENCE

## Status: 🟡 MOSTLY COMPLETE

Current concepts:

* genre presence
* genre affinity
* genre combinations
* genre signals

This answers:

> **What kinds of media does the archive repeatedly respond to?**

Example signals might show strong affinity for:

* horror
* sci-fi
* surreal
* experimental
* etc.

### Preserve

The current genre intelligence system.

### Future

Potentially:

* richer combinations
* cross-media genre behavior
* better interpretation
* recommendation signals

---

# 10. OBSERVATIONS

## Status: 🟡 MOSTLY COMPLETE

Observations answer:

> **What recurring pattern can we directly demonstrate?**

Examples:

### ◈ Boundary Preference

> Your archive repeatedly favors unusual concepts...

Evidence:

> Originality 8.8/10

### ◈ Systems Affinity

> Your archive shows appreciation for carefully designed mechanics...

Evidence:

> Gameplay Mechanics 9.6/10

### ◈ Interpretive Depth

Potentially supported by:

* depth scores
* thoughtful media selections
* etc.

---

## Current architecture

Observation rules contain:

* evaluation
* generation
* confidence
* category
* traits
* genres
* related designations

They can generate structured evidence.

There are currently roughly six major observation rules.

---

## Cardinality

**MANY.**

An Archive Profile can have:

* one observation
* five observations
* ten observations
* etc.

They are ranked by confidence.

---

## Evidence

This is currently the strongest evidence system in the intelligence layer.

Existing helpers include things such as:

* metric evidence
* genre evidence

### Preserve this architecture.

Other systems should learn from the quality of the Observation evidence model rather than weakening it.

---

# 11. FINDINGS

## Status: 🟠 FUNCTIONAL BUT UNDERDEVELOPED

Findings answer:

> **What does the collection of evidence suggest?**

This is deliberately different from Observation.

### Observation

Directly demonstrated pattern:

> Your archive repeatedly favors unusual concepts.

### Finding

Interpretation of that pattern:

> Your archive demonstrates a strong preference for experiences that challenge conventional genre boundaries.

A Finding can potentially synthesize **multiple observations**.

---

## Cardinality

**MANY.**

An Archive Profile may contain multiple findings.

---

## Current problem

Some existing Findings are too similar to Observations.

They frequently:

* use similar thresholds
* use similar language
* serve similar purposes

### Planned evolution

Findings should move **one interpretive level upward**.

Not:

> Originality > 8 → Finding

But potentially:

```text
Observation A
Observation B
Observation C
      ↓
Finding
```

For example:

```text
Observation:
Boundary Preference

Observation:
Experimental Genre Affinity

Observation:
High Originality

        ↓

Finding:
The archive demonstrates a strong preference
for experiences that challenge conventional
genre boundaries.
```

---

## Evidence

Findings should eventually have structured evidence.

Not necessarily an identical schema to Observations, but comparable rigor.

---

## Confidence

Findings should eventually have meaningful confidence/data-sufficiency semantics.

---

# 12. DESIGNATIONS

## Status: 🟠 FUNCTIONAL BUT UNDERDEVELOPED

Designation answers:

> **What recognizable classification does this pattern fit?**

Example:

### ◈ The Boundary Explorer

```text
Traits:
- originality
- depth

Genres:
- experimental
- surreal
- sci-fi
- horror

Recommendation bias:
- unusual concepts
- genre hybrids
- experimental storytelling
```

Designation is essentially a **named classification/badge**.

---

## Current architecture

Currently roughly four hard-coded designation rules.

Each contains:

* ID
* title
* description
* icon
* traits
* genres
* recommendation bias
* evaluation logic

Scores are roughly 0–100.

---

## Cardinality

Internally:

**MANY.**

The system can rank multiple designations.

Profile presentation:

**ONE PRIMARY designation.**

Potentially:

* primary designation
* close competitors
* scores

But the designation system should not become the Identity system.

---

## Important distinction

Designation:

> **“The Boundary Explorer.”**

Identity:

> **“Systems-Seeking Interpretive Curator.”**

Those are not the same thing.

---

## Planned improvements

### 1. Better evidence

Designations can eventually expose why they won.

Example:

```text
Boundary Explorer — 91

Supported by:
Originality: 8.8
Depth: 8.4
Experimental affinity: 84%
Surreal affinity: 79%
```

### 2. Better classification confidence

Current "confidence" is basically an average of top trait scores.

That is better described as signal strength.

Eventually distinguish:

* signal strength
* classification confidence
* data sufficiency

### 3. More nuanced rules

More designations may eventually emerge.

But **do not create arbitrary designations just to increase the number.**

---

# 13. IDENTITY — THE BIG ONE

## Status: 🟡 Infrastructure mostly complete / 🟠 concept underdeveloped

This is the subsystem we need to protect from getting lost again.

Identity answers:

> **What kind of curator does all of this make me?**

Not:

> Which designation did I score highest on?

---

# 14. WHAT IDENTITY IS NOT

Identity should **not** simply be:

```text
Boundary Explorer
Deep Diver
Engagement Architect
```

because those already exist as designations.

That creates:

```text
Designation = Boundary Explorer
Identity = Boundary Explorer
```

which is redundant.

---

# 15. WHAT IDENTITY SHOULD BE

Identity should synthesize the archive's overall **curatorial philosophy**.

Example:

> **Systems-Seeking Interpretive Curator**

Potentially describing someone who:

* values systems
* enjoys interpretation
* seeks unusual concepts
* appreciates craft
* explores boundaries
* responds to depth

Identity can therefore incorporate several signals without merely becoming a mathematical average of them.

---

# 16. MULTIPLE IDENTITIES

This is important.

The archive does **not** have to produce one identity.

It can say:

```text
Primary Identity
Systems-Seeking Interpretive Curator

Secondary Identity
Boundary-Driven Explorer

Secondary Identity
Deep Analytical Curator
```

Conceptually:

> **You are X, but your archive also strongly demonstrates qualities associated with Y and Z.**

---

## Cardinality

**MANY.**

Internally:

* ranked identities
* scores
* contributions
* confidence/data sufficiency

Profile:

* primary identity
* meaningful secondary identities

---

# 17. IDENTITY FIXTURES

Current identity architecture is fixture-driven.

Current fixtures include approximately:

* `boundary_explorer`
* `deep_diver`
* `engagement_architect`

They contain things such as:

* ID
* title
* category
* icon
* description
* identity traits
* recommendation bias
* minimum entries
* weights

This architecture is worth preserving.

### But the identity set needs conceptual divergence from Designations.

Future identities should describe:

> **curator philosophies**

rather than:

> taste badges.

---

# 18. IDENTITY EXPLANATIONS

Current identity system already has useful infrastructure:

* weighted contribution breakdown
* top contributing traits
* explanation
* identity finding

Preserve this.

Example:

```text
Systems-Seeking Interpretive Curator

Why?

Gameplay Mechanics     9.6
Depth                  8.4
Systems Affinity       strong
Interpretive Depth     strong
```

The eventual UI should make this understandable.

---

# 19. IDENTITY CONFIDENCE

Current implementation:

```text
entryCount / minimum_entries
```

This is too simplistic.

It should not eventually be presented as:

> Identity confidence: 87%

when all that means is that there are enough entries.

Future terminology should distinguish:

### Data Sufficiency

Do we have enough archive data?

### Classification Confidence

How clearly does Identity A beat Identity B?

### Signal Strength

How strongly are the relevant traits expressed?

These are different concepts.

---

# 20. EVIDENCE

Evidence is not necessarily one universal object type.

Different layers can have different evidence representations.

### Observations

Strong structured evidence.

### Findings

Should eventually have structured supporting evidence.

### Designations

Can have lightweight structured "why this designation" evidence.

### Identity

Contribution breakdown is an appropriate form of evidence.

The goal is not:

> Make every system identical.

The goal is:

> Make every conclusion explainable and trustworthy.

---

# 21. NARRATIVE / INTERPRETATION

## Status: 🟡 MOSTLY COMPLETE

Narrative currently produces:

* trait sentences
* genre signature
* archive summary
* designation interpretation
* identity-aware summary

Example:

> Your archive demonstrates...

Narrative is the human-readable synthesis layer.

### Preserve.

### Future

Refine wording and sophistication later.

Do not rebuild the entire narrative system before the underlying concepts are settled.

---

# 22. ARCHIVE PROFILE

## Status: 🟡 Backend mostly complete / frontend underdeveloped

This should become the **central intelligence presentation**.

An Archive Profile can contain:

```text
ARCHIVE PROFILE

├── Traits
│   ├── Originality
│   ├── Depth
│   ├── Engagement
│   └── ...
│
├── Genre Signals
│   ├── Affinities
│   ├── Combinations
│   └── Presence
│
├── Observations
│   ├── Boundary Preference
│   ├── Systems Affinity
│   ├── Atmospheric Focus
│   └── ...
│
├── Findings
│   ├── Interpretive conclusion A
│   ├── Interpretive conclusion B
│   └── ...
│
├── Designation
│   └── Primary: The Boundary Explorer
│
├── Identities
│   ├── Primary: Systems-Seeking Interpretive Curator
│   ├── Secondary: ...
│   └── Secondary: ...
│
├── Evidence
│   └── Expandable supporting information
│
└── Narrative
    └── Human-readable archive interpretation
```

---

# 23. PROFILE VS ANALYTICS UI

This is an actual planned UI change.

## Analytics

Should contain:

* charts
* score distributions
* averages
* genre statistics
* trends
* quantitative comparisons

## Profile

Should contain:

* traits
* genre signals
* observations
* findings
* designation
* identities
* evidence
* narrative

### Goal

Stop putting the Archive Profile card inside Analytics.

Create a dedicated Profile experience.

---

# 24. RECOMMENDATION ENGINE

## Status: 🔴 STUB

Current infrastructure:

* `models/recommendations/engine.py`
* `models/recommendations/models.py`
* `models/recommendations/scoring.py`
* `models/recommendations/signals.py`

But:

```text
generate_recommendations(...)
```

currently returns an empty list.

---

# 25. RECOMMENDATION ENGINE PURPOSE

Ultimately:

> **What should I experience next?**

It should compare candidate media against the archive's measurable preferences.

Primary inputs:

### Traits

```text
Originality
Depth
Engagement
...
```

### Genre signals

```text
Horror affinity
Sci-fi affinity
Experimental affinity
...
```

### Universal scoring

What qualities matter overall?

### Media-specific scoring

What matters differently for:

* games
* books
* videos

### Designations

Use:

* designation score
* recommendation bias

Example:

```text
Boundary Explorer
→ unusual concepts
→ genre hybrids
→ experimental storytelling
```

### Observations / Findings

Use as **soft signals**.

---

# 26. WHAT RECOMMENDATIONS SHOULD NOT DO

Do not eventually do:

```text
Identity score = 0.87
Therefore recommendation = 87% match
```

Identity is primarily descriptive.

Instead:

```text
Identity
   ↓
highlights underlying traits/signals
   ↓
recommendation engine uses measurable signals
```

---

# 27. RECOMMENDATION OUTPUT

Eventually recommendations should ideally explain themselves.

Example:

```text
Recommendation:
Movie X

Match: 92

Why:
+ Strong experimental affinity
+ High originality alignment
+ Matches Boundary Explorer preferences
+ Strong atmospheric compatibility
+ Similar to several highly-rated archive records
```

The recommendation engine should ultimately answer both:

> **What should I watch/play/read?**

and:

> **Why the hell did you recommend this to me?**

---

# 28. LIBRARY PAGINATION

## Status: 🔴 NOT STARTED

Current:

```text
GET /entries/
    ↓
load everything
    ↓
filter/sort in browser
```

Future:

### Backend

Implement:

* limit
* offset or cursor
* total count
* eventually server-side sorting
* eventually server-side filtering

### Frontend

Implement:

* pagination controls

or potentially:

* infinite scroll

### Later optimization

Server-side:

* filtering
* sorting
* search

---

# 29. IMPORT / EXPORT

## Status: 🔴 NOT STARTED

Recommended starting point:

### JSON export

Export archive data.

### JSON import

Import validated archive data.

Important future considerations:

* schema version
* validation
* duplicate handling
* migration compatibility
* backup/restore safety

---

## Later

Potential formats:

* CSV
* perhaps other formats

But JSON should come first because it preserves richer structured data.

---

# 30. METADATA EXPANSION

## Status: 🔴 NOT STARTED

Potential future metadata:

### Books

* author
* publication year
* cover
* ISBN/external IDs

### Movies/videos

* director
* year
* studio
* runtime
* external IDs
* poster

### Games

* developer
* publisher
* release year
* platform
* cover
* external IDs

Do not allow metadata expansion to derail the intelligence work.

---

# 31. FRONTEND REFACTOR

## Status: 🟡 MOSTLY COMPLETE

Already accomplished:

* modular JS
* navigation
* scoring form improvements
* rubric interface
* report styling
* archive language
* separation of concerns improvements

Remaining:

* Profile separation
* Profile UI architecture
* accessibility
* UX polish
* possibly cleanup of older modules

---

# 32. ACCESSIBILITY / UX

## Status: 🟡 POLISH

Areas:

* scoring controls
* rubric explanations
* Profile UI
* Reports
* navigation
* responsive behavior
* semantic markup
* keyboard navigation
* labels
* contrast
* expandable evidence

This should be iterative rather than a giant dedicated rewrite.

---

# 33. TESTING & STABILITY

## Status: 🟡 MOSTLY COMPLETE

Current baseline:

**199 passing tests**

Strong areas include:

* entries
* validation
* scoring
* scoring rubrics
* archive profile
* traits
* designations
* identities
* observations
* findings
* genre intelligence
* evidence structures

---

## Future testing

Add tests whenever we change:

### Findings

* multiple findings
* evidence
* confidence

### Designations

* rule behavior
* ranking
* primary selection
* evidence

### Identity

* multiple identities
* ranking
* primary selection
* secondary identities
* confidence/data sufficiency
* contribution explanations

### Recommendations

* signal weighting
* ranking
* explanations
* edge cases

### Pagination

* limits
* offsets/cursors
* ordering
* filters

### Import/export

* round-trip fidelity
* malformed files
* schema versions
* duplicates

---

# 34. DOCUMENTATION

## Status: 🟡 NEEDS UPDATE

README should eventually explain the current reality rather than the old roadmap.

Include:

* architecture
* scoring philosophy
* rubric system
* Archive Profile
* traits
* observations
* findings
* designations
* identities
* evidence
* recommendation engine
* reports
* testing
* development branch

---

# 35. PHASED IMPLEMENTATION ROADMAP

This is the part I'd use when deciding **"what the hell are we doing next?"**

---

## PHASE 0 — CONCEPTUAL LOCK

### Goal

Establish the permanent contracts of the intelligence system.

### Tasks

* [ ] Define Trait
* [ ] Define Genre Signal
* [ ] Define Observation
* [ ] Define Finding
* [ ] Define Designation
* [ ] Define Identity
* [ ] Define Evidence
* [ ] Define Signal Strength
* [ ] Define Data Sufficiency
* [ ] Define Classification Confidence
* [ ] Define Narrative
* [ ] Define Recommendation Bias
* [ ] Define Recommendation Signal
* [ ] Define Archive Profile
* [ ] Define Analytics

### Critical decisions

* [ ] Confirm Observations and Findings remain parallel systems
* [ ] Confirm Designations and Identities remain separate
* [ ] Confirm Designation = atomic classification
* [ ] Confirm Identity = curator synthesis
* [ ] Confirm multiple observations
* [ ] Confirm multiple findings
* [ ] Confirm one primary designation
* [ ] Confirm multiple identities
* [ ] Confirm primary + secondary identities
* [ ] Confirm Identity names do not have to match Designation names

### Done when

We can explain every layer without ambiguity.

**No major feature coding before this is locked.**

---

# PHASE 1 — INTELLIGENCE ALIGNMENT

### Goal

Improve what already exists without rewriting the architecture.

### Findings

* [ ] Audit every existing Finding rule
* [ ] Identify overlap with Observation rules
* [ ] Move Findings one interpretive level higher
* [ ] Allow Findings to synthesize multiple observations
* [ ] Add meaningful Finding confidence
* [ ] Add structured Finding evidence
* [ ] Preserve existing useful Findings

### Designations

* [ ] Audit all designation rules
* [ ] Clarify what each designation means
* [ ] Ensure rules remain distinct from Findings
* [ ] Improve evidence/explanation
* [ ] Replace misleading confidence terminology
* [ ] Preserve primaryDesignation behavior
* [ ] Preserve recommendation bias

### Identity

* [ ] Audit existing identity fixtures
* [ ] Identify collisions with Designations
* [ ] Redefine identities as curator philosophies
* [ ] Determine new identity archetype set
* [ ] Preserve fixture-driven architecture
* [ ] Preserve weighted scoring infrastructure
* [ ] Preserve contribution breakdown
* [ ] Support multiple meaningful identities
* [ ] Define primary identity
* [ ] Define secondary identity behavior
* [ ] Improve identity confidence semantics

### Confidence

* [ ] Separate signal strength
* [ ] Separate data sufficiency
* [ ] Define classification confidence
* [ ] Define evidence strength
* [ ] Apply terminology consistently

### Important constraint

**Do not rebuild working systems simply because the concepts are evolving.**

---

# PHASE 2 — ARCHIVE PROFILE UI

### Goal

Make the intelligence actually visible.

### Create dedicated Profile area

* [ ] New Profile navigation
* [ ] Remove Profile card from Analytics
* [ ] Design Profile layout
* [ ] Design Profile information hierarchy

### Profile contents

* [ ] Primary Designation
* [ ] Designation score
* [ ] Designation explanation
* [ ] Identity confidence/data sufficiency
* [ ] Primary Identity
* [ ] Secondary identities
* [ ] Identity contribution breakdown
* [ ] Traits
* [ ] Genre affinities
* [ ] Genre signals
* [ ] Observations
* [ ] Observation evidence
* [ ] Findings
* [ ] Finding evidence
* [ ] Narrative summary

### UX

* [ ] Expandable evidence
* [ ] Clear hierarchy
* [ ] Avoid overwhelming the user
* [ ] Distinguish measured data from interpretation
* [ ] Distinguish observation from finding
* [ ] Distinguish designation from identity

---

# PHASE 3 — REAL RECOMMENDATION ENGINE

### Goal

Turn the archive intelligence into useful recommendations.

### Tasks

* [ ] Define candidate media model
* [ ] Define recommendation signal model
* [ ] Implement signal extraction
* [ ] Implement candidate matching
* [ ] Implement scoring
* [ ] Implement ranking
* [ ] Handle media-specific scoring
* [ ] Use designation biases
* [ ] Use genre affinities
* [ ] Use trait strengths
* [ ] Use universal averages
* [ ] Use media-specific averages
* [ ] Add soft Observation signals
* [ ] Add soft Finding signals
* [ ] Avoid treating Identity as direct numeric score
* [ ] Generate recommendation explanations
* [ ] Add recommendation tests
* [ ] Add edge-case handling

### Eventually

* [ ] "Why this?"
* [ ] "Because you liked..."
* [ ] "Matches your..."
* [ ] "Unusual for you but likely compatible"

---

# PHASE 4 — LIBRARY SCALE

### Goal

Stop requiring the entire archive to load at once.

### Backend

* [ ] Pagination parameters
* [ ] Total count
* [ ] Stable ordering
* [ ] Server-side sorting
* [ ] Server-side filtering where useful

### Frontend

* [ ] Pagination UI or infinite scrolling
* [ ] Loading states
* [ ] Empty states
* [ ] Preserve filters between pages
* [ ] Preserve sorting
* [ ] Test large archives

---

# PHASE 5 — IMPORT / EXPORT

### Goal

Make the archive portable and safely backed up.

### JSON Export

* [ ] Define export schema
* [ ] Include schema version
* [ ] Export archive
* [ ] Export relevant metadata

### JSON Import

* [ ] File picker
* [ ] Validation
* [ ] Preview
* [ ] Duplicate handling
* [ ] Import confirmation
* [ ] Error reporting

### Backup

* [ ] Full archive backup workflow
* [ ] Restore workflow
* [ ] Migration compatibility

### Later

* [ ] CSV export
* [ ] CSV import if useful

---

# PHASE 6 — METADATA EXPANSION

### Goal

Make the archive richer without compromising its core scoring model.

Potential:

* [ ] Author
* [ ] Director
* [ ] Developer
* [ ] Publisher/studio
* [ ] Release year
* [ ] Runtime
* [ ] Platform
* [ ] Covers/posters
* [ ] ISBN
* [ ] External IDs

Potential future metadata integrations can come later.

---

# PHASE 7 — POLISH / ACCESSIBILITY / STABILITY

### UX

* [ ] Profile polish
* [ ] Analytics polish
* [ ] Reports polish
* [ ] Library polish
* [ ] Navigation polish
* [ ] Forms polish

### Accessibility

* [ ] Keyboard navigation
* [ ] Semantic elements
* [ ] Labels
* [ ] ARIA where necessary
* [ ] Color contrast
* [ ] Focus states
* [ ] Screen-reader testing

### Stability

* [ ] Edge cases
* [ ] Empty archive
* [ ] Tiny archive
* [ ] Huge archive
* [ ] Missing genres
* [ ] Missing scores
* [ ] Partial data
* [ ] Migration scenarios

### Documentation

* [ ] README
* [ ] Architecture documentation
* [ ] Intelligence contracts
* [ ] Recommendation documentation
* [ ] Backup/import/export documentation

---

# PHASE 8 — RELEASE

### Goal

Have something you can confidently call a finished application.

* [ ] Final test suite
* [ ] No known critical bugs
* [ ] Database migration strategy
* [ ] Backup strategy
* [ ] Import/export verified
* [ ] Documentation complete
* [ ] UI/accessibility review
* [ ] Deployment plan
* [ ] Release build
* [ ] Versioning
* [ ] Changelog

---

# PHASE 9 — REACT MIGRATION

## Status: FUTURE

**Do not touch yet.**

Only consider after:

* conceptual architecture is stable
* intelligence layer is stable
* Profile is stable
* recommendations work
* library scale works
* import/export works
* application is genuinely usable

React should be an implementation evolution, not a way of avoiding unfinished product work.

---

# 36. THINGS WE MUST NOT ACCIDENTALLY REBUILD

This is probably the most important section to keep around.

### ❌ Do not redo scoring

Already complete.

### ❌ Do not redo scoring rubrics

Already complete.

### ❌ Do not redo CRUD

Already complete.

### ❌ Do not redo Reports / Auto-Generated Lists

Already complete.

### ❌ Do not rebuild the Archive engine from scratch

It is already substantially developed.

### ❌ Do not throw away the Observation evidence model

It is currently one of the strongest pieces of the system.

### ❌ Do not merge Findings and Observations just because they overlap

They have intentionally different conceptual roles.

### ❌ Do not merge Designations and Identity

Their distinction is one of the things we're explicitly repairing.

### ❌ Do not make Identity another name for Designation

Identity is supposed to answer a different question.

### ❌ Do not make Identity a direct recommendation score

Use the measurable signals underneath it.

### ❌ Do not put Profile back into Analytics

Those are intentionally separate.

### ❌ Do not migrate to React yet

Future phase.

---

# 37. THE CARDINALITY RULES

This is worth keeping in giant letters somewhere because it affects the entire UI and data model.

```text
TRAITS
MANY

GENRE SIGNALS
MANY

OBSERVATIONS
MANY

FINDINGS
MANY

DESIGNATIONS
MANY internally
ONE PRIMARY designation on Profile

IDENTITIES
MANY
ONE PRIMARY identity
ZERO OR MORE meaningful secondary identities
```

Conceptually:

```text
"You are primarily a Systems-Seeking
 Interpretive Curator."

"But your archive also strongly exhibits
 Boundary Explorer and Deep Diver qualities."

"Your primary designation is
 The Boundary Explorer."

"Here are five observations that demonstrate
 the patterns."

"Here are three findings that interpret those
 observations."

"Here are the traits and evidence supporting
 everything above."
```

---

# 38. THE IDEAL INTELLIGENCE EXAMPLE

This is the mental model I'd use whenever we get confused about the architecture.

### TRAITS

**What qualities are strongly represented?**

```text
Originality       8.8
Depth             8.4
Gameplay Mechanics 9.6
Engagement        9.1
Craft             8.7
```

↓

### OBSERVATIONS

**What recurring patterns can we directly demonstrate?**

**◈ Boundary Preference**

> Your archive repeatedly favors unusual concepts...

**Evidence:**

> Originality 8.8/10

---

**◈ Systems Affinity**

> Your archive shows appreciation for carefully designed mechanics...

**Evidence:**

> Gameplay Mechanics 9.6/10

---

### FINDINGS

**What does the available evidence suggest?**

> Your archive demonstrates a strong preference for experiences that challenge conventional genre boundaries.

Potentially supported by:

* Boundary Preference
* Experimental Genre Affinity
* High Originality
* Surreal/Horror cross-interest

---

### DESIGNATION

**What recognizable classification fits that pattern?**

> ◈ **The Boundary Explorer**

```text
Traits:
Originality
Depth

Genres:
Experimental
Surreal
Sci-Fi
Horror

Recommendation Bias:
Unusual concepts
Genre hybrids
Experimental storytelling
```

---

### IDENTITY

**What kind of curator does all of this make you?**

> **Systems-Seeking Interpretive Curator**

And crucially:

**That does not need to be one of the Designation names.**

That is the distinction we were losing.

---

# 39. THE ULTIMATE PRODUCT LOOP

Once everything is working, the application should conceptually do this:

```text
                    ┌──────────────┐
                    │ MEDIA ENTRY  │
                    └──────┬───────┘
                           ↓
                  ┌─────────────────┐
                  │ SCORE + GENRES  │
                  └────────┬────────┘
                           ↓
              ┌────────────────────────┐
              │ TRAITS + GENRE SIGNALS │
              └───────────┬────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
 OBSERVATIONS         FINDINGS        DESIGNATIONS
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ↓
                    ┌───────────┐
                    │ IDENTITY  │
                    └─────┬─────┘
                          ↓
                    ┌───────────┐
                    │  PROFILE  │
                    └─────┬─────┘
                          ↓
                 ┌─────────────────┐
                 │ RECOMMENDATIONS │
                 └────────┬────────┘
                          ↓
                    NEW MEDIA
                          │
                          └──────────────→
                              back into
                               archive
```

The important thing is that the **intelligence layer gets richer as the archive gets richer**.

---

# 40. OUR CURRENT PRIORITY ORDER

If we lose the plot again, come back here.

### RIGHT NOW

**1. Lock the intelligence concepts**

Especially:

* Finding vs Observation
* Designation vs Identity
* confidence terminology
* cardinality

### THEN

**2. Align the existing intelligence implementation**

Minimal changes, not rewrites.

### THEN

**3. Build the dedicated Archive Profile UI**

This is the biggest immediate user-facing payoff.

### THEN

**4. Build the Recommendation Engine**

Now that we know exactly what signals it should consume.

### THEN

**5. Pagination**

### THEN

**6. Import/Export**

### THEN

**7. Metadata expansion**

### THEN

**8. Polish / accessibility / stability / documentation**

### THEN

**9. Release**

### MUCH LATER

**10. React migration**

---

# 41. THE ONE-SENTENCE VERSION

If you ever come back six months from now and ask, *"What the fuck were we doing with this project?"*:

> **Media Tracker turns raw media scores into measurable traits and genre signals, independently interprets those signals through observations, findings, designations, and curator identities, presents the resulting meaning through an Archive Profile, and eventually uses the measurable signals to recommend what should come next.**
