# Generated by Django 3.1.1 on 2020-09-16 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checkin', '0003_auto_20200128_1724'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkin',
            name='PID',
            field=models.CharField(blank=True, max_length=9),
        ),
    ]
