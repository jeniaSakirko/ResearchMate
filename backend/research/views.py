import logging

from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from .models import Research
from .serializers import ResearchAssignSerializer, ResearchSerializer, ResearchAttendingSerializer
from participant.serializers import ParticipantSerializer


class ResearchViewSet(viewsets.ModelViewSet):
    serializer_class = ResearchSerializer
    queryset = Research.get_all()


class ResearchAssignAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Research.objects.all()
    serializer_class = ResearchAssignSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data={}, partial=True,
                                         context={"request": request, "method": request.method,
                                                  "query_params": request.query_params})
        serializer.is_valid(raise_exception=True)
        participants = serializer.save()
        return Response(ResearchAttendingSerializer(participants, many=True).data)

    def post(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True,
                                             context={"request": request, "method": request.method,
                                                      "operation": request.stream.path.split('/')[-1]})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Done"}, status=status.HTTP_200_OK)
        except Exception as e:
            logging.warning("Exception in assign to research. Error: [{0}]".format(str(e)))
            raise e


class ResearchFormAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Research.objects.all()

    def get(self, request, *args, **kwargs):
        from form.models import FormParticipantMap
        from form.serializers import FormMetadataSerializer

        try:
            request.user.baseuser.researcher
            research_instance = self.get_object()
            response = []
            query_status = None
            if "status" in request.GET:
                query_status = request.GET["status"]
            list_res = FormParticipantMap.get_research_forms(research_id=research_instance.id, status=query_status)
            for entry in list_res:
                data = {}
                data.update(
                    {"user": ParticipantSerializer(entry.participant, context=self.get_serializer_context()).data})
                data.update(FormMetadataSerializer(entry.form, context=self.get_serializer_context()).data)
                data.update({"status": entry.get_status_full_name()})
                data.update({"id": entry.form_id})
                response.append(data)
            return Response(response)
        except ObjectDoesNotExist:
            return Response(data={"message": "You are unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, *args, **kwargs):
        try:
            from form.models import FormParticipantMap

            request.user.baseuser.researcher
            FormParticipantMap.update_form_status(participant_id=request.data["participant_id"],
                                                  form_id=request.data["form_id"], new_status="D")
            return Response("Ok")
        except ObjectDoesNotExist:
            return Response(data={"message": "You are unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logging.warning("Exception in update participant [{0}]".format(str(e)))
            return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
