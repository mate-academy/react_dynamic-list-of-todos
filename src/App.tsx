/* eslint-disable max-len */
import React, {
  useEffect, useCallback, useState, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterKey } from './types/FilterKey';

function getFilteredTodos(key: FilterKey, query: string, todosToFilter: Todo[]) {
  let filteredTodos = [];

  switch (key) {
    case FilterKey.All: {
      filteredTodos = todosToFilter;
      break;
    }

    case FilterKey.Active: {
      filteredTodos = todosToFilter.filter(todo => !todo.completed);
      break;
    }

    case FilterKey.Completed: {
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
  const [filterKey, setFilterKey] = useState<FilterKey>(FilterKey.All);
  const [query, setQuery] = useState('');

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(filterKey, query, todos);
  }, [filterKey, query, todos]);

  const handleTodoSelection = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const handleFilterKeySelection = useCallback((key: FilterKey) => {
    setFilterKey(key);
  }, []);

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleQueryDelete = useCallback(() => {
    setQuery('');
  }, []);

  const handleTodoSelectionCancel = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        if (!todosFromServer.length) {
          throw new Error("Couldn't get any todos from server");
        }

        setTodos(todosFromServer);
      })
      .catch((errorMessage) => {
        // eslint-disable-next-line
        console.log(errorMessage);
        setTodos([]);
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
                onQueryDelete={handleQueryDelete}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
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

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onTodoSelectionCancel={handleTodoSelectionCancel}
        />
      )}
    </>
  );
};
