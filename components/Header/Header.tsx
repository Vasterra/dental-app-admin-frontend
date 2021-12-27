import Link from 'next/link';
import { useState, useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { useLogout } from '../../hooks/useLogout';

export const Header: React.FC = () => {
  const { state } = useContext(AppContext);
  const [logOut] = useLogout(() => {
    sessionStorage.removeItem('user');
  }, '/login');

  return (
    <>
      <div className='header_shadow' />
      <div className='header bg-green'>
        <div className='menu' id='mobile_menu'>
          <div className='menu-logo'></div>
        </div>
        <div>
          <Link href='/login'>
            <img
              src='../images/FYD4_beige-on-green@2x.png'
              srcSet='../images/FYD4_beige-on-green@2x.png 2x,
            ../images/FYD4_beige-on-green@3x.png 3x'
              className='logo-image'
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </div>
        <div className='header_actions'>
          {/* <button className='button-green-login' onClick={logOut}>
            Logout
          </button> */}
        </div>
        <div></div>
      </div>
    </>
  );
};
