from django.shortcuts import render
from .models import wordPerMinute
from django.views.generic import (ListView)
# Create your views here.



def home(request):
    return render(request, 'game/home.html') 

def typing_tutor(request):
    return render(request, 'game/typing_tutor.html') 

def statistic(request):
    context = {
        'wordPerMinute': wordPerMinute.objects.all()
    }
    return render(request, "game/statistics.html", context)

class wordPerMinute(ListView):
    model = wordPerMinute
    template_name = "game/statistics.html"
    context_object_name = 'wordPerMinute'
    ordering = ['-wpm']
    # paginate_by = 50