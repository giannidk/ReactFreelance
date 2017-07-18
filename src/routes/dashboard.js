import React, { Component } from 'react';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return (
            <div>
            <PageHeader>Dashboard <small>project status</small></PageHeader>
            <p>As the demo app concentrates on the registrations, clients and projects have limited functionalities and are previously set in the database.</p>
             <ListGroup>
                <ListGroupItem header="Clients">
                    Clients are already set, there's possibility to add and remove clients but not to edit specific client.
                </ListGroupItem>
                <ListGroupItem header="Projects">
                    Projects are already set in database, no adding and removing functionalityes.
                </ListGroupItem>
                <ListGroupItem header="Registrations">
                    Registrations functionalities: CRUD                    
                </ListGroupItem>
            </ListGroup>
            </div>
        );
    }
}

export default Dashboard;