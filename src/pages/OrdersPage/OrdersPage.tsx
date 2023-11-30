import styles from './OrdersPage.module.scss';

export const OrdersPage = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.logo}>RADISH</div>
          <div className={styles.celebrate}>
            Dowiedź się więcej o dostawie naszych dań
          </div>
        </div>
      </div>
      {/* <div> */}
      <div className={styles.contentWrapper}>Sprawdź gdzie dowozimy!</div>
      {/* </div> */}
    </>
  );
};
