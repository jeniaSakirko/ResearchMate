from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ParticipantAPI, ParticipantRegisterAPI, ParticipantViewSet, ParticipantAttendingAPI, \
    ParticipantFormAPI, ParticipantInfoAPI

router = DefaultRouter()
router.register(r"participant", ParticipantViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("participant/info", ParticipantInfoAPI.as_view()),
    path("participant/register", ParticipantRegisterAPI.as_view()),
    path("participant/<int:pk>", ParticipantAPI.as_view()),
    path("participant/<int:pk>/research", ParticipantAttendingAPI.as_view()),
    path("participant/forms", ParticipantFormAPI.as_view()),
    path("participant/forms/agree", ParticipantFormAPI.as_view()),
]
