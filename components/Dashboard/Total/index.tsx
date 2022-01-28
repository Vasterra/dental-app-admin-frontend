import { Chart } from './chart2';
import axios from 'axios';
import { API } from '../../../api/AWS-gateway';
import {useEffect, useState} from "react";

export const TotalSubs: React.FC<any> = () => {
  const [totalStats, setTotalStats] = useState({
    amountOfClosedAccounts: 0,
    amountOfClosedSubscriptions: 0,
    amountOfImages: 0,
    amountOfNewAccounts: 0,
    amountOfSubscriptions: 0
  });

  const getTotalStats = async () => {
  const body = {
    year: '2021'
  };
  try {
    const res = await axios.post(`${API.STAT_CUR_MONTHS}`, body);
    setTotalStats(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    getTotalStats();
  }, []);

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
                    value={totalStats.amountOfSubscriptions}
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
                    value={totalStats.amountOfNewAccounts}
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
                    value={totalStats.amountOfClosedSubscriptions}
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
                    value={totalStats.amountOfClosedAccounts}
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
                    value={totalStats.amountOfImages}
                    onChange={() => {}}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className='profile-block-box' style={{ padding: '60px' }}>
            <Chart />
          </div>
        </>
      </div>
    </>
  );
};
