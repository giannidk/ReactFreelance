import firebase from 'firebase';
import React, { Component } from 'react';
import { Panel, Alert } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged,loginUser, logoutUser } from '../actions';

class UserLogin extends Component {
   componentDidMount() {
     firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          //console.log(user);
        }
      });
      // initializing default values for the form
      const { initialize, userEmail, userPassword } = this.props;
       initialize({
          userEmail: userEmail,
          userPassword: userPassword                      
        }); 
    }

onEmailChange(text) {
    //console.log(text.target.value);
    this.props.emailChanged(text.target.value);
}
onPasswordChange(text) {
      //console.log(text.target.value);
    this.props.passwordChanged(text.target.value);
}


onSubmit() {
    const { userEmail, userPassword } = this.props;
    this.props.loginUser({ userEmail, userPassword }, () => {
      this.props.history.push('/dashboard');
    });
}

onLogoutClick(){
  //console.log('logging out...');
  this.props.logoutUser();
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
  render() {
    const { handleSubmit, userEmail, userPassword  } = this.props;
    const { currentUser } = firebase.auth();
    return (
      <div className="loginOuterContainer">
        <div className="loginInnerContainer col-xs-12 col-sm-8 col-md-6 col-lg-4">
          <h3>Login</h3>
        <Panel>
          {this.renderErrorAlert()}
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
              label="Email"
              name="userEmail"
              placeholder="email"
              value={userEmail}
              onChange={this.onEmailChange.bind(this)}
              component={this.renderField}
          />
          <Field
              label="Password"
              name="userPassword"
              placeholder="password"
              type="password"
              value={userPassword}
              onChange={this.onPasswordChange.bind(this)}
              component={this.renderField}
          />
          <div className="pull-right">
              <button type="submit" className="btn btn-primary">Log in</button>
              <button type="button" className="btn btn-warning" style={{marginLeft: 5}} onClick={this.onLogoutClick.bind(this)}>Log out</button>
              <button type="reset" className="btn btn-danger" style={{marginLeft: 5}} onClick={() => {this.props.reset()}}>Cancel</button>
          </div>
          </form>
        </Panel>
      </div>
      </div>
    );
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

const mapStateToProps = ({ auth }) => {
    const { userEmail, userPassword, error, loading } = auth;
    return { userEmail, userPassword, error, loading };
};

export default reduxForm({
    validate,
    form: 'loginForm'
})(
    connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, logoutUser })(UserLogin)
);
