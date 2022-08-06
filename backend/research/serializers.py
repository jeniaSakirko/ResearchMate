from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import Research


class ResearchSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        try:
            research = Research.create(
                name=validated_data.get("name"),
                field_id=validated_data.get("field").id,
            )
            return research

        except ValidationError as e:
            error = {"message": str(e) if len(e.args) > 0 else "Unknown Error"}
            raise serializers.ValidationError(error)

    class Meta:
        model = Research
        fields = ("id", "name", "field")


class ResearchAssignSerializer(serializers.Serializer):
    participant_id = serializers.IntegerField()

    def update(self, instance, validated_data):
        try:
            instance.assign_participant(participant_id=validated_data["participant_id"])
            return instance
        except Exception as e:
            raise serializers.ValidationError(e)

    def validate(self, data):
        if "participant_id" not in data.keys():
            raise serializers.ValidationError("participant_id is missing")
        if not isinstance(data["participant_id"], int):
            raise serializers.ValidationError("Id must be integer")
        return data
