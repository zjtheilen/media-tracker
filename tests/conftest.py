import os
import pytest
import sqlite3
from fastapi.testclient import TestClient
import db
from main import app

TEST_DB = "test_database.db"


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():

    os.environ["DB_PATH"] = TEST_DB

    db.init_db()

    yield


@pytest.fixture(autouse=True)
def clean_entries():

    conn = sqlite3.connect(TEST_DB)
    cursor = conn.cursor()

    cursor.execute("DELETE FROM entries")

    conn.commit()
    conn.close()


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


@pytest.fixture
def valid_book_payload():
    return {
        "title": "Dune",
        "media_type": "book",
        "genres": ["horror"],
        "scores": {
            "emotional_impact": 10,
            "depth": 1,
            "craft": 5,
            "engagement": 8,
            "presentation": 4,
            "originality": 9,
        },
        "notes": "Long ass book",
        "completion_status": "completed"
    }