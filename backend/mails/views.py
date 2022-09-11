from django.core.mail import send_mail
from django.conf import settings

from participant.models import Participant
from researcher.models import Researcher
from research.models import Research


def send(subject, message, recipient_list):
    send_mail(subject=subject, message=message, from_email=settings.EMAIL_HOST_USER, recipient_list=recipient_list)


def registration_mail(participant_id):
    instance = Participant.get_by_id(participant_id)
    subject = "Thank you for registering to ResearchMate"
    message = \
        f"""
        Hi {instance.base_user.user.first_name} {instance.base_user.user.last_name},
        
        Thank you so much for registering to ResearchMate!
        Our greatest jewish minds can see that you are ready to join some studies and help the world get better.
        
        While you wait don't forget to tell MTA what an amazing project this is and that we should get 100 for it.
        
        Thanks,
        ResearchMate team.
        """
    recipient_list = [instance.base_user.user.email]
    send(subject=subject, message=message, recipient_list=recipient_list)


def assign_mail(participant_id, researcher_id, research_id):
    participant_instance = Participant.get_by_id(participant_id)
    researcher_instance = Researcher.get_by_id(researcher_id)
    research_instance = Research.get_research_by_id(research_id)

    researcher_full_name = \
        f"{researcher_instance.base_user.user.first_name} {researcher_instance.base_user.user.last_name}"
    subject = "You have been assigned to study in ResearchMate"
    message = \
        f"""
        Hi {participant_instance.base_user.user.first_name} {participant_instance.base_user.user.last_name},

        You have been assigned by {researcher_full_name} to study in ResearchMate system.
        The study field is {research_instance.field.name} and the name of the study is {research_instance.name}.
        We will update you with more information soon.
        
        While you wait don't forget to tell MTA what an amazing project this is and that we should get 100 for it.

        Thanks,
        ResearchMate team.
        """
    recipient_list = [participant_instance.base_user.user.email]
    send(subject=subject, message=message, recipient_list=recipient_list)


def un_assign_mail(participant_id, researcher_id, research_id):
    participant_instance = Participant.get_by_id(participant_id)
    researcher_instance = Researcher.get_by_id(researcher_id)
    research_instance = Research.get_research_by_id(research_id)

    researcher_full_name = \
        f"{researcher_instance.base_user.user.first_name} {researcher_instance.base_user.user.last_name}"
    subject = "You have been unassigned to study in ResearchMate"
    message = \
        f"""
        Hi {participant_instance.base_user.user.first_name} {participant_instance.base_user.user.last_name},

        You have been unassigned by {researcher_full_name} from {research_instance.name}.
        We have no idea why but you can find {researcher_full_name} in Facebook and ask all your questions.
        Hope that you get assigned again :)

        While you wait don't forget to tell MTA what an amazing project this is and that we should get 100 for it.

        Thanks,
        ResearchMate team.
        """
    recipient_list = [participant_instance.base_user.user.email]
    send(subject=subject, message=message, recipient_list=recipient_list)
