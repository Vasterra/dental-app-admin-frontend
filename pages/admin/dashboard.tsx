import React from 'react';
import type { NextPage } from 'next';
import { Header } from '../../components/index';
import LeftMenu from '../../components/LeftMenu/OnProfile/leftMenu';
import { CurrentMonth } from '../../components/Dashboard/CurrentMonth';
import { TotalSubs } from '../../components/Dashboard/Total';

const DashboardPage: NextPage = (): JSX.Element => {
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
            <CurrentMonth />
            <TotalSubs />
          </div>
        </>
      </section>
    </>
  );
};

export default DashboardPage;
