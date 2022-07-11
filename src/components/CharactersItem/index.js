import styles from './CharactersItem.module.scss';

const CharactersItem = ({ name, image, onClick }) => {
  return (
    <div className={styles.character} onClick={onClick}>
      <img src={image} alt={name + '-image'} />
      <h2>{name}</h2>
    </div>
  );
};

export default CharactersItem;
