import axios from 'axios';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { API } from '../../../api/AWS-gateway';
import { AppContext } from '../../../context/app.context';
import { UserTypes } from '../../../reducers';
import { IService } from '../../../reducers/interfaces';
import { ISetNotofication } from '../../Toast';
import notify from '../../Toast';

interface ServicesProvidedProps {}

export const ServicesProvided: React.FC<ServicesProvidedProps> = () => {
  const { dispatch, state } = useContext(AppContext);
  const defaultServices = state.userState.services;
  const [serviceEditing, setServiceEditing] = useState<any>();
  const [serviceOnPress, setServiceOnPress] = useState<any>();
  const [serviceEditingVAlue, setServiceEditingValue] = useState<any>();
  const [services, setLocalServices] = useState<IService[]>([]);
  const [newService, setNewService] = useState('');

  const setNotification = useCallback<ISetNotofication>(
    ({ ...notifyProps }) => {
      notify({ ...notifyProps });
    },
    []
  );

  useEffect(() => {
    if (defaultServices?.length) {
      setLocalServices(defaultServices);
      defaultServices.map((item) => {
        setServiceEditing({
          ...serviceEditing,
          [item.service_id]: false,
        });
        setServiceOnPress({
          ...serviceEditing,
          [item.service_id]: false,
        });
        setServiceEditingValue({
          ...serviceEditing,
          [item.service_id]: '',
        });
      });
    }
  }, [defaultServices]);

  const onHandleAddService = async () => {
    const { data } = await axios.post<IService>(API.CHANGE_SERVICES, {
      service_name: newService,
    });
    dispatch({
      type: UserTypes.GET_SERVICES,
      payload: [...services, { ...data }],
    });
    setNotification({
      type: 'success',
      message: 'Successfully added new service',
      position: 'top-right',
      autoClose: 3,
    });
    setNewService('');
    try {
    } catch (exp) {
      setNotification({
        type: 'error',
        message: 'Failed to add new service',
        autoClose: 3,
      });
      console.log(exp);
    }
  };

  const onHandleDeleteService = async (id: string) => {
    try {
      axios.delete(`${API.CHANGE_SERVICES}?service_id=${id}`);
      dispatch({
        type: UserTypes.DELETE_SERVICE,
        payload: { id },
      });
      setNotification({
        type: 'success',
        message: 'Successfully deleted service',
        position: 'top-right',
        autoClose: 3,
      });
    } catch (exp) {
      setNotification({
        type: 'error',
        message: 'Failed to delete service',
        autoClose: 3,
      });
    }
  };

  const onHandleEdit = async (id: string) => {
    if (!serviceOnPress[id]) {
      return;
    }
    const target = services.find((el) => el.service_id === id);
    const body = {
      service_id: target?.service_id,
      service_name: target?.service_name,
    };

    try {
      const res = await axios.put(API.CHANGE_SERVICES, body);
      console.log(res);
      dispatch({
        type: UserTypes.GET_SERVICES,
        payload: services,
      });
      setNotification({
        type: 'success',
        message: 'Successfully edited service',
        position: 'top-right',
        autoClose: 3,
      });
    } catch (exp) {
      setNotification({
        type: 'error',
        message: 'Failed to edit service',
        autoClose: 3,
      });
    }
  };

  const onChangeService = (id: string, name: string) => {
    setServiceOnPress({
      ...serviceOnPress,
      [id]: true,
    });
    const WithEditedService = services.map((item) => {
      if (item.service_id === id) {
        item.service_name = name;
      }
      return item;
    });

    setLocalServices(WithEditedService);
  };

  return (
    <>
      <div className='profile-box-form'>
        <div className='form-info-block'>
          <div>
            <p className='form-login-title green px20'>Services Provided</p>
            <p className='form-login-subtitle gray px12 '>
              Available IService Categories
            </p>
          </div>
        </div>
        <div className='box-2-box'>
          <div className='profile-block-box'>
            <div>
              <p className='form-profile-label'>
                <label className='form-profile-label'>Add IService</label>
              </p>
              <p>
                <input
                  className='form-profile-input'
                  type='text'
                  name='add_service'
                  id='add_service'
                  value={newService}
                  placeholder='IService Name Here'
                  onChange={(e) => {
                    setNewService(e.target.value);
                  }}
                />
              </p>
            </div>
            <p className='row-content'>
              <button
                className='button-green'
                onClick={onHandleAddService}
                disabled={!newService.length}
              >
                Add service
              </button>
            </p>
          </div>
          <div className='profile-block-box'>
            <div>
              {serviceEditing &&
                serviceEditingVAlue &&
                services.map((item, idx) => (
                  <p className='form-login-input'>
                    <input
                      type='text'
                      name={item.service_name}
                      value={item.service_name}
                      onChange={(e) => {
                        onChangeService(item.service_id, e.target.value);
                      }}
                      id={item.service_id}
                      key={idx}
                      disabled={!serviceEditing[item.service_id]}
                    />
                    {!serviceEditing[item.service_id] && (
                      <>
                        <img
                          className='form-login-input-edit'
                          style={{ right: '52px' }}
                          src='../images/edit.svg'
                          onClick={() => {
                            setServiceEditing({
                              ...serviceEditing,
                              [item.service_id]: true,
                            });
                          }}
                        />
                        <img
                          className='form-login-input-close'
                          style={{ right: '52px' }}
                          src='../images/close.svg'
                          onClick={() => {
                            onHandleDeleteService(item.service_id);
                          }}
                        />
                      </>
                    )}
                    {serviceEditing[item.service_id] && (
                      <>
                        <button
                          className='saveEditedServiceButton'
                          onClick={() => {
                            setServiceEditing({
                              ...serviceEditing,
                              [item.service_id]: false,
                            });
                            onHandleEdit(item.service_id);
                          }}
                        >
                          Ok
                        </button>
                      </>
                    )}
                  </p>
                ))}
              {/* <p className='row-content'>
                <button
                  className='button-green'
                  onClick={() => {
                    console.log(serviceEditing);
                    console.log('serviceEditing');
                  }}
                >
                  Save
                </button>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
