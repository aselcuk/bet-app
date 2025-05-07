import * as yup from 'yup';

export const validationFormItemEmail = () =>
  yup
    .string()
    .nullable()
    .required('E-mail is required.')
    .email('E-mail format is invalid.');

export const validationFormItemPassword = () =>
  yup
    .string()
    .nullable()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .matches(/\d/, 'Password must contain at least one number.');
