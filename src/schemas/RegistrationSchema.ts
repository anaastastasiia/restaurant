import * as yup from 'yup';

const registrationSchema = (t: any) => yup.object().shape({
  username: yup.string().required(t('validationErrors.required')),
  password: yup
    .string().required(t('validationErrors.required'))
    .min(8, t('validationErrors.min8'))
    .matches(/[A-Z]/, t('validationErrors.uppercase'))
    .matches(/[!@#$%^&*(),.?":{}|<>]/, t('validationErrors.specialChar'))
    .matches(/\S/, t('validationErrors.noSpace')),
  confirmPassword: yup.string().required(t('validationErrors.required')).oneOf([yup.ref('password'), null], t('validationErrors.badPasswords')),
});

export default registrationSchema;
