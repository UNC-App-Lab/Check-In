from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework import viewsets          
from .serializers import CheckinSerializer      
from .models import Checkin     
from rest_framework.decorators import api_view  
from django.http import JsonResponse
from django.core import serializers       
from django.db.models import Count, DateField, Sum, F
from django.db.models.functions import TruncWeek, ExtractHour, ExtractMinute
from datetime import datetime       

class CheckinView(viewsets.ModelViewSet):       
    serializer_class = CheckinSerializer          
    queryset = Checkin.objects.all()          

@api_view(["POST", "GET"])
def index(request):
    return render(request, "build/index.html", {})

@api_view(["POST", "GET"])
def view_404(request, exception=None):
    return redirect ('/')

def visitor_chart(request):
    labels = []
    data = []

    queryset = Checkin.objects.annotate(weekstart = TruncWeek('date')).values('weekstart').annotate(count = Count('id')).order_by('weekstart')
    for entry in queryset:
        labels.append(entry['weekstart'])
        data.append(entry['count'])
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

def visitor_chart2(request):
    labels = []
    data = []

    # oldestWeek = TruncWeek(min(Checkin.objects.values('date')))
    # currWeek = datetime.date.today()

    #queryset = Checkin.objects.annotate(totalTime = F('timeOut') - F('timeIn'))
    queryset = Checkin.objects.annotate(durationDiff=F('timeOut') - F('timeIn'), duration=(ExtractHour('durationDiff')*60+ExtractMinute('durationDiff')), weekstart = TruncWeek('date')).values('weekstart').annotate(sumHours = Sum('duration')).order_by('weekstart')
    # annotate: timeOut - timeIn = time
    # sum of time, group by weekstart
    # weekstart on x axis, sum on y

    for entry in queryset:
        labels.append(entry['weekstart'])
        data.append(entry['sumHours'] / 60)
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

def visitor_chart10(request):
    labels = []
    data = []

    queryset = Checkin.objects.values('name')
    #queryset = Checkin.objects.values('date').annotate(visitor_count=Count('date')).order_by('date')
    for entry in queryset:
        labels.append(entry['name'])
        data.append(2)
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

def dashboard_with_checkin(request):
    return render(request, 'dashboard.html')

def checkin_data(request):
    dataset = Checkin.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)