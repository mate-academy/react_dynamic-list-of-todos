import React, { FC, useState } from 'react';
import './App.css';

import { loadTodos, loadUsers, TodoWithName } from './utils';
import { TodoList } from './components/TodoList';


const App: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');
  const [todos, setTodos] = useState<TodoWithName[]>([]);
  const clickHandler = () => {
    setIsLoading(true);
    Promise.all([
      loadTodos(),
      loadUsers(),
    ])
      .then(responses => {
        const preparedTodos = responses[0].map(todo => {
          const user = responses[1].find(person => todo.userId === person.id);

          return { ...todo, user };
        });

        setTodos(preparedTodos);
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

    setTodos(newTodos.sort((item1, item2) => {
      const value1 = item1.completed ? 1 : 0;
      const value2 = item2.completed ? 1 : 0;

      return value1 - value2;
    }));
  };

  const handlerSortByTitle = () => {
    const newTodos = [...todos];

    setTodos(newTodos.sort((item1, item2) => item1.title.localeCompare(item2.title)));
  };

  const handlerSortByName = () => {
    const newTodos = [...todos];

    setTodos(newTodos.sort((item1, item2) => {
      const nameItem1 = item1.user ? item1.user.name : '';
      const nameItem2 = item2.user ? item2.user.name : '';

      return nameItem1.localeCompare(nameItem2);
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
