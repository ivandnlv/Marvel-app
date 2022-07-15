import { useEffect } from 'react';
import { useState } from 'react';
import { useGetComicsListQuery } from '../../redux/marvelApi';
import spinner from '../../UI/spinner.svg';
import LoadMoreBtn from '../../UI/LoadMoreBtn';
import ComicsSkeleton from '../../UI/Skeletons/ComicsSkeleton';
import ComicsItem from '../ComicsItem';

import styles from './ComicsList.module.scss';

const ComicsList = () => {
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [comics, setComics] = useState([]);

  const { data, isFetching, isError } = useGetComicsListQuery(limit);

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
    setLimit(limit + 8);
  };

  return (
    <div className={styles.comicsList}>
      {loading && [...Array(8)].map((item, index) => <ComicsSkeleton key={index} />)}
      {data?.data &&
        data.data.results?.map((comic) => (
          <ComicsItem
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
