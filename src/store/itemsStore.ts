import { create } from 'zustand';
import axios, { AxiosResponse} from 'axios';

export type ProduceState<T> = (state: T) => void;

export interface Item {
  id: number;
  namePL: string;
  nameEN: string;
  price: number;
  hotprice?: number;
}

interface ItemsState {
  item: Item[];
  menuItems: Item[];
  hotPriceItems: Item[];
}

const axioss = axios.create();

export const useItemsStore = create<ItemsState>(() => ({
    item: [],
    menuItems: [],
    hotPriceItems: []
}));

const getMenuItems = async() => {
  try {
    const res = await axios.get('http://localhost:3001/api/menu');
    useItemsStore.setState(() => ({
      menuItems: res.data as Item[]
    }));
  } catch {
    console.error('No data');
  }
}

const getHotPriceItems = async() => {
  try {
    const res = (await axioss.get('http://localhost:3001/api/hotprice')) as AxiosResponse<Item[]>;
    useItemsStore.setState(() => ({
      hotPriceItems: res.data as Item[]
    }));
  } catch {
    console.error('No data');
  }
}

export const useItemsActions = { getMenuItems, getHotPriceItems };

