import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For interaction features

interface CalendarProps {
  events: { title: string; start: string; end?: string }[]; // Events format for FullCalendar
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={events} // Pass events to FullCalendar
      eventColor="#49BEF8" // Customize event color
    />
  );
};

export default Calendar;
