from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Researcher
from participant.models import Participant


class DisableParticipantViewSet(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        try:
            Researcher.objects.get(base_user__user=request.user)
            Participant.update_active_status(request.data['participant_id'], False)
            return Response("Ok")
        except Exception as e:
            if "does not exist" in e.args[0]:
                return Response(data={"message": "You are no allowed to do this"},
                                status=status.HTTP_401_UNAUTHORIZED)
            return Response(data={"message": "Exception in disable participant. Error: [{0}]".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EnableParticipantViewSet(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        try:
            Researcher.objects.get(base_user__user=request.user)
            Participant.update_active_status(request.data['participant_id'], True)
            return Response("Ok")
        except Exception as e:
            if "does not exist" in e.args[0]:
                return Response(data={"message": "You are no allowed to do this"},
                                status=status.HTTP_401_UNAUTHORIZED)
            return Response(data={"message": "Exception in disable participant. Error: [{0}]".format(str(e))},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
