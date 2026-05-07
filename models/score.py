class Score:
    def __init__ (self, category, value):
        if not 1 <= value <= 10:
            raise ValueError("Score value must be between 1 and 10.")
        self.category = category
        self.value = value
    
    def to_dict(self):
        return {
            "category": self.category.name,
            "value": self.value,
        }