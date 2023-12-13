import { Root } from '../app/Root';
import { Route, Routes } from 'react-router-dom';
import { MenuPage } from './MenuPage/MenuPage';
import { MainLayout } from '../layout/MainLayout';
import { MainPage } from './MainPage';
import { OrdersPage } from './OrdersPage/OrdersPage';
import { ContactPage } from './ContactPage';
import { CartPage } from './CartPage';
import { LoginPage } from './LoginPage';
import MainAdminPage from './Admin/MainAdminPage';
import { useAuthStore } from '../store/authStore';

export const AppRoutes = () => {
  const authStore = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/" element={<MainLayout />}>
        {authStore.user?.role === 'client' || !authStore.user ? (
          <Route index element={<MainPage />} />
        ) : (
          <Route index element={<MainAdminPage />} />
        )}
      </Route>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
