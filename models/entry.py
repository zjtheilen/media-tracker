from datetime import date
from typing import List
import uuid

from models.media_item import MediaItem
from models.score import Score
from models.scoring_profile import get_universal_weight, get_media_weight


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

    def get_universal_scores(self):
        return {
            score.category: score.value
            for score in self.scores
            if get_universal_weight(score.category) is not None
        }

    def get_media_scores(self):
        return {
            score.category: score.value
            for score in self.scores
            if get_media_weight(self.media_item.media_type, score.category) is not None
        }

    def total_score(self) -> float:
        universal_total = 0
        media_total = 0

        universal_weight_found = False
        media_weight_found = False

        for score in self.scores:
            universal_weight = get_universal_weight(score.category)

            if universal_weight is not None:
                universal_total += score.value * universal_weight
                universal_weight_found = True
                continue

            media_weight = get_media_weight(self.media_item.media_type, score.category)

            if media_weight is not None:
                media_total += score.value * media_weight
                media_weight_found = True

        if not universal_weight_found:
            return 0

        if not media_weight_found:
            return round(universal_total * 10, 2)

        final_score = (universal_total * 0.70) + (media_total * 0.30)

        return round(final_score * 10, 2)

    def to_dict(self):
        return {
            "title": self.media_item.title,
            "media_type": self.media_item.media_type,
            "media_item": self.media_item.to_dict(),
            "scores": [score.to_dict() for score in self.scores],
            "genres": self.genres,
            "notes": self.notes,
            "date_consumed": (
                self.date_consumed.isoformat() if self.date_consumed else None
            ),
            "completion_status": self.completion_status,
            "total_score": self.total_score(),
            "universal_scores": self.get_universal_scores(),
            "media_scores": self.get_media_scores(),
        }
