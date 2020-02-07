import React from 'react';
import axios from "axios";
import '../App.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


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
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui' class="dialogdiv">
                  <h1>Are you sure you want to check out?</h1>
                  <button class="dialog" onClick={() => {this.checkOut(obj); onClose();}}>
                    Yes
                  </button>
                  <button class="dialog" onClick={onClose}>No</button>
                </div>
              );
            }
          });
      };

    checkOut(obj) {
        
        // if clicked => mark checkedIn as false and set timeOut to current time
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        const item = {
            name: obj.name,
            PID: obj.PID,
            date: obj.date,
            timeIn: obj.timeIn,
            timeOut: time,
            reason: obj.reason,
            checkedIn: false,
            staff: obj.staff
        };

        axios.put(`/api/checkins/${obj.id}/`, item)
        //axios.put(`https://app-lab-check-in.herokuapp.com/${obj.id}/`, item)

        // navigate back to home
        this.props.history.push('');
    }

    render() {
        let { visitors } = this.state;

        return (
            <div class="checkout">
                <h2>Check Out</h2>
                <p>Select your name to check out</p>
                <div>
                    <section>
                        {visitors.map((data, index) => (
                            <button key={index} onClick={() => this.submit(data)}>
                                <p>{data.name}</p>
                                <p>{data.PID}</p>
                            </button>
                        ))}
                    </section>
                </div>
            </div >
        );
    }
}