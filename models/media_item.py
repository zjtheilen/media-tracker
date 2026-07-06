from models.scoring_profile import VALID_MEDIA_TYPES


class MediaItem:
    def __init__(self, title, media_type):
        if media_type not in VALID_MEDIA_TYPES:
            raise ValueError(f"Invalid media type: {media_type}")
        self.title = title
        self.media_type = media_type

    def to_dict(self):
        return {
            "title": self.title,
            "media_type": self.media_type,
        }
