import { useState, useEffect } from 'react';
import { useGetRandomQuery } from '../../redux/marvelApi';
import { useDispatch, useSelector } from 'react-redux';
import { setHero } from '../../redux/slices/randomSlice';
import RandomHeroSkeleton from '../../UI/Skeletons/RandomHeroSkeleton';

import styles from './RandomHero.module.scss';
import Btn from '../../UI/Btn';

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
            <img src={thumbnail} alt={name} />
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
                  <Btn color="main" url={urls[0].url}>
                    HOMEPAGE
                  </Btn>
                  <Btn color="grey" url={urls[1].url}>
                    WIKI
                  </Btn>
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
        <Btn color="main" type="try" onClick={onTryClick}>
          TRY IT
        </Btn>
      </div>
    </div>
  );
};

export default RandomHero;
