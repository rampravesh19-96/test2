// api.js

import { apiAction } from './redux/redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const useApiData = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer);

  useEffect(() => {
    dispatch(apiAction());
  }, [dispatch]);

  return data;
}
