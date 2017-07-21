import _ from 'lodash';
import React, { Component } from 'react';
import { PageHeader, Alert, Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { invoiceDetails } from '../actions';
import { Spinner } from '../components/common';

class InvoicesDetails extends Component {
    componentWillMount(){
        if(!this.props.pojects){ 
            const { invoiceKey } = this.props.match.params;
            console.log(this.props.invoice);
            this.props.invoiceDetails(invoiceKey);
        }
    }
    renderRegistrations() {
        const { invoice } = this.props;
        return _.map(invoice.registrations, (registration, key) => {
            return(
                <tr key={key}>
                    <td><Link to={`/registrations/${key}`}>{registration.name}</Link></td>
                    <td>{registration.total}</td>
                    <td>
                      {this.props.appData.VAT} %
                    </td>
                    <td>{parseFloat(registration.total, 10) + (parseFloat(registration.total, 10) / 100 * parseFloat(this.props.appData.VAT, 10))}</td>
                </tr>
            );
        });
    }
    renderToInvoiceNet(){
      const { registrations } = this.props.invoice;
      let toInvoice = 0;  
      for (let reg in registrations) {
        console.log(reg);
              toInvoice += parseFloat(registrations[reg].total)
      }  
        //toInvoiceTotal = toInvoice/100*25;
      return toInvoice;
    }
    renderToInvoiceTotal(){
      const { registrations } = this.props.invoice;
      let toInvoice = 0;  
      let toInvoiceTotal = 0;
      for (let reg in registrations) {
        console.log(reg);
              toInvoice += parseFloat(registrations[reg].total)
      }  
        toInvoiceTotal = toInvoice + (parseFloat(toInvoice, 10) / 100 * 25);
      return toInvoiceTotal;
    }

    render() {
        const { appData, invoice, error } = this.props;
        const { invoiceKey } = this.props.match.params;
        if( error ) {
            return (
                <div>
                    <Alert bsStyle="danger">
                        <p>{error}</p>           
                    </Alert>
                </div>
            );
        }
        if (!invoice) {
            return (<Spinner />);
        }
        return (
            <div>
                <PageHeader>{invoice.project} <small>Invoice</small></PageHeader>

                 <Panel>
                   <h4>Invoice Nr.: {invoice.invoiceNumber}</h4>


                   <Table responsive>
                      <thead>                      
                      </thead>
                      <tbody>                    
                         <tr>
                           <td className="col-sm-6">
                             <div><strong>{appData.companyName}</strong></div>
                             <div>{appData.companyAddress}</div>
                             <div><strong>CVR nr.:</strong> {appData.companyCVR}</div>
                           </td>
                           <td className="col-sm-6">
                             <div><strong>{invoice.client}</strong></div>
                             <div>...</div>
                             <div><strong>CVR nr.:</strong>...</div>
                           </td>
                      </tr>                          
                      </tbody>
                      
                  </Table> 


                    <Table striped bordered hover responsive>
                      <thead>
                      <tr>
                          <th>Item</th>
                          <th>Net</th>
                          <th>VAT</th>
                          <th>Total</th>
                      </tr>
                      </thead>
                      <tbody>                    
                      {this.renderRegistrations()}                              
                      </tbody>
                      <thead>
                      <tr>
                          <th></th>
                          <th>{this.renderToInvoiceNet()} {appData.currency}</th>
                          <th></th>
                          <th className="text-success">{this.renderToInvoiceTotal()} {appData.currency}</th>
                      </tr>
                      </thead>
                  </Table>                  
                </Panel>               
            </div>
        );
    }
}

function mapStateToProps({ invoices, appData }, ownProps) {
    return { 
        invoice: invoices[ownProps.match.params.invoiceKey],
        error: invoices.error, 
        appData
    };
}

export default connect(mapStateToProps, { invoiceDetails})(InvoicesDetails);