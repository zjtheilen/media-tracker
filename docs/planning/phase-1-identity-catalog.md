# Phase 1 — Identity Catalog

**Status:** Provisional
**Phase:** Phase 1 — Conceptual Foundation
**Purpose:** Define the conceptual catalog for Archive Identities before implementation changes are made.

---

## 1. Purpose

The Identity layer describes the **broader curatorial philosophy expressed by an archive**.

An Identity is not simply another name for a Designation, nor is it a personality diagnosis.

The system should use Identity to answer a different question from the Designation layer:

> **What relationship does this curator repeatedly establish with the qualities, ideas, and experiences represented in their archive?**

A Designation describes a recognizable **taste classification**.

An Identity describes a broader **curatorial philosophy or mode of engagement** synthesized from multiple signals.

This distinction is foundational to the Identity catalog.

---

## 2. Governing Principles

### 2.1 Identity is not a renamed Designation

An Identity should not be derivable by simply:

* renaming a Designation
* reweighting the same Designation signals
* restating a Designation's description
* describing the same taste pattern with more abstract language

Shared evidence is acceptable.

Shared conclusions are not.

### 2.2 Identity is not personality diagnosis

Identity describes the archive's observable curatorial patterns.

It must not claim that the user:

* has a particular psychological personality type
* possesses a clinical characteristic
* has a fixed personal identity
* behaves in ways that the archive cannot actually demonstrate

The system describes the **archive**, not the entire person.

### 2.3 Identity should synthesize multiple signals

An Identity should represent a coherent combination of signals.

A single high trait score should generally be evidence contributing toward an Identity rather than being sufficient to define one.

### 2.4 Evidence and interpretation are distinct

The system may use the same underlying evidence for both Designations and Identities when the interpretation differs.

For example:

* strong originality may contribute to a Designation describing experimental taste
* the same originality may contribute to an Identity describing a broader philosophy of exploration

The distinction comes from the **conclusion being drawn**, not necessarily from completely separate raw data.

### 2.5 Do not force a fixed number of Identities

The final catalog should contain only concepts that are:

1. meaningfully distinct,
2. supported by available evidence,
3. explainable from the archive,
4. useful to the overall archive narrative.

The correct number of Identities is therefore not predetermined.

---

# 3. Evidence Landscape

The current archive model provides several broad categories of evidence.

## 3.1 Appreciation

Examples include:

* craft
* originality
* depth
* emotional impact
* engagement
* presentation
* pacing

These describe **what qualities the curator appreciates**.

They are useful evidence but do not, by themselves, define Identity concepts.

---

## 3.2 Taste Orientation

Examples include:

* experimental affinity
* genre prevalence
* novelty
* gameplay mechanics
* genre diversity

These primarily describe **what kinds of experiences the archive favors**.

This is largely Designation territory, although some of these signals may contribute to broader Identity concepts.

---

## 3.3 Interpretive Orientation

Examples include:

* analysis
* ambiguity
* reflection
* depth
* psychological and mystery prevalence

These provide some of the strongest current evidence for Identity because they describe **how the curator engages with experiences**, rather than merely what experiences they prefer.

---

## 3.4 Archive Structure

Examples include:

* genre diversity
* media breadth
* archive size
* genre concentration
* distribution of ratings and preferences

These can support Identity concepts involving breadth, organization, or curation.

However, the system must distinguish between:

> **The archive is broad.**

and:

> **The curator deliberately seeks breadth.**

The latter is an inference and requires stronger evidence.

---

# 4. Provisional Identity Catalog

The following concepts are candidates for the Identity layer.

They are **provisional**, not yet locked.

No final scoring weights are established by this document.

---

# 5. Interpretive Philosophy

### Status

**Provisional candidate — strong**

### Concept

An Interpretive Identity describes a curator whose relationship with media is characterized by **unpacking, questioning, interpreting, and finding meaning beneath the immediate experience**.

The archive suggests that experiences are valued not only for what they are, but for what they invite the curator to think about afterward.

### Core Question

> **Does this archive repeatedly engage with media as something to interpret, unpack, and reconsider?**

### What it means

This Identity may be expressed through combinations of:

* depth
* analysis
* ambiguity
* reflection
* psychological themes
* mystery
* surreal or uncertain experiences
* repeated engagement with layered ideas

The emphasis is on **interpretation and meaning**, rather than simply liking deep or complicated media.

### What it does not mean

It does not mean:

* the curator prefers psychological media
* the curator prefers mystery
* the curator likes complicated stories
* the curator is intellectually superior
* the curator is necessarily analytical in every area of life
* the curator has a particular personality type

Those are either narrower taste observations or unsupported personal conclusions.

### Distinction from Designation

A Deep Diver-style Designation describes a recognizable **taste pattern toward depth and layered experiences**.

An Interpretive Identity describes a broader **relationship with those experiences**:

> The curator tends to engage with media as something to interpret, question, and unpack.

The Designation describes **what the archive favors**.

The Identity describes **how the curator relates to what it favors**.

### Candidate Supporting Signals

* depth
* analysis
* ambiguity
* reflection
* psychological prevalence
* mystery prevalence
* surreal prevalence

### Evidence Limitations

The current archive does not directly observe thoughts, conversations, reviews, or post-consumption reflection.

Therefore this Identity must remain an inference from repeated rating patterns and derived signals.

### Implementation Status

Current scoring infrastructure can support this concept.

The existing Identity fixture should **not** be treated as the final implementation.

### Catalog Status

**Provisional**

---

# 6. Exploratory Philosophy

### Status

**Provisional candidate — promising, requires differentiation testing**

### Concept

An Exploratory Identity describes a curator whose archive demonstrates a sustained relationship with **novelty, unfamiliarity, contrast, and experiences outside their established comfort zone**.

The important distinction is that exploration represents more than liking experimental media.

It describes a broader tendency toward **seeking unfamiliar territory**.

### Core Question

> **Does this archive repeatedly demonstrate a willingness to explore beyond established taste boundaries?**

### What it means

This Identity may be expressed through combinations of:

* originality
* experimental affinity
* novelty
* genre diversity
* unusual genre combinations
* breadth across media or styles

The concept concerns the curator's relationship with **difference and unfamiliarity**.

### What it does not mean

It does not mean:

* the curator simply likes experimental media
* the curator has a particular favorite genre
* the archive contains one unusual title
* the curator automatically enjoys everything unconventional
* the curator is adventurous in life generally

### Distinction from Designation

A Boundary Explorer Designation describes a recognizable **taste classification centered on boundary-pushing or unfamiliar media**.

An Exploratory Identity would instead describe a broader **curatorial philosophy of seeking contrast and unfamiliar experiences**.

The distinction must remain meaningful enough that an archive can plausibly receive:

* Boundary Explorer without Exploratory Identity
* Exploratory Identity without Boundary Explorer
* both
* neither

If those combinations prove impossible in representative profiles, the concepts should be reconsidered.

### Candidate Supporting Signals

* originality
* experimental affinity
* novelty
* genre diversity
* media diversity
* breadth of archive

### Evidence Limitations

The current system measures preference patterns more directly than explicit exploration behavior.

A broad archive does not necessarily prove deliberate exploration.

The concept therefore requires profile-level stress testing before becoming locked.

### Implementation Status

Existing scoring infrastructure can support the concept.

Derived signals require conceptual review before being treated as definitive evidence of exploration.

### Catalog Status

**Provisional**

---

# 7. Construction / Systems Philosophy

### Status

**Provisional candidate — evidence-limited**

### Concept

A Construction-oriented Identity describes a curator whose archive demonstrates particular appreciation for **how experiences are built, structured, paced, and mechanically designed**.

The emphasis is not merely on enjoying engaging media.

It concerns appreciation for the underlying construction of the experience.

### Core Question

> **Does this archive repeatedly demonstrate appreciation for the way experiences are constructed and structured?**

### What it means

Potential evidence includes combinations of:

* craft
* engagement
* pacing
* gameplay mechanics
* system design
* execution
* structural coherence

The Identity concerns attention to **construction and systems**.

### What it does not mean

It does not mean:

* the curator is a game designer
* the curator is a software engineer
* the curator consciously analyzes every work's construction
* the curator only likes technically sophisticated media
* engagement automatically means appreciation of systems

### Distinction from Designation

An Engagement Architect Designation describes a recognizable **taste classification favoring strong execution, momentum, pacing, and systems**.

A Construction-oriented Identity would describe a broader **curatorial philosophy of appreciating how experiences are constructed**.

Again, the concepts must be able to produce different conclusions in representative archives.

### Candidate Supporting Signals

* craft
* engagement
* pacing
* gameplay mechanics
* system design

### Evidence Limitations

The current `system_design` signal is strongly derived from gameplay mechanics.

This means the current evidence for a broad systems-oriented Identity is narrower than the concept itself.

The concept should therefore not be considered fully supported until the evidence model can demonstrate it independently enough.

### Implementation Status

Scoring infrastructure is technically capable of representing the concept.

The evidence model requires further validation.

### Catalog Status

**Provisional**

---

# 8. Breadth / Curatorial Variety Philosophy

### Status

**Provisional candidate — conceptually viable, evidence requires careful interpretation**

### Concept

A Breadth-oriented Identity describes an archive demonstrating **sustained variety across genres, media, styles, or experiences**.

The emphasis is on the shape of the archive rather than a particular favorite.

### Core Question

> **Does the archive demonstrate a persistent relationship with variety and breadth?**

### What it means

Potential evidence includes:

* high genre diversity
* broad media coverage
* low concentration around a single genre
* meaningful representation across different types of experiences

### What it does not mean

It does not automatically mean:

* the curator deliberately seeks variety
* the curator is organized
* the curator is a “collector”
* the curator is broadly curious in every domain

Those conclusions require evidence beyond archive size or distribution.

### Distinction from Designation

The Curator Designation may identify an archive as a recognizable **broad or deliberately varied taste collection**.

A Breadth-oriented Identity would need to describe a deeper relationship with **variety itself**, rather than simply classifying the archive as broad.

If this distinction cannot be made reliably, the concept should not be promoted to a final Identity.

### Candidate Supporting Signals

* genre diversity
* media diversity
* archive breadth
* genre concentration/distribution

### Evidence Limitations

Archive structure provides strong observable evidence of breadth but weaker evidence of **intentional curation**.

Therefore the final language should favor observable archive behavior over assumptions about the curator's motivation.

### Implementation Status

Possible with existing evidence, but requires profile-level validation.

### Catalog Status

**Provisional**

---

# 9. Future Identity Concepts

Some concepts appear highly valuable but are not sufficiently supported by the current data model.

They should remain future candidates rather than being forced into the initial catalog.

---

## 9.1 Connection / Synthesis

### Concept

A curator who repeatedly connects ideas, genres, media, or experiences into broader patterns.

### Why it is valuable

This could represent a genuinely higher-order curatorial philosophy that is difficult to confuse with a simple taste classification.

### Current limitation

The archive does not currently capture enough explicit cross-entry relationships to establish this reliably.

Potential future evidence could include:

* related entries
* thematic links
* user-written notes
* explicit comparisons
* recurring themes
* cross-media connections

### Status

**Future candidate**

---

## 9.2 Re-engagement / Revisitation

### Concept

A curator whose relationship with media includes meaningful revisitation, rereading, replaying, or returning to previous experiences.

### Why it is valuable

Re-engagement represents a fundamentally different relationship with media than simple preference.

### Current limitation

The current archive does not sufficiently model explicit revisitation behavior.

### Status

**Future candidate**

---

# 10. Concepts That Should Not Become Identities

Several concepts are better represented by the Designation or trait systems.

They should not be promoted into Identities merely because they score strongly.

### Experimental Taste

Strong experimental affinity is valuable evidence.

However, experimental preference by itself is a taste orientation and therefore primarily Designation territory.

### Deep Taste

Strong depth preference describes a recognizable taste pattern.

It should not automatically become an Identity.

### Engagement Taste

Strong engagement preference describes another recognizable taste pattern.

It should not automatically become an Identity.

### Emotional Immersion

Emotional impact can contribute to broader Identity concepts, but emotional preference by itself is more naturally represented as a taste characteristic or Designation signal.

---

# 11. Relationship to Designations

The Identity and Designation layers should remain related but non-equivalent.

| Dimension                 | Designation                                               | Identity                                                          |
| ------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| Core question             | What recognizable taste classification fits this archive? | What broader curatorial philosophy does this archive demonstrate? |
| Subject                   | Taste pattern                                             | Mode of curation / engagement                                     |
| Primary evidence          | Traits, genres, archive shape                             | Synthesized patterns across multiple signals                      |
| Output                    | Recognizable archive classification                       | Broader interpretive identity                                     |
| Shared evidence           | Allowed                                                   | Allowed                                                           |
| Shared conclusion         | Not allowed                                               | Not allowed                                                       |
| Shared name               | Forbidden                                                 | Forbidden                                                         |
| Personality diagnosis     | No                                                        | No                                                                |
| Score                     | Yes                                                       | Yes                                                               |
| Data Sufficiency          | Yes                                                       | Yes                                                               |
| Classification Confidence | Future/optional                                           | Future/optional                                                   |

---

# 12. Required Differentiation Tests

Before the Identity catalog becomes locked, every candidate should survive profile-level stress testing.

For each candidate Identity, construct representative archives that demonstrate:

### Test A — Identity without matching Designation

The archive should be capable of expressing the Identity without automatically receiving the similarly themed Designation.

### Test B — Designation without matching Identity

The archive should be capable of receiving the Designation without automatically receiving the corresponding Identity.

### Test C — Multiple Identities

An archive should be capable of expressing more than one Identity when the evidence supports multiple philosophies.

### Test D — No Identity

Sparse or insufficient archives should not be forced into an Identity merely because a score exists.

### Test E — Evidence Explainability

Every Identity result should be explainable through concrete contributing signals.

### Test F — Conceptual Independence

Changing one major taste preference should not automatically transform the archive into a completely different Identity unless the underlying curatorial philosophy genuinely changes.

---

# 13. Current Provisional Catalog

The current candidates are:

1. **Interpretive Philosophy**
2. **Exploratory Philosophy**
3. **Construction / Systems Philosophy**
4. **Breadth / Curatorial Variety Philosophy**

These are candidates, not final public-facing names.

The catalog intentionally does **not** yet establish:

* final Identity names
* final descriptions
* final weights
* minimum-entry thresholds
* secondary Identity thresholds
* tie behavior
* near-tie behavior
* Classification Confidence
* final derived signals
* final API schema

Those decisions belong to subsequent conceptual and implementation passes.

---

# 14. Current Retirements

The existing Identity concepts corresponding directly to the current Designations should be treated as **retired conceptual candidates**, even if their implementation remains temporarily present.

Specifically:

* Boundary Explorer Identity — retire as an Identity concept
* Deep Diver Identity — retire as an Identity concept
* Engagement Architect Identity — retire as an Identity concept

This does **not** require immediately deleting their implementation.

The existing Designations remain valid working concepts:

* Boundary Explorer
* The Curator
* Engagement Architect
* The Deep Diver

The purpose of the next implementation phase is to evolve the Identity catalog without unnecessarily rewriting the underlying scoring infrastructure.

---

# 15. Implementation Principle

The existing Identity engine should be treated as **scaffolding**, not as the definition of the Identity system.

The implementation already provides useful infrastructure for:

* weighted signals
* derived signals
* eligibility
* scoring
* ranking
* deterministic primary selection
* secondary selection
* evidence breakdown
* Data Sufficiency
* narrative explanation

Those mechanisms should be preserved unless a conceptual decision requires a change.

The catalog should drive the implementation, not the other way around.

> **The API should describe the intelligence system that actually exists, while the intelligence system should only change when an explicit conceptual decision requires it.**

---

# 16. Next Step

The next phase is **profile-level differentiation and stress testing**.

The provisional Identity candidates should be tested against representative archive profiles to determine:

1. whether each Identity produces a meaningfully different conclusion,
2. whether any two candidates collapse into the same concept,
3. whether the current evidence can actually support each candidate,
4. whether any candidate belongs in the Designation layer instead,
5. whether additional Identity concepts are justified,
6. and ultimately how many Identities the system should contain.

Only after that pass should the catalog become locked and the scoring fixtures be redesigned.
