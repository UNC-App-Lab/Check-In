import React from 'react';
import axios from "axios";
import '../App.css';

export default class CheckIn extends React.Component {

  SubmitCheckIn(name, pid, reason) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes();
  
    const item = {
      name: name, // add name input field, make blank=false
      PID: pid,
      date: date,
      timeIn: time,
      timeOut: '00:00', // leave empty
      reason: reason,
      checkedIn: true,
      staff: ""
    };
  
    // add asterisk to anything required
  
    axios.post('http://127.0.0.1:8000/api/checkins/', item)
    //axios.post('https://app-lab-check-in.herokuapp.com/api/checkins/', item)
  
    // navigate back to home
    this.props.history.push('');
  }

  render() {
    return (
      <div class="checkin">
        <h2>Check In</h2>
        <form onSubmit={() => { this.SubmitCheckIn(document.getElementById("name").value, document.getElementById("pid").value, document.getElementById("reason").value) }}>
          <div class="textbox">
            <label>
              Name:
                  <input type="text" name="name" id="name" />
            </label>
          </div>
          <div class="textbox">
            <label>
              PID:
                  <input type="text" name="pid" id="pid" />
            </label>
            <p>(Scanner can be used to input PID)</p>
          </div>
          <div class="textbox">
            <label>
              Reason:
                  <input type="text" name="reason" id="reason" />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}