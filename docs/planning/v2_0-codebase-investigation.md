# WASABI 2.0 — Codebase Investigation

**Status:** Research complete — capability decomposition input  
**Repository:** `zjtheilen/media-tracker`  
**Branch investigated:** `v2_0_dev`  
**Investigation date:** 2026-11-13

---

## 1. Purpose

This document records a read-only investigation of the existing WASABI codebase to establish an implementation baseline for WASABI 2.0 capability decomposition.

The investigation examined the current application architecture, archive data model, record lifecycle, persistence, API and frontend behavior, portable archive operations, analytical and intelligence services, recommendation scaffolding, migrations, tests, and relevant planning documentation.

Its purpose is to distinguish:

- Capabilities already implemented in the current application.
- Partial implementations and existing foundations that may be extended.
- Capabilities that are absent or represented only by placeholders.
- Architectural constraints that may affect WASABI 2.0 product decisions.
- Potential design directions that warrant discussion during capability decomposition.

Existing implementation is evidence about the current product, not an automatic constraint on the 2.0 product model. WASABI 2.0 should preserve valuable existing behavior where appropriate without allowing the current architecture to dictate product decisions prematurely.

This document is a research artifact, not a requirements specification or implementation plan.

## 2. Investigation Scope and Limitations

The investigation covered the `v2_0_dev` branch of `zjtheilen/media-tracker`.

Areas examined included:

- Repository structure and application architecture.
- SQLite schema and domain models.
- Entry creation, retrieval, amendment, and purge.
- Frontend archive and library workflows.
- Portable archive export, validation, comparison, and restoration.
- Archive statistics, analytics, and generated profile data.
- Designation, Identity, Observation, and Finding services.
- Recommendation models, services, and interface.
- Historical migrations and compatibility fields.
- Relevant automated tests and planning documentation.

The investigation was performed through read-only source inspection. No repository files, documentation, branches, or commits were modified.

The automated test suite was not executed as part of this investigation. The README reports a baseline of 429 passing tests and zero failures; this is treated as a repository-reported result rather than an independently verified test run.

No private runtime archive data or live database contents were inspected.

## 3. Current Application Architecture

The current application is a FastAPI backend with a vanilla JavaScript frontend and SQLite persistence.

Its principal components include:

| Component                                    | Responsibility                                                   |
| -------------------------------------------- | ---------------------------------------------------------------- |
| `main.py`                                    | FastAPI application, validation, entry CRUD, and API endpoints.  |
| `db.py`                                      | SQLite connection, schema creation, and migrations.              |
| `models/entry.py`                            | Current entry domain model and score calculation.                |
| `models/media_item.py`                       | Lightweight media item representation.                           |
| `models/services/`                           | Archive analysis, statistics, traits, and intelligence services. |
| `models/recommendations/`                    | Recommendation model and unfinished recommendation services.     |
| `index.html` and frontend JavaScript modules | Library, forms, analytics, lists, and Archive Profile interface. |

The current application is local and single-user-oriented. The investigated code does not contain a user or tenant model, authentication layer, or cloud synchronization architecture.

### 3.1 Current analytical pipeline

The Archive Profile is generated from the current archive through an orchestration process centered on `build_archive_profile()`.

The pipeline calculates or assembles:

- Archive statistics.
- Genre metrics.
- Derived traits.
- Designations.
- Identities.
- Observations.
- Findings.
- Narrative and presentation data.

These outputs are generated from the current archive when requested. They are not independently persisted as managed findings with their own lifecycle records.

This is an important distinction for WASABI 2.0: the current application has meaningful analytical foundations, but it does not yet implement the full persistent, evidence-linked intelligence lifecycle envisioned by the 2.0 capability model.

## 4. Current Archive Data Model

The current archive is centered on a single SQLite table named `entries`.

Each row combines information that WASABI 2.0 intends to distinguish more carefully.

| Current field       | Meaning                                         |
| ------------------- | ----------------------------------------------- |
| `id`                | UUID identifying the entry.                     |
| `title`             | Work title.                                     |
| `media_type`        | Media category, currently book, video, or game. |
| `genres`            | Genre labels associated with the entry.         |
| `scores`            | Universal and media-specific score values.      |
| `total_score`       | Calculated aggregate score.                     |
| `completion_status` | Planned, in-progress, dropped, or completed.    |
| `date_consumed`     | Optional consumption date.                      |
| `notes`             | Free-text notes.                                |
| `favorite`          | Persisted legacy boolean field.                 |
| `historical_score`  | Persisted legacy aggregate score.               |
| `historical_scores` | Persisted legacy score data.                    |

The current model does not distinguish a Work entity from an Experience entity.

A single entry therefore combines:

- The identity of a media work.
- The user's recorded experience with that work.
- The user's evaluation of the experience.
- Completion and consumption information.
- Information used by archive analysis.

`MediaItem` is currently a lightweight representation containing a title and media type. It is not a full work identity or content-understanding model.

### 4.1 Current creation and amendment constraints

The ordinary entry creation and amendment workflows impose several validation requirements:

- All scoring categories must be supplied.
- Score values must be integers from 1 through 10.
- All current scoring categories must be present for the selected media type.
- At least one genre is required.
- A maximum of three genres is permitted.
- Completion status supports planned, in-progress, dropped, and completed.
- Consumption date is optional.
- Notes are optional.

The frontend initializes scoring sliders to 5. Consequently, records created through the ordinary workflow receive a complete score set unless the user changes the values.

Portable archive restoration is more permissive: imported records can contain empty genre lists and empty score objects. This allows some incomplete or historical records to survive restoration even though the ordinary creation workflow does not support the same states.

Relevant implementation:

- `main.py`
- `forms.js`
- `models/portable_archive.py`

### 4.2 Identity and duplicate handling

Entry IDs are UUIDs and serve as the authoritative identifiers during portable archive comparison and restoration.

Ordinary entry creation does not prevent multiple records from having the same title and media type.

The investigated code does not implement a general duplicate-resolution process, canonical-work identity service, external ID matching, or title-based merge workflow.

This exposes an important distinction for WASABI 2.0:

1. Whether two records refer to the same underlying work.
2. Whether two records represent the same archive membership or user experience.

The current model treats these as effectively the same because it has only one record concept.

## 5. Current Purge Behavior

The existing **Purge Record** operation is fully implemented.

The current flow is:

1. The user selects Purge Record from an entry.
2. A confirmation dialog warns that deletion cannot be undone.
3. Confirmation sends a `DELETE /entries/{entry_id}` request.
4. The backend executes a SQL `DELETE` against the matching entry.
5. The frontend reloads the archive and its generated views.

Purge is a hard physical deletion of the database row.

It removes the work representation and all user-recorded information stored in that row, including genres, scores, notes, consumption date, completion status, and persisted legacy fields.

The current implementation has no:

- Soft-delete state.
- Trash or recovery area.
- Per-record undo.
- Tombstone or retained archive-membership record.
- In-app restoration of an individually purged entry.

The only current recovery route is restoring a previously exported portable archive. Restoration replaces the entire active archive rather than recovering one purged record.

### 5.1 Current intelligence consequences

The current analytical pipeline reads the remaining archive entries and regenerates its outputs.

After a purge, the deleted entry no longer contributes to:

- Archive statistics.
- Genre metrics.
- Derived traits.
- Designations.
- Identities.
- Observations.
- Findings.
- The generated Archive Profile.

There are no independently persisted findings or work relationships requiring explicit deletion or invalidation.

This behavior is relatively simple because the current application regenerates analysis from the archive. It may need reconsideration if WASABI 2.0 introduces persistent findings, evidence references, work profiles, or relationships.

### 5.2 Potential 2.0 purge models

The following are design options for future discussion, not settled decisions.

| Option                                             | Meaning                                                                                                            | Implications                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Preserve current semantics                         | Purge permanently removes the work and all associated experiences.                                                 | Closest to current behavior; no individual recovery.             |
| Soft-delete or trash                               | Purge removes the work from normal use while preserving a restoration path.                                        | Adds deletion lifecycle and recovery responsibilities.           |
| Remove archive membership but retain work identity | The user's archive association is removed while the underlying work identity or profile may remain.                | Separates archive membership from knowledge about a work.        |
| Separate experience deletion from work purge       | Individual experiences can be removed while the work remains; purging the work removes all associated experiences. | Becomes relevant if multiple experiences per work are supported. |

A further consequence concerns external recommendations. WASABI 2.0 intends to recommend movies that are new to the user's archive. If a work is permanently purged, the system may no longer be able to distinguish it from a work that has never been archived.

A retained exclusion or tombstone record could preserve that distinction without retaining the full archive entry. Whether this is desirable remains an open product decision.

## 6. Portable Archive, Export, and Restoration

The current portable archive system is versioned and implemented as a JSON format.

The format uses the `wasabi-archive` identifier and version 1. It preserves entry UUIDs and user-owned entry fields, including legacy favorite and historical-score fields.

Calculated values such as aggregate scores and generated Archive Profile or intelligence outputs are not treated as authoritative portable data. They are recalculated by the application.

### 6.1 Current restoration workflow

The current workflow:

1. Accepts a JSON archive file.
2. Validates the archive structure and contents.
3. Compares incoming records with the current archive using UUIDs.
4. Produces counts of additions, replacements, removals, and unchanged records.
5. Requires explicit user confirmation.
6. Replaces the current `entries` table contents transactionally.

The replacement operation is tested for rollback when restoration fails.

### 6.2 Current limitations

- Export and restoration are manual.
- Restoration replaces the entire archive rather than merging records.
- The preview reports counts rather than detailed per-record differences.
- UUIDs are the authoritative matching mechanism.
- The format represents a flat collection of entries rather than a network of distinct works, experiences, evidence, profiles, and relationships.
- There is no automatic backup scheduling.

The current portable archive is a useful foundation, but its data contract will need to evolve if WASABI 2.0 introduces additional entities and relationships.

Portability should be treated as a product capability, not merely a file-download feature.

Relevant implementation:

- `models/portable_archive.py`
- `models/services/portable_archive.py`
- `library.js`
- `tests/test_portable_archive.py`

## 7. Existing Product Functionality

The current application contains substantial functionality beyond archive CRUD.

| Current functionality | Existing behavior                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Library               | Create, read, amend, purge, title search, genre filtering, sorting, and pagination.                                            |
| Scoring               | Six universal and four media-specific evaluation dimensions per media type, combined through weighted scoring.                 |
| Analytics             | Media distribution, average scores, score distribution, genre averages, and monthly activity.                                  |
| Lists                 | Top-rated entries, top books/movies/games, recent archive list, and Hall of Fame.                                              |
| Archive Profile       | Whole-archive summary, metrics, traits, Designations, Identities, Observations, Findings, narrative, and score visualizations. |
| Portable archive      | JSON export, validation, comparison preview, and transactional whole-archive restoration.                                      |
| Recommendations       | Interface placeholder and unfinished service code.                                                                             |

### 7.1 Date semantics

The current schema has `date_consumed`, but no distinct archive-added timestamp.

The frontend function `renderRecentArchiveAdditions()` sorts by `date_consumed`, rather than by when the entry was added to the archive.

Monthly archive activity and monthly average score also group by `date_consumed`.

The current application can therefore represent when a work was consumed, when that information is available, but cannot reliably identify when the work entered the archive.

WASABI 2.0 should distinguish at least the following concepts during requirements discovery:

- Experience date: when the user experienced the work.
- Archive date: when the user added the work to WASABI.
- Modification date: when the archive record was last changed, if that information is needed.

Whether all three are required remains an open question.

### 7.2 Genre analytics and affinity

The current `genre_affinity` calculation is based on the percentage of archive entries assigned a genre.

Genre combinations are based on co-occurrence counts. Other analytics calculate average scores for individual genres and genre combinations.

These are useful descriptive signals, but they are not equivalent to the recurring positive, negative, conditional, or mixed response relationships envisioned by WASABI 2.0 Affinity Intelligence.

### 7.3 Identity terminology

The current Identity engine evaluates the user's curatorial profile through fixture-driven definitions, including Interpretive Philosophy, Exploratory Philosophy, and Breadth Philosophy.

It does not identify individual works, resolve external work identities, or develop per-work content understanding.

The existing Identity system is therefore a curator-profile capability, not the work identity capability described by CA-02.

### 7.4 Legacy fields

The database and portable archive preserve `favorite`, `historical_score`, and `historical_scores`.

However, these fields are not exposed through the standard entry response and do not appear to have an active standard Library workflow.

They are not part of the current aggregate scoring or Archive Profile calculations.

Their intended future status should be reviewed separately rather than assumed.

## 8. Existing Intelligence Foundations

The current Archive Profile contains meaningful analytical systems that should be understood and preserved as potential foundations.

### 8.1 Designations, Identities, Observations, and Findings

The current system includes separate services and rules for:

- Designations.
- Identities.
- Observations.
- Findings.

These systems use aggregate archive metrics, genre information, derived traits, explicit thresholds, fixture-driven definitions, and evidence-strength calculations.

They are substantive v1 systems with existing tests and historical design work behind them.

However, they should not automatically be treated as equivalent to the 2.0 discovery families.

### 8.2 Evidence and explainability

The current code includes evidence structures such as `metric_evidence()` and `genre_evidence()`.

These can provide measured values, labels, units, and evidence types that support explanations of analytical outputs.

This is a useful foundation, but it is not yet a shared evidence and provenance model.

The archive mapper used by the analysis pipeline does not include entry IDs in its mapped representation. Consequently, evidence is generally expressed through aggregate metric or genre values rather than a traceable set of source records.

The current system can explain the metric behind a finding, but does not provide the complete 2.0 model of tracing conclusions through supporting works, characteristics, source information, uncertainty, and reasoning.

### 8.3 Findings are regenerated

Current findings are generated from the archive when the profile is built. They are not independently persisted as managed records with lifecycle state, version history, or dependency relationships.

WASABI 2.0 will need to determine whether findings become persistent objects with evidence references and lifecycle management, or whether some findings remain computed.

This is a product and architecture question, not a decision established by the current implementation.

## 9. Current Implementation Compared with the 2.0 Capability Areas

| Capability area                                   | Current implementation reality                                                                                                                                 |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CA-01 Archive and Collection Management           | Strong v1 entry CRUD, hard purge, manual portable export/restore; no separate Work/Experience model, generic duplicate remediation, or automatic backup.       |
| CA-02 Work Identity and Content Understanding     | Only title and media type in `MediaItem`; no external IDs, identity resolution, enrichment, source records, confidence, or per-work content profile.           |
| CA-03 Shared Evidence and Knowledge Foundation    | Temporary metric/genre evidence dictionaries exist; no persistent shared evidence model or source provenance system.                                           |
| CA-04 Media Experience and Response Modeling      | Current scoring, completion, date, and notes exist; no separate experience records, repeat-experience model, or distinct enjoyment field.                      |
| CA-05 Affinity Intelligence                       | Genre prevalence, score averages, and rule-based signals exist; no robust recurring positive/negative/conditional response-affinity model.                     |
| CA-06 Relationship Intelligence                   | Genre co-occurrence and combinations exist; no general work-to-work or characteristic relationship engine.                                                     |
| CA-07 Evolution Intelligence                      | Monthly activity and average-score aggregates exist; no phase detection or evolving affinity model.                                                            |
| CA-08 Exception Intelligence                      | Some threshold-driven observations exist; no distinct exception/outlier investigation framework.                                                               |
| CA-09 Cross-Family Intelligence and Synthesis     | Archive Profile composes several outputs; no independent engine for reconciling, qualifying, or deriving broader cross-family discoveries.                     |
| CA-10 Intelligence Lifecycle and Reassessment     | Profiles are recalculated on request; no persisted finding lifecycle, dependency graph, targeted reassessment, or stale-finding management.                    |
| CA-11 Discovery Experience and Exploration        | Whole-archive Profile, observations, findings, analytics, and lists exist; no dedicated discovery center or discovery-categorization/curation workflow.        |
| CA-12 Work Profiles and User Agency               | Entry detail cards exist; no separate per-work profile, external enrichment, work-level provenance, or correction/exclusion controls for enriched information. |
| CA-13 External Media Discovery and Recommendation | Recommendation interface and package stubs exist; no functioning candidate discovery, provider integration, recommendation evaluation, API, or persistence.    |

The existing Designation, Identity, Observation, and Finding systems should not be discarded or casually renamed. They are meaningful v1 systems.

At the same time, they should not be treated as proof that the 2.0 Affinity, Relationship, Evolution, Exception, Synthesis, or Lifecycle capabilities already exist. Those capabilities have distinct conceptual responsibilities.

## 10. Recommendation Implementation

The recommendation package contains a `Recommendation` dataclass and four modules:

- `models.py`
- `engine.py`
- `scoring.py`
- `signals.py`

The current functions are stubs:

- `collect_signals()` returns an empty dictionary.
- `calculate_match_score()` returns zero.
- `generate_recommendations()` returns an empty list.

The Recommendations interface explicitly identifies the feature as unavailable and awaiting model calibration.

The investigated code contains no functioning:

- Recommendation API endpoint.
- External movie catalog integration.
- Candidate discovery or evaluation process.
- Recommendation persistence.
- Save, view, or remove workflow.

Some Designation and Identity definitions contain `recommendation_bias` values, but the recommendation engine does not consume them.

The existing recommendation E2E test verifies the placeholder rather than a functioning recommendation system.

This confirms that the settled CA-13 product decisions are design decisions for a new capability, rather than changes to an existing functioning recommender.

## 11. Architectural Implications and Potential Design Directions

The following observations should inform capability decomposition. They are not settled product requirements.

### 11.1 Work and Experience are inseparable

The current entry combines work identity and user experience.

Potential directions:

1. Preserve a composite record and extend its fields.
2. Separate Work and Experience as distinct concepts and data entities.
3. Separate the concepts while initially enforcing one experience per work.

A conceptual separation aligns more naturally with CA-02, CA-04, CA-12, and CA-13.

Whether one work may have multiple distinct experiences—such as separate replays, rereads, rewatches, or evaluations—remains an open decision.

### 11.2 Incomplete records are not first-class in the ordinary workflow

Portable restoration can preserve records with empty genres and scores, but ordinary creation and amendment cannot represent the same states.

WASABI 2.0 should distinguish:

- A work known to the archive.
- An experience recorded by the user.
- An experience evaluated by the user.
- Information that is missing, unknown, or intentionally left blank.

This distinction affects archive representation, profiles, analytics, and evidence interpretation.

### 11.3 Archive and experience dates are conflated

The current model records an optional consumption date but does not record when an entry was added to the archive.

Experience date, archive date, and modification date should be considered separately during requirements discovery.

### 11.4 Duplicate detection is not implemented

The database permits duplicate title/media-type entries. Portable comparison is UUID-based and does not generate the title/media-type similarity warning described in some documentation.

Potential matching evidence includes:

- Exact title and media type.
- External provider identifiers.
- Normalized title, release year, creator, and other identifying attributes.
- User-reviewed matching where ambiguity remains.

Title similarity should not automatically trigger a merge. Different editions, remakes, adaptations, and similarly named works make automatic merging unsafe.

### 11.5 Work understanding and enrichment are absent

The current model does not provide:

- Creators, release year, series, or edition.
- External catalog identifiers.
- Source-specific descriptions and metadata.
- Competing identity candidates.
- Source reliability or provenance.
- User correction of enriched characteristics.
- User exclusion of enriched information.

The current `MediaItem` object is not a work-understanding system.

### 11.6 Findings are regenerated rather than maintained

The current system rebuilds findings from the archive on request.

A future model may persist findings with states, evidence references, version history, and targeted reassessment. Alternatively, some outputs may remain computed.

This requires product and architecture investigation.

### 11.7 Portable archive will need a broader contract

If WASABI 2.0 introduces separate works, experiences, enriched information, provenance, user corrections, relationships, and saved recommendations, the portable archive format will need to represent those entities and their relationships.

The current flat-entry format is a foundation, not a complete 2.0 data contract.

## 12. Documentation and Runtime Discrepancies

The investigation identified several discrepancies worth tracking.

| Area                                | Documentation or interface description                          | Runtime behavior                                                                                                       |
| ----------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Portable archive duplicate warnings | Similar titles/media types are described as duplicate warnings. | Preview comparison is UUID-based; no similarity warning is generated or displayed.                                     |
| Recent Archive Additions            | The Lists page uses this label.                                 | The list sorts by `date_consumed`, not archive-added date.                                                             |
| Monthly archive activity            | Archive Profile uses this label.                                | The underlying calculation groups by `date_consumed`.                                                                  |
| Favorite and historical fields      | Portable archive documentation includes these fields.           | They persist and round-trip but are not exposed through the standard entry response or an active standard UI workflow. |

These discrepancies should be retained for future reconciliation. They do not need to interrupt capability decomposition unless they affect a decision currently under discussion.

## 13. Testing and Confidence

The repository contains coverage for:

- Entry creation, retrieval, amendment, and deletion.
- Purge cancellation and confirmation in the UI.
- Database schema and migration behavior.
- Portable archive validation, export/import, replacement, and rollback.
- Archive Profile and intelligence services.
- Recommendation placeholder behavior.

The README reports 429 passing tests and zero failures. The investigation did not execute the suite, so this is the repository-reported baseline rather than an independently verified result.

No live database or private runtime archive data was inspected.

## 14. Implications for Capability Decomposition

The codebase suggests that capability decomposition should not simply split existing CA-01 bullets into smaller implementation tasks.

Several conceptual boundaries affect multiple capability areas and should be clarified before detailed requirements are written.

A recommended investigation sequence is:

1. Define the relationship between Work and Experience.
2. Define archive membership and record lifecycle, including purge.
3. Define information completeness and evaluation state.
4. Define archive preservation, export, and restoration.
5. Decompose the remaining CA-01 responsibilities into specific capabilities, information needs, and dependencies.

This sequence avoids designing purge, backup, or work profiles around a data model that has not yet been settled.

### Initial CA-01 decomposition candidates

The following are candidate capability groupings derived from the existing CA-01 definition and the codebase investigation. They require discussion and validation before being treated as an approved decomposition.

| Candidate capability              | Responsibility                                                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Work Record Management            | Create, maintain, and organize records representing individual works in the archive.                                                |
| Experience Record Management      | Record and maintain the user's experiences with works, including evaluations, dimensions, completion, and personal observations.    |
| Archive Information State         | Represent missing, incomplete, unknown, and intentionally unrecorded information without conflating them.                           |
| Archive Integrity and Remediation | Identify and resolve duplicate, inconsistent, or incomplete records while avoiding accidental information loss.                     |
| Record Authority and Separation   | Preserve the user's original records as authoritative, distinct from enriched information and derived interpretations.              |
| Archive Evolution and Maintenance | Allow records and archive organization to change over time without treating historical information as immutable.                    |
| Backup and Restoration            | Preserve archive data and recover it after loss or corruption.                                                                      |
| Data Portability                  | Allow users to retain and use their archive information outside WASABI.                                                             |
| Archive Reconciliation            | Reconcile historical or externally maintained records with the authoritative archive while avoiding unintended duplication or loss. |

These groupings are starting points, not an approved final capability list.

---

## 15. Open Questions to Carry into Decomposition

The following questions are particularly relevant to the next stage of discovery:

1. Should Work and Experience be separate entities, separate concepts within one entity, or a staged separation?
2. Can one Work have multiple distinct Experience records?
3. What exactly does Purge remove when Work and Experience are distinct?
4. Should purged works remain distinguishable from works never added to the archive, particularly for recommendation eligibility?
5. Which archive and experience information states must be represented explicitly?
6. Should archive-added and last-modified timestamps be recorded separately from experience dates?
7. What duplicate detection and resolution responsibilities belong to the archive?
8. What should portable export and restoration preserve as the 2.0 data model evolves?
9. Should findings remain computed, become persistent records, or use a combination of both?
10. Which legacy fields and workflows should be retained, retired, or migrated?

These questions should be resolved only when their relevant capability boundaries are under discussion.

## 16. Research Conclusion

The current application provides a substantial foundation in archive management, scoring, analytics, profile generation, and rule-based analysis.

Its central architectural limitation for WASABI 2.0 is the composite entry model: work identity, user experience, evaluation, completion, and archive information are currently represented together.

The current intelligence system also relies on generated aggregate outputs rather than a persistent shared evidence foundation and managed finding lifecycle.

The existing portable archive provides a tested preservation mechanism, but it is designed around the current flat-entry model.

The recommendation capability is not yet operational.

These findings establish the implementation baseline for WASABI 2.0 capability decomposition. They should inform product decisions without turning existing implementation details into automatic requirements.

**Next activity:** Capability decomposition, beginning with the foundational relationship between Work and Experience and its implications for archive membership and record lifecycle.
