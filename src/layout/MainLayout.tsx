import { Outlet } from 'react-router-dom';
// import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    // <div className={styles.wrapper}>
    <main>
      <Outlet />
    </main>
    // <footer>
    //<div style={{ color: 'white' }}>FOoter</div>
    // </footer> */
    // </div>
  );
};
