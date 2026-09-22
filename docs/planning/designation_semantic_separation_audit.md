# Phase 7.4.4 — Designation Semantic Separation Audit

**Project:** Media Tracker

**Authoritative branch:** `develop-3`

**Phase:** 7 — Evidence Expansion

**Status:** INVESTIGATION COMPLETE

---

## 1. Purpose

This document records the Phase 7.4.4 investigation into the semantic separation of the current Designation system.

The investigation examines whether existing Designation evaluators remain meaningfully distinguishable when individual component signals are present without the broader conceptual pattern described by the corresponding Designation.

The investigation focuses on:

* Boundary Explorer evidence arising from broad genre exposure;

* Curator evidence arising from archive size and genre diversity;

* separation between positive Designation fixtures and broader archive profiles;

* consistency between Designation metadata and the evidence actually used by its evaluator.

This investigation does not authorize scoring-model changes, new Designations, new Identity semantics, or changes to existing Designation vocabulary without separate evidence and design review.

---

## 2. Governing Principle

> **Designation evidence should support the semantic meaning of the Designation, not merely satisfy its component signals.**

A Designation may legitimately combine multiple observable signals.

However, individual signals must not automatically be treated as evidence of the broader intention, motivation, preference, or behavioral pattern described by the Designation.

Archive composition is descriptive evidence.

It does not automatically establish:

* intentionality;

* exploration;

* curation;

* motivation;

* preference;

* personality.

---

## 3. Boundary Explorer Semantic Audit

### 3.1 Existing Generalist Profile

The existing Generalist fixture was evaluated through the same Designation engine used by the positive Boundary Explorer fixture.

The Generalist profile produced:

| Designation          | Score |
| -------------------- | ----: |
| Boundary Explorer    |  71.4 |
| Curator              |  40.5 |
| Engagement Architect | 27.95 |
| Deep Diver           | 27.35 |

The Boundary Explorer score is substantially higher than the other Designation scores for the Generalist profile.

The Generalist fixture contains broad representation across multiple genres rather than a concentrated boundary-oriented archive pattern.

### 3.2 Positive Boundary Explorer Comparison

The existing Boundary Explorer fixture produced:

| Designation          | Score |
| -------------------- | ----: |
| Boundary Explorer    |  83.8 |
| Deep Diver           | 58.25 |
| Curator              | 41.25 |
| Engagement Architect | 23.85 |

The positive fixture therefore produces a higher Boundary Explorer score than the Generalist fixture.

The comparison demonstrates that the evaluator distinguishes the deliberately boundary-oriented fixture from the broader Generalist fixture.

However, the Generalist still produces substantial Boundary Explorer evidence.

### 3.3 Originality Counterfactual

A read-only counterfactual modified the Generalist profile in memory by setting its `universalAverages.originality` value to zero.

No fixture file or application code was modified.

The resulting Boundary Explorer score decreased:

| Profile state                       | Boundary Explorer |
| ----------------------------------- | ----------------: |
| Original Generalist                 |              71.4 |
| Generalist with originality removed |              57.0 |

The 14.4-point reduction corresponds to the evaluator's current originality contribution.

The Generalist nevertheless retained a substantial Boundary Explorer score after originality was removed.

This demonstrates that the current prevalence and sustained-exposure evidence can independently produce a substantial Boundary Explorer score.

### 3.4 Interpretation

The evidence does not establish that the Boundary Explorer evaluator is incorrect.

The evaluator successfully distinguishes the positive Boundary Explorer fixture from the Generalist fixture, and originality contributes materially to the resulting score.

However, the counterfactual demonstrates an important semantic boundary:

> Broad exposure to the currently defined boundary genres can generate substantial Boundary Explorer evidence even when the originality signal is absent.

The current evidence therefore identifies a potential distinction between:

* **archive exposure to boundary genres**, and

* **intentional attraction toward unfamiliar ideas, altered realities, speculative systems, or experiences that push against conventional boundaries.**

The former is directly observable from the archive.

The latter is a stronger interpretation of the user's behavior.

The current evaluator does not directly establish that distinction.

No scoring change is authorized by this finding.

---

## 4. Curator Semantic Audit

### 4.1 Archive-Statistic Counterfactual

The existing Generalist fixture was evaluated under an intentionally extreme read-only counterfactual.

Only the following values were changed in memory:

* `entryCount`: 50 → 1000

* `genreDiversityScore`: existing value → 1

No fixture file or application code was modified.

The resulting Curator score increased:

| Profile state                                 | Curator |
| --------------------------------------------- | ------: |
| Original Generalist                           |    40.5 |
| Extreme archive-size/diversity counterfactual |    65.5 |

This demonstrates that archive size and genre diversity can materially influence the Curator score.

### 4.2 Interpretation

The result does not establish that archive size or genre diversity are invalid Curator signals.

Archive breadth and diversity are legitimate measurements of archive composition.

However, they do not independently establish that an archive was deliberately constructed, that discovery was intentional, or that the user possesses a stable preference for curation.

The finding therefore reinforces the existing architectural boundary:

> **Archive statistics may describe archive composition, but should not automatically be interpreted as evidence of intentional curation.**

No scoring change is authorized by this finding.

---

## 5. Designation Vocabulary Consistency

The Boundary Explorer Designation metadata currently lists the following genres:

* experimental;

* surreal;

* sci-fi;

* horror.

The implemented `BOUNDARY_GENRES` evidence set contains:

* experimental;

* surreal;

* sci-fi.

`horror` therefore appears in the Designation metadata but does not currently contribute to Boundary Explorer evidence through `BOUNDARY_GENRES`.

This is a consistency discrepancy between Designation metadata and evaluator implementation.

The discrepancy does not establish which definition is correct.

No evaluator or metadata change is authorized as part of this investigation.

The vocabulary discrepancy should be resolved as a separate Designation-definition decision rather than silently changing the scoring behavior during the semantic audit.

---

## 6. Semantic Separation Findings

The investigation establishes the following:

### 6.1 Boundary Explorer

The current evaluator provides meaningful separation between a positive Boundary Explorer fixture and a broader Generalist fixture.

However, broad representation of the currently defined boundary genres can independently produce substantial Boundary Explorer evidence.

This creates a semantic distinction between observable genre exposure and the stronger concept of intentional boundary exploration.

### 6.2 Curator

The current evaluator incorporates legitimate archive-composition measurements through entry count and genre diversity.

Extreme archive-size and diversity conditions can materially increase the Curator score without independently establishing deliberate curation.

This reinforces the distinction between archive composition and inferred intentionality.

### 6.3 Designation Overlap

The positive Boundary Explorer fixture also produces a substantial Deep Diver score.

This is not treated as semantic failure.

Boundary Explorer and Deep Diver explicitly share depth-related evidence, and both Designations include horror in their declared vocabulary. Some overlap is therefore expected where underlying evidence legitimately supports multiple interpretations.

The audit does not establish that Designations must be mutually exclusive.

---

## 7. Evidence Boundary

The current investigation does not justify:

* changing Designation weights;

* changing Boundary Explorer thresholds;

* changing Curator thresholds;

* changing the `BOUNDARY_GENRES` implementation;

* adding or removing Designation genres;

* introducing new Designations;

* changing existing Designation semantics;

* interpreting archive statistics as direct evidence of motivation or intent.

The investigation instead establishes where the current evidence becomes semantically weaker than the descriptions attached to the Designations.

These boundaries should be preserved in future intelligence work.

---

## 8. Conclusion

The current Designation system demonstrates meaningful differentiation across the tested positive and adversarial profiles.

The investigation nevertheless identifies two recurring semantic boundaries:

1. **Boundary Explorer:** genre prevalence and sustained exposure can provide substantial evidence without directly establishing intentional boundary-seeking.

2. **Curator:** archive size and genre diversity can provide substantial evidence without directly establishing deliberate curation.

These findings do not demonstrate a scoring defect.

They establish limitations on how the existing signals should be interpreted.

The appropriate architectural conclusion is:

> **Current Designations remain usable for the current evidence boundary, but archive-derived signals must not be treated as direct evidence of intention, motivation, or preference without additional supporting evidence.**

The Boundary Explorer metadata/evaluator vocabulary discrepancy should be addressed separately as a Designation-definition consistency issue.

**Evidence Gate: INVESTIGATION COMPLETE**

No implementation changes are authorized by this investigation.

Future Designation work should revisit these boundaries only when materially richer evidence or an explicit semantic redesign question warrants further investigation.
