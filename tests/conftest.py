import pytest
from fastapi.testclient import TestClient
import sqlite3
from db import init_db

from main import app

DB_PATH = "database.db"

init_db()


@pytest.fixture(autouse=True)
def reset_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("DELETE FROM entries")

    conn.commit()
    conn.close()

    yield



@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client


@pytest.fixture
def valid_game_payload():
    return {
        "title": "Silent Hill 2",
        "media_type": "game",
        "genres": ["horror"],
        "scores": {
            "emotional_impact": 10,
            "depth": 1,
            "craft": 5,
            "engagement": 8,
            "presentation": 4,
            "originality": 9,
        },
        "notes": "Peak psychological horror",
        "completion_status": "completed",
    }
