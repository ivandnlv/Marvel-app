import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.selected : null)}>
              Characters
            </NavLink>
          </li>
          <div>/</div>
          <li>
            <NavLink to="/comics" className={({ isActive }) => (isActive ? styles.selected : null)}>
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
