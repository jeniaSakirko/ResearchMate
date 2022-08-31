from django.urls import path

from .views import DisableParticipantViewSet, EnableParticipantViewSet

urlpatterns = [
    path("researcher/participant/disable", DisableParticipantViewSet.as_view()),
    path("researcher/participant/enable", EnableParticipantViewSet.as_view()),
]
