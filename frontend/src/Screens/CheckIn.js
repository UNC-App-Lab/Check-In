import React from 'react';
import axios from "axios";
import '../App.css';

const checkIn = () => {
  return (
    <div class="checkin">
      <h2>Check In</h2>
      <form>
        <div class="textbox">
          <label>
            PID:
                  <input type="text" name="pid" id="pid" />
          </label>
        </div>
        <div class="textbox">
          <label>
            Reason:
                  <input type="text" name="reason" id="reason" />
          </label>
        </div>
        <input class="submit" type="submit" value="Submit" 
        onClick={() => { SubmitCheckIn(document.getElementById("pid").value, document.getElementById("reason").value) }} />
      </form>
    </div>
  );
}

function SubmitCheckIn(pid, reason) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();

  const item = {
    name: "Student", // add name input field, make blank=false
    PID: pid,
    date: date,
    timeIn: time,
    timeOut: '05:30', // leave empty
    reason: reason,
    checkedIn: true,
    staff: ""
  };

  // add asterisk to anything required

  axios.post('http://127.0.0.1:8000/api/checkins/', item)
}

export default checkIn;

