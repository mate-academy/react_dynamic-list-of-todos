import React, { useState } from 'react';
import { TodosList } from './TodosList';

import { fullTaskList } from './api';
import './App.scss';

const App = () => {
  const [todos, setTodos] = useState<FullTaskList>([]);
  const [dataLoaded, setdataLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [button, switchButton] = useState<boolean>(true);

  const getNewTasks = () => {
    setLoading(true);
    switchButton(false);
    setTimeout(() => {
      fullTaskList()
        .then(data => setTodos(data));
      setdataLoaded(!dataLoaded);
      setLoading(false);
    }, 1000);
  };

  const sortBy = (action: string) => {
    switch (action) {
      case 'title':
        setTodos(
          [...todos].sort((a: { title: string }, b: { title: string }) => (
            a.title.localeCompare(b.title)
          )),
        );
        break;
      case 'completed':
        setTodos(
          [...todos].sort((a: { completed: boolean }, b: { completed: boolean }) => (
            +b.completed - +a.completed
          )),
        );
        break;
      case 'name':
        setTodos(
          [...todos].sort((a: { user: { name: string} }, b: { user: { name: string} }) => (
            +a.user.name.localeCompare(b.user.name)
          )),
        );
        break;
      default:
        throw new Error('Ты все поломал!');
    }
  };

  return (
    <>
      {
        loading
        && <h1>Loading...</h1>
      }

      {
        button
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
              onClick={() => sortBy('title')}
            >
              Sort by title
            </button>
            <button
              type="button"
              onClick={() => sortBy('completed')}
            >
              Sort by status
            </button>
            <button
              type="button"
              onClick={() => sortBy('name')}
            >
              Sort by users name
            </button>
          </>
        )
      }

      {
        !!todos.length
        && <TodosList list={todos} />
      }
    </>
  );
};

export default App;
