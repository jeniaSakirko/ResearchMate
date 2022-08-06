import pytest

from .models import Participant


def send_request(client, url, req_type="get", data=None, content_type="application/json", headers=None):
    if data is None:
        data = {}
    if req_type == "get":
        if headers:
            return client.get(url, **headers)
        else:
            return client.get(url)
    if req_type == "post":
        if headers:
            return client.post(url, data=data, content_type=content_type, **headers)
        else:
            return client.post(url, data=data, content_type=content_type)


def get_list():
    return list(Participant.get_all())


@pytest.mark.django_db
class TestParticipantModelAPI:
    def test_create_api(self, client):
        all_before = get_list()

        data = {
            "email": "test_create_api@gmail.com",
            "username": "test_create_api",
            "password": "test_create_api",
            "first_name": "test_create_api",
            "last_name": "test_create_api",
            "phone_number": 1234567890,
        }

        response = send_request(client=client, url="/api/participant/register", req_type="post", data=data)
        assert response.status_code == 200

        all_after = get_list()
        assert len(all_before) + 1 == len(all_after)
