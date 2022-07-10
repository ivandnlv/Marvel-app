import { useState, useEffect } from 'react';
import { useGetRandomQuery } from '../../redux/slices/marvelApi';
import { useDispatch, useSelector } from 'react-redux';
import { setHero } from '../../redux/slices/randomSlice';
import marvelApi from '../../services/marvelApi';
import RandomHeroSkeleton from '../../UI/Skeletons/RandomHeroSkeleton';

import styles from './RandomHero.module.scss';

const RandomHero = () => {
  const { data = [], isFetching, isError, refetch } = useGetRandomQuery();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { name, thumbnail, description, urls } = useSelector((state) => state.random);

  useEffect(() => {
    setLoading(true);
  }, [isFetching === true]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [isFetching === false]);

  if (isError)
    dispatch(
      setHero({
        name: 'Sorry, an error has occurred',
        thumbnail:
          'https://cdni.iconscout.com/illustration/premium/thumb/internet-error-1886586-1598257.png',
        description: '',
        urls: [],
      }),
    );

  const randomHero = () => {
    if (data?.code === 200) {
      const { name, description, thumbnail, urls } = data.data.results[0];
      dispatch(
        setHero({
          name,
          description,
          thumbnail: thumbnail.path,
          type: thumbnail.extension,
          urls,
        }),
      );
    }
  };

  useEffect(() => {
    randomHero();
  });

  const onTryClick = () => {
    refetch();
  };

  const shortDescription = () => {
    const arr = description.split(' ').slice(0, 30);
    if (arr.length === 30) {
      return arr.join(' ') + '...';
    }
    return arr.join(' ');
  };

  return (
    <div className={styles.random}>
      <div className={styles.character}>
        {loading ? (
          <RandomHeroSkeleton />
        ) : (
          <div className={styles.wrapper}>
            {thumbnail !== '' && <img src={thumbnail} alt={name} />}
            <div className={styles.text}>
              {name !== '' && <h2>{name}</h2>}
              {description !== '' ? (
                <p>
                  {shortDescription().length === 30
                    ? shortDescription() + '...'
                    : shortDescription()}
                </p>
              ) : name !== 'Sorry, an error has occurred' ? (
                <p>This hero has no description</p>
              ) : null}
              {urls.length !== 0 && name !== 'Sorry, an error has occurred' && (
                <div>
                  <a href={urls[0].url}>HOMEPAGE</a>
                  <a href={urls[1].url}>WIKI</a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.try}>
        <h2>
          Random character for today!
          <br /> Do you want to get to know him better?
        </h2>
        <h2>Or choose another one</h2>
        <button className={styles.tryIt} onClick={onTryClick}>
          TRY IT
        </button>
      </div>
    </div>
  );
};

export default RandomHero;
