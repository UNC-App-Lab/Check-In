# Generated by Django 3.1.1 on 2020-09-22 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checkin', '0004_auto_20200916_1450'),
    ]

    operations = [
        migrations.AddField(
            model_name='checkin',
            name='hasPID',
            field=models.BooleanField(default=True),
        ),
    ]