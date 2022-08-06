from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from participant.models import Participant
from research.models import Research

from .validators import ValidateFormMetadata


class FormMetadata(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    research = models.ForeignKey(Research, on_delete=models.CASCADE)

    @staticmethod
    def create(name, url, research_id):
        ValidateFormMetadata(name, url, research_id).start_validation()
        research = Research.get_research_by_id(research_id=research_id)
        res = FormMetadata(name=name, url=url, research=research)
        res.save()
        return res

    @staticmethod
    def is_form_name_exist(name):
        try:
            result = FormMetadata.objects.filter(name=name)
            if len(result) > 0:
                return True
            return False
        except ObjectDoesNotExist:
            return False

    @staticmethod
    def get_form_metadata_by_id(metadata_id):
        result = FormMetadata.objects.filter(id=metadata_id).first()
        return result


class Status(models.TextChoices):
    new = "N", "New"
    under_review = "R", "Under Review"
    done = "D", "Done"


class FormParticipantMap(models.Model):
    form = models.ForeignKey(FormMetadata, on_delete=models.SET_NULL, null=True)
    participant = models.ForeignKey(Participant, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=1, choices=Status.choices, default="N", blank=True)
    date = models.DateTimeField(default=timezone.now, blank=True)

    @staticmethod
    def create(research, participant_id):
        form_list = FormMetadata.objects.filter(research=research)
        for form in form_list:
            res = FormParticipantMap(form=form, participant=Participant.get_by_id(participant_id=participant_id))
            res.save()
