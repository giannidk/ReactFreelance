import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return (
            <div>
            <PageHeader>Dashboard <small>project status</small></PageHeader>
            <p>As the demo app concentrates on the registrations, clients and projects have limited functionalities and are previously set in the database.</p>
             <ListGroup>
                <ListGroupItem header="Auth">
                    This demo app doesn't have an implemented authentication.
                </ListGroupItem>
                <ListGroupItem header="Settings">
                    Settings such as VAT value and currency are provided at app start and can't be changed.
                </ListGroupItem>
                <ListGroupItem header="Clients">
                    Clients are already set, it's possible to add and remove clients but not to edit specific client.
                </ListGroupItem>
                <ListGroupItem header="Projects">
                    Projects are already set in database, no adding and removing functionalities.
                </ListGroupItem>
                <ListGroupItem header="Registrations">
                    Registrations can be added and deleted. The status of the registrations will change when they are invoiced.                  
                </ListGroupItem>
                <ListGroupItem header="Invoices">
                    Invoices can be created on project basis and include registrations which are not yet being invoiced. When a registration is invoiced its status is set to invoiced and it won't be included in new invoices.                 
                </ListGroupItem>
            </ListGroup>
            </div>
        );
    }
}

export default Dashboard;
