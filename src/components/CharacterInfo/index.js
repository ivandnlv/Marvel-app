import Btn from '../../UI/Btn';
import { useSelector, useDispatch } from 'react-redux';
import CharacterInfoSkeleton from '../../UI/Skeletons/CharacterInfoSkeleton';

import styles from './CharacterInfo.module.scss';

const CharacterInfo = () => {
  const { thumbnail, name, urls, description, comics, isFetching, isError } = useSelector(
    (state) => state.characterInfo,
  );

  if (isError) {
    return (
      <div className={styles.info}>
        <h2>Error</h2>
      </div>
    );
  }

  return (
    <>
      {!name || isFetching ? (
        <div className={styles.info}>
          <h2>Please select a character</h2>
          <CharacterInfoSkeleton />
        </div>
      ) : (
        <div className={styles.info}>
          <div className={styles.head}>
            <img src={thumbnail} alt={name} />
            <div>
              <h2>{name}</h2>
              <Btn url={urls} color="main">
                HOMEPAGE
              </Btn>
              <Btn url={urls} color="grey">
                WIKI
              </Btn>
            </div>
          </div>
          <p>{description ? description : 'This hero has no description'}</p>
          <div className={styles.comics}>
            <h3>Comics:</h3>
            {comics?.map((comics, index) => (
              <div key={index}>{comics.name}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterInfo;
