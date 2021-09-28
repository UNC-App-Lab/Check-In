import React from 'react';
import axios from "axios";
import '../App.css';
import './checkin.css';
import Autosuggest from 'react-autosuggest';

const options =
  ['Flyer', 'Poster', 'Sign in CS Building',
    'Friend', 'Word of Mouth',
    'Class Announcement', 'Email (Class)',
    'Club Announcement', 'Email (Club)', 'Newsletter (Club)', 'WICS',
    'Email (Department)', 'CS Newsletter', 'Newsletter (Department)', 'Department Announcement',
    'Facebook', 'Instagram', 'Slack', 'App Lab Slack',
    'Website', 'App Lab Website', 'Web Search', 'Google'];

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
      suggestions: []
    };
    this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox 
    this.handleFirstTimeChecked = this.handleFirstTimeChecked.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  SubmitCheckIn(name, pid, reason, noPID, firstVisit, hear) {
    //if form empty, don't submit
    // if noPID = true, make sure name and reason are there
    // if noPID = false, make sure name and PID and reason are there
    if (noPID && (name === "" || reason === "")) {
      alert("Please enter name and reason for visit");
    }
    else if (!noPID && (name === "" || pid === "" || reason === "")) {
      alert("Please enter name, PID, and reason for visit");
    }
    else if (firstVisit && hear === "") {
      alert("Please enter how you heard about the App Lab");
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
        method: 'POST', url: '/api/checkins/', headers: { authorization: localStorage.token }, data: {
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

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };
    return (
      <div class="checkin">
        <h2>Check In</h2>
        <form onSubmit={() => { this.SubmitCheckIn(document.getElementById("name").value, document.getElementById("pid").value, document.getElementById("reason").value, document.getElementById("noPID").checked, document.getElementById("firstTime").checked, this.state.value) }}
          class="checkin-form">
          <label class="checkin-label">Name:</label>
          <input class="checkin-input" type="text" name="name" id="name" />
          <p class="checkin-centered">(Scanner can be used to input PID)</p>
          <label class="checkin-label">PID:</label>
          <input class="checkin-input" type="text" name="pid" id="pid" disabled={this.state.isChecked} />
          <div class="checkin-centered">
            <input type="checkbox" id="noPID" class="noPID" onChange={this.handleChecked} />
            <label id="noPIDLabel" for="noPID"> Check if you are a non-UNC student or do not have a PID</label>
          </div>
          <label class="checkin-label">
            Reason:
          </label>
          <input class="checkin-input" type="text" name="reason" id="reason" />
          <div class="checkin-centered">
            <input type="checkbox" id="firstTime" class="firstTime" onChange={this.handleFirstTimeChecked} />
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
              inputProps={inputProps} />
          </div>
          <button class="check-in checkin-centered">Submit</button>
        </form>
      </div>
    );
  }
}


// shouldRenderSuggestions={(v,r) => v.trim().length > 0 || r == 'suggestions-revealed'}