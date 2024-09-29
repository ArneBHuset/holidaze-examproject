import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTheme } from '@mui/material/styles';
import { alpha, Typography } from '@mui/material';
import { CalendarProps } from '../../services/interfaces/CalendarProps.ts';

const Calendar: React.FC<CalendarProps> = ({ events, onEventClick }) => {
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
          role="button"
          tabIndex={0}
          aria-label={`Event: ${eventInfo.event.title}`}
          sx={{
            backgroundColor: alpha(theme.palette.secondary.main, 0.8),
            color: theme.palette.primary.main,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha(theme.palette.secondary.main, 1),
              textDecoration:'underline'
            },
          }}
          onClick={() => onEventClick && onEventClick(eventInfo.event)}
        >
          {eventInfo.event.title.replace('12a', '')}
        </Typography>
      )}
      eventColor={alpha(theme.palette.secondary.main, 0.7)}
      height="auto"
      eventClick={(eventInfo) => {
        if (onEventClick) {
          onEventClick(eventInfo.event);
        }
      }}
    />
  );
};

export default Calendar;
