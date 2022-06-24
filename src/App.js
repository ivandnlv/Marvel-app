import { useEffect } from 'react';
import Header from './Header';
import RandomHero from './RandomHero';
import marvelApi from './services/marvelApi';

function App() {
  return (
    <div className="App">
      <Header />
      <RandomHero />
    </div>
  );
}

export default App;
