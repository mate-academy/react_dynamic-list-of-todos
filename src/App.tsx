import React, { FC, useState } from 'react';
import { getUsersFromServer } from './api/usersFromServer';
import { UserList } from './components/UserList/UserList';
import { getTodosFromServer } from './api/todosFromServer';
import './App.css';

const App: FC = () => {
  const [userList, setUserList] = useState<any>([]);
  const [loadingCondition, setLoadingConditon] = useState(false);
  const loadUsers = () => {
    setLoadingConditon(true);
    const getUserList = getUsersFromServer();
    const getTodosList = getTodosFromServer();

    getUserList.then(user => {
      setLoadingConditon(false);

      return user;
    }).then(user => {
      getTodosList.then(todo => {
        const todoWithUser = todo.map(todoItem => (
          {
            ...todoItem,
            user: user.find(userItem => userItem.id === todoItem.userId),
          }
        ));

        console.log(todoWithUser);

        setUserList(todoWithUser);
      });
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
