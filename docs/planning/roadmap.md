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

It should **not** be interpreted as a strict runtime pipeline.

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

They should not be treated as mandatory sequential transformations where one subsystem must consume the output of another.

---

# PROJECT PRINCIPLES

## Evolution, Not Rewrite

The intelligence layer already contains meaningful infrastructure and behavioral contracts.

Future work should:

- preserve working behavior unless there is a demonstrated reason to change it
- distinguish conceptual misalignment from implementation failure
- avoid replacing deterministic systems merely because a new conceptual model exists
- avoid large refactors when a terminology or eligibility correction is sufficient
- use existing tests as evidence of historical behavioral expectations
- treat regressions as potentially lost product behavior, not merely broken tests

The question before changing existing behavior is:

> What information or behavior would be lost if this were removed?

---

## Behavioral Memory

The repository's existing code and tests constitute part of the application's behavioral memory.

The roadmap therefore treats the forensic audit as an important project artifact.

Existing behavior should be classified rather than blindly preserved or deleted.

Possible classifications are:

- **PRESERVE** — compatible with the conceptual contract
- **ALIGN** — directly conflicts with the conceptual contract
- **CLARIFY** — useful implicit behavior that should become explicit
- **EVIDENCE** — useful explanation/evidence infrastructure
- **TEST GAP** — meaningful behavior insufficiently protected
- **DEFER** — legitimate issue belonging to a later phase
- **POSSIBLE DEAD CODE** — behavior/test requiring investigation before preservation

---

## User Input Is Intelligence Data

Any information deliberately supplied by the user about a media item should be considered potential fodder for future algorithmic consumption.

This includes, but is not limited to:

- scores
- ratings
- genres selected or confirmed by the user
- notes/reviews
- previously-consumed status
- future media metadata supplied by the user
- other explicit preference signals

This does **not** mean every field must immediately influence scoring or recommendations.

It means the data model should avoid unnecessarily treating meaningful user input as disposable presentation-only text.

---

# ARCHIVE DATA PRINCIPLES

## Completed Media Is the Core Archive Unit

The archive primarily represents media the user has actually consumed/completed.

The intelligence layer operates over this archive.

Future systems should distinguish between:

- media records
- consumption state
- user evaluation
- metadata
- derived intelligence

---

## Previously Consumed Status

Media should eventually support a simple binary indicator allowing the user to indicate:

> This is not the first time I have consumed this media.

This may be represented as a field such as:

```text
previously_consumed
```

or an equivalent name.

The purpose is to capture meaningful repeat-consumption behavior without requiring the user to maintain an exact watch/play/read count.

A full `watch_count` / `consumption_count` system is **not currently required**.

The binary signal is preferable initially because:

- it is low-friction
- it captures repeat-consumption behavior
- it avoids making archive entry tedious
- it can later become an intelligence signal
- it can eventually inform recommendation and taste analysis

This field should ultimately be considered available to intelligence systems alongside other user-provided inputs.

---

## Review vs Notes

The current entry form's `notes` field should eventually become:

> **Review**

The field should remain optional.

The conceptual direction is:

```text
User Input
↓
Review / Scores / Consumption Signals
↓
Analytics + Intelligence
```

The review should eventually be available for algorithmic consumption.

However, Phase 1 should **not** automatically introduce NLP, LLM analysis, sentiment analysis, or other review-processing algorithms merely because the field exists.

The immediate goal is to preserve the data as meaningful user input.

---

# PHASE 0 — CONCEPTUAL LOCK

## Status: CONCEPTUALLY COMPLETE

The Intelligence Contract v1 defines:

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

The contract also establishes:

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

Recovered behavior includes:

- Trait Signal Strength normalization
- separate Identity normalization semantics
- Identity weighted scoring
- derived Identity traits
- Identity minimum-entry behavior
- Designation ranking
- Designation primary selection
- Observation evidence
- Identity contribution breakdowns
- recommendation-bias metadata
- empty intelligence collections
- deterministic ordering
- fixture-driven intelligence definitions

Phase 0 should no longer be treated as an open-ended conceptual-design phase.

---

# FORENSIC AUDIT — RECOVERED BEHAVIORAL CONTRACTS

## Status: COMPLETE

The repository audit recovered behavior encoded in the implementation and tests that is not always explicitly represented by the new conceptual contract.

The audit's purpose was not to redesign the intelligence layer.

Its purpose was to answer:

> What did we already build, what did our tests implicitly promise, what conflicts with the new intelligence contract, and what would we accidentally lose if we changed things now?

Important recovered behaviors include the following.

---

## Trait Normalization

Trait Signal Strength has existing normalization behavior.

This should be preserved unless the Intelligence Contract explicitly contradicts it.

**Classification:** PRESERVE

---

## Identity Normalization

Identity scoring has normalization semantics that are not necessarily identical to Trait normalization.

Identity normalization should therefore not be casually replaced with Trait normalization.

**Classification:** PRESERVE

---

## Identity Weighted Scoring

Identity scoring machinery already contains meaningful weighted scoring.

The existence of overlap between Identity fixtures and Designations does not justify deleting the scoring system.

**Classification:** PRESERVE

---

## Derived Identity Traits

Identities can contribute or derive traits.

This is meaningful because it provides a connection between curator-level synthesis and measurable archive signals.

This mechanism should not be removed merely because Identity semantics are being clarified.

**Classification:** PRESERVE / EVIDENCE

---

## Identity Contribution Breakdown

Identity scoring includes contribution/explanation infrastructure.

This should be preserved because it provides evidence for why an Identity received its score.

**Classification:** EVIDENCE

---

## Minimum-Entry Behavior

Identity scoring already has minimum-entry behavior.

The current implementation may zero the score when insufficient entries exist without necessarily removing the Identity from ranking.

This creates a potentially misleading state where an ineligible Identity can still participate in primary selection.

This is a Phase 1 alignment issue.

**Classification:** ALIGN\*\*

Required conceptual behavior:

```text
entry_count < minimum_entries
↓
INELIGIBLE
↓
exclude from Identity ranking/presentation
```

The weighted scoring machinery itself should remain.

---

## Designation Ranking

Designation ranking is existing meaningful behavior.

The contract permits multiple internal Designations and a single Primary Designation on the Profile.

Ranking and primary selection should therefore be preserved.

**Classification:** PRESERVE

---

## Recommendation Bias Metadata

Designation and/or Identity infrastructure contains recommendation-bias metadata.

This is useful because recommendations can eventually consume these signals without making Identity itself a direct recommendation score.

**Classification:** EVIDENCE / PRESERVE

---

## Empty Intelligence Collections

The implementation permits empty intelligence collections.

Empty intelligence should not automatically be interpreted as negative preference.

An empty collection can mean:

- insufficient evidence
- no applicable classification
- no observations currently detected
- no findings currently supported

The distinction between "nothing detected" and "negative preference" should remain explicit.

**Classification:** PRESERVE / CLARIFY

---

## Fixture-Driven Definitions

Designations and Identities are substantially fixture/rule-driven.

This is valuable because definitions remain inspectable and deterministic.

The roadmap should not replace this with opaque AI-generated classifications.

**Classification:** PRESERVE

---

## Deterministic Ordering

Ranking operations and presentation order are behaviorally significant.

Any future change to ranking must explicitly consider:

- ties
- stable ordering
- near-ties
- primary selection
- deterministic output

**Classification:** CLARIFY / TEST GAP

---

# PHASE 1 — INTELLIGENCE ALIGNMENT

## Status: NEXT IMPLEMENTATION PHASE

### Goal

Bring the existing intelligence implementation into alignment with the locked conceptual model without rewriting working infrastructure.

The primary objective is **semantic and behavioral alignment**, not algorithmic reinvention.

---

# PRIORITY 1 — IDENTITY ELIGIBILITY

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
- normalization
- derived traits
- contribution breakdown
- fixture-driven architecture

Do not redesign Identity scoring merely to fix eligibility.

**Classification:** ALIGN

---

# PRIORITY 2 — CONFIDENCE TERMINOLOGY

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

If an existing calculation is valid but mislabeled, terminology correction should precede algorithmic change.

**Classification:** ALIGN / CLARIFY

---

# PRIORITY 3 — DESIGNATION ALIGNMENT

Preserve:

- fixture/rule-driven definitions
- ranking
- primary selection
- traits
- genres
- recommendation bias

Align:

- terminology
- score semantics
- explanation/evidence where useful

Do not expand Designations into curator Identity.

Designation answers approximately:

> What recognizable taste classification fits this archive?

It should remain distinguishable from the broader curator synthesis represented by Identity.

**Classification:** PRESERVE / ALIGN

---

# PRIORITY 4 — IDENTITY / DESIGNATION SEPARATION

Current Identity fixtures overlap with existing Designations.

This is an implementation artifact, not sufficient evidence that the entire Identity subsystem is unnecessary.

Identity should evolve toward:

> **curator philosophy / curator synthesis**

rather than:

> **taste badge**

Do not delete Identity scoring machinery.

Do not make Identity another name for Designation.

Do not assume every overlapping Identity should become a Designation.

For every Identity, evaluate:

| Field               | Required Audit Question                          |
| ------------------- | ------------------------------------------------ |
| Identity ID         | What is the existing identity?                   |
| Conceptual purpose  | What does it attempt to describe?                |
| Signals consumed    | What archive signals drive it?                   |
| Scoring method      | How is it currently scored?                      |
| Minimum data        | When is it meaningful?                           |
| Evidence            | Why does the system believe it?                  |
| Recommendation bias | Does it affect future recommendations?           |
| Closest Designation | Which Designation overlaps?                      |
| Overlap risk        | What information would be lost by deleting it?   |
| Phase 1 treatment   | Preserve, align, clarify, defer, or investigate? |

The central question is:

> If this Identity were simply renamed as a Designation, what conceptual information would disappear?

Do not delete useful Identity concepts merely because their names currently overlap with Designations.

**Classification:** ALIGN / PRESERVE / CLARIFY

---

# PRIORITY 5 — FINDINGS VS OBSERVATIONS

Every Finding must provide meaningful additional interpretation.

Operational test:

> If replacing the Finding with its underlying Observation or raw signal loses no meaningful information, it is probably not functioning as a Finding.

Preserve useful existing Findings.

Do not automatically delete overlapping Findings.

For every Finding, document:

| Field                | Question                              |
| -------------------- | ------------------------------------- |
| Finding ID           | What is the existing Finding?         |
| Purpose              | What does it communicate?             |
| Inputs               | What signals does it consume?         |
| Rule/threshold       | What makes it appear?                 |
| Closest Observation  | What lower-level signal resembles it? |
| Interpretive step    | What does the Finding add?            |
| Evidence             | Why is the conclusion supported?      |
| Confidence semantics | What does confidence actually mean?   |
| Tests                | What protects the behavior?           |
| Recommendation       | Preserve, align, clarify, or defer?   |

Add structured evidence where practical.

**Classification:** CLARIFY / EVIDENCE / TEST GAP

---

# PRIORITY 6 — SECONDARY IDENTITIES

The contract permits:

- one Primary Identity
- zero or more meaningful Secondary Identities

Do not surface every Identity with a nonzero score.

Meaningfulness should consider:

- eligibility/data sufficiency
- signal strength
- relationship to primary
- meaningful separation from the primary
- whether the Identity contributes genuinely different information

Numeric thresholds remain an implementation decision and must be based on actual score distributions.

Do not invent arbitrary thresholds during Phase 1.

**Classification:** ALIGN / DEFER where threshold research is required

---

# PRIORITY 7 — RANKING / TIE POLICY

Define:

- exact tie behavior
- stable ordering
- meaningful near-ties
- close-competitor presentation
- primary selection behavior

Inspect all ranking operations.

Particular attention should be paid to patterns equivalent to:

```python
sorted(items, key=lambda x: x["score"], reverse=True)
```

Such sorting may be deterministic under current input ordering but may leave tie behavior implicit.

Do not invent a new tie-breaking rule without repository evidence or an explicit product decision.

**Classification:** CLARIFY / TEST GAP

---

# PRIORITY 8 — ARCHIVE STATE BEHAVIOR

Define operational behavior for:

- **EMPTY**
- **SPARSE**
- **ESTABLISHED**

The conceptual rule is:

> **Insufficient evidence must remain visibly different from a negative preference.**

Subsystems may have different minimum-data requirements.

Do not invent thresholds where none currently exist.

If a threshold cannot be established from current implementation or tests, mark it:

> **UNRESOLVED — requires implementation decision.**

Audit:

- minimum-entry gates
- zero-score behavior
- missing-data behavior
- partial-data behavior
- empty collections
- whether any subsystem creates misleading certainty

**Classification:** ALIGN / CLARIFY / TEST GAP

---

# PRIORITY 9 — REGRESSION PROTECTION

Protect recovered behavior including:

- trait normalization
- Identity normalization
- derived traits
- Identity minimum-entry behavior
- Designation ranking
- primary selection
- Observation evidence
- Identity contribution breakdown
- recommendation bias
- empty intelligence collections
- deterministic ordering
- sparse/partial archive behavior where already encoded

The previously established baseline was approximately:

> **199 passing tests**

Phase 1 should preserve that baseline except for explicitly intentional changes and their associated new tests.

The baseline itself should not become a fetish.

If a test encodes behavior that is explicitly contradicted by the locked contract, it may need to change.

But every such change should be intentional and documented.

**Classification:** PRESERVE / TEST GAP

---

# PRIORITY 10 — API / DOWNSTREAM CONTRACT ALIGNMENT

Before renaming or changing intelligence fields, inspect every downstream consumer.

Potentially important fields include:

- `confidence`
- `score`
- `breakdown`
- `top_traits`
- `evidence`
- `recommendation_bias`

For each field determine:

1. where it is produced
2. where it is transformed
3. where it is serialized
4. which API response models expose it
5. which frontend code consumes it
6. which tests assert it
7. whether its semantic meaning is stable

Do not rename fields solely because their names are imperfect.

First determine whether consumers depend on the current semantics.

Terminology changes should be implemented as controlled alignment work rather than blind global replacement.

**Classification:** ALIGN / TEST GAP

---

# PRIORITY 11 — USER-PROVIDED INTELLIGENCE SIGNALS

The archive data model should remain capable of preserving meaningful user-provided signals.

Future intelligence may consume:

- scores
- genres
- previously-consumed status
- reviews
- other explicit user-entered preference information

Phase 1 should primarily ensure that these fields are represented correctly and are not accidentally discarded.

Do not implement sophisticated analysis of reviews or repeat-consumption behavior merely because the roadmap recognizes their future value.

**Classification:** PRESERVE / DEFER

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
- introduce review NLP
- introduce exact watch/play/read counts
- invent arbitrary intelligence thresholds
- redesign the entire data model

Phase 1 is an **alignment phase**.

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

The Profile should communicate uncertainty and data sufficiency rather than presenting weak signals as definitive conclusions.

---

# PHASE 3 — REAL RECOMMENDATION ENGINE

## Status: FUTURE

The current Recommendation Engine is infrastructure/stub work.

Current conceptual direction:

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
- relevant user-provided consumption signals
- previously-consumed status where useful

Identity should influence recommendations **indirectly through underlying measurable signals**.

Identity should not simply become:

> "User has Identity X, therefore recommend X."

The Recommendation Engine should eventually explain:

> **Why was this recommended?**

Recommendation explanations should be grounded in measurable or inspectable signals.

---

# PHASE 4 — RECOMMENDATIONS SURFACE

## Status: FUTURE

Once the Recommendation Engine is real and explainable, expose recommendations through the application.

The surface should communicate:

- recommended media
- relevant reasons
- relevant genre/trait signals
- confidence/sufficiency where appropriate
- previously-consumed handling
- enough explanation to distinguish intentional recommendation from arbitrary ranking

The Recommendations surface should not become a second Profile.

---

# PHASE 5 — LIBRARY SCALE

## Status: FUTURE

Implement:

- pagination
- stable ordering
- server-side sorting
- server-side filtering where useful
- large-archive testing

Scale work must preserve deterministic ordering and existing intelligence semantics.

---

# PHASE 6 — IMPORT / EXPORT

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

Import/export must account for user-provided intelligence data, including fields that may become algorithmically meaningful.

Potentially important fields include:

- scores
- genres
- reviews
- previously-consumed status
- metadata
- derived/archived intelligence where appropriate

Do not silently discard meaningful user-entered information during import/export.

---

# PHASE 7 — METADATA EXPANSION

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

Metadata should remain conceptually distinguishable from user evaluation.

For example:

> "Released in 2018"

is metadata.

> "I gave it a 9 because..."

is user-provided intelligence data.

---

# PHASE 8 — POLISH / ACCESSIBILITY / STABILITY

Includes:

- Profile polish
- Analytics polish
- Library polish
- Reports polish
- Recommendations polish
- navigation
- forms
- review field terminology
- previously-consumed UX
- keyboard navigation
- semantic markup
- labels
- contrast
- focus states
- screen-reader testing
- edge cases
- empty archive
- sparse archive
- partial data
- large archives
- documentation

The application should make uncertainty and incomplete data understandable rather than merely technically valid.

---

# PHASE 9 — RELEASE

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

# PHASE 10 — REACT MIGRATION

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
- existing trait normalization
- existing identity normalization
- useful explanation infrastructure

Do not merge:

- Findings with Observations
- Designations with Identity
- Analytics with Profile
- Signal Strength with Data Sufficiency
- Data Sufficiency with Classification Confidence
- Evidence Strength with Signal Strength

Do not make:

- Identity a Designation clone
- Identity a direct recommendation score
- narrative a new intelligence engine
- review automatically become a scoring input without an explicit design decision
- previously-consumed status an exact consumption count
- every nonzero Identity a surfaced Secondary Identity

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

These cardinality rules describe the conceptual model, not necessarily a single runtime execution pipeline.

---

# INTELLIGENCE SEMANTIC MODEL

## Trait

A measurable property derived from the archive.

Traits should have explicit signal semantics.

---

## Genre Signal

A measurable affinity toward a genre or genre family.

Genre signals should remain analytically useful independently of Designations and Identities.

---

## Observation

A direct, measurable, or relatively low-level statement about the archive.

An Observation should be closer to:

> "The archive contains a strong concentration of X."

than:

> "This person is fundamentally a curator of X."

Observations should retain useful evidence.

---

## Finding

An interpretive conclusion that adds meaningful information beyond the underlying Observation or raw signal.

A Finding should answer:

> What does this combination of observations imply?

If no meaningful interpretation is added, the item may actually be an Observation.

---

## Designation

A recognizable classification of taste.

Designation answers:

> What recognizable taste classification fits?

Designations should remain deterministic, inspectable, and fixture/rule-driven.

---

## Identity

A broader curator-level synthesis.

Identity answers:

> What kind of curator does this archive describe?

Identity should capture relationships among signals rather than simply duplicate a taste badge.

---

## Evidence

Evidence explains why an Observation, Finding, Designation, or Identity exists.

Evidence does not need to use one universal schema.

Different intelligence layers may legitimately use different evidence structures when the evidence itself has different semantics.

Do not unify evidence structures merely for architectural neatness.

---

# EVIDENCE ARCHITECTURE

Existing evidence mechanisms include or may include:

- metric evidence
- genre evidence
- Observation evidence
- Finding evidence
- Designation explanation
- Identity contribution breakdown
- narrative explanation

The audit conclusion is:

> Preserve evidence mechanisms that explain meaningful domain behavior. Do not force every subsystem into a single universal evidence object unless there is an actual product or technical requirement for doing so.

Evidence should make intelligence inspectable.

---

# CONFIDENCE / STRENGTH SEMANTICS

The intelligence layer must distinguish four concepts.

| Concept                   | Meaning                                                     |
| ------------------------- | ----------------------------------------------------------- |
| Signal Strength           | How strongly a signal is expressed                          |
| Data Sufficiency          | Whether enough data exists to make the subsystem meaningful |
| Classification Confidence | How clearly one candidate beats plausible alternatives      |
| Evidence Strength         | How strongly the available evidence supports a conclusion   |

A field named `confidence` is not automatically Classification Confidence.

Existing fields must be interpreted according to actual implementation semantics.

---

# OBSERVATION / FINDING RULE

The key conceptual test is:

> If the Finding were removed and replaced by the underlying Observation, would meaningful information be lost?

If **no**, the Finding may be duplicative.

If **yes**, the Finding is likely providing meaningful interpretation.

This should be evaluated individually.

Do not collapse the two systems merely because some current Findings overlap with Observations.

---

# ARCHIVE STATE MODEL

The intelligence layer should distinguish:

## EMPTY

No meaningful archive evidence exists.

Expected characteristics:

- little or no intelligence
- no misleading negative preferences
- empty collections where appropriate
- no unjustified classifications

---

## SPARSE

Some data exists, but not enough for every subsystem.

Expected characteristics:

- subsystem-specific eligibility
- partial intelligence
- visible uncertainty
- no false certainty
- no assumption that missing signals represent negative preferences

---

## ESTABLISHED

Enough archive data exists for the relevant subsystem to operate normally.

Expected characteristics:

- normal ranking
- meaningful classifications
- useful evidence
- profile synthesis
- recommendation signals

Subsystems may establish their own minimum-data requirements.

---

# RANKING / TIE RULES

Every ranking system should eventually make its behavior explicit.

Document:

- primary sort key
- score precision
- tie behavior
- stable ordering
- near-tie behavior
- primary selection
- presentation of close competitors

Do not invent arbitrary thresholds merely to make the system appear more sophisticated.

Where behavior is not currently established:

> **UNRESOLVED — requires implementation decision.**

---

# TEST FORENSICS PRINCIPLES

For every intelligence-related test, determine:

1. What behavior is it actually protecting?
2. Is that behavior part of the conceptual contract?
3. Is it an implementation detail or meaningful domain rule?
4. Is the test still relevant?
5. Is the behavior duplicated elsewhere?
6. Is there a missing test around the same concept?
7. Does the test encode a hidden assumption that Phase 1 should preserve or revise?

Pay particular attention to tests asserting:

- exact Identity IDs
- exact Designation IDs
- ranking order
- score thresholds
- minimum-entry behavior
- empty-archive behavior
- derived trait behavior
- evidence structures
- confidence values
- recommendation bias
- primary selection
- contribution breakdowns
- top traits
- genre affinity
- genre diversity
- multiple candidates
- deterministic ordering

A test should not be considered disposable merely because the contract does not currently mention the behavior.

First determine what behavioral promise the test represents.

---

# TEST QUALITY CATEGORIES

Tests should be classified as:

## Strong

Protect meaningful domain behavior.

## Weak

Primarily verify implementation details.

## Redundant

Duplicate another test without adding meaningful protection.

## Debugging Artifact

Examples include tests whose meaningful assertions are commented out or tests clearly created only during investigation.

## Missing

Meaningful production behavior exists without adequate regression protection.

## Contradictory

Tests encode behavior that directly conflicts with the current conceptual contract.

Contradictory tests should be changed deliberately, not silently deleted.

---

# CURRENT TEST BASELINE

The previously established baseline was approximately:

> **199 passing tests**

This is a historical behavioral baseline.

It should be used to detect unintended regression.

The goal is not necessarily to preserve exactly 199 tests forever.

The goal is to preserve the behavior those tests meaningfully protect.

---

# PHASE 1 TEST GAPS

The following behaviors should receive explicit regression protection where not already covered:

- Identity eligibility excludes insufficient-data Identities from ranking
- Identity weighted scoring remains intact
- Identity normalization remains distinct from Trait normalization
- derived Identity traits remain intact
- Identity contribution breakdown remains intact
- Designation ranking remains intact
- Designation primary selection remains deterministic
- Observation evidence remains intact
- recommendation-bias metadata remains intact
- empty intelligence collections remain valid
- empty archive does not imply negative preference
- sparse archive does not create unjustified certainty
- deterministic ordering is preserved
- tie behavior is explicitly tested once policy is decided
- user-provided previously-consumed state survives persistence
- user-provided review survives persistence once the field is renamed
- API consumers continue receiving required intelligence fields during terminology changes

---

# FORENSIC AUDIT ARTIFACT

The full forensic audit should exist as a separate repository document.

Recommended filename:

`intelligence-forensic-audit.md`

Its purpose is to preserve the evidence and reasoning behind Phase 1.

The roadmap should remain concise enough to function as the project's source of truth.

The forensic audit should contain the detailed:

- Identity audit
- Designation audit
- Observation audit
- Finding audit
- Evidence audit
- confidence/strength audit
- archive-state audit
- ranking/tie audit
- API/downstream-consumer audit
- test inventory
- test-quality classification
- lost-behavior analysis
- Phase 1 recommendations
- deferred items

The audit should not be allowed to disappear into conversation history.

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

# PHASE 1 ORDER OF OPERATIONS

Before changing implementation:

1. Read the Intelligence Contract.
2. Read the Phase 1 Alignment plan.
3. Read the forensic audit.
4. Establish the current test baseline.
5. Map the affected implementation files.
6. Map affected API response models.
7. Map downstream consumers.
8. Identify tests protecting the affected behavior.
9. Make the smallest semantic change necessary.
10. Run the relevant tests.
11. Run the broader intelligence test suite.
12. Run the full regression suite.
13. Update documentation only after behavior is verified.
14. Record intentional behavior changes in the audit/roadmap where appropriate.

Do not make multiple conceptual changes simultaneously when doing so would make behavioral regressions difficult to attribute.

---

# EXPLICITLY DEFERRED ITEMS

The following should not be pulled into Phase 1 merely because the audit discovered them:

- Recommendation Engine redesign
- sophisticated recommendation ranking
- review NLP
- LLM-based review interpretation
- exact consumption counts
- advanced repeat-consumption modeling
- new metadata sources
- external metadata APIs
- large-scale library optimization
- import/export implementation
- Profile UI redesign
- React migration
- arbitrary new Identity taxonomy
- arbitrary new Designation taxonomy
- new scoring algorithms
- generalized Classification Confidence algorithms
- universal evidence schema
- universal threshold system

Discovery does not automatically imply implementation.

---

# THINGS TO TREAT AS UNRESOLVED UNTIL EVIDENCE EXISTS

Do not invent repository behavior or product policy for:

- exact minimum-entry thresholds where not already encoded
- exact Secondary Identity thresholds
- exact near-tie thresholds
- exact Classification Confidence formulas
- exact Finding confidence semantics
- exact recommendation weighting
- exact influence of reviews
- exact influence of previously-consumed status
- exact treatment of repeat consumption in scoring
- exact tie-breaking policy if the current implementation does not establish one

Use:

> **UNRESOLVED — requires implementation decision.**

when necessary.

---

# LOST-BEHAVIOR CHECKLIST

For every behavior discovered during audit:

- [ ] behavior discovered
- [ ] behavior traced to implementation
- [ ] behavior traced to tests where applicable
- [ ] behavior classified
- [ ] behavior preserved
- [ ] behavior intentionally changed
- [ ] behavior documented
- [ ] behavior covered by tests
- [ ] downstream consumers checked
- [ ] API impact checked
- [ ] deferred behavior recorded if not addressed

---

# MASTER CHANGE-SAFETY CHECKLIST

Before removing or substantially changing existing intelligence behavior:

- [ ] What behavior does the code currently provide?
- [ ] What test protects it?
- [ ] Is it a meaningful domain rule?
- [ ] Is it explicitly represented in the Intelligence Contract?
- [ ] Does the contract contradict it?
- [ ] Would removing it lose information?
- [ ] Is it duplicated elsewhere?
- [ ] Is it actually dead code?
- [ ] Does an API consumer depend on it?
- [ ] Does the frontend depend on it?
- [ ] Does Profile generation depend on it?
- [ ] Does Recommendation infrastructure depend on it?
- [ ] Does a fixture encode it?
- [ ] Does a regression test need to be added?
- [ ] Is the change Phase 1 scope?
- [ ] If not, has it been explicitly deferred?

---

# ONE-SENTENCE PROJECT DIRECTION

> **Media Tracker turns raw media scores and user-provided consumption data into measurable traits and genre signals, independently interprets those signals through observations, findings, designations, and curator identities, presents the resulting meaning through an Archive Profile, and eventually uses the measurable signals to recommend what should come next.**
