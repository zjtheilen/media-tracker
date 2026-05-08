import sqlite3

DB_NAME = "database.db"


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS entries (
        id TEXT PRIMARY KEY,
        media_type TEXT,
        title TEXT,
        genre TEXT,
        completion_status TEXT,
        total_score REAL,
        notes TEXT,
        date_consumed TEXT,
        scores TEXT
    )
    """)

    conn.commit()
    conn.close()