import React from 'react';
import { Table, Dropdown } from 'semantic-ui-react';

  const ListRow = actionSelectionHandler => ticket => {
  const rowMenuOptions = [
    { key: 1, text: 'Edit', value: 'Edit' },
    { key: 2, text: 'Delete', value: 'Delete' }
  ];

  const { 
    attributes: {
      title,
      ticket_no,
      id,
      start_date,
      end_date,
      project,
      category,
      status
    }
  } = ticket;

  const handleActionChange = (e, { name, value }) => {
    e.preventDefault();
    actionSelectionHandler(value, ticket);
  };

  return (
    <Table.Row key={id}>
      <Table.Cell>{ticket_no}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>{project && project.data.attributes.name}</Table.Cell>
      <Table.Cell>{category}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell>{start_date}</Table.Cell>
      <Table.Cell>{end_date}</Table.Cell>
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
