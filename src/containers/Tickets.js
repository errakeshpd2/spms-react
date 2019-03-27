import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'loadsh'
import { Button, Message, Confirm } from 'semantic-ui-react';
import Validator from 'validatorjs';

import TicketList from '../views/Tickets/TicketList.js';
import TicketForm from '../views/Tickets/TicketForm';

import api from '../helpers/api';
import { addTickets, pushToTickets, removeFromTickets, refreshTickets } from '../data/tickets/actions';
import { saveTicketOption, addTicket, updateTicket} from '../data/ticket/actions';
import { customValidationMessages } from '../helpers/auth';

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
    const { addTicket, saveTicketOption } = this.props;
    addTicket({ data: { ...ticket }});

    switch (action) {
      case 'Edit':
        saveTicketOption({ isModalOpen: true });
        break;
      case 'Delete':
        saveTicketOption({ isDeleteModalOpen: true });
        break;
      default:
    }
  }

  openNewForm = () => {
    const { saveTicketOption, addTicket, user } = this.props;
    const ticket = {
      data: {
        attributes: {
          title: '',
          maximum_permitted_time: '',
          assigned_user_id: user.data.id,
          created_user_id: user.data.id,
          created_user_type: 'User'
        }
      },
      error: '',
      errors: {}
    }

    addTicket(ticket).then(()=>{
      saveTicketOption({isModalOpen: true});
    })    
  }

  onCloseHandler = () => {
    const { saveTicketOption } = this.props;
    saveTicketOption({isModalOpen: false})
  }

  onChangeHandler = event => {
    const { updateTicket } = this.props;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    updateTicket(name, value);       
  };

  onSelectHandler = (event, data) => {    
    const { updateTicket } = this.props;
    updateTicket(data.name, data.value);  
  }

  onDateChangeHandler = (date, name) => {
    const { updateTicket } = this.props;
    updateTicket(name, date);      
  };

  handleDeleteCancel = () => {
    const { saveTicketOption } = this.props;
    saveTicketOption({ data: {}, isDeleteModalOpen: false })
  }

  handleDeleteConfirm = () => {
    const { saveTicketOption, removeFromTickets, ticket } = this.props;

    api.deleteTicket(ticket)
      .then(({data}) => {
        removeFromTickets(ticket.data.id).then(()=>{
          saveTicketOption({ flashMessage: data.status, error: null, isDeleteModalOpen: false});
        })
      })
      .catch(error => {
                  debugger;
        saveTicketOption({ error: error.response.data.error, flashMessage: null, isDeleteModalOpen: false});
      });
  }

  saveTicket = (validation) => {
    const { saveTicketOption, pushToTickets, ticket } = this.props;
    const ticketInput = {
      ...ticket.data.attributes
    }
    api.createTicket(ticketInput)
      .then(({data}) => {
        pushToTickets(data.ticket).then(()=>{
          saveTicketOption({ ...validation.errors, flashMessage: data.status, error: null, isModalOpen: false});
        })
      })
      .catch(error => {
        saveTicketOption({ error: error.response.data.errors, ...validation.errors, flashMessage: null});
      });
  }

  updateTicket = (validation) => {
    const { saveTicketOption, refreshTickets, ticket } = this.props;
    const ticketInput = {
      ...ticket.data.attributes
    }

    api.updateTicket(ticketInput, ticket.data.id)
      .then(({data}) => {
        debugger;
        refreshTickets(data.ticket).then(()=>{
          saveTicketOption({ ...validation.errors, flashMessage: data.status, error: null, isModalOpen: false});
        })
      })
      .catch(error => {
        saveTicketOption({ error: error.response.data.errors, ...validation.errors, flashMessage: null});
      });
  }

  render() {
    const { tickets, ticket, user } = this.props;
    
    const validationRules = {
      data: {
        attributes: {
          title: 'required',
          ticket_no: 'required',
          project_id: 'required',
          start_date: 'required',
          maximum_permitted_time: 'numeric'
        }
      },
    };
  
    const submitForm = (e) => {
      e.preventDefault();
      const { ticket, saveTicketOption } = this.props;
      const validation = new Validator(
        ticket, 
        validationRules,
        customValidationMessages
      );

      if (validation.fails()) {
        saveTicketOption({ ...validation.errors});
        return false;
      } else {
        if(isEmpty(ticket.data.id)){
          this.saveTicket(validation)
        } else {
          this.updateTicket(validation)
        } 
      }
    };
    return (
      <div>
        <Button color="green" onClick={this.openNewForm} inverted>
          Create New Ticket
        </Button>
        <br />
        <br />
        {ticket && ticket.flashMessage && (
          <Message
            onDismiss={this.handleDismiss}
            content={ticket.flashMessage}
            positive
          />
        )}
        {ticket && ticket.error && (
          <Message
            onDismiss={this.handleDismiss}
            content={ticket.error}
            negative
          />
        )}
        {!isEmpty(tickets) && (
          <TicketList 
            tickets={tickets} 
            actionSelectionHandler={this.onSelectTicket}
          />
        )}
        {ticket && ticket.isModalOpen && (
          <div>
            <TicketForm
              isModalOpen={ticket.isModalOpen}
              ticket={ticket}
              user={user}
              submitForm={submitForm}
              onCloseHandler={this.onCloseHandler}
              onChangeHandler={this.onChangeHandler}
              onSelectHandler={this.onSelectHandler}
              onDateChangeHandler={this.onDateChangeHandler}
            />
          </div>
        )}
        {ticket && ticket.isDeleteModalOpen && (
          <Confirm
            open={ticket.isDeleteModalOpen}
            onCancel={this.handleDeleteCancel}
            onConfirm={this.handleDeleteConfirm}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => () => ({
  addTickets: (tickets) => dispatch(addTickets(tickets)),
  saveTicketOption: (option) => dispatch(saveTicketOption(option)),
  updateTicket: (name, value) => dispatch(updateTicket({[name]:value })),
  addTicket: (ticket) => {
    dispatch(addTicket(ticket))
    return Promise.resolve();
  },
  pushToTickets: (ticket) => {
    dispatch(pushToTickets(ticket))
    return Promise.resolve();
  },
  removeFromTickets: (ticketId) => {
    dispatch(removeFromTickets(ticketId))
    return Promise.resolve();
  },
  refreshTickets: (ticket) => {
    dispatch(refreshTickets(ticket))
    return Promise.resolve();
  }
});

const mapStateToProps = ({ data: { user, tickets, ticket } }) => ({
  user,
  tickets,
  ticket
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
