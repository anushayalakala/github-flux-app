import React, { Component } from 'react';
import '../Styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavLinks from './NavLinks';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <NavLinks/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
