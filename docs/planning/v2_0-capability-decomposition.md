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

### 2.3 Unfinished Experiences and Archive Membership

The original archive model focused primarily on recording and evaluating completed experiences. Further discussion identified meaningful reasons to represent experiences that have begun but have not been completed.

Video games make this particularly apparent, but the same need applies to movies and books. A user may invest meaningful time in a Work, pause it, return to it, or abandon it.

**Established decisions:**

- An Experience does not need to be completed to be represented in the archive.
- Started, Paused, and Abandoned Experiences are valid archive records.
- An unfinished Experience may still have an evaluation and personal response notes.
- Completion is not a prerequisite for recording or evaluating an Experience.
- Experience lifecycle states apply across media types rather than being limited to games.

**Scope boundary:**

A queue of unconsumed works, such as a watchlist, reading list, or play-later backlog, is outside the baseline 2.0 scope.

This functionality is deferred to a later version, potentially v3.0.

WASABI 2.0 is intended to represent actual experiences, not merely works the user is interested in or intends to experience.

The exact point at which a Work or Experience becomes part of the archive, including the relationship between creating an Experience and recording its start, remains subject to further discovery.

### 2.4 Dates and Temporal Information

Experience lifecycle and historical analysis require more temporal information than the current application records.

**Established conceptual requirements:**

An Experience must account for:

- **Start date:** When the Experience began.
- **State-change dates or timestamps:** When each recorded lifecycle transition occurred.
- **Completion date:** When the Experience reaches Completed.

These dates support the representation of an Experience's duration, interruptions, returns, and completion history.

The system must preserve the chronology of state changes rather than representing only the latest state.

**Current implementation observation:**

- The existing application has an optional `date_consumed` field.
- It does not have a distinct Experience start date.
- It does not maintain a history of Experience state transitions.
- Archive-added dates are not distinct from consumption dates in the current model.

**Open questions:**

- What date precision is necessary for Experience starts and state transitions?
- Should users be able to enter or correct dates retroactively?
- How should the system handle a transition whose date is unknown?
- How should a completion date relate to the timestamp of the transition into Completed?
- Should archive-added dates be recorded independently from Experience dates?
- What additional temporal information is necessary to understand the evolution of an Experience?

The conceptual need for a start date, state-change history with dates, and a completion date is established. Their exact representation and detailed rules remain open.

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

| Subject                               | Current position                                      |
| ------------------------------------- | ----------------------------------------------------- |
| Work and Experience                   | Conceptually distinct                                 |
| Multiple Experiences per Work         | Established                                           |
| Independent Experience records        | Established                                           |
| Work metadata                         | Distinct from personal information                    |
| Work-level personal attributes        | Small, structured set established                     |
| Experience response notes             | Scoped to individual Experiences                      |
| Repeat evaluation                     | Optional                                              |
| Experience lifecycle                  | Started, Paused, Completed, Abandoned                 |
| Abandoned Experiences                 | Reversible; user decides whether to resume or restart |
| State-change history                  | Retained and inspectable                              |
| State transitions                     | Explicitly recorded by user in 2.0                    |
| Experience start date                 | Established                                           |
| State-change dates                    | Established                                           |
| Completion date                       | Established                                           |
| Game completion context               | Optional, video games only                            |
| Movie/book completion context         | No additional mechanism currently needed              |
| Unconsumed-work queue                 | Deferred, potentially v3.0                            |
| Metadata auto-population              | Attractive direction; scope unresolved                |
| Archive-added date                    | Open                                                  |
| Historical preservation               | Emerging direction                                    |
| Work and Experience removal semantics | Open                                                  |
| Purge behavior                        | Open                                                  |
| Intelligence consequences of removal  | Open                                                  |

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
