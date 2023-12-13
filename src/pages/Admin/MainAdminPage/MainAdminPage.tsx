import { useTranslation } from 'react-i18next';
import styles from './MainAdminPage.module.scss';
import { Order, useCartStore } from '../../../store/cartStore';
import { useEffect, useState } from 'react';
import { OrderStatus } from '../../../model/translations/en/enums';
import axios from 'axios';
import { API_URL } from '../../../model/types';

export const MainAdminPage = () => {
  const { t } = useTranslation();
  const ordersd = useCartStore((state) => state.orders) || [];
  const { orders, getCartData, updateOrderStatus } = useCartStore();
  const [cartData, setCartData] = useState([] as Order[]);
  const [selectedStatusMap, setSelectedStatusMap] = useState<{
    [orderId: string]: OrderStatus;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCartData();
        console.log('useeffect res: ', res);
        console.log('ordersd: ', ordersd);
        useCartStore.setState({ orders: res });
        setCartData(res);
        console.log('cartData: ', cartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log('orders: ', orders);
  }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    console.log('handleStatusChange orderId: ', orderId, ',status: ', status);
    console.log('handleSelectChange START:', selectedStatusMap[orderId]);

    console.log('handleSelectChange START:', selectedStatusMap[orderId]);

    const updatedMap = { ...selectedStatusMap, [orderId]: status };
    setSelectedStatusMap(updatedMap);

    console.log('handleSelectChange SETTING STATE:', updatedMap);
    console.log('handleSelectChange END:', updatedMap[orderId]);
    // updateOrderStatus(orderId.toString(), newStatus);
  };

  useEffect(() => {
    console.log('handleSelectChange END:', selectedStatusMap[1]);
  }, [selectedStatusMap]);

  const handleSave = async () => {
    // const updatedOrders = useCartStore.getState().orders;
    const updatedOrders: Order[] = [];
    orders.forEach((order) => {
      const orderId = order.id;
      console.log('handleSave selectedStatusMap: ', selectedStatusMap[orderId]);
      const newStatus =
        selectedStatusMap[orderId] || order.reservationDetails.status;
      updatedOrders.push({
        ...order,
        reservationDetails: {
          ...order.reservationDetails,
          status: newStatus,
        },
      });
    });
    console.log('handleSave updatedOrders: ', updatedOrders);
    const response = await axios.put(`${API_URL}/cart`, updatedOrders);
    console.log('handleSave response: ', response.data);
    //zostawiam tą funkcjonalność ponieważ takie rozwiązanie jak zostosowałam w projektcie nie pozwala na to
    //korzystam z serwera JSON dostarczanego przez narzędzie takie jak JSON Server, a nie mam kodu źródłowego serwera
    //to niestety nie jestem w stanie wykonywać operacji zapisu bez odpowiednich endpointów obsługujących te operacje.

    // Typowy serwer JSON Server nie obsługuje zapisu (zapytań typu PUT, POST, PATCH itp.) w bezpieczny sposób.
    //Jest to narzędzie służące do prostego dostarczania danych, a nie do obsługi pełnego API z operacjami zapisu.

    // Jeśli chciałąbym testować i rozwijać funkcje związane z operacjami zapisu,
    //konieczne będzie użycie bardziej zaawansowanego rozwiązania do obsługi backendu,
    //na przykład Express.js w połączeniu z MongoDB, czy innym systemem zarządzania bazą danych.
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.adminText}>All orders</div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div style={{ width: '70%', display: 'flex', alignItems: 'ce' }}>
          <div className={styles.content}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Number of People</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ordersd &&
                  ordersd.map((order: Order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.reservationDetails
                          ? order.reservationDetails.phoneNumber
                          : ''}
                      </td>
                      <td>
                        {order.reservationDetails
                          ? order.reservationDetails.email
                          : ''}
                      </td>
                      <td>
                        {order.reservationDetails
                          ? order.reservationDetails.date
                          : ''}
                      </td>
                      <td>
                        {order.reservationDetails
                          ? order.reservationDetails.time
                          : ''}
                      </td>
                      <td>
                        {order.reservationDetails
                          ? order.reservationDetails.numberOfPeople
                          : ''}
                      </td>
                      <td>
                        <select
                          value={
                            selectedStatusMap[order.id] ||
                            order.reservationDetails.status
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              order.id.toString(),
                              e.target.value as OrderStatus
                            )
                          }
                        >
                          {Object.values(OrderStatus).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className={styles.saveButtonWrapper}>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
