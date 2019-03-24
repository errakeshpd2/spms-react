import React from 'react';
import { connect } from 'react-redux';

import Calendar from '../views/Dashboard/Calendar.js'
import api from '../helpers/api';
import { addTickets } from '../data/tickets/actions';
import { addTicketActivityLogs } from '../data/ticket_activity_logs/actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.fetchDashboardApi();
  }

  handleSlotSelection = (slotInfo) => {
    debugger;
  }

  handleEventSelection = (event) => {
    debugger;
  }

  fetchDashboardApi = (date) => {
    const { addTickets, addTicketActivityLogs } = this.props;
    api.dashboard(date)
    .then(({data}) => {
      const { dashboard: { data: { attributes: { tickets, ticket_activity_logs }}}} = data;
      addTickets(tickets);
      addTicketActivityLogs(ticket_activity_logs);
    })
  }

  render() {
    const { tickets, ticket_activity_logs } = this.props;
    return (
      <div className='content'>
        <Calendar
          tickets={tickets}
          ticket_activity_logs={ticket_activity_logs}
          handleEventSelection={this.handleEventSelection}
          handleSlotSelection={this.handleSlotSelection}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => () => ({
  addTickets: (tickets) => dispatch(addTickets(tickets)),
  addTicketActivityLogs: (tickets) => dispatch(addTicketActivityLogs(tickets)),
});

const mapStateToProps = ({ data: { tickets, ticket_activity_logs } }) => ({
  tickets,
  ticket_activity_logs
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)