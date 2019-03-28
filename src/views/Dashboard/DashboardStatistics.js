import React from 'react';
import { Grid, Card } from 'semantic-ui-react';

class DashboardStatistics extends React.Component {

  render() {
    const { dashboard_statistics } = this.props;
    return(
      <Grid stackable columns={4}>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Card>
              <Card.Content 
                header='Total Hours'
                style={{ color: 'white', background: '#00b5ad'}}
                textAlign='center'/>
              <Card.Content 
                meta={dashboard_statistics.total_hours_in_current_month}
                description='Total number of hours logged in current month'
                textAlign='center'
              />
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content
                header='Total Activities'
                textAlign='center'
                style={{ color: 'white', background: '#00b5ad'}}
              />
              <Card.Content 
                meta={dashboard_statistics.total_activities_of_current_month}
                description='Total number of activities recorded in current month'
                textAlign='center'
              />
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content
                header='Total Tickets'
                textAlign='center'
                style={{ color: 'white', background: '#00b5ad'}}
              />
              <Card.Content
                meta={dashboard_statistics.total_tickets_of_current_month}
                description='Total number of tickets assigned in current month'
                textAlign='center'
              />
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content
                header='Last Months Hours'
                textAlign='center'
                style={{ color: 'white', background: '#00b5ad'}}
              />
              <Card.Content
                meta={dashboard_statistics.total_hours_in_previous_month}
                description='Total number of hours logged in previous month'
                textAlign='center'
              />
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default DashboardStatistics;