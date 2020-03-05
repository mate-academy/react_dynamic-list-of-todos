import React, { FC, useState } from 'react';
import { getUsers, getTodos } from './api/DataFromServer';
import { UserList } from './components/UserList/UserList';
import './App.css';

const App: FC = () => {
  const [prepearedTodoList, setPrepearedTodoList] = useState<TodoWithUser[]>([]);
  const [loadingCondition, setLoadingConditon] = useState(false);

  const loadUsers = () => {
    setLoadingConditon(true);

    Promise.all([getUsers(), getTodos()])
      .then(([user, todo]) => {
        const todoWithUser = todo.map(todoItem => (
          {
            ...todoItem,
            user: user.find(userItem => userItem.id === todoItem.userId) as User,
          }
        ));

        setLoadingConditon(false);
        setPrepearedTodoList(todoWithUser);
      });
  };

  return (
    <>
      {
        prepearedTodoList.length === 0
          ? (
            <button
              type="button"
              onClick={loadUsers}
              disabled={loadingCondition}
              className="load-btn"
            >
              Load
            </button>
          )
          : <UserList prepearedTodoList={prepearedTodoList} />
      }
      {loadingCondition && (
        <p className="loading-text">Loading ...</p>
      )}
    </>
  );
};

export default App;
