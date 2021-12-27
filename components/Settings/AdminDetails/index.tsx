import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';

interface AdminDetailsProps {}

export const AdminDetails: React.FC<AdminDetailsProps> = () => {
  const { state } = useContext(AppContext);
  const { email, username } = state.userState.adminDetails;
  return (
    <>
      <div className='profile-box-form'>
        <div className='form-info-block'>
          <div>
            <p className='form-login-title green px20'>Admin Details</p>
            <p className='form-login-subtitle gray px12 mb-6px'>
              Login Details
            </p>
          </div>
        </div>
        <div className='box-2-box'>
          <div className='profile-block-box'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label' htmlFor='name'>
                  Name
                </label>
              </p>
              <p>
                <input
                  className='form-profile-input'
                  type='text'
                  name='name'
                  id='name'
                  value={username}
                  disabled
                  placeholder='Admin Name'
                />
              </p>
            </div>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label' htmlFor='email'>
                  Email
                </label>
              </p>
              <p>
                <input
                  className='form-profile-input'
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  disabled
                  placeholder='John.smith@dental.co.uk'
                />
              </p>
            </div>
          </div>
          <div className='profile-block-box'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>Reset Password</label>
              </p>
              <p className='row-content'>
                <span className='input-span'>Current</span>{' '}
                <input
                  className='form-profile-input'
                  type='text'
                  name='current'
                  id='current'
                  value=''
                  placeholder='XXXXXXXXXXXXXXX'
                />
              </p>
              <p className='row-content'>
                <span className='input-span'>New</span>{' '}
                <input
                  className='form-profile-input'
                  type='text'
                  name='new'
                  id='new'
                  value=''
                  placeholder='Xxxxx'
                />
              </p>
            </div>
            <p className='row-content'>
              <span className='input-span'></span>
              <button className='button-green'>Reset Password</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
