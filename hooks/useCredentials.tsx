import { useCallback, useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { AppContext } from '../context/app.context';
import { UserTypes } from '../reducers';
import {IMonthStats, IUser, IYearStats} from '../reducers/interfaces';
import axios from 'axios';
import { API } from '../api/AWS-gateway';
import { IAdminFullDataResponse } from '../components';
import { ISetNotofication } from '../components/Toast';
import notify from '../components/Toast';

export const useCredentials = () => {
  const { dispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  const setNotification = useCallback<ISetNotofication>(
    ({ ...notifyProps }) => {
      notify({ ...notifyProps });
    },
    []
  );

  useEffect(() => {
    const data = localStorage.getItem('admin') || '{}';
    const email = JSON.parse(data).email;
    //comment
    (async () => {
      if (!email) {
        Router.push('/login');
      }
      try {
        const fullData = await axios.get<IAdminFullDataResponse>(
          `${API.SETTINGS_FULL_INFO}?email=${email}`
        );
        dispatch({
          type: UserTypes.LOGIN,
          payload: fullData.data,
        });
      } catch (exp) {
        Router.push('/login');
      } finally {
        setLoading(false);
      }

      try {
        const { data } = await axios.get<IMonthStats>(API.STAT_CUR_MONTHS);
        dispatch({ type: UserTypes.GET_MONTHLY_STATS, payload: { ...data } });
      } catch (exp) {
        setNotification({
          type: 'error',
          message: 'Failed to load monthly stats!',
          autoClose: 3,
        });
      }

      try {
        const { data } = await axios.post<IYearStats>(API.STAT_CUR_MONTHS, {year: "2021"});
        dispatch({ type: UserTypes.GET_YEAR_STATS, payload: { ...data } });
      } catch (exp) {
        setNotification({
          type: 'error',
          message: 'Failed to load yearly stats!',
          autoClose: 3,
        });
      }

    })();
  }, []);

  return { loading };
};
