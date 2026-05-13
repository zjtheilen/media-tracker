# media-tracker

A personal media tracking and analytics application for logging, scoring, and exploring consumed media across books, games, and video.

The project focuses on:
- structured scoring systems
- weighted category analysis
- personal taste analytics
- long-term preference tracking
- lightweight but scalable architecture

Built with:
- Frontend: HTML / CSS / JavaScript
- Backend: FastAPI (Python)
- Database: SQLite
- Visualization: Chart.js

---

# Current Features

## Entry Management

Users can create and store entries for:
- Books
- Video / Film
- Games

Each entry currently supports:
- Title
- Media type
- Structured genre tags
- Weighted scoring categories
- Notes
- Completion status
- Date consumed

Data persists between sessions using SQLite.

---

## Dynamic Scoring Profiles

Each media type has its own scoring profile.

Example categories include:
- Writing
- Pacing
- Originality
- Engagement
- Emotional Impact
- Gameplay
- Acting
- Curiosity
- Art
- Cinematography

Scoring categories are dynamically generated based on media type.

---

## Weighted Scoring System

The application supports weighted scoring categories.

Example:
- Gameplay may matter more for games
- Writing may matter more for books
- Emotional impact may carry heavier weight globally

Weighted averages are calculated automatically when entries are created.

---

## Genre System

The app uses a structured genre/tag system.

Universal genres include:
- Horror
- Sci-Fi
- Fantasy
- Romance
- Comedy
- Thriller
- Mystery
- Drama
- Action
- Adventure

Media-specific genres are also supported.

Example game-only genres:
- RPG
- Platformer
- Racing
- Visual Novel
- Shooter
- Metroidvania

Genres are validated by the backend.

---

## Visualization

Currently implemented:
- Radar charts per entry using Chart.js

Radar charts visualize category strengths and weaknesses for each entry.

---

# Project Structure

```bash
media-tracker/
│
├── data/
│   └── genres.py
│
├── models/
│   ├── entry.py
│   ├── media_item.py
│   ├── score.py
│   ├── scoring_category.py
│   └── scoring_profile.py
│
├── static/
│   ├── app.js
│   ├── styles.css
│   └── index.html
│
├── db.py
├── main.py
└── database.db
```

---

# Scoring Philosophy

The scoring system intentionally blends:
- objective craftsmanship
- emotional reaction
- engagement
- originality
- thematic depth

The project is designed less as a "review site" and more as a:
> personal taste analysis tool

The goal is to discover patterns in:
- emotional resonance
- genre preferences
- pacing tolerance
- narrative interests
- gameplay priorities
- experimental media affinity

---

# API Overview

## Create Entry

```python
POST /entries/
```

## Get All Entries

```python
GET /entries/
```

## Get Single Entry

```python
GET /entries/{entry_id}
```

## Delete Entry

```python
DELETE /entries/{entry_id}
```

## Stats Endpoint

```python
GET /stats/
```

---

# Development Roadmap

## Phase 1 — Core Stability & CRUD

### In Progress
- Edit entry functionality
- Update existing scores
- Update title/genres/notes/media type
- User-provided date consumed
- Frontend validation feedback
- Form reset after submit
- Auto-close modal after submit

### Backend Improvements
- Update/edit endpoint
- Stronger validation
- Response models
- API error consistency
- Migration strategy planning

---

## Phase 2 — Scoring System Finalization

### Weighted Scoring
- Finalize weighting philosophy
- Visual weighting indicators
- Stable scoring scale decision

### Category Design
- Finalize scoring categories
- Refine cross-media consistency
- Add category descriptions/tooltips
- Explore user-configurable weights

---

## Phase 3 — Genre / Tag System

### Genre Features
- Multi-select genre UI
- Genre filtering
- Clickable genre tags
- Genre analytics

### Future Tag Expansion
- Mood tags
- Tone tags
- Experimental tags
- User-defined tags

---

## Phase 4 — UI / UX Refactor

### Entry List Rework
- Collapsible list items
- Compact summary view
- Expanded detail view

### UI Improvements
- CSS polish
- Mobile responsiveness
- Better modals
- Hover/focus states
- Empty-state UI
- Loading/error states
- Accessibility improvements

---

## Phase 5 — Analytics & Visualization

### Planned Charts
- Media distribution pie chart
- Average score per media type
- Entries over time
- Weighted category averages
- Global category averages
- Taste profile visualization
- Cross-media comparisons

### Future Analytics
- Emotional impact rankings
- Genre preference trends
- Correlation analysis
- Recommendation experimentation

---

## Phase 6 — Architecture Cleanup

### Ongoing Cleanup
- Remove inline styles
- Improve project structure
- Documentation cleanup
- Naming consistency

### Future Technical Decisions
- TypeScript evaluation
- Frontend framework evaluation
- ORM/migrations
- API versioning

---

## Phase 7 — Optional Expansion

### Potential Features
- Search
- Timeline/history view
- Favorites system
- Recommendation engine
- Import/export support
- External API integrations
- Automatic cover art/posters
- Plotly Dash dashboard
- User accounts/authentication

---

# Current Status

Implemented:
- FastAPI backend
- SQLite persistence
- Dynamic scoring profiles
- Weighted scoring
- Radar charts
- Entry deletion
- Structured genre schema
- Genre validation
- Dynamic sliders
- Chart.js integration
- Completion status support

Current High Priority:
1. Genre multi-select UI
2. Edit/update functionality
3. User-provided dates
4. Collapsible entry layout
5. Analytics charts
6. Validation and UX polish

---

# Goals

The long-term goal is to evolve media-tracker into:
- a personal media archive
- a taste analysis engine
- a lightweight recommendation laboratory
- a highly personalized analytics dashboard

without losing the simplicity and speed of the original concept.