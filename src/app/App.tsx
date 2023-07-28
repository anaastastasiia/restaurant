import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { MainLayout } from '../layout/MainLayout';
import { AppBar } from '../components/AppBar';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
