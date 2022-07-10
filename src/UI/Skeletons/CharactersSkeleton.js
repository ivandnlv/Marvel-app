import ContentLoader from 'react-content-loader';
import styles from '../../components/CharactersItem/CharactersItem.module.scss';

const CharactersSkeleton = () => (
  <div className={styles.character}>
    <ContentLoader
      speed={2}
      width={200}
      height={240}
      viewBox="0 0 200 240"
      backgroundColor="#adadad"
      foregroundColor="#ecebeb">
      <rect x="331" y="142" rx="0" ry="0" width="101" height="38" />
      <rect x="0" y="0" rx="0" ry="0" width="200" height="200" />
      <rect x="15" y="214" rx="0" ry="0" width="70" height="25" />
    </ContentLoader>
  </div>
);

export default CharactersSkeleton;
