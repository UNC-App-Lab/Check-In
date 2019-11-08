# Check in System for the App Lab

People will scan their one card (or else manually enter their PID) when they arrive. They'll see App Lab rules/guidelines as well as some possibilities for what to do when they're there.

Suggested IDE: Visual Studio Code

## Clone project
Clone project using HTTPS URL:

`git clone https://gitlab.com/unc-app-lab/check-in-backend.git`

# Frontend for the App Lab Check-in System 

Frontend for the App Lab visitors check-in system using React and Javascript

After cloning project run:

`npm install`

To run locally:

`cd frontend`

`npm start`

# Backend for the App Lab Check-in System 

Backend for the App Lab visitors check-in system using Django and Python

`cd check-in-backend`

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

