# Media Tracker — Forgotten Features Register

**Project:** Media Tracker  
**Authoritative branch:** `develop-3`  
**Purpose:** Preserve previously identified product intent that could be lost while Phase 1 focuses on Intelligence Alignment  
**Status:** Pre-implementation register  
**Guiding principle:** Recover intent without automatically turning historical ideas into requirements

---

## 1. Purpose

Phase 1 is intentionally focused on aligning the existing intelligence machinery with the Intelligence Contract.

That focus creates a predictable risk: product features discussed earlier may disappear from active planning simply because they are not relevant to the current intelligence work.

This document exists to prevent that loss.

It is **not** a new implementation roadmap.

It is a register of:

- features already established elsewhere in the roadmap
- features partially implemented
- ideas recovered from earlier project discussions
- product surfaces that may otherwise be under-scoped
- ambiguous ideas that still require an explicit Keep / Candidate / Drop decision

The register distinguishes between **remembering an idea** and **committing to implement it**.

---

## 2. Status Legend

| Status | Meaning |
|---|---|
| **ROADMAP-LOCKED** | Already established in the authoritative roadmap; do not lose it |
| **PARTIALLY PRESENT** | Some implementation exists, but the intended scope is larger |
| **RECOVERED** | Explicitly discussed previously, but not sufficiently locked in the roadmap |
| **CANDIDATE** | Plausible product direction that requires an explicit Keep / Drop decision |
| **DEFERRED** | Intentionally belongs to a later phase |
| **DROP** | Explicitly rejected or no longer desired |

---

## 3. Product Loop That Must Not Be Lost

The broader product concept previously established was:

**Collect → Measure → Interpret → Recommend → Organize**

with **portable backup** and **scale** becoming increasingly important as the archive grows.

The intelligence work in Phase 1 primarily concerns the middle of this loop:

**Measure → Interpret**

It must not permanently displace the rest of the product.

---

# 4. Roadmap-Locked Features

These are not actually forgotten requirements. They are included here because they are particularly easy to lose while Phase 1 dominates active development.

---

## 4.1 Dedicated Archive Profile

**Status:** `ROADMAP-LOCKED` / `PARTIALLY PRESENT`  
**Phase:** Phase 2

The Archive Profile should become its own user-facing surface rather than remaining permanently embedded inside Analytics.

### Intended role

The Profile answers:

> What does this archive mean?

It presents established intelligence such as:

- Primary Designation
- Secondary Designations
- Primary Identity
- Secondary Identities
- Findings
- Observations
- Traits
- Genre Signals
- evidence / explanations
- archive state
- narrative synthesis

### Current state

The backend/profile assembly already exists substantially.

The frontend currently has only:

1. Library
2. Analytics
3. Lists

A dedicated Profile surface has not yet been built.

### Invariant

Do not allow continued Analytics expansion to become a permanent substitute for the Profile page.

---

## 4.2 Recommendation Engine

**Status:** `ROADMAP-LOCKED` / `DEFERRED`  
**Phase:** Phase 3

The recommendation system is currently a stub.

The eventual system should provide:

- measurable preference matching
- explainable recommendation signals
- “why this?” explanations
- connections to previously rated works
- hard/measurable signals such as traits and genre affinity
- softer signals from Observations, Findings, and Identity

Identity must **not** become an opaque recommendation score.

### Important product distinction

Recommendations are intended to become a user-facing product surface, not merely an API function.

The eventual product loop should therefore include:

**Profile → Recommendations**

rather than leaving recommendations buried inside Analytics.

---

## 4.3 Library Pagination / Scale

**Status:** `ROADMAP-LOCKED`  
**Phase:** Phase 4

Current behavior loads the entire archive through `GET /entries/` and performs filtering/sorting in the browser.

Planned scale work includes:

- backend pagination
- `limit`
- `offset` or cursor
- total count
- eventual server-side search
- server-side filtering
- server-side sorting
- preserved filters across pages
- preserved sorting across pages
- loading states
- empty states
- large-archive testing

### UX invariant

The compact Library direction should survive pagination.

The intended Library UX is:

> compact row → click → edit/detail modal

rather than returning to large, information-heavy cards as the archive grows.

---

## 4.4 Server-Side Search / Filter / Sort

**Status:** `ROADMAP-LOCKED` / `PARTIALLY PRESENT`  
**Phase:** Primarily Phase 4

Client-side filtering and sorting already exist.

The long-term architecture should move these operations server-side as archive size increases.

Required considerations:

- stable ordering
- pagination compatibility
- search
- filtering
- sorting
- preservation of active filters
- preservation of sort state

This should be treated as scale work rather than an invitation to redesign the Library.

---

## 4.5 Import / Export

**Status:** `ROADMAP-LOCKED`  
**Phase:** Phase 5

### JSON Export

Planned capabilities:

- complete archive export
- schema version
- relevant metadata
- portable archive representation

### JSON Import

Planned workflow:

1. File picker
2. Validation
3. Preview
4. Duplicate handling
5. User confirmation
6. Import
7. Error reporting

### Backup / Restore

The product should eventually support:

- full backup
- restore
- migration compatibility
- version-aware handling

### Later possibility

CSV import/export may be added if it proves useful.

### Product principle

The archive should not become trapped inside one installation.

Portable data is a core long-term property of the application.

---

## 4.6 Custom and Persisted Lists

**Status:** `ROADMAP-LOCKED` / `PARTIALLY PRESENT`

Already implemented reports should not be rebuilt.

Existing functionality includes:

- Highest Evaluated
- per-media top lists
- Recent
- Hall of Fame (`>=95`)

Future list/report functionality includes:

- additional report types
- custom lists
- persisted lists
- server-side reports
- report export
- caching

### Particularly easy to forget

**Custom lists** and **persisted lists** should remain visible in post-Phase-1 planning.

---

## 4.7 Metadata Expansion

**Status:** `ROADMAP-LOCKED`  
**Phase:** Phase 6

The core entry model is intentionally thinner than the eventual metadata model.

Planned expansion:

| Media | Planned metadata |
|---|---|
| Books | author, publication year, cover, ISBN / external IDs |
| Movies / Video | director, year, studio, runtime, external IDs, poster |
| Games | developer, publisher, release year, platform, cover, external IDs |

The existence of richer information in real archive exports also suggests that metadata expansion is not merely cosmetic.

### Important constraint

Metadata expansion should not derail intelligence alignment.

---

## 4.8 Accessibility / UX Polish

**Status:** `ROADMAP-LOCKED`  
**Phase:** Phase 7

Planned work includes:

- keyboard navigation
- semantic markup
- labels and ARIA
- contrast
- focus states
- responsive behavior
- expandable evidence
- screen-reader testing
- empty archive behavior
- tiny archive behavior
- huge archive behavior
- form polish
- Library polish
- Profile polish
- Analytics polish
- Reports polish
- navigation polish

Expandable evidence is particularly relevant to the intelligence work because users should eventually be able to inspect **why** an Observation, Finding, Designation, or Identity exists.

---

## 4.9 Documentation / Release Hygiene

**Status:** `ROADMAP-LOCKED`  
**Phase:** Phase 7–8

Keep visible:

- README refresh
- architecture documentation
- intelligence contract maintenance
- recommendation documentation
- import/export documentation
- migration strategy
- versioning
- changelog
- deployment plan

The intelligence documentation should remain synchronized with implementation after Phase 1.

---

## 4.10 React Migration

**Status:** `DEFERRED`  
**Priority:** Much later

React migration is explicitly not a Phase 1 solution.

It should occur only after the existing product has meaningful:

- Intelligence
- Profile
- Recommendations
- Library scale
- Import/export
- UX/accessibility maturity

React must not become a way to postpone finishing the current product.

---

# 5. Recovered Product Features

These items were identified through earlier project discussions but are not as strongly locked as the roadmap features above.

They should remain visible until explicitly accepted or dropped.

---

## 5.1 Theme Selection

**Status:** `RECOVERED` / `CANDIDATE`

Earlier project intent included user-selectable visual themes.

Possible scope:

- light theme
- dark theme
- potentially multiple theme presets
- persistence through `localStorage`
- application-wide CSS-variable switching

Current frontend appears to use a fixed CSS-variable theme.

### Decision needed

Choose one:

- **KEEP** — promote to an explicit polish/settings requirement
- **DEFER** — retain as later polish
- **DROP** — intentionally remove from product intent

Do not treat its existence in prior conversation as sufficient to make it a locked requirement.

---

## 5.2 Settings / Preferences Surface

**Status:** `RECOVERED` / `CANDIDATE`

No dedicated Settings surface currently exists.

A future Settings page could provide a natural home for:

- theme
- default sort
- default page size
- display density
- import/export
- backup/restore
- other user preferences

### Important distinction

Settings should not be created merely because it is architecturally convenient.

First determine whether the number of persistent user preferences justifies a dedicated surface.

---

## 5.3 Session / Completion Capture

**Status:** `RECOVERED` / `CANDIDATE`

Real archive data contains information richer than the current basic entry model, particularly for games.

Examples include:

- method of play
- hardware
- completion status
- partial completion
- completion notes
- being stuck
- credits reached
- final-boss status
- percentage completion

The important question is whether these are merely metadata fields or whether they represent a distinct **engagement/completion model**.

### Decision needed

Determine whether the product should distinguish:

- completed
- partially completed
- abandoned
- stuck
- completed despite poor engagement
- completed with exceptional engagement

This should not be invented during Phase 1 intelligence work, but the possibility should not disappear.

---

## 5.4 Library Density Modes

**Status:** `RECOVERED` / `CANDIDATE`

Earlier UI direction favored a compact Library.

A future preference could allow:

- compact rows
- richer rows/cards
- potentially cover-oriented layouts

This should be considered separately from pagination.

### Invariant

The default Library should remain compact enough to support large archives.

---

## 5.5 Onboarding / Empty-Archive Guidance

**Status:** `RECOVERED` / `CANDIDATE`

The roadmap recognizes empty and small archive states, but a more explicit first-run experience was previously considered.

Possible scope:

- first-run explanation
- “what should I rate first?”
- empty archive guidance
- explanation of the scoring system
- explanation of what the intelligence system needs
- optional sample archive

### Principle

Do not manufacture intelligence conclusions from sparse data merely to make onboarding feel populated.

The UI should communicate:

> insufficient evidence

rather than false certainty.

---

## 5.6 Poster / Cover-Oriented Library Presentation

**Status:** `RECOVERED` / `CANDIDATE`  
**Related roadmap item:** Metadata expansion

Books, movies, and games eventually gain cover/poster metadata.

That creates a possible future Library presentation involving:

- cover thumbnails
- poster-oriented layouts
- media-specific visual treatment
- optional richer browsing mode

This should not automatically replace the compact list.

It is a potential **secondary presentation mode**.

---

## 5.7 Recommendations as a First-Class Navigation Surface

**Status:** `ROADMAP-LOCKED` in product intent; UI scope should remain explicit

The recommendation engine is already roadmap work.

The feature register should additionally preserve the distinction that the eventual product likely has a dedicated Recommendations surface.

The long-term navigation concept previously discussed was:

1. Library / New Entries
2. Profile Archive
3. Analytics
4. Lists
5. Recommendations

Current navigation exposes only:

1. Library
2. Analytics
3. Lists

Therefore the eventual product should not accidentally become:

> Library + Analytics + Lists forever

---

# 6. Intelligence-Adjacent Product Features

These belong to the intelligence system but have user-facing implications.

They should remain visible while Phase 1 backend work proceeds.

---

## 6.1 Secondary Identities on Profile

**Status:** `LOCKED CONCEPT / DEFERRED UI`

The intelligence contract establishes:

- one Primary Identity
- zero or more meaningful Secondary Identities

The Profile must eventually expose these coherently.

Secondary identities should not simply be displayed because their score is greater than zero.

---

## 6.2 Expandable Evidence

**Status:** `ROADMAP-LOCKED UX DIRECTION`

Eventually users should be able to inspect:

> Why does the system think this?

Potential evidence surfaces include:

- Observation evidence
- Finding evidence
- Designation explanation
- Identity contribution breakdown
- supporting Traits
- supporting Genre Signals

This should remain an explainability feature, not become a second intelligence system.

---

## 6.3 Designation “Why”

**Status:** `PHASE 1 EVIDENCE WORK`

Designations may receive lightweight explanation such as:

- strongest contributing signals
- relevant traits
- relevant genre affinity
- reason the designation ranked highly

This should not clone the full Observation evidence schema.

---

## 6.4 Archive State Communication

**Status:** `CONCEPT LOCKED / OPERATIONAL DETAILS UNRESOLVED`

The intelligence contract recognizes:

- EMPTY
- SPARSE
- ESTABLISHED

The UI will eventually need to communicate these states appropriately.

The product should prefer:

> “We don't have enough evidence yet.”

over:

> “Your archive strongly prefers X.”

when the archive is insufficient.

Operational thresholds remain a separate decision.

---

## 6.5 Intelligence Snapshot Export

**Status:** `CANDIDATE`

The existing backup/export roadmap covers archive portability.

A related future question is whether users should be able to export an **intelligence snapshot** containing things such as:

- Traits
- Genre Signals
- Observations
- Findings
- Designations
- Identities
- narrative/profile summary

This is not currently a locked requirement.

It should not be conflated with raw archive backup.

---

# 7. Explicitly Excluded / Do Not Reopen

The recovered inventory should not become an excuse to reopen decisions that are already settled.

Do not treat the following as forgotten:

- Core scoring/rubrics
- CRUD
- archive mapping
- existing generated reports/lists
- Trait machinery
- Designation machinery
- Identity scoring machinery
- existing Observation evidence architecture
- Narrative architecture
- Recommendation metadata
- React migration timing

The Phase 1 principle remains:

> Align working machinery; do not rewrite it without a demonstrated contract conflict.

---

# 8. Ambiguity Register

These are the items that genuinely require a future Keep / Defer / Drop decision.

| Feature | Current status | Recommended disposition |
|---|---|---|
| Theme selection | RECOVERED | Candidate |
| Settings surface | RECOVERED | Candidate; reassess after more preferences exist |
| Session/completion semantics | RECOVERED | Candidate; investigate after metadata work |
| Library density modes | RECOVERED | Candidate |
| Onboarding | RECOVERED | Candidate |
| Cover/poster-first presentation | RECOVERED | Candidate, likely tied to metadata |
| Intelligence snapshot export | RECOVERED | Candidate |
| Compare / side-by-side entries | RECOVERED idea | Candidate only if a concrete use case emerges |
| Bulk delete / undo / soft delete | Partially discussed | Candidate only if needed |
| CSV import/export | Roadmap-adjacent | Deferred until JSON portability proves useful |

---

# 9. Features Not Recommended for Promotion

Some recovered ideas are useful to remember but do not currently justify becoming requirements.

### Compare / side-by-side entries

This is a natural media-tracker feature, but there is insufficient evidence that it was an established product requirement.

Do not add it to the roadmap merely because it sounds useful.

### Bulk delete / undo / soft delete

A delete modal exists, but there is no strong evidence that bulk deletion or soft deletion was a committed requirement.

Keep as possible UX improvement only.

### Arbitrary dashboard expansion

Do not respond to the intelligence work by adding more Analytics merely because Profile is missing.

The conceptual distinction remains:

**Analytics:** What do the numbers say?  
**Profile:** What does the archive mean?

---

# 10. Product Preservation Principles

The recovered inventory establishes several principles for later implementation.

### 10.1 Profile must remain distinct from Analytics

Do not permanently fold curator intelligence into charts and statistics.

### 10.2 Recommendations must become explainable

A recommendation should eventually answer:

> Why are you showing me this?

### 10.3 Library must scale

The compact Library experience should survive archives substantially larger than the current dataset.

### 10.4 The archive must remain portable

JSON backup/export/import is more fundamental than any particular frontend framework.

### 10.5 Metadata should enrich intelligence, not replace it

More metadata does not automatically mean better intelligence.

### 10.6 Sparse archives require restraint

Insufficient evidence must remain visibly different from a negative preference.

### 10.7 UI features should not drive intelligence semantics

Profile presentation should consume established intelligence rather than inventing new classifications merely because the UI needs something to display.

---

# 11. Relationship to Phase 1

This register does **not** expand Phase 1.

Phase 1 remains:

1. Intelligence terminology alignment
2. Identity eligibility alignment
3. Finding boundary alignment
4. Identity catalog clarification
5. Observation coherence
6. Secondary/tie policy
7. Archive-state definitions
8. Regression protection

The recovered product features remain outside that scope unless a specific Phase 1 decision explicitly depends on them.

---

# 12. Recommended Post-Phase-1 Priority

Once Phase 1 is genuinely closed, the strongest product sequence is:

1. **Dedicated Profile surface**
2. **Recommendation Engine**
3. **Recommendations surface**
4. **Library pagination / scale**
5. **Server-side search/filter/sort**
6. **JSON export**
7. **JSON import**
8. **Backup / restore**
9. **Custom / persisted lists**
10. **Report export**
11. **Metadata expansion**
12. **Accessibility / UX polish**
13. **Documentation / release packaging**
14. **CSV portability**
15. **React migration**

Recovered candidates should be inserted only after an explicit Keep decision.

---

# 13. One-Sentence Purpose of This Register

> Preserve previously established product intent without allowing historical ideas to silently become requirements, while keeping Phase 1 focused on intelligence alignment.