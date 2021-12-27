import React from 'react';
import type { NextPage } from 'next';
import { Header } from '../../components/index';
import LeftMenu from '../../components/LeftMenu/OnProfile/leftMenu';
import { AdminSettings } from '../../components/Settings';

const SettingsPage: NextPage = (): JSX.Element => {
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
            <>
              <AdminSettings />
            </>
          </div>
        </>
      </section>
    </>
  );
};

export default SettingsPage;
