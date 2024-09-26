import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface CalendarProps {
  events: { title: string; start: string; end?: string }[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const theme = useTheme();

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={events}
      headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next',
      }}
      titleFormat={{ year: 'numeric', month: 'long' }}
      buttonText={{
        month: 'Month',
        week: 'Week',
      }}
      buttonIcons={{
        prev: 'chevron-left',
        next: 'chevron-right',
      }}
      dayCellContent={(dayInfo) => <Typography variant="body2">{dayInfo.dayNumberText}</Typography>}
      eventContent={(eventInfo) => (
        <Typography
          variant="h6"
          sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.light }}
        >
          {eventInfo.event.title.replace('12a', '')}
        </Typography>
      )}
      eventColor={theme.palette.secondary.main}
      height="auto"
    />
  );
};

export default Calendar;
