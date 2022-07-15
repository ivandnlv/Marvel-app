import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomHero } from '../redux/slices/randomSlice';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Homepage from '../pages/Homepage';
import Character from '../pages/Character';
import Comics from '../pages/Comics';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomHero());
  }, []);

  return (
    <div className={styles.app}>
      <ThemeSwitcher />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/character" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
