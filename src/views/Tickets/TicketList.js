import React from 'react';
import { Table, Header } from 'semantic-ui-react';

import ListRow from './ListRow';

class TicketList extends React.Component {
  render() {
    const {tickets, actionSelectionHandler} = this.props;
    const listRow = ListRow(actionSelectionHandler);

    const headerRow = (
      <Table.Row>
        <Table.HeaderCell>Ticket ID</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Project</Table.HeaderCell>
        <Table.HeaderCell>Start Date</Table.HeaderCell>
        <Table.HeaderCell>End Date</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    );

    return (
      <div>
        <Header>Tickets</Header>
        <Table
          celled
          selectable
          padded
          renderBodyRow={listRow}
          tableData={tickets.data}
          headerRow={headerRow}
          size="small"
          striped
          singleLine
        />
      </div>
    );
  }
}

export default TicketList;
