import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectInvoice extends Component {
  render() {
    return (
      <div>
        <h1>Invoice</h1>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    state
  }
}


export default connect(mapStateToProps, {})(ProjectInvoice);
