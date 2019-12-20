import React, { useState } from 'react';
import TodoList from './TodoList';
import getTodosWithUsers from './GetTodosWithUsers';
import getURL from './api/getUrl';

function Main() {
  const [todosAndUser, setTodosAndUsers] = useState([[], []]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sorts, setSorts] = useState([false, false, false]);

  const preparedTodos
  = getTodosWithUsers(todosAndUser[0], todosAndUser[1]);

  const LoadTodosAndUsers = async() => {
    setIsLoading(true);

    const [usersObject, todosObject]
    = await Promise.all([
      getURL('https://jsonplaceholder.typicode.com/users'),
      getURL('https://jsonplaceholder.typicode.com/todos'),
    ]);

    setTodosAndUsers([todosObject, usersObject]);
    setIsLoading(false);
    setLoaded(true);
  };

  const sortByUsersName = () => {
    setSorts([true, false, false]);
  };

  const sortByTitle = () => {
    setSorts([false, true, false]);
  };

  const sortByStatus = () => {
    setSorts([false, false, true]);
  };

  if (isLoading === true) {
    return (
      <div className="App">
        <p> ...LOADING </p>
      </div>
    );
  }

  if (loaded === false) {
    return (
      <div className="App">
        <button type="button" onClick={LoadTodosAndUsers}>
          Load
        </button>
      </div>
    );
  }

  if (sorts[0]) {
    preparedTodos.sort((itemA, itemB) => (
      itemA.user.name.localeCompare(itemB.user.name)
    ));
  }

  if (sorts[1]) {
    preparedTodos.sort((itemA, itemB) => (
      itemA.title.localeCompare(itemB.title)
    ));
  }

  if (sorts[2]) {
    preparedTodos.sort((itemA, itemB) => (
      itemA.completed - itemB.completed
    ));
  }

  return (
    <div className="App">
      <section className="sort-buttons">
        <button type="button" onClick={sortByUsersName}>
          sort by users name
        </button>
        <button type="button" onClick={sortByTitle}>
          sort by title
        </button>
        <button type="button" onClick={sortByStatus}>
          sort by status
        </button>
      </section>
      <TodoList todos={preparedTodos} />
    </div>
  );
}

export default Main;
