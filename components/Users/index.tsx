import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SearchForm from './SearchForm/SearchForm';
import { UsersListHeader } from './UsersListHeader/UsersListHeader';
import { TableOfUsers } from './TableOfUsers/TableOfUsers';
import { API } from '../../api/AWS-gateway';
import { IUser } from '../../interfaces/IUser';
import { getPeriod } from '../../utils/getDate';
import { ButtonBack } from './ButtonBack/ButtonBack';

export const Users: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [usersToRender, setUsersToRender] = useState([]);
    const [alreadyFiltered, setAlreadyFiltered] = useState({
      byStatus: false,
      byPeriod: false,
      byName: false
    });
    const filtered = alreadyFiltered.byStatus || alreadyFiltered.byPeriod || alreadyFiltered.byName;

    const getUsers = async():Promise<void> => {
        try {
            const res = await axios.get(API.GET_USERS);
            const allUsers = res.data;
            allUsers.map((user) => {
                if (!user.username) {
                    user.username = user.email;
                }
            })
            setUsers(allUsers);
            setUsersToRender(allUsers);
            console.log(allUsers);

        } catch (e) {
            console.log(e)
        }
    };

    const handleSuspendUserClick = async({email}):Promise<void> => {
        try {
            await axios.put(`${API.SUSPEND_USER}?email=${email}`);
        } catch (e) {
            console.log(e)
        }
    };

    const handleDeleteUserClick = async({email}):Promise<void> => {
        try {
            await axios.delete(`${API.DELETE_USER}?email=${email}`);
            const usersUpdated = users.filter((user: IUser) => user.email !== email);
            setUsersToRender(usersUpdated);
        } catch (e) {
            console.log(e)
        }
    };

    const handleSearchFormSubmit = ({ keyword }) => {
        const usersToFilter = alreadyFiltered.byStatus || alreadyFiltered.byPeriod
            ? usersToRender
            : users;
        const filUsers = usersToFilter.filter(
            (user: IUser) => user.username.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
        );
        setUsersToRender(filUsers);
      setAlreadyFiltered({...alreadyFiltered, byName: true});
    };

    const handlePeriodChange = ({ period }) => {
        const usersToFilter = alreadyFiltered.byPeriod
            ? users
            : usersToRender;
        const startPoint = getPeriod(period);
        const filUsers = usersToFilter.filter(
            (user: IUser) => {
                const creationPoint = new Date(user.created_at)
                return creationPoint > startPoint
            },
        );
        setUsersToRender(filUsers);
        setAlreadyFiltered({...alreadyFiltered, byPeriod: true});
    };

    const handleStatusChange = ({ status }) => {
        const usersToFilter = alreadyFiltered.byStatus
            ? users
            : usersToRender;
        const filUsers = usersToFilter.filter(
            (user: IUser) => user.accountType === status,
        );
        setUsersToRender(filUsers);
      setAlreadyFiltered({...alreadyFiltered, byStatus: true});
    };

  const handleButtonBackClick = () => {
    setUsersToRender(users);
  };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="main-profile bg-white ">
            <div className="profile-box-form">
                <h2 className="form-login-title green px20">Users Catalogue</h2>
                <span className="form-login-subtitle gray px12 mb-6px">Search Users</span>
                <SearchForm
                    onSubmit={handleSearchFormSubmit}
                />
                <ButtonBack
                  alreadyFiltered={filtered}
                  onButtonBackClick={handleButtonBackClick}
                />
                <UsersListHeader
                    onPeriodChange={handlePeriodChange}
                    onStatusChange={handleStatusChange}
                />
                <TableOfUsers
                    users={usersToRender}
                    onSuspendUserClick={handleSuspendUserClick}
                    onDeleteUserClick={handleDeleteUserClick}
                />
            </div>
        </div>
    )
};
