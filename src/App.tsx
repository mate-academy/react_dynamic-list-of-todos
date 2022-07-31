/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

const URL
= 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';

export const App: React.FC = () => {
  const [todos, setTodos] = useState< Todo[] | null >(null);
  const [data, setData] = useState< Todo[] | null >(null);
  const [options, setOptions] = useState('all');
  const [query, setQuery] = useState<string>('');
  const [show, setShow] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchFoo = async () => {
      fetch(URL)
        .then(res => {
          if (!res.ok) {
            throw new Error(`${res.statusText}`);
          } else {
            return res.json();
          }
        })
        .then(res => setTodos(res))
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error.message);
        });
    };

    fetchFoo();
  }, []);

  useEffect(() => {
    if (todos !== null) {
      setData(todos);
    }
  }, [todos]);

  if (todos) {
    // eslint-disable-next-line no-console
    console.log(todos);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setOptions={setOptions}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {
                data === null
                  ? <Loader />
                  : (
                    <TodoList
                      todos={data}
                      options={options}
                      query={query}
                      setShow={setShow}
                      show={show}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>
      {
        show !== null
        && <TodoModal show={show} setShow={setShow} />
      }
    </>
  );
};
