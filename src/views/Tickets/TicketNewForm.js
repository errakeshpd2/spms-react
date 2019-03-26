import React, { Component } from 'react';
import TicketForm from './TicketForm';

class New extends Component {
  render() {
    return (
      <TicketForm
        {...this.props}
      />
    );
  }
}

export default New;
