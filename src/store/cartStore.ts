import { create } from 'zustand';
import { Item } from './itemsStore';
import axios from 'axios';
import { OrderStatus } from '../model/translations/en/enums';

export interface CartItemForm {
  idMenu: number;
  namePL: string;
  nameEN: string;
  price: number;
  hotprice?: number;
  count: number;
}

export interface CartItem {
  idMenu: number;
  count: number;
}

export interface ClientData {
  name: string;
  email: string;
  phoneNumber: number;
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
  cartItemsForm: CartItemForm[];
  reservationDetails: ClientData;
  id: number | null;
  orders: Order[];
  orderForUser: Order[];
  addToCart: (item: Item) => void;
  clearCart: () => void;
  placeOrder: () => Promise<void>;
  updateItemCount: (itemId: number, newCount: number, newPrice: string) => void;
  removeFromCart: (itemId: number) => void;
  setRezervationDetails: (details: ClientData) => void;
  setCartData: (orders: Order[]) => void;
  getCartData: () => Promise<Order[]>;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  getCartDataForUser: (userName: string) => Promise<Order[]>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  cartItemsForm: [],
  id: null,
  orders: [],
  reservationDetails: {
    name: '',
    email: '',
    phoneNumber: 0,
    date: '',
    time: '',
    numberOfPeople: 1,
    status: OrderStatus.Pending
  },
  orderForUser: [],
  addToCart: (item: Item) => {
    console.log(" item id : ", item.id);
    const existingItem = get().cartItems.find((cartItem) => cartItem.idMenu === item.id);
    console.log(" existingItem : ", existingItem);
    if (existingItem) {
      set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.idMenu === item.id
              ? {
                  ...cartItem,
                  count: cartItem.count + 1,
                }
              : cartItem
          ),
          cartItemsForm: state.cartItemsForm.map(formItem => 
            formItem.idMenu === item.id ? {
              ...formItem,
              count: formItem.count + 1,
              price: (formItem.price * (formItem.count + 1)),
            } : formItem)
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, { idMenu: item.id, count: 1, }],
        cartItemsForm: [...state.cartItemsForm, 
          {
            idMenu: item.id,
            count: 1,
            nameEN: item.nameEN, 
            namePL: item.namePL,
            price: item.price,
            hotprice: item.hotprice
          }
        ]
      }));
    }
    console.log("dodane cartItems: ", useCartStore.getState().cartItems);
    console.log("dodane cartItemsForm: ", useCartStore.getState().cartItemsForm);
  },
  setRezervationDetails: (details: ClientData) => {  
    set(() => ({
      reservationDetails: {
        name: details.name,
        email: details.email,
        phoneNumber: details.phoneNumber,
        date: details.date,
        time: details.time,
        numberOfPeople: details.numberOfPeople,
        status: OrderStatus.Pending
      }
    }));
  },
  clearCart: () => set({ cartItems: [], cartItemsForm: [] }),
  placeOrder: async () => {
    try {
      const cartItems = useCartStore.getState().cartItemsForm;
      const reservationDetails = useCartStore.getState().reservationDetails;
      const response = await axios.post('http://localhost:3001/api/createOrder', {
        reservationDetails, cartItems
      }, { headers: {
          'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        useCartStore.getState().clearCart();
      } else {
        console.error('Wystąpił błąd podczas składania zamówienia!');
      }
    } catch (error: any) {
      console.error('Wystąpił błąd podczas składania zamówienia, error:', error, ", details: ", error.message);
    }
  },
  updateItemCount: (itemId: number, newCount: number, newPrice: string) => {
    console.log("itemId: ", itemId + ", newCount: " , newCount + ", newPrice: ", newPrice)
    console.log(useCartStore.getState().cartItemsForm.map(item => item.idMenu));
    set((state) => ({
      cartItemsForm: state.cartItemsForm.map(item =>
        item.idMenu === itemId ? {
          count: newCount,
          price: newPrice,
          idMenu: itemId,
          nameEN: item.nameEN,
          namePL: item.namePL,
        } : item
      ),
    }) as Partial<CartState>);
  
    console.log("CART ITEMS cartItemsForm: ", useCartStore.getState().cartItemsForm)
  },
  
  removeFromCart: (itemId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.idMenu !== itemId),
      cartItemsForm: state.cartItemsForm.filter((item) => item.idMenu !== itemId),
    }));
  },
  setOrderData: () => {},
  setCartData: (orders) => set({ orders }),
  getCartData: async (): Promise<Order[]> => {
    try {
      const res = await axios.get('http://localhost:3001/api/orders');
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
      const res = await axios.post(`http://localhost:3001/api/ordersForUser`, { userName }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      set(() => ({
        orderForUser: res.data
      }));
      return useCartStore.getState().orderForUser as Order[];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  },
}));