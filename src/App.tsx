import React, { FC, useState } from 'react';
import { getUsers, getTodos } from './api/DataFromServer';
import { UserList } from './components/UserList/UserList';
import './App.css';

const App: FC = () => {
  const [userList, setUserList] = useState<TodoWithUser[]>([]);
  const [loadingCondition, setLoadingConditon] = useState(false);
  const loadUsers = () => {
    setLoadingConditon(true);

    Promise.all([getUsers(), getTodos()])
      .then(response => {
        const todoWithUser = response[1].map(todoItem => (
          {
            ...todoItem,
            user: response[0].find(userItem => userItem.id === todoItem.userId) as User,
          }
        ));

        setLoadingConditon(false);
        setUserList(todoWithUser);
      });
  };

  return (
    <>
      {
        userList.length === 0
          ? (<button type="button" onClick={loadUsers} disabled={loadingCondition}>Load</button>)
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
