from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class ValidateBaseUser:
    def __init__(self, email, username, password, first_name, last_name, phone_number):
        self.email = email
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.phone_number = phone_number

    def start_validation(self):
        self.validate_participant_username_unique()
        validate_email(self.email)
        self.validate_participant_email_unique()
        self.validate_phone()

    def validate_participant_username_unique(self):
        # TODO: add the value name to the error
        if User.objects.filter(username=self.username).exists():
            raise ValidationError("Invalid username - username already exist.")

    def validate_participant_email_unique(self):
        # TODO: add the value name to the error
        if User.objects.filter(email=self.email).exists():
            raise ValidationError("Invalid email - email already exist.")

    def validate_phone(self):
        value = self.phone_number
        if isinstance(value, str):
            if len(value) != 10:
                raise ValidationError("Invalid phone - phone should be 10 digits.")
        else:
            raise ValidationError("Invalid phone - phone should be string.")
