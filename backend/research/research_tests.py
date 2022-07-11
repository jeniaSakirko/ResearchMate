import pytest
from .models import Research, ResearchField
from django.core.exceptions import ValidationError


@pytest.mark.django_db
class TestResearchModel:
    # todo: Add test for field_id validation

    def test_unique_research_name(self, research_fixture, research_data):
        with pytest.raises(ValidationError, match='Invalid research nane - research already exist.'):
            Research.create(name=pytest.research_name, field_id=pytest.research_filed_id,
                            capacity=pytest.research_capacity)

    def test_field_id_validation(self, research_data):
        with pytest.raises(ValidationError, match='Invalid research field id - id does not exist.'):
            Research.create(name=pytest.research_name, field_id=9999,
                            capacity=pytest.research_capacity)

    def test_is_name_exist(self, research_fixture):
        assert Research.is_research_name_exist(research_fixture.name)
        assert not Research.is_research_name_exist('this name should not exist')

    def test_research_id_exist(self, research_fixture, research_data):
        assert Research.is_research_id_exist(research_fixture.id)
        assert not Research.is_research_id_exist(999)

    def test_first_id_is_gal(self):
        research = Research.get_research_by_id(1)
        assert research.name == 'Plasticity of the motor network'
        assert research.field == ResearchField.get_field_by_id(1)
        assert research.capacity == 50

    def test_get_all(self, research_fixture):
        original = list(Research.objects.all())
        assert len(original) == len(Research.get_all())

        Research.create(name='test_get_all', field_id=pytest.research_filed_id, capacity=20)
        assert len(original) + 1 == len(list(Research.get_all()))
