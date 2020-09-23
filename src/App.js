import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Screens/Home';
import CheckIn from './Screens/CheckIn';
import CheckOut from './Screens/CheckOut';
import Navigation from './Screens/Navigation';

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
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;