import Header from './components/Header';
import RandomHero from './components/RandomHero';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <div className="App">
      <ThemeSwitcher />
      <Header />
      <RandomHero />
    </div>
  );
}

export default App;
