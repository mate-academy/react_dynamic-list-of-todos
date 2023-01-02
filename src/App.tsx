/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [searchBy, setSearchBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const getTodosFromServer = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const showTodo = (userNum: number) => {
    setUserId(userNum);
  };

  const stopShowTodo = () => {
    setUserId(0);
  };

  const filterByFunc = (filterByProps: Filter, searchByProps: string) => {
    setSearchBy(searchByProps);
    setFilterBy(filterByProps);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={filterByFunc} />
            </div>

            <div className="block">
              {!todos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onShow={showTodo}
                  filterBy={filterBy as Filter}
                  searchBy={searchBy}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0 && (
        <TodoModal
          todos={todos}
          userId={userId}
          stopShow={stopShowTodo}
        />
      )}
    </>
  );
};
