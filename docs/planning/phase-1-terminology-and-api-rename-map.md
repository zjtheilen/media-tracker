```
__    __ ___    ___ ___  ____ ___
\ \/\/ // _ \  _\\ / _ \ | D )| |
 \_/\_//_/ \_\/__//_/ \_\|_D_)|_|
 Weighted Archive System for Analysis & Behavioral Insights
```

| Current field | Actual meaning | Contract term | Proposed treatment | Backend consumers | API/frontend consumers | Tests | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Identity `data_sufficiency` | Archive-data sufficiency relative to the Identity's minimum entry requirement | Data Sufficiency | Preserve calculation and API behavior; clarify terminology | `identity_data_sufficiency.py`, `identity_engine.py` | `/identity` response; downstream profile consumers | `tests/designations/test_identity_data_sufficiency.py`, `tests/services/test_identity_engine.py`, identity endpoint tests | RESOLVED / PRESERVE |
| Designation `designationConfidence` | Aggregate designation signal strength derived from primary/secondary/media trait scores | Signal Strength | Clarify/reframe semantics; preserve calculation | `archive_engine.py`, `archive_utils.py` | `archive-profile` frontend consumer; no frontend recalculation | `tests/archive/test_archive_statistics_media.py`, `tests/archive/test_archive_utils.py`, `tests/designations/test_profile_utils.py` | RESOLVED / TERMINOLOGY |
| Observation `confidence` | Threshold-relative support for the Observation's underlying signal | Signal Strength (threshold-relative) | Preserve calculation and current API field; clarify semantics. Revisit public rename only after Observation consumer audit. | `observation_mapper.py`, `observation_rules.py`, `observation_utils.py` | Observation API/profile consumers | Observation tests | CLARIFY / TERMINOLOGY |
| Finding `confidence` | Not standardized | UNRESOLVED | Do not add or rename until semantics are defined | Finding services, if/where present | Finding consumers, if any | Finding tests | DEFERRED / CLARIFICATION |

### Identity score vs. data sufficiency

**LOCKED:** Identity `score` and Identity `data_sufficiency` are distinct concepts and should not be consolidated.

`score` represents the strength of the archive's trait alignment with the Identity.

`data_sufficiency` represents whether the archive contains enough entries, relative to the Identity's minimum-data requirement, for that Identity interpretation to be considered sufficiently supported.

Neither concept is a replacement for the other, and neither should be renamed to imply statistical confidence.

**Status:** RESOLVED — preserve both concepts and correct stale planning references to Identity `confidence`.
