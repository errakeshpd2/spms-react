import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'loadsh'
import { Button, Message } from 'semantic-ui-react';
import Validator from 'validatorjs';

import TicketActivityList from '../views/TicketActivityLogs/TicketActivityList.js';
import TicketActivityLogForm from '../views/TicketActivityLogs/TicketActivityLogForm';
import { addTickets } from '../data/tickets/actions';

import api from '../helpers/api';
import { addTicketActivityLogs, pushToTicketActivityLogs, removeFromTicketActivityLogs, refreshTicketActivityLogs } from '../data/ticket_activity_logs/actions';
import { saveTicketActivityLogOption, addTicketActivityLog, updateTicketActivityLog} from '../data/ticket_activity_log/actions';
import { customValidationMessages } from '../helpers/auth';

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

  fetchTickets = () => {
    const { addTickets, user } = this.props;
    api.tickets(user, 0)
    .then(({ data }) => {
      const { tickets } = data;
      addTickets(tickets);
    })
  }

  onSelectTicketActivityLog = (action, activity) => {
    const { addTicketActivityLog, saveTicketActivityLogOption } = this.props;
    addTicketActivityLog({ data: { ...activity }});

    switch (action) {
      case 'Edit':
        Promise.resolve(this.fetchTickets()).then(()=>{
          saveTicketActivityLogOption({isModalOpen: true});
        })  
        break;
      case 'Delete':
        saveTicketActivityLogOption({ isDeleteModalOpen: true });
        break;
      default:
    }
  }

  openNewForm = () => {
    const { saveTicketActivityLogOption, addTicketActivityLog, user } = this.props;
    const ticket_activity_log = {
      data: {
        attributes: {
          activity: '',
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
        debugger;
        pushToTicketActivityLogs(data.ticket_activity_log).then(()=>{
          debugger;
          saveTicketActivityLogOption({ ...validation.errors, flashMessage: data.status, error: null, isModalOpen: false});
        })
      })
      .catch(error => {
        saveTicketActivityLogOption({ error: error.response.data.errors, ...validation.errors, flashMessage: null});
      });
  }

  updateTicketActivity = (validation) => {
    const { saveTicketActivityLogOption, refreshTicketActivityLogs, ticket_activity_log } = this.props;
    const ticketActivityInput = {
      ...ticket_activity_log.data.attributes
    }

    api.updateTicketActivityLog(ticketActivityInput, ticket_activity_log.data.id)
      .then(({data}) => {
        refreshTicketActivityLogs(data.ticket_activity_log).then(()=>{
          saveTicketActivityLogOption({ data: {}, ...validation.errors, flashMessage: data.status, error: null, isModalOpen: false});
        })
      })
      .catch(error => {
        saveTicketActivityLogOption({ data: {}, error: error.response.data.errors, ...validation.errors, flashMessage: null});
      });
  }

  render() {
    const { ticket_activity_logs, ticket_activity_log, tickets} = this.props;
    const validationRules = {
      data: {
        attributes: {
          activity: 'required',
          ticket_id: 'required',
          log_date: 'required',
          log_time: ['required','numeric']
        }
      },
    };
  
    const submitForm = (e) => {
      e.preventDefault();
      const { ticket_activity_log, saveTicketActivityLogOption } = this.props;
      const validation = new Validator(
        ticket_activity_log, 
        validationRules,
        customValidationMessages
      );

      if (validation.fails()) {
        saveTicketActivityLogOption({ ...validation.errors});
        return false;
      } else {
        if(isEmpty(ticket_activity_log.data.id)){
          this.saveTicketActivity(validation)
        } else {
          this.updateTicketActivity(validation)
        } 
      }
    };
    return (
      <div>
        <Button color="green" onClick={this.openNewForm} inverted>
          Create New Activity
        </Button>
        <br />
        <br />
        {ticket_activity_log && ticket_activity_log.flashMessage && (
          <Message
            onDismiss={this.handleDismiss}
            content={ticket_activity_log.flashMessage}
            positive
          />
        )}
        {ticket_activity_log && ticket_activity_log.error && (
          <Message
            onDismiss={this.handleDismiss}
            content={ticket_activity_log.error}
            negative
          />
        )}
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
  removeFromTicketActivityLogs: (id) => {
    dispatch(removeFromTicketActivityLogs(id))
    return Promise.resolve();
  },
  refreshTicketActivityLogs: (ticket_activity_log) => {
    dispatch(refreshTicketActivityLogs(ticket_activity_log))
    return Promise.resolve();
  }
});

const mapStateToProps = ({ data: { user, tickets, ticket_activity_logs, ticket_activity_log } }) => ({
  user,
  tickets,
  ticket_activity_logs,
  ticket_activity_log
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketActivityLogs)
