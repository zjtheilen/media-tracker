# Media Tracker — Master Roadmap & Source of Truth

**Authoritative branch:** `develop-3`
**Guiding principle:** **Evolution, not rewrite.**

---

# CURRENT PROJECT STATUS

Media Tracker is a personal media archive and taste-intelligence application.

The project currently has:

* a functioning media archive
* hybrid universal + media-specific scoring
* genre intelligence
* measurable traits
* Observation infrastructure
* Finding infrastructure
* Designation infrastructure
* Identity scoring infrastructure
* identity-derived traits
* identity contribution/explanation infrastructure
* Archive Profile backend infrastructure
* template-driven narrative infrastructure
* recommendation infrastructure/stub
* automated regression coverage

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

---

# CURRENT REGRESSION BASELINE

The current test suite has:

> **210 passing tests, 0 failures**

This is the current regression baseline for Phase 1.

Phase 1 changes should preserve these tests unless a behavior is **deliberately changed** as part of contract alignment.

Any intentional test change should be accompanied by:

1. an explicit reason
2. a corresponding contract/roadmap decision
3. replacement regression coverage where appropriate

The test count itself is not sacred.

The **behavior protected by meaningful tests** is what matters.

---

# PHASE 0 — CONCEPTUAL LOCK

## Status: COMPLETE

The Intelligence Contract v1 defines:

* Trait
* Genre Signal
* Observation
* Finding
* Designation
* Identity
* Evidence
* Signal Strength
* Data Sufficiency
* Classification Confidence
* Evidence Strength
* Narrative
* Recommendation Signals
* Recommendation Bias
* Archive Profile
* Analytics

The contract also locks:

* Observation vs Finding distinction
* Designation vs Identity distinction
* multiple Observations
* multiple Findings
* multiple internal Designations
* one Primary Designation on Profile
* multiple Identities internally
* one Primary Identity
* zero or more meaningful Secondary Identities
* Analytics vs Profile separation
* empty/sparse/established archive states
* explainability requirements
* evolution rather than rewrite

The conceptual audit recovered existing behavioral contracts that should be preserved unless they directly conflict with the contract.

Recovered behavior includes:

* Trait Signal Strength normalization
* separate Identity normalization semantics
* Identity weighted scoring
* derived Identity traits
* Identity minimum-entry eligibility
* Designation ranking
* primary selection
* Observation evidence
* Identity contribution breakdowns
* recommendation-bias metadata
* empty intelligence collections
* deterministic/intended ranking behavior
* API response structures relied upon by downstream consumers

Phase 0 is no longer an open-ended conceptual-design phase.

The forensic audit is complete.

The project should now move from **behavioral recovery** into **implementation alignment**.

---

# FORENSIC AUDIT — COMPLETION STATUS

## Status: COMPLETE

The repository was audited against:

1. the Intelligence Contract
2. the Phase 1 Alignment plan
3. the current implementation
4. the current test suite
5. API response models and downstream consumers

The audit specifically examined:

* Observations
* Findings
* Designations
* Identities
* Traits
* Genre intelligence
* Evidence
* Confidence/strength semantics
* archive-state behavior
* ranking and primary selection
* API/downstream contracts
* test coverage
* hidden behavioral contracts
* potentially lost behavior
* debugging/dead-code candidates

The purpose of the audit was to recover the project's **behavioral memory** before Phase 1 changes.

The audit's conclusion is:

> **The existing intelligence system contains meaningful behavior that must be evolved rather than replaced.**

Phase 1 must therefore be conservative.

---

# PHASE 1 — INTELLIGENCE ALIGNMENT

## Status: NEXT IMPLEMENTATION PHASE

### Goal

Bring the existing intelligence implementation into alignment with the locked conceptual model without rewriting working infrastructure.

The implementation should change only where:

* existing behavior directly contradicts the contract
* terminology creates meaningful semantic confusion
* an important hidden contract needs to become explicit
* deterministic behavior is currently under-specified
* regression protection is missing

---

# PHASE 1 — STEP 1

# Remove Stale Roadmap Assumptions

## Status: FIRST

The roadmap previously described Identity minimum-entry eligibility as an outstanding implementation task.

That is no longer correct.

The current implementation already excludes ineligible Identities:

```python

if entry_count < minimum_entries:
continue

```

The current test suite explicitly protects this behavior.

Examples:

```text

test_identity_is_ineligible_below_minimum_entries
test_identity_is_eligible_at_minimum_entries
test_identity_below_minimum_is_excluded_and_at_minimum_is_eligible
test_identity_below_minimum_entries_is_excluded
test_ineligible_identity_cannot_be_primary

```

Therefore:

### Classification

**PRESERVE**

### Decision

Do not rewrite Identity eligibility.

Do not create another eligibility layer.

Do not modify the existing minimum-entry behavior unless another contract conflict is discovered.

### Important recovered behavior

Identity eligibility is currently treated as a **hard gate**:

```text

entry_count < minimum_entries
↓
Identity excluded
↓
Identity cannot rank
↓
Identity cannot become primary

```

This is now an established behavioral contract.

Identity Eligibility — VERIFIED. Current implementation already excludes identities below their configured minimum_entries threshold before scoring/ranking. Existing regression tests protect below-threshold exclusion, exact-threshold eligibility, primary-identity exclusion, and empty-eligible behavior. No production change required. Preserve this behavior during subsequent Identity terminology/alignment work.

---

# PHASE 1 — STEP 2

# Confidence Terminology

## Status: NEXT

The current implementation uses `confidence` in several places where the underlying concept is not necessarily Classification Confidence.

The distinction established by the conceptual contract is:

| Concept                   | Meaning                                                |
| ------------------------- | ------------------------------------------------------ |
| Signal Strength           | How strongly a signal is expressed                     |
| Data Sufficiency          | Whether enough data exists                             |
| Classification Confidence | How clearly one candidate beats plausible alternatives |
| Evidence Strength         | How strongly evidence supports a conclusion            |

Current Identity behavior includes:

```python

def calculate_identity_confidence(identity, profile):

```
minimum_entries = identity.get("requirements", {}).get("minimum_entries", 0)

entry_count = profile.get("entryCount", 0)

if minimum_entries == 0:
    return 1

confidence = entry_count / minimum_entries

return min(round(confidence, 3), 1)
```

```

This calculation is fundamentally based on archive size relative to the Identity's minimum-entry requirement.

Therefore its current semantic meaning is closer to:

> **Data Sufficiency**

than:

> **Classification Confidence**

Designation and Observation systems may use `confidence` differently.

### Phase 1 rule

Do not invent new confidence algorithms merely to make terminology appear consistent.

First identify:

* current meaning
* consumers
* API exposure
* tests
* narrative usage

Then make the smallest terminology correction necessary.

### Current semantic mapping

| Current Field          | Current Meaning               | Contract Term                                        | Phase 1 Action          |
| ---------------------- | ----------------------------- | ---------------------------------------------------- | ----------------------- |
| Identity `confidence`  | Data sufficiency              | Data Sufficiency                                     | ALIGN terminology       |
| Designation confidence | Trait-derived signal strength | Signal Strength                                      | ALIGN terminology       |
| Observation confidence | Threshold-relative support    | Evidence/Signal Strength depending on implementation | CLARIFY                 |
| Finding confidence     | Not standardized              | Classification/Evidence semantics unresolved         | CLARIFY before changing |

### Important rule

A valid calculation with an inaccurate name is **not automatically a bad algorithm**.

Prefer:

> terminology correction first

over:

> algorithm replacement

---

# PHASE 1 — STEP 3

# Designation Alignment

## Status: AFTER CONFIDENCE SEMANTICS

Designations currently represent recognizable taste classifications.

Preserve:

* fixture/rule-driven definitions
* ranking
* primary selection
* traits
* genres
* recommendation-bias metadata

Designation scoring should continue to be treated as classification signal rather than automatically being treated as curator identity.

### Classification

**PRESERVE + ALIGN**

Preserve the existing machinery.

Align terminology and explanation with the Intelligence Contract where necessary.

Do not expand Designations into curator philosophy.

---

# PHASE 1 — STEP 4

# Identity / Designation Separation

## Status: AFTER DESIGNATION ALIGNMENT

The audit found overlap between existing Identity fixtures and existing Designations.

This overlap does **not** justify deleting the Identity system.

The conceptual distinction remains:

### Designation

> What recognizable taste classification fits this archive?

### Identity

> What kind of curator does this archive describe?

Identity should therefore evolve toward:

> **curator philosophy / curator synthesis**

rather than:

> **taste badge**

Do not make Identity another name for Designation.

Do not delete:

* Identity scoring
* Identity normalization
* weighted Identity scoring
* derived Identity traits
* contribution breakdowns
* Identity explanations
* Identity fixtures

These mechanisms represent existing behavioral infrastructure.

---

# PHASE 1 — STEP 5

# Investigate Ranking and Test Artifacts

## Status: AFTER SEMANTIC ALIGNMENT

The audit identified two areas that require investigation rather than automatic modification.

### 1. Ranking / tie behavior

Current Identity ranking uses:

```python

return sorted(
results,
key=lambda item: item["score"],
reverse=True,
)

```

The repository therefore explicitly sorts by score.

What remains to be determined:

* what happens when scores tie
* whether stable ordering is intentionally relied upon
* whether fixture/file ordering affects ties
* whether primary selection remains deterministic
* whether near-ties should be exposed as meaningful secondary candidates

Do not invent arbitrary thresholds.

### Classification

**CLARIFY / TEST GAP**

---

### 2. Debug test

The current test suite contains:

```python

def test_debug_identity_scores():
profile = load_profile_fixture("boundary_explorer_profile.json")

```
results = evaluate_identity_scores(profile)

# for result in results:
#     print(result["title"], result["score"])

#     for item in result["breakdown"]:
#         print(
#             " ",
#             item["trait"],
#             item["value"],
#             "=>",
#             item["contribution"],
#         )
```

```

This test currently has no assertions.

It should not automatically be deleted without investigation, but it provides no meaningful regression protection in its current state.

### Classification

**POSSIBLE DEAD CODE**

Investigate and either:

* convert it into meaningful regression coverage
* replace it with a more useful test
* remove it if it has no remaining purpose

---

# PHASE 1 — IDENTITY BEHAVIOR TO PRESERVE

The actual Identity implementation currently provides:

### Weighted scoring

Identity definitions contain weighted traits.

### Identity normalization

Identity trait values are normalized independently from ordinary Trait normalization.

### Derived traits

Identity scoring can consume derived signals including:

* experimental affinity
* genre diversity
* novelty
* analysis
* ambiguity
* reflection
* system design

### Media-specific signals

Identity scoring can consume media-specific averages.

### Contribution breakdown

Identity scoring records:

* trait
* value
* weight
* normalized value
* contribution

### Explanation

Identity explanations expose:

* score
* confidence/sufficiency signal
* breakdown
* top traits

### Recommendation bias

Identity fixtures may contain recommendation-bias metadata.

### Minimum-entry eligibility

Identity scoring excludes identities below their required minimum archive size.

All of these are established behavior unless explicitly changed later.

---

# PHASE 1 — FINDINGS VS OBSERVATIONS

## Status: ALIGNMENT REQUIRED

Every Finding must provide meaningful additional interpretation.

Operational test:

> If replacing the Finding with its underlying Observation or raw signal loses no meaningful information, it is probably not functioning as a Finding.

Preserve useful existing Findings.

Do not automatically delete overlapping Findings.

Where practical, strengthen Finding evidence so the interpretive step is visible.

The goal is:

```text

RAW SIGNAL
↓
OBSERVATION
↓
INTERPRETATION
↓
FINDING

```

but this is a conceptual distinction, not a mandatory runtime pipeline.

---

# PHASE 1 — SECONDARY IDENTITIES

## Status: CLARIFY

The contract permits:

* one Primary Identity
* zero or more meaningful Secondary Identities

Do not surface every Identity with a nonzero score.

Meaningful secondary identities should eventually consider:

* eligibility/data sufficiency
* signal strength
* relationship to the primary
* meaningful separation from competitors

Numeric thresholds remain an implementation decision.

Do not invent arbitrary thresholds before examining actual score distributions.

---

# PHASE 1 — ARCHIVE STATE BEHAVIOR

## Status: CLARIFY

The intelligence layer must distinguish:

### EMPTY

No meaningful archive evidence exists.

### SPARSE

Some evidence exists, but insufficient evidence exists for some intelligence systems.

### ESTABLISHED

Enough evidence exists for the relevant intelligence systems to make their classifications.

The critical conceptual rule is:

> **Insufficient evidence must remain visibly different from a negative preference.**

Subsystems may have different minimum-data requirements.

Identity already demonstrates this principle through `minimum_entries`.

Do not force every intelligence subsystem to share one universal threshold.

If a threshold cannot be established from current behavior or tests:

> **UNRESOLVED — requires implementation decision.**

---

# PHASE 1 — RANKING / PRIMARY SELECTION

## Status: CLARIFY

Document actual ranking behavior before changing it.

For each ranking system determine:

* sort key
* precision
* tie behavior
* stable ordering
* primary selection
* close-competitor behavior

Do not invent arbitrary tie-breaking rules merely for architectural neatness.

The primary selection system should remain deterministic.

---

# PHASE 1 — REGRESSION PROTECTION

## Status: ONGOING

The current baseline is:

> **210 passing tests, 0 failures**

Protect recovered behavior including:

* Trait normalization
* Identity normalization
* derived Identity traits
* Identity minimum-entry eligibility
* Identity primary selection
* Designation ranking
* Designation primary selection
* Observation evidence
* Identity contribution breakdown
* recommendation-bias metadata
* empty intelligence collections
* API response shape
* deterministic ordering where already established

When Phase 1 intentionally changes behavior:

1. update the conceptual/roadmap decision
2. update the affected test
3. add replacement regression coverage where appropriate
4. run the full suite
5. record the resulting test count

---

# PHASE 1 — NON-GOALS

Do not use Phase 1 to:

* redo scoring
* redo scoring rubrics
* replace Observation architecture
* replace fixture-driven Designations
* replace fixture-driven Identity scoring
* redesign Recommendations
* build Profile UI
* implement pagination
* implement import/export
* expand metadata
* migrate to React
* replace deterministic intelligence with opaque AI
* create arbitrary new classifications
* build a universal evidence schema
* invent arbitrary confidence thresholds
* invent arbitrary secondary-Identity thresholds

Phase 1 is an **alignment phase**, not a redesign phase.

---

# FUTURE USER-INPUT INTELLIGENCE

## Status: FUTURE — PRESERVE AS PRODUCT DIRECTION

A major product principle recovered during the audit is:

> **Any information explicitly entered by the user should eventually be considered potential intelligence input.**

This includes, but is not limited to:

* scores
* genres
* media type
* notes/reviews
* previously-consumed status
* future metadata fields
* other explicitly user-entered signals

The existence of a field does **not** mean it must immediately affect scoring.

It means the architecture should avoid treating user-entered information as permanently irrelevant to intelligence.

---

# PREVIOUSLY-CONSUMED MEDIA

## Status: FUTURE FEATURE

Every media record should eventually have a simple binary indicator allowing the user to say:

> **I have consumed this before.**

This should be separate from whether the record is newly being added to the archive.

The user may be recording an item for the first time even though it is not their first time consuming it.

A future `watch_count` / `read_count` / `play_count` style system may be useful, but a mandatory count could create unnecessary bookkeeping.

Therefore the preferred initial concept is:

```text

previously_consumed = true / false

```

with counts remaining a possible future enhancement.

### Intelligence principle

The previously-consumed signal should eventually be available as algorithmic input.

Potential future uses include:

* familiarity
* novelty
* rewatch/replay behavior
* comfort-media behavior
* recommendation interpretation
* preference persistence
* distinction between first-exposure reactions and established preferences

Do not invent scoring behavior for it during Phase 1.

---

# REVIEWS / NOTES

## Status: FUTURE FEATURE

The current new-entry `notes` field should eventually become:

> **Review**

The Review remains optional.

The intended evolution is:

```text

OPTIONAL USER REVIEW
↓
STORED WITH MEDIA RECORD
↓
FUTURE NLP / TEXTUAL SIGNAL EXTRACTION
↓
TRAITS / OBSERVATIONS / FINDINGS / RECOMMENDATION SIGNALS

```

The review should eventually become intelligence fodder alongside structured user-entered signals.

However:

> **Do not build opaque AI interpretation merely because the field exists.**

First establish the data model and preserve the review as user-authored content.

---

# PHASE 2 — ARCHIVE PROFILE UI

## Status: AFTER PHASE 1

Build the dedicated Profile experience.

Profile should present:

* Primary Designation
* designation explanation
* Primary Identity
* meaningful Secondary Identities
* Identity data sufficiency where appropriate
* Identity contribution breakdown
* Traits
* Genre Signals
* Observations
* Observation evidence
* Findings
* Finding evidence
* Narrative

Analytics remains separate.

Analytics answers:

> **What do the numbers say?**

Profile answers:

> **What does the archive mean?**

---

# PHASE 3 — REAL RECOMMENDATION ENGINE

## Status: FUTURE

The current Recommendation Engine is infrastructure/stub work.

Conceptually:

```text

generate_recommendations(...)
↓
collect signals
↓
recommendations = [...]

```

The eventual engine should consume measurable archive signals including:

* Trait Strength
* Genre Affinity
* scoring preferences
* universal scoring
* media-specific scoring
* Designation recommendation bias
* soft Observation signals
* soft Finding signals
* future user-input signals where meaningful

Identity should influence recommendations primarily through underlying measurable signals rather than becoming a direct opaque recommendation score.

The Recommendation Engine should eventually explain:

> **Why was this recommended?**

---

# PHASE 4 — RECOMMENDATIONS SURFACE

## Status: FUTURE

After the Recommendation Engine is functional, expose recommendations through a dedicated user-facing surface.

The surface should make recommendation reasoning inspectable rather than presenting recommendations as unexplained outputs.

---

# PHASE 5 — LIBRARY SCALE

## Status: FUTURE

Implement:

* pagination
* stable ordering
* server-side sorting
* server-side filtering where useful
* large-archive testing

Scale improvements should preserve existing intelligence semantics.

---

# PHASE 6 — IMPORT / EXPORT

## Status: FUTURE

Prioritize:

* JSON export
* JSON import
* schema versioning
* validation
* duplicate handling
* migration compatibility
* backup/restore

CSV can remain later.

---

# PHASE 7 — METADATA EXPANSION

## Status: FUTURE

Potential metadata:

* author
* director
* developer
* publisher/studio
* release year
* runtime
* platform
* covers/posters
* ISBN
* external IDs

Metadata should enrich intelligence rather than replace it.

Metadata should not be treated as a substitute for the user's own reactions and preferences.

---

# PHASE 8 — POLISH / ACCESSIBILITY / STABILITY

## Status: FUTURE

Includes:

* Profile polish
* Analytics polish
* Library polish
* Reports polish
* navigation
* forms
* keyboard navigation
* semantic markup
* labels
* contrast
* focus states
* screen-reader testing
* edge cases
* sparse/partial data
* large archives
* documentation

---

# PHASE 9 — RELEASE

## Status: FUTURE

Release requirements include:

* stable test suite
* no known critical bugs
* migration strategy
* backup strategy
* import/export
* documentation
* accessibility review
* deployment plan
* release build
* versioning
* changelog

---

# PHASE 10 — REACT MIGRATION

## Status: FUTURE — DO NOT TOUCH YET

React migration should occur only after:

* intelligence is stable
* Profile is stable
* recommendations work
* library scale works
* import/export works
* the application is genuinely usable

React is an implementation evolution, not an escape from unfinished product work.

---

# THINGS WE MUST NOT ACCIDENTALLY REBUILD

Do not redo:

* scoring
* scoring rubrics
* CRUD
* generated Reports / Lists
* Archive infrastructure
* Observation evidence
* Identity scoring machinery
* Designation machinery
* existing derived-trait machinery

Do not merge:

* Findings with Observations
* Designations with Identity
* Analytics with Profile
* Signal Strength with Data Sufficiency
* Data Sufficiency with Classification Confidence
* Evidence Strength with Signal Strength

Do not make:

* Identity a Designation clone
* Identity a direct recommendation score
* narrative a new intelligence engine
* user reviews an automatic opaque AI authority
* previously-consumed status a mandatory watch/read/play counter

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

# INTELLIGENCE PRINCIPLES

## 1. Evidence before interpretation

Prefer measurable signals over unsupported conclusions.

## 2. Insufficient evidence is not negative evidence

A sparse archive should not accidentally produce confident negative classifications.

## 3. Preserve behavioral memory

Existing tests and implementations may encode meaningful domain rules even when the conceptual contract does not explicitly mention them.

## 4. Evolution, not rewrite

Working infrastructure should be aligned rather than replaced.

## 5. Explainability matters

Important intelligence outputs should be traceable to underlying signals.

## 6. Parallel perspectives

Observations, Findings, Designations, and Identities are different analytical perspectives over shared data.

## 7. Identity is synthesis

Identity should describe curator philosophy rather than merely repeat taste classifications.

## 8. Recommendations consume signals

Recommendations should use measurable signals rather than bypassing the intelligence layer.

## 9. User input is potential intelligence

Structured and unstructured information supplied by the user should remain available for future analytics and intelligence.

## 10. Don't invent precision

Thresholds, confidence values, tie rules, and classifications should be grounded in repository behavior and actual data distributions.

---

# CURRENT PHASE 1 WORK QUEUE

The forensic audit is complete.

The implementation queue is now:

1. **Update stale roadmap assumptions**

   * Identity minimum-entry eligibility is already implemented.
   * Mark it PRESERVE rather than an outstanding implementation task.

2. **Resolve confidence terminology**

   * identify consumers
   * distinguish Data Sufficiency from Signal Strength
   * avoid unnecessary algorithm changes

3. **Align Designation terminology/explanation**

   * preserve scoring machinery
   * preserve ranking and primary selection

4. **Clarify Identity / Designation separation**

   * preserve Identity machinery
   * document Identity as curator synthesis

5. **Clarify Findings vs Observations**

   * preserve useful Findings
   * identify genuine interpretive value

6. **Clarify Secondary Identity presentation**

   * preserve internal multiple-Identity scoring
   * define meaningfulness before exposing secondaries

7. **Clarify ranking/tie behavior**

   * document actual behavior
   * add deterministic regression protection where needed

8. **Review suspicious/debug tests**

   * investigate `test_debug_identity_scores`
   * investigate any tests whose assertions conflict with current eligibility semantics

9. **Run the complete regression suite**

   * preserve the 210-green baseline except for intentional changes

10. **Only then move to Archive Profile UI**

---

# EXPLICITLY DEFERRED

The following should remain outside Phase 1 unless a concrete dependency forces them earlier:

* Review/NLP intelligence
* previously-consumed intelligence
* watch/read/play counts
* recommendation-engine implementation
* recommendation UI
* Archive Profile UI
* pagination
* import/export
* metadata expansion
* large-archive optimization
* React migration
* advanced classification algorithms
* automated semantic interpretation of reviews
* broad AI-based recommendation systems

These are product directions, not Phase 1 alignment requirements.

---

# CURRENT PRIORITY ORDER

1. **Clean up and lock the Phase 1 roadmap**
2. **Resolve confidence terminology**
3. **Align Designation terminology/explanation**
4. **Clarify Identity / Designation separation**
5. **Clarify Findings vs Observations**
6. **Clarify Secondary Identity presentation**
7. **Clarify ranking / tie behavior**
8. **Investigate debug/dead-code test candidates**
9. **Run and preserve regression coverage**
10. **Build dedicated Archive Profile UI**
11. **Build Recommendation Engine**
12. **Add Recommendations surface**
13. **Library pagination / scale**
14. **Import / Export**
15. **Metadata expansion**
16. **Polish / accessibility / stability / documentation**
17. **Release**
18. **React migration**

---

# ONE-SENTENCE PROJECT DIRECTION

> **Media Tracker turns raw media scores and other user-provided signals into measurable traits and genre signals, independently interprets those signals through observations, findings, designations, and curator identities, presents the resulting meaning through an Archive Profile, and eventually uses those measurable signals to recommend what should come next.**
