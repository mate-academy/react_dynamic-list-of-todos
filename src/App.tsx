/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/todos.json')
  //     .then(res => res.json())
  //     .then(elements => {
  //       setTodos(elements);
  //       setSelectedTodos(elements);
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         setLoader(false);
  //       }, 500);
  //     });
  // }, []);

  useEffect(() => {
    getTodos()
      .then(elements => {
        setTodos(elements);
        setSelectedTodos(elements);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const handleSortList = (sortedTodos: Todo[]) => {
    setSelectedTodos(sortedTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onSortList={handleSortList} />
            </div>

            <div className="block">
              {loader && <Loader />}
              {!loader && <TodoList todos={selectedTodos} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
