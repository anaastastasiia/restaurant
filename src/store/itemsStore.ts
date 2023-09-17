import { create } from 'zustand';
import axios, { AxiosResponse} from 'axios';

export type ProduceState<T> = (state: T) => void;

export interface Item {
  id: string;
  name: string;
  price: string;
}

interface ItemsState {
  item: Item[];
  menuItems: Item[];
}

const axioss = axios.create();

export const useItemsStore = create<ItemsState>(() => ({
    item: [],
    menuItems: []
}));

const getItems = async() => {
  try {
    const res = (await axioss.get('http://localhost:3001/items')) as AxiosResponse<Item[]>;
    useItemsStore.setState(() => ({
      item: res.data as Item[]
    }));
  } catch {
    console.error('No data');
  }
}

const getMenuItems = async() => {
  try {
    const res = (await axioss.get('http://localhost:3001/menu')) as AxiosResponse<Item[]>;
    useItemsStore.setState(() => ({
      menuItems: res.data as Item[]
    }));
  } catch {
    console.error('No data');
  }
}

export const useItemsActions = { getItems, getMenuItems };

