import React, { Component } from 'react';
import './App.css';
const serverURL = "http://cab2-108-53-232-66.ngrok.io";

async function ping(userName) {
  const response = await fetch(`${serverURL}/ping`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify({
      userName
    })
  });
  const pingResponse = await response.text();
  console.log('ping response', pingResponse);
  return pingResponse;
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      userName: 'Johnny',
      vote: 0,

      promptOne: {
        text: '',
        isLie: true,
      },
      promptTwo: {
        text: '',
        isLie: false,

      },
      promptThree: {
        text: '',
        isLie: false,
      }
    };
    // console.log('Orginal', this.state);
  };
  handleUser = (event) => {
    this.setState({ userName: event.target.value });
  };
  handlePrompts = (event) => {
    let newObj = {
      ...this.state,
      [event.target.name]: {
        ...this.state[event.target.name],
        text: event.target.value
      }
    }

    this.setState(newObj, () => console.log(this.state));
  };
  checkboxHandler = (event) => {
    let newObj = {
      ...this.state,
      [event.target.name]: {
        ...this.state[event.target.name],
        isLie: event.target.checked
      }
    }
    this.setState(newObj, () => console.log('is a lie unchecked'))
  };
  voteHandler = (event) => {
    this.setState({ vote: event.target.value })
  };
  onClickPingHandler = async () => {
    const pingRes = await ping(this.state.userName)
    console.log(pingRes)
  };
  //DISPLAYS PAGE===============================================================================
  render() {
    const { userName, vote, promptOne, promptTwo, promptThree } = this.state;
    return (
      <div className="App">
        <h1>Two Truth's And A Lie! </h1>

        <label>Username:</label>
        <input name='userName' type={userName} onChange={this.handleUser}></input>
        <br />

        <label>Prompt 1:</label>
        <input type='text' name='promptOne' value={promptOne.text} onChange={this.handlePrompts}></input>
        <label htmlFor='checkbox'> is a Lie</label>
        <input type="checkbox" name='promptOne' checked={promptOne.isLie} onChange={this.checkboxHandler}></input>
        <br />

        <label>Prompt 2:</label>
        <input type='text' name='promptTwo' value={promptTwo.text} onChange={this.handlePrompts}></input>
        <label htmlFor='checkbox'> is a Lie</label>
        <input type="checkbox" name='promptTwo' checked={promptTwo.isLie} onChange={this.checkboxHandler}></input>
        <br />

        <label>Prompt 3:</label>
        <input type='text' name='promptThree' value={promptThree.text} onChange={this.handlePrompts}></input>
        <label htmlFor='checkbox'> is a Lie</label>
        <input type="checkbox" name='promptThree' checked={promptThree.isLie} onChange={this.checkboxHandler}></input>
        <br />

        <label>Vote:</label>
        <input type="number" name='vote' value={vote} onChange={this.voteHandler}></input>
        <br />

        <button>Send Prompts</button>
        <button>Send Vote</button>
        <button onClick={this.onClickPingHandler}>Send ping</button>

      </div>
    );
  };
};
export default App; 