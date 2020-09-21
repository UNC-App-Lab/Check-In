# App Lab Check-In System

Visitors will enter their PID (or scan their OneCard) when they arrive. 
They'll submit their name, PID, and reason on the check-in page and then check out when they leave. 

Check-In App Page: http://app-lab-check-in.herokuapp.com/

Django Database: http://app-lab-check-in.herokuapp.com/admin/

Suggested IDE: Visual Studio Code

## Clone project
Clone project using HTTPS URL:

`git clone https://gitlab.com/unc-app-lab/check-in-backend.git`

`cd` to check-in-backend and `code .` to open in VS code

# Frontend for the App Lab Check-in System 

Frontend for the App Lab visitors check-in system using React and Javascript

After cloning project:

`npm install`

# Backend for the App Lab Check-in System 

Backend for the App Lab visitors check-in system using Django and Python

## Prequisites
1. Python
2. Pip
3. Postgres

## Installations

`cd backend`

`pip install pipenv`

`pipenv shell` & `cd backend` again

`pipenv install django`

## Run application (both Django database and React front-end)

Make sure you're in the backend directory that contains the `manage.py` file (`cd backend` from the root folder):

`python manage.py runserver`

## Local host addresses

After the commands and installations are completed correctly, you can view the web application, Django admin dashboard, and APIs on the following local host addresses:

Start the server: `python manage.py runserver`

Instance of front-end application: `http://localhost:8000`

Admin dashboard (database for checkins): `http://localhost:8000/admin` (ask App Lab staff for login credentials or view on Leadership Team Trello Useful Links)

Before accessing the API, install the `djangorestframework` and `django-cors-headers` using Pipev:
`pipenv install djangorestframework django-cors-headers`

API: `http://localhost:8000/api/checkins`

# Review Apps

 ## How to use Heroku Review Apps

 To see what your new changes will look like deployed, make a pull request on GitHub for the branch you are working on.

 In Heroku, under the pipeline tab in the checkin-prod project (you need to be added as a collaborator to access) your branch should be automatically deploying as a review app. Find out the name of your review app and make sure to add it to the `ALLOWED_HOSTS` list in the `backend/backend/settings.py` file.

 The review app name should look something like `checkin-prod-<branch_name>-<random_chars>`. 

 The url you need add to `ALLOWED_HOSTS` should therefore look like this: `"checkin-prod-<branch_name>-<random_chars>.herokuapp.com"`

 Commit and push these changes to your branch and then make sure you review app redeploys. You should now be able to click "Open App" to view your deployed branch.
