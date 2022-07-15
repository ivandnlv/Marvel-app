import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCharacter } from '../../redux/slices/characterSlice';

import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  const onHomeClick = () => {
    dispatch(resetCharacter());
  };

  return (
    <div className={styles.header}>
      <h1>
        <Link to="/" onClick={onHomeClick}>
          Marvel
        </Link>{' '}
        information portal
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
