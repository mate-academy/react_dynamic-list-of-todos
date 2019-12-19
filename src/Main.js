import React, { useState } from 'react';
import TodoList from './TodoList';
import todos from './api/todos';
import users from './api/users';
import GetTodosWithUsers from './GetTodosWithUsers';

function Main() {
  const [todoList, setTodoList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sorByName, setSortByName] = useState(false);
  const [sorByTitle, setSortByTitle] = useState(false);
  const [sorByStatus, setSortByStatus] = useState(false);

  const preparedTodos = GetTodosWithUsers(todoList, usersList);

  const LoadTodosAndUsers = async() => {
    setIsLoading(true);

    const usersObject = await users();

    setUsersList(usersObject);

    const todosObject = await todos();

    setTodoList(todosObject);
    setIsLoading(false);
    setLoaded(true);
  };

  const sortByUsersName = () => {
    setSortByName(true);
    setSortByStatus(false);
    setSortByTitle(false);
  };

  const sortByTitle = () => {
    setSortByName(false);
    setSortByStatus(false);
    setSortByTitle(true);
  };

  const sortByStatus = () => {
    setSortByName(false);
    setSortByStatus(true);
    setSortByTitle(false);
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

  if (sorByName) {
    preparedTodos.sort((itemA, itemB) => (
      itemA.user.name.localeCompare(itemB.user.name)
    ));
  }

  if (sorByTitle) {
    preparedTodos.sort((itemA, itemB) => (
      itemA.title.localeCompare(itemB.title)
    ));
  }

  if (sorByStatus) {
    preparedTodos.sort((itemA, itemB) => {
      if (itemA.completed < itemB.completed) {
        return -1;
      }

      if (itemA.completed > itemB.completed) {
        return 1;
      }

      return 0;
    });
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
