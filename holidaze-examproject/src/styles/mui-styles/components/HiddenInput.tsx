import { styled } from '@mui/material/styles';

/**
 * This hides styling for default html input, to allow MUI buttons a custom design.
 * Should be nested inside a Mui button component.
 */
export const VisuallyHiddenInput = styled('input')({
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
