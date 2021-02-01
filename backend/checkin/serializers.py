from rest_framework import serializers
from .models import Checkin

class CheckinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checkin
        fields = ('id', 'name', 'PID', 'date', 'timeIn', 'timeOut', 'reason', 'staff', 'checkedIn', 'hasPID', 'firstTime', 'heard_about_al_through', 'comments')