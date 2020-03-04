import React, { useState, FC } from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { getCorrectTodos } from './utils/api';
import { TodoList } from './components/TodoList';
import { Controller } from './components/Controller';

import './App.css';

const App: FC = () => {
  const [todoList, setTodoList] = useState<PreparedTodo[]>([]);
  const [todoVisibleList, setVisibleList] = useState<PreparedTodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  const handleClick = () => {
    getCorrectTodos().then(list => {
      setIsLoading(true);
      setTodoList(list);
      setVisibleList(list);
    }).then(list => {
      // setTimeout for demo only
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);

      return list;
    });
  };

  const idSorter = () => {
    setVisibleList([...todoList]
      .sort((a, b) => a.id - b.id));
  };

  const titleSorter = () => {
    setVisibleList([...todoList]
      .sort((a, b) => a.title.localeCompare(b.title)));
  };

  const userNameSorter = () => {
    setVisibleList([...todoList]
      .sort((a, b) => {
        if (a.user && b.user) {
          return a.user.name.localeCompare(b.user.name);
        }

        return 0;
      }));
  };

  const completedSorter = () => {
    setVisibleList([...todoList]
      .sort((a, b) => {
        const isCompletedA = a.completed ? 1 : 0;
        const isCompletedB = b.completed ? 1 : 0;

        return isCompletedA - isCompletedB;
      }));
  };

  return (
    <div className="container">
      <h1 className="title text-center">Dynamic list of TODOs</h1>
      {!isLoaded
      && (
        <button type="button" className="button" onClick={handleClick}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}

      {isLoaded
        && (
          <>
            <Controller
              idSorter={idSorter}
              titleSorter={titleSorter}
              userNameSorter={userNameSorter}
              completedSorter={completedSorter}
            />
            <TodoList todos={todoVisibleList} />
          </>
        )}
    </div>
  );
};

export default App;
