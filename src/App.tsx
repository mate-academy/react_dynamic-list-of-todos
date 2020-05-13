import React, { useState } from 'react';
import './App.css';
import { TodoList } from './component/TodoList/TodoList';
import { getTodos } from './component/Api';
import { TodoType, UserType } from './component/Types';
import { SortButtons } from './component/SortButtons/SortButtons';


const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [preparedTodos, setPreparedTodos] = useState<TodoType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoadClick = () => {
    setIsInitialized(true);
    let TempTodos: TodoType[] = [];

    getTodos().then((val: [TodoType[], UserType[]]) => {
      TempTodos = val[0].map((todo: TodoType) => {
        const current = { ...todo };

        current.user = val[1].find((user: UserType) => user.id === todo.userId);

        return current;
      });
    })
      .then(() => {
        setPreparedTodos(TempTodos);
        setIsLoaded(true);
      });
  };

  const onSort = (sortBy: string): void => {
    const sortedTodos = [...preparedTodos];

    switch (sortBy) {
      case 'title':
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'status':
        sortedTodos.sort((a, b) => {
          if (a.completed === b.completed) {
            return 0;
          }

          if (a.completed) {
            return 1;
          }

          return -1;
        });
        break;

      case 'name':
        sortedTodos.sort((a, b) => {
          if (a.user !== undefined && b.user !== undefined) {
            return a.user.name.localeCompare(b.user.name);
          }

          return 0;
        });
        break;

      default:
        break;
    }

    setPreparedTodos(sortedTodos);
  };

  return (
    <>
      {isInitialized && !isLoaded && (
        <p>Loading...</p>
      )}
      {!isInitialized && (
        <button type="button" onClick={onLoadClick}>
          Load
        </button>
      )}
      {preparedTodos.length !== 0 && (
        <div className="App">
          <SortButtons onSort={onSort} />
          <div className="list-wrapper">
            <TodoList list={preparedTodos} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
