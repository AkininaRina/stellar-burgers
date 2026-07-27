import { FC, useEffect } from 'react';

import { FeedUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.feed.orders);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
