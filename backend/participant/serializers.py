from django.core.exceptions import PermissionDenied, ValidationError
from researcher.models import Researcher
from rest_framework import serializers

from .models import Participant


class ParticipantSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_number = serializers.CharField()

    def update(self, instance, validated_data):
        try:
            req_user = self.context["request"].user
            can_update = False
            if Researcher.objects.filter(base_user=req_user.baseuser).exists():
                can_update = True
            elif req_user.id == instance.id:
                can_update = True

            if can_update:
                instance.update_data(validated_data)
            else:
                raise PermissionDenied()
            return instance
        except Exception as e:
            raise Exception("Internal Error {}".format(str(e)))

    def create(self, validated_data):
        try:
            participant = Participant.create(
                email=validated_data["email"],
                username=validated_data["username"],
                password=validated_data["password"],
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                phone_number=validated_data["phone_number"],
            )

            return participant

        except ValidationError as e:
            error = {"message": str(e) if len(e.args) > 0 else "Unknown Error"}
            raise serializers.ValidationError(error)
