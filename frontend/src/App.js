import React from 'react';
import logo from './AppLab.png';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Link to="/">Home</Link>
          </ul>
        </nav>

        <Switch>
          <Route path="/check-in">
            <CheckIn />
          </Route>
          <Route path="/check-out">
            <CheckOut />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <div class="row">
        <div class="column">
          <h1>  Welcome to the</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div class="column">
          <Link to="/check-in">
            <button type="button">
              Check In
            </button>
          </Link>
          <br></br>
          <Link to="/check-out">
            <button type="button">
              Check Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckIn() {
  return (
    <div class="checkin">
      <h2>Check In</h2>
      <form>
        <div class="textbox">
          <label>
            PID:
          <input type="text" name="pid" />
          </label>
        </div>
        <div class="textbox">
          <label>
            Reason:
          <input type="text" name="reason" />
          </label>
        </div>
        <input class="submit" type="submit" value="Submit" onclick="SubmitCheckIn()"/>
      </form>
    </div>
  );
}

function CheckOut() {
  return <h2>Check Out</h2>;
}

function SubmitCheckIn(){

}
