import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

class EnsureLoggedInContainer extends Component {
  componentDidMount(){
    const { dispatch, currentURL } = this.props;
        if (!loggedIn) {
          // set the current url/path for future redirection (we use a Redux action)
          // then redirect (we use a React Router method)
          dispatch(setRedirectUrl(currentURL))
          browserHistory.replace("/login")
        }
  }
  render() {
    if (loggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps({ auth }, ownProps) {
  return {
    loggedIn: auth.loggedIn,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer);
