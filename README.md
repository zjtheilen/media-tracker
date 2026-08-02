# media-tracker

Media Tracker is a personal media library and taste analysis platform built with FastAPI and modern JavaScript. Rather than simply storing ratings, it analyzes patterns across books, games, and films to build an evolving profile of the curator behind the collection.

Using a hybrid scoring system, genre intelligence, archive statistics, observations, and identity modeling, the application transforms personal ratings into explainable insights and recommendation-ready data.

---

## Features

### Library
- CRUD
- Filtering
- Genre support
- Completion tracking

### Analytics
- Universal scoring
- Media-specific scoring
- Archive statistics
- Genre affinity
- Visual dashboards

### Taste Intelligence
- Archive traits
- Observations
- Archive findings
- Curator identities
- Explainable identity scoring

### Architecture
- Fixture-driven identity system
- Modular analytics pipeline
- Explainable scoring
- Recommendation-ready data model

---

## Tech Stack

- Backend: FastAPI (Python)
- Frontend: Vanilla HTML + CSS + JavaScript (modular)
- Database: SQLite
- Visualization: Chart.js
- Validation: Pydantic

---

## Quick Start

```bash
git clone https://github.com/zjtheilen/media-tracker.git
cd media-tracker
git checkout develop-3
```

```bash
pip install -r requirements.txt
```

```bash
uvicorn main:app --reload
```

Open your browser at `http://127.0.0.1:8000`

---

## Project Structure

```bash
media-tracker/
├── data/                  # Genre definitions
├── models/                # Core domain models
│   ├── entry.py
│   ├── media_item.py
│   ├── score.py
│   ├── scoring_profile.py
│   └── responses.py
├── tests/
├── .gitignore
├── db.py                  # SQLite setup + migrations
├── main.py                # FastAPI app
├── index.html
├── styles.css
├── *.js                   # Modular frontend (app, forms, charts, etc.)
├── requirements.txt
└── database.db            # Auto-created
```

---

## Scoring Philosophy

The system blends emotional resonance, intellectual depth, technical craft, originality, and engagement/flow.

Universal categories enable broad taste profiling.  
Media-specific categories provide granular, type-appropriate feedback.

Weighted scoring ensures categories you care about most have greater influence.

---

## Development Roadmap

### Current Status (develop-3)
✓ Hybrid scoring <br />
✓ Archive profile generation <br />
✓ Genre intelligence <br />
✓ Identity scoring <br />
✓ Observation engine <br />
✓ Findings engine <br />

In Progress
- Identity endpoint
- Profile endpoint
- Explanation endpoint
- Frontend archive profile

Next
- Recommendation engine
- React frontend migration
- Archive narrative system
- Import / export

### Detailed Phase 6 — Enhanced Scoring System (develop-3)

**Goal**  
Replace the current generic scoring model with a hybrid Universal + Media-Specific evaluation system while preserving cross-media comparisons.

**Universal Categories (Primary Radar Chart)**
- Emotional Impact (25%)
- Depth / Themes (20%)
- Originality (15%)
- Craft / Execution (15%)
- Engagement / Flow (15%)
- Artistic Merit (10%)

**Media-Specific Categories**
- **Books**: Prose Writing (30%), Character Development (25%), World Building (25%), Narrative Pacing (20%)
- **Video / Film**: Cinematography / Visuals (30%), Acting / Performances (25%), Directing / Editing (25%), Sound / Music (20%)
- **Games**: Gameplay Mechanics (30%), Level Design / Progression (25%), Replayability / Systems (25%), Art / Atmosphere (20%)

**Key Tasks**
- Update `scoring_profile.py`
- Dynamic category validation
- Weighted total calculation across all scores
- Normalize to 1–10 scale
- Backwards compatibility + graceful fallbacks
- Expand `/scoring-profile` endpoint
- Redesign entry form with universal + conditional media-specific sections
- Update entry detail view with Radar (universal) + Bar Chart (specific)
- Expand analytics with per-category averages, top media-specific rankings, correlations, and taste profile summaries

### Phase 7 — Archive Immersion (Lower priority)
- Atmospheric startup/loading messages
- Subtle archive notifications
- Session statistics
- Refined report generation flow

### Future (Post v1.0) — Metadata & Polish
- Author / Director / Studio
- Release Year, Cover Images, External IDs
- Import / Export, Advanced Search, Custom Reports

---

## Testing

The project includes a growing automated test suite covering:

- Archive profile generation
- Genre analytics
- Identity scoring
- Observation generation
- API endpoints
- Validation
- Recommendation engine

Current coverage:
150+ automated tests

---

## Architecture

Media Entries <br />
      ↓ <br />
Archive Statistics <br />
      ↓ <br />
Archive Traits <br />
      ↓ <br />
Genre Intelligence <br />
      ↓ <br />
Observations <br />
      ↓ <br />
Findings <br />
      ↓ <br />
Curator Identity <br />
      ↓ <br />
Recommendations (planned)

---

## API Overview

- POST /entries/ — Create new entry
- GET /entries/ — List entries (with genre filter)
- GET /entries/{id} — Get single entry
- PUT /entries/{id} — Update entry
- DELETE /entries/{id} — Delete entry
- GET /stats/ — Aggregate statistics
- GET /genres/ — Available genres
- GET /scoring-profile — Category definitions & weights

---

## Contributing

Feel free to open issues or PRs! This is a personal passion project that benefits from thoughtful feedback on scoring, UX, or analytics.

---

## License

MIT

---

**Made with curiosity and a love for great stories across all media.**