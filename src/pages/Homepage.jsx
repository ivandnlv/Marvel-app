import RandomHero from '../components/RandomHero';
import CharacterInfo from '../components/CharacterInfo';
import CharactersList from '../components/CharactersList';
import FindCharacter from '../components/FindCharacter';

import styles from '../App/App.module.scss';

const Homepage = () => {
  return (
    <>
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
