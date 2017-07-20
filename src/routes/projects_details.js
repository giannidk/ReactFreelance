import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Alert, Table, Label } from 'react-bootstrap';
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
                    <td><Link to={`/registrations/${key}`}>{registration.name}</Link></td>
                    <td>{registration.total}</td>
                    <td>
                      <Label bsStyle={(registration.status === 'open' ? 'warning' : 'success')}>
                          {registration.status}
                      </Label>
                    </td>
                </tr>
            );
        });
    }
    renderTotalStatus(){
      const { registrations } = this.props.project;
      let invoiced = 0; 
      let toInvoice = 0;   
      for (let reg in registrations) {
        console.log(reg);
          if (registrations[reg].status === 'open') {
              console.log(registrations.total);
              toInvoice += parseFloat(registrations[reg].total)
          } else {
              invoiced += parseFloat(registrations[reg].total)
          }
      }  
      return(
        <div>
          <div className="text-success">{`Total invoiced: ${invoiced}`}</div>
          <div className="text-warning">{`Total to invoice: ${toInvoice}`}</div>
        </div>
      );

      
      
    }
    render() {
        const { project, error } = this.props;
        if( error ) {
            return (
                <div>
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
                <PageHeader>{project.projectName} </PageHeader>
                <h4>{project.clientName}</h4>
                <div>{project.projectDescription}</div>
                <hr />
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Registrations for this project</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>                    
                    {this.renderRegistrations()}                              
                    </tbody>
                </Table>
                <hr />
                {this.renderTotalStatus()}
                <hr />
                <Link to="/projects" className="btn btn-primary">Projects list</Link>                
                <Link to={`/projects/${this.props.match.params.key}`} className="btn btn-success pull-right" style={{marginLeft: '5px'}}>Invoice</Link>                
                <Link to={`/registrations/add/${this.props.match.params.key}`} className="btn btn-primary pull-right">
                  Add Registration
                </Link>                
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
