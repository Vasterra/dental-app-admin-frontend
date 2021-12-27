import { GetStaticProps, GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { useAccess } from '../hooks/useAcess';

const Home = (): JSX.Element => {
  const { timeLeft } = useAccess({
    time: 3,
    redirects: { fail: 'login', success: 'admin/dashboard' },
  });
  return (
    <>
      <div
        style={{
          height: '100vh',
          background: 'rgba(97, 116, 105, 0.178)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <>
            <div className='lds-roller'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </>
          <h1 style={{ margin: '5px' }}>
            Checking your browser before accessing ADMIN PAGE
          </h1>
          <code style={{ margin: '5px', fontSize: '18px' }}>
            This process is automatic. Your browser will redirect to your
            requested content shortly
          </code>
          {!!timeLeft && (
            <code style={{ margin: '5px', fontSize: '14px', color: 'red' }}>
              Please allow up to {timeLeft} seconds...
            </code>
          )}
          {!timeLeft && (
            <code style={{ margin: '5px', fontSize: '14px', color: 'red' }}>
              Please allow up to redirect...
            </code>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = 'data from pros';
  return {
    props: {
      data: {
        foo: 'foo',
      },
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  data: string;
}
