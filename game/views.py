from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'game/home.html') 

def typing_tutor(request):
    return render(request, 'game/typing_tutor.html') 