import { useState, useEffect } from 'react';
import { useGetCharactersListQuery } from '../../redux/marvelApi';
import { useDispatch } from 'react-redux';
import { setId } from '../../redux/slices/characterInfoSlice';
import spinner from '../../UI/spinner.svg';
import Btn from '../../UI/Btn';
import CharactersSkeleton from '../../UI/Skeletons/CharactersSkeleton';
import CharactersItem from '../CharactersItem';
import styles from './CharactersList.module.scss';

const CharactersList = () => {
  const dispatch = useDispatch();

  const [charactersCount, setCharactersCount] = useState(9);
  const { data, isFetching, isError } = useGetCharactersListQuery(charactersCount);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [isFetching === true]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    setTimeout(() => setMoreLoading(false), 1000);
  }, [isFetching === false]);

  const characters = data?.data.results;

  const onLoadMore = () => {
    setCharactersCount(charactersCount + 9);
    setMoreLoading(true);
  };

  const onCharacterClick = (id) => {
    dispatch(setId(id));
  };

  return (
    <div className={styles.characters}>
      {loading && !data
        ? [...Array(9)].map((item, index) => <CharactersSkeleton key={index} />)
        : !isError &&
          characters?.map((character) => (
            <CharactersItem
              onClick={() => onCharacterClick(character.id)}
              key={character.id}
              name={character.name}
              image={character.thumbnail.path + '.' + character.thumbnail.extension}
            />
          ))}
      {!moreLoading ? (
        <Btn color="main" type="load" onClick={onLoadMore}>
          LOAD MORE
        </Btn>
      ) : moreLoading ? (
        <Btn color="main" type="load">
          <img width={50} height={50} src={spinner} alt="Loading..." />
        </Btn>
      ) : (
        isError && (
          <Btn color="main" type="load">
            Error
          </Btn>
        )
      )}
    </div>
  );
};

export default CharactersList;
