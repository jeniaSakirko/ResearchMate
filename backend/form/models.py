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

    @staticmethod
    def get_valid_name_from_status(status):
        for val, name in Status.choices:
            if name.lower() == status.lower() or val.lower() == status.lower():
                return val
        return status

    @staticmethod
    def get_full_name_from_status(status):
        for val, name in Status.choices:
            if val.lower() == status.lower():
                return name
        return status


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

    @staticmethod
    def get_participant_forms(participant_id, status=None):
        if status is None:
            return FormParticipantMap.objects.filter(participant_id=participant_id,
                                                     status__in=[Status.new, Status.under_review])
        if status == 'all':
            return FormParticipantMap.objects.filter(participant_id=participant_id)
        status = Status.get_valid_name_from_status(status=status)

        if status in Status.values:
            return FormParticipantMap.objects.filter(participant_id=participant_id, status=status)

        message = "Status is invalid, valid options are: (" + \
                  "), (".join(map(lambda opt: str(opt[0]) + ' / ' + str(opt[1]), Status.choices)) + \
                  ") (All)"
        raise Exception(message)

    def get_status_full_name(self):
        return Status.get_full_name_from_status(self.status)

    @staticmethod
    def update_form_status(participant_id, form_id, new_status):
        entry = FormParticipantMap.objects.get(participant_id=participant_id, form_id=form_id)
        entry.status = Status.get_valid_name_from_status(new_status)
        entry.save()
