import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'loadsh'
import { Button, Message } from 'semantic-ui-react';
import Validator from 'validatorjs';

import TicketList from '../views/Tickets/TicketList.js';
import TicketNewForm from '../views/Tickets/TicketNewForm';

import api from '../helpers/api';
import { addTickets, pushToTickets } from '../data/tickets/actions';
import { saveTicketOption, addTicket, updateTicket} from '../data/ticket/actions';

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

  openNewForm = () => {
    const { saveTicketOption, addTicket, user } = this.props;
    const ticket = {
      data: {
        attributes: {
          title: '',
          assigned_user_id: user.data.id,
          created_user_id: user.data.id,
          created_user_type: 'User'
        }
      },
      error: '',
      errors: {}
    }

    addTicket(ticket).then(()=>{
      saveTicketOption({isNewModalOpen: true});
    })    
  }

  onCloseHandler = () => {
    const { saveTicketOption } = this.props;
    saveTicketOption({isNewModalOpen: false})
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
      const { ticket, saveTicketOption, pushToTickets } = this.props;
      const validation = new Validator(
        ticket, 
        validationRules,
        { required: 'required',
          numeric: 'must be a number' 
        }
      );

      if (validation.fails()) {
        saveTicketOption({ ...validation.errors});
        return false;
      } else {
        const ticketInput = {
          ...ticket.data.attributes
        }
        api.createTicket(ticketInput)
        .then(({data}) => {
          pushToTickets(data.ticket).then(()=>{
            saveTicketOption({ ...validation.errors, flashMessage: data.status, error: null, isNewModalOpen: false});
          })
        })
        .catch(error => {
          saveTicketOption({ error: error.response.data.errors, ...validation.errors, flashMessage: null});
        });
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
        {!isEmpty(tickets) && (
          <TicketList 
            tickets={tickets} 
            actionSelectionHandler={this.onSelectTicket}
          />
        )}
        {ticket && ticket.isNewModalOpen && (
          <div>
            <TicketNewForm
              isNewModalOpen={ticket.isNewModalOpen}
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
  }
});

const mapStateToProps = ({ data: { user, tickets, ticket } }) => ({
  user,
  tickets,
  ticket
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
