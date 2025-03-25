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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [error, setError] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Error'))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      switch (filteredStatus) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
        case 'all':
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const onTodoOpenClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onTodoCloseClick = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredStatus={setFilteredStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!error && !loading && (
                <TodoList
                  todos={filteredTodos}
                  onTodoOpenClick={onTodoOpenClick}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onTodoCloseClick={onTodoCloseClick} />
      )}
    </>
  );
};
