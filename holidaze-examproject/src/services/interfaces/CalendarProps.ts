import { CustomerData } from './api/venueResponse.ts';
import { EventApi } from '@fullcalendar/core';

export interface CalendarProps {
  events: {
    title: string;
    start: string;
    end?: string;
    extendedProps?: {
      customer?: CustomerData;
      dateFrom: string;
      dateTo: string;
      guests: number;
      created: string;
      updated: string;
    };
  }[];
  onEventClick?: (eventData: EventApi) => void;
}
