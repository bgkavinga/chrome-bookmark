import React from 'react';
import Login from './Login';
import Content from './Content';
import Loader from './Loader';

export const STATE_LOGIN = 1;
export const STATE_CONTENT = 2;
export const STATE_LOADING = 3;

class Popup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, appState: STATE_LOADING };
    this.onAppStateChange = this.onAppStateChange.bind(this);
    chrome.runtime.sendMessage({ command: 'isLoggedIn' }, this.onAppStateChange);
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
      case STATE_CONTENT:
        component = <Content onAppStateChange={this.onAppStateChange}></Content>
        break;
      case STATE_LOADING:
        component = <Loader onAppStateChange={this.onAppStateChange}></Loader>
        break;
    }
    return component;
  }
}
export default Popup;
