// store.ts
import create from 'zustand';

interface AuthStore {
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (username: string, password: string) => {
    console.log(" login userName: ", username);
    console.log("login password: ", password);
    // Implementacja logiki logowania
    // Użyj Axios do wysyłania żądania logowania
    // Aktualizuj stan w zależności od wyniku
  },
  logout: () => {
    console.log(" log out");

    // Implementacja logiki wylogowywania
    // Ustaw stan użytkownika na null
  },
}));
