import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import './css/App.css';
import './css/spinner.css';
import { 
  Topnav, 
  //ButtonToolbarTemp 
} from './components/common';
import Dashboard from './routes/dashboard';
import ClientsList from './routes/clients_list';
import ClientsAdd from './routes/clients_add';
import ProjectsList from './routes/projects_list';
import RegistrationsList from './routes/registrations_list';
import RegistrationsDetails from './routes/registrations_details';
import RegistrationsAdd from './routes/registrations_add';
import ClientsDetails from './routes/clients_details';
import ProjectsDetails from './routes/projects_details';


class App extends Component {
  render() {
  const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div className="app-container">
            <Topnav />
          <Grid >
             {/* <ButtonToolbarTemp /> */} 
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/clients/add" component={ClientsAdd} />
            <Route path="/clients/:key" component={ClientsDetails} />
            <Route path="/clients" component={ClientsList} />
            <Route path="/projects/:key" component={ProjectsDetails} />
            <Route path="/projects" component={ProjectsList} />
            <Route path="/registrations/add" component={RegistrationsAdd} />
            <Route path="/registrations/:key" component={RegistrationsDetails} />
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
