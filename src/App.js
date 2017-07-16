import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid, ButtonToolbar, Button } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import './css/App.css';
import NavigationTop from './components/common/navigation_top';
import Dashboard from './routes/dashboard';
import ClientsList from './routes/clients_list';
import ClientsNew from './routes/clients_new';
import ProjectsList from './routes/projects_list';
import RegistrationsList from './routes/registrations_list';

import ButtonToolbarTemp from './components/common/button_toolbar';

class App extends Component {
  render() {
  const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div className="app-container">
            <NavigationTop />
          <Grid >
            {/* <ButtonToolbarTemp /> */}
          <Switch>
            {/* <Route path="/clients/new" component={ClientsNew} />
            <Route path="/client/:id" component={ClientShow} />
             */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/clients/new" component={ClientsNew} />
            <Route path="/clients" component={ClientsList} />
            <Route path="/projects" component={ProjectsList} />
            <Route path="/registrations" component={RegistrationsList} />
            <Route path="/" component={Dashboard} />
          </Switch>
          </Grid>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
