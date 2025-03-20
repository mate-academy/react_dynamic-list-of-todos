/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(true);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(
    null,
  );

  const [filterQuery, setFilterQuery] = useState('');
  const [filterSelect, setFilterSelect] = useState('');

  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const getFilters = (filterValue: string, filterBy: 'title' | 'status') => {
    switch (filterBy) {
      case 'title': {
        setFilterQuery(filterValue);
        break;
      }

      case 'status': {
        setFilterSelect(filterValue);

        break;
      }
    }
  };

  const filteredTodos = useMemo(() => {
    let newTodos: Todo[] = todos;

    switch (filterSelect) {
      case 'all': {
        break;
      }

      case 'active': {
        newTodos = newTodos.filter(todo => !todo.completed);
        break;
      }

      case 'completed': {
        newTodos = newTodos.filter(todo => todo.completed);
        break;
      }
    }

    return newTodos.filter(todo =>
      todo.title.toLowerCase().includes(filterQuery.toLowerCase()),
    );
  }, [todos, filterSelect, filterQuery]);

  const showModal = () => {
    setIsModalShown(true);
  };

  const hideModal = () => {
    setIsModalShown(false);
  };

  const getTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
    showModal();
  }, []);

  useEffect(() => {
    getTodos()
      .then(list => {
        setTodos(list);
      })
      .catch(e => setFetchErrorMessage(e.message))
      .finally(() => setTodosLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter getFilters={getFilters} />
            </div>

            <div className="block">
              {todosLoading && <Loader />}
              {fetchErrorMessage === null && todos && (
                <TodoList
                  todos={filteredTodos}
                  getTodo={getTodo}
                  isModalShown={isModalShown}
                />
              )}
              {fetchErrorMessage && (
                <p className="has-text-danger">Error: {fetchErrorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShown && selectedTodo && (
        <TodoModal todo={selectedTodo} hideModal={hideModal} />
      )}
    </>
  );
};
