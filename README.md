# media-tracker

A personal media analytics and tracking platform for books, games, and videos, focused on cross-media taste analysis through customizable scoring profiles, weighted categories, and visualizations.

---

# Current Features

## Media Tracking

* Add entries for:

  * Videos
  * Books
  * Games

## Dynamic Scoring Profiles

Each media type has its own scoring categories.

### Shared Core Categories

Designed to allow cross-media comparison and analytics:

* Writing
* Pacing
* Originality
* Engagement
* Thought Provoking
* Emotional Impact

### Medium-Specific Categories

Examples:

* Acting
* Cinematography
* Gameplay
* Setting
* Art
* Curiosity

## Weighted Scoring System

Each scoring category supports configurable weighting.

Example:
```python
ScoringCategory("Engagement", 1.5)
```

This allows certain categories to contribute more heavily to total scores.

## Persistent Storage

* SQLite database
* Entries persist between sessions
* FastAPI backend API

## Entry Visualization

Each entry includes:

* Radar chart visualization (Chart.js)
* Individual category score bars
* Percentage score conversion
* Metadata display:

  * Date
  * Genre
  * Media type
  * Notes

## Entry Management

* Add entries
* Delete entries
* Delete confirmation modal

## UI Features

* Modal-based entry creation
* Dynamic slider rendering
* Live score updates while adjusting sliders
* Responsive card-style entry layout

---

# Architecture

## Backend

FastAPI API with:

* Structured models
* SQLite persistence
* JSON score serialization
* Weighted score calculation

## Frontend

Vanilla:

* HTML
* CSS
* JavaScript

## Charts

Using:

* Chart.js

Current visualizations:

* Radar charts per entry

---

# Project Structure

```bash
media-tracker/
│
├── models/
│   ├── entry.py
│   ├── media_item.py
│   ├── score.py
│   ├── scoring_category.py
│   └── scoring_profile.py
│
├── static/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── db.py
├── main.py
├── database.db
└── README.md
```

---

# API Endpoints

## Create Entry

```bash
POST /entries/
```

## Get All Entries

```bash
GET /entries/
```

## Get Single Entry

```bash
GET /entries/{entry_id}
```

## Delete Entry

```bash
DELETE /entries/{entry_id}
```

## Stats Endpoint

```bash
GET /stats/
```

---

# Scoring Philosophy

The application is designed around:

* cross-media comparison
* experiential analysis
* personal taste profiling

The scoring system prioritizes:

* emotional impact
* engagement
* originality
* thought-provoking experiences

rather than purely technical critique.

---

# Current Status

## Phase 1 — Core App

### Completed

* Persistent storage
* Dynamic scoring profiles
* Add entries
* Delete entries
* Radar chart visualizations
* Score breakdown visualization
* Modal-based UI

### Remaining

* Edit entry functionality
* Additional UI polish

---

# Phase 2 — Basic Analytics

Using Chart.js

## In Progress

### Planned Charts

* Media type distribution (pie chart)
* Average score per media type
* Entries over time
* Weighted category averages

Goal:
Provide lightweight visual feedback without overcomplicating the app.

---

# Phase 3 — Advanced Analytics

Planned using Plotly Dash.

## Planned Features

### Interactive Dashboard

Separate analytics route:
```bash
/analytics
```

### Filters

* Media type
* Genre
* Date range

### Potential Visualizations

* Category score averages
* Trends over time
* Category correlations
* Taste profile breakdowns
* Emotional impact analysis
* Cross-media comparison heatmaps

Goal:
Deep-dive exploration of personal preferences and media consumption patterns.

---

# Potential Future Features

* Tagging system
* Recommendation engine
* External API imports
* Export to CSV / JSON
* User accounts
* Review history tracking
* Favorite category weighting presets
* Advanced filtering and search
* Timeline view
* Completion tracking

---

# Tech Stack

## Frontend

* HTML
* CSS
* JavaScript

## Backend

* Python
* FastAPI

## Database

* SQLite

## Visualization

* Chart.js
* Plotly Dash (planned)

---

# Definition of Done (Phase 1)

The application should:

* Add entries
* Persist entries between sessions
* Display entries cleanly
* Visualize scoring data
* Allow deletion of entries
* Provide a frictionless UI experience
* Support configurable scoring profiles
