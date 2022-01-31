import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SearchForm from './SearchForm/SearchForm';
import { TableOfUsers } from './TableOfUsers/TableOfUsers';
import { API } from '../../api/AWS-gateway';
import { IUser } from '../../reducers/interfaces';
import { getPeriod } from '../../utils/getDate';
import FilterUsersForm from './FilterUsersForm/FilterUsersForm';
import ConfirmPopup from "./ConfirmPopup/ConfirmPopup";

export const Users: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [filteredByPeriod, setFilteredByPeriod] = useState([]);
    const [filteredByStatus, setFilteredByStatus] = useState([]);
    const [usersToRender, setUsersToRender] = useState([]);
    const [alreadyFiltered, setAlreadyFiltered] = useState({
      byStatus: false,
      byPeriod: false,
      byName: false
    });
    const filtered = alreadyFiltered.byStatus || alreadyFiltered.byPeriod || alreadyFiltered.byName;
    const [confirmPopupOpened, setConfirmPopupOpened] = useState(false);
    const [userEmail, setUserEmail] = useState('');

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

    const openConfirmPopup = ({ email }) => {
      setConfirmPopupOpened(true);
      setUserEmail(email);
    };

    const closeConfirmPopup = () => {
      setConfirmPopupOpened(false);
      setUserEmail('');
    };

    const handleDeleteUserClick = async({confirm}):Promise<void> => {
      if (confirm === 'delete') {
        try {
          await axios.delete(`${API.DELETE_USER}?email=${userEmail}`);
          const usersUpdated = users.filter((user: IUser) => user.email !== userEmail);
          setUsersToRender(usersUpdated);
          setUserEmail('');
        } catch (e) {
          console.log(e)
        }
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
      if (period) {
        const usersToFilter = alreadyFiltered.byStatus
          ? filteredByStatus
          : users;
        const startPoint = getPeriod(period);
        const filUsers = usersToFilter.filter(
          (user: IUser) => {
            const creationPoint = new Date(user.created_at)
            return creationPoint > startPoint
          },
        );
        setUsersToRender(filUsers);
        setFilteredByPeriod(filUsers);
        setAlreadyFiltered({...alreadyFiltered, byPeriod: true});
      }
    };

    const handleStatusChange = ({ status }) => {
      if (status) {
        const usersToFilter = alreadyFiltered.byPeriod
          ? filteredByPeriod
          : users;
        const formattedStatus = status === "Paid" ? "premium" : "free"
        const filUsers = usersToFilter.filter(
          (user: IUser) => user.accountType === formattedStatus,
        );
        setUsersToRender(filUsers);
        setFilteredByStatus(filUsers);
        setAlreadyFiltered({...alreadyFiltered, byStatus: true});
      }
    };

  const handleResetFiltersClick = () => {
    setUsersToRender(users);
    setAlreadyFiltered({
      byName: false,
      byStatus: false,
      byPeriod: false
    });
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
                <FilterUsersForm
                    onPeriodChange={handlePeriodChange}
                    onStatusChange={handleStatusChange}
                    onResetFiltersClick={handleResetFiltersClick}
                    alreadyFiltered={filtered}
                />
                <TableOfUsers
                    users={usersToRender}
                    onSuspendUserClick={handleSuspendUserClick}
                    onDeleteUserClick={openConfirmPopup}
                />
                <ConfirmPopup
                  onSubmit={handleDeleteUserClick}
                  opened={confirmPopupOpened}
                  userEmail={userEmail}
                  onBtnCloseClick={closeConfirmPopup}
                />
            </div>
        </div>
    )
};
