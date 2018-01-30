import React, { Component } from 'react';
import '../Styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainTabs from './MainTabs';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <MainTabs/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
