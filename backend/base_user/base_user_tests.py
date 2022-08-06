import pytest
from django.core.exceptions import ValidationError

from .models import BaseUser


@pytest.mark.django_db
class TestBaseUserModel:
    def test_email_validation(self, base_user_data):
        with pytest.raises(ValidationError, match="Enter a valid email address."):
            BaseUser.create(
                email="no email",
                username="test_email_validation_username",
                password=pytest.base_user_password,
                first_name=pytest.base_user_first_name,
                last_name=pytest.base_user_last_name,
                phone_number=pytest.base_user_phone_number,
            )

    def test_email_unique(self, base_user_fixture, base_user_data):
        with pytest.raises(ValidationError, match="Invalid email - email already exist."):
            BaseUser.create(
                email=pytest.base_user_email,
                username="test_name_validation_username",
                password=pytest.base_user_password,
                first_name=pytest.base_user_first_name,
                last_name=pytest.base_user_last_name,
                phone_number=pytest.base_user_phone_number,
            )

    def test_name_validation(self, base_user_fixture, base_user_data):
        with pytest.raises(ValidationError, match="Invalid username - username already exist."):
            BaseUser.create(
                email="test_name_validation@gmail.com",
                username=pytest.base_user_username,
                password=pytest.base_user_password,
                first_name=pytest.base_user_first_name,
                last_name=pytest.base_user_last_name,
                phone_number=pytest.base_user_phone_number,
            )

    def test_phone_validation_len(self, base_user_data):
        with pytest.raises(ValidationError, match="Invalid phone - phone should be 10 digits."):
            BaseUser.create(
                email="test_name_validation@gmail.com",
                username="test_name_validation_username",
                password=pytest.base_user_password,
                first_name=pytest.base_user_first_name,
                last_name=pytest.base_user_last_name,
                phone_number="123",
            )

    def test_phone_validation_str(self, base_user_data):
        with pytest.raises(ValidationError, match="Invalid phone - phone should be string."):
            BaseUser.create(
                email="test_name_validation@gmail.com",
                username="test_name_validation_username",
                password=pytest.base_user_password,
                first_name=pytest.base_user_first_name,
                last_name=pytest.base_user_last_name,
                phone_number=123,
            )
