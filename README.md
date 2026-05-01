# media-tracker
A simple tool to track and rate media consumed

## Phase 1 - Core App

### Data Model
- MediaItem
- ScoringCategory
- ScoringProfile (per media type)
- Entry (scores and notes)

### Features
- Add new entry
    - title (text input)
    - media type (dropdown)
    - dynamic scoring categories (sliders 1-10)
    - notes (text area)
- View entries
    - simple list view
- Edit / delete entries

### Goal
*A fully usable personal tracker w/ persitent storage*


## Phase 2 - Basic Analytics (frontend)
Using Chart.js

### Charts
- Media type distribution (pie chart)
    - Video
    - Books
    - Games
- Optional
    - Average score per media type
    - Entries over time

### Goal
*Lightweight visual feedback without overcomplicating the app*


## Phase 3 - Advanced Analytics
Using Plotly Dash

### Features
- Interactive dashboard (separate route - /analytics)
- Filters:
    - media type
    - genre
    - date range

### Potential Visualizations
- Category score averages
- Trends over time
- Category correlation (e.g., Gameplay vs Replay Value)
- "Taste profile" breakdown

### Goal
*Deep-dive analysis and exploration of personal preferences*
