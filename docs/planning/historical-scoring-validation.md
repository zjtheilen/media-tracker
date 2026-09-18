# Historical Scoring Validation

## Purpose

Validate the historical scoring data migrated into WASABI and determine whether the historical scoring system provides evidence that the current scoring model needs to be changed.

This is a validation exercise, not a scoring-model redesign.

## Dataset

The historical library contains 115 migrated entries, including unfinished records.

For scoring analysis, only the 94 complete historical rated records were included:

* Games: 28
* Videos: 50
* Books: 16

A record was considered complete when both `historical_score` and `historical_scores` were present.

## Validation Results

Historical aggregate scores were recalculated from the stored historical dimension scores.

* Complete rated records checked: 94
* Exact/near-exact matches: 93
* Rounding differences: 0
* Genuine discrepancies: 1

The single discrepancy is `The Backrooms`.

The stored source dimensions calculate to approximately 100.67, while the stored historical aggregate is 100.33. The original historical source contains the same 100.33 aggregate, so the discrepancy predates the migration and is not a migration error.

No historical score should be corrected without evidence about the original intended value.

## Historical Data Characteristics

Five historical records have aggregate scores above 100. This results from historical dimension values exceeding the nominal 5-point ceiling, including values such as 5.1, 5.2, 5.25, and 5.5.

Three historical game records contain zero-valued dimensions:

* Trace Memory — `replay`
* Chase: Cold Case Investigations - Distant Memories — `creativity`, `replay`
* Eco Fighters — `emotion`

The repository contains no documentation establishing whether these zeroes represented "not applicable," missing ratings, or intentional zero scores. They are therefore preserved as historical data and are not reinterpreted.

## Historical vs. Current Scoring

Historical dimensions have partial correspondence with current WASABI metrics, but they are not treated as interchangeable measurements.

Examples of relatively strong correspondence include:

* historical `emotion` → current `emotional_impact`
* historical `creativity` → current `originality`
* historical `audio` → current `sound_music`
* historical `gameplay` → current `gameplay_mechanics`
* historical `replay` → current `replayability_systems`
* historical `pacing` → current `narrative_pacing`

Other historical dimensions, such as `story`, `art`, and `writing`, do not map cleanly to a single current metric.

The current system also differs structurally from the historical system by using a 1–10 scale, explicit score anchors, and medium-aware metrics.

## Findings

Historical scoring shows several characteristics worth remembering:

1. Historical book scores were heavily compressed toward the upper end of the scale.
2. Historical ratings could exceed the nominal maximum because fractional values above 5 were used.
3. Some historical zero values have unknown semantics.
4. Dimensional behavior differed substantially between media types.
5. Historical dimensions cannot be reliably converted into weights for the current scoring model.

These findings describe the historical data and scoring behavior. They do not establish that the current scoring system has the same problems.

## Decision

**No change to the current scoring model is justified by the historical analysis.**

The current 1–10, medium-aware scoring architecture should remain unchanged.

Historical data should be treated as a behavioral baseline and migration artifact, not as a specification for reconstructing or weighting the current scoring model.

Future scoring changes should be driven by evidence from the current WASABI scoring system rather than by retrofitting the historical model.

## Scope Boundary

This analysis intentionally does not:

* derive new metric weights
* reconstruct a "true" historical scoring formula
* reinterpret historical zero values
* correct historical scores without source evidence
* redesign the current scoring rubric
* infer universal scoring preferences from the historical sample

Those would constitute scoring-model redesign rather than historical validation.
