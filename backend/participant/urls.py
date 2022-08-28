from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ParticipantAPI, ParticipantRegisterAPI, ParticipantViewSet, ParticipantAttendingAPI, \
    ParticipantFormAPI

router = DefaultRouter()
router.register(r"participant", ParticipantViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("participant/register", ParticipantRegisterAPI.as_view()),
    path("participant/<int:pk>", ParticipantAPI.as_view()),
    path("participant/<int:pk>/research", ParticipantAttendingAPI.as_view()),
    path("participant/<int:pk>/form", ParticipantFormAPI.as_view()),
]
