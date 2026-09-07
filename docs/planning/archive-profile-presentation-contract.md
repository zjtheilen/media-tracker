# Archive Profile Presentation Contract

## Purpose

This document defines what the Archive Profile should present at different archive sizes.

It is a **presentation contract**, not a definition of the intelligence engine's archive-maturity algorithm.

The contract exists to ensure that:

* empty archives have an intentional user experience;
* small archives still expose useful observable information;
* Identity systems are never presented as established when their minimum data requirements have not been met;
* boundary conditions around Identity eligibility remain stable;
* unavailable intelligence is represented as unavailable rather than as a weak score;
* the frontend presentation remains consistent with backend intelligence semantics.

---

# 1. Core Principles

## 1.1 Archive size is not signal strength

A small archive can contain strong, meaningful patterns.

An archive with few entries should therefore not automatically be described as having weak taste, weak preferences, or weak signals.

The UI should distinguish:

* **amount of available data**
* **strength of detected signals**
* **eligibility for higher-level interpretation**

These are different concepts.

---

## 1.2 Identity eligibility is threshold-based

Current Identity minimum-entry requirements are:

| Identity                | Minimum entries |
| ----------------------- | --------------: |
| Breadth Philosophy      |              15 |
| Exploratory Philosophy  |              20 |
| Interpretive Philosophy |              20 |

Therefore:

* 0–14 entries: no Identity is eligible
* 15–19 entries: Breadth Philosophy may be eligible
* 20+ entries: all three Identity systems may be eligible

The presentation layer must not fabricate, downgrade, or substitute an Identity when the relevant system is ineligible.

---

## 1.3 Observable intelligence remains useful before Identity eligibility

The absence of an eligible Identity does **not** mean the Archive Profile has nothing useful to say.

Where the backend produces meaningful information, the profile may still present:

* archive statistics;
* media composition;
* genre composition;
* scoring patterns;
* traits;
* designations;
* observations;
* findings;
* archive interpretation;
* universal scoring information.

The exact availability of these sections remains determined by the underlying intelligence systems.

---

## 1.4 Unavailable intelligence must be represented honestly

The UI must not present:

* an ineligible Identity as a low-scoring Identity;
* missing data as a negative personality trait;
* zero confidence as though it were a weak positive signal;
* sparse data as though it established a broad curator philosophy.

When an intelligence system cannot produce a result because its data requirements are not met, the presentation should communicate that the result is **not yet established/available**.

---

# 2. Archive Presentation States

The presentation contract recognizes four practical entry-count ranges.

| Entries | Presentation state   | Identity availability         |
| ------: | -------------------- | ----------------------------- |
|       0 | Empty Archive        | None                          |
|    1–14 | Early Archive        | None                          |
|   15–19 | Developing Archive   | Breadth only                  |
|     20+ | Full Archive Profile | All Identity systems eligible |

These ranges are tied to current Identity requirements and presentation behavior.

They do **not** establish a permanent backend definition of `EMPTY`, `SPARSE`, or `ESTABLISHED`.

---

# 3. State: 0 Entries

## Presentation

The Archive Profile page itself should remain accessible.

The profile content area should display an intentional empty state.

Recommended presentation:

> **Your archive is empty.**
> Add completed media to begin building your Archive Profile.

The existing backend summary:

> The archive does not contain enough data for interpretation.

may be used as supporting language if appropriate, but the primary UI should be user-facing and actionable.

## Do not display

The empty state must not attempt to display:

* primary designation;
* designation basis;
* signal strength;
* primary Identity;
* secondary Identity;
* observations;
* findings;
* archive interpretation;
* universal scoring radar;
* fabricated statistics.

## Contract

An empty archive is a valid application state.

The frontend must render it intentionally rather than relying on a rendering exception, missing data, or an empty DOM container.

---

# 4. State: 1–14 Entries

## Presentation

The Archive Profile should provide useful information from the observable archive.

Where available, it may display:

* archive statistics;
* media-type distribution;
* genre information;
* scoring information;
* traits;
* designations;
* observations;
* findings;
* interpretation;
* universal scoring information.

Identity must not be presented as established.

Recommended contextual language:

> **EARLY ARCHIVE**
> Your archive is still developing. Some patterns are visible, but there isn't yet enough data to establish a broader curator identity.

The exact copy may evolve, but the semantic distinction must remain.

## Identity

No Identity is eligible below 15 entries.

The UI must not:

* select a fallback Identity;
* display an Identity with a low score;
* imply that an Identity exists but lacks confidence;
* treat the absence of an Identity as evidence against the user.

## Contract

Small archives should retain observable intelligence while clearly communicating the limits of higher-level interpretation.

---

# 5. State: 15–19 Entries

## Presentation

The Archive Profile should continue presenting observable intelligence.

This state additionally permits the Breadth Philosophy Identity to become eligible.

Where generated, the profile may display:

* statistics;
* scoring information;
* traits;
* designations;
* observations;
* findings;
* archive interpretation;
* universal scoring information;
* Breadth Philosophy Identity information.

## Identity

At this range:

* Breadth Philosophy may be eligible;
* Exploratory Philosophy is not eligible;
* Interpretive Philosophy is not eligible.

The UI must not imply that the unavailable Identity systems are weak versions of the available Identity.

Recommended contextual language:

> **DEVELOPING ARCHIVE**
> Your archive contains enough information to reveal meaningful patterns, while some broader identity interpretations are still developing.

Again, exact copy may evolve; the semantic distinction is the contract.

---

# 6. State: 20+ Entries

## Presentation

The Archive Profile should present the full intelligence experience supported by the backend.

Where generated, this includes:

* archive statistics;
* media composition;
* genre composition;
* traits;
* designations;
* designation confidence;
* designation basis;
* observations;
* findings;
* archive interpretation;
* universal scoring radar;
* primary Identity;
* secondary Identity;
* Identity explanations/data-sufficiency information.

## Identity

At 20+ entries, all current Identity systems meet their minimum entry requirement:

* Breadth Philosophy;
* Exploratory Philosophy;
* Interpretive Philosophy.

This does not guarantee that every Identity will win selection or appear as primary/secondary. Eligibility and selection remain separate concepts.

---

# 7. Boundary Requirements

The following entry counts are especially important regression boundaries:

### 0

Tests the explicit Empty Archive state.

### 1

Tests the smallest non-empty archive.

This verifies that the application transitions from Empty to Early Archive without crashing.

### 14

Tests the final entry count below the first Identity threshold.

No Identity should be eligible.

### 15

Tests the exact Breadth Philosophy threshold.

Breadth Philosophy becomes eligible.

### 19

Tests the final entry count below the 20-entry threshold.

Breadth may be eligible; Exploratory and Interpretive remain ineligible.

### 20

Tests the exact full Identity threshold.

All three Identity systems become eligible for evaluation.

### 21+

Provides a post-threshold regression check so that 20 is not accidentally treated as a special one-entry-only case.

---

# 8. Empty-State Safety

The frontend must safely handle backend values such as:

```text
primaryDesignation = null
designationBasis = null
primaryIdentity = null
secondaryIdentity = null
```

The renderer must not assume these objects exist when the archive is empty or when an intelligence system is unavailable.

An unavailable intelligence result is a valid state, not a rendering error.

---

# 9. Terminology

Preferred presentation terminology:

| Situation               | Preferred language                      |
| ----------------------- | --------------------------------------- |
| 0 entries               | Empty Archive                           |
| 1–14 entries            | Early Archive                           |
| 15–19 entries           | Developing Archive                      |
| 20+ entries             | Archive Profile / Full Profile          |
| Identity unavailable    | Not yet established / not yet available |
| Strong detected pattern | Strong signal/pattern                   |
| Insufficient data       | Not enough data for this interpretation |

Avoid treating:

* `Sparse`
* `Established`

as UI maturity labels until their operational thresholds are explicitly defined as product behavior.

Those terms remain useful in the conceptual intelligence model.

---

# 10. Separation of Responsibilities

The backend intelligence engine determines:

* what signals exist;
* what findings exist;
* what observations exist;
* which designations qualify;
* which Identities are eligible;
* which Identity is selected.

The Archive Profile presentation layer determines:

* how available information is presented;
* how unavailable information is communicated;
* how empty and developing archives are contextualized;
* which UI sections should be visible for a given presentation state.

The presentation layer must not invent intelligence that the backend did not produce.

---

# 11. Contract Summary

The Archive Profile should follow this rule:

> **Show everything the archive can meaningfully tell us, but never imply that the archive tells us more than it actually does.**

In practical terms:

* **0:** explain how to begin.
* **1–14:** show observable patterns, but no Identity.
* **15–19:** show observable patterns and permit Breadth Identity.
* **20+:** present the complete Identity system.
