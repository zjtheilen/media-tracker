# Media Tracker — Designation System Evolution

**Project:** Media Tracker
**Authoritative branch:** `develop-3`
**Status:** Working Direction / Future Design
**Scope:** Designations, designation scoring, archive-shape analysis, genre intelligence
**Related documents:**

* `intelligence-contract.md`
* `phase-1-intelligence-alignment.md`
* `phase-1-decision-and-implementation-map.md`
* `intelligence-forensic-audit.md`
* `roadmap.md`

---

# 1. Purpose

This document records the evolving design direction for the Media Tracker Designation system.

It exists separately from the Phase 1 Intelligence Alignment documents because many of the ideas below are **future design decisions or working hypotheses**, not currently locked Phase 1 implementation requirements.

The purpose is to preserve the reasoning behind future Designation work so that later implementation can continue from the same conceptual foundation.

The guiding principle remains:

> **Evolution, not rewrite.**

The existing Designation infrastructure is useful and should be refined rather than discarded.

---

# 2. What a Designation Means

A Designation answers:

> **What recognizable taste classification fits this archive?**

A Designation is therefore a classification of observable media behavior and preference patterns.

It is not:

* a personality type
* a psychological diagnosis
* a curator philosophy
* a recommendation category
* a single favorite genre
* a description of one isolated preference

The existing distinction between Designation and Identity remains important:

| Layer       | Question                                                                 |
| ----------- | ------------------------------------------------------------------------ |
| Designation | What recognizable taste classification fits this archive?                |
| Identity    | What broader curator philosophy or synthesis does this archive describe? |

Designations and Identities may use some of the same underlying evidence, but they answer different questions.

---

# 3. Current Designations Are Provisional

The current Designation catalog contains:

* `boundary_explorer`
* `curator`
* `engagement_architect`
* `deep_diver`

These names and rules were initially introduced as a **skeleton implementation**.

They should not be treated as permanently correct vocabulary or as the final Designation catalog.

Future work may:

* rename existing Designations
* redefine their meanings
* split one Designation into several
* merge overlapping Designations
* retire weak Designations
* introduce additional Designations

The eventual system may contain approximately **10–12 or more Designations** if the evidence supports that level of differentiation.

The goal is not to create more Designations for variety.

The goal is to create enough distinct Designations to represent genuinely different and reusable patterns of media behavior.

---

# 4. Current Phase 1 Work vs Future Designation Evolution

Phase 1 remains conservative.

The current implementation work should preserve:

* fixture/rule-driven Designations
* deterministic evaluation
* multiple internal candidates
* candidate ranking
* primary Designation resolution
* Designation metadata
* recommendation bias
* existing archive/profile integration
* meaningful regression behavior

Future Designation evolution is a separate layer of work.

The current four Designations should therefore be treated as:

> **working behavioral hypotheses implemented using the existing rule infrastructure.**

They are not the final ontology.

---

# 5. Designation Scores

A Designation score should answer:

> **How strongly does the archive exhibit the evidence associated with this Designation?**

It should not be interpreted as:

> "There is an X% chance this Designation is objectively correct."

Nor should a score of `100` automatically mean that the archive is perfectly or definitively classified.

A Designation score is an **evidence-strength / fit score**.

Scores should ideally be normalized to a common range so that different Designation rules are comparable.

---

# 6. Score Comparability Is Mandatory

Different Designation rules currently use different combinations of signals and weights.

This creates an important requirement:

> A score of 80 for one Designation must be meaningfully comparable to a score of 80 for another Designation.

A rule must not be able to produce a higher maximum simply because it has more additive opportunities.

For example, if one rule has five components capable of independently contributing large values while another has three components, both rules must still map their evidence to the same conceptual scale.

The final score should therefore represent:

> **strength of evidence relative to that Designation's own defined evidence model**

rather than raw accumulated arithmetic.

The earlier `boundary_explorer` implementation demonstrated why this matters: its raw weighting could exceed the intended scale and then rely on `min(score, 100)` to force the result into a 0–100 range.

That is technically capped but conceptually weak.

A future Designation rule should have a defined maximum of 100 by construction rather than by accidental overflow followed by clipping.

---

# 7. Designation Rule Audit

Before expanding the Designation catalog, each existing rule should be examined for whether its weights actually express the concept it claims to represent.

For every Designation, document:

* purpose
* primary behavioral signals
* secondary behavioral signals
* non-contributing signals
* evidence dimensions
* weight rationale
* maximum possible contribution
* expected score interpretation
* minimum meaningful evidence
* distinction from other Designations

The question is not:

> "Can we make the current fixture pass?"

The question is:

> **"Do these weights actually encode the behavior this Designation is supposed to describe?"**

Fixture preservation remains important, but fixtures should not prevent correction of a conceptually weak rule.

---

# 8. Primary Designation Resolution

The current architecture evaluates multiple Designations and ranks them.

The Primary Designation is the strongest candidate presented on the Profile.

This remains the basic model:

```text
archive
↓
evaluate Designations
↓
rank candidates
↓
resolve Primary Designation
```

However, future work should distinguish three separate concepts:

### Designation Score

How strongly the archive fits the Designation.

### Classification Confidence

How clearly the winning Designation is distinguished from plausible alternatives.

### Data Sufficiency

Whether enough archive evidence exists to make the classification meaningful.

These must not be conflated.

---

# 9. Winner Score vs Classification Confidence

A high winner score does not necessarily mean the classification is highly certain.

Example:

```text
Boundary Explorer     82
Deep Diver            80
```

The winner has a strong score, but the classification is relatively ambiguous.

Compare:

```text
Boundary Explorer     82
Deep Diver            41
```

The winner has the same score but a much clearer lead.

Therefore:

> **Winner strength and classification confidence are different dimensions.**

The score describes the winner.

The margin describes how strongly the winner separates from competing candidates.

Future classification-resolution logic should consider both.

---

# 10. Margin

A useful future signal is:

```text
margin = winner_score - runner_up_score
```

A larger margin means the winner is more differentiated from the strongest alternative.

A smaller margin means the archive exhibits competing Designation patterns.

Margin should not replace the winner's score.

It should supplement it.

For example:

| Winner | Runner-up | Margin | Interpretation                                      |
| -----: | --------: | -----: | --------------------------------------------------- |
|     86 |        58 |     28 | Strong, well-separated classification               |
|     76 |        45 |     31 | Strong, well-separated classification               |
|     74 |        61 |     13 | Stronger candidate, but meaningful overlap          |
|     41 |        28 |     13 | Weak classification despite a clear relative winner |

This demonstrates why classification confidence cannot simply be derived from the winner score.

---

# 11. Current `designationConfidence`

The existing `designationConfidence` field currently represents aggregate signal strength of the Designation Basis.

It should therefore continue to be treated as a **Signal Strength-like quantity**, consistent with the Phase 1 semantic decision.

It should not silently be repurposed into a new margin-based Classification Confidence algorithm.

Future work may introduce an explicitly distinct classification-confidence concept if the API/UI actually needs it.

Until then:

> **Do not reinterpret the existing field merely because the word `confidence` is imperfect.**

Terminology and presentation remain separate from algorithm redesign.

---

# 12. Boundary Explorer — Behavioral Definition

`boundary_explorer` is currently a placeholder name and rule.

Its intended concept is:

> **Someone who is willing to explore outside a typical narrow range of media experiences and who tends to appreciate the unusual, unfamiliar, or unconventional experiences they encounter.**

Boundary Explorer should therefore not simply mean:

> "likes experimental media."

It should describe a broader behavioral pattern.

A strong Boundary Explorer candidate may demonstrate:

* broad genre exploration
* exploration across conceptually different genre areas
* exploration across multiple media types
* repeated engagement with less familiar areas
* sustained exploration rather than isolated sampling
* high appreciation for originality
* high appreciation for other traits associated with unconventional or boundary-pushing work
* willingness to engage with experiences outside the archive's dominant territory

---

# 13. Three Core Dimensions of Boundary Exploration

The current working model uses three primary dimensions:

```text
                 BOUNDARY EXPLORATION
                         │
             ┌───────────┼───────────┐
             │           │           │
          BREADTH     SUSTAINED  APPRECIATION
             │        EXPLORATION      │
             │           │             │
       archive shape   repeated      originality
       genre coverage  exposure      depth
       media coverage  meaningful    related traits
             │           │             │
             └───────────┼─────────────┘
                         ↓
                 BOUNDARY EXPLORER
```

### 13.1 Breadth

How broadly does the archive explore different areas?

Breadth should consider:

* meaningful genre coverage
* concentration vs dispersion
* genre families / related groups
* media-type coverage

Breadth should describe the **shape of the archive**, not simply the number of distinct genre labels.

---

### 13.2 Sustained Exploration

Breadth alone is insufficient.

A user who samples one experimental work among 100 otherwise conventional works should not receive the same Boundary Explorer evidence as someone who repeatedly explores experimental material.

The system should therefore distinguish:

```text
sampling
```

from:

```text
sustained exploration
```

The current working threshold proposal is:

> **3% of the archive or 2 entries, whichever is greater.**

This is a working direction, not yet a locked universal threshold.

The intention is to prevent one-off exposure from being treated as sustained exploration while still allowing smaller archives to demonstrate meaningful repeated behavior.

---

### 13.3 Appreciation

Exploration alone does not establish Boundary Explorer behavior.

The system should also ask:

> **Does the user actually value what they explore?**

Relevant evidence may include:

* originality
* depth
* presentation/atmosphere
* other derived traits associated with unconventional experiences

This distinguishes:

```text
"I tried unusual things."
```

from:

```text
"I repeatedly seek unusual things and tend to value them."
```

The latter is substantially stronger Boundary Explorer evidence.

---

# 14. Genre Prevalence Is Evidence, Not the Whole Meaning

`genreAffinity` remains a useful archive-level signal.

It represents genre prevalence and should not be distorted merely to serve Designation scoring.

Current `genreAffinity` should therefore remain conceptually distinct from future Designation-specific genre evidence.

A Designation should not simply do:

```text
genreAffinity × arbitrary weight
```

and assume that the result is sufficient semantic evidence.

Instead, future work should distinguish:

```text
GENRE PREVALENCE
```

from:

```text
DESIGNATION EVIDENCE DERIVED FROM GENRE PREVALENCE
```

The first describes the archive.

The second interprets that archive signal in the context of a particular Designation.

---

# 15. Do Not Use Arbitrary Genre Distance

Genres should not be modeled as a simple linear or radial coordinate system merely to calculate "distance."

There is no single obvious axis along which:

```text
horror → comedy → romance
```

or any other genre relationship can be meaningfully measured.

Trying to manufacture a universal genre-distance number risks creating false precision.

Instead:

> **Genre relationships should be modeled as a network of meaningful relationships.**

---

# 16. Related Genre Groups / Genre Families

One possible future structure is to define related genres as belonging to overlapping conceptual groups.

For example:

```text
Narrative Tension
├── horror
├── psychological
├── thriller
├── mystery
└── suspense
```

Another might be:

```text
Speculative
├── sci-fi
├── fantasy
├── surreal
├── experimental
└── speculative
```

A genre may belong to multiple groups.

For example:

```text
horror
├── Narrative Tension
├── Dark
└── Psychological
```

The important concept is not the exact labels.

The important concept is:

> **The archive can be broad in genre labels while still concentrated within a small number of conceptual genre regions.**

This allows the system to distinguish:

```text
many related genres
```

from:

```text
many meaningfully different areas of exploration
```

without inventing arbitrary geometric distance.

---

# 17. Subgenres

A second complementary approach is hierarchical genre structure.

For example:

```text
Horror
├── Psychological Horror
├── Supernatural Horror
├── Cosmic Horror
├── Body Horror
└── Folk Horror
```

and:

```text
Science Fiction
├── Hard Sci-Fi
├── Space Opera
├── Cyberpunk
├── Dystopian
└── Time Travel
```

Subgenres provide a way to distinguish:

### Breadth

Exploring many different genre families.

from:

### Depth

Exploring deeply within a particular genre family.

A user who explores:

```text
psychological horror
cosmic horror
body horror
folk horror
```

may demonstrate strong **genre depth** without necessarily demonstrating broad cross-family exploration.

A user who explores:

```text
horror
romance
strategy
documentary
sci-fi
```

demonstrates much stronger **cross-family breadth**.

Both patterns may eventually be meaningful to different Designations.

---

# 18. Genre Families and Subgenres Are Complementary

These concepts should not be treated as competing solutions.

The eventual genre intelligence system may combine them.

Conceptually:

```text
GENRE TAXONOMY
       │
       ├── families / related groups
       │
       ├── hierarchical subgenres
       │
       └── cross-family relationships
```

The underlying representation should be flexible enough for a genre to participate in multiple meaningful relationships.

The system should therefore behave more like a **graph/network** than a strict tree.

---

# 19. Archive Concentration

The user's "normal territory" should not be manually declared.

It should emerge from the archive.

Instead of asking:

> "What are the user's normal genres?"

the system should ask:

> **"How concentrated are the user's preferences?"**

For example:

```text
Horror          30%
Comedy          25%
Action          20%
Drama           12%
Sci-fi           8%
Experimental     5%
```

has a much stronger dominant core than:

```text
Horror          18%
Comedy          17%
Action          16%
Drama           15%
Sci-fi          14%
Mystery         10%
Surreal         10%
```

The second archive does not have a clearly defined narrow center.

That distinction is valuable even without defining a universal "normal territory."

---

# 20. Archive Shape

Future Designation analysis should consider the overall shape of an archive.

Potential dimensions include:

* genre coverage
* genre concentration
* conceptual family coverage
* subgenre depth
* media-type coverage
* cross-family movement
* repeated exploration
* rating patterns within explored areas

The system should avoid reducing archive breadth to:

```text
number of unique genre strings
```

because ten closely related genres can represent less behavioral breadth than five unrelated areas.

---

# 21. Boundary Explorer Is Not a Genre Classifier

The future Boundary Explorer rule should avoid becoming:

```text
experimental + surreal + sci-fi + horror
```

Instead, those genres are merely potential evidence.

The Designation should ultimately describe the **behavioral pattern**:

```text
broad exploration
+
meaningful cross-family exploration
+
sustained exploration
+
positive appreciation of unconventional experiences
```

The exact genres contributing to that evidence may evolve as the Genre Registry evolves.

---

# 22. Media Types Matter

Boundary exploration should consider media types.

A user who explores unusual territory across:

```text
film
books
games
```

may demonstrate a broader exploratory pattern than someone whose unusual exploration is isolated to a single medium.

The system should therefore eventually distinguish:

```text
genre breadth
```

from:

```text
genre + media breadth
```

Media types should not automatically receive more weight than genres.

They are an additional evidence dimension.

---

# 23. Equal Treatment of Exploration Evidence

When evaluating whether an archive demonstrates meaningful exploration across distinct areas, the working direction is:

> **Treat qualifying exploration areas equally rather than assigning arbitrary importance to particular genres.**

A user should not receive more Boundary Explorer evidence merely because the system's developer personally considers one genre more adventurous than another.

Genre relationships may establish conceptual grouping, but they should not become hidden subjective weights.

---

# 24. Small Archive Protection

Exploration evidence must account for archive size.

A small archive should not be interpreted as highly exploratory merely because it contains several genre labels.

Likewise, a large archive should not be penalized simply because a less-common genre represents a small percentage.

The current working threshold proposal is:

> **3% of entries or 2 entries, whichever is greater.**

This should eventually be tested against real archive distributions before being locked.

The broader principle is:

> **Require meaningful representation before treating a genre/family/media area as evidence of sustained exploration.**

---

# 25. Sampling vs Sustained Exploration

This distinction is important enough to remain explicit.

### Sampling

A user has encountered an area but has not demonstrated repeated engagement with it.

Example:

```text
100 entries
2 experimental
```

This may be exposure.

### Sustained Exploration

The archive contains enough repeated engagement to demonstrate a meaningful behavioral pattern.

Example:

```text
100 entries
10 experimental
```

This is substantially stronger evidence.

The threshold must eventually account for both:

* absolute entry count
* relative archive prevalence

---

# 26. Future Designation Architecture

The eventual architecture should support a larger Designation catalog without requiring each Designation to reinvent archive analysis.

Conceptually:

```text
RAW ARCHIVE
     │
     ↓
SHARED ARCHIVE SIGNALS
     │
     ├── traits
     ├── genre prevalence
     ├── genre families
     ├── subgenre structure
     ├── media coverage
     ├── archive concentration
     ├── exploration patterns
     └── rating/appreciation signals
              │
              ↓
      DESIGNATION RULES
              │
       ┌──────┼──────┐
       ↓      ↓      ↓
    Rule A  Rule B  Rule C ...
       │      │      │
       └──────┼──────┘
              ↓
       ranked candidates
              ↓
       classification resolution
              ↓
       Primary Designation
```

Shared archive analysis should provide reusable evidence.

Designation rules should interpret that evidence.

This avoids embedding the entire genre ontology independently inside every Designation rule.

---

# 27. Eventual Designation Examples

The following are **illustrative future concepts only**, not approved Designation names:

```text
Boundary Explorer
Specialist
Genre Chameleon
Deep Specialist
Cross-Media Explorer
Completionist
Curator
Engagement-Seeker
Concept Seeker
Craft Connoisseur
```

These examples demonstrate the type of behavioral differentiation we may eventually want.

They are not a commitment to the names or catalog.

Any future Designation must earn its place by representing a distinct, reusable behavioral pattern.

---

# 28. Relationship to Identity

The eventual Designation catalog should remain distinct from the Identity catalog.

For example:

> **Boundary Explorer**

could describe a recognizable archive behavior:

> frequently explores unfamiliar or conceptually diverse media territory.

An Identity might instead describe:

> **Concept-First Curator**

meaning that unusual ideas and conceptual payoff are central to the user's broader curation philosophy.

The same archive can legitimately exhibit both.

Designation:

```text
WHAT PATTERN?
```

Identity:

```text
WHAT CURATOR PHILOSOPHY?
```

---

# 29. Implementation Order

The preferred future order is:

### Step 1 — Audit existing Designation rules

Determine whether current weights actually express their intended concepts.

### Step 2 — Establish score comparability

Ensure every Designation produces a genuinely comparable normalized score.

### Step 3 — Improve archive-shape signals

Develop meaningful concentration/breadth measures.

### Step 4 — Improve genre interpretation

Explore related genre groups/families without altering the semantics of `genreAffinity`.

### Step 5 — Add sustained-exploration detection

Distinguish sampling from repeated meaningful exploration.

### Step 6 — Incorporate media-type exploration

Extend exploration evidence across media types.

### Step 7 — Rework Boundary Explorer

Use the three core dimensions:

```text
breadth
sustained exploration
appreciation
```

### Step 8 — Re-evaluate the existing catalog

Determine whether the four current Designations remain useful.

### Step 9 — Expand the catalog only where evidence supports it

Potentially grow toward approximately 10–12 distinct Designations.

### Step 10 — Revisit classification resolution

Once real score distributions exist, determine whether explicit Classification Confidence based on winner/runner-up separation is useful.

---

# 30. What Is Not Locked Yet

The following remain working directions rather than final implementation contracts:

* exact genre-family definitions
* exact subgenre taxonomy
* exact archive-concentration formula
* exact exploration thresholds
* exact weighting of breadth vs sustained exploration vs appreciation
* exact treatment of media types
* exact Classification Confidence formula
* exact use of winner/runner-up margin
* final Designation names
* final number of Designations
* whether every Designation needs the same evidence architecture
* whether Designations should expose explicit confidence to users
* whether genre-family evidence should be shared infrastructure or Designation-specific interpretation

These decisions should be validated against actual archive distributions and fixtures before being locked.

---

# 31. Guiding Principles

The future Designation system should follow these principles:

1. **Classify behavior, not isolated genres.**
2. **Do not invent false precision where the domain has no natural geometry.**
3. **Preserve the meaning of shared archive signals.**
4. **Separate archive measurement from Designation interpretation.**
5. **Make scores comparable across Designations.**
6. **Do not confuse score strength with classification confidence.**
7. **Use margin as evidence of separation, not as a replacement for score.**
8. **Distinguish sampling from sustained exploration.**
9. **Treat genre relationships as a network rather than forcing a linear/radial model.**
10. **Allow genres to belong to multiple related groups.**
11. **Support subgenre depth separately from cross-family breadth.**
12. **Let the user's normal territory emerge from archive concentration rather than manual assumptions.**
13. **Use media types as additional evidence of exploration.**
14. **Treat qualifying exploration areas equally unless evidence supports another weighting.**
15. **Do not allow arbitrary genre weights to dominate classification.**
16. **Do not expand the Designation catalog merely for variety.**
17. **Design the shared intelligence layer so future Designations can reuse it.**
18. **Keep Designations distinct from Identities.**
19. **Preserve deterministic behavior.**
20. **Prefer evolution over rewrite.**

---

# 32. Current Status

The current Designation implementation should be considered:

> **Working infrastructure with provisional behavioral rules.**

The immediate work is not to create a final Designation catalog.

The immediate work is to make the underlying evidence model strong enough that future Designations can be meaningful, comparable, explainable, and extensible.

The current four Designations are therefore best understood as the **first test cases for the evolving Designation system**, not the final taxonomy.
