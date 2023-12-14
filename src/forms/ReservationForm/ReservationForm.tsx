import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import reservationSchema from '../../schemas/ReservationSchema';
import { OrderStatus } from '../../model/translations/en/enums';
import { ClientData } from '../../store/cartStore';
import styles from './ReservationForm.module.scss';

interface ReservationFormProps {
  onSubmit: (formData: ClientData) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  onSubmit,
}) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      date: '',
      time: '',
      numberOfPeople: 1,
      status: OrderStatus.Pending,
    },
    validationSchema: reservationSchema(t),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  // const [formData, setFormData] = useState<ClientData>({
  //   name: '',
  //   email: '',
  //   phoneNumber: '',
  //   date: '',
  //   time: '',
  //   numberOfPeople: 1,
  //   status: OrderStatus.Pending,
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  return (
    <form className={styles.reservationForm} onSubmit={formik.handleSubmit}>
      <div className={styles.inputName}>Nazwisko/Your name:</div>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          formik.touched.name && formik.errors.name ? styles.errorInput : ''
        }
      />
      {formik.touched.name && formik.errors.name && (
        <div className={styles.errorText}>{t(formik.errors.name)}</div>
      )}

      <div className={styles.inputName}>Email:</div>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          formik.touched.email && formik.errors.email ? styles.errorInput : ''
        }
      />
      {formik.touched.email && formik.errors.email && (
        <div className={styles.errorText}>{t(formik.errors.email)}</div>
      )}

      <div className={styles.inputName}>Numer telefonu/Phone Number:</div>
      <input
        type="tel"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          formik.touched.phoneNumber && formik.errors.phoneNumber
            ? styles.errorInput
            : ''
        }
      />
      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
        <div className={styles.errorText}>{t(formik.errors.phoneNumber)}</div>
      )}

      <div className={styles.inputName}>Data/Date:</div>
      <input
        type="date"
        name="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          formik.touched.date && formik.errors.date ? styles.errorInput : ''
        }
      />
      {formik.touched.date && formik.errors.date && (
        <div className={styles.errorText}>{t(formik.errors.date)}</div>
      )}

      <div className={styles.inputName}>Czas/Time:</div>
      <input
        type="time"
        name="time"
        value={formik.values.time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={
          formik.touched.time && formik.errors.time ? styles.errorInput : ''
        }
      />
      {formik.touched.time && formik.errors.time && (
        <div className={styles.errorText}>{t(formik.errors.time)}</div>
      )}

      <div className={styles.inputName}>Ilość osób/Number of People:</div>
      <input
        type="number"
        name="numberOfPeople"
        value={formik.values.numberOfPeople}
        onChange={formik.handleChange}
        min="1"
        max="8"
        onBlur={formik.handleBlur}
        className={
          formik.touched.numberOfPeople && formik.errors.numberOfPeople
            ? styles.errorInput
            : ''
        }
      />
      {formik.touched.numberOfPeople && formik.errors.numberOfPeople && (
        <div className={styles.errorText}>
          {t(formik.errors.numberOfPeople)}
        </div>
      )}

      <button type="submit">Zamów</button>
    </form>
  );
};
