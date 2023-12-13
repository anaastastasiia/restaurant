import React, { useState } from 'react';
import styles from './ReservationForm.module.scss';
import { OrderStatus } from '../../model/translations/en/enums';
import { ClientData } from '../../store/cartStore';

interface ReservationFormProps {
  onSubmit: (formData: ClientData) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ClientData>({
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    numberOfPeople: 1,
    status: OrderStatus.Pending,
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
        name="name"
        value={formData.name}
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
        value={Number(formData.numberOfPeople)}
        onChange={handleChange}
        min="1"
        max="8"
        required
      />

      <button type="submit">Zamów</button>
    </form>
  );
};
