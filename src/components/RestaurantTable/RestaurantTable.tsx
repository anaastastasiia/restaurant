import React from 'react';
import { TableData } from '../../model/types';
import styles from './RestaurantTable.module.scss';

interface TableProps {
  table: TableData;
}

export const RestaurantTable: React.FC<TableProps> = ({ table }) => {
  const handleClick = () => {
    // Obsługa kliknięcia na stolik, np. otwarcie formularza rezerwacji
  };

  return (
    <div
      className={`${styles.table} ${table.isReserved ? styles.isReserved : ''}`}
      onClick={handleClick}
    >
      {table.seats} miejsc
    </div>
  );
};
