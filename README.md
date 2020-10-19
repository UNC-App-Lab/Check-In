# App Lab Check-In System

Visitors will enter their PID (or scan their OneCard) when they arrive. 
They'll submit their name, PID, and reason on the check-in page and then check out when they leave. 

Check-In App Page: http://app-lab-check-in.herokuapp.com/

Django Database: http://app-lab-check-in.herokuapp.com/admin/

Suggested IDE: Visual Studio Code

After cloning project:

`npm install`

# Backend for the App Lab Check-in System 

Backend for the App Lab visitors check-in system using Django and Python

## Prequisites
1. Python 3.7.4
2. Pip
3. Postgres

## Installations

`cd backend`

`pip install pipenv`

`pipenv shell` & `cd backend` again

`pipenv install django`

1. If you see an error installing psycopg2, install postgres via homebrew and expose the source header files by modifying LDFLAGS and CPPFLAGS env vars (https://github.com/pypa/pipenv/issues/3991): run `export LDFLAGS="-L/usr/local/opt/openssl/lib"` and `export CPPFLAGS="-I/usr/local/opt/openssl/include"`

## Additional Instructions

(Without these instructions, you will likely see the following error when trying to run the server: `django.db.utils.OperationalError: FATAL:  role "applab" does not exist`)

1. Make sure that Python and Postgres are added to Environment/Path Variables - the commands `python --version` and `psql postgres` or `psql -U postgres` should work on the command line. 
2. On the terminal (doesn't have to be within the repository), run `psql postgres` or `psql -U postgres`. 
3. Within postgres, run the commands `CREATE USER applab;` and `CREATE DATABASE checkindb;`.
4. Back within the repository and backend directory that contains the `manage.py` file (`cd backend` from the root folder), run `python manage.py migrate`.
5. In the same backend directory, run `python manage.py createsuperuser`. This command creates a superuser account to access the Django admin interface locally - make sure to remember the credentials (suggested username and password are `applab`), and the email can be left blank. 

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

# Check-In Data KPIs Dashboard

 ## Add new KPI to Dashboard Page

1) Define new function in backend/checkin/views.py (model off of the existing visitor_chart functions)

2) In checkin/templates directory, create a new file named KPI#.js (e.g., KPI2.js) with jquery function to render the chart (make sure to set `var $visitorChart` equal to `$("#visitor-chart#")`, e.g. `var $visitorChart = $("#visitor-chart2");`)

3) In checkin/templates/dashboard.html, add the script src for this file under the existing scripts within head element: `<script src="{% static 'KPI2.js' %}"></script>`

4) In dashboard.html, insert new container div within body element, similar to the existing containers: 

`<div id="container2" style="width: 40%;"> <canvas id="visitor-chart2" data-url="{% url 'visitor-chart2' %}"></canvas> </div>`

5) In backend/backend/urls.py file, insert a path for the chart's data: `path('visitor-chart2/', views.visitor_chart2, name="visitor-chart2")`

6) Run `python manage.py collectstatic --noinput --clear` in outer backend folder before `python manage.py runserver` to refresh static files 

## (Older method, Ignore) Create new KPI page

You can find the KPI listing page at `https://applab-checkin.herokuapp.com/kpi`

Create a new branch for you to begin working on a KPI.

To create a new KPI, go to the `KPIs` folder (`src/KPIs)` and create a new javascript file (model this file after existing KPI pages).

To create a url route for your new page, go to App.js in the root folder, and import your component at the top of the file. 

eg. `import KPI1 from './KPIs/KPI-1';`

eg: `<NavLink to="/kpi-1"> KPI 1 </NavLink>`
