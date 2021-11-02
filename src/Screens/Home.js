import React, { useEffect, useState } from 'react';
import axios from "axios";
import logo from '../AppLab.png';
import { NavLink, useHistory } from 'react-router-dom';
import { csrfToken } from '../Utilities/csrfUtils';
import { confirmAlert } from 'react-confirm-alert';
import '../App.css';
import { checkUserOut } from '../Utilities/checkoutUtils';

const Home = () => {
    const [typed, setTyped] = useState(Array(9).fill(null));
    const history = useHistory();

    const successfulCheckout = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui" class="dialogdiv">
              <h1>Checked Out!</h1>
              <button class="dialog" style={{width: "100%", height: "3em"}} onClick={onClose}>
                Close
              </button>
            </div>
          );
        },
        closeOnEscape: true,
        closeOnClickOutside: true,
      });
    }

    const handleKeyPress = (e) => {
      if (e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA")
        return;
      if (e.target.isContentEditable) return;

      const newArray = typed.slice(1, 9);
      newArray.push(String.fromCharCode(e.keyCode));

      if (newArray.every((x) => !isNaN(parseInt(x)))) {
        setTyped(Array(9).fill(null));
        const pid = newArray.join("");
        axios({
          method: "POST",
          url: "/checked-in/",
          headers: { "X-CSRFToken": csrfToken },
          data: {
            pid: pid,
          },
        }).then((response) => {
          if (!response.data.name) {
            history.push({
                pathname: '/check-in',
                state: {
                    pid: pid
                }
            });
          } else {
            checkUserOut(response.data);
            successfulCheckout();
          }
        });
      } else {
        setTyped(newArray);
      }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    });

    return (
        <div class="container">
                <div class="column">
                    <h1>  Welcome to the</h1>
                    <img src={logo} class="App-logo" alt="logo" />
                </div>
                <div class="column">
                    <NavLink to="/check-in">
                        <button class="home" type="button">
                            Check In
                        </button>
                    </NavLink>
                    <br></br>
                    <NavLink to="/check-out">
                    <button class="home" type="button">
                            Check Out
                        </button>
                    </NavLink>
                </div>
        </div>
    );
}

export default Home;