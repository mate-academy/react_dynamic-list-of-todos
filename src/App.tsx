/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterTodo } from './types/FilterTodo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todosLoad, setTodosLoad] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState<FilterTodo>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosLoad(false);
        setAllTodos(todos);
      })
      .catch(() => {
        setErrorMessage('Failed to load data');
      })
      .finally(() => {
        setTodosLoad(false);
      });

    return () => {
      setTodosLoad(true);
      setAllTodos([]);
      setErrorMessage(null);
    };
  }, []);

  const preparedTodos = [...allTodos].filter(todo => {
    if (filterValue === 'active') {
      return todo.completed === false;
    } else if (filterValue === 'completed') {
      return todo.completed === true;
    }

    return true;
  });

  const visibleTodos = [...preparedTodos].filter(todo =>
    todo.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          {errorMessage === null ? (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  inputValue={searchValue}
                  selectValue={filterValue}
                  changeInputValue={setSearchValue}
                  changeFilterValue={setFilterValue}
                />
              </div>

              <div className="block">
                {todosLoad ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    changeSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="notification is-danger is-light">
              {errorMessage}
            </div>
          )}
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
