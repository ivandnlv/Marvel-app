import styles from './LoadMoreBtn.module.scss';

const LoadMoreBtn = (props) => {
  const { children } = props;

  return (
    <button className={styles.load} {...props}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;
