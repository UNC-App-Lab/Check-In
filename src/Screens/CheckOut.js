import React from 'react';
import axios from "axios";
import '../App.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {checkUserOut} from '../Utilities/checkoutUtils';
import { getDateTime } from "../Utilities/timeUtils";


export default class CheckOut extends React.Component {

    state = { visitors: [] };

    getVisitors() {
        axios.get('/api/checkins/')
            .then(res => {
                let arr = res.data.filter(elem => elem.checkedIn === true)
                this.setState({ visitors: arr });
            })
    }

    componentDidMount() {
        this.getVisitors();
    }

    submit = (obj) => {
        let notify = true;
        const currentDate = getDateTime().date;
        if (currentDate === obj.date) {
            notify = false;
        }
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui' class="dialogdiv">
                    <h1>Are you sure you want to check out?</h1>
                  {!notify ? <button class="dialog" onClick={() => {this.checkOut(obj); onClose();}}>Yes</button> : ""}
                  {!notify ? <button class="dialog" onClick={onClose}>No</button> : ""}
                  {notify ? <button class="dialog" onClick={onClose}>Something went wrong. Please notify a manager!</button> : ""}
                </div>
              );
            }
          });
      };

      checkOut(obj) {
        checkUserOut(obj);
        // navigate back to home
        this.props.history.push("");
      }

    render() {
        let { visitors } = this.state;

        return (
            <div class="checkout">
                <h2>Check Out</h2>
                <p>Select your name to check out</p>
                <div class="grid">
                    <section class="grid">
                        {visitors.map((data, index) => (
                            <button class="gridEl" key={index} onClick={() => this.submit(data)}>
                                <p>{data.name}</p>
                                <p>{data.PID}</p>
                            </button>
                        ))} 
                    </section>
                </div>
            </div>
        );
    }
}