import * as yup from 'yup';

export const reservationSchema = (t: any) =>
  yup.object().shape({
    name: yup.string().required(t('validationErrors.required')),
    email: yup.string().email(t('validationErrors.invalidEmail')).required(t('validationErrors.required')),
    phoneNumber: yup.string().required(t('validationErrors.required')).matches(/^\d{9}$/, t('validationErrors.phoneLenght')),
    date: yup.string().required(t('validationErrors.required')),
    time: yup.string().required(t('validationErrors.required')),
});

export const reservationUserSchema = (t: any) =>
yup.object().shape({
  date: yup.string().required(t('validationErrors.required')),
  time: yup.string().required(t('validationErrors.required')),
});