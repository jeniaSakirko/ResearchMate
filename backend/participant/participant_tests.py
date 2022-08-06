import pytest
from django.core.exceptions import ValidationError

from .models import Participant


@pytest.mark.django_db
class TestParticipantModel:
    def test_email_validation(self, participant_fixture, participant_data):
        with pytest.raises(ValidationError, match="Enter a valid email address."):
            Participant.create(
                email="no email",
                username="test_name_validation_username",
                password=pytest.participant_password,
                first_name=pytest.participant_first_name,
                last_name=pytest.participant_last_name,
                phone_number=pytest.participant_phone_number,
            )

    def test_email_unique(self, participant_fixture, participant_data):
        with pytest.raises(ValidationError, match="Invalid email - email already exist."):
            Participant.create(
                email=pytest.participant_email,
                username="test_name_validation_username",
                password=pytest.participant_password,
                first_name=pytest.participant_first_name,
                last_name=pytest.participant_last_name,
                phone_number=pytest.participant_phone_number,
            )

    def test_name_validation(self, participant_fixture, participant_data):
        with pytest.raises(ValidationError, match="Invalid username - username already exist."):
            Participant.create(
                email="test_name_validation@gmail.com",
                username=pytest.participant_username,
                password=pytest.participant_password,
                first_name=pytest.participant_first_name,
                last_name=pytest.participant_last_name,
                phone_number=pytest.participant_phone_number,
            )

    def test_phone_validation_len(self, participant_fixture, participant_data):
        with pytest.raises(ValidationError, match="Invalid phone - phone should be 10 digits."):
            Participant.create(
                email="test_name_validation@gmail.com",
                username="test_name_validation_username",
                password=pytest.participant_password,
                first_name=pytest.participant_first_name,
                last_name=pytest.participant_last_name,
                phone_number="123",
            )

    def test_phone_validation_str(self, participant_fixture, participant_data):
        with pytest.raises(ValidationError, match="Invalid phone - phone should be string."):
            Participant.create(
                email="test_name_validation@gmail.com",
                username="test_name_validation_username",
                password=pytest.participant_password,
                first_name=pytest.participant_first_name,
                last_name=pytest.participant_last_name,
                phone_number=123,
            )

    def test_get_by_id(self, participant_fixture, participant_data):
        result = Participant.get_by_id(participant_fixture.id)
        assert result.base_user.user.email == participant_fixture.base_user.user.email
        assert result.base_user.user.username == participant_fixture.base_user.user.username
        assert result.base_user.user.password == participant_fixture.base_user.user.password
        assert result.base_user.user.first_name == participant_fixture.base_user.user.first_name
        assert result.base_user.user.last_name == participant_fixture.base_user.user.last_name
        assert result.base_user.phone_number == participant_fixture.base_user.phone_number
