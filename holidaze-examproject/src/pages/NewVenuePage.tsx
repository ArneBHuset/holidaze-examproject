import { Container } from '@mui/material';
import AddVenue from '../components/forms/AddVenue.tsx';

function NewVenuePage(props) {
  return (
    <Container maxWidth="sm">
      <AddVenue />
    </Container>
  );
}

export default NewVenuePage;
