import { Chart } from './chart2';
import {useCallback, useContext, useEffect, useState} from 'react';
import { AppContext } from '../../../context/app.context';
import axios from "axios";
import { IYearStats } from "../../../reducers/interfaces";
import { API } from "../../../api/AWS-gateway";
import { UserTypes } from "../../../reducers";
import { ISetNotification } from '../../../components/Toast';
import notify from "../../Toast";
import styles from './Total.module.css';
import cn from 'classnames';

interface IMonth {
  period: number,
  count: number
}

export const TotalSubs: React.FC<any> = () => {
  const { state, dispatch } = useContext(AppContext);
  const [year, setYear] = useState(2022);

  const {
    amountOfClosedAccounts,
    amountOfClosedSubscriptions,
    amountOfImages,
    amountOfNewAccounts,
    amountOfSubscriptions,
    graphicOfFreeAccounts,
    graphicOfSubscriptions
  } = state.userState.yearStats;

  const setNotification = useCallback<ISetNotification>(
    ({ ...notifyProps }) => {
      notify({ ...notifyProps });
    }, []);

  const getYearlyStats = async () => {
    try {
      const { data } = await axios.post<IYearStats>(API.STAT_CUR_MONTHS, {year: year});
      dispatch({ type: UserTypes.GET_YEAR_STATS, payload: { ...data } });
    } catch (exp) {
      setNotification({
        type: 'error',
        message: 'Failed to load yearly stats!',
        autoClose: 2,
      });
    }
  };

  const getFullYearlyStats = (arr: IMonth[]) => {
    if (arr.length) {
      for (let i = 0; i < 12; i += 1) {
        const currentMonth = arr.find((item) => item.period === i + 1);
        if (!currentMonth) {
          arr.push({
            period: i + 1,
            count: 0
          })
        }
      }
      return arr.sort((a, b) => a.period - b.period);
    }
    return arr;
  };

  useEffect(() => {
    getYearlyStats()
  }, [year]);

  return (
    <>
      <div className='profile-box-form'>
        <>
          <p className='form-login-title green px20'>Total Subscriptions</p>
          <p className='form-login-subtitle gray px12 mb-6px'>Summary</p>
          <div className='profile-block-box'>
            <div className='double-blocks-5'>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Subscriptions</label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
                    value={amountOfSubscriptions}
                    onChange={() => {}}
                  />
                </p>
              </div>
              <div>
                <p className='form-profile-label'>
                  <label className='form-profile-label'>Free Accounts</label>
                </p>
                <p>
                  <input
                    className='form-profile-input'
                    type='text'
                    name=''
                    id=''
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
                    name=''
                    id=''
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
                    name=''
                    id=''
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
                    name=''
                    id=''
                    value={amountOfImages}
                    onChange={() => {}}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className={styles.chartBlock}>
            <div className={styles.yearCounter}>
              <span className={styles.year}>{year}</span>
              <div className={styles.buttons}>
                <button
                  type='button'
                  className={cn(styles.counterBtn, styles.counterBtnDec)}
                  onClick={() => setYear(year - 1)}
                > </button>
                <button
                  type='button'
                  className={cn(styles.counterBtn, styles.counterBtnInc)}
                  onClick={() => setYear(year + 1)}
                > </button>
              </div>
            </div>
            <div className={styles.chart}>
              <Chart
                graphicOfSubscriptions={getFullYearlyStats(graphicOfSubscriptions)}
                graphicOfFreeAccounts={getFullYearlyStats(graphicOfFreeAccounts)}
              />
            </div>
          </div>
        </>
      </div>
    </>
  );
};
