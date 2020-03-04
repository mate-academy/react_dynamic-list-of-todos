import React, { FC, useState } from 'react';
import { getUsers } from './api/usersFromServer';
import { getTodos } from './api/todosFromServer';
import { UserList } from './components/UserList/UserList';
import './App.css';

const App: FC = () => {
  const [userList, setUserList] = useState<TodoWithUser[]>([]);
  const [loadingCondition, setLoadingConditon] = useState(false);
  const loadUsers = () => {
    setLoadingConditon(true);
    const users = getUsers();
    const todos = getTodos();

    users.then(user => {
      setLoadingConditon(false);

      return user;
    }).then(user => {
      todos.then(todo => {
        const todoWithUser = todo.map(todoItem => (
          {
            ...todoItem,
            user: user.find(userItem => userItem.id === todoItem.userId) as User,
          }
        ));

        setUserList(todoWithUser);
      });
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
