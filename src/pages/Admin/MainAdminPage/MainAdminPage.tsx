import { useEffect, useState } from 'react';
import { OrderStatus } from '../../../model/translations/pl/enums';
import { useOrdersStore, Order, OrderData } from '../../../store/ordersStore';
import styles from './MainAdminPage.module.scss';

interface OrdersForm {
  id: number;
  details: OrderData[];
  resData: Order;
  totalPrice: number;
}

export const MainAdminPage = () => {
  const {
    getAllOrders,
    getOrderDetailsForUser,
    getTotalCartPrice,
    updateOrderStatus,
    updateStatusInAPi,
  } = useOrdersStore();
  const [selectedStatusMap, setSelectedStatusMap] = useState<{
    [orderId: string]: OrderStatus;
  }>({});
  const [orders, setOrders] = useState([] as Order[]);
  const [details, setDetails] = useState([] as OrdersForm[]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res);

        const promises = res.map(async (i) => {
          const details = await getOrderDetailsForUser(i.idCart);
          const price = await getTotalCartPrice(i.idCart);
          return {
            id: i.idCart,
            details: details[0].orderData,
            resData: {
              date: i.date,
              email: i.email,
              id: i.id,
              idCart: i.idCart,
              name: i.name,
              numberOfPeople: i.numberOfPeople,
              phoneNumber: i.phoneNumber,
              status: i.status,
              time: i.time,
            },
            totalPrice: price,
          };
        });

        const data = await Promise.all(promises);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    const updatedMap = { ...selectedStatusMap, [orderId]: status };
    setSelectedStatusMap(updatedMap);
    updateOrderStatus(orderId.toString(), status);
  };

  useEffect(() => {
    setDisable(false);
  }, [selectedStatusMap]);

  const handleSave = async () => {
    const updatedOrders: Order[] = [];
    orders.forEach((order) => {
      const orderId = order.id;
      const newStatus = selectedStatusMap[orderId] || order.status;
      updatedOrders.push({
        ...order,
        status: newStatus,
      });
      updateStatusInAPi(orderId, newStatus);
    });
    setDisable(true);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.adminText}>Wszystkie zamówienia</div>
        </div>
      </div>
      <div className={styles.contentWrapper} onChange={() => setDisable(false)}>
        <div
          style={{
            width: '70%',
            display: 'flex',
            alignItems: 'ce',
            marginTop: '30px',
          }}
        >
          <div className={styles.content}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Numer telefonu</th>
                  <th>Email</th>
                  <th>Data</th>
                  <th>Czas</th>
                  <th>Ilość osób</th>
                  <th>Szczegóły zamówienia</th>
                  <th>Suma</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {details &&
                  details.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.resData.id}</td>
                      <td>{item ? item.resData.phoneNumber : ''}</td>
                      <td>{item ? item.resData.email : ''}</td>
                      <td>{item ? item.resData.date : ''}</td>
                      <td>{item ? item.resData.time : ''}</td>
                      <td>{item ? item.resData.numberOfPeople : ''}</td>
                      <td>
                        <ol>
                          {item.details.map((i: any) => {
                            return (
                              <li>
                                {i.namePL} - {i.count}
                              </li>
                            );
                          })}
                        </ol>
                      </td>
                      <td>{item ? item.totalPrice.toFixed(2) : 0} PLN</td>
                      <td>
                        <select
                          value={
                            selectedStatusMap[item.resData.id] ||
                            item.resData.status
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              item.resData.id.toString(),
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
              <button onClick={handleSave} disabled={disable}>
                Zapisz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
