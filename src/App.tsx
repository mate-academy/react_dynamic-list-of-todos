/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterStatus } from './types/filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodos, setSelectTodos] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(FilterStatus.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const delay = 300;

  const filteredTodos = useMemo(() => {
    let filteredTodo = todos;

    if (filter === FilterStatus.Active) {
      filteredTodo = filteredTodo.filter(todo => !todo.completed);
    }

    if (filter === FilterStatus.Completed) {
      filteredTodo = filteredTodo.filter(todo => todo.completed);
    }

    if (appliedQuery) {
      filteredTodo = filteredTodo.filter(todo =>
        todo.title.toLowerCase().includes(appliedQuery.toLowerCase().trim()),
      );
    }

    return filteredTodo;
  }, [todos, filter, appliedQuery]);

  const debounce = (callback: (args: string) => void) => {
    let timerId = 0;

    return (args: string) => {
      window.clearTimeout(timerId);

      timerId = window.setTimeout(() => {
        callback(args);
      }, delay);
    };
  };

  const applyDebounceQuery = useCallback(
    debounce((value: string) => {
      setAppliedQuery(value);
    }),
    [debounce],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyDebounceQuery(event.target.value);
    setQuery(event.target.value);
  };

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, []);

  const handleShowModal = (userId: number) => {
    const foundTodo = todos.find(todo => todo.id === userId);

    if (foundTodo) {
      setSelectTodos(foundTodo);
    }
  };

  function changeStatusOfTodos(value: FilterStatus) {
    setFilter(value);
  }

  const handleClearSearchBtn = () => {
    setQuery('');
    setAppliedQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeStatusOfTodos={changeStatusOfTodos}
                handleQueryChange={handleQueryChange}
                handleClearSearchBtn={handleClearSearchBtn}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  filteredTodos={filteredTodos}
                  handleShowModal={handleShowModal}
                  selectTodos={selectTodos}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodos && (
        <TodoModal selectTodos={selectTodos} setSelectTodos={setSelectTodos} />
      )}
    </>
  );
};
