import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styles from './Character.module.scss';

const Character = () => {
  const { name, thumbnail, description } = useSelector((state) => state.character);

  if (!name) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.character}>
      <img src={thumbnail} alt={`${name}`} />
      <div>
        <h1>{name}</h1>
        <p>{description ? description : 'This character has no description'}</p>
      </div>
    </div>
  );
};

export default Character;
