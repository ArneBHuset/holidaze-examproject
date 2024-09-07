import { Dayjs } from 'dayjs';

 export interface DatesType {
  checkInDate?: Dayjs | null;
  checkOutDate?: Dayjs | null;
}

export default interface FilterParams {
  availableChecked: boolean;
  selectedCountries: string[];
  dates: DatesType;
}