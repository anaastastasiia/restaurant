import axios from 'axios';
import { create } from 'zustand';
import { API_URL } from '../model/types';

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'client' | 'guest';
  email: string;
  phoneNumber: string;
}

interface AuthStore {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, confirmPassword: string, email: string, phoneNumber: string) => Promise<boolean>;
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
    try {
      const foundUser = useAuthStore.getState().users.find(user => user.username === username);
      if (foundUser && foundUser.username === username) {
        if (foundUser.password === password) {
          set({ 
            user: {
              username: foundUser.username,
              password: foundUser.password,
              id: foundUser.id,
              role: foundUser.role,
              email: foundUser.email,
              phoneNumber: foundUser.phoneNumber
            }
          });
          return true;
        } else {
          console.error('Błędne hasło');
          return false;
        }
      } else {
        console.log('Użytkownik o podanej nazwie nie został znaleziony.');
        return false;
      }
    } catch (error: any) {
      console.error('Błąd podczas logowania:', error.message);
      return false;
    }
  },
  register: async (username: string, password: string, confirmPassword: string, email: string, phoneNumber: string) => {
    try {
        if (password !== confirmPassword) {
            console.error('Hasło i potwierdzenie hasła są różne');
            return false;
        }

        const users = useAuthStore.getState().users;
        const userExistsResponse = users.find(i => i.username === username)
        if (userExistsResponse) {
          console.error('Użytkownik o podanej nazwie już istnieje');
          return false;
        }

        await axios.post(`${API_URL}/users`, {
            username: username,
            password: password,
            role: 'client',
            email: email,
            phoneNumber: phoneNumber,
        });
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        set({ 
            user: {
                username: username,
                password: password,
                email: email,
                phoneNumber: phoneNumber,
                id: maxId+1,
                role: 'client'
            }
        });
        return true;
    } catch (error: any) {
      console.error('Błąd podczas rejestracji:', error.message);
      return false;
    }
  },
  logout: () => {
    console.log(" log out");
    set({ 
      user: {
        id: 0,
        password: '',
        username: '',
        role: 'guest',
        email: '',
        phoneNumber: ''
      }
    });
  },
}));
