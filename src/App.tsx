/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export type CompletedFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>([]);
  const [loadingTodos, setLoadingTodos] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [completedFilters, setCompletedFilters] = useState<CompletedFilter>('all');
  const [inputFilter, setInputfilter] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(todos);

  useEffect(() => {
    const loadTodos = async () => {
      setLoadingTodos(true);
      setError(false);
      setUser(null);

      getTodos().then(setTodos).catch(e => {
        setError(e.message);
      }).finally(() => setLoadingTodos(false));
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      setLoadingUser(true);
      setError(false);
      setUser(null);

      if (todo) {
        getUser(todo?.userId).then(setUser).catch(e => {
          setError(e.message);
        }).finally(() => setLoadingUser(false));
      }
    };

    loadUser();
  }, [todo]);

  const selectTodo = (chosenTodo: Todo) => {
    if (todos) {
      const t = todos?.find(to => to.id === chosenTodo.id);

      setLoadingUser(true);
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

  const selectUser = () => {
    setTodo(null);
    setUser(null);
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
                selectfilter={selectCompletedFilter}
                selectinputfilter={selectInputFilter}
                selectedfilter={completedFilters}
                selectedinpputfilter={inputFilter}
                onclickhandle={onClickHandle}
              />
            </div>

            <div className="block">
              {error && <p>{error}</p>}
              {loadingTodos && <Loader />}

              {!loadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  settodo={selectTodo}
                  selectedtodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal
          user={user}
          loading={loadingUser}
          chosentodo={todo}
          setuser={selectUser}
        />
      )}
    </>
  );
};
