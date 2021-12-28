import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';

interface PremiumInfoProps {}

const getCurrency = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};

export const PremiumInfo: React.FC<PremiumInfoProps> = () => {
  const { state } = useContext(AppContext);
  const { features, price, setting_code, terms } =
    state.userState.premiumInformation;
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
