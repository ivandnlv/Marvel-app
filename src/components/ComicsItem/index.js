import styles from './ComicsItem.module.scss';

const ComicsItem = ({ title, price, thumbnail, onClick }) => {
  return (
    <div className={styles.comicsItem} onClick={onClick}>
      <img src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <span>{price}</span>
    </div>
  );
};

export default ComicsItem;
