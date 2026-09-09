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


def test_init_db_creates_schema_and_migrates_to_v2(monkeypatch, tmp_path):
    db_path = tmp_path / "fresh.db"
    monkeypatch.setenv("DB_PATH", str(db_path))

    db.init_db()

    with db.get_connection() as conn:
        version = conn.execute("SELECT version FROM schema_version").fetchone()[0]

        columns = {
            row["name"] for row in conn.execute("PRAGMA table_info(entries)").fetchall()
        }

    assert version == 2
    assert "favorite" in columns


def test_init_db_does_not_migrate_existing_v2_database(monkeypatch, tmp_path):
    db_path = tmp_path / "existing.db"
    monkeypatch.setenv("DB_PATH", str(db_path))

    db.init_db()

    # Calling init_db again should recognize the existing v2 schema.
    db.init_db()

    with db.get_connection() as conn:
        version = conn.execute("SELECT version FROM schema_version").fetchone()[0]

        columns = {
            row["name"] for row in conn.execute("PRAGMA table_info(entries)").fetchall()
        }

    assert version == 2
    assert "favorite" in columns
