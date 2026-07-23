from dataclasses import dataclass, field


@dataclass
class Recommendation:
    title: str
    media_type: str
    match_score: float

    matched_signals: list[str] = field(default_factory=list)
    mismatched_signals: list[str] = field(default_factory=list)

    summary: str = ""