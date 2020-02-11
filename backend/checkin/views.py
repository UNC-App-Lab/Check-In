from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework import viewsets          
from .serializers import CheckinSerializer      
from .models import Checkin                     

class CheckinView(viewsets.ModelViewSet):       
    serializer_class = CheckinSerializer          
    queryset = Checkin.objects.all()          

@api_view(["POST", "GET"])
def index(request):
    return render(request, "build/index.html", {})
    
@api_view(["POST", "GET"])
def view_404(request, exception=None):
    return redirect ('/')