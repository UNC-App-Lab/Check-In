import axios from "axios";
import { getDateTime } from "./timeUtils";

export const checkUserOut = (obj) => {
        
    // if clicked => mark checkedIn as false and set timeOut to current time
    const time =  getDateTime().time

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

    //axios.put(`/api/checkins/${obj.id}/`, item)
    axios({ method: 'PUT', url: `/api/checkins/${obj.id}/`, headers: {authorization: localStorage.token}, data: { 
        name: obj.name,
        PID: obj.PID,
        date: obj.date,
        timeIn: obj.timeIn,
        timeOut: time,
        reason: obj.reason,
        checkedIn: false,
        staff: obj.staff
      } });

    
}