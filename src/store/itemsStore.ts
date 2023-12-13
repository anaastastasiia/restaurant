import { create } from 'zustand';
import axios, { AxiosResponse} from 'axios';
import { API_URL } from '../model/types';

export type ProduceState<T> = (state: T) => void;

export interface Item {
  id: string;
  namePL: string;
  nameEN: string;
  price: string;
  oldPrice?: string;
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

const getItems = async() => {
  try {
    const res = (await axioss.get(`${API_URL}/items`)) as AxiosResponse<Item[]>;
    useItemsStore.setState(() => ({
      item: res.data as Item[]
    }));
  } catch {
    console.error('No data');
  }
}

const getMenuItems = async() => {
  try {
    const res = (await axioss.get(`${API_URL}/menu`)) as AxiosResponse<Item[]>;
    useItemsStore.setState(() => ({
      menuItems: res.data as Item[]
    }));
  } catch {
    console.error('No data');
  }
}

const getHotPriceItems = async() => {
  try {
    const res = (await axioss.get(`${API_URL}/hotPrice`)) as AxiosResponse<Item[]>;
    useItemsStore.setState(() => ({
      hotPriceItems: res.data as Item[]
    }));
  } catch {
    console.error('No data');
  }
}

export const useItemsActions = { getItems, getMenuItems, getHotPriceItems };

