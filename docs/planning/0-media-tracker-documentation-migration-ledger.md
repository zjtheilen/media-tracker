# Media Tracker Documentation Migration Ledger

## 1. Purpose

This ledger defines how the repository's current Markdown documentation will be migrated into the proposed 13-document end state.

It is a **migration plan, not an implementation plan**.

Its purpose is to prevent:

- loss of unique project knowledge
- accidental deletion of historical reasoning
- duplicated or competing sources of truth
- stale decisions being mistaken for current decisions
- implementation facts being promoted into conceptual rules without justification
- filename-renaming breakage
- invented content being introduced during consolidation
- unresolved contradictions being silently "fixed" by assumption

The governing migration rule is:

> **Every piece of meaningful documentation must either have a clearly identified destination, be explicitly retained as historical context, or be explicitly excluded from migration with a reason.**

No document should be deleted merely because its information appears elsewhere until that information has been accounted for in this ledger.

---

# 2. Current Documentation Corpus

The current project-owned Markdown corpus consists of **16 documents**:

1. `README.md`
2. `docs/planning/designation-system-evolution.md`
3. `docs/planning/forgotten-features-register.md`
4. `docs/planning/frontend-terminology-alignment.md`
5. `docs/planning/intelligence-contract.md`
6. `docs/planning/intelligence-forensic-audit.md`
7. `docs/planning/phase-1-decision-and-implementation-map.md`
8. `docs/planning/phase-1-identity-and-designation-contract.md`
9. `docs/planning/phase-1-identity-catalog.md`
10. `docs/planning/phase-1-identity-differentiation.md`
11. `docs/planning/phase-1-identity-evidence-mapping.md`
12. `docs/planning/phase-1-identity-fixture-contract.md`
13. `docs/planning/phase-1-identity-specification.md`
14. `docs/planning/phase-1-intelligence-alignment.md`
15. `docs/planning/phase-1-terminology-and-api-rename-map.md`
16. `docs/planning/roadmap.md`

Vendor/package documentation is excluded from this ledger.

---

# 3. Proposed 13-Document End State

The proposed end state is:

1. `README.md`
2. `docs/planning/roadmap.md`
3. `docs/planning/intelligence-contract.md`
4. `docs/planning/decision-and-implementation-map.md`
5. `docs/planning/identity-and-designation-contract.md`
6. `docs/planning/identity-fixture-contract.md`
7. `docs/planning/identity-evidence-mapping.md`
8. `docs/planning/intelligence-alignment.md`
9. `docs/planning/intelligence-forensic-audit.md`
10. `docs/planning/identity-catalog.md`
11. `docs/planning/terminology-and-api-rename-map.md`
12. `docs/planning/frontend-terminology-alignment.md`
13. `docs/planning/forgotten-features-register.md`

Three current documents are proposed for retirement after their unique information is preserved:

- `phase-1-identity-differentiation.md`
- `phase-1-identity-specification.md`
- `designation-system-evolution.md`

The removal of `phase-1` from surviving filenames is intentional.

The original "Phase 1" referred to the historical recovery/alignment effort in which the project's backend intelligence architecture was recovered and reconciled. It is not intended to remain a permanent lifecycle designation on current documentation.

---

# 4. End-State Authority Model

The migration uses **domain-specific authority**, rather than a single document being authoritative for everything.

| Document                               | Authority                                                           |
| -------------------------------------- | ------------------------------------------------------------------- |
| `README.md`                            | Public/project orientation                                          |
| `roadmap.md`                           | Project sequencing and status                                       |
| `intelligence-contract.md`             | Highest-level current intelligence semantics                        |
| `decision-and-implementation-map.md`   | Current Phase 1 implementation decisions and gates                  |
| `identity-and-designation-contract.md` | Detailed current Identity/Designation conceptual contract           |
| `identity-fixture-contract.md`         | Identity fixture structure and fixture-level constraints            |
| `identity-evidence-mapping.md`         | Identity evidence rationale and evidence limitations                |
| `intelligence-alignment.md`            | Historical Phase 1 alignment/recovery record                        |
| `intelligence-forensic-audit.md`       | Repository evidence, behavioral findings, and forensic methodology  |
| `identity-catalog.md`                  | Historical Identity-system evolution and rejected/deferred concepts |
| `terminology-and-api-rename-map.md`    | Backend/API terminology mapping                                     |
| `frontend-terminology-alignment.md`    | Frontend terminology and presentation alignment                     |
| `forgotten-features-register.md`       | Recovered feature memory and candidate register                     |
| Tests                                  | Executable behavioral contract                                      |
| Identity fixture JSON                  | Exact current fixture definitions                                   |

This means a document can contain related information without becoming the authority for that information.

---

# 5. Migration Status Vocabulary

Each current document receives one of four dispositions.

### KEEP

The document remains conceptually distinct and survives without consolidation.

### RENAME

The document remains substantially intact but receives a new filename because the current filename contains obsolete lifecycle terminology or otherwise misrepresents its permanent role.

### CONSOLIDATE

The document survives conceptually, but some or all of its content is moved into another surviving document.

### RETIRE

The document itself is removed after its meaningful information has been preserved elsewhere.

---

# 6. Document-by-Document Ledger

---

## 6.1 `README.md`

### Proposed filename

`README.md`

### Status

**KEEP**

### Role in end state

Public/project orientation.

The README should explain what Media Tracker is, what the major intelligence systems mean, the current project state, and where deeper documentation lives.

It should **not** become the detailed implementation authority.

### Major sections

The current README contains material covering:

- project title and description
- what Media Tracker is
- questions the system attempts to answer
- current project status
- intelligence architecture
- Traits
- Genre Signals
- Observations
- Findings
- Designations
- Identities
- Identity scoring
- multiple Identities
- quantitative vocabulary
- Archive States
- Analytics vs Archive Profile
- scoring philosophy
- Reports / Lists
- Recommendation Engine
- Phase 1 status
- recovered behavioral contracts
- roadmap
- project structure
- technology stack
- final project description

### Unique information

The README's unique value is primarily **orientation**, not detailed policy.

Preserve:

- concise description of Media Tracker
- high-level intelligence architecture
- user-facing explanation of the major concepts
- current high-level project status
- public-facing distinction between scoring, observations, findings, designations, and identities
- public-facing explanation of current Identity catalog
- documentation navigation
- technology overview
- project structure overview
- high-level roadmap orientation
- current test status where appropriate

### Duplicate information

The README duplicates substantial detail from:

- Intelligence Contract
- Decision and Implementation Map
- Identity/Designation Contract
- Identity Fixture Contract
- Identity Evidence Mapping
- Terminology Map
- Roadmap
- Designation Evolution
- Forensic Audit

Examples include:

- exact Identity weights
- minimum entry requirements
- Identity ranking behavior
- secondary Identity threshold
- detailed evidence hierarchy
- Designation mechanics
- terminology definitions
- Archive State policy
- recommendation semantics
- recovered behavioral contracts

### Authoritative destination

Detailed versions of these concepts belong elsewhere:

- intelligence semantics → `intelligence-contract.md`
- implementation policy → `decision-and-implementation-map.md`
- Identity/Designation details → `identity-and-designation-contract.md`
- fixture details → `identity-fixture-contract.md`
- evidence rationale → `identity-evidence-mapping.md`
- API terminology → `terminology-and-api-rename-map.md`
- roadmap → `roadmap.md`

### Historical destination

Historical rationale belongs in:

- `intelligence-alignment.md`
- `intelligence-forensic-audit.md`
- `identity-catalog.md`

### Unresolved contradictions

The README must **not independently resolve**:

- Archive State operational thresholds
- future Identity catalog evolution
- unresolved Finding evidence policy
- unresolved atmospheric-interest behavior
- future Recommendation Engine behavior

### Information explicitly not to migrate

Do not migrate detailed implementation policy into the README merely because it currently exists there.

Do not preserve stale examples such as retired Identity names as though they remain current.

Do not preserve conversational development artifacts.

### References requiring updates

No filename change.

Internal links should eventually be checked against renamed planning documents.

### Final verification

Verify:

- README contains no obsolete `phase-1` filename references.
- Current Identity catalog matches fixtures.
- Current test status is 245 passing / 0 failing.
- Classification Confidence is explicitly retired.
- No stale Identity examples remain.
- Plotly is listed rather than Chart.js.
- README does not contradict the authoritative planning documents.
- README remains readable as a project entry point rather than becoming another policy encyclopedia.

---

# 6.2 `docs/planning/roadmap.md`

### Proposed filename

`docs/planning/roadmap.md`

### Status

**KEEP**

### Role in end state

Project sequencing, milestones, current status, and future work.

### Major sections

Current material covers:

- roadmap overview
- project phases
- current status
- test milestones
- Phase 1 Intelligence Alignment
- Phase 1 completed checkpoints
- Phase 1 decision authority
- intelligence terminology
- Identity migration
- Observation / Finding work
- Archive Profile
- recommendation work
- frontend work
- later phases
- implementation sequencing
- historical milestone information

### Unique information

Preserve:

- actual project phase sequence
- completed milestones
- future roadmap
- current status
- historical test checkpoints
- relationship between completed and remaining project work
- release sequencing
- major future capabilities

### Duplicate information

Duplicates:

- detailed intelligence ontology
- Identity contract
- terminology definitions
- implementation gates
- recovered behavioral contracts
- Archive State semantics
- Recommendation Bias semantics
- Evidence architecture

### Authoritative destination

- intelligence semantics → Intelligence Contract
- implementation decisions → Decision Map
- Identity contract → Identity/Designation Contract
- terminology → Terminology Map

### Historical destination

Historical milestone information may remain in Roadmap when it serves project chronology.

Detailed forensic reasoning belongs in Forensic Audit.

### Unresolved contradictions

Archive State operational thresholds must remain unresolved here unless explicitly decided.

Roadmap should not independently lock implementation policy.

### Information explicitly not to migrate

Do not use Roadmap as a replacement for the Decision Map.

Do not copy every detailed Phase 1 contract into the roadmap.

Do not remove useful historical milestone information merely because it is not "roadmap-shaped."

### References requiring updates

Update renamed planning-document references.

### Final verification

Verify:

- roadmap sequencing remains intact
- current status is accurate
- current baseline is 245 passing / 0 failing
- historical test counts are clearly historical
- no stale current Identity catalog remains
- no stale Phase 1 policy is presented as current
- links use final filenames

---

# 6.3 `docs/planning/intelligence-contract.md`

### Proposed filename

`docs/planning/intelligence-contract.md`

### Status

**KEEP**

### Role in end state

**Highest-level current intelligence semantic authority.**

### Major sections

Current material covers:

- intelligence architecture
- system boundaries
- Traits
- Genre Signals
- Observations
- Findings
- Designations
- Identities
- Identity/Designation distinction
- scoring concepts
- evidence concepts
- Archive State
- Recommendation Bias
- deterministic behavior
- partial-data behavior
- current catalog
- non-goals

### Unique information

Preserve:

- overall intelligence ontology
- parallel-system principle
- current semantic boundaries
- distinction between signal, evidence, conclusion, and classification
- Observation vs Finding
- Designation vs Identity
- current Identity concepts
- current Designation concepts
- empty/sparse/established archive concepts
- recommendation-boundary principles
- partial-data philosophy
- explicit Phase 1 non-goals

### Duplicate information

Duplicates much of:

- README
- Decision Map
- Identity/Designation Contract
- Designation Evolution
- Forensic Audit
- Phase 1 Alignment

### Authoritative destination

This document is the authoritative destination for **system-level semantic definitions**.

### Historical destination

Historical reasoning should remain in:

- Intelligence Alignment
- Forensic Audit
- Identity Catalog

### Unresolved contradictions

Do not silently resolve:

- Archive State operational thresholds
- unresolved Finding evidence policy
- future Classification Confidence
- future Recommendation Engine
- intentionality inference
- future Identity additions

### Information explicitly not to migrate

Do not promote implementation-specific details into this document unless they are genuinely conceptual.

Examples that should remain implementation-level unless separately decided:

- exact normalization implementation
- fixture file loading behavior
- exact `SECONDARY_MIN_SCORE = 0.60`
- test counts
- filesystem ordering
- internal helper names
- derived formula implementation details

### References requiring updates

Update references to old Phase 1 filenames.

### Final verification

Verify this document contains only current semantic authority and does not accidentally absorb:

- stale historical decisions
- implementation details
- old Identity catalog definitions
- obsolete terminology

---

# 6.4 `docs/planning/phase-1-decision-and-implementation-map.md`

### Proposed filename

`docs/planning/decision-and-implementation-map.md`

### Status

**RENAME**

### Role in end state

Current Phase 1 implementation authority.

### Major sections

Current material covers:

- decision classifications
- protected existing behavior
- recovered behavioral contracts
- Designations
- Identity catalog
- Identity evidence
- Identity eligibility
- Identity scoring
- primary Identity
- secondary Identity
- tie behavior
- Observation alignment
- Finding alignment
- recommendation metadata
- evidence architecture
- Archive State
- implementation gates
- work order
- completed checkpoints
- governing principle
- test baseline

### Unique information

Preserve:

- implementation decisions accepted during recovery
- explicit "do not rewrite" constraints
- mapping from conceptual contract to implementation work
- completed implementation gates
- remaining implementation gates
- deterministic Identity behavior
- terminology implementation decisions
- behavioral contracts recovered from code/tests

### Duplicate information

Duplicates:

- Identity Contract
- Fixture Contract
- Evidence Mapping
- Intelligence Contract
- Phase 1 Alignment
- README
- Forensic Audit

### Authoritative destination

This is the authoritative destination for:

- Phase 1 implementation decisions
- implementation gates
- protected implementation behavior
- sequencing of reconciliation work

### Historical destination

Historical decision rationale may remain here where it directly explains an implementation decision.

Broader forensic history belongs in Forensic Audit.

### Unresolved contradictions

Preserve explicitly:

- Archive State operational thresholds
- any Finding policy not yet locked
- any future recommendation implementation
- any evidence behavior not yet implemented

### Information explicitly not to migrate

Do not migrate this document's detailed implementation policy wholesale into Intelligence Contract.

Do not turn implementation facts into semantic rules without an explicit conceptual decision.

### References requiring updates

Rename references from:

`phase-1-decision-and-implementation-map.md`

to:

`decision-and-implementation-map.md`

### Final verification

Verify:

- no orphaned `Archive Behavioral Analysis` reference remains
- current Identity catalog is correct
- 245/0 is current status
- old 247/1 state is historical only
- Identity gates marked complete remain complete
- Archive State threshold contradiction remains explicitly unresolved
- no accidental policy invention occurred
- filename references are updated

---

# 6.5 `docs/planning/phase-1-identity-and-designation-contract.md`

### Proposed filename

`docs/planning/identity-and-designation-contract.md`

### Status

**RENAME**

### Role in end state

Detailed current conceptual contract for Designations and Identities.

### Major sections

Current material covers:

- Designation definition
- Identity definition
- Designation vs Identity boundary
- current Designations
- current Identities
- differentiation principle
- evidence sharing
- Interpretive Philosophy
- Exploratory Philosophy
- Breadth Philosophy
- cross-Identity boundaries
- Identity scoring contract
- eligibility
- primary Identity
- secondary Identity
- tie behavior
- Signal Strength
- Data Sufficiency
- evidence/explanation
- Designation explanation
- determinism
- non-goals
- future evolution

### Unique information

Preserve:

- detailed Designation/Identity semantic boundary
- current catalog descriptions
- cross-system distinction
- negative-space rules
- deterministic behavior contract where conceptually relevant
- explanation expectations

### Duplicate information

Duplicates:

- Intelligence Contract
- Fixture Contract
- Evidence Mapping
- Decision Map
- Designation Evolution
- README

### Authoritative destination

This is the detailed specialist authority for Identity and Designation concepts.

### Historical destination

Rejected/deferred Identity concepts belong in `identity-catalog.md`.

### Unresolved contradictions

Do not independently decide:

- exact Archive State thresholds
- future Identity additions
- intentional exploration measurement
- future co-primary behavior

### Information explicitly not to migrate

Do not bring old Identity catalog names back from historical documents.

Do not treat implementation artifacts as conceptual definitions.

### References requiring updates

Rename all references to this file.

### Final verification

Verify:

- current three Identities only
- current four Designations only
- no old Identity/Designation name collisions
- no obsolete candidate definitions presented as current
- distinction remains explicit
- exact fixture-level numeric constraints remain owned by Fixture Contract where appropriate

---

# 6.6 `docs/planning/phase-1-identity-fixture-contract.md`

### Proposed filename

`docs/planning/identity-fixture-contract.md`

### Status

**RENAME**

### Role in end state

Current fixture-level Identity contract.

### Major sections

Current material covers:

- fixture authority
- fixture schema
- Identity descriptions
- Identity signals
- recommendation bias
- minimum entry requirements
- weights
- normalization
- eligibility
- primary/secondary behavior
- ties
- fixture-level constraints
- implementation relationship

### Unique information

Preserve:

- exact current fixture structure
- exact current Identity IDs
- descriptions
- signal lists
- recommendation bias
- minimum entries
- exact weights
- fixture-level numeric constraints
- relationship between fixture definitions and scoring implementation

### Duplicate information

Duplicates:

- Identity Contract
- Decision Map
- Identity Specification
- Evidence Mapping
- README

### Authoritative destination

This document owns exact fixture-level Identity definitions and fixture constraints.

The JSON fixtures themselves remain the final concrete implementation representation.

### Historical destination

Earlier fixture concepts belong in Identity Catalog.

### Unresolved contradictions

Do not resolve unrelated global ranking policy here.

### Information explicitly not to migrate

Do not duplicate general ranking policy merely because fixture behavior depends on it.

Do not invent additional fields.

### References requiring updates

Rename references to:

`identity-fixture-contract.md`

### Final verification

Verify:

- three fixtures exactly
- all weights sum to 1.00
- minimum entries correct
- no retired fixtures remain
- no invented signals
- no old Identity names remain
- fixture contract does not contradict actual JSON

Also reconcile the wording contradiction in the current document:

The opening currently says it does not define numeric weights/thresholds, while a later section records finalized fixture-level numeric constraints.

The final wording should make the distinction explicit:

> **This document does not define general implementation or ranking policy. It does record finalized fixture-level numeric constraints later in the document.**

---

# 6.7 `docs/planning/phase-1-identity-evidence-mapping.md`

### Proposed filename

`docs/planning/identity-evidence-mapping.md`

### Status

**RENAME**

### Role in end state

Current Identity evidence rationale.

### Major sections

Current material covers:

- evidence architecture
- direct/supporting/proxy/insufficient evidence
- Interpretive evidence
- Exploratory evidence
- Breadth evidence
- negative-space rules
- evidence limitations
- derived signals
- intent/trajectory gaps
- future evidence needs
- what should not change

### Unique information

Preserve:

- evidence hierarchy
- evidence-to-Identity mapping
- negative-space rules
- proxy limitations
- correlated evidence warning
- lack of direct intentionality measurement
- lack of direct interpretation measurement
- no invented trajectory metrics
- explicit evidence limitations

### Duplicate information

Duplicates:

- Identity Contract
- Decision Map
- Identity Differentiation
- Identity Specification
- README
- Forensic Audit

### Authoritative destination

This document owns **why particular observable signals support particular Identities**.

### Historical destination

Earlier rejected evidence concepts may remain in Identity Catalog when they are part of historical reasoning.

### Unresolved contradictions

Do not invent direct measurements of:

- exploration intent
- interpretation intent
- deliberate diversification
- trajectory

### Information explicitly not to migrate

Do not migrate proposed future metrics as if they exist.

Do not redesign universal/media traits during documentation consolidation.

### References requiring updates

Rename references to the new filename.

### Final verification

Verify:

- evidence hierarchy is intact
- no invented signals
- current three Identities only
- negative-space rules remain
- derived proxies are clearly described as proxies
- no proxy becomes falsely described as direct evidence

---

# 6.8 `docs/planning/phase-1-intelligence-alignment.md`

### Proposed filename

`docs/planning/intelligence-alignment.md`

### Status

**RENAME + NARROW**

### Role in end state

Historical Phase 1 recovery/alignment record.

This document should no longer masquerade as a second current contract.

### Major sections

Current material covers:

- Phase 1 recovery context
- intelligence terminology
- architecture alignment
- Identity work
- Designation work
- Observation work
- Finding work
- Archive State
- implementation decisions
- testing
- historical checkpoints
- unresolved policy
- alignment conclusions

### Unique information

Preserve:

- history of the recovery effort
- why backend intelligence was being reconstructed
- how terminology was reconciled
- how conceptual decisions evolved
- historical implementation checkpoints
- reasoning behind major Phase 1 changes
- evidence that some decisions were intentionally deferred

### Duplicate information

Duplicates almost every current authority:

- Intelligence Contract
- Decision Map
- Identity Contract
- Identity Evidence Mapping
- Roadmap
- Forensic Audit
- README

### Authoritative destination

Current policy should move to the appropriate current authority:

- Intelligence Contract
- Decision Map
- Identity Contract
- Identity Evidence Mapping
- Terminology Map

### Historical destination

The surviving `intelligence-alignment.md` itself is the historical destination.

### Unresolved contradictions

This document currently contains several major contradictions that **must not be silently copied forward as current policy**:

- old Secondary Identity policy marked "UNRESOLVED POLICY / BLOCKED IMPLEMENTATION"
- later current Secondary Identity policy
- old Identity catalog
- current Identity catalog
- 247 passing / 1 failing historical checkpoint
- current 245 / 0 checkpoint
- Archive State thresholds presented as locked despite their unresolved status elsewhere

These must be labeled historically or superseded where retained.

### Information explicitly not to migrate

Do not migrate obsolete policy into current authority.

Do not silently choose between conflicting Archive State thresholds.

Do not present old Identity candidates as current.

Do not replace historical test results with current results where historical chronology matters.

### References requiring updates

Rename references to `intelligence-alignment.md`.

### Final verification

This is one of the most important documents to verify.

Check that:

- all historical material is clearly historical
- obsolete decisions are labeled superseded
- current decisions point to current authorities
- no contradictory policy remains unlabeled
- old test results are clearly historical
- no old Identity catalog is presented as current
- no stale `phase-1-*` filename references remain

---

# 6.9 `docs/planning/intelligence-forensic-audit.md`

### Proposed filename

`docs/planning/intelligence-forensic-audit.md`

### Status

**KEEP**

### Role in end state

Historical/evidentiary audit record.

### Major sections

Current material covers:

- forensic methodology
- repository evidence
- code findings
- test findings
- Intelligence architecture
- Identity findings
- Designation findings
- Observation findings
- Finding findings
- terminology findings
- behavioral contracts
- limitations
- conclusions

### Unique information

Preserve:

- forensic methodology
- distinction between proven behavior and intended behavior
- repository evidence
- historical audit findings
- rationale for decisions
- implementation discoveries
- known limitations

Especially preserve the epistemic distinction:

> **code + test = proven current behavior**

versus:

> **contract + no code/test = intended behavior, not proven current behavior**

### Duplicate information

Its conclusions are repeated throughout active documents.

That duplication is acceptable because the audit itself serves as the historical evidence record.

### Authoritative destination

Not a current policy authority.

Current policy derived from the audit belongs in the relevant current authority documents.

### Historical destination

The audit itself.

### Unresolved contradictions

Preserve historical uncertainty rather than rewriting history.

### Information explicitly not to migrate

Do not promote forensic observations into conceptual rules without an explicit decision.

Do not copy every audit finding into active documents.

### References requiring updates

Update links to renamed documents.

### Final verification

Verify:

- methodology survives
- evidence/provenance distinctions survive
- historical findings remain understandable
- current vs historical status is clear
- no audit conclusion contradicts current authority without being identified as historical

---

# 6.10 `docs/planning/phase-1-identity-catalog.md`

### Proposed filename

`docs/planning/identity-catalog.md`

### Status

**RENAME + ABSORB HISTORY**

### Role in end state

Historical Identity-system evolution record.

### Major sections

Current material covers:

- Identity catalog development
- candidate Identities
- earlier concepts
- Identity naming
- differentiation
- evidence
- scoring
- rejected candidates
- deferred candidates
- current catalog
- future catalog evolution

### Unique information

This document must absorb the unique historical information from:

- Identity Differentiation
- Identity Specification

Preserve:

- why old Identity names were rejected
- why renaming was insufficient
- old Designation/Identity collisions
- the adversarial differentiation process
- Interpretive survivor reasoning
- Exploratory conditional survival
- Breadth conditional survival
- Construction/System Philosophy deferral
- evidence limitations
- future candidate directions
- historical Identity evolution
- why current catalog became the three surviving concepts

### Duplicate information

Duplicates:

- Identity Contract
- Fixture Contract
- Evidence Mapping
- Decision Map
- README

### Authoritative destination

Current Identity semantics belong in:

- Intelligence Contract
- Identity/Designation Contract
- Identity Fixture Contract
- Identity Evidence Mapping

### Historical destination

This document is the authoritative **historical destination** for Identity evolution.

### Unresolved contradictions

Historical alternatives may remain documented as long as they are clearly identified as superseded, rejected, or deferred.

### Information explicitly not to migrate

Do not migrate rejected Identity names into current catalog sections as active definitions.

Do not preserve obsolete numeric scoring rules as current fixture constraints.

### References requiring updates

Rename links from `phase-1-identity-catalog.md`.

### Final verification

Verify:

- historical candidates remain discoverable
- rejected/deferred status is explicit
- no historical candidate is mistaken for a current Identity
- Differentiation and Specification information is fully represented before their retirement

---

# 6.11 `docs/planning/phase-1-identity-differentiation.md`

### Proposed filename

No surviving filename.

### Status

**RETIRE**

### Role in migration

Historical content absorbed into `identity-catalog.md`.

### Major sections

Current material covers:

- Identity candidate stress testing
- Interpretive Philosophy
- Exploratory Philosophy
- Construction/System Philosophy
- Breadth/Curatorial Variety Philosophy
- Identity-to-Identity differentiation
- Designation overlap
- negative-space analysis
- final provisional catalog

### Unique information

Preserve:

- adversarial stress-test methodology
- why Interpretive survived
- why Exploratory only conditionally survived
- why Breadth only conditionally survived
- why Construction/System Philosophy failed/deferred
- pairwise Identity differentiation
- negative-space rules
- distinction from Designations
- three-way separation:
    - Interpretive = meaning/depth
    - Exploratory = boundaries/movement
    - Breadth = territory/range

### Duplicate information

Duplicates:

- Identity Evidence Mapping
- Identity Contract
- Identity Catalog
- Decision Map

### Authoritative destination

Current differentiation rules → Identity/Designation Contract.

Evidence limitations → Identity Evidence Mapping.

### Historical destination

Historical stress-test reasoning → `identity-catalog.md`.

### Unresolved contradictions

None should be newly resolved during migration.

### Information explicitly not to migrate

Do not migrate provisional candidate names into the current catalog unless they are part of the accepted three.

Do not treat deferred Construction/System Philosophy as an active Identity.

### References requiring updates

Any links to this file should point to `identity-catalog.md` where the referenced historical material survives.

### Final verification

Before deletion, verify every unique conclusion from this document exists in the historical Identity Catalog.

Only then retire the file.

---

# 6.12 `docs/planning/phase-1-identity-specification.md`

### Proposed filename

No surviving filename.

### Status

**RETIRE**

### Role in migration

Historical specification material absorbed into:

- Identity/Designation Contract
- Identity Fixture Contract
- Identity Evidence Mapping
- Identity Catalog

### Major sections

Current material covers:

- earlier Identity ontology
- Identity definitions
- signals
- weights
- minimum data
- ranking
- primary/secondary behavior
- evidence
- recommendation influence
- conceptual distinctions

### Unique information

Preserve any information not already represented elsewhere, especially:

- earlier conceptual reasoning
- specification decisions that explain later changes
- historical assumptions
- rationale for particular fields or scoring structures
- evolution toward the current fixture contract

### Duplicate information

Large portions duplicate:

- Identity Contract
- Fixture Contract
- Evidence Mapping
- Decision Map

### Authoritative destination

Current surviving definitions go to:

- Identity/Designation Contract
- Identity Fixture Contract
- Identity Evidence Mapping

### Historical destination

Superseded conceptual reasoning → `identity-catalog.md`.

### Unresolved contradictions

Historical contradictions must be labeled as historical rather than silently selected.

### Information explicitly not to migrate

Do not migrate obsolete scoring values or old catalog definitions as current.

Do not preserve historical implementation artifacts merely because they appeared in the old specification.

### References requiring updates

Links to this file should be redirected to the appropriate surviving document depending on the information referenced.

### Final verification

Before deletion, perform a section-by-section comparison against:

- Identity/Designation Contract
- Identity Fixture Contract
- Identity Evidence Mapping
- Identity Catalog

Only retire after every unique meaningful section has a destination.

---

# 6.13 `docs/planning/phase-1-terminology-and-api-rename-map.md`

### Proposed filename

`docs/planning/terminology-and-api-rename-map.md`

### Status

**RENAME**

### Role in end state

Backend/API semantic terminology authority.

### Major sections

Current material covers:

- terminology alignment
- API field mappings
- Signal Strength
- Data Sufficiency
- Evidence Strength
- Classification Confidence
- Observation API terminology
- Designation fields
- Identity fields
- recommendation terminology
- compatibility
- helper naming
- backend/frontend boundaries

### Unique information

Preserve:

- exact API terminology mapping
- legacy → current terminology
- compatibility decisions
- Observation `evidenceStrength`
- Designation terminology
- Identity terminology
- recommendation bias terminology
- backend field responsibilities
- helper naming decisions

### Duplicate information

Duplicates:

- README
- Intelligence Contract
- Decision Map
- Frontend Terminology Alignment
- Forensic Audit

### Authoritative destination

Backend/API terminology.

### Historical destination

Retired terminology may remain where useful as a migration record.

### Unresolved contradictions

Do not globally rename every occurrence of "confidence" merely because it exists.

In particular:

- Classification Confidence is retired
- Evidence Strength is active
- Signal Strength is active
- Data Sufficiency is active
- Finding `confidence` is not an implemented concept

### Information explicitly not to migrate

Do not invent a universal evidence schema.

Do not rename unrelated aesthetic or conversational terminology.

Do not introduce new API fields.

### References requiring updates

Rename references to this document.

### Final verification

Verify:

- API names match code
- Observation public field is `evidenceStrength`
- retired terminology is explicitly marked
- no invented Finding confidence field exists
- backend/frontend responsibilities remain distinct
- old filename references are gone

---

# 6.14 `docs/planning/frontend-terminology-alignment.md`

### Proposed filename

`docs/planning/frontend-terminology-alignment.md`

### Status

**KEEP**

### Role in end state

Frontend terminology and presentation alignment.

### Major sections

Current material covers:

- frontend terminology
- scoring terminology
- charts
- entry detail terminology
- forms
- frontend/backend responsibility
- removal of obsolete frontend logic
- display terminology

### Unique information

Preserve:

- exact frontend terminology decisions
- UI locations affected
- frontend display responsibilities
- relationship between frontend terminology and backend semantics
- removal of duplicate frontend designation-basis logic
- Scoring terminology changes

### Duplicate information

Duplicates:

- Terminology/API Map
- README
- Decision Map
- Phase 1 Alignment

### Authoritative destination

Frontend presentation terminology.

### Historical destination

No separate historical document is required unless historical context is meaningful.

### Unresolved contradictions

Do not change terminology beyond established semantic decisions.

### Information explicitly not to migrate

Do not duplicate backend API field policy here.

Do not redesign frontend architecture as part of terminology consolidation.

### References requiring updates

No filename change, but links to renamed backend terminology map must be updated.

### Final verification

Verify:

- `Universal Scoring`
- `Media Scoring`
- `Notes`
- other established UI terminology
- no stale "Evaluation" labels where terminology has already been aligned
- frontend/backend terminology remain consistent
- obsolete frontend duplicate logic is documented accurately

---

# 6.15 `docs/planning/designation-system-evolution.md`

### Proposed filename

No surviving filename.

### Status

**CONSOLIDATE + RETIRE**

### Role in migration

Unique current Designation evolution material is absorbed into:

- `identity-and-designation-contract.md`
- `decision-and-implementation-map.md`
- `intelligence-contract.md`

### Major sections

Current material covers:

- what a Designation means
- current Designation catalog
- scoring
- primary Designation
- Designation confidence
- Designation evidence
- Boundary Explorer
- Engagement Architect
- Deep Diver
- Curator
- Curator weakness
- Designation/Identity distinction
- `designationBasis`
- recommendation bias
- future evolution

### Unique information

Preserve:

- Designation evolution rules
- Curator archive-size concern
- `designationBasis` interpretation
- Designation-specific evidence observations
- explanation of why Designations remain separate from Identities
- future Designation evolution principles

### Duplicate information

Large portions duplicate:

- Intelligence Contract
- Identity/Designation Contract
- Decision Map
- README
- Forensic Audit

### Authoritative destination

- current Designation ontology → Identity/Designation Contract
- implementation details → Decision Map
- system-level distinction → Intelligence Contract

### Historical destination

Historical Designation evolution reasoning may remain in the Identity/Designation Contract where it explains current design, or in Forensic Audit when it is evidence-oriented.

No separate Designation-history document is retained in the 13-document target.

### Unresolved contradictions

Preserve:

- `designationConfidence` as Signal Strength-like terminology
- any unresolved interpretation of `designationBasis`
- Curator archive-size concern

Do not redesign Designations during documentation migration.

### Information explicitly not to migrate

Do not create a separate Recommendation Engine policy.

Do not introduce new Designations.

Do not reinterpret recommendation bias as an implemented recommendation system.

### References requiring updates

References to this file must point to the appropriate surviving contract.

### Final verification

Before retirement, verify that all unique Designation material has been placed in its correct authority.

Then confirm no current document still depends on this file as a source of truth.

---

# 6.16 `docs/planning/forgotten-features-register.md`

### Proposed filename

`docs/planning/forgotten-features-register.md`

### Status

**KEEP**

### Role in end state

Recovered feature memory and candidate register.

It is explicitly **non-authoritative**.

### Major sections

Current material covers:

- recovered features
- possible missing functionality
- feature provenance/status
- candidates for future work
- implementation notes
- unresolved feature questions
- product ideas

### Unique information

Preserve:

- recovered feature candidates
- their current status
- distinction between confirmed/recovered/candidate/deferred
- product-level feature ideas
- feature questions not yet resolved
- historical memory of potentially forgotten capabilities

### Duplicate information

Overlaps:

- Roadmap
- README

### Authoritative destination

None.

The register is deliberately non-authoritative.

Once a feature becomes an accepted roadmap commitment, the roadmap becomes authoritative for sequencing.

Once a feature becomes an implementation decision, the Decision Map becomes authoritative.

### Historical destination

The register itself.

### Unresolved contradictions

Recovered conversational provenance cannot always be independently proven from repository evidence.

That provenance should remain qualified as recovered/candidate rather than promoted to fact.

### Information explicitly not to migrate

Do not automatically migrate every candidate into Roadmap.

Do not treat recovered features as committed features.

Do not invent implementation requirements for them.

### References requiring updates

No filename change.

### Final verification

Verify:

- recovered candidates remain clearly labeled
- no candidate becomes an implicit commitment
- no feature is lost
- roadmap does not accidentally absorb the entire register
- register remains a memory/candidate system rather than an authority document

---

# 7. Cross-Document Information Migration Ledger

The document-level ledger above establishes ownership. The following cross-cutting ledger verifies that major concepts have a single current home.

---

## 7.1 Overall Intelligence Ontology

### Source documents

- README
- Intelligence Contract
- Phase 1 Alignment
- Decision Map
- Forensic Audit
- Roadmap

### Authoritative destination

`intelligence-contract.md`

### Historical destination

`intelligence-alignment.md` and `intelligence-forensic-audit.md`

### Do not migrate

Do not duplicate the complete ontology into Roadmap or README.

### Verification

Definitions must agree across public and planning documents.

---

# 7.2 Signal Strength

### Source documents

- README
- Intelligence Contract
- Identity Contract
- Fixture Contract
- Terminology Map
- Decision Map
- Designation Evolution
- Forensic Audit

### Authoritative destination

`intelligence-contract.md`

Detailed API terminology → `terminology-and-api-rename-map.md`.

### Historical destination

Forensic/Alignment documents as appropriate.

### Do not migrate

Do not redefine Signal Strength as Classification Confidence.

### Verification

Confirm active uses consistently mean **strength of an expressed signal**, not certainty that the conclusion is correct.

---

# 7.3 Data Sufficiency

### Source documents

- README
- Identity documents
- Decision Map
- Terminology Map

### Authoritative destination

`intelligence-contract.md`

Identity-specific details → Identity Contract / Fixture Contract.

### Verification

Data Sufficiency determines whether there is enough data to evaluate a conclusion.

It is not a score describing how strongly a trait is expressed.

---

# 7.4 Evidence Strength

### Source documents

- README
- Identity Evidence Mapping
- Terminology Map
- Observation documentation
- Decision Map
- Forensic Audit

### Authoritative destination

`intelligence-contract.md`

Detailed Identity evidence → `identity-evidence-mapping.md`.

Observation API mapping → `terminology-and-api-rename-map.md`.

### Verification

Confirm public Observation terminology is `evidenceStrength`.

---

# 7.5 Classification Confidence

### Source documents

Many current and historical documents.

### Status

**RETIRED**

### Authoritative destination

No active destination as an implemented concept.

### Historical destination

Retain historical discussion where necessary.

### Do not migrate

Do not create new Classification Confidence mathematics.

### Verification

Search the final corpus and confirm every remaining use is explicitly historical/retired/contextual rather than active API semantics.

---

# 7.6 Observation vs Finding

### Authoritative destination

`intelligence-contract.md`

Implementation details → Decision Map.

Terminology/API details → Terminology Map.

Historical reasoning → Forensic Audit / Intelligence Alignment.

### Do not migrate

Do not invent Finding confidence.

### Verification

Observation and Finding remain distinct conclusions with distinct evidence roles.

---

# 7.7 Designation Ontology

### Authoritative destination

`identity-and-designation-contract.md`

System-level summary → Intelligence Contract.

Implementation → Decision Map.

### Current Designations

- Boundary Explorer
- Curator
- Engagement Architect
- Deep Diver

### Verification

No old Identity name should masquerade as a current Designation or vice versa.

---

# 7.8 Identity Ontology

### Authoritative destinations

- Intelligence Contract — system-level
- Identity/Designation Contract — detailed conceptual contract
- Identity Fixture Contract — exact fixture contract

### Current catalog

- Interpretive Philosophy
- Exploratory Philosophy
- Breadth Philosophy

### Historical destination

Identity Catalog.

### Verification

No current document may present:

- Boundary Explorer Identity
- Deep Diver Identity
- Engagement Architect Identity
- Structural Curator
- Concept-First Curator
- Engagement-Gated Curator

as active Identity definitions.

---

# 7.9 Identity Evidence

### Authoritative destination

`identity-evidence-mapping.md`

### Current evidence hierarchy

- Direct
- Supporting
- Proxy
- Insufficient

### Verification

Confirm that:

> **Evidence can overlap. Meaning cannot.**

No Identity should become a duplicate of another Identity merely because evidence overlaps.

---

# 7.10 Identity Fixture Weights and Minimums

### Authoritative destination

`identity-fixture-contract.md`

### Current constraints

#### Interpretive Philosophy

- minimum entries: 20
- depth: 0.45
- emotional impact: 0.25
- reflection: 0.12
- ambiguity: 0.10
- analysis: 0.08

#### Exploratory Philosophy

- minimum entries: 20
- originality: 0.35
- genre diversity: 0.25
- depth: 0.15
- experimental affinity: 0.15
- novelty: 0.10

#### Breadth Philosophy

- minimum entries: 15
- genre diversity: 1.00

### Verification

Compare documentation against the actual fixture JSON.

No historical weight set may silently replace these values.

---

# 7.11 Identity Eligibility

### Authoritative destination

Decision Map for implementation behavior.

Fixture Contract for minimum-entry values.

### Current behavior

Eligibility is based on minimum entries.

### Verification

Confirm:

- below minimum → excluded
- eligible → scored
- no invented alternate eligibility rule

---

# 7.12 Identity Primary Selection

### Authoritative destination

Decision Map.

Detailed conceptual framing → Identity Contract.

### Current behavior

Strongest eligible Identity becomes primary.

No co-primary.

### Verification

Confirm deterministic behavior remains intact.

---

# 7.13 Identity Secondary Selection

### Authoritative destination

Decision Map.

### Current behavior

- eligible
- non-primary
- score >= `0.60`
- meaningful independent support

### Important

The `0.60` threshold is current implementation/presentation policy.

It should not be accidentally promoted into a universal semantic law.

### Verification

Confirm Phase 1 Alignment no longer presents secondary selection as blocked or unresolved current implementation.

---

# 7.14 Identity Tie Behavior

### Authoritative destination

Decision Map.

### Current behavior

Exact score ties are resolved deterministically using contribution evidence ordering.

No arbitrary near-tie threshold.

### Verification

Confirm:

- exact ties deterministic
- non-equal scores remain ordered
- tie resolution does not change scores
- fixture/file ordering does not become conceptual authority

---

# 7.15 Designation `designationBasis`

### Authoritative destination

Decision Map / Identity and Designation Contract, according to whether the statement is implementation or semantic.

### Historical destination

Forensic Audit if documenting how it was discovered.

### Do not migrate

Do not create a duplicate frontend `generatedesignationBasis()` authority.

### Verification

Confirm backend remains authoritative and obsolete frontend duplicate logic is not revived.

---

# 7.16 Recommendation Bias

### Authoritative destination

Intelligence Contract for semantic meaning.

Decision Map for implementation boundaries.

### Verification

Recommendation Bias remains metadata/signaling.

It is not evidence that a complete Recommendation Engine currently exists.

---

# 7.17 Archive State

### Authoritative destination

**Currently unresolved.**

Concept belongs in Intelligence Contract and Decision Map.

### Current contradiction

One document historically treats:

- 0 = Empty
- 1–9 = Sparse
- 10+ = Established

as locked operational thresholds.

Other current documentation treats those thresholds as implementation-level/gated rather than fully locked.

### Migration rule

**Do not choose a winner during consolidation.**

Preserve the contradiction explicitly until an implementation/contract decision resolves it.

### Verification

Final documents must not contain two silently conflicting current definitions.

---

# 7.18 Partial-Data Rules

### Authoritative destination

Intelligence Contract.

Implementation details → Decision Map.

### Verification

Ensure empty/sparse/partial archives are valid states and that insufficient data does not become false certainty.

---

# 7.19 `systems-preference` → `systems-affinity`

### Authoritative destination

Terminology Map.

Implementation references → Decision Map.

### Verification

Search final repository documentation and code-facing references for the obsolete semantic name.

---

# 7.20 `atmospheric-interest`

### Status

Unresolved.

### Migration rule

Preserve as unresolved.

### Do not migrate

Do not invent a final semantic definition.

---

# 7.21 Test History

### Current status

**245 passing, 0 failing.**

### Current authority

README / Roadmap / Decision Map for current status.

### Historical authority

Forensic Audit / historical alignment documents for historical checkpoints.

### Important historical checkpoint

247 passing / 1 failing was a pre-Identity-migration state.

It must not be presented as current.

### Verification

Final corpus must clearly distinguish:

- historical test counts
- current green baseline

---

# 8. Filename Migration Ledger

The `phase-1` prefix is removed from surviving documents.

| Current                                        | Proposed                               | Treatment               |
| ---------------------------------------------- | -------------------------------------- | ----------------------- |
| `phase-1-decision-and-implementation-map.md`   | `decision-and-implementation-map.md`   | Rename                  |
| `phase-1-identity-and-designation-contract.md` | `identity-and-designation-contract.md` | Rename                  |
| `phase-1-identity-catalog.md`                  | `identity-catalog.md`                  | Rename                  |
| `phase-1-identity-evidence-mapping.md`         | `identity-evidence-mapping.md`         | Rename                  |
| `phase-1-identity-fixture-contract.md`         | `identity-fixture-contract.md`         | Rename                  |
| `phase-1-intelligence-alignment.md`            | `intelligence-alignment.md`            | Rename                  |
| `phase-1-terminology-and-api-rename-map.md`    | `terminology-and-api-rename-map.md`    | Rename                  |
| `phase-1-identity-differentiation.md`          | none                                   | Retire after absorption |
| `phase-1-identity-specification.md`            | none                                   | Retire after absorption |
| `designation-system-evolution.md`              | none                                   | Retire after absorption |

No rename is proposed for:

- README
- roadmap
- intelligence-contract
- intelligence-forensic-audit
- frontend-terminology-alignment
- forgotten-features-register

---

# 9. Reference Update Ledger

Filename changes require repository-wide reference verification.

Search for references to:

```text
phase-1-decision-and-implementation-map.md
phase-1-identity-and-designation-contract.md
phase-1-identity-catalog.md
phase-1-identity-evidence-mapping.md
phase-1-identity-fixture-contract.md
phase-1-intelligence-alignment.md
phase-1-terminology-and-api-rename-map.md
phase-1-identity-differentiation.md
phase-1-identity-specification.md
designation-system-evolution.md
```

Every reference must receive one of three treatments:

1. update to renamed surviving document
2. redirect conceptually to the correct surviving authority
3. remove if the reference exists only because the retired document is being removed

Do not leave dead links.

---

# 10. Information Explicitly Not to Migrate

The following categories should **not** be copied forward merely because they appear somewhere in the current corpus.

## 10.1 Conversation language

Do not migrate phrases such as:

- "you said"
- "as we discussed"
- "let's do"
- "I think we should"
- ChatGPT references
- conversational reactions
- temporary brainstorming language
- assistant/user dialogue

Documentation should describe the resulting project knowledge, not the conversation that produced it.

---

## 10.2 Superseded Identity definitions

Do not migrate the old Identity catalog as current.

Historical versions may survive in `identity-catalog.md`.

---

## 10.3 Invented Identity examples

Do not preserve examples such as:

- Systems-Seeking Interpretive Curator
- Boundary-Driven Explorer
- Deep Analytical Curator

unless they are explicitly documented as historical brainstorming.

They are not current Identity definitions.

---

## 10.4 Invented future metrics

Do not promote proposed concepts such as:

- exploration rate
- trajectory metrics
- direct intent measurements
- universal evidence schemas

into current implementation documentation.

---

## 10.5 Classification Confidence mathematics

Do not invent a Classification Confidence formula.

The concept is retired.

---

## 10.6 Finding confidence

Do not invent a Finding `confidence` field merely because historical documentation used the term.

---

## 10.7 Universal evidence schema

Do not create one merely to make documentation look consistent.

Different subsystems may legitimately use different evidence mechanisms.

---

## 10.8 Recommendation Engine implementation

Do not turn Recommendation Bias into a claim that the Recommendation Engine is already implemented.

---

## 10.9 Archive State threshold resolution

Do not resolve the 0 / 1–9 / 10+ contradiction during migration.

---

## 10.10 Unrelated implementation cleanup

Documentation consolidation is not permission to:

- rename code unnecessarily
- redesign APIs
- rewrite scoring
- change normalization
- redesign Identity ranking
- redesign the Recommendation Engine
- redesign Archive State
- redesign frontend architecture

---

# 11. Historical Information Preservation Rules

Historical information is not "duplicate garbage."

The following historical information must survive where it explains why the current system looks the way it does:

- why the Identity layer was differentiated from Designations
- why old Identity names were rejected
- why renaming alone was insufficient
- why Construction/System Philosophy was deferred
- why Exploratory Philosophy remains evidence-limited
- why Breadth Philosophy does not prove intentional diversification
- how Phase 1 recovery exposed implementation/contract differences
- how terminology evolved
- how tests exposed behavioral assumptions
- how Designation evolution occurred
- why certain features remain in the Forgotten Features Register

Historical information should be clearly marked as historical rather than duplicated into every current authority.

---

# 12. Information That Must Exist Exactly Once as Current Authority

The migration should end with one clear current owner for each major policy category.

| Knowledge                                | Current authority              |
| ---------------------------------------- | ------------------------------ |
| Overall intelligence semantics           | Intelligence Contract          |
| Phase 1 implementation decisions         | Decision Map                   |
| Identity/Designation conceptual boundary | Identity/Designation Contract  |
| Exact Identity fixture constraints       | Identity Fixture Contract      |
| Identity evidence rationale              | Identity Evidence Mapping      |
| Backend/API terminology                  | Terminology/API Map            |
| Frontend terminology                     | Frontend Terminology Alignment |
| Project sequencing                       | Roadmap                        |
| Public orientation                       | README                         |
| Historical forensic evidence             | Forensic Audit                 |
| Identity historical evolution            | Identity Catalog               |
| Recovered feature candidates             | Forgotten Features Register    |
| Executable behavior                      | Tests                          |
| Exact current fixture data               | JSON fixtures                  |

This is the central purpose of the consolidation.

---

# 13. Migration Order

The ledger should be executed in the following order.

## Pass A — Establish surviving current authorities

Reconcile:

1. Intelligence Contract
2. Decision and Implementation Map
3. Identity and Designation Contract
4. Identity Fixture Contract
5. Identity Evidence Mapping

No historical consolidation should occur before these current authorities are stable enough to receive information.

---

## Pass B — Reconcile historical/current mixed documents

Reconcile:

6. Intelligence Alignment
7. Intelligence Forensic Audit

The key goal is to ensure historical material no longer masquerades as current authority.

---

## Pass C — Consolidate Identity history

Reconcile:

8. Identity Catalog

Absorb:

9. Identity Differentiation
10. Identity Specification

Only retire those two source documents after verification.

---

## Pass D — Consolidate Designation evolution

Absorb:

11. Designation System Evolution

Into:

- Identity/Designation Contract
- Decision Map
- Intelligence Contract

Then retire the source document.

---

## Pass E — Terminology

Reconcile:

12. Terminology/API Rename Map
13. Frontend Terminology Alignment

Rename the backend terminology document.

---

## Pass F — Public/product documentation

Reconcile:

14. README
15. Roadmap
16. Forgotten Features Register

These should be reconciled after the internal authorities are stable.

---

## Pass G — Final integrity audit

Perform a repository-wide audit for:

- stale filenames
- dead links
- duplicate authority
- contradictory current policy
- obsolete terminology
- old Identity catalog names
- conversational residue
- invented concepts
- missing historical rationale
- current test status
- references to retired documents

---

# 14. Migration Completion Criteria

The migration is **not complete** merely because there are 13 files.

It is complete only when all of the following are true.

### Corpus

- [ ] Exactly the intended 13 project-owned Markdown documents remain.
- [ ] No meaningful project Markdown document was lost.
- [ ] Retired documents have been fully accounted for.

### Authority

- [ ] Each major current concept has one clear authoritative home.
- [ ] No historical document masquerades as current authority.
- [ ] README is not treated as implementation authority.
- [ ] Roadmap is not treated as intelligence-policy authority.
- [ ] Fixtures and tests remain authoritative for their appropriate domains.

### Identity

- [ ] Current Identity catalog contains exactly:
    - [ ] Interpretive Philosophy
    - [ ] Exploratory Philosophy
    - [ ] Breadth Philosophy

- [ ] Old Identity definitions are historical only.
- [ ] Exact fixture weights/minimums are preserved.
- [ ] Evidence hierarchy is preserved.
- [ ] Identity differentiation reasoning is preserved historically.
- [ ] Construction/System Philosophy remains deferred.

### Designations

- [ ] Current Designations remain:
    - [ ] Boundary Explorer
    - [ ] Curator
    - [ ] Engagement Architect
    - [ ] Deep Diver

- [ ] Designation/Identity distinction remains explicit.
- [ ] Curator archive-size concern remains documented.
- [ ] `designationBasis` remains accounted for.

### Terminology

- [ ] Signal Strength is preserved.
- [ ] Data Sufficiency is preserved.
- [ ] Evidence Strength is preserved.
- [ ] Classification Confidence is explicitly retired.
- [ ] Observation uses `evidenceStrength`.
- [ ] No Finding confidence concept is invented.
- [ ] `systems-preference` → `systems-affinity` is preserved.
- [ ] Frontend Scoring terminology remains aligned.

### Determinism

- [ ] Identity eligibility remains documented.
- [ ] Primary selection remains deterministic.
- [ ] Secondary selection remains documented.
- [ ] Current 0.60 secondary threshold is not misrepresented as a universal conceptual law.
- [ ] Exact ties remain deterministic.
- [ ] No arbitrary near-tie policy is invented.

### Archive State

- [ ] Empty/Sparse/Established concepts survive.
- [ ] The operational-threshold contradiction is not silently resolved.
- [ ] No document claims an unresolved threshold is definitively locked without an explicit decision.

### Historical preservation

- [ ] Identity differentiation history survives.
- [ ] Identity specification history survives where unique.
- [ ] Designation evolution history survives where unique.
- [ ] Phase 1 recovery history survives.
- [ ] Forensic methodology survives.
- [ ] Historical test checkpoints remain historically labeled.

### Conversation residue

- [ ] No conversational language has been copied into current documentation.
- [ ] No assistant/user dialogue remains.
- [ ] No brainstorming example is presented as an adopted design.
- [ ] No invented content was introduced merely to fill documentation gaps.

### References

- [ ] All renamed filenames have been updated.
- [ ] No dead links remain.
- [ ] No references point to retired documents unless explicitly historical.
- [ ] No stale `phase-1` filenames remain where the document was renamed.

### Tests

- [ ] Documentation reflects the current 245 passing / 0 failing baseline where current status is appropriate.
- [ ] Historical 247/1 state is clearly historical.
- [ ] Documentation does not imply that the change in test count itself represents a regression.

---

# 15. Final Migration Principle

The end state is not successful because the repository contains fewer Markdown files.

It is successful when the documentation has a clear information architecture:

> **One authoritative home for each kind of current knowledge, with historical reasoning preserved separately and no document allowed to masquerade as current authority when it isn't.**

The governing project principle remains:

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

Therefore:

> **Consolidation must simplify documentation without changing the intelligence system merely to make the documentation easier to organize.**

The migration is a documentation-architecture change, not an excuse for an architectural rewrite.
