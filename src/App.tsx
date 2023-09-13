/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export type CompletedFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>([]);
  const [loadingTodos, setLoadingTodos] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [completedFilters, setCompletedFilters] = useState<CompletedFilter>('all');
  const [inputFilter, setInputfilter] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(todos);

  useEffect(() => {
    const loadTodos = async () => {
      setLoadingTodos(true);
      setError(false);

      getTodos().then(setTodos).catch(e => {
        setError(e.message);
      }).finally(() => setLoadingTodos(false));
    };

    loadTodos();
  }, []);

  const selectTodo = (chosenTodo: Todo) => {
    if (todos) {
      const t = todos?.find(to => to.id === chosenTodo.id);

      setTodo(t as Todo);
    }
  };

  const selectCompletedFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompletedFilters(event.target.value as CompletedFilter);
  };

  const selectInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputfilter(e.target.value.trimStart().toLowerCase());
  };

  useCallback(selectInputFilter, [inputFilter]);

  const closeModal = () => {
    setTodo(null);
  };

  const onClickHandle = () => {
    setInputfilter('');
  };

  useMemo(() => {
    if (todos) {
      setFilteredTodos(todos.filter(to => {
        let matchesCompletedFilter = true;

        if (completedFilters === 'active') {
          matchesCompletedFilter = !to.completed;
        } else if (completedFilters === 'completed') {
          matchesCompletedFilter = to.completed;
        }

        let matchesInputFilter = true;

        if (inputFilter.length > 0) {
          matchesInputFilter = to.title.toLowerCase().includes(inputFilter);
        }

        return matchesCompletedFilter && matchesInputFilter;
      }));
    }
  }, [completedFilters, inputFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectFilter={selectCompletedFilter}
                selectInputFilter={selectInputFilter}
                selectedFilter={completedFilters}
                selectedInpputFilter={inputFilter}
                onClickHandle={onClickHandle}
              />
            </div>

            <div className="block">
              {error && <p>{error}</p>}
              {loadingTodos && <Loader />}

              {!loadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  setTodo={selectTodo}
                  selectedTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          chosenTodo={todo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
