import React from 'react';
import { Table, Header, Pagination } from 'semantic-ui-react';

import ListRow from './ListRow';

class TicketActivityList extends React.Component {
  state = {
    activePage: 5,
    boundaryRange: 1,
    totalPages: 5,
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const {
      activePage,
      boundaryRange,
      totalPages,
    } = this.state

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
        <Pagination
          activePage={activePage}
          boundaryRange={boundaryRange}
          onPageChange={this.handlePaginationChange}
          totalPages={totalPages}
          />
      </div>
    );
  }
}

export default TicketActivityList;
