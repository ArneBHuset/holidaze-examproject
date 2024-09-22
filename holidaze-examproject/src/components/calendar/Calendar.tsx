import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarProps {
  events: { title: string; start: string; end?: string }[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={events}
      eventColor="#49BEF8"
    />
  );
};

export default Calendar;
