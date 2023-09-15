/* eslint-disable max-len */
import React, { useEffect, useCallback, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function getFilteredTodos(key: string, query: string, todosToFilter: Todo[]) {
  let filteredTodos = [];

  switch (key) {
    case 'all': {
      filteredTodos = todosToFilter;
      break;
    }

    case 'active': {
      filteredTodos = todosToFilter.filter(todo => !todo.completed);
      break;
    }

    case 'completed': {
      filteredTodos = todosToFilter.filter(todo => todo.completed);
      break;
    }

    default:
      filteredTodos = todosToFilter;
  }

  filteredTodos = filteredTodos.filter(todo => todo.title
    .toLowerCase()
    .includes(query.toLowerCase().trim()));

  return filteredTodos;
}

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterKey, setFilterKey] = useState('all');
  const [query, setQuery] = useState('');

  const filteredTodos = getFilteredTodos(filterKey, query, todos);

  const handleTodoSelection = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const handleFilterKeySelection = useCallback((key: string) => {
    setFilterKey(key);
  }, []);

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleQueryDelete = useCallback(() => {
    setQuery('');
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterKeyChange={handleFilterKeySelection}
                onQueryChange={handleQueryChange}
                query={query}
                onDelete={handleQueryDelete}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  onClick={handleTodoSelection}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClick={handleTodoSelection}
        />
      )}
    </>
  );
};
