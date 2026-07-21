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
        "completion_status": "completed",
        "notes": "Peak psychological horror",
        "scores": {
            # universal
            "depth": 8,
            "originality": 9,
            "craft": 8,
            "emotional_impact": 8,
            "engagement": 9,
            "presentation": 8,
            # game specific
            "art_atmosphere": 8,
            "gameplay_mechanics": 9,
            "level_design_progression": 8,
            "replayability_systems": 7,
        },
    }


@pytest.fixture
def valid_book_payload():

    return {
        "title": "Dune",
        "media_type": "book",
        "genres": ["horror"],
        "completion_status": "completed",
        "notes": "Long ass book",
        "scores": {
            # universal
            "depth": 8,
            "originality": 8,
            "craft": 8,
            "emotional_impact": 8,
            "engagement": 8,
            "presentation": 8,
            # book specific
            "character_development": 8,
            "narrative_pacing": 8,
            "prose_writing": 9,
            "world_building": 7,
        },
    }
