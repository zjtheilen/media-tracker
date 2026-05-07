from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Optional
from datetime import date

from models.media_item import MediaItem
from models.scoring_profile import SCORING_PROFILES 
from models.score import Score
from models.entry import Entry


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
    genre: str
    scores: Dict[str, int]
    notes: Optional[str] = ""
    date_consumed: Optional[date] = None
    completion_status: Optional[str] = "completed"


entries = []


@app.post("/entries/")
def create_entry(entry_data: EntryCreate):
    media_item = MediaItem(entry_data.title, entry_data.media_type, entry_data.genre)

    valid_categories = SCORING_PROFILES.get(media_item.media_type)
    if not valid_categories:
        raise HTTPException(status_code=400, detail=f"Invalid media type: {media_item.media_type}")

    category_lookup = {cat.name.lower(): cat for cat in valid_categories}

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
        scores=scores, 
        notes=entry_data.notes, 
        date_consumed=entry_data.date_consumed, 
        completion_status=entry_data.completion_status
    )

    entries.append(entry)

    return {
        "message": "Entry created",
        "title": entry.media_item.title,
        "media_type": entry.media_item.media_type,
        "total_score": entry.total_score(),
        "entry_id": entry.id,
    }


@app.get("/entries/")
def get_entries():
    return [entry.to_dict() for entry in entries]


@app.get("/entries/{entry_id}")
def get_entry(entry_id: str):
    for entry in entries:
        if entry.id == entry_id:
            return entry.to_dict()

    raise HTTPException(status_code=404, detail="Entry not found")


@app.delete("/entries/{entry_id}")
def delete_entry(entry_id: str):

    for index, entry in enumerate(entries):
        if entry.id == entry_id:
            entries.pop(index)
            return {"message": "Entry deleted"}

    raise HTTPException(status_code=404, detail="Entry not found")


@app.get("/stats/")
def get_stats():
    total_entries = len(entries)
    completed_entries = sum(
        1 for entry in entries 
        if entry.completion_status == "completed"
    )
    total_score = sum(
        entry.total_score() for entry in entries
    )
    average_score = (
        total_score / total_entries 
        if total_entries > 0 else 0
    )

    media_breakdown = {}

    for entry in entries:
        media_type = entry.media_item.media_type

        if media_type not in media_breakdown:
            media_breakdown[media_type] = 0
        
        media_breakdown[media_type] += 1

    return {
        "total_entries": total_entries,
        "completed_entries": completed_entries,
        "average_score": average_score,
        "media_breakdown": media_breakdown
    }