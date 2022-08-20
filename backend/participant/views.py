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
