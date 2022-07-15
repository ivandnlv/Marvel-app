import avengers from './avengers.png';
import avengersLogo from './avengers-logo.png';

import styles from './ComicsBanner.module.scss';

const ComicsBanner = () => {
  return (
    <div className={styles.banner}>
      <img src={avengers} alt="avengers" />
      <div>
        <h1>New comics every week! Stay tuned!</h1>
      </div>
      <img src={avengersLogo} alt="avengers-logo" />
    </div>
  );
};

export default ComicsBanner;
