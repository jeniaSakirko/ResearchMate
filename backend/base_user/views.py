from knox.models import AuthToken
from rest_framework import generics, permissions
from rest_framework.response import Response

from .serializers import BaseUserSerializer, LoginSerializer, UserSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = BaseUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        base_user = serializer.save()
        _, token = AuthToken.objects.create(base_user.user)
        return Response(
            {"user": BaseUserSerializer(base_user, context=self.get_serializer_context()).data, "token": token}
        )


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        from researcher.models import Researcher
        from participant.models import Participant

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        user_data = BaseUserSerializer(user.baseuser, context=self.get_serializer_context()).data

        if Researcher.is_base_user_researcher(user.id):
            user_data.update({"type": "Researcher"})
        elif Participant.is_base_user_participant(user.id):
            user_data.update({"type": "Participant"})
        else:
            user_data.update({"type": "Unknown"})
        return Response(
            {
                "user": user_data,
                "token": token
            }
        )
