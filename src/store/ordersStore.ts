import { create } from 'zustand';
import axios from 'axios';

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
  getOrderDataForUser: (userName: string) => Promise<Order[]>;
  getOrderDetailsForUser: (idCart: number) => Promise<OrderDetails[]>;
  setOrdersResult: (details: OrderResult[]) => void;
  getTotalCartPrice: (idCart: number) => Promise<number>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  totalPrice: 0,
  orderDetails: [],
  orderForUser: [],
  ordersData: [],
  ordersResult: [],
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
  }
}))