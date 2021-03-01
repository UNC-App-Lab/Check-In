from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework import viewsets          
from .serializers import CheckinSerializer      
from .models import Checkin     
from rest_framework.decorators import api_view  
from django.http import JsonResponse
from django.core import serializers       
from django.db.models import Count, DateField, Sum, F, Min
from django.db.models.functions import TruncWeek, ExtractHour, ExtractMinute
from datetime import datetime, date, timedelta  
from functools import reduce

class CheckinView(viewsets.ModelViewSet):       
    serializer_class = CheckinSerializer          
    queryset = Checkin.objects.all()          

@api_view(["POST", "GET"])
def index(request):
    return render(request, "build/index.html", {})

@api_view(["POST", "GET"])
def view_404(request, exception=None):
    return redirect ('/')

# Visitors Per Week Chart
def visitor_chart(request):
    labels = []
    data = []

    oldestWeek = Checkin.objects.earliest('date')
    currWeek = Checkin.objects.latest('date')

    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    dates = set()
    for week in daterange(getattr(oldestWeek, 'date'), getattr(currWeek, 'date')):
        start = week - timedelta(days=week.weekday())
        dates.add(start)
    
    dates = sorted(list(dates))

    queryset = Checkin.objects.annotate(weekstart = TruncWeek('date')).values('weekstart').annotate(count = Count('id')).order_by('weekstart')
    queryData = queryset.values('weekstart', 'count')

    finalSet = []
    for d in dates:
        finalCount = 0
        for val in queryData:
            if val['weekstart'] == d:
                finalCount = val['count']
        finalSet.append({'weekstart': d, 'count' : finalCount})

    for entry in finalSet:
        labels.append(entry['weekstart'])
        data.append(entry['count'])
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# Visitor Hours per Week Chart
def visitor_chart2(request):
    labels = []
    data = []

    oldestWeek = Checkin.objects.earliest('date')
    currWeek = Checkin.objects.latest('date')

    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    dates = set()
    for week in daterange(getattr(oldestWeek, 'date'), getattr(currWeek, 'date')):
        start = week - timedelta(days=week.weekday())
        dates.add(start)

    dates = sorted(list(dates))

    queryset = Checkin.objects.all().annotate(durationDiff=F('timeOut') - F('timeIn'), duration=(ExtractHour('durationDiff')*60+ExtractMinute('durationDiff')), weekstart = TruncWeek('date')).values('weekstart').annotate(sumHours = Sum('duration')).order_by('weekstart')
    queryData = queryset.values('weekstart', 'sumHours')
    
    finalSet = []
    for d in dates:
        hours = 0
        for val in queryData:
            if val['weekstart'] == d:
                hours = val['sumHours']
        finalSet.append({'weekstart': d, 'sumHours' : hours})

    for entry in finalSet:
        labels.append(entry['weekstart'])
        data.append(entry['sumHours'] / 60)

    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# Visitors Per Week by Semester Line Chart
def visitor_chart4(request):

    # Set up objects to return for graphing
    labels = []
    for x in range(1, 17):
        labels.append("Week " + str(x))
    
    data = []
    # each semester will be a map that looks like this that is added to data array:
    # { 
    #     data: [86,114,106,106,107,111,133,221,783,2478],
    #     label: "Africa",
    #     borderColor: "#3e95cd",
    #     fill: false
    # }

    # Helper time series function
    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    # Function for each semester
    def addSem(startDate, endDate, dataIndex):
        # create set of all start dates between semester start and end
        dates = set()
        for week in daterange(startDate, endDate):
            start = week - timedelta(days=week.weekday())
            dates.add(start)
        dates = sorted(list(dates))
        # get count per week in queryData (unordered set)
        queryset = Checkin.objects.annotate(weekstart = TruncWeek('date')).values('weekstart').annotate(count = Count('id')).order_by('weekstart')
        queryData = queryset.values('weekstart', 'count')
        # put count per week (in sequential order) in data array that will be returned
        finalSet = []
        for d in dates:
            finalCount = 0
            for val in queryData:
                if val['weekstart'] == d:
                    finalCount = val['count']
            finalSet.append({'weekstart': d, 'count' : finalCount})
        for x in finalSet:
            data[dataIndex]['data'].append(x['count'])
        # didn't start using check-in app till week 7 in Spring 2020
        if (dataIndex == 0):
            for x in range (0,7):
                data[0]['data'][x] = None
        # only 14 weeks instead of 16 in Fall 2020 so remove last two data points for that semester
        if (dataIndex == 1):
            data[dataIndex]['data'].pop()
            data[dataIndex]['data'].pop()
        # 3/1/21 is week 7 of Spring 2021 (remove weeks after that for now)
        if (dataIndex == 2):
            for x in range(8, 17):
                data[2]['data'].pop()
    
    # Spring 2020: Thurs. Jan 9 - Fri. April 24 (16 weeks)
    data.append({
        'data': [],
        'label': "Spring 2020",
        'borderColor': "#3e95cd",
        'fill': 'false',
        'lineTension': 0
    })
    # filter timeframe for semester dates
    startDate = datetime.strptime('2020-01-09', '%Y-%m-%d').date()
    endDate = datetime.strptime('2020-04-24', '%Y-%m-%d').date()
    addSem(startDate, endDate, 0)
    
    # Fall 2020: Mon. Aug 17 - Tues. Nov 17 (14 weeks)
    data.append({
        'data': [],
        'label': "Fall 2020",
        'borderColor': "#8e5ea2",
        'fill': 'false',
        'lineTension': 0
    }) 
    startDate = datetime.strptime('2020-08-17', '%Y-%m-%d').date()
    endDate = datetime.strptime('2020-11-17', '%Y-%m-%d').date()
    addSem(startDate, endDate, 1)

    # Spring 2021: Tues. Jan 19 - Wed. May 5 (16 weeks)
    data.append({
        'data': [],
        'label': "Spring 2021",
        'borderColor': "#3cba9f",
        'fill': 'false',
        'lineTension': 0
    }) 
    startDate = datetime.strptime('2021-01-19', '%Y-%m-%d').date()
    endDate = datetime.strptime('2021-05-05', '%Y-%m-%d').date()
    addSem(startDate, endDate, 2)

    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

    # suggested colors for future semesters: #e8c3b9, #c45850


# Visits per Weekday Chart
def visitor_chart6(request):
    labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    data = [0, 0, 0, 0, 0]

    # Get all the data
    queryset = Checkin.objects.all()

    # Iterate over all the dates
    for entry in queryset.values("date"):
        # Get the raw datetime object from the entry
        dateObj = list(entry.values())[0]
        # Get the weekday, where 0 is monday and 6 is sunday
        weekdayIndex = dateObj.weekday()
        # Nobody checks in on weekends
        if (weekdayIndex == 5 or weekdayIndex == 6):
            continue
        data[weekdayIndex] += 1
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# Visits per Weekday-Hour Heatmap Chart
def visitor_chart7(request):
    label = "Visitors per Hour"
    day_strings = {
        1: "Sunday",
        2: "Monday",
        3: "Tuesday",
        4: "Wednesday",
        5: "Thursday",
        6: "Friday",
        7: "Saturday"
    }
    days = {}
    data = {}
    hour_list = set()
    for day in range(1, 8):
        hour_dict = {}
        day_name = day_strings[day]
        queryset = Checkin.objects.filter(date__week_day=day).annotate(startHour=ExtractHour('timeIn'), endHour=ExtractHour('timeOut')).values('startHour', 'endHour')
        for entry in queryset:
            for i in range(entry['startHour'], entry['endHour'] + 1):
                hour_list.add(i)
                if i in hour_dict:
                    hour_dict[i] += 1
                else:
                    hour_dict[i] = 1

        data[day] = hour_dict
    for hour_dict in data.values():
        for hour in hour_list:
            if not hour in hour_dict:
                hour_dict[hour] = 0

    return JsonResponse(data={
        'label': label,
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
