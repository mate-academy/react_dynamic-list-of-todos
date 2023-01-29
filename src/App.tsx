/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
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
  const [todosLoaded, setTodosLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTodos = useCallback(async () => {
    const response = await getTodos();

    setTodosLoaded(true);
    setTodos(response);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const memorizeFilter = useMemo(() => {
    const filterByStatus = (todoStatus: boolean) => {
      switch (filter) {
        case 'active':
          return !todoStatus;

        case 'completed':
          return todoStatus;

        case 'all':
        default:
          return true;
      }
    };

    const filteredByFilter = todos.filter(todo => filterByStatus(todo.completed));
    let includedQuery = filteredByFilter;

    if (query) {
      includedQuery = filteredByFilter
        .filter(todo => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
    }

    return includedQuery;
  }, [query, filter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                setQuery={(newQuery: string) => setQuery(newQuery)}
                setFilter={(selectedFilter: string) => setFilter(selectedFilter)}
              />
            </div>

            <div className="block">
              {!todosLoaded
                ? (<Loader />)
                : (
                  <TodoList
                    todos={memorizeFilter}
                    selectedTodo={selectedTodo}
                    selectTodo={(newTodoId: Todo) => {
                      setSelectedTodo(newTodoId);
                    }}
                  />
                )}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo
      && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
