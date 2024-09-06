import { Dayjs } from 'dayjs';

type Venue = {
  id: string;
  name: string;
  description: string;
  bookings: { dateFrom: string; dateTo: string }[];
  // Other venue properties...
};

type DatesType = {
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
};

export const filterByDate = (venues: Venue[], dates: DatesType, availableChecked: boolean): Venue[] => {
  if (!dates.checkInDate || !dates.checkOutDate) {
    return venues; // No filtering if no dates are selected
  }

  const checkIn = dates.checkInDate.startOf('day');
  const checkOut = dates.checkOutDate.endOf('day');

  return venues.filter((venue) => {
    const isAvailable = venue.bookings.every((booking) => {
      const bookingStart = Dayjs(booking.dateFrom).startOf('day');
      const bookingEnd = Dayjs(booking.dateTo).endOf('day');

      // Check if the selected date range overlaps with any bookings
      const isOverlap = checkIn.isBefore(bookingEnd) && checkOut.isAfter(bookingStart);

      return availableChecked ? !isOverlap : true;
    });

    return isAvailable;
  });
};
