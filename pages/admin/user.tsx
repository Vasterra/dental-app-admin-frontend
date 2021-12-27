import React from 'react';
import type { NextPage } from 'next';
import { Header } from '../../components/index';
import LeftMenu from '../../components/LeftMenu/OnProfile/leftMenu';
import { Account } from '../../components/Account';

const UsersPage: NextPage = (): JSX.Element => {
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
              <Account />
            </>
          </div>
        </>
      </section>
    </>
  );
};

export default UsersPage;
