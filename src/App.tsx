/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const urlTodos = 'https://mate.academy/students-api/todos';

  const [theTodos, setTheTodos] = useState([{
    id: 0,
    createdAt: '',
    upDatedAt: '',
    userId: 0,
    title: '',
    completed: false,
  }]);

  useEffect(() => {
    fetch(urlTodos)
      .then(response => {
        if (!response.ok) {
          throw new Error('Something is wrong');
        } else {
          response.json()
            .then(todos => {
              setTheTodos(todos);
            });
        }
      });
  }, []);

  const filterTodos = (inputedValue: string) => {
    fetch(urlTodos)
      .then(response => {
        response.json()
          .then(todos => {
            const filtered = [...todos].filter((todo) => {
              return todo.title.includes(inputedValue);
            });

            setTheTodos(filtered);
          });
      });
  };

  const selectTodos = (selectedInput: string) => {
    fetch(urlTodos)
      .then(response => {
        response.json()
          .then(todos => {
            const selected = [...todos].filter((todo) => {
              if (selectedInput === 'all') {
                return todo;
              }

              if (selectedInput === 'active') {
                return todo.completed === false;
              }

              if (selectedInput === 'completed') {
                return todo.completed === true;
              }

              return todo;
            });

            setTheTodos(selected);
          });
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
    fetch(urlTodos)
      .then(response => {
        response.json()
          .then(todos => {
            const sorted = shuffleArray(todos);

            setTheTodos(sorted);
          });
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
        <TodoList
          todos={theTodos}
          onSelect={selectUser}
          onFilter={filterTodos}
          onSelected={selectTodos}
          onSorted={randomSort}
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
