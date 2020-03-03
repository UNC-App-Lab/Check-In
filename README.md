# Check in System for the App Lab

People will scan their one card (or else manually enter their PID) when they arrive. 
They'll submit their name, PID, and reason on the check-in page and then check out when they leave. 

Suggested IDE: Visual Studio Code

## Clone project
Clone project using HTTPS URL:

`git clone https://gitlab.com/unc-app-lab/check-in-backend.git`

`cd` to check-in-backend and `code .` to open in VS code

# Frontend for the App Lab Check-in System 

Frontend for the App Lab visitors check-in system using React and Javascript

After cloning project:

`cd frontend`

`npm install`

# Backend for the App Lab Check-in System 

Backend for the App Lab visitors check-in system using Django and Python

## Prequisites
1. Python
2. Pip

## Installations

`cd backend`

`pip install pipenv`

`pipenv shell` & `cd backend` again

`pipenv install django`

## Run application (both Django database and React front-end)

`cd backend`

`python manage.py runserver`

## Local host addresses

After the commands and installations are completed correctly, you can view the web application, Django admin dashboard, and APIs on the following local host addresses:

Start the server: `python manage.py runserver`

Instance of front-end application: `http://localhost:8000`

Admin dashboard (database for checkins): `http://localhost:8000/admin` (ask App Lab staff for login credentials)

Before accessing the API, install the `djangorestframework` and `django-cord-headers` using Pipev:
`pipenv install djangorestframework django-cors-headers`

API: `http://localhost:8000/api/checkins`

