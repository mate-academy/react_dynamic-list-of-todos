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
import { FilterStatus } from './types/filter';
import { debounce } from './utils/debounce';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectTodos, setSelectTodos] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(FilterStatus.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const filteredTodo = useMemo(() => {
    let filteredTodos = todos;

    if (filter === FilterStatus.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (filter === FilterStatus.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    if (appliedQuery) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(appliedQuery.toLowerCase().trim()),
      );
    }

    return filteredTodos;
  }, [todos, filter, appliedQuery]);

  {
    /* eslint-disable react-hooks/exhaustive-deps */
  }

  const applyDebounceQuery = useCallback(
    debounce((value: string) => {
      setAppliedQuery(value);
    }),
    [],
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

  const changeStatusOfTodos = (value: FilterStatus) => {
    setFilter(value);
  };

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
              {!!todos.length ? (
                <TodoList
                  todos={filteredTodo}
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
