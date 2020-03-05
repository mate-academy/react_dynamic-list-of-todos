import React, { FC, useState } from 'react';
import './App.css';

import { loadTodos, loadUsers } from './utils/utils';
import { TodoWithUser } from './utils/types'
import { TodoList } from './components/TodoList';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [todos, setTodos] = useState<TodoWithUser[]>([]);

  const clickHandler = () => {
    setIsLoading(true);
    Promise.all([
      loadTodos(),
      loadUsers(),
    ])
      .then(([todosFromApi, usersFromApi]) => {
        const preparedTodos = todosFromApi.map(todo => {
          const user = usersFromApi.find(person => todo.userId === person.id);

          return { ...todo, user };
        });

        setTodos(preparedTodos);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError('Download error, try again.');
        setIsLoading(false);
      });
  };

  const handlerSortByID = () => {
    const newTodos = [...todos];

    setTodos(newTodos.sort((item1, item2) => item1.id - item2.id));
  };

  const handlerSortByComleted = () => {
    const newTodos = [...todos];

    setTodos(newTodos.sort((item1, item2) => Number(item1.completed) - Number(item2.completed)));
  };

  const handlerSortByTitle = () => {
    const newTodos = [...todos];

    setTodos(newTodos.sort((item1, item2) => item1.title.localeCompare(item2.title)));
  };

  const handlerSortByName = () => {
    const newTodos = [...todos];

    setTodos(newTodos.sort((item1, item2) => {
      const a = item1.user ? item1.user.name : '';
      const b = item2.user ? item2.user.name : '';

      return a.localeCompare(b);
    }));
  };

  if (!todos.length) {
    return (
      <>
        <h1>Dynamic list of TODOs</h1>
        <button
          type="button"
          onClick={clickHandler}
          disabled={isLoading}
        >
          load data
        </button>
        <p>{isLoading ? 'Loading...' : ''}</p>
        <p>{isError || ''}</p>
      </>
    );
  }

  return (
    <TodoList
      todos={todos}
      onNameButton={handlerSortByName}
      onTitleButton={handlerSortByTitle}
      onConditionButton={handlerSortByComleted}
      onTaskButton={handlerSortByID}
    />
  );
};

export default App;
