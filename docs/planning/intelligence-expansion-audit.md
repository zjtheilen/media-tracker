```
__    __  ___     ___  ___   ____  ___
\ \/\/ / / O \   _\\  / O \  | D ) | |
 \_/\_/O/_/ \_\O/__/O/_/ \_\O|_D_)O|_|O
WEIGHTED ARCHIVE SYSTEM for ANALYSIS & BEHAVIORAL INSIGHTS

A media tracking, rating, and analytics app by Zachary Theilen
```

# Intelligence Expansion Audit

## Status

**Investigation complete — conceptual decisions pending**

This document records the current state of WASABI's archive intelligence system and identifies evidence, signal relationships, semantic boundaries, architectural findings, and conceptual gaps that may inform future expansion.

This is an **audit and investigation document**, not an implementation plan.

No new Designations, Identities, Observations, Findings, or Recommendation behaviors should be added solely because this document identifies an opportunity. Future changes require an explicit conceptual decision supported by the archive evidence and the system's intended semantics.

### Governing principle

> The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.

The process for future intelligence work is:

**Investigate → document → make explicit conceptual decisions → implement → test → update documentation**

---

# 1. Current Intelligence Pipeline

For a non-empty archive, `build_archive_profile()` currently constructs the profile in this execution order:

1. Archive statistics
2. Archive traits
3. Profile metrics
4. Designations
5. Identities
6. Observations
7. Findings
8. Narrative

The layers operate on an accumulated `archive_profile`.

The execution order therefore **does not represent a strict conceptual dependency chain**. Most intelligence layers independently evaluate archive-level evidence that has already been accumulated in the profile.

The current structure is better understood as:

```text
Raw entries
    │
    ├─→ Archive statistics
    │
    ├─→ Archive traits
    │
    └─→ Profile metrics
             │
             ├─→ Designations
             ├─→ Identities
             ├─→ Observations
             └─→ Findings
                    │
                    └─→ Identity Finding
```

Narrative then synthesizes selected outputs from these systems into human-readable archive interpretation.

The important distinction is:

**Conceptual hierarchy and implementation execution order are not the same thing.**

Observations do not currently feed Findings.

Findings do not currently feed Designations or Identities.

Designations do not currently consume Findings or Observations.

Identity is independently evaluated from archive evidence, while an Identity-derived Finding depends on the resulting Identity as an explanatory representation.

The empty archive is handled separately and does not attempt to manufacture intelligence from absent evidence.

---

# 2. Current Evidence Available to the Intelligence System

Each archive entry currently provides evidence including:

* title
* media type
* genres
* universal scores
* media-specific scores
* notes
* date consumed
* completion status
* total score

The archive-level profile currently derives or produces several different categories of information.

### Derived archive evidence

* entry count
* universal score averages
* media-specific score averages
* media distribution
* genre distribution
* average archive score
* highest-rated entry
* lowest-rated entry
* top universal score categories
* top media-specific score categories
* genre affinity
* genre combinations
* genre diversity
* derived traits

### Intelligence outputs

* designation signals
* Designations
* Identity signals
* Identities
* Observations
* Findings
* Narrative interpretations

These categories should remain conceptually distinct.

A derived measurement is not automatically an intelligence conclusion, and an intelligence output should not be treated as raw evidence.

Not all available entry-level evidence is currently consumed by the intelligence layers.

---

# 3. Current Traits

The archive trait system currently includes measurable score-derived traits such as:

* average score strength
* originality strength
* depth strength
* craft strength
* engagement strength
* emotional strength
* presentation strength
* gameplay strength
* atmosphere strength
* world-building strength
* pacing strength

The core trait-strength transformation is:

```text
min(max((value - 6) / 4, 0), 1)
```

This means values at or below 6 contribute no trait strength, while 10 represents full strength.

Genre-presence signals also exist for selected genres, including:

* experimental
* surreal
* science fiction
* psychological
* horror

These signals are separate from the later Identity-derived traits.

The current trait vocabulary should be understood primarily as an **evidence vocabulary**. The existence of a trait does not imply that the trait must become a Designation, Finding, Identity, or Recommendation concept.

---

# 4. Current Derived Identity Traits

The Identity system has a separate derived-trait layer.

Currently implemented derived traits are:

* `experimental_affinity`
* `genre_diversity`
* `novelty`
* `analysis`
* `ambiguity`
* `reflection`
* `system_design`

These are resolved only when an Identity references them.

### Current usage

| Derived trait           | Current Identity usage                     |
| ----------------------- | ------------------------------------------ |
| `genre_diversity`       | Breadth Philosophy, Exploratory Philosophy |
| `experimental_affinity` | Exploratory Philosophy                     |
| `novelty`               | Exploratory Philosophy                     |
| `reflection`            | Interpretive Philosophy                    |
| `ambiguity`             | Interpretive Philosophy                    |
| `analysis`              | Interpretive Philosophy                    |
| `system_design`         | None                                       |

Six of the seven derived traits are calculated exclusively from `genreDistribution`.

`system_design` is the exception. It is calculated from the archive's `gameplay_mechanics` average.

`system_design` is therefore a real, implemented signal rather than a hypothetical future concept, but no current Identity consumes it.

The derived-trait layer also contains an important semantic limitation: several traits represent **genre-derived proxies rather than direct behavioral evidence**.

For example, `analysis` is derived from psychological and mystery genre prevalence. It therefore describes the composition of the archive rather than directly establishing that the user consciously analyzes media.

---

# 5. Current Identity System

Identity definitions are data-driven JSON fixtures rather than hardcoded Identity classes.

The current catalog contains three Identities:

* Breadth Philosophy
* Exploratory Philosophy
* Interpretive Philosophy

## Breadth Philosophy

Minimum archive size: 15 entries.

Uses:

* `genre_diversity` — 100%

## Exploratory Philosophy

Minimum archive size: 20 entries.

Uses:

* originality — 35%
* genre diversity — 25%
* depth — 15%
* experimental affinity — 15%
* novelty — 10%

## Interpretive Philosophy

Minimum archive size: 20 entries.

Uses:

* depth — 45%
* emotional impact — 25%
* reflection — 12%
* ambiguity — 10%
* analysis — 8%

Identity scoring normalizes each resolved signal to 0–1, multiplies it by its configured weight, and sums the contributions.

Primary Identity is the highest-scoring eligible Identity.

Exact-score ties are resolved using lexicographic comparison of the contribution vectors.

A secondary Identity is selected when it is different from the primary and has a score of at least `0.60`.

Identity therefore currently provides more sophisticated candidate resolution than Designation, including eligibility, weighted scoring, tie resolution, secondary selection, explanation, and data-sufficiency reporting.

### Identity data sufficiency

Current `data_sufficiency` is calculated from:

```text
entry_count / identity.minimum_entries
```

with the result capped at 1.

This is a measure of archive quantity relative to an Identity's minimum requirement.

It should **not** be interpreted as a general measure of evidence quality.

For example, an archive with 20 entries and an archive with 200 entries can both receive a sufficiency value of `1.0` for an Identity whose minimum is 20.

Eligibility, data sufficiency, and evidence quality are therefore separate concepts:

* **Eligibility** — whether the minimum archive size has been met.
* **Data sufficiency** — how much the archive exceeds or approaches that minimum.
* **Evidence quality** — how representative, independent, behaviorally grounded, or otherwise convincing the available evidence is.

The current system explicitly measures the first two but does not provide a general evidence-quality metric.

---

# 6. Current Observations

The current Observation system contains six explicit rules:

1. Boundary Preference
2. Systems Affinity
3. Interpretive Depth
4. Atmospheric Focus
5. Emotional Resonance
6. Craft Appreciation

Observations are deterministic, evidence-oriented, and can coexist.

They currently use combinations of score thresholds and genre prevalence.

Important distinction:

**Observation metadata does not necessarily represent the conditions that trigger the Observation.**

For example, Boundary Preference contains several genre references in its metadata, but its actual evaluation condition uses originality plus experimental or surreal prevalence.

Observation evidence strength can also be based on fewer signals than the rule's full evaluation condition.

The `atmospheric-focus` rule is particularly notable because its trigger is:

* art atmosphere ≥ 8.5 **OR**
* surreal prevalence ≥ 20%

while its evidence payload includes both atmosphere and surreal evidence regardless of which condition actually triggered the rule.

This means the evidence payload can be broader than the minimum evidence required for activation.

Observation descriptions also frequently use language such as "consistently." Current evidence is primarily archive-level averages and prevalence measurements, which establish aggregate strength or representation but do not necessarily establish statistical consistency across entries.

Future consistency claims would be better supported by additional evidence such as score distributions or variance.

Observations should therefore remain understood as **independent evidence-backed patterns**, not mutually exclusive classifications.

---

# 7. Current Findings

There are four explicit Finding rules:

1. Concept Driven
2. Engagement Priority
3. Speculative Interest
4. Atmospheric Interest

There is also a separate Identity-derived Finding mechanism.

The explicit rules currently use:

* originality + depth
* engagement
* science-fiction prevalence
* atmosphere/surreal prevalence

`concept-driven` is genuinely synthetic because it combines multiple independent score dimensions.

The other explicit Findings are largely single-signal threshold interpretations.

Most notably, `atmospheric-interest` currently duplicates the trigger and underlying evidence of the `atmospheric-focus` Observation.

Findings do not currently consume Observations.

They independently evaluate archive evidence.

The Finding layer should therefore currently be understood as a **parallel interpretation layer**, rather than a computational stage that necessarily operates on Observations.

There is currently no general Finding-ranking system comparable to Designation or Identity ranking.

### Identity-derived Finding

The Identity-derived Finding mechanism takes an already-generated Identity and converts its explanation into a Finding-like presentation.

This is conceptually different from the explicit Finding rules:

* explicit Findings independently discover patterns from archive evidence;
* Identity Findings explain an already-established Identity.

This distinction should be preserved unless a future conceptual decision determines otherwise.

---

# 8. Current Designations

The current Designation catalog contains four definitions:

* Boundary Explorer
* Curator
* Engagement Architect
* Deep Diver

Each produces a score on a 0–100 scale.

## Boundary Explorer

Uses:

* boundary prevalence
* sustained boundary exploration
* media-type breadth
* originality

This is structurally more complex than the other Designations.

Its "sustained" evidence means repeated representation within the archive.

It does **not** currently mean temporal persistence because timestamps are not used in that calculation.

The entry-based implementation can also establish exact qualifying entry counts and media-type breadth. A distribution-only fallback can establish prevalence but cannot reconstruct media-type breadth.

## Engagement Architect

Uses:

* engagement strength
* craft strength
* gameplay strength
* pacing strength

## Deep Diver

Uses:

* depth strength
* emotional strength
* average score strength
* psychological genre affinity

## Curator

Uses:

* craft strength
* presentation strength
* archive size
* genre diversity

The primary Designation is the highest-scoring result.

Designations are therefore evaluated independently and are not mutually exclusive.

There is currently no minimum Designation score required for a primary Designation.

Exact-score ties therefore inherit the evaluator's deterministic rule order through the use of `max()`.

This differs from Identity, which has explicit eligibility, tie handling, and secondary selection.

The Designation system already demonstrates that different Designations can use substantially different evidence structures.

### Designation signal strength and confidence

The system also calculates a value currently referred to as Designation confidence.

The underlying calculation is:

```text
(primary trait strength
 + secondary trait strength
 + media trait strength) / 3
```

This is more accurately understood as an **average signal strength** than as statistical or classification confidence.

It does not measure:

* how decisively one Designation beats another,
* how much evidence independently supports the Designation,
* archive size,
* evidence quality,
* or probability that the classification is correct.

This distinction should be preserved as a conceptual question rather than silently changed during the audit.

---

# 9. Existing Profile Metrics

The current profile-metric layer contains one explicit metric:

`genreDiversityScore`

It is calculated as:

```text
min(number of represented genres / 10, 1)
```

This is distinct from the Identity-derived `genre_diversity` signal.

The two signals are based on the same underlying archive fact but use different transformations and serve different consumers.

`genre_diversity` reaches its normalized maximum after five represented genres because its underlying calculation is `number of genres × 2`.

`genreDiversityScore` reaches its maximum after ten represented genres.

This relationship should not automatically be treated as a bug or refactoring opportunity. It is currently an unresolved conceptual question.

---

# 10. Genre Intelligence

Two additional genre-level signals are calculated.

## Genre Affinity

`genreAffinity` converts each genre percentage into a 0–1 value.

For example:

```text
35% → 0.35
```

This is primarily a normalized representation of existing genre distribution rather than independent new evidence.

It is available in the archive profile and contributes to some existing intelligence logic, including the psychological genre-affinity component of Deep Diver.

## Genre Combinations

`genreCombinations` identifies pairs of genres that occur together on entries.

Each genre pair is:

1. normalized into a deterministic sorted pair,
2. counted across entries,
3. divided by total archive entries,
4. rounded to two decimal places.

For example, if 4 of 10 entries contain both Horror and Psychological:

```text
horror+psychological → 0.40
```

Unlike `genreAffinity`, this represents genuinely relational evidence that is not present in the individual genre percentages alone.

Its current use by higher-level intelligence is limited.

Genre combinations should therefore be preserved conceptually as a potentially useful evidence source, without assuming that every recurring combination requires a new intelligence category.

---

# 11. Existing but Underused Evidence

The following evidence or derived signals already exist but are either lightly consumed, narrowly consumed, or not currently represented broadly in the intelligence vocabulary.

## Genre combinations

`genreCombinations` captures recurring genre pairings.

This is additional relational evidence that could potentially support future observations or findings about recurring combinations, hybridization, or meaningful genre intersections.

No such interpretation should be added until its intended meaning is explicitly defined.

## System design

`system_design` is calculated directly from game `gameplay_mechanics` but is not currently consumed by any Identity.

This demonstrates that the system already contains a construction/system-oriented signal without currently making a corresponding higher-level conceptual claim about the archive.

## Media-specific scoring dimensions

Many media-specific score dimensions are available in `mediaAverages`, while current Designations and Identities use only a subset.

Unused dimensions should be treated as available evidence, not automatically as missing intelligence concepts.

The existence of an evaluative dimension does not imply that it represents a stable archive preference or higher-order orientation.

## Genre affinity

The profile contains normalized genre-affinity information for genres beyond the handful explicitly referenced by current rules.

Because this is largely another representation of genre prevalence, it should not automatically be treated as a new source of independent evidence.

## Media distribution

The profile knows how the archive is distributed across media types.

This is used in some Designation logic but is not deeply represented in the broader Identity vocabulary.

This may become useful for future cross-media interpretation, but media concentration alone does not establish why that distribution exists.

---

# 12. Signals That Currently Overlap or Deserve Conceptual Review

## Experimental Affinity and Novelty

`experimental_affinity` and `novelty` currently use the same underlying experimental-genre percentage and produce mathematically identical values.

Exploratory Philosophy assigns them separate weights:

* experimental affinity: 15%
* novelty: 10%

Therefore 25% of the current Exploratory Philosophy score is derived from the same underlying signal.

This may be intentional, accidental, or an unfinished conceptual distinction.

It should be treated as an explicit conceptual question rather than silently corrected.

---

## Genre Diversity

The system currently contains multiple genre-diversity representations:

* `genreDiversityScore`
* `genre_diversity`
* `genreDistribution`

They all originate from the archive's represented genres but have different transformations and consumers.

The important unresolved question is whether these represent genuinely different concepts or independent implementations of essentially the same concept.

No consolidation should occur without a semantic decision.

---

## Genre prevalence representations

The system also contains several representations of the same basic genre-prevalence evidence:

* `genreDistribution`
* `genreAffinity`
* `genre_presence`
* `genre_strength`

These differ primarily in representation or scaling.

`genre_presence` and `genre_affinity` are mathematically equivalent representations of prevalence.

`genre_strength` scales prevalence into a 0–100 value and currently appears to have no higher-level consumer.

These should not automatically be deleted or consolidated during the audit, but their conceptual roles should be clarified before future intelligence expansion relies on them.

---

## Atmospheric Focus and Atmospheric Interest

The `atmospheric-focus` Observation and `atmospheric-interest` Finding currently have effectively the same trigger:

* art atmosphere ≥ 8.5 **OR**
* surreal prevalence ≥ 20%

Their evidence and descriptions are also substantially overlapping.

This is the clearest current example of two intelligence outputs representing nearly the same interpretation at different layers.

The system should not retain the distinction merely because the labels belong to different categories.

However, the correct response is a conceptual decision about whether they represent genuinely different semantic roles, not an automatic deletion.

---

## Genre-derived Interpretive Signals

Several Identity signals are currently proxies derived from genre prevalence:

* analysis
* ambiguity
* reflection
* experimental affinity
* novelty
* genre diversity

For example, `analysis` is currently derived from psychological + mystery genre prevalence.

Therefore an Interpretive Philosophy score does not directly establish that the user consciously analyzes media.

It establishes that the archive contains a prevalence of genres associated with analytical interpretation.

Similarly, `reflection` and `ambiguity` represent genre-derived proxies rather than direct observations of user behavior or intent.

This distinction should remain explicit in future naming, explanation, and narrative work.

---

## Shared evidence across layers

The same underlying evidence can legitimately contribute to multiple layers.

For example, depth may contribute to:

* an Observation,
* a Finding,
* a Designation,
* and an Identity.

This is not automatically double-counting because the layers may be answering different questions.

The problem arises if downstream systems later treat these correlated interpretations as independent evidence.

For example, a recommendation engine should not assume that four conclusions derived from the same depth score constitute four independent confirmations of a preference.

Future recommendation logic should therefore distinguish **multiple interpretations of evidence** from **independent evidence sources**.

---

# 13. Evidence That Could Be Derived but Currently Is Not

The underlying archive contains information from which additional signals could theoretically be calculated.

These include:

* temporal consumption patterns
* completion behavior
* dropped/in-progress/planned behavior
* score distributions
* score variance
* score tails
* relationships between completion status and scores
* relationships between media types and scoring behavior
* repeated consumption, if future data supports it
* richer temporal trends
* notes-based evidence
* more complex genre relationships
* repeated creators, franchises, or other recurring entities if future data supports them

These are **potential evidence sources**, not current intelligence signals.

The existence of underlying data must not be confused with the existence of an implemented interpretation.

The current intelligence system is therefore significantly richer in **available evaluative and archival data** than in **behaviorally grounded interpretation**.

---

# 14. Evidence Limitations

The current archive cannot reliably establish certain things without additional evidence.

Examples include:

* why a person chose a work
* whether variety was intentional
* whether experimentation represents deliberate exploration
* whether a work was abandoned because of dissatisfaction
* whether repeated engagement occurred outside the recorded archive
* external popularity or cultural significance
* comparisons against other users
* motivations behind individual scores
* private reasoning or intent
* true consistency of preferences when only aggregate averages are available
* temporal persistence when only repeated archive representation is available

Future intelligence should not make claims stronger than the available evidence permits.

In particular:

**Aggregate averages establish aggregate tendencies, not necessarily consistency.**

**Genre prevalence establishes archive composition, not necessarily conscious preference.**

**Genre-derived proxies establish associations within the archive, not direct psychological or behavioral facts.**

**Repeated representation establishes recurrence within the recorded archive, not necessarily temporal persistence or intentional behavior.**

---

# 15. Architectural Findings

The current architecture suggests that many forms of future intelligence expansion may be possible within the existing architecture.

Identity definitions are data-driven.

Observation, Finding, and Designation systems use explicit rule definitions.

The archive profile accumulates evidence before higher-level interpretations are generated.

Most intelligence layers independently consume archive-level evidence rather than depending on one another as a strict pipeline.

The Identity-derived Finding is an explicit exception because it depends on an already-established Identity for explanation.

This means future expansion does not necessarily require architectural redesign.

However, conceptual decisions may reveal areas where the architecture should evolve.

The primary current constraint appears to be **conceptual validity and evidence quality**, rather than the ability to technically represent additional categories.

A major architectural finding is therefore:

> WASABI currently has more evidence vocabulary than intelligence vocabulary.

It collects substantially more evaluative information than the current intelligence system interprets.

The next meaningful expansion is therefore not necessarily "more labels."

It may instead be **richer evidence interpretation**, particularly around behavioral and temporal evidence.

---

# 16. Dynamic Taxonomy Direction

The current four Designations and three Identities should not be treated as the final taxonomy of the system.

The intended direction is a system in which different archives can produce genuinely different combinations of:

* Observations
* Findings
* Designations
* Identities
* Narrative interpretations
* Recommendation signals

The number and type of conclusions should be determined by the evidence available in the archive rather than by a requirement that every archive produce the same fixed set.

However, dynamic output does not mean unconstrained generation.

Every conclusion still requires:

1. a defined concept,
2. identifiable evidence,
3. a defensible interpretation,
4. deterministic or otherwise explainable evaluation,
5. appropriate data sufficiency,
6. regression protection.

Dynamic taxonomy should therefore mean **evidence-driven variation**, not arbitrary label generation.

A conclusion should be allowed to be absent when its evidence is absent.

---

# 17. Conceptual Questions Requiring Decisions

The audit identifies questions, not answers.

## Identity vocabulary

* Are the current three Identities sufficient representations of meaningful archive orientations?
* What constitutes an Identity rather than a Designation or Finding?
* Should new Identities represent genuinely different orientations or simply unused scoring dimensions?
* How much behavioral evidence should be required before an Identity makes a stronger claim than a genre-derived proxy?

## Signal semantics

* Are `experimental_affinity` and `novelty` actually distinct concepts?
* Should `genreDiversityScore` and `genre_diversity` remain separate?
* Are `genreDistribution`, `genreAffinity`, `genre_presence`, and `genre_strength` sufficiently distinct to justify separate representations?
* Is genre prevalence an adequate proxy for concepts such as reflection, ambiguity, and analysis?
* Should genre-derived proxies be renamed to make their evidentiary limitations clearer?
* Does `system_design` represent a meaningful higher-level orientation?
* Should Designation "confidence" be renamed or conceptually redefined as signal strength?

## Observation and Finding semantics

* Should `atmospheric-focus` and `atmospheric-interest` remain separate?
* What distinguishes an Observation from a Finding when both independently evaluate the same archive evidence?
* Should Findings remain parallel interpretations, or should some Findings explicitly synthesize Observations?
* What should the Identity-derived Finding represent relative to independent Findings?

## Genre intelligence

* What should recurring genre combinations mean?
* When does a genre combination become evidence of a meaningful preference rather than an incidental pairing?
* Can genre affinity support richer conclusions without over-interpreting frequency?
* How much additional intelligence can genre composition reasonably provide before the system becomes overly genre-driven?

## Media-specific evidence

* Which unused media-specific dimensions represent meaningful archive-level tendencies?
* Should cross-media patterns become part of Identity evaluation?
* When does concentration in one media type constitute a meaningful orientation?
* Which dimensions represent work quality rather than user preference?

## Behavioral evidence

* Would completion status, temporal patterns, or score distributions provide meaningful evidence?
* If so, what claims could they legitimately support?
* Can behavioral evidence distinguish preference from simple archive composition?
* What minimum amount of behavioral data would make a behavioral conclusion defensible?

## Designation resolution

* Should every non-empty archive receive a primary Designation?
* Should a minimum score be required before a Designation can be presented?
* Should Designations support multiple strong classifications rather than always forcing one primary?
* How should exact ties and near-ties be represented?
* What should Designation signal strength communicate to users?

## Dynamic taxonomy

* What evidence threshold should permit a new conclusion to appear?
* Should some conclusions compete for a primary position while others coexist?
* How should near-ties be represented?
* How much explanation should accompany each conclusion?
* When should the correct output be "insufficient evidence" rather than a weak classification?

---

# 18. Guardrails for Future Expansion

Future intelligence work should follow these principles.

## Evidence before labels

Do not invent a label and then search for metrics that can justify it.

Start with meaningful evidence and determine whether it supports a useful concept.

## Concepts before implementation

A new signal should have a defined semantic purpose before code is written.

## No manufactured intelligence

If the archive cannot support a conclusion, the system should omit it or explicitly represent insufficient evidence.

## Preserve explainability

A user should be able to understand why a conclusion appeared.

## Avoid double-counting

Signals derived from the same underlying evidence should not be treated as independent without a deliberate conceptual reason.

Multiple interpretations can share evidence, but downstream systems should not mistake correlated interpretations for independent confirmations.

## Preserve distinctions

Different layers should retain their semantic roles:

* Observations = evidence-backed recurring patterns
* Findings = interpreted patterns
* Designations = broader behavioral or structural classifications
* Identities = broader recurring orientations
* Narrative = human-readable synthesis
* Recommendation signals = actionable preference information

These definitions are conceptual roles, not permission to force every future output into a fixed taxonomy.

## Calibrate language to evidence

Narrative language should not imply stronger evidence than the underlying measurements support.

In particular:

* averages should not automatically be described as consistency;
* genre prevalence should not automatically be described as conscious preference;
* genre-derived proxies should not automatically be described as direct psychological behavior;
* repeated archive representation should not automatically be described as temporal persistence;
* signal strength should not automatically be described as classification confidence.

## Evolution, not rewrite

Existing working behavior should be preserved unless an explicit conceptual decision justifies changing it.

## Evidence gaps are valid outcomes

An unavailable intelligence concept is preferable to an unsupported inference.

---

# 19. Current Audit Conclusion

The current intelligence system is substantially more developed than a simple collection of hard-coded labels.

It has:

* layered evidence processing,
* explicit rule systems,
* data-driven Identity definitions,
* derived signals,
* archive-level genre intelligence,
* deterministic ranking,
* data-sufficiency handling,
* explainability,
* and an emerging separation between evidence and interpretation.

The cross-layer audit also shows that the architecture is fundamentally more **parallel than sequential**.

Most intelligence systems independently interpret accumulated archive evidence.

Identity-derived Finding is the clearest current dependency in which one intelligence output is explicitly used to explain another.

The audit identifies several areas where the system's conceptual vocabulary has not yet fully caught up with the evidence it already calculates.

The most significant findings are:

1. **WASABI currently contains substantially more evaluative evidence than its intelligence system interprets.**
2. **Genre composition is currently much more heavily represented in intelligence than behavioral or temporal evidence.**
3. **Several signals overlap or represent the same underlying evidence through different transformations.**
4. **`experimental_affinity` and `novelty` currently duplicate the same experimental-genre signal while receiving separate Identity weights.**
5. **`atmospheric-focus` and `atmospheric-interest` currently represent nearly the same interpretation across Observation and Finding layers.**
6. **Genre prevalence is represented through several equivalent or closely related forms.**
7. **Several Identity concepts are genre-derived proxies rather than direct behavioral evidence.**
8. **Designation signal strength is currently labeled as confidence even though it measures average trait strength rather than classification certainty.**
9. **Identity data sufficiency measures archive quantity relative to a minimum, not general evidence quality.**
10. **Narrative language occasionally makes stronger claims than the underlying aggregate evidence can support, particularly around consistency.**
11. **Findings currently operate primarily as parallel interpretations rather than as a higher computational layer over Observations.**
12. **The current Designation system always selects a primary result for a non-empty archive, creating an unresolved question about minimum evidence for classification.**
13. **Many future intelligence expansions may fit the existing architecture, but conceptual decisions may still reveal places where the architecture should evolve.**

The strongest overall conclusion is therefore:

> **The next meaningful expansion of WASABI should probably focus less on adding more labels and more on improving the richness, independence, and semantic grounding of the evidence from which conclusions are drawn.**

Potential future evidence includes behavioral patterns, temporal patterns, score distributions, completion relationships, cross-media behavior, and richer relational analysis.

The current taxonomy of four Designations and three Identities should remain provisional.

Different archives should ultimately be able to produce genuinely different combinations and numbers of Observations, Findings, Designations, Identities, Narrative interpretations, and Recommendation signals when the evidence supports those conclusions.

No new intelligence category should be implemented solely from these findings.

The next phase is to make the unresolved conceptual decisions explicit, determine which evidence represents meaningful intelligence, and only then select implementation work.

**Audit conclusion: investigation complete; conceptual decisions remain open.**
