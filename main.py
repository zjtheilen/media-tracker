from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Optional
from datetime import date
import json

from models.media_item import MediaItem
from models.scoring_profile import SCORING_PROFILES 
from data.genres import PRIMARY_GENRES, GAME_GENRES
from models.score import Score
from models.entry import Entry
from db import init_db, get_connection


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



class EntryCreate(BaseModel):
    title: str
    media_type: str
    genres: list[str]
    scores: Dict[str, int]
    notes: Optional[str] = ""
    date_consumed: Optional[date] = None
    completion_status: Optional[str] = "completed"


entries = []


@app.on_event("startup")
def startup():
    init_db()


@app.post("/entries/")
def create_entry(entry_data: EntryCreate):
    media_item = MediaItem(entry_data.title, entry_data.media_type)

    valid_categories = SCORING_PROFILES.get(media_item.media_type)
    if not valid_categories:
        raise HTTPException(status_code=400, detail=f"Invalid media type: {media_item.media_type}")

    category_lookup = {cat.name.lower(): cat for cat in valid_categories}

    allowed = set(PRIMARY_GENRES)

    if entry_data.media_type == "game":
        allowed = allowed.union(GAME_GENRES)
    
    for g in entry_data.genres:
        if g not in allowed:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid genre for {entry_data.media_type}: {g}"
            )

    scores = []
    for name, value in entry_data.scores.items():
        normalized_name = name.lower()

        if normalized_name not in category_lookup:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid scoring category: {name}"
            )

        category_obj = category_lookup[normalized_name]
        scores.append(Score(category_obj, value))
    
    entry = Entry(
        media_item=media_item, 
        genres=entry_data.genres,
        scores=scores, 
        notes=entry_data.notes, 
        date_consumed=entry_data.date_consumed, 
        completion_status=entry_data.completion_status
    )

    conn = get_connection()
    cursor = conn.cursor()



    cursor.execute("""
        INSERT INTO entries (
            id, title, media_type, genres, notes, date_consumed, completion_status, total_score, scores
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            entry.id,
            entry.media_item.title,
            entry.media_item.media_type,
            json.dumps(entry_data.genres),
            entry.notes,
            entry.date_consumed.isoformat(),
            entry.completion_status,
            entry.total_score(),
            json.dumps(entry_data.scores),
        )
    )

    conn.commit()
    conn.close()

    return {
        "message": "Entry created",
        "title": entry.media_item.title,
        "media_type": entry.media_item.media_type,
        "total_score": entry.total_score(),
        "entry_id": entry.id,
    }


@app.get("/entries/")
def get_entries():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM entries")
    rows = cursor.fetchall()

    entries = []
    for row in rows:
        entry = dict(row)

        entry["scores"] = json.loads(entry["scores"]) if entry["scores"] else {}
        entry["genres"] = json.loads(entry["genres"]) if entry["genres"] else []
        
        entries.append(entry)

    return entries


@app.get("/entries/{entry_id}")
def get_entry(entry_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM entries WHERE id = ?", (entry_id,))
    row = cursor.fetchone()

    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Entry not found")

    return dict(row)


@app.delete("/entries/{entry_id}")
def delete_entry(entry_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM entries WHERE id = ?", (entry_id,))
    conn.commit()

    conn.close()

    return {"message": "Entry deleted"}


@app.get("/stats/")
def get_stats():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM entries")
    rows = cursor.fetchall()
    conn.close()

    total_entries = len(rows)

    completed_entries = sum(
        1 for r in rows if r["completion_status"] == "completed"
    )

    total_score = sum(r["total_score"] for r in rows)
    average_score = total_score / total_entries if total_entries else 0

    media_breakdown = {}

    for r in rows:
        mt = r["media_type"]
        media_breakdown[mt] = media_breakdown.get(mt, 0) + 1

    return {
        "total_entries": total_entries,
        "completed_entries": completed_entries,
        "average_score": average_score,
        "media_breakdown": media_breakdown
    }
