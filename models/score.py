from models.services.scoring_rubric import get_score_meaning


class Score:
    def __init__(self, category: str, value: int):
        self.category = category
        self.value = value

    def to_dict(self):
        return {
            "category": self.category,
            "value": self.value,
            "meaning": get_score_meaning(self.value),
        }
