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

## 5. Descriptive Temporal-Pattern Investigation

With the candidate metric expansion questions exhausted, the next question was whether the existing `date_consumed` evidence reveals meaningful descriptive temporal patterns without introducing new metrics or behavioral interpretation.

The investigation used the 94 dated historical records represented by `migrations/historical_library.py`. These records provide a useful longitudinal sample, but they do not constitute an immutable event history: `date_consumed` is a mutable archive field rather than a timestamped consumption event.

### 5.1 Recorded Activity Over Time

The dated historical records span January 2025 through August 2026, with 16 months containing at least one recorded entry.

| Month   | Recorded Entries |
| ------- | ---------------: |
| 2025-01 |                7 |
| 2025-02 |                2 |
| 2025-05 |                1 |
| 2025-08 |                1 |
| 2025-09 |                3 |
| 2025-10 |                3 |
| 2025-11 |               13 |
| 2025-12 |               10 |
| 2026-01 |                8 |
| 2026-02 |                5 |
| 2026-03 |                9 |
| 2026-04 |                9 |
| 2026-05 |                8 |
| 2026-06 |                9 |
| 2026-07 |                4 |
| 2026-08 |                2 |

The archive is relatively sparse and irregular through October 2025, followed by a substantial increase in recorded activity during November and December 2025. January through June 2026 then shows comparatively sustained monthly activity before recorded activity declines in July and August.

This establishes a descriptive pattern in the archive: recorded activity became substantially denser beginning in late 2025 and remained comparatively sustained through the first half of 2026.

This should not be interpreted as an increase in engagement, motivation, productivity, or actual consumption frequency. The archive only establishes when records currently carry a given `date_consumed` value.

### 5.2 Gaps Between Recorded Dates

Across the dated historical records, the median gap between consecutive recorded dates is 3 days. The middle 50% of gaps fall between 1 and 6 days. The largest gap is 98 days, and only two gaps exceed 30 days.

The largest gaps are:

* 98 days
* 89 days
* 25 days
* 21 days
* 20 days
* 18 days

These gaps demonstrate that recorded activity is not temporally uniform. However, gaps in the archive cannot establish periods of actual inactivity because unrecorded consumption cannot be distinguished from genuine inactivity.

Therefore, gap analysis is descriptive evidence about the archive's recorded dates rather than evidence of behavioral inactivity.

### 5.3 Media Composition Over Time

The dated records show a clear change in the media types represented over the archive period:

| Period   | Total | Games | Videos | Books |
| -------- | ----: | ----: | -----: | ----: |
| 2025-Q1  |     9 |     9 |      0 |     0 |
| 2025-Q2  |     1 |     1 |      0 |     0 |
| 2025-Q3  |     4 |     4 |      0 |     0 |
| 2025-Q4  |    26 |     7 |     19 |     0 |
| 2026-Q1  |    22 |     6 |     11 |     5 |
| 2026-Q2  |    26 |     1 |     14 |    11 |
| 2026-Q3* |     6 |     0 |      6 |     0 |

* Through August 2026.

Games are the only represented media type during the sparse early-2025 period. Videos first appear in November 2025 and remain represented in every subsequent month through August 2026. Books first appear in March 2026 and remain represented through June 2026.

This establishes a descriptive change in archive composition over time. It does **not** establish a preference transition or change in media preference. The archive records what was recorded, not why the composition changed.

### 5.4 Temporal Interpretation Boundary

The temporal evidence supports several descriptive statements:

* recorded archive activity became denser beginning in late 2025;
* activity remained comparatively sustained through the first half of 2026;
* the media composition of recorded entries changed substantially over the period;
* games dominate the earlier dated archive;
* videos become persistent in the later dated archive;
* books appear during a defined period in early-to-mid 2026;
* recorded activity declines during July and August 2026.

The evidence does **not** support claims about:

* actual inactivity;
* engagement or motivation;
* preference change;
* intentional shifts in media consumption;
* seasonality;
* persistence of consumption behavior;
* historical completion transitions;
* historical score trajectories.

These boundaries are important because the archive contains current record state rather than an immutable event stream.

### 5.5 Investigation Result

No additional temporal metric is justified by this investigation.

The existing temporal evidence already provides three distinct descriptive dimensions:

* **WHEN** — Monthly Archive Activity
* **WHAT** — Monthly Media Distribution
* **SCORE** — Monthly Average Score

The descriptive pattern analysis adds interpretation of those existing representations without requiring another metric surface.

The evidence boundary has therefore been reached for the current archive model. Further temporal intelligence should wait for either greater longitudinal density or new historical event data capable of establishing transitions and state changes.

## 6. Temporal Evidence Semantic Caveat

`date_consumed` is currently a mutable property of an archive record, not an immutable historical event timestamp.

Consequently, temporal representations should be understood as:

> **Current archive records grouped by their currently recorded consumption dates.**

They should not be interpreted as snapshots of what the archive looked like at a particular point in time.

For example, if an entry's score changes while its `date_consumed` remains unchanged, its contribution to that month's Monthly Average Score also changes. Likewise, editing a record's `date_consumed` moves that record between temporal groups.

This does not invalidate the existing temporal evidence. It defines its scope precisely and prevents the current archive from being treated as a historical event log that it does not yet maintain.

Immutable temporal analysis would require additional historical event data, such as recorded completion transitions, consumption events, score-change timestamps, or other timestamped state changes.

## 7. Decision

**No additional temporal evidence representation should be implemented at this point.**

The existing temporal evidence set is sufficient for the current archive model:

1. Monthly Archive Activity establishes the timing of recorded archive activity.
2. Monthly Media Distribution establishes the media composition of that recorded activity.
3. Monthly Average Score establishes the scores associated with records dated within each represented month.
4. Descriptive temporal-pattern analysis establishes what can currently be observed across the existing temporal evidence without requiring additional metrics.

The useful Phase 7.2 work has therefore shifted from metric expansion to evidence interpretation. No additional temporal metric is currently justified.

## 8. Deferred Concepts

The following remain valid future investigations if the archive accumulates enough historical evidence or the data model gains the necessary history:

* **Time × Completion**, after historical completion transitions exist.
* **Time × Media × Score**, when temporal/media sample density makes the representation useful.
* **Meaningful change detection**, after sufficient longitudinal evidence exists and a defensible definition of meaningful change is established.
* **Activity-gap analysis**, if the product explicitly defines what absence of recorded activity means.

Deferral is intentional. These concepts are not rejected permanently; they are not supported strongly enough by the current evidence model.

## 9. Final Status

**Investigation complete — evidence boundary reached.**

Phase 7.2 has now covered both:

1. **Metric expansion** — whether additional temporal representations can be defensibly derived from the current archive.
2. **Descriptive temporal patterns** — what the existing dated archive reveals about recorded activity, gaps, and media composition over time.

The investigation found useful descriptive patterns but no additional temporal metric that currently provides sufficient independent value and semantic defensibility to justify implementation.

Accordingly:

* Monthly Archive Activity remains valid.
* Monthly Media Distribution remains valid.
* Monthly Average Score remains valid.
* Descriptive temporal-pattern analysis is complete.
* Additional temporal metrics are deferred.
* Meaningful change-over-time detection is deferred until sufficient longitudinal evidence and/or immutable historical event data exist.

The governing principle remains:

> **Do not add a temporal metric merely because it can be calculated. Add it when the archive can support a distinct, useful, and defensible question.**
