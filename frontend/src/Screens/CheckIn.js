import React from 'react';
import axios from "axios";
import '../App.css';

// import * as Datetime from 'react-datetime';
 
const checkIn = () => {
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
                <input class="submit" type="submit" value="Submit" onClick={SubmitCheckIn()}/>
              </form>
            </div>
          );
}

function SubmitCheckIn(){
//   const item = {
//     name: "Anna",
//     PID: "730093280", 
//     date: Datetime.date.today,
//     timeIn: Datetime.time,
//     timeOut: Datetime.time,
//     reason: "idk",
//     checkedIn: true,
//     staff: "Isha"
//    };
  console.log("made it inside the function")

  axios.get('http://127.0.0.1:8000/api/checkins/')
    .then(console.log("it worked!"))
}
 
export default checkIn;