/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [sortField, setSortField] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('No todos to display'))
      .finally(() => setLoading(false));
  }, []);

  type Params = {
    sort: string;
    filterQuery: string;
  };

  const preparedTodos = (
    items: Todo[],
    { sort, filterQuery }: Params,
  ): Todo[] => {
    let prepTodos = [...items];

    if (sort === 'active') {
      prepTodos = prepTodos.filter(todo => !todo.completed);
    }

    if (sort === 'completed') {
      prepTodos = prepTodos.filter(todo => todo.completed);
    }

    if (filterQuery) {
      const normalizedQuery = filterQuery.trim().toLowerCase();

      prepTodos = prepTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    return prepTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortField={sortField}
                setSortField={setSortField}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && errorMessage && <p>{errorMessage}</p>}
              {!loading && !errorMessage && todos.length === 0 && (
                <p>No todos to display</p>
              )}
              {!loading && !errorMessage && todos.length > 0 && (
                <TodoList
                  todos={preparedTodos(todos, {
                    filterQuery: query,
                    sort: sortField,
                  })}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
