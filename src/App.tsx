import React, { useState, FC } from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { getCorrectTodos } from './utils/api';
import { TodoList } from './components/TodoList';
import { Controller } from './components/Controller';

import './App.css';

const App: FC = () => {
  const [todoList, setTodoList] = useState<PreparedTodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    getCorrectTodos().then(list => {
      setIsLoading(true);

      // setTimeout for demo only
      setTimeout(() => {
        setTodoList(list);
        setIsLoading(false);
      }, 500);
    });
  };

  const idSorter = () => {
    setTodoList([...todoList]
      .sort((a, b) => a.id - b.id));
  };

  const titleSorter = () => {
    setTodoList([...todoList]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const userNameSorter = () => {
    setTodoList([...todoList]
      .sort((a, b) => {
        if (a.user && b.user) {
          return a.user.name.localeCompare(b.user.name);
        }

        return 0;
      }));
  };

  const completedSorter = () => {
    setTodoList([...todoList]
      .sort((a, b) => {
        const isCompletedA = a.completed ? 1 : 0;
        const isCompletedB = b.completed ? 1 : 0;

        return isCompletedA - isCompletedB;
      }));
  };

  return (
    <div className="container">
      <h1 className="title text-center">Dynamic list of TODOs</h1>

      {todoList.length === 0
        && (
          <button type="button" className="button-load" onClick={handleClick}>
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        )}

      {todoList.length !== 0
        && (
          <>
            <Controller
              idSorter={idSorter}
              titleSorter={titleSorter}
              userNameSorter={userNameSorter}
              completedSorter={completedSorter}
            />
            <TodoList todos={todoList} />
          </>
        )}
    </div>
  );
};

export default App;
