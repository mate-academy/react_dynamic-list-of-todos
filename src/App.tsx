/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useTodos } from './hooks/useTodos';
import { StatusFilter } from './types/todoFilter';
import { getFilterTodos } from './utils/getFilterTodos';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { todos, loading: todosLoading } = useTodos();
  const filteredTodos = getFilterTodos(todos, { query, status });

  const handleSelectedTodo = () => setSelectedTodo(null);

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
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {todosLoading ? (
                <Loader />
              ) : (
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
      {selectedTodo && (
        <TodoModal
          onModalClose={handleSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
