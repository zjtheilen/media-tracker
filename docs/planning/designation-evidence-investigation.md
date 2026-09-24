# Designation Evidence Investigation

**Status:** Investigation in progress — existing vocabulary audited; candidate vocabulary discovery complete
**Scope:** Phase 7.4.1 — Designation Audit & Discovery

---

## 1. Question

Does the current Designation vocabulary adequately represent the evidence-supported patterns available to the system, and are there additional Designation concepts that should be considered for a general-purpose media archive?

The investigation has two related but distinct goals:

1. Evaluate whether existing Designations remain conceptually justified after the Phase 7 evidence expansion.
2. Identify recurring patterns that may represent useful Designation concepts not currently represented by the vocabulary.

The current four Designations are therefore treated as **working concepts, not a fixed taxonomy or predetermined final set**.

The number of Designations is not predetermined. The vocabulary may remain at its current size, expand, contract, or change structure as stronger evidence and conceptual justification become available.

---

## 2. General-Purpose Designation Principle

WASABI is intended to support arbitrary users rather than model the preferences of a single individual.

The current archive provides a development and evidence environment for evaluating the intelligence system, but the user's personal media history must not be treated as a representative model of typical media preferences.

Accordingly, the purpose of Designations is not to produce labels that describe the current archive owner particularly well. The purpose is to develop a reusable vocabulary capable of representing meaningful differences in how different users experience, value, and select media.

This creates two separate evidence questions:

### 2.1 Archive Evidence

Does the current archive provide enough evidence to identify a recurring and conceptually coherent pattern?

### 2.2 General Designation Suitability

If the pattern is real, does it represent a sufficiently broad and understandable concept that could plausibly describe users with different media tastes?

A pattern may therefore be:

- observable in the current archive but too narrow to justify a general Designation;
- conceptually useful as a general Designation but insufficiently evidenced by the current archive;
- both observable and conceptually suitable for a general Designation;
- or neither.

The current user's tastes are evidence for system development, not the target population for the Designation taxonomy.

> **The archive is the evidence source; it is not the definition of the user population.**

---

## 3. Governing Definition

A Designation is a descriptive classification representing a recurring and explainable pattern in the characteristics of media a user tends to value.

A Designation should describe **what kind of media characteristics a user consistently responds to**, rather than merely describing the contents of the archive.

A Designation is not:

- a genre;
- a single favorite trait;
- a high or low score;
- an archive statistic;
- a media-type preference by itself;
- a demographic or personality diagnosis;
- an inferred intention;
- a claim about why a user consumes media;
- a direct description of the current archive owner;
- or an automatically generated label created solely because a statistical pattern exists.

A useful Designation should have:

1. a coherent conceptual center;
2. observable supporting evidence;
3. a meaningful distinction from existing Designations;
4. explainable evidence for why it applies;
5. boundaries that clarify what it does not mean;
6. sufficient generality to be useful beyond a single user's tastes;
7. a plausible path toward deterministic implementation when implementation becomes appropriate.

---

## 4. Evaluation Method

Existing and candidate Designations are evaluated across the following dimensions.

### 4.1 Conceptual Distinctness

Does the concept represent a meaningfully different taste pattern from existing Designations?

### 4.2 Observable Evidence

What current archive evidence can directly support the concept?

### 4.3 Evidence Limitations

What aspects of the concept are currently inferred rather than directly observed?

### 4.4 Negative-Space Boundaries

What should the Designation explicitly **not** mean?

### 4.5 Designation-to-Designation Overlap

Could the concept be adequately represented by an existing Designation?

### 4.6 Designation-to-Identity Overlap

Would the concept describe characteristics of media preference, or would it instead describe a broader relationship between the user and media?

### 4.7 General-Purpose Suitability

Could the concept plausibly describe meaningful differences among users with substantially different media tastes?

A concept should not be rejected merely because it is not strongly represented by the current archive. Conversely, a pattern should not become a Designation merely because it occurs frequently in the current archive.

### 4.8 Implementation Readiness

Can the concept currently be represented through defensible, explainable signals?

Conceptual validity and implementation readiness are separate decisions.

### 4.9 Signal Independence

Do the proposed signals provide meaningfully distinct evidence, or are multiple signals measuring substantially the same underlying characteristic?

---

## 5. Existing Designation Audit

The current working Designation vocabulary contains:

- The Boundary Explorer
- The Curator
- The Engagement Architect
- The Deep Diver

These are not treated as a final set. Each is evaluated on its conceptual merits, independent of the assumption that it must remain in the system.

### 5.1 The Boundary Explorer

**Concept:** attraction to unusual, unconventional, speculative, altered, or boundary-pushing experiences.

**Disposition:** Retain as a working concept; semantic refinement required.

Current archive evidence contains substantial representation of unusual and unconventional territory through genres and traits associated with experimental, surreal, and speculative media, providing supporting evidence for the concept without directly measuring unconventional-media preference.

However, the current evidence does not directly establish deliberate exploration, novelty-seeking intent, or conscious boundary-pushing behavior.

The current implementation therefore contains proxy evidence rather than direct observation.

The concept should not be reduced to:

- high originality;
- experimental genre membership;
- high genre diversity;
- intentional exploration;
- novelty seeking;
- or Exploratory Philosophy.

The current `sustained` implementation term is also potentially misleading because it represents prevalence relative to archive size rather than temporal persistence.

**General-purpose assessment:** The underlying concept is sufficiently general to remain a viable Designation. Its eventual implementation should describe a reusable pattern of attraction toward unconventional media rather than reproduce the current user's particular genre distribution.

---

### 5.2 The Curator

**Concept:** appreciation for breadth, variety, craftsmanship, presentation, and the composition of a varied media archive.

**Disposition:** Retain provisionally; conceptual refinement required.

The current concept is less secure because the existing description implies deliberate archive-building behavior.

Archive size and genre diversity can establish archive composition, but they do not establish intentional collecting, deliberate diversification, discovery motivation, or curatorial intent.

The concept must therefore be narrowed toward observable characteristics rather than inferred motivation.

The Designation should not simply mean:

- large archive;
- high genre diversity;
- intentional collecting;
- deliberate diversification;
- or Breadth Philosophy.

Its continued viability depends on whether craft, presentation, and other archive-composition signals provide enough distinction from broader breadth-oriented concepts.

**General-purpose assessment:** A broadly useful “curatorial” concept is plausible, but the current implementation should not assume that users consciously curate their archives merely because their archives are diverse.

---

### 5.3 The Engagement Architect

**Concept:** appreciation for strong execution, pacing, engagement, construction, and systems that effectively sustain an experience.

**Disposition:** Retain; implementation refinement deferred.

The game scoring investigation demonstrated that strong mechanical, progression, and replayability qualities can coexist with lower emotional-impact and depth scores.

This supports a meaningful distinction between appreciation of **how an experience is constructed and maintained** and appreciation of emotional or conceptual depth.

The concept should not be reduced to:

- high overall score;
- high gameplay score;
- high engagement alone;
- being a “gamer”;
- mechanical quality exclusively;
- or Construction/Systems Identity.

**General-purpose assessment:** The concept is not inherently game-specific and can plausibly represent a general taste for well-constructed, effectively engaging experiences across media. Further implementation work should determine how media-specific evidence can support the broader concept without making it a game designation.

---

### 5.4 The Deep Diver

**Concept:** appreciation for depth, layers, psychological richness, emotional substance, and media that rewards sustained attention and interpretation.

**Disposition:** Retain; semantic refinement required.

Depth and emotional impact provide strong direct signals for this concept.

However, `average_score_strength` is indirect evidence, and psychological genre affinity is a contextual proxy rather than direct evidence of depth.

The phrase “repeated exploration” should not imply literal rereading, replaying, or revisitation because current temporal evidence cannot establish those behaviors.

The concept should not simply mean:

- high overall score;
- high depth alone;
- psychological genre membership;
- emotional intensity alone;
- literal rereading or replaying;
- or Interpretive Philosophy.

**General-purpose assessment:** The concept is broad enough to represent a meaningful taste pattern across different media types and user populations.

---

## 6. Candidate Designation Discovery

The discovery pass examined the expanded Phase 7 evidence without assuming that the four existing Designations exhaust the useful vocabulary.

The purpose of this section is **not** to automatically create new Designations. It records conceptual territories that may warrant further investigation.

### 6.1 Concept-First / Conceptualist

A potentially distinct territory concerns users for whom the central idea, premise, conceptual mechanism, or underlying “what if?” of a work is itself a major source of appeal.

This is potentially distinct from:

- Boundary Explorer — unusual territory is not necessarily the primary appeal;
- Deep Diver — a concept can be compelling without being especially deep;
- Originality — originality measures distinctiveness, not whether the central concept drives appreciation.

Current evidence provides indirect support through originality, depth, and repeated representation of concept-heavy genres, but the archive does not currently contain a direct measure of **concept centrality**.

**Disposition:** Candidate for further conceptual investigation; not ready for implementation.

**General-purpose potential:** High enough to investigate. The concept could plausibly apply to users with very different genre and media preferences.

---

### 6.2 Systems / Construction Appreciation

Phase 7 game evidence supports a potentially distinct appreciation for systems, mechanics, construction, progression, and the designed relationships that make an experience function.

This overlaps substantially with Engagement Architect.

The unresolved question is whether the underlying concept is:

- appreciation of effective engagement and construction; or
- a more specific fascination with systems and constructed mechanisms themselves.

The current evidence is heavily game-weighted and therefore does not yet establish a sufficiently broad cross-media concept.

**Disposition:** Candidate territory; continue evaluating against Engagement Architect before creating a separate Designation.

**General-purpose potential:** Plausible, but not established.

---

### 6.3 Atmospheric / Sensory Appreciation

Presentation, atmosphere, art, sound, and sensory cohesion appear as potentially meaningful qualities across the scoring system.

However, presentation is broader than atmosphere, and current evidence does not directly establish that atmospheric experience itself is an independent taste preference.

Genre membership in horror, surreal, or related categories also cannot be treated as direct evidence of atmospheric preference.

**Disposition:** Candidate territory requiring better evidence definition.

**General-purpose potential:** Plausible, but current evidence is insufficient to establish a distinct Designation.

---

### 6.4 Genre-Hybrid / Combinatorial Taste

The archive contains recurring genre combinations, including concentrated pairings such as mystery + visual novel and several horror/psychological/surreal combinations.

These patterns establish recurring archive structures.

They do not yet establish that the user values **genre combination itself** as a characteristic.

**Disposition:** Archive pattern, not currently a Designation candidate.

This distinction should remain explicit because genre co-occurrence is particularly vulnerable to being mistaken for preference evidence.

---

### 6.5 Emotional Resonance

Emotional impact is strongly represented in the scoring model and contributes substantially to Deep Diver.

Current evidence does not establish a sufficiently distinct emotional-preference territory independent of the depth-oriented concept.

**Disposition:** Currently represented; no separate Designation justified.

---

### 6.6 Craft / Execution Appreciation

Craft is an important shared signal across multiple current Designations.

Current evidence does not establish that craftsmanship alone represents a sufficiently distinct user classification.

**Disposition:** Shared supporting evidence; no separate Designation currently justified.

---

### 6.7 Mystery / Puzzle Orientation

The archive contains substantial mystery-oriented material and strong representation of visual-novel/mystery combinations.

However, current evidence cannot distinguish preference for mystery as a genre from preference for interpretation, conceptual depth, narrative construction, or other overlapping qualities.

**Disposition:** Interesting territory, but insufficiently distinct for a new Designation.

---

### 6.8 Liminal / Uncanny Appreciation

The archive contains recurring surreal, psychological, horror, experimental, and speculative material.

At present this territory is reasonably represented by Boundary Explorer.

A separate Designation would require evidence that attraction to liminality, uncanniness, uncertainty, or reality instability forms a distinct concept rather than being one expression of broader unconventional-media preference.

**Disposition:** Currently represented provisionally by Boundary Explorer.

---

## 7. Candidate Vocabulary Decision

The discovery pass does **not** establish that the current four Designations are the complete vocabulary.

It establishes three categories of result:

### 7.1 Existing Concepts That Remain Viable

- Boundary Explorer
- Curator
- Engagement Architect
- Deep Diver

### 7.2 Candidate Concepts Worth Further Investigation

- Concept-First / Conceptualist
- Systems / Construction Appreciation
- Atmospheric / Sensory Appreciation

### 7.3 Patterns Not Currently Supporting Distinct Designations

- Genre-hybrid frequency
- Emotional impact alone
- Craft alone
- Mystery frequency
- Liminal/uncanny genre concentration

The candidate concepts are **not implementation requirements**. They represent unresolved conceptual territory revealed by the evidence.

---

## 8. Generalization Boundary

The current archive should not be used to define what a “typical” WASABI user likes.

The archive owner's preferences are unusually specific and therefore useful for stress-testing the intelligence model, but they cannot establish population-wide preference patterns.

For a general-purpose Designation taxonomy, future concepts should be evaluated against a broader standard:

> **Could this concept meaningfully describe a user whose favorite media, genres, and consumption habits are substantially different from the current archive owner?**

This does not require every user to have every Designation.

The purpose of a broad vocabulary is instead to provide multiple coherent conceptual pathways through which different users can be represented.

A Designation should therefore describe a **reusable type of media appreciation**, not a normalized version of the current archive owner's taste.

---

## 9. Investigation Result

The current Designation vocabulary remains viable as a **working vocabulary**, but it is not considered complete.

The discovery pass identified additional conceptual territory that the current four Designations do not fully resolve, particularly:

- concept-first appreciation;
- systems/construction appreciation;
- atmospheric/sensory appreciation.

None currently has sufficient evidence and conceptual definition to justify immediate implementation.

No existing Designation currently has sufficient reason to be retired, merged, or split.

The appropriate next step is therefore neither to freeze the vocabulary at four nor to add speculative labels. Candidate concepts should undergo dedicated conceptual evaluation before implementation.

> **The Designation vocabulary is intentionally open-ended. Four is the current working set, not a target number.**

---

## 10. Deferred Work

The following remain open for subsequent Phase 7.4 investigation:

- dedicated evaluation of Concept-First / Conceptualist;
- dedicated evaluation of Systems / Construction Appreciation;
- dedicated evaluation of Atmospheric / Sensory Appreciation;
- continued evidence-driven discovery of additional candidate concepts as Phase 7 evidence expands;
- signal-independence analysis;
- proxy calibration;
- media-specific evidence handling;
- terminology refinement;
- threshold and weighting calibration;
- regression fixtures;
- evaluation against broader user scenarios rather than only the current archive.

No implementation changes are required by this investigation alone.

---

## 11. Governing Rules

> **Concept before implementation.**
> **Evidence before classification.**
> **Shared evidence is allowed; shared conclusion is not.**
> **The archive is an evidence source, not a model of the typical user.**
> **The number of Designations is not predetermined.**
> **A recurring archive pattern is not automatically a user preference.**
> **A candidate concept may be worth investigating before it is measurable.**
> **General-purpose usefulness must be evaluated separately from evidence in any single user's archive.**
