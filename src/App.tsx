/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  const closeModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(true);
  }, []);

  let visibleTodos = [...todos];

  if (status !== 'all') {
    visibleTodos = visibleTodos.filter(todo => {
      switch (status) {
        case 'active':
          return todo.completed !== true;
        case 'completed':
          return todo.completed === true;
        default:
          return true;
      }
    });
  }

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    visibleTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              <TodoList
                todos={visibleTodos}
                selectTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
