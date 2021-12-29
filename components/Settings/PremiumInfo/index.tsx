import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../context/app.context';
import { ISetNotofication } from '../../Toast';
import notify from '../../Toast';
import { API } from '../../../api/AWS-gateway';
import axios from 'axios';

interface PremiumInfoProps {}

const getCurrency = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};

interface ResetPassFormChild {
  oldPassword: string;
  newPassword: string;
}

export const PremiumInfo: React.FC<PremiumInfoProps> = () => {
  const { state } = useContext(AppContext);
  const { features, price, setting_code, terms } =
    state.userState.premiumInformation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPassFormChild>();

  const setNotification = useCallback<ISetNotofication>(
    ({ ...notifyProps }) => {
      notify({ ...notifyProps });
    },
    []
  );

  const handleResetPasword = async (data: ResetPassFormChild) => {
    const { oldPassword, newPassword } = data;
    const body = {
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
            <p className='form-login-title green px20'>Premium Information</p>
            <p className='form-login-subtitle gray px12 mb-6px'>
              Information for Free Users
            </p>
          </div>
        </div>
        <div className='box-2-box'>
          <div className='profile-block-box'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>Premium Features</label>
              </p>

              {features.map((item) => (
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
                    value={item}
                    placeholder='Feature 2'
                  />
                </p>
              ))}

              <p className='add-plus'>
                <input
                  className='form-profile-input '
                  type='text'
                  name=''
                  id=''
                  value=''
                  placeholder=''
                />
                <img
                  className='plus'
                  id='plus'
                  src='../images/plus.svg'
                  alt=''
                />
              </p>
            </div>
          </div>
          <div className='profile-block-box'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>
                  Price ({getCurrency(0)})
                </label>
              </p>
              <p>
                <input
                  className='form-profile-input'
                  type='text'
                  name='pricePremiumInfo'
                  id='pricePremiumInfo'
                  value={price / 100}
                />
              </p>
            </div>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>
                  Terms and Conditions
                </label>
              </p>
              <p>
                <input
                  className='form-profile-input'
                  type='text'
                  name=''
                  id=''
                  value={terms}
                  placeholder='Web Link'
                />
              </p>
            </div>
            <p className='row-content'>
              <button className='button-green'>Save</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
