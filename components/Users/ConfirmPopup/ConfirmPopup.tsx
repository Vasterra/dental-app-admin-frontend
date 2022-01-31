import React from 'react';
import styles from './ConfirmPopup.module.css';
import {
  Formik,
  Form,
  Field
} from 'formik';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

type ConfirmPopupProps = {
  onSubmit: ({ confirm: string }) => void
  onBtnCloseClick: () => void
  opened: boolean
  userEmail: string
}

const ConfirmPopup:React.FC<ConfirmPopupProps> = (props: ConfirmPopupProps) => {
  const opened = cx({
    opened: props.opened
  });

  return (
    <div className={cn(styles.overlay, opened)}>
      <div className={styles.content}>
        <h2 className={styles.title}>Warning!</h2>
        <p className={styles.warning}>
          You are going to delete user {props.userEmail}.
        </p>
        <p className={styles.warning}>
          This action is irreversible, you can't recover the account.
          Please, type "delete" to continue
        </p>
        <Formik
          initialValues={{
            confirm: '',
          }}

          onSubmit={ (values) => {
            props.onSubmit({
              confirm: values.confirm,
            });
          }}
        >
          {({values}) => (
            <Form className={styles.form}>
              <Field
                name='confirm'
                type='text'
                className={styles.input}
                id='confirm'
                placeholder='Type "delete"'
                autoComplete='off'
              />
              <button
                type='button'
                className={styles.btnSubmit}
                disabled={ values.confirm !== "delete"}
              >
                Delete user
              </button>
              <button
                type='button'
                className={styles.btnClose}
                onClick={props.onBtnCloseClick}
              >
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ConfirmPopup;
