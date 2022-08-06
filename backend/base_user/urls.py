from django.urls import include, path
from knox import views as knox_views

from .views import LoginAPI, RegisterAPI, UserAPI

urlpatterns = [
    path("auth", include("knox.urls")),
    path("auth/register", RegisterAPI.as_view()),
    path("auth/login", LoginAPI.as_view()),
    path("auth/user", UserAPI.as_view()),
    path("auth/logout", knox_views.LogoutView.as_view()),
]
