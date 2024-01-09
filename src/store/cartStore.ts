import { create } from 'zustand';
import { Item } from './itemsStore';
import { API_URL } from '../model/types';
import axios, { AxiosResponse } from 'axios';
import { OrderStatus } from '../model/translations/en/enums';

export interface CartItem {
  id: string;
  namePL: string;
  nameEN: string;
  price: string;
  oldPrice?: string;
  count: number;
  startPrice?: string;
}

export interface ClientData {
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  numberOfPeople: number;
  status: string;
}

export interface Order {
  cartItems: CartItem[];
  reservationDetails: ClientData;
  id: number;
}

interface CartState {
  cartItems: CartItem[];
  reservationDetails: ClientData;
  id: number | null;
  orders: Order[];
  orderForUser: Order[];
  addToCart: (item: Item) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
  updateItemCount: (itemId: string, newCount: number, newPrice: string) => void;
  removeFromCart: (itemId: string) => void;
  setRezervationDetails: (details: ClientData) => void;
  setCartData: (orders: Order[]) => void;
  getCartData: () => Promise<Order[]>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  getCartDataForUser: (userName: string) => Promise<Order[]>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  id: null,
  orders: [],
  reservationDetails: {
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    numberOfPeople: 1,
    status: OrderStatus.Pending
  },
  orderForUser: [],
  addToCart: (item: Item) => {
    const existingItem = get().cartItems.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
    set((state) => ({
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                count: cartItem.count + 1,
                startPrice: cartItem.price,
                price: (parseFloat(cartItem.price) * (cartItem.count + 1)).toFixed(2),
              }
            : cartItem
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, { ...item, count: 1, price: item.price, startPrice: item.price, }],
      }));
    }
  },
  setRezervationDetails: (details: ClientData) => {  
    set(() => ({
      reservationDetails: {
        name: details.name,
        email: details.email,
        phoneNumber: details.phoneNumber,
        date: details.date,
        time: details.time,
        numberOfPeople: Number(details.numberOfPeople),
        status: OrderStatus.Pending
      }
    }));
  },
  clearCart: () => set({ cartItems: [] }),
  placeOrder: async () => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cartItems: useCartStore.getState().cartItems,
          reservationDetails: useCartStore.getState().reservationDetails,
          id: useCartStore.getState().id
         } as Order),
      });

      if (response.ok) {
        useCartStore.getState().clearCart();
      } else {
        console.error('Wystąpił błąd podczas składania zamówienia');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas składania zamówienia:', error);
    }
  },
  updateItemCount: (itemId: string, newCount: number, newPrice: string) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              count: newCount,
              price: newPrice,
            }
          : item
      ),
    }));
  },
  
  removeFromCart: (itemId: string) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    }));
  },
  setOrderData: () => {},
  setCartData: (orders) => set({ orders }),
  getCartData: async (): Promise<Order[]> => {
    try {
      const res = (await axios.get(`${API_URL}/cart`)) as AxiosResponse<Order[]>;
      set(() => ({
        orders: res.data
      }));
      return useCartStore.getState().orders as Order[];
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
  getCartDataForUser: async (userName: string): Promise<Order[]> => {
    try {
      const res = (await axios.get(`${API_URL}/cart`)) as AxiosResponse<Order[]>;
      
      const orders = res.data.filter(
        (i) => i.reservationDetails.name === userName
      );
      set(() => ({
        orderForUser: orders
      }));
      return useCartStore.getState().orderForUser as Order[];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
}));