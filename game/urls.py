from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='typing-game-main'),
    path('typing-tutor', views.typing_tutor, name='typing-game-actual'),
]