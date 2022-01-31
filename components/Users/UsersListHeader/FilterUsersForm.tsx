import React, {useState} from 'react';
import styles from './FilterUsersForm.module.css';
import cn from 'classnames';
import {
  Formik,
  Form,
  Field
} from 'formik';
import {
  optionsPeriod,
  optionsStatus,
  selectStyles
} from '../../../utils/selectInputsData';
import SelectField from '../SelectField/SelectField';

interface FilterUsersFormProps {
  onPeriodChange: ({ period: string }) => void
  onStatusChange: ({ status: string }) => void
  onResetFiltersClick: () => void
  alreadyFiltered: boolean
}

const FilterUsersForm:React.FC<FilterUsersFormProps> = (props: FilterUsersFormProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState({
    label: 'Account Opened',
    key: '001'
  });

  const [selectedStatus, setSelectedStatus] = useState({
    label: 'Status',
    key: '002'
  });

  const handlePeriodChange = ({ value }) => {
    if (value) {
      setSelectedPeriod({...selectedPeriod, label: value});
      props.onPeriodChange({
        period: value,
      });
    }
  };

  const handleStatusChange = ({ value }) => {
    if (value) {
      setSelectedStatus({...selectedStatus, label: value});
      props.onStatusChange({
        status: value,
      });
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          period: '',
          status: ''
        }}

        onSubmit={ (values) => {
          console.log(values)
        }}

      >
        {() => (
          <Form className={styles.form}>
            <span className={styles.item}>Dentist</span>
            <Field
              className={styles.item}
              component={ SelectField }
              name='period'
              id='period'
              options={ optionsPeriod }
              styles={ selectStyles }
              placeholder={null}
              onChange={ handlePeriodChange }
              value={selectedPeriod}
            />
            <Field
              className={styles.item}
              component={ SelectField }
              name='status'
              id='status'
              options={ optionsStatus }
              styles={ selectStyles }
              placeholder={null}
              onChange={ handleStatusChange }
              value={selectedStatus}
            />
            <div className={styles.item}> </div>
            <button className={cn(styles.item, styles.btn_download)}>
              <img src='../images/arrow-bottom.svg' alt='download' />
            </button>
            <button
              type='button'
              className={styles.btnReset}
              disabled={ !props.alreadyFiltered }
              onClick={() => {
                props.onResetFiltersClick();
                setSelectedPeriod({...selectedPeriod, label: 'Account Opened'});
                setSelectedStatus({...selectedStatus, label: 'Status'});
              }}
            >
              Remove all filters
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FilterUsersForm;
