import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../../context/app.context';
import { Switch } from '../../common/Switch';

interface PaidSubscriberProps {}

interface IPaidSubscriberChilds {
  freeMaxLocations: number;
  freeMaxServices: number;
  paidMaxLocations: number;
  paidMaxServices: number;
}

const activeColor = '#095C5C';

export const PaidSubscriber: React.FC<PaidSubscriberProps> = () => {
  const { state } = useContext(AppContext);
  const {
    freeHasPhoneNumber,
    freeHasWebsite,
    freeIsVerified,
    paidHasPhoneNumber,
    paidHasWebsite,
    paidIsVerified,

    paidMaxLocations,
    paidMaxServices,
    freeMaxLocations,
    freeMaxServices,
  } = state.userState.subscriberSettings;

  const [opts, setOptions] = useState({
    freeHasPhoneNumber,
    freeHasWebsite,
    freeIsVerified,
    paidHasPhoneNumber,
    paidHasWebsite,
    paidIsVerified,
  });

  const onChangeValues = (name: string, value: boolean) => {
    let newOpts = { ...opts };
    newOpts[name] = value;
    console.log(newOpts);
    setOptions(newOpts);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<IPaidSubscriberChilds>();

  return (
    <>
      <div className='profile-box-form'>
        <div className='form-info-block-paid'>
          <div>
            <p className='form-login-title green px20'>Paid Subscriber</p>
            <p className='form-login-subtitle gray px12 mb-6px'>Set Limits</p>
            <div className='profile-block-box'>
              <div className='double-blocks-3'>
                <div>
                  <p className='form-profile-label'>
                    <label className='form-profile-label'>Max Locations</label>
                  </p>
                  <p>
                    <input
                      className='form-profile-input'
                      {...register('paidMaxLocations', {
                        required: { value: true, message: '*Required option' },
                        value: paidMaxLocations,
                      })}
                      type='text'
                      name='paidMaxLocations'
                      id='paidMaxLocations'
                      maxLength={2}
                    />
                  </p>
                </div>
                <div>
                  <p className='form-profile-label'>
                    <label className='form-profile-label'>Max Services</label>
                  </p>
                  <p>
                    <input
                      className='form-profile-input'
                      {...register('paidMaxServices', {
                        required: { value: true, message: '*Required option' },
                        value: paidMaxServices,
                      })}
                      type='text'
                      name='paidMaxServices'
                      id='paidMaxServices'
                      maxLength={2}
                    />
                  </p>
                </div>
                <div></div>
              </div>
              <div className='double-blocks-3'>
                <p className='form-profile-label'>
                  <label className='form-profile-label'> Website Address</label>
                  <Switch
                    isOn={paidHasWebsite}
                    handleToggle={() =>
                      onChangeValues('paidHasWebsite', !opts.paidHasWebsite)
                    }
                    onColor={activeColor}
                  />
                </p>

                <p className='form-profile-label'>
                  <label className='form-profile-label'>Phone Number</label>
                  <Switch
                    isOn={paidHasPhoneNumber}
                    handleToggle={() =>
                      onChangeValues(
                        'paidHasPhoneNumber',
                        !opts.paidHasPhoneNumber
                      )
                    }
                    onColor={activeColor}
                  />
                </p>

                <p className='form-profile-label'>
                  <label className='form-profile-label'>Appear Verified</label>
                  <Switch
                    isOn={paidIsVerified}
                    handleToggle={() =>
                      onChangeValues('paidIsVerified', !opts.paidIsVerified)
                    }
                    onColor={activeColor}
                  />
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className='form-login-title green px20'>Free Subscriber</p>
            <p className='form-login-subtitle gray px12 mb-6px'>Set Limits</p>
            <div className='profile-block-box'>
              <div className='double-blocks-3'>
                <div>
                  <p className='form-profile-label'>
                    <label className='form-profile-label'>Max Locations</label>
                  </p>
                  <p>
                    <input
                      className='form-profile-input'
                      {...register('freeMaxLocations', {
                        required: { value: true, message: '*Required option' },
                        value: freeMaxLocations,
                      })}
                      type='text'
                      name='freeMaxLocations'
                      id='freeMaxLocations'
                      maxLength={2}
                    />
                  </p>
                </div>
                <div>
                  <p className='form-profile-label'>
                    <label className='form-profile-label'>Max Services</label>
                  </p>
                  <p>
                    <input
                      className='form-profile-input'
                      {...register('freeMaxServices', {
                        required: { value: true, message: '*Required option' },
                        value: freeMaxServices,
                      })}
                      type='text'
                      name='freeMaxServices'
                      id='freeMaxServices'
                      maxLength={2}
                    />
                  </p>
                </div>
                <div></div>
              </div>
              <div className='double-blocks-3'>
                <p className='form-profile-label'>
                  <label className='form-profile-label'> Website Address</label>
                  <Switch
                    isOn={freeHasWebsite}
                    handleToggle={() =>
                      onChangeValues('freeHasWebsite', opts.freeHasWebsite)
                    }
                    onColor={activeColor}
                  />
                </p>

                <p className='form-profile-label'>
                  <label className='form-profile-label'>Phone Number</label>
                  <Switch
                    isOn={opts.freeHasPhoneNumber}
                    handleToggle={() =>
                      onChangeValues(
                        'freeHasPhoneNumber',
                        !opts.freeHasPhoneNumber
                      )
                    }
                    onColor={activeColor}
                  />
                </p>

                <p className='form-profile-label'>
                  <label className='form-profile-label'>Appear Verified</label>
                  <Switch
                    isOn={freeIsVerified}
                    handleToggle={() =>
                      onChangeValues('freeIsVerified', !opts.freeIsVerified)
                    }
                    onColor={activeColor}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '10px',
          }}
        >
          <p className='row-content'>
            <button className='button-green'>Apply</button>
          </p>
        </div>
      </div>
    </>
  );
};
