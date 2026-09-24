def assert_valid_evidence(item):
    for evidence in item["evidence"]:
        assert "metric" in evidence
        assert "label" in evidence
        assert "value" in evidence
        assert "unit" in evidence
        assert "type" in evidence