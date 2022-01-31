import { Chart } from './chart2';
import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';

export const TotalSubs: React.FC<any> = () => {
  const { state } = useContext(AppContext);
  const {
    amountOfClosedAccounts,
    amountOfClosedSubscriptions,
    amountOfImages,
    amountOfNewAccounts,
    amountOfSubscriptions,
  } = state.userState.yearStats;

  return (
    <>
      <div className='profile-box-form'>
        <>
          <p className='form-login-title green px20'>Total Subscriptions</p>
          <p className='form-login-subtitle gray px12 mb-6px'>Summary</p>
          <div className='profile-block-box'>
            <div className='double-blocks-5'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Subscriptions</label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
                    value={amountOfSubscriptions}
                    onChange={() => {}}
                  />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Free Accounts</label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
                    value={amountOfNewAccounts}
                    onChange={() => {}}
                  />
                </p>
              </div>

              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>
                    Subscriptions Closed
                  </label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
                    value={amountOfClosedSubscriptions}
                    onChange={() => {}}
                  />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Accounts Closed</label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
                    value={amountOfClosedAccounts}
                    onChange={() => {}}
                  />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Images Uploaded</label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
                    value={amountOfImages}
                    onChange={() => {}}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className='profile-block-box' style={{ padding: '60px' }}>
            <Chart />
          </div>
        </>
      </div>
    </>
  );
};
