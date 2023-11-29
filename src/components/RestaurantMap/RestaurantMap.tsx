import React from 'react';
import RestaurantTable from '../RestaurantTable';
import { TableData } from '../../model/types';
import styles from './RestaurantMap.module.scss';

interface RestaurantMapProps {
  tables: TableData[];
}

export const RestaurantMap: React.FC<RestaurantMapProps> = ({ tables }) => {
  return (
    <div className={styles.restaurantMap}>
      {tables.map((table) => (
        <RestaurantTable key={table.id} table={table} />
      ))}
    </div>
  );
};
