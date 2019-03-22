import React from 'react';
import { isEmpty } from 'lodash';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class Calendar extends React.Component {
  eventStyleGetter = (event) =>{
    var backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
    };
    return {
        style: style
    };
  }
  render() {
    const { tickets, ticket_activity_logs, handleNavigate, handleSlotSelection, handleEventSelection } = this.props;

    const events = !isEmpty(tickets) && tickets.data.map(ticket => {
      return {
        title: ticket.attributes.title,
        start: new Date(ticket.attributes.start_date),
        end: new Date(ticket.attributes.end_date),
      }
    });
  
    const activity_logs = !isEmpty(ticket_activity_logs) && ticket_activity_logs.data.map(ticket_activity => {
      return {
        title: ticket_activity.attributes.activity,
        start: new Date(ticket_activity.attributes.log_date),
        end: new Date(ticket_activity.attributes.log_date),
        hexColor: '87ceeb'
      }
    });

    const localizer = BigCalendar.momentLocalizer(moment) 
    return (
      <div style={{ height: 700 }}>
        {!isEmpty(tickets) && (
          <BigCalendar
            localizer={localizer}
            events={events.concat(activity_logs)}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onNavigate={handleNavigate}
            onSelectSlot={(handleSlotSelection)}
            onSelectEvent={(handleEventSelection)}
            eventPropGetter={(this.eventStyleGetter)}
          />
        )}
      </div>
    );
  }
}

export default Calendar;
