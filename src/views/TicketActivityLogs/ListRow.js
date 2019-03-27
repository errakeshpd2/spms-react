import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';

  const ListRow = actionSelectionHandler => ticket_activity_log => {
  const rowMenuOptions = [
    { key: 1, text: 'Edit', value: 'Edit' },
    { key: 2, text: 'Delete', value: 'Delete' }
  ];

  const { 
    attributes: {
      id,
      activity,
      log_time,
      log_date,
      status,
      ticket_no
    }

  } = ticket_activity_log;

  const handleActionChange = (e, { name, value }) => {
    e.preventDefault();
    actionSelectionHandler(value, ticket_activity_log);
  };

  return (
    <Table.Row key={id}>
      <Table.Cell>{activity}</Table.Cell>
      <Table.Cell>{log_time}</Table.Cell>
      <Table.Cell>{log_date}</Table.Cell>
      <Table.Cell>{ticket_no}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell>
        <Dropdown
          text="Actions"
          options={rowMenuOptions}
          icon="ellipsis horizontal"
          onChange={handleActionChange}
          inline
          item
          selectOnBlur={false}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default ListRow;
