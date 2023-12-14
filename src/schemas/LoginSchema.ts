import * as yup from 'yup';

const loginSchema = (t: any) => yup.object().shape({
  username: yup.string().required(t('validationErrors.required')),
  password: yup.string().required(t('validationErrors.required')).min(8, t('validationErrors.min8')),
});

export default loginSchema;
