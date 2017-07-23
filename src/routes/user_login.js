import firebase from 'firebase';
import React, { Component } from 'react';
import { Panel, Alert } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions';

class UserLogin extends Component {

  componentWillMount(){
    var config = {
    apiKey: "AIzaSyBRYMDh-hJEYpWI1mg_2P36bvjT3n7jhuo",
    authDomain: "reactfreelance.firebaseapp.com",
    databaseURL: "https://reactfreelance.firebaseio.com",
    projectId: "reactfreelance",
    storageBucket: "",
    messagingSenderId: "1020252082009" 
    };

    const user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log('USER LOGGED')
    } else {
      console.log('NO USER')
      // No user is signed in.
    }
  }
  
  renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type={ field.type || 'text'}
                    className="form-control"
                    placeholder={field.placeholder}
                    ref={field.ref}
                    {...field.input}
                />
                <p className="control-label">{touched ? error : ''}</p>
            </div>
        );
    }
    resetForm(){
      this.props.reset()
    }
    onSubmit({userEmail, userPassword}) {
        this.props.loginUser({userEmail, userPassword}, (redirectRoute) => {
            this.props.history.push(redirectRoute);
        });
    }

    onLogoutClick(){
      this.props.logoutUser((redirectRoute) => {
            this.props.history.push(redirectRoute);
        });
    }

  renderErrorAlert(){
    const { error } = this.props;
    if( error ) {
            return (
                <div>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
  }
  render() {
    const { handleSubmit } = this.props;
    const { currentUser } = firebase.auth();
    if( !currentUser ){
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          <h3>Login</h3>
        <Panel>
          {this.renderErrorAlert()}
          <form name="loginForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
              label="Email"
              name="userEmail"
              placeholder="email"
              component={this.renderField}
          />
          <Field
              label="Password"
              name="userPassword"
              placeholder="password"
              type="password"
              component={this.renderField}
          />
          <div className="pull-right">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="reset" className="btn btn-danger" style={{marginLeft: 5}} onClick={this.resetForm.bind(this)}>Cancel</button>
          </div>
          </form>
        </Panel>
      </div>
      </div>
    );
  }// if !currentUser
  else {
    return(
      <div>
        <h2>{currentUser.uid}</h2>
        <button onClick={this.onLogoutClick.bind(this)} >Logout </button>
      </div>
    )};
  }
}


function validate(values) {
    const errors = {};

    // Validate inputs
     if(!values.userPassword) {
        errors.userPassword = "Password is required!";
    }
   
    if(!values.userEmail) {
        errors.userEmail = "Enter you email address!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)) {
        errors.userEmail = 'Invalid email address'
    } 
   

    // if errors is empty, the form is valid and can be submitted
    // if errors has any properties, the form is invalid
    return errors;
}

function mapStateToProps({ auth, appData }) {
    return { 
        loading: auth.loading,
        error: auth.error,
        appData
    };
}

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(mapStateToProps, { loginUser, logoutUser })(UserLogin)
);
