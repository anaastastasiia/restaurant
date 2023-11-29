// import { create } from 'zustand';
// import axios, { AxiosResponse} from 'axios';
// import { Item } from './itemsStore';
// import { API_URL } from '../model/types';

// export type ProduceState<T> = (state: T) => void;

// export interface CartItem {
//   id: string;
//   namePL: string;
//   nameEN: string;
//   price: string;
//   newPrice?: string;
//   count: number;
// }

// interface CartState {
//   cartItems: CartItem[];
// }

// const axioss = axios.create();


// export const useCartStore = create<CartState>((set) => ({
//     cartItems: [],
// }));

// const getCartItems = async() => {
//   try {
//     const res = (await axioss.get(`${API_URL}/cart`)) as AxiosResponse<CartItem[]>;
//     useCartStore.setState(() => ({
//       cartItems: res.data as CartItem[]
//     }));
//     return useCartStore.getState().cartItems;
// } catch {
//     console.error('No data');
//     return [];
//   }
// }

// export const addToCart = async (item: Item, quantity: number) => {
//     try {
//       const newItem = {
//         id: item.id,
//         namePL: item.namePL,
//         nameEN: item.nameEN,
//         price: item.newPrice ? item.newPrice : item.price,
//         count: quantity,
//       };
//       console.log('addToCart przed kopiowaniem:', useCartStore.getState().cartItems);

//       if (useCartStore.getState().cartItems.length != 0) {
//         useCartStore.setState((state) => ({
//           cartItems: [...state.cartItems, newItem],
//         }));
//       } else {
//         useCartStore.setState(() => ({
//           cartItems: [newItem],
//         }));
//       }
  
    

//       console.log('addToCart :', useCartStore.getState().cartItems);
//       // const res = await axios.post(`${API_URL}/cart`, {
//       //   id: item.id,
//       //   namePL: item.namePL,
//       //   nameEN: item.nameEN,
//       //   price: item.newPrice ? item.newPrice : item.price,
//       //   count: quantity
//       // });
//       // useCartStore.setState((state) => ({ 
//       //   cartItems: [
//       //     ...state.cartItems,
//       //     res.data
//       //   ] 
//       // }));
//       // return res.data;
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       throw error;
//     }
//   };

  
// const removeFromCart = async (item: CartItem) => {
//   try {
//     // const res = await axios.delete(`${API_URL}/cart/${item.id}`);
//     useCartStore.setState((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== item.id) }));
//     // return res.data;
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     throw error;
//   }
// };

// const changeCartItemDetails = async (item: CartItem, newQuantity: string, newItemPrice: string) => {
//   console.log("item: ", item.id + ", ilosc: ", newQuantity, ", new cena: " + newItemPrice);
  
//   const newItem = {
//     id: item.id,
//     namePL: item.namePL,
//     nameEN: item.nameEN,
//     count: Number(newQuantity),
//     price: newItemPrice
//   };

//   useCartStore.setState((state) => ({
//     cartItems: [...state.cartItems, newItem],
//   }));
//   // try {
//   //   const res = await axios.put(`${API_URL}/cart/${item.id}`, {
//   //     id: item.id,
//   //     namePL: item.namePL,
//   //     nameEN: item.nameEN,
//   //     count: newQuantity,
//   //     price: newItemPrice,
//   //   });
//   //   console.log(res.data);
//   //   return res.data;
//   // } catch (error) {
//   //   console.error('Error adding to cart:', error);
//   //   throw error;
//   // }
// };


// const cleanCart = () => {
//   useCartStore.setState(() => ({
//     cartItems: [],
//   }));
// }

// export const useCartActions = { getCartItems, removeFromCart, addToCart, changeCartItemDetails, cleanCart };

