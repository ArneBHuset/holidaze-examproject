import { Dayjs } from 'dayjs';
import * as React from 'react';
import VenueData from './api/venueResponse.ts';

export interface FormValues {
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  guests: number;
}

type Anchor = 'bottom';

export interface DrawerComponentProps {
  open: boolean;
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  venue: VenueData;
}
