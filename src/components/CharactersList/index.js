import { useState, useEffect } from 'react';
import { useGetCharactersListQuery } from '../../redux/marvelApi';
import { useDispatch } from 'react-redux';
import { getCharacterInfo } from '../../redux/slices/characterInfoSlice';
import spinner from '../../UI/spinner.svg';
import LoadMoreBtn from '../../UI/LoadMoreBtn';
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
    dispatch(getCharacterInfo(id));
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
        <LoadMoreBtn onClick={onLoadMore}>LOAD MORE</LoadMoreBtn>
      ) : moreLoading ? (
        <LoadMoreBtn disabled>
          <img width={50} height={50} src={spinner} alt="Loading..." />
        </LoadMoreBtn>
      ) : (
        isError && <LoadMoreBtn disabled>Error</LoadMoreBtn>
      )}
    </div>
  );
};

export default CharactersList;
