from rest_framework import serializers

from research.serializers import ResearchSerializer
from .models import FormMetadata


class FormMetadataSerializer(serializers.ModelSerializer):
    research = ResearchSerializer()

    class Meta:
        model = FormMetadata
        fields = ("name", "url", "research")
