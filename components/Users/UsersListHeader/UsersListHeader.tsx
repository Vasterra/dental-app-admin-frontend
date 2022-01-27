import React from 'react';
import Select from 'react-select';
import cn from 'classnames';
import styles from './UsersListHeader.module.css';
import { optionsPeriod, optionsStatus, selectStyles } from '../../../utils/selectInputsData';

type UsersListHeaderProps = {
    onPeriodChange: ({ period: string }) => void;
    onStatusChange: ({ status: string }) => void;
}

export const UsersListHeader: React.FC<UsersListHeaderProps> = (props: UsersListHeaderProps) => {

    const handlePeriodChange = (selectedOption) => {
        props.onPeriodChange({
            period: selectedOption.value,
        });
    };

    const handleStatusChange = (selectedOption) => {
        props.onStatusChange({
            status: selectedOption.value,
        });
    };

    return (
        <ul className={styles.userListHeader}>
            <li className={styles.userListHeader_item}>Dentist</li>
            <li className={cn(styles.userListHeader_item, styles.select)}>
                <Select
                    options={ optionsPeriod }
                    onChange={ handlePeriodChange }
                    placeholder={ 'Account Opened' }
                    styles={ selectStyles }
                />
            </li>
            <li className={cn(styles.userListHeader_item, styles.select)}>
                <Select
                    options={ optionsStatus }
                    onChange={ handleStatusChange }
                    placeholder={ 'Status' }
                    styles={ selectStyles }
                />
            </li>
            <li className={cn(styles.userListHeader_item)}> </li>
            <li className={styles.userListHeader_item}>
                <img src='../images/arrow-bottom.svg' alt='download' />
            </li>
        </ul>
    );
};
