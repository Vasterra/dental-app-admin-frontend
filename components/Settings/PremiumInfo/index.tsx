import React, {useCallback, useContext, useState} from 'react';
import { AppContext } from '../../../context/app.context';
import { ISetNotification } from '../../Toast';
import notify from '../../Toast';
import { API } from '../../../api/AWS-gateway';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import styles from '../../Users/SearchForm/SearchForm.module.css';
import * as Yup from 'yup';
import { UserTypes } from '../../../reducers';
import { IPremiumSettings } from '../../../reducers/interfaces';

interface PremiumInfoProps {}

const getCurrency = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};

export const PremiumInfo: React.FC<PremiumInfoProps> = () => {
  const { dispatch, state } = useContext(AppContext);
  const { features, price, setting_code, terms } = state.userState.premiumInformation;
  const [allFeatures, setAllFeatures] = useState(features);

  const setNotification = useCallback<ISetNotification>(
    ({ ...notifyProps }) => {
      notify({ ...notifyProps });
    },
    []
  );

  const PremiumInfoSchema = Yup.object().shape({
    newFeature: Yup.string()
      .min(2, 'Min - 2 symbols')
      .max(40, 'Max - 100 symbols')
      .required('Enter a new premium feature'),
  });

  const handleAddFeature = ({ newFeature }) => {
    setAllFeatures([...allFeatures, newFeature]);
    setNotification({
      type: 'success',
      message: 'Successfully added new feature',
      position: 'top-right',
      autoClose: 3,
    });
  }

  const handlePremiumFeaturesChange = async () => {
    dispatch({
      type: UserTypes.SET_PREMIUM_INFO_SETTINGS,
      payload: {
        features: allFeatures,
        terms: terms,
        setting_code: setting_code,
        price: price
      },
    });
    try {
      await axios.post<IPremiumSettings>(API.SETTINGS_PREMIUM_INFO_CHANGE, {
        features: allFeatures,
        terms: terms,
        setting_code: setting_code
      });
      setNotification({
        type: 'success',
        message: 'Premium features successfully updated',
        position: 'top-right',
        autoClose: 3,
      });
    } catch (exp) {
      setNotification({
        type: 'error',
        message: 'Failed to update features',
        autoClose: 3,
      });
    }
  };

  return (
    <>
      <div className='profile-box-form'>
        <div className='form-info-block'>
          <div>
            <p className='form-login-title green px20'>
              Premium Information
            </p>
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
              <ul className='form-profile-list'>
                {allFeatures.map((item, index) => (
                  <li key={index}>
                    <input
                      className='form-profile-input'
                      type='text'
                      name='features'
                      value={item}
                      onChange={() => {}}
                    />
                  </li>
                ))}
              </ul>
              <Formik
                initialValues={{
                  newFeature: '',
                }}

                validationSchema={PremiumInfoSchema}

                onSubmit={ (values) => {
                  handleAddFeature({
                    newFeature: values.newFeature,
                  });
                  values.newFeature = '';
                }}
              >
                {({
                    errors,
                    touched,
                  }) => (
                  <Form className='add-plus'>
                    <Field
                      name='newFeature'
                      type='text'
                      className='form-profile-input form-profile-input_premium'
                      id='newFeature'
                      autoComplete='off'
                    />
                    <button type='submit' className='plus' id='plus'>
                      <img
                        className='plus-img'
                        src='../images/plus.svg'
                        alt='plus'
                      />
                    </button>
                    {errors.newFeature && touched.newFeature
                      ? (<span className={styles.inputError}>{errors.newFeature}</span>)
                      : <span className={styles.inputError}> </span>
                    }
                  </Form>
                )}
              </Formik>
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
                  value={price! / 100}
                  onChange={() => {}}
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
                  onChange={() => {}}
                />
              </p>
            </div>
            <p className='row-content'>
              <button
                className='button-green'
                onClick={handlePremiumFeaturesChange}
              >
                Save
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
