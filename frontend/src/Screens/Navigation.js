import React from 'react';
import '../App.css';

 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Home</NavLink>
          {/* <NavLink to="/check-in">Check In</NavLink>
          <NavLink to="/contact">Check Out</NavLink> */}
       </div>
    );
}
 
export default Navigation;
