# Temporal Evidence Investigation

**Status:** Investigation complete — no additional date-derived evidence justified for current stage

**Scope:** Phase 7.2 — Expand consumption timeline evidence

## 1. Question

What additional evidence can the current archive legitimately derive from `date_consumed` beyond Monthly Archive Activity, Monthly Media Distribution, and Monthly Average Score?

## 2. Available Historical Temporal Evidence

The archive currently records `date_consumed` for an entry. It does not maintain historical timestamps for:

- when a score was assigned or changed
- when completion status changed
- when an entry was started
- when an entry was dropped, completed, or otherwise transitioned state
- periods of active consumption separate from the recorded consumption date

Therefore temporal analysis must remain anchored to the date attached to the archive record.

## 3. Current Representations

The current temporal evidence set is:

- **Monthly Archive Activity** — sparse monthly count of recorded entries.
- **Monthly Media Distribution** — media types represented within each month of recorded activity.
- **Monthly Average Score** — average total score associated with records having a recorded consumption date within each represented month.

These provide three distinct descriptive dimensions:

```text
WHEN       → Monthly Archive Activity
WHAT       → Monthly Media Distribution
SCORE      → Monthly Average Score
```

## 4. Candidate Expansions Considered

### 4.1 Monthly Score Variance

Possible, but not currently justified as a product-level temporal representation. Monthly samples can be very small, making dispersion highly unstable and easy to overinterpret. The archive already exposes score variance as archive-level evidence. A temporal version should wait for a demonstrated analytical need and sufficient temporal density.

### 4.2 Monthly Genre Distribution

Derivable from existing genre metadata, but substantially overlaps the existing archive genre-distribution intelligence. Adding a monthly genre representation would create a large and sparse matrix without yet establishing a clear question the product needs to answer. It would also invite interpretation of changing genre composition as changing preference, which the current evidence cannot establish.

### 4.3 Monthly Genre Averages

Technically derivable, but inherits the same sparsity problem while combining two dimensions already represented elsewhere. A monthly genre score can be descriptive, but current archive evidence does not justify presenting it as a meaningful temporal trend.

### 4.4 Media-Specific Monthly Average Score

Technically defensible and potentially interesting, but it is a Time × Media × Score representation. With sparse monthly activity, many cells would contain one or very few records. That makes apparent changes difficult to distinguish from ordinary sample variation. This should remain a future candidate rather than a current feature.

### 4.5 Completion by Month

Not currently valid as historical temporal evidence. `completion_status` describes the current state of an entry, while `date_consumed` describes a historical recorded date. Combining them would misleadingly suggest that the displayed completion state existed in the recorded month. Historical completion-state transitions would be required before this could become trustworthy temporal evidence.

### 4.6 Activity Gaps / Inactivity Periods

The absence of records cannot distinguish actual inactivity from unrecorded activity. Therefore gaps can be described only as gaps in the recorded archive, not as periods when the user did not consume media. The current sparse Monthly Archive Activity representation already preserves this distinction by omitting missing months rather than manufacturing zero evidence.

### 4.7 Long-Term Trend / Change Detection

Not justified yet. Detecting meaningful changes in score, media composition, genre composition, or activity would require enough observations across multiple periods and a defined interpretation of what constitutes meaningful change. A visual difference between months is not itself evidence of a behavioral transition.

## 5. Decision

**No additional temporal evidence representation should be implemented at this point.**

The existing temporal evidence set is sufficient for the current archive model:

1. Monthly Archive Activity establishes the timing of recorded archive activity.
2. Monthly Media Distribution establishes the media composition of that recorded activity.
3. Monthly Average Score establishes the scores associated with records dated within each represented month.

The next useful Phase 7.2 activity is therefore **analysis of the existing temporal evidence**, not expansion of the metric surface.

## 6. Deferred Concepts

The following remain valid future investigations if the archive accumulates enough historical evidence or the data model gains the necessary history:

- Time × Completion, after historical completion transitions exist.
- Time × Media × Score, when temporal/media sample density makes the representation useful.
- Meaningful change detection, after sufficient longitudinal evidence exists.
- Activity-gap analysis, if the product explicitly defines what absence of recorded activity means.

Deferral is intentional. These concepts are not rejected permanently; they are not supported strongly enough by the current evidence model.

## 7. Governing Principle

> **Do not add a temporal metric merely because it can be calculated. Add it when the archive can support a distinct, useful, and defensible question.**
