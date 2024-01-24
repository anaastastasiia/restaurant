import axios from 'axios';
import { create } from 'zustand';

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
      const response = await axios.get(`http://localhost:3001/api/users`);
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
      const response = await axios.post(`http://localhost:3001/api/login`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        }});
  
      if (response.status === 200) {
        set({ user: response.data.user });
        return true;
      } else {
        console.error('Błędne hasło lub użytkownik nie istnieje.');
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
      const response = await axios.post(`http://localhost:3001/api/register`, {
          username,
          password,
          confirmPassword,
          email,
          phoneNumber,
      });

      if (response.status === 201) {
          const { success, userId } = response.data;

          if (success) {
              const newUser: User = {
                  username,
                  password,
                  email,
                  phoneNumber,
                  id: userId,
                  role: 'client',
              };

              set({ user: newUser });

              return true;
          } else {
              console.error('Błąd podczas rejestracji:', response.data.error);
              return false;
          }
      } else {
          console.error('Błąd podczas rejestracji. Nieprawidłowy status odpowiedzi:', response.status);
          return false;
      }
  } catch (error: any) {
      console.error('Błąd podczas rejestracji:', error.message);
      return false;
  }
  },
  logout: () => {
    console.info(" log out");
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
