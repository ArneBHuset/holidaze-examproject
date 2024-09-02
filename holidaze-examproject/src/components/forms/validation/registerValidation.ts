import React from 'react';
import RegistrationData from '../../../services/interfaces/registrationForm';

/**
 * Validates the registration form data of field including
 * the name, email, password, bio, and optional avatar and banner data. Updates the errors
 * state with appropriate error messages if the validation fails
 *
 * @param {RegistrationData} registrationFormData - The data from the registration form that needs to be validated.
 * @param {any} errors - The current error state, which is an object that stores error messages for each form field.
 * @param {React.Dispatch<React.SetStateAction<any>>} setErrors - The state setter function used to update the error state.
 * @returns {boolean} - Returns true if the form data is valid, false if not
 */
export const registerValidation = (
  registrationFormData: RegistrationData,
  errors: any,
  setErrors: React.Dispatch<React.SetStateAction<any>>
): boolean => {
  let formIsValid = true;
  const newErrors = { ...errors };

  if (!registrationFormData.name || /[^a-zA-Z0-9_]/.test(registrationFormData.name)) {
    newErrors.name = 'Name is required and should not contain punctuation symbols apart from underscore (_)';
    formIsValid = false;
  } else {
    newErrors.name = '';
  }
  if (!registrationFormData.email || !/^[\w.-]+@stud\.noroff\.no$/.test(registrationFormData.email)) {
    newErrors.email = 'Valid stud.noroff.no email is required';
    formIsValid = false;
  } else {
    newErrors.email = '';
  }
  if (!registrationFormData.password || registrationFormData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters long';
    formIsValid = false;
  } else {
    newErrors.password = '';
  }
  if (registrationFormData.bio && registrationFormData.bio.length > 160) {
    newErrors.bio = 'Bio must be less than 160 characters';
    formIsValid = false;
  } else {
    newErrors.bio = '';
  }

  if (registrationFormData.avatar?.url && registrationFormData.avatar.url.trim() === '') {
    newErrors.avatarUrl = 'Avatar URL cannot be empty';
    formIsValid = false;
  } else {
    newErrors.avatarUrl = '';
  }

  if (registrationFormData.avatar?.alt && registrationFormData.avatar.alt.trim() === '') {
    newErrors.avatarAlt = 'Avatar alt text cannot be empty';
    formIsValid = false;
  } else {
    newErrors.avatarAlt = '';
  }

  if (registrationFormData.banner?.url && registrationFormData.banner.url.trim() === '') {
    newErrors.bannerUrl = 'Banner URL cannot be empty';
    formIsValid = false;
  } else {
    newErrors.bannerUrl = '';
  }

  if (registrationFormData.banner?.alt && registrationFormData.banner.alt.trim() === '') {
    newErrors.bannerAlt = 'Banner alt text cannot be empty';
    formIsValid = false;
  } else {
    newErrors.bannerAlt = '';
  }

  setErrors(newErrors);
  return formIsValid;
};
