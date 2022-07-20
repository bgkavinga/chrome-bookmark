import React from 'react';
import Login from './Login';
import Content from './Content';
import Register from './Register';

export const STATE_LOGIN = 1;
export const STATE_REGISTER = 2;
export const STATE_CONTENT = 3;

class Popup extends React.Component {

  constructor(props) {
    super(props);
    let state = { isLoggedIn: false, appState: STATE_LOGIN };
    chrome.runtime.sendMessage({ command: 'isLoggedIn' }, (response) => {
      state.isLoggedIn = response.isLoggedIn;
    }
    );
    this.state = state;
    this.onAppStateChange = this.onAppStateChange.bind(this);
  }

  onAppStateChange(data) {
    this.setState(data)
  }

  render() {
    let component;
    switch (this.state.appState) {
      case STATE_LOGIN:
        component = <Login onAppStateChange={this.onAppStateChange}></Login>;
        break;
      case STATE_REGISTER:
        component = <Register onAppStateChange={this.onAppStateChange}></Register>;
        break;
      case STATE_CONTENT:
        component = <Content onAppStateChange={this.onAppStateChange}></Content>
        break;
    }
    return component;
  }
}
export default Popup;
