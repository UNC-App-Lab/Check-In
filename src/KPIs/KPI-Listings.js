import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const listings = () => {
    return (
        <div>
            <br></br>
            <NavLink to="/kpi-1">
                KPI 1
            </NavLink>
        </div>
    );
}

export default listings;