import pytest
from fastapi.testclient import TestClient
import os
import sqlite3

from main import app

DB_PATH = "database.db"


@pytest.fixture(autouse=True)
def reset_db():
    # ensure clean file
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    # recreate schema fresh
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""CREATE TABLE entries (
        id TEXT PRIMARY KEY,
        media_type TEXT,
        title TEXT,
        genres TEXT,
        completion_status TEXT,
        total_score REAL,
        notes TEXT,
        date_consumed TEXT,
        scores TEXT
    )""")

    cursor.execute("""
        CREATE TABLE schema_version (
            version INTEGER NOT NULL
        )
    """)

    cursor.execute("INSERT INTO schema_version (version) VALUES (1)")

    conn.commit()
    conn.close()

    yield


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def valid_game_payload():
    return {
        "title": "Silent Hill 2",
        "media_type": "game",
        "genres": ["horror"],
        "scores": {
            "writing": 5,
            "pacing": 4,
            "originality": 5,
            "engagement": 5,
            "thought provoking": 5,
            "emotional impact": 5,
            "sound": 5,
            "gameplay": 4,
            "art": 5,
        },
        "notes": "Peak psychological horror",
        "completion_status": "completed",
    }
