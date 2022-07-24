from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import BaseUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class BaseUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    def create(self, validated_data):
        try:
            participant = BaseUser.create(email=validated_data['user']['email'],
                                          username=validated_data['user']['username'],
                                          password=validated_data['user']['password'],
                                          first_name=validated_data['user']['first_name'],
                                          last_name=validated_data['user']['last_name'],
                                          phone_number=validated_data['phone_number'])

            return participant

        except ValidationError as e:
            error = {'message': str(e) if len(e.args) > 0 else 'Unknown Error'}
            raise serializers.ValidationError(error)

    class Meta:
        model = BaseUser
        fields = ('id', 'user', 'phone_number')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
