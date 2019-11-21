import React from 'react';
import logo from '../AppLab.png';
import { NavLink } from 'react-router-dom';
import '../App.css';





const home = () => {
    return (
        <div>
            <div class="row">
                <div class="column">
                    <h1>  Welcome to the</h1>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div class="column">
                    <NavLink to="/check-in">
                        <button type="button">
                            Check In
                        </button>
                    </NavLink>
                    <br></br>
                    <NavLink to="/check-out">
                    <button type="button">
                            Check Out
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default home;