import React from 'react';
import styles from './TableOfUsers.module.css';
import { User } from '../User/User';
import { IUser } from '../../../reducers/interfaces';

interface TableOfUsersProps {
    users: IUser[],
    onSuspendUserClick: ({ email: string }) => void;
    onDeleteUserClick: ({ email: string }) => void;
    alreadyFiltered: boolean
}

export const TableOfUsers: React.FC<TableOfUsersProps> = (props: TableOfUsersProps) => {
  if (props.users.length === 0 && props.alreadyFiltered) {
    return (
      <div className={styles.noResults}>
        <img src='../images/search.svg' alt='search'/>
        <span className={styles.text}>No results. Please, try again</span>
      </div>
    )
  }

  return (
    <>
      <ul className={styles.usersList}>{props.users.map((user: IUser, index) => <User
        key={index}
        username={user.username ? user.username : user.email}
        created_at={user.created_at}
        exp={user.exp}
        accountType={user.accountType}
        email={user.email}
        gdc_number={user.gdc_number}
        auth_time={user.auth_time}
        subscription_id={user.subscription_id}
        onSuspendUserClick={props.onSuspendUserClick}
        onDeleteUserClick={props.onDeleteUserClick}
        />
        )}
      </ul>
    </>
  )
};
