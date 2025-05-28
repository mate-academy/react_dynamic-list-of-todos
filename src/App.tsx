/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { Todo } from './types/Todo';

export enum List {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>(List.ALL);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [modal, setModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState(true);

  useEffect(() => {
    if (selectTodo?.userId) {
      setIsLoadingModal(true);
      getUser(selectTodo.userId)
        .then(fetched => setUser(fetched))
        .finally(() => setIsLoadingModal(false));
    }
  }, [selectTodo]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todoFromServer => {
        setTodos(todoFromServer);
        setFilterTodos(todoFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let copyArr = [...todos];

    switch (filter) {
      case List.ACTIVE:
        copyArr = copyArr.filter(todo => !todo.completed);
        break;
      case List.COMPLETED:
        copyArr = copyArr.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (searchFilter.trim()) {
      copyArr = copyArr.filter(todo =>
        todo.title.toLowerCase().includes(searchFilter.toLowerCase()),
      );
    }

    setFilterTodos(copyArr);
  }, [filter, todos, searchFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  onSelect={todo => {
                    setSelectTodo(todo);
                    setModal(true);
                  }}
                  selectedTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
          selectedTodo={selectTodo}
          user={user}
          isLoading={isLoadingModal}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
};
