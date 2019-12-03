import React from 'react';
import axios from "axios";


export default class CheckOut extends React.Component {

    state = { visitors: [] };

    getVisitors() {
        axios.get('http://127.0.0.1:8000/api/checkins/')
            .then(res => {
                this.setState({ visitors: res.data });
            })
    }

    componentDidMount(){
        this.getVisitors();
    }

    checkOut(obj){

    }

    render() {
        let { visitors } = this.state;

        return (
            <div>
                <h2>Check Out</h2>
                <div>
                    <section>
                        {visitors.map((data, index) => (
                            <button key={index} onClick={() => this.checkOut(data)}>
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

// only display if checkedIn = true

// if clicked => mark checkedIn as false and remove button from screen
// set tiemOut to current time

// dialog box