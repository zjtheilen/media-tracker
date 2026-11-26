# WASABI 2.0 — Capability Decomposition

**Status:** In Progress  
**Current focus:** CA-01 — Archive and Collection Management  
**Purpose:** Decompose the identified capability areas into more specific capabilities, clarify their responsibilities and boundaries, identify required information and evidence, and establish dependencies before detailed requirements are defined.

---

## 1. Approach

Capability decomposition develops the high-level capability areas established in the Capability Area Identification document into more specific, understandable responsibilities.

This document records the outcomes of that work.

It distinguishes between:

- **Established decisions:** Product decisions agreed upon during discovery.
- **Emerging directions:** Concepts or approaches that appear promising but require further investigation or agreement.
- **Open questions:** Matters that remain unresolved and should not be treated as requirements.

Decisions recorded here establish product direction but do not prescribe implementation, technology, data structures, or interface designs unless explicitly stated.

The existing application and its behavior provide implementation context, not automatic constraints on the WASABI 2.0 product model.

## 2. CA-01 — Archive and Collection Management

**Original purpose:** Maintain the user's personal media archive as the authoritative record of their collection and recorded experiences.

### 2.1 Work and Experience Model

WASABI 2.0 must distinguish between a media Work and an individual Experience of that Work.

A **Work** represents the underlying movie, book, game, or other supported media item. An **Experience** represents an individual interaction the user has had with that Work.

One Work may have multiple distinct Experiences.

Examples include:

- Watching the same movie multiple times.
- Reading the same book again.
- Playing a game through multiple playthroughs.

Each Experience represents a distinct occurrence rather than overwriting or consolidating the history of previous Experiences.

**Established decisions:**

- A Work may have multiple Experiences.
- Each Experience is independently recordable.
- Each Experience may have its own evaluation.
- Recording a subsequent Experience does not require the user to repeat an evaluation.
- The user may provide a new evaluation when they believe their response has changed or there is something meaningful to record.
- Previous evaluations remain associated with their respective Experiences rather than being overwritten.
- The absence of a new evaluation does not establish that the user's opinion has remained unchanged.

#### 2.1.1 Work Information and Personal Attributes

WASABI must distinguish factual information about a Work from information that describes the user's personal relationship with that Work.

Three categories are established:

**Work metadata**

Factual and descriptive information about the media item itself. Examples include its title, release information, creators, cast, genres, runtime, external identifiers, and other identifying or descriptive characteristics.

Work metadata is independent of the user's personal response to the Work.

**Work-level personal attributes**

Structured information specific to the user's relationship with a Work, rather than factual descriptions of the Work itself.

The initial 2.0 direction is deliberately limited to a small set of purposeful attributes:

- Ownership status.
- Format or edition.
- Standing personal flags, primarily personal content or trigger-related markers and similar durable considerations.

These attributes should be structured from the outset rather than represented as unrestricted freeform notes.

This is not intended to become a broad, extensible attribute system or a general-purpose personal-notes field. The exact values, available choices, and semantics of each attribute remain to be defined.

**Experience-scoped personal response notes**

Personal feelings, reactions, reflections, and observations about a particular encounter with a Work belong to that Experience.

These notes must remain associated with the Experience in which they originated. WASABI should not provide a general Work-level personal response note that floats independently of an Experience.

This preserves the distinction between a user's durable relationship with a Work and what they thought or felt during a particular encounter.

**Metadata enrichment direction:**

Automatically obtaining and populating factual Work metadata from external sources is an attractive possibility. However, the scope, provider strategy, reconciliation behavior, and implementation cost remain unresolved. The conceptual distinction between metadata and personal information should be established independently of those decisions.

**Personal response note revision direction:**

The current direction is to retain the latest version of an Experience's personal response notes rather than preserving the history of ordinary edits.

Personal response notes are free-form information intended to capture the user's feelings, reactions, reflections, and observations about an Experience. Preserving every edit to this text may retain substantial revision history without providing equivalent historical or analytical value.

A future journal or dated-observation capability may provide a more meaningful way to preserve thoughts over time as separate entries rather than as revisions to a single note.

This is an emerging direction rather than a fully established retention requirement. The distinction between ordinary response notes and a possible future journal capability remains to be explored.

### 2.2 Experience Lifecycle and State

An Experience has an explicit lifecycle state representing where the user considers that particular experience to stand.

**Established decisions:**

WASABI 2.0 must support four Experience states across all supported media types:

- **Started (In Progress):** The user has begun the Experience and it is currently underway.
- **Paused:** The user has intentionally suspended the Experience but has not concluded it.
- **Completed:** The user considers the Experience complete.
- **Abandoned:** The user has decided to stop the Experience without considering it completed.

These states apply equally to movies, books, games, and other supported media. A movie may be paused halfway through or abandoned; a book or game may likewise be paused, resumed, or abandoned.

The lifecycle state is independent of evaluation, enjoyment, engagement, and personal response notes. A state does not establish whether the user liked the Work or how meaningful the Experience was.

#### 2.2.1 Abandoned Experiences Are Reversible

Abandoned is not a terminal state that permanently prevents further activity.

A user may return to an abandoned Experience at any time.

The user decides whether returning to the Work continues the existing Experience or creates a new one:

- If the user continues from the existing point of progress, it remains the same Experience.
- If the user starts again from the beginning, they may create a new Experience rather than continuing the previous one.

WASABI should support both choices without forcing one interpretation.

#### 2.2.2 State-Change History

WASABI must retain the history of Experience state changes rather than preserving only the current state.

**Established decisions:**

- State transitions are explicitly recorded by the user in the baseline 2.0 product.
- The history of state changes and when they occurred must be retained.
- The user must be able to inspect that history.
- WASABI must not infer state transitions from inactivity, elapsed time, or other indirect signals in the baseline 2.0 scope.

Assisted or inferred state transitions may be considered in a later 2.x version.

**Emerging presentation direction:**

A timeline showing the periods an Experience spent in each state, potentially using a Gantt-style visualization, is a promising way to present this history.

The underlying retention and visibility of state history are established requirements. A particular visualization is not yet committed.

#### 2.2.3 Evaluation and Response Independence

Evaluation and personal response information remain associated with their respective Experiences regardless of lifecycle state.

- An unfinished Experience may have an evaluation.
- An Experience does not require an evaluation to be started, paused, completed, or abandoned.
- Existing evaluations and notes are not discarded when an Experience changes state.
- A later Experience may be recorded without requiring a new evaluation.

Completion and abandonment must not be treated as automatic indicators of enjoyment, dissatisfaction, or evaluation.

#### 2.2.3.1 Evaluation Revision History

WASABI must preserve the history of changes to an Experience's evaluation rather than retaining only its current value.

**Established decisions:**

- Every saved change to an evaluation must be preserved as a historical revision.
- Previous evaluation revisions must remain inspectable.
- The current evaluation represents the latest authoritative assessment, while historical revisions preserve how that assessment changed over time.
- Each revision must distinguish when the change was recorded in WASABI from when the revised assessment is intended to apply.
- Each revision must retain its recorded timestamp and effective timestamp.
- Evaluation revisions may be identified as either corrections or reassessments.
- This classification is optional and must not require users to provide an explanation for every change.
- Evaluation history belongs to the individual Experience. A new Experience with the same Work has its own independent evaluation and revision history.

**Correction and reassessment distinction:**

- A **correction** changes previously recorded evaluation information because the earlier information was inaccurate or incorrectly entered.
- A **reassessment** changes the evaluation because the user's assessment or opinion has evolved.

Both are preserved as evaluation revisions. The distinction describes the reason for the change rather than establishing separate kinds of evaluation data.

**Recorded time and effective time:**

- **Recorded timestamp:** When the revision was entered into WASABI.
- **Effective timestamp:** When the revised assessment is intended to apply.

This distinction supports both retrospective corrections and changes in opinion. For example, a user may change an evaluation today because their opinion has evolved, or correct an evaluation today while indicating that the corrected assessment should apply from an earlier date.

**Open questions:**

- How should users inspect and navigate evaluation revision history?
- What additional revision classifications, if any, may be useful?
- How should evaluation revisions affect intelligence findings and their supporting evidence?

The preservation of evaluation revisions and their separate recorded and effective timestamps are established requirements. Their detailed representation and presentation remain to be defined.

#### 2.2.4 Media-Specific Completion Context

Movies and books have sufficiently intuitive completion semantics that additional completion mechanisms are not currently considered necessary for the baseline product.

Video games have more variable and subjective completion expectations.

For example:

- Completing a game's main story may be sufficient for one user.
- Another user may consider the game unfinished until its true ending is reached.
- A racing game may be considered complete only after winning every cup.
- A user may simply decide that they have experienced enough of a game.

**Established decision:**

Optional user-defined completion context is specific to video games.

WASABI should allow users to describe what they consider completion for a particular game Experience without requiring exhaustive progress checklists or achievement records.

Illustrative completion descriptions include:

- Main story completed.
- True ending reached.
- All cups won.
- Postgame completed.
- Stopped when satisfied.

These are examples, not a predefined mandatory taxonomy.

### 2.3 Experience Creation and Archive Membership

WASABI 2.0 is intended to represent actual Experiences with media Works, rather than works the user is merely interested in or intends to consume.

**Established decisions:**

- A Work may initially enter the archive only when the user has actually started or completed an Experience with it.
- A Work cannot be recorded solely because the user intends to consume it in the future.
- An Experience cannot exist in a not-yet-started state.
- An Experience may be recorded while it is underway or retrospectively after it has been completed.
- An Experience recorded while already underway has an initial state of Started.
- Recording an already-underway Experience does not require WASABI to fabricate historical state transitions that occurred before the Experience was recorded.
- The Experience's state-change history begins when WASABI starts tracking its lifecycle.
- The user may provide the actual historical start date when known, independently of when the Experience is recorded.
- Started, Paused, Completed, and Abandoned Experiences are valid archive records.
- An unfinished Experience may still have an evaluation and personal response notes.
- Completion is not a prerequisite for recording or evaluating an Experience.

**Pre-experience intentions and queues:**

Queues of unconsumed Works, such as watchlists, reading lists, play-later backlogs, and similar planned-consumption collections, are outside the baseline 2.0 scope.

These capabilities may be considered for a later version, potentially 2.x or v3.0 and beyond.

The archive represents Works with which the user has actually begun or completed an Experience. It does not represent future intentions as archived Experiences.

### 2.4 Dates, Temporal Information, and Correction History

WASABI 2.0 must preserve the distinction between when an Experience or lifecycle event actually occurred and when that information was recorded in WASABI.

**Established temporal information:**

Each Work and Experience has its own archive-entry timestamp.

- A Work receives an automatic archive-entry timestamp when it is first recorded.
- Each Experience receives its own automatic archive-entry timestamp when it is created.
- Adding another Experience to an existing Work does not change the Work's original archive-entry timestamp.
- Archive-entry timestamps represent when the corresponding records entered WASABI, not when the real-world Experience began or ended.

An Experience must account for the following temporal information:

- **Start date:** When the Experience actually began. Optional, but encouraged when known.
- **State-change timestamps:** When each recorded lifecycle transition actually occurred.
- **Completion date:** When the Experience actually reached completion. Optional, but encouraged when known.
- **Archive-entry timestamp:** When the Experience was first recorded in WASABI.

The Work's archive-entry timestamp is maintained separately from the timestamps of its individual Experiences.

**Historical and retrospective recording:**

- Users may enter start and completion dates retrospectively.
- Users may record a lifecycle transition after it actually occurred and provide the effective date or timestamp of that transition.
- Unknown dates must remain unknown rather than being inferred from the archive-entry timestamp or another unrelated date.
- When an Experience is first recorded while already underway, its initial state is Started. WASABI does not fabricate earlier state transitions. Its recorded state-change history begins when WASABI starts tracking the Experience.

**Recorded time and effective time:**

Lifecycle events must distinguish:

- **Effective timestamp:** When the state change actually occurred.
- **Recorded timestamp:** When WASABI received and recorded the information.

This distinction allows users to record events retrospectively without confusing the real-world chronology with the history of information recorded by WASABI.

**Evaluation revision timestamps:**

Evaluation revisions use the same distinction between recorded time and effective time.

- The recorded timestamp identifies when the evaluation revision was entered into WASABI.
- The effective timestamp identifies when the revised assessment is intended to apply.
- A revision may be recorded after its effective date when correcting previously recorded information.
- A reassessment may take effect at the time the user's assessment changes, independently of when the Experience originally occurred.

Evaluation revision timestamps are distinct from lifecycle event timestamps. Both preserve the difference between real-world chronology and the history of information recorded in WASABI.

**Corrections and historical preservation:**

Users may correct previously recorded start dates, completion dates, and lifecycle transition timestamps.

Corrections must preserve the previous value and the history of the correction.

- The corrected value becomes the current authoritative value.
- The previous value remains available in correction history.
- The correction itself is recorded with its timestamp.
- The history must distinguish the original event information, subsequent corrections, and when WASABI recorded each version.
- Correcting a date or timestamp must not silently rewrite the historical sequence of lifecycle events.

Users should also be able to correct an incorrectly recorded lifecycle state, subject to keeping storage requirements and architectural complexity proportionate. Such corrections must preserve the original entry and correction history.

**Open questions:**

- What date and timestamp precision should be supported?
- How should timezone information be represented?
- How should users inspect and navigate temporal and correction history?
- How should the completion date relate internally to the effective timestamp of the transition into Completed?
- What additional temporal information, if any, is necessary for historical analysis?

The conceptual temporal requirements, retrospective recording, separate archive-entry timestamps, and preservation of correction history are established. Their exact representation and detailed interaction rules remain to be defined.

### 2.5 Removal, Recovery, and Historical Preservation

WASABI 2.0 must distinguish ordinary removal from permanent deletion. Removing a record should not immediately destroy the information it contains.

Work and Experience records have independent removal and recovery behavior, while preserving their relationship within the archive.

**Established decisions:**

**Independent Work and Experience removal**

- Removing an individual Experience does not remove its associated Work or other Experiences.
- A Work may remain in the archive with zero active Experiences.
- Removing a Work does not permanently delete it or its associated Experiences.
- Removing a Work places the Work and all its associated Experiences into a recoverably removed state. The removal history must preserve which Experiences were already independently removed and which were removed as a consequence of the Work removal.
- Removing a Work does not erase the distinction between Experiences that were already independently removed and Experiences removed as a consequence of the Work removal.

**Recoverable removal and retention**

- Work and Experience removal is recoverable by default.
- Recoverably removed records remain recoverable indefinitely until the user explicitly restores or permanently deletes them.
- WASABI must not automatically expire or permanently delete recoverably removed records in the baseline 2.0 scope.
- Recoverably removed records are presented in a dedicated Recently Removed or Trash area, separate from the active archive.
- The removal history must distinguish independently initiated Experience removals from removals performed as a consequence of Work removal.

**Restoring Experiences and Works**

- An independently removed Experience may be restored while its Work remains active.
- An Experience cannot be independently restored while its parent Work is still removed.
- Restoring the Work automatically restores Experiences that were removed as a consequence of that Work removal.
- Experiences that had already been independently removed remain removed when the Work is restored.
- Once the Work has been restored, independently removed Experiences may be restored individually.
- Permanently deleted Experiences are not restored when their Work is restored.

**Permanent deletion**

Permanent deletion is a separate, deliberate action rather than an automatic consequence of ordinary removal.

- Permanently deleting an individual Experience deletes only that Experience.
- Permanently deleting an individual Experience never automatically deletes its Work, even when it is the Work's only Experience.
- An individual Experience may be permanently deleted even while its parent Work is recoverably removed.
- Permanently deleting a Work permanently deletes all associated Experiences, including Experiences that were independently removed.
- Permanent Work deletion is a cascading operation. The user must be informed that all associated Experiences are included.
- Permanently deleting an individual Experience does not affect other Experiences associated with the same Work.

**Permanent deletion safeguards**

- Every permanent deletion requires explicit user confirmation.
- The confirmation must clearly identify the record or records that will be permanently deleted.
- Before confirming permanent deletion, users must be able to inspect the contents of the affected Work and its associated Experiences, including when the Work is recoverably removed.
- For an individual Experience deletion, the user must be able to inspect the Experience being deleted.
- Permanent deletion is irreversible through normal WASABI recovery.

**Boundary:**

Work and Experience removal are separate operations with different scopes. Recoverable removal preserves the information and relationships necessary for restoration. Permanent deletion deliberately destroys the selected records and, when a Work is permanently deleted, all of its associated Experiences.

The detailed presentation of the Trash area, restoration interactions, and permanent-deletion confirmation experience remain subject to requirements discovery.

### 2.6 Effects on Intelligence and Evidence

WASABI 2.0 intends to support richer intelligence derived from individual works, Experiences, and their associated evidence.

Changes to or removal of archive records may therefore affect existing findings, relationships, affinities, and other derived interpretations.

The current application regenerates its analytical outputs from the remaining archive. The envisioned 2.0 intelligence system may have more complex evidence references and lifecycle responsibilities.

**Open questions:**

- What happens to findings when their supporting Experiences are removed?
- Should historical findings retain references to evidence that is no longer part of the active archive?
- Should affected findings be reassessed, withdrawn, or preserved historically?
- How should the system distinguish evidence that has been corrected from evidence that has been removed?
- How should historical preservation interact with intelligence reassessment?

No specific intelligence-retention or reassessment behavior has been decided.

### 2.7 Archive Integrity, Correction, and Reconciliation

WASABI 2.0 must help users maintain an accurate, understandable, and sufficiently complete archive. Archive integrity includes identifying missing information, recognizing potentially contradictory or duplicate records, preserving the history of changes, and supporting deliberate reconciliation with external information sources.

These capabilities must preserve the user's authority over their archive. WASABI may identify potential problems and propose changes, but must not silently invent information, merge uncertain records, or overwrite existing archive values.

#### 2.7.1 Completeness and Information Integrity

WASABI should actively identify incomplete records and communicate what information is missing.

**Emerging directions:**

- Completeness should be assessed against the relevant record type and its current lifecycle state.
- Completeness expectations should combine system-defined baseline requirements with optional additional expectations defined by the user.
- Completeness expectations must account for Experience lifecycle state. For example, a Started Experience should not be considered incomplete solely because it has no completion date.
- An incomplete record is not necessarily invalid. Historical records may legitimately lack information that was never collected.
- Missing or unknown information must remain missing or unknown. WASABI must not silently invent values, assume neutral values, or treat missing evaluations as representative.
- Incompleteness should be visible to the user without necessarily preventing the record from being created or maintained.

WASABI should distinguish conceptually between:

- **Incomplete:** Expected information is missing.
- **Inconsistent:** Recorded information appears contradictory or does not fit together.
- **Invalid:** Information violates a rule or constraint that makes the record unacceptable.
- **Unknown:** The information is not known.
- **Intentionally unrecorded:** Information has deliberately not been supplied.
- **Emerging direction:** WASABI should distinguish conceptually between:

The exact completeness rules, user customization options, and any media-type-specific expectations remain to be defined.

#### 2.7.2 Inconsistency Detection and Review

WASABI should identify information that appears contradictory or inconsistent and present potential issues for the user to review.

**Emerging directions:**

- Potential inconsistencies should be flagged rather than automatically corrected.
- An apparent contradiction does not necessarily establish that the underlying information is wrong.
- Users should be able to dismiss a flagged inconsistency as intentional.
- WASABI should remember that decision to avoid repeatedly presenting the same issue.
- Dismissing a flag does not change the underlying record or erase its history.

The detailed rules for identifying inconsistencies, presenting them, and managing dismissed flags remain to be defined.

#### 2.7.3 Duplicate Detection

WASABI should be able to identify potential duplicate records without automatically merging them.

Potential duplicates must be considered at two distinct levels:

- **Potential duplicate Works:** Records that may represent the same underlying media Work.
- **Potential duplicate Experiences:** Records that may represent the same individual encounter recorded more than once.

These cases must not be conflated. Multiple Experiences associated with the same Work are legitimate and must not be treated as duplicates merely because they refer to the same Work.

**Established decisions:**

- Automatic detection of potential duplicates is acceptable.
- Automatic merging is not acceptable.
- Matching titles and media types are insufficient to establish that two Works represent the same underlying Work.
- Users should be able to dismiss a potential duplicate suggestion as "not a duplicate."
- WASABI should remember dismissed suggestions to avoid repeatedly presenting the same pair.
- Users should be able to explicitly request that dismissed suggestions be reconsidered through a "Recheck for duplicates" action.

**Open questions:**

- Should rechecking apply to the entire archive or selected record pairs?
- What matching information and criteria should be used to identify potential duplicate Works and Experiences?
- How should duplicate detection account for changes to records or additional identifying information?

#### 2.7.4 Record Correction and Change History

WASABI should preserve a rich history of changes to Work and Experience information rather than retaining only current values.

**Emerging directions:**

- Changes to recorded information should preserve both the previous and new values.
- This history should apply consistently across record fields rather than selectively preserving only certain types of changes.
- History should make it possible to understand what changed, when it changed, and what the previous and new values were.
- The current value remains authoritative for ordinary archive use, while historical values remain available to understand how the record evolved.
- Meaningful changes to relationships and associations should also be preserved. Examples include moving an Experience from one Work to another or merging two Works.
- Routine internal relationship operations that do not affect the user's archive or its interpretation do not necessarily require historical records.

**Change provenance:**

Where practical, provenance should be retained consistently for recorded values and changes.

Provenance should distinguish between:

- **Information source:** Where the information originated, such as a manual entry, spreadsheet, or another external source.
- **Change actor or process:** Who or what introduced or changed the information, such as the user, an import or reconciliation process, or an automated WASABI operation.

The reason for a change may also be recorded when known, but providing a reason should be optional. Examples include correcting an inaccurate entry, accepting newer external information, or resolving a discrepancy.

These directions extend historical preservation beyond the evaluation-specific revision history established in earlier sections.

The detailed representation, retention, and presentation of general record-change history and provenance remain to be defined.

#### 2.7.5 External Information and Reconciliation

WASABI should support comparing information from external sources against existing archive records and reconciling differences through deliberate user review.

**Established decisions:**

- Reconciliation should focus on existing WASABI archive records.
- Identifying entirely new archive records from an external source is outside the current reconciliation scope.
- External information should be presented as proposed changes rather than automatically replacing existing archive values.
- The user decides which proposed changes to accept.
- Reconciliation must avoid accidental duplication or loss of existing information.
- The WASABI archive remains the authoritative record until the user accepts an external change.

**Emerging directions:**

- Reconciliation should identify and present differences between external information and existing archive records.
- Accepted changes should follow the same record-history and provenance principles described above.
- Source information should remain available to help users evaluate conflicting values.
- Reconciliation should preserve the distinction between the origin of information and the process that introduced it into WASABI.

**Open questions:**

- How should WASABI identify and handle uncertain matches between external records and existing archive records?
- How should users review and resolve multiple conflicting values or sources?
- What external source formats and reconciliation workflows should be supported?
- How should reconciliation handle records or values that have changed since an earlier comparison?

The current product vision identifies existing external spreadsheet information as a source of potential archive updates. A repeatable, general-purpose import and reconciliation capability remains subject to further scope and requirements investigation.

## 3. CA-01 Decision Summary

| Subject                                      | Current position                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------ |
| Work and Experience                          | Conceptually distinct                                                                |
| Multiple Experiences per Work                | Established                                                                          |
| Independent Experience records               | Established                                                                          |
| Work metadata                                | Distinct from personal information                                                   |
| Work-level personal attributes               | Small, structured set established                                                    |
| Experience response notes                    | Scoped to individual Experiences                                                     |
| Repeat evaluation                            | Optional                                                                             |
| Evaluation revision history                  | Every saved evaluation change is preserved and inspectable                           |
| Evaluation revision timestamps               | Recorded and effective timestamps retained separately                                |
| Evaluation revision classification           | Optional correction or reassessment classification                                   |
| Evaluation history scope                     | Independent for each Experience                                                      |
| Personal response note revision history      | Latest-version-only direction; emerging, not yet established                         |
| Experience lifecycle                         | Started, Paused, Completed, Abandoned                                                |
| Initial state of a newly recorded Experience | Started                                                                              |
| Abandoned Experiences                        | Reversible; user decides whether to resume or restart                                |
| State-change history                         | Retained and inspectable                                                             |
| State transitions                            | Explicitly recorded by user in 2.0                                                   |
| Work archive membership                      | Requires an actual started or completed Experience                                   |
| Pre-experience queues                        | Deferred to a later version, potentially 2.x or v3.0+                                |
| Experience start date                        | Optional; encouraged when known                                                      |
| State-change effective timestamps            | Retained; retrospective entry and correction supported                               |
| State-change recorded timestamps             | Retained separately from effective timestamps                                        |
| Completion date                              | Optional; encouraged when known                                                      |
| Archive-entry timestamps                     | Automatic and separate for each Work and Experience                                  |
| Date and lifecycle corrections               | Previous values and correction history preserved                                     |
| Lifecycle-state corrections                  | Supported subject to proportionate storage and complexity                            |
| Game completion context                      | Optional, video games only                                                           |
| Movie/book completion context                | No additional mechanism currently needed                                             |
| Metadata auto-population                     | Attractive direction; scope unresolved                                               |
| Removal and historical preservation          | Recoverable by default; permanent deletion requires explicit action                  |
| Recently Removed / Trash                     | Dedicated area for recoverably removed records                                       |
| Automatic removal expiration                 | Not permitted in baseline 2.0                                                        |
| Experience removal                           | Independent and recoverable                                                          |
| Work removal                                 | Recoverably removes Work and associated Experiences                                  |
| Work restoration                             | Restores Experiences removed as a consequence of Work removal                        |
| Independent Experience restoration           | Requires parent Work to be active                                                    |
| Permanent Experience deletion                | Deletes only that Experience                                                         |
| Permanent Work deletion                      | Cascades to all associated Experiences                                               |
| Permanent deletion confirmation              | Required; scope and affected records must be inspectable                             |
| Archive completeness                         | Missing information actively identified and communicated; lifecycle-aware assessment |
| Completeness expectations                    | System-defined baseline plus optional user-defined expectations; details open        |
| Incomplete records                           | Remain valid unless a separate integrity issue exists                                |
| Inconsistent information                     | Flagged for user review rather than automatically corrected                          |
| Dismissed inconsistency flags                | User may acknowledge an inconsistency as intentional; dismissal remembered           |
| Potential duplicate detection                | Works and Experiences considered separately                                          |
| Automatic duplicate merging                  | Not permitted                                                                        |
| Dismissed duplicate suggestions              | "Not a duplicate" decisions remembered; explicit rechecking supported                |
| General record-change history                | Previous and new values preserved; emerging direction                                |
| Relationship-change history                  | Meaningful changes to Work and Experience relationships preserved                    |
| Change provenance                            | Information source and change actor or process distinguished                         |
| Change reasons                               | May be recorded when known; optional                                                 |
| Reconciliation                               | User reviews and decides whether to accept external changes                          |
| Archive authority                            | WASABI remains authoritative until an external change is accepted                    |
| Reconciliation scope                         | Existing archive records only; new-record discovery excluded                         |
| Uncertain external record matching           | Open                                                                                 |
| Intelligence consequences of removal         | Open                                                                                 |

## 4. Next Areas of Investigation

CA-01 decomposition remains in progress.

The next discussions should investigate:

1. Detailed requirements for Work and Experience record maintenance.
2. Backup, restoration, export, and data portability.
3. The effects of record correction, removal, and permanent deletion on intelligence findings and supporting evidence.

Archive integrity, correction, duplicate detection, and reconciliation have been explored at the capability level. Their remaining open questions should be addressed when defining the relevant detailed requirements rather than prematurely resolving implementation or interface decisions.

---

**Document history:**

- Initial decomposition checkpoint recorded November 20, 2026.
- Archive integrity, correction, duplicate detection, and reconciliation discovery checkpoint recorded November 26, 2026.
