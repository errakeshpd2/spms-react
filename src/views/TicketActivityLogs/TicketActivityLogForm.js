import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import DatePicker from 'react-datepicker';
import {
  Form,
  Button,
  Modal,
  Header,
  Icon,
  Message,
  Input,
  Select
} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

class TicketActivityLogForm extends Component {
  render() {
    const {
      ticket_activity_log,
      tickets,
      isModalOpen,
      onCloseHandler,
      onChangeHandler,
      onSelectHandler,
      onDateChangeHandler,
      submitForm
    } = this.props;

    const ticketOptions = !isEmpty(tickets) && tickets.data.map(function(
      ticket
    ) {
      return {
        text: ticket.attributes.ticket_no,
        key: ticket.id,
        value: parseInt(ticket.id, 10)
      };
    });

    return (
      <Modal
        open={isModalOpen}
        closeIcon
        onClose={onCloseHandler}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
      >
        <Modal.Header inverted style={{ color: 'white', background: 'teal'}}>
          {!ticket_activity_log.id && 'Create New Activity'}
          {ticket_activity_log.id && 'Edit Activity'}
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {ticket_activity_log.error && (
              <Message negative>
                <p>{ticket_activity_log.error}</p>
              </Message>
            )}
            <Form>
              <Header size="small" color="blue" />
              <Form.Group widths="equal">
                <Form.Field required error={ticket_activity_log.errors && !isEmpty(ticket_activity_log.errors['data.attributes.activity'])}>
                  <label>Activity</label>
                  <Input
                    name='activity'
                    value={ticket_activity_log.data.attributes.activity}
                    onChange={onChangeHandler}
                  />
                  {ticket_activity_log.errors && ticket_activity_log.errors['data.attributes.ticket_no'] && <span style={{color: 'red'}}>{ticket_activity_log.errors['data.attributes.activity']}</span>}
                </Form.Field>
              </Form.Group>
              <Form.Group >
                <Form.Field width={8} required error={ticket_activity_log.errors && !isEmpty(ticket_activity_log.errors['data.attributes.ticket_id'])}>
                  <label>Ticket</label>
                  <Select
                    placeholder="Select a ticket"
                    name='ticket_id'
                    options={ticketOptions}
                    onChange={(event, data) => onSelectHandler(event, data)}
                    value={ticket_activity_log.data.attributes.ticket_id}
                  />
                </Form.Field>
                <Form.Field required error={ticket_activity_log.errors && !isEmpty(ticket_activity_log.errors['data.attributes.log_time'])}>
                  <label>Log Time</label>
                  <Input
                    name='log_time'
                    value={ticket_activity_log.data.attributes.log_time}
                    onChange={onChangeHandler}
                  />
                  {ticket_activity_log.errors && ticket_activity_log.errors['data.attributes.log_time'] && <span style={{color: 'red'}}>{ticket_activity_log.errors['data.attributes.log_time']}</span>}
                </Form.Field>
                <Form.Field required error={ticket_activity_log.errors && !isEmpty(ticket_activity_log.errors['data.attributes.log_date'])}>
                  <label>Log Date:</label>
                  <DatePicker
                    style={{ padding: '0' }}
                    name='log_date'
                    selected={ticket_activity_log.data.attributes.log_date}
                    onChange={(date) => onDateChangeHandler(date, 'log_date')}
                    dateFormat='dd/MM/YYYY'
                  /><br/>
                  {ticket_activity_log.errors && ticket_activity_log.errors['data.attributes.log_date'] && <span style={{color: 'red'}}>{ticket_activity_log.errors['data.attributes.log_date']}</span>}
                </Form.Field>
              </Form.Group> 
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ color: 'white', background: 'teal'}}>
          <Button color="green" onClick={submitForm}>
            <Icon name="checkmark" /> Save
          </Button>
          <Button color="red" onClick={onCloseHandler}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default TicketActivityLogForm;
