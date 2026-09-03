# Designation System Evolution

**Status:** Reconciled working document
**Phase:** Phase 1 — Intelligence Alignment
**Guiding principle:** **Evolution, not rewrite.**

---

# 1. Purpose

This document records the evolution of the Media Tracker Designation system.

Its purpose is to preserve the reasoning behind the current Designation architecture while identifying areas that may evolve in the future.

A Designation is not intended to be a personality diagnosis or a substitute for the Identity layer.

---

# 2. What a Designation Means

A Designation is a recognizable taste classification.

Its core question is:

> **What recognizable taste classification fits this archive?**

A Designation should describe a recurring characteristic of the media relationship.

It should not describe:

- personality
- psychological diagnosis
- personal identity
- a single favorite genre
- an arbitrary recommendation category
- a broad curator philosophy
- an isolated preference

---

# 3. Designation vs. Identity

The distinction is now locked.

### Designation

> **What do you tend to like?**

### Identity

> **What relationship do you tend to establish with what you like?**

A Designation may describe:

> attraction to experimental media

while an Identity may describe:

> an exploratory relationship with unfamiliar territory.

The evidence can overlap.

The conclusion cannot.

---

# 4. Current Designation Catalog

The current working catalog contains:

1. Boundary Explorer
2. Engagement Architect
3. Deep Diver
4. Curator

These are current working Designation concepts.

They are not required to be permanent.

Future Designation evolution may:

- rename a Designation
- redefine one
- split one
- merge overlapping classifications
- retire one
- introduce another

Such changes should be driven by evidence or explicit conceptual decisions rather than taxonomy expansion for its own sake.

---

# 5. Boundary Explorer

## Concept

Boundary Explorer describes attraction to unfamiliar, experimental, unconventional, or boundary-pushing media.

Current evidence includes:

- originality
- depth
- sustained exploration
- media-type breadth
- experimental and unconventional genre patterns

Its recommendation metadata favors:

- unusual concepts
- genre hybrids
- experimental storytelling

---

## Boundary Explorer vs. Exploratory Philosophy

These concepts intentionally remain separate.

### Boundary Explorer

> **What unconventional media do you tend to like?**

### Exploratory Philosophy

> **How does your archive relate to unfamiliar territory?**

Boundary Explorer describes a taste classification.

Exploratory Philosophy describes a broader curatorial orientation.

The current evidence model cannot directly observe deliberate exploration.

Therefore the Identity must not be defined merely as “Boundary Explorer, but more abstract.”

---

# 6. Engagement Architect

## Concept

Engagement Architect describes a recognizable preference for strongly constructed, engaging experiences.

Current scoring incorporates:

- engagement strength
- craft strength
- gameplay strength
- pacing

The Designation is intentionally preserved.

---

## Relationship to Construction / Systems Philosophy

Construction / Systems Philosophy was stress-tested as a possible Identity and deferred.

The reason is that current evidence overlaps too heavily with Engagement Architect.

This is not a problem with Engagement Architect.

It is a reason not to create a redundant Identity.

A future Construction / Systems Identity would require broader structural evidence than the current implementation provides.

---

# 7. Deep Diver

## Concept

Deep Diver describes sustained attraction to layered, deep, emotionally involving experiences.

Current characteristics include:

- depth
- emotional impact
- strong average score
- psychological genre affinity

---

## Relationship to Interpretive Philosophy

Deep Diver and Interpretive Philosophy may legitimately coexist.

### Deep Diver

> A taste for deep and layered experiences.

### Interpretive Philosophy

> A recurring orientation toward interpretation, reflection, ambiguity, and meaning.

The distinction is intentional.

High depth should not automatically produce both conclusions merely because both systems use the same signal.

---

# 8. Curator

## Concept

Curator describes a recognizable broad or deliberate-seeming archival taste pattern involving:

- craft
- presentation
- archive composition
- genre diversity

The current Designation also incorporates archive size as one component.

This remains a known conceptual weakness.

---

## Archive Size Limitation

Archive size measures quantity.

It does not directly measure:

- deliberateness
- care
- curatorial intent
- breadth

Therefore archive size should be treated cautiously.

The existing calculation is preserved for Phase 1 unless a direct conceptual conflict is demonstrated.

Future refinement may determine whether archive size genuinely belongs in Curator scoring.

---

# 9. Designation Scores

Designation scores answer:

> **How strongly does this archive fit this taste classification?**

All current Designation scores are on a comparable 0–100 scale.

The current scoring architecture should be preserved.

A high Designation Score is not automatically:

> Classification Confidence

and should not be described as such.

---

# 10. Signal Strength vs. Classification Confidence

The existing `designationConfidence` terminology is historical and misleading.

The current semantic interpretation is closer to:

> **Signal Strength**

It reflects the strength of the underlying designation-related signals.

It is not a statistical probability that the Designation is correct.

It is not a universal confidence measure.

It should therefore be presented to users as **Signal Strength** while the existing API field remains preserved for compatibility.

---

# 11. Primary Designation

The system calculates multiple Designation candidates.

The Profile selects:

> **ONE PRIMARY Designation**

The current deterministic highest-score selection is preserved.

Exact tie behavior remains deterministic.

Incidental fixture ordering should not become an intentional conceptual ranking rule.

---

# 12. Designation Evidence

Designation metadata may include:

- traits
- associated genres
- recommendation bias
- designation basis

These are explanatory and recommendation-oriented metadata.

They do not constitute a universal evidence schema.

---

## `designationBasis`

`designationBasis` should be understood as:

> **a concise summary of dominant classification signals**

It is not intended to enumerate every signal participating in the underlying Designation rules.

The backend remains authoritative for this value.

The frontend should consume the backend-produced representation rather than independently reconstructing it.

The obsolete frontend duplicate producer has been removed.

No backend calculation change is required.

---

# 13. Recommendation Bias

Designation `recommendation_bias` is preserved.

It represents:

> **what kinds of future recommendations may fit the classification**

It is not itself a recommendation score.

It is not evidence that a Recommendation Engine currently exists.

Recommendation generation remains a future system.

---

# 14. Relationship to Findings

Designations are not Findings.

A Designation classifies a recognizable taste pattern.

A Finding interprets evidence.

The systems may use overlapping evidence, but they answer different questions.

---

# 15. Designation Evolution Rules

Future Designation changes should follow these rules:

1. Define the conceptual classification first.
2. Identify the evidence that legitimately supports it.
3. Test it against existing Designations.
4. Test negative-space cases.
5. Define deterministic ranking behavior.
6. Add regression protection.
7. Only then implement.

A new Designation should not be created merely because a high-scoring signal lacks a badge.

---

# 16. What Phase 1 Does Not Do

Phase 1 does not require:

- a larger Designation catalog
- machine-learning classification
- probabilistic classification
- Classification Confidence math
- arbitrary near-tie thresholds
- Designation co-primaries
- a universal evidence schema
- recommendation scoring
- redesign of the current scoring architecture

---

# 17. Current Designation Status

| Designation          | Current treatment                      |
| -------------------- | -------------------------------------- |
| Boundary Explorer    | Preserve / flesh out                   |
| Engagement Architect | Preserve / flesh out                   |
| Deep Diver           | Preserve / provisional                 |
| Curator              | Preserve / clarify archive-size signal |

This is a working classification, not a promise that these four names are permanent.

---

# 18. Final Principle

The Designation system should evolve only when the conceptual model requires it.

> **A Designation describes a recognizable taste classification; an Identity describes a broader curatorial philosophy.**

And:

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**
