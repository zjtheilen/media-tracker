# Phase 7.4.2 — Candidate Designation Evaluation

**Status:** Investigation complete — current evidence boundary established

**Scope:** Phase 7.4.2 — Candidate Designation Evaluation

## 1. Question

Do the additional Designation candidates identified during Phase 7.4.1 have sufficient conceptual distinctness, observable evidence, general-purpose applicability, and implementation readiness to justify addition to the current Designation vocabulary?

The candidates evaluated are:

* Concept-First / Conceptualist
* Systems / Construction Appreciation
* Atmospheric / Sensory Appreciation

This investigation does not determine the final number of Designations. It determines whether each candidate currently has enough evidence to advance toward implementation.

---

## 2. Evaluation Method

Each candidate was evaluated against the following criteria:

1. **Conceptual distinctness** — Does the candidate describe a coherent form of media appreciation?
2. **Observable evidence** — Can the current archive and scoring model actually provide evidence for it?
3. **Evidence limitations** — What can the current data not establish?
4. **Negative-space boundaries** — What related patterns must not be treated as equivalent?
5. **Designation overlap** — Does the candidate remain meaningfully distinct from existing Designations?
6. **Identity overlap** — Does the candidate describe a media-appreciation pattern rather than an interpretive or identity-level relationship?
7. **General-purpose suitability** — Could the concept reasonably apply to users with substantially different media tastes?
8. **Implementation readiness** — Does the current system contain sufficiently direct and independent signals to implement it without inventing meaning?
9. **Signal independence** — Are the proposed signals actually measuring the candidate, or merely proxies for related concepts?

---

# 3. Concept-First / Conceptualist

## 3.1 Concept

Concept-First describes users for whom the central idea, premise, conceptual mechanism, or underlying concept of a work is itself a major source of appeal.

The defining distinction is not that the work is unusual, deep, original, or complex. It is that the **idea itself** is important to why the work is valued.

---

## 3.2 Existing Evidence

The current scoring model contains relevant but indirect signals:

* **Originality** captures distinctive ideas, combinations, perspectives, systems, and stylistic approaches.
* **Depth** captures ideas, themes, substance, layers, and interpretation.
* **Overall score** establishes that a work was positively valued.

These signals demonstrate that concept-related qualities can be present in highly valued works.

They do not establish that the central concept itself was a major source of the user's appeal.

---

## 3.3 Evidence Boundary

`Originality + Depth` must not be recombined and relabeled as `concept_strength`.

A work can receive high Originality because of visual style, execution, or an unusual presentation. A work can receive high Depth because of character, theme, emotional substance, or interpretation. A high overall score can also be driven by Craft, Engagement, Emotional Impact, or Presentation.

Therefore the current model cannot distinguish:

> "This work has an original and deep concept."

from:

> "The concept itself is a major reason this user values the work."

The second statement is what a Concept-First Designation would need to establish.

The absence of a direct signal is itself an evidence boundary.

---

## 3.4 Distinction From Existing Designations

**Boundary Explorer** concerns attraction toward unconventional or boundary-pushing territory.

**Deep Diver** concerns appreciation for depth, layers, psychological richness, and interpretive substance.

**Engagement Architect** concerns appreciation for effective construction, pacing, engagement, and execution.

**Concept-First** would instead concern the central idea itself as a source of appeal.

These concepts may share evidence, but shared evidence does not require a shared conclusion.

---

## 3.5 Negative-Space Boundaries

Concept-First should not be inferred solely from:

* high Originality
* high Depth
* high Overall Score
* experimental or unusual genres
* complex narratives
* unconventional presentation
* one highly conceptual work

It should also not be interpreted as evidence of the user's personality, intelligence, creativity, or intentional media-selection strategy.

---

## 3.6 General-Purpose Suitability

Concept-First has strong general-purpose potential.

It can apply across:

* games
* books
* films
* television
* other media

It does not depend on a particular genre, medium, or narrow taste profile.

---

## 3.7 Implementation Readiness

**Not ready.**

A new `concept_strength` signal should not be created solely to make the Designation implementable.

The current evidence supports the concept as a legitimate candidate while simultaneously demonstrating that the current scoring model cannot directly measure it.

**Disposition: RETAIN AS ACTIVE CANDIDATE — DIRECT EVIDENCE GAP**

---

# 4. Systems / Construction Appreciation

## 4.1 Concept

Systems / Construction Appreciation describes appreciation for the mechanisms, structures, systems, construction, progression, or underlying architecture of a work.

The defining question is not whether the work is engaging, but whether the **construction itself** is a meaningful source of appeal.

---

## 4.2 Existing Evidence

Current game-specific scoring provides relevant signals including:

* gameplay mechanics
* level design / progression
* replayability / systems
* game-specific construction
* Craft
* Engagement

Phase 7.3 also established that strong mechanical/systemic qualities can diverge from emotional and depth qualities.

This provides evidence that systems-oriented appreciation is a meaningful semantic territory.

---

## 4.3 Distinction From Engagement Architect

The concepts overlap but are not identical.

**Engagement Architect** describes appreciation for effective construction in service of an engaging experience.

**Systems / Construction Appreciation** describes appreciation for systems, mechanisms, structures, or construction themselves.

For example:

> "I love how tightly this game keeps me moving."

is primarily Engagement Architect evidence.

Whereas:

> "The pacing is mediocre, but I am fascinated by how this system works."

could represent Systems / Construction Appreciation.

The distinction is therefore conceptually meaningful.

---

## 4.4 Evidence Boundary

The current implementation is heavily game-oriented.

The existing `calculate_system_design()` helper is effectively derived from the game-specific `gameplay_mechanics` signal. It therefore measures a game characteristic rather than a general cross-media preference.

The current archive does not establish that systems/construction appreciation operates consistently across books, videos, and games.

The concept should therefore not be implemented as a general-purpose Designation using the current game-specific proxy.

---

## 4.5 Negative-Space Boundaries

Systems / Construction should not be inferred solely from:

* playing many games
* high Gameplay Mechanics scores
* high Craft
* high Engagement
* high overall scores
* liking complex systems in one game

It should not be treated as synonymous with being a "gamer" or with Engagement Architect.

---

## 4.6 General-Purpose Suitability

The concept has strong potential as a general-purpose Designation because systems and construction can exist across media.

However, current evidence is insufficient to establish that the same appreciation pattern can be measured outside games.

---

## 4.7 Implementation Readiness

**Not ready.**

No new cross-media systems signal should be invented at this stage.

The candidate should remain available for future investigation if additional cross-media evidence or direct scoring signals become available.

**Disposition: RETAIN AS ACTIVE CANDIDATE — CROSS-MEDIA EVIDENCE GAP**

---

# 5. Atmospheric / Sensory Appreciation

## 5.1 Concept

Atmospheric / Sensory Appreciation describes appreciation for atmosphere, aesthetic presentation, sound, visual identity, sensory cohesion, or the overall experiential texture of a work.

---

## 5.2 Existing Evidence

The current model contains related signals:

* Presentation
* game-specific Art / Atmosphere

These establish that atmospheric and presentation-related qualities exist within the scoring model.

They do not establish an independent cross-media preference for atmosphere or sensory experience.

---

## 5.3 Evidence Boundary

Presentation currently encompasses more than atmosphere alone, including aspects of clarity and cohesion.

Simply renaming Presentation as an atmospheric preference would therefore change the semantic meaning of the existing signal without adding evidence.

Likewise:

* horror
* surreal
* experimental
* visually distinctive
* emotionally intense

do not independently establish atmospheric preference.

---

## 5.4 Overlap

The concept has potential overlap with:

* Curator through presentation/craft
* Deep Diver through emotional or experiential depth
* genre-based patterns
* existing Presentation scoring

A distinct Designation would require evidence that atmospheric/sensory qualities form an independent recurring source of appreciation.

---

## 5.5 General-Purpose Suitability

The concept is plausibly general-purpose and could apply across media.

However, general-purpose plausibility is not sufficient evidence for implementation.

---

## 5.6 Implementation Readiness

**Not ready.**

No independent atmospheric/sensory signal is currently justified.

**Disposition: DEFER — INSUFFICIENT INDEPENDENT EVIDENCE**

---

# 6. Candidate Comparison

| Candidate              | Conceptual validity | Current evidence                  | General-purpose potential | Current disposition                         |
| ---------------------- | ------------------- | --------------------------------- | ------------------------- | ------------------------------------------- |
| Concept-First          | Strong              | Indirect                          | Strong                    | Active candidate — direct evidence gap      |
| Systems / Construction | Strong              | Media-specific / game-heavy       | Strong                    | Active candidate — cross-media evidence gap |
| Atmospheric / Sensory  | Plausible           | Insufficient independent evidence | Plausible                 | Defer                                       |

---

# 7. Implementation Decision

No new Designation is justified for implementation from this investigation.

In particular:

* Do not create `concept_strength` solely to implement Concept-First.
* Do not promote the game-specific systems signal into a general-purpose Designation.
* Do not relabel Presentation as Atmospheric / Sensory.
* Do not add thresholds, weights, or Designation rules for these candidates.
* Do not alter the existing four Designations based on this investigation.

The current four Designations therefore remain the working implementation vocabulary:

* Boundary Explorer
* Curator
* Engagement Architect
* Deep Diver

Their provisional status remains unchanged.

---

# 8. Investigation Result

Phase 7.4.2 establishes that the candidate vocabulary contains three different evidence states:

### Concept-First

A strong, general-purpose concept with a clear semantic gap in the current model, but without a direct signal capable of measuring the defining preference.

### Systems / Construction

A strong and distinct concept with meaningful current evidence, but evidence is currently concentrated in game-specific dimensions and does not justify a general-purpose implementation.

### Atmospheric / Sensory

A plausible general-purpose concept, but current evidence does not demonstrate sufficient independence from existing presentation and related signals.

No candidate has crossed the implementation threshold.

---

# 9. What This Investigation Changes

This investigation changes the documented vocabulary, not the implementation.

The Designation system now explicitly recognizes:

* Concept-First as a meaningful candidate with a direct evidence gap.
* Systems / Construction as a meaningful candidate with a cross-media evidence gap.
* Atmospheric / Sensory as a deferred concept requiring independent evidence.

No production code, scoring weights, thresholds, Designation rules, or user-facing classifications are changed.

---

# 10. Evidence Boundary

The central conclusion of this investigation is:

> **A plausible Designation concept does not justify creating a signal to measure it.**

Existing dimensions may provide evidence relevant to a candidate without being sufficient to classify the candidate.

The absence of a direct signal is itself an evidence boundary.

WASABI should not manufacture a preference signal by recombining existing dimensions and assigning it a new semantic meaning.

---

# 11. Governing Rules

The following rules continue to govern Designation evolution:

* **Concept before implementation.**
* **Evidence before classification.**
* **Shared evidence is allowed; shared conclusion is not.**
* **The archive is the evidence source; it is not the definition of the user population.**
* **The number of Designations is not predetermined.**
* **A recurring archive pattern is not automatically a user preference.**
* **General-purpose suitability must be evaluated separately from evidence in the current archive.**
* **The absence of a direct signal is an evidence boundary.**
* **Measure the relationship before interpreting the relationship.**
