import React, { FC, useState } from 'react';
import { getUsersFromServer } from './api/usersFromServer';
import { UserList } from './components/UserList/UserList';
import './App.css';

const App: FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loadingCondition, setLoadingConditon] = useState(false);
  const loadUsers = () => {
    setLoadingConditon(true);
    getUsersFromServer().then(user => {
      setLoadingConditon(false);
      setUserList(user);
    });
  };

  return (
    <>
      {
        userList.length === 0
          ? (<button type="button" onClick={loadUsers}>Load</button>)
          : <UserList userList={userList} />
      }
      {
        loadingCondition
          ? (
            <p>Loading ...</p>
          )
          : null
      }
    </>
  );
};

export default App;
