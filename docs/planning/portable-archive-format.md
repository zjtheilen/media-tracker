# WASABI Portable Archive Format v1

## Top-Level Structure

- `format`: `"wasabi-archive"`
- `version`: `1`
- `exported_at`: ISO-8601 UTC timestamp
- `entries`: array of archive entries

## Entry Structure

- `id`: UUID string
- `title`: non-empty string
- `media_type`: valid WASABI media type
- `genres`: array of genre strings; may be empty for entries without genres
- `scores`: object of scoring category → integer; may be empty when an entry has no current scores
- `notes`: string or `null`
- `date_consumed`: ISO-8601 date (`YYYY-MM-DD`) or `null`
- `completion_status`: valid WASABI completion status
- `favorite`: boolean
- `historical_score`: number or `null`
- `historical_scores`: object or `null`; an empty object is also valid

## Derived Fields

The following derived fields are excluded:

- `total_score`
- `universal_scores`
- `media_scores`
- Archive/Profile/Intelligence output

## Identity

- `id` is preserved across export/import.

## Conflict Handling

- Duplicate IDs are conflicts.
- Title/media type similarity is only a duplicate warning.

## Compatibility

- Portable format version is independent of the database schema version.
- Unsupported portable versions are rejected.
- Unknown fields are tolerated for supported versions.

## Import Safety

- Validate before mutation.
- Import is transactional.
- Partial imports are never committed.
- Portable archive validation is distinct from new-entry creation validation. Import validation must preserve existing archive data when it can be restored without loss, including historical values that may no longer be accepted by current entry-creation validation.

## Field-Level Contract

The portable archive format is a representation of user-owned archive data. It is intentionally separate from both the SQLite storage schema and derived Archive Profile / intelligence data.

### Top-Level Fields

| Field         | JSON type | Required | Nullable | Source                  | Validation                                     |
| ------------- | --------- | -------: | -------: | ----------------------- | ---------------------------------------------- |
| `format`      | string    |      Yes |       No | Format definition       | Must equal `wasabi-archive`                    |
| `version`     | integer   |      Yes |       No | Format definition       | Must equal a supported portable-format version |
| `exported_at` | string    |      Yes |       No | Generated during export | ISO-8601 UTC timestamp                         |
| `entries`     | array     |      Yes |       No | `entries` table         | Every element must be a valid archive entry    |

`version` identifies the portable archive format and is independent of the SQLite database schema version.

`exported_at` describes the exported file rather than the archive itself. It does not participate in round-trip equality.

### Entry Fields

| Field               | JSON type | Required | Nullable | DB source                   | Validation                                                             |
| ------------------- | --------- | -------: | -------: | --------------------------- | ---------------------------------------------------------------------- |
| `id`                | string    |      Yes |       No | `entries.id`                | Valid UUID                                                             |
| `title`             | string    |      Yes |       No | `entries.title`             | Non-empty                                                              |
| `media_type`        | string    |      Yes |       No | `entries.media_type`        | Valid WASABI media type                                                |
| `genres`            | array     |      Yes |       No | `entries.genres`            | array of non-empty strings, may be empty                               |
| `scores`            | object    |      Yes |       No | `entries.scores`            | Object of valid score categories and integer values 1–10; may be empty |
| `notes`             | string    |       No |      Yes | `entries.notes`             | String or null; preserved without interpretation                       |
| `date_consumed`     | string    |       No |      Yes | `entries.date_consumed`     | ISO-8601 date (YYYY-MM-DD) or null                                     |
| `completion_status` | string    |      Yes |       No | `entries.completion_status` | Valid WASABI completion status                                         |
| `favorite`          | boolean   |      Yes |       No | `entries.favorite`          | Boolean                                                                |
| `historical_score`  | number    |       No |      Yes | `entries.historical_score`  | Number or null; preserved without recalculation                        |
| `historical_scores` | object    |       No |      Yes | `entries.historical_scores` | Object of historical score data, or null; empty object allowed         |

For generated exports, optional fields should still be emitted consistently. When their value is absent, they should be represented as `null`.

### Derived Fields

The portable archive must not contain derived scoring or intelligence fields.

The following are intentionally excluded:

- `total_score`
- `universal_scores`
- `media_scores`
- Archive Profile statistics
- traits
- metrics
- designations
- identities
- observations
- findings
- narrative

These values can be reconstructed from the portable source data and current WASABI logic.

### Representation Rules

#### IDs

Entry IDs are preserved during export and import.

Import must not generate replacement IDs for valid imported entries.

Entry ID is the authoritative identity used for conflict detection.

#### Dates

`date_consumed` represents a calendar date and does not contain a time component.

Example:

```json
"date_consumed": "2026-09-20"
```

An absent date is represented as:

```json
"date_consumed": null
```

#### Scores

Scores retain their object representation rather than being converted into a different interchange structure.

Example:

```json
"scores": {
  "story": 9,
  "gameplay": 8
}
```

The portable format preserves the score data; derived aggregate scores are recalculated by WASABI.

#### Historical Scores

`historical_scores` is represented as JSON data within the portable archive rather than as a JSON-encoded string.

Example:

```json
"historical_scores": {
  "story": 9,
  "gameplay": 8
}
```

This avoids embedding serialized JSON inside the JSON archive format.

### Canonical Example

A minimal valid archive should have the following structure:

```json
{
    "format": "wasabi-archive",
    "version": 1,
    "exported_at": "2026-09-28T12:34:56Z",
    "entries": [
        {
            "id": "550e8400-e29b-41d4-a716-446655440000",
            "title": "Example Title",
            "media_type": "game",
            "genres": ["rpg", "sci-fi"],
            "scores": {
                "story": 9,
                "gameplay": 8
            },
            "notes": "Example notes.",
            "date_consumed": "2026-09-20",
            "completion_status": "completed",
            "favorite": true,
            "historical_score": 91.5,
            "historical_scores": {
                "story": 9,
                "gameplay": 8
            }
        }
    ]
}
```

The example is illustrative. Actual score categories, genres, and completion statuses must conform to the current WASABI domain model.

### Round-Trip Requirement

A portable archive must preserve all portable archive data through an export/import cycle.

The primary invariant is:

> Export → import → export produces an equivalent portable archive.

`exported_at` is excluded from this comparison because it describes when the export occurred rather than the contents of the archive.

Derived values are also excluded from the portable equality comparison because they are recalculated rather than persisted as portable source data.
