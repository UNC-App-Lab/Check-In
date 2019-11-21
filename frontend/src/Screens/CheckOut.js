import React from 'react';
import axios from "axios";


const checkOut = () => {
    return (
        <div>
            <h2>Check Out</h2>
            {/* go through all database entries, if checkIn=true then display */}
        </div>
    );
}

function DisplayPIDs() {
    axios.get('http://127.0.0.1:8000/api/checkins/')
    .then(res => {return res.data})
        
}

export default checkOut;