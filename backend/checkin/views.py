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

# Visitors Per Week by Semester Line Chart
def visitor_chart1(request):

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
        # didn't start using check-in app till week 8 in Spring 2020
        if (dataIndex == 0):
            for x in range (0,7):
                data[0]['data'][x] = None

        # Find the week are currently in, and place that in the chart. 
        remainingWeeks = findRemainingWeeks(); 

        # 8/23/21 is week 1 of Fall 2021 (remove weeks after that for now)
        # Change the range (1st parameter) each week to add next data point
        if (dataIndex == 3):
            for x in range(remainingWeeks, 17):
                data[3]['data'].pop()
    
    # Spring 2020: Thurs. Jan 9 - Fri. April 24 (16 weeks)
    data.append({
        'data': [],
        'label': "Spring 2020",
        'borderColor': "#3e95cd",
        'fill': 'false',
        'lineTension': 0
    })
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

    # Fall 2021: Wed. Aug 18 - Wed. Dec 1 (16 weeks)
    data.append({
        'data': [],
        'label': "Fall 2021",
        'borderColor': "#e8c3b9",
        'fill': 'false',
        'lineTension': 0
    }) 
    startDate = datetime.strptime('2021-08-18', '%Y-%m-%d').date()
    endDate = datetime.strptime('2021-12-01', '%Y-%m-%d').date()
    addSem(startDate, endDate, 3)

    # CHANGE DATES ACCORDINGLY
    # Spring 2022: Wed. Aug 18 - Wed. Dec 1 (16 weeks)
    # data.append({
    #     'data': [],
    #     'label': "Spring 2022",
    #     'borderColor': "#c45850",
    #     'fill': 'false',
    #     'lineTension': 0
    # }) 
    # CHANGE DATES IN NEXT 2 LINES:
    # startDate = datetime.strptime('2021-08-18', '%Y-%m-%d').date()
    # endDate = datetime.strptime('2021-12-01', '%Y-%m-%d').date()
    # addSem(startDate, endDate, 4)

    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# Visitor Hours Per Week by Semester Line Chart
def visitor_chart2(request):
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
        # get total hours per week in queryData (unordered set)
        queryset = Checkin.objects.all().annotate(durationDiff=F('timeOut') - F('timeIn'), duration=(ExtractHour('durationDiff')*60+ExtractMinute('durationDiff')), weekstart = TruncWeek('date')).values('weekstart').annotate(sumHours = Sum('duration')).order_by('weekstart').annotate(timeOut=F('timeOut')).exclude(timeOut='00:00:00')
        queryData = queryset.values('weekstart', 'sumHours')
        # put hours per week (in sequential order) in data array that will be returned
        finalSet = []
        for d in dates:
            hours = 0
            for val in queryData:
                if val['weekstart'] == d:
                    hours = val['sumHours']
            finalSet.append({'weekstart': d, 'sumHours' : hours})
        for x in finalSet:
            data[dataIndex]['data'].append(x['sumHours'] / 60)
        # didn't start using check-in app till week 8 in Spring 2020
        if (dataIndex == 0):
            for x in range (0,7):
                data[0]['data'][x] = None

        remainingWeeks = findRemainingWeeks()

        # 8/23/21 is week 1 of Fall 2021 (remove weeks after that for now)
        # Increment the range (1st parameter) each week to add next data point
        if (dataIndex == 3):
            # Update with every request. 
            for x in range(remainingWeeks, 17):
                data[3]['data'].pop()
    
    # Spring 2020: Thurs. Jan 9 - Fri. April 24 (16 weeks)
    data.append({
        'data': [],
        'label': "Spring 2020",
        'borderColor': "#3e95cd",
        'fill': 'false',
        'lineTension': 0
    })
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

    # Fall 2021: Wed. Aug 18 - Wed. Dec 1 (16 weeks)
    data.append({
        'data': [],
        'label': "Fall 2021",
        'borderColor': "#e8c3b9",
        'fill': 'false',
        'lineTension': 0
    }) 
    startDate = datetime.strptime('2021-08-18', '%Y-%m-%d').date()
    endDate = datetime.strptime('2021-12-01', '%Y-%m-%d').date()
    addSem(startDate, endDate, 3)

    # CHANGE DATES ACCORDINGLY
    # Spring 2022: Tues. Jan 19 - Wed. May 5 (16 weeks)
    # data.append({
    #     'data': [],
    #     'label': "Spring 2022",
    #     'borderColor': "#c45850",
    #     'fill': 'false',
    #     'lineTension': 0
    # }) 
    # CHANGE DATES IN NEXT 2 LINES:
    # startDate = datetime.strptime('2021-01-19', '%Y-%m-%d').date()
    # endDate = datetime.strptime('2021-05-05', '%Y-%m-%d').date()
    # addSem(startDate, endDate, 4)

    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# Visitors Per Week Bar Chart
def visitor_chart3(request):
    labels = []
    data = []

    oldestWeek = Checkin.objects.earliest('date')
    currWeek = date.today()

    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    dates = set()
    for week in daterange(getattr(oldestWeek, 'date'), currWeek):
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

# Visitor Hours Per Week Bar Chart
def visitor_chart4(request):
    labels = []
    data = []

    oldestWeek = Checkin.objects.earliest('date')
    currWeek = date.today()

    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    dates = set()
    for week in daterange(getattr(oldestWeek, 'date'), currWeek):
        start = week - timedelta(days=week.weekday())
        dates.add(start)

    dates = sorted(list(dates))

    queryset = Checkin.objects.all().annotate(durationDiff=F('timeOut') - F('timeIn'), duration=(ExtractHour('durationDiff')*60+ExtractMinute('durationDiff')), weekstart = TruncWeek('date')).values('weekstart').annotate(sumHours = Sum('duration')).order_by('weekstart').annotate(timeOut=F('timeOut')).exclude(timeOut='00:00:00')
    
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

# Visitors per Weekday by Semester Grouped Bar Chart
def visitor_chart5(request):
    # Set up objects to return for graphing
    labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    
    data = []
    # each semester will be a map that looks like this that is added to data array:
    # {
    #   label: "Africa",
    #   backgroundColor: "#3e95cd",
    #   data: [133,221,783,2478]
    # }

    # Helper time series function
    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)

    # Function for each semester
    def addSem(startDate, endDate, dataIndex):

        # filter queryset to get all dates within semester
        # go through each entry and get weekday
        # increment index of data array corresponding to weekday

        # create set with all dates between semester start and end
        dates = set()
        for d in daterange(startDate, endDate):
            dates.add(d)

        # Get all the data
        queryset = Checkin.objects.all()

        weekdayData = [0,0,0,0,0]
        # Iterate over all checkins and increment respective index for that weekday if date is within semester
        for entry in queryset.values("date"):
            if (entry['date'] in dates):
                # Get the raw datetime object from the entry
                dateObj = list(entry.values())[0]
                # Get the weekday, where 0 is monday and 6 is sunday
                weekdayIndex = dateObj.weekday()
                # Nobody checks in on weekends
                if (weekdayIndex == 5 or weekdayIndex == 6):
                    continue
                weekdayData[weekdayIndex] += 1
        data[dataIndex]['data'] = weekdayData
    
    # Spring 2020: Thurs. Jan 9 - Fri. April 24 (16 weeks)
    data.append({
        'data': [],
        'label': "Spring 2020",
        'backgroundColor': "#3e95cd"
    })
    startDate = datetime.strptime('2020-01-09', '%Y-%m-%d').date()
    endDate = datetime.strptime('2020-04-24', '%Y-%m-%d').date()
    addSem(startDate, endDate, 0)
    
    # Fall 2020: Mon. Aug 17 - Tues. Nov 17 (14 weeks)
    data.append({
        'data': [],
        'label': "Fall 2020",
        'backgroundColor': "#8e5ea2"
    }) 
    startDate = datetime.strptime('2020-08-17', '%Y-%m-%d').date()
    endDate = datetime.strptime('2020-11-17', '%Y-%m-%d').date()
    addSem(startDate, endDate, 1)

    # Spring 2021: Tues. Jan 19 - Wed. May 5 (16 weeks)
    data.append({
        'data': [],
        'label': "Spring 2021",
        'backgroundColor': "#3cba9f"
    }) 
    startDate = datetime.strptime('2021-01-19', '%Y-%m-%d').date()
    endDate = datetime.strptime('2021-05-05', '%Y-%m-%d').date()
    addSem(startDate, endDate, 2)

    # Fall 2021: Wed. Aug 18 - Wed. Dec 1 (16 weeks)
    data.append({
        'data': [],
        'label': "Fall 2021",
        'backgroundColor': "#e8c3b9"
    }) 
    startDate = datetime.strptime('2021-08-18', '%Y-%m-%d').date()
    endDate = datetime.strptime('2021-12-01', '%Y-%m-%d').date()
    addSem(startDate, endDate, 3)

    # CHANGE DATES
    # Spring 2022: Tues. Jan 19 - Wed. May 5 (16 weeks)
    # data.append({
    #     'data': [],
    #     'label': "Spring 2022",
    #     'backgroundColor': "#c45850"
    # }) 
    # CHANGE DATES IN NEXT 2 LINES:
    # startDate = datetime.strptime('2021-01-19', '%Y-%m-%d').date()
    # endDate = datetime.strptime('2021-05-05', '%Y-%m-%d').date()
    # addSem(startDate, endDate, 4)

    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# Visits per Weekday (Aggregate) Bar Chart
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

# New vs. Repeat Visitors per Week Grouped Bar Chart 
def visitor_chart7(request):
    startDate = datetime.strptime('2021-02-01', '%Y-%m-%d').date()
    endDate = date.today()

    # helper time series function
    def daterange(date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)
    
    # create ordered list with all week start dates between semester start and end
    dates = set()
    for week in daterange(startDate, endDate):
        start = week - timedelta(days=week.weekday())
        dates.add(start)
    dates = sorted(list(dates))
    
    # Set up objects to return for graphing
    labels = dates
    data = [
        {
        'label': "New",
        'backgroundColor': "#FFA500",
        'data': [0] * len(dates)
        },
        {
        'label': "Repeat",
        'backgroundColor': "#1C74AF",
        'data': [0] * len(dates)
        }
    ] 
    
    queryset = Checkin.objects.annotate(weekstart = TruncWeek('date')).order_by('weekstart')

    for entry in queryset.values():
        for i in range(0, len(dates)):
            if (dates[i] == entry['weekstart']):
                if (entry['firstTime']):
                    data[0]['data'][i] += 1
                else:
                    data[1]['data'][i] += 1
                break
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# How New Visitors are Hearing About AL Bar Chart
def visitor_chart8(request):
    queryset = Checkin.objects.all()

    labels = ["Poster", "Friend", "Class", "Club", "Department", "Facebook", "Instagram", "Slack", "Website", "Web Search", "Other"]
    data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for entry in queryset.values("heard_about_al_through"):
        method = entry['heard_about_al_through']
        if (method != ""):
            if (method == 'Flyer' or method == 'Poster' or method == 'Sign in CS Building'):
                data[0] += 1
            elif (method == 'Friend' or method == 'Word of Mouth'):
                data[1] += 1
            elif (method == 'Class Announcement' or method == 'Email (Class)'):
                data[2] += 1
            elif (method == 'Club Announcement' or method == 'Email (Club)' or method == 'Newsletter (Club)' or method == 'WICS'):
                data[3] += 1
            elif (method == 'Email (Department)' or method == 'CS Newsletter' or method == 'Newsletter (Department)' or method == 'Department Announcement'):
                data[4] += 1
            elif (method == 'Facebook'):
                data[5] += 1
            elif (method == 'Instagram'):
                data[6] += 1
            elif (method == 'Slack' or method == 'App Lab Slack'):
                data[7] += 1
            elif (method == 'Website' or method == 'App Lab Website'):
                data[8] += 1
            elif (method == 'Web Search' or method == 'Google'):
                data[9] += 1
            else:
                data[10] += 1
    
    return JsonResponse(data={
        'labels': labels,
        'data': data
    })

# Visits per Weekday-Hour by Semester Heatmap
def visitor_chart9(request):
    label = "Visitors per Hour"
    dayStrings = {
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
        day_name = dayStrings[day]
        # Filters date range for Fall 2021 semester: Aug 18 - Dec 1
        queryset = Checkin.objects.filter(date__range=["2021-08-18", "2021-12-01"]).filter(date__week_day=day).annotate(startHour=ExtractHour('timeIn'), endHour=ExtractHour('timeOut')).values('startHour', 'endHour')
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

# Visits per Weekday-Hour (Aggregate) Heatmap
def visitor_chart10(request):
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

def dashboard_with_checkin(request):
    return render(request, 'dashboard.html')

def checkin_data(request):
    dataset = Checkin.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)

# Finds the number of weeks remaining in the year. 
def findRemainingWeeks():
    startDate = datetime.strptime('2021-08-18', '%Y-%m-%d').date()
    endDate = date.today()
    return 16 - round((endDate - startDate).days / 7)