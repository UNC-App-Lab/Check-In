from django.contrib import admin
from .models import Checkin

class CheckinAdmin(admin.ModelAdmin):  
      list_display = ('name', 'date', 'PID', 'timeIn', 'timeOut', 'reason', 'checkedIn', 'staff', 'comments') 

# Register your models here.
admin.site.register(Checkin, CheckinAdmin)