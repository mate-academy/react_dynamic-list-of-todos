/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('Try again later');
  const [query, setQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (query.trim()) {
      filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    if (selectedStatus === Status.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (selectedStatus === Status.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    return filteredTodos;
  }, [todos, query, selectedStatus]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .catch(() => setErrorMessage(errorMessage))
        .finally(() => setLoading(false));
    }, 1000);
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
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading
              && (
                <TodoList
                  items={visibleTodos}
                  onTodoSelected={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            close={() => setSelectedTodo(null)}
          />
        )}
      {' '}
    </>
  );
};
