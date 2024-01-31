import { create } from 'zustand';
import axios from 'axios';
import { OrderStatus } from '../model/translations/en/enums';

export interface Order {
  date: string;
  email: string;
  id: number;
  idCart: number;
  name: string;
  numberOfPeople: number;
  phoneNumber: number;
  status: string;
  time: string;
}

export interface OrderData {
  count: number;
  hotprice?: number;
  id: number;
  nameEN: string;
  namePL: string;
  price:number;
}

export interface OrderDetails {
  orderData: OrderData[];
  id: number;
}

export interface OrderResult {
  orderData: [];
  id: number;
}

export interface OrderState {
  orders: OrderDetails;
}

interface OrdersState {
  orders: Order[];
  orderForUser: Order[];
  orderDetails: OrderDetails[];
  ordersResult: OrderResult[];
  ordersData: OrderState[];
  totalPrice: number;
  allOrders: Order[];
  getOrderDataForUser: (userName: string) => Promise<Order[]>;
  getOrderDetailsForUser: (idCart: number) => Promise<OrderDetails[]>;
  setOrdersResult: (details: OrderResult[]) => void;
  getTotalCartPrice: (idCart: number) => Promise<number>;
  getAllOrders: () => Promise<Order[]>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateStatusInAPi: (orderId: number, newStatus: OrderStatus) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  totalPrice: 0,
  orderDetails: [],
  orderForUser: [],
  ordersData: [],
  ordersResult: [],
  allOrders: [],
  getOrderDataForUser: async (name: string): Promise<Order[]> => {
    try {
      const res = await axios.get(`http://localhost:3001/api/ordersForUser?name=${name}`);
      set(() => ({
        orderForUser: res.data
      }));
      return useOrdersStore.getState().orderForUser as Order[];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
  getOrderDetailsForUser: async (idCart: number): Promise<OrderDetails[]> => {
    console.log("WPADA");
    try {
      const res = await axios.get(`http://localhost:3001/api/userOrdersDetails?idCart=${idCart}`);
      set(() => ({
        orderDetails: res.data
      }));
      return res.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
  setOrdersResult: (details: OrderResult[]) => {
    set(() => ({
      ordersResult: details,
    }))
  },
  getTotalCartPrice: async (idCart: number): Promise<number> => {
    try {
      const res = await axios.get(`http://localhost:3001/api/totalCartPrice?idCart=${idCart}`);
      set(() => ({
        totalPrice: res.data
      }));
      return res.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return 0;
    }
  },
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const res = await axios.get('http://localhost:3001/api/allOrdersWithDetails');
      set(() => ({
        allOrders: res.data
      }));
      console.log("get orders: ", res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id.toString() === orderId ? { ...order, status: newStatus } : order
      ),
    }));
  },
  updateStatusInAPi: async (orderId: number, newStatus: OrderStatus) => {
    try {
      await axios.post(`http://localhost:3001/api/updateStatus/${orderId}`, {
        newStatus: newStatus,
      });
    } catch (error) {
      console.error('Error postring data:', error);
    }
  }
}))