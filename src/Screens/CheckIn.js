import React from 'react';
import axios from "axios";
import '../App.css';
import './checkin.css';
import Modal from 'react-modal';
import Autosuggest from 'react-autosuggest';
import { csrfToken } from '../Utilities/csrfUtils';

const options =
  ['Flyer', 'Poster', 'Sign in CS Building',
    'Friend', 'Word of Mouth',
    'Class Announcement', 'Email (Class)',
    'Club Announcement', 'Email (Club)', 'Newsletter (Club)', 'WICS',
    'Email (Department)', 'CS Newsletter', 'Newsletter (Department)', 'Department Announcement',
    'Facebook', 'Instagram', 'Slack', 'App Lab Slack',
    'Website', 'App Lab Website', 'Web Search', 'Google', 'Other'];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  if (value === "" || value.trim().length === 0) { return options; }

  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return options.filter(option => regex.test(option));
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return (
    <span class='suggestion'>{suggestion}</span>
  );
}

function shouldRenderSuggestions(value, reason) {
  return value.trim().length > 0 || reason === "suggestions-revealed" || reason === "suggestions-updated" || reason === "render";
};

export default class CheckIn extends React.Component {

  constructor() {
    super();
    this.state = {
      isChecked: false,
      firstTime: false,
      value: '',
      suggestions: [],
      modalOpen: false,
      modalText: "",
      keypresses: Array(9).fill(null),
      keysPidBox: [],
      pid: "",
      name: ""
    };
    this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox 
    this.handleFirstTimeChecked = this.handleFirstTimeChecked.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.nameRef = React.createRef();
    this.reasonRef = React.createRef();
  }

  SubmitCheckIn(name, pid, reason, noPID, firstVisit, hear) {
    //if form empty, don't submit
    // if noPID = true, make sure name and reason are there
    // if noPID = false, make sure name and PID and reason are there
    if (noPID && (name === "" || reason === "")) {
      this.setState({
        modalText: "Please enter name and reason for visit",
        modalOpen: true
      });
    }
    else if (!noPID && (name === "" || pid === "" || reason === "")) {
      this.setState({
        modalText: "Please enter name, PID, and reason for visit",
        modalOpen: true
      });
    }
    else if (firstVisit && hear === "") {
      this.setState({
        modalText: "Please enter how you heard about the App Lab",
        modalOpen: true
      });
    } else if (firstVisit && !options.includes(hear)) {
      this.setState({
        modalText: "Please select and existing option for how you heard about the App Lab (or use Other)",
        modalOpen: true
      });
    } else {

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
        staff: "",
        checkedIn: true,
        hasPID: !noPID,
        firstTime: false,
        heard_about_al_through: ""
      };

      // need to figure out how to send authorization token in http requests 
      //axios.post('/api/checkins/', item);

      axios({
        method: 'POST', url: '/api/checkins/', headers: { 'X-CSRFToken': csrfToken }, data: {
          name: name,
          PID: pid,
          date: date,
          timeIn: time,
          timeOut: '00:00',
          reason: reason,
          staff: "",
          checkedIn: true,
          hasPID: !noPID,
          firstTime: firstVisit,
          heard_about_al_through: hear
        }
      });

      // navigate back to home
      this.props.history.push('');
    }
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  handleFirstTimeChecked() {
    this.setState({ firstTime: !this.state.firstTime });
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  checkForHistory = (pid) => {
    axios({
      method: "POST",
      url: "/pid-to-name/",
      headers: { 'X-CSRFToken': csrfToken },
      data: {
        pid: pid
      }
    }).then((response => {
      if (response.data.name) {
        if (this.state.name.trim() === "") {
          this.setState({
            name: response.data.name,
          });
        }
        this.reasonRef.current.focus();
      } else {
        this.nameRef.current.focus();
        this.setState({
          firstTime: true
        });
      } 
    }));
  }

  clearArray = () => {
    this.setState({
      keypresses: Array(9).fill(null)
    })
  }

  handleKeyPress = (e) => {
    if (!(e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA")) {
      const pidArray = this.state.keypresses.slice(1, 9);
      pidArray.push(String.fromCharCode(e.keyCode));
      if (pidArray.every(x => !isNaN(parseInt(x)))) {
        const newPid = pidArray.join("");
        this.setState({
          pid: newPid.substring(0, newPid.length),
          keypresses: Array(9).fill(null)
        });
        this.checkForHistory(newPid);
      } else {
        this.setState({
          keypresses: pidArray
          });
      }
    } else {
      if (!(String.fromCharCode(e.keyCode) === '\b')) {
        this.state.keysPidBox.push(String.fromCharCode(e.keyCode))
      } else {
        this.state.keysPidBox.pop()
      }

      if (this.state.keysPidBox.length === 9){
        const pidArray = this.state.keysPidBox.slice(0, 9);
        if (pidArray.every(x => !isNaN(parseInt(x)))) {
          const newPid = pidArray.join("");
          this.checkForHistory(newPid);
        }
        else {
          this.setState({
            keypresses: pidArray
          });
        }
      }
    }
  }

  pidChange = (event) => {
    this.setState({
      pid: event.target.value
    });
  }

  nameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }  

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    if (this.props.location.state && this.props.location.state.pid) {
      this.setState({
        pid: this.props.location.state.pid
      });
      this.checkForHistory(this.props.location.state.pid);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };
    return (
      <div class="checkin">
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.setState({ modalOpen: false })}
          className="modal"
          overlayClassName="modalOverlay">
          <h2>Error Submitting Check In</h2>
          <p class="modal-content">{this.state.modalText}</p>
          <button type="button" onClick={() => {this.setState({modalOpen: false})}}>Close</button>
        </Modal>
        <h2>Check In</h2>
        <form class="checkin-form">
          <label class="checkin-label">Name:</label>
          <input class="checkin-input" type="text" name="name" id="name" value={this.state.name} onChange={this.nameChange} ref={this.nameRef} />
          <p class="checkin-centered">(Scanner can be used to input PID)</p>
          <label class="checkin-label">PID:</label>
          <input class="checkin-input" type="text" name="pid" id="pid" disabled={this.state.isChecked} value={this.state.pid} onChange={this.pidChange} onClick={this.clearArray}/>
          <div class="checkin-centered">
            <input type="checkbox" id="noPID" class="noPID" onChange={this.handleChecked} />
            <label id="noPIDLabel" for="noPID"> Check if you are a non-UNC student or do not have a PID</label>
          </div>
          <label class="checkin-label">
            Reason:
          </label>
          <input class="checkin-input" type="text" name="reason" id="reason" ref={this.reasonRef} />
          <div class="checkin-centered">
            <input type="checkbox" id="firstTime" class="firstTime" onChange={this.handleFirstTimeChecked} checked={this.state.firstTime} />
            <label id="firstTimeLabel" for="firstTime"> Check if you are visiting the App Lab for the first time</label>
          </div>
          <div class="textbox checkin-centered" style={{ display: this.state.firstTime ? 'block' : 'none' }}>
            <label>
              How did you hear about us?
            </label>
            <Autosuggest
              name="hear"
              id="hear"
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              shouldRenderSuggestions={shouldRenderSuggestions}
              alwaysRenderSuggestions={true}
              inputProps={inputProps} />
          </div>
          <button type="button" class="check-in checkin-centered" onClick={() => { this.SubmitCheckIn(document.getElementById("name").value, document.getElementById("pid").value, document.getElementById("reason").value, document.getElementById("noPID").checked, document.getElementById("firstTime").checked, this.state.value) }}>Submit</button>
        </form>
      </div>
    );
  }
}


// shouldRenderSuggestions={(v,r) => v.trim().length > 0 || r == 'suggestions-revealed'}