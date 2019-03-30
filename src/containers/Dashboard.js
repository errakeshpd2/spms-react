import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import Calendar from '../views/Dashboard/Calendar.js'
import DashboardStatistics from '../views/Dashboard/DashboardStatistics.js'
import TicketActivityLogForm from '../views/TicketActivityLogs/TicketActivityLogForm';

import api from '../helpers/api';
import { addTickets } from '../data/tickets/actions';
import { addTicketActivityLogs } from '../data/ticket_activity_logs/actions';
import { addDashboardStatistics } from '../data/dashboard/actions';
import { saveTicketActivityLogOption, addTicketActivityLog, updateTicketActivityLog} from '../data/ticket_activity_log/actions';
import { pushToTicketActivityLogs } from '../data/ticket_activity_logs/actions';
import { customValidationMessages, activityLogValidationRules } from '../helpers/auth';
import Validator from 'validatorjs';

class Dashboard extends React.Component {
  componentDidMount() {
    this.fetchDashboardApi();
  }

  fetchTickets = () => {
    const { addTickets, user } = this.props;
    api.tickets(user, 0)
    .then(({ data }) => {
      const { tickets } = data;
      addTickets(tickets);
    })
  }

  handleSlotSelection = (slotInfo) => {
    const { saveTicketActivityLogOption, addTicketActivityLog, user } = this.props;
    const ticket_activity_log = {
      data: {
        attributes: {
          activity: '',
          log_date: slotInfo.start,
          user_id: user.data.id,
        }
      },
      error: '',
      errors: {}
    }

    addTicketActivityLog(ticket_activity_log).then(()=>{
      Promise.resolve(this.fetchTickets()).then(()=>{
        saveTicketActivityLogOption({isModalOpen: true});
      })  
    }); 
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

  onCloseHandler = () => {
    const { saveTicketActivityLogOption } = this.props;
    saveTicketActivityLogOption({isModalOpen: false})
  }

  onChangeHandler = event => {
    const { updateTicketActivityLog } = this.props;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    updateTicketActivityLog(name, value);       
  };

  onSelectHandler = (event, data) => {    
    const { updateTicketActivityLog } = this.props;
    updateTicketActivityLog(data.name, data.value);  
  }

  onDateChangeHandler = (date, name) => {
    const { updateTicketActivityLog } = this.props;
    updateTicketActivityLog(name, date);      
  };

  saveTicketActivity = (validation) => {
    const { saveTicketActivityLogOption, pushToTicketActivityLogs, ticket_activity_log } = this.props;
    const ticketActivityInput = {
      ...ticket_activity_log.data.attributes
    }
    api.createTicketActivityLog(ticketActivityInput)
      .then(({data}) => {
        pushToTicketActivityLogs(data.ticket_activity_log).then(()=>{
          saveTicketActivityLogOption({ ...validation.errors, flashMessage: data.status, error: null, isModalOpen: false});
        })
      })
      .catch(error => {
        saveTicketActivityLogOption({ error: error.response.data.errors, ...validation.errors, flashMessage: null});
      });
  }


  render() {
    const { tickets, ticket_activity_logs, dashboard_statistics, ticket_activity_log } = this.props;
  
    const submitForm = (e) => {
      e.preventDefault();
      const { ticket_activity_log, saveTicketActivityLogOption } = this.props;
      const validation = new Validator(
        ticket_activity_log, 
        activityLogValidationRules,
        customValidationMessages
      );

      if (validation.fails()) {
        saveTicketActivityLogOption({ ...validation.errors});
        return false;
      } else {
        this.saveTicketActivity(validation)
      }
    };
  
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
        {ticket_activity_log && ticket_activity_log.isModalOpen && (
          <div>
            <TicketActivityLogForm
              isModalOpen={ticket_activity_log.isModalOpen}
              ticket_activity_log={ticket_activity_log}
              tickets={tickets}
              submitForm={submitForm}
              onCloseHandler={this.onCloseHandler}
              onChangeHandler={this.onChangeHandler}
              onSelectHandler={this.onSelectHandler}
              onDateChangeHandler={this.onDateChangeHandler}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => () => ({
  addTickets: (tickets) => dispatch(addTickets(tickets)),
  addTicketActivityLogs: (ticket_activity_logs) => dispatch(addTicketActivityLogs(ticket_activity_logs)),
  saveTicketActivityLogOption: (option) => dispatch(saveTicketActivityLogOption(option)),
  updateTicketActivityLog: (name, value) => dispatch(updateTicketActivityLog({[name]:value })),
  addTicketActivityLog: (ticket_activity_log) => {
    dispatch(addTicketActivityLog(ticket_activity_log))
    return Promise.resolve();
  },
  pushToTicketActivityLogs: (ticket_activity_log) => {
    dispatch(pushToTicketActivityLogs(ticket_activity_log))
    return Promise.resolve();
  },
  addDashboardStatistics: (statistics) => dispatch(addDashboardStatistics(statistics))
});

const mapStateToProps = ({ data: { user, ticket_activity_log, tickets, ticket_activity_logs, dashboard_statistics } }) => ({
  tickets,
  ticket_activity_logs,
  dashboard_statistics,
  ticket_activity_log,
  user
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)