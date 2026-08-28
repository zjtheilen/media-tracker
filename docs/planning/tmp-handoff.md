# MEDIA TRACKER / WASABI — FULL PROJECT HANDOFF FOR CONTINUATION

You are taking over an ongoing software project called **Media Tracker**, currently being developed on the authoritative Git branch **`develop-3`**.

The project is a personal media library and taste-intelligence platform. It is a real software project, not merely a documentation exercise. The immediate objective is to get the project back into active implementation and move it toward **v1.0**.

## VERY IMPORTANT OPERATING INSTRUCTION

**Do NOT turn this project into an endless forensic-audit exercise.**

A substantial amount of work has already been spent untangling the intelligence architecture, terminology, legacy code, duplicated concepts, and planning-document drift.

That work was useful, but it has now reached the point of diminishing returns.

The next assistant must:

1. Read the current planning documents in `docs/planning/`.
2. Treat already-resolved decisions as resolved.
3. Do not reopen resolved questions unless there is **new contradictory repository evidence**.
4. Do not create new "forensic passes" merely because some terminology is imperfect.
5. Do not invent additional audits when the roadmap already identifies an actionable next step.
6. Prefer implementation, tests, UX work, API work, documentation completion, and release preparation over investigation.
7. When something is ambiguous, make the smallest reasonable investigation needed to unblock implementation.
8. Once an investigation answers its question, **lock the decision and move on**.
9. Remember that many names in this project are conceptual placeholders rather than evidence that the underlying algorithm is wrong.
10. Do not redesign working formulas simply because a variable/function name sounds imperfect.
11. Do not add abstractions, fields, confidence systems, or generalized intelligence concepts merely because they seem theoretically elegant.
12. Keep the system aligned with the actual product purpose: a personal media archive that produces useful, interpretable, explainable intelligence about the user's taste.

The goal is to reach **v1.0**, not to produce the world's most thoroughly audited unfinished application.

---

# 1. CURRENT PROJECT IDENTITY

The repository is:

`zjtheilen/media-tracker`

Authoritative branch:

`develop-3`

The project is called:

**Media Tracker**

The intelligence subsystem has the internal name:

**WASABI**

WASABI stands for:

**Weighted Archive System for Analysis & Behavioral Insights**

The README/docs now contain a WASABI ASCII header. The ASCII art spells **WASABI**.

The project uses:

* Python
* FastAPI
* SQLite
* JavaScript
* HTML/CSS
* REST APIs
* Plotly / frontend visualization
* Git
* Linux/dev tooling
* pytest
* frontend/browser tooling where appropriate

The project is essentially a personal media tracking / rating / analysis system.

The user's media archive contains media entries and ratings. The application transforms those observations into progressively higher-level interpretations.

---

# 2. THE MOST IMPORTANT CONCEPTUAL MODEL

The system has several intelligence layers.

These are **parallel outputs**.

This is extremely important:

> **Findings, Observations, Designations, Identities, and Narrative are parallel intelligence products.**

They do **not** form a chain where one consumes the output of another.

Do NOT assume:

Finding → Observation → Designation → Identity → Narrative

That is NOT the intended architecture.

Instead, think conceptually:

```text
                         MEDIA ARCHIVE
                              |
             +----------------+----------------+
             |                |                |
             v                v                v
          FINDINGS       OBSERVATIONS      DESIGNATIONS
             |                |                |
             |                |                |
             +----------------+----------------+
                              |
             +----------------+----------------+
             |                                 |
             v                                 v
          IDENTITIES                       NARRATIVE
```

That diagram is conceptual rather than a literal implementation diagram. The exact engines and data flow should be verified from the repository when needed, but the **semantic rule is that these intelligence categories are parallel**, not hierarchical consumers of one another.

This matters because earlier forensic work repeatedly risked accidentally interpreting one intelligence layer as evidence for another.

Don't do that.

A Finding is not an input to an Observation merely because the Finding discusses similar traits.

An Observation is not an input to a Designation merely because it may be related to that Designation.

A Designation is not an input to an Identity merely because an Identity sounds like a collection of Designations.

Narrative is not supposed to become a hidden aggregation layer that consumes every other intelligence product unless the actual implementation explicitly says so.

Each engine should primarily derive its interpretation from the underlying archive/profile data and its own rules.

---

# 3. GENERAL ARCHITECTURAL PRINCIPLE: NAMES ARE OFTEN PLACEHOLDERS

Another critical lesson from the forensic work:

> **Do not assume that a field/function name represents its mathematically precise semantic meaning.**

Many names in this project were created while the system was evolving.

Examples include:

* `confidence`
* `designationConfidence`
* `score`
* `data_sufficiency`
* `genreDiversityScore`
* various "affinity" / "preference" terminology
* "classification" terminology
* older frontend intelligence helpers

The correct process is:

1. Determine what the code actually calculates.
2. Determine what the product concept actually needs.
3. Determine whether the current calculation is useful.
4. Determine whether the name is misleading.
5. If the calculation is sound but the name is imperfect, prefer **terminology clarification** over rewriting the algorithm.
6. Only change an algorithm if the algorithm itself is semantically wrong for the intended product behavior.

A bad name is not automatically a bad formula.

A formula being different from what the name initially suggests is not automatically a bug.

A historical function name is not proof that a feature is active.

A field appearing in old planning documents is not proof that the current API exposes it.

This distinction has saved us from unnecessary rewrites.

---

# 4. WHAT THE FORENSIC WORK ACTUALLY ACCOMPLISHED

A lot of work has already happened.

The important thing is that the project is **not stuck**.

We have resolved a number of questions that initially looked like implementation problems but turned out to be terminology drift, dead legacy code, duplicated rules, or documentation drift.

The next assistant should consider the following decisions established unless new repository evidence contradicts them.

---

# 5. DESIGNATION CONFIDENCE / SIGNAL STRENGTH

The project previously had a field:

`designationConfidence`

Forensic tracing established that this is **not statistical confidence**.

It does not mean:

* probability that a Designation is correct
* statistical certainty
* Bayesian probability
* classification accuracy
* probability of correctness

It is better understood as:

> **aggregate strength of the classification basis**

or conceptually:

> **Signal Strength**

The existing calculation was considered valid and should be preserved.

The decision was:

**RESOLVED / PRESERVE**

No replacement confidence algorithm is required.

The remaining work is terminology/presentation alignment only, subject to normal consumer verification.

Do not reopen this.

---

# 6. LEGACY FRONTEND `generateClassificationBasis()`

There was previously a frontend helper in `charts.js`:

`generateClassificationBasis()`

Forensic tracing established that it was not part of the active authoritative production path.

It duplicated backend behavior.

It was legacy frontend intelligence.

It was removed from `charts.js`.

The backend remains authoritative for:

`classificationBasis`

The current frontend can still consume/display the backend-produced `archiveProfile.classificationBasis`, but it no longer generates its own duplicate version.

This was a real implementation correction, not merely a documentation change.

The important lesson:

> The frontend should not independently recreate authoritative intelligence calculations that already belong to the backend.

The helper was dead/legacy duplication and is now gone.

Do not reintroduce it.

---

# 7. `classificationBasis` ITSELF

The backend still generates:

`archive_profile["classificationBasis"]`

through the backend classification helper.

Current backend path includes:

`models/services/archive_classification.py`

and:

`models/services/archive_engine.py`

Tests protect the behavior.

The frontend still renders the backend-produced classification basis.

This is not the same thing as the removed frontend `generateClassificationBasis()` helper.

The distinction is:

```text
backend:
    generate_classification_basis(...)
          |
          v
    archiveProfile.classificationBasis
          |
          v
frontend renders it
```

NOT:

```text
frontend:
    independently regenerate classificationBasis
```

---

# 8. OBSERVATION CONFIDENCE

Observation `confidence` was investigated.

It is an active backend calculation.

Its correct interpretation is:

> **threshold-relative evidence strength**

More specifically:

Each Observation rule has a threshold for its supporting metric.

The confidence value represents how strongly the metric reaches that threshold, capped at `1.0`.

Conceptually:

```text
observed value / threshold
```

with the resulting value constrained appropriately.

It is NOT:

* statistical confidence
* probability
* probability that the Observation is objectively correct
* generalized classification confidence

The preferred conceptual vocabulary is:

**Evidence Strength**

The calculation is preserved.

Dedicated tests protect the behavior, including:

* proportional values below threshold
* threshold saturation at `1.0`
* rounding
* zero-threshold handling

Consumer tracing found no frontend dependency requiring a rename.

Decision:

**RESOLVED / PRESERVE**

Do not invent a new Observation confidence formula.

Do not turn this into another investigation.

---

# 9. FINDING CONFIDENCE

Findings currently do not have a confidence calculation.

Finding evaluation is binary:

```text
rule predicate satisfied
    -> Finding emitted

rule predicate not satisfied
    -> no Finding
```

Finding output contains explicit evidence describing why the rule fired.

There is no active Finding `confidence` field that needs to be preserved.

Therefore:

> **Do not add Finding confidence during Phase 1.**

A future graded Finding-strength model would be a separate product/semantic decision.

Decision:

**RESOLVED / DO NOT ADD**

Do not invent a confidence algorithm merely to make the architecture look more symmetrical.

---

# 10. IDENTITY: SCORE VS DATA SUFFICIENCY

This was one of the most recent investigations.

There are two distinct Identity concepts:

## Identity `score`

This represents:

> **strength of the archive's trait alignment with the selected Identity**

It comes from the Identity's trait/scoring breakdown.

It is about **how strongly the archive resembles the Identity**.

## Identity `data_sufficiency`

This represents:

> **whether the archive contains enough entries, relative to the Identity's minimum-data requirement, for that Identity interpretation to be sufficiently supported**

It is about **sample/archive volume**, not trait alignment.

The sufficiency calculation is based on entry count relative to a minimum-entry requirement, capped at `1.0`.

Conceptually:

```text
entryCount / minimum_entries
```

capped at `1.0`.

Therefore:

```text
Identity
├── score
│   └── strength of trait alignment
│
└── data_sufficiency
    └── adequacy of archive volume
```

These are legitimately different dimensions.

Do NOT consolidate them.

Do NOT rename `score` into `confidence`.

Do NOT restore a second Identity `confidence` field.

---

# 11. STALE IDENTITY `confidence` TERMINOLOGY

Some older planning documents used:

`Identity confidence`

to describe what is now:

`data_sufficiency`

The current implementation does not expose an Identity `confidence` field.

This was documentation drift.

The correct current model is:

* Identity `score`
* Identity `data_sufficiency`

The former `confidence` terminology has been retired.

Planning documents have been updated to describe this.

Do not treat remaining mentions inside the forensic audit as evidence that the field still exists. The audit intentionally retains historical terminology where appropriate to explain what was investigated.

The important rule is:

> Current-state docs must not claim that Identity exposes a `confidence` field.

---

# 12. `systems-affinity` VS `systems-preference`

This was another major forensic thread.

There was an Observation:

`systems-affinity`

in:

`models/services/observation_rules.py`

It is based on:

`gameplay_mechanics`

and uses genres such as:

* strategy
* simulation
* game

It describes a systems-oriented relationship to mechanics/interactions/structured experiences.

There was also a Finding:

`systems-preference`

in:

`models/services/finding_rules.py`

The two were found to be behaviorally overlapping enough that maintaining both as separate concepts without a semantic distinction was questionable.

The user explicitly established the correct decision principle:

> If the logic behind both is identical, only one should remain. If the names suggest concepts different enough to both remain, then the logic must be updated to reflect that distinction.

The actual code change made:

**`systems-preference` was removed from `finding_rules.py`.**

That was intentional consolidation.

`systems-affinity` remains as the active Observation concept.

Do not resurrect `systems-preference` merely because an old planning document still mentions it.

The planning documents should reflect the consolidation.

The semantic distinction is now:

```text
systems-affinity
    = active Observation
    = evidence/interpretation about affinity with systems/mechanics
```

There is no need for a duplicate Finding with nearly identical logic.

---

# 13. FRONTEND OBSERVATIONS

The frontend currently retrieves the archive profile and reads:

`archiveProfile.observations || []`

It renders observations from the backend response.

It does not appear to calculate Observation confidence itself.

This supports the broader architectural rule:

> Backend intelligence calculations should be authoritative; frontend code should primarily present/render them.

The frontend also reads:

* `archiveProfile.findings`
* `archiveProfile.observations`
* `archiveProfile.archiveSummary`
* `archiveProfile.observationSummary`
* `archiveProfile.designationConfidenceLabel`
* classification basis
* other archive profile fields

This is useful when determining whether an API change has a frontend blast radius.

---

# 14. TEST BASELINE

At the point of the recent work, the complete test suite was:

**219 passed**

Recent specific tests included:

```text
pytest tests/designations/test_observations.py -q
19 passed
```

and:

```text
pytest -q
219 passed
```

There was initially a misleading test path issue where:

`tests/archive/test_archive_engine.py`

was attempted, but the actual test lived at:

`tests/services/test_archive_engine.py`

The correct command was:

```powershell
pytest tests/services/test_archive_engine.py tests/services/test_archive_endpoint.py tests/designations/test_profile_utils.py -q
```

which passed:

**19 passed**

The full suite then passed:

**219 passed**

The test suite is therefore currently healthy based on the last verified run.

Do not run huge exploratory test sweeps without a reason.

When changing a specific engine, run its focused tests first, then the full suite when the change is ready.

---

# 15. IMPORTANT TESTING PHILOSOPHY

Tests should protect **semantic behavior**, not merely current names.

Good tests answer things like:

* Does the calculation saturate at the intended boundary?
* Does the rule fire at the intended threshold?
* Does evidence contain the expected metric?
* Does data sufficiency reflect archive size?
* Does the Identity score reflect trait alignment?
* Does an Observation remain independent of another intelligence layer?
* Does the API expose the intended field?
* Does the frontend render the backend-produced data?

Avoid tests that merely cement obsolete terminology.

If we intentionally rename a concept, tests should follow the new contract.

---

# 16. ARCHIVE ENGINE / PROFILE

The archive engine is a central composition point.

It builds the archive profile and attaches intelligence-related data.

Relevant backend path:

`models/services/archive_engine.py`

It currently attaches:

`classificationBasis`

using:

`generate_classification_basis(...)`

The archive profile also contains intelligence outputs such as:

* primary designation
* secondary designation
* genre signature
* designation confidence / signal strength
* observations
* findings
* narrative/summary-related content
* classification basis

The archive engine is an important place to understand **composition**, but do not assume it means the intelligence categories are semantically dependent on each other.

Composition in one response object does not imply semantic consumption.

---

# 17. OBSERVATION ENGINE

Relevant paths include:

`models/services/observation_rules.py`

and supporting utilities such as:

`models/services/observation_mapper.py`

`models/services/observation_utils.py`

Observations are rule-driven interpretations of archive/profile signals.

An Observation generally contains things such as:

* `id`
* `title`
* `description`
* `category`
* `confidence`
* `evidence`
* `genres`
* `relatedDesignations`

Again, Observation `confidence` is better conceptualized as:

**Evidence Strength**

and is threshold-relative.

Observations are independent intelligence products.

---

# 18. FINDING ENGINE

Relevant path:

`models/services/finding_rules.py`

Findings are rule-triggered interpretations.

They are binary.

A rule either fires or does not.

Findings include explicit evidence.

Do not add confidence.

Do not make Findings secretly consume Observations.

Do not treat Findings as a lower/higher tier of intelligence than Observations.

They are parallel products.

---

# 19. IDENTITY ENGINE

Relevant paths:

`models/services/identity_engine.py`

`models/services/identity_explainer.py`

`models/services/identity_data_sufficiency.py`

Identity logic is based on trait alignment and data adequacy.

Identity score:

* trait alignment

Identity data sufficiency:

* archive volume relative to minimum entries

The Identity explainer provides the scoring breakdown.

Identity data sufficiency is separately calculated.

Do not conflate the two.

---

# 20. EVIDENCE UTILITIES

Relevant path:

`models/services/evidence_utils.py`

There is a helper:

`metric_evidence(metric, label, value, unit="score")`

It produces:

```python
{
    "metric": metric,
    "label": label,
    "value": value,
    "unit": unit,
    "type": "metric",
}
```

This is part of the evidence architecture.

Evidence is important because many intelligence outputs are intentionally explainable.

Rather than adding generic confidence fields, the system often communicates support through explicit evidence.

This is intentional.

---

# 21. FRONTEND LEGACY INTELLIGENCE

`charts.js` contains a mixture of:

* legitimate rendering/UI logic
* older frontend intelligence code
* potentially stale helper functions

The forensic work already removed:

`generateClassificationBasis()`

Do not assume every suspicious-looking frontend function needs another forensic investigation.

When encountering legacy code:

1. Determine whether it is actually invoked.
2. Determine whether the backend now provides the authoritative result.
3. If dead and clearly duplicated, remove it.
4. If active rendering logic, preserve it.
5. If ambiguous, perform the smallest targeted trace necessary.

Do not recursively audit every frontend function.

---

# 22. `genreDiversityScore`

This was investigated earlier.

There was a question:

> Was `genreDiversityScore` deliberately retired in favor of Identity's `genre_diversity`, or is it accidentally disconnected?

The broader lesson from that investigation is that similarly named fields/functions are not automatically separate features.

The active architecture should prefer the authoritative backend implementation.

Do not recreate old frontend calculations merely because an older name exists.

If this issue is already marked resolved in the current planning docs, treat it as resolved.

---

# 23. THE PROJECT'S GENERAL INTELLIGENCE PHILOSOPHY

The intelligence system is not intended to be a mathematically "perfect" AI classifier.

It is a **personal taste-analysis system**.

Its purpose is:

* useful interpretation
* understandable evidence
* stable rules
* meaningful distinctions
* explainability
* consistent behavior
* useful presentation

It is not trying to claim scientific certainty about the user.

Therefore terms such as:

* confidence
* score
* affinity
* preference
* classification
* strength

should be interpreted in context.

The product should communicate what the data supports without pretending to provide statistical certainty it does not actually have.

---

# 24. CURRENT FORENSIC-AUDIT POLICY

The planning docs now explicitly state that:

> The forensic audit is complete.

Any future forensic work must be limited to:

* a specific unresolved question
* an implementation-gating issue
* a concrete contradiction
* a test gap
* a documented clarification
* an explicit deferral

A forensic pass must result in something actionable.

Forensic work should NOT reopen already-resolved decisions without contradictory repository evidence.

This rule exists specifically because the project spent too much time looping through investigations.

Honor it.

---

# 25. PLANNING DOCUMENTS

The main planning documents are under:

`docs/planning/`

Important files include:

* `roadmap.md`
* `intelligence-contract.md`
* `intelligence-forensic-audit.md`
* `phase-1-decision-and-implementation-map.md`
* `phase-1-intelligence-alignment.md`
* `phase-1-terminology-and-api-rename-map.md`
* `frontend-terminology-alignment.md`
* `forgotten-features-register.md`

These documents contain historical forensic information as well as current decisions.

When reading them:

### Do not assume every unresolved-looking sentence is still unresolved.

Some sections are historical audit questions.

Always distinguish:

```text
historical question
vs
current locked decision
vs
actual remaining work
```

The **Decision & Implementation Map** and **Roadmap** are especially important for determining what is actually next.

---

# 26. ROADMAP / V1.0

The overall project roadmap is broader than the forensic cleanup.

The project must continue toward v1.0.

Do not lose sight of the entire roadmap just because the recent conversation focused on intelligence terminology.

The existing project roadmap includes the major phases around:

* core library
* analytics
* auto-generated lists
* frontend refactor
* polish
* testing/stability
* release

The earlier project state was approximately:

### Phase 1 — Core Library

Complete.

### Phase 2 — Analytics

Complete.

### Phase 3 — Auto-Generated Lists

Complete.

### Phase 4 — Frontend Refactor

Mostly complete / substantially complete.

### Phase 5 — Polish

Current/near-current focus.

This includes things such as:

* UX improvements
* accessibility
* API configuration cleanup
* documentation
* terminology alignment
* intelligence presentation
* removing legacy frontend duplication

### Phase 6 — Testing & Stability

Next major engineering phase after polish.

This should include:

* regression protection
* focused tests for intelligence engines
* API contract testing
* frontend behavior where appropriate
* stability cleanup
* edge cases
* integration behavior

### Phase 7 — Release

Final release preparation.

This includes:

* release readiness
* documentation
* configuration
* deployment/runtime sanity
* cleanup
* versioning
* final regression
* v1.0 packaging

The exact current checklist/status should be read from `docs/planning/roadmap.md` because that is the authoritative roadmap.

Do not invent a replacement roadmap.

---

# 27. PHASE 1 IS NOT "FOREVER"

The current project has spent a long time in Phase 1 forensic/terminology cleanup.

The purpose of Phase 1 was to establish the conceptual contract.

It was NOT intended to become an indefinite phase where every field is repeatedly audited.

We now have enough locked decisions that implementation can proceed.

If the roadmap says a forensic item is complete, believe it.

If a terminology issue is resolved, don't reopen it because the word is imperfect.

If a formula is preserved, don't redesign it.

---

# 28. HOW TO APPROACH THE NEXT WORK

When taking over, follow this process:

## Step A — Read the planning docs

Start with:

1. `docs/planning/roadmap.md`
2. `docs/planning/phase-1-decision-and-implementation-map.md`
3. `docs/planning/intelligence-contract.md`
4. `docs/planning/phase-1-intelligence-alignment.md`
5. `docs/planning/phase-1-terminology-and-api-rename-map.md`

Read the forensic audit as needed for historical context.

Do not start by auditing the entire repository.

## Step B — Determine the actual next unchecked item

Look for:

* unresolved
* deferred
* implementation-required
* Phase 5 work
* testing/stability work
* frontend/API work
* release blockers

Pick the **next actual actionable item**.

## Step C — Only investigate if needed

If the next task is an implementation task, implement it.

If it requires understanding existing behavior, inspect only the relevant files.

Do not run giant repository-wide greps unless the specific task requires one.

## Step D — Test

Run focused tests.

Then run:

```powershell
pytest -q
```

when the change is ready.

## Step E — Update docs

Only update planning docs when a decision or roadmap state actually changes.

Do not generate documentation churn for its own sake.

## Step F — Commit

Use a clear conventional-style commit message.

## Step G — Move on

Do not spend another 20 turns verifying the same conclusion.

---

# 29. WHEN TO USE FORENSIC ANALYSIS

Use forensic tracing only when there is an actual uncertainty such as:

> "Is this code active?"

> "Does this API field still exist?"

> "Are these two calculations actually different?"

> "Is this frontend helper authoritative or duplicate?"

> "Does this feature still have a consumer?"

> "Will changing this field break the API?"

Those are good forensic questions.

Bad forensic questions are things like:

> "Could this variable name theoretically mean something else?"

> "Could we invent a better confidence formula?"

> "Should this concept maybe have another layer?"

> "Could there be some hidden consumer even though every trace says there isn't?"

Do not chase hypotheticals without evidence.

---

# 30. USER'S PREFERRED DECISION STYLE

The user wants direct, practical decisions.

If something is good:

Say it is good.

If something is wrong:

Say exactly what is wrong.

If a decision is clear:

Lock it.

If a thing is ambiguous:

Explain the ambiguity and what minimum evidence is needed.

If an item is resolved:

Move on.

Do not continually hedge resolved conclusions.

The user explicitly wants to get the project **back on track**.

---

# 31. USER'S CORE PRODUCT DIRECTION

The application is intended to track media consumption and produce useful taste intelligence.

The user wants the system to remain understandable and maintainable.

The user is comfortable with rule-based intelligence.

The user values:

* meaningful names
* explainable evidence
* useful analytics
* clean backend architecture
* reasonable frontend presentation
* tests that protect behavior
* a coherent API
* a finished product

They do NOT want theoretical overengineering.

---

# 32. IMPORTANT DISTINCTION: EVIDENCE VS SUFFICIENCY

A recurring conceptual distinction in the system is:

### Evidence Strength

"How strongly does the available metric/evidence support this interpretation?"

### Data Sufficiency

"Do we have enough underlying data to make this interpretation meaningful?"

These are not the same thing.

For example:

```text
10 entries
strong trait signal
```

could mean:

```text
high evidence strength
low data sufficiency
```

Likewise:

```text
200 entries
weak trait signal
```

could mean:

```text
high data sufficiency
weak evidence strength
```

Do not collapse those dimensions.

This distinction applies particularly to:

* Identity
* Observation
* Designation

and helps explain why the project does not need one universal "confidence" metric.

---

# 33. WHY THERE IS NO UNIVERSAL CONFIDENCE

The project does not need one universal:

`confidence`

formula.

Different intelligence products answer different questions.

For example:

```text
Observation confidence
    -> threshold-relative Evidence Strength

Designation confidence
    -> aggregate Signal Strength

Identity data_sufficiency
    -> archive volume adequacy

Identity score
    -> trait alignment strength

Finding
    -> binary rule activation + explicit evidence
```

These are intentionally different.

Do not force them into one generalized confidence framework.

---

# 34. API PRINCIPLE

The API should represent the actual current contract.

If a field does not exist in the current implementation:

Do not document it as current.

If a field exists:

Document what it actually means.

If an old field name has been retired:

Document the migration/terminology history where appropriate, but don't pretend it remains active.

Frontend consumers should be traced before changing public API fields.

---

# 35. FRONTEND PRINCIPLE

The frontend should consume authoritative backend intelligence.

It should:

* render
* format
* visualize
* present

It should not independently reproduce intelligence algorithms unless there is a deliberate reason.

This was why `generateClassificationBasis()` was removed.

The backend owns the calculation.

---

# 36. TEST LOCATION LESSON

The repository's tests aren't always organized exactly as their conceptual engine names might suggest.

For example:

The archive engine test is:

`tests/services/test_archive_engine.py`

not:

`tests/archive/test_archive_engine.py`

So don't invent test paths based on intuition.

Use repository structure.

---

# 37. CURRENT TESTING COMMANDS

Focused examples:

```powershell
pytest tests/designations/test_observations.py -q
```

```powershell
pytest tests/services/test_archive_engine.py tests/services/test_archive_endpoint.py -q
```

Full regression:

```powershell
pytest -q
```

Repository hygiene:

```powershell
git diff --check
```

Useful targeted searches:

```powershell
git grep -n "term"
```

or scoped:

```powershell
git grep -n "term" -- models tests docs/planning
```

Again, do not run giant searches just because they are possible.

---

# 38. COMMIT/PUSH WORKFLOW

The user is working locally in:

`develop-3`

Typical process:

1. Make code/docs change.
2. Run focused tests.
3. Run full suite.
4. `git diff --check`
5. Review `git diff`
6. Commit.
7. Push.
8. Assistant can verify remote `develop-3` if asked.

When the user says:

> "committed and pushed"

assume the change is now on the remote unless verification is specifically requested.

Do not make them prove it repeatedly.

---

# 39. DOCUMENTATION STYLE

Planning documents are intentionally detailed.

However, documentation should record:

* decisions
* semantics
* implementation consequences
* remaining work

It should not become an endless transcript of every investigative thought.

For resolved forensic questions, prefer concise closure statements such as:

```text
RESOLVED / PRESERVE
```

or:

```text
RESOLVED / DO NOT ADD
```

or:

```text
RESOLVED / DOCUMENTATION CORRECTION
```

The forensic audit can preserve historical reasoning, but current planning should make the final decision obvious.

---

# 40. IMPORTANT CURRENT STATE OF DOCUMENTATION

Recent documentation changes have established/recorded:

* designation confidence = aggregate signal strength
* Observation confidence = threshold-relative evidence strength
* Finding confidence = do not add
* Identity former confidence terminology = retired/reconciled as data_sufficiency
* Identity score and data_sufficiency = separate concepts
* `generateClassificationBasis()` frontend helper = removed/dead legacy duplication
* `systems-preference` Finding = removed in favor of the active `systems-affinity` Observation concept
* forensic audit = complete except for genuinely unresolved implementation-gating questions
* roadmap should not reopen completed forensic decisions

Before changing documentation, inspect the current remote `develop-3` versions because the user may have committed additional updates since this handoff.

---

# 41. IMPORTANT: VERIFY CURRENT DOCS BEFORE EDITING THEM

The previous chat reached a point where the user had just committed/pushed documentation updates.

The new assistant should therefore:

1. Fetch current `develop-3` planning docs.
2. Verify the latest state.
3. Avoid blindly applying edits from this handoff if the docs already contain them.
4. Treat the remote branch as authoritative for current state.

Do not tell the user to paste enormous diffs if the GitHub integration can inspect the repository.

---

# 42. WHAT NOT TO DO

Do NOT:

* restart Phase 1 from scratch
* re-audit all intelligence engines
* invent a universal confidence model
* resurrect removed legacy frontend functions
* resurrect `systems-preference`
* create duplicate Intelligence layers
* assume Findings consume Observations
* assume Observations consume Designations
* assume Designations consume Identities
* assume Narrative consumes every other intelligence layer
* rename fields merely because they sound imperfect
* redesign preserved formulas without contradictory evidence
* add tests for nonexistent concepts
* create a documentation section for every tiny observation
* run huge grep searches without a specific question
* keep investigating after the question is answered
* confuse historical audit text with current implementation
* treat stale terminology as proof of stale code
* treat a suspicious name as proof of a bug
* turn this project into an academic taxonomy exercise

---

# 43. WHAT TO DO

DO:

* read the roadmap
* identify the next actual work item
* implement it
* add/adjust focused tests
* run regression
* update docs when appropriate
* commit
* push
* continue

If the next roadmap item is clear, **say what it is and start doing it**.

---

# 44. OVERALL V1.0 MINDSET

The project is not trying to be perfect before release.

It needs to be:

* coherent
* stable
* understandable
* tested
* usable
* maintainable
* documented enough
* ready for v1.0

The correct strategy now is:

```text
UNTANGLE
   ↓
LOCK DECISIONS
   ↓
IMPLEMENT
   ↓
TEST
   ↓
POLISH
   ↓
STABILIZE
   ↓
RELEASE
```

We have already done a large amount of the **UNTANGLE** and **LOCK DECISIONS** work.

We need to spend much more time in:

```text
IMPLEMENT
TEST
POLISH
STABILIZE
RELEASE
```

---

# 45. CURRENT IMMEDIATE HANDOFF

At the end of the previous chat, the user had just completed documentation updates concerning:

**Identity score vs Identity data sufficiency**

The user asked for a remote verification of the docs after pushing.

That verification was interrupted because the conversation hit the message limit.

Therefore, the new assistant's first practical task should be:

### Step 1

Inspect current `develop-3` planning docs and verify that the Identity terminology resolution is correctly represented.

Specifically verify:

* Identity `confidence` is treated as retired/stale terminology.
* Current Identity concepts are `score` and `data_sufficiency`.
* `score` means trait-alignment strength.
* `data_sufficiency` means archive-volume adequacy.
* They remain separate.
* No current-state document falsely claims an Identity `confidence` API field exists.
* No duplicate locked statements exist.
* Historical audit references to "Identity confidence" are acceptable where they explicitly describe the former/historical concept.
* The roadmap does not reopen the issue.

If docs are correct:

**Say so and move on.**

Do not create another forensic investigation.

If docs have a minor wording inconsistency:

**Identify the exact line/section and give the smallest correction.**

Do not redesign the documents.

---

# 46. AFTER THAT VERIFICATION

Once Identity terminology is verified, immediately determine:

> **What is the next genuinely unresolved/actionable roadmap item?**

Use:

`docs/planning/roadmap.md`

and:

`docs/planning/phase-1-decision-and-implementation-map.md`

Do not infer a new item from old forensic history.

Find the next item that actually requires work.

Then tell the user:

```text
Next unresolved item:
[ITEM]

Why it matters:
[SHORT EXPLANATION]

What we'll do:
[CONCRETE IMPLEMENTATION PLAN]

Tests:
[FOCUSED TESTS]

Docs:
[WHETHER DOCS NEED UPDATING]
```

Then proceed with the work.

---

# 47. FINAL REMINDER ABOUT THE USER'S FRUSTRATION

The user is explicitly tired of spending entire conversations auditing the same system.

That frustration is justified.

The previous conversation spent a disproportionate amount of time:

* searching the repository
* tracing fields
* checking names
* reconciling planning documents
* repeatedly verifying already-resolved concepts

The outcome was valuable because we found real issues:

* frontend/backend classification duplication
* stale confidence terminology
* duplicate systems-preference logic
* incorrect assumptions about confidence semantics
* documentation drift

But those decisions are now largely settled.

The next assistant must not repeat that cycle.

The rule should be:

> **Investigate only enough to make the next implementation decision. Then implement it.**

If a question is answered, close it.

If a formula is sound, preserve it.

If a name is imperfect, document the meaning.

If a legacy helper is dead and duplicated, remove it.

If a concept is redundant, consolidate it.

If a concept is genuinely distinct, preserve it.

If a roadmap item is ready to implement, implement it.

---

# 48. THE CORE MENTAL MODEL TO KEEP IN YOUR HEAD

Think of the project as a series of independent interpreters looking at the same underlying archive:

```text
                         +------------------+
                         |   MEDIA ARCHIVE  |
                         +------------------+
                           /   /   |   \   \
                          /   /    |    \   \
                         v   v     v     v   v

                    +---------+ +---------+ +-------------+
                    | FINDING | |OBSERVE.  | | DESIGNATION |
                    +---------+ +---------+ +-------------+
                         |           |            |
                         |           |            |
                         |           |            |
                         v           v            v

                    +---------+ +----------------------+
                    | IDENTITY| |      NARRATIVE       |
                    +---------+ +----------------------+
```

Again, the exact implementation may compose these into an API response, but **semantic independence is the key principle**.

Each engine asks a different question.

### Findings

"What rule-triggered interpretation is supported by this archive?"

### Observations

"What recurring or notable pattern is visible in the archive?"

### Designations

"What classification/designation best describes the archive based on its signals?"

### Identities

"What broader trait profile/identity best fits the archive, and is there enough data to make that interpretation meaningful?"

### Narrative

"How can the archive's characteristics be expressed as a coherent human-readable interpretation?"

These can all coexist without consuming each other.

---

# 49. THE OTHER CORE MENTAL MODEL

Think of numeric fields as dimensions, not universal truth scores.

For example:

```text
Identity score
    = trait alignment

Identity data sufficiency
    = archive volume adequacy

Observation confidence
    = threshold-relative evidence strength

Designation confidence
    = aggregate classification signal strength

Finding
    = binary activation + explicit evidence
```

No universal "confidence" formula is required.

---

# 50. THE PROJECT'S REAL GOAL

The project should eventually feel like a polished personal tool where the user can:

* record media
* rate media
* inspect statistics
* understand patterns
* generate lists
* see meaningful designations
* inspect observations
* inspect findings
* understand identities
* read narrative interpretations
* trust that the system is explainable
* use the frontend without encountering legacy duplication
* rely on a stable backend API
* run a healthy test suite
* eventually release v1.0

That is the destination.

The forensic work is a means to that end.

**It is not the product.**

Now let's finish the product.
