import create from 'zustand';
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

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: Item) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
  updateItemCount: (itemId: string, newCount: number, newPrice: string) => void;
  removeFromCart: (itemId: string) => void;
}

export const useCartStoreTest = create<CartState>((set, get) => ({
  cartItems: [],
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
  clearCart: () => set({ cartItems: [] }),
  placeOrder: async () => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: useCartStoreTest.getState().cartItems }),
      });

      if (response.ok) {
        useCartStoreTest.getState().clearCart();
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
