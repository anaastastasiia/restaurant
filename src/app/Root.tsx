import { Outlet } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';

export const Root = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
