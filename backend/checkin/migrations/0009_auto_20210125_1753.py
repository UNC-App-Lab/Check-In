# Generated by Django 3.1.1 on 2021-01-25 22:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checkin', '0008_auto_20210125_1739'),
    ]

    operations = [
        migrations.RenameField(
            model_name='checkin',
            old_name='heard_through',
            new_name='heard_about_al_through',
        ),
    ]