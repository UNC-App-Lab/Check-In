"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from checkin import views
from rest_framework import routers
from checkin.views import index

router = routers.DefaultRouter()                 
router.register(r'checkins', views.CheckinView, 'checkin')
# handler404 = 'checkin.views.view_404'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
    path("", index, name="index"),
    path('check-in/', index),
    path('check-out/', index),
    path('dashboard/', include('checkin.urls')),
    path('visitor-chart1/', views.visitor_chart1, name="visitor-chart1"),
    path('visitor-chart2/', views.visitor_chart2, name="visitor-chart2"),
    path('visitor-chart3/', views.visitor_chart3, name="visitor-chart3"),
    path('visitor-chart4/', views.visitor_chart4, name="visitor-chart4"),
    path('visitor-chart5/', views.visitor_chart5, name="visitor-chart5"),
    path('visitor-chart6/', views.visitor_chart6, name="visitor-chart6"),
    path('visitor-chart7/', views.visitor_chart7, name="visitor-chart7"),
    path('visitor-chart8/', views.visitor_chart8, name="visitor-chart8"),
    path('visitor-chart9/', views.visitor_chart9, name="visitor-chart9"),
    path('visitor-chart10/', views.visitor_chart10, name="visitor-chart10"),
    path('pid-to-name/', views.pid_to_name, name="pid-to-name"),
    path('checked-in/', views.checked_in, name="checked-in")
]

