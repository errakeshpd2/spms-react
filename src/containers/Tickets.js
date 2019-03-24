import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'loadsh'
import TicketList from '../views/Tickets/TicketList.js';
import api from '../helpers/api';
import { addTickets } from '../data/tickets/actions';

class Tickets extends React.Component {
  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = () => {
    const { addTickets, user } = this.props;
    api.tickets(user, 0)
    .then(({ data }) => {
      const { tickets } = data;
      addTickets(tickets);
    })
  }

  onSelectTicket = (action, ticket) => {
    switch (action) {
      case 'Edit':
        break;
      case 'Delete':
        break;
      default:
    }
  }

  render() {
    const { tickets } = this.props;
    return (
      <div className="content">
        {!isEmpty(tickets) && (
          <TicketList 
            tickets={tickets} 
            actionSelectionHandler={this.onSelectTicket}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => () => ({
  addTickets: (tickets) => dispatch(addTickets(tickets))
});

const mapStateToProps = ({ data: { user, tickets } }) => ({
  user,
  tickets
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
