from django.urls import path

from . import views 
from .views import(wordPerMinute)

urlpatterns = [
    path('', views.home, name='typing-game-main'),
    path('typing-tutor', views.typing_tutor, name='typing-game-actual'),
    path('typing-tutor-stat', views.statistic, name='typing-game-stat'),
    path('typing-tutor-stat-test', wordPerMinute.as_view(), name='typing-game-stat'),
    
]
