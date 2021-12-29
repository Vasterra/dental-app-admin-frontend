import { useContext } from 'react';
import Router from 'next/router';
import { AppContext } from '../context/app.context';
import { UserTypes } from '../reducers';

export const useLogout = (callback?: Function, path?: string) => {
  const { dispatch } = useContext(AppContext);

  const logOut = async () => {
    localStorage.removeItem('admin');
    dispatch({
      type: UserTypes.LOGOUT,
    });
    if (callback) callback();
    Router.push(path || '/login');
  };

  return [logOut];
};
