from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import CheckinSerializer      
from .models import Checkin 
                    

class CheckinView(viewsets.ModelViewSet):       
    serializer_class = CheckinSerializer          
    queryset = Checkin.objects.all()          

def index(request):
    return render(request, "build/index.html")    




