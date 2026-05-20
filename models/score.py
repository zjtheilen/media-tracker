class Score:
    def __init__ (self, category: str, value: int):
        self.category = category
        self.value = value
    
    def to_dict(self):
        return {
            "category": self.category.name,
            "value": self.value,
        }