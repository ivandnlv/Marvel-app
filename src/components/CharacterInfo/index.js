import Btn from '../../UI/Btn';
import { useSelector, useDispatch } from 'react-redux';
import { setCharacter } from '../../redux/slices/characterInfoSlice';
import { useGetCharacterByIdQuery } from '../../redux/marvelApi';
import { useEffect } from 'react';
import CharacterInfoSkeleton from '../../UI/Skeletons/CharacterInfoSkeleton';

import styles from './CharacterInfo.module.scss';

const CharacterInfo = () => {
  const dispatch = useDispatch();
  const { id, thumbnail, name, urls, description, comics } = useSelector(
    (state) => state.characterInfo,
  );
  const { data, isFetching, isError } = useGetCharacterByIdQuery(id);

  useEffect(() => {
    if (data) {
      dispatch(
        setCharacter({
          path: data.data.results[0]?.thumbnail.path,
          type: data.data.results[0]?.thumbnail.extension,
          name: data.data.results[0]?.name,
          urls: data.data.results[0]?.urls,
          description: data.data.results[0]?.description,
          comics: data.data.results[0]?.comics.items,
        }),
      );
    }
  }, [data]);

  if (id && isError) {
    return (
      <div className={styles.info}>
        <h2>Error</h2>
      </div>
    );
  }

  return (
    <>
      {!id || isFetching ? (
        <div className={styles.info}>
          <h2>Please select a character</h2>
          <CharacterInfoSkeleton />
        </div>
      ) : (
        <div className={styles.info + ' ' + styles.show}>
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
              <a key={index} href={comics.resourceURI}>
                {comics.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterInfo;
