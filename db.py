import sqlite3
import os

# DB_PATH = os.getenv("DB_PATH", "database.db")
SCHEMA_VERSION = 2


def get_db_path():
    return os.getenv("DB_PATH", "database.db")

def get_connection():
    # db_path = DB_PATH
    conn = sqlite3.connect(get_db_path())
    conn.row_factory = sqlite3.Row
    return conn

def get_db_version(cursor):
    cursor.execute("SELECT version FROM schema_version")
    return cursor.fetchone()[0]

def set_db_version(cursor, version):
    cursor.execute(
        "UPDATE schema_version SET version = ?",
        (version,)
    )

def migrate_to_v2(cursor):
    print("Applying migration v2...")

    cursor.execute("""
        ALTER TABLE entries
        ADD COLUMN favorite INTEGER DEFAULT 0               
    """)


def init_db():
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS entries (
                id TEXT PRIMARY KEY,
                media_type TEXT,
                title TEXT,
                genres TEXT,
                completion_status TEXT,
                total_score REAL,
                notes TEXT,
                date_consumed TEXT,
                scores TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS schema_version (
                version INTEGER NOT NULL
            )
        """)

        cursor.execute("SELECT COUNT(*) FROM schema_version")

        if cursor.fetchone()[0] == 0:
            cursor.execute(
                "INSERT INTO schema_version (version) VALUES (1)"
            )

        current_version = get_db_version(cursor)

        if current_version < SCHEMA_VERSION:

            if current_version < 2:
                migrate_to_v2(cursor)
                set_db_version(cursor, 2)

        conn.commit()
    
