import { useState, useEffect } from 'react';
import marvelApi from '../services/marvelApi';
import RandomHeroSkeleton from '../Skeletons/RandomHeroSkeleton';

import styles from './RandomHero.module.scss';

const RandomHero = () => {
  const randomHeroId = (min = 1009175, max = 1009220) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const [hero, setHero] = useState({
    name: '',
    thumbnail: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const randomHero = () => {
    setLoading(true);
    marvelApi(`characters/${randomHeroId()}`)
      .catch(() => {
        setHero({
          ...hero,
          name: 'Sorry, an error has occurred',
          thumbnail:
            'https://cdni.iconscout.com/illustration/premium/thumb/internet-error-1886586-1598257.png',
          description: '',
        });
      })
      .then((result) => {
        return result.data.data.results;
      })
      .then((data) => {
        setHero({
          ...hero,
          name: data[0].name,
          thumbnail: data[0].thumbnail.path + '.' + data[0].thumbnail.extension,
          description: data[0].description,
        });
      })
      .finally(setTimeout(() => setLoading(false), 1000));
  };

  useEffect(() => {
    randomHero();
  }, []);

  const onTryClick = () => {
    randomHero();
  };

  return (
    <div className={styles.random}>
      <div className={styles.character}>
        {loading ? (
          <RandomHeroSkeleton />
        ) : (
          <div className={styles.wrapper}>
            {hero.thumbnail !== '' && <img src={hero.thumbnail} alt={hero.name} />}
            <div className={styles.text}>
              {hero.name !== '' && <h2>{hero.name}</h2>}
              <p>{hero.description !== '' ? hero.description : 'This hero has no description'}</p>
              {hero.name !== 'Sorry, an error has occurred' && (
                <div>
                  <button>HOMEPAGE</button>
                  <button>WIKI</button>
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
