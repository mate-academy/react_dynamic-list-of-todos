/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export type Category = 'all' | 'active' | 'completed';

const filterTodo = (
  todosList: Todo[],
  {
    filterCategory,
    filterQuery,
  }: { filterCategory: Category; filterQuery: string },
): Todo[] => {
  let filteredTodo = [...todosList];

  if (filterCategory === 'completed') {
    filteredTodo = filteredTodo.filter(todo => todo.completed);
  }

  if (filterCategory === 'active') {
    filteredTodo = filteredTodo.filter(todo => !todo.completed);
  }

  if (filterQuery) {
    const normalizedQuery = filterQuery.toLowerCase().trim();

    filteredTodo = filteredTodo.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return filteredTodo;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorMessageTodos, setErrorMessageTodos] = useState<string>('');
  const [errorMessageUser, setErrorMessageUser] = useState<string>('');

  const [loaderTodo, setLoaderTodo] = useState(false);
  const [loaderUser, setLoaderUser] = useState(false);

  const [category, setCategory] = useState<Category>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    async function loadTodos() {
      setLoaderTodo(true);
      setErrorMessageTodos('');

      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessageTodos('Failed to load todos');
      } finally {
        setLoaderTodo(false);
      }
    }

    loadTodos();
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadUser() {
      if (!selectedTodo) {
        setUser(null);

        return;
      }

      setLoaderUser(true);
      setErrorMessageUser('');

      try {
        const userFromServer = await getUser(selectedTodo.userId);

        if (!isCancelled) {
          setUser(userFromServer);
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessageUser('Failed to load user.');
        }
      } finally {
        if (!isCancelled) {
          setLoaderUser(false);
        }
      }
    }

    loadUser();

    return () => {
      isCancelled = true;
    };
  }, [selectedTodo]);

  const visibleTodo = filterTodo(todos, {
    filterCategory: category,
    filterQuery: query,
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                category={category}
                onQueryChange={setQuery}
                onCategoryChange={setCategory}
              />
            </div>

            <div className="block">
              {loaderTodo && <Loader />}
              <TodoList
                todos={visibleTodo}
                selectedTodo={selectedTodo}
                onSelect={setSelectedTodo}
              />
            </div>
            {errorMessageTodos && (
              <p className="has-text-danger">{errorMessageTodos}</p>
            )}
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          loaderUser={loaderUser}
          selectedTodo={selectedTodo}
          user={user}
          onModalClose={setSelectedTodo}
        />
      )}
      {errorMessageUser && (
        <p className="has-text-danger">{errorMessageUser}</p>
      )}
    </>
  );
};
