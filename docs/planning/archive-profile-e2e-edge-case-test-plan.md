# Archive Profile E2E Edge-Case Test Plan

## Purpose

Add browser-level regression coverage for Archive Profile behavior at critical archive-size boundaries.

These tests should verify the **presentation contract**, not duplicate the entire Python intelligence test suite.

The E2E suite should establish that:

1. empty archives render intentionally;
2. small archives do not crash;
3. Identity eligibility boundaries are respected;
4. unavailable Identity systems are not presented as weak results;
5. the full profile continues to render after Identity thresholds are crossed.

---

# 1. Test Fixture Strategy

Use deterministic API-created entries rather than creating records through the UI.

Each boundary test should:

1. clear the E2E archive;
2. create the required number of deterministic completed-media entries through the API;
3. navigate to Archive Profile;
4. wait for the expected profile content using semantic/condition-based assertions;
5. assert only the presentation contract relevant to that boundary.

Avoid arbitrary `waitForTimeout()` calls.

The fixture should use data that is already known to produce stable intelligence results.

For Identity boundary tests, the important variable is primarily **entry count**. The fixture should otherwise remain as consistent as practical so that changes in presentation can be attributed to the threshold being tested.

---

# 2. Test: Empty Archive

### Entry count

`0`

### Purpose

Verify that the empty Archive Profile is an intentional user-facing state rather than a blank card or JavaScript rendering failure.

### Assertions

Verify:

* Archive Profile page is visible.
* Page heading is visible.
* Empty-state presentation is visible.
* Empty-state messaging indicates that media must be added before the profile can be built.

Verify that the profile does **not** present:

* primary designation;
* designation confidence;
* Identity;
* findings;
* observations;
* interpretation;
* universal scoring radar.

### Regression protected

* null `primaryDesignation` handling;
* null `designationBasis` handling;
* empty archive rendering;
* accidental JavaScript exception;
* misleading zero-data profile;
* future regressions that turn the empty state into a blank card.

---

# 3. Test: First Entry

### Entry count

`1`

### Purpose

Verify the transition from Empty Archive to Early Archive.

This is important because `0` and `1` exercise fundamentally different backend states.

### Assertions

Verify:

* Archive Profile page is visible.
* Empty Archive messaging is no longer presented.
* The profile does not claim that a curator Identity has been established.
* Any observable profile information produced by the backend renders without crashing.

The test should not require a particular designation or finding unless the fixture contract explicitly guarantees one.

### Regression protected

* empty/non-empty transition;
* first-record rendering;
* null Identity handling;
* sparse archive rendering;
* accidental assumptions that an archive has multiple records.

---

# 4. Test: Fourteen Entries

### Entry count

`14`

### Purpose

Verify the final state before the first Identity threshold.

### Assertions

Verify:

* Archive Profile renders successfully.
* Observable profile information is available where produced.
* No curator Identity is presented as established.
* No Breadth Philosophy Identity is presented.

This test should specifically protect the statement:

> Fewer than 15 entries cannot produce an eligible Identity.

### Regression protected

* off-by-one Identity threshold errors;
* accidental `>= 14` eligibility;
* presentation treating sparse data as established Identity;
* missing/null Identity handling.

---

# 5. Test: Fifteen Entries

### Entry count

`15`

### Purpose

Verify the exact Breadth Philosophy eligibility boundary.

### Assertions

Verify:

* Archive Profile renders successfully.
* Breadth Philosophy is eligible under the existing deterministic fixture.
* The profile does not present Exploratory Philosophy as eligible merely because the 15-entry threshold has been crossed.
* The profile does not present Interpretive Philosophy as eligible merely because the 15-entry threshold has been crossed.

The exact selected Identity should only be asserted if the fixture is deterministic enough to guarantee that result.

### Regression protected

* off-by-one error at 15;
* Breadth minimum-entry requirement;
* accidental global Identity unlock at 15;
* frontend/backend disagreement about Identity availability.

---

# 6. Test: Nineteen Entries

### Entry count

`19`

### Purpose

Verify the state immediately before the full Identity threshold.

### Assertions

Verify:

* Archive Profile renders successfully.
* Breadth Philosophy remains eligible if the deterministic fixture qualifies.
* Exploratory Philosophy is not eligible.
* Interpretive Philosophy is not eligible.
* The profile does not imply that all Identity systems are available.

### Regression protected

* threshold drift;
* accidental `>= 19` behavior;
* premature full Identity presentation;
* regression between the 15-entry and 20-entry boundaries.

---

# 7. Test: Twenty Entries

### Entry count

`20`

### Purpose

Verify the exact threshold at which all current Identity systems become eligible for evaluation.

### Assertions

Verify:

* Archive Profile renders successfully.
* Identity evaluation is active.
* Exploratory Philosophy can become eligible.
* Interpretive Philosophy can become eligible.
* Breadth Philosophy remains eligible.

Do not require all three to appear simultaneously as primary/secondary identities. Eligibility is not the same as selection.

If the deterministic fixture produces a known primary/secondary Identity result, those selected results may be asserted separately.

### Regression protected

* off-by-one error at 20;
* failure to activate the additional Identity systems;
* frontend incorrectly hiding newly available Identity information;
* accidental coupling between Identity eligibility and primary-selection logic.

---

# 8. Test: Twenty-One Entries

### Entry count

`21`

### Purpose

Verify that crossing the threshold is not a special-case behavior that only works at exactly 20 entries.

### Assertions

Verify:

* full Archive Profile renders;
* Identity evaluation remains available;
* no regression occurs when additional archive data is introduced.

The test should reuse the 20-entry fixture with one additional deterministic record where practical.

### Regression protected

* hard-coded `entryCount == 20` behavior;
* threshold transition instability;
* profile rendering failures caused by incremental archive growth.

---

# 9. Recommended Test Organization

Group these under the existing Archive Profile E2E suite:

```text
Archive Profile
├── populated archive profile
├── empty archive
├── one-entry early archive
├── fourteen-entry pre-identity archive
├── fifteen-entry breadth boundary
├── nineteen-entry pre-full-identity archive
├── twenty-entry full-identity boundary
└── twenty-one-entry post-threshold archive
```

The existing populated-profile test should remain separate because it verifies the established presentation and deterministic designation/signals.

The new tests are specifically about **edge conditions and transitions**.

---

# 10. Assertion Philosophy

These tests should avoid asserting implementation details such as:

* specific `<div>` structures;
* CSS classes unless necessary to identify a meaningful component;
* internal JavaScript variables;
* API implementation details;
* exact chart dimensions;
* arbitrary loading delays.

Prefer assertions against user-visible behavior:

* headings;
* state labels;
* explanatory text;
* presence/absence of meaningful profile sections;
* Identity availability;
* successful rendering;
* Chart.js initialization where the radar is contractually expected.

---

# 11. Chart Assertions

Do not automatically require the universal radar at every non-empty archive size.

The contract allows observable scoring information to exist, but the exact presentation of every visualization should depend on what the application can meaningfully render.

For states where the radar is contractually presented:

```text
canvas exists
        ↓
Chart.js instance exists
```

Use the existing condition-based polling approach rather than a fixed timeout.

---

# 12. What These Tests Should NOT Decide

The E2E suite should not establish new intelligence rules.

In particular, these tests should not decide:

* whether exactly 5 entries constitutes Sparse;
* whether exactly 10 entries constitutes Sparse;
* when an archive becomes Established;
* whether signal strength should have a minimum archive size;
* how designations calculate their scores;
* how Identity scores are calculated;
* which Identity should win when multiple identities qualify.

Those belong to the intelligence/product contracts and Python-level tests.

The E2E suite only verifies that the **presentation agrees with those established rules**.

---

# 13. Priority

Implement in this order:

### P0 — Empty

`0`

This currently represents a real presentation gap because the backend supplies an explicit empty profile while the frontend does not intentionally render it.

### P0 — Identity boundaries

`14 → 15 → 19 → 20`

These are the highest-value regression boundaries because they correspond directly to the existing Identity minimum-entry requirements.

### P1 — Non-empty transition

`1`

Protects the transition away from the empty state.

### P1 — Post-threshold stability

`21`

Confirms that the 20-entry boundary is a threshold, not a special case.

---

# 14. Expected Final Coverage

After implementation, Archive Profile E2E coverage should establish:

| Count | Expected state          | Identity         |
| ----: | ----------------------- | ---------------- |
|     0 | Intentional empty state | None             |
|     1 | Early Archive           | None             |
|    14 | Early Archive           | None             |
|    15 | Developing Archive      | Breadth eligible |
|    19 | Developing Archive      | Breadth eligible |
|    20 | Full Archive Profile    | All eligible     |
|    21 | Full Archive Profile    | All eligible     |

This gives us coverage of every meaningful boundary without turning Playwright into a duplicate of the backend intelligence test suite.
