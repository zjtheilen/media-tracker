from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Optional
from datetime import date
import json
from contextlib import asynccontextmanager

from models.media_item import MediaItem
from models.scoring_profile import (
    VALID_MEDIA_TYPES,
    UNIVERSAL_SCORING_PROFILE,
    MEDIA_SCORING_PROFILES,
    get_universal_categories,
    get_all_categories,
)

from models.score import Score
from models.entry import Entry
from db import init_db, get_connection
from models.responses import (
    EntryResponse,
    UpdateEntryResponse,
    DeleteEntryResponse,
    StatsResponse,
    row_to_entry_response,
)

from models.genre_registry import (
    CORE_GENRES,
    GAME_GENRES,
    BOOK_GENRES,
    VIDEO_GENRES,
    get_allowed_genres,
)

VALID_COMPLETION_STATUSES = {"completed", "in-progress", "dropped", "planned"}


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    init_db()
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    print(exc)
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "http_error", "detail": exc.detail},
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    print(exc)

    return JSONResponse(
        status_code=500,
        content={
            "error": "internal_service_error",
            "detail": "An unexpected error occured",
        },
    )


class EntryCreate(BaseModel):
    title: str
    media_type: str
    genres: list[str]
    scores: Dict[str, int]
    notes: Optional[str] = ""
    date_consumed: Optional[date] = None
    completion_status: Optional[str] = "completed"


def build_scores(scores_dict):
    built_scores = []

    for category_name, value in scores_dict.items():
        built_scores.append(Score(category=category_name, value=value))

    return built_scores


def validate_completion_status(status: str):
    if status not in VALID_COMPLETION_STATUSES:
        raise HTTPException(
            status_code=400, detail=f"Invalid completion status: {status}"
        )


def validate_entry(entry_data: EntryCreate):
    validate_media_type(entry_data.media_type)

    title = validate_title(entry_data.title)

    genres = validate_genres(entry_data.media_type, entry_data.genres)

    validate_scores(entry_data.media_type, entry_data.scores)
    validate_completion_status(entry_data.completion_status)

    return title, genres


def validate_title(title: str):
    title = title.strip()
    if not title:
        raise HTTPException(status_code=400, detail="Title cannot be empty")
    return title


def validate_scores(media_type: str, scores: Dict[str, int]):
    valid_categories = set(get_all_categories(media_type))
    submitted_categories = set(scores.keys())

    missing = valid_categories - submitted_categories
    extra = submitted_categories - valid_categories

    if missing:
        raise HTTPException(
            status_code=400, detail=f"Missing scoring categories: {sorted(missing)}"
        )

    if extra:
        raise HTTPException(
            status_code=400, detail=f"Invalid scoring categories: {sorted(extra)}"
        )

    for name, value in scores.items():
        if not isinstance(value, int):
            raise HTTPException(
                status_code=400, detail=f"Score for {name} must be an integer"
            )

        if value < 1 or value > 10:
            raise HTTPException(
                status_code=400, detail=f"Score for {name} must be between 1 and 10"
            )


def normalize_genre(genre: str) -> str:
    return genre.strip().lower()


def validate_genres(media_type: str, genres: list[str]):
    if not genres:
        raise HTTPException(status_code=400, detail="At least one genre is required")

    if len(genres) > 3:
        raise HTTPException(status_code=400, detail="Maximum 3 genres allowed")

    allowed = get_allowed_genres(media_type)

    normalized_genres = list(dict.fromkeys(normalize_genre(g) for g in genres))

    for g in normalized_genres:
        if g not in allowed:
            raise HTTPException(
                status_code=400, detail=f"Invalid genre for {media_type}: {g}"
            )

    return normalized_genres


def validate_media_type(media_type: str):
    if media_type not in VALID_MEDIA_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid media type: {media_type}")


@app.post("/entries/")
def create_entry(entry_data: EntryCreate):

    title, genres = validate_entry(entry_data)

    media_item = MediaItem(title, entry_data.media_type)

    scores = build_scores(entry_data.scores)

    entry = Entry(
        media_item=media_item,
        genres=genres,
        scores=scores,
        notes=entry_data.notes,
        date_consumed=entry_data.date_consumed,
        completion_status=entry_data.completion_status,
    )

    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO entries (
                id, title, media_type, genres, notes, date_consumed, completion_status, total_score, scores
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                entry.id,
                entry.media_item.title,
                entry.media_item.media_type,
                json.dumps(genres),
                entry.notes,
                entry.date_consumed.isoformat() if entry.date_consumed else None,
                entry.completion_status,
                entry.total_score(),
                json.dumps(entry_data.scores),
            ),
        )

        cursor.execute("SELECT * FROM entries WHERE id = ?", (entry.id,))
        row = cursor.fetchone()

        conn.commit()

    return row_to_entry_response(row)


def normalize_genre_query(genre: str) -> str:
    return genre.strip().lower().lstrip("/")


@app.get("/entries/", response_model=list[EntryResponse])
def get_entries(genre: str | None = None):

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM entries")
        rows = cursor.fetchall()

    entries = [row_to_entry_response(row) for row in rows]

    # TEMP DEBUG
    # for entry in entries:
    #     print("1", type(entry))
    #     print("2", entry)

    # for entry in entries:
    #     print("TITLE:", entry.title)
    #     print("UNIVERSAL:", entry.universal_scores)
    #     print("MEDIA:", entry.media_scores)
    #     print("TOTAL:", entry.total_score)

    if genre:
        normalized = normalize_genre_query(genre)

        entries = [entry for entry in entries if normalized in entry.genres]

    return entries


@app.get("/entries/{entry_id}", response_model=EntryResponse)
def get_entry(entry_id: str):
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM entries WHERE id = ?", (entry_id,))
        row = cursor.fetchone()

        if not row:
            raise HTTPException(status_code=404, detail="Entry not found")

    return row_to_entry_response(row)


@app.get("/genres/")
def get_genres():
    return {
        "core": list(CORE_GENRES),
        "game": list(GAME_GENRES),
        "book": list(BOOK_GENRES),
        "video": list(VIDEO_GENRES),
    }


@app.delete("/entries/{entry_id}", response_model=DeleteEntryResponse)
def delete_entry(entry_id: str):

    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("DELETE FROM entries WHERE id = ?", (entry_id,))
        conn.commit()

    return {"message": "Entry deleted", "entry_id": entry_id}


@app.put("/entries/{entry_id}", response_model=UpdateEntryResponse)
def update_entry(entry_id: str, entry_data: EntryCreate):
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM entries WHERE id = ?", (entry_id,))
        existing = cursor.fetchone()

        if not existing:
            raise HTTPException(status_code=404, detail="Entry not found")
        title, genres = validate_entry(entry_data)

        media_item = MediaItem(title, entry_data.media_type)

        scores = build_scores(entry_data.scores)

        updated_entry = Entry(
            media_item=media_item,
            genres=genres,
            scores=scores,
            notes=entry_data.notes,
            date_consumed=entry_data.date_consumed,
            completion_status=entry_data.completion_status,
        )

        cursor.execute(
            """
            UPDATE entries SET 
                title = ?, 
                media_type = ?, 
                genres = ?, 
                notes = ?, 
                date_consumed = ?, 
                completion_status = ?, 
                total_score = ?, 
                scores = ?
            WHERE id = ?
        """,
            (
                updated_entry.media_item.title,
                updated_entry.media_item.media_type,
                json.dumps(genres),
                updated_entry.notes,
                updated_entry.date_consumed.isoformat()
                if updated_entry.date_consumed
                else None,
                updated_entry.completion_status,
                updated_entry.total_score(),
                json.dumps(entry_data.scores),
                entry_id,
            ),
        )

        print(cursor.rowcount)

        conn.commit()

    return {
        "message": "Entry updated",
        "entry_id": entry_id,
        "total_score": updated_entry.total_score(),
    }


@app.get("/stats/", response_model=StatsResponse)
def get_stats():
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM entries")
        rows = cursor.fetchall()

        total_entries = len(rows)

        completed_entries = sum(
            1 for r in rows if r["completion_status"] == "completed"
        )

        total_score = sum(r["total_score"] for r in rows)
        average_score = total_score / total_entries if total_entries else 0

        media_type_counts = {}

        for r in rows:
            mt = r["media_type"]
            media_type_counts[mt] = media_type_counts.get(mt, 0) + 1

        genre_counts = {}

        for r in rows:
            genres = json.loads(r["genres"])

            for genre in genres:
                genre_counts[genre] = genre_counts.get(genre, 0) + 1

    return {
        "total_entries": total_entries,
        "completed_entries": completed_entries,
        "average_score": average_score,
        "media_type_counts": media_type_counts,
        "genre_counts": genre_counts,
    }


@app.get("/scoring-profile")
def get_scoring_profile():
    return {
        "universal": {
            "categories": get_universal_categories(),
            "weights": UNIVERSAL_SCORING_PROFILE,
        },
        "media": MEDIA_SCORING_PROFILES,
    }
