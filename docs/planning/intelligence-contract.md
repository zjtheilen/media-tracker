---

// // _ \  */ \ / _ \ | D )| |
_/_//*/ _/__//*/ __D*)|_|
Weighted Archive System for Analysis & Behavioral Insights

# Media Tracker — Intelligence Contract v1

**Project:** Media Tracker

**Authoritative branch:** `develop-3`

**Status:** Working conceptual contract

**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

The Intelligence Layer exists to transform the raw record of media experiences into increasingly useful, explainable descriptions of the archive.

It should answer:

1. What qualities are strongly represented in the archive?
2. What kinds of media does the archive repeatedly respond to?
3. What recurring patterns can we directly demonstrate?
4. What do those patterns suggest?
5. What recognizable taste classifications fit the archive?
6. What kind of curator does the archive describe?
7. What evidence supports those conclusions?
8. What measurable signals should eventually inform recommendations?

The Intelligence Layer must remain **explainable, evidence-oriented, and modular**.

Observations, Findings, Designations, Identities, and other intelligence systems may examine shared underlying archive data, but they do not need to form a strict causal pipeline or universal processing hierarchy.

No intelligence subsystem should exist merely to produce impressive-sounding prose.

---

# 2. Foundational Architecture

The intelligence systems operate as **parallel analytical perspectives** over shared archive data.

They are not required to form a strict causal pipeline.

Conceptually:

```
                     RAW ARCHIVE
                          │
                ┌─────────┴─────────┐
                ↓                   ↓
             TRAITS          GENRE SIGNALS
                │                   │
                └─────────┬─────────┘
                          │
      ┌──────────┬────────┼──────────┬──────────┐
      ↓          ↓        ↓          ↓          ↓
OBSERVATIONS  FINDINGS  DESIGNATIONS IDENTITIES NARRATIVE
      │          │        │          │
      └──────────┴────────┴──────────┘
                         │
                         ↓
                 ARCHIVE PROFILE
                         │
                         ↓
             RECOMMENDATION SIGNALS
                         │
                         ↓
              RECOMMENDATION ENGINE
```

This diagram represents **conceptual relationships**, not a mandatory runtime call graph.

A subsystem may use shared underlying data without being formally dependent upon another subsystem's generated output.

Observations and Findings in particular should not be assumed to form an `Observation → Finding` processing pipeline merely because Findings may interpret evidence that could include Observations.

---

# 3. Core Principles

## 3.1 Evidence Before Interpretation

The system should distinguish between:

- what the data directly demonstrates
- what the data suggests
- what classification the pattern resembles
- what broader curator identity emerges

These are different levels of interpretation.

---

## 3.2 Parallel Systems Stay Parallel

Observations, Findings, Designations, and Identities must not be collapsed into a single hierarchy simply because they consume similar signals.

Similarity of inputs does not mean similarity of purpose.

---

## 3.3 Explainability

Every important interpretive conclusion should have an understandable answer to:

> **Why does the system think this?**

The exact representation may differ by subsystem, but conclusions should not be opaque.

The contract requires explainability, not identical evidence architecture.

---

## 3.4 Cardinality Is Intentional

The number of results each subsystem may produce is part of its conceptual contract.

Traits

```
MANY
```

Genre Signals

```
MANY
```

Observations

```
MANY
```

Findings

```
MANY
```

Designations

```
MANY internally

ONE PRIMARY on Profile
```

Identities

```
MANY internally

ONE PRIMARY

ZERO OR MORE meaningful SECONDARIES
```

"Meaningful" Secondary Identity behavior remains an explicit implementation decision and must not be reduced to an arbitrary fixed number or an unexamined score threshold.

---

## 3.5 Scores Are Not Automatically Confidence

A numerical value must have a defined meaning.

A strong trait score does not automatically mean high confidence.

A high designation score does not automatically mean high classification confidence.

An archive containing many entries does not automatically mean a conclusion is certain.

The system must distinguish:

- Signal Strength
- Data Sufficiency
- Evidence Strength
- Classification Confidence

These concepts are related but are not interchangeable.

Not every subsystem requires every concept as a numerical field.

---

# 4. TRAITS

## Definition

A **Trait** is a measurable quality that is strongly or weakly represented in the archive.

Traits answer:

> **What qualities are strongly represented in the data?**

Examples:

- Originality
- Depth
- Engagement
- Craft
- Gameplay Mechanics
- Thought Provocation
- etc.

The exact trait set may evolve.

---

## Inputs

Traits are derived primarily from measurable archive data, including:

- scoring results
- universal metrics
- media-specific metrics
- other explicitly defined quantitative signals

Genre-related information may contribute to derived traits where appropriate.

User-provided archive fields may eventually provide additional intelligence inputs where their semantic usefulness is explicitly established.

---

## Output

Traits should produce a measurable **Signal Strength**.

The current project commonly represents this through a 1–10 or normalized 0–1 value.

---

## Signal Strength

Trait strength means:

> **How strongly is this quality represented in the available archive data?**

It does **not** mean:

> How confident are we that this quality exists?

---

## Cardinality

**MANY.**

An archive may have many meaningful traits.

---

## Role

Traits are foundational measurable signals.

They may inform:

- Observations
- Findings
- Designations
- Identities
- Recommendations

---

## Contract

A Trait should be:

- measurable
- interpretable
- explainable
- sufficiently stable to support downstream systems

Traits should not become arbitrary prose labels.

---

# 5. GENRE SIGNALS

## Definition

A **Genre Signal** describes a recurring relationship between the archive and media genres/types.

Genre Signals answer:

> **What kinds of media does the archive repeatedly respond to?**

Examples:

- Horror affinity
- Sci-fi affinity
- Experimental affinity
- Surreal affinity
- Genre combinations
- Cross-media genre patterns

---

## Possible Measures

Genre intelligence may include:

- presence
- affinity
- frequency
- combinations
- cross-media relationships

The exact metric may differ by signal.

---

## Cardinality

**MANY.**

An archive may have numerous genre signals.

---

## Role

Genre Signals may inform:

- Observations
- Findings
- Designations
- Identities
- Recommendations

---

## Contract

Genre Signals should describe **recurring archive behavior**, not merely list genres that happen to occur once.

---

# 6. OBSERVATIONS

## Definition

An **Observation** is a recurring pattern that can be **directly demonstrated from the available archive evidence**.

Observation answers:

> **What recurring pattern can we directly demonstrate?**

Examples:

### ◈ Boundary Preference

> Your archive repeatedly favors unusual concepts.

Evidence:

> Originality: 8.8/10

### ◈ Systems Affinity

> Your archive repeatedly responds positively to carefully designed systems and mechanics.

Evidence:

> Gameplay Mechanics: 9.6/10

---

## Key Property

Observations should remain relatively close to the evidence.

An Observation should not require a large interpretive leap.

---

## Evidence

Observations should provide structured supporting evidence wherever practical.

Existing evidence mechanisms such as:

- metric evidence
- genre evidence

should be preserved.

Observation evidence does not establish a requirement that every other intelligence subsystem use the same schema.

---

## Evidence Strength

Observation `confidence` is an active threshold-relative **Evidence Strength** value.

It describes how strongly the designated supporting metric supports the Observation relative to that metric's threshold.

It does **not** represent:

- statistical confidence
- probability
- certainty that the Observation is objectively correct
- general confidence across every condition used by the Observation rule

An Observation rule may require multiple conditions while using one designated supporting metric as its Evidence Strength basis.

This is intentional.

Additional predicate conditions may establish that an Observation qualifies without contributing directly to its numerical Evidence Strength value.

The existing calculation should be preserved unless a specific contract conflict requires change.

---

## Cardinality

**MANY.**

An archive may contain:

- zero observations
- one observation
- several observations
- many observations

---

## Ranking

Observations may be ranked by their established Evidence Strength semantics or another clearly defined relevance measure.

Ordering must remain deterministic where ranking is required.

Tie and close-competitor presentation behavior must follow an explicitly defined policy rather than being inferred from incidental sort order.

---

## Contract

An Observation should generally satisfy:

Pattern exists

```
    +
```

Pattern is directly demonstrable

```
    +
```

Evidence can be identified

```
    ↓
```

Observation

---

# 7. FINDINGS

## Definition

A **Finding** is an interpretive conclusion about what the available evidence suggests.

Finding answers:

> **What does the evidence suggest?**

A Finding should provide additional meaning beyond simply restating an underlying Observation, Genre Signal, Trait, or raw metric.

---

## Key Property

Findings are more interpretive than Observations.

The distinction is:

Observation

What can we directly demonstrate?

```
    ↓
```

Finding

What does the evidence suggest?

This does **not** require Findings to consume generated Observations at runtime.

Observation and Finding rule systems may remain independently evaluated.

---

## Findings May

Findings may:

- synthesize multiple Observations
- synthesize Traits
- synthesize Genre Signals
- synthesize quantitative evidence
- provide a meaningful interpretive frame
- use a single signal when that signal gains genuine additional meaning through interpretation

---

## Findings Must Not

Findings must not:

- merely restate an Observation
- merely restate a Genre Signal percentage
- duplicate a rule condition under a new ID
- become a second Designation layer

A useful operational test is:

> If the Finding were removed and replaced with its underlying Observation or raw signal, would meaningful information be lost?

If the answer is no, the item is probably functioning as an Observation or Genre Signal rather than a Finding.

---

## Evidence

Findings should expose sufficient supporting evidence to explain why the Finding was produced.

Evidence may consist of:

- Observations
- Traits
- Genre Signals
- quantitative metrics
- other explicitly defined archive signals

Finding evidence does not need to use the Observation evidence schema.

---

## Finding Catalog

The existing Finding catalog should be handled conservatively.

Current forensic treatment:

| Finding                | Treatment                  |
| ---------------------- | -------------------------- |
| `concept-driven`       | PRESERVE                   |
| `engagement-priority`  | CLARIFY / ELEVATE          |
| `systems-preference`   | REMOVED / CONSOLIDATED     |
| `speculative-interest` | CLARIFY / ELEVATE          |
| `atmospheric-interest` | DEFER / POSSIBLE DUPLICATE |

No mass deletion should occur.

Before changing an ELEVATE candidate, define:

> What interpretive conclusion does this Finding add that the underlying Observation, Trait, or Genre Signal does not already communicate?

---

## Cardinality

**MANY.**

An archive may produce zero, one, or many Findings.

---

# 8. DESIGNATIONS

## Definition

A **Designation** is a named taste classification or badge describing a recognizable pattern in the archive.

Designation answers:

> **What recognizable classification does this pattern fit?**

Example:

# ◈ The Boundary Explorer

Possible characteristics:

Traits:

- Originality
- Depth

Genres:

- Experimental
- Surreal
- Sci-Fi
- Horror

Recommendation Bias:

- Unusual concepts
- Genre hybrids
- Experimental storytelling

---

## Nature

Designations are **classifications**, not broad curator identities.

They should be recognizable and relatively atomic.

---

## Architecture

Designations may remain fixture/rule driven for stability and explainability.

A designation definition may include:

- ID
- title
- description
- icon
- rule/evaluation logic
- associated traits
- associated genres
- recommendation bias

---

## Ranking

The system may calculate multiple designation scores.

Internally:

**MANY.**

---

## Profile Cardinality

The Profile should present:

**ONE PRIMARY designation.**

Optional:

- close competitors
- ranked alternatives
- scores

may be displayed where useful.

The exact presentation of ties and close competitors is governed by the explicit Phase 1 ranking/presentation policy and must not be inferred from incidental sort order.

---

## Classification

Designation scoring should answer:

> **How well does this archive fit this classification?**

It should not be confused with Identity.

---

## Evidence

Designations may expose lightweight structured evidence explaining why the designation ranked highly.

This does not need to replicate the Observation evidence model.

---

## Confidence

Current designation "confidence" is effectively derived from trait strength.

That should not be called Classification Confidence.

The system should conceptually distinguish:

- Signal Strength
- Classification Confidence
- Data Sufficiency

Classification Confidence is not currently required as a generalized numerical field.

---

## Contract

A Designation should be:

- recognizable
- distinct from other designations
- evidence-informed
- useful for describing taste
- useful as a recommendation bias

It should not exist merely to increase the number of badges.

---

# 9. IDENTITY

## Definition

An **Identity** is a broader synthesis describing the kind of curator the archive collectively represents.

Identity answers:

> **What kind of curator does all of this make me?**

Example:

> **Systems-Seeking Interpretive Curator**

This may describe someone whose archive demonstrates a combination of:

- systems appreciation
- interpretive depth
- originality
- boundary exploration
- strong engagement
- etc.

---

# 10. IDENTITY VS DESIGNATION

This distinction is mandatory.

### Designation

> **What named taste classification fits me?**

Example:

> ◈ The Boundary Explorer

### Identity

> **What kind of curator am I?**

Example:

> Systems-Seeking Interpretive Curator

They may be related.

They must not be redundant.

---

## Forbidden conceptual outcome

Designation:

Boundary Explorer

Identity:

Boundary Explorer

If an Identity is merely a differently formatted Designation, the distinction has failed.

---

# 11. IDENTITY PHILOSOPHY

Identity should describe **curatorial philosophy**, not merely taste categories.

It may synthesize qualities such as:

- what the curator seeks
- what they value
- how they engage with media
- how they respond to systems, ideas, atmosphere, craft, novelty, etc.
- how these tendencies interact

Identity names should therefore be allowed to diverge completely from Designation names.

The Identity catalog should move toward durable curator-philosophy concepts rather than user-specific personality labels or archive-specific nicknames.

---

# 12. MULTIPLE IDENTITIES

An archive can demonstrate multiple meaningful curator identities.

Example:

Primary Identity

Systems-Seeking Interpretive Curator

Secondary Identity

Boundary-Driven Explorer

Secondary Identity

Deep Analytical Curator

Conceptually:

> You are primarily X, while your archive also strongly exhibits qualities associated with Y and Z.

---

## Cardinality

**MANY internally.**

Profile presentation:

- one Primary Identity
- zero or more meaningful Secondary Identities

Not every low-ranking identity needs to be displayed.

The definition of "meaningful" and the threshold for Secondary Identity presentation remain unresolved until accepted Identity semantics and score distributions have been inspected.

Do not invent arbitrary thresholds merely to satisfy the cardinality requirement.

---

## Ranking

The system may maintain ranked identities internally.

Primary and secondary presentation should be based on explicitly defined relevance and meaningfulness.

The exact relationship between eligibility, scoring, ranking, and presentation must be established before behavior is changed.

---

# 13. IDENTITY ARCHITECTURE

Fixture-driven identities are acceptable and should be preserved.

Identity fixtures may contain:

- ID
- title
- category
- icon
- description
- associated traits
- recommendation bias/signals
- minimum data requirements
- scoring weights

The fixture system provides:

- stability
- explainability
- deterministic behavior
- easier testing
- controlled vocabulary

Identity eligibility, scoring, ranking, and presentation are distinct concepts and must not be conflated.

`minimum_entries` should be understood as part of Data Sufficiency / eligibility semantics rather than automatically treated as an exclusion-before-ranking rule unless the locked implementation contract establishes that behavior.

---

# 14. IDENTITY EVIDENCE / EXPLANATION

Identity should be explainable through contribution breakdown.

Example:

Systems-Seeking Interpretive Curator

Major contributions:

Gameplay Mechanics 9.6

Depth 8.4

Systems Affinity Strong

Interpretive Depth Strong

The current contribution-breakdown infrastructure should be preserved.

Identity does not need to use the same evidence schema as Observations.

The requirement is that the contribution breakdown meaningfully explains why the Identity was selected.

---

# 15. IDENTITY DATA SUFFICIENCY

The current implementation's entry-count-based confidence is better understood as:

**Data Sufficiency.**

Example:

> The archive contains enough records for this identity to be meaningfully evaluated.

That is different from:

> This identity beats competing identities by a large margin.

The latter is conceptually **Classification Confidence**.

Data Sufficiency, Classification Confidence, scoring, eligibility, ranking, and presentation are distinct concepts.

The exact operational semantics of Identity eligibility and presentation must be confirmed before behavior is changed.

---

# 16. EVIDENCE

## Definition

Evidence is the structured or human-readable support underlying an analytical conclusion.

The project does **not** require one universal evidence object for every subsystem.

---

## Evidence by Layer

### Traits

The underlying scores/metrics are the primary support.

### Genre Signals

Presence, affinity, combinations, and related calculations provide support.

### Observations

Use structured evidence.

This is currently the strongest implementation.

### Findings

Should expose sufficient structured or otherwise explicit supporting evidence to explain the conclusion.

### Designations

May expose lightweight "why this designation" evidence.

### Identities

Contribution breakdowns are an appropriate evidence/explanation mechanism.

### Narrative

Narrative should synthesize established evidence and conclusions rather than inventing support.

---

## Principle

The goal is:

> **Every important conclusion should be explainable.**

The goal is not:

> Every subsystem must use identical evidence schemas.

---

# 17. CONFIDENCE / STRENGTH VOCABULARY

The generic word "confidence" should be avoided where a more precise term exists.

## Signal Strength

> How strongly is a quality/signal expressed?

Examples:

Originality: 0.88

or:

Originality: 8.8/10

---

## Data Sufficiency

> Is there enough archive data to reasonably evaluate this conclusion?

This is fundamentally about sample size and available information.

---

## Classification Confidence

> How clearly does one classification/identity/designation outrank plausible alternatives?

This is about separation between competing classifications.

This concept is currently distinct from score magnitude and Data Sufficiency.

A generalized Classification Confidence algorithm is **not** part of Phase 1 unless explicitly introduced by a future locked decision.

---

## Evidence Strength

> How strongly does the available evidence support the conclusion?

This is about the quality, quantity, or directness of supporting evidence.

Observation Evidence Strength may use the existing threshold-relative calculation where that behavior is already established.

---

## Important

These values may correlate.

They are not interchangeable.

Not every subsystem requires all four as numerical fields.

A distinct field should exist only where the API, UI, explanation layer, or decision logic actually requires the distinction.

---

# 18. NARRATIVE

## Definition

Narrative is the human-readable interpretation of the intelligence layer.

It answers:

> **How do we explain the archive's meaning to a human?**

Narrative may synthesize:

- traits
- genre signals
- observations
- findings
- designation
- identity

---

## Constraint

Narrative must not invent conclusions unsupported by the intelligence layer.

It translates and synthesizes established signals.

Narrative may not:

- invent Traits
- invent evidence
- invent classifications
- invent Findings
- imply certainty beyond the intelligence layer
- treat speculation as demonstrated fact

---

## Current Status

The existing template-driven narrative system should be preserved.

Refinement can occur after the conceptual contracts are stable.

---

# 19. RECOMMENDATION SIGNALS

## Definition

Recommendation Signals are machine-usable representations of the archive's preferences.

They exist primarily to support the Recommendation Engine.

They may include:

- trait strengths
- genre affinities
- genre combinations
- scoring preferences
- designation recommendation bias
- soft Observation signals
- soft Finding signals

The exact weighting of these signals belongs to Recommendation Engine work.

---

## Important distinction

Recommendation Signals are **not the same thing as human-readable Identity**.

Identity may highlight important underlying signals, but the recommendation engine should consume those measurable signals directly.

Identity should not become a direct numerical recommendation score.

---

# 20. RECOMMENDATION BIAS

A Designation or other intelligence layer may identify recommendation-relevant tendencies.

Example:

The Boundary Explorer

Recommendation Bias:

- unusual concepts
- genre hybrids
- experimental storytelling

These are machine-usable preferences, not necessarily direct recommendation scores.

Recommendation bias is descriptive recommendation-oriented metadata.

It is not itself a recommendation score.

Preserve existing recommendation-bias metadata on:

- Designations
- Identities

The future Recommendation Engine should consume measurable signals directly.

**Classification:** PRESERVE / DEFERRED

---

# 21. ANALYTICS

## Definition

Analytics is the quantitative view of the archive.

Analytics answers:

> **What do the numbers say?**

It should contain things such as:

- averages
- distributions
- score comparisons
- trends
- charts
- genre statistics
- quantitative comparisons

---

## Constraint

Analytics should not become the general home for interpretive intelligence.

Traits, observations, findings, designations, and identities belong conceptually to the Archive Profile.

---

# 22. ARCHIVE PROFILE

## Definition

The Archive Profile is the interpretive representation of the archive.

It answers:

> **What does the archive mean?**

---

## Contents

Archive Profile

│

├── Narrative

│

├── Primary Designation

│

├── Primary Identity

│ └── Secondary Identities

│

├── Traits

│

├── Genre Signals

│

├── Observations

│

├── Findings

│

└── Evidence / Explanations

---

## Cardinality

Traits

```
MANY
```

Genre Signals

```
MANY
```

Observations

```
MANY
```

Findings

```
MANY
```

Designation

```
MANY internally

ONE PRIMARY displayed
```

Identities

```
MANY internally

ONE PRIMARY

ZERO+ meaningful SECONDARY
```

---

# 23. IDEAL PROFILE EXAMPLE

## Traits

**What qualities are strongly represented?**

Originality 8.8

Depth 8.4

Gameplay Mechanics 9.6

Engagement 9.1

Craft 8.7

---

## Observations

**What recurring patterns can we directly demonstrate?**

### ◈ Boundary Preference

> Your archive repeatedly favors unusual concepts.

**Evidence:** Originality 8.8/10

### ◈ Systems Affinity

> Your archive repeatedly responds positively to carefully designed systems and mechanics.

**Evidence:** Gameplay Mechanics 9.6/10

---

## Findings

**What does the available evidence suggest?**

> Your archive demonstrates a strong preference for experiences that challenge conventional genre boundaries.

Potential supporting observations/signals:

- Boundary Preference
- Experimental Genre Affinity
- High Originality
- Surreal/Horror cross-interest

The Finding provides an interpretive conclusion rather than merely renaming one of the underlying signals.

---

## Designation

**What recognizable classification fits the pattern?**

### ◈ The Boundary Explorer

Traits:

- Originality
- Depth

Genres:

- Experimental
- Surreal
- Sci-Fi
- Horror

Recommendation Bias:

- Unusual concepts
- Genre hybrids
- Experimental storytelling

---

## Identity

**What kind of curator does all of this make you?**

### Systems-Seeking Interpretive Curator

This name does **not** need to exist in the Designation vocabulary.

That distinction is intentional.

---

# 24. RECOMMENDATION ENGINE CONTRACT

The Recommendation Engine answers:

> **What should I experience next?**

It is a consumer of measurable archive intelligence.

---

## Primary Inputs

### Traits

Trait strengths.

### Genre Signals

Affinities, combinations, presence, and other genre intelligence.

### Scoring

- universal averages
- media-specific averages
- scoring preferences

### Designations

- designation scores
- recommendation bias

### Observations

Soft recommendation signals.

### Findings

Soft recommendation signals.

---

## Identity

Identity may influence recommendations **indirectly** by highlighting important underlying traits/signals.

Identity should not be treated as a direct numerical recommendation score.

The exact weighting of Identity-derived context remains future Recommendation Engine work.

---

# 25. RECOMMENDATION OUTPUT

Eventually:

Recommendation:

Movie X

Match: 92

Why:

- Strong experimental affinity

- High originality alignment

- Matches Boundary Explorer preferences

- Strong atmospheric compatibility

- Similar to highly-rated archive records

The engine must ultimately answer both:

> **What should I experience?**

and:

> **Why was this recommended?**

The exact recommendation scoring and weighting algorithm is outside the current Intelligence Contract.

---

# 26. EMPTY / SPARSE ARCHIVE BEHAVIOR

Empty and sparse archives are valid system states.

The intelligence layer must not assume that enough data always exists.

Conceptually, the archive may be understood as:

### Empty Archive

Not enough data to produce meaningful intelligence.

### Sparse Archive

Some signals may exist, but conclusions should clearly communicate limited Data Sufficiency.

### Established Archive

Enough data exists for meaningful interpretation.

The exact operational thresholds for these states remain unresolved.

Data Sufficiency should be represented explicitly rather than hidden behind misleading confidence percentages.

Do not introduce state-dependent branching based on undefined thresholds.

Different intelligence subsystems may require different minimum data conditions.

---

# 27. PARTIAL DATA

The intelligence layer must tolerate incomplete information where practical.

Potential conditions:

- missing scores
- missing genres
- incomplete media-specific metrics
- limited genre coverage
- partially populated archive

Systems should degrade gracefully rather than fabricate certainty.

Partial-data behavior is primarily an implementation and testing concern.

Where a subsystem requires particular information, its behavior should be explicitly defined rather than assuming every subsystem shares the same minimum data requirement.

---

# 28. RECOMMENDATION OF ARCHITECTURAL CHANGES

When implementing changes based on this contract:

### Prefer

- minimal changes
- preservation of existing working behavior
- incremental evolution
- targeted rule refinement
- improved terminology
- additional evidence
- additional tests

### Avoid

- subsystem mergers
- giant rewrites
- replacing deterministic systems with opaque AI
- redesigning working scoring infrastructure
- making Identity a Designation clone
- making Findings into renamed Observations
- using labels as opaque recommendation scores
- implementing unresolved conceptual decisions merely to complete a feature

---

# 29. TESTING CONTRACT

The test suite is part of the behavioral contract.

Any subsystem changed under this contract must preserve existing behavior unless that behavior directly conflicts with an explicitly locked conceptual definition.

## Current Test Status

**247 passing tests and 1 failing test.**

The current failure is an established Designation regression involving the `deep_diver` fixture and the updated `boundary_explorer` evidence model.

The suite is therefore **not currently green**.

Historical regression milestones are:

- 199 passing tests — original forensic baseline
- 210 passing tests — earlier Phase 1 baseline
- 218 passing tests — post-forensic test baseline
- 247 passing tests — current passing count

These historical counts document the evolution of regression coverage and should not be confused with the current green baseline.

The 210-test count is therefore **not the current baseline**.

---

## Testing Requirements

Changes should add or update tests for:

### Observations

- rule behavior
- evidence
- Evidence Strength
- multiple observations
- deterministic ordering where applicable

### Findings

- interpretive level
- synthesis
- evidence
- multiple findings
- distinction from duplicate Observations

Finding confidence remains unresolved.

### Designations

- rule behavior
- ranking
- primary selection
- explanation/evidence
- recommendation bias
- deterministic behavior

### Identities

- fixture loading
- eligibility
- Data Sufficiency
- multiple identities
- ranking
- primary selection
- secondary selection once policy is locked
- contribution breakdown

Classification Confidence should be tested only where an explicit implementation contract defines it.

### Recommendations

- signal weighting
- ranking
- explanations
- edge cases

Recommendation weighting belongs to Recommendation Engine work and should not be invented during Phase 1.

---

## Regression Principle

Run the full suite after every intentional behavior change.

Once intentional behavior changes are resolved, the full suite should return to green unless an explicitly approved contract change changes an expected result.

Every intentional behavioral change requires regression coverage.

---

# 30. NON-GOALS

This contract does **not** currently attempt to define:

- exact future UI styling
- exact final designation vocabulary
- exact final identity vocabulary
- exact recommendation algorithm weights
- every future trait
- every future genre signal
- external metadata integrations
- machine-learning-based recommendations
- React architecture
- generalized Classification Confidence mathematics
- Secondary Identity thresholds before their meaningfulness policy is defined
- tie / near-tie thresholds before the ranking policy is locked
- Archive State operational thresholds before they are defined

Those can evolve after the conceptual boundaries are stable.

---

# 31. PHASE 0 EXIT CRITERIA

Phase 0 is complete when the foundational conceptual distinctions are established.

The following concepts are now established at the conceptual level:

- [x] Trait has an unambiguous definition
- [x] Genre Signal has an unambiguous definition
- [x] Observation has an unambiguous definition
- [x] Finding has an unambiguous definition
- [x] Designation has an unambiguous definition
- [x] Identity has an unambiguous definition
- [x] Evidence has an unambiguous purpose
- [x] Signal Strength is distinguished from confidence
- [x] Data Sufficiency is defined
- [x] Classification Confidence is conceptually distinguished
- [x] Evidence Strength is defined
- [x] Narrative's role is defined
- [x] Recommendation Signals are defined
- [x] Analytics vs Archive Profile is defined
- [x] Cardinality is defined
- [x] Observation vs Finding is defined
- [x] Designation vs Identity is defined
- [x] Multiple identities are explicitly supported
- [x] Primary/secondary identity behavior is conceptually defined
- [x] Empty/sparse archive behavior is acknowledged
- [x] Parallel intelligence architecture is established

The following remain implementation-level or policy-level gates rather than assumptions to be silently filled in:

- [ ] final Identity shortlist
- [ ] per-Identity signal definitions
- [ ] Secondary Identity thresholds
- [ ] tie / near-tie policy
- [ ] Finding purpose statements for ELEVATE candidates
- [ ] Finding evidence model where needed
- [ ] Finding confidence semantics
- [ ] new Observation shortlist
- [ ] archive-state operational thresholds
- [ ] per-field API/frontend rename plan
- [ ] precise Identity eligibility/ranking/presentation semantics

Phase 1 implementation alignment should proceed only where these unresolved decisions do not create a dependency.

---

# 32. CONSTITUTIONAL SUMMARY

The Media Tracker intelligence layer follows this conceptual progression:

RAW DATA

↓

MEASUREMENT

↓

TRAITS + GENRE SIGNALS

↓

┌───────────────────────────────────────────────┐
│ │
│ OBSERVATIONS FINDINGS DESIGNATIONS │
│ │
│ demonstrable interpretive named taste │
│ patterns conclusions classification│
│ │
│ IDENTITY │
│ curator synthesis │
│ │
└───────────────────────────────────────────────┘

↓

ARCHIVE PROFILE

↓

RECOMMENDATION SIGNALS

↓

RECOMMENDATION ENGINE

The four key distinctions are:

> **Observation:** What can we directly demonstrate?

> **Finding:** What does the evidence suggest?

> **Designation:** What recognizable taste classification fits?

> **Identity:** What kind of curator does this archive describe?

And the four key quantitative distinctions are:

> **Signal Strength:** How strongly is it expressed?

> **Data Sufficiency:** Do we have enough data?

> **Classification Confidence:** How clearly does one classification win?

> **Evidence Strength:** How strongly is the conclusion supported?

These distinctions form the conceptual foundation for future implementation.

**The system should evolve from this contract. It should not be rewritten merely because implementation details change.**

---

# 33. User-Provided Data as Intelligence Input

The intelligence layer should treat user-provided archive data as potential analytical input unless a future contract explicitly excludes a field.

The fact that a field is initially collected for display, recordkeeping, or human use does not mean it must remain permanently inert.

Potential intelligence inputs include:

- scores
- genres
- media type
- completion status
- date consumed
- review text
- previously-consumed status
- future intentionally collected archive metadata

This does not mean every field must immediately affect scoring.

The principle is:

`If the user deliberately provides a signal, the intelligence architecture should preserve the possibility of eventually determining whether that signal is useful.`

Any actual algorithmic use must remain explainable and explicitly defined.

---

# 34. Review

The current user-authored notes field should eventually become:

`Review`

The field remains optional.

A Review is distinct from structured scoring, but it is still part of the archive record and should eventually be available to intelligence and analytics systems.

Potential future uses include:

- recurring themes
- qualitative reactions
- interpretive patterns
- evidence for Observations
- evidence for Findings
- recommendation signals
- media-specific reaction analysis
- narrative enrichment

The contract does not currently define a review-analysis algorithm.

Review analysis is therefore a future capability.

Preserving the Review as archive data does not imply that it should immediately affect any intelligence score.

---

# 35. Previously Consumed Media

The archive should eventually allow the user to indicate whether the recorded media was previously consumed before this archive record, even if this is the first time the user is recording it in Media Tracker.

The initial representation should preferably be binary:

previously_consumed: true / false

A full consumption count may be useful later, but it introduces additional maintenance burden.

The binary signal is sufficient to establish the important distinction:

`first recorded consumption vs. repeat consumption`

Potential future intelligence uses include:

- repeat-consumption behavior
- familiarity effects
- comfort-media patterns
- recommendation weighting
- archive interpretation
- consumption analytics

No specific scoring effect is currently defined.

---

# 36. Intelligence Input Principle

The intelligence layer should evolve toward a model in which:

RAW USER DATA

↓

MEASURABLE SIGNALS

↓

INTELLIGENCE

↓

INTERPRETATION

↓

RECOMMENDATION SIGNALS

The system should not assume that only numerical scores are legitimate intelligence inputs.

At the same time, raw user input should not automatically become a score merely because it exists.

The correct sequence is:

1. preserve the data
2. establish whether it contains a meaningful signal
3. define the signal's semantics
4. test the behavior
5. only then incorporate it into downstream intelligence

---

# 37. Constitutional Extension

The intelligence layer therefore follows an additional principle:

`Collect broadly, interpret conservatively.`

User-provided information should remain available for future analytical use, while actual algorithmic consumption must be:

- purposeful
- explainable
- evidence-oriented
- explicitly defined
- regression-tested

This principle applies to Reviews, previously-consumed status, and future user-provided metadata.

It does not authorize new intelligence behavior by itself. Any actual downstream use remains subject to an explicit semantic definition, implementation decision, and regression coverage.

---
