import { Root } from '../app/Root';
import { Route, Routes } from 'react-router-dom';
import { MenuPage } from './MenuPage/MenuPage';
import { MainLayout } from '../layout/MainLayout';
import { MainPage } from './MainPage';
import { OrdersPage } from './OrdersPage/OrdersPage';
import { ContactPage } from './ContactPage';
import { CartPage } from './CartPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};
