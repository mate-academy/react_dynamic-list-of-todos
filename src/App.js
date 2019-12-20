import React, { useState } from 'react';
import './App.css';
import { todosPromise } from './api/todos';
import { usersPromise } from './api/users';
import TodoList from './TodoList';

const App = () => {
  const [todosWithUsers, setTodosWithUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, sethasError] = useState(false);
  const [sortType, setSort] = useState('');

  const loadAllData = async() => {
    try {
      setIsLoading(true);

      const [allDataTodos, allUsersData] = (
        await Promise.all([todosPromise(), usersPromise()])
      );

      setTodosWithUsers(
        allDataTodos.map(todo => ({
          ...todo,
          user: allUsersData.find(user => user.id === todo.userId),
        }))
      );
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      sethasError(true);
    }
  };

  const sortTodos = (type) => {
    if (sortType === type) {
      setTodosWithUsers([...todosWithUsers].reverse());
    } else {
      switch (type) {
        case 'id':
          setTodosWithUsers([...todosWithUsers].reverse());
          break;
        case 'title':
          setTodosWithUsers([...todosWithUsers]
            .sort((a, b) => a[type].localeCompare(b[type])));
          break;
        case 'user':
          setTodosWithUsers([...todosWithUsers]
            .sort((a, b) => a[type].name.localeCompare(b[type].name)));
          break;
        case 'completed':
          setTodosWithUsers([...todosWithUsers]
            .sort((a, b) => a[type] - b[type]));
          break;
        default:
      }
      setSort(type);
    }
  };

  if (hasError) {
    return (
      <p>
          you have some problems with your network,
        <br />
          please refresh the page
      </p>
    );
  }

  if (todosWithUsers.length === 0) {
    return (
      <button
        type="button"
        onClick={loadAllData}
      >
        {isLoading ? 'Loading...' : 'Load'}
      </button>
    );
  }

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <TodoList
        todos={todosWithUsers}
        sortTodos={sortTodos}
      />
    </div>
  );
};

export default App;
