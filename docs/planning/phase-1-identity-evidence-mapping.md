# Phase 1 — Identity Evidence Mapping

## 1. Purpose

This document maps the current Identity concepts against the evidence actually available in the Media Tracker implementation.

The purpose is to determine:

* which existing signals genuinely support each Identity
* which signals are supporting or proxy evidence
* which signals overlap excessively
* which signals represent taste rather than curatorial orientation
* which current derived traits make legitimate but limited evidence
* where the current implementation cannot directly observe the intended concept
* which conceptual changes are required before Identity fixtures are rebuilt

This is an evidence audit, not an implementation plan.

No fixture, scoring rule, derived trait, or API implementation should be changed solely because of this document.

---

# 2. Current Identity Scoring Architecture

Identity scoring currently follows this general pipeline:

Archive Profile
→ Universal Averages
→ Media Averages
→ Derived Traits
→ Identity Weights
→ Normalized Contributions
→ Identity Score
→ Ranking

Each Identity defines weighted signals.

For each signal, the system:

1. looks for the signal in universal averages
2. otherwise looks for it in media averages
3. otherwise calculates a derived trait
4. normalizes the value
5. multiplies the normalized value by the Identity weight
6. adds the contribution to the Identity score

The resulting breakdown exposes:

* trait
* value
* weight
* normalized value
* contribution

This structure is considered useful and should be preserved unless later evidence demonstrates otherwise.

---

# 3. Evidence Classification

For this audit, Identity signals are classified into four categories.

## 3.1 Direct Evidence

A signal that directly measures a meaningful component of the Identity concept.

Example:

* originality may directly support an orientation toward unconventional media.

Direct evidence still does not necessarily prove the complete Identity.

## 3.2 Supporting Evidence

A signal that meaningfully strengthens an Identity interpretation but is not sufficient by itself.

Example:

* genre diversity may support a breadth-oriented interpretation.

## 3.3 Proxy Evidence

A signal that correlates with the intended concept but measures something adjacent rather than the concept itself.

Example:

* experimental genre prevalence may act as a proxy for exploratory behavior.

Proxy evidence must not be presented as direct observation.

## 3.4 Insufficient Evidence

A signal that may correlate with an Identity but does not meaningfully establish it.

Example:

* archive size alone does not establish a breadth-oriented philosophy.

---

# 4. Interpretive Philosophy

## 4.1 Concept

Interpretive Philosophy describes a recurring orientation toward meaning-making, examination, ambiguity, reflection, and deeper understanding of media.

The Identity is not simply:

> “likes deep media.”

It describes a relationship with media in which interpretation itself appears to be valuable.

---

## 4.2 Current Supporting Signals

### Depth

**Classification:** Direct / strong supporting evidence

Depth is a meaningful component of interpretive engagement.

However:

> depth alone does not establish Interpretive Philosophy.

A curator may value emotionally or intellectually substantial media without demonstrating a broader interpretive orientation.

---

### Analysis

**Classification:** Proxy evidence

The current implementation derives analysis from the prevalence of psychological and mystery genres.

This provides useful contextual evidence for interpretive interest, but it does not directly measure analytical behavior.

Therefore:

> Analysis is currently a genre-derived proxy for interpretive orientation.

---

### Ambiguity

**Classification:** Proxy evidence

The current implementation derives ambiguity from psychological, mystery, and surreal genre prevalence.

This can support the interpretation that the archive favors material with unresolved or ambiguous meaning.

However:

> liking ambiguous media does not prove that the curator engages interpretively with that ambiguity.

---

### Reflection

**Classification:** Proxy evidence

Reflection is currently derived from drama and psychological genre prevalence.

This provides supporting context but does not directly observe reflective engagement.

---

### Emotional Impact

**Classification:** Supporting evidence

Emotional engagement may strengthen an interpretation-oriented profile when combined with depth, ambiguity, analysis, and reflection.

It should not independently establish Interpretive Philosophy.

---

## 4.3 Current Evidence Strength

Interpretive Philosophy has the strongest conceptual alignment with the current evidence model.

The available system already contains several signals that can reasonably support the concept:

* depth
* analysis
* ambiguity
* reflection
* emotional impact
* psychological/mystery/surreal genre prevalence

The primary limitation is that several of these signals are genre-derived proxies rather than direct measurements of interpretation.

---

## 4.4 Important Guardrail

The system must not claim:

> “You analyze media deeply.”

when the evidence actually demonstrates:

> “Your archive contains many forms of media commonly associated with analysis and interpretation.”

The distinction matters.

---

## 4.5 Relationship to Deep Diver Designation

Deep Diver Designation and Interpretive Philosophy may use overlapping evidence.

They must not produce the same conclusion.

Deep Diver:

> recognizable taste pattern involving sustained attention, depth, and layered experiences.

Interpretive Philosophy:

> recurring orientation toward meaning-making and interpretation.

The same archive can legitimately demonstrate both.

---

# 5. Exploratory Philosophy

## 5.1 Concept

Exploratory Philosophy describes a recurring orientation toward unfamiliarity, discovery, creative contrast, unconventional forms, and experiences outside established patterns.

The Identity is not simply:

> “likes experimental media.”

It describes an apparent relationship with unfamiliarity.

---

## 5.2 Current Supporting Signals

### Originality

**Classification:** Direct / strong supporting evidence

Originality is relevant to a preference for unconventional experiences.

However, high originality does not prove exploratory behavior.

---

### Experimental Affinity

**Classification:** Proxy evidence

The current implementation derives experimental affinity from experimental genre prevalence.

This is useful evidence that the archive contains experimental media.

It does not directly establish that the curator intentionally seeks unfamiliar experiences.

---

### Novelty

**Classification:** Proxy evidence

The current implementation derives novelty from the same experimental genre percentage used by experimental affinity.

This creates an important evidence-model issue:

> Experimental Affinity and Novelty currently represent substantially overlapping underlying evidence.

They should not be treated as independent discoveries merely because they have different names.

---

### Genre Diversity

**Classification:** Supporting evidence

A broad genre range may support exploration.

However, diversity alone does not establish exploratory intent.

---

### Depth

**Classification:** Weak supporting evidence

Depth may accompany exploration, especially when unfamiliar media is engaged with seriously.

However, depth is not inherently exploratory and should not be used as a primary exploratory signal without explicit justification.

---

## 5.3 Current Evidence Strength

Exploratory Philosophy remains conceptually viable, but the current implementation observes **experimental taste** more directly than **exploratory behavior**.

This is a major evidence limitation.

The system should therefore treat exploratory interpretation as an inference from observable taste patterns rather than direct observation of intent.

---

## 5.4 Important Guardrail

The system must not imply:

> “You deliberately seek unfamiliar experiences.”

unless the evidence actually supports intentionality.

A safer interpretation is:

> “Your archive repeatedly engages with unconventional and experimental experiences, suggesting an exploratory orientation.”

The second statement accurately communicates the inferential nature of the conclusion.

---

## 5.5 Relationship to Boundary Explorer Designation

Boundary Explorer Designation describes a recognizable taste classification involving unusual, speculative, experimental, or boundary-pushing media.

Exploratory Philosophy describes the broader orientation toward encountering unfamiliar experiences.

Shared evidence is acceptable.

Shared conclusion is not.

---

# 6. Breadth / Curatorial Variety Philosophy

## 6.1 Concept

Breadth / Curatorial Variety Philosophy describes an orientation toward maintaining and engaging with meaningful variety across genres, forms, or types of media.

The Identity is not simply:

> “has a large archive.”

---

## 6.2 Current Supporting Signals

### Genre Diversity

**Classification:** Direct observable evidence for breadth; proxy evidence for curatorial philosophy

The system can directly observe how many genres are represented.

That is strong evidence for archive breadth.

It is weaker evidence for the philosophical claim that the curator values breadth.

---

### Archive Size

**Classification:** Contextual evidence only

A larger archive provides more opportunity for variety but does not establish variety itself.

A large archive can remain highly specialized.

Archive size must therefore not be treated as a primary Breadth Identity signal.

---

### Craft

**Classification:** Insufficient for Breadth

Craft may be associated with curatorial selectivity, but it does not directly establish breadth or variety.

---

### Presentation

**Classification:** Insufficient for Breadth

Presentation does not establish a breadth-oriented relationship.

If retained in any Breadth-related scoring model, its conceptual role must be explicitly justified.

---

## 6.3 Current Evidence Strength

Breadth is observable.

Curatorial philosophy is not.

The current system can confidently say:

> “This archive is broad.”

It cannot independently establish:

> “This curator intentionally seeks variety.”

without additional evidence.

Therefore Breadth / Curatorial Variety Philosophy remains provisional.

---

## 6.4 Important Guardrail

The system must not equate:

* archive size
* genre count
* genre diversity

with intentional diversification.

The Identity should remain framed as an evidence-supported interpretation.

---

## 6.5 Relationship to Curator Designation

Curator Designation describes an observable archive/taste classification involving breadth, collection behavior, and variety.

Breadth / Curatorial Variety Philosophy describes the broader relationship with variety.

The two may coexist, but the Identity must not simply restate the Designation.

---

# 7. Construction / Systems Philosophy

## 7.1 Status

**Deferred.**

Construction / Systems Philosophy does not currently have sufficiently independent evidence.

---

## 7.2 Current Evidence

The current system includes:

* gameplay mechanics
* system design
* engagement
* craft
* pacing

However, the current `system_design` derived signal is itself based on gameplay mechanics.

This makes the signal highly dependent on an existing media-specific trait.

---

## 7.3 Overlap With Engagement Architect

Engagement Architect already emphasizes:

* engagement
* craft
* gameplay mechanics
* pacing

This creates substantial conceptual overlap.

The current evidence therefore does not justify introducing Construction / Systems Philosophy as a distinct Identity.

---

## 7.4 Decision

Do not implement Construction / Systems Philosophy in the current Identity catalog.

Retain the concept as a documented deferred candidate.

A future version may revisit it if the archive model gains broader structural evidence independent of engagement and gameplay mechanics.

---

# 8. Signal Duplication Audit

The current derived-trait system contains several cases where apparently distinct signals are generated from overlapping evidence.

## 8.1 Experimental Affinity + Novelty

Both currently depend on experimental genre prevalence.

This means they should be considered related representations of the same underlying evidence.

They should not automatically receive separate conceptual weight simply because they have different names.

---

## 8.2 Analysis + Ambiguity + Reflection

These signals are all derived from genre prevalence:

* Analysis → psychological + mystery
* Ambiguity → psychological + mystery + surreal
* Reflection → drama + psychological

They are not identical, but they are correlated.

An Identity that heavily weights all three risks effectively counting genre composition multiple times.

---

## 8.3 Genre Diversity

Genre diversity is a fundamentally different type of derived evidence because it measures archive composition rather than a particular genre family.

It should therefore be treated separately from signals such as analysis or ambiguity.

---

# 9. Identity vs Designation Evidence Overlap

Evidence overlap is not inherently a problem.

The system should distinguish:

> **Shared evidence**

from:

> **Shared conclusion**

For example:

### Acceptable

Originality supports:

* Boundary Explorer Designation
* Exploratory Philosophy

provided the two systems interpret originality differently.

### Not acceptable

Originality independently causes:

* Boundary Explorer Designation
* Boundary Explorer Identity

because the two conclusions collapse into the same classification.

---

# 10. Current Fixture Assessment

The current Identity fixtures represent the previous Identity ontology.

They currently include:

* Boundary Explorer
* Deep Diver
* Engagement Architect

These names directly overlap with Designations.

The fixtures also contain weighted signal sets that reflect the older conceptual model.

Therefore:

> The fixtures should not be treated as authoritative evidence definitions for the new Identity catalog.

They are implementation artifacts that must eventually be replaced or substantially revised.

---

# 11. Evidence Mapping Summary

| Identity                                | Strongest Evidence | Supporting Evidence    | Proxy Evidence                  | Major Limitation                                          |
| --------------------------------------- | ------------------ | ---------------------- | ------------------------------- | --------------------------------------------------------- |
| Interpretive Philosophy                 | depth              | emotional impact       | analysis, ambiguity, reflection | interpretation itself is not directly observed            |
| Exploratory Philosophy                  | originality        | genre diversity, depth | experimental affinity, novelty  | exploration/intent is not directly observed               |
| Breadth / Curatorial Variety Philosophy | genre diversity    | archive composition    | archive size                    | intentional valuation of variety is not directly observed |
| Construction / Systems Philosophy       | —                  | —                      | gameplay/system signals         | excessive overlap with Engagement Architect               |

---

# 12. Evidence Confidence by Concept

## Interpretive Philosophy

**Status: Strong provisional support**

The current archive model contains multiple signals that can reasonably support the concept.

The primary concern is proxy dependence, not conceptual weakness.

---

## Exploratory Philosophy

**Status: Conditional provisional support**

The concept survives.

The current evidence supports an interpretation of exploratory orientation, but does not directly observe exploration or intent.

---

## Breadth / Curatorial Variety Philosophy

**Status: Conditional provisional support**

The archive can demonstrate breadth.

The current model is weaker at demonstrating breadth as a curatorial philosophy.

---

## Construction / Systems Philosophy

**Status: Deferred**

Current evidence does not provide sufficient conceptual independence from Engagement Architect.

---

# 13. Evidence Gaps

The current model cannot directly observe several things the Identity concepts would ideally describe.

### Exploration

The system cannot directly observe:

> “I chose this because it was unfamiliar.”

### Interpretation

The system cannot directly observe:

> “I spent significant time thinking about what this meant.”

### Curatorial Variety

The system cannot directly observe:

> “I intentionally seek variety.”

These are genuine evidence gaps.

They should not be silently converted into certainty by scoring language.

---

# 14. What Should Not Change Yet

This audit does not justify immediately changing:

* derived-trait formulas
* universal trait definitions
* media trait definitions
* scoring normalization
* Identity ranking
* Primary Identity selection
* Secondary Identity threshold
* tie-breaking
* API shape
* recommendation behavior

Those decisions require separate analysis.

---

# 15. What the Audit Does Justify

The evidence mapping establishes several requirements for the eventual Identity implementation.

### 15.1 Avoid duplicate evidence weighting

Signals derived from the same underlying evidence should not be treated as fully independent without justification.

### 15.2 Distinguish direct evidence from proxy evidence

Explanations should avoid implying that a proxy directly measures an Identity concept.

### 15.3 Preserve evidence limitations

Exploratory and Breadth identities must communicate inference rather than falsely claiming access to intent.

### 15.4 Rebuild fixtures around the new ontology

The old Identity fixtures should not be mechanically renamed.

### 15.5 Preserve the scoring architecture where possible

The weighted breakdown model is useful and explainable.

The conceptual problem is primarily the signal selection and interpretation, not the existence of weighted scoring.

---

# 16. Implementation Readiness

The Identity subsystem is **not yet ready for fixture replacement**.

It is ready for the next conceptual decision:

> **Determine the final evidence model for each Identity using only signals the archive can legitimately support.**

The next work should therefore be a **Fixture Redesign / Evidence Contract Pass**, not immediate code modification.

---

# 17. Final Audit Conclusion

The Identity system does not need to be rewritten.

Its existing weighted-scoring architecture is structurally useful.

The primary problem is that the current Identity signal sets were designed for the previous Identity ontology and contain significant overlap with the old Designation vocabulary.

The new conceptual catalog can be supported by the current system, but only if its evidence is interpreted honestly:

> **Interpretive Philosophy has the strongest current evidence.**

> **Exploratory Philosophy is viable but relies substantially on proxy evidence for exploration.**

> **Breadth / Curatorial Variety Philosophy is viable but relies on observable breadth as a proxy for curatorial intent.**

> **Construction / Systems Philosophy should remain deferred because current evidence overlaps too heavily with Engagement Architect.**

The governing implementation principle is therefore:

> **Do not make the model more certain than the evidence allows.**

And the governing evolution principle remains:

> **Preserve the working scoring infrastructure; change the conceptual model only where the evidence requires it.**
