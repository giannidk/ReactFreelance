import React, { Component } from 'react';
import { PageHeader, Alert, Table, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { registrationDetails } from '../actions';
import { Spinner } from '../components/common';

class RegistrationsDetails extends Component {
    componentWillMount(){
        //if(!this.props.registrations){ 
            const { key } = this.props.match.params;
            this.props.registrationDetails(key);
        //}
    }
    render() {
        const { registration, error } = this.props;
        //const { registration, error } = this.props  
        console.log(registration);
        if( error ) {
            return (
                <div>
                    <PageHeader>Registration Details</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        if (!registration) {
            return (<Spinner />);
        }
        return (
            <div>
                <PageHeader>{registration.name} <small>details</small></PageHeader>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th colSpan="2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-sm-2">Project</td>
                            <td className="col-sm-10">{registration.project}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{registration.description}</td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td>{registration.date}</td>
                        </tr>
                        <tr>
                            <td>Time:</td>
                            <td>{registration.time}</td>
                        </tr>
                        <tr>
                            <td>Total (DKK):</td>
                            <td>{registration.total}</td>
                        </tr>
                        <tr>
                            <td>Status:</td>
                            <td>
                                 <Label bsStyle={(registration.status === 'open' ? 'warning' : 'success')}>
                                    {registration.status}
                                </Label>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                
            </div>
        );  
    }
}

function mapStateToProps({registrations}, ownProps) {
    console.log(registrations);
    return {
        loading: registrations.loading,
        error: registrations.error, 
        registration: registrations[ownProps.match.params.key],
    }
}

export default connect(mapStateToProps, { registrationDetails })(RegistrationsDetails);