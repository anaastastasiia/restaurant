import { create } from 'zustand';
import { Item } from './itemsStore';
import { API_URL } from '../model/types';

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
}

interface CartState {
  cartItems: CartItem[];
  rezervationDetails: ClientData;
  addToCart: (item: Item) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
  updateItemCount: (itemId: string, newCount: number, newPrice: string) => void;
  removeFromCart: (itemId: string) => void;
  setRezervationDetails: (details: ClientData) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  rezervationDetails: {
    name: '',
    email: '',
    phoneNumber: '',
    date: '',
    time: '',
    numberOfPeople: 0
  },
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
      rezervationDetails: {
        name: details.name,
        email: details.email,
        phoneNumber: details.phoneNumber,
        date: details.date,
        time: details.time,
        numberOfPeople: details.numberOfPeople
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
          rezervationDetails: useCartStore.getState().rezervationDetails
         }),
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
}));
