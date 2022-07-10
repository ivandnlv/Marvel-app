import styles from './CharactersItem.module.scss';

const CharactersItem = ({ name, image }) => {
  return (
    <div className={styles.character}>
      <img src={image} alt={name + '-image'} />
      <h2>{name}</h2>
    </div>
  );
};

export default CharactersItem;
