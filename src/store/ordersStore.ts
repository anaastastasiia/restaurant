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
  // totalPrice: number;
  id: number;
}

export interface OrderResult {
  orderData: [];
  // totalPrice: number;
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
  getTotalCartPrice: (idCart: number) => Promise<number[]>;
  setTotalPrice: (price: number) => void;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
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
    //   console.log("RES DATA: ", res.data);
      set(() => ({
        orderDetails: res.data
      }));
      console.log("DETAILS: ", useOrdersStore.getState().orderDetails);
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
  getTotalCartPrice: async (idCart: number): Promise<number[]> => {
    try {
      const res = await axios.get(`http://localhost:3001/api/totalCartPrice?idCart=${idCart}`);
      set(() => ({
        totalPrice: res.data
      }));
      return Array.isArray(res.data) ? res.data.map((row) => row.totalPrice) : [];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
  setTotalPrice: (price: number) => {
    set(() => ({
      totalPrice: price,
    }))
  },
}))