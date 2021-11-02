import axios from "axios";

export const checkUserOut = (obj) => {
        
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