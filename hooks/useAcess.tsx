import Router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/app.context';
import { userReducer, UserTypes } from '../reducers';

export const useAccess = (params: {
  time?: number;
  redirects?: { success: string; fail: string };
}) => {
  const { time, redirects } = params;
  const [timeLeft, setTimeLeft] = useState<number>(time || 3);
  const [isLogged, setAuth] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (timeLeft === 0) {
      if (!isLogged) {
        Router.push(redirects?.fail || '/login');
        return;
      }
      if (isLogged) {
        Router.push(redirects?.success || '/admin/dashboard');
        return;
      }
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, isLogged]);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      console.log(JSON.parse(user));
      setAuth(true);
    }
  }, []);

  return { timeLeft };
};
