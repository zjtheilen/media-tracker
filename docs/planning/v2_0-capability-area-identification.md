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

This area is responsible for the integrity, completeness, organization, and continued maintenance of the archive.

Its capability responsibilities include:

- Maintaining records across supported media types.
- Recording and maintaining information about individual works and the user's experiences with them.
- Supporting evaluations, evaluation dimensions, completion information, and other recorded experience data.
- Distinguishing incomplete, missing, unknown, and intentionally unrecorded information.
- Supporting correction and maintenance of existing records.
- Identifying and addressing duplicate, inconsistent, or incomplete archive entries.
- Preserving the distinction between the user's original records and information subsequently enriched or interpreted by WASABI.
- Supporting the continued evolution of the archive without treating historical records as immutable.

**Boundary:** The archive is the authoritative source for the user's recorded collection and experiences. It is not itself the intelligence engine, and missing archive information must not be silently interpreted as a neutral response or representative evidence.

### CA-02 — Work Identity and Content Understanding

**Purpose:** Establish and maintain an enriched understanding of the media works represented in the archive.

This area allows WASABI to understand what a work is independently of how the user experienced or evaluated it.

Its capability responsibilities include:

- Identifying the actual work associated with an archived entry.
- Resolving ambiguous work identities and representing matching confidence.
- Maintaining descriptive information about works.
- Identifying and organizing structured characteristics.
- Supporting shared characteristics across media types and media-specific characteristics where appropriate.
- Maintaining relationships between genres and characteristics without treating them as interchangeable.
- Preserving multiple interpretations, conflicting information, and unknown characteristics.
- Evaluating the reliability and provenance of external information.
- Maintaining an evolving understanding as new information becomes available.
- Allowing the user to inspect, correct, or exclude information associated with an individual work.

**Boundary:** Understanding a work does not establish how the user feels about it. External information can describe a work, but it cannot independently establish the user's enjoyment, evaluation, or engagement.

### CA-03 — Shared Evidence and Knowledge Foundation

**Purpose:** Provide a common, inspectable foundation through which WASABI's intelligence capabilities can access and reason about evidence.

This area supports the integrity and consistency of information used throughout the product.

Its capability responsibilities include:

- Making archive evidence, enriched work information, user-originated information, and derived findings distinguishable.
- Preserving the provenance of information and conclusions.
- Representing uncertainty and the reliability of underlying information.
- Distinguishing source reliability from WASABI's confidence in an interpretation.
- Distinguishing the strength of an observed association from confidence in the finding.
- Supporting shared and media-specific characteristics and their semantic relationships.
- Maintaining the distinction between observations, interpretations, and established findings.
- Supporting evidence inspection and explanation of how findings were reached.
- Preventing repeated claims from a common source from being treated as independent corroboration.
- Allowing the evidence foundation to evolve as the archive and enriched information change.

**Boundary:** This is a shared foundation, not a fifth discovery family. It supports the independent reasoning of each family without making their reasoning interchangeable.

### CA-04 — Media Experience and Response Modeling

**Purpose:** Represent the user's relationship with individual works accurately enough to support meaningful interpretation.

This area is responsible for maintaining the conceptual distinction between different kinds of personal response and experience.

Its capability responsibilities include:

- Representing evaluation and its individual dimensions.
- Representing enjoyment independently of evaluation.
- Representing engagement independently of evaluation and enjoyment.
- Representing completion as a distinct behavioral or experience signal.
- Accounting for media-specific differences in how experiences are evaluated.
- Supporting the interpretation of incomplete, inconsistent, or changing responses.
- Preserving temporal context where it matters to understanding an experience.
- Preventing missing measurements from being treated as negative, neutral, or representative evidence.

**Boundary:** Evaluation, enjoyment, engagement, and completion are related but distinct forms of evidence. WASABI must not assume that one can automatically substitute for another.

The addition of new enjoyment or engagement measurements, and the precise way those experiences should be captured, remain open design questions.

### CA-05 — Affinity Intelligence

**Central question:** What do I consistently respond to?

**Purpose:** Identify recurring relationships between the user's responses and characteristics of the works they experience.

Its capability responsibilities include:

- Investigating associations between characteristics and user responses.
- Identifying positive, negative, conditional, neutral, and mixed associations.
- Distinguishing insufficient evidence from evidence of no demonstrated association.
- Identifying emerging associations and more established recurring affinities.
- Investigating pairs and smaller combinations of characteristics.
- Examining differences across evaluation dimensions and, where supported, enjoyment and engagement.
- Supporting comparisons across media types and within individual media types.
- Identifying inconsistent responses and changes in established affinities.
- Communicating the supporting evidence, uncertainty, and strength of findings.

**Boundary:** Affinity concerns the user's responses to characteristics. It is not simply a measure of which works are similar, nor should it equate low evaluation with dislike or high evaluation with enjoyment.

### CA-06 — Relationship Intelligence

**Central question:** What do seemingly unrelated things have in common?

**Purpose:** Identify meaningful relationships among works and their characteristics, independent of whether the user responded positively or negatively to them.

Its capability responsibilities include:

- Identifying similarities among works.
- Identifying meaningful contrasts and differences.
- Identifying clusters and recurring associations.
- Investigating relationships among characteristics.
- Supporting both within-media and cross-media connections where evidence permits.
- Explaining why works or characteristics are considered related.
- Distinguishing meaningful relationships from superficial overlap.

**Boundary:** Relationship Intelligence investigates connections among works and characteristics. It does not establish that the user enjoys, prefers, or identifies with the connected works.

Archive-internal relationships must also remain distinct from external recommendations.

### CA-07 — Evolution Intelligence

**Central question:** How have my interests, attention, and priorities shifted over time?

**Purpose:** Identify meaningful changes in the user's media interests and experiences.

Its capability responsibilities include:

- Identifying trends and changes in media consumption and attention.
- Identifying meaningful phases in the user's media interests.
- Distinguishing sustained trends from temporary phases and isolated fluctuations.
- Identifying gradual and abrupt transitions.
- Supporting recurring and potentially overlapping phases.
- Examining changes in the composition of interests.
- Investigating changes in evaluation, enjoyment, and engagement where sufficient evidence exists.
- Supporting both cross-media and media-specific analysis.
- Explaining the evidence behind detected changes and phases.

**Boundary:** Changes in consumption do not automatically establish changes in preference. Observed changes should not be assigned causal explanations without supporting evidence.

### CA-08 — Exception Intelligence

**Central question:** What doesn't fit my usual patterns, and what can I learn from it?

**Purpose:** Identify unusual works and meaningful deviations from established patterns.

Its capability responsibilities include:

- Identifying outliers in the archive.
- Identifying works that diverge from established patterns.
- Distinguishing unusual entries from genuine exceptions to a known pattern.
- Examining why a work differs from an established affinity, relationship, or other observed pattern.
- Identifying individually meaningful exceptions and broader observations.
- Communicating why an exception is distinctive and what evidence supports that interpretation.

**Boundary:** Statistical rarity alone does not establish meaningfulness. An outlier is not necessarily an exception, and an exception is not necessarily statistically rare.

The initial scope emphasizes investigation within individual media categories. Broader cross-media exception analysis and more extensive recurring exception patterns remain future possibilities.

### CA-09 — Cross-Family Intelligence and Synthesis

**Purpose:** Combine independently established findings from the discovery families into broader, more complete, and potentially emergent discoveries.

Its capability responsibilities include:

- Combining findings from multiple discovery families.
- Identifying how separate findings support, qualify, or contextualize one another.
- Identifying broader patterns that emerge from interactions among family findings.
- Maintaining the provenance and evidence of contributing findings.
- Explaining how a synthesized discovery was reached.
- Preserving uncertainty when contributing findings are provisional or have limitations.

**Boundary:** Synthesis is an overarching capability, not a fifth discovery family.

Each family must establish its own findings through its own evidence and reasoning. Synthesis may combine those findings, but one family's conclusion cannot substitute for another family's independent evidence assessment.

More extensive chains of derived findings are not a baseline 2.0 requirement.

### CA-10 — Intelligence Lifecycle, Discovery, and Exploration

**Purpose:** Keep WASABI's intelligence responsive to changing evidence and make its findings accessible and useful to the user.

This area encompasses three closely related responsibilities.

**A. Intelligence Lifecycle and Reassessment**

- Reassessing affected findings when relevant archive or enriched information changes.
- Supporting targeted, cross-family, and broader periodic reassessment.
- Maintaining the status of findings as evidence changes.
- Avoiding unnecessary full recalculation where targeted reassessment is sufficient.
- Identifying findings that may be outdated or require renewed investigation.
- Supporting transparent status and history of reassessment.
- Allowing interpretations to evolve rather than treating discoveries as permanent labels.

**B. Discovery Presentation and Exploration**

- Presenting discoveries through a unified intelligence experience.
- Supporting both proactive discovery and user-directed exploration.
- Prioritizing meaningfulness and explanatory value rather than relying solely on recency.
- Supporting contextual exploration of findings and their evidence.
- Providing ways to move between related discoveries, contributing findings, and relevant works.
- Exploring appropriate visual representations of relationships and broader patterns.

**C. User Agency and Work Profiles**

- Providing a unified Work Profile for each archived work.
- Bringing together descriptive information, user experience information, and established connections.
- Allowing users to inspect, correct, or exclude work-level information.
- Making established relationships accessible through Work Profiles.
- Supporting optional discovery management, such as saving, dismissing, or marking discoveries as interesting.
- Preserving the distinction between user curation and analytical conclusions.

**Boundary:** User actions such as saving or dismissing discoveries must not alter analytical conclusions, scoring, or significance prioritization. Correcting work-level information is not the same as providing feedback on whether a discovery-family conclusion is valid.

General discovery feedback, user confirmation or rejection of family findings, and feedback-driven learning remain future 2.x capabilities.

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

The product should provide a coherent experience across capability areas, with consistent presentation and understandable interactions.

## 5. Known Scope Boundaries

The following boundaries have already been established in the Product Vision & Discovery Design and should be preserved during requirements discovery.

**Identified as future 2.x or otherwise outside the baseline 2.0 commitment:**

- General user feedback on discovery-family findings and feedback-driven learning.
- User-created work relationships.
- Richer bidirectional relationship exploration.
- More extensive chains of derived findings.
- Causal explanations for observed evolution.
- Broader cross-media exception analysis.
- More complex affinity combinations and refinement mechanisms.
- Nested evolution phases as a stretch goal.
- A more extensive discovery-feedback mechanism.

**Still requiring investigation rather than being treated as settled commitments:**

- How enjoyment and engagement are measured or captured.
- How missing and incomplete archive information should affect particular analyses.
- Characteristic vocabulary governance and enrichment coverage.
- Work identity resolution and confidence handling.
- Discovery significance and presentation priorities.
- Evolution phase detection and temporal thresholds.
- The breadth and complexity of cross-family synthesis.
- The exact form of Work Profiles and contextual visual exploration.
- Archive remediation and the longer-term import and reconciliation workflow.
- Data ownership and portability expectations beyond the principles already established.

These questions should be resolved during capability and requirements discovery, not through premature implementation decisions.

## 6. Capability Relationships

The areas are conceptually connected, but they should not be treated as interchangeable.

At a high level:

1. **Archive and Collection Management** maintains the user's recorded collection and experiences.
2. **Work Identity and Content Understanding** establishes what the archived works are and what is known about them.
3. **Shared Evidence and Knowledge Foundation** preserves the information, provenance, and reasoning material available to the product.
4. **Media Experience and Response Modeling** provides the conceptual basis for interpreting the user's responses.
5. **Affinity, Relationships, Evolution, and Exceptions Intelligence** independently investigate their respective discovery questions.
6. **Cross-Family Intelligence and Synthesis** combines established family findings into broader discoveries.
7. **Intelligence Lifecycle, Discovery, and Exploration** keeps findings current and makes them accessible to the user.

These relationships describe logical dependencies and responsibilities, not a proposed technical architecture or mandatory execution sequence.

## 7. Outcome of This Identification

This capability map establishes a proposed high-level model of what WASABI 2.0 must support.

It provides the basis for the next planning activity: decomposing each capability area into more specific capabilities, identifying the information and evidence each requires, establishing dependencies, and eventually defining functional and quality requirements.

No specific implementation, technology, architecture, or final feature prioritization is established by this document.
