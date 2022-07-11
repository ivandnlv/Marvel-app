import CharacterInfo from './components/CharacterInfo';
import CharactersList from './components/CharactersList';
import Header from './components/Header';
import RandomHero from './components/RandomHero';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <div className="App">
      <ThemeSwitcher />
      <Header />
      <RandomHero />
      <div className="Characters">
        <CharactersList />
        <CharacterInfo />
      </div>
    </div>
  );
}

export default App;
