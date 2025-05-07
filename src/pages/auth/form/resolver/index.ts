import * as yup from 'yup';
import type { FieldValues } from 'react-hook-form';
import {
  validationFormItemEmail,
  validationFormItemPassword
} from '../validations';

export const schema = (): yup.ObjectSchema<
  FieldValues,
  yup.AnyObject,
  any,
  ''
> =>
  yup
    .object({
      email: validationFormItemEmail(),
      password: validationFormItemPassword()
    })
    .required();
