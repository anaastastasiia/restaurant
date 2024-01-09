import { Root } from '../app/Root';
import { Outlet, Route, Routes } from 'react-router-dom';
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
      <Route
        path="/"
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        {authStore.user?.role === 'admin' ? (
          <Route index element={<MainAdminPage />} />
        ) : (
          <Route index element={<MainPage />} />
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
