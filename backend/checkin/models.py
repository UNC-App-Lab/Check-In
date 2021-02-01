from django.db import models

# Create your models here.

class Checkin(models.Model):
    name = models.CharField(max_length=30)
    PID = models.CharField(max_length=9, blank=True)
    date = models.DateField(blank=True)           # YYYY-MM-DD format
    timeIn = models.TimeField()         # HH:MM[:ss[.uuuuuu]] format
    timeOut = models.TimeField(blank=True)        # HH:MM[:ss[.uuuuuu]] format
    reason = models.TextField()
    staff = models.CharField(max_length=150, blank=True)
    checkedIn = models.BooleanField(default=False)
    hasPID = models.BooleanField(default=True)
    firstTime = models.BooleanField(default=False)
    heard_about_al_through = models.CharField(max_length=400, blank=True)
    comments = models.TextField(blank=True)

    def _str_(self):
        return self.name
