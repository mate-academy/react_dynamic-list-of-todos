/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterQuery } from './enums';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState(FilterQuery.ALL);
  const [searchQuery, setSearchQuery] = useState<null | string>(null);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const preparedTodos = filterQuery === FilterQuery.ALL
      ? todos
      : todos.filter(todo => {
        if (filterQuery === FilterQuery.ACTIVE) {
          return !todo.completed;
        }

        return todo.completed;
      });

    if (searchQuery) {
      return preparedTodos.filter(todo => (
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }

    return preparedTodos;
  }, [todos, filterQuery, searchQuery]);

  const applyFilter = useCallback((value) => setFilterQuery(value), []);
  const applyQuery = useCallback((value) => setSearchQuery(value), []);
  const clearSelectedTodo = useCallback(() => setSelectedTodo(null), []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterQuery={filterQuery}
                applyFilter={applyFilter}
                applyQuery={applyQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    selectTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={clearSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
