# Backend for the App Lab Check-in System 

Backend repository for the App Lab visitors check-in system using Django and Python

## Clone project
Clone project using HTTPS URL:

`git clone https://gitlab.com/unc-app-lab/check-in-backend.git`

Suggested IDE: Visual Studio Code

`cd <check-in-backend directory>`

`code .` to open in VS Code

## Prequisites
1. Python
2. Pip

## Installations

`pip install pipenv`

`pipenv shell`

`pipenv install django`

## Run Django application

`cd backend`

`python manage.py runserver`

## Local host addresses

After the commands and installations are completed correctly, you can view the Django application, admin dashboard, and APIs on the following local host addresses:

Start the server: `python manage.py runserver`

Instance of Django application: `http://localhost:8000`

Admin dashboard (database for checkins): `http://localhost:8000/admin` (ask App Lab staff for login credentials)

Before accessing the API, install the `djangorestframework` and `django-cord-headers` using Pipev:
`pipenv install djangorestframework django-cors-headers`

API: `http://localhost:8000/api/checkins`

-

