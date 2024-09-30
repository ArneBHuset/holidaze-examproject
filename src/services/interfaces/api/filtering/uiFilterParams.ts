import { Dayjs } from 'dayjs';

export interface DatesType {
  checkInDate?: Dayjs | null;
  checkOutDate?: Dayjs | null;
}

export default interface FilterParams {
  detailedOnly: boolean;
  selectedCountries: string[];
  dates: DatesType;
}
