import { Chart } from './chart2';

export const TotalSubs: React.FC<any> = () => {
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
                    value=''
                    placeholder='134'
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
                    value=''
                    placeholder='24'
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
                    value=''
                    placeholder='12'
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
                    value=''
                    placeholder='23'
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
                    value=''
                    placeholder='1309'
                  />
                </p>
              </div>
            </div>
          </div>
          <div className='profile-block-box' style={{ padding: '60px' }}>
            {/* <div className='stripes'>
              <div className='total'>
                <p>900</p>
                <p>800</p>
                <p>700</p>
                <p>600</p>
                <p>500</p>
                <p>400</p>
                <p>300</p>
                <p>200</p>
                <p>100</p>
                <p>0</p>
              </div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='vertical-stripe'></div>
              <div className='years-block'>
                <>
                  <p className='year'>2021</p>
                  <p className='year-arrows'>
                    <img src='../images/arrow_left_big.svg' alt='arrow left' />
                    <img src='../images/arrow_right_big.svg' alt='arrow left' />
                  </p>
                  <p className='circle-gray'></p>
                  <p className='year-text'>Free Accounts</p>
                  <p className='circle-gray'></p>
                  <p className='year-text'>Subscriptions</p>
                </>
              </div>
            </div>
            <div className='hor-stripe'>
              <p>January</p>
              <p>February</p>
              <p>March</p>
              <p>April</p>
              <p>May</p>
              <p>June</p>
              <p>July</p>
              <p>August</p>
              <p>September</p>
              <p>October</p>
              <p>November</p>
              <p>December</p>
            </div> */}
            <Chart />
          </div>
        </>
      </div>
    </>
  );
};
