from django.db import models
from .validators import ValidateResearch, ValidateResearchField
from django.core.exceptions import ObjectDoesNotExist
from participant.models import Participant
from django.utils import timezone


class ResearchField(models.Model):
    name = models.CharField(max_length=255)

    @staticmethod
    def create(name):
        ValidateResearchField(name).start_validation()
        res = ResearchField(name=name)
        res.save()
        return res

    @staticmethod
    def is_name_exist(name):
        try:
            result = ResearchField.objects.filter(name=name)
            if len(result) > 0:
                return True
            return False
        except ObjectDoesNotExist:
            return False

    @staticmethod
    def get_field_by_id(field_id):
        result = ResearchField.objects.filter(id=field_id).first()
        return result

    @staticmethod
    def is_id_exist(field_id):
        try:
            result = ResearchField.get_field_by_id(field_id=field_id)
            if result:
                return True
            return False
        except ObjectDoesNotExist:
            return False


class Research(models.Model):
    name = models.CharField(max_length=255)
    field = models.ForeignKey(ResearchField, on_delete=models.SET_NULL, null=True)
    capacity = models.IntegerField()

    @staticmethod
    def create(name, field_id, capacity):
        ValidateResearch(name=name, field_id=field_id).start_validation()
        res = Research(name=name, field=ResearchField.get_field_by_id(field_id=field_id), capacity=capacity)
        res.save()
        return res

    @staticmethod
    def is_research_name_exist(name):
        try:
            result = Research.objects.filter(name=name)
            if len(result) > 0:
                return True
            return False
        except ObjectDoesNotExist:
            return False

    @staticmethod
    def is_research_id_exist(research_id):
        try:
            result = Research.get_research_by_id(research_id=research_id)
            if result:
                return True
            return False
        except ObjectDoesNotExist:
            return False

    @staticmethod
    def get_research_by_id(research_id):
        return Research.objects.filter(id=research_id).first()

    @staticmethod
    def get_all():
        return Research.objects.all()

    def update(self, name=None, field_id=None, capacity=None):
        if name is None:
            name = self.name
        if field_id is None:
            field_id = self.field.id
        if capacity is None:
            capacity = self.capacity

        ValidateResearch(name=name, field_id=field_id).start_validation()
        self.name = name
        self.field = ResearchField.get_field_by_id(field_id=field_id)
        self.capacity = capacity
        self.save()


class ResearchAttending(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.SET_NULL, null=True)
    research = models.ForeignKey(Research, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(default=timezone.now, blank=True)
