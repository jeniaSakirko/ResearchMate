from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.exceptions import MethodNotAllowed

from .models import Research, ResearchAttending, ResearchAttendingStatus
from participant.serializers import ParticipantSerializer


class ResearchSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        try:
            research = Research.create(
                name=validated_data.get("name"),
                field_id=validated_data.get("field").id,
                capacity=validated_data.get("capacity"),
            )
            return research

        except ValidationError as e:
            error = {"message": str(e) if len(e.args) > 0 else "Unknown Error"}
            raise serializers.ValidationError(error)

    class Meta:
        model = Research
        fields = ("id", "name", "field", "capacity")


class ResearchAssignSerializer(serializers.Serializer):
    participant_id = serializers.IntegerField()

    def get(self):
        pass

    def update(self, instance, validated_data):
        try:
            if self.context["method"] == "GET":
                search_status = None
                if "status" in validated_data:
                    search_status = validated_data["status"][0]
                return ResearchAttending.get_participant_list(instance.id, status=search_status)
            if self.context["method"] == "POST":
                if self.context["operation"] == "assign":
                    instance.update_participant(participant_id=validated_data["participant_id"],
                                                status=ResearchAttendingStatus.assigned)
                elif self.context["operation"] == "unassign":
                    instance.update_participant(participant_id=validated_data["participant_id"],
                                                status=ResearchAttendingStatus.drop)
                return instance
        except Exception as e:
            raise serializers.ValidationError(e)

    def validate(self, data):
        if self.context["method"] == "GET":
            return dict(self.context["query_params"])
        if self.context["method"] == "POST":
            if "participant_id" not in data.keys():
                raise serializers.ValidationError("participant_id is missing")
            if not isinstance(data["participant_id"], int):
                raise serializers.ValidationError("Id must be integer")
            return data
        raise MethodNotAllowed(self.context["request"].method)


class ResearchAttendingSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer()
    status = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()

    def get_status(self, instance):
        for key, val in ResearchAttendingStatus.choices:
            if key == instance.status:
                return val
        return instance.status

    def get_date(self, instance):
        return instance.date.strftime("%Y-%m-%d %H:%M:%S")

    class Meta:
        model = ResearchAttending
        fields = ["participant", "date", "status"]
