import styles from './ComicsItem.module.scss';

const ComicsItem = ({ title, price, thumbnail }) => {
  return (
    <div className={styles.comicsItem}>
      <img src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <span>{price}</span>
    </div>
  );
};

export default ComicsItem;
