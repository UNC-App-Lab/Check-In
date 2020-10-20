from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_with_checkin, name='dashboard_with_checkin'),
    path('data', views.checkin_data, name='checkin_data')
    # path('visitor-chart', views.visitor_chart, name='visitor-chart'),
    # path('visitor-chart2', views.visitor_chart2, name='visitor-chart2')
]