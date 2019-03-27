import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'loadsh'

import TicketActivityList from '../views/TicketActivityLogs/TicketActivityList.js';

import api from '../helpers/api';
import { addTicketActivityLogs } from '../data/ticket_activity_logs/actions';

class TicketActivityLogs extends React.Component {
  componentDidMount() {
    this.fetchTicketActivityLogs();
  }

  fetchTicketActivityLogs = () => {
    const { addTicketActivityLogs, user } = this.props;
    api.ticketActivityLogs(user, 0)
    .then(({ data }) => {
      const { ticket_activity_logs } = data;
      addTicketActivityLogs(ticket_activity_logs);
    })
  }

  onSelectTicketActivityLog = (action, activity) => {
  
  }

  render() {
    const { ticket_activity_logs} = this.props;

    return (
      <div>
        {!isEmpty(ticket_activity_logs) && (
          <TicketActivityList 
            ticket_activity_logs={ticket_activity_logs} 
            actionSelectionHandler={this.onSelectTicketActivityLog}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => () => ({
  addTicketActivityLogs: (ticket_activity_logs) => dispatch(addTicketActivityLogs(ticket_activity_logs)),
});

const mapStateToProps = ({ data: { user, ticket_activity_logs } }) => ({
  user,
  ticket_activity_logs
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketActivityLogs)
