import React from 'react';
import styles from './SearchForm.module.css';
import {
    Formik,
    Form,
    Field
} from 'formik';
import * as Yup from 'yup';

const SearchSchema = Yup.object().shape({
    keyword: Yup.string()
        .min(2, 'Min - 2 symbols')
        .max(40, 'Max - 40 symbols')
        .required('Enter username for search'),
});

type SearchFormProps = {
    onSubmit: ({ keyword: string }) => void
}

const SearchForm:React.FC<SearchFormProps> = (props: SearchFormProps) => {
    return (
        <div>
            <Formik
                initialValues={{
                    keyword: '',
                }}

                validationSchema={SearchSchema}

                onSubmit={ (values, { resetForm }) => {
                    props.onSubmit({
                        keyword: values.keyword,
                    });
                    resetForm();
                }}
            >
                {({
                      errors,
                      touched,
                    }) => (
                    <Form className={styles.form}>
                        <Field
                            name='keyword'
                            type='text'
                            className={styles.input}
                            id='keyword'
                            placeholder='Search users'
                            autoComplete='off'
                        />
                        <img src='../images/search.svg' alt='search' className={styles.searchIcon}/>
                        {errors.keyword && touched.keyword
                            ? (<span className={styles.inputError}>{errors.keyword}</span>)
                            : <span className={styles.inputError}> </span>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SearchForm;
