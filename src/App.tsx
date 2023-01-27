/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState<Status>(Status.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todo => setTodos(todo));
  }, []);

  const handleSelect = useCallback((selectedTodoId: number) => {
    const chosenTodo = todos.find(todo => todo.id === selectedTodoId);

    if (chosenTodo) {
      setSelectedTodo(chosenTodo);
    }
  }, [selectedTodo, todos]);

  const handleClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleStatus = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  }, []);

  const getVisibleTodos = (): Todo[] => {
    return todos.filter(todo => {
      const filteredByQuery = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (status) {
        case Status.Active:
          return !todo.completed && filteredByQuery;

        case Status.Completed:
          return todo.completed && filteredByQuery;

        case Status.All:
        default:
          return filteredByQuery;
      }
    });
  };

  const visibleTodos = useMemo(
    getVisibleTodos,
    [todos, status, query],
  );

  const handleQuery = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
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
                onChange={handleQuery}
                clearQuery={clearQuery}
                status={status}
                onSelect={handleStatus}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleClose}
        />
      )}
    </>
  );
};
