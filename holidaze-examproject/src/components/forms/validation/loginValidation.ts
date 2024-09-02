import React from 'react';
import LoginData from '../../../services/interfaces/LoginForm.ts';

/**
 * Validates the login form data and updates the `errors`
 * state with appropriate error messages if the validation fails.
 *
 * @param {LoginData} loginFormData - The data from the login form that needs to be validated.
 * @param {any} errors - The current error state, which is an object that stores error messages for each form field.
 * @param {React.Dispatch<React.SetStateAction<any>>} setErrors - The state setter function used to update the error state.
 * @returns {boolean} - Returns true if the form data is valid, false if not
 */
export const loginValidation = (
  loginFormData: LoginData,
  errors: any,
  setErrors: React.Dispatch<React.SetStateAction<any>>
): boolean => {
  let formIsValid = true;
  const newErrors = { ...errors };

  if (!loginFormData.email || !/^[\w.-]+@stud\.noroff\.no$/.test(loginFormData.email)) {
    newErrors.email = 'Valid stud.noroff.no email is required';
    formIsValid = false;
  } else {
    newErrors.email = '';
  }

  if (!loginFormData.password || loginFormData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters long';
    formIsValid = false;
  } else {
    newErrors.password = '';
  }

  setErrors(newErrors);
  return formIsValid;
};
