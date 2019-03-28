import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import Calendar from '../views/Dashboard/Calendar.js'
import DashboardStatistics from '../views/Dashboard/DashboardStatistics.js'

import api from '../helpers/api';
import { addTickets } from '../data/tickets/actions';
import { addTicketActivityLogs } from '../data/ticket_activity_logs/actions';
import { addDashboardStatistics } from '../data/dashboard/actions';
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
    const { addTickets, addTicketActivityLogs, addDashboardStatistics } = this.props;
    api.dashboard(date)
    .then(({data}) => {
      const { dashboard: { data: { attributes: { 
        tickets,
        ticket_activity_logs,
        total_hours_in_current_month,
        total_activities_of_current_month,
        total_tickets_of_current_month,
        total_hours_in_previous_month 
      }}}} = data;
      debugger;
      addDashboardStatistics({
        total_hours_in_current_month,
        total_activities_of_current_month,
        total_tickets_of_current_month,
        total_hours_in_previous_month
      })
      addTickets(tickets);
      addTicketActivityLogs(ticket_activity_logs);
    })
  }

  render() {
    const { tickets, ticket_activity_logs, dashboard_statistics } = this.props;
    return (
      <div className='content'>
        <Segment>
          <DashboardStatistics dashboard_statistics={dashboard_statistics} />
        </Segment>
        <br/>
        <Segment>
          <Calendar
            tickets={tickets}
            ticket_activity_logs={ticket_activity_logs}
            handleEventSelection={this.handleEventSelection}
            handleSlotSelection={this.handleSlotSelection}
          />
        </Segment>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => () => ({
  addTickets: (tickets) => dispatch(addTickets(tickets)),
  addTicketActivityLogs: (tickets) => dispatch(addTicketActivityLogs(tickets)),
  addDashboardStatistics: (statistics) => dispatch(addDashboardStatistics(statistics))
});

const mapStateToProps = ({ data: { tickets, ticket_activity_logs, dashboard_statistics } }) => ({
  tickets,
  ticket_activity_logs,
  dashboard_statistics
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)