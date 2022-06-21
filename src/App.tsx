/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request, urlTodos } from './components/api/api';

type Todo = {
  id: number;
  createdAt: string;
  upDatedAt: string;
  userId: number;
  title: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [theTodos, setTheTodos] = useState <Todo[]>([]);
  const [inputedValue, setInputedValue] = useState('');

  useEffect(() => {
    request(urlTodos)
      .then((todos) => {
        setTheTodos(todos);
      });
  }, []);

  const filterTodos = (inputed: string) => {
    request(urlTodos)
      .then(todos => {
        const filtered = [...todos].filter((todo) => {
          return todo.title.toLowerCase().includes(inputed.toLowerCase());
        });

        setTheTodos(filtered);
      });
  };

  const selectTodos = (selectedInput: string) => {
    request(urlTodos)
      .then(todos => {
        const selected = [...todos].filter((todo) => {
          switch (selectedInput) {
            case 'all':
              return todo;
            case 'active':
              return todo.completed === false;
            case 'completed':
              return todo.completed === true;
            default:
              return todo;
          }
        });

        setTheTodos(selected);
      });
  };

  function shuffleArray(array: any) {
    let curId = array.length;

    while (curId !== 0) {
      const randId = Math.floor(Math.random() * curId);

      curId -= 1;
      const tmp = array[curId];

      array[curId] = array[randId];
      array[randId] = tmp;
    }

    return array;
  }

  const randomSort = () => {
    request(urlTodos)
      .then(todos => {
        const sorted = shuffleArray(todos);

        setTheTodos(sorted);
      });
  };

  const [selectedUserId, setSelectedUserId] = useState(0);

  const selectUser = (selectedId: number) => {
    if (selectedId !== selectedUserId) {
      setSelectedUserId(selectedId);
    }
  };

  const clearUser = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            randomSort();
          }}
        >
          <input
            placeholder="input the title"
            data-cy="filterByTitle"
            className="form__input"
            value={inputedValue}
            onChange={(event) => {
              setInputedValue(event.target.value);
              filterTodos(event.target.value);
            }}
          />

          <select
            className="select"
            onChange={(event) => {
              selectTodos(event.target.value);
            }}
          >
            <option
              value="all"
            >
              All
            </option>

            <option
              value="active"
            >
              Active
            </option>

            <option
              value="completed"
            >
              Completed
            </option>
          </select>

          <button
            type="submit"
            className="btn"
          >
            Random sort
          </button>
        </form>
        <TodoList
          todos={theTodos}
          onSelect={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              onClear={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
