import React from 'react';
import { BarLoader } from 'react-spinners';

interface RouteLoaderProps {
  children: React.ReactNode;
}

export const RouteLoader = ({ children }: RouteLoaderProps) => {
  return (
    <React.Suspense
      fallback={<BarLoader width="100vh" height={2} color="green" />}
    >
      {children}
    </React.Suspense>
  );
};
