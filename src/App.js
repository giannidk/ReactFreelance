import React, { Component } from 'react';
import { Grid, ButtonToolbar, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import NavigationTop from './components/common/navigation_top';
import ButtonToolbarTemp from './components/common/button_toolbar';

class App extends Component {
  render() {
    return (
      <div className="mainapp">
          <NavigationTop />
        <Grid >
          <ButtonToolbarTemp />
        </Grid>
      </div>
    );
  }
}

export default App;
