import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProjects, addRegistration } from '../actions';
import { Spinner } from '../components/common';

class RegistrationsAdd extends Component {
    componentWillMount(){
        this.props.fetchProjects();
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `${field.containerClass} form-group ${touched && error ? 'has-error' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type={ field.type || 'text'}
                    className="form-control"
                    {...field.input}
                />
                <p className="control-label">{touched ? error : ''}</p>
            </div>
        );
    }

    renderProjects() {
        const { projects } = this.props;
        return _.map(projects, (project, key) => {
            return(                
                <option key={key} value={key}>{project.projectName}</option>
            );
        });
    }

    renderSelectField({ input, label, type, containerClass, meta: { touched, error }, children }){
        //const { meta: { touched, error } } = field;
        const className = `${containerClass} form-group ${touched && error ? 'has-error' : ''}`;
        return (
            <div className={className}>
            <label>{label}</label>
            <div>
            <select  className="form-control" {...input}>
                {children}
            </select>
            <p className="control-label">{touched ? error : ''}</p>
            </div>
        </div>
        );
    }

    onSubmit(values) {
        this.props.addRegistration(values, () => {
            this.props.history.push('/registrations');
        });
    }


    render() {
        const { handleSubmit, loading } = this.props;
         if( loading ) {
            return <Spinner />;
        }
        return (
            <div>
                <PageHeader>Add Registration</PageHeader>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        name="project" 
                        component={this.renderSelectField} 
                        containerClass="col-sm-12"
                        label="Project">
                        <option value="">Please select ...</option>
                        {this.renderProjects()}
                    </Field>
                    <Field
                        label="Name"
                        name="name"
                        containerClass="col-sm-12"
                        component={this.renderField}
                    />
                    <Field
                        label="Description"
                        name="description"
                        containerClass="col-sm-12"
                        component={this.renderField}
                    />
                    <Field
                        label="Date"
                        name="date"
                        containerClass="col-sm-4"
                        component={this.renderField}
                    />
                    <Field
                        label="Hours"
                        name="hours"
                        type="number"
                        containerClass="col-sm-3"
                        component={this.renderField}
                    />
                    <Field
                        label="Minutes"
                        name="minutes"
                        type="number"
                        containerClass="col-sm-3"
                        component={this.renderField}
                    />
                    <Field
                        label="Price per hour"
                        name="price"
                        containerClass="col-sm-2"
                        component={this.renderField}
                    />
                    <div className="pull-right">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <Link to="/registrations" className="btn btn-danger" style={{marginLeft: 5}}>Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    // Validate inputs
    if(!values.name) {
        errors.name = "Enter a valid registration name!";
    }
    if(!values.description) {
        errors.description = "Enter a small description";
    }
    if(!values.project) {
        errors.project = "Enter the project!";
    } 
    if(!values.time) {
        errors.time = "Enter the time!";
    }
    if(!values.date) {
        errors.date = "Enter the date!";
    }
    if(!values.price) {
        errors.price = "Enter the price per hour!";
    }
    return errors;
}
function mapStateToProps({ projects }) {
    console.log(projects)
    return { 
        loading: projects.loading,
        error: projects.error,
        projects: projects.list
    };
}


export default reduxForm({
    validate,
    form: 'RegistrationsAddForm'
})(
    connect(mapStateToProps, { addRegistration, fetchProjects })(RegistrationsAdd)
);
