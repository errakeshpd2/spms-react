import React from 'react';
import { Table, Header } from 'semantic-ui-react';

import ListRow from './ListRow';

class TicketActivityList extends React.Component {
  render() {
    const {ticket_activity_logs, actionSelectionHandler} = this.props;
    const listRow = ListRow(actionSelectionHandler);

    const headerRow = (
      <Table.Row>
        <Table.HeaderCell>Activity</Table.HeaderCell>
        <Table.HeaderCell>Log Time</Table.HeaderCell>
        <Table.HeaderCell>Log Date</Table.HeaderCell>
        <Table.HeaderCell>Ticket No</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    );

    return (
      <div>
        <Header>Ticket Activity Logs</Header>
        <Table
          celled
          selectable
          padded
          renderBodyRow={listRow}
          tableData={ticket_activity_logs.data}
          headerRow={headerRow}
          size="small"
          striped
          singleLine
        />
      </div>
    );
  }
}

export default TicketActivityList;
