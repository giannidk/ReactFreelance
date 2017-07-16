import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { fetchClients } from '../actions';

class ClientsList extends Component {
    componentWillMount() {
        this.props.fetchClients();
    }

    renderList() {
        const { clients } = this.props;
        return _.map(clients, (client, key) => {
            return(
                <tr key={key}>
                    <td>{client.clientName}</td>
                    <td>{client.contactPerson}</td>
                    <td>{client.contactEmail}</td>
                    <td>{client.contactPhone}</td>
                </tr>
            );
        });
    }

    render() {
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
            <LinkContainer to="/clients/new" className="pull-right">
                <Button bsStyle="primary">Add CLient</Button>
            </LinkContainer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { clients: state.clients };
}

export default connect(mapStateToProps, { fetchClients })(ClientsList);