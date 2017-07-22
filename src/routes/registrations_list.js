import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Alert, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRegistrations } from '../actions';
import { Spinner } from '../components/common';

class RegistrationsList extends Component {
    componentWillMount() {
      this.props.fetchRegistrations();
    }
    renderRegistrations(client){
      return _.map(client, (registration, key) => {
          if(registration){
            return (
          <tr key={key}>
            <td className="col-sm-4">
              <Link to={`/registrations/${key}`}> {registration.name} </Link>
            </td>            
            <td className="col-sm-4">{registration.date}</td>
            <td className="col-sm-1">{registration.hours}:{registration.minutes}</td>
            <td className="col-sm-1">{registration.total}</td>
            <td  className="col-sm-2">
              <Label bsStyle={(registration.status === 'open' ? 'warning' : 'success')}>
                  {registration.status}
              </Label>
            </td>
          </tr>                    
        );
          }
      });
    }
    renderList() {
      const { registrations, appData } = this.props;        
        return _.map( registrations, (client, key) => {
          return (
            <Table striped bordered hover responsive key={key}>
              <thead>
                  <tr><th colSpan="5">{key}</th></tr>
                    <tr>
                      <th className="col-sm-4">name</th>
                      <th className="col-sm-4">date</th>
                      <th className="col-sm-1">time</th>
                      <th className="col-sm-1">total</th>
                      <th className="col-sm-2">status</th>
                    </tr>
              </thead>
              <tbody>
                {this.renderRegistrations(client)} 
              </tbody>
          </Table>
          );
        }) 
            
    }
    render() {
        const { appData, loading, error } = this.props;
        if( loading ) {
            return <Spinner />;
        }
        if( error ) {
            return (
                <div>
                    <PageHeader>Registrations</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        return (
            <div>
                <PageHeader>Registrations</PageHeader>
               <div>
                 {this.renderList()}
               </div>
                <hr />
                <Link to="/registrations/add" className="btn btn-primary pull-right">Add Registration</Link>
            </div>
        );
    }
}

function mapStateToProps ({ registrations, appData }) {
   return {
        registrations: registrations.list,
        loading: registrations.loading,
        error: registrations.error,
        appData
   }
}
export default connect (mapStateToProps, { fetchRegistrations })(RegistrationsList);
