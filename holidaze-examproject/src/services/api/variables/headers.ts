/**
 * Header for API calls when accessToken is not required.
 */
export const unValidatedHeader = {
  'Content-Type': 'application/json',
};
/**
 * Takes accessToken, set in localStorage and creates header where accessToken is required.
 */
export const getValidatedHeader = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
  };
};
