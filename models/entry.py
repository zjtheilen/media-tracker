from datetime import date
from typing import List
import uuid

from models.media_item import MediaItem
from models.score import Score
from models.scoring_profile import CATEGORY_WEIGHTS


class Entry:
    def __init__(
        self,
        media_item: MediaItem,
        genres: List[str],
        scores: List[Score] = None,
        notes: str = "",
        date_consumed: date = None,
        completion_status: str = "completed",
    ):
        self.id = str(uuid.uuid4())
        self.media_item = media_item
        self.scores = scores if scores is not None else []
        self.notes = notes
        self.date_consumed = date_consumed or date.today()
        self.completion_status = completion_status
        self.genres = genres

    def total_score(self) -> float:
        weighted_total = 0

        for score in self.scores:
            weight = CATEGORY_WEIGHTS[score.category]
            weighted_total += score.value * weight

        return round(weighted_total * 10, 2)

    def to_dict(self):
        return {
            "media_item": self.media_item.to_dict(),
            "scores": [score.to_dict() for score in self.scores],
            "notes": self.notes,
            "date_consumed": self.date_consumed.isoformat()
            if self.date_consumed
            else None,
            "completion_status": self.completion_status,
            "total_score": self.total_score(),
        }
