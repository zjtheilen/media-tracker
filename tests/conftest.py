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

    # if os.path.exists(TEST_DB):
    #     os.remove(TEST_DB)

    db.init_db()

    yield

    # if os.path.exists(TEST_DB):
    #     os.remove(TEST_DB)


@pytest.fixture(autouse=True)
def clean_entries():

    conn = sqlite3.connect(TEST_DB)
    cursor = conn.cursor()

    # cursor.execute("""
    #     SELECT name FROM sqlite_master
    #     WHERE type='table' AND name='entries'
    # """)
    # if not cursor.fetchone():
    #     conn.close()
    #     return

    cursor.execute("DELETE FROM entries")
    # cursor.execute("DROP TABLE IF EXISTS entries")

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