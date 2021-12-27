import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Header, LoginForm } from '../components/index';

export type ISetStep = 'login' | 'sandEmail' | 'sandCode';

const LoginPage: NextPage = (): JSX.Element => {
  const [step, setStep] = useState<ISetStep>('login');
  return (
    <>
      <section className='container-vh'>
        <Header />
        <LoginForm setStep={setStep} />
      </section>
    </>
  );
};

export default LoginPage;
