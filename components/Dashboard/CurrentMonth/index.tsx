import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';

interface CurrentMonthProps {}

export const CurrentMonth: React.FC<CurrentMonthProps> = () => {
  const { state } = useContext(AppContext);
  console.log(state);
  const {
    amountOfClosedAccounts,
    amountOfClosedSubscriptions,
    amountOfImages,
    amountOfNewAccounts,
    amountOfSubscriptions,
  } = state.userState.monthlyStats;

  return (
    <>
      <div className='profile-box-form'>
        <div>
          <p className='form-login-title green px20'>Current Month</p>
          <p className='form-login-subtitle gray px12 mb-6px'>Summary</p>
          <div className='profile-block-box'>
            <div className='double-blocks-5'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>
                    New Subscriptions
                  </label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name='amountOfSubscriptions'
                    id='amountOfSubscriptions'
                    value={amountOfSubscriptions}
                    onChange={() => {}}
                  />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>
                    New Free Accounts
                  </label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name='amountOfNewAccounts'
                    id='amountOfNewAccounts'
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
                    name='amountOfClosedSubscriptions'
                    id='amountOfClosedSubscriptions'
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
                    name='amountOfClosedAccounts'
                    id='amountOfClosedAccounts'
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
                    name='amountOfImages'
                    id='amountOfImages'
                    value={amountOfImages}
                    onChange={() => {}}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
