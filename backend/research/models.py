from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from participant.models import Participant

from .validators import ValidateResearch, ValidateResearchField


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

    def assign_participant(self, participant_id):
        from form.models import FormParticipantMap

        ResearchAttending.create(research=self, participant_id=participant_id)
        FormParticipantMap.create(research=self, participant_id=participant_id)


class ResearchAttendingStatus(models.TextChoices):
    assigned = "AS", "Assigned"
    in_progress = "IP", "InProgress"
    drop = "DR", "Drop"
    done = "DO", "Done"

    @staticmethod
    def get_valid_name_from_status(status):
        for val, name in ResearchAttendingStatus.choices:
            if name.lower() == status.lower() or val.lower() == status.lower():
                return val
        return status

    @staticmethod
    def get_full_name_from_status(status):
        for val, name in ResearchAttendingStatus.choices:
            if val.lower() == status.lower():
                return name
        return status


class ResearchAttending(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.SET_NULL, null=True)
    research = models.ForeignKey(Research, on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(default=timezone.now, blank=True)
    status = models.CharField(max_length=2, choices=ResearchAttendingStatus.choices, default="AS", blank=False)

    @staticmethod
    def create(research, participant_id):
        if Participant.get_by_id(participant_id=participant_id) is None:
            raise Exception("Participant with id {0} does not exist".format(participant_id))
        if ResearchAttending.is_participant_free(participant_id=participant_id):
            res = ResearchAttending(participant=Participant.get_by_id(participant_id=participant_id), research=research)
            res.save()

        else:
            raise Exception(
                "{0} cannot be assigned to research".format(Participant.get_by_id(participant_id=participant_id))
            )

    @staticmethod
    def is_participant_free(participant_id):
        attn_list = ResearchAttending.objects.filter(participant_id=participant_id)
        for record in attn_list:
            st = record.status
            if st == ResearchAttendingStatus.assigned or st == ResearchAttendingStatus.in_progress:
                return False
        return True

    @staticmethod
    def get_participant_list(research_id, status=None):
        if status is None:
            return ResearchAttending.objects.filter(research_id=research_id,
                                                    status__in=[ResearchAttendingStatus.assigned,
                                                                ResearchAttendingStatus.in_progress]
                                                    )
        if status == 'all':
            return ResearchAttending.objects.filter(research_id=research_id)
        status = ResearchAttendingStatus.get_valid_name_from_status(status=status)

        if status in ResearchAttendingStatus.values:
            return ResearchAttending.objects.filter(research_id=research_id, status=status)

        message = "Status is invalid, valid options are: (" + \
                  "), (".join(map(lambda opt: str(opt[0]) + ' / ' + str(opt[1]), ResearchAttendingStatus.choices)) + \
                  ") (All)"
        raise Exception(message)

    @staticmethod
    def get_research_list(participant_id, status=None):
        if status is None:
            return ResearchAttending.objects.filter(participant_id=participant_id,
                                                    status__in=[ResearchAttendingStatus.assigned,
                                                                ResearchAttendingStatus.in_progress]
                                                    )
        if status == 'all':
            return ResearchAttending.objects.filter(participant_id=participant_id)
        status = ResearchAttendingStatus.get_valid_name_from_status(status=status)

        if status in ResearchAttendingStatus.values:
            return ResearchAttending.objects.filter(participant_id=participant_id, status=status)

        message = "Status is invalid, valid options are: (" + \
                  "), (".join(map(lambda opt: str(opt[0]) + ' / ' + str(opt[1]), ResearchAttendingStatus.choices)) + \
                  ") (All)"
        raise Exception(message)

    def get_status_full_name(self):
        return ResearchAttendingStatus.get_full_name_from_status(self.status)
