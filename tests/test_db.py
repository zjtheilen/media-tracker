import sqlite3

import db


def test_get_db_path_defaults_to_database(monkeypatch):
    monkeypatch.delenv("DB_PATH", raising=False)

    assert db.get_db_path() == "database.db"


def test_get_db_path_uses_environment_variable(monkeypatch, tmp_path):
    db_path = tmp_path / "custom.db"
    monkeypatch.setenv("DB_PATH", str(db_path))

    assert db.get_db_path() == str(db_path)


def test_get_connection_returns_sqlite_rows(monkeypatch, tmp_path):
    db_path = tmp_path / "connection.db"
    monkeypatch.setenv("DB_PATH", str(db_path))

    with db.get_connection() as conn:
        conn.execute("CREATE TABLE test (value TEXT)")
        conn.execute("INSERT INTO test (value) VALUES ('hello')")

        row = conn.execute("SELECT value FROM test").fetchone()

        assert isinstance(row, sqlite3.Row)
        assert row["value"] == "hello"


def test_init_db_creates_schema_and_migrates_to_v3(monkeypatch, tmp_path):
    db_path = tmp_path / "fresh.db"
    monkeypatch.setenv("DB_PATH", str(db_path))

    db.init_db()

    with db.get_connection() as conn:
        version = conn.execute("SELECT version FROM schema_version").fetchone()[0]

        columns = {
            row["name"] for row in conn.execute("PRAGMA table_info(entries)").fetchall()
        }

    assert version == 3
    assert "favorite" in columns
    assert "historical_score" in columns
    assert "historical_scores" in columns


def test_init_db_does_not_migrate_existing_v3_database(
    monkeypatch,
    tmp_path,
):
    db_path = tmp_path / "existing.db"
    monkeypatch.setenv("DB_PATH", str(db_path))

    db.init_db()
    db.init_db()

    with db.get_connection() as conn:
        version = conn.execute("SELECT version FROM schema_version").fetchone()[0]

        columns = [
            row["name"] for row in conn.execute("PRAGMA table_info(entries)").fetchall()
        ]

    assert version == 3
    assert columns.count("historical_score") == 1
    assert columns.count("historical_scores") == 1


def test_v2_database_migrates_to_v3(monkeypatch, tmp_path):
    db_path = tmp_path / "v2.db"
    monkeypatch.setenv("DB_PATH", str(db_path))

    with sqlite3.connect(db_path) as conn:
        conn.execute("""
            CREATE TABLE entries (
                id TEXT PRIMARY KEY,
                media_type TEXT,
                title TEXT,
                genres TEXT,
                completion_status TEXT,
                total_score REAL,
                notes TEXT,
                date_consumed TEXT,
                scores TEXT,
                favorite INTEGER DEFAULT 0
            )
        """)

        conn.execute("""
            CREATE TABLE schema_version (
                version INTEGER NOT NULL
            )
        """)

        conn.execute("INSERT INTO schema_version (version) VALUES (2)")

        conn.commit()

    db.init_db()

    with db.get_connection() as conn:
        version = conn.execute("SELECT version FROM schema_version").fetchone()[0]

        columns = {
            row["name"] for row in conn.execute("PRAGMA table_info(entries)").fetchall()
        }

    assert version == 3
    assert "favorite" in columns
    assert "historical_score" in columns
    assert "historical_scores" in columns
