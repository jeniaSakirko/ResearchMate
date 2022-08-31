from base_user.models import BaseUser
from django.db import models


class Participant(models.Model):
    base_user = models.OneToOneField(BaseUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.base_user)

    @staticmethod
    def create(email, username, password, first_name, last_name, phone_number):
        res = Participant(
            base_user=BaseUser.create(
                email=email,
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                phone_number=phone_number,
            )
        )
        res.save()
        return res

    @staticmethod
    def get_by_id(participant_id):
        result = Participant.objects.filter(id=participant_id).first()
        return result

    @staticmethod
    def get_all():
        return Participant.objects.all()

    @staticmethod
    def update_active_status(participant_id, is_active):
        Participant.objects.get(id=participant_id).update_data(data={"is_active": is_active})

    def update_data(self, data):
        self.base_user.update_data(data)
        self.save()

    @staticmethod
    def is_base_user_participant(base_user_id):
        try:
            Participant.objects.get(base_user_id=base_user_id)
            return True
        except Exception:
            return False
