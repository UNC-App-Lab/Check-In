import axios from "axios";
import { getDateTime } from "./timeUtils";

export const checkUserOut = (obj) => {
        
    // if clicked => mark checkedIn as false and set timeOut to current time
    const currentDate = getDateTime().date;
    const currentTime = getDateTime().time;

    const item = {
        name: obj.name,
        PID: obj.PID,
        date: obj.date,
        timeIn: obj.timeIn,
        timeOut: currentTime,
        reason: obj.reason,
        checkedIn: false,
        staff: obj.staff
    };

    console.log(obj.date);
    console.log(currentDate);
    console.log(obj.date);

    //axios.put(`/api/checkins/${obj.id}/`, item)
    axios({ method: 'PUT', url: `/api/checkins/${obj.id}/`, headers: {authorization: localStorage.token}, data: { 
        name: obj.name,
        PID: obj.PID,
        date: obj.date,
        timeIn: obj.timeIn,
        timeOut: currentTime,
        reason: obj.reason,
        checkedIn: false,
        staff: obj.staff
      } });

    
}