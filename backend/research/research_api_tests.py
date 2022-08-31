import pytest

from .models import Research


@pytest.mark.django_db
class TestResearchModelAPI:
    def test_create_api(self, client, research_data, research_field):
        all_before = list(Research.get_all())
        response = client.post(
            "/api/research/",
            {"name": pytest.research_name, "field": pytest.research_filed_id, "capacity": pytest.research_capacity},
        )
        assert response.status_code == 201

        all_after = list(Research.get_all())
        assert len(all_before) + 1 == len(all_after)

    def test_create_api_failed_name(self, client, research_fixture):
        all_before = list(Research.get_all())
        response = client.post(
            "/api/research/",
            {"name": pytest.research_name, "field": pytest.research_filed_id, "capacity": pytest.research_capacity},
        )
        assert response.status_code == 400

        all_after = list(Research.get_all())
        assert len(all_before) == len(all_after)

    def test_assign_api(self, client, research_gal, participant_fixture, researcher_token_fixture):
        response = client.post(
            "/api/research/{}/assign".format(research_gal.id),
            data={"participant_id": participant_fixture.id},
            content_type="application/json",
            **researcher_token_fixture
        )

        assert response.status_code == 200
        assert response.data == {"message": "Done"}

    def test_assign_api_non_existing_participant(self, client, research_gal, researcher_token_fixture):
        response = client.post(
            "/api/research/{}/assign".format(research_gal.id),
            data={"participant_id": 100},
            content_type="application/json",
            **researcher_token_fixture
        )

        assert response.status_code == 400

    def test_assign_api_re_assign(self, client, research_gal, participant_fixture, researcher_token_fixture):
        response = client.post(
            "/api/research/{}/assign".format(research_gal.id),
            data={"participant_id": participant_fixture.id},
            content_type="application/json",
            **researcher_token_fixture
        )

        assert response.status_code == 200
        assert response.data == {"message": "Done"}

        response = client.post(
            "/api/research/{}/assign".format(research_gal.id),
            data={"participant_id": participant_fixture.id},
            content_type="application/json",
            **researcher_token_fixture
        )

        assert response.status_code == 400
