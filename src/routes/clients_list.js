import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Button, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClients } from '../actions';
import { Spinner } from '../components/common';

class ClientsList extends Component {
    
    componentWillMount() {    
        this.props.fetchClients();
    }

    renderList() {
        const { clients } = this.props;
        console.log('PROPSSSS', this.props);        
        return _.map(clients, (client, key) => {
            return(
                <tr key={key}>
                    <td><Link to={`/clients/${key}`}>{client.clientName}</Link></td>
                    <td>{client.contactPerson}</td>
                    <td>{client.contactEmail}</td>
                    <td>{client.contactPhone}</td>
                </tr>
            );
        });
    }

    render() {   
        const { loading, error } = this.props;
        if( loading ) {
            return <Spinner />;
        }
        if( error ) {
            return (
                <div>
                    <PageHeader>Clients List</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        return (
            <div>
            <PageHeader>Clients List</PageHeader>
            <Table striped bordered condensed hover responsive>
                <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Contact Person</th>
                    <th>Contact Email</th>
                    <th>Contact Phone</th>
                </tr>
                </thead>
                <tbody>                    
                {this.renderList()}                              
                </tbody>
            </Table>
            <LinkContainer to="/clients/add" className="pull-right">
                <Button bsStyle="primary">Add Client</Button>
            </LinkContainer>
            </div>
        );
    }
}

function mapStateToProps({ clients }) {
    console.log(clients);
    return { 
        loading: clients.loading,
        error: clients.error,
        clients: clients.list
    };
}

export default connect(mapStateToProps, { fetchClients })(ClientsList);