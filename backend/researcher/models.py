from base_user.models import BaseUser
from django.db import models
from research.models import Research

# from validators import ValidateUser


class Researcher(models.Model):
    base_user = models.OneToOneField(BaseUser, on_delete=models.CASCADE)

    @staticmethod
    def create(email, username, password, first_name, last_name, phone_number):
        res = Researcher(
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


class ManageResearch(models.Model):
    researcher = models.ForeignKey(Researcher, on_delete=models.SET_NULL, null=True)
    research = models.ForeignKey(Research, on_delete=models.SET_NULL, null=True)
