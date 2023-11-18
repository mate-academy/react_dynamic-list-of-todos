/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Failed to load todos.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let todosCopy = [...todos];

    if (query) {
      todosCopy = todosCopy.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (filterStatus) {
      case Status.Active:
        return todosCopy.filter(todo => !todo.completed);

      case Status.Completed:
        return todosCopy.filter(todo => todo.completed);

      default:
        return todosCopy;
    }
  }, [todos, query, filterStatus]);

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
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading
                && (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
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
