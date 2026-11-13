# WASABI 2.0 — Product Vision & Discovery Design

**Document status:** Working draft  
**Purpose:** Capture the intended direction, product philosophy, discovery capabilities, decisions, and open questions for WASABI 2.0.  
**Approach:** Collaborative product investigation. No implementation commitments are implied unless explicitly identified.

---

# 1. Project Context

WASABI is a personal media archive and taste-intelligence application for recording, evaluating, and exploring books, games, and video.

The existing application provides a foundation for:

- Maintaining a personal media archive.
- Recording evaluations through universal and media-specific scoring dimensions.
- Analyzing ratings, genres, distributions, and other archive characteristics.
- Identifying traits, observations, findings, designations, and identities.
- Presenting explainable interpretations of a user's media preferences.
- Preserving and restoring the archive through portable data export and import.

WASABI 2.0 is an opportunity to evolve the product beyond its original identity as a media-tracking application.

## 1.1 Why 2.0?

The user's greatest personal excitement about WASABI is the possibility of **discovering unexpected patterns in their own taste**.

The value isn't merely recording what someone consumes or presenting familiar statistics in attractive visualizations.

The more compelling experience is discovering something about one's own preferences that wasn't previously obvious.

Examples of the desired experience:

- Discovering a recurring preference that crosses genre boundaries.
- Identifying similarities between seemingly unrelated works.
- Recognizing that preferences have changed over time.
- Understanding why an unusual or unexpected work received an exceptionally high or low evaluation.
- Finding connections between different forms of media that conventional categorization would miss.

WASABI should be able to surprise someone without making things up.

## 1.2 Intended Product Direction

WASABI 2.0 should combine three complementary directions:

**A. Mature personal archive — foundation**

A reliable, flexible, and polished record of what someone has experienced, how they evaluated it, and what they thought about it.

**B. Taste-intelligence platform — centerpiece**

A more capable system for discovering, investigating, and explaining patterns in the user's archive.

**C. Personal media companion — extension**

Selected capabilities that use the archive's insights to help users explore their interests and make informed media choices. The initial 2.0 direction includes recommending new-to-the-archive movies based on the user's established affinities, with explanations grounded in supporting evidence.

The intended balance is a mature archive and intelligence platform, with selected elements of a personal media companion.

The archive supports the intelligence system. The intelligence system is the defining product experience. Companion capabilities are a natural extension rather than the primary identity.

---

# 2. Foundational Product Principles

These principles should guide subsequent design decisions.

## 2.1 Evidence before interpretation

WASABI should distinguish between:

- What the archive explicitly records.
- What can be measured from that information.
- What patterns can be observed.
- What interpretations might explain those patterns.

A discovery must be grounded in actual archive evidence.

## 2.2 Explainability

WASABI should show users why it reached a conclusion.

Where appropriate, discoveries should expose:

- Contributing entries.
- Relevant ratings and dimensions.
- Relevant characteristics or categories.
- Sample size.
- Data sufficiency.
- Strength of the observed association.
- Uncertainty and limitations.

Opaque scores or unsupported conclusions should not be presented as established facts.

## 2.3 Observation is not interpretation

A recurring characteristic does not automatically constitute a preference.

A correlation with high ratings does not automatically establish causation.

An interpretation is a hypothesis about what an observed pattern means, not necessarily an objective fact.

WASABI should be able to say what it sees, show why it sees it, and invite the user to decide what it means.

## 2.4 Preserve the user's interpretive authority

WASABI may identify patterns and propose explanations, but the user remains the authority on their own experience and preferences.

The system should not present psychological conclusions or definitive explanations of someone's taste without sufficient evidence and user context.

## 2.5 Avoid redundant concepts and terminology

Discoveries should not automatically become new Traits, Designations, or Identities.

Some findings may be temporary observations, unusual relationships, changes over time, exceptions, or questions worth investigating.

The existing conceptual vocabulary should be evaluated for usefulness rather than expanded for its own sake.

## 2.6 Archive Completeness and Historical Data

The quality and completeness of the archive directly affect the reliability of WASABI's analysis.

Historical media entries may contain incomplete evaluations, missing scores, or other gaps. Additional entries may also exist in external personal spreadsheets without yet being represented in the WASABI database.

These gaps matter because the intelligence system must distinguish between a genuine preference pattern and an apparent pattern caused by incomplete information.

For example, if several archive pages contain no scores, WASABI should not treat those missing evaluations as neutral responses or silently assume that the scored portion of the archive is representative.

Archive completeness should therefore be considered when evaluating:

- Average scores and scoring distributions.
- Positive and negative affinities.
- Comparisons between media types, genres, and periods.
- Relationships among works and characteristics.
- Changes in preferences over time.
- The strength and reliability of discoveries.

WASABI should be transparent about missing information, score coverage, and other limitations that affect its conclusions.

**Current archive remediation**

The user is actively reviewing historical entries that were imported with incomplete scoring information. At the time of this document update, three of the five archive pages have entirely empty scores. This is a current snapshot of the archive and may change as historical remediation continues. Newer entries maintained in personal spreadsheets also need to be reconciled with the database.

This work is an active archive-maintenance concern, rather than merely a hypothetical future migration project.

The immediate goal is to improve the reliability and coverage of the existing archive while continuing to define the future product.

**Future import and reconciliation workflow**

A repeatable process for importing and reconciling spreadsheet entries may eventually reduce the effort required to maintain the archive.

That workflow is a potential future capability, not yet a defined implementation commitment.

Archive remediation and the design of future import functionality should remain distinguishable: one improves the current dataset, while the other improves how future data enters the application.

## 2.7 Distinguish Evaluation, Enjoyment, and Engagement

WASABI should not assume that a user's evaluation of a work is equivalent to how much they enjoyed experiencing it.

These are related, but potentially distinct aspects of a media experience:

- **Evaluation:** How the user assesses the work's qualities, execution, and overall merit.
- **Enjoyment:** How much the user actually enjoyed the experience.
- **Engagement:** How strongly the work held the user's attention or drew them into the experience. A work may be highly engaging without being particularly enjoyable, just as an enjoyable experience does not necessarily demand sustained attention.

These dimensions may reinforce one another, but they can also diverge.

A user may highly appreciate a work's writing, creativity, or artistic execution without particularly enjoying it. Conversely, a work may provide an exceptionally enjoyable experience without receiving equally high evaluations across other dimensions.

WASABI should preserve these distinctions rather than assume that one measurement can reliably represent the others.

Enjoyment is considered a valuable potential scoring dimension, but its precise role in the scoring system remains to be investigated.

Historical entries must not be assigned inferred enjoyment scores merely because existing evaluations are high or low.

### 2.8 Data Ownership, Mutability, and Reinterpretation

- The user's archive is user-owned and user-managed. Users must retain the ability to correct, revise, update, and remove their own data.
- Archive entries and evaluations are not immutable. Scores, written reflections, and other recorded information may change as users reconsider their experiences or their tastes evolve.
- WASABI must accommodate changing information and reassess any analyses, interpretations, discoveries, relationships, and other derived outputs affected by those changes.
- WASABI should remain faithful to the chronology of recorded activity and subsequent revisions. A change to an existing entry must not misrepresent when the original activity occurred or when the information was revised.
- Corrections and revisions should not leave outdated information permanently influencing current analysis. Historical information may remain useful for understanding how an entry or evaluation changed, but should not be confused with the current authoritative state.
- The application must be flexible enough to accommodate changing information regardless of its cause, without requiring users to preserve mistakes or outdated interpretations.
- WASABI's analytical outputs should be treated as dynamic interpretations of the current archive, not immutable historical records. When underlying evidence changes, WASABI should reassess and update or withdraw affected interpretations. Maintaining a detailed historical record of superseded discoveries is not a core requirement; the current analysis and its supporting evidence take priority.

---

# 3. Independent and Collaborative Intelligence

A defining product decision emerged during the Affinity investigation.

The original mental model was:

**User records media → WASABI analyzes the archive → WASABI presents insights.**

A more capable model introduces a feedback loop:

**User records media → WASABI analyzes the archive → WASABI proposes a discovery → user responds → WASABI refines its understanding → future discoveries improve.**

The collaborative model offers greater interpretive depth but also introduces additional product and architectural scope.

## 3.1 Core Principles

1. WASABI must independently analyze the user's archive without requiring user intervention.
2. Every discovery must be inspectable and explainable, with its supporting evidence and reasoning available to the user.
3. WASABI 2.0 should establish explainability as a core capability. Users should be able to understand how and why a discovery was produced.
4. Future versions should allow users to respond to discoveries by confirming, rejecting, correcting, or commenting on interpretations.
5. User feedback must be preserved separately from the original archive evidence.
6. WASABI may eventually use user feedback to refine future interpretations and analysis, provided that process remains transparent.

Explainability is a core capability of WASABI 2.0. Substantive user feedback and feedback-driven learning are intended as future collaborative capabilities beyond the initial 2.0 scope. Optional discovery-management controls, such as dismissing, saving, and marking discoveries as interesting, are separate 2.0 capabilities and do not constitute analytical feedback.

Collaboration should deepen or clarify discoveries, not compensate for weak analysis.

It should not turn ordinary archive use into a questionnaire or require additional user effort before WASABI provides value.

## 3.2 Three Levels of Collaboration

| Level      | Capability                                                         | Scope      |
| ---------- | ------------------------------------------------------------------ | ---------- |
| 1. Explain | Show evidence, confidence, and contributing entries                | WASABI 2.0 |
| 2. Respond | Allow users to confirm, reject, correct, or comment on discoveries | Future 2.x |
| 3. Learn   | Incorporate user feedback into future analysis and interpretations | Future 2.x |

These levels do not need to be implemented simultaneously.

The recommended progression is to establish independent discovery and explainability before investing in sophisticated feedback-driven intelligence.

## 3.3 Separate Evidence Sources

WASABI should distinguish between:

**Archive evidence**

What the user consumed, recorded, scored, and wrote about.

**User insight**

What the user explicitly says about their own preferences, experiences, and interpretations.

For example:

WASABI discovers that highly rated works frequently involve isolation.

The user responds:

"I don't think it's isolation itself. I like the feeling of being alone in an unfamiliar place and having to figure things out."

That response is valuable information, but it should not retroactively rewrite the original evidence or discovery.

The system should preserve the distinction between the original observation and the user's subsequent interpretation.

## 3.4 Collaboration Should Be Evidence-Driven

Potential interactions include:

- Confirming whether a discovery resonates.
- Rejecting an interpretation while retaining the underlying observation.
- Correcting an inferred characteristic.
- Explaining why certain works were evaluated differently.
- Identifying which characteristics contributed to an experience.
- Providing context that the archive alone cannot establish.

WASABI should involve the user when doing so meaningfully improves understanding, rather than asking questions merely because it can.

### Shared Evidence Foundation and Cross-Family Synthesis

WASABI's discovery families should operate as distinct analytical perspectives over a shared evidence foundation. They should not maintain isolated, competing representations of the archive or independently duplicate the underlying evidence they need.

**Shared Evidence Foundation**

WASABI should maintain a common, provenance-aware understanding of the user's archive and recorded experiences.

This foundation should make relevant evidence available to all four discovery families, including:

- Information about individual works and their established characteristics.
- The user's recorded evaluations, enjoyment, engagement, and personal observations, where available.
- Historical archive activity and changes over time.
- Established relationships and other relevant connections between works.
- The origins, reliability, limitations, and uncertainty associated with available information.

Evidence should retain its provenance and limitations as it moves between analytical contexts. Missing information, conflicting sources, and uncertain interpretations must remain distinguishable from established facts.

The shared evidence foundation establishes what WASABI knows and how that knowledge was obtained. It does not dictate how each discovery family must interpret the evidence.

**Family-Specific Reasoning**

Each discovery family retains its own analytical responsibilities, reasoning, and requirements for establishing findings.

The same evidence may be relevant to multiple families, but each family must interpret it according to its own purpose.

For example, evidence that a work features isolation might contribute to:

- **Affinity:** Investigating whether the user tends to enjoy works featuring isolation.
- **Relationships:** Investigating whether works featuring isolation share other meaningful characteristics or connections.
- **Evolution:** Investigating whether works featuring isolation have become more prominent in the user's archive over time.
- **Exceptions:** Investigating whether an individual work featuring isolation received an unexpectedly different evaluation or response.

These are distinct questions supported by overlapping evidence. One family's conclusion must not automatically become another family's conclusion.

**Cross-Family Use of Findings**

Discovery families may use established findings from other families as additional supporting context when relevant.

However, a finding from another family must not be treated as an independently established fact or as sufficient evidence for a new conclusion. The receiving family must retain access to the underlying evidence and independently determine whether that evidence supports its own interpretation.

WASABI must preserve the distinction between:

- Original archive evidence.
- Evidence-informed findings established by an individual discovery family.
- Additional supporting context contributed by findings from other families.
- New conclusions produced through cross-family synthesis.

References to the same underlying evidence must not be counted as independent corroboration merely because multiple families have used or interpreted it.

**Cross-Family Synthesis**

WASABI should be capable of combining independently established findings from multiple discovery families into a single, more complete discovery when their interaction provides meaningful additional insight.

Users should not be required to identify and assemble related findings themselves. WASABI should recognize when multiple analytical perspectives contribute to a coherent insight and present the result as a unified discovery.

Cross-family synthesis is an overarching capability of the intelligence system, not a fifth discovery family. Affinity, Relationships, Evolution, and Exceptions retain their individual responsibilities while contributing to a cohesive discovery experience.

**Emergent Discoveries**

In addition to combining existing findings, WASABI should be capable of identifying genuinely emergent discoveries: insights that arise from the interaction of multiple analytical perspectives and could not be established by any one family independently.

An emergent discovery must still be supported by identifiable evidence and explainable reasoning. Combining multiple perspectives does not automatically increase confidence or establish significance.

WASABI should make it possible to inspect the contributing findings, their underlying evidence, and the reasoning that connects them. Uncertainty and limitations must remain visible throughout the synthesis.

**Scope and Safeguards**

For the initial 2.0 scope:

- All four discovery families should draw from the shared evidence foundation.
- Each family should establish its own conclusions according to its analytical responsibilities.
- Established findings from other families may contribute additional supporting context.
- Cross-family synthesis may combine independently established findings into unified discoveries.
- WASABI may identify emergent discoveries arising from interactions between multiple families.
- Evidence provenance, uncertainty, and the distinction between evidence and interpretation must remain traceable.

Building new conclusions through extended chains of other families' findings, where those conclusions depend on multiple layers of derived findings rather than direct supporting evidence, is not an established 2.0 requirement. This more extensive form of analytical dependency may be investigated in future development.

The purpose of cross-family collaboration is to produce more complete and meaningful discoveries without sacrificing the independence, explainability, or evidentiary standards of the individual discovery families.

### Ongoing Analysis and Discovery Reassessment

WASABI's understanding of the archive should evolve as new evidence becomes available. Discoveries should not be treated as permanent conclusions that remain valid regardless of subsequent changes to the archive or its interpretation.

**Discoveries as Living Interpretations**

Discoveries represent WASABI's current evidence-supported understanding of the archive. Their conclusions may change as the available evidence changes, new patterns emerge, or previously established interpretations are reassessed.

When new evidence changes the meaning or validity of an existing discovery, WASABI should revisit that discovery even when the original work or evidence that produced it has not changed.

For example, an entry initially identified as an exception may no longer be unusual after additional works establish a broader pattern. Similarly, new evidence elsewhere in the archive may reveal that an earlier discovery was incomplete or that its significance has changed.

WASABI should be able to revise, qualify, or withdraw discoveries when their original conclusions are no longer supported.

The original evidence and history of a discovery must remain traceable even when its current interpretation changes.

**Hybrid Reassessment Model**

WASABI should use a hybrid approach to keeping its analysis current.

This should combine:

- **Event-driven reassessment:** Meaningful changes to archive evidence, work information, or established findings should trigger targeted reassessment of affected analysis and discoveries.
- **Cross-family investigation:** When a new or changed finding may be relevant to other discovery families, WASABI should investigate whether it contributes to additional findings or meaningful cross-family synthesis.
- **Periodic broader reassessment:** WASABI should periodically reconsider the archive more broadly to identify patterns, connections, and emergent discoveries that targeted reassessment may not reveal.

These approaches serve complementary purposes. Event-driven reassessment responds efficiently to known changes, while broader reassessment allows WASABI to identify insights that may emerge from the archive as a whole.

**Incremental Analysis**

Reassessment should be incremental whenever practical. WASABI should identify which evidence, findings, and discoveries are affected by a meaningful change rather than repeatedly performing comprehensive analysis when the underlying evidence has not changed.

However, incremental processing must not prevent broader investigation when new evidence may change the interpretation of existing patterns or reveal relationships that were not previously apparent.

The system should avoid redundant analysis while maintaining the ability to reconsider earlier conclusions when warranted.

**Automatic Analysis Management**

WASABI should manage the timing and frequency of reassessment automatically. Users should not be required to configure analysis schedules, determine which findings need reconsideration, or manually initiate routine reassessment.

The system should communicate its analytical status at an appropriate level of detail, including:

- Whether its current analysis is up to date.
- Whether reassessment is in progress.
- Whether meaningful changes have occurred since the last broader reassessment.
- When the most recent broader reassessment occurred.

This information should provide transparency without requiring users to understand or manage internal processing details.

**Reassessment and Discovery History**

When a discovery is reassessed, WASABI should preserve enough history to make its evolution understandable.

Users should be able to distinguish the current interpretation from earlier conclusions and understand when and why a discovery changed, was qualified, or was withdrawn.

Changes to a discovery's current status must not erase the evidence or reasoning that supported its earlier interpretation.

**Scope Direction**

For 2.0, ongoing reassessment should be a core capability of the intelligence system rather than an optional maintenance activity.

WASABI should proactively revisit affected discoveries as its understanding of the archive evolves, combining targeted reassessment with periodic broader investigation. The exact processing mechanisms, frequency, and technical implementation remain subjects for later design investigation.

---

# 4. Discovery Families

Four discovery families have been identified as candidates for WASABI 2.0:

1. Affinity
2. Relationships
3. Evolution
4. Exceptions

All four are considered worthy of investigation, but none receives automatic inclusion simply because it has been named.

Each family must earn its place by demonstrating that it can produce useful, interesting, distinct, and evidence-supported discoveries.

## 4.1 Evaluation Criteria

Each family should be investigated against common standards.

| Criterion        | Question                                                                      |
| ---------------- | ----------------------------------------------------------------------------- |
| Discoverability  | Can it reveal something the user might not have noticed independently?        |
| Evidence         | Can WASABI show exactly what supports the discovery?                          |
| Interpretability | Can it explain the finding clearly?                                           |
| Reliability      | Can it distinguish meaningful patterns from coincidence or insufficient data? |
| Distinctiveness  | Does it offer something the other families do not already cover?              |

The families should also be evaluated for overlap, data requirements, implementation complexity, and the value they provide to the overall product.

## 4.2 Discovery Value: Revelation and Confirmation

WASABI should favor discoveries that reveal something the user might not have recognized independently, while retaining the ability to identify and confirm patterns the user may already suspect.

The desired experience is not simply one of validating a user's existing beliefs about their preferences.

WASABI should be capable of:

- Revealing connections that are not obvious from conventional categories.
- Identifying recurring characteristics the user may not have consciously noticed.
- Challenging assumptions when the archive provides evidence that points in another direction.
- Confirming suspected patterns when the evidence supports them.
- Presenting unexpected findings without exaggerating their significance merely because they are surprising.

A discovery should not be considered valuable solely because it is unusual. It must also be meaningful, sufficiently supported, and explainable.

Potential considerations when evaluating discovery value include:

- **Non-obviousness:** Does the discovery reveal something beyond what the user could readily infer?
- **Evidence strength:** How much relevant information supports it?
- **Specificity:** Does it identify a meaningful quality or connection rather than a vague similarity?
- **Explanatory value:** Does it help the user understand their relationship with media?
- **Surprise:** Does it challenge or expand the user's existing understanding?
- **Distinctiveness:** Does it provide information not already covered by another discovery?

Frequency and statistical strength should not be treated as equivalent to significance. A frequently occurring pattern may be uninteresting, while a less frequent relationship may be highly informative.

**Working principle: Favor revelation while retaining confirmation.**

WASABI should seek to expand the user's understanding, not merely reinforce it.

---

# 5. Discovery Family: Affinity

**Central question: What do I consistently respond to?**

Affinity investigates characteristics and qualities associated with how users evaluate their media experiences.

It should identify more than genre preferences or simple averages.

A basic discovery might be:

"You rate science-fiction games highly."

A more meaningful discovery might be:

"Across several media types, you tend to rate stories highly when they involve isolation, constrained environments, and gradually revealing an unfamiliar system."

The second discovery is more interesting because it attempts to identify underlying characteristics rather than restating conventional categories.

## 5.1 Two Sources of Affinity Discovery

### A. Known dimensions

Affinity 2.0 should investigate both characteristics already measured by the application and previously unmeasured characteristics that can be identified through the shared, enriched understanding of archived works.

Both structured and unstructured archive data may contribute to Affinity analysis. WASABI should not be limited to predefined scoring dimensions or characteristics explicitly categorized by the user.

Affinity 2.0 should draw on the shared evidence foundation established for WASABI, including both user-provided archive information and the enriched understanding of individual works.

This allows Affinity to investigate associations between the user's responses and characteristics that may not be explicitly recorded in the archive but can be established through reliable information about the works themselves.

External information must retain its source attribution, relevant reliability, and uncertainty. WASABI-inferred characteristics must remain distinguishable from user-identified characteristics and externally asserted information.

Affinity must not treat an inferred characteristic as an established fact merely because it is available in the enriched profile. Its conclusions must remain proportionate to the underlying evidence and its limitations.

Examples:

- Users consistently rate atmosphere higher than pacing.
- Games with strong progression systems receive higher gameplay scores.
- Highly rated films tend to score well in writing and creativity regardless of genre.
- Evaluations of a particular dimension change over time.

This is the more immediately measurable capability.

Existing scoring dimensions provide structured evidence, but analysis must account for missing scores, sample sizes, media-type differences, and other limitations.

**### B. Previously unmeasured characteristics**

WASABI should be capable of identifying previously unmeasured characteristics using the shared understanding of archived works, including descriptive profiles and structured characteristics established through content enrichment.

This expands the evidence available to Affinity beyond information explicitly recorded by the user. It does not remove the distinction between what a work contains, what external sources assert about it, what WASABI infers, and how the user responds to it.

Illustrative characteristics:

- Isolation.
- Confinement.
- Unreliable narration.
- Gradual revelation.
- Institutional systems.
- Liminal environments.
- Unusual narrative structures.
- Moral ambiguity.
- Environmental storytelling.

These are examples, not an agreed fixed taxonomy.

The goal is not to require users to score every possible characteristic in advance. WASABI should identify promising characteristics from the available understanding of each work, investigate their associations with the user's responses, and expose the evidence supporting those interpretations.

Characteristics must be sufficiently supported before they are used to establish meaningful associations. Their provenance and uncertainty must remain visible, and missing information must not be treated as evidence that a characteristic is absent.

WASABI must preserve the distinction between user-identified characteristics, characteristics asserted by external sources, and characteristics inferred by the system. An inferred characteristic must never silently become a user-confirmed fact.

## 5.2 Evidence Sources and Provenance

Affinity should use the shared, provenance-aware evidence foundation established in Section 3.

This includes the user's recorded evaluations, enjoyment, engagement, and personal observations where available, alongside enriched information about individual works and their structured characteristics.

Affinity retains responsibility for independently determining how characteristics relate to the user's responses. Information and findings from other discovery families may provide additional supporting context, but must not automatically establish Affinity conclusions.

The use of external information does not change Affinity's central purpose: investigating how the characteristics of media relate to the user's experience and responses.

Relevant sources include:

1. **Structured archive evidence:** Existing scores, evaluation dimensions, genres, media types, dates, and other structured fields.
2. **User-authored evidence:** Reviews, notes, observations, descriptions, and other text supplied by the user.
3. **User-identified characteristics:** Characteristics explicitly recorded, selected, or otherwise identified by the user.
4. **WASABI-inferred characteristics:** Characteristics identified through analysis of user-authored information and other available archive content.

These sources are not interchangeable.

WASABI must preserve the provenance of each characteristic and make it possible to distinguish an explicitly user-identified characteristic from one inferred by the system.

An inferred characteristic must never silently become a user-confirmed fact.

**External Information**

External information may contribute to Affinity through the shared content-enrichment foundation described in Section 9.2.

Affinity should use only information relevant to its particular analytical questions, and must preserve the distinction between source claims, WASABI interpretations, and user-provided evidence.

External information does not independently establish a user's preferences or responses. It helps WASABI understand the characteristics of the works being evaluated; the user's recorded experience remains the evidence for how they responded to those works.

The reliability, provenance, and uncertainty of external information must remain available when Affinity uses it to support an association.

## 5.3 Stages of Discovery

Affinity should distinguish between individual observations, emerging associations, and established affinities.

**Observation:** WASABI identifies a characteristic or quality within an individual entry. An observation may be supported by a single entry when sufficient evidence exists, but it does not independently establish an affinity.

**Emerging association:** WASABI identifies a possible relationship between a characteristic and one or more aspects of the user's response. The available evidence may suggest a meaningful pattern, but remains insufficient to establish it reliably. These findings should be presented provisionally.

**Established affinity:** WASABI identifies a recurring association supported by evidence across multiple entries. An established affinity should reflect a sufficiently consistent and meaningful pattern rather than an isolated observation or coincidence.

These stages must not be collapsed into one confident-sounding statement. WASABI should communicate the distinction between an observed characteristic, a possible association, and an established pattern.

## 5.4 Positive, Negative, Conditional, and Neutral Affinities

Affinity must investigate more than simply whether a characteristic is associated with high or low evaluations.

The intended scope includes:

**Positive affinity**

Characteristics associated with favorable user responses.

Example: A user consistently gives high evaluations to stories involving ambiguous endings.

**Negative affinity**

Characteristics associated with unfavorable user responses.

Example: A user consistently gives low evaluations to stories involving unresolved endings.

**Conditional affinity**

Characteristics whose relationship with user responses changes depending on context.

Example: A user dislikes slow pacing in action games but enjoys it in psychological horror.

The same characteristic may have different associations depending on genre, medium, context, or combinations of other characteristics. WASABI should preserve these conditional relationships rather than flattening them into universal positive or negative preferences.

**Neutral or mixed affinity**

Characteristics that do not show a consistently favorable or unfavorable relationship with user responses, or that produce varied responses across entries.

Neutral or mixed associations may still be meaningful. A characteristic might be consistently present across highly varied experiences, or have little apparent relationship with evaluation.

WASABI should distinguish a genuinely neutral or mixed association from a situation where insufficient evidence exists to determine the relationship.

These categories are not necessarily mutually exclusive. A characteristic may have different associations across contexts or evaluation dimensions.

## 5.5 Important Qualification: Low Ratings Are Not Automatically Dislikes

Low evaluations may reflect:

- Technical problems.
- Poor execution.
- Unmet expectations.
- A mismatch with the user's interests.
- Other contextual factors.

WASABI should not automatically interpret every low evaluation as evidence of a negative preference.

It should distinguish an unfavorable evaluation of a particular work from a recurring negative affinity toward one of its characteristics.

Likewise, a high evaluation does not automatically establish that the user enjoyed or felt engaged by the experience.

Affinity should investigate relationships between characteristics and the user's recorded responses without assuming that evaluation, enjoyment, and engagement are interchangeable.

## 5.6 Additional Analytical Capabilities

Affinity 2.0 should investigate several additional dimensions of association beyond identifying individual positive or negative preferences.

**Combinations of Characteristics**

Affinity should investigate combinations of characteristics that may reveal associations not apparent when examining each characteristic independently.

For the initial 2.0 scope, this investigation should focus on:

- Pairs of characteristics.
- Small groups of characteristics.

For example, isolation and unreliable narration may not independently show a consistent relationship with favorable evaluations, but works combining both characteristics may receive consistently strong evaluations.

WASABI should distinguish observed combinations from meaningful associations. Combinations must be supported by sufficient evidence rather than generated indiscriminately.

More complex combinations involving larger numbers of characteristics are deferred to future expansion unless their value and implementation requirements justify inclusion.

**Temporal Changes in Affinity**

Affinity should investigate whether associations between characteristics and user responses change over time.

For example, a characteristic that was historically associated with unfavorable evaluations may become associated with more favorable evaluations in recent entries.

Affinity is responsible for investigating how these associations change, while Evolution is responsible for identifying and describing the broader chronological changes in the user's interests, consumption, and evaluations.

The two families may contribute to the same discovery, but their analytical responsibilities must remain distinct.

Historical associations should remain distinguishable from current associations. WASABI must not overwrite an earlier pattern merely because the user's responses have changed.

A change in association should not automatically be interpreted as permanent or explained through unsupported assumptions about the user's motivations.

**Inconsistent Responses**

Affinity should investigate meaningful inconsistencies in how the user responds to works with similar characteristics.

For example, two works may share several characteristics but receive dramatically different evaluations.

Rather than automatically treating the difference as noise or an exception, WASABI may investigate whether other characteristics, combinations, or contextual factors help explain the difference.

If the available evidence does not explain the inconsistency, WASABI should preserve it as an observation rather than inventing an explanation.

This capability should complement Exceptions without replacing its responsibility for identifying and explaining unusual individual entries.

**Individual Evaluation Dimensions**

Affinity should investigate relationships between characteristics and individual evaluation dimensions, rather than relying exclusively on overall evaluation scores.

For example, a characteristic may be associated with high atmosphere evaluations but low gameplay evaluations, producing an average overall score that conceals the relationship.

WASABI should preserve these distinctions and investigate whether characteristics contribute differently to individual aspects of a media experience.

**Enjoyment and Engagement**

Affinity should investigate enjoyment and engagement as distinct analytical subjects alongside evaluation, provided the relevant measurements are available.

It should be capable of investigating:

- Characteristics associated with greater or lesser enjoyment.
- Characteristics associated with stronger or weaker engagement.
- Characteristics that affect evaluation differently from enjoyment or engagement.
- Instances where evaluation, enjoyment, and engagement reinforce or diverge from one another.

Missing historical enjoyment or engagement information must remain unknown. WASABI must not infer these measurements from existing evaluations or other unrelated evidence.

The scoring-system implementation of enjoyment remains a separate unresolved design question. Defining Affinity's ability to investigate enjoyment does not require that question to be settled first.

**Cross-Media and Media-Specific Affinities**

Affinity should investigate both associations that appear across multiple media types and associations that are specific to an individual medium.

For example:

- A characteristic may be associated with favorable responses across books, games, and video.
- A characteristic may be appealing in one medium but not another.
- A characteristic may have different relationships with evaluation, enjoyment, or engagement depending on the medium.
- An apparent cross-media affinity may be primarily driven by one particular media category.

WASABI should not assume that a preference transfers universally between different kinds of media experiences.

Cross-media analysis should complement, not replace, media-specific analysis.

## 5.7 Evidence Sufficiency, Association Strength, and Confidence

Affinity must distinguish between insufficient evidence and evidence that does not demonstrate a meaningful association.

These are different analytical outcomes:

**Insufficient evidence**

The archive does not contain enough relevant information to determine whether a meaningful association exists.

**No demonstrated association**

Sufficient relevant evidence has been examined, but WASABI has not identified a meaningful relationship between the characteristic and the user's response.

**Established association**

Recurring evidence supports a meaningful relationship between the characteristic and the user's response.

**Inconsistent or conditional association**

A relationship is observable, but its direction or strength varies across contexts, entries, media types, or evaluation dimensions.

WASABI should not interpret insufficient evidence as neutrality, indifference, or evidence that no preference exists.

**Association Strength and Confidence**

WASABI should investigate and communicate both the strength of an observed association and its confidence.

- **Association strength** describes how pronounced or consistent the observed relationship is.
- **Confidence** describes how well the available evidence supports the interpretation.

These concepts must remain distinguishable. A pronounced association based on very few entries should not automatically receive high confidence.

Where appropriate, WASABI should expose:

- The number of relevant entries.
- The available evidence and its coverage.
- The observed strength and consistency of the association.
- Relevant contextual differences.
- Uncertainty and limitations.

WASABI should avoid presenting numerical measures as more scientifically precise than the underlying evidence warrants.

**Provisional Findings**

Potentially meaningful associations may be presented even when the evidence is insufficient to establish a reliable pattern, provided they are clearly identified as provisional.

As the archive grows, a provisional finding may become an established affinity, remain uncertain, or be withdrawn if subsequent evidence no longer supports it.

## 5.8 Provisional Affinity Definition

**Affinity investigates characteristics and qualities associated with how users evaluate, enjoy, and engage with their media experiences, including positive, negative, conditional, neutral, mixed, and inconsistent responses.**

It should:

1. Analyze existing structured evaluation dimensions and other available measurements.
2. Identify previously unmeasured characteristics using the shared, enriched understanding of archived works, including relevant external information and WASABI interpretations, while preserving provenance and uncertainty.
3. Distinguish user-identified characteristics from WASABI-inferred characteristics.
4. Identify individual observations and distinguish them from emerging and established affinities.
5. Investigate positive, negative, conditional, neutral, and mixed associations.
6. Investigate combinations of characteristics, initially focusing on pairs and small groups.
7. Examine changes in associations over time.
8. Investigate inconsistencies between works with similar characteristics.
9. Analyze associations with individual evaluation dimensions, overall evaluation, enjoyment, and engagement independently.
10. Support both cross-media and media-specific affinity analysis.
11. Communicate association strength, confidence, evidence sufficiency, and limitations.
12. Preserve the distinction between insufficient evidence and evidence that does not demonstrate a meaningful association.
13. Keep its analytical responsibilities distinct from Relationships, Evolution, and Exceptions.

Affinity should identify meaningful patterns without assuming that every characteristic represents a universal preference or that every observed association has a definitive explanation.

## 5.9 Affinity Status

The conceptual investigation is sufficiently developed to proceed to the next discovery family.

**Accepted 2.0 direction:**

- Structured evaluation dimensions and relevant information from the shared, enriched understanding of archived works, including user-provided characteristics, external source information, and WASABI-inferred characteristics, with provenance, reliability, and uncertainty preserved.
- User-identified and WASABI-inferred characteristic provenance.
- Individual observations, emerging associations, and established affinities.
- Positive, negative, conditional, neutral, and mixed associations.
- Pairs and small groups of characteristics.
- Temporal changes in affinities.
- Investigation of inconsistent responses.
- Associations with individual evaluation dimensions and overall evaluation.
- Separate analysis of evaluation, enjoyment, and engagement when measurements are available.
- Cross-media and media-specific affinity analysis.
- Explicit treatment of evidence sufficiency, association strength, and confidence.

**Future 2.x considerations:**

- More complex combinations involving larger numbers of characteristics.
- Investigating the independent contributions of overlapping characteristics.
- Substantive user feedback that refines affinity interpretations.
- Feedback-driven improvements to future affinity analysis.

**Still unresolved:**

- How WASABI identifies and classifies previously unmeasured characteristics.
- How inferred characteristics are validated and represented.
- How external information sources are selected and evaluated for relevance and reliability.
- How conflicting or incomplete external claims are handled while preserving source provenance and uncertainty.
- How association strength and confidence are calculated.
- How sample sufficiency is determined.
- How contextual relationships and conditional associations are represented.
- How temporal changes in affinities are detected and evaluated.
- How characteristic combinations are investigated without generating excessive coincidental patterns.
- How enjoyment and engagement are measured and represented in the archive.

These are remaining design and technical investigation questions, not reasons to leave the conceptual scope undefined.

---

# 6. Discovery Family: Relationships

**Central question: What do seemingly unrelated things in someone's archive have in common?**

Relationships investigates connections between works that aren't necessarily obvious from conventional classifications.

This may be one of WASABI's most distinctive opportunities.

Consider a hypothetical archive:

- A science-fiction film rated 5/5.
- A psychological horror game rated 4.9/5.
- A mystery novel rated 4.8/5.
- An experimental puzzle game rated 4.9/5.

These works may differ significantly in medium, genre, setting, and narrative convention.

However, they might share characteristics such as:

- An unfamiliar environment.
- Rules that aren't immediately apparent.
- Gradual discovery of how a system works.
- A growing sense that something isn't quite right.
- An audience or player actively assembling an explanation.

WASABI could discover this relationship without relying on genre labels.

## 6.1 Possible Relationship Types

These are initial investigative categories, not a finalized taxonomy.

Relationships may investigate connections through several broader mechanisms:

- Similarity: Identifying works or characteristics that share meaningful qualities.
- Contrast: Identifying meaningful differences between works or characteristics that otherwise appear similar or related.
- Clustering: Identifying groups of works connected by combinations of characteristics, even when no single characteristic explains the entire grouping.
- Association: Identifying relationships between characteristics themselves, rather than only identifying characteristics shared by individual works.

These mechanisms are complementary investigative approaches, not necessarily mutually exclusive relationship types. The examples below illustrate possible discoveries rather than establish a finalized taxonomy.

### A. Shared characteristics

Works that share qualities despite belonging to different genres or media types.

Example:

A user's highest-rated games and films disproportionately involve isolation and constrained environments.

### B. Unexpected genre relationships

Genres or categories that seem unrelated but repeatedly appear together among highly rated entries.

Example:

A user rates certain psychological horror films and science-fiction games highly. Their shared qualities may be more meaningful than their genre labels.

### C. Cross-media relationships

Discovering that responses to books, games, and films share common patterns.

Example:

The narrative structures a user enjoys in games also appear in favorite books, even though the experiences deliver them differently.

### D. Structural relationships

Connections based on how a work is constructed rather than what it is about.

Example:

A user consistently responds positively to stories that withhold information, gradually reveal rules, and force reinterpretation of earlier events.

### E. Contrasting relationships

Works that seem similar but produce very different evaluations.

Example:

Two games share a setting, genre, and gameplay structure, but one receives an exceptionally high rating and the other a poor one.

These contrasts may be just as informative as similarities.

## 6.2 The User's Desired Discovery Experience

The user explicitly selected **all of the following, plus other kinds of connections not yet considered**:

1. "These five things you rated highly have something surprisingly specific in common."
2. "These two things you thought were unrelated are actually connected in a way you might not have noticed."
3. "You respond to the same underlying qualities across completely different kinds of media."
4. Other forms of unexpected connections that may emerge during investigation.

This is a broad endorsement of the Relationships concept, not a commitment to a specific implementation or exhaustive taxonomy.

## 6.3 Scope Boundary: Archive Relationships vs. External Recommendations

WASABI has two distinct capabilities for exploring connections beyond an individual archived work.

**Archive-internal relationships**

Relationships investigates works and characteristics already represented in the user's archive, identifying meaningful connections, similarities, contrasts, and associations.

Its purpose is to reveal what the user's existing collection has in common, including connections the user might not have recognized independently.

This is an archive-intelligence capability and should remain valuable independently of any external media catalog.

**External recommendations**

Recommendations looks beyond the archive to identify works the user has not yet recorded. It uses established intelligence, particularly the user's established affinities, to identify potentially relevant works and explain why they may be a good fit.

This is a personal media companion capability rather than an additional discovery family. Its recommendations should be grounded in established evidence, while remaining distinct from the analysis that produced that evidence.

**The boundary**

Relationships answers: _What do the works and characteristics already in my archive have in common?_

Recommendations answers: _What might I want to experience next, and why might it be right for me?_

The two capabilities may draw on related intelligence, but they have different subjects and responsibilities. Recommendations may consume established findings from the intelligence system; it does not replace or redefine the work of the discovery families.

## 6.4 Current Status

The user has endorsed the broad ambition of Relationships.

**Sources and provenance of relationship evidence**

Relationships may draw on any relevant information available through the shared, provenance-aware evidence foundation, including:

- Structured archive data, such as genres, media types, platforms, and recorded characteristics.
- Descriptive profiles and structured characteristics established through content enrichment.
- External source information about individual works.
- User-authored observations and interpretations.
- WASABI-inferred characteristics and relationships.

WASABI must preserve where each piece of evidence originated and how each relationship was established. An explicitly recorded genre, an external source claim, an inferred characteristic, and a relationship established through WASABI's analysis must not be presented as though they have the same evidentiary status.

User-provided context may help WASABI investigate or interpret a relationship. However, user-created relationship records and collaborative confirmation, rejection, or refinement of relationship discoveries are deferred to 2.x.

The system must retain the distinction between the underlying evidence, WASABI's interpretation, and any subsequent user input.

**Relationship to Affinity**
Relationships must not be limited to highly rated entries or connections among works the user likes. Two works may share meaningful characteristics even when the user evaluates them very differently.
WASABI should distinguish between identifying a relationship and investigating how the user responds to that relationship.
Affinity primarily investigates associations between characteristics and the user's evaluations, enjoyment, or engagement. Relationships investigates meaningful connections among works and characteristics, regardless of the user's response.

This distinction allows Relationships to identify connections that may be useful or interesting even when they do not indicate a positive preference.

Still to investigate:

- What qualifies as a meaningful relationship?
- How should WASABI discover shared characteristics?
- Which relationship types are genuinely distinct?
- What can be discovered from existing structured archive data?
- What requires user-authored notes or additional characteristics?
- How should similarity and contrast be represented?
- How should WASABI avoid inventing connections?
- How should relationship discoveries differ from Affinity?

No specific algorithms, AI systems, embeddings, external catalogs, or implementation approaches have been selected.

## 6.5 Relationship Discovery: Favor Revelation While Retaining Confirmation

Relationships should prioritize uncovering connections the user might not have recognized independently.

The goal is not simply to validate existing assumptions about the user's taste. WASABI should be capable of identifying relationships that challenge expectations, connect seemingly unrelated works, or reveal common qualities across different media types.

However, confirmation remains valuable. A discovery that supports something the user has suspected may still provide meaningful evidence and a clearer understanding of why the pattern exists.

Potential considerations for prioritizing relationship discoveries include:

- **Non-obviousness:** Is the connection difficult to recognize through conventional categories?
- **Evidence strength:** Are the shared characteristics or relationships sufficiently supported?
- **Specificity:** Does the finding identify a meaningful connection rather than a generic similarity?
- **Explanatory value:** Does it help explain something about the works or the user's responses?
- **Surprise:** Does it reveal an unexpected connection or challenge an existing assumption?

WASABI should distinguish between a relationship that is genuinely meaningful and one that is merely unusual.

A rare coincidence is not automatically an important discovery, and a familiar pattern is not automatically uninteresting.

Discoveries should also be allowed to contradict the user's expectations when the evidence supports doing so. User feedback may eventually provide additional context for interpreting discoveries, but substantive feedback-driven refinement of relationship analysis is deferred to 2.x. Discoveries in 2.0 must remain grounded in the available evidence rather than being shaped to agree with the user's initial interpretation.

This principle should guide how Relationships identifies, evaluates, and prioritizes connections, without requiring every discovery to be surprising.

**Working principle: Favor revelation while retaining confirmation.**

---

# 7. Remaining Discovery Families

These families have been investigated conceptually, and their intended purposes, discovery directions, and preliminary scope boundaries have been established. Their detailed detection methods, evidence requirements, and presentation remain subjects for further investigation.

## 7.1 Evolution

**Central question: How have my interests, attention, and priorities shifted over time?**

Evolution investigates how a user's relationship with media changes over time.

The goal is not necessarily to determine whether someone likes different things now. It is to identify changing interests, periods of concentrated attention, emerging priorities, and recurring phases.

Potential areas of investigation include:

**Trends and changing interests**

- Genres or media types that become more or less prominent in the user's consumption.
- Characteristics or themes that increasingly attract the user's attention.
- Interests that emerge, strengthen, fade, or return.
- Changes in the kinds of experiences the user actively seeks out.

**Trends and phases are related but distinct.** A trend describes a directional change in the prominence of an interest or characteristic over time. A phase describes a period of concentrated or particularly prominent activity or interest. A phase does not necessarily indicate a sustained directional change, and a trend does not necessarily form a clearly bounded phase. WASABI should be capable of identifying both without forcing one into the other.

**Moods and phases**

- Periods of concentrated interest in particular genres, themes, or characteristics.
- Temporary interests that may not represent permanent preference changes.
- Recurring phases in which the user returns to particular kinds of media.
- Overlapping interests that develop independently of one another.

**Shifting priorities**

- Characteristics that appear to become more or less important in recent evaluations.
- Changes in the qualities the user particularly appreciates.
- Differences between what the user consumes, what they evaluate highly, and what they actually enjoy.
- Changes in enjoyment or engagement that may not be reflected in composite scores.

**Two complementary perspectives**

Evolution should investigate both:

- **Consumption and attention:** What the user is exploring, returning to, or spending time with.
- **Evaluation and experience:** What the user appreciates, enjoys, and finds engaging.

These perspectives tell different stories and should not be treated as interchangeable.

A user might consume a large number of science-fiction games during a particular period without necessarily enjoying all of them. Similarly, a work might receive an excellent evaluation without being an especially enjoyable experience.

**Important distinctions**

WASABI must distinguish genuine changes in interest or priority from other factors that may produce similar patterns.

For example:

- Changes in what the user happens to consume.
- Changes in media availability or exposure.
- Changes in scoring standards or evaluation habits.
- Temporary interests or circumstances.
- Incomplete historical records.
- Missing scoring dimensions or inconsistent data coverage.

Evolution should not automatically interpret a change in consumption as a change in preference, or a change in evaluation as a change in enjoyment.

It should also be capable of identifying periods of interest rather than relying exclusively on fixed calendar comparisons. These periods may overlap, recur, or have different durations.

**Provisional direction**

Evolution should help users understand what has been capturing their attention, what has been resonating with them, and how the qualities they prioritize have shifted over time.

**Status:** Conceptual direction established; detailed detection methods, phase thresholds, evidence requirements, and presentation remain unresolved.

#### Phase Detection and Evidence

**Automatic Phase Detection**

- WASABI is responsible for identifying periods of interest from available archive evidence, including their approximate beginnings, endings, duration, intensity, and recurrence.
- Users should not be required to define phases, assign interest labels, or manually maintain timelines. Their primary responsibility remains recording and scoring media; WASABI performs the analysis and presents its interpretations.
- User-defined or user-adjustable phases may be explored as a future collaborative capability, but are not a core requirement.

**Evidence Strength and Interpretation**

- WASABI must distinguish between established patterns, emerging or tentative patterns, and patterns for which there is insufficient evidence.
- Tentative discoveries may be surfaced when potentially useful, provided their uncertainty is communicated clearly and the supporting evidence is inspectable.
- WASABI's interpretations must never exceed what the available evidence can reasonably support. It should describe observable patterns without inventing explanations for the user's motivations, feelings, or reasons for engaging with particular media.

Evolution may draw on the shared, enriched understanding of archived works, including descriptive profiles, structured characteristics, and relevant external information. This evidence can help WASABI interpret what the user was consuming or engaging with during a particular period, but it must remain distinct from evidence of the user's personal evaluations, enjoyment, or engagement. Provenance, reliability, and uncertainty must be preserved, and characteristics of a work must not be treated as proof of the user's preferences.

**Recurring Interests and Intensity**

- Evolution should recognize interests that appear, fade, and return over time, rather than treating gaps in activity as permanent loss of interest.
- It should examine both the absolute amount of activity associated with an interest and its relative prominence within the user's overall activity during the same period.
- Duration, recurrence, and intensity should be considered together. None should be treated as a direct measure of enjoyment.
- Changes in consumption and attention must remain distinguishable from changes in evaluation, enjoyment, and engagement.

**Overlapping Phases**

- Evolution must support multiple independently detected phases occurring simultaneously. Phases may overlap partially or completely and do not need to share the same beginning or ending.
- WASABI may identify and report temporal overlap between phases, but should not automatically interpret that overlap as evidence of a meaningful connection.
- Relationships is primarily responsible for investigating whether overlapping phases reveal meaningful connections. Evolution may provide temporal context and supporting evidence for that investigation.
- Evolution must not imply causation or significance merely because two phases overlap. Any interpretation must be supported by sufficient evidence.

**Hierarchical and Nested Phases**

- WASABI may identify hierarchical relationships between phases when the available evidence supports a meaningful broader-interest and sub-interest relationship.
- A shorter or more focused phase may be presented as a subphase of a broader phase, but shared timing or category membership alone is not sufficient to establish that relationship.
- Phases that overlap without a supported hierarchical relationship should remain independently represented.
- Hierarchical phase relationships must remain revisable as the archive and its evidence change. WASABI should not preserve an artificial hierarchy when subsequent analysis no longer supports it.
- **2.0 stretch goal:** Supporting rich hierarchical or nested phase analysis is desirable, but is not a mandatory launch requirement.

**Changing Phase Composition**

- Evolution should be able to identify changes in the composition of an ongoing phase, even when the overall level of activity remains relatively stable.
- WASABI should distinguish changes in the overall prominence of an interest from changes in the characteristics or sub-interests that make up that activity.
- Analysis may examine which characteristics become more or less prominent over time, how those changes relate to one another, and whether the broader interest remains continuous despite shifts in focus.
- These interpretations should be supported by granular comparisons of activity and should not assume that a change in composition necessarily represents a new or separate phase.
- **2.0 stretch goal:** Detailed analysis and presentation of changing phase composition is desirable, but is not a mandatory launch requirement.

**Cross-Media Evolution**

- Evolution should compare activity and interests across media types whenever the available evidence makes such comparisons relevant and meaningful.
- WASABI should identify patterns of convergence, divergence, and progression across games, films, books, and other supported media types.
- Analysis should consider whether an interest emerges in one medium before appearing in another, becomes prominent across multiple media types, or develops differently depending on the medium.
- Cross-media similarities must not erase meaningful differences in how users consume, evaluate, enjoy, or engage with different media types.
- Evolution must support both media-specific and cross-media analysis. WASABI should independently identify trends, phases, and changes within each media type while also investigating meaningful patterns across multiple media types. Cross-media analysis should complement, not replace, media-specific analysis.

**Evolution of Evaluation Dimensions**

- Evolution should track changes in how users evaluate individual scoring dimensions over time, both within specific media types and across the archive as a whole.
- WASABI should identify whether dimensions such as atmosphere, writing, gameplay, creativity, and other recorded qualities become more or less prominent in the user's evaluations.
- Analysis should support media-specific trends, archive-wide trends, and comparisons between media types.
- Changes in scoring patterns must not automatically be interpreted as changes in personal priorities. WASABI should consider other possible explanations, including changes in the kinds of media consumed, differences in available scoring dimensions, and changes in evaluation standards.

**Evolution of Enjoyment and Engagement**

- Evolution should investigate changes in enjoyment and engagement over time, independently of changes in evaluation.
- WASABI should identify whether the user's enjoyment of and engagement with different media, characteristics, and experiences become more or less prominent over time.
- These patterns should be examined within individual media types and across the archive as a whole.
- WASABI should also investigate how evaluation, enjoyment, and engagement relate to one another, including instances where they reinforce or diverge from each other.
- Missing historical enjoyment or engagement information must remain unknown. WASABI must not infer these measures from existing scores, reviews, or other unrelated evidence without sufficient support.

**Evolution Scope Boundary**

- For 2.0, Evolution should focus on identifying and explaining observable changes in consumption, evaluation, enjoyment, and engagement.
- WASABI must distinguish these measures and avoid treating changes in archive activity as definitive evidence of changes in the user's underlying preferences or priorities.
- More sophisticated investigation into the causes of observed changes, including distinguishing preference shifts from availability, circumstances, and changing evaluation standards, is deferred to a future 2.x or 2.0.x release.

**Flexible Phase Boundaries**

- WASABI should generally identify the fading of an interest through sustained changes in activity rather than treating every interruption as the end of a phase.
- Phase detection must also accommodate abrupt changes in consumption when the available evidence supports identifying a sudden transition.
- WASABI should distinguish between gradual decline, abrupt transition, and uncertain phase boundaries.
- A sudden reduction in activity should not automatically be interpreted as permanent loss of interest. WASABI should account for the possibility of temporary pauses, shifts in attention, or incomplete evidence.

**Phase Continuity and Interrupted Interests**

- WASABI should distinguish between temporary lulls within an ongoing phase and interruptions that separate activity into distinct phases.
- Phase continuity should be evaluated using an established time-based threshold. Gaps shorter than the applicable threshold may be treated as lulls within the same phase, while longer gaps may indicate separate phases.
- The threshold should not be assumed to be a universal fixed duration. Its eventual determination should account for the nature and frequency of the observed activity, the user's broader consumption patterns, and the available evidence.
- Any thresholds or phase boundaries must remain subject to evidence-based interpretation rather than being treated as definitive proof of a change in the user's interests.

**Potential Phase Visualization**

A Gantt-style timeline is a promising visualization for presenting Evolution phases.
Such a presentation could make the duration, recurrence, overlap, and relationships between phases easier to understand. It may also provide a useful way to represent periods of reduced activity, nested phases, and changes in intensity.
This is an exploratory presentation idea, not a finalized interface requirement. Its usefulness should be evaluated alongside the broader discovery-presentation experience.

## 7.2 Exceptions

**Central question: What doesn't fit my usual patterns, and what can I learn from it?**

Exceptions investigates individual media entries that stand out from the user's established patterns or are otherwise unusually distinctive.

An unusual entry should not automatically be treated as noise, an error, or an inconsistency. It may represent a meaningful experience that reveals something about the user's relationship with media.

Exceptions has two complementary purposes:

1. **Explain the exception:** Identify what makes an individual entry unusual or inconsistent with established patterns, and show the supporting evidence.
2. **Explore its significance:** Consider what the unusual experience might reveal about the user's broader relationship with media, without assuming that one entry establishes a new preference or pattern.

### Outliers and Exceptions: Distinct Terminology

WASABI should distinguish between an **outlier** and an **exception** rather than using the terms interchangeably.

**Outlier**

An entry that is unusual or distinctive in its own characteristics or evaluation profile, regardless of whether WASABI has established broader patterns against which to compare it.

An outlier may stand out because of:

- An unusually high or low evaluation.
- An unexpected combination of individual scoring dimensions.
- A notable divergence between evaluation and enjoyment.
- Other distinctive characteristics that make the entry meaningfully different from comparable entries.

**Exception**

An entry that meaningfully diverges from an established pattern in the user's archive.

For example, a work may share many characteristics with other highly rated entries but receive a particularly low evaluation. Alternatively, a work may receive an exceptionally high evaluation despite differing substantially from the user's established affinities.

The distinction is important:

- An outlier indicates that an entry is unusual.
- An exception indicates that an entry behaves differently from what an established pattern would lead WASABI to expect.

An entry may be an outlier, an exception, both, or neither.

An unusual entry does not automatically invalidate an existing affinity or establish a new one.

### Potential Outlier and Exception Discoveries

Initial areas of investigation include:

**Unexpectedly high evaluation**

A work receives a particularly high evaluation despite having little in common with the user's typical favorites or established affinities.

**Unexpectedly low evaluation**

A work receives a particularly low evaluation despite matching many of the characteristics associated with the user's established preferences.

**Unusual evaluation profile**

An entry has an unexpected contrast between individual scoring dimensions.

For example, a work might receive exceptionally high creativity and atmosphere scores while receiving relatively low scores for writing or pacing.

**Enjoyment despite low evaluation**

A work receives a relatively low evaluation but was nevertheless highly enjoyable.

**Evaluation without enjoyment**

A work scores highly on technical, artistic, or other evaluative dimensions but was not particularly enjoyable to experience.

These are initial investigative categories rather than a finalized taxonomy. They may overlap, and other forms of meaningful distinctiveness may emerge during further investigation.

### Evaluation, Enjoyment, and Engagement

Outlier and exception discovery should account for the distinction between evaluation, enjoyment, and engagement established in Section 2.7.

Where sufficient information exists, WASABI should be capable of identifying unusual relationships between these aspects of a media experience.

A low evaluation does not necessarily indicate low enjoyment, and a high evaluation does not necessarily indicate that the user enjoyed the experience.

Missing enjoyment or engagement information must remain unknown. WASABI must not infer these values from existing evaluations.

### Meaningful Distinctiveness Over Statistical Rarity

Outlier discovery should prioritize meaningful distinctiveness rather than statistical unusualness alone.

Statistical unusualness may help identify potential outliers, but rarity or an extreme value does not automatically make an entry an interesting discovery.

WASABI should favor entries whose distinctive qualities offer potentially useful or interesting information to the user.

A discovery should have an understandable explanation and supporting evidence. WASABI should not surface an entry merely because it is statistically distant from other entries.

### Individual Discoveries and Broader Observations

Exceptions should support two complementary levels of presentation:

**Individual discoveries**

WASABI identifies a particular outlier or exception and explains what makes that entry distinctive.

**Broader observations**

WASABI identifies meaningful patterns across multiple outliers or exceptions.

For example:

"Your most unusually enjoyable games tend to receive more modest evaluations than your other favorites."

Broader observations must be supported by sufficient evidence. A small number of unusual entries should not automatically become a claim about the user's general preferences.

### Scope and Boundaries

**WASABI 2.0 core direction**

- Identify meaningful outliers within individual media categories, using relevant evidence from the shared, enriched understanding of archived works alongside the user's recorded evaluations, enjoyment, and engagement.
- Identify entries that meaningfully diverge from established patterns within those categories.
- Explain why an entry stands out, using available evaluation, enjoyment, and other relevant archive evidence.
- Distinguish standalone outliers from exceptions to established patterns.
- Present individual discoveries and meaningful broader observations when sufficient evidence exists.
- Account for missing information and uncertainty rather than treating incomplete data as neutral.
- Keep the focus on individual media entries rather than classifying entire periods or phases as exceptions.

Outlier detection across the archive as a whole, including comparisons between different media categories and more granular anomaly detection within individual scoring dimensions, may be explored in future releases.

**Future 2.x possibilities**

- Identifying outliers as candidates for deeper investigation.
- Investigating whether individual exceptions reveal new affinities, conditional preferences, or relationships.
- Identifying recurring exceptions that may represent emerging patterns.
- **Substantive user feedback:** Allowing users to challenge discovery interpretations, correct inferred characteristics, and provide additional context about unusual entries, with the possibility of incorporating that feedback into future analysis. Substantive feedback-driven refinement is deferred to 2.x; ordinary correction of user-provided archive information remains separate from this capability.

These capabilities are not required for the initial 2.0 scope.

### Relationship to Evolution and Other Discovery Families

Exceptions should remain conceptually distinct from Evolution.

Evolution investigates the chronological development of the user's relationship with media, including periods of interest, recurring phases, and changes in consumption, evaluation, enjoyment, and engagement.

Exceptions investigates individual experiences that stand out from established patterns or are otherwise unusually distinctive.

An entire phase or period of activity should not be classified as an exception merely because it differs from what came before. Such periods are meaningful parts of the user's chronological experience and belong within Evolution.

A phase may contain multiple outliers or exceptions, and an individual exception may occur during an otherwise ordinary phase. Neither should automatically redefine the other.

Relationships may investigate connections between unusual entries, while Affinity may establish patterns against which exceptions can be identified. Exceptions should not duplicate those responsibilities.

### Provisional Exceptions Definition

**Exceptions identifies and explains individual media entries that are unusually distinctive or meaningfully diverge from established patterns in the user's archive, and explores what those experiences may reveal without overstating the available evidence.**

**Work Profile Relationship Boundary**

Work Profiles may present established, evidence-supported relationships as part of understanding an individual work. However, the Work Profile is not intended to replace the Relationships discovery family or provide a full relationship-exploration interface in 2.0. Tentative and emerging connections, richer bidirectional exploration, and user-created relationships remain future 2.x capabilities.

**Status:** Conceptual direction established; initial 2.0 scope identified. Detailed detection methods and evidence thresholds remain unresolved.

---

# 8. Working Decisions and Open Questions

## 8.1 Decisions and Direction Accepted So Far

| Item                                    | Current position                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Overall 2.0 direction                   | Mature archive + intelligence platform, with selected companion elements                                                                                                                                                                                                                                                                                                                        |
| Primary product excitement              | Discovering unexpected patterns in one's own taste                                                                                                                                                                                                                                                                                                                                              |
| Historical data remediation             | Active archive-maintenance workstream. Historical imported entries are being reviewed, and newer spreadsheet entries need reconciliation. This work is not a prerequisite for defining the intelligence capabilities of 2.0.                                                                                                                                                                    |
| Discovery families                      | Affinity, Relationships, Evolution, Exceptions                                                                                                                                                                                                                                                                                                                                                  |
| Family selection                        | All are candidates, but each must earn its place                                                                                                                                                                                                                                                                                                                                                |
| Evidence philosophy                     | Evidence must precede interpretation                                                                                                                                                                                                                                                                                                                                                            |
| Explainability                          | Discoveries should expose their supporting evidence and limitations                                                                                                                                                                                                                                                                                                                             |
| User authority                          | WASABI proposes interpretations; the user retains interpretive authority                                                                                                                                                                                                                                                                                                                        |
| Intelligence model                      | Independent by default, collaborative by design                                                                                                                                                                                                                                                                                                                                                 |
| Cross-family synthesis                  | The four discovery families retain independent analytical responsibilities and establish their own findings. Cross-family synthesis may combine independently established findings into broader discoveries, including emergent connections, without becoming a fifth discovery family or allowing one family's conclusions to substitute for another's evidence.                               |
| Affinity                                | Must investigate positive, negative, conditional, neutral, and mixed associations, while distinguishing insufficient evidence from no demonstrated association.                                                                                                                                                                                                                                 |
| Relationships                           | Should include all three proposed discovery experiences and other unexpected connections                                                                                                                                                                                                                                                                                                        |
| External recommendations                | A distinct personal media companion capability, separate from archive-internal Relationships. Recommendations consume established intelligence to identify new works the user may want to experience and explain why.                                                                                                                                                                           |
| Recommendation media scope              | 2.0 recommendations are limited to movies. Books and games are deferred to 2.x.                                                                                                                                                                                                                                                                                                                 |
| Recommendation candidates               | Recommend only movies that are new to the user's archive. Previously recorded works are excluded in 2.0, regardless of whether they are completed, in progress, or unwatched.                                                                                                                                                                                                                   |
| Recommendation evidence                 | Recommendations must be grounded in established affinities. A single strongly established positive affinity may be sufficient; multiple affinities may provide additional support. Weak, emerging, or insufficiently supported associations must not be presented as established evidence.                                                                                                      |
| Negative affinities in recommendations  | Established negative affinities should be considered as contextual evidence, not automatic exclusion rules. A negative response to one work does not by itself establish a negative affinity. Where relevant, recommendation explanations should identify potential mismatches alongside positive matches.                                                                                      |
| Recommendation explanations             | Every recommendation must explain why it was selected, connecting it to specific established affinities and inspectable supporting evidence.                                                                                                                                                                                                                                                    |
| Recommendation presentation             | Recommendations should be presented as an unranked collection, without implying a comparative order or unsupported precision.                                                                                                                                                                                                                                                                   |
| Recommendation generation               | Intelligence reassessment maintains and updates established affinities. Recommendation generation is a separate capability that consumes the latest available intelligence when recommendations are needed; it is not automatically coupled to every reassessment.                                                                                                                              |
| Saved recommendations                   | Users may save recommendations for later, view saved recommendations, and remove them. Saving is organizational only: it does not constitute evidence of preference, influence affinities or future recommendation selection, or train the intelligence system. A recommendation remains separate from the archive until the user actually records the work.                                    |
| Recommendation discovery boundaries     | Exploratory recommendations intended to challenge or broaden established taste, recommendations for previously recorded works, recommendations for books or games, user-triggered refresh, streaming availability, and advanced recommendation feedback or personalization are deferred to 2.x.                                                                                                 |
| Discovery priority                      | Favor revelation while retaining confirmation                                                                                                                                                                                                                                                                                                                                                   |
| Relationship discovery                  | Prioritize meaningful, evidence-supported, non-obvious connections without excluding confirmatory findings                                                                                                                                                                                                                                                                                      |
| Archive completeness                    | Intelligence must account for missing entries, incomplete scores, and limitations in archive coverage                                                                                                                                                                                                                                                                                           |
| Future import workflow                  | A repeatable spreadsheet import and reconciliation process is a possible future capability, not a finalized commitment                                                                                                                                                                                                                                                                          |
| Visual and interaction refinement       | Styling consistency is part of the 2.0 planning scope; the extent of the broader UI audit remains to be investigated                                                                                                                                                                                                                                                                            |
| Evaluation and enjoyment                | Should be distinguishable; a high evaluation does not necessarily indicate high enjoyment                                                                                                                                                                                                                                                                                                       |
| Enjoyment as a scoring dimension        | Considered valuable and worthy of implementation investigation; final scoring-system role remains unresolved                                                                                                                                                                                                                                                                                    |
| Engagement                              | Recognized as a potentially distinct aspect of the media experience; its relationship to evaluation and enjoyment remains to be investigated                                                                                                                                                                                                                                                    |
| Evolution                               | Should investigate consumption trends, periods of interest, shifting priorities, and changes in evaluation, enjoyment, and engagement over time.                                                                                                                                                                                                                                                |
| Exceptions terminology                  | Distinguish outliers (unusual entries regardless of established patterns) from exceptions (entries that meaningfully diverge from established patterns)                                                                                                                                                                                                                                         |
| Exceptions discovery priority           | Favor meaningful distinctiveness over statistical rarity                                                                                                                                                                                                                                                                                                                                        |
| Exceptions presentation                 | Support individual discoveries and broader observations across multiple outliers or exceptions when sufficient evidence exists                                                                                                                                                                                                                                                                  |
| Exceptions 2.0 scope                    | Identify meaningful outliers and exceptions within individual media categories; explain their supporting evidence                                                                                                                                                                                                                                                                               |
| Exceptions scope boundary               | Focus on individual media entries; chronological phases and eras belong to Evolution                                                                                                                                                                                                                                                                                                            |
| Exceptions future scope                 | Cross-media outlier detection, deeper candidate investigation, and recurring-exception analysis are deferred to future releases                                                                                                                                                                                                                                                                 |
| Evolution phase detection               | WASABI should automatically identify periods of interest from available archive evidence; users should not be required to define or maintain phases                                                                                                                                                                                                                                             |
| Phase recurrence                        | Interests may fade and return; gaps in activity do not automatically indicate permanent loss of interest                                                                                                                                                                                                                                                                                        |
| Phase intensity                         | Consider duration, recurrence, absolute activity, and relative prominence together; none independently establishes enjoyment                                                                                                                                                                                                                                                                    |
| Overlapping phases                      | Multiple independently detected phases may overlap; overlap alone does not establish a meaningful relationship                                                                                                                                                                                                                                                                                  |
| Phase boundaries                        | Accommodate gradual decline, abrupt transitions, and uncertain boundaries                                                                                                                                                                                                                                                                                                                       |
| Phase continuity                        | Distinguish temporary lulls from interruptions that may indicate separate phases, using an evidence-sensitive time threshold                                                                                                                                                                                                                                                                    |
| Nested phases                           | Evidence-supported hierarchy is desirable but a 2.0 stretch goal, not a launch requirement                                                                                                                                                                                                                                                                                                      |
| Changing phase composition              | Detecting changes in the characteristics or sub-interests within an ongoing phase is a 2.0 stretch goal                                                                                                                                                                                                                                                                                         |
| Cross-media Evolution                   | Support both media-specific trends and phases and meaningful patterns across media types                                                                                                                                                                                                                                                                                                        |
| Evaluation over time                    | Track changes in individual evaluation dimensions within media types and across the archive                                                                                                                                                                                                                                                                                                     |
| Enjoyment and engagement over time      | Investigate changes independently of evaluation, without inferring missing historical information                                                                                                                                                                                                                                                                                               |
| Evolution scope boundary                | Focus on observable changes in 2.0; sophisticated causal explanations for those changes are deferred to future releases                                                                                                                                                                                                                                                                         |
| Relationships mechanisms                | Investigate similarity, contrast, clustering, and association as complementary ways of identifying meaningful connections                                                                                                                                                                                                                                                                       |
| Relationship evidence provenance        | Preserve where relationship evidence originated and how each relationship was established. Distinguish structured archive data, enriched work information, external source claims, WASABI-inferred characteristics and relationships, and user-provided context. User-created relationship records and collaborative refinement of discoveries are deferred to 2.x.                             |
| Affinity and Relationships boundary     | Affinity investigates how characteristics relate to user responses; Relationships investigates connections among works and characteristics regardless of evaluation                                                                                                                                                                                                                             |
| Trends and phases                       | Treat directional trends and periods of concentrated interest as distinct but complementary forms of Evolution discovery                                                                                                                                                                                                                                                                        |
| Phase visualization                     | A Gantt-style timeline is a promising exploratory presentation concept, not a finalized UI requirement                                                                                                                                                                                                                                                                                          |
| Affinity enjoyment and engagement scope | Investigate associations with enjoyment and engagement in 2.0 when relevant measurements are available. Establishing how these aspects should be measured and represented remains an open design question; introducing new measurements is not yet a settled commitment.                                                                                                                        |
| Affinity evidence scope                 | Affinity draws on relevant evidence from the shared, provenance-aware evidence foundation, including user archive records and enriched work information; each conclusion retains family-specific reasoning and evidence requirements.                                                                                                                                                           |
| Affinity evidence provenance            | Distinguish user-identified characteristics, external source claims, and characteristics inferred by WASABI. Preserve provenance, reliability, and uncertainty when using enriched work information to establish or explain associations.                                                                                                                                                       |
| Affinity discovery stages               | Distinguish individual observations, emerging associations, and established affinities; established affinities require recurring evidence across multiple entries                                                                                                                                                                                                                               |
| Affinity association types              | Investigate positive, negative, conditional, neutral, and mixed associations                                                                                                                                                                                                                                                                                                                    |
| Affinity combinations                   | Investigate combinations of characteristics, initially limited to pairs and small groups                                                                                                                                                                                                                                                                                                        |
| Affinity temporal analysis              | Investigate how associations between characteristics and user responses change over time, while preserving historical patterns                                                                                                                                                                                                                                                                  |
| Affinity inconsistencies                | Investigate meaningful differences in responses to works with similar characteristics without inventing explanations                                                                                                                                                                                                                                                                            |
| Affinity evaluation dimensions          | Analyze associations with individual evaluation dimensions as well as overall evaluation                                                                                                                                                                                                                                                                                                        |
| Affinity enjoyment and engagement       | Investigate enjoyment and engagement independently of evaluation when measurements are available; do not infer missing historical information                                                                                                                                                                                                                                                   |
| Affinity media scope                    | Support both cross-media and media-specific affinities                                                                                                                                                                                                                                                                                                                                          |
| Affinity evidence sufficiency           | Distinguish insufficient evidence from evidence that does not demonstrate a meaningful association                                                                                                                                                                                                                                                                                              |
| Affinity association strength           | Communicate the strength and consistency of observed associations separately from confidence                                                                                                                                                                                                                                                                                                    |
| Affinity confidence                     | Account for sample size, evidence coverage, and limitations when evaluating confidence                                                                                                                                                                                                                                                                                                          |
| Affinity provisional findings           | Allow potentially meaningful findings to be presented provisionally when evidence is insufficient to establish an affinity                                                                                                                                                                                                                                                                      |
| Affinity future expansion               | More complex characteristic combinations, independent-contribution analysis, and feedback-driven refinement remain candidates for future 2.x development. External information is part of the shared enrichment direction for 2.0, not inherently deferred.                                                                                                                                     |
| Overall discovery experience            | Hybrid of proactive discovery presentation and optional user-directed exploration                                                                                                                                                                                                                                                                                                               |
| Discovery feed                          | Primary feed ranked by meaningfulness and potential value, rather than recency alone                                                                                                                                                                                                                                                                                                            |
| Recent discoveries                      | Separate, smaller section highlighting the newest findings regardless of significance                                                                                                                                                                                                                                                                                                           |
| Discovery exploration                   | Discoveries should provide entry points into broader investigations of evidence and meaningful connections                                                                                                                                                                                                                                                                                      |
| Visual exploration                      | Contextual visual relationship maps are a promising option; displaying the entire archive graph simultaneously is not the intended direction                                                                                                                                                                                                                                                    |
| Discovery management                    | Users may optionally dismiss, save, or mark discoveries as interesting; interaction is not required                                                                                                                                                                                                                                                                                             |
| Discovery management and analysis       | Dismissing, saving, or marking discoveries as interesting must not affect analytical conclusions, scoring, or WASABI's assessment and prioritization of discovery significance in 2.0                                                                                                                                                                                                           |
| Explainability scope                    | Inspecting the evidence and reasoning behind discoveries is a central 2.0 capability                                                                                                                                                                                                                                                                                                            |
| Substantive user feedback               | Confirming, rejecting, correcting, or commenting on interpretations is deferred to a future 2.x release; feedback must remain separate from original archive evidence                                                                                                                                                                                                                           |
| Feedback-driven learning                | Using substantive user feedback to refine future interpretations and analysis is deferred to a future 2.x release                                                                                                                                                                                                                                                                               |
| Work Profiles                           | 2.0 will provide one unified Work Profile per work, clearly distinguishing information about the work from the user's personal experience. Profiles will be accessible consistently wherever a work appears and may show established, evidence-supported connections. Tentative connections, richer bidirectional relationship exploration, and user-created relationships are deferred to 2.x. |

## 8.2 Important Open Questions

- What should count as a discovery rather than a statistic or observation?
- How should evidence strength and confidence be represented?
- How should WASABI handle insufficient data?
- How should previously unmeasured characteristics be identified?
- For a future 2.x collaboration capability, how should substantive user feedback influence future interpretations?
- How should the four discovery families maintain distinct analytical responsibilities while sharing evidence and contributing to cross-family synthesis?
- How should cross-family synthesis combine independently established findings, preserve family-specific evidence and confidence, and distinguish a genuinely emergent discovery from a coincidental overlap?
- What new data, if any, should the archive collect to support 2.0?
- Which capabilities can be delivered using the existing archive?
- Which capabilities justify changes to the underlying data model?
- What should the user experience feel like when a discovery is presented?
- How should WASABI determine when an entry is sufficiently distinctive to qualify as an outlier or sufficiently divergent from an established pattern to qualify as an exception?
- How should WASABI measure archive completeness and score coverage?
- How should discoveries account for missing evaluations or entries?
- How should WASABI distinguish an incomplete dataset from a genuine absence of preference?
- How should historical spreadsheet entries be reconciled with existing database records?
- What should a future repeatable import and reconciliation workflow support?
- How should the application's interactive controls and visual styling be made consistent with its existing aesthetic?
- Which interface elements should be included in a broader visual and interaction audit?
- How should discoveries be prioritized to balance unexpected revelation with useful confirmation?
- How should WASABI distinguish evaluation, enjoyment, and engagement?
- Should enjoyment become a universal scoring dimension or be handled differently?
- How should historical entries accommodate a scoring dimension that did not previously exist?
- Should users be able to revisit selected historical entries and add enjoyment scores?
- How should WASABI represent missing enjoyment data without treating it as neutral?
- How should Evolution distinguish consumption trends from changing enjoyment or appreciation?
- How should WASABI identify periods of interest that overlap, recur, or do not align with fixed calendar periods?
- Should enjoyment be recorded using a numerical scale, a binary response, or another form of measurement?
- How should WASABI determine the amount and duration of evidence required to classify an interest or phase as an established pattern rather than an emerging or tentative one?
- How should WASABI determine the appropriate time threshold for distinguishing a temporary lull from an interruption that separates two phases?
- How should phase boundaries account for the frequency and nature of different kinds of media activity?
- How should WASABI determine whether a relationship is meaningful when it connects works with very different evaluations?
- How should WASABI assess and prioritize the meaningfulness of discoveries?
- How should discovery prioritization balance evidence strength, explanatory value, specificity, and non-obviousness?
- How should users navigate from an initial discovery into related evidence and findings?
- What contextual visualizations would make relationships easier to explore without overwhelming the user?
- How should saved and dismissed discoveries behave as the underlying archive and its analysis change?
- How should WASABI identify, classify, and validate previously unmeasured characteristics using the shared evidence foundation, including enriched work information, external source claims, and WASABI-generated interpretations?
- How should inferred characteristics be validated, represented, and revised as archive evidence changes?
- What evidence thresholds should distinguish provisional associations from established affinities?
- How should association strength and confidence be calculated and communicated without implying false precision?
- How should WASABI investigate pairs and small groups of characteristics while controlling for coincidental combinations?
- How should Affinity represent conditional associations across genres, media types, contexts, and evaluation dimensions?
- How should Affinity detect and explain changes in associations over time?
- How should WASABI investigate inconsistent responses without forcing an unsupported explanation?
- How should enjoyment and engagement be measured and represented so they can become independent subjects of Affinity analysis?
- How should cross-media affinity comparisons account for differences in media-specific scoring dimensions and available evidence?
- How should Affinity and Exceptions coordinate when an inconsistent response also qualifies as an unusual individual entry?
- How should Affinity and Evolution coordinate when an association changes over time?
- How should WASABI select external information sources for different types of media and subject areas?
- How should WASABI identify and assemble a suitable candidate pool of external movies for recommendation?
- What criteria should guide candidate evaluation against established positive and negative affinities, without turning contextual mismatches into automatic exclusions?
- What external movie information is necessary to identify candidates, evaluate their relevance, and support evidence-based recommendation explanations?
- How should potential movie-data providers be evaluated for catalog coverage, metadata quality, reliability, licensing, cost, and API limitations?
- How should saved recommendations behave as the archive and its established affinities change?
- How should source reliability be evaluated in a subject-specific way, and how should that differ from WASABI's confidence in its own interpretations?
- How should WASABI distinguish independent corroboration from repeated claims that originate from the same underlying source?
- How should work-matching confidence be calibrated, and what evidence is sufficient for automatic association?
- How should the shared characteristic vocabulary evolve while maintaining semantic consistency and avoiding unnecessary duplication or drift?
- How should WASABI represent competing source claims, ambiguous interpretations, and insufficient information without manufacturing certainty?
- How should changes to enriched work profiles trigger targeted reassessment, cross-family investigation, and broader periodic reassessment?
- How should enrichment coverage, missing information, and unresolved uncertainty be communicated to users?

---

# 9. Investigation Process Going Forward

The four discovery families have now been investigated individually at the conceptual level.

The next step is to examine how they work together as a unified intelligence system.

This review should establish:

1. How the four families complement one another.
2. Where their responsibilities overlap and where their boundaries should remain distinct.
3. How discoveries in one family may inform or provide evidence for another.
4. Whether the families represent independent capabilities, complementary analytical perspectives, or some combination of the two.
5. How discoveries should be prioritized and presented as part of a cohesive product experience.
6. Which capabilities belong in the core 2.0 scope, which are stretch goals, and which should be deferred.

Detailed investigation of individual families may continue where important questions remain unresolved.

We should not jump prematurely into implementation plans, technologies, or feature lists.
The goal is to understand what WASABI 2.0 should be before deciding how to build it.

**Unified Intelligence Experience**

WASABI 2.0 should present a unified discovery experience in which Affinity, Relationships, Evolution, and Exceptions work together to investigate the user's archive.

The four families represent distinct but complementary analytical responsibilities, not separate products or necessarily separate user-facing destinations.

A discovery may draw on independently established findings from multiple families, and some discoveries may emerge specifically from the interaction of different analytical perspectives. Cross-family synthesis must preserve each family's distinct analytical responsibility and supporting evidence. A finding from one family may contribute to another family's investigation, but cannot substitute for that family's independent examination of the underlying evidence.

WASABI should organize discoveries around the insight they provide to the user rather than requiring users to understand which analytical family produced each part of the finding.

The boundaries between families must nevertheless remain clear enough to preserve explainability, avoid duplicated responsibilities, and identify the evidence and reasoning behind each conclusion.

**Discovery Feed and Exploration**

WASABI should proactively present meaningful discoveries while also allowing users to investigate and explore the broader connections within their archive.

The intended experience is a hybrid of a discovery feed and an exploratory environment.

**Discovery Feed**

The primary discovery feed should prioritize findings according to their meaningfulness, significance, and potential value to the user rather than chronological order alone.

A separate, smaller section should highlight the most recently generated discoveries, regardless of their significance. This allows users to remain aware of WASABI's ongoing analytical activity without allowing recency to dominate the primary discovery experience.

Meaningfulness and statistical strength should not be treated as interchangeable. A rare or statistically unusual observation is not automatically an important discovery, and a less unusual finding may provide substantial explanatory value.

The methods WASABI uses to assess and prioritize meaningfulness remain to be investigated.

**Exploration**

Discoveries should serve as entry points into a broader exploratory experience. Users should be able to inspect supporting evidence, examine contributing entries, investigate related findings, and follow meaningful connections throughout their archive.

Exploration should be optional. WASABI must provide valuable discoveries independently rather than requiring users to conduct their own investigations to receive value from the application.

The preferred direction is an interconnected exploratory environment, potentially incorporating contextual visual relationship maps when they help explain or navigate connections. WASABI should not attempt to display the entire archive and every possible relationship simultaneously. The experience should present relevant context around the discovery or subject currently being explored.

A visual network is a promising presentation approach, but interconnected readable discovery views or a hybrid of the two remain viable alternatives. The specific visual organization, navigation behavior, and presentation mechanisms are not yet finalized.

**Optional Discovery Interaction**

Users should have the option to manage discoveries without being required to participate in the analytical process.

WASABI should provide useful discovery and prioritization by default. Users who prefer a passive experience should not need to dismiss, save, rate, or otherwise interact with findings.

Optional discovery-management capabilities may include:

- **Dismiss:** Remove a discovery from the user's active discovery presentation without deleting its supporting evidence or necessarily invalidating the analysis.
- **Save:** Preserve a discovery for convenient access and later reference.
- **Mark as interesting:** Identify discoveries the user finds particularly interesting or wants to explore further.

These interactions are intended to support personal organization and exploration. They must not be required for WASABI to function effectively.

For the initial 2.0 scope, these actions should not influence analytical conclusions, scoring, or the system's assessment and prioritization of discovery significance.

Learning from user interaction to personalize future discovery analysis or prioritization is a possible future capability, but is outside the current 2.0 scope.

## 9.1 Supporting Workstreams

In addition to investigating the four discovery families, WASABI 2.0 planning should account for several supporting areas of work.

These workstreams may progress alongside discovery-family research, but their detailed implementation should not be allowed to prematurely determine the product's direction.

These areas help establish the reliability, usability, and presentation of the overall product. They should support the central intelligence ambition rather than displace it.

**A. Archive integrity and completeness**

The archive must provide a sufficiently reliable foundation for analysis.

Areas for investigation include:

- Completing historical entries with missing scores.
- Reconciling newer spreadsheet entries with the database.
- Identifying incomplete or inconsistent records.
- Understanding how missing information affects analytical results.
- Communicating archive coverage and evidence sufficiency to the user.
- Considering a future repeatable import and reconciliation workflow.

Current historical data remediation is an active concern. The design of a more comprehensive future import workflow remains open.

**B. Visual and interaction consistency**

WASABI's interface should present a cohesive visual language across its screens and interactive elements.

Some controls currently retain default browser styling that contrasts sharply with the application's aesthetic. The white-and-blue sliders are one example.

Areas worth investigating include:

- Slider appearance and interaction states.
- Buttons and selectable controls.
- Dropdowns and form elements.
- Checkboxes and toggles.
- Focus, hover, disabled, and active states.
- Dialogs, notifications, and other interactive feedback.

These are potential audit areas rather than a finalized implementation checklist.

The intention is to improve visual and interaction consistency, not necessarily redesign the entire application.

**C. Intelligence and discovery**

The four proposed discovery families remain the primary subject of product investigation:

1. Affinity.
2. Relationships.
3. Evolution.
4. Exceptions.

Their value, evidence requirements, distinctiveness, and relationship to one another must be established before implementation decisions are made.

**Overall priority**

The archive provides the foundation, visual consistency supports the experience, and intelligence remains the defining product ambition.

Supporting workstreams should be evaluated according to how they improve the reliability, usability, and value of that ambition.

### 9.2 Content Understanding and Work Enrichment

WASABI 2.0 should develop a substantially richer understanding of the individual works contained in the user's archive.

The goal is not simply to collect additional metadata. WASABI should build an evidence-supported understanding of what each work contains, how it is structured, and what meaningful characteristics distinguish it. This understanding should provide a shared foundation for discovery, comparison, relationship analysis, and other forms of archive intelligence.

Enrichment should be attempted automatically for every archived work. A work should not need to meet a minimum information threshold to receive a Work Profile or an enrichment attempt. When information is sparse or unavailable, WASABI should represent those limitations explicitly rather than filling gaps with unsupported assumptions.

**A. Two Complementary Layers of Understanding**

Each work should have two complementary forms of enriched information:

**Descriptive Profile**

A descriptive profile provides a substantive account of the work itself. Depending on the medium and available evidence, this may include:

- Narrative, subject matter, and themes.
- Setting, environment, and atmosphere.
- Characters and their roles.
- Structure, progression, and presentation.
- Mechanics, systems, and player agency where applicable.
- Other meaningful qualities that help explain what the work is and what distinguishes it.

The descriptive profile should be as informative as the available evidence reasonably permits. These examples are not a mandatory metadata checklist. The depth and nature of the description should reflect the work and the information that can actually be established.

**Structured Characteristics**

WASABI should also identify meaningful characteristics from the descriptive understanding of each work.

These characteristics provide a structured way to compare works, identify recurring qualities, and support analytical questions across the archive.

Examples might include isolation, unreliable narration, environmental storytelling, nonlinear progression, restricted environments, or psychological tension.

Descriptive information and structured characteristics should complement one another. The description provides context and nuance; structured characteristics make meaningful qualities identifiable and comparable.

Neither layer should be treated as a substitute for the other.

**B. Shared and Media-Specific Understanding**

WASABI should support a shared foundation of concepts that can be applied across different media types, supplemented by media-specific concepts where appropriate.

A characteristic such as isolation may be meaningful in a book, game, or film, even though the way it is expressed differs between those media.

At the same time, meaningful distinctions must be preserved. Examples include:

- Games: mechanics, progression, player agency, difficulty, and world structure.
- Books: narrative perspective, prose style, structure, and thematic development.
- Video: cinematography, editing, narrative structure, and tone.

These are illustrative areas of understanding, not fixed requirements for every work.

The system should support both cross-media comparisons and media-specific interpretation without forcing different forms of media into identical descriptive or analytical structures.

**C. An Evolving Characteristic Vocabulary**

WASABI's structured characteristics should use an evolving vocabulary rather than an uncontrolled collection of labels.

Characteristics may have meaningful relationships, including:

- **Semantic relationships:** Concepts with closely related meanings, such as isolation and loneliness.
- **Hierarchical relationships:** A broader concept and a more specific form of it, such as confinement and restricted environments.
- **Contrasting relationships:** Concepts that represent meaningful differences, such as solitude and social connection.
- **Associative relationships:** Concepts that frequently occur together or have a meaningful thematic relationship, such as isolation and psychological horror.

Related characteristics must retain their distinct meanings. The existence of a relationship between two concepts does not establish that they are interchangeable or that one necessarily implies the other.

The vocabulary should support:

- Creation of genuinely new characteristics when existing concepts cannot adequately describe a meaningful quality.
- Identification and consolidation of duplicates, synonyms, and equivalent concepts.
- Management of meaningful relationships between characteristics.
- Stability against gradual changes in meaning or increasingly broad application.
- More specific concepts when an existing concept is insufficient, rather than silently redefining the existing concept.

The origin and development of characteristics should remain traceable, including their supporting evidence and whether they originated from external information, WASABI interpretation, or information explicitly identified or recorded by the user.

**Shared, Media-Specific, and Archive-Specific Concepts**

The characteristic system should accommodate three complementary scopes:

- **Shared concepts:** Characteristics applicable across WASABI's supported media types.
- **Media-specific concepts:** Characteristics meaningful to a particular medium or its distinctive forms of expression.
- **Archive-specific interpretations:** Concepts or interpretations that emerge from the particular works and patterns within an individual user's archive.

An archive-specific interpretation should not automatically become a shared characteristic. Its broader usefulness and consistency should be established before it is incorporated into the shared vocabulary.

**D. Genre Classification**

Genre classification should remain distinct from structured characteristics.

Genres provide recognizable classifications of a work, while structured characteristics describe more specific qualities that may occur across multiple genres.

WASABI should not impose an arbitrary hard limit of three genres per work.

Instead, genre assignments should distinguish between:

- **Primary genres:** A limited set of genres that represent the work's central or dominant classifications.
- **Secondary genres:** Additional meaningful genres that help describe the work without necessarily defining its central identity.

Secondary genres should not have an arbitrary numerical ceiling, but every assignment must remain defensible and supported by evidence. Removing the hard limit must not result in indiscriminate labeling.

Primary and secondary classifications describe the work itself. They must not be determined by how highly the user evaluates or enjoys it.

Genre classifications may evolve as WASABI obtains better information or revises its understanding of a work.

**E. Source Information, Reliability, and Ambiguity**

WASABI should preserve the distinction between information asserted by sources and interpretations developed by WASABI.

Source information should retain its origin and be evaluated according to its relevance and reliability for the particular subject being established.

Source reliability should be assessed by subject area rather than through a single universal reliability score. A source may be highly reliable for release information but less reliable for thematic interpretation or other descriptive claims.

Source reliability must also remain distinct from WASABI's confidence in its own conclusions.

Multiple sources repeating the same underlying information should not automatically be treated as independent corroboration.

When sources disagree or provide competing interpretations, WASABI should preserve those differences rather than silently selecting one account and presenting it as definitive.

The system should distinguish between:

- Multiple valid interpretations of a work.
- Unresolved disagreement between sources.
- Insufficient information to establish a conclusion.

Ambiguity may be a legitimate property of a work. A work may meaningfully cross genre boundaries, support multiple interpretations, or resist a single definitive classification.

**True ambiguity is superior to manufactured certainty.**

WASABI should communicate what can be established, what remains uncertain, and where competing interpretations exist. Unsupported details should remain unknown rather than being guessed.

**F. Work Identity and External Matching**

Each specific work or release should have its own distinct identity and descriptive profile.

Different versions, remakes, remasters, expanded editions, and adaptations should not automatically be treated as interchangeable.

For example, an original release of a game and its later remake may share substantial characteristics while differing meaningfully in narrative, mechanics, presentation, or other qualities. Each should retain its own identity while preserving established relationships to the other.

Matching an archived entry to an externally identified work should account for uncertainty.

The intended direction is:

- **High confidence:** WASABI may automatically associate an entry with the likely matching work.
- **Moderate confidence:** WASABI should present a likely match and relevant alternatives for review.
- **Low confidence:** WASABI should leave the match unresolved rather than make an unsupported association.

Users should have a way to correct an incorrect match.

A correction should improve the affected entry, but should not automatically become a universal matching rule for unrelated works. Broader feedback-driven refinement may be investigated separately.

**G. Continuous Enrichment and Reassessment**

Enrichment should be an ongoing process rather than a one-time operation performed when a work first enters the archive.

When new or better evidence becomes available, WASABI should be capable of:

- Updating the descriptive profile.
- Reassessing structured characteristics and genre classifications.
- Revisiting relationships between characteristics and works.
- Preserving the provenance and history of relevant changes.
- Reconsidering affected findings and discoveries.
- Revising or withdrawing conclusions that are no longer supported.

Changes to information about a work must not overwrite or alter the user's original archive record or personal experience.

The enriched understanding of a work and the user's experience of that work must remain distinct, even as both evolve over time.

This process should complement the broader reassessment model established in Section 3.

**H. User Inspection and Correction**

Users should be able to inspect and, where appropriate, correct or exclude information within a work's enriched profile.

The system should distinguish between different kinds of user intervention:

- Correcting descriptive information about a work.
- Challenging or correcting a characteristic or interpretation established by WASABI.
- Excluding information obtained from an external source.

These actions have different meanings and should not be conflated with editing the user's own archive record.

The user should retain authority over their personal archive while being able to inspect, correct, and challenge the information and interpretations presented in an individual work's enriched profile. These capabilities concern WASABI's understanding of the work itself and must remain distinct from substantive feedback on discovery-family conclusions or feedback-driven refinement of analytical reasoning, which are deferred to 2.x.

**I. Coverage and Uncertainty**

Every archived work should receive an enrichment attempt, regardless of how much information is available.

WASABI should make the coverage and limitations of each enriched profile understandable to the user.

A profile may contain substantial descriptive information, partial information, unresolved interpretations, or very little established information. These differences should be represented transparently.

Missing information must not be interpreted as evidence that a characteristic, theme, or other quality is absent.

WASABI should distinguish between what is established, what is inferred, what is disputed, and what remains unknown.

**Scope Direction**

Content understanding and work enrichment are intended to be part of the shared intelligence foundation for WASABI 2.0, not isolated features created only when a particular discovery requires additional information.

The objective is to develop a richer, continuously maintained understanding of the entire archive so that all four discovery families can draw on relevant evidence.

The exact external information sources, enrichment methods, validation procedures, update frequency, and user-interaction mechanisms remain subjects for further investigation.

### 9.3 Work Profiles

WASABI 2.0 introduces a unified **Work Profile** for every individual book, game, or video in the archive.

The Work Profile provides a consistent destination for understanding a work, the user's experience of it, and its established connections to other works. It brings together the enriched understanding established through Section 9.2 with the user's own archive record, while keeping these distinct sources of information clearly separated.

A Work Profile should exist for every archived work, regardless of how much information WASABI can establish about it. Its completeness and coverage should be transparent, including what is known, what remains uncertain, and what information is unavailable.

**A. A Consistent Destination**

Every representation of a work throughout WASABI should provide a consistent, intuitive path to its Work Profile.

This should apply across the Library, discoveries, recommendations, lists, and other relevant views. Users should not need to navigate through a particular feature to access a work's profile.

Contextual entry points may direct users to relevant sections or information within the profile, but the Work Profile remains the common destination.

**B. Three Complementary Areas of Understanding**

The Work Profile brings together three distinct but related areas:

**Information About the Work**

This area presents WASABI's enriched understanding of the work, including:

- Descriptive information about its narrative, setting, themes, characters, structure, mechanics, and other relevant qualities.
- Primary and secondary genre classifications.
- Structured characteristics and their meaningful relationships.
- Relevant source information and provenance.
- WASABI's interpretations, including their supporting evidence, confidence, uncertainty, and any unresolved disagreements.
- The completeness and coverage of the available information.

The information presented should reflect what can be established about the work rather than what the user thinks or feels about it.

**The User's Experience**

This area presents the user's personal archive record, including:

- Scores and individual evaluation dimensions.
- Completion status.
- Notes and personal observations.
- Reviews and other recorded reflections.
- Other information documenting the user's experience of the work.

The user's experience must remain distinct from WASABI's description and interpretation of the work. WASABI must not overwrite personal observations with externally sourced information or allow the user's evaluation to determine the work's characteristics and genres.

**Established Connections**

This area presents evidence-supported relationships between the work and other works.

Connections may include shared characteristics, established relationships such as remakes or adaptations, and other meaningful associations that WASABI can support with sufficient evidence.

Connections should be explainable rather than presented as unsupported similarity claims. Their provenance and relevant limitations should remain inspectable.

**C. Coverage, Uncertainty, and Evolving Information**

The Work Profile should communicate the current state of WASABI's understanding without implying that every work can be described with equal completeness.

Profiles may contain substantial information, partial information, competing interpretations, or very little established information. These differences should be represented transparently.

The profile should distinguish between established information, WASABI interpretations, unresolved ambiguity, and information that remains unknown.

As new evidence becomes available, the enriched information and established connections may change. The Work Profile should reflect WASABI's current understanding while preserving the provenance and history necessary to understand meaningful changes.

Updates to information about a work must not alter the user's original archive record or recorded experience.

**D. Inspection and User Authority**

Users should be able to inspect the information and interpretations presented in a Work Profile and, where appropriate, correct or exclude information.

The profile should support a clear distinction between:

- Correcting descriptive information about a work.
- Challenging or correcting a WASABI interpretation.
- Excluding information obtained from an external source.
- Editing the user's own archive record or personal observations.

These actions represent different kinds of intervention and must not be conflated.

The user retains authority over their personal archive and should be able to inspect, correct, and exclude information in a Work Profile. These capabilities apply to the information and interpretations about an individual work presented in that profile. They do not constitute a general feedback mechanism for confirming, rejecting, or refining discovery-family conclusions. Substantive feedback on discoveries and feedback-driven refinement of analytical interpretations remain deferred to 2.x.

**E. Connections and Relationship Scope**

In 2.0, Work Profiles may present established, evidence-supported relationships that contribute to understanding an individual work.

The initial Work Profile is not intended to be a full relationship-exploration interface or a replacement for the Relationships discovery family.

The following capabilities remain deferred to 2.x:

- Tentative, emerging, or provisional connections.
- Richer bidirectional relationship exploration, including connections based on contrast, indirect relationships, and less obvious associations.
- User-created relationships, allowing users to manually connect works based on their own observations or interpretations.

These capabilities may expand how users explore relationships without changing the Work Profile's role as the central destination for understanding an individual work.

**F. Design Principle**

A Work Profile should be useful as an independently inspectable reference while also serving as a supporting destination for discoveries and other features.

Users should be able to explore it when interested, but ordinary use of WASABI should not require them to browse or manually maintain profiles.

The Work Profile is intended to make WASABI's understanding of individual works accessible, transparent, and useful throughout the application without making profile management a prerequisite for receiving value from the intelligence system.

---

# 10. Guiding Product Ambition

The central ambition emerging from this discussion is:

**WASABI should help people discover, understand, and explore patterns in their own relationship with media that they might never have recognized on their own.**

It should be capable of independent investigation, transparent about its evidence, open to user context and interpretation, and careful about the distinction between what it knows and what it merely suspects.

The product should not simply tell users what they like.

It should help them discover _how_, _when_, and _in what ways_ they respond to the things they experience—and give them the tools to explore those discoveries further.

**Working principle: WASABI can tell you what it sees, show you why it sees it, and invite you to decide what it means.**
