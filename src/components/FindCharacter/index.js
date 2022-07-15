import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacterById, resetCharacter } from '../../redux/slices/characterSlice';
import { Link } from 'react-router-dom';
import Btn from '../../UI/Btn';

import styles from './FindCharacter.module.scss';

const FindCharacter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const { error, success, errorMessage } = useSelector((state) => state.character);

  const correctCharacterName = () => {
    const arr = value.split(' ');
    const newArr = arr.map((item) => {
      return item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase();
    });
    return newArr.join(' ');
  };

  const onSubmit = async () => {
    dispatch(getCharacterById(correctCharacterName()));
  };

  const onInputChange = (val) => {
    dispatch(resetCharacter());
    setValue(val);
  };

  return (
    <form className={styles.find}>
      <div>
        <label>
          <span>Or find a character by name:</span>
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => onInputChange(e.target.value)}
            value={value}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          {success && !error && (
            <p className={styles.agree}>There is! Visit {correctCharacterName()} page?</p>
          )}
        </label>
      </div>
      <div>
        <Btn color="main" onClick={onSubmit}>
          FIND
        </Btn>
        {success && value && (
          <Link to="/character">
            <div className={styles.topage}>TO PAGE</div>
          </Link>
        )}
      </div>
    </form>
  );
};

export default FindCharacter;
