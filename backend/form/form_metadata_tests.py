import pytest
from django.core.exceptions import ValidationError

from .models import FormMetadata


@pytest.mark.django_db
class TestFormModel:
    def test_is_form_name_validation(self, form_fixture, form_metadata):
        with pytest.raises(ValidationError, match="Invalid form name - name already exist."):
            FormMetadata.create(name=pytest.form_name, url=pytest.form_url, research_id=pytest.form_research_id)

    def test_is_url_validation(self, form_fixture, form_metadata):
        with pytest.raises(ValidationError, match="Invalid form URL."):
            FormMetadata.create(name="test_is_url_validation", url="test test", research_id=pytest.form_research_id)

    def test_research_exist_validation(self, form_fixture, form_metadata):
        with pytest.raises(ValidationError, match="Invalid research id - id does not exist."):
            FormMetadata.create(name="test_research_exist_validation", url=pytest.form_url, research_id=9999)

    def test_get_form_metadata_by_id(self, form_fixture, form_metadata):
        FormMetadata.get_form_metadata_by_id(form_fixture.id)
        assert form_fixture.name == pytest.form_name
        assert form_fixture.url == pytest.form_url
        assert form_fixture.research.id == pytest.form_research_id

    def test_is_form_name_exist(self, form_fixture, form_metadata):
        assert FormMetadata.is_form_name_exist(pytest.form_name)
