# WASABI 2.0 — Capability Area Identification

**Status:** Working Draft  
**Purpose:** Identify the major capability areas required to realize the WASABI 2.0 Product Vision & Discovery Design.

## 1. Purpose and Scope

This document identifies the major areas of capability that WASABI 2.0 must support.

It serves as an intermediate planning step between the product vision and detailed requirements discovery. It establishes the responsibilities of the product at a conceptual level without prescribing implementation, technology, architecture, or specific interface designs.

The capability areas are derived from the accepted Product Vision & Discovery Design. They are intended to represent the complete product, not merely its intelligence and discovery functions.

The areas and their boundaries remain subject to review before detailed requirements are established.

## 2. Capability Area Overview

| ID    | Capability Area                             | Primary Responsibility                                                                                                                      |
| ----- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| CA-01 | Archive and Collection Management           | Maintain the user's personal media archive as the authoritative record of their collection and experience.                                  |
| CA-02 | Work Identity and Content Understanding     | Identify archived works and develop an enriched understanding of their content and characteristics.                                         |
| CA-03 | Shared Evidence and Knowledge Foundation    | Organize evidence, information, provenance, uncertainty, and derived findings in a consistent shared foundation.                            |
| CA-04 | Media Experience and Response Modeling      | Represent and interpret the user's evaluations, enjoyment, engagement, and completion information without conflating them.                  |
| CA-05 | Affinity Intelligence                       | Investigate recurring relationships between the user's responses and characteristics of media works.                                        |
| CA-06 | Relationship Intelligence                   | Identify meaningful connections, similarities, contrasts, and associations among works and characteristics.                                 |
| CA-07 | Evolution Intelligence                      | Identify how the user's interests, attention, and responses change over time.                                                               |
| CA-08 | Exception Intelligence                      | Identify unusual works and deviations from established patterns that may reveal something meaningful.                                       |
| CA-09 | Cross-Family Intelligence and Synthesis     | Combine independently established findings into broader and potentially emergent discoveries.                                               |
| CA-10 | Intelligence Lifecycle and Reassessment     | Keep intelligence current as archive records, enriched information, and supporting evidence change.                                         |
| CA-11 | Discovery Experience and Exploration        | Present discoveries and provide meaningful ways to navigate, investigate, and explore intelligence findings.                                |
| CA-12 | Work Profiles and User Agency               | Provide unified work-level experiences and preserve the user's ability to inspect, manage, and interpret information.                       |
| CA-13 | External Media Discovery and Recommendation | Identify and recommend external media works using established affinity evidence, with transparent explanations of recommendation rationale. |

These capability areas collectively represent the product's responsibilities. They are conceptually distinct but interconnected, and they should not be interpreted as independent technical modules or a prescribed implementation architecture.

## 3. Capability Area Definitions

### CA-01 — Archive and Collection Management

**Purpose:** Maintain the user's personal media archive as the authoritative record of their collection and recorded experiences.

This area is responsible for the integrity, completeness, organization, preservation, and continued maintenance of the archive.

Its capability responsibilities include:

- Maintaining records across supported media types.
- Recording and maintaining information about individual works and the user's experiences with them.
- Supporting evaluations, evaluation dimensions, completion information, and other recorded experience data.
- Distinguishing incomplete, missing, unknown, and intentionally unrecorded information.
- Supporting correction and maintenance of existing records.
- Identifying and addressing duplicate, inconsistent, or incomplete archive entries.
- Preserving the distinction between the user's original records and information subsequently enriched or interpreted by WASABI.
- Supporting the continued evolution of the archive without treating historical records as immutable.
- Supporting archive backup and restoration so the user's collection and recorded experiences can be preserved and recovered.
- Supporting data portability so the user retains control over their archived information beyond the application.
- Supporting the reconciliation of historical and externally maintained records with the authoritative archive while avoiding unintended duplication or loss of information.

**Boundary:** The archive is the authoritative source for the user's recorded collection and experiences. It is not itself the intelligence engine, and missing archive information must not be silently interpreted as a neutral response or representative evidence.

### CA-02 — Work Identity and Content Understanding

**Purpose:** Establish and maintain an enriched understanding of the media works represented in the archive.

This area is responsible for identifying the works represented in the user's archive and developing a structured, evidence-supported understanding of their content and characteristics. Identification and evaluation of external candidate works for recommendation are addressed separately by External Media Discovery and Recommendation (CA-13).

Its capability responsibilities include:

- Identifying the actual work associated with an archived entry.
- Resolving ambiguous work identities and representing matching confidence.
- Maintaining descriptive information about works.
- Identifying, extracting, and organizing structured characteristics.
- Supporting shared characteristics across media types and media-specific characteristics where appropriate.
- Maintaining relationships between genres and characteristics without treating them as interchangeable.
- Preserving multiple interpretations, conflicting information, and unknown characteristics.
- Evaluating the reliability and provenance of external information.
- Distinguishing externally sourced claims from characteristics inferred by WASABI or explicitly identified by the user.
- Maintaining an evolving understanding as new information becomes available.
- Allowing the user to inspect, correct, or exclude information associated with an individual work.

**Boundary:** Understanding a work does not establish how the user feels about it. External information can describe a work, but it cannot independently establish the user's enjoyment, evaluation, or engagement. This area establishes work-level understanding; the Shared Evidence and Knowledge Foundation governs how that information and its provenance are made available to the rest of the product.

### CA-03 — Shared Evidence and Knowledge Foundation

**Purpose:** Provide a common, inspectable foundation through which WASABI's capabilities can access, organize, and reason about evidence and information.

This area supports the integrity, consistency, traceability, and appropriate use of information throughout the product.

Its capability responsibilities include:

- Making archive evidence, enriched work information, user-originated information, and derived findings distinguishable.
- Preserving the provenance and origin of information, including its source and how it was obtained.
- Representing uncertainty and the reliability of underlying information.
- Distinguishing source reliability from WASABI's confidence in an interpretation.
- Distinguishing the strength of an observed association from confidence in the finding.
- Preserving the distinction between source claims, WASABI-generated interpretations, user-provided context, observations, and established findings.
- Supporting shared and media-specific characteristics and their semantic relationships.
- Maintaining the distinction between observations, interpretations, and established findings.
- Supporting evidence inspection and explanations of how findings were reached.
- Preventing repeated claims from a common underlying source from being treated as independent corroboration.
- Making relevant evidence and information available to the appropriate capabilities without erasing its origin, limitations, or intended meaning.
- Allowing the evidence foundation to evolve as the archive and enriched information change.

**Boundary:** This is a shared foundation, not a fifth discovery family or an independent source of conclusions. It supports the evidence and reasoning needs of the product's capabilities while preserving the distinctions between their responsibilities. Sharing evidence does not make family-specific reasoning interchangeable, and information available to one capability does not automatically establish a conclusion for another.

### CA-04 — Media Experience and Response Modeling

**Purpose:** Represent the user's relationship with individual works accurately enough to support meaningful interpretation.

This area is responsible for maintaining the conceptual distinctions between different kinds of personal response and experience, including how those responses are represented across supported media types.

Its capability responsibilities include:

- Representing evaluation and its individual dimensions.
- Representing enjoyment independently of evaluation.
- Representing engagement independently of evaluation and enjoyment.
- Representing completion as a distinct behavioral or experience signal.
- Accounting for media-specific differences in how experiences are evaluated and recorded.
- Supporting the interpretation of incomplete, inconsistent, or changing responses.
- Preserving temporal context where it matters to understanding an experience.
- Distinguishing the absence of a recorded response from an explicitly neutral or negative response.
- Preventing missing measurements from being treated as negative, neutral, or representative evidence.
- Providing a coherent conceptual basis for interpreting recorded experiences across the product's intelligence capabilities.

**Boundary:** Evaluation, enjoyment, engagement, and completion are related but distinct forms of evidence. WASABI must not assume that one can automatically substitute for another. Completion does not establish enjoyment, and an unfinished work does not necessarily indicate a negative experience.

The addition of new enjoyment or engagement measurements, and the precise way those experiences should be captured, remain open design questions.

### CA-05 — Affinity Intelligence

**Central question:** What do I consistently respond to?

**Purpose:** Identify and explain recurring relationships between the user's responses and characteristics of the works they experience.

Affinity Intelligence investigates how the user's evaluations, enjoyment, and engagement relate to characteristics established through the shared understanding of media works.

Its capability responsibilities include:

- Investigating associations between work characteristics and the user's recorded responses.
- Identifying positive, negative, conditional, neutral, and mixed associations.
- Distinguishing insufficient evidence from evidence of no demonstrated association.
- Identifying emerging associations and distinguishing them from more established recurring affinities.
- Evaluating associations across individual evaluation dimensions and, where sufficient information exists, enjoyment and engagement.
- Investigating pairs and smaller combinations of characteristics.
- Examining how associations vary across genres, media types, contexts, and other relevant conditions.
- Identifying inconsistent responses without forcing an unsupported explanation.
- Detecting and explaining changes in established affinities over time.
- Supporting comparisons across media types and within individual media types.
- Considering both positive and negative affinity evidence when investigating potential recommendations.
- Communicating the evidence, association strength, confidence, and limitations behind findings.

**Boundary:** Affinity concerns the user's responses to characteristics of works. It is not simply a measure of which works are similar, nor should it equate low evaluation with dislike or high evaluation with enjoyment.

A response to an individual work does not, by itself, establish a positive or negative affinity. Established affinities require recurring supporting evidence, and negative affinities must not be treated as automatic exclusion rules. The absence of a demonstrated positive association does not necessarily establish a negative one.

Association strength and confidence must remain distinct. A finding may have a strong observed association while still having limited confidence because of the amount, quality, or consistency of its supporting evidence.

### CA-06 — Relationship Intelligence

**Central question:** What do seemingly unrelated things have in common?

**Purpose:** Identify and explain meaningful relationships among works and their characteristics, independently of whether the user responded positively or negatively to them.

Relationship Intelligence investigates connections within the archive, using the shared understanding of works and their characteristics to reveal similarities, contrasts, clusters, and less obvious associations.

Its capability responsibilities include:

- Identifying similarities among works based on their content and characteristics.
- Identifying meaningful contrasts and differences between works.
- Identifying clusters and recurring associations among works and characteristics.
- Investigating relationships among individual characteristics and combinations of characteristics.
- Identifying connections that may not be apparent from conventional genre or category labels.
- Supporting both within-media and cross-media connections where sufficient evidence exists.
- Explaining why works or characteristics are considered related and identifying the evidence supporting those relationships.
- Distinguishing meaningful relationships from superficial overlap or coincidental similarity.
- Supporting the exploration of relationships from the perspective of individual works, characteristics, and broader groups.

**Boundary:** Relationship Intelligence investigates connections among works and characteristics. It does not establish that the user enjoys, prefers, or identifies with the connected works. Those questions belong to Affinity Intelligence.

Relationships are internal to the user's archive. Discovering external works that the user might want to experience belongs to External Media Discovery and Recommendation (CA-13), even when existing relationships provide useful context for understanding a recommendation.

### CA-07 — Evolution Intelligence

**Central question:** How have my interests, attention, and priorities shifted over time?

**Purpose:** Identify and explain meaningful changes in the user's media interests, consumption, and experiences.

Evolution Intelligence investigates how patterns develop, persist, change, disappear, and recur throughout the user's history with media.

Its capability responsibilities include:

- Identifying trends and changes in media consumption and attention.
- Identifying meaningful phases in the user's media interests.
- Distinguishing sustained trends from temporary phases and isolated fluctuations.
- Identifying gradual and abrupt transitions in interests and activity.
- Supporting recurring and potentially overlapping phases that do not necessarily align with fixed calendar periods.
- Examining changes in the composition of interests over time.
- Investigating changes in evaluation, enjoyment, and engagement where sufficient evidence exists.
- Distinguishing changes in consumption or attention from changes in personal response or appreciation.
- Supporting both cross-media and media-specific analysis.
- Examining how established affinities and other patterns develop or change over time.
- Explaining the evidence behind detected changes, trends, and phases while communicating uncertainty and limitations.

**Boundary:** Changes in consumption do not automatically establish changes in preference, enjoyment, or appreciation. A period of increased activity does not necessarily indicate stronger interest, and reduced activity does not necessarily indicate that an interest has ended.

Evolution Intelligence identifies and explains observed changes but must not assign causal explanations without supporting evidence. More extensive causal interpretation remains outside the baseline 2.0 commitment.

### CA-08 — Exception Intelligence

**Central question:** What doesn't fit my usual patterns, and what can I learn from it?

**Purpose:** Identify and explain unusual works and meaningful deviations from established patterns in the user's archive and recorded experiences.

Exception Intelligence investigates observations that stand apart from what would otherwise be expected, including individual works that are unusual and responses that diverge from established patterns.

Its capability responsibilities include:

- Identifying outliers within the archive.
- Identifying works and responses that diverge from established patterns.
- Distinguishing unusual entries from genuine exceptions to a known pattern.
- Examining why a work or response differs from an established affinity, relationship, or other observed pattern.
- Identifying individually meaningful exceptions and broader observations.
- Investigating whether an apparent exception reflects a meaningful distinction, insufficient evidence, or an unresolved inconsistency.
- Explaining why an exception is distinctive and what evidence supports that interpretation.
- Preserving uncertainty when an unusual observation cannot yet be interpreted reliably.

**Boundary:** Statistical rarity alone does not establish meaningfulness. An outlier is not necessarily an exception, and an exception is not necessarily statistically rare. An unusual individual response must not automatically be treated as evidence of a broader change in preference or an established negative affinity.

The initial scope emphasizes investigation within individual media categories. Broader cross-media exception analysis and more extensive recurring exception patterns remain future possibilities.

### CA-09 — Cross-Family Intelligence and Synthesis

**Purpose:** Combine independently established findings from the discovery families into broader, more complete, and potentially emergent discoveries.

Cross-Family Intelligence and Synthesis investigates how findings from different analytical perspectives relate to one another and what additional understanding may emerge from their interaction.

Its capability responsibilities include:

- Combining findings from multiple discovery families.
- Identifying how separate findings support, qualify, contextualize, or contradict one another.
- Identifying broader patterns that emerge from interactions among independently established findings.
- Distinguishing genuinely emergent discoveries from coincidental overlap or simple aggregation.
- Preserving the provenance, evidence, confidence, and limitations of contributing findings.
- Accounting for differences in the strength and confidence of contributing findings.
- Explaining how a synthesized discovery was reached and how its contributing findings support the interpretation.
- Preserving uncertainty or unresolved disagreement when contributing findings do not support a unified conclusion.

**Boundary:** Synthesis is an overarching capability, not a fifth discovery family.

Each family must establish its own findings through its own evidence and reasoning. Synthesis may combine those findings, but one family's conclusion cannot substitute for another family's independent evidence assessment. A synthesized discovery must not imply greater certainty than its supporting findings justify.

More extensive chains of derived findings are not a baseline 2.0 requirement.

### CA-10 — Intelligence Lifecycle and Reassessment

**Purpose:** Keep WASABI's intelligence responsive to changes in the archive, enriched work information, and supporting evidence.

This area is responsible for coordinating the reassessment and continued maintenance of intelligence findings as the information supporting them changes.

Its capability responsibilities include:

- Identifying which findings and dependent interpretations may be affected by changes in supporting evidence.
- Supporting targeted, cross-family, and broader periodic reassessment.
- Maintaining the status of findings as evidence changes.
- Identifying findings that may be outdated or require renewed investigation.
- Supporting incremental reassessment where appropriate rather than requiring unnecessary full recalculation.
- Preserving the relationship between findings and the evidence available when they were established or reassessed.
- Communicating reassessment status and relevant changes to the other product capabilities.
- Supporting automated lifecycle management without requiring users to coordinate routine intelligence maintenance.

**Boundary:** Intelligence lifecycle management coordinates when and how findings are reassessed; it does not own the analytical reasoning or conclusions of individual discovery families. Each family remains responsible for evaluating its own evidence, while Cross-Family Intelligence and Synthesis remains responsible for combining independently established findings.

Reassessment should respond to meaningful changes in evidence without treating every archive modification as a reason to recalculate everything. The precise scheduling, dependency management, and execution mechanisms remain implementation and requirements questions.

### CA-11 — Discovery Experience and Exploration

**Purpose:** Make WASABI's intelligence findings accessible, understandable, and meaningfully explorable.

This area is responsible for how discoveries are presented to the user and how the user navigates between findings, supporting evidence, and related works.

Its capability responsibilities include:

- Presenting discoveries through a coherent and unified intelligence experience.
- Supporting both proactive discovery and user-directed exploration.
- Organizing and prioritizing discoveries in ways that balance unexpected revelation with useful confirmation.
- Making discovery significance understandable without relying solely on recency, rarity, or numerical scores.
- Presenting the evidence, reasoning, uncertainty, and limitations behind individual discoveries.
- Supporting navigation between discoveries, contributing findings, relevant characteristics, and associated works.
- Providing contextual exploration of relationships and broader patterns.
- Exploring appropriate visual representations that help users understand connections without overwhelming the experience.
- Supporting optional discovery management, such as saving, dismissing, or marking discoveries as interesting.
- Communicating when discoveries or their supporting findings have changed following reassessment.
- Providing a consistent experience for exploring findings from different discovery families and cross-family synthesis.

**Boundary:** This area is responsible for presenting and exploring intelligence findings, not generating or validating their analytical conclusions. Discovery prioritization and presentation must not silently alter the underlying evidence, findings, or their significance.

User actions such as saving, dismissing, or marking discoveries as interesting are forms of personal curation. They must not affect analytical conclusions, scoring, or significance prioritization. General feedback on discovery-family findings and feedback-driven learning remain future 2.x capabilities.

External media recommendations are a distinct capability area (CA-13), although their presentation and exploration may share appropriate interaction patterns with the broader discovery experience.

### CA-12 — Work Profiles and User Agency

**Purpose:** Provide a unified, inspectable experience for individual works while preserving the user's authority over their archive and work-level information.

This area is responsible for bringing together information about a work and the user's recorded experience with it, while allowing the user to understand, maintain, and interpret that information.

Its capability responsibilities include:

- Providing a unified Work Profile for each archived work.
- Bringing together descriptive work information, enriched characteristics, the user's recorded experience, and established connections.
- Making the profile's information and its origins understandable and inspectable.
- Communicating missing information, uncertainty, and unresolved identity or enrichment issues.
- Allowing users to inspect, correct, or exclude work-level information.
- Preserving the distinction between original archive records, enriched work information, and derived intelligence findings.
- Making established, evidence-supported relationships accessible through Work Profiles.
- Providing appropriate ways to navigate between a work and its established connections or related discoveries.
- Preserving the user's ability to interpret discoveries without requiring them to accept WASABI's conclusions.

Boundary: Work Profiles bring together information and established findings but do not independently generate or validate intelligence conclusions. Correcting or excluding work-level information is not the same as providing general feedback on whether a discovery-family conclusion is valid.

General discovery feedback, user confirmation or rejection of family findings, and feedback-driven learning remain future 2.x capabilities. Tentative or emerging relationships, user-created relationships, and richer bidirectional relationship exploration also remain outside the baseline 2.0 commitment.

### CA-13 — External Media Discovery and Recommendation

**Central question:** What should I try next, and why might it be right for me?

**Purpose:** Identify and recommend external media works that may meaningfully align with the user's established interests, supported by transparent and inspectable explanations.

This area is responsible for discovering candidate works beyond the user's existing archive, evaluating their relevance using established intelligence findings, and explaining why they may be worth experiencing.

Its capability responsibilities include:

- Identifying and assembling candidates from external media catalogs and information sources.
- Evaluating candidate works against established positive and negative affinities.
- Considering negative affinities as contextual evidence rather than automatic exclusion rules.
- Supporting recommendations justified by a single strongly established affinity or by multiple supporting affinities.
- Distinguishing established affinity evidence from emerging, weak, or insufficiently supported associations.
- Using available external information about candidate works to evaluate relevance and connect recommendations to known characteristics, without requiring candidates to have complete archived-work profiles.
- Explaining why each candidate was recommended by connecting it to specific established affinities and inspectable supporting evidence.
- Communicating potential mismatches or conflicting affinity evidence where relevant.
- Presenting recommendations as an unranked collection without implying unsupported comparative precision.
- Allowing users to save recommendations for later, view saved recommendations, and remove them.
- Keeping saved recommendations distinct from archived works and recorded media experiences.
- Keeping recommendation generation separate from routine intelligence reassessment while allowing it to consume the latest available established findings.

**Baseline 2.0 scope:** Recommendations are limited to movies that have not previously been recorded in the user's archive. Recommendations are grounded in established affinities and may reflect either positive or negative evidence. Exploratory recommendations intended to challenge or broaden established taste, recommendations for previously recorded works, and recommendations for books or games remain outside the baseline 2.0 commitment.

Saved recommendations are organizational only. Saving or removing a recommendation does not establish a preference, influence affinities, affect future candidate selection, or train WASABI's intelligence. A recommendation becomes part of the archive only when the user actually records the work and their experience with it.

**Boundary:** External Media Discovery and Recommendation identifies potential future experiences; it does not manage the user's existing collection or establish archive-internal relationships. It consumes established intelligence findings rather than independently determining the user's preferences. External metadata can describe and characterize a candidate, but cannot establish that the user will enjoy it.

Advanced recommendation feedback, personalization based on user choices, exploratory recommendations, user-triggered refresh, streaming availability, and recommendations for additional media types remain future 2.x possibilities.

## 4. Cross-Cutting Capability Expectations

The following expectations apply across the capability areas. They are not separate product modules or discovery families; they are standards that the capabilities must collectively uphold.

### 4.1 Evidence and Explainability

Findings should be grounded in identifiable evidence, and the user should be able to understand why WASABI reached an interpretation.

### 4.2 Provenance and Uncertainty

Information should retain its origin and appropriate uncertainty. Source reliability, model confidence, and finding strength must remain distinguishable.

### 4.3 Separation of Concepts

WASABI must preserve distinctions between:

- Archive observations and inferred interpretations.
- Work characteristics and user responses.
- Evaluation, enjoyment, engagement, and completion.
- Similarity and affinity.
- Outliers and exceptions.
- Family findings and synthesized discoveries.
- User curation and analytical feedback.

### 4.4 Independent Reasoning

Each discovery family must retain its own purpose, evidence assessment, and reasoning. Shared information should enable collaboration without erasing those distinctions.

### 4.5 Reassessment and Reversibility

Findings should be revisable as evidence changes. New information should not silently overwrite the user's original archive records or experience.

### 4.6 User Interpretive Authority

WASABI should communicate what it observes and how it reached its conclusions while leaving the user authority over what those conclusions mean personally.

### 4.7 Consistency and Usability

The product should provide a coherent experience across capability areas, with consistent presentation, understandable interactions, and appropriate feedback when users perform actions.

Visual language, interaction patterns, terminology, and navigation should remain consistent without preventing individual capabilities from presenting information in ways appropriate to their purpose.

### 4.8 Accessibility

The product should support accessible interaction and presentation across its capabilities. Information should not depend exclusively on color, visual position, or other single modes of communication, and interactive elements should remain usable through appropriate accessibility mechanisms.

### 4.9 Reliability and Resilience

The product should remain understandable and usable when information or intelligence is incomplete, unavailable, or undergoing reassessment.

Failures or limitations in external information sources, enrichment, analysis, or other supporting capabilities should not silently compromise the archive or make unrelated capabilities unusable. Partial results and unavailable information should be communicated honestly rather than presented as complete or authoritative.

### 4.10 Performance and Responsiveness

The product should provide responsive interactions and timely access to archive information, work profiles, discoveries, and other core experiences.

Computationally intensive or potentially lengthy operations should not unnecessarily prevent users from interacting with unrelated parts of the application. Delays, ongoing operations, and completion or failure states should be communicated appropriately.

### 4.11 Privacy, Security, and Data Control

The user's archive, recorded experiences, and personal intelligence should be treated as private user-owned information.

The product should protect personal information, provide appropriate control over how it is stored and used, and avoid exposing or sharing user data without the user's authorization. External information services and integrations should not undermine the user's control over their personal archive and information.

## 5. Known Scope Boundaries

The following boundaries have been established in the Product Vision & Discovery Design. They should be preserved during capability and requirements discovery.

**Established baseline 2.0 scope:**

- External media recommendations are limited to movies that have not previously been recorded in the user's archive.
- Recommendations are grounded in established positive and negative affinities and must provide evidence-based explanations.
- Recommendations are presented as an unranked collection.
- Users can save recommendations for later, view saved recommendations, and remove them. These actions are organizational only and do not influence WASABI's intelligence.
- Shared work enrichment supports the product's understanding of archived works across supported media types, independently of the narrower movie-only recommendation scope.
- Each archived work has a unified Work Profile that brings together descriptive information, the user's recorded experience, and established connections.
- Users can inspect, correct, or exclude work-level information without that action becoming general feedback on discovery-family conclusions.
- Archive preservation, restoration, portability, and reconciliation are product responsibilities, although their detailed requirements remain to be established.

**Identified as future 2.x or otherwise outside the baseline 2.0 commitment:**

- General user feedback on discovery-family findings, including confirmation, rejection, correction, or commentary, and feedback-driven learning.
- User-created work relationships and richer bidirectional relationship exploration.
- More extensive chains of derived findings.
- Causal explanations for observed evolution.
- Broader cross-media exception analysis and more extensive recurring exception patterns.
- More complex affinity combinations and advanced refinement mechanisms.
- Nested evolution phases as a stretch goal.
- Recommendations intended to challenge or broaden established taste beyond existing affinities.
- Recommendations for works already recorded in the archive.
- Recommendations for books and games.
- Advanced recommendation feedback, personalization based on user choices, and learning from saves or removals.
- User-triggered recommendation refresh.
- Streaming availability information and availability-based recommendation filtering.

**Still requiring investigation rather than being treated as settled commitments:**

- How enjoyment and engagement are measured or captured.
- How missing and incomplete archive information should affect particular analyses.
- Characteristic vocabulary governance and enrichment coverage.
- Work identity resolution and confidence handling.
- Discovery significance and presentation priorities.
- Evolution phase detection and temporal thresholds.
- The breadth and complexity of cross-family synthesis.
- The detailed presentation and navigation of Work Profiles and contextual visual exploration.
- Archive remediation and the longer-term import and reconciliation workflow.
- Detailed requirements for backup, restoration, export, and data portability.
- External movie candidate discovery, candidate evaluation, and the selection of suitable information providers.

These questions should be resolved during capability and requirements discovery, not through premature implementation decisions.

## 6. Capability Relationships

The capability areas are conceptually connected, but they should not be treated as interchangeable. Each area has a distinct responsibility, and information may be shared without transferring ownership of the reasoning or conclusions that a capability is responsible for establishing.

At a high level:

1. **Archive and Collection Management (CA-01)** maintains the user's recorded collection and experiences as the authoritative archive.
2. **Work Identity and Content Understanding (CA-02)** establishes what archived works are and develops an enriched understanding of their content and characteristics.
3. **Shared Evidence and Knowledge Foundation (CA-03)** preserves the information, provenance, uncertainty, and derived findings available throughout the product.
4. **Media Experience and Response Modeling (CA-04)** provides the conceptual basis for representing and interpreting the user's responses to individual works.
5. **Affinity, Relationships, Evolution, and Exceptions Intelligence (CA-05–CA-08)** independently investigate their respective discovery questions using the shared evidence foundation.
6. **Cross-Family Intelligence and Synthesis (CA-09)** combines independently established family findings into broader and potentially emergent discoveries.
7. **Intelligence Lifecycle and Reassessment (CA-10)** coordinates reassessment as the archive, enriched information, and supporting evidence change.
8. **Discovery Experience and Exploration (CA-11)** presents findings and provides ways for users to navigate and investigate discoveries and their supporting evidence.
9. **Work Profiles and User Agency (CA-12)** brings together information and established connections for individual works while preserving the user's ability to inspect, correct, manage, and interpret that information.
10. **External Media Discovery and Recommendation (CA-13)** identifies and evaluates external candidate works using established intelligence findings and provides transparent explanations for recommendations.

These relationships describe logical responsibilities and dependencies, not a proposed technical architecture or mandatory execution sequence.

The capability areas may exchange information and support one another, but their boundaries must remain clear. In particular:

- Shared evidence does not make family-specific reasoning interchangeable.
- Cross-family synthesis combines independently established findings rather than replacing the reasoning of individual families.
- Intelligence lifecycle management coordinates reassessment without owning the analytical conclusions being reassessed.
- Discovery presentation and exploration do not independently establish or alter analytical findings.
- Work Profiles bring together information and established findings without becoming independent intelligence systems.
- External recommendations consume established intelligence findings without becoming archive-internal relationships or independently determining the user's preferences.

The user's archive remains the authoritative record of their collection and recorded experiences. Enriched information, intelligence findings, synthesized discoveries, and recommendations build upon that foundation without silently replacing or redefining the user's original records.

## 7. Outcome of This Identification

This capability map establishes a proposed high-level model of what WASABI 2.0 must support.

It provides the basis for the next planning activity: decomposing each capability area into more specific capabilities, identifying the information and evidence each requires, establishing dependencies, and eventually defining functional and quality requirements.

No specific implementation, technology, architecture, or final feature prioritization is established by this document.
