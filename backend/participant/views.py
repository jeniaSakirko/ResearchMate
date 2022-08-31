import logging

from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response

from .models import Participant
from .serializers import ParticipantCleanSerializer, ParticipantSerializer


class ParticipantViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ParticipantSerializer
    queryset = Participant.get_all()


class ParticipantRegisterAPI(generics.GenericAPIView):
    serializer_class = ParticipantCleanSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response()


class ParticipantAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Participant.objects.all()
    serializer_class = ParticipantCleanSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response(
            {"user": ParticipantSerializer(instance, context=self.get_serializer_context()).data}
        )

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response("Ok")
            else:
                return Response({"message": "failed", "details": serializer.errors})
        except Exception as e:
            logging.warning("Exception in update participant [{0}]".format(str(e)))
            return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ParticipantAttendingAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Participant.objects.all()
    serializer_class = ParticipantCleanSerializer

    def get(self, request, *args, **kwargs):
        from research.models import ResearchAttending
        from research.serializers import ResearchSerializer

        instance = self.get_object()
        response = []
        list_res = ResearchAttending.get_research_list(instance.id)
        for entry in list_res:
            data = {}
            data.update(ResearchSerializer(entry.research, context=self.get_serializer_context()).data)
            data.update({"status": entry.get_status_full_name()})
            response.append(data)

        return Response(response)


class ParticipantFormAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Participant.objects.all()
    serializer_class = ParticipantCleanSerializer

    def get(self, request, *args, **kwargs):
        from form.models import FormParticipantMap
        from form.serializers import FormMetadataSerializer
        instance = request.user
        response = []
        status = None
        if "status" in request.GET:
            status = request.GET["status"]
        list_res = FormParticipantMap.get_participant_forms(participant_id=instance.id, status=status)
        for entry in list_res:
            data = {}
            data.update(FormMetadataSerializer(entry.form, context=self.get_serializer_context()).data)
            data.update({"status": entry.get_status_full_name()})
            data.update({"id": entry.form_id})
            response.append(data)
        return Response(response)

    def put(self, request, *args, **kwargs):
        try:
            from form.models import FormParticipantMap
            # TODO: fix the user this should be using Participant.objects.filter(base_user__user=request.user)
            instance = request.user
            FormParticipantMap.update_form_status(instance.id, request.data['form_id'], "R")
            return Response("Ok")
        except Exception as e:
            logging.warning("Exception in update participant [{0}]".format(str(e)))
            return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
