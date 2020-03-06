import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Screens/Home';
import CheckIn from './Screens/CheckIn';
import CheckOut from './Screens/CheckOut';
import Navigation from './Screens/Navigation';
import KPIListings from './KPIs/KPI-Listings';
import KPI1 from './KPIs/KPI-1';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/check-in" component={CheckIn}/>
             <Route path="/check-out" component={CheckOut}/>
             <Route path="/kpi" component={KPIListings}/>
             <Route path="/kpi-1" component={KPI1}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;