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
}

const axioss = axios.create();

export const useItemsStore = create<ItemsState>(() => ({
    item: []
}));

const getItems = async() => {
  try {
    const res = (await axioss.get('http://localhost:3001/items')) as AxiosResponse<Item[]>;
    useItemsStore.setState(() => ({
      item: res.data as Item[]
    }));
    console.log(res.data);
  } catch {
      console.log('ERROR');
  }
}

export const useItemsActions = { getItems };

