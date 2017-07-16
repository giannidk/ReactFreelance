import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid, ButtonToolbar, Button } from 'react-bootstrap';
import './App.css';
import NavigationTop from './components/common/navigation_top';
import Dashboard from './routes/dashboard';
import ClientsList from './routes/clients_list';
import ProjectsList from './routes/projects_list';
import RegistrationsList from './routes/registrations_list';

import ButtonToolbarTemp from './components/common/button_toolbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
            <NavigationTop />
          <Grid >
            <ButtonToolbarTemp />
          </Grid>
          <Switch>
            {/* <Route path="/clients/new" component={ClientsNew} />
            <Route path="/client/:id" component={ClientShow} />
             */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/clients" component={ClientsList} />
            <Route path="/projects" component={ProjectsList} />
            <Route path="/registrations" component={RegistrationsList} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
