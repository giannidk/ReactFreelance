import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Alert, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRegistrations } from '../actions';
import { Spinner } from '../components/common';

class RegistrationsList extends Component {
    componentWillMount() {
        //console.log(this.props);
        this.props.fetchRegistrations();
    }
    renderList() {
        const { registrations } = this.props;
        console.log(registrations);
        return _.map( registrations, (reg, key) => {
            return (
                <tr key={key}>
                    <td>{reg.project}</td>
                    <td><Link to={`/registrations/${key}`}>{reg.name}</Link></td>
                    <td>{reg.date}</td>
                    <td>{reg.hours}:{reg.minutes}</td>
                    <td>{reg.total}</td>
                    <td>
                        <Label bsStyle={(reg.status === 'open' ? 'warning' : 'success')}>
                            {reg.status}
                        </Label>
                    </td>
                </tr>
            );
        } ) 
            
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
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Registration</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Total (net {appData.currency})</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </Table>
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
