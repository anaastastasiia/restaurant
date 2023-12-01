import axios from 'axios';
import { create } from 'zustand';
import { API_URL } from '../model/types';

export interface User {
  id: number;
  username: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => void;
  logout: () => void;
  getUsers: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  users: [],
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      set(() => ({
        users: response.data
      }));
      return response.data;
    } catch (error:any) {
      console.error('Błąd podczas pobierania danych użytkowników:', error.message);
      return [];
    }
  },
  login: async (username: string, password: string) => {
    console.log("username: " + username);
    try {
        const foundUser = useAuthStore.getState().users.find(user => user);
        if (foundUser && foundUser.username === username) {
            console.log('Znaleziono użytkownika:', foundUser.username);
            if (foundUser.password === password) {
                set({ 
                    user: {
                        username: foundUser.username,
                        password: foundUser.password,
                        id: foundUser.id
                    }
                });
                console.log('Hasło poprawne:', foundUser.password);
                console.log('User:', useAuthStore.getState().user);
            } else {
                console.error('Błędne hasło');
            }
        } else {
            console.log('Użytkownik o podanej nazwie nie został znaleziony.');
        }
    } catch (error: any) {
      console.error('Błąd podczas logowania:', error.message);
    }
  },
  logout: () => {
    console.log(" log out");
    set({ user: null });
  },
}));
