class ScoringCategory:
    def __init__ (self, name, weight=1.0):
        self.name = name
        self.weight = weight
    
    def to_dict(self):
        return {
            "name": self.name,
            "weight": self.weight,
        }