import React, { useState } from 'react';
import styles from './ReservationForm.module.scss';

interface ReservationFormProps {
  onSubmit: (formData: ReservationFormData) => void;
}

interface ReservationFormData {
  fullName: string;
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
    fullName: '',
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

  return (
    <form className={styles.reservationForm} onSubmit={handleSubmit}>
      <div className={styles.inputName}>Nazwisko/Your name:</div>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      <div className={styles.inputName}>Email:</div>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div className={styles.inputName}>Numer telefonu/Phone Number:</div>
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />

      <div className={styles.inputName}>Data/Date:</div>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <div className={styles.inputName}>Czas/Time:</div>
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />

      <div className={styles.inputName}>Ilość osób/Number of People:</div>
      <input
        type="number"
        name="numberOfPeople"
        value={formData.numberOfPeople}
        onChange={handleChange}
        min="1"
        max="8"
        required
      />

      <button type="submit">Submit Reservation</button>
    </form>
  );
};
