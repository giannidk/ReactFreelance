import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clientDetails, clientDelete } from '../actions';
import { Spinner } from '../components/common';

class ClientsDetails extends Component {
    componentWillMount(){
        if(!this.props.clients){ 
            const { key } = this.props.match.params;
            this.props.clientDetails(key);
        }
    }
    onDeleteClick() {
        const { key } = this.props.match.params;
        this.props.clientDelete(key, ( () => {
            this.props.history.push('/clients');
        }));
    }
    render() {
        const { client } = this.props;
        if (!client) {
            return (<Spinner />);
        }
        return (
            <div>
                <PageHeader>{this.props.client.clientName} </PageHeader>
                <div><strong>{client.contactPerson}</strong></div>
                <div><strong>@:</strong> {client.contactEmail}</div>
                <div><strong>Tlf.:</strong> {client.contactPhone}</div>                
                <hr />
                <Link
                    to="/clients"
                    className="btn btn-primary"
                >Back to list</Link>
                <button
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger"
                >Delete</button>
            </div>
        );
    }
}

function mapStateToProps({ clients }, ownProps) {
    return { client: clients[ownProps.match.params.key] };
}

export default connect(mapStateToProps, { clientDetails, clientDelete })(ClientsDetails);