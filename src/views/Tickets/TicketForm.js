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
  TextArea,
  Select
} from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';


import { TICKET_CATEGORIES, TICKET_STATUS } from '../../constants';

class TicketForm extends Component {
  render() {
    const {
      ticket,
      user:{
        data: {
          attributes: {
            projects
          }
        }
      },
      isModalOpen,
      onCloseHandler,
      onChangeHandler,
      onSelectHandler,
      onDateChangeHandler,
      submitForm
    } = this.props;

    const projectOptions = projects.data.map(function(
      project
    ) {
      return {
        text: project.attributes.name,
        key: project.id,
        value: parseInt(project.id, 10)
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
        <Modal.Header style={{ color: 'white', background: 'teal'}}>
          {!ticket.id && 'Create New Ticket'}
          {ticket.id && 'Edit Ticket'}
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {ticket.error && (
              <Message negative>
                <p>{ticket.error}</p>
              </Message>
            )}
            <Form>
              <Header size="small" color="blue" />
              <Form.Group>
                <Form.Field required width={4} error={ticket.errors && !isEmpty(ticket.errors['data.attributes.ticket_no'])}>
                  <label>Ticket #</label>
                  <Input
                    name='ticket_no'
                    value={ticket.data.attributes.ticket_no}
                    onChange={onChangeHandler}
                  />
                  {ticket.errors && ticket.errors['data.attributes.ticket_no'] && <span style={{color: 'red'}}>{ticket.errors['data.attributes.ticket_no']}</span>}
                </Form.Field>
                <Form.Field required width={12} error={ticket.errors && !isEmpty(ticket.errors['data.attributes.title'])}>
                  <label>Title</label>
                  <Input
                    name='title'
                    value={ticket.data.attributes.title}
                    onChange={onChangeHandler}
                  />
                  {ticket.errors && ticket.errors['data.attributes.title'] && <span style={{color: 'red'}}>{ticket.errors['data.attributes.title']}</span>}
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Description</label>
                  <TextArea
                    name='description'
                    value={ticket.data.attributes.description}
                    onChange={onChangeHandler}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field required error={ticket.errors && !isEmpty(ticket.errors['data.attributes.project_id'])}>
                  <label>Project</label>
                  <Select
                    placeholder="Select a project"
                    name='project_id'
                    options={projectOptions}
                    onChange={(event, data) => onSelectHandler(event, data)}
                    value={ticket.data.attributes.project_id}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Category</label>
                  <Select
                    placeholder="Select a category"
                    name='category'
                    options={TICKET_CATEGORIES}
                    onChange={(event, data) => onSelectHandler(event, data)}
                    value={ticket.data.attributes.category}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Status</label>
                  <Select
                    placeholder="Select a status"
                    name='status'
                    options={TICKET_STATUS}
                    onChange={(event, data) => onSelectHandler(event, data)}
                    value={ticket.data.attributes.status}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field width={4}>
                  <label>Maximum Permitted Time</label>
                  <Input
                    name='maximum_permitted_time'
                    value={ticket.data.attributes.maximum_permitted_time}
                    onChange={onChangeHandler}
                  />
                  {ticket.errors && ticket.errors['data.attributes.maximum_permitted_time'] && <span style={{color: 'red'}}>{ticket.errors['data.attributes.maximum_permitted_time']}</span>}
                </Form.Field>
                <Form.Field required width={6} error={ticket.errors && !isEmpty(ticket.errors['data.attributes.start_date'])}>
                  <label>Start Date:</label>
                  <DatePicker
                    style={{ padding: '0' }}
                    name='start_date'
                    selected={ticket.data.attributes.start_date}
                    onChange={(date) => onDateChangeHandler(date, 'start_date')}
                    dateFormat='dd/MM/YYYY'
                  /><br/>
                  {ticket.errors && ticket.errors['data.attributes.start_date'] && <span style={{color: 'red'}}>{ticket.errors['data.attributes.start_date']}</span>}
                </Form.Field>
                <Form.Field width={6}>
                  <label>End Date:</label>
                  <DatePicker
                    style={{ padding: '0' }}
                    name='end_date'
                    selected={ticket.data.attributes.end_date}
                    onChange={(date) => onDateChangeHandler(date, 'end_date')}
                    dateFormat='dd/MM/YYYY'
                  />
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

export default TicketForm;
