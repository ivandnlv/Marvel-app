import React from 'react';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>
        <span>Marvel</span> information portal
      </h1>
      <nav>
        <ul>
          <li className={styles.selected}>Characters</li>
          <div>/</div>
          <li>Comics</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
