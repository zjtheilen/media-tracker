# Phase 1 — Identity Evidence Mapping

## 1. Purpose

This document maps the current Identity concepts against the evidence actually available in the Media Tracker implementation.

The purpose is to determine:

* which existing signals genuinely support each Identity
* which signals are supporting or proxy evidence
* which signals overlap excessively
* which signals represent taste rather than curatorial orientation
* which current derived traits make legitimate but limited evidence
* which evidence should not independently establish an Identity
* where the current implementation cannot directly observe the intended concept
* whether the surviving Identity concepts can coexist without collapsing into the same conclusion
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

The conceptual issue identified by this audit is primarily **which signals should contribute to an Identity and what those signals legitimately mean**, rather than the existence of weighted scoring itself.

---

# 3. Evidence Classification

For this audit, Identity signals are classified into four categories.

## 3.1 Direct Evidence

A signal that directly measures a meaningful component of the Identity concept.

Direct evidence still does not necessarily prove the complete Identity.

For example:

* Depth directly measures the degree to which the curator values depth.
* Genre diversity directly measures the variety represented in the archive.

Direct evidence should still be interpreted in context rather than treated as automatic proof of an Identity.

## 3.2 Supporting Evidence

A signal that meaningfully strengthens an Identity interpretation but is not sufficient by itself.

For example:

* Emotional impact may strengthen an interpretation-oriented profile.
* Genre diversity may strengthen an exploratory interpretation when combined with other evidence.

Supporting evidence contributes to a pattern but should not independently establish the Identity.

## 3.3 Proxy Evidence

A signal that correlates with the intended concept but measures something adjacent rather than the concept itself.

For example:

* Experimental genre prevalence may act as a proxy for exploratory orientation.
* Psychological genre prevalence may act as a proxy for interpretive interest.

Proxy evidence must not be presented as direct observation.

## 3.4 Insufficient Evidence

A signal that may correlate with an Identity but does not meaningfully establish it.

For example:

* Archive size alone does not establish breadth.
* High average score alone does not establish interpretation.
* Experimental media alone does not establish exploration.

---

# 4. Interpretive Philosophy

## 4.1 Concept

Interpretive Philosophy describes a recurring orientation toward meaning-making, examination, ambiguity, reflection, and deeper understanding of media.

The Identity is not simply:

> “likes deep media.”

It describes a relationship with media in which interpretation itself appears to be valuable.

The current system cannot directly observe whether a curator consciously interprets or reflects on media. It can only infer an interpretive orientation from observable taste patterns.

---

## 4.2 Current Supporting Signals

### Depth

**Classification:** Direct / strongest available evidence

Depth is a meaningful component of interpretive engagement.

It is currently the strongest available evidence for Interpretive Philosophy because it directly reflects the curator's valuation of depth.

However:

> Depth alone does not establish Interpretive Philosophy.

A curator may value emotionally or intellectually substantial media without demonstrating a broader interpretive orientation.

### Emotional Impact

**Classification:** Supporting evidence

Emotional engagement may strengthen an interpretation-oriented profile when combined with depth and other interpretive evidence.

However:

> Emotional impact is not inherently interpretive.

A curator may strongly value emotional experiences without being particularly interested in meaning-making, analysis, or reflection.

It should therefore remain supporting rather than primary evidence.

### Analysis

**Classification:** Proxy evidence

The current implementation derives analysis from the prevalence of psychological and mystery genres.

This provides useful contextual evidence for interpretive interest, but it does not directly measure analytical behavior.

Therefore:

> Analysis is currently a genre-derived proxy for interpretive orientation.

### Ambiguity

**Classification:** Proxy evidence

The current implementation derives ambiguity from psychological, mystery, and surreal genre prevalence.

This can support the interpretation that the archive favors material with unresolved or ambiguous meaning.

However:

> Liking ambiguous media does not prove that the curator engages interpretively with that ambiguity.

### Reflection

**Classification:** Proxy evidence

Reflection is currently derived from drama and psychological genre prevalence.

This provides contextual evidence that may support an interpretive interpretation, but it does not directly observe reflective engagement.

---

## 4.3 Current Evidence Strength

Interpretive Philosophy has the strongest conceptual alignment with the current evidence model.

The available system already contains several signals that can reasonably support the concept:

* depth
* emotional impact
* analysis
* ambiguity
* reflection
* psychological/mystery/surreal/drama genre prevalence

However, the evidence types are not equally independent.

Depth is direct evidence.

Emotional impact is supporting evidence.

Analysis, ambiguity, and reflection are genre-derived proxies.

The proxy signals are also correlated because they are derived from overlapping genre prevalence.

Therefore:

> Interpretive Philosophy has strong provisional support, but its evidence model must not treat multiple correlated genre proxies as fully independent observations.

---

## 4.4 Signal Duplication Constraint

Analysis, Ambiguity, and Reflection should not automatically be treated as three independent discoveries of interpretive orientation.

Their current derivations are:

* Analysis → psychological + mystery
* Ambiguity → psychological + mystery + surreal
* Reflection → drama + psychological

These signals are not mathematically identical, but they share underlying genre evidence.

In particular, psychological prevalence contributes to all three.

Therefore:

> The eventual scoring model should avoid allowing correlated genre-derived proxies to dominate Interpretive Philosophy merely because they are represented by separate signal names.

This does not require removing the signals.

It requires interpreting them honestly and preventing correlated evidence from masquerading as independent evidence.

---

## 4.5 Negative-Space Guardrails

The following evidence should **not independently cause a high Interpretive Philosophy score**:

* high average score
* high emotional impact
* psychological genre prevalence
* mystery genre prevalence
* surreal genre prevalence
* depth alone
* experimental media
* high originality
* high engagement
* high craft
* archive size
* genre count
* media-type diversity

Some of these can legitimately contribute as supporting or proxy evidence.

The distinction is that none should function as:

> “This evidence exists, therefore the curator is Interpretive.”

---

## 4.6 Important Explanation Guardrail

The system must not claim:

> “You analyze media deeply.”

when the evidence actually demonstrates:

> “Your archive contains many forms of media commonly associated with analysis and interpretation.”

The distinction matters because the current system does not directly observe analytical behavior.

---

## 4.7 Relationship to Deep Diver Designation

Deep Diver Designation and Interpretive Philosophy may use overlapping evidence.

They must not produce the same conclusion.

Deep Diver:

> recognizable taste pattern involving sustained attention, depth, and layered experiences.

Interpretive Philosophy:

> recurring orientation toward meaning-making, examination, and interpretation.

The same archive can legitimately demonstrate both.

Shared evidence is acceptable when the interpretation differs.

---

# 5. Exploratory Philosophy

## 5.1 Concept Definition

**Exploratory Philosophy** describes a recurring orientation toward **extending beyond established territory**.

Its core question is:

> **Does this archive demonstrate a recurring tendency to venture beyond established preferences and engage with unfamiliar territory?**

Exploratory Philosophy is about the **relationship between the curator and the boundaries of their established taste**.

It is therefore distinct from:

* **Boundary Explorer Designation**, which describes attraction to unconventional, experimental, or boundary-pushing media.
* **Breadth / Curatorial Variety Philosophy**, which describes the range and variety of the archive itself.

The distinction is:

> **Boundary Explorer = attraction to what exists beyond conventional boundaries.**

> **Exploratory Philosophy = a tendency to extend or traverse beyond established territory.**

> **Breadth Philosophy = the variety of the territory being engaged with.**

Or more simply:

> **Breadth describes the shape of the territory. Exploration describes movement through or beyond that territory.**

Exploration may therefore occur within a relatively narrow genre or medium. A curator does not need a highly diverse archive to demonstrate an exploratory orientation.

Conversely, a highly diverse archive does not automatically demonstrate exploration. Diversity may describe the resulting archive without providing evidence that the curator is repeatedly extending beyond established preferences.

The current evidence supports an **inference of exploratory orientation**, but does not directly observe exploration as a process.

The system does **not** currently observe:

* chronological expansion of taste
* deliberate seeking of unfamiliar experiences
* discovery behavior
* movement from established preferences into new territory
* abandoned experiments
* changes in taste boundaries over time
* explicit curiosity or intent

Therefore, Exploratory Philosophy must remain an **inferred behavioral orientation**, not a claim about deliberate intent.

---

## 5.2 Evidence Hierarchy

Current evidence should be interpreted according to the following hierarchy.

### Supporting Evidence

**Originality**

Originality provides evidence that the curator engages with media perceived as distinctive or unconventional.

It is relevant to exploration because unusual or original experiences may represent movement beyond familiar territory.

However, originality does not directly demonstrate exploration. A curator can consistently prefer highly original media without expanding beyond an established taste pattern.

**Genre Diversity**

Genre diversity provides evidence that the curator engages with multiple areas of the available media landscape.

It is relevant to exploration because movement across genres can indicate engagement with unfamiliar territory.

However, genre diversity is also the primary observable evidence for Breadth Philosophy and should not be treated as direct evidence of exploratory behavior.

**Media-Type Breadth**

Engagement across different media types can provide supporting evidence of exploration when it represents movement beyond an established medium.

However, media-type diversity alone does not establish exploration.

### Proxy / Contextual Evidence

**Experimental Affinity**

Experimental Affinity indicates attraction toward experimental media.

This provides contextual evidence that the curator is comfortable engaging with experiences outside conventional patterns.

However, this signal overlaps substantially with the **Boundary Explorer Designation** and therefore cannot independently establish Exploratory Philosophy.

**Novelty**

Novelty currently derives from the same underlying experimental-genre prevalence as Experimental Affinity.

It therefore provides contextual evidence related to unconventional or unfamiliar experiences but should not be treated as an independent strong signal of exploration.

**Depth**

Depth may provide weak supporting context.

A curator may explore deeply within a new area after entering it, but depth itself does not indicate that movement beyond established territory occurred.

Depth should therefore remain secondary and should never independently determine Exploratory Philosophy.

---

## 5.3 Evidence Strength and Limitation

Exploratory Philosophy is currently **conditionally supported by the available evidence**.

The archive can observe several characteristics associated with exploration:

* originality
* genre diversity
* media-type breadth
* experimental affinity
* novelty
* depth

However, these signals primarily describe:

* unconventionality
* variety
* engagement with experimental material

They do not directly describe **movement beyond established preferences**.

This creates an important evidence limitation:

> **The current system observes unconventional taste and archive variety more reliably than it observes exploration itself.**

Therefore, a high Exploratory Philosophy score should be interpreted as:

> “The archive contains several patterns consistent with an exploratory orientation.”

It should **not** be interpreted as:

> “The curator deliberately seeks unfamiliar experiences.”

The latter would require evidence that the current system does not possess.

---

## 5.4 Signal Duplication Constraint

Experimental Affinity and Novelty currently derive from substantially the same underlying experimental-genre percentage.

They must therefore **not be treated as two fully independent pieces of evidence**.

The same principle applies more broadly:

> **A single underlying observation should not become multiple independent copies of the same conclusion.**

In particular:

* Experimental Affinity should not independently prove exploration.
* Novelty should not independently prove exploration.
* Experimental Affinity + Novelty should not create an artificial appearance of strong exploratory evidence simply because both are present.
* Genre Diversity should not simultaneously be treated as direct proof of both Breadth and Exploration.

The scoring system may use overlapping evidence, but the conceptual interpretation must remain distinct.

> **Evidence can overlap. Meaning cannot.**

---

## 5.5 Negative-Space Guardrails

The following characteristics should **not independently establish Exploratory Philosophy**:

* high experimental-media prevalence
* high originality
* high novelty
* high genre diversity
* high media-type diversity
* high depth
* high emotional impact
* high craft
* high engagement
* high average score
* large archive size
* strong psychological genre affinity
* strong horror affinity
* strong surreal affinity
* any single dominant genre
* any single dominant media type

These characteristics may contribute to an exploratory interpretation when combined appropriately, but none should be treated as synonymous with exploration.

In particular:

### Experimental Taste ≠ Exploration

A curator may strongly prefer experimental media while remaining entirely within one established territory.

That is evidence for the **Boundary Explorer Designation**, but not necessarily Exploratory Philosophy.

### Diversity ≠ Exploration

A curator may have a broad archive without having demonstrated movement beyond established preferences.

That is evidence for **Breadth / Curatorial Variety Philosophy**, not automatically Exploration.

### Depth ≠ Exploration

A curator may engage deeply with familiar territory without expanding beyond it.

Depth may support exploration only when interpreted alongside other evidence.

### Archive Size ≠ Exploration

A large archive provides more opportunities for exploratory behavior but does not itself demonstrate that behavior.

### High Ratings ≠ Exploration

Enjoying media strongly does not indicate whether the curator is exploring unfamiliar territory.

---

## 5.6 Breadth vs. Exploration

Breadth and Exploration are related but distinct concepts.

**Breadth / Curatorial Variety Philosophy** asks:

> **How varied is the territory this curator engages with?**

**Exploratory Philosophy** asks:

> **How does this curator relate to the boundaries of their established territory?**

A static, highly diverse archive may demonstrate strong Breadth without demonstrating Exploration.

An archive with relatively little overall diversity may still demonstrate Exploration if the curator repeatedly ventures into unfamiliar areas within that territory.

For example:

| Archive pattern                                                | Breadth          | Exploration      |
| -------------------------------------------------------------- | ---------------- | ---------------- |
| Large archive dominated by one familiar genre                  | Low              | Low / uncertain  |
| Small archive spanning many genres                             | Potentially high | Uncertain        |
| Broad archive with no evidence of expansion                    | High             | Uncertain        |
| Narrow archive with repeated movement into unfamiliar subareas | Low–moderate     | Potentially high |
| Broad archive that repeatedly expands into new territory       | High             | Strong candidate |

The important distinction is:

> **Breadth describes the resulting range. Exploration describes the relationship to the limits of that range.**

The current system can measure the first substantially better than the second.

---

## 5.7 Relationship to Boundary Explorer Designation

Exploratory Philosophy has a particularly important distinction from the **Boundary Explorer Designation** because the two concepts can draw upon overlapping evidence.

They should not be treated as synonyms.

### Boundary Explorer Designation

The Boundary Explorer Designation describes a recognizable **taste classification**:

> **What kind of unconventional media do you tend to like?**

Its evidence centers on characteristics such as:

* originality
* experimental affinity
* unconventionality
* boundary-pushing media
* associated genre patterns

### Exploratory Philosophy

Exploratory Philosophy describes a broader **curatorial orientation**:

> **How does your archive relate to unfamiliar territory?**

Its evidence centers on:

* movement beyond established territory
* engagement with unfamiliar areas
* variety as contextual evidence
* originality as contextual evidence
* experimental material as contextual evidence
* potential expansion of established taste

The distinction can therefore be expressed as:

> **Boundary Explorer describes attraction to unconventional territory.**

> **Exploratory Philosophy describes a tendency to venture beyond established territory.**

A curator may therefore be:

* a strong Boundary Explorer without being strongly Exploratory
* strongly Exploratory without having a particularly experimental archive
* both
* neither

The current evidence cannot directly observe the process of exploration, so the Exploratory interpretation must remain appropriately qualified.

### Stress-Test Conclusion

The stress test found that Exploratory Philosophy survives as a distinct concept, but only under a narrower definition than the original formulation.

The concept becomes problematic when it is defined as:

* liking unfamiliar things
* liking experimental media
* liking unconventional forms
* seeking novelty

Those characteristics overlap too heavily with the Boundary Explorer Designation.

The concept remains viable when defined as:

> **A recurring orientation toward extending beyond established territory and engaging with unfamiliar areas.**

This distinction preserves Exploratory Philosophy as a potentially meaningful Identity while acknowledging the current evidence gap.

### Governing Rule

> **Exploratory Philosophy should describe an inferred tendency toward extending beyond established territory, not simply an attraction to unconventional media.**

The current system should therefore treat Exploration as a **provisional inference supported by indirect evidence**, rather than as a directly observed behavioral property.


---

# 6. Breadth / Curatorial Variety Philosophy

## 6.1 Concept

Breadth / Curatorial Variety Philosophy describes an orientation toward maintaining and engaging with meaningful variety across genres, forms, or types of media.

The Identity is not simply:

> “has a large archive.”

The current system can directly observe archive variety more reliably than it can observe an intentional philosophy of variety.

---

## 6.2 Current Supporting Signals

### Genre Diversity

**Classification:** Direct observable evidence for archive breadth; supporting/proxy evidence for curatorial philosophy

The system can directly observe how many genres are represented.

That is strong evidence for archive breadth.

It is weaker evidence for the philosophical claim that the curator values breadth intentionally.

Therefore:

> Genre diversity is the strongest current evidence for Breadth, but it should be interpreted as observable archive variety rather than direct observation of intent.

### Media-Type Breadth

**Classification:** Supporting evidence

Representation across multiple media types can strengthen an interpretation of broad engagement.

However, media-type diversity does not independently establish that the curator intentionally values variety.

### Archive Composition

**Classification:** Supporting evidence

The distribution of entries across genres and media types can provide additional evidence about the shape of the archive.

This can strengthen a breadth interpretation when the variety is meaningful rather than incidental.

### Archive Size

**Classification:** Insufficient as primary evidence; contextual only

A larger archive provides more opportunity for variety but does not establish variety itself.

A large archive can remain highly specialized.

Therefore:

> Archive size must not be treated as a primary Breadth Identity signal.

### Craft

**Classification:** Insufficient for Breadth

Craft may indicate perceived quality or selectivity, but it does not directly establish breadth or variety.

### Presentation

**Classification:** Insufficient for Breadth

Presentation does not establish a breadth-oriented relationship.

If retained in any Breadth-related scoring model, its conceptual role would require explicit justification.

---

## 6.3 Current Evidence Strength

Breadth is observable.

Curatorial philosophy is not.

The current system can confidently describe:

> “This archive is broad.”

It cannot independently establish:

> “This curator intentionally seeks variety.”

without additional evidence.

Therefore Breadth / Curatorial Variety Philosophy remains provisional.

---

## 6.4 Negative-Space Guardrails

The following evidence should **not independently cause a high Breadth / Curatorial Variety score**:

* archive size
* high originality
* experimental affinity
* high novelty
* high depth
* high emotional impact
* high engagement
* high craft
* high average score
* a single dominant genre
* a single dominant media type

Genre diversity and media-type diversity are legitimate breadth evidence, but even those should be understood as evidence of observable variety rather than proof of intentional diversification.

---

## 6.5 Important Guardrail

The system must not equate:

* archive size
* genre count
* genre diversity
* media-type diversity

with intentional diversification.

The Identity should remain framed as an evidence-supported interpretation.

---

## 6.6 Relationship to Curator Designation

Curator Designation describes an observable archive/taste classification involving collection shape, breadth, and variety.

Breadth / Curatorial Variety Philosophy describes the broader relationship with variety.

The two may coexist, but the Identity must not simply restate the Designation.

The distinction should remain:

> Curator describes a recognizable archive/taste classification.

> Breadth describes the curator's apparent orientation toward variety.

---

# 7. Construction / Systems Philosophy

## 7.1 Status

**Deferred.**

Construction / Systems Philosophy does not currently have sufficiently independent evidence to function as a distinct Identity.

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
* system-related qualities

This creates substantial conceptual and evidentiary overlap.

A Construction / Systems Identity based on the current signals would therefore risk becoming:

> “Engagement Architect, but described differently.”

That does not satisfy the Identity boundary.

---

## 7.4 Future Possibility

The underlying concept is not rejected permanently.

A future version may support a distinct Construction / Systems Philosophy if the archive model gains broader structural evidence independent of engagement and gameplay mechanics.

Examples might eventually include evidence about:

* narrative structure
* worldbuilding systems
* mechanical complexity
* systemic interaction
* cause-and-effect structures
* emergent behavior
* structural experimentation across multiple media types

No such evidence should be invented for the current implementation.

---

## 7.5 Decision

Do not implement Construction / Systems Philosophy in the current Identity catalog.

Retain the concept as a documented deferred candidate.

---

# 8. Signal Duplication Audit

The current derived-trait system contains several cases where apparently distinct signals are generated from overlapping evidence.

## 8.1 Experimental Affinity + Novelty

Both currently depend on experimental genre prevalence.

They should therefore be considered related representations of the same underlying evidence.

They should not automatically receive separate conceptual weight simply because they have different names.

---

## 8.2 Analysis + Ambiguity + Reflection

These signals are all derived from genre prevalence:

* Analysis → psychological + mystery
* Ambiguity → psychological + mystery + surreal
* Reflection → drama + psychological

They are not identical, but they are correlated.

An Identity that heavily weights all three risks effectively counting overlapping genre composition multiple times.

The eventual evidence contract should therefore distinguish:

> **separate signals**

from:

> **independent evidence.**

A signal may remain useful without being treated as an independent observation.

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

## 9.1 Acceptable Overlap

Originality may support:

* Boundary Explorer Designation
* Exploratory Philosophy

provided the two systems interpret originality differently.

Similarly, depth may support:

* Deep Diver Designation
* Interpretive Philosophy

provided the resulting conclusions remain distinct.

## 9.2 Unacceptable Overlap

The system should not create an Identity that is effectively a Designation renamed, reweighted, or restated.

Examples:

> “Likes experimental media” → Boundary Explorer Identity

or:

> “Values engagement and systems” → Engagement Architect Identity

would collapse Identity and Designation into the same conceptual layer.

---

# 10. Cross-Identity Coexistence Check

The surviving Identity concepts were tested against one another to determine whether they can coexist without producing three versions of the same conclusion.

## 10.1 Interpretive vs Exploratory

**Status: Pass**

Interpretive Philosophy concerns the relationship with meaning, examination, and reflection.

Exploratory Philosophy concerns the relationship with unfamiliarity, discovery, and unconventional experiences.

The same media can be both unfamiliar and deeply interpretable.

Shared evidence is possible, but the conclusions remain distinct.

---

## 10.2 Interpretive vs Breadth

**Status: Pass**

Interpretive Philosophy concerns the desire for interpretation and deeper examination.

Breadth / Curatorial Variety concerns the range of genres, forms, and media experiences represented.

A curator may have:

* high interpretation and narrow breadth
* high breadth and low interpretation
* high interpretation and high breadth

Therefore the concepts can legitimately coexist.

---

## 10.3 Exploratory vs Breadth

**Status: Conditional Pass**

Exploration and breadth are correlated but separable.

Breadth concerns:

> “I engage with many different kinds of experiences.”

Exploration concerns:

> “I seek unfamiliar experiences.”

A curator may explore deeply within one narrow area, producing high exploration without high breadth.

A curator may also maintain a broad range of familiar media, producing breadth without strong evidence of exploration.

Therefore both concepts can coexist.

However, the implementation should avoid allowing the same archive-diversity measure to become strong independent evidence for both Identities.

Genre diversity should primarily represent **Breadth**.

For Exploration, diversity should remain supporting evidence alongside originality and experimental material.

---

# 11. Negative-Space Test

The surviving Identity concepts were also tested by asking what evidence should **not** independently cause a high Identity score.

This prevents individual signals, genres, or archive-size measures from becoming automatic Identity classifiers.

## 11.1 Interpretive Philosophy

Should not independently become high from:

* high average score
* emotional impact
* psychological genre prevalence
* mystery genre prevalence
* surreal genre prevalence
* depth alone
* experimental media
* originality
* engagement
* craft
* archive size
* genre count
* media-type diversity

The Identity requires a pattern rather than a single indicator.

## 11.2 Exploratory Philosophy

Should not independently become high from:

* experimental media alone
* originality alone
* novelty alone
* genre diversity alone
* depth
* emotional impact
* craft
* engagement
* average score
* archive size
* any single genre

In particular:

> Experimental taste is not equivalent to exploration.

## 11.3 Breadth / Curatorial Variety Philosophy

Should not independently become high from:

* archive size
* originality
* experimental affinity
* novelty
* depth
* emotional impact
* engagement
* craft
* average score
* one dominant genre
* one dominant media type

Breadth requires observable variety.

---

# 12. Evidence Mapping Summary

| Identity                                | Strongest Evidence           | Supporting Evidence                     | Proxy Evidence                  | Major Limitation                                                             |
| --------------------------------------- | ---------------------------- | --------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| Interpretive Philosophy                 | Depth                        | Emotional impact                        | Analysis, ambiguity, reflection | Interpretation itself is not directly observed; proxy signals are correlated |
| Exploratory Philosophy                  | No direct behavioral measure | Originality, genre diversity, depth     | Experimental affinity, novelty  | Exploration and intent are not directly observed                             |
| Breadth / Curatorial Variety Philosophy | Genre diversity              | Media-type breadth, archive composition | Archive-shape measures          | Intentional valuation of variety is not directly observed                    |
| Construction / Systems Philosophy       | —                            | —                                       | Gameplay/system signals         | Excessive overlap with Engagement Architect                                  |

The absence of a direct measure for Exploration or Curatorial Intent does not invalidate the concepts.

It means the system must represent them as evidence-supported inferences rather than direct observations.

---

# 13. Evidence Confidence by Concept

## Interpretive Philosophy

**Status: Strong provisional support**

The current archive model contains multiple signals that can reasonably support the concept.

The primary concern is proxy dependence and correlation among genre-derived signals, not conceptual weakness.

## Exploratory Philosophy

**Status: Conditional provisional support**

The concept survives.

The current evidence supports an interpretation of exploratory orientation, but does not directly observe exploration or intentionality.

## Breadth / Curatorial Variety Philosophy

**Status: Conditional provisional support**

The archive can demonstrate breadth.

The current model is weaker at demonstrating breadth as an intentional curatorial philosophy.

## Construction / Systems Philosophy

**Status: Deferred**

Current evidence does not provide sufficient conceptual independence from Engagement Architect.

---

# 14. Evidence Gaps

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

They should not be silently converted into certainty by scoring or explanation language.

---

# 15. Governing Evidence Principles

The evidence audit establishes the following principles for the Identity system.

### 15.1 Evidence Can Overlap

The same underlying archive evidence may legitimately contribute to multiple Identity interpretations.

### 15.2 Conclusions Cannot Collapse

Two Identities should not exist merely because the same evidence has been given different names or weights.

### 15.3 A Signal Is Not Necessarily Independent Evidence

Multiple signals may be derived from overlapping underlying observations.

Separate signal names do not automatically constitute separate evidence.

### 15.4 Proxy Evidence Must Remain Proxy Evidence

A genre-derived signal may support an interpretation but must not be described as direct observation of a behavior or intention the system does not measure.

### 15.5 No Single Signal Should Automatically Establish an Identity

Identity should emerge from a pattern of evidence.

### 15.6 Variety Is Not Quantity

Archive size must not be treated as a substitute for breadth.

### 15.7 Experimental Taste Is Not Exploration

Experimental genre prevalence may support Exploration but does not directly establish exploratory behavior.

### 15.8 Depth Is Not Interpretation

Depth is strong evidence for Interpretive Philosophy but does not independently prove interpretive behavior.

---

# 16. What Should Not Change Yet

This audit does not independently justify changing:

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

The evidence audit instead establishes constraints that future scoring and fixture design must respect.

---

# 17. What the Audit Does Justify

The evidence mapping establishes several requirements for the eventual Identity implementation.

### 17.1 Avoid Duplicate Evidence Weighting

Signals derived from the same underlying evidence should not be treated as fully independent without justification.

### 17.2 Distinguish Direct Evidence From Proxy Evidence

Explanations should avoid implying that a proxy directly measures an Identity concept.

### 17.3 Preserve Evidence Limitations

Exploratory and Breadth identities must communicate inference rather than falsely claiming access to intent.

### 17.4 Rebuild Fixtures Around the New Ontology

The old Identity fixtures should not be mechanically renamed.

They represent the previous Identity model and contain substantial overlap with Designation vocabulary.

### 17.5 Preserve the Scoring Architecture Where Possible

The weighted breakdown model is useful and explainable.

The conceptual problem is primarily the signal selection and interpretation, not the existence of weighted scoring.

### 17.6 Establish Evidence Ownership Where Necessary

When two Identities share an observable signal, the evidence contract should specify which Identity treats that signal as primary and which treats it as supporting or proxy evidence.

For example:

* genre diversity should primarily support Breadth
* experimental affinity should support Exploration but remain proxy evidence
* depth should primarily support Interpretive Philosophy

---

# 18. Implementation Readiness

The Identity subsystem is now ready for the next conceptual stage:

> **Define the final evidence contract for each surviving Identity.**

The conceptual audit has established:

* three surviving provisional Identity concepts
* one deferred Identity candidate
* evidence classifications
* major evidence gaps
* negative-space boundaries
* cross-Identity coexistence rules
* signal-correlation constraints
* Identity/Designation separation requirements

The next work should therefore be an **Identity Evidence Contract / Fixture Redesign Pass**.

That pass should determine, for each surviving Identity:

1. which signals are allowed
2. which signals are primary
3. which signals are supporting
4. which signals are proxy/contextual
5. which signals should not contribute independently
6. approximate conceptual importance before numeric weights are chosen
7. what explanations each contribution can legitimately produce
8. what minimum evidence is required before the Identity can be meaningfully evaluated

No code changes are required merely to complete this evidence-mapping stage.

---

# 19. Final Audit Conclusion

The Identity system does not need to be rewritten.

Its existing weighted-scoring architecture is structurally useful.

The primary problem is that the current Identity signal sets were designed for the previous Identity ontology and contain significant overlap with the old Designation vocabulary.

The conceptual audit supports three provisional Identity concepts:

> **Interpretive Philosophy**

A recurring orientation toward meaning-making, examination, reflection, and interpretation.

> **Exploratory Philosophy**

A recurring orientation toward unfamiliarity, discovery, unconventional experiences, and departure from established patterns.

> **Breadth / Curatorial Variety Philosophy**

A recurring orientation toward meaningful variety across genres, forms, and media types.

Construction / Systems Philosophy remains deferred because the current evidence overlaps too heavily with Engagement Architect.

The three surviving concepts can coexist:

* Interpretive owns **meaning and examination**
* Exploratory owns **unfamiliarity and discovery**
* Breadth owns **variety**

Their evidence may overlap, but their conclusions must remain distinct.

The strongest evidence limitations are:

* interpretation is not directly observed
* exploration and exploratory intent are not directly observed
* intentional valuation of variety is not directly observed
* several derived signals are correlated representations of overlapping genre evidence

The governing evidence principle is therefore:

> **Evidence can overlap. Meaning cannot.**

And the governing implementation principle remains:

> **Do not make the model more certain than the evidence allows.**

The governing evolution principle remains:

> **Preserve the working scoring infrastructure; change the conceptual model only where the evidence requires it.**
