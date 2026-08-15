# Media Tracker — Master Roadmap & Source of Truth

**Authoritative branch:** `develop-3`  
**Guiding principle:** **Evolution, not rewrite.**

---

# CURRENT PROJECT STATUS

Media Tracker is a personal media archive and taste-intelligence application.

The project currently has:

- a functioning media archive
- hybrid universal + media-specific scoring
- genre intelligence
- measurable traits
- Observation infrastructure
- Finding infrastructure
- Designation infrastructure
- Identity scoring infrastructure
- identity-derived traits
- identity contribution/explanation infrastructure
- Archive Profile backend infrastructure
- template-driven narrative infrastructure
- recommendation infrastructure/stub
- automated regression coverage

The current intelligence architecture is intentionally modular.

It should not be interpreted as a strict runtime pipeline.

Conceptually:

```text
RAW ARCHIVE
↓
TRAITS + GENRE SIGNALS
↓
┌─────────────┬───────────┬─────────────┬────────────┐
│ OBSERVATIONS│ FINDINGS │ DESIGNATIONS│ IDENTITIES │
└─────────────┴───────────┴─────────────┴────────────┘
↓
ARCHIVE PROFILE
↓
RECOMMENDATION SIGNALS
↓
RECOMMENDATION ENGINE
```

Observations, Findings, Designations, and Identities remain analytically parallel perspectives over shared archive data.

---

# PHASE 0 — CONCEPTUAL LOCK

## Status: CONCEPTUALLY COMPLETE

The Intelligence Contract v1 now defines:

- Trait
- Genre Signal
- Observation
- Finding
- Designation
- Identity
- Evidence
- Signal Strength
- Data Sufficiency
- Classification Confidence
- Evidence Strength
- Narrative
- Recommendation Signals
- Recommendation Bias
- Archive Profile
- Analytics

The contract also locks:

- Observation vs Finding distinction
- Designation vs Identity distinction
- multiple Observations
- multiple Findings
- multiple internal Designations
- one Primary Designation on Profile
- multiple Identities internally
- one Primary Identity
- zero or more meaningful Secondary Identities
- Analytics vs Profile separation
- empty/sparse/established archive states
- explainability requirements
- evolution rather than rewrite

The conceptual audit has also recovered existing behavioral contracts that must be preserved unless they directly conflict with the contract.

Examples include:

- Trait Signal Strength normalization
- separate Identity normalization semantics
- Identity weighted scoring
- derived Identity traits
- minimum-entry behavior
- designation ranking
- primary selection
- Observation evidence
- Identity contribution breakdowns
- recommendation-bias metadata
- empty intelligence collections

Phase 0 should no longer be treated as an open-ended conceptual-design phase.

---

# PHASE 1 — INTELLIGENCE ALIGNMENT

## Status: NEXT IMPLEMENTATION PHASE

### Goal

Bring the existing intelligence implementation into alignment with the locked conceptual model without rewriting working infrastructure.

### Current audit status

The repository audit is complete.

The next work is implementation alignment, not another broad exploratory audit.

### Priority 1 — Identity Eligibility

Current behavior:

- `minimum_entries` zeros Identity scoring below the threshold
- the Identity may nevertheless remain in ranking
- a zero-scored Identity may therefore be selected as primary

Required behavior:

```text
entry_count < minimum_entries
↓
INELIGIBLE
↓
exclude from Identity ranking/presentation
```

Preserve:

- weighted scoring
- derived traits
- contribution breakdown
- fixture-driven architecture

---

### Priority 2 — Confidence Terminology

Separate:

- Signal Strength
- Data Sufficiency
- Classification Confidence
- Evidence Strength

Correct terminology before inventing new algorithms.

Known semantic mappings:

| Current Concept        | Actual Meaning                | Phase 1 Action       |
| ---------------------- | ----------------------------- | -------------------- |
| Identity `confidence`  | Data Sufficiency              | Rename/reframe       |
| Designation confidence | Trait-derived signal strength | Rename/reframe       |
| Observation confidence | Threshold-relative support    | Clarify/reframe      |
| Finding confidence     | Not yet standardized          | Define before adding |

Do not create a generalized Classification Confidence algorithm merely to satisfy field naming.

---

### Priority 3 — Designation Alignment

Preserve:

- fixture/rule-driven definitions
- ranking
- primary selection
- traits
- genres
- recommendation bias

Align:

- terminology
- explanation/evidence where useful

Do not expand Designations into curator Identity.

---

### Priority 4 — Identity / Designation Separation

Current Identity fixtures overlap with existing Designations.

This is an implementation artifact.

Identity should evolve toward:

> **curator philosophy / curator synthesis**

rather than:

> taste badge

Do not delete Identity scoring machinery.

Do not make Identity another name for Designation.

---

### Priority 5 — Findings vs Observations

Every Finding must provide meaningful additional interpretation.

Operational test:

> If replacing the Finding with its underlying Observation or raw signal loses no meaningful information, it is probably not functioning as a Finding.

Preserve useful existing Findings.

Do not automatically delete overlapping Findings.

Add structured evidence where practical.

---

### Priority 6 — Secondary Identities

The contract permits:

- one Primary Identity
- zero or more meaningful Secondary Identities

Do not surface every Identity with a nonzero score.

Define meaningfulness using:

- eligibility/data sufficiency
- signal strength
- relationship to primary
- meaningful separation

Numeric thresholds remain an implementation decision and must be based on actual score distributions.

---

### Priority 7 — Ranking / Tie Policy

Define:

- exact tie behavior
- stable ordering
- meaningful near-ties
- close-competitor presentation

Do not invent arbitrary thresholds.

---

### Priority 8 — Archive State Behavior

Define operational behavior for:

- EMPTY
- SPARSE
- ESTABLISHED

The conceptual rule is:

> Insufficient evidence must remain visibly different from a negative preference.

Subsystems may have different minimum-data requirements.

---

### Priority 9 — Regression Protection

Protect recovered behavior including:

- trait normalization
- identity normalization
- derived traits
- Identity minimum-entry behavior
- designation ranking
- primary selection
- Observation evidence
- identity contribution breakdown
- recommendation bias
- empty intelligence collections
- deterministic ordering

The previously established baseline is approximately:

> **199 passing tests**

Phase 1 should preserve that baseline except for explicitly intentional changes and their associated new tests.

---

# PHASE 1 NON-GOALS

Do not use Phase 1 to:

- redo scoring
- redo scoring rubrics
- replace Observation architecture
- replace fixture-driven Designations
- replace fixture-driven Identity scoring
- redesign Recommendations
- build Profile UI
- implement pagination
- implement import/export
- expand metadata
- migrate to React
- replace deterministic intelligence with opaque AI
- create arbitrary new classifications

---

# PHASE 2 — ARCHIVE PROFILE UI

## Status: AFTER PHASE 1

Build the dedicated Profile experience.

Profile should present:

- Primary Designation
- designation explanation
- Primary Identity
- meaningful Secondary Identities
- Identity data sufficiency where appropriate
- Identity contribution breakdown
- Traits
- Genre Signals
- Observations
- Observation evidence
- Findings
- Finding evidence
- Narrative

Analytics remains separate.

Analytics answers:

> **What do the numbers say?**

Profile answers:

> **What does the archive mean?**

---

# PHASE 3 — REAL RECOMMENDATION ENGINE

## Status: FUTURE

The current Recommendation Engine is infrastructure/stub work.

```text
generate_recommendations(...)
↓
collect signals
↓
recommendations = []
```

The eventual engine should consume measurable archive signals including:

- Trait Strength
- Genre Affinity
- scoring preferences
- universal scoring
- media-specific scoring
- Designation recommendation bias
- soft Observation signals
- soft Finding signals

Identity should influence recommendations indirectly through underlying measurable signals.

The Recommendation Engine should eventually explain:

> **Why was this recommended?**

---

# PHASE 4 — LIBRARY SCALE

## Status: FUTURE

Implement:

- pagination
- stable ordering
- server-side sorting
- server-side filtering where useful
- large-archive testing

---

# PHASE 5 — IMPORT / EXPORT

## Status: FUTURE

Prioritize:

- JSON export
- JSON import
- schema versioning
- validation
- duplicate handling
- migration compatibility
- backup/restore

CSV can remain later.

---

# PHASE 6 — METADATA EXPANSION

## Status: FUTURE

Potential metadata:

- author
- director
- developer
- publisher/studio
- release year
- runtime
- platform
- covers/posters
- ISBN
- external IDs

Metadata should enrich intelligence rather than replace it.

---

# PHASE 7 — POLISH / ACCESSIBILITY / STABILITY

Includes:

- Profile polish
- Analytics polish
- Library polish
- Reports polish
- navigation
- forms
- keyboard navigation
- semantic markup
- labels
- contrast
- focus states
- screen-reader testing
- edge cases
- sparse/partial data
- large archives
- documentation

---

# PHASE 8 — RELEASE

Release requirements include:

- stable test suite
- no known critical bugs
- migration strategy
- backup strategy
- import/export
- documentation
- accessibility review
- deployment plan
- release build
- versioning
- changelog

---

# PHASE 9 — REACT MIGRATION

## Status: FUTURE — DO NOT TOUCH YET

React migration should occur only after:

- intelligence is stable
- Profile is stable
- recommendations work
- library scale works
- import/export works
- the application is genuinely usable

React is an implementation evolution, not an escape from unfinished product work.

---

# THINGS WE MUST NOT ACCIDENTALLY REBUILD

Do not redo:

- scoring
- scoring rubrics
- CRUD
- generated Reports / Lists
- Archive infrastructure
- Observation evidence
- Identity scoring machinery
- Designation machinery

Do not merge:

- Findings with Observations
- Designations with Identity
- Analytics with Profile

Do not make:

- Identity a Designation clone
- Identity a direct recommendation score
- narrative a new intelligence engine

---

# CARDINALITY RULES

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
ONE PRIMARY on Profile

IDENTITIES
MANY internally
ONE PRIMARY
ZERO OR MORE meaningful SECONDARIES
```

---

# CURRENT PRIORITY ORDER

1. **Complete Phase 1 Intelligence Alignment**
2. **Build dedicated Archive Profile UI**
3. **Build Recommendation Engine**
4. **Add Recommendations surface**
5. **Library pagination / scale**
6. **Import / Export**
7. **Metadata expansion**
8. **Polish / accessibility / stability / documentation**
9. **Release**
10. **React migration**

---

# One-Sentence Project Direction

> **Media Tracker turns raw media scores into measurable traits and genre signals, independently interprets those signals through observations, findings, designations, and curator identities, presents the resulting meaning through an Archive Profile, and eventually uses the measurable signals to recommend what should come next.**
