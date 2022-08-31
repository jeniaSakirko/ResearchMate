from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import BaseUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "first_name", "last_name", "is_active")
        extra_kwargs = {"password": {"write_only": True}}


class BaseUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    def create(self, validated_data):
        try:
            participant = BaseUser.create(
                email=validated_data["user"]["email"],
                username=validated_data["user"]["username"],
                password=validated_data["user"]["password"],
                first_name=validated_data["user"]["first_name"],
                last_name=validated_data["user"]["last_name"],
                phone_number=validated_data["phone_number"],
            )

            return participant

        except ValidationError as e:
            error = {"message": str(e) if len(e.args) > 0 else "Unknown Error"}
            raise serializers.ValidationError(error)

    class Meta:
        model = BaseUser
        fields = ("id", "user", "phone_number")


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        try:
            users = User.objects.filter(username=data['username'])
            if len(users) > 0:
                user = users.first()
                if not user.is_active:
                    raise serializers.ValidationError("User is not active")
        except Exception as e:
            raise e
        raise serializers.ValidationError("Incorrect Credentials")
