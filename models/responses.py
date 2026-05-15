from pydantic import BaseModel
from typing import Dict, List, Optional
from datetime import date
import json

class EntryResponse(BaseModel):
    id: str
    title: str
    media_type: str
    genres: List[str]
    scores: Dict[str, int]
    notes: Optional[str] = None
    date_consumed: Optional[date] = None
    completion_status: str
    total_score: float


class UpdateEntryResponse(BaseModel):
    message: str
    entry_id: str
    total_score: float


class DeleteEntryResponse(BaseModel):
    message: str
    entry_id: str


class StatsResponse(BaseModel):
    total_entries: int
    completed_entries: int
    average_score: float
    media_type_counts: Dict[str, int]
    genre_counts: Dict[str, int]

def row_to_entry_response(row) -> EntryResponse:
    scores_raw = row["scores"]

    if not scores_raw:
        scores = {}
    elif isinstance(scores_raw, str):
        scores = json.loads(scores_raw)
    else:
        scores = dict(scores_raw)

    genres_raw = row["genres"]

    if not genres_raw:
        genres = []
    elif isinstance(genres_raw, str):
        genres = json.loads(genres_raw)
    else:
        genres = list(genres_raw)

    return EntryResponse(
        id=row["id"],
        title=row["title"],
        media_type=row["media_type"],
        genres=genres,
        scores=scores,
        notes=row["notes"],
        date_consumed=row["date_consumed"],
        completion_status=row["completion_status"],
        total_score=row["total_score"],
    )
