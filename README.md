# Check-In Data KPIs Dashboard

## Add new KPI to Dashboard Page

1) Define new function in backend/checkin/views.py (model off of the existing visitor_chart functions)

2) In checkin/templates directory, create a new file named KPI#.js (e.g., KPI2.js) with jquery function to render the chart (make sure to set `var $visitorChart` equal to `$("#visitor-chart#")`, e.g. `var $visitorChart = $("#visitor-chart2");`)

3) In checkin/templates/dashboard.html, add the script src for this file under the existing scripts within head element: `<script src="{% static 'KPI2.js' %}"></script>`

4) In dashboard.html, insert new container div within body element, similar to the existing containers: 

`<div id="container2" style="width: 40%;">

    <canvas id="visitor-chart2" data-url="{% url 'visitor-chart2' %}"></canvas>

</div>`

5) In backend/backend/urls.py file, insert a path for the chart's data: `path('visitor-chart2/', views.visitor_chart2, name="visitor-chart2")`

## (Older method, Ignore) Create new KPI page

You can find the KPI listing page at `https://applab-checkin.herokuapp.com/kpi`

Create a new branch for you to begin working on a KPI.

To create a new KPI, go to the `KPIs` folder (`src/KPIs)` and create a new javascript file (model this file after existing KPI pages).

To create a url route for your new page, go to App.js in the root folder, and import your component at the top of the file. 

eg. `import KPI1 from './KPIs/KPI-1';`

Then, inside the `<Switch>` component, add a new route for your KPI.

eg.  `<Route path="/kpi-1" component={KPI1}/>`

Next, add your KPI page to `backend/backend/urls.py` by adding an additional url pattern to the list:
eg. `path('kpi-1/', index)`

Lastly, add your new KPI page to the KPI Listings page. To do so, go to the `KPIs` folder and open `KPI-Listings.js`. Add a new nav link to your page.

eg: `<NavLink to="/kpi-1"> KPI 1 </NavLink>`
