from datetime import date, datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, field_validator

from models.scoring_profile import VALID_MEDIA_TYPES

VALID_COMPLETION_STATUSES = {
    "completed",
    "in-progress",
    "dropped",
    "planned",
}


class PortableArchiveEntry(BaseModel):
    id: str
    title: str
    media_type: str
    genres: list[str]
    scores: dict[str, int]
    notes: str | None = None
    date_consumed: date | None = None
    completion_status: str
    favorite: bool
    historical_score: float | None = None
    historical_scores: dict[str, Any] | None = None

    @field_validator("id")
    @classmethod
    def validate_id(cls, value: str) -> str:
        UUID(value)
        return value

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Title must not be empty")
        return value

    @field_validator("media_type")
    @classmethod
    def validate_media_type(cls, value: str) -> str:
        if value not in VALID_MEDIA_TYPES:
            raise ValueError("Invalid media type")
        return value


    @field_validator("genres")
    @classmethod
    def validate_genres(cls, value: list[str]) -> list[str]:
        if any(not isinstance(genre, str) or not genre.strip() for genre in value):
            raise ValueError("Genres must be non-empty strings")

        return value

    @field_validator("scores")
    @classmethod
    def validate_scores(cls, value: dict[str, int]) -> dict[str, int]:
        if any(
            not isinstance(score, int) or isinstance(score, bool)
            for score in value.values()
        ):
            raise ValueError("Scores must be integers")

        if any(score < 1 or score > 10 for score in value.values()):
            raise ValueError("Scores must be between 1 and 10")

        return value

    @field_validator("completion_status")
    @classmethod
    def validate_completion_status(cls, value: str) -> str:
        if value not in VALID_COMPLETION_STATUSES:
            raise ValueError("Invalid completion status")
        return value


class PortableArchive(BaseModel):
    format: str
    version: int
    exported_at: datetime
    entries: list[PortableArchiveEntry]
