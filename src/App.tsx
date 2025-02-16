/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortFields } from './types/enum';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';
import { getFilterTodos } from './utils/getFilterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterField, setFilterField] = useState(SortFields.All);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filterTodos = getFilterTodos(todos, filterField, searchValue);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={searchValue}
                filterField={filterField}
                onSearchValue={setSearchValue}
                onChangeFilterField={setFilterField}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filterTodos}
                  onChangeModalTodo={setModalTodo}
                  modalTodo={modalTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalTodo && (
        <TodoModal modalTodo={modalTodo} onDeleteModal={setModalTodo} />
      )}
    </>
  );
};
