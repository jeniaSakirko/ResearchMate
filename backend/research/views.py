import logging

from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response

from .models import Research
from .serializers import ResearchAssignSerializer, ResearchSerializer, ResearchAttendingSerializer


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
                                             context={"request": request, "method": request.method})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Added"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.warning("Exception in assign to research. Error: [{0}]".format(str(e)))
            raise e
