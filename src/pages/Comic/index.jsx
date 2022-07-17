import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Comic.module.scss';
import styles2 from '../Comics/Comics.module.scss';
import ComicsBanner from '../../components/ComicsBanner';

const Comic = () => {
  const { id, thumbnail, title, description, pageCount, price } = useSelector(
    (state) => state.comic,
  );

  if (!id) {
    return <Navigate to="/Comics" />;
  }

  return (
    <div className={styles2.comics}>
      <ComicsBanner />
      <div className={styles.comic}>
        <img src={thumbnail} alt="comic-image" />
        <div className={styles.text}>
          <h2>{title}</h2>
          <p>{description ? description : 'This comic has no description'}</p>
          <p>{pageCount} pages</p>
          <p>Language: en-us</p>
          <b>{price}</b>
        </div>
        <Link to="/comics">Back to all</Link>
      </div>
    </div>
  );
};

export default Comic;
