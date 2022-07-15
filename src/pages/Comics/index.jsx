import ComicsBanner from '../../components/ComicsBanner';
import ComicsList from '../../components/ComicsList';
import styles from './Comics.module.scss';

const Comics = () => {
  return (
    <div className={styles.comics}>
      <ComicsBanner />
      <ComicsList />
    </div>
  );
};

export default Comics;
