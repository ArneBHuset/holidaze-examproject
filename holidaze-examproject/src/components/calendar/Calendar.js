import { jsx as _jsx } from 'react/jsx-runtime';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTheme } from '@mui/material/styles';
import { alpha, Typography } from '@mui/material';
const Calendar = ({ events, onEventClick }) => {
  const theme = useTheme();
  return _jsx(FullCalendar, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: events,
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next',
    },
    titleFormat: { year: 'numeric', month: 'long' },
    buttonText: {
      month: 'Month',
      week: 'Week',
    },
    buttonIcons: {
      prev: 'chevron-left',
      next: 'chevron-right',
    },
    dayCellContent: (dayInfo) => _jsx(Typography, { variant: 'body2', children: dayInfo.dayNumberText }),
    eventContent: (eventInfo) =>
      _jsx(Typography, {
        variant: 'h6',
        role: 'button',
        tabIndex: 0,
        'aria-label': `Event: ${eventInfo.event.title}`,
        sx: {
          backgroundColor: alpha(theme.palette.secondary.main, 0.8),
          color: theme.palette.primary.main,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 1),
            textDecoration: 'underline',
          },
        },
        onClick: () => onEventClick && onEventClick(eventInfo.event),
        children: eventInfo.event.title.replace('12a', ''),
      }),
    eventColor: alpha(theme.palette.secondary.main, 0.7),
    height: 'auto',
    eventClick: (eventInfo) => {
      if (onEventClick) {
        onEventClick(eventInfo.event);
      }
    },
  });
};
export default Calendar;
