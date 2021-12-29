import React from 'react';
import type { NextPage } from 'next';
import { Header } from '../../components/index';
import LeftMenu from '../../components/LeftMenu/OnProfile/leftMenu';
import { AdminSettings } from '../../components/Settings';
import { useCredentials } from '../../hooks/useCredentials';
import Skeleton from 'react-loading-skeleton';

const SettingsPage: NextPage = (): JSX.Element => {
  const { loading } = useCredentials();
  return (
    <>
      <section className='container-profile '>
        <>
          <div className='mobile-header'>
            <Header />
          </div>
          <>
            <LeftMenu />
          </>
          <div className='main-profile bg-white '>
            {loading && (
              <Skeleton
                count={4}
                duration={1.2}
                height={'45vh'}
                enableAnimation={true}
                containerClassName='main-profile bg-white'
              />
            )}
            {!loading && (
              <>
                <AdminSettings />
              </>
            )}
          </div>
        </>
      </section>
    </>
  );
};

export default SettingsPage;
