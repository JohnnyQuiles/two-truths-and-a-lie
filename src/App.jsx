import React, { Component } from 'react';
import './App.css';
const serverURL = "http://ce44-108-53-232-66.ngrok.io";

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

async function prompt(event) {
  const response = await fetch(`${serverURL}/prompt-submit`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },

    body: JSON.stringify({
      userName: event.userName,
      prompts: {
        promptOne: {
          prompt: event.promptOne.text,
          isLie: event.promptOne.isLie,
        },
        promptTwo: {
          prompt: event.promptTwo.text,
          isLie: event.promptTwo.isLie,
        },
        promptThree: {
          prompt: event.promptThree.text,
          isLie: event.promptThree.isLie,
        },
      }
    }),
  });
  const pingResponse = await response.text();
  return pingResponse;
};

async function vote(event) {
  const response = await fetch(`${serverURL}/prompt-vote`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify({
      userName: event.userName,
      promptVote: Number(event.vote)
    }),
  });
  return await response.text();

};

async function poll() {
  const response = await fetch(`${serverURL}/prompt-poll`, {
    method: "Get", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
  });
  return await response.text();

};


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      userName: '',
      vote: 0,

      promptOne: {
        text: '',
        isLie: false,
      },
      promptTwo: {
        text: '',
        isLie: false,

      },
      promptThree: {
        text: '',
        isLie: false,
      },
      fetchUserName: '',
      fetchPromptOne: { prompts: "", isLie: false },
      fetchPromptTwo: { prompts: "", isLie: false },
      fetchPromptThree: { prompts: "", isLie: false },
      fetchVote: ''
    };
    // console.log('Orginal:', this.state);
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({
      username: this.state.userName,
      promptOne: this.state.promptOne,
      promptTwo: this.state.promptTwo,
      promptThree: this.state.promptThree,
      vote: this.state.vote,
    });
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
    this.setState(newObj, () => console.log(newObj));
  };
  checkboxHandler = (event) => {
    let newObj = {
      ...this.state,
      [event.target.name]: {
        ...this.state[event.target.name],
        isLie: event.target.checked
      }
    }
    this.setState(newObj, () => console.log('is a lie checked'))
  };
  voteHandler = (event) => {
    this.setState({ vote: event.target.value })
  };
  onClickPromptHandler = async () => {
    const promptData = await prompt(this.state)
    console.log('Prompt click:', promptData);
  };
  onClickVoteHandler = async () => {
    const voteData = await vote(this.state);
    console.log('Vote click:', voteData);
  };
  onClickPingHandler = async () => {
    const pingRes = await ping(this.state.userName)
    console.log(pingRes)
  };
  onClickPollHandler = async () => {
    const pollRes = await poll();
    const parsePoll = JSON.parse(pollRes)
    console.log("Poll response:", pollRes);
    console.log("Parse res", parsePoll);

    this.setState({
      fetchUserName: parsePoll.currentPrompt.userName,
      fetchPromptOne: parsePoll.currentPrompt.prompts.promptOne,
      fetchPromptTwo: parsePoll.currentPrompt.prompts.promptTwo,
      fetchPromptThree: parsePoll.currentPrompt.prompts.promptThree,
      fetchedVoteOne: parsePoll.promptVotes[1],
      fetchedVoteTwo: parsePoll.promptVotes[2],
      fetchedVoteThree: parsePol.promptVotes[3]
    })
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

        <button onClick={this.onClickPromptHandler}>Send Prompts</button>
        <button onClick={this.onClickVoteHandler}>Send Vote</button>
        <button onClick={this.onClickPingHandler}>Send ping</button>
        <hr />
        <br />

        <h1>Two Truth's And A Lie Response!</h1>
        <div>
          <p>Username:{this.state.fetchUserName}</p>
        </div>
        <div>
          <p>Prompt 1:{this.state.fetchPromptOne.prompts}</p>
        </div>
        <div>
          <p>Prompt 2:{this.state.fetchPromptTwo.prompts}</p>
        </div>
        <div>
          <p>Prompt 3:{this.state.fetchPromptThree.prompts}
        </div>
        <div>
          <p>Vote 1:{this.state.fetchVoteOne}</p>
        </div>
        <div>
          <p>Vote 2:{this.state.fetchVoteTwo}</p>
        </div>
        <div>
          <p>Vote 3:{this.state.fetchVoteThree}</p>
        </div>
        <button onClick={this.onClickPollHandler}>Get Poll</button>
        <br />
      </div>
    );
  };
};
export default App; 