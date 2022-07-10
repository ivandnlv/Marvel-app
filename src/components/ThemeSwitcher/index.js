import { useEffect, useLayoutEffect, useState } from 'react';
import lightImg from './light-mode.png';
import darkImg from './dark-mode.png';

import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(false);

  useLayoutEffect(() => {
    const localDark = localStorage.getItem('theme');
    localDark && setDark(localDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', dark);
  }, [dark]);

  const onSwitchClick = () => {
    setDark(!dark);
  };

  useEffect(() => {
    const body = document.body;
    dark ? body.setAttribute('data-theme', 'dark') : body.setAttribute('data-theme', 'light');
  }, [dark]);

  return (
    <div className={styles.switcher} onClick={onSwitchClick}>
      <img src={dark ? darkImg : lightImg} alt="theme-switch" />
    </div>
  );
};

export default ThemeSwitcher;
