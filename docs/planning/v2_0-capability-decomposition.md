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

WASABI 2.0 must distinguish between a media work and an individual experience of that work.

A Work represents the underlying movie, book, game, or other supported media item. An Experience represents an individual interaction the user has had with that Work.

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

**Important distinction:** The absence of a new evaluation does not establish that the user's opinion has remained unchanged. It means only that no new evaluation was recorded.

### 2.2 Experience Completion

Completion is a property of an Experience and represents the user's judgment about whether that particular experience is complete.

Completion must not be treated as interchangeable with evaluation, enjoyment, or engagement.

**Established decisions:**

- Completion is user-determined.
- An Experience does not require an additional active, inactive, or abandoned status beyond its completion state.
- An unfinished Experience remains a valid archive record.
- Inactivity does not establish abandonment or completion.
- A user may return to an unfinished Experience after an extended period.
- The system must not interpret a period of inactivity as a definitive conclusion about the user's relationship with a Work.

An Experience can therefore remain unfinished indefinitely without being classified as abandoned.

#### 2.2.1 Media-Specific Completion Context

Movies and books have sufficiently intuitive completion semantics that additional completion mechanisms are not considered valuable for the baseline product.

Video games have more variable and subjective completion expectations.

For example:

- Completing a game's main story may be sufficient for one user.
- Another user may consider the game unfinished until its true ending is reached.
- A racing game may be considered complete only after winning every cup.
- A user may simply decide that they have experienced enough of a game.

**Established decision:**

Optional user-defined completion context is specific to video games.

WASABI should allow users to describe what they consider completion for a particular game experience without requiring them to maintain exhaustive progress checklists or achievement records.

Illustrative completion descriptions include:

- Main story completed.
- True ending reached.
- All cups won.
- Postgame completed.
- Stopped when satisfied.

These are examples, not a predefined mandatory taxonomy.

Movies and books do not require this additional completion-context mechanism.

### 2.3 Unfinished Experiences and Archive Membership

The original archive model focused primarily on recording and evaluating completed experiences. Further discussion identified meaningful reasons to include experiences that have begun but have not been completed.

Video games make this particularly apparent: a user may invest substantial time in a game, develop a meaningful response to it, and ultimately leave it unfinished. Excluding such experiences would discard valuable information.

**Established decisions:**

- An Experience does not need to be completed to be represented in the archive.
- An unfinished Experience may still have an evaluation.
- Completion is not a prerequisite for recording or evaluating an Experience.

**Scope boundary:**

A queue of unconsumed works, such as a watchlist, reading list, or play-later backlog, is outside the baseline 2.0 scope.

This functionality is deferred to a later version, potentially v3.0.

WASABI 2.0 is intended to represent actual experiences, not merely works the user intends to experience.

A Work therefore does not enter the archive merely because the user is interested in it or intends to consume it.

The precise treatment of a Work when an Experience is first started, including whether the Experience needs an explicit start date, remains subject to further discovery.

### 2.4 Dates and Temporal Information

The current application records an optional consumption/completion date but does not record an Experience start date.

The distinction between an Experience's beginning, completion, and subsequent historical changes may become important as WASABI supports multiple Experiences per Work and unfinished Experiences.

**Current implementation observation:**

- Completion/consumption dates are represented.
- Experience start dates are not currently part of the system.
- Archive-added dates are not distinct from consumption dates in the current model.

**Open questions:**

- Should an Experience have an explicit start date?
- Should start dates be optional?
- How should dates be represented for Experiences that span an extended period?
- Should archive-added dates and Experience dates remain distinct?
- What additional temporal information is necessary to understand the evolution of an Experience?

No new date requirements have been established yet.

### 2.5 Historical Preservation and Removal

Discussion of the existing Purge Record functionality raised concerns about unrestricted permanent deletion.

The current application physically deletes an entire entry and its associated information. Recovery currently requires restoring a previously exported portable archive, which replaces the entire active archive.

For WASABI 2.0, the product direction is increasingly toward preserving historical information rather than granting users unrestricted power to erase their recorded history.

Potential preservation mechanisms include:

- Retaining a backup of removed information.
- Recording removal in a historical diary or audit record.
- Preserving sufficient information to establish that a Work or Experience previously existed in the archive.

**Emerging direction:**

Historical preservation should take priority over irreversible deletion, particularly where accidental removal could destroy meaningful personal history.

**Open questions:**

- What should happen when an individual Experience is removed?
- What should happen when a Work is removed?
- Does purging a Work also remove its associated Experiences?
- Should removed records remain recoverable?
- What information should survive removal?
- Should a full archive purge preserve historical records or create an external backup?
- How should users distinguish ordinary removal, archival preservation, and permanent destruction?
- What safeguards should prevent accidental loss of an entire archive?

The meaning and behavior of Purge in WASABI 2.0 remain undecided.

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

## 3. CA-01 Decision Summary

| Subject                               | Current position               |
| ------------------------------------- | ------------------------------ |
| Work and Experience                   | Conceptually distinct          |
| Multiple Experiences per Work         | Established                    |
| Independent Experience records        | Established                    |
| Repeat evaluation                     | Optional                       |
| Unfinished Experiences                | Supported                      |
| Abandoned vs. inactive                | No separate distinction        |
| Experience status                     | Completion state only          |
| Completion judgment                   | User-determined                |
| Game completion context               | Optional, video games only     |
| Movie/book completion context         | No additional mechanism needed |
| Unconsumed-work queue                 | Deferred, potentially v3.0     |
| Experience start dates                | Open                           |
| Historical preservation               | Emerging direction             |
| Work and Experience removal semantics | Open                           |
| Purge behavior                        | Open                           |
| Intelligence consequences of removal  | Open                           |

## 4. Next Areas of Investigation

CA-01 decomposition remains in progress.

The next discussions should investigate:

1. Work and Experience lifecycle, including archive entry and removal.
2. Experience evaluation and other recorded response information.
3. Historical preservation, backup, restoration, and purge semantics.
4. Archive integrity, correction, duplicate handling, and reconciliation.
5. Temporal information and historical activity.

These topics should be explored in a controlled sequence. Decisions should be recorded as they become sufficiently established rather than treating the entire capability area as settled at once.

---

**Document history:** Initial decomposition checkpoint recorded November 20, 2026.
