import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Alert, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { projectDetails } from '../actions';
import { Spinner } from '../components/common';

class ProjectsDetails extends Component {
    componentWillMount(){
        if(!this.props.pojects){ 
            const { key } = this.props.match.params;
            this.props.projectDetails(key);
        }
    }
    renderRegistrations() {
        const { project } = this.props;
        return _.map(project.registrations, (registration, key) => {
            return(
                <tr key={key}>
                    <td><Link to={`/registrations/${key}`}>{key}</Link></td>
                    <td>{registration.description}</td>
                </tr>
            );
        });
    }
    render() {
        const { project, error } = this.props;
        if( error ) {
            return (
                <div>
                    <PageHeader>Projects List</PageHeader>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        if (!project) {
            return (<Spinner />);
        }
        return (
            <div>
                <PageHeader>{this.props.project.projectName} </PageHeader>
                <h4>{project.clientName}</h4>
                <div>{project.projectDescription}</div>
                <hr />
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th>Reg. ID </th>
                        <th>Reg Name</th>
                    </tr>
                    </thead>
                    <tbody>                    
                    {this.renderRegistrations()}                              
                    </tbody>
                </Table>
                <hr />
                <Link
                    to="/projects"
                    className="btn btn-primary pull-right"
                >Projects list</Link>
                {/* <button
                    onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger"
                >Delete</button> */}
            </div>
        );
    }
}

function mapStateToProps({ projects }, ownProps) {
    return { 
        project: projects[ownProps.match.params.key],
        error: projects.error, 
    };
}

export default connect(mapStateToProps, { projectDetails })(ProjectsDetails);