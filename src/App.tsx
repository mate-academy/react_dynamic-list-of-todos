/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filterType, setFilterType] = useState<string>(Filter.All);
  const [query, setQuery] = useState('');
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const selectTodoId = useCallback((todoId: number) => {
    setSelectedTodoId(todoId);
  }, []);

  const closeTodoModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const filterTodos = useMemo(() => {
    const cleanQuery = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

    return cleanQuery.filter(todo => {
      switch (filterType) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, query, filterType]);

  useEffect(() => {
    setIsTodosLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setHasError(true))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const isNoFiltersResult = query && !filterTodos.length;

  const selectedTodo = useMemo(() => {
    return todos.find(
      todo => todo.id === selectedTodoId,
    );
  }, [selectedTodoId, todos]);

  const todoList = (
    <TodoList
      selectedTodo={selectedTodo?.id || 0}
      onSelect={selectTodoId}
      todos={filterTodos}
    />
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterType={filterType}
                setQuery={setQuery}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {!isTodosLoading
                ? (
                  todoList
                )
                : (
                  <Loader />
                )}

              {hasError && (
                <p>Something went wrong</p>
              )}

              {isNoFiltersResult && (
                <p>No todos matched filters</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          closeModal={closeTodoModal}
        />
      )}
    </>
  );
};
