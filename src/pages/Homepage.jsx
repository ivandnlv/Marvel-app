import RandomHero from '../components/RandomHero';
import CharacterInfo from '../components/CharacterInfo';
import CharactersList from '../components/CharactersList';
import FindCharacter from '../components/FindCharacter';
import { Link } from 'react-router-dom';

import styles from '../App/App.module.scss';

const Homepage = () => {
  return (
    <>
      <Link to="/character">
        <h1>go to character</h1>
      </Link>
      <RandomHero />
      <div className={styles.characters}>
        <CharactersList />
        <div className={styles.info}>
          <CharacterInfo />
          <FindCharacter />
        </div>
      </div>
    </>
  );
};

export default Homepage;
