import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { marvelApi } from '../../redux/marvelApi';
import { setCharacter } from '../../redux/slices/characterSlice';
import { Link } from 'react-router-dom';
import Btn from '../../UI/Btn';

import styles from './FindCharacter.module.scss';

const FindCharacter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [getAllCharacters, { data, isSuccess }] = marvelApi.useGetAllCharactersMutation(value);

  const correctCharacterName = () => {
    const arr = value.split(' ');
    const newArr = arr.map((item) => {
      return item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase();
    });
    return newArr.join(' ');
  };

  const onSubmit = async () => {
    if (value.length > 3) {
      await getAllCharacters(value);
      if (isSuccess) {
        console.log(data);
        setSuccess(true);
        dispatch(
          setCharacter({
            name: data.data.results[0]?.name,
            description: data.data.results[0]?.description,
            path: data.data.results[0]?.thumbnail.path,
            extension: data.data.results[0]?.thumbnail.extension,
            id: data.data.results[0]?.id,
          }),
        );
      }
    } else {
      setValue('');
      setSuccess(false);
      setError('This field is required');
    }
  };

  const onInputChange = (val) => {
    setValue(val);
    setError('');
    setSuccess(false);
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
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.agree}>There is! Visit {value} page?</p>}
        </label>
      </div>
      <div>
        <Btn color="main" onClick={onSubmit}>
          FIND
        </Btn>
        {success && <Btn color="grey">To page</Btn>}
      </div>
    </form>
  );
};

export default FindCharacter;
