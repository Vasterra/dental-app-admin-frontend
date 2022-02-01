import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { API } from '../../../api/AWS-gateway';
import { AppContext } from '../../../context/app.context';
import { Switch } from '../../common/Switch';
import { ISetNotification } from '../../Toast';
import notify from '../../Toast';
import { UserTypes } from '../../../reducers';
import { ISubSettings } from "../../../reducers/interfaces";

interface PaidSubscriberProps {}

interface IPaidSubscriberChilds {
  freeMaxLocations: number;
  freeMaxServices: number;
  paidMaxLocations: number;
  paidMaxServices: number;
}

const activeColor = '#095C5C';

export const PaidSubscriber: React.FC<PaidSubscriberProps> = () => {
  const { state, dispatch } = useContext(AppContext);
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

  const setNotification = useCallback<ISetNotification>(
    ({ ...notifyProps }) => {
      notify({ ...notifyProps });
    },
    []
  );

  const onChangeValues = (name: string, value: boolean) => {
    console.log(name, value);
    setOptions({
      ...opts,
      [name]: value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<IPaidSubscriberChilds>();

  const onSubmit = async (data: IPaidSubscriberChilds) => {
    const body = {
      setting_code: 'sys_settings',
      free: {
        maxLocations: data.freeMaxLocations,
        maxServices: data.freeMaxServices,
        hasWebsite: opts.freeHasWebsite,
        hasPhoneNumber: opts.freeHasPhoneNumber,
        isVerified: opts.freeIsVerified,
      },
      paid: {
        maxLocations: data.paidMaxLocations,
        maxServices: data.paidMaxServices,
        hasWebsite: opts.paidHasWebsite,
        hasPhoneNumber: opts.paidHasPhoneNumber,
        isVerified: opts.paidIsVerified,
      },
    };

    try {
      const { data } = await axios.post<ISubSettings>(API.SETTINGS_CHANGE, body);
      dispatch({
        type: UserTypes.SET_SUBSCRIBER_SETTINGS,
        payload: { ...data },
      });
      setNotification({
        type: 'success',
        message: 'Successfully changed settings',
        autoClose: 3,
        position: 'top-right',
      });
    } catch (exp) {
      setNotification({
        type: 'error',
        message: 'Failed to change settings',
        autoClose: 3,
      });
      console.log(exp);
    }
  };

  return (
    <>
      <form className='profile-box-form' onSubmit={handleSubmit(onSubmit)}>
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
                        pattern: /^[0-9]$/,
                      })}
                      type='text'
                      name='paidMaxLocations'
                      id='paidMaxLocations'
                      maxLength={2}
                    />
                    {(errors.paidMaxLocations?.message ||
                      errors.paidMaxLocations?.type) && (
                      <p className='error-text'>
                        {' '}
                        {errors.paidMaxLocations?.message ||
                          'Invalid, max: 9, min: 1'}
                      </p>
                    )}
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
                        pattern: /^[0-9]$/,
                      })}
                      type='text'
                      name='paidMaxServices'
                      id='paidMaxServices'
                      maxLength={2}
                    />
                    {(errors.paidMaxServices?.message ||
                      errors.paidMaxServices?.type) && (
                      <p className='error-text'>
                        {' '}
                        {errors.paidMaxServices?.message ||
                          'Invalid, max: 9, min: 1'}
                      </p>
                    )}
                  </p>
                </div>
                <div></div>
              </div>
              <div className='double-blocks-3'>
                <p className='form-profile-label'>
                  <label className='form-profile-label'> Website Address</label>
                  <Switch
                    key={'paidHasWebsite'}
                    isOn={opts.paidHasWebsite}
                    id={'paidHasWebsite'}
                    handleToggle={() =>
                      onChangeValues('paidHasWebsite', !opts.paidHasWebsite)
                    }
                    onColor={activeColor}
                  />
                </p>

                <p className='form-profile-label'>
                  <label className='form-profile-label'>Phone Number</label>
                  <Switch
                    key={'paidHasPhoneNumber'}
                    isOn={opts.paidHasPhoneNumber}
                    id={'paidHasPhoneNumber'}
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
                    key={'paidIsVerified'}
                    isOn={opts.paidIsVerified}
                    id={'paidIsVerified'}
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
                        pattern: /^[0-9]$/,
                      })}
                      type='text'
                      name='freeMaxLocations'
                      id='freeMaxLocations'
                      maxLength={2}
                    />
                    {(errors.freeMaxLocations?.message ||
                      errors.freeMaxLocations?.type) && (
                      <p className='error-text'>
                        {errors.freeMaxLocations?.message ||
                          'Invalid, max: 9, min: 1'}
                      </p>
                    )}
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
                        pattern: /^[0-9]$/,
                      })}
                      type='text'
                      name='freeMaxServices'
                      id='freeMaxServices'
                      maxLength={2}
                    />
                    {(errors.freeMaxServices?.message ||
                      errors.freeMaxServices?.type) && (
                      <p className='error-text'>
                        {errors.freeMaxServices?.message ||
                          'Invalid, max: 9, min: 1'}
                      </p>
                    )}
                  </p>
                </div>
                <div></div>
              </div>
              <div className='double-blocks-3'>
                <p className='form-profile-label'>
                  <label className='form-profile-label'> Website Address</label>
                  <Switch
                    key={'freeHasWebsite'}
                    isOn={opts.freeHasWebsite}
                    id={'freeHasWebsite'}
                    handleToggle={() =>
                      onChangeValues('freeHasWebsite', !opts.freeHasWebsite)
                    }
                    onColor={activeColor}
                  />
                </p>

                <p className='form-profile-label'>
                  <label className='form-profile-label'>Phone Number</label>
                  <Switch
                    key={'freeHasPhoneNumber'}
                    isOn={opts.freeHasPhoneNumber}
                    id={'freeHasPhoneNumber'}
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
                    key={'freeIsVerified'}
                    id={'freeIsVerified'}
                    isOn={opts.freeIsVerified}
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
            <button className='button-green' type='submit'>
              Apply
            </button>
          </p>
        </div>
      </form>
    </>
  );
};
