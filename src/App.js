import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox: true,
      userName: '',
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
    console.log('Orginal', this.state);
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
    this.setState(newObj, () => console.log('is a lie checked'))
  };
  voteHandler = (event) => {
    this.setState({ vote: event.target.value })
  }

  //DISPLAYS PAGE===============================================================================
  render() {
    const { userName, vote, promptOne, promptTwo, promptThree } = this.state;
    return (
      <div className="App">
        <h1>Two Truth's And A Lie! </h1>
        <form>
          <label>Username:</label>
          <input name='userName' type={userName} onChange={this.handleUser}></input>
          <br />

          <label>Prompt 1:</label>
          <input type='text' name='promptOne' value={promptOne.text} onChange={this.handlePrompts}></input>
          <label htmlFor='checkbox'> is a Lie</label>
          <input type="checkbox" name='promptOne' checked={promptTwo.isLie} onChange={this.checkboxHandler}></input>
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
        </form>
      </div>
    );
  };
};


export default App; 