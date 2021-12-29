import Link from 'next/link';
import { useState, useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { useLogout } from '../../hooks/useLogout';
import { UserTypes } from '../../reducers';
import { CollapsedSidebar } from '../LeftMenu/OnHeader/Sidebar';

interface IHeader {
  withMenu?: boolean;
}

export const Header: React.FC<IHeader> = ({ withMenu }) => {
  const { state, dispatch } = useContext(AppContext);
  const { isOpenLeftMenu } = state.userState;
  const toggle = isOpenLeftMenu;

  const setToggle = (isOpen) => {
    dispatch({
      type: UserTypes.OPEN_LEFT_MENU,
      payload: isOpen,
    });
  };

  const [logOut] = useLogout(() => {
    setToggle(false);
  });

  return (
    <>
      <div className='header_shadow' />
      <div className='header bg-green'>
        <div className='menu' id='mobile_menu'>
          {withMenu && (
            <svg
              className='menu-logo'
              xmlns='http://www.w3.org/2000/svg'
              height='28px'
              viewBox='0 0 28 20'
              width='20px'
              onClick={() => setToggle(true)}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          )}
        </div>
        <div>
          <Link href='#'>
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
        <div>
          {withMenu && (
            <CollapsedSidebar
              logout={logOut}
              setToggle={setToggle}
              toggle={toggle}
              state={state.userState}
            />
          )}
        </div>
      </div>
    </>
  );
};
