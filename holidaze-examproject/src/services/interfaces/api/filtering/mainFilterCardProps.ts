import { Dayjs } from 'dayjs';

export interface DatesType {
  checkInDate?: Dayjs | null;
  checkOutDate?: Dayjs | null;
}

export interface MainFilterCardProps {
  onSearch: (searchTerm: string) => void;
  availableChecked: boolean;
  setAvailableChecked: (checked: boolean) => void;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  dates: DatesType;
  setDates: (dates: DatesType) => void;
}
