import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './ReservationForm.module.scss';
import { ClientData } from '../../store/cartStore';

interface ReservationFormProps {
  onSubmit: (formData: ReservationFormData) => void;
}

interface ReservationFormData {
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  numberOfPeople: number;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    numberOfPeople: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('To pole jest wymagane'),
    email: Yup.string()
      .email('Podaj poprawny adres email')
      .required('To pole jest wymagane'),
    phoneNumber: Yup.string()
      .matches(/^\d{9}$/, 'Numer telefonu musi zawierać 9 cyfr')
      .required('To pole jest wymagane'),
  });

  const initialValues: ClientData = {
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    numberOfPeople: 0,
  };

  const onSubmitd = (values: ClientData) => {
    // Obsługa submita - możesz tutaj umieścić logikę wysyłania formularza
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    handleSubmit,
  });

  return (
    <form className={styles.reservationForm} onSubmit={formik.handleSubmit}>
      <div className={styles.inputName}>Nazwisko/Your name:</div>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`${styles.inputField} ${
          formik.errors.name && formik.touched.name ? styles.errorInput : ''
        }`}
      />
      {formik.errors.name && formik.touched.name && (
        <div className={styles.errorText}>{formik.errors.name}</div>
      )}

      <div className={styles.inputName}>Email:</div>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        className={`${styles.inputField} ${
          formik.errors.email && formik.touched.email ? styles.errorInput : ''
        }`}
      />
      {formik.errors.email && formik.touched.email && (
        <div className={styles.errorText}>{formik.errors.email}</div>
      )}

      <div className={styles.inputName}>Numer telefonu/Phone Number:</div>
      <input
        type="tel"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        className={`${styles.inputField} ${
          formik.errors.phoneNumber && formik.touched.phoneNumber
            ? styles.errorInput
            : ''
        }`}
      />
      {formik.errors.phoneNumber && formik.touched.phoneNumber && (
        <div className={styles.errorText}>{formik.errors.phoneNumber}</div>
      )}

      <div className={styles.inputName}>Data/Date:</div>
      <input
        type="date"
        name="date"
        value={formik.values.date}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        className={`${styles.inputField} ${
          formik.errors.date && formik.touched.date ? styles.errorInput : ''
        }`}
      />
      {formik.errors.date && formik.touched.date && (
        <div className={styles.errorText}>{formik.errors.date}</div>
      )}

      <div className={styles.inputName}>Czas/Time:</div>
      <input
        type="time"
        name="time"
        value={formik.values.time}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        className={`${styles.inputField} ${
          formik.errors.time && formik.touched.time ? styles.errorInput : ''
        }`}
      />
      {formik.errors.time && formik.touched.time && (
        <div className={styles.errorText}>{formik.errors.time}</div>
      )}

      <div className={styles.inputName}>Ilość osób/Number of People:</div>
      <input
        type="number"
        name="numberOfPeople"
        value={formik.values.numberOfPeople}
        onChange={handleChange}
        min="1"
        max="8"
        onBlur={formik.handleBlur}
        className={`${styles.inputField} ${
          formik.errors.numberOfPeople && formik.touched.numberOfPeople
            ? styles.errorInput
            : ''
        }`}
      />
      {formik.errors.numberOfPeople && formik.touched.numberOfPeople && (
        <div className={styles.errorText}>{formik.errors.numberOfPeople}</div>
      )}

      <button type="submit">Zamów</button>
    </form>
  );
};
