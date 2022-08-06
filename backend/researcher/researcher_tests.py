import pytest
from django.core.exceptions import ValidationError

from .models import Researcher

CONST_EMAIL = "conste@gmail.com"
CONST_USERNAME = "constUsername"
CONST_PASSWORD = "constPassword"
CONST_FIRST_NAME = "const_first_name"
CONST_LAST_NAME = "const_last_name"
CONST_PHONE = 1111111111


@pytest.mark.django_db
class TestResearcherModel:
    def test_email_validation(self, researcher_fixture, researcher_data):
        with pytest.raises(ValidationError, match="Enter a valid email address."):
            return Researcher.create(
                email="no email",
                username=CONST_USERNAME,
                password=CONST_PASSWORD,
                first_name=CONST_FIRST_NAME,
                last_name=CONST_LAST_NAME,
                phone_number=CONST_PHONE,
            )

    def test_email_unique(self, researcher_fixture, researcher_data):
        with pytest.raises(ValidationError, match="Invalid email - email already exist."):
            return Researcher.create(
                email=pytest.researcher_email,
                username=CONST_USERNAME,
                password=CONST_PASSWORD,
                first_name=CONST_FIRST_NAME,
                last_name=CONST_LAST_NAME,
                phone_number=CONST_PHONE,
            )

    def test_name_validation(self, researcher_fixture, researcher_data):
        with pytest.raises(ValidationError, match="Invalid username - username already exist."):
            return Researcher.create(
                email=CONST_EMAIL,
                username=pytest.researcher_username,
                password=CONST_PASSWORD,
                first_name=CONST_FIRST_NAME,
                last_name=CONST_LAST_NAME,
                phone_number=CONST_PHONE,
            )

    def test_phone_validation_len(self, researcher_fixture, researcher_data):
        with pytest.raises(ValidationError, match="Invalid phone - phone should be 10 digits."):
            return Researcher.create(
                email=CONST_EMAIL,
                username=CONST_USERNAME,
                password=CONST_PASSWORD,
                first_name=CONST_FIRST_NAME,
                last_name=CONST_LAST_NAME,
                phone_number="123",
            )

    def test_phone_validation_str(self, researcher_fixture, researcher_data):
        with pytest.raises(ValidationError, match="Invalid phone - phone should be string."):
            return Researcher.create(
                email=CONST_EMAIL,
                username=CONST_USERNAME,
                password=CONST_PASSWORD,
                first_name=CONST_FIRST_NAME,
                last_name=CONST_LAST_NAME,
                phone_number=123,
            )
