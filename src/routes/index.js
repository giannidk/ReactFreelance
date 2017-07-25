import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../firebase';
import Dashboard from './dashboard';
import ClientsList from './clients_list';
import ClientsAdd from './clients_add';
import ProjectsList from './projects_list';
import RegistrationsList from './registrations_list';
import RegistrationsDetails from './registrations_details';
import RegistrationsAdd from './registrations_add';
import RegistrationsEdit from './registrations_edit';
import ClientsDetails from './clients_details';
import ProjectsDetails from './projects_details';
import ProjectsInvoice from './projects_invoice';
import InvoicesList from './invoices_list';
import InvoiceDetails from './invoices_details';
import UserLogin from './user_login';

class Routes extends Component {
  
  render() {
    return (
      <Switch>
        {/* <Route path="/dashboard" component={Dashboard} render={this.requireAuth.bind(this)} /> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/clients/add" component={ClientsAdd} />
        <Route path="/clients/:key" component={ClientsDetails} />
        <Route path="/clients" component={ClientsList} />
        <Route path="/projects/:key/invoice" component={ProjectsInvoice} />
        <Route path="/projects/:key" component={ProjectsDetails} />
        <Route path="/projects" component={ProjectsList} />
        <Route path="/registrations/add/:projectID" component={RegistrationsAdd} />
        <Route path="/registrations/add" component={RegistrationsAdd} />
        <Route path="/registrations/edit/:key" component={RegistrationsEdit} />
        <Route path="/registrations/:key" component={RegistrationsDetails} />
        <Route path="/registrations" component={RegistrationsList} />
        <Route path="/invoices/:invoiceKey" component={InvoiceDetails} />
        <Route path="/invoices" component={InvoicesList} />
        <Route path="/" component={UserLogin} />
      </Switch>
    );
  }
}

function mapStateToProps({ auth }){
  return{
    loggedIn: auth.loggedIn
  }
}

export default connect(mapStateToProps)(Routes);
