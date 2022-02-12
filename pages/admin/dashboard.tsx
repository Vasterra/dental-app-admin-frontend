import React, {useContext} from 'react';
import type { NextPage } from 'next';
import { Header } from '../../components';
import LeftMenu from '../../components/LeftMenu/OnProfile/leftMenu';
import { CurrentMonth } from '../../components/Dashboard/CurrentMonth';
import { TotalSubs } from '../../components/Dashboard/Total';
import { useCredentials } from '../../hooks/useCredentials';
import Skeleton from 'react-loading-skeleton';
import { Footer } from '../../components/Footer/Footer';
import { AppContext } from '../../context/app.context';

const DashboardPage: NextPage = (): JSX.Element => {
  const { state } = useContext(AppContext);
  const { loading } = useCredentials();

  return (
    <>
      <section>
        <>
          <Header withMenu={true} />
          <div className = {` 
          bg-white 
          ${state.userState.isOpenLeftMenu ? 'main-profile_leftMenuOpened' : 'main-profile'}`}>
            {loading && (
              <Skeleton
                count={2}
                duration={1.2}
                height={'48vh'}
                enableAnimation={true}
                containerClassName='main-profile bg-white'
              />
            )}
            {!loading && (
              <>
                <CurrentMonth />
                <TotalSubs />
              </>
            )}
          </div>
          <Footer />
        </>
      </section>
    </>
  );
};

export default DashboardPage;
