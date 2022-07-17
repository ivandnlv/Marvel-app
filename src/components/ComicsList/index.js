import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetComicsListQuery } from '../../redux/marvelApi';
import { useDispatch, useSelector } from 'react-redux';
import { getComicById } from '../../redux/slices/comicSlice';
import { setLimit } from '../../redux/slices/comicSlice';
import spinner from '../../UI/spinner.svg';
import LoadMoreBtn from '../../UI/LoadMoreBtn';
import ComicsSkeleton from '../../UI/Skeletons/ComicsSkeleton';
import ComicsItem from '../ComicsItem';

import styles from './ComicsList.module.scss';

const ComicsList = () => {
  const limit = useSelector((state) => state.comic.limit);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);

  const { data, isFetching } = useGetComicsListQuery(limit);

  useEffect(() => {
    if (isFetching && limit === 8) {
      setLoading(true);
    }
    if (!isFetching && limit === 8) {
      setLoading(false);
    }
    if (isFetching && limit > 8) {
      setMoreLoading(true);
    }
    if (!isFetching && limit > 8) {
      setMoreLoading(false);
    }
  }, [isFetching]);

  const onLoadMoreClick = () => {
    dispatch(setLimit(limit + 8));
  };

  const onComicClick = async (id) => {
    await dispatch(getComicById(id));
    navigate('/comic');
  };

  return (
    <div className={styles.comicsList}>
      {loading && [...Array(8)].map((item, index) => <ComicsSkeleton key={index} />)}
      {data?.data &&
        data.data.results?.map((comic) => (
          <ComicsItem
            onClick={() => onComicClick(comic.id)}
            key={comic.id}
            title={comic.title}
            thumbnail={comic.thumbnail.path + '.' + comic.thumbnail.extension}
            price={comic.prices[0].price + '$'}
          />
        ))}
      {!moreLoading ? (
        <LoadMoreBtn onClick={onLoadMoreClick}>LOAD MORE</LoadMoreBtn>
      ) : moreLoading ? (
        <LoadMoreBtn disabled>
          <img width={50} height={50} src={spinner} alt="Loading..." />
        </LoadMoreBtn>
      ) : (
        <LoadMoreBtn disabled>Error</LoadMoreBtn>
      )}
    </div>
  );
};

export default ComicsList;
