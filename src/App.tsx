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
import { SortField } from './types/SortField';

interface SortOptions {
  sortField: SortField;
  query: string;
}

function getFilteredTodos(todos: Todo[], { sortField, query }: SortOptions) {
  let filteredTodos = [...todos];

  switch (sortField) {
    case SortField.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    case SortField.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    default:
      break;
  }

  const normalizedQuery = query.trimStart().toLowerCase();

  filteredTodos = filteredTodos.filter(todo =>
    todo.title.toLowerCase().includes(normalizedQuery),
  );

  return filteredTodos;
}

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState(SortField.All);
  const [query, setQuery] = useState('');

  const onCloseClick = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => {
        setCurrentTodos(todos);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = getFilteredTodos(currentTodos, { sortField, query });

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

              {!loading && (
                <TodoList
                  selectedTodo={selectedTodo || null}
                  todos={visibleTodos}
                  onTodoSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseClick={onCloseClick} />
      )}
    </>
  );
};
