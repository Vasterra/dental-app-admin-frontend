import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';
import { useLogout } from '../../../hooks/useLogout';

const LeftMenu: React.FC = () => {
  const { state } = useContext(AppContext);
  const { isLogged } = state.userState;
  const { avatar_url, username, email } = state.userState.adminDetails;

  const [logOut] = useLogout(() => {
    sessionStorage.removeItem('user');
  }, '/login');

  return (
    <div>
      <div className='leftmenu'>
        <div className='leftmenu-content'>
          <div className='link-actve'>
            <Link href='/admin/dashboard'>
              <img
                src='../../images/FYD4_beige-on-green@2x.png'
                srcSet='../../images/FYD4_beige-on-green@2x.png 2x, ../../images/FYD4_beige-on-green@3x.png 3x'
                className='logo-image desctop-visible'
                alt='logo image'
              />
            </Link>
          </div>
          <div className='leftmenu-user-information'>
            <img
              className='user-image'
              src={avatar_url || '../../images/empty_avatar.png'}
              alt='profile image'
            />
            <div className='user-description white'>
              <span>{username?.split(' ')[0] || ''}</span>
              <span>{username?.split(' ')[1] || ''}</span>
            </div>
          </div>
        </div>
        <div className='leftmenu-navbar'>
          <Link href={`/admin/dashboard`}>
            <li className={`leftmenu-list active}`}>
              <img
                className='leftmenu-link-image'
                src='../../images/user.svg'
                alt='link image'
              />
              <a className='leftmenu-link'>Dashboard</a>
            </li>
          </Link>
          <Link href={`/admin/settings`}>
            <li className={`leftmenu-list`}>
              <img
                className='leftmenu-link-image'
                src='../../images/more_vert.svg'
                alt='link image'
              />
              <a className='leftmenu-link'>Settings</a>
            </li>
          </Link>
          <Link href={`/admin/user`}>
            <li className={`leftmenu-list`}>
              <img
                className='leftmenu-link-image'
                src='../../images/person_black_24dp.svg'
                alt='link image'
              />
              <a className='leftmenu-link'>Users</a>
            </li>
          </Link>

          <li className='leftmenu-list logout'>
            <img
              className='leftmenu-link-image'
              src='../../images/left-arrow.svg'
              alt='link image'
            />
            <a className='leftmenu-link' href='/login' onClick={logOut}>
              Logout
            </a>
          </li>
        </div>
      </div>
      <div className='leftMenu-imagination-div' />
    </div>
  );
};

export default LeftMenu;
