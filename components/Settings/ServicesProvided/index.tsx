import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';

interface ServicesProvidedProps {}

export const ServicesProvided: React.FC<ServicesProvidedProps> = () => {
  const { state } = useContext(AppContext);
  const { freeHasPhoneNumber, freeHasWebsite, freeIsVerified } =
    state.userState.subscriberSettings;
  return (
    <>
      <div className='profile-box-form'>
        <div className='form-info-block'>
          <div>
            <p className='form-login-title green px20'>Services Provided</p>
            <p className='form-login-subtitle gray px12 '>
              Available Service Categories
            </p>
          </div>
        </div>
        <div className='box-2-box'>
          <div className='profile-block-box'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>Add Service</label>
              </p>
              <p>
                <input
                  className='form-profile-input'
                  type='text'
                  name='add_service'
                  id='add_service'
                  value=''
                  placeholder='Service Name Here'
                />
              </p>
            </div>
            <p className='row-content'>
              <button className='button-green'>Add service</button>
            </p>
          </div>
          <div className='profile-block-box'>
            <div>
              <p className='form-login-input'>
                <input
                  type='text'
                  name=''
                  value=''
                  id=''
                  placeholder='Service 1'
                />
                <img
                  className='form-login-input-edit'
                  src='../images/edit.svg'
                />
                <img
                  className='form-login-input-close'
                  src='../images/close.svg'
                />
              </p>
              <p className='form-login-input'>
                <input
                  type='text'
                  name=''
                  value=''
                  id=''
                  placeholder='Service 2'
                />
                <img
                  className='form-login-input-edit'
                  src='../images/edit.svg'
                />
                <img
                  className='form-login-input-close'
                  src='../images/close.svg'
                />
              </p>
              <p className='form-login-input'>
                <input
                  type='text'
                  name=''
                  value=''
                  id=''
                  placeholder='Service 3'
                />
                <img
                  className='form-login-input-edit'
                  src='../images/edit.svg'
                />
                <img
                  className='form-login-input-close'
                  src='../images/close.svg'
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
