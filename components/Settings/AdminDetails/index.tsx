import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../context/app.context';
import { ISetNotification } from '../../Toast';
import notify from '../../Toast';
import axios from 'axios';
import { API } from '../../../api/AWS-gateway';

interface AdminDetailsProps {}

interface ResetPassFormChild {
  oldPassword: string;
  newPassword: string;
}

export const AdminDetails: React.FC<AdminDetailsProps> = () => {
  const { state } = useContext(AppContext);
  const { email, username } = state.userState.adminDetails;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassFormChild>();

  const setNotification = useCallback<ISetNotification>(
    ({ ...notifyProps }) => {
      notify({ ...notifyProps });
    },
    []
  );

  const handleResetPasword = async (data: ResetPassFormChild) => {
    const { oldPassword, newPassword } = data;
    const body = {
      email,
      oldPassword,
      newPassword,
    };
    try {
      await axios.post(API.ACCOUNT_RESET_PASSWORD, body);
      setNotification({
        type: 'success',
        message: 'Successfully changed password!',
        position: 'top-right',
        autoClose: 2,
      });
    } catch (exp) {
      setNotification({
        type: 'warning',
        message: 'Error to reset password account, please try again!',
      });
    }
  };

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
          <form
            className='profile-block-box'
            onSubmit={handleSubmit(handleResetPasword)}
          >
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>Reset Password</label>
              </p>
              <p className='row-content'>
                <span className='input-span'>Current</span>{' '}
                <input
                  className='form-profile-input'
                  {...register('oldPassword', {
                    required: {
                      value: true,
                      message: 'password is required',
                    },
                  })}
                  type='text'
                  name='oldPassword'
                  id='oldPassword'
                  placeholder='old password'
                />
              </p>
              {(errors.oldPassword?.message || errors.oldPassword?.type) && (
                <p className='account-error-text'>
                  {errors.oldPassword?.message || 'Invalid password'}
                </p>
              )}
              <p className='row-content'>
                <span className='input-span'>New</span>{' '}
                <input
                  className='form-profile-input'
                  {...register('newPassword', {
                    required: {
                      value: true,
                      message: 'new password is required',
                    },
                  })}
                  type='text'
                  name='newPassword'
                  id='newPassword'
                  placeholder='new password'
                />
              </p>
              {(errors.newPassword?.message || errors.newPassword?.type) && (
                <p className='account-error-text'>
                  {' '}
                  {errors.newPassword?.message || 'Invalid new password'}
                </p>
              )}
            </div>
            <p className='row-content'>
              <span className='input-span'></span>
              <button className='button-green' type='submit'>
                Reset Password
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
