import styles from './MainAdminPage.module.scss';
import { Order, useCartStore } from '../../../store/cartStore';
import { useEffect, useState } from 'react';
import { OrderStatus } from '../../../model/translations/en/enums';

export const MainAdminPage = () => {
  const ordersd = useCartStore((state) => state.orders) || [];
  const { orders, getCartData } = useCartStore();
  const [selectedStatusMap, setSelectedStatusMap] = useState<{
    [orderId: string]: OrderStatus;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCartData();
        useCartStore.setState({ orders: res });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    const updatedMap = { ...selectedStatusMap, [orderId]: status };
    setSelectedStatusMap(updatedMap);
    // updateOrderStatus(orderId.toString(), newStatus);
  };

  useEffect(() => {
    console.info('');
  }, [selectedStatusMap]);

  const handleSave = async () => {
    // const updatedOrders = useCartStore.getState().orders;
    const updatedOrders: Order[] = [];
    orders.forEach((order) => {
      const orderId = order.id;
      const newStatus = selectedStatusMap[orderId] || order.status;
      updatedOrders.push({
        ...order,
        status: newStatus,
      });
    });
    // const response = await axios.put(`${API_URL}/cart`, updatedOrders);
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
                      <td>{order ? order.phoneNumber : ''}</td>
                      <td>{order ? order.email : ''}</td>
                      <td>{order ? order.date : ''}</td>
                      <td>{order ? order.time : ''}</td>
                      <td>{order ? order.numberOfPeople : ''}</td>
                      <td>
                        <select
                          value={selectedStatusMap[order.id] || order.status}
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
