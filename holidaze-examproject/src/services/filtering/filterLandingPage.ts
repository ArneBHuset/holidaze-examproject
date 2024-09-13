import FilterParams from '../interfaces/api/filtering/uiFilterParams.ts';
import VenueData from '../interfaces/api/venueResponse.ts';

export function processVenueData(venueData: VenueData[]) {
  //console.log('Raw venue data received from LandingPage:', venueData);
}

export function applyFilters(filters: FilterParams) {
  const {
    //availableChecked = false,
    //selectedCountries = [],
    //dates = { checkInDate: null, checkOutDate: null },
  } = filters;

  //console.log('Filter parameters received from MainFilterCard:');
  //console.log('Available Checked:', availableChecked);
  //console.log('Selected Countries:', selectedCountries);
  //console.log('Dates:', dates);
}
