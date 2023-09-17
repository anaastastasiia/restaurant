import { Root } from '../app/Root';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MenuPage } from './MenuPage/MenuPage';
import { MainLayout } from '../layout/MainLayout';
import { MainPage } from './MainPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path="/menu" element={<MenuPage />} />
    </Routes>
  );
};
