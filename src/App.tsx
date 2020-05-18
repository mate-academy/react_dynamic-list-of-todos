import React, { useMemo, useState } from 'react';
import { TodosList } from './TodosList';

import { getFullTaskList } from './api';
import './App.scss';

const App = () => {
  const [todos, setTodos] = useState<FullTaskList>([]);
  const [dataLoaded, setdataLoaded] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isButtonVisible, setButtonVisibility] = useState<boolean>(true);

  const getNewTasks = () => {
    setLoading(true);
    setButtonVisibility(false);
    getFullTaskList()
      .then(data => {
        setdataLoaded(!dataLoaded);
        setLoading(false);
        setTodos(data);
      });
  };

  const switchStatus = (str: string) => {
    setStatus(str);
  };

  const sortBy = (action: string) => {
    switch (action) {
      case 'title':
        return [...todos].sort((a: { title: string }, b: { title: string }) => (
          a.title.localeCompare(b.title)
        ));
      case 'completed':
        return [...todos].sort((a: { completed: boolean }, b: { completed: boolean }) => (
          +b.completed - +a.completed
        ));
      case 'name':
        return [...todos].sort(
          (a: { user: { name: string} }, b: { user: { name: string} }) => (
            +a.user.name.localeCompare(b.user.name)
          ),
        );
      default:
        return [...todos];
    }
  };

  const resultTodos = useMemo(() => {
    return sortBy(status);
  }, [status, todos]);

  return (
    <>
      {
        loading
        && <h1>Loading...</h1>
      }

      {
        isButtonVisible
        && (
          <button
            type="button"
            onClick={getNewTasks}
          >
            Loading todoList
          </button>
        )
      }

      {
        dataLoaded
        && (
          <>
            <button
              type="button"
              onClick={() => switchStatus('title')}
            >
              Sort by title
            </button>
            <button
              type="button"
              onClick={() => switchStatus('completed')}
            >
              Sort by status
            </button>
            <button
              type="button"
              onClick={() => switchStatus('name')}
            >
              Sort by users name
            </button>
          </>
        )
      }

      {
        !!resultTodos.length
        && <TodosList list={resultTodos} />
      }
    </>
  );
};

export default App;
