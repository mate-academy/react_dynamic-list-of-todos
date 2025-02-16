/* eslint-disable max-len */
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import React, { useEffect, useState } from 'react';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [updatedTodos, setUpdatedTodos] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loadingTodos, setLoadingTodos] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoadingTodos(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoadingTodos(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                setUpdatedTodos={setUpdatedTodos}
                filter={filter}
                updatedTodos={updatedTodos}
                todos={todos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
                query={query}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
