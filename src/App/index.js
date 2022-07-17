import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRandomHero } from '../redux/slices/randomSlice';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Homepage from '../pages/Homepage';
import Character from '../pages/Character';
import Comics from '../pages/Comics';

import styles from './App.module.scss';
import Comic from '../pages/Comic';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomHero());
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/character" element={<Character />} />
        <Route path="/comic" element={<Comic />} />
      </Routes>
    </div>
  );
}

export default App;
