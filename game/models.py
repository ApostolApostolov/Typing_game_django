from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

#super User
# Kiro
# testing321


class wordPerMinute(models.Model):
    wpm = models.PositiveSmallIntegerField()
    date_posted = models.DateTimeField(default=timezone.now)
    player = models.ForeignKey(User, on_delete=models.CASCADE)

    