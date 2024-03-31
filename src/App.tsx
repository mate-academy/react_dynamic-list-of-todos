/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';

import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(data => {
      setTodos(data);
      setIsLoading(false);
    });
  }, []);

  const handleFiltering = useCallback(() => {
    const newTodos = todos.filter(({ title, completed }) => {
      if (query && !title.includes(query)) {
        return false;
      }

      if (status !== Status.All) {
        return status === 'active' ? !completed : completed;
      }

      return true;
    });

    setFilteredTodos(newTodos);
  }, [query, status, todos]);

  useEffect(() => {
    handleFiltering();
  }, [handleFiltering]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                selectedStatus={setStatus}
                status={status}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
