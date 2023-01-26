/* eslint-disable max-len */
import {
  FC, useEffect, useState, useMemo, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import './App.scss';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [chosenStatus, setChosenStatus] = useState('all');
  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isTodosLoadingError, setIsTodosLoadingError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsTodosLoading(true);

    getTodos()
      .then((loadedTodos) => setTodos(loadedTodos))
      .catch(() => setIsTodosLoadingError(true))
      .finally(() => setIsTodosLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const preparedQuery = query
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .join(' ');

      const isQueryInTitle = todo.title.toLowerCase().includes(preparedQuery);

      switch (chosenStatus) {
        case 'completed':
          return todo.completed && isQueryInTitle;

        case 'active':
          return !todo.completed && isQueryInTitle;

        default:
          return isQueryInTitle;
      }
    });
  }, [todos, query, chosenStatus]);

  const isNoMatchingTodos = query && !filteredTodos.length;

  const selectedTodo = useMemo(() => {
    return filteredTodos.find(todo => todo.id === selectedTodoId);
  }, [filteredTodos, selectedTodoId]);

  const closeModal = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                chosenStatus={chosenStatus}
                setChosenStatus={setChosenStatus}
              />
            </div>

            <div className="block">
              {isTodosLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodoId={selectedTodoId}
                    onSelect={setSelectedTodoId}
                  />
                )}

              {isTodosLoadingError && (
                <p>Error occured while loading todos</p>
              )}

              {isNoMatchingTodos && (
                <p>None of todos is matching your criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={closeModal}
        />
      )}
    </>
  );
};
