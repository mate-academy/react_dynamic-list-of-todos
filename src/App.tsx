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

export const App: React.FC = () => {
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [selectOption, setSelectOption] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = todos.filter(todo => {
    const byTitle = todo.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    const statusSelect = (() => {
      switch (selectOption) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    })();

    return byTitle && statusSelect;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectOption={selectOption}
                setSelectOption={setSelectOption}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={selectTodo}
                  setSelectTodo={setSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal selectTodo={selectTodo} setSelectTodo={setSelectTodo} />
      )}
    </>
  );
};
