import pytest

from models.media_item import MediaItem
from models.scoring_profile import VALID_MEDIA_TYPES


def test_media_item_accepts_valid_media_type():
    media_type = next(iter(VALID_MEDIA_TYPES))

    item = MediaItem("Test Title", media_type)

    assert item.title == "Test Title"
    assert item.media_type == media_type


def test_media_item_rejects_invalid_media_type():
    with pytest.raises(ValueError, match="Invalid media type"):
        MediaItem("Test Title", "not-a-real-media-type")


def test_media_item_to_dict():
    media_type = next(iter(VALID_MEDIA_TYPES))
    item = MediaItem("Test Title", media_type)

    assert item.to_dict() == {
        "title": "Test Title",
        "media_type": media_type,
    }