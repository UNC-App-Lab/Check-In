import React from 'react';
import '../App.css';

 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Home</NavLink>
       </div>
    );
}
 
export default Navigation;
