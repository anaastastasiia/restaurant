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
  register: (username: string, password: string, confirmPassword: string) => Promise<boolean>;
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
  register: async (username: string, password: string, confirmPassword: string) => {
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
        });
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        set({ 
            user: {
                username: username,
                password: password,
                id: maxId+1
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
    set({ user: null });
  },
}));
