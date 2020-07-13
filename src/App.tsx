import React, { useState, useMemo } from 'react';
import './App.css';

import { getTodos, getUsers, Todos } from './api/api';

import TodoList from './components/TodoList';


const getVisibleTodos = (todos: Todos[], sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'userName':
      return [...todos].sort((a, b) => {
        return a.user && b.user
          ? a.user.name.localeCompare(b.user.name)
          : 0;
      });

    case 'id':
      return [...todos].sort((a, b) => a.id - b.id);

    default:
      return todos;
  }
}

const App = () => {
  const [sortType, setSortType] = useState('');
  const [todos, setTodos] = useState<Todos[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadClick = async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();
      const usersFromServer = await getUsers();

      const todosWithUsers = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
    } catch (e) {
      setIsLoading(false);
    }
  }

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, sortType),
    [sortType, todos]
  )

  if (todos.length === 0) {
    return (
      <>
        <h1>Dynamic list of todos</h1>
        <button
          onClick={handleLoadClick}
          type="button"
          className="buttonload"
        >
          <i className={isLoading ? "fa fa-spinner fa-spin" : ""}>
          </i>
          {isLoading ? 'Loading' : 'Load'}
        </button>
      </>
    )
  }

  return (
    <>
      <h1>Dynamic list of todos</h1>
      <button
        type="button"
        onClick={() => setSortType('title')}
        className="sort-button left"
      >
        Sort by title
      </button>

      <button
        type="button"
        onClick={() => setSortType('id')}
        className="sort-button"
      >
        Sort by id
      </button>

      <button
        type="button"
        onClick={() => setSortType('userName')}
        className="sort-button"
      >
        Sort by user
      </button>

      <TodoList todoList={visibleTodos} />
    </>

  );
}

export default App;

